/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    console.log("Gemini API client initialized successfully.");
  } catch (err) {
    console.error("Failed to initialize Gemini API client:", err);
  }
} else {
  console.log("No valid GEMINI_API_KEY detected. Server will run with static local backup content.");
}

// ==========================================
// STATIC REGIONAL BACKUP DATA
// ==========================================
const STATIC_TRIVIA_BACKUP: Record<string, { trivia: string[]; food: string[]; landmark: string[] }> = {
  seoul: {
    trivia: [
      "서울은 2000년이 넘는 역사를 지닌 고도이며, 백제, 조선의 수도였습니다.",
      "경복궁, 창덕궁, 덕수궁 등 5대 고궁이 도심 속에 자리 잡고 있습니다."
    ],
    food: ["설렁탕", "신당동 떡볶이", "마포 갈비"],
    landmark: ["N서울타워", "경복궁", "명동", "동대문디자인플라자(DDP)"]
  },
  busan: {
    trivia: [
      "대한민국 최대의 해양항만도시이며 해운대와 광안리 해수욕장으로 유명합니다.",
      "매년 세계적인 부산국제영화제(BIFF)가 개최되어 문화 예술의 허브 역할을 합니다."
    ],
    food: ["돼지국밥", "밀면", "씨앗호떡", "부산어묵"],
    landmark: ["해운대", "감천문화마을", "자갈치시장", "광안대교"]
  },
  daegu: {
    trivia: [
      "분지 지형으로 인해 한국에서 가장 기온이 높은 편이며 '대프리카'로 불립니다.",
      "역사적으로 섬유산업과 약령시 한방 시장이 크게 발달했던 곳입니다."
    ],
    food: ["막창구이", "뭉티기(육사시미)", "따로국밥", "동인동 매운갈비찜"],
    landmark: ["김광석 다시그리기 길", "서문시장", "팔공산", "이월드(83타워)"]
  },
  jeju: {
    trivia: [
      "유네스코 세계자연유산으로 등재된 대한민국 최대의 화산섬입니다.",
      "돌, 바람, 여자가 많다고 하여 '삼다도'라는 별칭을 가지고 있습니다."
    ],
    food: ["흑돼지 구이", "고기국수", "갈치조림", "오메기떡"],
    landmark: ["한라산", "성산일출봉", "협재해수욕장", "만장굴"]
  }
};

// ==========================================
// API ENDPOINTS
// ==========================================

// API health endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", geminiEnabled: ai !== null });
});

// Trivia Endpoint (using Gemini 3.6 Flash)
app.post("/api/gemini/trivia", async (req, res) => {
  const { regionId, regionName, regionEn, description } = req.body;

  if (!regionName) {
    return res.status(400).json({ error: "regionName parameter is required" });
  }

  // If Gemini is not enabled, return local mock backup
  if (!ai) {
    const backup = STATIC_TRIVIA_BACKUP[regionId] || {
      trivia: [
        `${regionName}은(는) 매력적인 볼거리와 풍부한 이야기를 담고 있는 한국의 소중한 명소입니다.`,
        `${regionName}은 지리적으로 교통 요충지이자 고유한 현지 전통문화를 꽃피운 지역입니다.`
      ],
      food: ["지역 대표 특산물 요리"],
      landmark: ["지역 시청/군청", "주요 생태공원", "전통 유적지"]
    };
    return res.json({
      success: true,
      aiGenerated: false,
      regionId,
      regionName,
      ...backup
    });
  }

  try {
    const prompt = `대한민국의 행정구역인 "${regionName}" (영어: ${regionEn}, 상세: ${description || ""})에 대한 흥미로운 로컬 정보(로컬 상식, 대표 맛집/먹거리, 대표 랜드마크)를 한국어로 재미있고 전문적인 톤으로 작성해줘. 
    JSON 형식으로만 대답해줘. 스키마는 다음과 같아야 해:
    {
      "trivia": ["흥미롭고 놀라운 역사/지리/문화 상식 문장 1", "흥미로운 상식 문장 2"],
      "food": ["현지에서 가장 유명한 먹거리/특산품/음식 이름 1", "음식 이름 2"],
      "landmark": ["방문하기 좋은 대표적인 관광지/랜드마크 1", "랜드마크 2", "랜드마크 3"]
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            trivia: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "2-3 sentences of interesting history, culture or geographical facts about the region."
            },
            food: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Famous local cuisine, foods, or agricultural specialty goods."
            },
            landmark: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3-4 must-visit representative tourist attractions, landscapes, or buildings."
            }
          },
          required: ["trivia", "food", "landmark"]
        }
      }
    });

    const data = JSON.parse(response.text || "{}");
    res.json({
      success: true,
      aiGenerated: true,
      regionId,
      regionName,
      trivia: data.trivia || [],
      food: data.food || [],
      landmark: data.landmark || []
    });
  } catch (error: any) {
    const isQuotaError = error?.status === 429 || error?.message?.includes("429") || error?.message?.includes("quota");
    if (isQuotaError) {
      console.warn(`[Gemini API] Quota limit reached for region '${regionName}'. Serving instant local fallback trivia.`);
    } else {
      console.warn(`[Gemini API] Request failed for '${regionName}':`, error?.message || error);
    }
    // Fall back to static
    const backup = STATIC_TRIVIA_BACKUP[regionId] || {
      trivia: [
        `${regionName}은(는) 지리적인 개성과 현지 주민들의 정겨운 정서가 고스란히 묻어나는 지역입니다.`,
        "유구한 전통과 미래 첨단 기술/농업 비전이 함께 공존하는 매력적인 행정구역입니다."
      ],
      food: ["현지 특화 로컬 전통음식"],
      landmark: ["지역 관광단지", "중심 유적지"]
    };
    res.json({
      success: true,
      aiGenerated: false,
      regionId,
      regionName,
      error: "Gemini server fallback loaded",
      ...backup
    });
  }
});

// Quiz generation Endpoint (using Gemini 3.6 Flash)
app.post("/api/gemini/quiz", async (req, res) => {
  const { regionsList } = req.body; // Array of { id, name_kr, region_group, description }

  if (!regionsList || !Array.isArray(regionsList) || regionsList.length === 0) {
    return res.status(400).json({ error: "regionsList is required as an array" });
  }

  // Pick a random subset of 8 regions to generate quiz for
  const shuffled = [...regionsList].sort(() => 0.5 - Math.random());
  const selectedRegions = shuffled.slice(0, Math.min(shuffled.length, 10));

  if (!ai) {
    // Generate a quick local quiz based on description
    const questions = selectedRegions.map((reg, index) => {
      return {
        id: `local-q-${index}-${Date.now()}`,
        type: Math.random() > 0.5 ? "locate" : "name",
        region: reg,
        prompt: reg.description || `${reg.name_kr}은(는) 어느 권역에 속해 있는 자랑스러운 대한민국의 도시일까요?`,
        options: [reg.name_kr, "부산광역시", "춘천시", "강릉시"].sort(() => 0.5 - Math.random()),
        correctAnswer: reg.name_kr
      };
    });
    return res.json({ success: true, aiGenerated: false, questions });
  }

  try {
    const listString = selectedRegions.map((r) => `- ID: ${r.id}, 한글명: ${r.name_kr}, 소속권역: ${r.region_group}, 설명: ${r.description}`).join("\n");

    const prompt = `제시된 대한민국의 행정구역 목록을 활용하여 재미있고 유익한 '지역 이름 및 상식 맞히기' 퀴즈 질문을 5개 생성해줘.
    각 질문은 반드시 제공된 지역 목록 안의 지역들 중 하나를 정답으로 해야 하며, 유형은 'name' (상식 힌트를 주고 지역 한글명 맞히기) 또는 'trivia' (문화/특산물 관련 질문을 주고 지역 한글명 맞히기)이어야 해.
    
    제공하는 지역 목록:
    ${listString}

    반드시 다음과 같은 구조의 JSON 형식으로 출력해줘:
    {
      "questions": [
        {
          "id": "유니크한_문자열_id_1",
          "type": "name" 또는 "trivia",
          "regionId": "정답인 지역의 ID (예: andong)",
          "prompt": "안동소주와 안동찜닭으로 대표되고 퇴계 이황의 정취가 서린 이 고장, 하회마을이 있는 이 도시의 이름은 무엇일까요?",
          "options": ["경주시", "안동시", "수원시", "춘천시"],
          "correctAnswer": "안동시"
        }
      ]
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  type: { type: Type.STRING, description: "'name' or 'trivia'" },
                  regionId: { type: Type.STRING, description: "The ID of the correct region." },
                  prompt: { type: Type.STRING, description: "The interesting clue or question prompt." },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Exactly 4 options, including the correct Korean name of the region."
                  },
                  correctAnswer: { type: Type.STRING, description: "The correct Korean name of the region (must match one of the options)." }
                },
                required: ["id", "type", "regionId", "prompt", "options", "correctAnswer"]
              }
            }
          },
          required: ["questions"]
        }
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    
    // Map back full region info
    const finalQuestions = (parsedData.questions || []).map((q: any) => {
      const fullRegion = selectedRegions.find((r) => r.id === q.regionId) || selectedRegions[0];
      return {
        id: q.id,
        type: q.type,
        region: fullRegion,
        prompt: q.prompt,
        options: q.options,
        correctAnswer: q.correctAnswer
      };
    });

    res.json({
      success: true,
      aiGenerated: true,
      questions: finalQuestions
    });
  } catch (error: any) {
    const isQuotaError = error?.status === 429 || error?.message?.includes("429") || error?.message?.includes("quota");
    if (isQuotaError) {
      console.warn("[Gemini API] Quota limit reached for quiz generation. Serving instant local quiz.");
    } else {
      console.warn("[Gemini API] Quiz generate request failed:", error?.message || error);
    }
    // Return backup local quiz
    const questions = selectedRegions.slice(0, 5).map((reg, index) => {
      return {
        id: `local-q-err-${index}-${Date.now()}`,
        type: "name",
        region: reg,
        prompt: reg.description || `${reg.name_kr}은(는) 전주 한옥마을, 성심당 등 현지 대표 자랑거리가 유명한 어느 도시일까요?`,
        options: [reg.name_kr, "광주광역시", "천안시", "강릉시"].sort(() => 0.5 - Math.random()),
        correctAnswer: reg.name_kr
      };
    });
    res.json({ success: true, aiGenerated: false, questions });
  }
});

// ==========================================
// VITE OR STATIC FILE SERVING
// ==========================================

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Vite middleware for development
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware integrated.");
  } else {
    // Production static asset delivery
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static production assets from dist/.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

startServer();
