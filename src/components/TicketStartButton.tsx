import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Plane, Globe, Ticket, Scissors } from "lucide-react";
import { playTicketTearSound } from "../utils/audio";

interface TicketStartButtonProps {
  homeScope: "korea" | "japan" | "usa" | "china" | "world";
  level: string;
  travelWay: "typing" | "quiz";
  isRankingChallenge: boolean;
  nickname: string;
  targetCount: number;
  onStart: () => void;
  onValidateRanking?: () => boolean;
}

interface ScopeTheme {
  topStripe: string;
  logoBg: string;
  logoText: string;
  flightLine: string;
  planeColor: string;
  cardBg: string;
  cardBorder: string;
  planeBg: string;
}

const scopeThemes: Record<string, ScopeTheme> = {
  korea: {
    topStripe: "bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400",
    logoBg: "bg-emerald-600 text-white",
    logoText: "text-emerald-700 dark:text-emerald-400",
    flightLine: "border-emerald-300 dark:border-emerald-800/80",
    planeColor: "text-emerald-600 dark:text-emerald-400",
    planeBg: "bg-[#f4faf7] dark:bg-slate-900",
    cardBg: "bg-[#f4faf7] dark:bg-slate-900",
    cardBorder: "border-emerald-200 dark:border-emerald-950",
  },
  japan: {
    topStripe: "bg-gradient-to-r from-red-700 via-rose-500 to-amber-500",
    logoBg: "bg-rose-600 text-white",
    logoText: "text-rose-700 dark:text-rose-400",
    flightLine: "border-rose-300 dark:border-rose-800/80",
    planeColor: "text-rose-600 dark:text-rose-400",
    planeBg: "bg-[#fdfafb] dark:bg-slate-900",
    cardBg: "bg-[#fdfafb] dark:bg-slate-900",
    cardBorder: "border-rose-200 dark:border-rose-950",
  },
  usa: {
    topStripe: "bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-400",
    logoBg: "bg-blue-600 text-white",
    logoText: "text-blue-700 dark:text-blue-400",
    flightLine: "border-blue-300 dark:border-blue-800/80",
    planeColor: "text-blue-600 dark:text-blue-400",
    planeBg: "bg-[#f5f8fc] dark:bg-slate-900",
    cardBg: "bg-[#f5f8fc] dark:bg-slate-900",
    cardBorder: "border-blue-200 dark:border-blue-950",
  },
  china: {
    topStripe: "bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-400",
    logoBg: "bg-amber-500 text-slate-950",
    logoText: "text-amber-800 dark:text-amber-400",
    flightLine: "border-amber-300 dark:border-amber-800/80",
    planeColor: "text-amber-600 dark:text-amber-400",
    planeBg: "bg-[#fdfbf7] dark:bg-slate-900",
    cardBg: "bg-[#fdfbf7] dark:bg-slate-900",
    cardBorder: "border-amber-200 dark:border-amber-950",
  },
  world: {
    topStripe: "bg-gradient-to-r from-slate-700 via-slate-600 to-amber-500",
    logoBg: "bg-slate-700 text-white",
    logoText: "text-slate-700 dark:text-slate-300",
    flightLine: "border-slate-300 dark:border-slate-700",
    planeColor: "text-slate-600 dark:text-slate-400",
    planeBg: "bg-[#f8fafc] dark:bg-slate-900",
    cardBg: "bg-[#f8fafc] dark:bg-slate-900",
    cardBorder: "border-slate-200 dark:border-slate-800",
  },
};

export const TicketStartButton: React.FC<TicketStartButtonProps> = ({
  homeScope,
  level,
  travelWay,
  isRankingChallenge,
  nickname,
  targetCount,
  onStart,
  onValidateRanking,
}) => {
  const [isTearing, setIsTearing] = useState(false);
  const [boardingTime, setBoardingTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      setBoardingTime(`${hrs}:${mins}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  // Theme configuration based on country scope
  const theme = scopeThemes[homeScope] || scopeThemes.korea;

  // Destination code and Korean name mapping
  const destinationMap = {
    korea: { code: "KOR", kr: "대한민국" },
    japan: { code: "JPN", kr: "일본" },
    usa: { code: "USA", kr: "미국" },
    china: { code: "CHN", kr: "중국" },
    world: { code: "WLD", kr: "전세계" },
  };

  const dest = destinationMap[homeScope] || destinationMap.korea;

  // Unit string mapping
  let unitText = "구역";
  if (homeScope === "korea") {
    unitText = level === "sido" ? "광역시도" : "시군구";
  } else if (homeScope === "japan") {
    unitText = "도도부현";
  } else if (homeScope === "usa") {
    unitText = "50개 주";
  } else if (homeScope === "china") {
    unitText = "성·행정구";
  } else if (homeScope === "world") {
    unitText = "세계 국가";
  }

  const handleTicketClick = () => {
    if (isTearing) return;

    if (onValidateRanking && !onValidateRanking()) {
      return;
    }

    playTicketTearSound();
    setIsTearing(true);

    setTimeout(() => {
      onStart();
      setTimeout(() => setIsTearing(false), 500);
    }, 480);
  };

  return (
    <div className="w-full relative select-none pt-1">
      {/* Flight Boarding Pass Card Wrapper */}
      <div
        className={`relative w-full ${theme.cardBg} border ${theme.cardBorder} rounded-3xl shadow-xl overflow-hidden flex flex-col transition-all hover:shadow-2xl`}
      >
        {/* Top Airline Accent Stripe */}
        <div className={`h-1.5 w-full ${theme.topStripe}`} />

        <div className="flex flex-row items-stretch min-h-[170px] relative">
          {/* ================= LEFT MAIN TICKET BODY ================= */}
          <motion.div
            animate={
              isTearing
                ? {
                    x: [0, -5, 2, -1, 0],
                    rotate: [0, -0.6, 0.3, 0],
                  }
                : { x: 0, rotate: 0 }
            }
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex-1 p-3.5 sm:p-4 md:p-5 flex flex-col justify-between relative"
          >
            {/* Header row */}
            <div className="flex items-center justify-between gap-2 border-b border-slate-200/70 dark:border-slate-800 pb-2">
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-5 h-5 rounded-md ${theme.logoBg} flex items-center justify-center font-bold shadow-xs`}
                >
                  <Globe className="w-3.5 h-3.5" />
                </div>
                <span className={`text-xs font-black tracking-wider ${theme.logoText} font-mono`}>
                  MAP TYPING
                </span>
              </div>
              <div className="text-right">
                <div className="text-[11px] font-black text-slate-800 dark:text-slate-200 tracking-tight leading-none">
                  탑승권
                </div>
                <div className="text-[8px] font-mono font-bold text-slate-400 tracking-widest uppercase">
                  BOARDING PASS
                </div>
              </div>
            </div>

            {/* Route row: ROOM ---- ✈ ---- DEST */}
            <div className="my-2.5 flex items-center justify-between px-1">
              <div className="text-left">
                <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tighter">
                  ROOM
                </div>
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  방구석
                </div>
              </div>

              {/* Dotted Flight Line & Plane */}
              <div className="flex-1 mx-3 flex items-center justify-center relative">
                <div className={`w-full border-b-2 border-dashed ${theme.flightLine}`} />
                <div className={`absolute p-1 ${theme.planeBg} ${theme.planeColor}`}>
                  <Plane className="w-4 h-4 rotate-90 stroke-[2.5]" />
                </div>
              </div>

              <div className="text-right">
                <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tighter">
                  {dest.code}
                </div>
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  {dest.kr}
                </div>
              </div>
            </div>

            {/* Divider line */}
            <div className="w-full border-t border-dashed border-slate-200 dark:border-slate-800 my-1" />

            {/* Details Grid (4 items) */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-left pt-1">
              <div>
                <div className="text-[9px] font-bold text-slate-400 dark:text-slate-500 tracking-wider">
                  탑승객 <span className="font-mono text-[8px] text-slate-400">PASSENGER</span>
                </div>
                <div className="text-xs font-black text-slate-800 dark:text-slate-100 truncate">
                  {nickname.trim() || "방구석 여행자"}
                </div>
              </div>

              <div>
                <div className="text-[9px] font-bold text-slate-400 dark:text-slate-500 tracking-wider">
                  방식 <span className="font-mono text-[8px] text-slate-400">CLASS</span>
                </div>
                <div className="text-xs font-black text-slate-800 dark:text-slate-100 truncate">
                  {travelWay === "quiz"
                    ? "퀴즈 연습"
                    : isRankingChallenge
                    ? "타자 (랭킹)"
                    : "타자 연습"}
                </div>
              </div>

              <div>
                <div className="text-[9px] font-bold text-slate-400 dark:text-slate-500 tracking-wider">
                  단위 <span className="font-mono text-[8px] text-slate-400">UNIT</span>
                </div>
                <div className="text-xs font-black text-slate-800 dark:text-slate-100 truncate">
                  {unitText}
                </div>
              </div>

              <div>
                <div className="text-[9px] font-bold text-slate-400 dark:text-slate-500 tracking-wider">
                  지역 <span className="font-mono text-[8px] text-slate-400">STOPS</span>
                </div>
                <div className="text-xs font-black text-slate-800 dark:text-slate-100">
                  {targetCount}곳
                </div>
              </div>
            </div>
          </motion.div>

          {/* ================= SEAM NOTCHES & DASHED PERFORATION ================= */}
          <div className="relative w-0 flex items-center justify-center z-10 select-none">
            {/* Top semicircle cutout */}
            <div className="absolute -top-2 -translate-x-1/2 w-4 h-4 bg-slate-100 dark:bg-slate-950 rounded-full border-b border-slate-300 dark:border-slate-800 shadow-inner" />
            {/* Bottom semicircle cutout */}
            <div className="absolute -bottom-2 -translate-x-1/2 w-4 h-4 bg-slate-100 dark:bg-slate-950 rounded-full border-t border-slate-300 dark:border-slate-800 shadow-inner" />
            {/* Vertical dashed perforation line */}
            <div className="h-full border-r-2 border-dashed border-slate-300 dark:border-slate-700" />
          </div>

          {/* ================= RIGHT BLACK STUB (DEPARTURE / TEAR STUB) ================= */}
          <motion.button
            type="button"
            onClick={handleTicketClick}
            animate={
              isTearing
                ? {
                    x: [0, 5, 42, 150, 300],
                    y: [0, -8, 22, 60, 120],
                    rotate: [0, -6, 14, 30, 48],
                    skewY: [0, -5, 9, 4, 0],
                    opacity: [1, 1, 0.9, 0.5, 0],
                    scale: [1, 1.02, 1.04, 0.92, 0.82],
                  }
                : { x: 0, y: 0, rotate: 0, skewY: 0, opacity: 1, scale: 1 }
            }
            transition={{
              duration: 0.52,
              times: [0, 0.12, 0.38, 0.72, 1],
              ease: ["easeInOut", "easeIn", "easeIn", "easeOut"],
            }}
            className={`w-28 sm:w-32 md:w-36 bg-slate-950 dark:bg-slate-950 text-white flex flex-col items-center justify-between p-3.5 relative cursor-pointer group hover:bg-slate-900 transition-colors shrink-0 rounded-r-3xl border-l border-slate-800 select-none overflow-hidden ${
              isTearing ? "pointer-events-none" : ""
            }`}
          >
            {/* Tear Line Flash / Spark line on rip */}
            {isTearing && (
              <motion.div
                initial={{ height: "0%", opacity: 1 }}
                animate={{ height: "100%", opacity: [1, 0.8, 0] }}
                transition={{ duration: 0.22 }}
                className="absolute left-0 top-0 w-1 bg-white/90 shadow-[0_0_10px_rgba(255,255,255,1)] z-30"
              />
            )}

            {/* Scissor / Tear Hint */}
            <div className="absolute top-2 left-2 text-slate-500 opacity-60 group-hover:opacity-100 transition-opacity">
              <Scissors className="w-3 h-3 -rotate-90" />
            </div>

            {/* Stub Content */}
            <div className="flex flex-col items-center justify-center my-auto text-center w-full">
              <span className="text-xl sm:text-2xl font-black tracking-widest text-white group-hover:text-amber-400 transition-colors drop-shadow-sm">
                출발
              </span>
              <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase mt-0.5">
                BOARDING
              </span>
              <span className="text-xs sm:text-sm font-mono font-extrabold text-slate-200 mt-1">
                {boardingTime || "11:03"}
              </span>
            </div>

            {/* Decorative Barcode graphic */}
            <div className="w-full flex justify-between items-end h-6 px-1.5 opacity-60 group-hover:opacity-90 transition-opacity mt-1">
              {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 3, 1, 4, 2, 1].map((w, idx) => (
                <div
                  key={idx}
                  className="bg-slate-300 dark:bg-slate-400 rounded-xs h-full"
                  style={{ width: `${w * 1.5}px` }}
                />
              ))}
            </div>

            {/* Hover ripple overlay */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-r-3xl transition-opacity pointer-events-none" />
          </motion.button>
        </div>
      </div>

      {/* Sub-label under ticket */}
      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium text-center mt-2 flex items-center justify-center gap-1">
        <Ticket className="w-3 h-3" />
        <span>우측 검정색 티켓 [출발]을 뜯으면 주행이 시작됩니다.</span>
      </p>
    </div>
  );
};
