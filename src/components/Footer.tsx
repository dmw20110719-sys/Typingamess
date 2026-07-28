import React from "react";
import { Instagram, ExternalLink } from "lucide-react";
import cleanKoreaMapBg from "../assets/images/clean_korea_map_bg_1784937749191.jpg";
import japanMapBg from "../assets/images/japan_red_map_1784975261763.jpg";
import usaMapBg from "../assets/images/usa_soft_blue_map_1784975610776.jpg";
import chinaMapBg from "../assets/images/china_clean_map_bg_1785149923067.jpg";
import cleanWorldMapBg from "../assets/images/world_pure_gray_map_1784975622332.jpg";

interface FooterProps {
  onOpenAbout: () => void;
  onOpenGuide: () => void;
  currentScope?: "korea" | "japan" | "usa" | "china" | "world" | string;
  logoImg?: string;
}

const SCOPE_CONFIGS: Record<string, { bg: string; gradient: string; border: string; hoverText: string }> = {
  korea: {
    bg: cleanKoreaMapBg,
    gradient: "from-[#dceee9]/92 via-[#e4f3ef]/92 to-[#dceee9]/92 dark:from-slate-900/95 dark:via-slate-900/90 dark:to-slate-900/95",
    border: "border-emerald-300/80 dark:border-slate-800/80",
    hoverText: "hover:text-emerald-700 dark:hover:text-emerald-400",
  },
  japan: {
    bg: japanMapBg,
    gradient: "from-[#fce8e8]/92 via-[#fdf2f2]/92 to-[#fce8e8]/92 dark:from-slate-900/95 dark:via-slate-900/90 dark:to-slate-900/95",
    border: "border-rose-300/80 dark:border-slate-800/80",
    hoverText: "hover:text-rose-700 dark:hover:text-rose-400",
  },
  usa: {
    bg: usaMapBg,
    gradient: "from-[#e0f2fe]/92 via-[#f0f9ff]/92 to-[#e0f2fe]/92 dark:from-slate-900/95 dark:via-slate-900/90 dark:to-slate-900/95",
    border: "border-blue-300/80 dark:border-slate-800/80",
    hoverText: "hover:text-blue-700 dark:hover:text-blue-400",
  },
  china: {
    bg: chinaMapBg,
    gradient: "from-[#fef3c7]/92 via-[#fffbeb]/92 to-[#fef3c7]/92 dark:from-slate-900/95 dark:via-slate-900/90 dark:to-slate-900/95",
    border: "border-amber-300/80 dark:border-slate-800/80",
    hoverText: "hover:text-amber-800 dark:hover:text-amber-400",
  },
  world: {
    bg: cleanWorldMapBg,
    gradient: "from-[#f1f5f9]/92 via-[#f8fafc]/92 to-[#f1f5f9]/92 dark:from-slate-900/95 dark:via-slate-900/90 dark:to-slate-900/95",
    border: "border-slate-300/80 dark:border-slate-800/80",
    hoverText: "hover:text-slate-900 dark:hover:text-slate-200",
  },
};

export const Footer: React.FC<FooterProps> = ({ onOpenAbout, onOpenGuide, currentScope = "korea" }) => {
  const scopeConfig = SCOPE_CONFIGS[currentScope] || SCOPE_CONFIGS.korea;

  return (
    <footer className={`w-full relative py-5 px-4 sm:px-10 text-slate-700 dark:text-slate-300 select-none border-t ${scopeConfig.border} mt-auto z-20 overflow-hidden transition-all duration-500`}>
      {/* Map Background Layer matching the current region mode */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 dark:opacity-10 pointer-events-none mix-blend-multiply dark:mix-blend-overlay transition-all duration-500"
        style={{ backgroundImage: `url(${scopeConfig.bg})` }}
      />
      <div className={`absolute inset-0 bg-gradient-to-r ${scopeConfig.gradient} backdrop-blur-sm -z-10 transition-all duration-500`} />

      <div className="max-w-7xl mx-auto flex flex-row items-center justify-between gap-4 relative z-10">
        {/* Left Side: 문의 + Instagram link ONLY */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
          <span className="font-extrabold text-slate-900 dark:text-white">문의</span>
          <a
            href="https://www.instagram.com/z._m1nl?igsh=N2EybXp4ZGRreWhk&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 text-slate-800 dark:text-slate-200 ${scopeConfig.hoverText} underline underline-offset-2 transition-colors cursor-pointer font-bold`}
          >
            <Instagram className="w-4 h-4 text-rose-500 shrink-0" />
            <span>@z._m1nl</span>
            <ExternalLink className="w-3 h-3 opacity-60 shrink-0" />
          </a>
        </div>

        {/* Right Side: 서비스 소개 & 이용안내 */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
          <button
            onClick={onOpenAbout}
            className={`${scopeConfig.hoverText} transition-colors cursor-pointer`}
          >
            서비스 소개
          </button>
          <button
            onClick={onOpenGuide}
            className={`${scopeConfig.hoverText} transition-colors cursor-pointer`}
          >
            이용안내
          </button>
        </div>
      </div>
    </footer>
  );
};


