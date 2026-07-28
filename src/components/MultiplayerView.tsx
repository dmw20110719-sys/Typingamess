import React, { useState, useEffect } from "react";
import { Users, Play, Copy, Check, ArrowLeft, Crown, Zap, Flag, RefreshCw, Lock, Globe, Shield, Search, KeyRound, X } from "lucide-react";
import { MultiplayerRoom, RoomState, PlayerState, LobbyTracker, PublicRoomInfo } from "../lib/multiplayer";
import { Region } from "../types";

export type ModeScope = "korea" | "japan" | "usa" | "world" | "sido" | "sigungu";

export const getMultiplayerTheme = (scopeOrLevel?: string) => {
  if (scopeOrLevel === "japan") {
    return {
      primaryBtn: "bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/20",
      primaryBg: "bg-rose-600",
      border: "border-rose-200 dark:border-rose-800/80",
      lightCardBg: "bg-gradient-to-br from-rose-50 via-rose-50/50 to-pink-50 dark:from-rose-950/40 dark:via-rose-950/20 dark:to-pink-950/20 border-rose-200/90 dark:border-rose-800/80",
      badgeBg: "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800",
      badgeIcon: "text-rose-600 dark:text-rose-400",
      accentText: "text-rose-600 dark:text-rose-400",
      focusRing: "focus:ring-rose-500/20 focus:border-rose-500",
      avatarBg: "bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-200",
      activeTabBtn: "bg-rose-600 text-white border-rose-600 shadow-sm",
      joinBtn: "bg-rose-900 dark:bg-rose-700 dark:hover:bg-rose-600 hover:bg-rose-800 text-white",
      progressBg: "bg-rose-500",
    };
  }
  if (scopeOrLevel === "usa") {
    return {
      primaryBtn: "bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20",
      primaryBg: "bg-blue-600",
      border: "border-blue-200 dark:border-blue-800/80",
      lightCardBg: "bg-gradient-to-br from-blue-50 via-blue-50/50 to-indigo-50 dark:from-blue-950/40 dark:via-blue-950/20 dark:to-indigo-950/20 border-blue-200/90 dark:border-blue-800/80",
      badgeBg: "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
      badgeIcon: "text-blue-600 dark:text-blue-400",
      accentText: "text-blue-600 dark:text-blue-400",
      focusRing: "focus:ring-blue-500/20 focus:border-blue-500",
      avatarBg: "bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-200",
      activeTabBtn: "bg-blue-600 text-white border-blue-600 shadow-sm",
      joinBtn: "bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-600 hover:bg-blue-800 text-white",
      progressBg: "bg-blue-500",
    };
  }
  if (scopeOrLevel === "world") {
    return {
      primaryBtn: "bg-slate-800 dark:bg-slate-700 hover:bg-slate-700 dark:hover:bg-slate-600 text-white shadow-md shadow-slate-900/20",
      primaryBg: "bg-slate-800 dark:bg-slate-700",
      border: "border-slate-300 dark:border-slate-700",
      lightCardBg: "bg-gradient-to-br from-slate-100 via-slate-100/70 to-slate-200/80 dark:from-slate-800/60 dark:via-slate-800/40 dark:to-slate-900/40 border-slate-300 dark:border-slate-700",
      badgeBg: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700",
      badgeIcon: "text-slate-700 dark:text-slate-300",
      accentText: "text-slate-700 dark:text-slate-300",
      focusRing: "focus:ring-slate-500/20 focus:border-slate-500",
      avatarBg: "bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200",
      activeTabBtn: "bg-slate-800 dark:bg-slate-700 text-white border-slate-800 dark:border-slate-700 shadow-sm",
      joinBtn: "bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white",
      progressBg: "bg-slate-600",
    };
  }
  // Default Korea (emerald green)
  return {
    primaryBtn: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20",
    primaryBg: "bg-emerald-600",
    border: "border-emerald-200 dark:border-emerald-800/80",
    lightCardBg: "bg-gradient-to-br from-emerald-50 via-emerald-50/50 to-teal-50 dark:from-emerald-950/40 dark:via-emerald-950/20 dark:to-teal-950/20 border-emerald-200/90 dark:border-emerald-800/80",
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    badgeIcon: "text-emerald-600 dark:text-emerald-400",
    accentText: "text-emerald-600 dark:text-emerald-400",
    focusRing: "focus:ring-emerald-500/20 focus:border-emerald-500",
    avatarBg: "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200",
    activeTabBtn: "bg-emerald-600 text-white border-emerald-600 shadow-sm",
    joinBtn: "bg-slate-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 hover:bg-slate-800 text-white",
    progressBg: "bg-emerald-500",
  };
};

interface MultiplayerViewProps {
  nickname: string;
  onSetNickname: (nick: string) => void;
  onBackToHome: () => void;
  allRegionsData: {
    sido: Region[];
    sigungu: Region[];
    japan?: Region[];
    usa?: Region[];
    world: Region[];
  };
  homeScope?: "korea" | "japan" | "usa" | "world";
  onStartMultiplayerGame: (room: MultiplayerRoom, initialRoomState: RoomState) => void;
}

export const MultiplayerView: React.FC<MultiplayerViewProps> = ({
  nickname,
  onSetNickname,
  onBackToHome,
  allRegionsData,
  homeScope = "korea",
  onStartMultiplayerGame,
}) => {
  const [userNick, setUserNick] = useState(nickname || "");
  const [roomCodeInput, setRoomCodeInput] = useState("");
  const [activeRoom, setActiveRoom] = useState<MultiplayerRoom | null>(null);
  const [roomState, setRoomState] = useState<RoomState | null>(null);
  const [copied, setCopied] = useState(false);

  // Room Creation Options
  const [createRoomName, setCreateRoomName] = useState("");
  const [isPublicRoom, setIsPublicRoom] = useState(true);
  const [roomPasswordInput, setRoomPasswordInput] = useState("");

  // Real-time Discovered Rooms
  const [publicRooms, setPublicRooms] = useState<PublicRoomInfo[]>([]);

  // Password Modal for entering password-protected room
  const [targetRoomToJoin, setTargetRoomToJoin] = useState<PublicRoomInfo | null>(null);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Sub-level for Korea: "sido" (광역지자체) vs "sigungu" (시·군·구)
  const [koreaSubLevel, setKoreaSubLevel] = useState<"sido" | "sigungu">("sido");
  const [selectedTargetCount, setSelectedTargetCount] = useState<number>(20);

  useEffect(() => {
    if (nickname) {
      setUserNick(nickname);
    }
  }, [nickname]);

  // Default room name when user changes nickname
  useEffect(() => {
    if (userNick.trim() && !createRoomName) {
      setCreateRoomName(`${userNick.trim()}의 대결방`);
    }
  }, [userNick]);

  // Real-time Lobby Tracker Subscription
  useEffect(() => {
    const tracker = new LobbyTracker((updatedRooms) => {
      setPublicRooms(updatedRooms);
    });
    tracker.init();

    return () => {
      tracker.destroy();
    };
  }, []);

  // Selected level derived from top scope and Korea sub-level choice
  const selectedLevel: "sido" | "sigungu" | "japan" | "usa" | "world" =
    homeScope === "japan"
      ? "japan"
      : homeScope === "usa"
      ? "usa"
      : homeScope === "world"
      ? "world"
      : koreaSubLevel;

  // Active theme based on top level selection or room level
  const activeLevel = roomState?.level || selectedLevel;
  const activeThemeKey =
    activeLevel === "japan"
      ? "japan"
      : activeLevel === "usa"
      ? "usa"
      : activeLevel === "world"
      ? "world"
      : "korea";

  const theme = getMultiplayerTheme(activeThemeKey);

  // Auto start multiplayer game for guests when host triggers race start
  useEffect(() => {
    if (activeRoom && roomState && roomState.isStarted && roomState.stations && roomState.stations.length > 0) {
      onStartMultiplayerGame(activeRoom, roomState);
    }
  }, [activeRoom, roomState, onStartMultiplayerGame]);

  const handleCreateRoom = () => {
    if (!userNick.trim()) return;
    onSetNickname(userNick.trim());

    // Generate random 4-digit room code
    const code = Math.floor(Math.random() * 8999 + 1000).toString();
    const finalRoomName = createRoomName.trim() || `${userNick.trim()}의 대결방`;
    const pwd = !isPublicRoom && roomPasswordInput.trim() ? roomPasswordInput.trim() : undefined;

    const room = new MultiplayerRoom(code, userNick, true, finalRoomName, isPublicRoom, pwd);

    room.init(
      (updatedRoom) => {
        setRoomState(updatedRoom);
      },
      (stations) => {
        setRoomState((prev) => {
          const latestState: RoomState = prev
            ? { ...prev, isStarted: true, stations }
            : {
                roomCode: code,
                roomName: finalRoomName,
                level: selectedLevel,
                targetCount: selectedTargetCount,
                isStarted: true,
                isPublic: isPublicRoom,
                password: pwd,
                stations,
                players: {},
              };
          onStartMultiplayerGame(room, latestState);
          return latestState;
        });
      }
    );

    room.updateRoomConfig(selectedLevel, selectedTargetCount, isPublicRoom, finalRoomName);
    setActiveRoom(room);
  };

  const handleDirectJoinRoom = (targetRoom: PublicRoomInfo) => {
    if (!userNick.trim()) {
      alert("닉네임을 먼저 입력해주세요!");
      return;
    }

    if (targetRoom.hasPassword) {
      setTargetRoomToJoin(targetRoom);
      setEnteredPassword("");
      setPasswordError("");
      return;
    }

    joinRoomByCode(targetRoom.roomCode);
  };

  const handlePasswordModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetRoomToJoin) return;

    if (targetRoomToJoin.password && enteredPassword !== targetRoomToJoin.password) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
      return;
    }

    const code = targetRoomToJoin.roomCode;
    setTargetRoomToJoin(null);
    joinRoomByCode(code);
  };

  const handleJoinByCodeSubmit = () => {
    if (!userNick.trim() || !roomCodeInput.trim()) return;
    onSetNickname(userNick.trim());
    joinRoomByCode(roomCodeInput.trim());
  };

  const joinRoomByCode = (code: string) => {
    if (!userNick.trim()) return;
    onSetNickname(userNick.trim());

    const cleanedCode = code.toUpperCase().replace(/^ROOM-?/i, "");
    const room = new MultiplayerRoom(cleanedCode, userNick, false);

    room.init(
      (updatedRoom) => {
        setRoomState(updatedRoom);
      },
      (stations) => {
        setRoomState((prev) => {
          const latestState: RoomState = prev
            ? { ...prev, isStarted: true, stations }
            : {
                roomCode: cleanedCode,
                roomName: `${userNick}의 참여방`,
                level: selectedLevel,
                targetCount: 20,
                isStarted: true,
                isPublic: true,
                stations,
                players: {},
              };
          onStartMultiplayerGame(room, latestState);
          return latestState;
        });
      }
    );

    setActiveRoom(room);
  };

  const handleCopyCode = () => {
    if (roomState?.roomCode) {
      navigator.clipboard.writeText(roomState.roomCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleStartRace = () => {
    if (!activeRoom || !roomState) return;

    // Pick random targetCount stations for chosen level
    const sourceRegions = (allRegionsData as any)[roomState.level] || allRegionsData.sido;
    const shuffled = [...sourceRegions].sort(() => Math.random() - 0.5);
    const chosen = shuffled.slice(0, Math.min(roomState.targetCount, shuffled.length));

    const updatedRoomState: RoomState = {
      ...roomState,
      isStarted: true,
      stations: chosen,
    };

    activeRoom.startGame(chosen);
    onStartMultiplayerGame(activeRoom, updatedRoomState);
  };

  const getCourseBadgeText = (level: string) => {
    switch (level) {
      case "japan":
        return "🇯🇵 일본";
      case "usa":
        return "🇺🇸 미국";
      case "world":
        return "🌐 전세계";
      case "sigungu":
        return "🇰🇷 시·군·구";
      default:
        return "🇰🇷 광역지자체";
    }
  };

  // If in lobby room (Inside Room Waiting Room)
  if (activeRoom && roomState) {
    const isHost = activeRoom.getIsHost() || (roomState.players && roomState.players[activeRoom.getMyPlayerId()]?.isHost) || false;
    const playersList: PlayerState[] = (Object.values(roomState.players || {}).filter(Boolean) as PlayerState[]);

    return (
      <div className="w-full max-w-3xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl animate-fade-in text-slate-800 dark:text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
          <button
            onClick={() => {
              activeRoom.leave();
              setActiveRoom(null);
              setRoomState(null);
            }}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>방 나가기</span>
          </button>

          <div className="flex items-center gap-2">
            <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${roomState.isPublic ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800" : "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800"}`}>
              {roomState.isPublic ? <Globe className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
              {roomState.isPublic ? "공개방" : "비밀방"}
            </span>

            <div className={`flex items-center gap-2 ${theme.badgeBg} px-3.5 py-1.5 rounded-full border font-mono text-xs font-bold`}>
              <Users className={`w-4 h-4 ${theme.badgeIcon} animate-pulse`} />
              <span>{getCourseBadgeText(roomState.level)} 대기실</span>
            </div>
          </div>
        </div>

        {/* Room Title Banner */}
        <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-800/80 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">대결 방 이름</span>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">{roomState.roomName || "타이핑 대전방"}</h2>
          </div>
          <span className="text-xs font-extrabold text-slate-500 dark:text-slate-400 font-mono">
            {playersList.length}명 참여 중
          </span>
        </div>

        {/* Room Code Banner - Clean White Container */}
        <div className="mt-4 bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm text-slate-900 dark:text-slate-100">
          <div>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${theme.accentText} block mb-1`}>
              초대 코드 (ROOM CODE)
            </span>
            <div className="text-3xl font-black font-mono tracking-wider text-amber-600 dark:text-amber-400">
              {roomState.roomCode}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">친구에게 이 코드를 알려주어 직접 들어오게할 수 있습니다!</p>
          </div>

          <button
            onClick={handleCopyCode}
            className="py-2.5 px-5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 font-bold text-xs rounded-xl border border-slate-200 dark:border-slate-600 transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-500" />}
            <span>{copied ? "복사완료!" : "코드 복사하기"}</span>
          </button>
        </div>

        {/* Target Station Count & Room Visibility Settings */}
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              대결 코스 설정
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              {isHost ? "방장 설정 가능" : "방장 설정을 기다리는 중..."}
            </span>
          </div>

          {/* If Korea room, allow switching between Sido & Sigungu */}
          {(roomState.level === "sido" || roomState.level === "sigungu") && (
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block mb-1.5">
                🇰🇷 대한민국 단위 선택
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  disabled={!isHost}
                  onClick={() => {
                    setKoreaSubLevel("sido");
                    activeRoom.updateRoomConfig("sido", roomState.targetCount, roomState.isPublic, roomState.roomName);
                  }}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    roomState.level === "sido"
                      ? theme.activeTabBtn
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  광역지자체 (17개)
                </button>
                <button
                  disabled={!isHost}
                  onClick={() => {
                    setKoreaSubLevel("sigungu");
                    activeRoom.updateRoomConfig("sigungu", roomState.targetCount, roomState.isPublic, roomState.roomName);
                  }}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    roomState.level === "sigungu"
                      ? theme.activeTabBtn
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  시·군·구 (226개)
                </button>
              </div>
            </div>
          )}

          <div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block mb-1.5">정복 목표 역 수</span>
            <div className="grid grid-cols-3 gap-2">
              {[10, 20, 30].map((cnt) => (
                <button
                  key={cnt}
                  disabled={!isHost}
                  onClick={() => {
                    setSelectedTargetCount(cnt);
                    activeRoom.updateRoomConfig(roomState.level, cnt, roomState.isPublic, roomState.roomName);
                  }}
                  className={`py-2.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    roomState.targetCount === cnt
                      ? theme.activeTabBtn
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  {cnt}개 역 {cnt === 20 ? "(🏆 랭킹전)" : cnt === 30 ? "(🔥 마라톤)" : "(⚡ 스피드)"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Players List */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
              <Users className={`w-4 h-4 ${theme.accentText}`} />
              참여 중인 운행사 ({playersList.length}명)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {playersList.map((player) => (
              <div
                key={player.id}
                className="p-3.5 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 ${theme.avatarBg} rounded-xl flex items-center justify-center font-bold text-sm`}>
                    {(player.nickname || "무명").substring(0, 2)}
                  </div>
                  <div>
                    <span className="text-xs font-black text-slate-900 dark:text-slate-100 block flex items-center gap-1">
                      {player.nickname || "무명 운행사"}
                      {player.isHost && (
                        <Crown className="w-3.5 h-3.5 fill-amber-400 text-amber-500 inline" />
                      )}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {player.id === activeRoom.getMyPlayerId() ? "(나)" : "참여자"}
                    </span>
                  </div>
                </div>

                <span className={`text-[11px] font-bold px-2.5 py-1 ${theme.badgeBg} rounded-lg border`}>
                  준비완료
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          {isHost ? (
            <button
              onClick={handleStartRace}
              className={`w-full sm:w-auto py-3.5 px-8 ${theme.primaryBtn} font-black text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer`}
            >
              <Play className="w-4 h-4 fill-white" />
              <span>멀티레이스 경기 시작!</span>
            </button>
          ) : (
            <div className="w-full py-3.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold text-xs rounded-2xl text-center flex items-center justify-center gap-2">
              <RefreshCw className={`w-4 h-4 animate-spin ${theme.accentText}`} />
              <span>방장이 경기를 시작할 때까지 잠시 기다려주세요...</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Lobby Landing Selection with Realtime Room Browser
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-fade-in text-slate-800 dark:text-slate-100">
      {/* Password Modal */}
      {targetRoomToJoin && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4 animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
                <Lock className="w-4 h-4" />
                <span>비밀방 비밀번호 입력</span>
              </div>
              <button
                onClick={() => setTargetRoomToJoin(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              <strong className="text-slate-800 dark:text-slate-200">{targetRoomToJoin.roomName}</strong> 은(는) 비밀번호로 보호된 방입니다.
            </p>

            <form onSubmit={handlePasswordModalSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1.5">
                  방 비밀번호
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="password"
                    value={enteredPassword}
                    onChange={(e) => {
                      setEnteredPassword(e.target.value);
                      setPasswordError("");
                    }}
                    placeholder="비밀번호를 입력하세요"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                    autoFocus
                  />
                </div>
                {passwordError && (
                  <p className="text-[11px] font-bold text-rose-500 mt-1">{passwordError}</p>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setTargetRoomToJoin(null)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-200 cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
                >
                  입장하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-6">
        {/* Top Title Bar */}
        <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            실시간 멀티플레이 로비
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            실시간으로 생성된 다른 유저의 공개 방에 즉시 원클릭으로 입장할 수 있습니다!
          </p>
        </div>

        {/* User Nickname Input */}
        <div>
          <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest block mb-2">
            운행사 닉네임 (NICKNAME)
          </label>
          <input
            type="text"
            value={userNick}
            onChange={(e) => setUserNick(e.target.value)}
            placeholder="대결 시 표시될 닉네임을 입력하세요"
            maxLength={12}
            className={`w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-800 dark:text-slate-100 font-bold focus:outline-none focus:ring-2 ${theme.focusRing} shadow-sm`}
          />
        </div>

        {/* Real-time Open Rooms List (Public Rooms Browser) */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Globe className={`w-4 h-4 ${theme.accentText}`} />
              <span>실시간 생성된 대결 방 목록 ({publicRooms.length}개 발견)</span>
            </h3>

            <span className="text-[11px] text-slate-400 font-mono">
              자동 갱신 중...
            </span>
          </div>

          {publicRooms.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-700 rounded-2xl">
              <RefreshCw className="w-6 h-6 mx-auto text-slate-400 animate-spin mb-2" />
              <p className="text-xs font-bold text-slate-600 dark:text-slate-300">현재 대기 중인 다른 방이 없습니다.</p>
              <p className="text-[11px] text-slate-400 mt-1">
                아래에서 [새로운 방 만들기]를 눌러 친구들을 초대해보세요!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-1">
              {publicRooms.map((room) => (
                <div
                  key={room.roomCode}
                  className="p-4 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-2xl flex flex-col justify-between gap-3 hover:border-slate-300 dark:hover:border-slate-600 transition-all shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-black text-slate-900 dark:text-slate-100">
                          {room.roomName}
                        </span>
                        {room.hasPassword ? (
                          <span className="px-1.5 py-0.5 bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 text-[10px] font-bold rounded flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" />
                            비밀방
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold rounded flex items-center gap-1">
                            <Globe className="w-2.5 h-2.5" />
                            공개방
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        방장: <strong className="text-slate-700 dark:text-slate-300">{room.hostNickname}</strong>
                      </p>
                    </div>

                    <span className="text-[10px] font-mono font-bold px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-amber-500 rounded-lg shrink-0">
                      #{room.roomCode}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 bg-slate-200/70 dark:bg-slate-700 font-bold rounded text-[10px]">
                        {getCourseBadgeText(room.level)}
                      </span>
                      <span className="font-bold text-slate-600 dark:text-slate-300">
                        {room.targetCount}개 역
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-bold text-[10px]">
                        👥 {room.playerCount}명 대기중
                      </span>

                      <button
                        onClick={() => handleDirectJoinRoom(room)}
                        className={`py-1 px-3 ${room.hasPassword ? "bg-amber-600 hover:bg-amber-500" : theme.primaryBg} text-white font-bold text-xs rounded-lg shadow-sm transition-all flex items-center gap-1 cursor-pointer`}
                      >
                        {room.hasPassword ? <Lock className="w-3 h-3" /> : <Play className="w-3 h-3 fill-white" />}
                        <span>{room.hasPassword ? "입장" : "바로 참가"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Room Creation and Direct Code Join Forms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Create Room Box */}
          <div className={`p-5 ${theme.lightCardBg} rounded-2xl flex flex-col justify-between shadow-sm space-y-4`}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 ${theme.primaryBg} text-white rounded-xl w-fit shadow-md`}>
                  <Crown className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 bg-white/80 dark:bg-slate-800/80 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                  방 설정 가능
                </span>
              </div>

              <h3 className="text-sm font-black text-slate-900 dark:text-slate-100">새로운 대결 방 만들기</h3>

              {/* Room Name Input */}
              <div className="mt-3">
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  대결 방 이름
                </label>
                <input
                  type="text"
                  value={createRoomName}
                  onChange={(e) => setCreateRoomName(e.target.value)}
                  placeholder="예: 서울역 정복 스피드전"
                  maxLength={20}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              {/* Public vs Private Room Selector */}
              <div className="mt-3 space-y-2">
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block">
                  방 공개 여부
                </label>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPublicRoom(true)}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isPublicRoom
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                        : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>공개방</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsPublicRoom(false)}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      !isPublicRoom
                        ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                        : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>비밀방</span>
                  </button>
                </div>

                {/* Password field if Private Room */}
                {!isPublicRoom && (
                  <div className="mt-2 animate-fade-in">
                    <label className="text-[10px] font-bold text-amber-700 dark:text-amber-400 block mb-1">
                      비밀방 비밀번호 설정 (선택사항)
                    </label>
                    <input
                      type="password"
                      value={roomPasswordInput}
                      onChange={(e) => setRoomPasswordInput(e.target.value)}
                      placeholder="입장 비밀번호 입력"
                      className="w-full bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-800 rounded-xl p-2 text-xs font-bold text-slate-800 dark:text-slate-100"
                    />
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleCreateRoom}
              className={`mt-4 w-full py-2.5 ${theme.primaryBtn} font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer`}
            >
              <span>{isPublicRoom ? "공개 방 생성하기" : "비밀 방 생성하기"}</span>
              <Play className="w-3.5 h-3.5 fill-white" />
            </button>
          </div>

          {/* Direct Room Code Join Box */}
          <div className="p-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl flex flex-col justify-between shadow-sm">
            <div>
              <div className="p-2 bg-slate-800 dark:bg-slate-700 text-white rounded-xl w-fit mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black text-slate-900 dark:text-slate-100">초대 코드로 비밀 입장</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">친구에게 직접 공유받은 4자리 초대 코드가 있다면 입력하세요.</p>

              <input
                type="text"
                value={roomCodeInput}
                onChange={(e) => setRoomCodeInput(e.target.value.toUpperCase())}
                placeholder="예: 1234"
                maxLength={10}
                className={`w-full mt-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs font-mono font-bold uppercase text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 ${theme.focusRing}`}
              />
            </div>

            <button
              onClick={handleJoinByCodeSubmit}
              disabled={!roomCodeInput.trim()}
              className={`mt-4 w-full py-2.5 ${theme.joinBtn} disabled:opacity-40 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer`}
            >
              <span>코드 입력하여 참가하기</span>
              <Flag className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
