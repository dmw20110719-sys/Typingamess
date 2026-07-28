import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, X, Sliders, Check, Music, Keyboard, Navigation, Ticket } from "lucide-react";
import {
  getSoundVolume,
  setSoundVolume,
  getSoundEnabled,
  setSoundEnabled,
  playSuccessSound,
} from "../utils/audio";
import { VehicleType, VEHICLE_LIST, getVehicleColorScheme } from "../utils/vehicleAvatars";
import { VehicleCardPreview } from "./VehicleCardPreview";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  advanceMode?: "auto" | "manual";
  onUpdateAdvanceMode?: (mode: "auto" | "manual") => void;
  vehicleType?: VehicleType;
  onUpdateVehicleType?: (vehicle: VehicleType) => void;
  startButtonStyle?: "ticket" | "simple";
  onUpdateStartButtonStyle?: (style: "ticket" | "simple") => void;
  regionLevel?: string;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  advanceMode = "auto",
  onUpdateAdvanceMode,
  vehicleType = "subway",
  onUpdateVehicleType,
  startButtonStyle = "ticket",
  onUpdateStartButtonStyle,
  regionLevel,
}) => {
  const [volume, setVolumeState] = useState<number>(0.5);
  const [enabled, setEnabledState] = useState<boolean>(true);

  // Get active vehicle color scheme matching current region level
  const vScheme = getVehicleColorScheme(regionLevel);

  // Derive theme colors
  const isJapan = regionLevel === "japan";
  const isUsa = regionLevel === "usa";
  const isChina = regionLevel === "china";
  const isWorld = regionLevel === "world";

  const themePrimaryBg = isChina
    ? "bg-amber-500 hover:bg-amber-600 text-slate-950 font-black shadow-amber-500/20"
    : isJapan
    ? "bg-rose-600 hover:bg-rose-500 text-white"
    : isUsa
    ? "bg-blue-600 hover:bg-blue-500 text-white"
    : isWorld
    ? "bg-slate-700 hover:bg-slate-600 text-white"
    : "bg-emerald-600 hover:bg-emerald-500 text-white";

  const themePrimaryBorder = isChina
    ? "border-amber-500"
    : isJapan
    ? "border-rose-600"
    : isUsa
    ? "border-blue-600"
    : isWorld
    ? "border-slate-700"
    : "border-emerald-600";

  const themePrimaryText = isChina
    ? "text-amber-500 dark:text-amber-400 font-extrabold"
    : isJapan
    ? "text-rose-600 dark:text-rose-400"
    : isUsa
    ? "text-blue-600 dark:text-blue-400"
    : isWorld
    ? "text-slate-600 dark:text-slate-300 font-bold"
    : "text-emerald-600 dark:text-emerald-400";

  const themeIconBg = isChina
    ? "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800"
    : isJapan
    ? "bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-800"
    : isUsa
    ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800"
    : isWorld
    ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
    : "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800";

  const themeAccentClass = isChina
    ? "accent-amber-500"
    : isJapan
    ? "accent-rose-600"
    : isUsa
    ? "accent-blue-600"
    : isWorld
    ? "accent-slate-700"
    : "accent-emerald-600";

  useEffect(() => {
    if (isOpen) {
      setVolumeState(getSoundVolume());
      setEnabledState(getSoundEnabled());
    }
  }, [isOpen]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolumeState(val);
    setSoundVolume(val);
  };

  const handleToggleEnabled = () => {
    const next = !enabled;
    setEnabledState(next);
    setSoundEnabled(next);
  };

  const testAudio = () => {
    playSuccessSound();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 dark:bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl text-slate-800 dark:text-slate-100 my-auto max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl border ${themeIconBg}`}>
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-white">환경 설정</h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">이동수단 캐릭터, 타이핑 제출 방식 및 효과음 설정</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Settings Form */}
        <div className="py-4 flex flex-col gap-5">
          {/* SECTION 1: VEHICLE SELECTION (이동수단) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                <Navigation className={`w-4 h-4 ${themePrimaryText}`} />
                <span>이동수단</span>
              </h3>
              <span className="text-[11px] text-slate-400 font-medium">지도 위 운행 캐릭터 선택</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {VEHICLE_LIST.map((item) => {
                const isSelected = vehicleType === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onUpdateVehicleType?.(item.id)}
                    className={`relative rounded-2xl p-3 flex flex-col items-center justify-between transition-all cursor-pointer border ${
                      isSelected
                        ? `bg-white dark:bg-slate-900 border-2 ${themePrimaryBorder} shadow-md ring-2 ring-emerald-500/10`
                        : "bg-slate-50/80 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {/* Vehicle Preview Avatar */}
                    <VehicleCardPreview type={item.id} regionLevel={regionLevel} />

                    {/* Title & Subtitle */}
                    <div className="text-center my-1.5 w-full">
                      <div className="text-xs font-black text-slate-900 dark:text-white">{item.name}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-tight mt-0.5 line-clamp-2 px-0.5">
                        {item.subtitle}
                      </div>
                    </div>

                    {/* Selected Badge Pill */}
                    {isSelected ? (
                      <div className={`mt-1 py-1 px-3 rounded-full text-[10px] font-extrabold flex items-center justify-center gap-1 shadow-xs ${vScheme.tailwindPill}`}>
                        <Check className="w-3 h-3 stroke-[3]" />
                        <span>선택됨</span>
                      </div>
                    ) : (
                      <div className="mt-1 h-6" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 1.5: START BUTTON STYLE SELECTION */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2.5">
              <Ticket className={`w-5 h-5 ${themePrimaryText} shrink-0`} />
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">출발 버튼 스타일 (Start Button UI)</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">홈 화면의 출발 버튼 디자인 선택</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => onUpdateStartButtonStyle?.("ticket")}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  startButtonStyle === "ticket"
                    ? `${themePrimaryBg} text-white ${themePrimaryBorder} shadow-sm`
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                }`}
              >
                <span>🎫 비행기 탑승권</span>
                {startButtonStyle === "ticket" && <Check className="w-3.5 h-3.5 shrink-0" />}
              </button>

              <button
                type="button"
                onClick={() => onUpdateStartButtonStyle?.("simple")}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  startButtonStyle === "simple"
                    ? `${themePrimaryBg} text-white ${themePrimaryBorder} shadow-sm`
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                }`}
              >
                <span>🔘 기본 버튼</span>
                {startButtonStyle === "simple" && <Check className="w-3.5 h-3.5 shrink-0" />}
              </button>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center font-medium">
              {startButtonStyle === "ticket"
                ? "✈️ 실제 여행 탑승권 스타일로 우측 검정 티켓을 뜯어 출발합니다."
                : "🔘 심플한 단일 컬러 버튼 형태로 출발합니다."}
            </p>
          </div>

          {/* SECTION 2: Next Region Advance / Completion Mode */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2.5">
              <Keyboard className={`w-5 h-5 ${themePrimaryText} shrink-0`} />
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">다음 지역 이동 방식</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">지명 입력 후 다음 지점으로 넘어가는 조건 설정</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => onUpdateAdvanceMode?.("auto")}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  advanceMode === "auto"
                    ? `${themePrimaryBg} text-white ${themePrimaryBorder} shadow-sm`
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                }`}
              >
                <span>⚡ 자동 완료</span>
                {advanceMode === "auto" && <Check className="w-3.5 h-3.5 shrink-0" />}
              </button>

              <button
                type="button"
                onClick={() => onUpdateAdvanceMode?.("manual")}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  advanceMode === "manual"
                    ? `${themePrimaryBg} text-white ${themePrimaryBorder} shadow-sm`
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                }`}
              >
                <span>⌨️ 수동 제출</span>
                {advanceMode === "manual" && <Check className="w-3.5 h-3.5 shrink-0" />}
              </button>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center font-medium">
              {advanceMode === "auto"
                ? "💡 정확하게 글자를 다 적으면 자동으로 다음 지역으로 넘어갑니다."
                : "💡 정확하게 글자를 적은 후 [Space] 또는 [Enter] 키를 눌러 넘어갑니다."}
            </p>
          </div>

          {/* SECTION 3: Sound On/Off Toggle */}
          <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              {enabled && volume > 0 ? (
                <Volume2 className={`w-5 h-5 ${themePrimaryText}`} />
              ) : (
                <VolumeX className="w-5 h-5 text-slate-400" />
              )}
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">효과음 활성화</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">타이핑 및 정답 성공 소리</span>
              </div>
            </div>

            <button
              onClick={handleToggleEnabled}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                enabled ? themePrimaryBg.split(" ")[0] : "bg-slate-300 dark:bg-slate-700"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform absolute top-0.5 ${
                  enabled ? "left-6" : "left-0.5"
                }`}
              />
            </button>
          </div>

          {/* SECTION 4: Volume Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                효과음 크기 (Sound Volume)
              </span>
              <span className={`font-mono ${themePrimaryText}`}>{Math.round(volume * 100)}%</span>
            </div>

            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={enabled ? volume : 0}
              disabled={!enabled}
              onChange={handleVolumeChange}
              className={`w-full ${themeAccentClass} cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg disabled:opacity-40`}
            />

            <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono">
              <span>음소거 (0%)</span>
              <span>보통 (50%)</span>
              <span>최대 (100%)</span>
            </div>
          </div>

          {/* Sound Test Button */}
          <button
            onClick={testAudio}
            disabled={!enabled || volume === 0}
            className="py-2.5 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl border border-slate-200 dark:border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Volume2 className={`w-4 h-4 ${themePrimaryText}`} />
            <span>효과음 테스트 들어보기</span>
          </button>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className={`py-2.5 px-6 ${themePrimaryBg} text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer`}
          >
            <Check className="w-4 h-4" />
            <span>확인</span>
          </button>
        </div>
      </div>
    </div>
  );
};

