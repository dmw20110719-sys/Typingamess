import React from "react";
import { HelpCircle, X, MapPin, Keyboard, Users, Trophy, Sparkles, Navigation } from "lucide-react";

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in select-none">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-800 dark:text-slate-100 max-h-[88vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-600 dark:text-emerald-400">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">지도 타자 여행 이용 안내</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              지리를 익히며 재미있게 타자 실력을 키우는 최고의 가이드북
            </p>
          </div>
        </div>

        {/* Guide Content Sections */}
        <div className="space-y-4">
          {/* Section 1: Basic Game Logic */}
          <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/50 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2 text-emerald-700 dark:text-emerald-300 font-bold text-sm">
              <Navigation className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>1. 기본 진행 방법</span>
            </div>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 leading-relaxed pl-1">
              <li>• 화면 중앙에 표시되는 <strong>지역(역) 이름</strong>을 한글 또는 영어로 정확히 입력하세요.</li>
              <li>• 입력이 완료되면 열차가 노선을 따라 <strong>자동으로 다음 지역으로 주행</strong>합니다.</li>
              <li>• 지나온 지역은 지도상에 <strong>초록색(또는 진한 회색)</strong>으로 생생하게 색칠됩니다!</li>
            </ul>
          </div>

          {/* Section 2: Modes & Regions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2 text-slate-900 dark:text-slate-100 font-bold text-xs">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span>🇰🇷 대한민국 여행</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                서울·부산 등 16개 광역 지자체부터 230개 시·군·구까지 구석구석 철도로 정복하세요.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2 text-slate-900 dark:text-slate-100 font-bold text-xs">
                <Sparkles className="w-4 h-4 text-sky-500" />
                <span>🌍 전세계 나라 여행</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                아시아, 유럽, 아메리카 등 전 세계 190개 이상의 국가를 입력하고 대륙을 횡단하세요.
              </p>
            </div>
          </div>

          {/* Section 3: Keyboard Shortcuts */}
          <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2 text-slate-900 dark:text-slate-100 font-bold text-xs">
              <Keyboard className="w-4 h-4 text-amber-500" />
              <span>⌨️ 유용한 단축키</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700">
                <kbd className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded text-[11px] font-mono font-bold text-slate-700 dark:text-slate-200">
                  TAB
                </kbd>
                <span className="text-slate-600 dark:text-slate-300 text-[11px]">
                  노선 경로 & 방문 목록 확인
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700">
                <kbd className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded text-[11px] font-mono font-bold text-slate-700 dark:text-slate-200">
                  ESC
                </kbd>
                <span className="text-slate-600 dark:text-slate-300 text-[11px]">
                  팝업 창 및 노선 목록 닫기
                </span>
              </div>
            </div>
          </div>

          {/* Section 4: Special Challenge Modes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-1.5 text-slate-900 dark:text-slate-100 font-bold text-xs">
                <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>👥 실시간 멀티플레이</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                친구 또는 AI 타자 봇들과 같은 노선을 실시간으로 경쟁하며 1등 도착을 겨루세요.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-1.5 text-slate-900 dark:text-slate-100 font-bold text-xs">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>🏆 명예의 전당 랭킹</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                20개 역을 오타 없이 최단시간 완주하면 실시간 랭킹 순위표에 내 기록이 등재됩니다.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            확인했습니다
          </button>
        </div>
      </div>
    </div>
  );
};
