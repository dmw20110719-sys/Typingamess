/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "motion/react";
import {
  Train,
  Play,
  Users,
  Compass,
  ArrowLeft,
  Settings,
  Flame,
  X,
  Volume2,
  HelpCircle,
  Award,
  Trophy,
  RefreshCw,
  BookOpen,
  Map as MapIcon,
  CheckCircle,
  AlertCircle,
  FileText,
  Smartphone,
  Globe,
  Sliders,
  MessageSquare,
  Sparkles,
  Crown,
  LogOut
} from "lucide-react";
import { REGIONS, SIDO_LIST, SIGUNGU_LIST, WORLD_LIST, JAPAN_LIST, USA_LIST, CHINA_LIST, ALL_REGIONS } from "./data/regions";
import { Region, GameSettings, PlayStats, QuizQuestion, PlayMode } from "./types";
import { Map } from "./components/Map";
import { StatsPanel } from "./components/StatsPanel";
import { TypingConsole } from "./components/TypingConsole";
import { QuizConsole } from "./components/QuizConsole";
import { LeaderboardModal } from "./components/LeaderboardModal";
import { SettingsModal } from "./components/SettingsModal";
import { MapExplorerModal } from "./components/MapExplorerModal";
import { GuideModal } from "./components/GuideModal";
import { AboutModal } from "./components/AboutModal";
import { Footer } from "./components/Footer";
import { MultiplayerView } from "./components/MultiplayerView";
import { MultiplayerRoom, RoomState, PlayerState } from "./lib/multiplayer";
import mapTypingLogo from "./assets/images/map_typing_logo_1784782268665.jpg";
import cleanKoreaMapBg from "./assets/images/clean_korea_map_bg_1784937749191.jpg";
import southKoreaOnlyMap from "./assets/images/south_korea_only_map_1784938467323.jpg";
import japanMapBg from "./assets/images/japan_red_map_1784975261763.jpg";
import usaMapBg from "./assets/images/usa_soft_blue_map_1784975610776.jpg";
import chinaMapBg from "./assets/images/china_clean_map_bg_1785149923067.jpg";
import cleanWorldMapBg from "./assets/images/world_pure_gray_map_1784975622332.jpg";
import { submitScoreToLeaderboard } from "./lib/supabase";
import { playSuccessSound, playCompleteSound, initAudio } from "./utils/audio";

export default function App() {
  // Navigation states
  const [activeMode, setActiveMode] = useState<PlayMode | "multiplayer" | null>(null);
  const [gameState, setGameState] = useState<"home" | "setup" | "countdown" | "playing" | "results">("home");

  // Screenshot Theme / Tab / Scope states
  const [homeTab, setHomeTab] = useState<"single" | "multiplayer">("single");
  const [homeScope, setHomeScope] = useState<"korea" | "japan" | "usa" | "china" | "world">("korea");
  const [travelWay, setTravelWay] = useState<"typing" | "quiz">("typing");
  const [quizType, setQuizType] = useState<"country" | "capital">("country");
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);
  const [showAboutModal, setShowAboutModal] = useState<boolean>(false);

  // Ensure light mode is active
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  // Multiplayer States
  const [multiplayerRoom, setMultiplayerRoom] = useState<MultiplayerRoom | null>(null);
  const [multiplayerRoomState, setMultiplayerRoomState] = useState<RoomState | null>(null);

  // Real-time multiplayer room listener & sync
  useEffect(() => {
    if (activeMode === "multiplayer" && multiplayerRoom) {
      multiplayerRoom.init(
        (updatedRoom) => {
          setMultiplayerRoomState(updatedRoom);
        },
        () => {}
      );
    }
  }, [activeMode, multiplayerRoom]);

  // Game configuration
  const [settings, setSettings] = useState<GameSettings>({
    level: "sido",
    regionGroup: "전체",
    targetCount: 10,
    strictMode: false,
    advanceMode: "auto",
  });
  const [customTargetInput, setCustomTargetInput] = useState<string>("10");

  // Track state
  const [startingRegionId, setStartingRegionId] = useState<string>("random");
  const [regionsPool, setRegionsPool] = useState<Region[]>([]);
  const [coursePath, setCoursePath] = useState<Region[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [visitedRegions, setVisitedRegions] = useState<Region[]>([]);
  const [courseHistory, setCourseHistory] = useState<string[]>([]);

  // Real-time gameplay performance metrics
  const [stats, setStats] = useState<PlayStats>({
    cpm: 0,
    accuracy: 1,
    elapsedTime: 0,
    combo: 0,
    maxCombo: 0,
    visitedCount: 0,
    completed: false,
  });

  // Broadcast player progress during multiplayer gameplay
  useEffect(() => {
    if (activeMode === "multiplayer" && multiplayerRoom && (gameState === "playing" || gameState === "results")) {
      const isFinished = gameState === "results" || (coursePath.length > 0 && currentIndex >= coursePath.length - 1);
      multiplayerRoom.updateProgress(
        currentIndex,
        stats.cpm,
        Math.round(stats.accuracy * 100),
        isFinished,
        isFinished ? Date.now() : undefined
      );
    }
  }, [activeMode, multiplayerRoom, currentIndex, stats.cpm, stats.accuracy, gameState, coursePath.length]);

  // Timers
  const [countdown, setCountdown] = useState<number>(3);
  const [gameTime, setGameTime] = useState<number>(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState<number>(0);
  const [errorCount, setErrorCount] = useState<number>(0);

  // Tab Modal or Overlay States
  const [showCourseListModal, setShowCourseListModal] = useState(false);
  const [showSimpleMap, setShowSimpleMap] = useState(false);
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [alertText, setAlertText] = useState("");

  // Leaderboard & Nickname States
  const [nickname, setNickname] = useState<string>(() => {
    const saved = localStorage.getItem("train_nickname");
    if (saved && saved !== "타자왕") {
      return saved;
    }
    return "";
  });
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const [isLeaderboardSubmitted, setIsLeaderboardSubmitted] = useState(false);
  const [nicknameError, setNicknameError] = useState(false);
  const [isRankingChallenge, setIsRankingChallenge] = useState<boolean>(false);

  useEffect(() => {
    if (nickname && nickname !== "타자왕") {
      localStorage.setItem("train_nickname", nickname);
    }
  }, [nickname]);



  // Quiz state
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizLoading, setQuizLoading] = useState(false);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // AI-powered travel guide facts
  const [arrivedRegionTrivia, setArrivedRegionTrivia] = useState<any>(null);
  const [triviaLoading, setTriviaLoading] = useState(false);
  const [endTravelSummary, setEndTravelSummary] = useState<string>("");

  // Derived memoized upcoming regions list for Map performance
  const upcomingRegions = useMemo(
    () => coursePath.slice(currentIndex + 1),
    [coursePath, currentIndex]
  );

  // Refs for tracking elapsed time precise calculations
  const gameIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const cpmIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastSuccessTimeRef = useRef<number>(0);
  const lastKeystrokeTimeRef = useRef<number>(0);

  // Real-time tracking refs to avoid stale closures
  const prevStationsKeystrokesRef = useRef<number>(0);
  const prevStationsErrorsRef = useRef<number>(0);
  const totalKeystrokesRef = useRef<number>(0);
  const errorCountRef = useRef<number>(0);
  const gameTimeRef = useRef<number>(0);

  // ==========================================
  // 1. GAME SETUP & PATH GENERATION
  // ==========================================

  // Filter pool based on selected parameters
  useEffect(() => {
    const list =
      settings.level === "sido"
        ? SIDO_LIST
        : settings.level === "sigungu"
        ? SIGUNGU_LIST
        : settings.level === "japan"
        ? JAPAN_LIST
        : settings.level === "usa"
        ? USA_LIST
        : settings.level === "china"
        ? CHINA_LIST
        : WORLD_LIST;
    const filtered =
      settings.regionGroup === "전체"
        ? list
        : list.filter((r) => r.region_group === settings.regionGroup);
    setRegionsPool(filtered);
  }, [settings.level, settings.regionGroup]);

  // Handle Starting Region options listing
  const getStartingRegionOptions = () => {
    const list = regionsPool.length > 0 ? regionsPool : (
      settings.level === "sido"
        ? SIDO_LIST
        : settings.level === "sigungu"
        ? SIGUNGU_LIST
        : settings.level === "japan"
        ? JAPAN_LIST
        : settings.level === "usa"
        ? USA_LIST
        : settings.level === "china"
        ? CHINA_LIST
        : WORLD_LIST
    );
    return list.map((r) => (
      <option key={r.id} value={r.id}>
        {r.name_kr} ({r.region_group})
      </option>
    ));
  };

  // COURSE GENERATION ALGORITHM: 인접 지역 기반 랜덤 코스 (지정한 수만큼 정확히 코스 생성)
  const generateCourse = (startId: string, limit: number): Region[] => {
    const pool =
      regionsPool.length > 0
        ? regionsPool
        : ALL_REGIONS.filter((r) => r.level === settings.level);
    if (pool.length === 0) return [];

    const path: Region[] = [];
    const visitedSet = new Set<string>();

    // Step A: Find starting point
    let current: Region | undefined;
    if (startId && startId !== "random") {
      current = pool.find((r) => r.id === startId);
    }

    if (!current) {
      current = pool[Math.floor(Math.random() * pool.length)];
    }

    if (!current) return [];

    path.push(current);
    visitedSet.add(current.id);

    // Always generate exactly `limit` stations
    const maxSteps = Math.max(limit, 1);

    while (path.length < maxSteps) {
      // 1. Unvisited neighbors in pool
      const unvisitedNeighbors = current.neighbors.filter(
        (neighId) => !visitedSet.has(neighId) && pool.some((p) => p.id === neighId)
      );

      if (unvisitedNeighbors.length > 0) {
        const nextId = unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)];
        const nextReg = pool.find((r) => r.id === nextId);
        if (nextReg) {
          current = nextReg;
          path.push(current);
          visitedSet.add(current.id);
          continue;
        }
      }

      // 2. Unvisited regions anywhere in pool (KTX Jump)
      const unvisitedPool = pool.filter((r) => !visitedSet.has(r.id));
      if (unvisitedPool.length > 0) {
        let closest: Region = unvisitedPool[0];
        let minDistance = Infinity;

        for (const unv of unvisitedPool) {
          const dist = Math.sqrt((unv.lat - current.lat) ** 2 + (unv.lng - current.lng) ** 2);
          if (dist < minDistance) {
            minDistance = dist;
            closest = unv;
          }
        }

        current = closest;
        path.push(current);
        visitedSet.add(current.id);
        continue;
      }

      // 3. All regions in pool visited at least once: allow revisiting neighbors in pool
      const poolNeighbors = current.neighbors.filter((neighId) => pool.some((p) => p.id === neighId));
      if (poolNeighbors.length > 0) {
        const nextId = poolNeighbors[Math.floor(Math.random() * poolNeighbors.length)];
        const nextReg = pool.find((r) => r.id === nextId);
        if (nextReg) {
          current = nextReg;
          path.push(current);
          continue;
        }
      }

      // 4. Fallback: pick any other region in pool
      const otherInPool = pool.filter((r) => r.id !== current?.id);
      const candidates = otherInPool.length > 0 ? otherInPool : pool;
      const nextReg = candidates[Math.floor(Math.random() * candidates.length)];
      if (nextReg) {
        current = nextReg;
        path.push(current);
      } else {
        break;
      }
    }

    return path;
  };

  const formatTravelTime = (seconds: number) => {
    const safeSecs = typeof seconds === "number" && !isNaN(seconds) && seconds >= 0 ? seconds : 0;
    const mins = Math.floor(safeSecs / 60);
    const secs = Math.floor(safeSecs % 60);
    const millis = Math.floor((safeSecs % 1) * 100);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}.${millis.toString().padStart(2, "0")}`;
  };

  const handleStartSetup = (overrideCount?: number) => {
    initAudio();
    const countToUse = overrideCount || settings.targetCount;
    const startIdToUse = (startingRegionId && startingRegionId !== "random")
      ? startingRegionId
      : (settings.startRegionId && settings.startRegionId !== "random" ? settings.startRegionId : "random");
    const generated = generateCourse(startIdToUse, countToUse);
    if (generated.length === 0) {
       alert("적합한 경로를 생성할 수 없습니다. 설정을 변경해 보세요.");
       return;
    }

    setCoursePath(generated);
    setCurrentIndex(0);
    setVisitedRegions([generated[0]]);
    setCourseHistory([generated[0].id]);
    setGameTime(0);
    setTotalKeystrokes(0);
    setErrorCount(0);
    
    // Reset our precise refs
    prevStationsKeystrokesRef.current = 0;
    prevStationsErrorsRef.current = 0;
    totalKeystrokesRef.current = 0;
    errorCountRef.current = 0;
    gameTimeRef.current = 0;
    lastKeystrokeTimeRef.current = Date.now();

    setStats({
      cpm: 0,
      accuracy: 1,
      elapsedTime: 0,
      combo: 0,
      maxCombo: 0,
      visitedCount: 1,
      completed: false,
    });

    // Fetch trivia for starting region
    fetchRegionTrivia(generated[0]);

    setCountdown(3);
    setGameState("countdown");
  };

  const handleStartRankingChallenge = () => {
    const trimmed = nickname.trim();
    if (!trimmed || trimmed === "타자왕") {
      setNicknameError(true);
      setAlertText("🏆 랭킹 도전을 위해 기본 닉네임('타자왕')이 아닌 나만의 닉네임을 입력해 주세요!");
      setIsAlertActive(true);
      setTimeout(() => setIsAlertActive(false), 3500);
      const inputEl = document.getElementById("nickname-input");
      if (inputEl) inputEl.focus();
      return;
    }

    setNicknameError(false);
    setSettings((prev) => ({ ...prev, targetCount: 20, strictMode: true }));
    setActiveMode("single");
    handleStartSetup(20);
  };

  // ==========================================
  // 2. RUNNING TIMERS & MULTIPLAYER BOTS
  // ==========================================

  // Countdown timer effect
  useEffect(() => {
    if (gameState !== "countdown") return;
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setGameState("playing");
          lastSuccessTimeRef.current = Date.now();
          startPreciseTimers();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState]);

  const calculateSafeCpm = (keys: number, elapsedSecs: number) => {
    if (elapsedSecs <= 0.1 || keys <= 0) return 0;
    const effectiveSecs = Math.max(elapsedSecs, 4.0);
    const mins = effectiveSecs / 60;
    const raw = Math.round(keys / mins);

    if (elapsedSecs < 4.0) {
      const ratio = elapsedSecs / 4.0;
      return Math.min(Math.round(raw * Math.sqrt(ratio)), 750);
    }
    return Math.min(raw, 950);
  };

  // Start precision running clock & simulated opponent tracks
  const startPreciseTimers = () => {
    // Clear existing
    if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);

    // Stopwatch increment (runs every 100ms for high performance stopwatch and real-time CPM updates)
    gameIntervalRef.current = setInterval(() => {
      gameTimeRef.current += 0.1;
      setGameTime(gameTimeRef.current);

      setStats((prevStats) => {
        const baseCpm = calculateSafeCpm(totalKeystrokesRef.current, gameTimeRef.current);
        const idleTimeMs = Date.now() - lastKeystrokeTimeRef.current;
        let decayedCpm = baseCpm;
        
        if (idleTimeMs > 1000) {
          const idleSeconds = (idleTimeMs - 1000) / 1000;
          // Decay faster: decrease speed exponentially by 0.5 every second of idle time
          decayedCpm = Math.round(baseCpm * Math.pow(0.5, idleSeconds));
        }

        const safeCpm = isNaN(decayedCpm) ? 0 : Math.min(decayedCpm, 950);

        // Periodically sync multiplayer room status
        if (activeMode === "multiplayer" && multiplayerRoom) {
          const totalPressed = totalKeystrokesRef.current + errorCountRef.current;
          const accPct = totalPressed > 0 ? Math.round((totalKeystrokesRef.current / totalPressed) * 100) : 100;
          multiplayerRoom.updateProgress(currentIndex, safeCpm, accPct, false, gameTimeRef.current);
        }

        return {
          ...prevStats,
          cpm: safeCpm,
          elapsedTime: gameTimeRef.current,
        };
      });
    }, 100);
  };

  // Cleanup timers on unmount or status change
  useEffect(() => {
    return () => {
      if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
      if (cpmIntervalRef.current) clearInterval(cpmIntervalRef.current);
    };
  }, []);

  // Listen to keyboard Tab / Escape keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!e || typeof e.key !== "string") return;
      if (e.key === "Tab") {
        e.preventDefault();
        setShowCourseListModal((prev) => !prev);
      } else if (e.key === "Escape") {
        setShowCourseListModal(false);
        setShowLeaderboardModal(false);
        setShowSettingsModal(false);
        setShowGuideModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ==========================================
  // 3. TYPING SUCCESS OR DISASTER HANDLERS
  // ==========================================

  const handleTypingSuccess = (inputLength: number, keystrokes: number, errorCountFromInput: number) => {
    const nextIdx = currentIndex + 1;
    const isCompleted = nextIdx >= coursePath.length;

    // Update our cumulative refs since a station is completed
    prevStationsKeystrokesRef.current += keystrokes;
    prevStationsErrorsRef.current += errorCountFromInput;

    totalKeystrokesRef.current = prevStationsKeystrokesRef.current;
    errorCountRef.current = prevStationsErrorsRef.current;

    setTotalKeystrokes(prevStationsKeystrokesRef.current);
    setErrorCount(prevStationsErrorsRef.current);

    lastKeystrokeTimeRef.current = Date.now();

    // Calculate accuracy ratio
    const totalPressed = totalKeystrokesRef.current + errorCountRef.current;
    const currentAcc = totalPressed > 0
      ? Math.max(totalKeystrokesRef.current / totalPressed, 0.1)
      : 1;

    // Check if dead end jump occurred
    const activeRegion = coursePath[currentIndex];
    const nextRegion = coursePath[nextIdx];

    if (activeRegion && nextRegion && activeRegion.neighbors && !activeRegion.neighbors.includes(nextRegion.id)) {
      // Trigger KTX jump announcement alert!
      setAlertText(`🛤️ 막다른 길 도착! KTX 연계 고속 환승을 통해 [${nextRegion.name_kr}]지역으로 장거리 점프 운행합니다!`);
      setIsAlertActive(true);
      setTimeout(() => setIsAlertActive(false), 4500);
    }

    if (isCompleted) {
      // Conclude Game!
      if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
      playCompleteSound();

      const finalTime = gameTimeRef.current;
      const finalCpm = calculateSafeCpm(totalKeystrokesRef.current, finalTime);

      const updatedStats = {
        cpm: isNaN(finalCpm) ? 240 : finalCpm,
        accuracy: currentAcc,
        elapsedTime: finalTime,
        combo: stats.combo + 1,
        maxCombo: Math.max(stats.maxCombo, stats.combo + 1),
        visitedCount: coursePath.length,
        completed: true,
      };

      if (activeMode === "multiplayer" && multiplayerRoom) {
        multiplayerRoom.updateProgress(
          coursePath.length,
          finalCpm,
          Math.round(currentAcc * 100),
          true,
          finalTime
        );
      }

      setStats(updatedStats);
      setGameState("results");

      // Auto-submit score to cloud & local leaderboard ONLY when game is completed with 16 stations and NOT in quiz mode
      if (coursePath.length === 16 && activeMode !== "quiz" && travelWay !== "quiz") {
        submitScoreToLeaderboard({
          nickname: nickname.trim() || "무명 운행사",
          mode: settings.level,
          cpm: isNaN(finalCpm) ? 240 : finalCpm,
          accuracy: Number((currentAcc * 100).toFixed(1)),
          time_seconds: Number(finalTime.toFixed(1)),
        }).then(() => {
          setIsLeaderboardSubmitted(true);
        });
      }

      // Compile AI dynamic results travel summary
      generateAITravelSummary(coursePath);
    } else {
      // Advance to next node
      playSuccessSound();
      const upcomingVisited = [...visitedRegions, nextRegion];
      const upcomingHistory = [...courseHistory, nextRegion.id];

      setCurrentIndex(nextIdx);
      setVisitedRegions(upcomingVisited);
      setCourseHistory(upcomingHistory);

      setStats((prev) => {
        const nextCombo = prev.combo + 1;
        return {
          ...prev,
          accuracy: currentAcc,
          combo: nextCombo,
          maxCombo: Math.max(prev.maxCombo, nextCombo),
          visitedCount: upcomingVisited.length,
        };
      });

      // Fetch region trivia details
      fetchRegionTrivia(nextRegion);
    }
  };

  const handleKeystroke = (currentStationKeystrokes: number, currentStationErrors: number) => {
    const totalKeys = prevStationsKeystrokesRef.current + currentStationKeystrokes;
    const totalErrors = prevStationsErrorsRef.current + currentStationErrors;

    totalKeystrokesRef.current = totalKeys;
    errorCountRef.current = totalErrors;

    setTotalKeystrokes(totalKeys);
    setErrorCount(totalErrors);

    lastKeystrokeTimeRef.current = Date.now();

    setStats((prev) => {
      const totalPressed = totalKeys + totalErrors;
      const currentAcc = totalPressed > 0 ? Math.max(totalKeys / totalPressed, 0.1) : 1;
      const calculatedCpm = calculateSafeCpm(totalKeys, gameTimeRef.current);

      if (activeMode === "multiplayer" && multiplayerRoom) {
        multiplayerRoom.updateProgress(
          currentIndex,
          calculatedCpm,
          Math.round(currentAcc * 100),
          false,
          gameTimeRef.current
        );
      }

      return {
        ...prev,
        accuracy: currentAcc,
        cpm: calculatedCpm,
      };
    });
  };

  // ==========================================
  // 4. SERVER-SIDE GEMINI API CONNECTIONS
  // ==========================================

  const fetchRegionTrivia = async (region: Region) => {
    setTriviaLoading(true);
    setArrivedRegionTrivia(null);
    try {
      const response = await fetch("/api/gemini/trivia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          regionId: region.id,
          regionName: region.name_kr,
          regionEn: region.name_en,
          description: region.description,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setArrivedRegionTrivia({
          trivia: data.trivia || [],
          food: data.food || [],
          landmark: data.landmark || [],
        });
      }
    } catch (err) {
      console.error("Failed to load region trivia:", err);
    } finally {
      setTriviaLoading(false);
    }
  };

  // Generate dynamic travel journal from path
  const generateAITravelSummary = async (pathList: Region[]) => {
    try {
      // Simple custom client summary fallback
      const names = pathList.map((r) => r.name_kr).join(" ➔ ");
      setEndTravelSummary(
        `기차 열차를 운행하여 ${pathList[0].name_kr}을 출발해 총 ${pathList.length}개 정거장(${names})을 통과하며 대한민국 국토를 대정복했습니다! 운항 도중 평균 속도 ${stats.cpm} CPM의 고속 주행을 유지하며 명예 Conducting 기사 1급 인증 마크를 수여받기에 완벽한 기록을 수립하셨습니다.`
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Quiz Mode Question Loader - Redesigned to be map-based guessing without Gemini API calls
  const handleLoadQuizQuestions = () => {
    setQuizLoading(true);
    setQuizCompleted(false);
    setQuizScore(0);
    setCurrentQuizIndex(0);
    setSelectedQuizAnswer(null);
    setActiveMode("quiz");
    setGameState("playing");

    try {
      // Determine quiz level based on the selected setting
      const levelPool =
        settings.level === "sido"
          ? SIDO_LIST
          : settings.level === "sigungu"
          ? SIGUNGU_LIST
          : settings.level === "japan"
          ? JAPAN_LIST
          : settings.level === "usa"
          ? USA_LIST
          : settings.level === "china"
          ? CHINA_LIST
          : WORLD_LIST;
      
      // Select 5 unique random regions
      const shuffled = [...levelPool].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, 5);

      const generatedQuestions = selected.map((region, idx) => {
        // Find 3 distractors from same level
        const distractors = levelPool
          .filter((r) => r.id !== region.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        
        const options = [region.name_kr, ...distractors.map((d) => d.name_kr)].sort(
          () => Math.random() - 0.5
        );

        return {
          id: `quiz-q-${idx}-${region.id}`,
          type: "name" as const,
          region: region,
          prompt: `지도에 붉게 표시된 물음표(?) 핀 위치의 이곳 이름은 무엇일까요? (권역: ${region.region_group})`,
          options: options,
          correctAnswer: region.name_kr,
        };
      });

      setQuizQuestions(generatedQuestions);
    } catch (err) {
      console.error("Failed to generate local questions", err);
    } finally {
      setQuizLoading(false);
    }
  };

  const handleSelectQuizAnswer = (answer: string) => {
    setSelectedQuizAnswer(answer);
    const isCorrect = answer === quizQuestions[currentQuizIndex].correctAnswer;
    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    setSelectedQuizAnswer(null);
    if (currentQuizIndex + 1 < quizQuestions.length) {
      setCurrentQuizIndex((prev) => prev + 1);
    } else {
      setQuizCompleted(true);
      setGameState("results");
    }
  };

  // ==========================================
  // 5. RENDERING DYNAMIC INTERFACES
  // ==========================================



  const getConductorGrade = () => {
    if (stats.cpm >= 350 && stats.accuracy >= 0.94) return { title: "S급 특급 열차 Conducter", style: "from-amber-400 to-rose-500 text-amber-100", medal: "👑" };
    if (stats.cpm >= 230 && stats.accuracy >= 0.88) return { title: "A급 새마을 운행 기사", style: "from-blue-400 to-emerald-500 text-blue-100", medal: "🎖️" };
    return { title: "B급 무궁화 열차 조종사", style: "from-slate-500 to-slate-700 text-slate-200", medal: "🎫" };
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-500 text-slate-800 selection:bg-slate-200 selection:text-slate-900 ${
      gameState === "home"
        ? homeScope === "japan"
          ? "bg-rose-50/50 dark:bg-slate-950"
          : homeScope === "usa"
          ? "bg-blue-50/40 dark:bg-slate-950"
          : homeScope === "world"
          ? "bg-slate-100 dark:bg-slate-950"
          : "bg-[#dceee9]/70 dark:bg-slate-950"
        : "bg-slate-100 dark:bg-slate-950"
    }`}>
      {/* BACKGROUND MAP WATERMARK LAYER FOR HOME SCREEN */}
      {gameState === "home" && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
          <img
            src={
              homeScope === "korea"
                ? cleanKoreaMapBg
                : homeScope === "japan"
                ? japanMapBg
                : homeScope === "usa"
                ? usaMapBg
                : homeScope === "china"
                ? chinaMapBg
                : cleanWorldMapBg
            }
            alt="Background Map"
            className={`w-full h-full object-cover transition-all duration-700 ${
              homeScope === "korea"
                ? "scale-105 opacity-50 dark:opacity-35 filter brightness-105 contrast-90 blur-[2.5px]"
                : homeScope === "japan"
                ? "scale-105 opacity-45 dark:opacity-30 filter brightness-105 contrast-90 blur-[2.5px]"
                : homeScope === "usa"
                ? "scale-105 opacity-40 dark:opacity-25 filter brightness-105 contrast-90 blur-[2.5px]"
                : homeScope === "china"
                ? "scale-105 opacity-50 dark:opacity-35 filter brightness-105 contrast-90 blur-[2.5px]"
                : "scale-105 opacity-45 dark:opacity-30 filter grayscale contrast-90 blur-[2.5px]"
            }`}
          />
          {/* Uniform Foggy & Misty Atmosphere Overlay */}
          <div className={`absolute inset-0 backdrop-blur-[2px] transition-colors duration-500 ${
            homeScope === "japan"
              ? "bg-rose-50/65 dark:bg-slate-950/75"
              : homeScope === "usa"
              ? "bg-blue-50/65 dark:bg-slate-950/75"
              : homeScope === "china"
              ? "bg-amber-50/65 dark:bg-slate-950/75"
              : homeScope === "world"
              ? "bg-slate-100/65 dark:bg-slate-950/75"
              : "bg-[#dceee9]/65 dark:bg-slate-950/75"
          }`} />
        </div>
      )}

      {/* 1. HEADER BAR */}
      <header className={`border-b relative z-30 px-4 sm:px-8 py-3 flex items-center justify-between select-none transition-colors duration-500 text-slate-800 ${
        gameState === "home"
          ? "bg-transparent border-emerald-900/10 dark:border-slate-800/60"
          : "bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-slate-200/60 dark:border-slate-800/60"
      }`}>
        <div className="flex items-center gap-3">
          {gameState !== "home" && (
            <button
              onClick={() => {
                if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
                if (cpmIntervalRef.current) clearInterval(cpmIntervalRef.current);
                setGameState("home");
                setActiveMode(null);
              }}
              className="p-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors cursor-pointer flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          {/* Logo with Map Icon */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setGameState("home")}>
            <img
              src={mapTypingLogo}
              alt="MAP TYPING"
              className="w-9 h-9 rounded-xl object-cover shadow-sm border border-slate-200/60 dark:border-slate-700"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <div className="flex flex-col">
              <h1 className="text-sm font-black tracking-tight font-sans text-slate-900 dark:text-white leading-none">
                MAP TYPING
              </h1>
            </div>
          </div>

          {/* Scope Selector Pills */}
          {gameState === "home" && (
            <div className="flex items-center bg-slate-100/80 dark:bg-slate-800 p-1 rounded-full border border-slate-200/80 dark:border-slate-700 shadow-inner ml-2 sm:ml-4 gap-1 overflow-x-auto max-w-[280px] sm:max-w-none">
              {[
                { id: "korea", label: "한국", activeColor: "bg-emerald-600 text-white" },
                { id: "japan", label: "일본", activeColor: "bg-rose-600 text-white" },
                { id: "usa", label: "미국", activeColor: "bg-blue-600 text-white" },
                { id: "china", label: "중국", activeColor: "bg-amber-500 text-slate-950 font-black" },
                { id: "world", label: "전세계", activeColor: "bg-slate-700 dark:bg-slate-600 text-white" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setHomeScope(item.id as any);
                    setStartingRegionId("random");
                    if (item.id === "korea") setSettings(p => ({ ...p, level: "sido", regionGroup: "전체" }));
                    else if (item.id === "japan") setSettings(p => ({ ...p, level: "japan", regionGroup: "전체" }));
                    else if (item.id === "usa") setSettings(p => ({ ...p, level: "usa", regionGroup: "전체" }));
                    else if (item.id === "china") setSettings(p => ({ ...p, level: "china", regionGroup: "전체" }));
                    else setSettings(p => ({ ...p, level: "world", regionGroup: "전체" }));
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center whitespace-nowrap cursor-pointer ${
                    homeScope === item.id
                      ? `${item.activeColor} shadow-sm`
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60"
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* User Nickname Pill */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-black text-xs px-3.5 py-1.5 rounded-full shadow-sm flex items-center gap-1">
            <span>{nickname || "게스트"}</span>
          </div>

          {/* Simple Map Toggle Button */}
          <button
            onClick={() => setShowSimpleMap((prev) => !prev)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-sm"
          >
            <MapIcon className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>지도 보기</span>
          </button>

          {/* Settings Wheel Button */}
          <button
            onClick={() => setShowSettingsModal(true)}
            className="p-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer shadow-sm"
            title="효과음 및 설정"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 2. DYNAMIC WORKSPACE COMPILER */}
      <main
        className={`flex-1 w-full relative flex flex-col items-center justify-center ${
          gameState === "playing"
            ? "p-0 m-0 max-w-none h-[calc(100vh-64px)] min-h-[550px] overflow-hidden"
            : "p-4 md:p-6 max-w-7xl mx-auto gap-6"
        }`}
      >
        {/* FLASH ALERTS LAYER */}
        {isAlertActive && (
          <div className="absolute top-4 z-40 bg-amber-500 text-slate-950 font-bold px-6 py-3.5 rounded-2xl border border-white/20 shadow-2xl flex items-center gap-3 animate-bounce">
            <AlertCircle className="w-5 h-5 animate-pulse shrink-0" />
            <span className="text-sm tracking-wide">{alertText}</span>
          </div>
        )}

        {/* ==========================================
            A. HOME SCREEN
            ========================================== */}
        {gameState === "home" && (
          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6 animate-fade-in select-none relative">
            {/* Left Hero Title & Description */}
            <div className="lg:col-span-6 space-y-6 text-left relative z-10">
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white leading-[1.2] tracking-tight">
                지역 이름을 타이핑하고 <br />
                <span className={`transition-colors font-extrabold ${
                  homeScope === "korea"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : homeScope === "japan"
                    ? "text-rose-600 dark:text-rose-400"
                    : homeScope === "usa"
                    ? "text-blue-600 dark:text-blue-400"
                    : homeScope === "china"
                    ? "text-amber-500 dark:text-amber-400"
                    : "text-slate-500 dark:text-slate-400"
                }`}>
                  {homeScope === "korea"
                    ? "대한민국을 여행해요."
                    : homeScope === "japan"
                    ? "일본을 여행해요."
                    : homeScope === "usa"
                    ? "미국을 여행해요."
                    : homeScope === "china"
                    ? "중국을 여행해요."
                    : "전세계를 여행해요."}
                </span>
              </h2>

              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-lg font-medium">
                지도를 따라 지역 이름이 하나씩 등장합니다. 보이는 대로 빠르게 입력하면 캐릭터가 가까운 지역으로 걸어가요. 선택한 지역을 얼마나 빠르게 완주할 수 있을까요?
              </p>
              
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                로그인 없이 닉네임만 적고 즉시 멀티플레이와 타자 여행을 즐기실 수 있어요.
              </p>

              {/* Leaderboard CTA Button */}
              <div className="pt-2">
                <button
                  onClick={() => setShowLeaderboardModal(true)}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Trophy className="w-4 h-4 fill-slate-950" />
                  <span>실시간 명예의 전당 랭킹 보기</span>
                </button>
              </div>
            </div>

            {/* Right Interactive Selection Card */}
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6 text-slate-800 dark:text-slate-100 relative z-10">
              {/* Mode Switcher Tabs (Single vs Multiplayer) */}
              <div className="bg-slate-100 dark:bg-slate-800/80 p-1 rounded-2xl flex gap-1 border border-slate-200/60 dark:border-slate-700">
                <button
                  onClick={() => setHomeTab("single")}
                  className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    homeTab === "single"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm border border-slate-200/80 dark:border-slate-700"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current text-slate-700 dark:text-slate-300" />
                  <span>싱글 플레이</span>
                </button>

                <button
                  onClick={() => setHomeTab("multiplayer")}
                  className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    homeTab === "multiplayer"
                      ? homeScope === "japan"
                        ? "bg-rose-600 text-white shadow-sm"
                        : homeScope === "usa"
                        ? "bg-blue-600 text-white shadow-sm"
                        : homeScope === "china"
                        ? "bg-amber-500 text-slate-950 font-black shadow-sm"
                        : homeScope === "world"
                        ? "bg-slate-800 dark:bg-slate-700 text-white shadow-sm"
                        : "bg-emerald-600 text-white shadow-sm"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  <span>👥 멀티플레이</span>
                </button>
              </div>

              {/* TAB CONTENT: Single Play Form */}
              {homeTab === "single" && (
                <div className="space-y-4 pt-1 text-left">
                  {/* Header Title */}
                  <div>
                    <span className={`text-[10px] font-extrabold uppercase tracking-widest block mb-0.5 ${
                      homeScope === "korea"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : homeScope === "japan"
                        ? "text-rose-600 dark:text-rose-400"
                        : homeScope === "usa"
                        ? "text-blue-600 dark:text-blue-400"
                        : homeScope === "china"
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-slate-500 dark:text-slate-400"
                    }`}>
                      여행 설정 ({
                        homeScope === "korea"
                          ? "대한민국"
                          : homeScope === "japan"
                          ? "일본"
                          : homeScope === "usa"
                          ? "미국"
                          : homeScope === "china"
                          ? "중국"
                          : "전세계"
                      })
                    </span>
                    <h3 className="text-base font-black text-slate-900 dark:text-white">원하는 방식으로 환경을 선택하세요</h3>
                  </div>

                  {/* Player Nickname Input */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block">
                        운행사 닉네임 <span className="text-amber-600 font-extrabold">(랭킹 도전 시 필수)</span>
                      </label>
                      {nicknameError && (
                        <span className="text-[10px] font-bold text-rose-500 animate-pulse">닉네임을 입력하세요!</span>
                      )}
                    </div>
                    <input
                      id="nickname-input"
                      type="text"
                      value={nickname}
                      onChange={(e) => {
                        setNickname(e.target.value);
                        if (e.target.value.trim()) setNicknameError(false);
                      }}
                      placeholder="닉네임 입력"
                      className={`w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none transition-all ${
                        nicknameError
                          ? "border-rose-500 ring-2 ring-rose-500/30 bg-rose-50/50"
                          : "border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      }`}
                      maxLength={12}
                    />
                  </div>

                  {/* Play Mode Selection: 타자 모드 vs 퀴즈 모드 */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">
                      플레이 모드 선택
                    </label>
                    <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
                      <button
                        type="button"
                        onClick={() => setTravelWay("typing")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          travelWay === "typing"
                            ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700 font-black"
                            : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                        }`}
                      >
                        <span>⌨️ 타자 모드</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setTravelWay("quiz");
                          setIsRankingChallenge(false);
                        }}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          travelWay === "quiz"
                            ? homeScope === "japan" || settings.level === "japan"
                              ? "bg-rose-600 text-white shadow-sm font-black"
                              : homeScope === "usa" || settings.level === "usa"
                              ? "bg-blue-600 text-white shadow-sm font-black"
                              : homeScope === "world" || settings.level === "world"
                              ? "bg-slate-600 text-white shadow-sm font-black"
                              : "bg-emerald-600 text-white shadow-sm font-black"
                            : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                        }`}
                      >
                        <span>🧩 퀴즈 모드</span>
                      </button>
                    </div>
                  </div>

                  {/* Travel Unit & Range Selection */}
                  {homeScope === "korea" ? (
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block">한국 여행 단위 및 행정구역</span>
                      
                      {/* Level Selection (sido vs sigungu) */}
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSettings(p => ({ ...p, level: "sido" }))}
                          className={`py-2 px-2 text-[11px] font-bold rounded-xl border transition-all cursor-pointer ${
                            settings.level === "sido"
                              ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                              : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                          }`}
                        >
                          광역 지자체 (16개)
                        </button>

                        <button
                          type="button"
                          onClick={() => setSettings(p => ({ ...p, level: "sigungu" }))}
                          className={`py-2 px-2 text-[11px] font-bold rounded-xl border transition-all cursor-pointer ${
                            settings.level === "sigungu"
                              ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                              : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                          }`}
                        >
                          시·군·구 (230개)
                        </button>
                      </div>

                      {/* Region Group Sub-pills */}
                      <div className="pt-1">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block mb-1">세부 권역 필터</span>
                        <div className="flex flex-wrap gap-1">
                          {["전체", "수도권", "충청권", "호남권", "영남권", "강원/제주권"].map((grp) => (
                            <button
                              key={grp}
                              type="button"
                              onClick={() => setSettings(p => ({ ...p, regionGroup: grp }))}
                              className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
                                settings.regionGroup === grp
                                  ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-slate-900 dark:border-slate-100"
                                  : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                              }`}
                            >
                              {grp}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : homeScope === "japan" ? (
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 block">일본 47개 도도부현 권역 ({JAPAN_LIST.length}개 지역)</span>
                      
                      <div className="pt-0.5">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block mb-1">권역 필터</span>
                        <div className="flex flex-wrap gap-1">
                          {["전체", "간토", "간사이", "규슈", "주부", "도호쿠", "홋카이도", "오키나와"].map((grp) => (
                            <button
                              key={grp}
                              type="button"
                              onClick={() => setSettings(p => ({ ...p, level: "japan", regionGroup: grp }))}
                              className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
                                settings.regionGroup === grp
                                  ? "bg-rose-600 text-white border-rose-600 shadow-sm"
                                  : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                              }`}
                            >
                              {grp}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : homeScope === "usa" ? (
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 block">미국 50개 주 전체 권역 ({USA_LIST.length}개 주·D.C.)</span>
                      
                      <div className="pt-0.5">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block mb-1">권역 필터</span>
                        <div className="flex flex-wrap gap-1">
                          {["전체", "동부", "서부", "중부", "남부", "태평양"].map((grp) => (
                            <button
                              key={grp}
                              type="button"
                              onClick={() => setSettings(p => ({ ...p, level: "usa", regionGroup: grp }))}
                              className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
                                settings.regionGroup === grp
                                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                                  : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                              }`}
                            >
                              {grp}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : homeScope === "china" ? (
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 block">중국 34개 성급 행정구역 ({CHINA_LIST.length}개 성·직할시·자치구)</span>
                      
                      <div className="pt-0.5">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block mb-1">권역 필터</span>
                        <div className="flex flex-wrap gap-1">
                          {["전체", "화북", "동북", "화동", "중남", "서남", "서북", "직할시", "특별행정구"].map((grp) => (
                            <button
                              key={grp}
                              type="button"
                              onClick={() => setSettings(p => ({ ...p, level: "china", regionGroup: grp }))}
                              className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
                                settings.regionGroup === grp
                                  ? "bg-amber-500 text-slate-950 border-amber-500 font-extrabold shadow-sm"
                                  : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                              }`}
                            >
                              {grp}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">전세계 대륙 선택 (총 197개국)</span>
                      
                      {/* Continent selection buttons */}
                      <div className="grid grid-cols-3 gap-1.5">
                        {[
                          { name: "전체", label: "전세계 전체 (197)" },
                          { name: "아시아", label: "아시아 (48)" },
                          { name: "유럽", label: "유럽 (45)" },
                          { name: "아메리카", label: "아메리카 (35)" },
                          { name: "아프리카", label: "아프리카 (54)" },
                          { name: "오세아니아", label: "오세아니아 (15)" },
                        ].map((cont) => {
                          const isSelected = settings.level === "world" && settings.regionGroup === cont.name;
                          return (
                            <button
                              key={cont.name}
                              type="button"
                              onClick={() => setSettings(p => ({ ...p, level: "world", regionGroup: cont.name }))}
                              className={`py-2 px-2 text-[11px] font-bold rounded-xl border transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-slate-700 dark:bg-slate-600 text-white border-slate-700 dark:border-slate-600 shadow-sm"
                                  : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                              }`}
                            >
                              {cont.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Target Station Count */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">목표 지역 수</span>
                      <span className="text-[10px] text-slate-400 font-medium">직접 입력 가능</span>
                    </div>
                    <div className="flex flex-wrap sm:flex-nowrap gap-1.5 items-center">
                      <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex-1 min-w-[180px]">
                        {[10, 16, 30].map((cnt) => (
                          <button
                            key={cnt}
                            type="button"
                            onClick={() => {
                              setSettings(p => ({ ...p, targetCount: cnt }));
                              setCustomTargetInput(String(cnt));
                            }}
                            className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                              settings.targetCount === cnt
                                ? homeScope === "china" || settings.level === "china"
                                  ? "bg-amber-500 text-slate-950 shadow-sm font-black"
                                  : homeScope === "world" || settings.level === "world"
                                  ? "bg-slate-700 text-white shadow-sm font-black"
                                  : homeScope === "japan" || settings.level === "japan"
                                  ? "bg-rose-600 text-white shadow-sm font-black"
                                  : homeScope === "usa" || settings.level === "usa"
                                  ? "bg-blue-600 text-white shadow-sm font-black"
                                  : "bg-emerald-600 text-white shadow-sm font-black"
                                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                            }`}
                          >
                            {cnt === 16 ? "16개 🏆" : `${cnt}개`}
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shrink-0">
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 pl-1">직접:</span>
                        <input
                          type="number"
                          min={1}
                          max={300}
                          value={customTargetInput}
                          onChange={(e) => {
                            const raw = e.target.value;
                            setCustomTargetInput(raw);
                            if (raw !== "") {
                              const parsed = parseInt(raw, 10);
                              if (!isNaN(parsed) && parsed > 0) {
                                setSettings((p) => ({ ...p, targetCount: Math.min(300, parsed) }));
                              }
                            }
                          }}
                          onBlur={() => {
                            if (!customTargetInput || parseInt(customTargetInput, 10) <= 0 || isNaN(parseInt(customTargetInput, 10))) {
                              setCustomTargetInput(String(settings.targetCount || 10));
                              if (!settings.targetCount) {
                                setSettings((p) => ({ ...p, targetCount: 10 }));
                              }
                            }
                          }}
                          placeholder="개수"
                          className="w-14 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-1 px-1.5 text-center text-[11px] font-black text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 pr-1">개</span>
                      </div>
                    </div>
                  </div>

                  {/* Ranking Challenge Mode Checkbox */}
                  <div className={`p-3 border rounded-xl flex items-center justify-between gap-3 transition-all ${
                    travelWay === "quiz"
                      ? "bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 opacity-60"
                      : "bg-amber-50 dark:bg-amber-950/40 border-amber-200/80 dark:border-amber-800/60"
                  }`}>
                    <label htmlFor="ranking-challenge-checkbox" className="flex items-center gap-2.5 cursor-pointer select-none w-full">
                      <input
                        id="ranking-challenge-checkbox"
                        type="checkbox"
                        disabled={travelWay === "quiz"}
                        checked={travelWay !== "quiz" && isRankingChallenge}
                        onChange={(e) => {
                          if (travelWay === "quiz") return;
                          const checked = e.target.checked;
                          setIsRankingChallenge(checked);
                          if (checked) {
                            setSettings((prev) => ({ ...prev, targetCount: 16, strictMode: true }));
                          }
                        }}
                        className="w-4 h-4 accent-amber-600 rounded cursor-pointer border-slate-300 dark:border-slate-600"
                      />
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-slate-900 dark:text-amber-200 flex items-center gap-1">
                          🏆 랭킹 도전 모드 (16개 완주)
                        </span>
                        <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 leading-tight">
                          {travelWay === "quiz"
                            ? "⚠️ 퀴즈 모드에서는 랭킹 도전을 할 수 없습니다 (타자 모드 전용)"
                            : "체크 시 16개 완주 고정 & 완주 기록 명예의 전당 등록 (닉네임 필수)"}
                        </span>
                      </div>
                    </label>
                  </div>

                  {/* Main Clean Start Button: 출발 ➔ */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (isRankingChallenge && travelWay !== "quiz") {
                          const trimmed = nickname.trim();
                          if (!trimmed || trimmed === "타자왕") {
                            setNicknameError(true);
                            setAlertText("🏆 랭킹 도전을 위해 기본 닉네임('타자왕')이 아닌 나만의 닉네임을 입력해 주세요!");
                            setIsAlertActive(true);
                            setTimeout(() => setIsAlertActive(false), 3500);
                            const inputEl = document.getElementById("nickname-input");
                            if (inputEl) inputEl.focus();
                            return;
                          }
                          setNicknameError(false);
                          setSettings((prev) => ({ ...prev, targetCount: 16, strictMode: true }));
                          setActiveMode("single");
                          handleStartSetup(16);
                        } else {
                          setActiveMode(travelWay === "quiz" ? "quiz" : "single");
                          handleStartSetup();
                        }
                      }}
                      className={`w-full py-3.5 font-black text-base rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer group ${
                        isRankingChallenge && travelWay !== "quiz"
                          ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/20 border border-amber-300/60"
                          : travelWay === "quiz"
                          ? homeScope === "japan" || settings.level === "japan"
                            ? "bg-rose-600 hover:bg-rose-500 text-white"
                            : homeScope === "usa" || settings.level === "usa"
                            ? "bg-blue-600 hover:bg-blue-500 text-white"
                            : homeScope === "china" || settings.level === "china"
                            ? "bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-amber-500/20"
                            : homeScope === "world" || settings.level === "world"
                            ? "bg-slate-600 hover:bg-slate-500 text-white"
                            : "bg-emerald-600 hover:bg-emerald-500 text-white"
                          : "bg-slate-900 hover:bg-slate-800 text-white"
                      }`}
                    >
                      <span>
                        {isRankingChallenge && travelWay !== "quiz"
                          ? "🏆 랭킹 도전 출발 ➔"
                          : travelWay === "quiz"
                          ? "🧩 퀴즈 여행 출발 ➔"
                          : "출발 ➔"}
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB CONTENT: Multiplayer Mode Form */}
              {homeTab === "multiplayer" && (
                <MultiplayerView
                  nickname={nickname}
                  onSetNickname={setNickname}
                  onBackToHome={() => setHomeTab("single")}
                  homeScope={homeScope}
                  allRegionsData={{
                    sido: SIDO_LIST,
                    sigungu: SIGUNGU_LIST,
                    japan: JAPAN_LIST,
                    usa: USA_LIST,
                    china: CHINA_LIST,
                    world: WORLD_LIST,
                  }}
                  onStartMultiplayerGame={(room, initialRoomState) => {
                    const stations = initialRoomState.stations || [];
                    if (!stations || stations.length === 0) return;

                    setMultiplayerRoom(room);
                    setMultiplayerRoomState(initialRoomState);
                    setActiveMode("multiplayer");
                    setCoursePath(stations);
                    setCurrentIndex(0);
                    setVisitedRegions([stations[0]]);
                    setCourseHistory([stations[0].id]);

                    setGameTime(0);
                    gameTimeRef.current = 0;
                    setTotalKeystrokes(0);
                    setErrorCount(0);
                    prevStationsKeystrokesRef.current = 0;
                    prevStationsErrorsRef.current = 0;
                    totalKeystrokesRef.current = 0;
                    errorCountRef.current = 0;
                    lastKeystrokeTimeRef.current = Date.now();

                    setStats({
                      cpm: 0,
                      accuracy: 1,
                      elapsedTime: 0,
                      combo: 0,
                      maxCombo: 0,
                      visitedCount: 1,
                      completed: false,
                    });

                    setCountdown(3);
                    setGameState("countdown");
                  }}
                />
              )}
            </div>
          </div>
        )}

        {/* ==========================================
            B. SETUP OVERLAY MODAL SCREEN
            ========================================== */}
        {gameState === "setup" && (
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl animate-fade-in select-none relative text-slate-800 dark:text-slate-100">
            <button
              onClick={() => {
                setGameState("home");
                setActiveMode(null);
              }}
              className="absolute top-6 right-6 p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Title */}
            <div className="flex items-center gap-2 mb-6">
              <Settings
                className={`w-5 h-5 animate-spin ${
                  settings.level === "china"
                    ? "text-amber-500"
                    : settings.level === "world"
                    ? "text-slate-600 dark:text-slate-400"
                    : settings.level === "japan"
                    ? "text-rose-600 dark:text-rose-400"
                    : settings.level === "usa"
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-emerald-600 dark:text-emerald-400"
                }`}
                style={{ animationDuration: "8s" }}
              />
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">운행 설정 (Train Settings Setup)</h2>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider border ${
                  settings.level === "china"
                    ? "bg-amber-100 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300"
                    : settings.level === "world"
                    ? "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-300"
                    : settings.level === "japan"
                    ? "bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300"
                    : settings.level === "usa"
                    ? "bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300"
                    : "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
                }`}
              >
                SINGLE PRACTICE
              </span>
            </div>

            <div className="flex flex-col gap-6">
              {/* Nickname Field for Leaderboard */}
              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-2">
                  운행사 닉네임 (Leaderboard Nickname)
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="랭킹 명예의 전당에 도전할 닉네임을 입력하세요"
                  className={`w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 rounded-xl p-3 text-xs text-slate-800 dark:text-slate-100 font-bold focus:outline-none focus:ring-2 shadow-sm ${
                    settings.level === "china"
                      ? "focus:ring-amber-500/20 focus:border-amber-500"
                      : settings.level === "world"
                      ? "focus:ring-slate-500/20 focus:border-slate-500"
                      : settings.level === "japan"
                      ? "focus:ring-rose-500/20 focus:border-rose-500"
                      : settings.level === "usa"
                      ? "focus:ring-blue-500/20 focus:border-blue-500"
                      : "focus:ring-emerald-500/20 focus:border-emerald-500"
                  }`}
                  maxLength={12}
                />
              </div>

              {/* Quick Preset Banner for 16 Station Ranking Challenge */}
              <div className="bg-amber-500/10 border border-amber-300/80 dark:border-amber-700/80 p-3.5 rounded-2xl flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <Trophy className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                  <div>
                    <span className="font-extrabold text-slate-900 dark:text-amber-200 block">🏆 실시간 랭킹 도전 모드 (16개 역 완주)</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block">16개 역 완주 시 랭킹 명예의 전당에 기록이 자동 등록됩니다.</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSettings((prev) => ({ ...prev, targetCount: 16, strictMode: true }));
                    setIsRankingChallenge(true);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-black transition-all whitespace-nowrap cursor-pointer shadow-sm ${
                    settings.targetCount === 16 && isRankingChallenge
                      ? "bg-emerald-600 text-white"
                      : "bg-amber-500 hover:bg-amber-600 text-slate-950"
                  }`}
                >
                  {settings.targetCount === 16 && isRankingChallenge ? "✓ 16개 적용됨" : "16개 도전 세팅"}
                </button>
              </div>

              {/* Option 1: Level range (sido vs sigungu vs japan vs usa vs china vs world) */}
              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-2.5">
                  1. 행정구역 / 지리 범위 (Region Scope Mode)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  <button
                    onClick={() => {
                      setSettings((prev) => ({ ...prev, level: "sido", regionGroup: "전체" }));
                      setHomeScope("korea");
                    }}
                    className={`p-3 rounded-2xl text-center border transition-all duration-300 flex flex-col gap-1 items-center justify-center cursor-pointer ${
                      settings.level === "sido"
                        ? "bg-emerald-600 border-emerald-600 text-white shadow-md font-bold"
                        : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                    }`}
                  >
                    <span className="text-xs font-bold">광역 자치 모드 (Sido)</span>
                    <span className={`text-[10px] ${settings.level === "sido" ? "text-emerald-100" : "text-slate-400 dark:text-slate-500"}`}>
                      17개 시도 메인 노선망
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setSettings((prev) => ({ ...prev, level: "sigungu", regionGroup: "전체" }));
                      setHomeScope("korea");
                    }}
                    className={`p-3 rounded-2xl text-center border transition-all duration-300 flex flex-col gap-1 items-center justify-center cursor-pointer ${
                      settings.level === "sigungu"
                        ? "bg-emerald-600 border-emerald-600 text-white shadow-md font-bold"
                        : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                    }`}
                  >
                    <span className="text-xs font-bold">전체 시군구 모드 (Sigungu)</span>
                    <span className={`text-[10px] ${settings.level === "sigungu" ? "text-emerald-100" : "text-slate-400 dark:text-slate-500"}`}>
                      229개 시군구 정밀 노선
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setSettings((prev) => ({ ...prev, level: "china", regionGroup: "전체" }));
                      setHomeScope("china");
                    }}
                    className={`p-3 rounded-2xl text-center border transition-all duration-300 flex flex-col gap-1 items-center justify-center cursor-pointer ${
                      settings.level === "china"
                        ? "bg-amber-500 border-amber-500 text-slate-950 font-black shadow-md"
                        : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                    }`}
                  >
                    <span className="text-xs font-bold">🇨🇳 중국 34개 성급 행정구</span>
                    <span className={`text-[10px] ${settings.level === "china" ? "text-slate-900 font-bold" : "text-slate-400 dark:text-slate-500"}`}>
                      성·직할시·자치구·특별행정구
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setSettings((prev) => ({ ...prev, level: "japan", regionGroup: "전체" }));
                      setHomeScope("japan");
                    }}
                    className={`p-3 rounded-2xl text-center border transition-all duration-300 flex flex-col gap-1 items-center justify-center cursor-pointer ${
                      settings.level === "japan"
                        ? "bg-rose-600 border-rose-600 text-white shadow-md font-bold"
                        : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                    }`}
                  >
                    <span className="text-xs font-bold">🇯🇵 일본 47개 도도부현</span>
                    <span className={`text-[10px] ${settings.level === "japan" ? "text-rose-100" : "text-slate-400 dark:text-slate-500"}`}>
                      도쿄, 오사카, 홋카이도 등
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setSettings((prev) => ({ ...prev, level: "usa", regionGroup: "전체" }));
                      setHomeScope("usa");
                    }}
                    className={`p-3 rounded-2xl text-center border transition-all duration-300 flex flex-col gap-1 items-center justify-center cursor-pointer ${
                      settings.level === "usa"
                        ? "bg-blue-600 border-blue-600 text-white shadow-md font-bold"
                        : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                    }`}
                  >
                    <span className="text-xs font-bold">🇺🇸 미국 50개 주 (USA)</span>
                    <span className={`text-[10px] ${settings.level === "usa" ? "text-blue-100" : "text-slate-400 dark:text-slate-500"}`}>
                      캘리포니아, 뉴욕, 텍사스 등
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setSettings((prev) => ({ ...prev, level: "world", regionGroup: "전체" }));
                      setHomeScope("world");
                    }}
                    className={`p-3 rounded-2xl text-center border transition-all duration-300 flex flex-col gap-1 items-center justify-center cursor-pointer ${
                      settings.level === "world"
                        ? "bg-slate-700 border-slate-700 text-white shadow-md font-bold"
                        : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                    }`}
                  >
                    <span className="text-xs font-bold">🌐 전 세계 나라 모드 (World)</span>
                    <span className={`text-[10px] ${settings.level === "world" ? "text-slate-200" : "text-slate-400 dark:text-slate-500"}`}>
                      197개 국가 글로벌 타자
                    </span>
                  </button>
                </div>
              </div>

              {/* Option 2: Area choice (Group group / Continent) */}
              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-2.5">
                  2. 시작 및 주행 권역 (Territory / Continent Segment)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {(settings.level === "world"
                    ? ["전체", "아시아", "유럽", "아메리카", "아프리카", "오세아니아"]
                    : settings.level === "china"
                    ? ["전체", "화북", "동북", "화동", "중남", "서남", "서북", "직할시", "특별행정구"]
                    : settings.level === "japan"
                    ? ["전체", "홋카이도/도호쿠", "간토", "주부", "간사이", "주고쿠/시코쿠", "큐슈/오키나와"]
                    : settings.level === "usa"
                    ? ["전체", "동부", "서부", "중부", "남부", "태평양"]
                    : ["전체", "수도권", "강원권", "충청권", "호남권", "영남권", "제주권"]
                  ).map((group) => (
                    <button
                      key={group}
                      onClick={() => setSettings((prev) => ({ ...prev, regionGroup: group }))}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold text-center border transition-all cursor-pointer ${
                        settings.regionGroup === group
                          ? settings.level === "china"
                            ? "bg-amber-500 border-amber-500 text-slate-950 font-black shadow-sm"
                            : settings.level === "world"
                            ? "bg-slate-700 border-slate-700 text-white font-extrabold shadow-sm"
                            : settings.level === "japan"
                            ? "bg-rose-600 border-rose-600 text-white font-extrabold shadow-sm"
                            : settings.level === "usa"
                            ? "bg-blue-600 border-blue-600 text-white font-extrabold shadow-sm"
                            : "bg-emerald-600 border-emerald-600 text-white font-extrabold shadow-sm"
                          : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                      }`}
                    >
                      {group}
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 3: Target count */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">
                    3. 목표 운행 구역수 (Travel Stations Length)
                  </label>
                  <span className="text-[10px] text-slate-400 font-medium">숫자 직접 입력 가능</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center">
                  <div className="grid grid-cols-3 gap-2 flex-1">
                    {([10, 16, 30] as const).map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => {
                          setSettings((prev) => ({ ...prev, targetCount: num }));
                          setCustomTargetInput(String(num));
                        }}
                        className={`py-2 px-1.5 rounded-xl text-xs font-semibold text-center border transition-all cursor-pointer ${
                          settings.targetCount === num
                            ? settings.level === "china"
                              ? "bg-amber-500 text-slate-950 font-black border-amber-500 shadow-sm"
                              : settings.level === "world"
                              ? "bg-slate-700 text-white font-extrabold border-slate-700 shadow-sm"
                              : settings.level === "japan"
                              ? "bg-rose-600 text-white font-extrabold border-rose-600 shadow-sm"
                              : settings.level === "usa"
                              ? "bg-blue-600 text-white font-extrabold border-blue-600 shadow-sm"
                              : "bg-emerald-600 text-white font-extrabold border-emerald-600 shadow-sm"
                            : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                        }`}
                      >
                        {num}개 {num === 16 ? "🏆" : ""}
                      </button>
                    ))}
                  </div>

                  {/* Direct Custom Number Input Box */}
                  <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 shrink-0">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap">직접 입력:</span>
                    <input
                      type="number"
                      min={1}
                      max={300}
                      value={customTargetInput}
                      onChange={(e) => {
                        const raw = e.target.value;
                        setCustomTargetInput(raw);
                        if (raw !== "") {
                          const parsed = parseInt(raw, 10);
                          if (!isNaN(parsed) && parsed > 0) {
                            setSettings((prev) => ({ ...prev, targetCount: Math.min(300, parsed) }));
                          }
                        }
                      }}
                      onBlur={() => {
                        if (!customTargetInput || parseInt(customTargetInput, 10) <= 0 || isNaN(parseInt(customTargetInput, 10))) {
                          setCustomTargetInput(String(settings.targetCount || 10));
                          if (!settings.targetCount) {
                            setSettings((prev) => ({ ...prev, targetCount: 10 }));
                          }
                        }
                      }}
                      className={`w-16 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-2 py-1 text-xs font-black text-center text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 ${
                        settings.level === "china"
                          ? "focus:ring-amber-500/30 focus:border-amber-500"
                          : settings.level === "world"
                          ? "focus:ring-slate-500/30 focus:border-slate-500"
                          : settings.level === "japan"
                          ? "focus:ring-rose-500/30 focus:border-rose-500"
                          : settings.level === "usa"
                          ? "focus:ring-blue-500/30 focus:border-blue-500"
                          : "focus:ring-emerald-500/30 focus:border-emerald-500"
                      }`}
                      placeholder="개수"
                    />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">개</span>
                  </div>
                </div>
              </div>

              {/* Accuracy challenge option */}
              <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl select-none">
                <div className="text-left pr-2">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block">랭킹 도전하기 (Strict Mode)</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">오타 입력 시 백스페이스로 정정 후 주행 가능</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.strictMode}
                  onChange={(e) => setSettings((prev) => ({ ...prev, strictMode: e.target.checked }))}
                  className={`w-4 h-4 rounded cursor-pointer border border-slate-300 dark:border-slate-600 ${
                    settings.level === "china"
                      ? "accent-amber-500"
                      : settings.level === "world"
                      ? "accent-slate-700"
                      : settings.level === "japan"
                      ? "accent-rose-600"
                      : settings.level === "usa"
                      ? "accent-blue-600"
                      : "accent-emerald-600"
                  }`}
                />
              </div>

              {/* Start Buttons */}
              <button
                onClick={handleStartSetup}
                className={`w-full py-4 font-black tracking-widest text-center rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer ${
                  settings.level === "china"
                    ? "bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-amber-500/20"
                    : settings.level === "world"
                    ? "bg-slate-800 hover:bg-slate-700 text-white shadow-slate-800/20"
                    : settings.level === "japan"
                    ? "bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20"
                    : settings.level === "usa"
                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20"
                    : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20"
                }`}
              >
                <Train className={`w-5 h-5 ${settings.level === "china" ? "fill-slate-950" : "fill-white"}`} />
                <span>운행 시작하기 (DEPART TRAIN NOW)</span>
              </button>
            </div>
          </div>
        )}

        {/* ==========================================
            C. COUNTDOWN DISPLAY SCREEN
            ========================================== */}
        {gameState === "countdown" && (() => {
          const isJapan = settings.level === "japan" || homeScope === "japan";
          const isUsa = settings.level === "usa" || homeScope === "usa";
          const isChina = settings.level === "china" || homeScope === "china";
          const isWorld = settings.level === "world" || homeScope === "world";

          const countdownNumColor = isJapan
            ? "text-rose-600 dark:text-rose-400"
            : isUsa
            ? "text-blue-600 dark:text-blue-400"
            : isChina
            ? "text-amber-500 dark:text-amber-400 font-extrabold drop-shadow-[0_0_25px_rgba(245,158,11,0.5)]"
            : isWorld
            ? "text-slate-800 dark:text-slate-100"
            : "text-emerald-600 dark:text-emerald-400";

          const countdownGlowBg = isJapan
            ? "bg-rose-500/15"
            : isUsa
            ? "bg-blue-500/15"
            : isChina
            ? "bg-amber-500/25"
            : isWorld
            ? "bg-slate-500/10"
            : "bg-emerald-500/15";

          const countdownBadgeColor = isJapan
            ? "text-rose-600 dark:text-rose-400"
            : isUsa
            ? "text-blue-600 dark:text-blue-400"
            : isChina
            ? "text-amber-600 dark:text-amber-400 font-black"
            : isWorld
            ? "text-slate-600 dark:text-slate-400"
            : "text-emerald-600 dark:text-emerald-400";

          return (
            <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl text-center shadow-2xl relative overflow-hidden select-none animate-fade-in flex flex-col items-center justify-center py-16 text-slate-800 dark:text-slate-100">
              {/* Absolute radial map glow backdrop */}
              <div className={`absolute w-72 h-72 rounded-full blur-3xl pointer-events-none ${countdownGlowBg}`} />

              <span className={`text-xs font-bold tracking-[0.25em] uppercase mb-4 flex items-center gap-2 ${countdownBadgeColor}`}>
                <Volume2 className={`w-4 h-4 animate-bounce ${countdownBadgeColor}`} />
                <span>
                  {isJapan ? "🇯🇵 일본 도도부현 주행 시작" : isUsa ? "🇺🇸 미국 50개 주 주행 시작" : isChina ? "🇨🇳 중국 34개 성급 행정구역 주행 시작" : isWorld ? "🌐 전세계 주요국 주행 시작" : "🚩 대한민국 행정구역 주행 시작"}
                </span>
              </span>

              {/* Huge dynamic number */}
              <motion.h3
                key={countdown}
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{ scale: 1.1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
                className={`text-8xl md:text-9xl font-black my-8 select-none tracking-tight font-mono drop-shadow-sm ${countdownNumColor}`}
              >
                {countdown}
              </motion.h3>

              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-sm mt-4">
                "타이핑을 완료하면 자동으로 다음 지역으로 이동합니다"
                <span className={`block mt-1 font-bold text-[10px] uppercase font-mono ${countdownBadgeColor}`}>
                  [TAB키]를 누르면 현재까지의 코스를 확인할 수 있어요!
                </span>
              </div>
            </div>
          );
        })()}

        {/* ==========================================
            D. MAIN PLAY GAMEPLAY AREA
            ========================================== */}
        {gameState === "playing" && (
          <div className="w-full h-full min-h-[550px] flex-1 relative overflow-hidden animate-fade-in flex flex-col">
            {/* MULTIPLAYER INTEGRATED TOP STATUS BAR (Solid, non-floating embedded) */}
            {activeMode === "multiplayer" && multiplayerRoomState && (
              <div className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-3 shrink-0 z-20 text-slate-800 dark:text-slate-100 flex flex-col gap-2 select-none shadow-sm">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300 px-1">
                  <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-extrabold">
                    <Users className="w-4 h-4 animate-pulse text-emerald-600 dark:text-emerald-400" />
                    실시간 멀티 레이스 대결
                  </span>
                  <span className="font-mono text-slate-500 dark:text-slate-400 text-xs">
                    초대 코드: <strong className="text-amber-600 dark:text-amber-400 font-black text-sm">{multiplayerRoomState.roomCode}</strong>
                  </span>
                </div>

                {/* Horizontal grid list of players in current room */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-32 overflow-y-auto no-scrollbar">
                  {(Object.values(multiplayerRoomState.players || {}) as PlayerState[])
                    .filter(Boolean)
                    .sort((a: PlayerState, b: PlayerState) => (b.currentIndex || 0) - (a.currentIndex || 0) || (b.cpm || 0) - (a.cpm || 0))
                    .map((p: PlayerState, idx: number) => {
                      const isMe = p.id === multiplayerRoom?.getMyPlayerId();
                      const total = p.totalStations || coursePath.length || 1;
                      const progressPct = Math.min(100, Math.round((((p.currentIndex || 0) + (p.finished ? 1 : 0)) / total) * 100));

                      return (
                        <div
                          key={p.id}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                            isMe
                              ? "bg-emerald-50 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-100 shadow-xs"
                              : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                          }`}
                        >
                          <span className="w-5 text-center font-mono text-xs text-amber-600 dark:text-amber-400 font-black shrink-0">
                            {idx + 1}위
                          </span>
                          <span className="w-20 sm:w-24 truncate text-left text-xs font-black shrink-0">
                            {p.nickname} {isMe ? "(나)" : ""}
                          </span>

                          {/* Progress bar */}
                          <div className="flex-1 bg-slate-200 dark:bg-slate-950 rounded-full h-3.5 overflow-hidden border border-slate-300 dark:border-slate-800 relative">
                            <div
                              className={`h-full transition-all duration-300 rounded-full ${
                                isMe ? "bg-emerald-500" : "bg-cyan-500"
                              }`}
                              style={{ width: `${progressPct}%` }}
                            />
                            <span className="absolute inset-0 flex items-center justify-center text-[9px] font-mono font-black text-slate-800 dark:text-white drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                              {p.finished ? "🏆 완주!" : `${p.currentIndex}/${total}`}
                            </span>
                          </div>

                          <span className="w-14 text-right font-mono text-[10px] text-slate-300 font-bold shrink-0">
                            {p.cpm || 0} CPM
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* Primary Full Width & Height Map Arena */}
            <div className="relative w-full h-full min-h-[550px] flex-1 flex flex-col overflow-hidden bg-slate-100 dark:bg-slate-950">
              <Map
                regions={coursePath}
                activeRegion={coursePath[currentIndex]}
                visitedRegions={visitedRegions}
                courseHistory={courseHistory}
                upcomingRegions={upcomingRegions}
                showSimple={showSimpleMap}
                isQuizMode={activeMode === "quiz"}
                multiplayerPlayers={activeMode === "multiplayer" ? multiplayerRoomState?.players : undefined}
                myPlayerId={multiplayerRoom?.getMyPlayerId()}
                coursePath={coursePath}
                regionLevel={settings.level || homeScope}
              />

              {activeMode !== "multiplayer" && (
                /* SINGLE PLAYER TOP FLOATING COUNTER BADGE */
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                  <div
                    className={`px-4 py-2 rounded-full shadow-lg border text-xs font-black flex items-center gap-2 backdrop-blur-md ${
                      settings.level === "japan" || homeScope === "japan"
                        ? "bg-rose-600/95 border-rose-500 text-white"
                        : settings.level === "usa" || homeScope === "usa"
                        ? "bg-blue-600/95 border-blue-500 text-white"
                        : settings.level === "china" || homeScope === "china"
                        ? "bg-amber-500/95 border-amber-400 text-slate-950 font-black shadow-amber-500/20"
                        : settings.level === "world" || homeScope === "world"
                        ? "bg-slate-700/95 border-slate-600 text-white"
                        : "bg-emerald-600/90 border-emerald-500 text-white"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span>
                      {activeMode === "quiz"
                        ? "🧩 퀴즈 모드 (지형 맞추기)"
                        : settings.level === "japan" || homeScope === "japan"
                        ? "🇯🇵 일본"
                        : settings.level === "usa" || homeScope === "usa"
                        ? "🇺🇸 미국"
                        : settings.level === "china" || homeScope === "china"
                        ? "🇨🇳 중국"
                        : settings.level === "world" || homeScope === "world"
                        ? "🌐 전세계"
                        : "🚩 대한민국"}{" "}
                      {currentIndex + 1} / {coursePath.length}{" "}
                      {settings.level === "japan" || homeScope === "japan"
                        ? "도도부현"
                        : settings.level === "usa" || homeScope === "usa"
                        ? "주(State)"
                        : settings.level === "china" || homeScope === "china"
                        ? "성·행정구"
                        : settings.level === "world" || homeScope === "world"
                        ? "국가"
                        : "구역"}{" "}
                      {activeMode === "quiz" ? "퀴즈 진행 중" : "주행 중"}
                    </span>
                  </div>
                </div>
              )}

              {/* FLOATING COMBINED DASHBOARD: StatsPanel and Console overlay at Bottom Center */}
              <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 w-[96%] max-w-2xl flex flex-col gap-2.5">
                <div className="flex justify-center">
                  <StatsPanel stats={stats} />
                </div>
                {activeMode === "quiz" ? (
                  <QuizConsole
                    currentRegion={coursePath[currentIndex]}
                    prevRegion={currentIndex > 0 ? coursePath[currentIndex - 1] : null}
                    remainingCount={coursePath.length - currentIndex}
                    totalCount={coursePath.length}
                    regionLevel={settings.level || homeScope}
                    onSuccess={() => {
                      const currentReg = coursePath[currentIndex];
                      const nameLen = currentReg ? currentReg.name_kr.length : 3;
                      handleTypingSuccess(nameLen, nameLen, 0);
                    }}
                    onKeystroke={(isError) => handleKeystroke(1, isError ? 1 : 0)}
                  />
                ) : (
                  <TypingConsole
                    regions={coursePath}
                    currentRegion={coursePath[currentIndex]}
                    prevRegion={currentIndex > 0 ? coursePath[currentIndex - 1] : null}
                    nextRegion={currentIndex + 1 < coursePath.length ? coursePath[currentIndex + 1] : null}
                    onSuccess={handleTypingSuccess}
                    onKeystroke={handleKeystroke}
                    strictMode={settings.strictMode}
                    advanceMode={settings.advanceMode || "auto"}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            F. RESULTS / SCOREBOARD SUMMARY SCREEN
            ========================================== */}
        {gameState === "results" && (
          <div className="w-full max-w-6xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-fade-in select-none my-auto min-h-[480px] h-auto md:min-h-[560px] md:max-h-[88vh]">
            {/* Left: Map Display with Progress Overlay */}
            <div className="relative flex-1 min-h-[300px] h-[320px] md:h-full bg-slate-100 flex flex-col overflow-hidden">
              {/* Map Top Overlay Bar */}
              <div className="absolute top-4 left-4 right-4 z-[500] flex items-center justify-between gap-3 pointer-events-none">
                {/* Exit Button */}
                <button
                  onClick={() => {
                    setGameState("home");
                    setActiveMode(null);
                  }}
                  className="pointer-events-auto flex items-center gap-1.5 px-4 py-2 bg-white/90 hover:bg-white border border-slate-200 rounded-full text-xs font-black text-slate-800 shadow-md transition-all cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>나가기</span>
                </button>

                {/* Green Progress Bar */}
                <div className="pointer-events-auto flex-1 max-w-xs md:max-w-md bg-white/90 border border-slate-200 px-4 py-2 rounded-full shadow-md flex items-center gap-3">
                  <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full transition-all duration-500 w-full" />
                  </div>
                  <span className="text-xs font-black text-slate-800 font-mono whitespace-nowrap">
                    {coursePath.length} / {coursePath.length} 완주
                  </span>
                </div>
              </div>

              {/* Map Canvas Component */}
              <Map
                regions={coursePath}
                activeRegion={coursePath[coursePath.length - 1] || null}
                visitedRegions={coursePath}
                courseHistory={courseHistory}
                upcomingRegions={[]}
                showSimple={false}
                multiplayerPlayers={activeMode === "multiplayer" ? multiplayerRoomState?.players : undefined}
                myPlayerId={multiplayerRoom?.getMyPlayerId()}
                coursePath={coursePath}
                regionLevel={settings.level || homeScope}
              />
            </div>

            {/* Right: Results Summary Score Panel */}
            <div className="w-full md:w-[420px] lg:w-[460px] bg-white border-t md:border-t-0 md:border-l border-slate-200/90 p-4 md:p-6 flex flex-col items-center justify-start md:justify-center text-center overflow-y-auto max-h-[85vh]">
              <div className="w-full max-w-sm flex flex-col items-center my-auto py-2">
                {/* Emerald Badge */}
                <span className="px-3.5 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-600 border border-emerald-200/80 tracking-wide mb-3">
                  완주 기록
                </span>

                {/* Course Main Title */}
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                  {settings.level === "sido"
                    ? "대한민국 전체"
                    : settings.level === "sigungu"
                    ? "대한민국 시·군·구"
                    : settings.level === "japan"
                    ? "일본 47개 도도부현"
                    : settings.level === "usa"
                    ? "미국 50개 주"
                    : "세계 여행 코스"}
                </h2>

                {/* Giant Speed CPM */}
                <div className="flex items-baseline justify-center gap-2 my-2">
                  <span className="text-6xl md:text-7xl font-black text-emerald-500 tracking-tight font-mono">
                    {stats.cpm}
                  </span>
                  <span className="text-base font-extrabold text-slate-700">타/분</span>
                </div>

                {/* Travel Time */}
                <p className="text-xs font-extrabold text-slate-500 tracking-wide mb-6">
                  여행시간 {formatTravelTime(stats.elapsedTime)}
                </p>

                {/* 4 Metric Box */}
                <div className="w-full bg-slate-50 border border-slate-200/90 rounded-2xl p-4 grid grid-cols-4 divide-x divide-slate-200 text-center shadow-xs mb-6">
                  <div className="px-1">
                    <div className="text-lg md:text-xl font-black text-slate-900 font-mono">
                      {coursePath.length}
                    </div>
                    <div className="text-[10px] md:text-[11px] font-bold text-slate-500 mt-1">
                      곳 완주
                    </div>
                  </div>
                  <div className="px-1">
                    <div className="text-lg md:text-xl font-black text-slate-900 font-mono">
                      {Math.round(stats.accuracy * 100)}%
                    </div>
                    <div className="text-[10px] md:text-[11px] font-bold text-slate-500 mt-1">
                      정확도
                    </div>
                  </div>
                  <div className="px-1">
                    <div className="text-lg md:text-xl font-black text-slate-900 font-mono">
                      {stats.maxCombo}
                    </div>
                    <div className="text-[10px] md:text-[11px] font-bold text-slate-500 mt-1">
                      최고 콤보
                    </div>
                  </div>
                  <div className="px-1">
                    <div className="text-lg md:text-xl font-black text-slate-900 font-mono">
                      {stats.cpm}
                    </div>
                    <div className="text-[10px] md:text-[11px] font-bold text-slate-500 mt-1">
                      내 최고
                    </div>
                  </div>
                </div>

                {/* Multiplayer Final Standings Leaderboard */}
                {activeMode === "multiplayer" && multiplayerRoomState && (
                  <div className="w-full bg-slate-900 text-white rounded-2xl p-4 border border-slate-800 shadow-xl mb-6 text-left">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                      <span className="text-xs font-black text-amber-400 flex items-center gap-1.5">
                        <Trophy className="w-4 h-4 text-amber-400" />
                        멀티플레이 대결 최종 순위
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        방 코드: {multiplayerRoomState.roomCode}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2">
                      {(Object.values(multiplayerRoomState.players || {}) as PlayerState[])
                        .filter(Boolean)
                        .sort((a, b) => {
                          if (a.finished && !b.finished) return -1;
                          if (!a.finished && b.finished) return 1;
                          if (a.finished && b.finished) {
                            if (a.finishTime && b.finishTime && a.finishTime !== b.finishTime) {
                              return a.finishTime - b.finishTime;
                            }
                            return (b.cpm || 0) - (a.cpm || 0);
                          }
                          if ((b.currentIndex || 0) !== (a.currentIndex || 0)) {
                            return (b.currentIndex || 0) - (a.currentIndex || 0);
                          }
                          return (b.cpm || 0) - (a.cpm || 0);
                        })
                        .map((p, idx) => {
                          const isMe = p.id === multiplayerRoom?.getMyPlayerId();
                          const total = p.totalStations || coursePath.length || 1;
                          const isWinner = idx === 0;

                          return (
                            <div
                              key={p.id}
                              className={`p-2.5 rounded-xl border flex items-center justify-between text-xs font-bold transition-all ${
                                isWinner
                                  ? "bg-amber-500/20 border-amber-500/80 text-amber-200"
                                  : isMe
                                  ? "bg-emerald-950 border-emerald-500/80 text-emerald-100"
                                  : "bg-slate-800/80 border-slate-700/80 text-slate-200"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span
                                  className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs ${
                                    idx === 0
                                      ? "bg-amber-500 text-slate-950 font-black"
                                      : idx === 1
                                      ? "bg-slate-300 text-slate-950 font-black"
                                      : idx === 2
                                      ? "bg-amber-700 text-white font-black"
                                      : "bg-slate-800 text-slate-400"
                                  }`}
                                >
                                  {idx === 0 ? "👑" : `${idx + 1}`}
                                </span>
                                <span className="font-bold truncate max-w-[120px]">
                                  {p.nickname} {isMe ? "(나)" : ""}
                                </span>
                              </div>

                              <div className="flex items-center gap-2.5">
                                <span className="text-[11px] font-mono font-bold text-slate-300">
                                  {p.finishTime ? formatTravelTime(p.finishTime) : (p.finished ? "완주!" : `${p.currentIndex}/${total}`)}
                                </span>
                                <span className="text-[11px] font-mono font-bold text-amber-300">
                                  {p.accuracy ?? 100}%
                                </span>
                                <span className="text-xs font-mono font-black text-emerald-400">
                                  {p.cpm || 0} CPM
                                </span>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}

                {/* Action Buttons List */}
                <div className="w-full flex flex-col gap-3">
                  <button
                    onClick={() => {
                      const text = `[MAP TYPING] ${settings.level === "sido" ? "대한민국 전체" : "타이핑 여행"} ${coursePath.length}곳 완주!\n타자 속도: ${stats.cpm}타/분, 정확도: ${Math.round(stats.accuracy * 100)}%\n여행시간: ${formatTravelTime(stats.elapsedTime)}`;
                      navigator.clipboard.writeText(text);
                      alert("결과가 클립보드에 복사되었습니다!");
                    }}
                    className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-black text-base rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>결과 공유하기 ↗</span>
                  </button>

                  <button
                    onClick={() => {
                      alert("결과 카드가 저장되었습니다.");
                    }}
                    className="text-slate-500 hover:text-slate-800 text-xs font-bold transition-colors cursor-pointer py-1"
                  >
                    결과 카드 저장
                  </button>

                  <button
                    onClick={handleStartSetup}
                    className="w-full py-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-black text-base rounded-2xl shadow-sm transition-all cursor-pointer"
                  >
                    같은 지역 다시 여행
                  </button>

                  <button
                    onClick={() => {
                      setGameState("home");
                      setActiveMode(null);
                    }}
                    className="text-slate-500 hover:text-slate-800 text-xs font-bold transition-colors cursor-pointer py-1 underline"
                  >
                    다른 지역 선택하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 3. FLAGGED FLOATING TABLE VIEW OVERLAY (Open on tab key - White Theme) */}
      {showCourseListModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full max-h-[80vh] overflow-hidden flex flex-col p-6 shadow-2xl text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 select-none">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-emerald-600 animate-spin" style={{ animationDuration: "12s" }} />
                <h3 className="text-sm font-extrabold text-slate-900 font-mono tracking-wider">
                  운행 예정 노선 코스 목록 (TAB)
                </h3>
              </div>
              <button
                onClick={() => setShowCourseListModal(false)}
                className="p-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Course list */}
            <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-2">
              {coursePath.length > 0 ? (
                coursePath.map((r, index) => {
                  const isActive = index === currentIndex;
                  const isVisited = index < currentIndex;

                  return (
                    <div
                      key={`course-list-item-${r.id}`}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl border text-xs text-left ${
                        isActive
                          ? "bg-emerald-50 border-emerald-300 text-emerald-900 font-bold shadow-sm"
                          : isVisited
                          ? "bg-slate-50/80 border-slate-200 text-slate-400 opacity-70"
                          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] text-slate-400">
                          {(index + 1).toString().padStart(2, "0")}
                        </span>
                        <div>
                          <div className="font-bold">{r.name_kr}</div>
                          <div className="text-[9px] text-slate-400 font-mono">{r.name_en}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full text-[9px] bg-slate-100 border border-slate-200 text-slate-600 font-medium">
                          {r.region_group}
                        </span>
                        {isActive && (
                          <span className="text-[9px] text-emerald-600 font-bold animate-pulse">운행 중</span>
                        )}
                        {isVisited && <CheckCircle className="w-4 h-4 text-emerald-600" />}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 text-slate-400 italic text-xs">현재 활성화된 운행 코스가 없습니다.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. FOOTER CREDITS (Shown on home / setup / idle screens) */}
      {gameState !== "playing" && (
        <Footer
          onOpenAbout={() => setShowAboutModal(true)}
          onOpenGuide={() => setShowGuideModal(true)}
          currentScope={homeScope}
          logoImg={mapTypingLogo}
        />
      )}

      {/* 5. GLOBAL LEADERBOARD MODAL */}
      <LeaderboardModal
        isOpen={showLeaderboardModal}
        onClose={() => setShowLeaderboardModal(false)}
        defaultMode={settings.level}
      />

      {/* 6. SETTINGS MODAL (Sound & Volume controls) */}
      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        advanceMode={settings.advanceMode || "auto"}
        onUpdateAdvanceMode={(mode) => setSettings((prev) => ({ ...prev, advanceMode: mode }))}
        regionLevel={settings.level || homeScope}
      />

      {/* 7. MAP EXPLORER MODAL (Simple Map explorer) */}
      <MapExplorerModal
        isOpen={showSimpleMap}
        onClose={() => setShowSimpleMap(false)}
        sidoList={SIDO_LIST}
        sigunguList={SIGUNGU_LIST}
        japanList={JAPAN_LIST}
        usaList={USA_LIST}
        chinaList={CHINA_LIST}
        worldList={WORLD_LIST}
      />

      {/* 8. USER GUIDE MODAL */}
      <GuideModal
        isOpen={showGuideModal}
        onClose={() => setShowGuideModal(false)}
      />

      {/* 9. SERVICE ABOUT MODAL */}
      <AboutModal
        isOpen={showAboutModal}
        onClose={() => setShowAboutModal(false)}
        logoImg={mapTypingLogo}
      />
    </div>
  );
}
