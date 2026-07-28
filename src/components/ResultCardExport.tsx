import React from "react";
import { Region } from "../types";
import mapTypingLogo from "../assets/images/map_typing_logo_1784782268665.jpg";

interface ResultCardExportProps {
  coursePath: Region[];
  level: string;
  cpm: number;
  elapsedTime: number;
  accuracy: number;
  maxCombo: number;
  formatTravelTime: (secs: number) => string;
}

export const ResultCardExport: React.FC<ResultCardExportProps> = ({
  coursePath,
  level,
  cpm,
  elapsedTime,
  accuracy,
  maxCombo,
  formatTravelTime,
}) => {
  // Title mapping according to level
  const title =
    level === "sido"
      ? "대한민국 전체"
      : level === "sigungu"
      ? "대한민국 시·군·구"
      : level === "japan"
      ? "일본 47개 도도부현"
      : level === "usa"
      ? "미국 50개 주"
      : level === "china"
      ? "중국 성급 행정구"
      : "세계 여행 코스";

  const scopeLabel =
    level === "sido"
      ? "광역 지역"
      : level === "sigungu"
      ? "전국 시·군·구"
      : level === "japan"
      ? "도도부현"
      : level === "usa"
      ? "미국 주"
      : level === "china"
      ? "중국 성"
      : "세계 국가";

  // Geographic projection calculation for coursePath
  const points = coursePath.map((r) => ({ lat: r.lat, lng: r.lng, name: r.name_kr }));
  
  // Default bounds if empty
  const lats = points.length ? points.map((p) => p.lat) : [33, 38.5];
  const lngs = points.length ? points.map((p) => p.lng) : [125, 130];

  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const centerLat = (minLat + maxLat) / 2;
  const lngScale = Math.cos((centerLat * Math.PI) / 180);

  let dLat = maxLat - minLat;
  let dLng = (maxLng - minLng) * lngScale;

  if (dLat < 0.25) dLat = 0.25;
  if (dLng < 0.25) dLng = 0.25;

  // Add 30% margin around route
  const marginFactor = 1.3;
  dLat *= marginFactor;
  dLng *= marginFactor;

  const viewWidth = 480;
  const viewHeight = 440;
  const aspect = viewWidth / viewHeight;

  if (dLng / dLat > aspect) {
    dLat = dLng / aspect;
  } else {
    dLng = dLat * aspect;
  }

  const finalMinLat = centerLat - dLat / 2;
  const finalMaxLat = centerLat + dLat / 2;

  const centerLng = (minLng + maxLng) / 2;
  const finalMinLng = centerLng - (dLng / lngScale) / 2;
  const finalMaxLng = centerLng + (dLng / lngScale) / 2;

  const projectPoint = (lat: number, lng: number) => {
    const x = ((lng - finalMinLng) / (finalMaxLng - finalMinLng)) * viewWidth;
    const y = viewHeight - ((lat - finalMinLat) / (finalMaxLat - finalMinLat)) * viewHeight;
    return { x, y };
  };

  const projectedPoints = points.map((p) => ({
    ...projectPoint(p.lat, p.lng),
    name: p.name,
  }));

  const pathD = projectedPoints.reduce((acc, p, idx) => {
    return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, "");

  return (
    <div
      id="result-card-export-target"
      className="relative w-[1200px] h-[630px] bg-white text-slate-900 p-12 flex items-center justify-between overflow-hidden select-none border border-slate-200 shadow-2xl"
      style={{
        fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
        backgroundImage: `
          linear-gradient(to right, rgba(16, 185, 129, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(16, 185, 129, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: "32px 32px",
      }}
    >
      {/* Background radial gradient accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100/60 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-50/80 rounded-full blur-[120px] pointer-events-none" />

      {/* Left Column: Header, Title, CPM, Stats */}
      <div className="flex flex-col justify-between h-full w-[540px] z-10 py-2">
        <div>
          {/* Brand Header with real logo */}
          <div className="flex items-center gap-3.5 mb-8">
            <img
              src={mapTypingLogo}
              alt="MAP TYPING Logo"
              className="w-14 h-14 object-contain drop-shadow-md"
            />
            <div>
              <div className="text-2xl font-black text-slate-900 tracking-wider leading-none font-mono">
                MAP TYPING
              </div>
              <div className="text-sm font-bold text-emerald-600 font-mono mt-1">
                maptyping.com
              </div>
            </div>
          </div>

          {/* Record Tag */}
          <div className="text-sm font-extrabold text-emerald-600 tracking-wider mb-1 uppercase">
            완주 기록
          </div>

          {/* Region / Course Title */}
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
            {title}
          </h1>

          {/* Speed Metric */}
          <div className="flex items-baseline gap-3 mb-1">
            <span className="text-7xl font-mono font-black text-emerald-600 tracking-tight drop-shadow-xs">
              {cpm}
            </span>
            <span className="text-2xl font-extrabold text-slate-700">타/분</span>
          </div>

          {/* Scope label */}
          <div className="text-sm font-bold text-slate-500 tracking-wide">
            {scopeLabel}
          </div>
        </div>

        {/* Bottom Metrics Grid (4 columns) */}
        <div className="grid grid-cols-4 gap-4 border-t border-slate-200 pt-6">
          <div>
            <div className="text-xs font-bold text-slate-400 mb-1">여행시간</div>
            <div className="text-2xl font-mono font-extrabold text-slate-900">
              {formatTravelTime(elapsedTime)}
            </div>
          </div>

          <div>
            <div className="text-xs font-bold text-slate-400 mb-1">정확도</div>
            <div className="text-2xl font-mono font-extrabold text-slate-900">
              {Math.round(accuracy * 100)}%
            </div>
          </div>

          <div>
            <div className="text-xs font-bold text-slate-400 mb-1">통과 지역</div>
            <div className="text-2xl font-mono font-extrabold text-slate-900">
              {coursePath.length}곳
            </div>
          </div>

          <div>
            <div className="text-xs font-bold text-slate-400 mb-1">최고 콤보</div>
            <div className="text-2xl font-mono font-extrabold text-slate-900">
              {maxCombo}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Map Frame */}
      <div className="w-[520px] h-[520px] z-10 flex flex-col justify-between">
        <div className="w-full h-[480px] bg-emerald-50/40 border border-emerald-200/80 rounded-[32px] p-4 shadow-sm relative overflow-hidden flex flex-col items-center justify-center">
          {/* Subtle grid pattern inside map box */}
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(16, 185, 129, 0.12) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(16, 185, 129, 0.12) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />

          {/* Route Map SVG Canvas */}
          <div className="relative w-full h-full flex items-center justify-center">
            <svg
              viewBox={`0 0 ${viewWidth} ${viewHeight}`}
              className="w-full h-full"
            >
              {/* Outer Glow Path */}
              {pathD && (
                <path
                  d={pathD}
                  fill="none"
                  stroke="#a7f3d0"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.8"
                />
              )}

              {/* Main Course Path Line */}
              {pathD && (
                <path
                  d={pathD}
                  fill="none"
                  stroke="#059669"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Station Dots and Labels */}
              {projectedPoints.map((pt, i) => {
                const isStart = i === 0;
                const isEnd = i === projectedPoints.length - 1;
                return (
                  <g key={i}>
                    {/* Node Dot */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isStart || isEnd ? "8" : "5"}
                      fill={isStart ? "#10b981" : isEnd ? "#ef4444" : "#047857"}
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      className="drop-shadow-sm"
                    />

                    {/* Node Station Name Text */}
                    <text
                      x={pt.x}
                      y={pt.y - 10}
                      textAnchor="middle"
                      fill={isStart ? "#047857" : isEnd ? "#b91c1c" : "#334155"}
                      fontSize={isStart || isEnd ? "13" : "11"}
                      fontWeight={isStart || isEnd ? "bold" : "600"}
                      style={{
                        paintOrder: "stroke",
                        stroke: "#ffffff",
                        strokeWidth: "3px",
                        strokeLinejoin: "round",
                      }}
                    >
                      {pt.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Footer attribution text */}
        <div className="text-[11px] font-sans text-slate-400 font-medium text-right pr-2">
          행정경계 © OpenStreetMap contributors · Open Database License (ODbL) 1.0
        </div>
      </div>
    </div>
  );
};
