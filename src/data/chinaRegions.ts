/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Region } from "../types";

export const CHINA_LIST: Region[] = [
  {
    id: "china_beijing",
    name_kr: "베이징",
    name_en: "Beijing",
    level: "china",
    lat: 39.904989,
    lng: 116.405285,
    region_group: "직할시",
    neighbors: ["china_tianjin", "china_hebei"],
    description: "중국의 수도이자 정치, 문화, 국제 교류의 중심지입니다."
  },
  {
    id: "china_tianjin",
    name_kr: "톈진",
    name_en: "Tianjin",
    level: "china",
    lat: 39.125596,
    lng: 117.190182,
    region_group: "직할시",
    neighbors: ["china_beijing", "china_hebei"],
    description: "베이징의 주요 관문이자 화북 지방의 대표적인 항구 직할시입니다."
  },
  {
    id: "china_shanghai",
    name_kr: "상하이",
    name_en: "Shanghai",
    level: "china",
    lat: 31.231706,
    lng: 121.472644,
    region_group: "직할시",
    neighbors: ["china_jiangsu", "china_zhejiang"],
    description: "중국 최대의 경제, 금융, 무역 중심 도시이자 글로벌 해운 허브입니다."
  },
  {
    id: "china_chongqing",
    name_kr: "충칭",
    name_en: "Chongqing",
    level: "china",
    lat: 29.533155,
    lng: 107.304962,
    region_group: "직할시",
    neighbors: ["china_sichuan", "china_shaanxi", "china_hubei", "china_hunan", "china_guizhou"],
    description: "장강 상류의 입체적 야경과 훠궈로 유명한 서난부 대규모 직할시입니다."
  },
  {
    id: "china_hebei",
    name_kr: "허베이",
    name_en: "Hebei",
    level: "china",
    lat: 38.045474,
    lng: 114.502461,
    region_group: "화북",
    neighbors: ["china_beijing", "china_tianjin", "china_shanxi", "china_inner_mongolia", "china_liaoning", "china_shandong", "china_henan"],
    description: "베이징과 톈진을 둘러싸고 있으며 만리장성이 관통하는 성입니다."
  },
  {
    id: "china_shanxi",
    name_kr: "산시",
    name_en: "Shanxi",
    level: "china",
    lat: 36.857014,
    lng: 111.849248,
    region_group: "화북",
    neighbors: ["china_hebei", "china_inner_mongolia", "china_shaanxi", "china_henan"],
    description: "황허 강 동쪽에 위치하며 유서 깊은 고도 핑야오구청이 대표적입니다."
  },
  {
    id: "china_inner_mongolia",
    name_kr: "네이멍구",
    name_en: "Inner Mongolia",
    level: "china",
    lat: 41.818311,
    lng: 111.670801,
    region_group: "화북",
    neighbors: ["china_gansu", "china_ningxia", "china_shaanxi", "china_shanxi", "china_hebei", "china_liaoning", "china_jilin", "china_heilongjiang"],
    description: "광활한 초원과 고비 사막이 펼쳐진 북부의 자치구입니다."
  },
  {
    id: "china_liaoning",
    name_kr: "랴오닝",
    name_en: "Liaoning",
    level: "china",
    lat: 41.796767,
    lng: 123.429096,
    region_group: "동북",
    neighbors: ["china_jilin", "china_inner_mongolia", "china_hebei"],
    description: "동북3성의 중심지이자 선양, 다롄이 위치한 중공업 및 항만 성입니다."
  },
  {
    id: "china_jilin",
    name_kr: "지린",
    name_en: "Jilin",
    level: "china",
    lat: 43.886841,
    lng: 125.3245,
    region_group: "동북",
    neighbors: ["china_heilongjiang", "china_liaoning", "china_inner_mongolia"],
    description: "백두산(장백산) 북쪽 자락과 연변 조선족 자치주가 위치한 성입니다."
  },
  {
    id: "china_heilongjiang",
    name_kr: "헤이룽장",
    name_en: "Heilongjiang",
    level: "china",
    lat: 46.756967,
    lng: 128.642464,
    region_group: "동북",
    neighbors: ["china_jilin", "china_inner_mongolia"],
    description: "중국 최북단에 위치하며 빙등제로 유명한 하얼빈이 성도입니다."
  },
  {
    id: "china_jiangsu",
    name_kr: "장쑤",
    name_en: "Jiangsu",
    level: "china",
    lat: 33.041544,
    lng: 119.767413,
    region_group: "화동",
    neighbors: ["china_shanghai", "china_zhejiang", "china_anhui", "china_shandong"],
    description: "난징과 쑤저우, 무시 등 유서 깊은 수향 도시들이 모여있는 성입니다."
  },
  {
    id: "china_zhejiang",
    name_kr: "저장",
    name_en: "Zhejiang",
    level: "china",
    lat: 29.287459,
    lng: 120.153576,
    region_group: "화동",
    neighbors: ["china_shanghai", "china_jiangsu", "china_anhui", "china_jiangxi", "china_fujian"],
    description: "서호의 서정적인 풍경으로 유명한 항저우와 민간 경제의 중심지입니다."
  },
  {
    id: "china_anhui",
    name_kr: "안후이",
    name_en: "Anhui",
    level: "china",
    lat: 31.26119,
    lng: 117.283042,
    region_group: "화동",
    neighbors: ["china_jiangsu", "china_zhejiang", "china_jiangxi", "china_hubei", "china_henan", "china_shandong"],
    description: "명산 황산과 전통 휘주 양식의 건축문화가 가득한 성입니다."
  },
  {
    id: "china_fujian",
    name_kr: "푸젠",
    name_en: "Fujian",
    level: "china",
    lat: 26.075302,
    lng: 118.306239,
    region_group: "화동",
    neighbors: ["china_zhejiang", "china_jiangxi", "china_guangdong"],
    description: "샤먼과 토루 건축물, 차 문화가 발달한 대만 해협 맞은편의 성입니다."
  },
  {
    id: "china_jiangxi",
    name_kr: "장시",
    name_en: "Jiangxi",
    level: "china",
    lat: 27.676493,
    lng: 115.592151,
    region_group: "화동",
    neighbors: ["china_zhejiang", "china_anhui", "china_hubei", "china_hunan", "china_guangdong", "china_fujian"],
    description: "세계 도자기의 수도 징더전과 장강 남쪽의 아름다운 호수를 가진 성입니다."
  },
  {
    id: "china_shandong",
    name_kr: "산둥",
    name_en: "Shandong",
    level: "china",
    lat: 36.275807,
    lng: 118.000923,
    region_group: "화동",
    neighbors: ["china_hebei", "china_henan", "china_anhui", "china_jiangsu"],
    description: "공자의 고향 곡부와 태산, 칭다오 맥주로 유명한 한반도 근접 성입니다."
  },
  {
    id: "china_henan",
    name_kr: "허난",
    name_en: "Henan",
    level: "china",
    lat: 33.757975,
    lng: 113.665412,
    region_group: "중남",
    neighbors: ["china_hebei", "china_shanxi", "china_shaanxi", "china_hubei", "china_anhui", "china_shandong"],
    description: "중원 문화의 발상지이자 소림사와 낙양 용문석굴이 위치한 성입니다."
  },
  {
    id: "china_hubei",
    name_kr: "후베이",
    name_en: "Hubei",
    level: "china",
    lat: 30.684355,
    lng: 113.298572,
    region_group: "중남",
    neighbors: ["china_henan", "china_anhui", "china_jiangxi", "china_hunan", "china_chongqing", "china_shaanxi"],
    description: "장강 삼협과 교통 요충지 우한이 위치한 중부의 핵심 성입니다."
  },
  {
    id: "china_hunan",
    name_kr: "후난",
    name_en: "Hunan",
    level: "china",
    lat: 28.09409,
    lng: 111.782279,
    region_group: "중남",
    neighbors: ["china_hubei", "china_jiangxi", "china_guangdong", "china_guangxi", "china_guizhou", "china_chongqing"],
    description: "영화 아바타의 배경 장자제(장가계)와 창사가 위치한 성입니다."
  },
  {
    id: "china_guangdong",
    name_kr: "광둥",
    name_en: "Guangdong",
    level: "china",
    lat: 23.125178,
    lng: 113.280637,
    region_group: "중남",
    neighbors: ["china_fujian", "china_jiangxi", "china_hunan", "china_guangxi", "china_hongkong", "china_macau"],
    description: "광저우, 선전이 있는 중국 최대 인구 및 경제 규모의 성입니다."
  },
  {
    id: "china_guangxi",
    name_kr: "광시",
    name_en: "Guangxi",
    level: "china",
    lat: 22.82402,
    lng: 108.320004,
    region_group: "중남",
    neighbors: ["china_guangdong", "china_hunan", "china_guizhou", "china_yunnan"],
    description: "천하제일 산수 카르스트 지형 계림(구이린)이 위치한 남부 자치구입니다."
  },
  {
    id: "china_hainan",
    name_kr: "하이난",
    name_en: "Hainan",
    level: "china",
    lat: 19.031971,
    lng: 109.83119,
    region_group: "중남",
    neighbors: ["china_guangdong"],
    description: "중국 최남단의 열대 섬이자 대표적인 휴양 도시 산야가 위치합니다."
  },
  {
    id: "china_sichuan",
    name_kr: "쓰촨",
    name_en: "Sichuan",
    level: "china",
    lat: 30.659462,
    lng: 104.065735,
    region_group: "서남",
    neighbors: ["china_qinghai", "china_gansu", "china_shaanxi", "china_chongqing", "china_guizhou", "china_yunnan", "china_tibet"],
    description: "판다의 고향이자 성도(청두), 구채구, 매운 요리로 유명한 성입니다."
  },
  {
    id: "china_guizhou",
    name_kr: "구이저우",
    name_en: "Guizhou",
    level: "china",
    lat: 26.578343,
    lng: 106.713478,
    region_group: "서남",
    neighbors: ["china_sichuan", "china_chongqing", "china_hunan", "china_guangxi", "china_yunnan"],
    description: "황과수 폭포와 마오타이주의 고향이자 소수민족 문화가 가득한 성입니다."
  },
  {
    id: "china_yunnan",
    name_kr: "윈난",
    name_en: "Yunnan",
    level: "china",
    lat: 24.740609,
    lng: 101.512251,
    region_group: "서남",
    neighbors: ["china_tibet", "china_sichuan", "china_guizhou", "china_guangxi"],
    description: "리장 고성과 차마고도, 봄의 도시 쿤밍이 위치한 다채로운 성입니다."
  },
  {
    id: "china_tibet",
    name_kr: "티베트",
    name_en: "Tibet",
    level: "china",
    lat: 30.860361,
    lng: 89.132212,
    region_group: "서남",
    neighbors: ["china_xinjiang", "china_qinghai", "china_sichuan", "china_yunnan"],
    description: "세계의 지붕 히말라야와 포탈라궁이 위치한 신비로운 자치구입니다."
  },
  {
    id: "china_shaanxi",
    name_kr: "샤안시",
    name_en: "Shaanxi",
    level: "china",
    lat: 34.263161,
    lng: 108.948024,
    region_group: "서북",
    neighbors: ["china_inner_mongolia", "china_shanxi", "china_henan", "china_hubei", "china_chongqing", "china_sichuan", "china_gansu", "china_ningxia"],
    description: "병마용과 시안(서안) 성벽이 숨 쉬는 실크로드의 출발점 성입니다."
  },
  {
    id: "china_gansu",
    name_kr: "간쑤",
    name_en: "Gansu",
    level: "china",
    lat: 36.058039,
    lng: 103.823557,
    region_group: "서북",
    neighbors: ["china_xinjiang", "china_qinghai", "china_sichuan", "china_shaanxi", "china_ningxia", "china_inner_mongolia"],
    description: "돈황 막고굴과 기암괴석 칠채산이 장관을 이루는 실크로드 성입니다."
  },
  {
    id: "china_qinghai",
    name_kr: "칭하이",
    name_en: "Qinghai",
    level: "china",
    lat: 35.623178,
    lng: 96.778916,
    region_group: "서북",
    neighbors: ["china_xinjiang", "china_tibet", "china_sichuan", "china_gansu"],
    description: "중국 최대 내륙 염호 칭하이호와 장강, 황허의 발원지가 있는 성입니다."
  },
  {
    id: "china_ningxia",
    name_kr: "닝샤",
    name_en: "Ningxia",
    level: "china",
    lat: 37.26637,
    lng: 106.278179,
    region_group: "서북",
    neighbors: ["china_inner_mongolia", "china_gansu", "china_shaanxi"],
    description: "황허 강변의 서하 왕국 유적이 남아있는 회족 자치구입니다."
  },
  {
    id: "china_xinjiang",
    name_kr: "신장",
    name_en: "Xinjiang",
    level: "china",
    lat: 40.792818,
    lng: 85.617733,
    region_group: "서북",
    neighbors: ["china_tibet", "china_qinghai", "china_gansu"],
    description: "천산산맥과 만년설, 유구한 위구르 문화가 서린 최대 면적의 자치구입니다."
  },
  {
    id: "china_hongkong",
    name_kr: "홍콩",
    name_en: "Hong Kong",
    level: "china",
    lat: 22.320048,
    lng: 114.173355,
    region_group: "특별행정구",
    neighbors: ["china_guangdong", "china_macau"],
    description: "화려한 야경과 금융, 쇼핑의 중심지인 특별행정구입니다."
  },
  {
    id: "china_macau",
    name_kr: "마카오",
    name_en: "Macau",
    level: "china",
    lat: 22.198951,
    lng: 113.54909,
    region_group: "특별행정구",
    neighbors: ["china_guangdong", "china_hongkong"],
    description: "동서양 문화가 융합된 성 바울로 성당과 카지노의 특별행정구입니다."
  }
];
