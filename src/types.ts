/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type RegionLevel = "sido" | "sigungu" | "world" | "japan" | "usa" | "china";

export interface Region {
  id: string;
  name_kr: string; // Korean name (the typing target)
  name_en: string; // English name
  level: RegionLevel;
  lat: number;
  lng: number;
  region_group: string;
  neighbors: string[]; // Adjacent region IDs
  description?: string; // Optional default descriptions/trivia
}

export type PlayMode = "single" | "quiz";

export interface GameSettings {
  level: RegionLevel;
  regionGroup: string;
  targetCount: number; // 10, 30, 50, or full
  strictMode: boolean; // strict typing or lenient
  advanceMode?: "auto" | "manual"; // 자동 완료 or 수동 제출 (Space/Enter)
}

export interface PlayStats {
  cpm: number; // characters per minute (타수)
  accuracy: number; // correct characters / total inputs
  elapsedTime: number; // in seconds
  combo: number;
  maxCombo: number;
  visitedCount: number;
  completed: boolean;
}

export interface QuizQuestion {
  id: string;
  type: "locate" | "name" | "trivia";
  region: Region;
  prompt: string;
  options?: string[]; // Multiple choice options (for name or trivia)
  correctAnswer: string; // Region ID or Korean name
}

export interface RegionTrivia {
  regionId: string;
  name: string;
  trivia: string[];
  tips: string;
}
