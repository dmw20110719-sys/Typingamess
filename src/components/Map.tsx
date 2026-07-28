/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import L from "leaflet";
import { ZoomIn, ZoomOut, Compass, Navigation } from "lucide-react";
import { Region } from "../types";
import { WORLD_COUNTRIES } from "../data/worldCountries";
import { ALL_REGIONS, JAPAN_LIST, USA_LIST, CHINA_LIST } from "../data/regions";
import { PlayerState } from "../lib/multiplayer";

interface MapProps {
  regions: Region[];
  activeRegion: Region | null;
  visitedRegions: Region[];
  courseHistory: string[]; // List of region IDs in travel order
  upcomingRegions: Region[];
  showSimple: boolean;
  isQuizMode?: boolean;
  multiplayerPlayers?: Record<string, PlayerState>;
  myPlayerId?: string;
  coursePath?: Region[];
  regionLevel?: string;
}

const MapComponent: React.FC<MapProps> = ({
  regions = [],
  activeRegion,
  visitedRegions = [],
  courseHistory = [],
  upcomingRegions = [],
  showSimple,
  isQuizMode = false,
  multiplayerPlayers,
  myPlayerId,
  coursePath = [],
  regionLevel,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  
  const [zoomLevel, setZoomLevel] = useState<number>(8);
  const [hoveredRegion, setHoveredRegion] = useState<Region | null>(null);

  // Layer groups for markers, polylines, and geojson polygons
  const layersRef = useRef<{
    geojson: L.LayerGroup | null;
    polylines: L.LayerGroup | null;
    markers: L.LayerGroup | null;
  }>({ geojson: null, polylines: null, markers: null });

  const geoJsonDataRef = useRef<any>(null);
  const loadedLevelRef = useRef<string | null>(null);
  const lastDrawnStateRef = useRef<string>("");

  // Convert leaflet zoom level to UI zoom percentage (6 -> 100%, 14 -> 650%)
  const zoomPercent = Math.round(((zoomLevel - 6) / (14 - 6)) * 550 + 100);

  // 1. Initialize map instance
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Safety cleanup for leftover Leaflet container state
    if ((mapContainerRef.current as any)._leaflet_id) {
      (mapContainerRef.current as any)._leaflet_id = null;
    }

    const effectiveLevel = regionLevel || activeRegion?.level || (regions && regions.length > 0 ? regions[0]?.level : "sido");
    const isWorldMode = effectiveLevel === "world";
    const isChinaMode = effectiveLevel === "china";
    const isJapanMode = effectiveLevel === "japan";
    const isUsaMode = effectiveLevel === "usa";

    const hasValidActiveCoords =
      activeRegion &&
      typeof activeRegion.lat === "number" &&
      typeof activeRegion.lng === "number" &&
      !isNaN(activeRegion.lat) &&
      !isNaN(activeRegion.lng);

    const initialCenter: L.LatLngExpression = hasValidActiveCoords
      ? [activeRegion.lat, activeRegion.lng]
      : isWorldMode
      ? [20, 10]
      : isChinaMode
      ? [35.0, 104.0]
      : isJapanMode
      ? [36.2, 138.2]
      : isUsaMode
      ? [37.0, -95.7]
      : [36.2, 127.8];
    const initialZoom = isWorldMode ? 3 : isChinaMode ? 4 : isUsaMode ? 4 : isJapanMode ? 6 : 8;

    try {
      // Create leaflet map instance
      const map = L.map(mapContainerRef.current, {
        center: initialCenter,
        zoom: initialZoom,
        minZoom: 2,
        maxZoom: 18,
        zoomControl: false,
        attributionControl: false,
      });

      // Load CartoDB Positron No Labels map tile (pure minimalist landmass, ZERO roads/labels)
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png", {
        maxZoom: 18,
        subdomains: "abcd",
      }).addTo(map);

      // Setup Layer Groups (GeoJSON on bottom, polylines in middle, markers on top)
      layersRef.current.geojson = L.layerGroup().addTo(map);
      layersRef.current.polylines = L.layerGroup().addTo(map);
      layersRef.current.markers = L.layerGroup().addTo(map);

      mapRef.current = map;

      // Force size calculation repeatedly to guarantee proper rendering on Windows PC Chrome/Edge
      const timer1 = setTimeout(() => map.invalidateSize(), 50);
      const timer2 = setTimeout(() => map.invalidateSize(), 200);
      const timer3 = setTimeout(() => map.invalidateSize(), 500);
      const timer4 = setTimeout(() => map.invalidateSize(), 1000);

      // Synchronize map zoom to state
      map.on("zoomend", () => {
        setZoomLevel(map.getZoom());
      });

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
        if (mapRef.current) {
          try {
            mapRef.current.remove();
          } catch (e) {
            console.error("Map remove error:", e);
          }
          mapRef.current = null;
        }
      };
    } catch (err) {
      console.error("Leaflet initialization error:", err);
    }
  }, []);

  // Handle Container Resizing automatically
  useEffect(() => {
    if (!mapContainerRef.current) return;
    const observer = new ResizeObserver(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    });
    observer.observe(mapContainerRef.current);
    return () => observer.disconnect();
  }, []);

  // Fit course bounds when regions change initially
  useEffect(() => {
    if (!mapRef.current || !regions || regions.length === 0) return;
    const validCoords = regions
      .filter((r) => r && typeof r.lat === "number" && typeof r.lng === "number" && !isNaN(r.lat) && !isNaN(r.lng))
      .map((r) => [r.lat, r.lng] as [number, number]);
    if (validCoords.length > 0) {
      const bounds = L.latLngBounds(validCoords);
      if (bounds.isValid()) {
        mapRef.current.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [regions]);

  // 2. Map panning / centering on active node or fitting full course bounds on completion
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;
    const timer1 = setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    }, 50);

    const timer2 = setTimeout(() => {
      if (!mapRef.current) return;
      mapRef.current.invalidateSize();

      // If entire course is completed (e.g. in results view), zoom out to fit all visited regions cleanly
      if (visitedRegions.length > 0 && visitedRegions.length === regions.length) {
        const validCoords = visitedRegions
          .filter((r) => r && typeof r.lat === "number" && typeof r.lng === "number" && !isNaN(r.lat) && !isNaN(r.lng))
          .map((r) => [r.lat, r.lng] as [number, number]);
        if (validCoords.length > 0) {
          const bounds = L.latLngBounds(validCoords);
          if (bounds.isValid()) {
            mapRef.current.fitBounds(bounds, { padding: [40, 40], maxZoom: 8, animate: true });
            return;
          }
        }
      }

      if (activeRegion && typeof activeRegion.lat === "number" && typeof activeRegion.lng === "number" && !isNaN(activeRegion.lat) && !isNaN(activeRegion.lng)) {
        const isWorld = activeRegion.level === "world";
        const isChina = activeRegion.level === "china";
        const isUsa = activeRegion.level === "usa";
        const isJapan = activeRegion.level === "japan";
        const targetZoom = isWorld ? 3 : isChina ? 5 : isUsa ? 5 : isJapan ? 6 : 8;

        const currentZoom = mapRef.current.getZoom();
        if (Math.abs(currentZoom - targetZoom) <= 1) {
          mapRef.current.panTo([activeRegion.lat, activeRegion.lng], {
            animate: true,
            duration: 0.6,
          });
        } else {
          mapRef.current.setView([activeRegion.lat, activeRegion.lng], targetZoom, {
            animate: true,
          });
        }
      } else if (regions && regions.length > 0) {
        try {
          const validCoords = regions
            .filter((r) => r && typeof r.lat === "number" && typeof r.lng === "number" && !isNaN(r.lat) && !isNaN(r.lng))
            .map((r) => [r.lat, r.lng] as [number, number]);
          if (validCoords.length > 0) {
            const bounds = L.latLngBounds(validCoords);
            if (bounds.isValid()) {
              mapRef.current.fitBounds(bounds, { padding: [30, 30], maxZoom: 8 });
            }
          }
        } catch (e) {
          console.error(e);
        }
      }
    }, 150);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [activeRegion, visitedRegions, regions, showSimple]);

  // 3. Render stations, connection tracks, and GeoJSON region fills dynamically
  useEffect(() => {
    const map = mapRef.current;
    const geojsonGroup = layersRef.current.geojson;
    const markersGroup = layersRef.current.markers;
    const polylinesGroup = layersRef.current.polylines;

    if (!map || !geojsonGroup || !markersGroup || !polylinesGroup) return;

    // Clear previous drawings
    markersGroup.clearLayers();
    polylinesGroup.clearLayers();

    // -- A. Render GeoJSON Region Polygons (Passed/Visited Regions Colored Green or Gray) --
    const currentLevel = regionLevel || (regions && regions.length > 0 ? regions[0]?.level : activeRegion?.level) || "sido";
    const visitedIds = new Set(visitedRegions.map((r) => r.id.toLowerCase()));
    const activeId = activeRegion?.id?.toLowerCase();

    const isJapanMode =
      regionLevel === "japan" ||
      activeRegion?.level === "japan" ||
      (regions && regions.length > 0 && regions[0]?.level === "japan") ||
      currentLevel === "japan";

    const isUsaMode =
      regionLevel === "usa" ||
      activeRegion?.level === "usa" ||
      (regions && regions.length > 0 && regions[0]?.level === "usa") ||
      currentLevel === "usa";

    const isChinaMode =
      regionLevel === "china" ||
      activeRegion?.level === "china" ||
      (regions && regions.length > 0 && regions[0]?.level === "china") ||
      currentLevel === "china";

    const isWorldMode =
      regionLevel === "world" ||
      activeRegion?.level === "world" ||
      (regions && regions.length > 0 && regions[0]?.level === "world") ||
      currentLevel === "world";

    const getFeatureRegionId = (feature: any) => {
      if (!feature || !feature.properties) return "";
      const props = feature.properties;
      const rawId =
        props.region_id ||
        props["ISO3166-1-Alpha-2"] ||
        props.ISO_A2 ||
        props.iso_a2 ||
        props.ADM0_A3 ||
        props.iso_a3 ||
        feature.id ||
        "";
      return String(rawId).toLowerCase();
    };

    const getRegionForFeature = (feature: any): Region | undefined => {
      if (!feature || !feature.properties) return undefined;
      const props = feature.properties;

      if (isJapanMode) {
        const pool = JAPAN_LIST;
        const pNam = String(props.nam || props.name || props.NAME || props.NAME_LONG || "").toLowerCase().trim();
        const pJa = String(props.nam_ja || "").trim();

        const found = pool.find((r) => {
          const en = r.name_en.toLowerCase().trim();
          const kr = r.name_kr.toLowerCase().trim();
          if (pNam && (pNam.includes(en) || en.includes(pNam.replace(/\s+/g, "")) || pNam.replace(/\s+/g, "").includes(en))) return true;
          if (pJa && (pJa.includes(kr) || kr.includes(pJa))) return true;
          return false;
        });
        if (found) return found;
      }

      if (isUsaMode) {
        const pool = USA_LIST;
        const stateName = String(props.name || props.NAME || props.state_name || props.STATE_NAME || props.postal || "").toLowerCase().trim();
        if (stateName) {
          const found = pool.find((r) => {
            const en = r.name_en.toLowerCase().trim();
            const kr = r.name_kr.toLowerCase().trim();
            if (en === stateName || kr === stateName || stateName.includes(en) || en.includes(stateName)) return true;
            if (stateName === "district of columbia" && r.id === "us_washington_dc") return true;
            if (stateName === "washington" && r.id === "us_washington") return true;
            return false;
          });
          if (found) return found;
        }
      }

      if (isChinaMode) {
        const pool = CHINA_LIST;
        const mapID: Record<string, string> = {
          '110000': 'china_beijing', '120000': 'china_tianjin', '310000': 'china_shanghai', '500000': 'china_chongqing',
          '130000': 'china_hebei', '140000': 'china_shanxi', '150000': 'china_inner_mongolia', '210000': 'china_liaoning',
          '220000': 'china_jilin', '230000': 'china_heilongjiang', '320000': 'china_jiangsu', '330000': 'china_zhejiang',
          '340000': 'china_anhui', '350000': 'china_fujian', '360000': 'china_jiangxi', '370000': 'china_shandong',
          '410000': 'china_henan', '420000': 'china_hubei', '430000': 'china_hunan', '440000': 'china_guangdong',
          '450000': 'china_guangxi', '460000': 'china_hainan', '510000': 'china_sichuan', '520000': 'china_guizhou',
          '530000': 'china_yunnan', '540000': 'china_tibet', '610000': 'china_shaanxi', '620000': 'china_gansu',
          '630000': 'china_qinghai', '640000': 'china_ningxia', '650000': 'china_xinjiang', '810000': 'china_hongkong',
          '820000': 'china_macau', '710000': 'china_taiwan'
        };
        const mapZH: Record<string, string> = {
          '北京': 'china_beijing', '天津': 'china_tianjin', '上海': 'china_shanghai', '重庆': 'china_chongqing',
          '河北': 'china_hebei', '山西': 'china_shanxi', '内蒙古': 'china_inner_mongolia', '辽宁': 'china_liaoning',
          '吉林': 'china_jilin', '黑龙江': 'china_heilongjiang', '江苏': 'china_jiangsu', '浙江': 'china_zhejiang',
          '安徽': 'china_anhui', '福建': 'china_fujian', '江西': 'china_jiangxi', '山东': 'china_shandong',
          '河南': 'china_henan', '湖北': 'china_hubei', '湖南': 'china_hunan', '广东': 'china_guangdong',
          '广西': 'china_guangxi', '海南': 'china_hainan', '四川': 'china_sichuan', '贵州': 'china_guizhou',
          '云南': 'china_yunnan', '西藏': 'china_tibet', '陕西': 'china_shaanxi', '甘肃': 'china_gansu',
          '青海': 'china_qinghai', '宁夏': 'china_ningxia', '新疆': 'china_xinjiang', '香港': 'china_hongkong',
          '澳门': 'china_macau', '台湾': 'china_taiwan'
        };
        const pId = String(props.adcode || props.id || "").trim();
        const pNam = String(props.name || props.NAME || "").trim();
        let targetId = mapID[pId];
        if (!targetId && pNam) {
          for (const zhKey of Object.keys(mapZH)) {
            if (pNam.includes(zhKey)) {
              targetId = mapZH[zhKey];
              break;
            }
          }
        }
        if (targetId) {
          const found = pool.find((r) => r.id === targetId);
          if (found) return found;
        }
        const foundText = pool.find((r) => {
          const en = r.name_en.toLowerCase();
          const kr = r.name_kr;
          return pNam.includes(kr) || kr.includes(pNam) || pNam.toLowerCase().includes(en);
        });
        if (foundText) return foundText;
      }

      if (isWorldMode) {
        const pool = WORLD_COUNTRIES;

        // 1. Direct ISO2 match
        const iso2 = String(
          props.region_id ||
          props["ISO3166-1-Alpha-2"] ||
          props.ISO_A2 ||
          props.ISO_A2_EH ||
          props.POSTAL ||
          props.WB_A2 ||
          props.iso_a2 ||
          feature.id ||
          ""
        ).toLowerCase();

        if (iso2 && iso2 !== "-99") {
          const found = pool.find((r) => r.id.toLowerCase() === iso2);
          if (found) return found;
        }

        // 2. ISO3 match
        const iso3 = String(
          props["ISO3166-1-Alpha-3"] ||
          props.ADM0_A3 ||
          props.ISO_A3 ||
          props.ISO_A3_EH ||
          props.WB_A3 ||
          props.iso_a3 ||
          ""
        ).toLowerCase();

        if (iso3 && iso3 !== "-99") {
          const foundByIso3 = pool.find((r) => r.id.toLowerCase() === iso3.substring(0, 2));
          if (foundByIso3) return foundByIso3;
        }

        // 3. Exact Name matches
        const propNames = [
          props.name,
          props.NAME,
          props.NAME_LONG,
          props.ADMIN,
          props.admin,
          props.BRK_NAME,
          props.FORMAL_EN,
          props.GEOUNIT,
        ]
          .filter(Boolean)
          .map((s) => String(s).toLowerCase().trim());

        if (propNames.length > 0) {
          const foundByName = pool.find((r) => {
            const rNameEn = r.name_en.toLowerCase().trim();
            const rNameKr = r.name_kr.toLowerCase().trim();
            return propNames.some((pName) => pName === rNameEn || pName === rNameKr);
          });
          if (foundByName) return foundByName;
        }

        return undefined;
      }

      // Korea Mode lookup
      const name = String(props.name || props.NAME || props.NAME_LONG || "").trim();
      const fullPool = [...regions, ...ALL_REGIONS];

      if (name) {
        if (name.includes("광주") || name.includes("전라남도")) {
          const merged = fullPool.find((r) => r.id === "jeonnam_gwangju");
          if (merged) return merged;
          const individual = fullPool.find((r) => r.id === "jeonnam" || r.id === "gwangju");
          if (individual) return individual;
        }
        if (name.includes("충청남도")) {
          const match = fullPool.find((r) => r.id === "chungnam" || r.name_kr.includes("충청남도"));
          if (match) return match;
        }
        if (name.includes("충청북도")) {
          const match = fullPool.find((r) => r.id === "chungbuk" || r.name_kr.includes("충청북도"));
          if (match) return match;
        }
        if (name.includes("전라북도") || name.includes("전북")) {
          const match = fullPool.find((r) => r.id === "jeonbuk" || r.name_kr.includes("전북") || r.name_kr.includes("전라북도"));
          if (match) return match;
        }
        if (name.includes("경상남도")) {
          const match = fullPool.find((r) => r.id === "gyeongnam" || r.name_kr.includes("경상남도"));
          if (match) return match;
        }
        if (name.includes("경상북도")) {
          const match = fullPool.find((r) => r.id === "gyeongbuk" || r.name_kr.includes("경상북도"));
          if (match) return match;
        }
        if (name.includes("서울특별시")) return fullPool.find((r) => r.id === "seoul");
        if (name.includes("부산")) return fullPool.find((r) => r.id === "busan");
        if (name.includes("대구")) return fullPool.find((r) => r.id === "daegu");
        if (name.includes("인천")) return fullPool.find((r) => r.id === "incheon");
        if (name.includes("대전")) return fullPool.find((r) => r.id === "daejeon");
        if (name.includes("울산")) return fullPool.find((r) => r.id === "ulsan");
        if (name.includes("세종")) return fullPool.find((r) => r.id === "sejong");
        if (name.includes("경기")) return fullPool.find((r) => r.id === "gyeonggi");
        if (name.includes("강원")) return fullPool.find((r) => r.id === "gangwon");
        if (name.includes("제주")) return fullPool.find((r) => r.id === "jeju");
      }

      // Direct region_id match
      const iso2 = String(
        props.region_id ||
        props["ISO3166-1-Alpha-2"] ||
        props.ISO_A2 ||
        props.ISO_A2_EH ||
        props.POSTAL ||
        props.WB_A2 ||
        props.iso_a2 ||
        feature.id ||
        ""
      ).toLowerCase();

      if (iso2 && iso2 !== "-99") {
        const found = fullPool.find((r) => r.id.toLowerCase() === iso2);
        if (found) return found;
      }

      return undefined;
    };

    const drawGeoJson = (data: any) => {
      geojsonGroup.clearLayers();
      if (!data) return;

      // Dynamic decoder fallback if UTF8Encoding is present or coordinates are strings
      let cleanData = data;
      if (data.UTF8Encoding) {
        try {
          cleanData = JSON.parse(JSON.stringify(data));
          const decodeCoordinate = (coordinate: string, encodeOffsets: [number, number]) => {
            const result = [];
            let prevX = encodeOffsets[0];
            let prevY = encodeOffsets[1];
            for (let i = 0; i < coordinate.length; i += 2) {
              let x = coordinate.charCodeAt(i) - 64;
              let y = coordinate.charCodeAt(i + 1) - 64;
              x = (x >> 1) ^ (-(x & 1));
              y = (y >> 1) ^ (-(y & 1));
              x = prevX + x;
              y = prevY + y;
              prevX = x;
              prevY = y;
              result.push([x / 1024, y / 1024]);
            }
            return result;
          };

          cleanData.features.forEach((feature: any) => {
            if (!feature.geometry) return;
            const { type, coordinates, encodeOffsets } = feature.geometry;
            if (!coordinates || !encodeOffsets) return;
            if (type === "Polygon") {
              feature.geometry.coordinates = coordinates.map((ring: any, i: number) =>
                typeof ring === "string" ? decodeCoordinate(ring, encodeOffsets[i]) : ring
              );
            } else if (type === "MultiPolygon") {
              feature.geometry.coordinates = coordinates.map((polygon: any, i: number) =>
                polygon.map((ring: any, j: number) =>
                  typeof ring === "string" ? decodeCoordinate(ring, encodeOffsets[i][j]) : ring
                )
              );
            }
          });
          delete cleanData.UTF8Encoding;
        } catch (e) {
          console.error("GeoJSON decoding error:", e);
        }
      }

      try {
        L.geoJSON(cleanData, {
          filter: (feature) => {
            const geom = feature?.geometry as any;
            return Boolean(
              feature &&
              geom &&
              geom.type &&
              geom.coordinates &&
              Array.isArray(geom.coordinates) &&
              geom.coordinates.length > 0
            );
          },
          style: (feature) => {
            const reg = getRegionForFeature(feature);
            const regId = reg ? reg.id.toLowerCase() : getFeatureRegionId(feature);
            const iso2 = String(feature?.properties?.ISO_A2 || feature?.properties?.POSTAL || "").toUpperCase();

            let isVisited = regId ? visitedIds.has(regId) : false;
            let isActive = regId ? activeId === regId : false;

            if (isActive) {
              if (isJapanMode) {
                return { fillColor: "#e11d48", fillOpacity: 0.95, color: "#881337", weight: 2.5 };
              }
              if (isUsaMode) {
                return { fillColor: "#2563eb", fillOpacity: 0.95, color: "#1e3a8a", weight: 2.5 };
              }
              if (isChinaMode) {
                return { fillColor: "#f59e0b", fillOpacity: 0.98, color: "#78350f", weight: 3 };
              }
              return isWorldMode
                ? {
                    fillColor: "#1e293b",
                    fillOpacity: 0.95,
                    color: "#020617",
                    weight: 2.5,
                  }
                : {
                    fillColor: "#059669",
                    fillOpacity: 0.9,
                    color: "#022c22",
                    weight: 2.5,
                  };
            } else if (isVisited) {
              if (isJapanMode) {
                return { fillColor: "#f43f5e", fillOpacity: 0.85, color: "#be123c", weight: 1.5 };
              }
              if (isUsaMode) {
                return { fillColor: "#3b82f6", fillOpacity: 0.85, color: "#1d4ed8", weight: 1.5 };
              }
              if (isChinaMode) {
                return { fillColor: "#eab308", fillOpacity: 0.95, color: "#854d0e", weight: 2.5 };
              }
              return isWorldMode
                ? {
                    fillColor: "#475569",
                    fillOpacity: 0.85,
                    color: "#1e293b",
                    weight: 1.5,
                  }
                : {
                    fillColor: "#22c55e",
                    fillOpacity: 0.8,
                    color: "#15803d",
                    weight: 1.5,
                  };
            } else {
              return {
                fillColor: isWorldMode || isJapanMode || isUsaMode || isChinaMode ? "#f8fafc" : "#ffffff",
                fillOpacity: 0.45,
                color: "#cbd5e1",
                weight: 1,
              };
            }
          },
          onEachFeature: (feature, layer) => {
            const reg = getRegionForFeature(feature);
            if (reg && !isQuizMode) {
              layer.on("mouseover", () => setHoveredRegion(reg));
              layer.on("mouseout", () => setHoveredRegion(null));
            }
          },
        }).addTo(geojsonGroup);
      } catch (err) {
        console.error("Error rendering GeoJSON layers:", err);
      }
    };

    // Load GeoJSON if not cached for current level or if active/visited state changed
    const currentGeoStateKey = `${currentLevel}_${activeId}_${visitedRegions.map((r) => r.id).join(",")}`;
    if (lastDrawnStateRef.current !== currentGeoStateKey || loadedLevelRef.current !== currentLevel) {
      lastDrawnStateRef.current = currentGeoStateKey;

      if (loadedLevelRef.current !== currentLevel || !geoJsonDataRef.current) {
        const jsonUrl =
          currentLevel === "sido"
            ? "/geojson/provinces.json"
            : currentLevel === "sigungu"
            ? "/geojson/municipalities.json"
            : currentLevel === "japan"
            ? "/geojson/japan-prefectures.json"
            : currentLevel === "usa"
            ? "/geojson/us-states.json"
            : currentLevel === "china"
            ? "/geojson/china-provinces.json"
            : "/geojson/world.json";
        fetch(jsonUrl)
          .then((res) => res.json())
          .then((data) => {
            geoJsonDataRef.current = data;
            loadedLevelRef.current = currentLevel;
            drawGeoJson(data);
          })
          .catch((err) => console.error("Failed to load GeoJSON:", err));
      } else {
        drawGeoJson(geoJsonDataRef.current);
      }
    }

    // -- B. Draw Rail Track Lines --
    const drawnPairs = new Set<string>();

    // 1) Visited Paths (Clean thin line for traveled path)
    const visitedCoords: L.LatLngExpression[] = visitedRegions
      .filter((r) => r && typeof r.lat === "number" && typeof r.lng === "number" && !isNaN(r.lat) && !isNaN(r.lng))
      .map((r) => [r.lat, r.lng]);

    if (visitedCoords.length > 1) {
      // Single clean thin line: Green for Korea, Gray/Slate for World, Yellow for China
      const polylineColor = isJapanMode ? "#e11d48" : isUsaMode ? "#2563eb" : isChinaMode ? "#d97706" : isWorldMode ? "#64748b" : "#10b981";
      L.polyline(visitedCoords, {
        color: polylineColor,
        weight: 2.5,
        lineCap: "round",
        lineJoin: "round",
        opacity: 0.85,
      }).addTo(polylinesGroup);

      // Add to drawn set to avoid duplicate connection lines
      for (let i = 0; i < courseHistory.length - 1; i++) {
        drawnPairs.add(`${courseHistory[i]}-${courseHistory[i + 1]}`);
        drawnPairs.add(`${courseHistory[i + 1]}-${courseHistory[i]}`);
      }
    }

    // 2) Unvisited general connection lines (thin slate line)
    regions.forEach((reg) => {
      if (reg && typeof reg.lat === "number" && typeof reg.lng === "number" && !isNaN(reg.lat) && !isNaN(reg.lng) && reg.neighbors) {
        reg.neighbors.forEach((neighId) => {
          const neighReg = regions.find((r) => r.id === neighId);
          if (neighReg && typeof neighReg.lat === "number" && typeof neighReg.lng === "number" && !isNaN(neighReg.lat) && !isNaN(neighReg.lng)) {
            const key = `${reg.id}-${neighId}`;
            const revKey = `${neighId}-${reg.id}`;

            if (!drawnPairs.has(key) && !drawnPairs.has(revKey)) {
              drawnPairs.add(key);
              L.polyline([[reg.lat, reg.lng], [neighReg.lat, neighReg.lng]], {
                color: "rgba(100, 116, 139, 0.25)",
                weight: 1.5,
              }).addTo(polylinesGroup);
            }
          }
        });
      }
    });

    // -- B. Draw Region Node Points --
    regions.forEach((reg) => {
      if (!reg || typeof reg.lat !== "number" || typeof reg.lng !== "number" || isNaN(reg.lat) || isNaN(reg.lng)) return;

      const isVisited = visitedRegions.some((vr) => vr.id === reg.id);
      const isActive = activeRegion?.id === reg.id;
      const isNext = upcomingRegions?.[0]?.id === reg.id;

      let fillColor = "rgba(15, 23, 42, 0.85)";
      let color = "rgba(148, 163, 184, 0.6)";
      let radius = 6;
      let weight = 1;

      if (isActive) {
        fillColor = isJapanMode ? "#e11d48" : isUsaMode ? "#2563eb" : isChinaMode ? "#f59e0b" : isWorldMode ? "#64748b" : "#f59e0b";
        color = "#ffffff";
        radius = 8;
        weight = 2;
      } else if (isVisited) {
        fillColor = isJapanMode ? "#f43f5e" : isUsaMode ? "#3b82f6" : isChinaMode ? "#eab308" : isWorldMode ? "#64748b" : "#10b981";
        color = isJapanMode ? "rgba(244, 63, 94, 0.4)" : isUsaMode ? "rgba(59, 130, 246, 0.4)" : isChinaMode ? "rgba(234, 179, 8, 0.4)" : isWorldMode ? "rgba(100, 116, 139, 0.4)" : "rgba(16, 185, 129, 0.4)";
        radius = 5.5;
      } else if (isNext) {
        fillColor = isChinaMode ? "#f59e0b" : "#3b82f6";
        color = isChinaMode ? "rgba(245, 158, 11, 0.6)" : "rgba(59, 130, 246, 0.5)";
        radius = 6;
        weight = 1.5;
      } else if (isChinaMode) {
        fillColor = "#d97706";
        color = "#78350f";
        radius = 5;
        weight = 1;
      }

      // We skip drawing active node circle since it's covered by the 3D train avatar
      if (!isActive) {
        const marker = L.circleMarker([reg.lat, reg.lng], {
          radius,
          fillColor,
          fillOpacity: 0.95,
          color,
          weight,
        }).addTo(markersGroup);

        // Bind interactive events
        if (!isQuizMode) {
          marker.on("mouseover", () => setHoveredRegion(reg));
          marker.on("mouseout", () => setHoveredRegion(null));
        }
      }
    });

    // -- C. Draw Beautiful Smiling Train Avatar Marker on Active Node --
    if (activeRegion && typeof activeRegion.lat === "number" && typeof activeRegion.lng === "number" && !isNaN(activeRegion.lat) && !isNaN(activeRegion.lng)) {
      if (isQuizMode) {
        const rippleBgClass = isJapanMode
          ? "bg-rose-500/40"
          : isUsaMode
          ? "bg-blue-500/40"
          : isChinaMode
          ? "bg-amber-500/40"
          : isWorldMode
          ? "bg-slate-500/40"
          : "bg-emerald-500/40";

        const dotBgClass = isJapanMode
          ? "bg-rose-600"
          : isUsaMode
          ? "bg-blue-600"
          : isChinaMode
          ? "bg-amber-500"
          : isWorldMode
          ? "bg-slate-600"
          : "bg-emerald-600";

        const quizIcon = L.divIcon({
          className: "custom-quiz-marker-wrapper",
          html: `
            <div class="relative flex items-center justify-center select-none" style="transform: translate(-50%, -50%);">
              <!-- Soft pulsing ripple ring behind -->
              <div class="absolute w-8 h-8 ${rippleBgClass} rounded-full animate-ping pointer-events-none" style="animation-duration: 1.8s;"></div>
              
              <!-- Clean location target dot -->
              <div class="w-4 h-4 ${dotBgClass} border-2 border-white rounded-full shadow-lg z-10 flex items-center justify-center">
                <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>
          `,
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        });

        L.marker([activeRegion.lat, activeRegion.lng], { icon: quizIcon }).addTo(markersGroup);
      } else {
        const rippleBgClass = isJapanMode
          ? "bg-rose-500/30"
          : isUsaMode
          ? "bg-blue-500/30"
          : isChinaMode
          ? "bg-amber-500/30"
          : isWorldMode
          ? "bg-slate-500/30"
          : "bg-emerald-500/30";

        const shellBgColor = isJapanMode
          ? "#e11d48"
          : isUsaMode
          ? "#2563eb"
          : isChinaMode
          ? "#f59e0b"
          : isWorldMode
          ? "#64748b"
          : "#10b981";

        const roofBgColor = isJapanMode
          ? "#881337"
          : isUsaMode
          ? "#1e3a8a"
          : isChinaMode
          ? "#b45309"
          : isWorldMode
          ? "#334155"
          : "#065f46";

        const eyeColor = isJapanMode
          ? "#fecdd3"
          : isUsaMode
          ? "#bfdbfe"
          : isChinaMode
          ? "#fef08a"
          : isWorldMode
          ? "#cbd5e1"
          : "#34d399";

        const bannerDotClass = isJapanMode
          ? "bg-rose-400"
          : isUsaMode
          ? "bg-blue-400"
          : isChinaMode
          ? "bg-amber-400"
          : isWorldMode
          ? "bg-slate-400"
          : "bg-emerald-400";

        const trainIcon = L.divIcon({
          className: "custom-train-marker-wrapper",
          html: `
            <div class="relative flex flex-col items-center justify-center select-none" style="transform: translate(-50%, -85%);">
              <!-- Ripple wave behind -->
              <div class="absolute w-12 h-12 ${rippleBgClass} rounded-full animate-ping pointer-events-none" style="animation-duration: 2s; top: 12px;"></div>
              
              <!-- Train Body Cabin Container -->
              <div class="relative shadow-2xl flex flex-col items-center" style="width: 46px; height: 50px;">
                <!-- Main shell -->
                <div class="absolute inset-0 border-2 border-white rounded-2xl flex flex-col items-center py-1 shadow-lg" style="background-color: ${shellBgColor};">
                  <!-- Roof rail connector -->
                  <div class="w-8 h-1 rounded-t-md -mt-2" style="background-color: ${roofBgColor};"></div>
                  <!-- Dark Front glass -->
                  <div class="w-9 h-5 bg-[#0f172a] rounded-lg flex items-center justify-center mt-1 relative">
                    <!-- Cute eyes -->
                    <div class="w-1.5 h-1.5 rounded-full mx-1.5" style="background-color: ${eyeColor};"></div>
                    <div class="w-1.5 h-1.5 rounded-full mx-1.5" style="background-color: ${eyeColor};"></div>
                    <!-- Sweet smiling mouth -->
                    <div class="absolute bottom-1 w-2.5 h-1.5 border-b-2 rounded-b-full" style="border-color: ${eyeColor};"></div>
                  </div>
                  <!-- Dual front headlights -->
                  <div class="flex justify-between w-8 px-0.5 mt-2">
                    <div class="w-2.5 h-2.5 bg-[#fef08a] rounded-full shadow-[0_0_8px_#fef08a] border border-white/20"></div>
                    <div class="w-2.5 h-2.5 bg-[#fef08a] rounded-full shadow-[0_0_8px_#fef08a] border border-white/20"></div>
                  </div>
                </div>
              </div>
              
              <!-- High fidelity Station Name banner below train -->
              <div class="mt-2.5 bg-slate-900 border border-slate-800 shadow-xl px-4 py-1.5 rounded-full text-[13px] font-black text-white tracking-tight whitespace-nowrap z-50 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full ${bannerDotClass} animate-pulse"></span>
                <span>${activeRegion.name_kr}</span>
              </div>
            </div>
          `,
          iconSize: [46, 50],
          iconAnchor: [0, 0],
        });

        L.marker([activeRegion.lat, activeRegion.lng], { icon: trainIcon }).addTo(markersGroup);
      }
    }

    // -- D. Draw Multiplayer Opponents on the Map --
    if (multiplayerPlayers && coursePath && coursePath.length > 0) {
      Object.values(multiplayerPlayers).forEach((player: PlayerState) => {
        if (player.id !== myPlayerId) {
          const stationIdx = Math.min(player.currentIndex, coursePath.length - 1);
          const pStation = coursePath[stationIdx];
          if (pStation && typeof pStation.lat === "number" && typeof pStation.lng === "number" && !isNaN(pStation.lat) && !isNaN(pStation.lng)) {
            const isFinished = player.finished;
            const opponentIcon = L.divIcon({
              className: "custom-opponent-marker-wrapper",
              html: `
                <div class="relative flex flex-col items-center justify-center select-none" style="transform: translate(-50%, -85%);">
                  <!-- Opponent Pulse Wave -->
                  <div class="absolute w-12 h-12 bg-cyan-500/30 rounded-full animate-ping pointer-events-none" style="animation-duration: 1.8s; top: 10px;"></div>
                  
                  <!-- Opponent Avatar Badge -->
                  <div class="relative shadow-xl flex items-center justify-center bg-cyan-600 text-white font-black rounded-2xl border-2 border-white px-2.5 py-1 text-xs gap-1">
                    <span>👥 ${player.nickname}</span>
                  </div>
                  
                  <!-- Progress Badge -->
                  <div class="mt-1 bg-slate-900 text-amber-300 border border-slate-700 px-2 py-0.5 rounded-full text-[10px] font-extrabold shadow-lg whitespace-nowrap">
                    ${isFinished ? "🏆 완주 성공!" : `${stationIdx + 1} / ${player.totalStations || coursePath.length}`}
                  </div>
                </div>
              `,
              iconSize: [80, 45],
              iconAnchor: [0, 0],
            });

            L.marker([pStation.lat, pStation.lng], { icon: opponentIcon, zIndexOffset: 800 }).addTo(markersGroup);
          }
        }
      });
    }
  }, [regions, activeRegion, visitedRegions, courseHistory, upcomingRegions, multiplayerPlayers, myPlayerId, coursePath]);

  // Handle Zoom adjustments manually
  const handleZoomIn = () => {
    mapRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapRef.current?.zoomOut();
  };

  const handleZoomSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextZoom = Number(e.target.value);
    mapRef.current?.setZoom(nextZoom);
  };

  const handleResetView = () => {
    if (activeRegion && typeof activeRegion.lat === "number" && typeof activeRegion.lng === "number" && !isNaN(activeRegion.lat) && !isNaN(activeRegion.lng)) {
      const isWorld = activeRegion.level === "world";
      const isChina = activeRegion.level === "china";
      const isUsa = activeRegion.level === "usa";
      const isJapan = activeRegion.level === "japan";
      const targetZoom = isWorld ? 3 : isChina ? 5 : isUsa ? 5 : isJapan ? 6 : 8;
      mapRef.current?.setView([activeRegion.lat, activeRegion.lng], targetZoom);
    } else {
      const currentLevel = regionLevel || (regions && regions[0]?.level);
      if (currentLevel === "china") mapRef.current?.setView([35.0, 104.0], 4);
      else if (currentLevel === "usa") mapRef.current?.setView([37.0, -95.7], 4);
      else if (currentLevel === "japan") mapRef.current?.setView([36.2, 138.2], 6);
      else if (currentLevel === "world") mapRef.current?.setView([20, 10], 3);
      else mapRef.current?.setView([36.2, 127.8], 8);
    }
  };

  return (
    <div className="relative w-full h-full min-h-[500px] bg-slate-100 dark:bg-slate-900 overflow-hidden select-none flex-1 flex flex-col">
      {/* 1. Leaflet map render container */}
      <div
        ref={mapContainerRef}
        className="absolute inset-0 w-full h-full min-h-[500px] z-10 transition-all duration-300"
        style={{ height: "100%", width: "100%", minHeight: "500px" }}
      />

      {/* 2. Floating Hover Tooltip overlay */}
      {hoveredRegion && (
        <div
          id="map-tooltip"
          className="absolute z-20 top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 border border-slate-200 shadow-xl rounded-2xl text-slate-800 max-w-xs animate-fade-in"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-black text-slate-900">{hoveredRegion.name_kr}</span>
            <span className="text-[10px] text-slate-500 font-mono">({hoveredRegion.name_en})</span>
          </div>
          <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{hoveredRegion.description}</p>
          <div className="flex gap-1.5 items-center mt-2.5 pt-2 border-t border-slate-100">
            <span className="px-2 py-0.5 rounded-full text-[9px] bg-slate-100 text-slate-500 font-semibold">
              {hoveredRegion.region_group}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[9px] bg-amber-100 text-amber-700 font-semibold">
              {hoveredRegion.level === "sido" ? "광역 자치" : "기초 시군구"}
            </span>
          </div>
        </div>
      )}

      {/* 3. Map Controls Rail Overlay (Right Side - exact metrotyping.kr style) */}
      <div
        id="map-controls"
        className="absolute bottom-6 right-6 z-20 flex flex-col items-center gap-3 bg-white/95 backdrop-blur-md p-3.5 rounded-3xl border border-slate-200 shadow-xl w-14"
      >
        {/* Map Type Icon indicator */}
        <button
          className="p-2.5 bg-amber-500 text-white rounded-2xl shadow-md cursor-pointer flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
          onClick={handleResetView}
          title="Center view"
        >
          <Compass className="w-4.5 h-4.5" />
        </button>

        <span className="text-[10px] font-black text-slate-400 tracking-wider">지도</span>

        <hr className="w-8 border-slate-200 my-0.5" />

        <button
          onClick={handleZoomIn}
          disabled={zoomLevel >= 14}
          className="p-2 bg-slate-50 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-slate-700 transition-colors cursor-pointer"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        {/* Vertical range slider */}
        <div className="h-24 flex items-center justify-center relative my-1">
          <input
            type="range"
            min="6"
            max="14"
            step="0.1"
            value={zoomLevel}
            onChange={handleZoomSlider}
            className="accent-amber-500 h-1.5 cursor-pointer w-20 -rotate-90 origin-center bg-slate-200 rounded-lg appearance-none"
          />
        </div>

        <button
          onClick={handleZoomOut}
          disabled={zoomLevel <= 6}
          className="p-2 bg-slate-50 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-slate-700 transition-colors cursor-pointer"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[10px] font-black text-slate-800">{zoomPercent}%</span>
        </div>
      </div>
    </div>
  );
};

export const Map = React.memo(MapComponent);
