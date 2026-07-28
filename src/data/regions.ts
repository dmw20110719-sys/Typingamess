/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Region } from "../types";
import { WORLD_COUNTRIES } from "./worldCountries";
import { JAPAN_LIST } from "./japanRegions";
import { USA_LIST } from "./usaRegions";
import { CHINA_LIST } from "./chinaRegions";

export const WORLD_LIST = WORLD_COUNTRIES;
export { JAPAN_LIST, USA_LIST, CHINA_LIST };

export const REGIONS: Region[] = [
  // ==========================================
  // 1. SIDO (광역 모드 - 17개 시도)
  // ==========================================
  {
    id: "seoul",
    name_kr: "서울특별시",
    name_en: "Seoul",
    level: "sido",
    lat: 37.5665,
    lng: 126.9780,
    region_group: "수도권",
    neighbors: ["incheon", "gyeonggi"],
    description: "대한민국의 수도이자 경제, 문화, 교육의 중심지입니다."
  },
  {
    id: "incheon",
    name_kr: "인천광역시",
    name_en: "Incheon",
    level: "sido",
    lat: 37.4563,
    lng: 126.7052,
    region_group: "수도권",
    neighbors: ["seoul", "gyeonggi"],
    description: "대한민국 서부의 대표적인 관문이자 국제공항과 항만이 있는 도시입니다."
  },
  {
    id: "gyeonggi",
    name_kr: "경기도",
    name_en: "Gyeonggi-do",
    level: "sido",
    lat: 37.4138,
    lng: 127.5183,
    region_group: "수도권",
    neighbors: ["seoul", "incheon", "gangwon", "chungbuk", "chungnam"],
    description: "서울을 둘러싸고 있으며, 대한민국에서 가장 인구가 많은 도입니다."
  },
  {
    id: "gangwon",
    name_kr: "강원특별자치도",
    name_en: "Gangwon-do",
    level: "sido",
    lat: 37.8228,
    lng: 128.1555,
    region_group: "강원권",
    neighbors: ["gyeonggi", "chungbuk", "gyeongbuk"],
    description: "아름다운 동해바다와 설악산, 평창올림픽의 무대인 고원지대를 품은 지역입니다."
  },
  {
    id: "chungbuk",
    name_kr: "충청북도",
    name_en: "Chungcheongbuk-do",
    level: "sido",
    lat: 36.6357,
    lng: 127.4913,
    region_group: "충청권",
    neighbors: ["gyeonggi", "gangwon", "chungnam", "daejeon", "jeonbuk", "gyeongbuk"],
    description: "대한민국에서 유일하게 바다와 접하지 않은 내륙의 중심지입니다."
  },
  {
    id: "chungnam",
    name_kr: "충청남도",
    name_en: "Chungcheongnam-do",
    level: "sido",
    lat: 36.5184,
    lng: 126.8000,
    region_group: "충청권",
    neighbors: ["gyeonggi", "chungbuk", "daejeon", "sejong", "jeonbuk"],
    description: "백제 문화의 유산이 숨 쉬는 공주, 부여와 아름다운 서해안을 안은 도입니다."
  },
  {
    id: "daejeon",
    name_kr: "대전광역시",
    name_en: "Daejeon",
    level: "sido",
    lat: 36.3504,
    lng: 127.3845,
    region_group: "충청권",
    neighbors: ["chungbuk", "chungnam", "sejong"],
    description: "대덕연구단지가 자리한 대한민국 과학 기술의 중추 도시입니다."
  },
  {
    id: "sejong",
    name_kr: "세종특별자치시",
    name_en: "Sejong",
    level: "sido",
    lat: 36.4800,
    lng: 127.2890,
    region_group: "충청권",
    neighbors: ["chungnam", "chungbuk", "daejeon"],
    description: "정부종합청사가 위치한 대한민국의 행정중심복합도시입니다."
  },
  {
    id: "jeonbuk",
    name_kr: "전북특별자치도",
    name_en: "Jeonbuk",
    level: "sido",
    lat: 35.7175,
    lng: 127.1441,
    region_group: "호남권",
    neighbors: ["chungnam", "chungbuk", "gyeongbuk", "gyeongnam", "jeonnam_gwangju"],
    description: "비빔밥으로 유명한 전주와 지평선이 넓게 펼쳐진 곡창지대가 어우러진 맛과 멋의 고장입니다."
  },
  {
    id: "jeonnam_gwangju",
    name_kr: "전남광주통합특별시",
    name_en: "Jeonnam-Gwangju",
    level: "sido",
    lat: 35.0000,
    lng: 126.7000,
    region_group: "호남권",
    neighbors: ["jeonbuk", "gyeongnam", "jeju"],
    description: "광주광역시와 전라남도가 하나로 융합된 빛고을 문화와 다도해 자연을 품은 메가시티입니다."
  },
  {
    id: "gyeongbuk",
    name_kr: "경상북도",
    name_en: "Gyeongsangbuk-do",
    level: "sido",
    lat: 36.5760,
    lng: 128.5056,
    region_group: "영남권",
    neighbors: ["gangwon", "chungbuk", "jeonbuk", "gyeongnam", "daegu", "ulsan"],
    description: "경주, 안동 등 한국 전통 유교와 불교 문화재가 가장 많이 보존된 고장입니다."
  },
  {
    id: "daegu",
    name_kr: "대구광역시",
    name_en: "Daegu",
    level: "sido",
    lat: 35.8714,
    lng: 128.6014,
    region_group: "영남권",
    neighbors: ["gyeongbuk", "gyeongnam"],
    description: "섬유산업과 뜨거운 분지 기후, 근대 역사 골목이 유명한 영남 내륙의 대도시입니다."
  },
  {
    id: "ulsan",
    name_kr: "울산광역시",
    name_en: "Ulsan",
    level: "sido",
    lat: 35.5389,
    lng: 129.3114,
    region_group: "영남권",
    neighbors: ["gyeongbuk", "busan", "gyeongnam"],
    description: "자동차, 중공업, 석유화학이 중심인 대한민국 최대의 공업도시입니다."
  },
  {
    id: "busan",
    name_kr: "부산광역시",
    name_en: "Busan",
    level: "sido",
    lat: 35.1796,
    lng: 129.0756,
    region_group: "영남권",
    neighbors: ["ulsan", "gyeongnam"],
    description: "해운대, 광안리 해수욕장과 세계적인 항만을 품은 대한민국의 제2도시입니다."
  },
  {
    id: "gyeongnam",
    name_kr: "경상남도",
    name_en: "Gyeongsangnam-do",
    level: "sido",
    lat: 35.4606,
    lng: 128.2132,
    region_group: "영남권",
    neighbors: ["jeonbuk", "jeonnam_gwangju", "gyeongbuk", "daegu", "ulsan", "busan"],
    description: "한려해상 국립공원과 가야 문화권, 진주와 창원을 중심으로 한 역동적인 지역입니다."
  },
  {
    id: "jeju",
    name_kr: "제주특별자치도",
    name_en: "Jeju Island",
    level: "sido",
    lat: 33.4996,
    lng: 126.5312,
    region_group: "제주권",
    neighbors: ["jeonnam_gwangju"],
    description: "한라산과 삼다(돌, 바람, 여자)로 잘 알려진 대한민국 최고의 환상적인 섬 관광지입니다."
  },

  // ==========================================
  // 2. SIGUNGU (전체 모드 - 모든 시군구 기초자치단체 229개)
  // ==========================================
  
  // -- 서울특별시 (25개 구) --
  { id: "seoul_jongno", name_kr: "종로구", name_en: "Jongno-gu", level: "sigungu", lat: 37.5730, lng: 126.9790, region_group: "수도권", neighbors: [], description: "경복궁, 광화문광장, 북촌한옥마을이 있는 서울의 역사적 중심지입니다." },
  { id: "seoul_jung", name_kr: "서울중구", name_en: "Jung-gu", level: "sigungu", lat: 37.5636, lng: 126.9975, region_group: "수도권", neighbors: [], description: "명동, 서울시청, 남산 서울타워가 위치한 서울의 중심부입니다." },
  { id: "seoul_yongsan", name_kr: "용산구", name_en: "Yongsan-gu", level: "sigungu", lat: 37.5323, lng: 126.9900, region_group: "수도권", neighbors: [], description: "국립중앙박물관, 이태원, 용산가족공원이 있는 문화 융합 지역입니다." },
  { id: "seoul_seongdong", name_kr: "성동구", name_en: "Seongdong-gu", level: "sigungu", lat: 37.5635, lng: 127.0371, region_group: "수도권", neighbors: [], description: "왕십리역, 서울숲, 성수동 카페거리가 핫플레이스로 꼽히는 활기찬 자치구입니다." },
  { id: "seoul_gwangjin", name_kr: "광진구", name_en: "Gwangjin-gu", level: "sigungu", lat: 37.5385, lng: 127.0822, region_group: "수도권", neighbors: [], description: "뚝섬유원지, 건국대학교, 어린이대공원이 어우러진 주거 및 문화의 중심입니다." },
  { id: "seoul_dongdaemun", name_kr: "동대문구", name_en: "Dongdaemun-gu", level: "sigungu", lat: 37.5744, lng: 127.0397, region_group: "수도권", neighbors: [], description: "청량리역, 경동시장, 동대문디자인플라자(DDP) 인근의 교통·상업 요지입니다." },
  { id: "seoul_jungnang", name_kr: "중랑구", name_en: "Jungnang-gu", level: "sigungu", lat: 37.6065, lng: 127.0926, region_group: "수도권", neighbors: [], description: "망우역사문화공원, 중랑천 장미축제가 대표적인 서정적인 고장입니다." },
  { id: "seoul_seongbuk", name_kr: "성북구", name_en: "Seongbuk-gu", level: "sigungu", lat: 37.5894, lng: 127.0167, region_group: "수도권", neighbors: [], description: "한양도성 혜화문, 길상사, 정릉이 있는 역사와 자연이 공존하는 교육도시입니다." },
  { id: "seoul_gangbuk", name_kr: "강북구", name_en: "Gangbuk-gu", level: "sigungu", lat: 37.6396, lng: 127.0255, region_group: "수도권", neighbors: [], description: "북한산 국립공원, 우이동 계곡, 솔밭공원이 수려한 맑은 자연도시입니다." },
  { id: "seoul_dobong", name_kr: "도봉구", name_en: "Dobong-gu", level: "sigungu", lat: 37.6688, lng: 127.0471, region_group: "수도권", neighbors: [], description: "웅장한 도봉산과 둘리뮤지엄이 가족 나들이객을 반기는 평화로운 도시입니다." },
  { id: "seoul_nowon", name_kr: "노원구", name_en: "Nowon-gu", level: "sigungu", lat: 37.6542, lng: 127.0565, region_group: "수도권", neighbors: [], description: "수락산, 불암산과 함께 교육열이 높은 명문 학군 중심의 교육도시입니다." },
  { id: "seoul_eunpyeong", name_kr: "은평구", name_en: "Eunpyeong-gu", level: "sigungu", lat: 37.6027, lng: 126.9291, region_group: "수도권", neighbors: [], description: "은평한옥마을, 진관사, 불광천 산책로가 아름답게 정비된 친환경 녹색 주거지입니다." },
  { id: "seoul_seodaemun", name_kr: "서대문구", name_en: "Seodaemun-gu", level: "sigungu", lat: 37.5791, lng: 126.9368, region_group: "수도권", neighbors: [], description: "신촌 대학가, 서대문형무소역사관, 안산 자락길이 있는 역사와 청춘의 현장입니다." },
  { id: "seoul_mapo", name_kr: "마포구", name_en: "Mapo-gu", level: "sigungu", lat: 37.5622, lng: 126.9083, region_group: "수도권", neighbors: [], description: "홍대거리, 월드컵공원, 공덕동 족발골목이 있는 대표적인 젊음의 거리입니다." },
  { id: "seoul_yangcheon", name_kr: "양천구", name_en: "Yangcheon-gu", level: "sigungu", lat: 37.5169, lng: 126.8665, region_group: "수도권", neighbors: [], description: "목동 신시가지, 안양천 산책로가 쾌적한 살기 좋은 명품 주거지입니다." },
  { id: "seoul_gangseo", name_kr: "강서구", name_en: "Gangseo-gu", level: "sigungu", lat: 37.5509, lng: 126.8496, region_group: "수도권", neighbors: [], description: "김포국제공항, 마곡 식물원, 허준박물관이 있는 서울 서남권 첨단 비즈니스 메카입니다." },
  { id: "seoul_guro", name_kr: "구로구", name_en: "Guro-gu", level: "sigungu", lat: 37.4954, lng: 126.8584, region_group: "수도권", neighbors: [], description: "디지털단지(G밸리), 푸른수목원이 자리한 IT 융합 첨단 산업지대입니다." },
  { id: "seoul_geumcheon", name_kr: "금천구", name_en: "Geumcheon-gu", level: "sigungu", lat: 37.4571, lng: 126.8957, region_group: "수도권", neighbors: [], description: "가산디지털단지, 벚꽃십리로, 안양천이 가로지르는 서울 산업 기술의 허브입니다." },
  { id: "seoul_yeongdeungpo", name_kr: "영등포구", name_en: "Yeongdeungpo-gu", level: "sigungu", lat: 37.5264, lng: 126.8962, region_group: "수도권", neighbors: [], description: "여의도 국회의사당, 여의도 한강공원, 타임스퀘어가 있는 복합 금융·정치 거점입니다." },
  { id: "seoul_dongjak", name_kr: "동작구", name_en: "Dongjak-gu", level: "sigungu", lat: 37.5124, lng: 126.9397, region_group: "수도권", neighbors: [], description: "노량진 수산시장, 노량진 컵밥거리, 국립서울현충원이 위치한 명소입니다." },
  { id: "seoul_gwanak", name_kr: "관악구", name_en: "Gwanak-gu", level: "sigungu", lat: 37.4784, lng: 126.9516, region_group: "수도권", neighbors: [], description: "서울대학교, 푸른 관악산, 낙성대가 있는 인재 중심 명품 자치구입니다." },
  { id: "seoul_seocho", name_kr: "서초구", name_en: "Seocho-gu", level: "sigungu", lat: 37.4837, lng: 127.0324, region_group: "수도권", neighbors: [], description: "예술의전당, 양재시민의숲, 서래마을 프랑스거리가 빛나는 세련된 문화도시입니다." },
  { id: "seoul_gangnam", name_kr: "강남구", name_en: "Gangnam-gu", level: "sigungu", lat: 37.5172, lng: 127.0473, region_group: "수도권", neighbors: [], description: "코엑스, 가로수길, 압구정 로데오거리가 위치한 트렌디한 서울의 랜드마크입니다." },
  { id: "seoul_songpa", name_kr: "송파구", name_en: "Songpa-gu", level: "sigungu", lat: 37.5145, lng: 127.1061, region_group: "수도권", neighbors: [], description: "롯데월드타워, 올림픽공원, 석촌호수가 수려한 도심 휴식 요람입니다." },
  { id: "seoul_gangdong", name_kr: "강동구", name_en: "Gangdong-gu", level: "sigungu", lat: 37.5302, lng: 127.1237, region_group: "수도권", neighbors: [], description: "암사동 선사유적지, 일자산 허브천문공원이 포근한 숲세권 건강주거지입니다." },

  // -- 인천광역시 (10개 구/군) --
  { id: "incheon_jung", name_kr: "인천중구", name_en: "Jung-gu", level: "sigungu", lat: 37.4732, lng: 126.6216, region_group: "수도권", neighbors: [], description: "차이나타운, 월미도, 영종도 인천국제공항을 거느린 해양 관문입니다." },
  { id: "incheon_dong", name_kr: "인천동구", name_en: "Dong-gu", level: "sigungu", lat: 37.4738, lng: 126.6432, region_group: "수도권", neighbors: [], description: "화도진공원, 괭이부리말 등 서해안 근대 물류 개항사의 숨결이 서린 전통도시입니다." },
  { id: "incheon_michuhol", name_kr: "인천미추홀구", name_en: "Michuhol-gu", level: "sigungu", lat: 37.4634, lng: 126.6502, region_group: "수도권", neighbors: [], description: "문학경기장, 수봉산공원이 자리 잡아 주거 교통 인프라가 뛰어난 명문 고을입니다." },
  { id: "incheon_yeonsu", name_kr: "인천연수구", name_en: "Yeonsu-gu", level: "sigungu", lat: 37.4098, lng: 126.6787, region_group: "수도권", neighbors: [], description: "송도국제도시, 연세대 국제캠퍼스, 센트럴파크가 조화로운 친환경 국제 비즈니스 허브입니다." },
  { id: "incheon_namdong", name_kr: "인천남동구", name_en: "Namdong-gu", level: "sigungu", lat: 37.4472, lng: 126.7315, region_group: "수도권", neighbors: [], description: "인천시청, 소래포구 어시장, 남동국가산업단지가 역동적으로 일하는 수도권 대도시입니다." },
  { id: "incheon_bupyeong", name_kr: "부평구", name_en: "Bupyeong-gu", level: "sigungu", lat: 37.5071, lng: 126.7219, region_group: "수도권", neighbors: [], description: "부평지하상가, 굴포천 친수공원, 십정동 열우물 벽화마을이 유명한 활기찬 교통지입니다." },
  { id: "incheon_gyeyang", name_kr: "인천계양구", name_en: "Gyeyang-gu", level: "sigungu", lat: 37.5372, lng: 126.7377, region_group: "수도권", neighbors: [], description: "웅장한 계양산, 아라뱃길이 가로지르는 수도권 북부의 힐링 요충지입니다." },
  { id: "incheon_seo", name_kr: "인천서구", name_en: "Seo-gu", level: "sigungu", lat: 37.5454, lng: 126.6757, region_group: "수도권", neighbors: [], description: "청라국제도시, 검단신도시, 국립생물자원관이 있어 미래 성장이 가장 빠른 역동 도시입니다." },
  { id: "incheon_ganghwa", name_kr: "인천강화군", name_en: "Ganghwa-gun", level: "sigungu", lat: 37.7464, lng: 126.4880, region_group: "수도권", neighbors: [], description: "강화 고인돌, 전등사, 마니산 참성단이 있는 살아있는 역사 박물관 고을입니다." },
  { id: "incheon_ongjin", name_kr: "인천옹진군", name_en: "Ongjin-gun", level: "sigungu", lat: 37.4466, lng: 126.6219, region_group: "수도권", neighbors: [], description: "대청도, 소청도, 연평도, 백령도 등 아름다운 서해5도의 도서들을 품고 있는 해양 안보 거점입니다." },

  // -- 경기도 (31개 시/군) --
  { id: "gyeonggi_suwon", name_kr: "수원시", name_en: "Suwon", level: "sigungu", lat: 37.2636, lng: 127.0286, region_group: "수도권", neighbors: [], description: "유네스코 세계문화유산인 '수원 화성'과 갈비로 유명한 경기 남부 중심지입니다." },
  { id: "gyeonggi_seongnam", name_kr: "성남시", name_en: "Seongnam", level: "sigungu", lat: 37.4200, lng: 127.1265, region_group: "수도권", neighbors: [], description: "판교테크노밸리를 품어 한국의 실리콘밸리로 불리는 첨단 IT 신도시입니다." },
  { id: "gyeonggi_uijeongbu", name_kr: "의정부시", name_en: "Uijeongbu", level: "sigungu", lat: 37.7381, lng: 127.0337, region_group: "수도권", neighbors: [], description: "부대찌개와 군사 안보 거점에서 경기 북부 행정 중심으로 거듭난 중심지입니다." },
  { id: "gyeonggi_anyang", name_kr: "안양시", name_en: "Anyang", level: "sigungu", lat: 37.3943, lng: 126.9568, region_group: "수도권", neighbors: [], description: "안양예술공원, 평촌신도시, 수리산 자락이 조화로운 경기 남부 주거 도시입니다." },
  { id: "gyeonggi_bucheon", name_kr: "부천시", name_en: "Bucheon", level: "sigungu", lat: 37.5034, lng: 126.7660, region_group: "수도권", neighbors: [], description: "부천국제판타스틱영화제(BIFAN)와 만화의 도시로 불리는 유네스코 문학 창의 도시입니다." },
  { id: "gyeonggi_gwangmyeong", name_kr: "광명시", name_en: "Gwangmyeong", level: "sigungu", lat: 37.4785, lng: 126.8647, region_group: "수도권", neighbors: [], description: "폐광산에서 세계적인 테마파크로 변신한 광명동굴과 KTX 광명역 역세권 거점입니다." },
  { id: "gyeonggi_pyeongtaek", name_kr: "평택시", name_en: "Pyeongtaek", level: "sigungu", lat: 36.9921, lng: 127.1129, region_group: "수도권", neighbors: [], description: "세계 최대 규모 반도체 라인, 대외 교역 핵심인 평택항이 있는 국가 물류 전초지입니다." },
  { id: "gyeonggi_dongducheon", name_kr: "동두천시", name_en: "Dongducheon", level: "sigungu", lat: 37.9036, lng: 127.0573, region_group: "수도권", neighbors: [], description: "웅장한 소요산 단풍과 이국적인 보산동 문화거리가 있는 미군 주둔 역사 고장입니다." },
  { id: "gyeonggi_ansan", name_kr: "안산시", name_en: "Ansan", level: "sigungu", lat: 37.3219, lng: 126.8308, region_group: "수도권", neighbors: [], description: "대부도 구봉도 낙조, 다문화거리, 시화호 조력발전소가 시원한 친환경 생태산업도시입니다." },
  { id: "gyeonggi_goyang", name_kr: "고양시", name_en: "Goyang", level: "sigungu", lat: 37.6584, lng: 126.8320, region_group: "수도권", neighbors: [], description: "일산호수공원과 킨텍스가 자리 잡은 아름다운 꽃과 문화의 일류 신도시입니다." },
  { id: "gyeonggi_gwacheon", name_kr: "과천시", name_en: "Gwacheon", level: "sigungu", lat: 37.4264, lng: 126.9897, region_group: "수도권", neighbors: [], description: "서울대공원, 과천과학관, 국립현대미술관이 우뚝 서서 가족 친화적인 문화 행정도시입니다." },
  { id: "gyeonggi_guri", name_kr: "구리시", name_en: "Guri", level: "sigungu", lat: 37.5943, lng: 127.1296, region_group: "수도권", neighbors: [], description: "조선 왕릉 동구릉, 시원한 구리한강시민공원이 있어 삶의 만족도가 높은 웰빙도시입니다." },
  { id: "gyeonggi_namyangju", name_kr: "남양주시", name_en: "Namyangju", level: "sigungu", lat: 37.6360, lng: 127.2165, region_group: "수도권", neighbors: [], description: "다산 유적지, 천마산, 수려한 북한강 물줄기를 품은 친환경 에코 스마트 명품도시입니다." },
  { id: "gyeonggi_osan", name_kr: "오산시", name_en: "Osan", level: "sigungu", lat: 37.1498, lng: 127.0775, region_group: "수도권", neighbors: [], description: "독산성과 세마대지, 시원한 물향기수목원이 위치해 젊고 교육 활력이 가득한 도시입니다." },
  { id: "gyeonggi_siheung", name_kr: "시흥시", name_en: "Siheung", level: "sigungu", lat: 37.3801, lng: 126.8029, region_group: "수도권", neighbors: [], description: "갯골생태공원, 오이도 빨강등대, 거북섬 인공 서핑장이 이색적인 서해안 해양레저 중심지입니다." },
  { id: "gyeonggi_gunpo", name_kr: "군포시", name_en: "Gunpo", level: "sigungu", lat: 37.3617, lng: 126.9352, region_group: "수도권", neighbors: [], description: "수리산 철쭉 동산 축제와 함께 책 읽는 도시 브랜드로 널리 알려진 살기 좋은 도시입니다." },
  { id: "gyeonggi_uiwang", name_kr: "의왕시", name_en: "Uiwang", level: "sigungu", lat: 37.3447, lng: 126.9682, region_group: "수도권", neighbors: [], description: "왕송호수 레일바이크, 백운호수 백운밸리, 자연과 철도 테마파크가 빛나는 철도 허브도시입니다." },
  { id: "gyeonggi_hanam", name_kr: "하남시", name_en: "Hanam", level: "sigungu", lat: 37.5392, lng: 127.2148, region_group: "수도권", neighbors: [], description: "조정경기장, 스타필드 하남, 수려한 검단산이 어우러져 쇼핑과 주거 가치가 드높은 도시입니다." },
  { id: "gyeonggi_yongin", name_kr: "용인시", name_en: "Yongin", level: "sigungu", lat: 37.2410, lng: 127.1774, region_group: "수도권", neighbors: [], description: "에버랜드, 한국민속촌, 그리고 미래 반도체 국가첨단산업단지가 성장하는 거대 도시입니다." },
  { id: "gyeonggi_paju", name_kr: "파주시", name_en: "Paju", level: "sigungu", lat: 37.7600, lng: 126.7798, region_group: "수도권", neighbors: [], description: "임진각 평화누리, 파주출판도시, 헤이리 예술마을이 빛나는 문화와 한반도 평화 요람입니다." },
  { id: "gyeonggi_icheon", name_kr: "이천시", name_en: "Icheon", level: "sigungu", lat: 37.2721, lng: 127.4350, region_group: "수도권", neighbors: [], description: "세계적인 이천 쌀밥, 도자기 축제, SK하이닉스 반도체가 한데 어우러진 맛과 기술의 도시입니다." },
  { id: "gyeonggi_anseong", name_kr: "안성시", name_en: "Anseong", level: "sigungu", lat: 37.0078, lng: 127.2797, region_group: "수도권", neighbors: [], description: "바우덕이 안성남사당 놀이, 안성맞춤 유기, 고소한 배가 명품 특산품인 풍요로운 도읍입니다." },
  { id: "gyeonggi_gimpo", name_kr: "김포시", name_en: "Gimpo", level: "sigungu", lat: 37.6152, lng: 126.7151, region_group: "수도권", neighbors: [], description: "아름다운 라베니체 수변도시, 아라김포여객터미널, 한강 신도시 교통망이 확대되는 도시입니다." },
  { id: "gyeonggi_hwaseong", name_kr: "화성시", name_en: "Hwaseong", level: "sigungu", lat: 37.1994, lng: 126.8312, region_group: "수도권", neighbors: [], description: "제부도 바닷길, 융건릉, 현대차 연구소 등이 공존하여 대한민국 재정 자립 최상위의 대도시입니다." },
  { id: "gyeonggi_gwangju", name_kr: "광주시", name_en: "Gwangju-si", level: "sigungu", lat: 37.4294, lng: 127.2551, region_group: "수도권", neighbors: [], description: "유네스코 세계유산 남한산성, 천진암 성지, 도자박물관이 정갈한 경기도의 전통 요람입니다." },
  { id: "gyeonggi_yangju", name_kr: "양주시", name_en: "Yangju", level: "sigungu", lat: 37.7853, lng: 127.0457, region_group: "수도권", neighbors: [], description: "장흥관광지, 회암사지, 송추계곡이 빼어나 북부 권역의 역사 관광 가치를 창달하는 고을입니다." },
  { id: "gyeonggi_pocheon", name_kr: "포천시", name_en: "Pocheon", level: "sigungu", lat: 37.8949, lng: 127.2003, region_group: "수도권", neighbors: [], description: "포천아트밸리 에메랄드 호수, 명성산 억새, 산정호수와 이동갈비가 환상적인 국민 휴식처입니다." },
  { id: "gyeonggi_yeoju", name_kr: "여주시", name_en: "Yeoju", level: "sigungu", lat: 37.2983, lng: 127.6371, region_group: "수도권", neighbors: [], description: "조선 세종대왕 영릉, 신륵사, 남한강변 자전거 길과 프리미엄 아울렛이 성황인 도시입니다." },
  { id: "gyeonggi_yeoncheon", name_kr: "연천군", name_en: "Yeoncheon-gun", level: "sigungu", lat: 38.0964, lng: 127.0754, region_group: "수도권", neighbors: [], description: "한탄강 주상절리 지질공원, 구석기 축제, 태풍전망대 등 지질 안보 유산이 풍부한 군입니다." },
  { id: "gyeonggi_gapyeong", name_kr: "가평군", name_en: "Gapyeong", level: "sigungu", lat: 37.8314, lng: 127.5095, region_group: "수도권", neighbors: [], description: "자라섬 재즈페스티벌, 아침고요수목원, 청평호반 레저가 흥겨운 국민 청정 여가 고을입니다." },
  { id: "gyeonggi_yangpyeong", name_kr: "양평군", name_en: "Yangpyeong-gun", level: "sigungu", lat: 37.4913, lng: 127.4875, region_group: "수도권", neighbors: [], description: "남한강 북한강이 만나는 '두물머리', 용문사 은행나무가 고즈넉한 에코 힐링 특화 고장입니다." },

  // -- 강원특별자치도 (18개 시/군) --
  { id: "gangwon_chuncheon", name_kr: "춘천시", name_en: "Chuncheon", level: "sigungu", lat: 37.8813, lng: 127.7298, region_group: "강원권", neighbors: [], description: "소양강 처녀 동상과 닭갈비, 춘천마임축제, 레고랜드가 흥겨운 낭만의 호반도시입니다." },
  { id: "gangwon_wonju", name_kr: "원주시", name_en: "Wonju", level: "sigungu", lat: 37.3422, lng: 127.9201, region_group: "강원권", neighbors: [], description: "치악산 국립공원, 한지테마파크, 뮤지엄 산(SAN)이 수려한 강원권 최대의 산업 의료도시입니다." },
  { id: "gangwon_gangneung", name_kr: "강릉시", name_en: "Gangneung", level: "sigungu", lat: 37.7519, lng: 128.8761, region_group: "강원권", neighbors: [], description: "오죽헌, 경포대 해수욕장, 초당 순두부, 안목해변 커피거리가 향긋한 관동제일향입니다." },
  { id: "gangwon_donghae", name_kr: "동해시", name_en: "Donghae", level: "sigungu", lat: 37.5247, lng: 129.1143, region_group: "강원권", neighbors: [], description: "촛대바위의 추암해변, 시원한 무릉계곡 쌍폭포, 묵호항 망상해수욕장이 활기찬 무역항구입니다." },
  { id: "gangwon_taebaek", name_kr: "태백시", name_en: "Taebaek", level: "sigungu", lat: 37.1641, lng: 128.9856, region_group: "강원권", neighbors: [], description: "해발고도가 가장 높은 고원 도시로 한강 낙동강의 발원지와 시원한 태백산이 수려합니다." },
  { id: "gangwon_sokcho", name_kr: "속초시", name_en: "Sokcho", level: "sigungu", lat: 38.2070, lng: 128.5918, region_group: "강원권", neighbors: [], description: "설악산 흔들바위 울산바위, 속초관광수산시장 닭강정, 아바이마을이 정겨운 관광포트입니다." },
  { id: "gangwon_samcheok", name_kr: "삼척시", name_en: "Samcheok", level: "sigungu", lat: 37.4499, lng: 129.1648, region_group: "강원권", neighbors: [], description: "대이리 동굴지대 환선굴, 삼척해양레일바이크, 장호항 갈남항 한국의 나폴리 어촌입니다." },
  { id: "gangwon_hongcheon", name_kr: "홍천군", name_en: "Hongcheon-gun", level: "sigungu", lat: 37.6975, lng: 127.8887, region_group: "강원권", neighbors: [], description: "대한민국 군 중에서 면적이 가장 넓으며, 팔봉산, 홍천 화로구이와 무궁화공원이 빛납니다." },
  { id: "gangwon_hoengseong", name_kr: "횡성군", name_en: "Hoengseong-gun", level: "sigungu", lat: 37.4912, lng: 127.9845, region_group: "강원권", neighbors: [], description: "전국 최상급 한우의 고향이자, 횡성호수길과 안흥찐빵 마을의 인심이 가득한 살기좋은 고장입니다." },
  { id: "gangwon_yeongwol", name_kr: "영월군", name_en: "Yeongwol-gun", level: "sigungu", lat: 37.1838, lng: 128.4619, region_group: "강원권", neighbors: [], description: "단종 장릉, 동강 래프팅, 선암마을 한반도지형과 청령포 삼면 바위가 수려한 유적지입니다." },
  { id: "gangwon_pyeongchang", name_kr: "평창군", name_en: "Pyeongchang-gun", level: "sigungu", lat: 37.3705, lng: 128.3902, region_group: "강원권", neighbors: [], description: "평창 동계올림픽의 감동, 메밀꽃 필 무렵 효석문화제, 대관령 양떼목장의 이국적 구릉입니다." },
  { id: "gangwon_jeongson", name_kr: "정선군", name_en: "Jeongseon-gun", level: "sigungu", lat: 37.3804, lng: 128.6608, region_group: "강원권", neighbors: [], description: "정선아리랑 전수지, 민둥산 억새꽃, 화암동굴, 가리왕산 케이블카가 우뚝 선 산촌명가입니다." },
  { id: "gangwon_cheorwon", name_kr: "철원군", name_en: "Cheorwon-gun", level: "sigungu", lat: 38.1464, lng: 127.3134, region_group: "강원권", neighbors: [], description: "고석정 정자 절경, 한탄강 은하수교, 철원 오대쌀, 삼부연폭포 물줄기가 웅장한 호국 안보 거점입니다." },
  { id: "gangwon_hwacheon", name_kr: "화천군", name_en: "Hwacheon-gun", level: "sigungu", lat: 38.1062, lng: 127.7019, region_group: "강원권", neighbors: [], description: "전 세계가 주목하는 화천 산천어 축제, 평화의 댐, 파로호 맑은 비경의 청정 생태군입니다." },
  { id: "gangwon_yanggu", name_kr: "양구군", name_en: "Yanggu-gun", level: "sigungu", lat: 38.1089, lng: 127.9897, region_group: "강원권", neighbors: [], description: "국토의 정중앙 좌표 지점, 펀치볼 분지 전경, 두타연 청정 계곡길이 수려한 명당입니다." },
  { id: "gangwon_inje", name_kr: "인제군", name_en: "Inje-gun", level: "sigungu", lat: 38.0697, lng: 128.1703, region_group: "강원권", neighbors: [], description: "원대리 자작나무 숲, 내린천 래프팅, 백담사, 황태마을 덕장이 빛나는 백두대간의 품입니다." },
  { id: "gangwon_goseong", name_kr: "강원고성군", name_en: "Goseong-gun", level: "sigungu", lat: 38.3804, lng: 128.4682, region_group: "강원권", neighbors: [], description: "통일전망대, 화진포 호수 해변, 고즈넉한 왕곡마을과 서핑 즐기는 천학정이 장관입니다." },
  { id: "gangwon_yangyang", name_kr: "양양군", name_en: "Yangyang-gun", level: "sigungu", lat: 38.0754, lng: 128.6189, region_group: "강원권", neighbors: [], description: "낙산사 홍련암, 오색약수터, 양양 서피비치 서핑 성지가 수놓아진 핫한 하조대 연안입니다." },

  // -- 충청북도 (11개 시/군) --
  { id: "chungbuk_cheongju", name_kr: "청주시", name_en: "Cheongju", level: "sigungu", lat: 36.6424, lng: 127.4890, region_group: "충청권", neighbors: [], description: "세계 최고 금속활자본 직지의 고향, 상당산성, 오송바이오밸리가 찬란한 충북 도청 소재지입니다." },
  { id: "chungbuk_chungju", name_kr: "충주시", name_en: "Chungju", level: "sigungu", lat: 36.9911, lng: 127.9259, region_group: "충청권", neighbors: [], description: "중앙탑 사적공원, 탄금대 역사, 충주호 악어섬과 달콤한 충주 사과가 가득한 수변도시입니다." },
  { id: "chungbuk_jecheon", name_kr: "제천시", name_en: "Jecheon", level: "sigungu", lat: 37.1326, lng: 128.2141, region_group: "충청권", neighbors: [], description: "삼한시대 수리시설 의림지, 청풍호반 케이블카, 제천 한방 바이오 엑스포의 약초 도시입니다." },
  { id: "chungbuk_boeun", name_kr: "보은군", name_en: "Boeun-gun", level: "sigungu", lat: 36.4894, lng: 127.7341, region_group: "충청권", neighbors: [], description: "정이품송 소나무, 유서 깊은 법주사 속리산, 명품 보은 대추가 은은한 산골명가입니다." },
  { id: "chungbuk_okcheon", name_kr: "옥천군", name_en: "Okcheon-gun", level: "sigungu", lat: 36.3064, lng: 127.5714, region_group: "충청권", neighbors: [], description: "정지용 시인 생가 향수 옥천, 둔주봉 한반도지형과 대청호 수변길이 포근합니다." },
  { id: "chungbuk_yeongdong", name_kr: "영동군", name_en: "Yeongdong-gun", level: "sigungu", lat: 36.1748, lng: 127.7831, region_group: "충청권", neighbors: [], description: "난계 박연의 국악 본향, 달콤한 영동 와인 터널, 영동 곶감이 풍족한 과일의 나라입니다." },
  { id: "chungbuk_jeungpyeong", name_kr: "증평군", name_en: "Jeungpyeong-gun", level: "sigungu", lat: 36.7845, lng: 127.5841, region_group: "충청권", neighbors: [], description: "블랙스톤 벨포레, 좌구산 휴양림 구름다리, 보강천 미루나무숲이 아기자기한 강소군입니다." },
  { id: "chungbuk_jincheon", name_kr: "진천군", name_en: "Jincheon-gun", level: "sigungu", lat: 36.8564, lng: 127.4431, region_group: "충청권", neighbors: [], description: "농다리 돌다리, 명품 진천 생거쌀, 국가대표 선수촌이 있는 생거진천의 풍요로운 땅입니다." },
  { id: "chungbuk_goesan", name_kr: "괴산군", name_en: "Goesan-gun", level: "sigungu", lat: 36.8111, lng: 127.7941, region_group: "충청권", neighbors: [], description: "화양구곡 절경, 산막이옛길 산책로, 괴산 대학찰옥수수와 유기농 고추가 가득한 청정촌입니다." },
  { id: "chungbuk_eumseong", name_kr: "음성군", name_en: "Eumseong-gun", level: "sigungu", lat: 36.9397, lng: 127.6905, region_group: "충청권", neighbors: [], description: "반기문 평화기념관, 설성공원, 음성 다올찬 수박과 명품 고추가 유명한 교통 거점입니다." },
  { id: "chungbuk_danyang", name_kr: "단양군", name_en: "Danyang-gun", level: "sigungu", lat: 36.9845, lng: 128.3641, region_group: "충청권", neighbors: [], description: "도담삼봉을 비롯한 단양팔경, 만천하스카이워크, 마늘 떡갈비가 군침 도는 명품 힐링지입니다." },

  // -- 충청남도 (15개 시/군) --
  { id: "chungnam_cheonan", name_kr: "천안시", name_en: "Cheonan", level: "sigungu", lat: 36.8151, lng: 127.1139, region_group: "충청권", neighbors: [], description: "독립기념관 호국 혼, 병천 아우내장터 순대, 고소한 호두과자가 향기로운 충남 북부 최대 관문입니다." },
  { id: "chungnam_gongju", name_kr: "공주시", name_en: "Gongju", level: "sigungu", lat: 36.4465, lng: 127.1190, region_group: "충청권", neighbors: [], description: "백제 무령왕릉 송산리고분군, 공산성 성곽길, 알밤 막걸리가 구수한 세계유산 역사도시입니다." },
  { id: "chungnam_boryeong", name_kr: "보령시", name_en: "Boryeong", level: "sigungu", lat: 36.3333, lng: 126.6129, region_group: "충청권", neighbors: [], description: "대천해수욕장 보령 머드 축제, 무창포 신비의 바닷길, 보령 석탄박물관이 재미난 관광지입니다." },
  { id: "chungnam_asan", name_kr: "아산시", name_en: "Asan", level: "sigungu", lat: 36.7898, lng: 127.0039, region_group: "충청권", neighbors: [], description: "현충사 이순신 영정, 온양온천, 지중해마을, 현충사 은행나무길이 정갈한 첨단 스마트 도시입니다." },
  { id: "chungnam_seosan", name_kr: "서산시", name_en: "Seosan", level: "sigungu", lat: 36.7845, lng: 126.4503, region_group: "충청권", neighbors: [], description: "서산해미읍성 성곽, 서산마애삼존불상, 간월암 낙조, 한우목장 언덕이 시원한 서해안 명당입니다." },
  { id: "chungnam_nonsan", name_kr: "논산시", name_en: "Nonsan", level: "sigungu", lat: 36.1872, lng: 127.0987, region_group: "충청권", neighbors: [], description: "육군훈련소, 탑정호 출렁다리, 관촉사 은진미륵 불상, 명품 논산 딸기가 향긋한 충절의 고장입니다." },
  { id: "chungnam_gyeryong", name_kr: "계룡시", name_en: "Gyeryong", level: "sigungu", lat: 36.2745, lng: 127.2487, region_group: "충청권", neighbors: [], description: "국방 중추 삼군본부 육해공 계룡대, 향적산 치유의 숲이 청정한 안보 복지 강소도시입니다." },
  { id: "chungnam_dangjin", name_kr: "당진시", name_en: "Dangjin", level: "sigungu", lat: 36.8987, lng: 126.6289, region_group: "충청권", neighbors: [], description: "서해대교 관문, 기지시줄다리기 박물관, 왜목마을 일출일몰, 삽교호 함상공원이 풍족한 철강도시입니다." },
  { id: "chungnam_geumsan", name_kr: "금산군", name_en: "Geumsan-gun", level: "sigungu", lat: 36.1087, lng: 127.4887, region_group: "충청권", neighbors: [], description: "세계 인삼 유통의 본고장 금산인삼관, 칠백의총 호국사적, 아름다운 적벽강이 유유히 흐릅니다." },
  { id: "chungnam_buyeo", name_kr: "부여군", name_en: "Buyeo-gun", level: "sigungu", lat: 36.2745, lng: 126.9087, region_group: "충청권", neighbors: [], description: "백제 사비성 낙화암, 부소산성, 정림사지 오층석탑, 백제문화단지가 영롱한 백제 왕도의 고향입니다." },
  { id: "chungnam_seocheon", name_kr: "서천군", name_en: "Seocheon-gun", level: "sigungu", lat: 36.0805, lng: 126.6912, region_group: "충청권", neighbors: [], description: "신성리 갈대밭, 국립생태원 세계기후관, 소곡주 술도가, 춘장대해수욕장 솔숲이 시원한 갯마을입니다." },
  { id: "chungnam_cheongyang", name_kr: "청양군", name_en: "Cheongyang-gun", level: "sigungu", lat: 36.4532, lng: 126.8012, region_group: "충청권", neighbors: [], description: "칠갑산 도립공원 하늘장가, 천장호 출렁다리, 청양 고추와 구기자가 은은한 푸른 산맥의 요람입니다." },
  { id: "chungnam_hongseong", name_kr: "홍성군", name_en: "Hongseong-gun", level: "sigungu", lat: 36.6012, lng: 126.6612, region_group: "충청권", neighbors: [], description: "홍주읍성 역사 유적, 용봉산 바위, 남당항 대하 축제, 충남도청 내포신도시가 입주한 허브입니다." },
  { id: "chungnam_yesan", name_kr: "예산군", name_en: "Yesan-gun", level: "sigungu", lat: 36.6812, lng: 126.8412, region_group: "충청권", neighbors: [], description: "수덕사 대웅전 고찰, 예당호 출렁다리 수변 음악분수, 예산 사과와 백종원 예산시장이 성황입니다." },
  { id: "chungnam_taean", name_kr: "태안군", name_en: "Taean-gun", level: "sigungu", lat: 36.7454, lng: 126.2987, region_group: "충청권", neighbors: [], description: "꽃지해수욕장 할미할아비바위 낙조, 천리포수목원 나무들, 안면도 꽃지 꽃길이 수놓아진 해안 요람입니다." },

  // -- 대전광역시 (5개 구) --
  { id: "daejeon_dong", name_kr: "대전동구", name_en: "Dong-gu", level: "sigungu", lat: 36.3314, lng: 127.4542, region_group: "충청권", neighbors: [], description: "대전역, 대청호반 수변공원, 식장산 숲속 전망대 야경이 아름다운 동부 관문입니다." },
  { id: "daejeon_jung", name_kr: "대전중구", name_en: "Jung-gu", level: "sigungu", lat: 36.3114, lng: 127.4142, region_group: "충청권", neighbors: [], description: "으능정이 문화의거리 스카이로드, 뿌리공원 성씨조각상, 칼국수가 별미인 도심지입니다." },
  { id: "daejeon_seo", name_kr: "대전서구", name_en: "Seo-gu", level: "sigungu", lat: 36.3014, lng: 127.3642, region_group: "충청권", neighbors: [], description: "대전정부청사, 시청, 둔산동 행정 금융 빌딩숲, 장태산 메타세쿼이아 자연휴양림이 수려합니다." },
  { id: "daejeon_yuseong", name_kr: "대전유성구", name_en: "Yuseong-gu", level: "sigungu", lat: 36.3714, lng: 127.3442, region_group: "충청권", neighbors: [], description: "대덕연구단지 카이스트, 유성온천 노천탕, 엑스포 과학공원 한빛탑이 빛나는 과학 온천도시입니다." },
  { id: "daejeon_daedeok", name_kr: "대전대덕구", name_en: "Daedeok-gu", level: "sigungu", lat: 36.3814, lng: 127.4242, region_group: "충청권", neighbors: [], description: "대청댐 물길, 신탄진 벚꽃길, 계족산 황톳길 맨발 걷기 산책로가 수려한 친환경 녹색구입니다." },

  // -- 세종특별자치시 (1개) --
  { id: "sejong_city", name_kr: "세종시", name_en: "Sejong", level: "sigungu", lat: 36.4800, lng: 127.2890, region_group: "충청권", neighbors: [], description: "정부종합청사 옥상정원, 금강 보행교 이응다리, 국립세종수목원이 빼어난 행정중심도시입니다." },

  // -- 전북특별자치도 (14개 시/군) --
  { id: "jeonbuk_jeonju", name_kr: "전주시", name_en: "Jeonju", level: "sigungu", lat: 35.8242, lng: 127.1480, region_group: "호남권", neighbors: [], description: "풍남문 한옥마을 기와선, 전주 비빔밥, 콩나물국밥도가 따사로운 전북도청 소재지입니다." },
  { id: "jeonbuk_gunsan", name_kr: "군산시", name_en: "Gunsan", level: "sigungu", lat: 35.9676, lng: 126.7366, region_group: "호남권", neighbors: [], description: "초원사진관 8월의크리스마스, 경암동 철길마을, 근대 역사박물관과 선유도 고군산군도가 영롱합니다." },
  { id: "jeonbuk_iksan", name_kr: "익산시", name_en: "Iksan", level: "sigungu", lat: 35.9483, lng: 126.9576, region_group: "호남권", neighbors: [], description: "미륵사지 석탑 사리장엄구, 왕궁리 오층석탑, 백제 역사유적지구와 보석박물관이 영롱한 교통지입니다." },
  { id: "jeonbuk_jeongeup", name_kr: "정읍시", name_en: "Jeongeup", level: "sigungu", lat: 35.5698, lng: 126.8587, region_group: "호남권", neighbors: [], description: "내장산 국립공원 오색단풍길, 옥정호 구절초 공원, 피향정 연꽃이 가을마다 물드는 아름다운 고을입니다." },
  { id: "jeonbuk_namwon", name_kr: "남원시", name_en: "Namwon", level: "sigungu", lat: 35.4164, lng: 127.3904, region_group: "호남권", neighbors: [], description: "춘향 성춘향 이도령 광한루원, 지리산 바래봉 철쭉, 뱀사골 계곡과 남원 추어탕이 구수합니다." },
  { id: "jeonbuk_gimje", name_kr: "김제시", name_en: "Gimje", level: "sigungu", lat: 35.8037, lng: 126.8808, region_group: "호남권", neighbors: [], description: "지평선 축제 벽골제 저수지 사적, 금산사 템플스테이, 하늘과 땅이 만나는 호남 평가의 심장입니다." },
  { id: "jeonbuk_wanju", name_kr: "완주군", name_en: "Wanju-gun", level: "sigungu", lat: 35.9045, lng: 127.1687, region_group: "호남권", neighbors: [], description: "대아수목원 푸른 산림, 삼례문화예술촌 갤러리, 고산 자연휴양림이 평화로운 에코 관광군입니다." },
  { id: "jeonbuk_jinan", name_kr: "진안군", name_en: "Jinan-gun", level: "sigungu", lat: 35.7915, lng: 127.4253, region_group: "호남권", neighbors: [], description: "말 귀 모양 신비로운 마이산 탑사, 운일암반일암 계곡, 달콤하고 매콤한 진안 홍삼의 청정 산촌입니다." },
  { id: "jeonbuk_muju", name_kr: "무주군", name_en: "Muju-gun", level: "sigungu", lat: 36.0064, lng: 127.6607, region_group: "호남권", neighbors: [], description: "덕유산 국립공원 설꽃, 덕유산 리조트 스키장, 무주 반딧불 축제가 수려한 사계절 에코 관광군입니다." },
  { id: "jeonbuk_jangsu", name_kr: "장수군", name_en: "Jangsu-gun", level: "sigungu", lat: 35.6473, lng: 127.5215, region_group: "호남권", neighbors: [], description: "논개 사당 사적, 논개 생가, 장수 한우와 고랭지 사과가 달콤하고 고소한 해발고원 고장입니다." },
  { id: "jeonbuk_imsil", name_kr: "임실군", name_en: "Imsil-gun", level: "sigungu", lat: 35.6177, lng: 127.2798, region_group: "호남권", neighbors: [], description: "지정환 신부 임실치즈테마파크, 사선대 정원, 옥정호 붕어섬 출렁다리 전경이 포근한 목장지입니다." },
  { id: "jeonbuk_sunchang", name_kr: "순창군", name_en: "Sunchang-gun", level: "sigungu", lat: 35.3743, lng: 127.1378, region_group: "호남권", neighbors: [], description: "고추장 민속마을 장아찌 전통, 강천산 군립공원 현수교 구름다리, 채계산 출렁다리가 웅장합니다." },
  { id: "jeonbuk_gochang", name_kr: "고창군", name_en: "Gochang-gun", level: "sigungu", lat: 35.4357, lng: 126.7021, region_group: "호남권", neighbors: [], description: "고창읍성 밟기사적, 유네스코 고인돌공원, 선운사 동백꽃, 고소한 고창 풍천장어와 복분자가 으뜸입니다." },
  { id: "jeonbuk_buan", name_kr: "부안군", name_en: "Buan-gun", level: "sigungu", lat: 35.7317, lng: 126.7317, region_group: "호남권", neighbors: [], description: "채석강 바위 주상절리, 곰소항 젓갈 도가, 변산반도 국립공원 해넘이, 내소사 전나무길이 환상적입니다." },

  // -- 전라남도 (22개 시/군) --
  { id: "jeonnam_mokpo", name_kr: "목포시", name_en: "Mokpo", level: "sigungu", lat: 34.8118, lng: 126.3922, region_group: "호남권", neighbors: [], description: "목포 해상케이블카, 유달산 암봉, 목포항 홍어 별미, 연희네슈퍼 1987 영화 고장입니다." },
  { id: "jeonnam_yeosu", name_kr: "여수시", name_en: "Yeosu", level: "sigungu", lat: 34.7604, lng: 127.6622, region_group: "호남권", neighbors: [], description: "버스커 여수 밤바다 낭만포차, 오동도 동백숲, 향일암 일출, 아쿠아플라넷 여수엑스포 공원입니다." },
  { id: "jeonnam_suncheon", name_kr: "순천시", name_en: "Suncheon", level: "sigungu", lat: 34.9506, lng: 127.4874, region_group: "호남권", neighbors: [], description: "순천만 국가정원 꽃단지, 갈대밭 갯벌, 낙안읍성 초가마을 전통, 송광사 대찰이 영롱합니다." },
  { id: "jeonnam_naju", name_kr: "나주시", name_en: "Naju", level: "sigungu", lat: 35.0158, lng: 126.7108, region_group: "호남권", neighbors: [], description: "나주곰탕 별미, 영산강 유채꽃 황포돛배, 나주평야에서 수확한 달콤하고 과즙 넘치는 나주배의 고장입니다." },
  { id: "jeonnam_gwangyang", name_kr: "광양시", name_en: "Gwangyang", level: "sigungu", lat: 34.9407, lng: 127.6958, region_group: "호남권", neighbors: [], description: "광양제철소 공장, 다압면 매화마을 축제, 배알도 수변공원, 광양 불고기 향이 은은한 공업항입니다." },
  { id: "jeonnam_damyang", name_kr: "담양군", name_en: "Damyang-gun", level: "sigungu", lat: 35.3184, lng: 126.9882, region_group: "호남권", neighbors: [], description: "죽녹원 푸른 대나무숲, 관방제림 솔밭, 메타세쿼이아 가로수길, 담양 떡갈비와 국수가 향긋합니다." },
  { id: "jeonnam_gokseong", name_kr: "곡성군", name_en: "Gokseong-gun", level: "sigungu", lat: 35.2816, lng: 127.2917, region_group: "호남권", neighbors: [], description: "섬진강 기차마을 장미정원, 증기기관차 체험 레일바이크, 가을 안개 자욱한 영화 곡성의 산마을입니다." },
  { id: "jeonnam_gurye", name_kr: "구례군", name_en: "Gurye-gun", level: "sigungu", lat: 35.2023, lng: 127.4703, region_group: "호남권", neighbors: [], description: "산수유마을 노란 꽃물, 지리산 노고단, 섬진강 벚꽃길, 화엄사 대웅전이 아늑한 자연촌입니다." },
  { id: "jeonnam_goheung", name_kr: "고흥군", name_en: "Goheung-gun", level: "sigungu", lat: 34.6111, lng: 127.2842, region_group: "호남권", neighbors: [], description: "나로우주센터 우주과학관 누리호, 팔영산 암봉, 고흥 유자와 석류가 향긋한 따사로운 해반도입니다." },
  { id: "jeonnam_boseong", name_kr: "보성군", name_en: "Boseong-gun", level: "sigungu", lat: 34.7712, lng: 127.0801, region_group: "호남권", neighbors: [], description: "대한다원 녹차밭 초록카펫, 율포솔밭해수욕장 바닷바람, 보성 꼬막 꼬막정식이 든든한 다향고을입니다." },
  { id: "jeonnam_hwasun", name_kr: "화순군", name_en: "Hwasun-gun", level: "sigungu", lat: 35.0612, lng: 126.9801, region_group: "호남권", neighbors: [], description: "화순 적벽 비경, 화순고인돌유적지, 만연사 동백, 운주사 천불천탑 바위조각이 신비롭습니다." },
  { id: "jeonnam_jangheung", name_kr: "장흥군", name_en: "Jangheung-gun", level: "sigungu", lat: 34.6812, lng: 126.9012, region_group: "호남권", neighbors: [], description: "정남진 편백숲 우드랜드 치유, 장흥 물축제 탐진강, 장흥 한우삼합(표고, 키조개, 한우)이 별미입니다." },
  { id: "jeonnam_gangjin", name_kr: "강진군", name_en: "Gangjin-gun", level: "sigungu", lat: 34.6412, lng: 126.7712, region_group: "호남권", neighbors: [], description: "다산초당 정약용 유배지, 가우도 출렁다리 수변길, 강진 고려청자박물관 가마터가 유서 깊습니다." },
  { id: "jeonnam_haenam", name_kr: "해남군", name_en: "Haenam-gun", level: "sigungu", lat: 34.5712, lng: 126.6012, region_group: "호남권", neighbors: [], description: "한반도의 시작 정남진 대흥사, 송호해수욕장, 해남 고구마가 달콤한 한반도 땅끝마을입니다." },
  { id: "jeonnam_yeongam", name_kr: "영암군", name_en: "Yeongam-gun", level: "sigungu", lat: 34.8012, lng: 126.7012, region_group: "호남권", neighbors: [], description: "기암괴석 웅장한 월출산 국립공원, 왕인박사 유적지 축제, 영암 무화과가 감미로운 고장입니다." },
  { id: "jeonnam_muan", name_kr: "무안군", name_en: "Muan-gun", level: "sigungu", lat: 34.9912, lng: 126.4812, region_group: "호남권", neighbors: [], description: "회산백련지 하얀 연꽃지, 황토갯벌랜드 생태체험, 도리포 갯마을 낙조가 어우러진 도청고읍입니다." },
  { id: "jeonnam_hampyeong", name_kr: "함평군", name_en: "Hampyeong-gun", level: "sigungu", lat: 35.0645, lng: 126.5165, region_group: "호남권", neighbors: [], description: "함평나비대축제 생태엑스포, 함평천 핑크뮬리, 돌머리해수욕장 낙조와 한우비빔밥이 유명합니다." },
  { id: "jeonnam_yeonggwang", name_kr: "영광군", name_en: "Yeonggwang-gun", level: "sigungu", lat: 35.2773, lng: 126.5121, region_group: "호남권", neighbors: [], description: "법성포 굴비거리 법성포 단오제, 백수해안도로 절경 파도소리, 불갑사 꽃무릇 붉은 카펫입니다." },
  { id: "jeonnam_jangseong", name_kr: "장성군", name_en: "Jangseong-gun", level: "sigungu", lat: 35.3015, lng: 126.7845, region_group: "호남권", neighbors: [], description: "축령산 편백나무 숲 피톤치드, 황룡강 노란꽃잔치 꽃길, 백양사 단풍이 수려한 선비의 고장입니다." },
  { id: "jeonnam_wando", name_kr: "완도군", name_en: "Wando-gun", level: "sigungu", lat: 34.3111, lng: 126.7554, region_group: "호남권", neighbors: [], description: "장보고 청해진 유적지, 명사십리해수욕장 고운 모래, 완도 전복과 김 양식이 풍성한 보배섬입니다." },
  { id: "jeonnam_jindo", name_kr: "진도군", name_en: "Jindo-gun", level: "sigungu", lat: 34.4821, lng: 126.2634, region_group: "호남권", neighbors: [], description: "신비의 바닷길 바다 갈라짐, 천연기념물 진도개, 세방낙조 낙조 전망대, 진도 아리랑의 섬입니다." },
  { id: "jeonnam_sinan", name_kr: "신안군", name_en: "Sinan-gun", level: "sigungu", lat: 34.8291, lng: 126.3512, region_group: "호남권", neighbors: [], description: "퍼플섬 반월박지도 보랏빛 다리, 천사대교 물길, 증도 태평염전 소금밭이 빛나는 천사의 섬입니다." },

  // -- 광주광역시 (5개 구) --
  { id: "gwangju_dong", name_kr: "광주동구", name_en: "Dong-gu", level: "sigungu", lat: 35.1461, lng: 126.9232, region_group: "호남권", neighbors: [], description: "국립아시아문화전당(ACC), 무등산 무등지구, 예술의 거리 화랑들이 밀집한 문화구입니다." },
  { id: "gwangju_seo", name_kr: "광주서구", name_en: "Seo-gu", level: "sigungu", lat: 35.1521, lng: 126.8482, region_group: "호남권", neighbors: [], description: "상무지구 비즈니스 빌딩숲, 5·18기념공원 추모사적, 풍암호수공원 장미가 화려한 도심입니다." },
  { id: "gwangju_nam", name_kr: "광주남구", name_en: "Nam-gu", level: "sigungu", lat: 35.1329, lng: 126.9025, region_group: "호남권", neighbors: [], description: "양림동 역사문화마을 근대건축, 사직공원 전망타워, 빛고을 공예창작촌이 훈훈한 예술구입니다." },
  { id: "gwangju_buk", name_kr: "광주북구", name_en: "Buk-gu", level: "sigungu", lat: 35.1741, lng: 126.9121, region_group: "호남권", neighbors: [], description: "광주비엔날레 전시관 예술혼, 국립광주박물관 사적, 무등산 원효사 계곡이 청량합니다." },
  { id: "gwangju_gwangsan", name_kr: "광주광산구", name_en: "Gwangsan-gu", level: "sigungu", lat: 35.1395, lng: 126.7923, region_group: "호남권", neighbors: [], description: "광주송정역 교통 요충, 1913송정역시장 먹거리, 첨단국가산업단지 공장이 역동적입니다." },

  // -- 부산광역시 (16개 구/군) --
  { id: "busan_jung", name_kr: "부산중구", name_en: "Jung-gu", level: "sigungu", lat: 35.1062, lng: 129.0324, region_group: "영남권", neighbors: [], description: "국제시장, 자갈치시장 물고기, 용두산공원 부산타워가 반기는 부산 근대의 자부심입니다." },
  { id: "busan_seo", name_kr: "부산서구", name_en: "Seo-gu", level: "sigungu", lat: 35.0979, lng: 129.0244, region_group: "영남권", neighbors: [], description: "송도해수욕장 해상케이블카, 임시수도기념관 근대사적, 천마산전망대 조망이 시원합니다." },
  { id: "busan_dong", name_kr: "부산동구", name_en: "Dong-gu", level: "sigungu", lat: 35.1293, lng: 129.0452, region_group: "영남권", neighbors: [], description: "부산역 교통 관문, 초량 이바구길 골목계단, 차이나타운 텍사스거리가 이색적인 도심입니다." },
  { id: "busan_yeongdo", name_kr: "부산영도구", name_en: "Yeongdo-gu", level: "sigungu", lat: 35.0801, lng: 129.0682, region_group: "영남권", neighbors: [], description: "태종대 등대 절벽 파도, 흰여울문화마을 바닷가 골목길, 영도대교 도개교가 상징적입니다." },
  { id: "busan_busanjin", name_kr: "부산진구", name_en: "Busanjin-gu", level: "sigungu", lat: 35.1623, lng: 129.0531, region_group: "영남권", neighbors: [], description: "부산 최대 도심 서면1번가 쇼핑몰, 부산시민공원 푸른 잔디, 송상현광장이 드넓습니다." },
  { id: "busan_dongnae", name_kr: "부산동래구", name_en: "Dongnae-gu", level: "sigungu", lat: 35.2048, lng: 129.0831, region_group: "영남권", neighbors: [], description: "동래온천 온천천 벚꽃길 산책로, 복천동고분군 역사유적, 구수한 동래파전의 전통 고장입니다." },
  { id: "busan_nam", name_kr: "부산남구", name_en: "Nam-gu", level: "sigungu", lat: 35.1365, lng: 129.0841, region_group: "영남권", neighbors: [], description: "오륙도 스카이워크 이색바위, UN기념공원 추모사적, 신선대 신선암 전망대가 정갈합니다." },
  { id: "busan_buk", name_kr: "부산북구", name_en: "Buk-gu", level: "sigungu", lat: 35.2132, lng: 129.0112, region_group: "영남권", neighbors: [], description: "화명생태공원 연꽃지, 대저생태공원 대밭길 낙조, 금정산 서문 성벽 산성이 든든합니다." },
  { id: "busan_haeundae", name_kr: "부산해운대구", name_en: "Haeundae-gu", level: "sigungu", lat: 35.1631, lng: 129.1636, region_group: "영남권", neighbors: [], description: "해운대해수욕장 빌딩숲 마천루, 동백섬 누리마루, 센텀시티 영화의전당이 휘황찬란합니다." },
  { id: "busan_saha", name_kr: "부산사하구", name_en: "Saha-gu", level: "sigungu", lat: 35.1044, lng: 128.9681, region_group: "영남권", neighbors: [], description: "다대포해수욕장 꿈의낙조분수, 감천문화마을 알록달록 계단, 을숙도 철새 도래지가 평화롭습니다." },
  { id: "busan_geumjeong", name_kr: "부산금정구", name_en: "Geumjeong-gu", level: "sigungu", lat: 35.2431, lng: 129.0921, region_group: "영남권", neighbors: [], description: "금정산성 등산로, 천년고찰 범어사 대웅전, 금강식물원 숲길이 아늑한 북부 주거 거점입니다." },
  { id: "busan_gangseo", name_kr: "부산강서구", name_en: "Gangseo-gu", level: "sigungu", lat: 35.1801, lng: 128.9131, region_group: "영남권", neighbors: [], description: "가덕도 등대 절경, 명지국제신도시 교통, 낙동강 하구에코센터 철새들이 노니는 대지입니다." },
  { id: "busan_yeonje", name_kr: "부산연제구", name_en: "Yeonje-gu", level: "sigungu", lat: 35.1762, lng: 129.0796, region_group: "영남권", neighbors: [], description: "부산시청, 검찰청 법원 등 종합 행정 타운, 연산동 고분군 산책길이 쾌적한 주거지입니다." },
  { id: "busan_suyeong", name_kr: "부산수영구", name_en: "Suyeong-gu", level: "sigungu", lat: 35.1521, lng: 129.1131, region_group: "영남권", neighbors: [], description: "광안리해수욕장 광안대교 다리 야경, 수영사적공원 팽나무, 민락수변공원 횟집들이 수려합니다." },
  { id: "busan_sasang", name_kr: "부산사상구", name_en: "Sasang-gu", level: "sigungu", lat: 35.1521, lng: 128.9812, region_group: "영남권", neighbors: [], description: "서부산 시외버스터미널, 삼락생태공원 벚꽃 터널 갈대밭 산책로가 수려한 서부 상업 거점입니다." },
  { id: "busan_gijang", name_kr: "부산기장군", name_en: "Gijang-gun", level: "sigungu", lat: 35.2443, lng: 129.2132, region_group: "영남권", neighbors: [], description: "해동용궁사 바닷가 절, 대변항 멸치 특산, 일광해수욕장, 기장 아울렛 쇼핑이 성황인 고장입니다." },

  // -- 대구광역시 (9개 구/군) --
  { id: "daegu_jung", name_kr: "대구중구", name_en: "Jung-gu", level: "sigungu", lat: 35.8694, lng: 128.6062, region_group: "영남권", neighbors: [], description: "동성로 번화가 쇼핑, 김광석 다시그리기길 음악, 계산성당 근대역사 골목길이 수려합니다." },
  { id: "daegu_dong", name_kr: "대구동구", name_en: "Dong-gu", level: "sigungu", lat: 35.8864, lng: 128.6362, region_group: "영남권", neighbors: [], description: "동대구역 복합환승센터, 팔공산 갓바위 약사여래불상, 불로동고분군 전경이 시원한 교통지입니다." },
  { id: "daegu_seo", name_kr: "대구서구", name_en: "Seo-gu", level: "sigungu", lat: 35.8718, lng: 128.5562, region_group: "영남권", neighbors: [], description: "서대구역사 교통, 이현공원 핑크뮬리 잔디마당, 사방이 통하는 섬유 유통의 전통지입니다." },
  { id: "daegu_nam", name_kr: "대구남구", name_en: "Nam-gu", level: "sigungu", lat: 35.8462, lng: 128.5962, region_group: "영남권", neighbors: [], description: "앞산 빨강전망대 케이블카 야경, 안지랑 곱창골목 구이 향, 앞산 카페거리가 매력적입니다." },
  { id: "daegu_buk", name_kr: "대구북구", name_en: "Buk-gu", level: "sigungu", lat: 35.8964, lng: 128.5862, region_group: "영남권", neighbors: [], description: "경북대학교 대학가, 엑스코(EXCO) 전시, 칠성시장 야시장 골목이 인산인해인 북부 거점입니다." },
  { id: "daegu_suseong", name_kr: "대구수성구", name_en: "Suseong-gu", level: "sigungu", lat: 35.8578, lng: 128.6254, region_group: "영남권", neighbors: [], description: "대구 최고의 부촌 교육 중심 학원가, 수성못 유원지 오리배 분수 쇼가 아름다운 도심입니다." },
  { id: "daegu_dalseo", name_kr: "대구달서구", name_en: "Dalseo-gu", level: "sigungu", lat: 35.8294, lng: 128.5362, region_group: "영남권", neighbors: [], description: "두류공원 대구타워, 이월드 놀이공원 벚꽃축제, 월광수변공원 데크길이 쾌적한 주거지입니다." },
  { id: "daegu_dalseong", name_kr: "대구달성군", name_en: "Dalseong-gun", level: "sigungu", lat: 35.7745, lng: 128.4312, region_group: "영남권", neighbors: [], description: "비슬산 참꽃 군락지, 사문진 나루터 주막촌 낙조, 송해공원 옥연지 둘레길이 수려한 고장입니다." },
  { id: "daegu_gunwi", name_kr: "대구군위군", name_en: "Gunwi-gun", level: "sigungu", lat: 36.2425, lng: 128.5724, region_group: "영남권", neighbors: [], description: "대구광역시로 편입된 군으로, 삼국유사테마파크, 화본역 간이역 간사, 한밤마을 돌담길이 아늑합니다." },

  // -- 울산광역시 (5개 구/군) --
  { id: "ulsan_jung", name_kr: "울산중구", name_en: "Jung-gu", level: "sigungu", lat: 35.5689, lng: 129.3314, region_group: "영남권", neighbors: [], description: "태화강 국가정원 십리대숲 대밭길, 병영성 곽, 중구 젊음의 거리가 활기찬 역사 고장입니다." },
  { id: "ulsan_nam", name_kr: "울산남구", name_en: "Nam-gu", level: "sigungu", lat: 35.5412, lng: 129.3245, region_group: "영남권", neighbors: [], description: "장생포 고래문화마을 고래박물관, 태화강역 교통, 삼산동 번화가 쇼핑몰이 밀집한 중심지입니다." },
  { id: "ulsan_dong", name_kr: "울산동구", name_en: "Dong-gu", level: "sigungu", lat: 35.5111, lng: 129.4145, region_group: "영남권", neighbors: [], description: "대왕암공원 출렁다리 소나무숲, 일산해수욕장 모래밭, 현대중공업 조선소가 있는 기계공업 기지입니다." },
  { id: "ulsan_buk", name_kr: "울산북구", name_en: "Buk-gu", level: "sigungu", lat: 35.5821, lng: 129.3614, region_group: "영남권", neighbors: [], description: "강동화암 주상절리 파도, 송정박상진호수공원 둘레길, 현대자동차 공장이 역동적으로 도는 도시입니다." },
  { id: "ulsan_ulju", name_kr: "울산울주군", name_en: "Ulju-gun", level: "sigungu", lat: 35.5211, lng: 129.1814, region_group: "영남권", neighbors: [], description: "간절곶 등대 한반도 해가 가장 먼저 뜨는 곳, 영남알프스 억새, 반구대 암각화 사적이 위용 넘칩니다." },

  // -- 경상북도 (22개 시/군) --
  { id: "gyeongbuk_pohang", name_kr: "포항시", name_en: "Pohang", level: "sigungu", lat: 36.0190, lng: 129.3435, region_group: "영남권", neighbors: [], description: "호미곶 상생의 손 바다, 포스코 용광로 야경, 죽도시장 물회, 스페이스워크 롤러코스터길이 위풍당당합니다." },
  { id: "gyeongbuk_gyeongju", name_kr: "경주시", name_en: "Gyeongju", level: "sigungu", lat: 35.8562, lng: 129.2132, region_group: "영남권", neighbors: [], description: "불국사 석굴암 다보탑 세계유산, 황리단길 한옥카페, 첨성대 동궁과 월지 야경이 찬란한 천년 신라 왕도입니다." },
  { id: "gyeongbuk_gimcheon", name_kr: "김천시", name_en: "Gimcheon", level: "sigungu", lat: 36.1397, lng: 128.1136, region_group: "영남권", neighbors: [], description: "직지사 벚꽃 산사, 사명대사공원 평화의 탑 정자, 김천 혁신도시 교통 허브가 빛나는 도읍입니다." },
  { id: "gyeongbuk_andong", name_kr: "안동시", name_en: "Andong", level: "sigungu", lat: 36.5684, lng: 128.7294, region_group: "영남권", neighbors: [], description: "하회마을 초가기와 세계유산, 월영교 나무다리 야경, 안동찜닭 골목, 안동소주가 깊은 유교 문화 본향입니다." },
  { id: "gyeongbuk_gumi", name_kr: "구미시", name_en: "Gumi", level: "sigungu", lat: 36.1194, lng: 128.3443, region_group: "영남권", neighbors: [], description: "금오산 도립공원 케이블카 폭포, 구미 국가산업단지 공장, 낙동강 체육공원 잔디가 광활한 IT 전자도시입니다." },
  { id: "gyeongbuk_yeongju", name_kr: "영주시", name_en: "Yeongju", level: "sigungu", lat: 36.8258, lng: 128.6265, region_group: "영남권", neighbors: [], description: "부석사 무량수전 배흘림기둥 세계유산, 소수서원 선비문화, 영주 풍기인삼과 사과가 달콤하고 건강합니다." },
  { id: "gyeongbuk_yeongcheon", name_kr: "영천시", name_en: "Yeongcheon", level: "sigungu", lat: 35.9732, lng: 128.9382, region_group: "영남권", neighbors: [], description: "보현산천문대 천체망원경 별구경, 영천 호국원 사적, 임고서원 소나무, 영천 포도 와인이 향긋합니다." },
  { id: "gyeongbuk_sangju", name_kr: "상주시", name_en: "Sangju", level: "sigungu", lat: 36.4162, lng: 128.1582, region_group: "영남권", neighbors: [], description: "경천대 낙동강물줄기 전망대, 상주 곶감 달콤 쫀득, 자전거박물관이 정갈한 삼백(쌀, 누에, 곶감)의 향입니다." },
  { id: "gyeongbuk_mungyeong", name_kr: "문경시", name_en: "Mungyeong", level: "sigungu", lat: 36.5932, lng: 128.1882, region_group: "영남권", neighbors: [], description: "문경새재 도립공원 성문 관문, 문경 단산 모노레일 활공장, 오미자 막걸리와 약돌돼지가 꿀맛입니다." },
  { id: "gyeongbuk_gyeongsan", name_kr: "경산시", name_en: "Gyeongsan", level: "sigungu", lat: 35.8242, lng: 128.7382, region_group: "영남권", neighbors: [], description: "영남대학교를 비롯한 거대 학원 대학도시, 반곡지 유채꽃 버드나무 저수지, 경산 대추가 영롱합니다." },
  { id: "gyeongbuk_uiseong", name_kr: "의성군", name_en: "Uiseong-gun", level: "sigungu", lat: 36.3532, lng: 128.6982, region_group: "영남권", neighbors: [], description: "조문국 사적지 분홍 작약꽃, 의성 마늘 통닭, 의성 컬링센터 올림픽 명소가 유명한 평야 고을입니다." },
  { id: "gyeongbuk_cheongsong", name_kr: "청송군", name_en: "Cheongsong-gun", level: "sigungu", lat: 36.4354, lng: 129.0554, region_group: "영남권", neighbors: [], description: "주왕산 국립공원 용추협곡 암벽, 주산지 저수지 왕버들 물안개, 꿀맛 청송 꿀사과가 새콤달콤 청정합니다." },
  { id: "gyeongbuk_yeongyang", name_kr: "영양군", name_en: "Yeongyang-gun", level: "sigungu", lat: 36.6664, lng: 129.1124, region_group: "영남권", neighbors: [], description: "주실마을 조지훈 시인 생가, 아시아 최초 밤하늘 보호공원 별구경, 영양 고추가 매콤하고 향긋합니다." },
  { id: "gyeongbuk_yeongdeok", name_kr: "영덕군", name_en: "Yeongdeok-gun", level: "sigungu", lat: 36.4154, lng: 129.3654, region_group: "영남권", neighbors: [], description: "강구항 영덕대게 찜 냄새, 블루로드 동해안 도보길 파도, 삼사해상공원 종소리가 청량한 해안지입니다." },
  { id: "gyeongbuk_cheongdo", name_kr: "청도군", name_en: "Cheongdo-gun", level: "sigungu", lat: 35.6473, lng: 128.7345, region_group: "영남권", neighbors: [], description: "청도 소싸움 축제 돔 경기장, 청도 와인터널 감와인, 프로방스 빛 축제 야경이 반짝이는 힐링촌입니다." },
  { id: "gyeongbuk_goryeong", name_kr: "고령군", name_en: "Goryeong-gun", level: "sigungu", lat: 35.7231, lng: 128.2631, region_group: "영남권", neighbors: [], description: "대가야 지산동고분군 산책로 세계유산, 대가야 박물관 가야금 연주, 고소한 고령 딸기가 영롱합니다." },
  { id: "gyeongbuk_seongju", name_kr: "성주군", name_en: "Seongju-gun", level: "sigungu", lat: 35.8845, lng: 128.2831, region_group: "영남권", neighbors: [], description: "세종대왕자태실 호국사적, 가야산 야생화식물원, 전국 최고 맛을 자랑하는 아삭아삭 노란 성주 참외입니다." },
  { id: "gyeongbuk_chilgok", name_kr: "칠곡군", name_en: "Chilgok-gun", level: "sigungu", lat: 35.9945, lng: 128.4031, region_group: "영남권", neighbors: [], description: "다부동 전적기념관 6·25호국사적, 왜관철교 호국의 다리, 송정자연휴양림이 푸른 호국 요람입니다." },
  { id: "gyeongbuk_yecheon", name_kr: "예천군", name_en: "Yecheon-gun", level: "sigungu", lat: 36.6575, lng: 128.4531, region_group: "영남권", neighbors: [], description: "회룡포 물도리 물길 마을 전경, 삼강주막 주막촌 전통, 경북도청 신도시가 입주해 떠오르는 중심입니다." },
  { id: "gyeongbuk_bonghwa", name_kr: "봉화군", name_en: "Bonghwa-gun", level: "sigungu", lat: 36.8932, lng: 128.7331, region_group: "영남권", neighbors: [], description: "청량산 하늘다리 구름다리, 분천역 산타마을 기차체험, 춘양목 소나무와 봉화 은어 축제가 유쾌합니다." },
  { id: "gyeongbuk_uljin", name_kr: "울진군", name_en: "Uljin-gun", level: "sigungu", lat: 36.9932, lng: 129.4031, region_group: "영남권", neighbors: [], description: "백암온천 덕구온천 수질, 불영사 계곡 웅장한 바위, 성류굴 천연동굴, 죽변 등대하트해변 모노레일입니다." },
  { id: "gyeongbuk_ulleung", name_kr: "울릉군", name_en: "Ulleung-gun", level: "sigungu", lat: 37.4845, lng: 130.9056, region_group: "영남권", neighbors: [], description: "성인봉 원시림, 독도 동쪽땅끝 국토 수호, 울릉 명품 오징어와 독도새우, 호박엿이 맛좋은 평화로운 화산섬입니다." },

  // -- 경상남도 (18개 시/군) --
  { id: "gyeongnam_changwon", name_kr: "창원시", name_en: "Changwon", level: "sigungu", lat: 35.2281, lng: 128.6811, region_group: "영남권", neighbors: [], description: "진해 군항제의 찬란한 벚꽃길과 자전거 타기 좋은 넓은 격자형 대로가 조화로운 경남도청 소재지입니다." },
  { id: "gyeongnam_jinju", name_kr: "진주시", name_en: "Jinju", level: "sigungu", lat: 35.1802, lng: 128.0848, region_group: "영남권", neighbors: [], description: "논개의 혼이 서린 진주성과 가을마다 남강을 수놓는 화려한 유등축제로 이름난 예절의 명가입니다." },
  { id: "gyeongnam_tongyeong", name_kr: "통영시", name_en: "Tongyeong", level: "sigungu", lat: 34.8544, lng: 128.4331, region_group: "영남권", neighbors: [], description: "동피랑 벽화마을, 충무김밥, 다도해를 수놓는 해상 미륵산 케이블카가 유명한 남해안의 한국의 나폴리입니다." },
  { id: "gyeongnam_sacheon", name_kr: "사천시", name_en: "Sacheon", level: "sigungu", lat: 35.0037, lng: 128.0642, region_group: "영남권", neighbors: [], description: "사천바다케이블카 해상 전경, 항공우주박물관 전투기, 실안 낙조 노을이 명화 같은 우주공학 허브입니다." },
  { id: "gyeongnam_gimhae", name_kr: "김해시", name_en: "Gimhae", level: "sigungu", lat: 35.2343, lng: 128.8812, region_group: "영남권", neighbors: [], description: "수로왕릉 묘역 사적, 국립김해박물관 가야철기문화, 가야테마파크 체험이 정갈한 가야 제국의 본궁입니다." },
  { id: "gyeongnam_miryang", name_kr: "밀양시", name_en: "Miryang", level: "sigungu", lat: 35.5037, lng: 128.7482, region_group: "영남권", neighbors: [], description: "영남루 정자 누각 국보, 얼음골 신비의 골짜기 고드름, 밀양 아리랑 전수지, 밀양 돼지국밥이 최고입니다." },
  { id: "gyeongnam_geoje", name_kr: "거제시", name_en: "Geoje", level: "sigungu", lat: 34.8804, lng: 128.6211, region_group: "영남권", neighbors: [], description: "바람의 언덕 풍차 돌출 언덕, 외도 보타니아 이국적 정원, 거제도 포로수용소 사적이 웅장한 조선산업지입니다." },
  { id: "gyeongnam_yangsan", name_kr: "양산시", name_en: "Yangsan", level: "sigungu", lat: 35.3382, lng: 129.0345, region_group: "영남권", neighbors: [], description: "삼보사찰 통도사 대웅전 진신사리 국보, 내원사 계곡, 황산공원 들판이 쾌적한 역동 대도시입니다." },
  { id: "gyeongnam_uiryeong", name_kr: "의령군", name_en: "Uiryeng", level: "sigungu", lat: 35.3211, lng: 128.2611, region_group: "영남권", neighbors: [], description: "홍의장군 곽재우 생가 호국사적, 정암 솥바위 복 바위, 의령 망개떡과 소바 국수가 쫄깃 별미입니다." },
  { id: "gyeongnam_haman", name_kr: "함안군", name_en: "Haman", level: "sigungu", lat: 35.2724, lng: 128.4064, region_group: "영남권", neighbors: [], description: "말이산고분군 가야고분 세계유산, 입곡군립공원 출렁다리, 아라홍련 붉은 연꽃이 찬란한 충절 고을입니다." },
  { id: "gyeongnam_changnyeong", name_kr: "창녕군", name_en: "Changnyeong", level: "sigungu", lat: 35.5414, lng: 128.4921, region_group: "영남권", neighbors: [], description: "태고의 신비 우포늪 가시연꽃 가창오리, 화왕산 억새밭 온천, 부곡온천 뜨거운 유황 노천탕이 유명합니다." },
  { id: "gyeongnam_goseong", name_kr: "경남고성군", name_en: "Goseong-gun", level: "sigungu", lat: 34.9732, lng: 128.3222, region_group: "영남권", neighbors: [], description: "상족암군립공원 공룡 발자국 화석 주상절리, 당항포 해전 이순신 사적, 고성 오광대 탈춤 전통지입니다." },
  { id: "gyeongnam_namhae", name_kr: "남해군", name_en: "Namhae", level: "sigungu", lat: 34.8377, lng: 127.8924, region_group: "영남권", neighbors: [], description: "붉은색 기와지붕이 바다를 배경으로 어우러진 독일마을과 가천 다랭이논이 평화로운 아름다운 섬입니다." },
  { id: "gyeongnam_hadong", name_kr: "하동군", name_en: "Hadong-gun", level: "sigungu", lat: 35.0672, lng: 127.7512, region_group: "영남권", neighbors: [], description: "박경리 토지 최참판댁 초가기와, 화개장터 장날 엿 가락, 평사리 들판, 야생 녹차가 맑은 영호남 화합촌입니다." },
  { id: "gyeongnam_sancheong", name_kr: "산청군", name_en: "Sancheong-gun", level: "sigungu", lat: 35.4143, lng: 127.8732, region_group: "영남권", neighbors: [], description: "동의보감촌 한방 테마파크, 지리산 천왕봉 정기, 웅석봉 푸른 바위 자락, 산청 곶감이 달콤한 고장입니다." },
  { id: "gyeongnam_hamyang", name_kr: "함양군", name_en: "Hamyang-gun", level: "sigungu", lat: 35.5211, lng: 127.7012, region_group: "영남권", neighbors: [], description: "상림공원 신라 최치원 인공조림 숲길, 지리산 제일문 관문, 서상덕유산 계곡, 함양 산삼이 유명합니다." },
  { id: "gyeongnam_geochang", name_kr: "거창군", name_en: "Geochang-gun", level: "sigungu", lat: 35.6865, lng: 127.9095, region_group: "영남권", neighbors: [], description: "수승대 거북바위 정자 연극제, Y자형 감악산 출렁다리, 거창 사과와 포도가 시원하고 달콤한 산자락입니다." },
  { id: "gyeongnam_hapcheon", name_kr: "합천군", name_en: "Hapcheon-gun", level: "sigungu", lat: 35.5664, lng: 128.1654, region_group: "영남권", neighbors: [], description: "가야산 해인사 팔만대장경 국보, 합천영상테마파크 근대세트장, 황매산 철쭉 억새 카펫이 영롱합니다." },

  // -- 제주특별자치도 (2개 행정시) --
  { id: "jeju_jeju", name_kr: "제주시", name_en: "Jeju-si", level: "sigungu", lat: 33.4996, lng: 126.5312, region_group: "제주권", neighbors: [], description: "용두암과 이호테우 해변 목마 등대가 반기는 에메랄드 해안선을 가진 제주의 상징적 시내입니다." },
  { id: "jeju_seogwipo", name_kr: "서귀포시", name_en: "Seogwipo-si", level: "sigungu", lat: 33.2541, lng: 126.5601, region_group: "제주권", neighbors: [], description: "천지연폭포, 외돌개, 중문관광단지의 아름다운 이국적 야자수길이 따뜻한 서귀포 남빛 도시입니다." }
];

// Combine all regions
export const ALL_REGIONS = [...REGIONS, ...WORLD_COUNTRIES, ...JAPAN_LIST, ...USA_LIST, ...CHINA_LIST];

// Grouping helpers
export const SIDO_LIST = REGIONS.filter((r) => r.level === "sido");
export const SIGUNGU_LIST = REGIONS.filter((r) => r.level === "sigungu");

// Adjacency checking helper
export const getRegionNeighbors = (id: string): string[] => {
  const r = ALL_REGIONS.find((x) => x.id === id);
  return r ? r.neighbors : [];
};
