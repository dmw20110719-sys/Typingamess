import { Region } from "../types";

export const JAPAN_LIST: Region[] = [
  // 1. 홋카이도
  {
    id: "jp_hokkaido",
    name_kr: "홋카이도",
    name_en: "Hokkaido",
    level: "japan",
    lat: 43.0618,
    lng: 141.3545,
    region_group: "홋카이도",
    neighbors: ["jp_aomori"],
    description: "눈축제와 설원, 삿포로 라멘과 야경으로 유명한 일본 북단의 대자연 섬입니다."
  },
  // 2. 도호쿠 (6개 현)
  {
    id: "jp_aomori",
    name_kr: "아오모리",
    name_en: "Aomori",
    level: "japan",
    lat: 40.8244,
    lng: 140.74,
    region_group: "도호쿠",
    neighbors: ["jp_hokkaido", "jp_iwate", "jp_akita"],
    description: "화려한 네부타 축제와 명품 아오모리 사과, 설경이 유명한 도호쿠 최북단 현입니다."
  },
  {
    id: "jp_iwate",
    name_kr: "이와테",
    name_en: "Iwate",
    level: "japan",
    lat: 39.7036,
    lng: 141.1527,
    region_group: "도호쿠",
    neighbors: ["jp_aomori", "jp_miyagi", "jp_akita"],
    description: "주손지와 도호쿠 완코소바, 광활한 리아스식 해안으로 대표되는 고장입니다."
  },
  {
    id: "jp_miyagi",
    name_kr: "미야기",
    name_en: "Miyagi",
    level: "japan",
    lat: 38.2682,
    lng: 140.8694,
    region_group: "도호쿠",
    neighbors: ["jp_iwate", "jp_yamagata", "jp_fukushima"],
    description: "다테 마사무네의 센다이와 소혀(규탄) 구이, 마쓰시마 절경이 유명합니다."
  },
  {
    id: "jp_akita",
    name_kr: "아키타",
    name_en: "Akita",
    level: "japan",
    lat: 39.7186,
    lng: 140.1024,
    region_group: "도호쿠",
    neighbors: ["jp_aomori", "jp_iwate", "jp_yamagata"],
    description: "아키타견과 온천 명소 뉴토 온천향, 칸토 축제로 사랑받는 전통 고장입니다."
  },
  {
    id: "jp_yamagata",
    name_kr: "야마가타",
    name_en: "Yamagata",
    level: "japan",
    lat: 38.2404,
    lng: 140.3633,
    region_group: "도호쿠",
    neighbors: ["jp_akita", "jp_miyagi", "jp_fukushima", "jp_niigata"],
    description: "자오 온천의 수빙(눈몬스터)과 긴잔 온천, 체리로 잘 알려진 지역입니다."
  },
  {
    id: "jp_fukushima",
    name_kr: "후쿠시마",
    name_en: "Fukushima",
    level: "japan",
    lat: 37.7608,
    lng: 140.4748,
    region_group: "도호쿠",
    neighbors: ["jp_miyagi", "jp_yamagata", "jp_ibaraki", "jp_tochigi", "jp_gunma", "jp_niigata"],
    description: "아이즈와카마쓰의 사무라이 역사와 오우치주쿠 전통 초가마을이 있습니다."
  },
  // 3. 간토 (7개 도현)
  {
    id: "jp_ibaraki",
    name_kr: "이바라키",
    name_en: "Ibaraki",
    level: "japan",
    lat: 36.3418,
    lng: 140.4468,
    region_group: "간토",
    neighbors: ["jp_fukushima", "jp_tochigi", "jp_saitama", "jp_chiba"],
    description: "국영 히타치 해변공원의 푸른 네모필라 언덕과 낫토로 이름난 현입니다."
  },
  {
    id: "jp_tochigi",
    name_kr: "도치기",
    name_en: "Tochigi",
    level: "japan",
    lat: 36.5657,
    lng: 139.8836,
    region_group: "간토",
    neighbors: ["jp_fukushima", "jp_ibaraki", "jp_gunma", "jp_saitama"],
    description: "세계유산 닛코 도쇼구 신사와 우쓰노미야 교자, 기누가와 온천이 있습니다."
  },
  {
    id: "jp_gunma",
    name_kr: "군마",
    name_en: "Gunma",
    level: "japan",
    lat: 36.3907,
    lng: 139.0604,
    region_group: "간토",
    neighbors: ["jp_fukushima", "jp_tochigi", "jp_saitama", "jp_nagano", "jp_niigata"],
    description: "쿠사츠 온천과 이카호 온천 등 일본 대표 온천 휴양지가 집결한 온천의 고장입니다."
  },
  {
    id: "jp_saitama",
    name_kr: "사이타마",
    name_en: "Saitama",
    level: "japan",
    lat: 35.8617,
    lng: 139.6455,
    region_group: "간토",
    neighbors: ["jp_tokyo", "jp_chiba", "jp_ibaraki", "jp_tochigi", "jp_gunma", "jp_yamanashi", "jp_nagano"],
    description: "도쿄 수도권의 가와고에 전통거리(작은 교토)와 짱구는 못말려 배경 도시입니다."
  },
  {
    id: "jp_chiba",
    name_kr: "치바",
    name_en: "Chiba",
    level: "japan",
    lat: 35.6074,
    lng: 140.1065,
    region_group: "간토",
    neighbors: ["jp_tokyo", "jp_saitama", "jp_ibaraki", "jp_kanagawa"],
    description: "도쿄 디즈니리조트와 나리타 국제공항, 보소 반도 해안이 위치한 현입니다."
  },
  {
    id: "jp_tokyo",
    name_kr: "도쿄",
    name_en: "Tokyo",
    level: "japan",
    lat: 35.6762,
    lng: 139.6503,
    region_group: "간토",
    neighbors: ["jp_kanagawa", "jp_chiba", "jp_saitama", "jp_yamanashi"],
    description: "일본의 수도이자 정치, 경제, 문화, 쇼핑, 미식의 세계적 대도시입니다."
  },
  {
    id: "jp_kanagawa",
    name_kr: "가나가와",
    name_en: "Kanagawa",
    level: "japan",
    lat: 35.4437,
    lng: 139.6380,
    region_group: "간토",
    neighbors: ["jp_tokyo", "jp_chiba", "jp_shizuoka", "jp_yamanashi"],
    description: "요코하마 항구야경, 가마쿠라 대불상, 하코네 온천이 매력적인 현입니다."
  },
  // 4. 주부 (9개 현)
  {
    id: "jp_niigata",
    name_kr: "니가타",
    name_en: "Niigata",
    level: "japan",
    lat: 37.9162,
    lng: 139.0364,
    region_group: "주부",
    neighbors: ["jp_yamagata", "jp_fukushima", "jp_gunma", "jp_nagano", "jp_toyama"],
    description: "최고급 고시히카리 쌀과 명품 사케, 겨울 스키 리조트로 정평이 난 동해안 현입니다."
  },
  {
    id: "jp_toyama",
    name_kr: "도야마",
    name_en: "Toyama",
    level: "japan",
    lat: 36.6953,
    lng: 137.2113,
    region_group: "주부",
    neighbors: ["jp_niigata", "jp_ishikawa", "jp_nagano", "jp_gifu"],
    description: "도야마만 신비로운 실오징어와 다테야마 구로베 알펜루트 대설벽의 도시입니다."
  },
  {
    id: "jp_ishikawa",
    name_kr: "이시카와",
    name_en: "Ishikawa",
    level: "japan",
    lat: 36.5613,
    lng: 136.6562,
    region_group: "주부",
    neighbors: ["jp_toyama", "jp_fukui", "jp_gifu"],
    description: "가나자와 겐로쿠엔 정원, 금박 공예, 찻집 거리와 노토 반도가 위치합니다."
  },
  {
    id: "jp_fukui",
    name_kr: "후쿠이",
    name_en: "Fukui",
    level: "japan",
    lat: 36.0652,
    lng: 136.2216,
    region_group: "주부",
    neighbors: ["jp_ishikawa", "jp_gifu", "jp_shiga", "jp_kyoto"],
    description: "세계적인 공룡 박물관과 에치젠 게, 도젠지 사찰로 저명한 역사 문화 고장입니다."
  },
  {
    id: "jp_yamanashi",
    name_kr: "야마나시",
    name_en: "Yamanashi",
    level: "japan",
    lat: 35.6642,
    lng: 138.5684,
    region_group: "주부",
    neighbors: ["jp_saitama", "jp_tokyo", "jp_kanagawa", "jp_shizuoka", "jp_nagano"],
    description: "후지산 호수지대(후지 5호)와 와이너리, 샤인머스캣 청포도로 유명합니다."
  },
  {
    id: "jp_nagano",
    name_kr: "나가노",
    name_en: "Nagano",
    level: "japan",
    lat: 36.6486,
    lng: 138.1942,
    region_group: "주부",
    neighbors: ["jp_gunma", "jp_saitama", "jp_yamanashi", "jp_shizuoka", "jp_aichi", "jp_gifu", "jp_toyama", "jp_niigata"],
    description: "일본 알프스 고원, 카루이자와 휴양지, 젠코지 사찰과 가미코치 산책길이 유명합니다."
  },
  {
    id: "jp_gifu",
    name_kr: "기후",
    name_en: "Gifu",
    level: "japan",
    lat: 35.3912,
    lng: 136.7223,
    region_group: "주부",
    neighbors: ["jp_toyama", "jp_ishikawa", "jp_fukui", "jp_nagano", "jp_aichi", "jp_mie", "jp_shiga"],
    description: "세계유산 시라카와고 갓쇼조쿠리 합장마을과 히다 타카야마의 옛 전통거리입니다."
  },
  {
    id: "jp_shizuoka",
    name_kr: "시즈오카",
    name_en: "Shizuoka",
    level: "japan",
    lat: 34.9756,
    lng: 138.3828,
    region_group: "주부",
    neighbors: ["jp_kanagawa", "jp_yamanashi", "jp_nagano", "jp_aichi"],
    description: "후지산 웅장한 기슭과 시즈오카 녹차, 아타미 온천, 와사비 재배지입니다."
  },
  {
    id: "jp_aichi",
    name_kr: "아이치",
    name_en: "Aichi",
    level: "japan",
    lat: 35.1815,
    lng: 136.9066,
    region_group: "주부",
    neighbors: ["jp_shizuoka", "jp_nagano", "jp_gifu", "jp_mie"],
    description: "나고야성과 지브리 파크, 미소카츠, 도요타 자동차 산업의 거점 현입니다."
  },
  // 5. 간사이 / 긴키 (7개 부현)
  {
    id: "jp_mie",
    name_kr: "미에",
    name_en: "Mie",
    level: "japan",
    lat: 34.7303,
    lng: 136.5086,
    region_group: "간사이",
    neighbors: ["jp_aichi", "jp_gifu", "jp_shiga", "jp_kyoto", "jp_nara", "jp_wakayama"],
    description: "일본 신도의 최고 성지 이세 신궁과 마쓰사카 소고기, 이세시마 해안이 있습니다."
  },
  {
    id: "jp_shiga",
    name_kr: "시가",
    name_en: "Shiga",
    level: "japan",
    lat: 35.0045,
    lng: 135.8686,
    region_group: "간사이",
    neighbors: ["jp_fukui", "jp_gifu", "jp_mie", "jp_kyoto"],
    description: "일본 최대의 호수 비와호와 국보 히코네성이 자리한 아름다운 수변 고장입니다."
  },
  {
    id: "jp_kyoto",
    name_kr: "교토",
    name_en: "Kyoto",
    level: "japan",
    lat: 35.0116,
    lng: 135.7681,
    region_group: "간사이",
    neighbors: ["jp_fukui", "jp_shiga", "jp_mie", "jp_nara", "jp_osaka", "jp_hyogo"],
    description: "금각사, 청수사, 기온거리 등 수천 년 역사가 숨쉬는 천년고도 전통 문화 부입니다."
  },
  {
    id: "jp_osaka",
    name_kr: "오사카",
    name_en: "Osaka",
    level: "japan",
    lat: 34.6937,
    lng: 135.5023,
    region_group: "간사이",
    neighbors: ["jp_kyoto", "jp_hyogo", "jp_nara", "jp_wakayama"],
    description: "도톤보리 글리코상과 오사카성, 타코야키와 USJ로 유명한 식도락의 중심지입니다."
  },
  {
    id: "jp_hyogo",
    name_kr: "효고",
    name_en: "Hyogo",
    level: "japan",
    lat: 34.6901,
    lng: 135.1955,
    region_group: "간사이",
    neighbors: ["jp_kyoto", "jp_osaka", "jp_tottori", "jp_okayama"],
    description: "고베 항구의 이국적 풍경과 고베규, 흰 백로 같은 히메지성, 아리마 온천입니다."
  },
  {
    id: "jp_nara",
    name_kr: "나라",
    name_en: "Nara",
    level: "japan",
    lat: 34.6851,
    lng: 135.8049,
    region_group: "간사이",
    neighbors: ["jp_kyoto", "jp_osaka", "jp_mie", "jp_wakayama"],
    description: "나라 공원의 자유로운 사슴들과 도다이지(동대사) 대불상이 상징적인 유서 깊은 곳입니다."
  },
  {
    id: "jp_wakayama",
    name_kr: "와카야마",
    name_en: "Wakayama",
    level: "japan",
    lat: 34.2260,
    lng: 135.1675,
    region_group: "간사이",
    neighbors: ["jp_osaka", "jp_nara", "jp_mie"],
    description: "고야산 불교 성지와 구마노 고도 순례길, 나치 폭포와 달콤한 귤의 고장입니다."
  },
  // 6. 주고쿠 (5개 현)
  {
    id: "jp_tottori",
    name_kr: "돗토리",
    name_en: "Tottori",
    level: "japan",
    lat: 35.5011,
    lng: 134.2351,
    region_group: "주고쿠",
    neighbors: ["jp_hyogo", "jp_shimane", "jp_okayama"],
    description: "동해안의 사막 같은 돗토리 사구와 명탐정 코난 마을(요라)로 인기 있는 현입니다."
  },
  {
    id: "jp_shimane",
    name_kr: "시마네",
    name_en: "Shimane",
    level: "japan",
    lat: 35.4723,
    lng: 133.0505,
    region_group: "주고쿠",
    neighbors: ["jp_tottori", "jp_hiroshima", "jp_yamaguchi"],
    description: "인연을 맺어주는 이즈모 대사와 마쓰에성, 세계유산 이와미 은광이 있습니다."
  },
  {
    id: "jp_okayama",
    name_kr: "오카야마",
    name_en: "Okayama",
    level: "japan",
    lat: 34.6551,
    lng: 133.9195,
    region_group: "주고쿠",
    neighbors: ["jp_hyogo", "jp_tottori", "jp_hiroshima", "jp_kagawa"],
    description: "구라시키 미관지구의 감성 운하 마을, 청명한 날씨와 복숭아로 유명합니다."
  },
  {
    id: "jp_hiroshima",
    name_kr: "히로시마",
    name_en: "Hiroshima",
    level: "japan",
    lat: 34.3853,
    lng: 132.4553,
    region_group: "주고쿠",
    neighbors: ["jp_okayama", "jp_shimane", "jp_yamaguchi", "jp_ehime"],
    description: "미야지마 이츠쿠시마 신사의 바다 위 붉은 도리이, 히로시마풍 오코노미야키의 고장입니다."
  },
  {
    id: "jp_yamaguchi",
    name_kr: "야마구치",
    name_en: "Yamaguchi",
    level: "japan",
    lat: 34.1780,
    lng: 131.4738,
    region_group: "주고쿠",
    neighbors: ["jp_shimane", "jp_hiroshima", "jp_fukuoka"],
    description: "에메랄드 바다 위 츠노시마 대교와 붉은 도리이 터널의 모토노스미 신사입니다."
  },
  // 7. 시코쿠 (4개 현)
  {
    id: "jp_tokushima",
    name_kr: "도쿠시마",
    name_en: "Tokushima",
    level: "japan",
    lat: 34.0704,
    lng: 134.5548,
    region_group: "시코쿠",
    neighbors: ["jp_kagawa", "jp_ehime", "jp_kochi"],
    description: "아와오도리 춤 축제와 소용돌이 해류로 유명한 나루토 해협이 위치합니다."
  },
  {
    id: "jp_kagawa",
    name_kr: "카가와",
    name_en: "Kagawa",
    level: "japan",
    lat: 34.3402,
    lng: 134.0433,
    region_group: "시코쿠",
    neighbors: ["jp_tokushima", "jp_ehime", "jp_okayama"],
    description: "사누키 우동의 본고장이자 예술의 섬 나오시마와 리쓰린 정원이 유명합니다."
  },
  {
    id: "jp_ehime",
    name_kr: "에히메",
    name_en: "Ehime",
    level: "japan",
    lat: 33.8416,
    lng: 132.7657,
    region_group: "시코쿠",
    neighbors: ["jp_kagawa", "jp_tokushima", "jp_kochi", "jp_hiroshima"],
    description: "센과 치히로의 행방불명 모티브 도고 온천과 귤, 시마나미 카이도가 아름답습니다."
  },
  {
    id: "jp_kochi",
    name_kr: "고치",
    name_en: "Kochi",
    level: "japan",
    lat: 33.5597,
    lng: 133.5311,
    region_group: "시코쿠",
    neighbors: ["jp_ehime", "jp_tokushima"],
    description: "사카모토 료마의 고향이자 가쓰우라 해변, 가다랑어(가츠오) 짚불구이 명물입니다."
  },
  // 8. 규슈 & 오키나와 (8개 현)
  {
    id: "jp_fukuoka",
    name_kr: "후쿠오카",
    name_en: "Fukuoka",
    level: "japan",
    lat: 33.5904,
    lng: 130.4017,
    region_group: "규슈",
    neighbors: ["jp_saga", "jp_kumamoto", "jp_oita", "jp_yamaguchi"],
    description: "하카타 돈코츠 라멘, 포장마차 야타이, 다자이후 텐만구로 가득한 규슈 관문입니다."
  },
  {
    id: "jp_saga",
    name_kr: "사가",
    name_en: "Saga",
    level: "japan",
    lat: 33.2635,
    lng: 130.3009,
    region_group: "규슈",
    neighbors: ["jp_fukuoka", "jp_nagasaki"],
    description: "아리타, 이마리 도자기와 우레시노 온천, 가라츠성의 평화로운 고장입니다."
  },
  {
    id: "jp_nagasaki",
    name_kr: "나가사키",
    name_en: "Nagasaki",
    level: "japan",
    lat: 32.7503,
    lng: 129.8777,
    region_group: "규슈",
    neighbors: ["jp_saga"],
    description: "하우스텐보스, 나가사키 짬뽕, 이국적인 항구야경과 군함도가 위치합니다."
  },
  {
    id: "jp_kumamoto",
    name_kr: "구마모토",
    name_en: "Kumamoto",
    level: "japan",
    lat: 32.7898,
    lng: 130.7417,
    region_group: "규슈",
    neighbors: ["jp_fukuoka", "jp_oita", "jp_miyazaki", "jp_kagoshima"],
    description: "아소산 웅장한 칼데라 화산과 구마모토성, 쿠마몬 캐릭터의 상징적 고장입니다."
  },
  {
    id: "jp_oita",
    name_kr: "오이타",
    name_en: "Oita",
    level: "japan",
    lat: 33.2382,
    lng: 131.6126,
    region_group: "규슈",
    neighbors: ["jp_fukuoka", "jp_kumamoto", "jp_miyazaki"],
    description: "온천의 천국 유후인 온천 마을과 벳푸 지옥온천으로 일본 제일의 온천현입니다."
  },
  {
    id: "jp_miyazaki",
    name_kr: "미야자키",
    name_en: "Miyazaki",
    level: "japan",
    lat: 31.9111,
    lng: 131.4239,
    region_group: "규슈",
    neighbors: ["jp_oita", "jp_kumamoto", "jp_kagoshima"],
    description: "타카치호 협곡의 신비로운 난간과 모아이 동상이 있는 아오시마 휴양지입니다."
  },
  {
    id: "jp_kagoshima",
    name_kr: "가고시마",
    name_en: "Kagoshima",
    level: "japan",
    lat: 31.5966,
    lng: 130.5571,
    region_group: "규슈",
    neighbors: ["jp_kumamoto", "jp_miyazaki", "jp_okinawa"],
    description: "사쿠라지마 활화산, 야쿠시마 원시림, 모래찜질 온천과 흑돼지 요리의 명소입니다."
  },
  {
    id: "jp_okinawa",
    name_kr: "오키나와",
    name_en: "Okinawa",
    level: "japan",
    lat: 26.2124,
    lng: 127.6809,
    region_group: "오키나와",
    neighbors: ["jp_kagoshima"],
    description: "에메랄드빛 바다, 츄라우미 수족관, 슈리성 등 동양의 하와이라 불리는 휴양 섬입니다."
  }
];
