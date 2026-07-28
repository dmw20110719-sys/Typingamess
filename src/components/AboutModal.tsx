import React from "react";
import { Info, X, Globe2, Sparkles, Map, ShieldCheck, Heart } from "lucide-react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  logoImg?: string;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, logoImg }) => {
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
        <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          {logoImg ? (
            <img
              src={logoImg}
              alt="Map Typing Logo"
              className="w-12 h-12 rounded-2xl object-cover shadow-sm border border-slate-200/80 dark:border-slate-700"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-600 dark:text-emerald-400">
              <Info className="w-6 h-6" />
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">MAP TYPING 서비스 소개</h2>
              <span className="px-2 py-0.5 text-[10px] font-black rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300/50">
                v2.5
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              지리 학습과 타자 연습을 결합한 인터랙티브 글로벌 지도 탐색 플랫폼
            </p>
          </div>
        </div>

        {/* Features Content */}
        <div className="space-y-4">
          {/* Main Value Prop */}
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 dark:from-slate-800 dark:via-slate-800/80 dark:to-slate-800/60 border border-emerald-200/60 dark:border-slate-700 rounded-2xl p-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Map Typing은 어떤 서비스인가요?</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Map Typing(지도 타자 연습)</strong>은 단순히 글자를 치는 것에 그치지 않고, 대한민국을 비롯해 일본, 미국, 중국, 전세계 국가의 지명과 위치를 생생한 지도로 실시간 확인하며 즐길 수 있는 <strong>게임형 지리 타자 트레이너</strong>입니다.
            </p>
          </div>

          {/* Grid of Key Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-1.5 text-slate-900 dark:text-slate-100 font-bold text-xs">
                <Globe2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>글로벌 5개 대륙 테마</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                대한민국(시도/시군구), 일본(47 도도부현), 미국(50개 주), 중국(34개 성·직할시), 전세계(190개국) 완벽 지원.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-1.5 text-slate-900 dark:text-slate-100 font-bold text-xs">
                <Map className="w-4 h-4 text-amber-500" />
                <span>정밀 GeoJSON 지도 반응</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                타자 입력에 따라 노선과 방문 지역이 실시간으로 지도 위에 색칠되고 카메라 줌인 효과로 몰입감을 높입니다.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-1.5 text-slate-900 dark:text-slate-100 font-bold text-xs">
                <ShieldCheck className="w-4 h-4 text-sky-500" />
                <span>타자 & 퀴즈 듀얼 모드</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                속도감 넘치는 타자 연습 모드와 국기 및 수도 위치를 맞추는 지리 상식 퀴즈 모드를 손쉽게 전환할 수 있습니다.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-1.5 text-slate-900 dark:text-slate-100 font-bold text-xs">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>명예의 전당 & 멀티 대결</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                전국 유저들과 타자속도(CPM) 및 정확도를 겨루는 실시간 명예의 전당 랭킹과 멀티플레이 경쟁 시스템.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
            Created with passion by Map Typing Team
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
