/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Lightbulb, Eye, CheckCircle2, AlertCircle } from "lucide-react";
import { Region } from "../types";
import { playSuccessSound, playErrorSound, initAudio } from "../utils/audio";

const CHOSUNG = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

function getChosungHint(str: string): string {
  if (!str) return "";
  return str
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      if (code >= 0xac00 && code <= 0xd7a3) {
        const choIdx = Math.floor((code - 0xac00) / 588);
        return CHOSUNG[choIdx];
      }
      return char;
    })
    .join("");
}

function checkQuizAnswer(input: string, region: Region | null): boolean {
  if (!input || !region) return false;
  const rawInput = input.trim().toLowerCase().replace(/[\s\.]+/g, "");
  const targetKr = region.name_kr ? region.name_kr.trim().toLowerCase().replace(/[\s\.]+/g, "") : "";
  const targetEn = region.name_en ? region.name_en.trim().toLowerCase().replace(/[\s\.]+/g, "") : "";

  return (targetKr !== "" && rawInput === targetKr) || (targetEn !== "" && rawInput === targetEn);
}

interface QuizConsoleProps {
  currentRegion: Region | null;
  prevRegion?: Region | null;
  remainingCount: number;
  totalCount: number;
  regionLevel?: string;
  onSuccess: () => void;
  onKeystroke: (isError: boolean) => void;
}

export const QuizConsole: React.FC<QuizConsoleProps> = ({
  currentRegion,
  prevRegion,
  remainingCount,
  totalCount,
  regionLevel,
  onSuccess,
  onKeystroke,
}) => {
  const [inputVal, setInputVal] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusText, setStatusText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const isTransitioningRef = useRef(false);

  // Derive theme color styles based on region level
  const isJapan = regionLevel === "japan" || currentRegion?.level === "japan";
  const isUsa = regionLevel === "usa" || currentRegion?.level === "usa";
  const isChina = regionLevel === "china" || currentRegion?.level === "china";
  const isWorld = regionLevel === "world" || currentRegion?.level === "world";

  const themePrimaryBg = isJapan
    ? "bg-rose-600"
    : isUsa
    ? "bg-blue-600"
    : isChina
    ? "bg-amber-500"
    : isWorld
    ? "bg-slate-600"
    : "bg-emerald-600";

  const themePrimaryText = isJapan
    ? "text-rose-600 dark:text-rose-400"
    : isUsa
    ? "text-blue-600 dark:text-blue-400"
    : isChina
    ? "text-amber-600 dark:text-amber-400"
    : isWorld
    ? "text-slate-600 dark:text-slate-300"
    : "text-emerald-600 dark:text-emerald-400";

  const themeBorderFocus = isJapan
    ? "focus:border-rose-500 focus:ring-rose-500/20"
    : isUsa
    ? "focus:border-blue-500 focus:ring-blue-500/20"
    : isChina
    ? "focus:border-amber-500 focus:ring-amber-500/20"
    : isWorld
    ? "focus:border-slate-500 focus:ring-slate-500/20"
    : "focus:border-emerald-500 focus:ring-emerald-500/20";

  const themeCaret = isJapan
    ? "caret-rose-600"
    : isUsa
    ? "caret-blue-600"
    : isChina
    ? "caret-amber-500"
    : isWorld
    ? "caret-slate-600"
    : "caret-emerald-600";

  const clearInputDom = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setInputVal("");
  };

  const handleCorrectTransition = () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    playSuccessSound();
    setStatus("success");
    setStatusText(`🎉 정답! [${currentRegion?.name_kr || ""}]`);

    // Immediately blur input element to force browser IME composition session to terminate
    if (inputRef.current) {
      inputRef.current.blur();
      inputRef.current.value = "";
    }
    setInputVal("");

    // Aggressively wipe leftover IME buffers across microtasks and animation frames
    clearInputDom();
    requestAnimationFrame(clearInputDom);
    setTimeout(clearInputDom, 0);
    setTimeout(clearInputDom, 30);
    setTimeout(clearInputDom, 80);

    setTimeout(() => {
      onSuccess();
    }, 300);
  };

  useEffect(() => {
    setInputVal("");
    setShowHint(false);
    setShowAnswer(false);
    setStatus("idle");
    setStatusText("");
    isTransitioningRef.current = false;

    clearInputDom();

    const t1 = setTimeout(() => {
      clearInputDom();
      if (inputRef.current) {
        inputRef.current.value = "";
        inputRef.current.focus();
      }
    }, 50);

    const t2 = setTimeout(() => {
      clearInputDom();
      if (inputRef.current && document.activeElement !== inputRef.current) {
        inputRef.current.focus();
      }
    }, 120);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [currentRegion]);

  const handleFocus = () => {
    initAudio();
    if (!isTransitioningRef.current && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSubmit = () => {
    if (isTransitioningRef.current || status === "success") return;
    if (!currentRegion || !inputVal.trim()) return;

    const isCorrect = checkQuizAnswer(inputVal, currentRegion);

    if (isCorrect) {
      onKeystroke(false);
      handleCorrectTransition();
    } else {
      playErrorSound();
      setStatus("error");
      setStatusText("❌ 틀렸습니다! 다시 입력해 보세요.");
      onKeystroke(true);
      setTimeout(() => {
        setStatus("idle");
        setStatusText("");
      }, 1500);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isTransitioningRef.current || status === "success") return;

    const val = e.target.value;
    setInputVal(val);
    onKeystroke(false);

    // Auto-check on live typing strictly
    if (currentRegion && checkQuizAnswer(val, currentRegion)) {
      handleCorrectTransition();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleToggleHint = () => {
    setShowHint((prev) => !prev);
    if (inputRef.current) inputRef.current.focus();
  };

  const handleRevealAnswer = () => {
    if (!currentRegion) return;
    setShowAnswer((prev) => !prev);
    if (inputRef.current) inputRef.current.focus();
  };

  // Target name for ghost rendering
  const targetName = currentRegion?.name_kr || "";

  return (
    <div
      onClick={handleFocus}
      className="w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-[28px] px-4 sm:px-6 py-3 md:px-8 md:py-4 shadow-2xl border border-slate-200/90 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 relative cursor-text select-none min-h-[96px] overflow-visible"
    >
      {/* Hint Floating Banner */}
      {showHint && currentRegion && (
        <div className="absolute -top-11 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          <div className="bg-amber-500 text-slate-950 px-4 py-1.5 rounded-full text-xs font-black shadow-lg flex items-center gap-2 animate-bounce">
            <Lightbulb className="w-4 h-4 fill-slate-950" />
            <span>
              초성: <strong>{getChosungHint(currentRegion.name_kr)}</strong> ({currentRegion.region_group})
            </span>
          </div>
        </div>
      )}

      {/* Left spacer / Prev region preview */}
      <div className="flex flex-col items-start min-w-[70px] shrink-0">
        {prevRegion ? (
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-bold text-slate-400">이전 지역</span>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 truncate max-w-[85px]">
              {prevRegion.name_kr}
            </span>
          </div>
        ) : (
          <div className="flex flex-col text-left opacity-30">
            <span className="text-[10px] font-bold text-slate-400">출발</span>
            <span className="text-xs font-bold text-slate-400">-</span>
          </div>
        )}
      </div>

      {/* Main Input Box Area */}
      <div className="flex-1 w-full flex flex-col items-center justify-center relative">
        <div className="w-full max-w-md relative flex items-center justify-center">
          {/* Translucent Ghost Overlay when showAnswer is ON */}
          {showAnswer && targetName && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4 select-none font-black text-lg sm:text-xl font-sans tracking-normal z-10">
              <div className="flex items-center justify-center">
                {targetName.split("").map((targetChar, idx) => {
                  if (idx < inputVal.length) {
                    const typedChar = inputVal[idx];
                    const isMatch = typedChar === targetChar;
                    return (
                      <span
                        key={idx}
                        className={
                          isMatch
                            ? "text-slate-900 dark:text-white"
                            : "text-rose-500 dark:text-rose-400"
                        }
                      >
                        {typedChar}
                      </span>
                    );
                  } else {
                    return (
                      <span
                        key={idx}
                        className="text-slate-400/70 dark:text-slate-500/70 font-black tracking-wider"
                      >
                        {targetChar}
                      </span>
                    );
                  }
                })}
              </div>
            </div>
          )}

          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={showAnswer ? "" : "정답을 입력하세요"}
            className={`w-full bg-slate-50 dark:bg-slate-800 border text-center font-black text-lg sm:text-xl py-3 px-4 rounded-2xl focus:outline-none transition-all ${themeCaret} ${
              showAnswer ? "text-transparent" : "text-slate-800 dark:text-slate-100"
            } ${
              status === "success"
                ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/30"
                : status === "error"
                ? "border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 ring-2 ring-rose-500/30 animate-shake"
                : `border-slate-200 dark:border-slate-700 ring-2 ${themeBorderFocus}`
            }`}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </div>

        {/* Subtext Status or Instruction */}
        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1 select-none flex items-center gap-1">
          {statusText ? (
            <span
              className={`font-bold ${
                status === "success" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500 dark:text-rose-400"
              }`}
            >
              {statusText}
            </span>
          ) : (
            "입력 후 Enter로 제출하세요"
          )}
        </span>
      </div>

      {/* Right Side Buttons & Remaining Badge */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            남은 지역
          </span>
          <span className={`text-sm sm:text-base font-black ${themePrimaryText} font-mono`}>
            {remainingCount}
          </span>
        </div>

        {/* Action Icon Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
          {/* Lightbulb Hint Button */}
          <button
            type="button"
            onClick={handleToggleHint}
            title="힌트 보기"
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              showHint
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-amber-500 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            <Lightbulb className="w-4 h-4" />
          </button>

          {/* Eye Reveal Answer Button */}
          <button
            type="button"
            onClick={handleRevealAnswer}
            title="정답 고스트 보기"
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              showAnswer
                ? `${themePrimaryBg} text-white shadow-sm`
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

