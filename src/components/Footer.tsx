import React from "react";
import { Instagram, ExternalLink } from "lucide-react";

interface FooterProps {
  onOpenAbout: () => void;
  onOpenGuide: () => void;
  currentScope?: "korea" | "japan" | "usa" | "china" | "world" | string;
  logoImg?: string;
}

const SCOPE_CONFIGS: Record<string, { bgClass: string; border: string; hoverText: string }> = {
  korea: {
    bgClass: "bg-[#dceee9]/95 dark:bg-slate-900/95 backdrop-blur-md",
    border: "border-emerald-900/10 dark:border-slate-800/60",
    hoverText: "hover:text-emerald-700 dark:hover:text-emerald-400",
  },
  japan: {
    bgClass: "bg-rose-50/95 dark:bg-slate-900/95 backdrop-blur-md",
    border: "border-rose-900/10 dark:border-slate-800/60",
    hoverText: "hover:text-rose-700 dark:hover:text-rose-400",
  },
  usa: {
    bgClass: "bg-blue-50/95 dark:bg-slate-900/95 backdrop-blur-md",
    border: "border-blue-900/10 dark:border-slate-800/60",
    hoverText: "hover:text-blue-700 dark:hover:text-blue-400",
  },
  china: {
    bgClass: "bg-amber-50/95 dark:bg-slate-900/95 backdrop-blur-md",
    border: "border-amber-900/10 dark:border-slate-800/60",
    hoverText: "hover:text-amber-800 dark:hover:text-amber-400",
  },
  world: {
    bgClass: "bg-slate-100/95 dark:bg-slate-900/95 backdrop-blur-md",
    border: "border-slate-900/10 dark:border-slate-800/60",
    hoverText: "hover:text-slate-900 dark:hover:text-slate-200",
  },
};

export const Footer: React.FC<FooterProps> = ({ onOpenAbout, onOpenGuide, currentScope = "korea" }) => {
  const scopeConfig = SCOPE_CONFIGS[currentScope] || SCOPE_CONFIGS.korea;

  return (
    <footer className={`w-full relative py-4 px-4 sm:px-10 text-slate-700 dark:text-slate-300 select-none border-t ${scopeConfig.border} ${scopeConfig.bgClass} mt-auto z-20 transition-all duration-500`}>
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


