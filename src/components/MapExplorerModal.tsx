import React, { useState, useMemo } from "react";
import { X, Search, Globe, Compass } from "lucide-react";
import { Region } from "../types";
import { Map } from "./Map";

interface MapExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  sidoList: Region[];
  sigunguList: Region[];
  japanList?: Region[];
  usaList?: Region[];
  chinaList?: Region[];
  worldList: Region[];
}

type ExplorerLevel = "sido" | "sigungu" | "japan" | "usa" | "china" | "world";

export const MapExplorerModal: React.FC<MapExplorerModalProps> = ({
  isOpen,
  onClose,
  sidoList,
  sigunguList,
  japanList = [],
  usaList = [],
  chinaList = [],
  worldList,
}) => {
  const [level, setLevel] = useState<ExplorerLevel>("sido");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  const currentList = useMemo(() => {
    if (level === "sido") return sidoList;
    if (level === "sigungu") return sigunguList;
    if (level === "japan") return japanList;
    if (level === "usa") return usaList;
    if (level === "china") return chinaList;
    return worldList;
  }, [level, sidoList, sigunguList, japanList, usaList, chinaList, worldList]);

  const filteredRegions = useMemo(() => {
    if (!searchTerm.trim()) return currentList;
    const term = searchTerm.toLowerCase();
    return currentList.filter(
      (r) =>
        r.name_kr.toLowerCase().includes(term) ||
        r.name_en.toLowerCase().includes(term) ||
        r.region_group.toLowerCase().includes(term)
    );
  }, [currentList, searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in select-none">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-5xl w-full h-[88vh] flex flex-col shadow-2xl overflow-hidden text-slate-800 dark:text-slate-100">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow-sm">
              <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: "12s" }} />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">지도 탐색기 (한국 · 일본 · 미국 · 전세계)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">지도의 지역/국가 이름을 확인하고 위치를 살펴보세요</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Level Selector Tabs & Search Filter */}
        <div className="px-6 py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 overflow-x-auto">
          {/* Tabs */}
          <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl flex gap-1 w-full sm:w-auto shrink-0 overflow-x-auto">
            <button
              onClick={() => {
                setLevel("sido");
                setSelectedRegion(null);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                level === "sido"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <span>🇰🇷 한국 광역</span>
            </button>

            <button
              onClick={() => {
                setLevel("sigungu");
                setSelectedRegion(null);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                level === "sigungu"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <span>🇰🇷 시·군·구</span>
            </button>

            <button
              onClick={() => {
                setLevel("japan");
                setSelectedRegion(null);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                level === "japan"
                  ? "bg-rose-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <span>🇯🇵 일본 ({japanList.length})</span>
            </button>

            <button
              onClick={() => {
                setLevel("usa");
                setSelectedRegion(null);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                level === "usa"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <span>🇺🇸 미국 ({usaList.length})</span>
            </button>

            <button
              onClick={() => {
                setLevel("china");
                setSelectedRegion(null);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                level === "china"
                  ? "bg-amber-500 text-slate-950 font-black shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <span>🇨🇳 중국 ({chinaList.length})</span>
            </button>

            <button
              onClick={() => {
                setLevel("world");
                setSelectedRegion(null);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                level === "world"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>🌐 전세계 ({worldList.length})</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="지역/주/도시 검색..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Content Body: Map + List Split View */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          {/* Map Section (Col 8) */}
          <div className="md:col-span-8 h-64 md:h-full relative border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
            <Map
              regions={filteredRegions}
              activeRegion={selectedRegion || undefined}
              visitedRegions={selectedRegion ? [selectedRegion] : []}
              showSimple={true}
              regionLevel={level}
            />
          </div>

          {/* Region List Section (Col 4) */}
          <div className="md:col-span-4 h-full flex flex-col bg-slate-50/50 dark:bg-slate-900/50 overflow-hidden">
            <div className="p-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between text-xs font-bold text-slate-500">
              <span>목록 ({filteredRegions.length}개)</span>
              {selectedRegion && (
                <button
                  onClick={() => setSelectedRegion(null)}
                  className="text-emerald-600 dark:text-emerald-400 hover:underline text-[11px]"
                >
                  선택 해제
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {filteredRegions.length === 0 ? (
                <div className="text-center py-12 text-xs text-slate-400">
                  검색 결과가 없습니다.
                </div>
              ) : (
                filteredRegions.map((region) => {
                  const isSelected = selectedRegion?.id === region.id;
                  return (
                    <button
                      key={region.id}
                      onClick={() => setSelectedRegion(region)}
                      className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-2 ${
                        isSelected
                          ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-100 shadow-sm"
                          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 text-slate-800 dark:text-slate-200"
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-xs font-black">{region.name_kr}</span>
                          <span className="text-[10px] text-slate-400 font-medium">({region.name_en})</span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {region.description || `${region.region_group} 지역의 주요 코스입니다.`}
                        </p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 shrink-0">
                        {region.region_group}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
