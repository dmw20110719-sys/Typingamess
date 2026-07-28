import React, { useState, useEffect } from "react";
import { Trophy, Medal, X, RefreshCw, Crown, Zap, Clock, Target } from "lucide-react";
import { fetchLeaderboard, RankingRecord } from "../lib/supabase";

type LeaderboardMode = "sido" | "sigungu" | "japan" | "usa" | "china" | "world";

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: LeaderboardMode;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  defaultMode = "sido",
}) => {
  const [activeTab, setActiveTab] = useState<LeaderboardMode>(defaultMode);
  const [rankings, setRankings] = useState<RankingRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async (mode: LeaderboardMode) => {
    setIsLoading(true);
    const data = await fetchLeaderboard(mode);
    setRankings(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      const VALID_MODES: LeaderboardMode[] = ["sido", "sigungu", "japan", "usa", "china", "world"];
      const modeToLoad: LeaderboardMode = VALID_MODES.includes(defaultMode as any)
        ? (defaultMode as LeaderboardMode)
        : "sido";
      setActiveTab(modeToLoad);
      loadData(modeToLoad);
    }
  }, [isOpen, defaultMode]);

  const handleTabChange = (mode: LeaderboardMode) => {
    setActiveTab(mode);
    loadData(mode);
  };

  if (!isOpen) return null;

  const rank1 = rankings[0];
  const rank2 = rankings[1];
  const rank3 = rankings[2];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in select-none">
      <div className="bg-gradient-to-b from-sky-50 via-slate-50 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-800 dark:text-slate-100">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 text-white rounded-2xl flex items-center justify-center shadow-md shadow-amber-500/20">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">명예의 전당 (완주 랭킹)</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">타자속도(타/분) · 정확도(%) · 소요시간(초) 랭킹</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="px-6 py-3 bg-white/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 overflow-x-auto shrink-0">
          <div className="flex gap-1.5 flex-1 min-w-0 overflow-x-auto">
            {[
              { id: "sido", label: "🇰🇷 한국 광역" },
              { id: "sigungu", label: "🇰🇷 시·군·구" },
              { id: "japan", label: "🇯🇵 일본" },
              { id: "usa", label: "🇺🇸 미국" },
              { id: "china", label: "🇨🇳 중국" },
              { id: "world", label: "🌐 전세계" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as LeaderboardMode)}
                className={`py-2 px-3.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap cursor-pointer shadow-sm ${
                  activeTab === tab.id
                    ? tab.id === "japan"
                      ? "bg-rose-600 text-white"
                      : tab.id === "usa"
                      ? "bg-blue-600 text-white"
                      : tab.id === "china"
                      ? "bg-amber-500 text-slate-950 font-black shadow-amber-500/20"
                      : tab.id === "world"
                      ? "bg-slate-700 text-white"
                      : "bg-emerald-600 text-white"
                    : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => loadData(activeTab)}
            title="새로고침"
            className="p-2.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 transition-colors cursor-pointer shadow-sm shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
              <RefreshCw className="w-8 h-8 animate-spin text-emerald-600" />
              <span className="text-xs font-bold tracking-wider">랭킹 기록 불러오는 중...</span>
            </div>
          ) : rankings.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center justify-center gap-3 text-slate-400">
              <Trophy className="w-12 h-12 text-slate-300 dark:text-slate-700" />
              <p className="text-xs font-bold text-slate-600 dark:text-slate-300">등록된 랭킹 기록이 아직 없습니다.</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">코스를 완주하고 첫 랭커가 되어보세요!</p>
            </div>
          ) : (
            <>
              {/* TOP 3 PODIUM DISPLAY (NO PROFILES) */}
              <div className="pt-2 pb-4 px-2 sm:px-6 bg-gradient-to-b from-amber-500/5 via-sky-500/5 to-transparent rounded-3xl border border-slate-200/60 dark:border-slate-800/80">
                <div className="flex items-end justify-center gap-2 sm:gap-6 pt-4">
                  {/* 2ND PLACE (LEFT) */}
                  <div className="flex flex-col items-center w-1/3 max-w-[170px] animate-fade-in">
                    <div className="flex flex-col items-center mb-2">
                      <span className="px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-black shadow-sm mb-1 flex items-center gap-1">
                        🥈 2위
                      </span>
                      <p className="text-xs font-black text-slate-800 dark:text-slate-100 truncate w-full text-center">
                        {rank2 ? rank2.nickname : "도전 대기중"}
                      </p>
                    </div>
                    {/* Pedestal Box 2 */}
                    <div className="w-full py-3 px-2 bg-gradient-to-b from-slate-200 via-slate-100 to-slate-200/90 dark:from-slate-800 dark:to-slate-900 border-t-2 border-slate-300 dark:border-slate-700 rounded-t-2xl flex flex-col items-center justify-center shadow-md gap-0.5">
                      <span className="text-base sm:text-lg font-black text-teal-600 dark:text-teal-400 font-mono">
                        {rank2 ? `${rank2.cpm}타` : "-"}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        {rank2 ? `${rank2.accuracy}% · ${rank2.time_seconds}초` : "-"}
                      </span>
                    </div>
                  </div>

                  {/* 1ST PLACE (CENTER - TALLEST & CROWN) */}
                  <div className="flex flex-col items-center w-1/3 max-w-[190px] animate-fade-in -mt-4">
                    <div className="flex flex-col items-center mb-2">
                      <Crown className="w-7 h-7 text-amber-500 fill-amber-400 drop-shadow-md mb-1 animate-pulse" />
                      <span className="px-3 py-1 rounded-full bg-amber-400 text-amber-950 text-xs font-black shadow-md mb-1 flex items-center gap-1 ring-2 ring-amber-300">
                        🥇 1위
                      </span>
                      <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white truncate w-full text-center">
                        {rank1 ? rank1.nickname : "도전 대기중"}
                      </p>
                    </div>
                    {/* Pedestal Box 1 */}
                    <div className="w-full py-4 px-2 bg-gradient-to-b from-amber-200 via-amber-100 to-amber-200/90 dark:from-amber-950 dark:to-slate-900 border-t-2 border-amber-300 dark:border-amber-700 rounded-t-2xl flex flex-col items-center justify-center shadow-lg gap-1">
                      <span className="text-lg sm:text-xl font-black text-teal-600 dark:text-teal-400 font-mono">
                        {rank1 ? `${rank1.cpm}타` : "-"}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
                        {rank1 ? `${rank1.accuracy}% · ${rank1.time_seconds}초` : "-"}
                      </span>
                    </div>
                  </div>

                  {/* 3RD PLACE (RIGHT) */}
                  <div className="flex flex-col items-center w-1/3 max-w-[170px] animate-fade-in">
                    <div className="flex flex-col items-center mb-2">
                      <span className="px-3 py-1 rounded-full bg-amber-700 text-amber-100 text-xs font-black shadow-sm mb-1 flex items-center gap-1">
                        🥉 3위
                      </span>
                      <p className="text-xs font-black text-slate-800 dark:text-slate-100 truncate w-full text-center">
                        {rank3 ? rank3.nickname : "도전 대기중"}
                      </p>
                    </div>
                    {/* Pedestal Box 3 */}
                    <div className="w-full py-2.5 px-2 bg-gradient-to-b from-orange-200 via-orange-100 to-orange-200/90 dark:from-orange-950 dark:to-slate-900 border-t-2 border-orange-300 dark:border-orange-800 rounded-t-2xl flex flex-col items-center justify-center shadow-md gap-0.5">
                      <span className="text-base sm:text-lg font-black text-teal-600 dark:text-teal-400 font-mono">
                        {rank3 ? `${rank3.cpm}타` : "-"}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        {rank3 ? `${rank3.accuracy}% · ${rank3.time_seconds}초` : "-"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RANKING TABLE - CLEAR COLUMNS FOR RANK, NICKNAME, CPM, ACCURACY, TIME */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-12 px-4 sm:px-6 py-3 bg-slate-100 dark:bg-slate-800/80 text-xs font-black text-slate-600 dark:text-slate-300 tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <span className="col-span-2 text-center flex items-center justify-center gap-1">
                    <Trophy className="w-3.5 h-3.5 text-amber-500" />
                    순위
                  </span>
                  <span className="col-span-4 text-left font-bold">닉네임</span>
                  <span className="col-span-2 text-right flex items-center justify-end gap-1 text-teal-600 dark:text-teal-400">
                    <Zap className="w-3.5 h-3.5" />
                    타자수
                  </span>
                  <span className="col-span-2 text-right flex items-center justify-end gap-1 text-blue-600 dark:text-blue-400">
                    <Target className="w-3.5 h-3.5" />
                    정확도
                  </span>
                  <span className="col-span-2 text-right flex items-center justify-end gap-1 text-purple-600 dark:text-purple-400">
                    <Clock className="w-3.5 h-3.5" />
                    소요시간
                  </span>
                </div>

                {/* Table Rows */}
                <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {rankings.map((r, idx) => {
                    const rank = idx + 1;
                    const isTop1 = rank === 1;
                    const isTop2 = rank === 2;
                    const isTop3 = rank === 3;

                    return (
                      <div
                        key={r.id || `rank-row-${idx}`}
                        className={`grid grid-cols-12 items-center px-4 sm:px-6 py-3 text-xs sm:text-sm transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                          isTop1
                            ? "bg-amber-500/5 font-extrabold"
                            : isTop2
                            ? "bg-slate-500/5 font-bold"
                            : isTop3
                            ? "bg-orange-500/5 font-bold"
                            : ""
                        }`}
                      >
                        {/* Rank Column */}
                        <div className="col-span-2 flex items-center justify-center">
                          {isTop1 ? (
                            <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 font-black text-xs shadow-sm">
                              🥇 1위
                            </span>
                          ) : isTop2 ? (
                            <span className="px-2.5 py-0.5 rounded-full bg-slate-300 text-slate-800 font-black text-xs shadow-sm">
                              🥈 2위
                            </span>
                          ) : isTop3 ? (
                            <span className="px-2.5 py-0.5 rounded-full bg-amber-700 text-amber-100 font-black text-xs shadow-sm">
                              🥉 3위
                            </span>
                          ) : (
                            <span className="font-mono font-bold text-slate-500 dark:text-slate-400 text-xs">
                              {rank}위
                            </span>
                          )}
                        </div>

                        {/* Nickname Column */}
                        <div className="col-span-4 font-bold text-slate-900 dark:text-slate-100 truncate pr-2">
                          {r.nickname || "무명 운행사"}
                        </div>

                        {/* CPM / 타자수 Column */}
                        <div className="col-span-2 text-right font-mono font-black text-teal-600 dark:text-teal-400 text-xs sm:text-sm">
                          {r.cpm} <span className="text-[10px] font-normal text-slate-400">타/분</span>
                        </div>

                        {/* Accuracy / 정확도 Column */}
                        <div className="col-span-2 text-right font-mono font-bold text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
                          {r.accuracy}<span className="text-[10px] font-normal text-slate-400">%</span>
                        </div>

                        {/* Time / 소요시간 Column */}
                        <div className="col-span-2 text-right font-mono font-black text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
                          {r.time_seconds}<span className="text-[10px] font-normal text-slate-400">초</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Info */}
        <div className="px-6 py-3 bg-white/80 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 text-center text-[11px] text-slate-500 dark:text-slate-400 font-mono shrink-0">
          💡 16개 코스를 완주하면 실시간 명예의 전당 랭킹에 자동 등록됩니다. (타자 모드 전용)
        </div>
      </div>
    </div>
  );
};
