/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Gauge, Timer } from "lucide-react";
import { PlayStats } from "../types";

interface StatsPanelProps {
  stats: PlayStats;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}.${ms
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 shadow-lg px-6 py-2.5 rounded-full flex items-center justify-center gap-6 select-none text-slate-800 dark:text-slate-100 text-xs font-bold font-sans">
      <div className="flex items-baseline gap-1">
        <span className="text-sm md:text-base font-black text-slate-900 dark:text-white">{stats.cpm}</span>
        <span className="text-slate-500 dark:text-slate-400 text-[11px]">타/분</span>
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-sm md:text-base font-black text-slate-900 dark:text-white">{Math.round((stats.accuracy || 1) * 100)}%</span>
        <span className="text-slate-500 dark:text-slate-400 text-[11px]">정확도</span>
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-sm md:text-base font-black text-slate-900 dark:text-white">{stats.combo || 0}</span>
        <span className="text-slate-500 dark:text-slate-400 text-[11px]">콤보</span>
      </div>

      <div className="flex items-baseline gap-1 font-mono">
        <span className="text-sm md:text-base font-black text-slate-900 dark:text-white tracking-tight">{formatTime(stats.elapsedTime)}</span>
        <span className="text-slate-500 dark:text-slate-400 text-[11px] font-sans">여행시간</span>
      </div>
    </div>
  );
};
