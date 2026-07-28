import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://ycmrqqgxlreioavmzctq.supabase.co";
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY || "sb_publishable_ZkFBPPG6Rl1Z9t-81ht7ug_chxHkpj-";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export interface RankingRecord {
  id?: string;
  nickname: string;
  mode: "sido" | "sigungu" | "japan" | "usa" | "china" | "world";
  cpm: number;
  accuracy: number;
  time_seconds: number;
  created_at?: string;
}

export const isBetterScore = (
  newRec: Omit<RankingRecord, "id" | "created_at">,
  oldRec: RankingRecord
): boolean => {
  if (newRec.cpm > oldRec.cpm) return true;
  if (newRec.cpm < oldRec.cpm) return false;
  if (newRec.accuracy > oldRec.accuracy) return true;
  if (newRec.accuracy < oldRec.accuracy) return false;
  return newRec.time_seconds < oldRec.time_seconds;
};

export const getBestRecordsPerNickname = (records: RankingRecord[]): RankingRecord[] => {
  const bestMap = new Map<string, RankingRecord>();

  for (const r of records) {
    const key = (r.nickname || "무명 운행사").trim().toLowerCase();
    const existing = bestMap.get(key);
    if (!existing) {
      bestMap.set(key, r);
    } else {
      if (isBetterScore(r, existing)) {
        bestMap.set(key, r);
      }
    }
  }

  const sorted = Array.from(bestMap.values()).sort((a, b) => {
    if (b.cpm !== a.cpm) return b.cpm - a.cpm;
    if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy;
    return a.time_seconds - b.time_seconds;
  });

  return sorted;
};

export const fetchLeaderboard = async (mode: "sido" | "sigungu" | "japan" | "usa" | "china" | "world", limit = 50): Promise<RankingRecord[]> => {
  const localRecords = getLocalLeaderboard(mode);
  let cloudRecords: RankingRecord[] = [];

  try {
    const { data, error } = await supabase
      .from("rankings")
      .select("*")
      .eq("mode", mode)
      .order("cpm", { ascending: false })
      .order("accuracy", { ascending: false })
      .order("time_seconds", { ascending: true })
      .limit(300);

    if (!error && data) {
      cloudRecords = data as RankingRecord[];
    } else if (error) {
      console.warn("Error fetching ranking data from cloud:", error.message);
    }
  } catch (err) {
    console.warn("Exception fetching rankings:", err);
  }

  const combined = [...cloudRecords, ...localRecords];
  const bestDeduplicated = getBestRecordsPerNickname(combined);

  return bestDeduplicated.slice(0, limit);
};

export const submitScoreToLeaderboard = async (record: Omit<RankingRecord, "id" | "created_at">): Promise<boolean> => {
  const cleanNickname = record.nickname.trim() || "무명 운행사";
  const cleanRecord = {
    nickname: cleanNickname,
    mode: record.mode,
    cpm: Math.round(record.cpm),
    accuracy: Number(record.accuracy.toFixed(1)),
    time_seconds: Number(record.time_seconds.toFixed(1)),
  };

  // Always update local storage first
  saveLocalScore(cleanRecord);

  try {
    // Check if any existing records exist for this nickname + mode
    const { data: existingRows, error: searchError } = await supabase
      .from("rankings")
      .select("*")
      .eq("mode", cleanRecord.mode)
      .ilike("nickname", cleanNickname)
      .order("cpm", { ascending: false })
      .order("accuracy", { ascending: false })
      .order("time_seconds", { ascending: true });

    if (!searchError && existingRows && existingRows.length > 0) {
      // Pick the best among existing rows
      let bestExisting = existingRows[0] as RankingRecord;
      for (let i = 1; i < existingRows.length; i++) {
        const candidate = existingRows[i] as RankingRecord;
        if (isBetterScore(candidate, bestExisting)) {
          bestExisting = candidate;
        }
      }

      if (isBetterScore(cleanRecord, bestExisting)) {
        // Update existing best record with the new superior stats
        const { error: updateError } = await supabase
          .from("rankings")
          .update({
            cpm: cleanRecord.cpm,
            accuracy: cleanRecord.accuracy,
            time_seconds: cleanRecord.time_seconds,
            created_at: new Date().toISOString(),
          })
          .eq("id", bestExisting.id);

        if (updateError) {
          console.warn("Error updating score in cloud database:", updateError.message);
          // Try insert as fallback if update failed due to RLS permissions
          await supabase.from("rankings").insert([
            {
              nickname: cleanNickname,
              mode: cleanRecord.mode,
              cpm: cleanRecord.cpm,
              accuracy: cleanRecord.accuracy,
              time_seconds: cleanRecord.time_seconds,
            },
          ]);
        }
      }

      // Purge any duplicate/older entries for the same nickname & mode
      const duplicateIds = existingRows
        .map((r) => r.id)
        .filter((id): id is string => Boolean(id) && id !== bestExisting.id);

      if (duplicateIds.length > 0) {
        await supabase.from("rankings").delete().in("id", duplicateIds);
      }

      return true;
    } else {
      // Insert new record
      const { error: insertError } = await supabase.from("rankings").insert([
        {
          nickname: cleanNickname,
          mode: cleanRecord.mode,
          cpm: cleanRecord.cpm,
          accuracy: cleanRecord.accuracy,
          time_seconds: cleanRecord.time_seconds,
        },
      ]);

      if (insertError) {
        console.warn("Error inserting score to cloud database:", insertError.message);
        return false;
      }
      return true;
    }
  } catch (err) {
    console.warn("Exception submitting score:", err);
    return true;
  }
};

// Local storage fallback handlers
const LOCAL_LEADERBOARD_KEY = "typing_train_rankings_v1";

const getLocalLeaderboard = (mode: "sido" | "sigungu" | "japan" | "usa" | "china" | "world"): RankingRecord[] => {
  try {
    const stored = localStorage.getItem(LOCAL_LEADERBOARD_KEY);
    if (!stored) return [];
    const parsed: RankingRecord[] = JSON.parse(stored);
    return parsed
      .filter((r) => r.mode === mode)
      .sort((a, b) => b.cpm - a.cpm || b.accuracy - a.accuracy || a.time_seconds - b.time_seconds);
  } catch {
    return [];
  }
};

const saveLocalScore = (record: Omit<RankingRecord, "id" | "created_at">) => {
  try {
    const stored = localStorage.getItem(LOCAL_LEADERBOARD_KEY);
    let parsed: RankingRecord[] = stored ? JSON.parse(stored) : [];
    const nicknameKey = record.nickname.trim().toLowerCase();

    // Find all records matching mode and nickname
    const matchingIndices: number[] = [];
    parsed.forEach((r, idx) => {
      if (r.mode === record.mode && (r.nickname || "").trim().toLowerCase() === nicknameKey) {
        matchingIndices.push(idx);
      }
    });

    if (matchingIndices.length > 0) {
      // Find the best among existing local matches
      let bestMatch = parsed[matchingIndices[0]];
      for (let i = 1; i < matchingIndices.length; i++) {
        const candidate = parsed[matchingIndices[i]];
        if (isBetterScore(candidate, bestMatch)) {
          bestMatch = candidate;
        }
      }

      // Filter out ALL old matching records
      parsed = parsed.filter(
        (r) => !(r.mode === record.mode && (r.nickname || "").trim().toLowerCase() === nicknameKey)
      );

      // Determine which score is better: new vs best existing
      if (isBetterScore(record, bestMatch)) {
        parsed.push({
          ...record,
          id: bestMatch.id || "local_" + Date.now(),
          created_at: new Date().toISOString(),
        });
      } else {
        parsed.push(bestMatch);
      }
    } else {
      parsed.push({
        ...record,
        id: "local_" + Date.now(),
        created_at: new Date().toISOString(),
      });
    }

    localStorage.setItem(LOCAL_LEADERBOARD_KEY, JSON.stringify(parsed));
  } catch (e) {
    console.error("Failed to save local score fallback", e);
  }
};
