import { Region } from "../types";

export const USA_LIST: Region[] = [
  // 1. 수도 (Capital)
  {
    id: "us_washington_dc",
    name_kr: "워싱턴DC",
    name_en: "Washington D.C.",
    level: "usa",
    lat: 38.9072,
    lng: -77.0369,
    region_group: "동부",
    neighbors: ["us_virginia", "us_maryland"],
    description: "백악관, 국회의사당, 스미소니언 박물관이 모여 있는 미국의 수도입니다."
  },

  // 2. 동부 (East Coast)
  {
    id: "us_new_york",
    name_kr: "뉴욕",
    name_en: "New York",
    level: "usa",
    lat: 42.1657,
    lng: -74.9481,
    region_group: "동부",
    neighbors: ["us_new_jersey", "us_pennsylvania", "us_connecticut", "us_massachusetts", "us_vermont"],
    description: "자유의 여신상, 타임스퀘어, 맨해튼 마천루가 빛나는 대표 주입니다."
  },
  {
    id: "us_massachusetts",
    name_kr: "매사추세츠",
    name_en: "Massachusetts",
    level: "usa",
    lat: 42.4072,
    lng: -71.3824,
    region_group: "동부",
    neighbors: ["us_new_york", "us_connecticut", "us_rhode_island", "us_vermont", "us_new_hampshire"],
    description: "하버드와 MIT, 보스턴 프레덤 트레일의 역사를 지닌 교육 도시입니다."
  },
  {
    id: "us_pennsylvania",
    name_kr: "펜실베이니아",
    name_en: "Pennsylvania",
    level: "usa",
    lat: 41.2033,
    lng: -77.1945,
    region_group: "동부",
    neighbors: ["us_new_york", "us_new_jersey", "us_ohio", "us_maryland", "us_west_virginia"],
    description: "필라델피아 독립기념관과 피츠버그 철강 역사가 서린 주입니다."
  },
  {
    id: "us_new_jersey",
    name_kr: "뉴저지",
    name_en: "New Jersey",
    level: "usa",
    lat: 40.0583,
    lng: -74.4057,
    region_group: "동부",
    neighbors: ["us_new_york", "us_pennsylvania", "us_delaware"],
    description: "애틀랜틱시티 해변과 뉴욕 위성도시들이 위치한 해안 주입니다."
  },
  {
    id: "us_connecticut",
    name_kr: "커네티컷",
    name_en: "Connecticut",
    level: "usa",
    lat: 41.6032,
    lng: -73.0877,
    region_group: "동부",
    neighbors: ["us_new_york", "us_massachusetts", "us_rhode_island"],
    description: "예일 대학교와 고풍스러운 뉴잉글랜드 마을이 유명한 주입니다."
  },
  {
    id: "us_rhode_island",
    name_kr: "로드아일랜드",
    name_en: "Rhode Island",
    level: "usa",
    lat: 41.5801,
    lng: -71.4774,
    region_group: "동부",
    neighbors: ["us_massachusetts", "us_connecticut"],
    description: "미국에서 가장 면적이 작은 주이자 해안 대저택 항구가 유명합니다."
  },
  {
    id: "us_vermont",
    name_kr: "버몬트",
    name_en: "Vermont",
    level: "usa",
    lat: 44.5588,
    lng: -72.5778,
    region_group: "동부",
    neighbors: ["us_new_york", "us_massachusetts", "us_new_hampshire"],
    description: "메이플 시럽과 아름다운 단풍, 스키 리조트로 가득한 산악 주입니다."
  },
  {
    id: "us_new_hampshire",
    name_kr: "뉴햄프셔",
    name_en: "New Hampshire",
    level: "usa",
    lat: 43.1939,
    lng: -71.5724,
    region_group: "동부",
    neighbors: ["us_maine", "us_massachusetts", "us_vermont"],
    description: "화이트 산맥과 프랭클린 자연 풍경이 수려한 뉴잉글랜드 지역입니다."
  },
  {
    id: "us_maine",
    name_kr: "메인",
    name_en: "Maine",
    level: "usa",
    lat: 45.2538,
    lng: -69.4455,
    region_group: "동부",
    neighbors: ["us_new_hampshire"],
    description: "미국 최동북단 바닷가와 로브스터 요리, 아카디아 국립공원의 주입니다."
  },
  {
    id: "us_maryland",
    name_kr: "메릴랜드",
    name_en: "Maryland",
    level: "usa",
    lat: 39.0458,
    lng: -76.6413,
    region_group: "동부",
    neighbors: ["us_washington_dc", "us_virginia", "us_pennsylvania", "us_delaware"],
    description: "체서피크 만 항구와 볼티모어 해양문화가 발달한 동부 주입니다."
  },
  {
    id: "us_delaware",
    name_kr: "델라웨어",
    name_en: "Delaware",
    level: "usa",
    lat: 38.9108,
    lng: -75.5277,
    region_group: "동부",
    neighbors: ["us_maryland", "us_pennsylvania", "us_new_jersey"],
    description: "미국 헌법을 가장 먼저 승인한 제1호 주이자 면세 쇼핑 천국입니다."
  },
  {
    id: "us_virginia",
    name_kr: "버전아",
    name_en: "Virginia",
    level: "usa",
    lat: 37.4316,
    lng: -78.6569,
    region_group: "동부",
    neighbors: ["us_maryland", "us_north_carolina", "us_west_virginia", "us_kentucky"],
    description: "미국 초기 개척 역사와 셰넌도어 국립공원이 숨쉬는 주입니다."
  },
  {
    id: "us_west_virginia",
    name_kr: "웨스트버지니아",
    name_en: "West Virginia",
    level: "usa",
    lat: 38.5976,
    lng: -80.4549,
    region_group: "동부",
    neighbors: ["us_virginia", "us_pennsylvania", "us_ohio", "us_kentucky"],
    description: "애팔래치아 산맥 계곡과 신시내티 강래프팅이 유명한 힐빌리 지역입니다."
  },
  {
    id: "us_north_carolina",
    name_kr: "노스캐롤라이나",
    name_en: "North Carolina",
    level: "usa",
    lat: 35.7596,
    lng: -79.0193,
    region_group: "동부",
    neighbors: ["us_virginia", "us_south_carolina", "us_georgia", "us_tennessee"],
    description: "라이트 형제 비행 발상지와 그린즈버러, 아우터뱅크스 해변 주입니다."
  },
  {
    id: "us_south_carolina",
    name_kr: "사우스캐롤라이나",
    name_en: "South Carolina",
    level: "usa",
    lat: 33.8361,
    lng: -81.1637,
    region_group: "동부",
    neighbors: ["us_north_carolina", "us_georgia"],
    description: "찰스턴 역사 지구와 머틀 비치 해양 휴양지가 위치한 남동부 주입니다."
  },

  // 3. 남부 (South)
  {
    id: "us_florida",
    name_kr: "플로리다",
    name_en: "Florida",
    level: "usa",
    lat: 27.6648,
    lng: -81.5158,
    region_group: "남부",
    neighbors: ["us_georgia", "us_alabama"],
    description: "디즈니월드, 마이애미 비치, 케네디 우주센터가 있는 햇살의 주입니다."
  },
  {
    id: "us_georgia",
    name_kr: "조지아",
    name_en: "Georgia",
    level: "usa",
    lat: 32.1656,
    lng: -82.9001,
    region_group: "남부",
    neighbors: ["us_florida", "us_alabama", "us_tennessee", "us_north_carolina", "us_south_carolina"],
    description: "아틀란타 코카콜라 본사와 CNN, 마틴 루터 킹 목사 생가가 있는 주입니다."
  },
  {
    id: "us_texas",
    name_kr: "텍사스",
    name_en: "Texas",
    level: "usa",
    lat: 31.9686,
    lng: -99.9018,
    region_group: "남부",
    neighbors: ["us_louisiana", "us_arkansas", "us_oklahoma", "us_new_mexico"],
    description: "카우보이 문화, 휴스턴 NASA 우주센터, 오스틴 테크 밸리의 대륙 주입니다."
  },
  {
    id: "us_louisiana",
    name_kr: "루이지애나",
    name_en: "Louisiana",
    level: "usa",
    lat: 30.9843,
    lng: -91.9623,
    region_group: "남부",
    neighbors: ["us_texas", "us_arkansas", "us_mississippi"],
    description: "뉴올리언스 프렌치 쿼터와 재즈, 케이준 크레올 요리가 있는 남부 주입니다."
  },
  {
    id: "us_alabama",
    name_kr: "앨라배마",
    name_en: "Alabama",
    level: "usa",
    lat: 32.3182,
    lng: -86.9023,
    region_group: "남부",
    neighbors: ["us_florida", "us_georgia", "us_tennessee", "us_mississippi"],
    description: "미시시피 남부 민권운동 역사와 몽고메리가 있는 남부 주입니다."
  },
  {
    id: "us_mississippi",
    name_kr: "미시시피",
    name_en: "Mississippi",
    level: "usa",
    lat: 32.3547,
    lng: -89.3985,
    region_group: "남부",
    neighbors: ["us_louisiana", "us_alabama", "us_tennessee", "us_arkansas"],
    description: "미시시피 강줄기와 블루스 음악의 고향인 정겨운 남부 주입니다."
  },
  {
    id: "us_tennessee",
    name_kr: "테네시",
    name_en: "Tennessee",
    level: "usa",
    lat: 35.5175,
    lng: -86.5804,
    region_group: "남부",
    neighbors: ["us_kentucky", "us_georgia", "us_alabama", "us_mississippi", "us_arkansas", "us_north_carolina"],
    description: "컨트리 음악 성지 내슈빌과 엘비스 프레스리의 멤피스가 유명합니다."
  },
  {
    id: "us_kentucky",
    name_kr: "켄터키",
    name_en: "Kentucky",
    level: "usa",
    lat: 37.8393,
    lng: -84.27,
    region_group: "남부",
    neighbors: ["us_tennessee", "us_virginia", "us_west_virginia", "us_ohio", "us_indiana", "us_illinois", "us_missouri"],
    description: "버번 위스키 양조장과 켄터키 더비 경마로 알려진 정통 남부 주입니다."
  },
  {
    id: "us_arkansas",
    name_kr: "아칸소",
    name_en: "Arkansas",
    level: "usa",
    lat: 34.7465,
    lng: -92.2896,
    region_group: "남부",
    neighbors: ["us_texas", "us_louisiana", "us_mississippi", "us_tennessee", "us_missouri", "us_oklahoma"],
    description: "온천 국립공원과 오자크 산맥의 울창한 자연을 자랑하는 주입니다."
  },
  {
    id: "us_oklahoma",
    name_kr: "오클라호마",
    name_en: "Oklahoma",
    level: "usa",
    lat: 35.0078,
    lng: -97.0929,
    region_group: "남부",
    neighbors: ["us_texas", "us_kansas", "us_arkansas", "us_missouri", "us_colorado", "us_new_mexico"],
    description: "인디언 원주민 역사 문화와 초원 대지 및 토네이도 앨리 지역입니다."
  },

  // 4. 중부 (Midwest)
  {
    id: "us_illinois",
    name_kr: "일리노이",
    name_en: "Illinois",
    level: "usa",
    lat: 40.6331,
    lng: -89.3985,
    region_group: "중부",
    neighbors: ["us_indiana", "us_wisconsin", "us_iowa", "us_missouri", "us_kentucky"],
    description: "시카고 마천루, 미시간 호수와 링컨 대통령의 고향이 위치한 주입니다."
  },
  {
    id: "us_ohio",
    name_kr: "오하이오",
    name_en: "Ohio",
    level: "usa",
    lat: 40.4173,
    lng: -82.9071,
    region_group: "중부",
    neighbors: ["us_pennsylvania", "us_michigan", "us_indiana", "us_kentucky", "us_west_virginia"],
    description: "클리블랜드 로큰롤 명예의 전당과 신시내티가 위치한 중부 산업 주입니다."
  },
  {
    id: "us_michigan",
    name_kr: "미시간",
    name_en: "Michigan",
    level: "usa",
    lat: 44.3148,
    lng: -85.6024,
    region_group: "중부",
    neighbors: ["us_ohio", "us_indiana", "us_wisconsin"],
    description: "디트로이트 모터시티 자동차 산업과 오대호 호수변을 품은 주입니다."
  },
  {
    id: "us_indiana",
    name_kr: "인디애나",
    name_en: "Indiana",
    level: "usa",
    lat: 40.2672,
    lng: -86.1349,
    region_group: "중부",
    neighbors: ["us_illinois", "us_ohio", "us_michigan", "us_kentucky"],
    description: "인디애나폴리스 500 레이싱과 중부의 농경지 지대가 만나는 곳입니다."
  },
  {
    id: "us_wisconsin",
    name_kr: "위스콘신",
    name_en: "Wisconsin",
    level: "usa",
    lat: 43.7844,
    lng: -88.7879,
    region_group: "중부",
    neighbors: ["us_illinois", "us_michigan", "us_minnesota", "us_iowa"],
    description: "치즈 생산지로 저명하며 밀워키 맥주 브루어리 문화가 번성한 주입니다."
  },
  {
    id: "us_minnesota",
    name_kr: "미네소타",
    name_en: "Minnesota",
    level: "usa",
    lat: 46.7296,
    lng: -94.6859,
    region_group: "중부",
    neighbors: ["us_wisconsin", "us_iowa", "us_north_dakota", "us_south_dakota"],
    description: "만 개 호수의 주이자 트윈시티(미니애폴리스-세인트폴) 중심 주입니다."
  },
  {
    id: "us_missouri",
    name_kr: "미주리",
    name_en: "Missouri",
    level: "usa",
    lat: 37.9643,
    lng: -91.8318,
    region_group: "중부",
    neighbors: ["us_illinois", "us_iowa", "us_kansas", "us_arkansas", "us_kentucky", "us_tennessee"],
    description: "세인트루이스 게이트웨이 아치와 캔자스시티 바비큐가 명물인 주입니다."
  },
  {
    id: "us_iowa",
    name_kr: "아이오와",
    name_en: "Iowa",
    level: "usa",
    lat: 41.878,
    lng: -93.0977,
    region_group: "중부",
    neighbors: ["us_illinois", "us_minnesota", "us_wisconsin", "us_missouri", "us_nebraska", "us_south_dakota"],
    description: "미국 대평원옥수수 지대의 대표 주이자 프레리 지형이 퍼져 있습니다."
  },
  {
    id: "us_kansas",
    name_kr: "캔자스",
    name_en: "Kansas",
    level: "usa",
    lat: 38.5,
    lng: -98.0,
    region_group: "중부",
    neighbors: ["us_missouri", "us_nebraska", "us_colorado", "us_oklahoma"],
    description: "오즈의 마법사 무대이자 미대륙 한가운데에 위치한 광활한 평원 주입니다."
  },
  {
    id: "us_nebraska",
    name_kr: "네브래스카",
    name_en: "Nebraska",
    level: "usa",
    lat: 41.4925,
    lng: -99.9018,
    region_group: "중부",
    neighbors: ["us_iowa", "us_kansas", "us_colorado", "us_wyoming", "us_south_dakota"],
    description: "오마하 워런 버핏의 본거지이자 사일로 대평원이 끝없이 펼쳐진 곳입니다."
  },
  {
    id: "us_south_dakota",
    name_kr: "사우스다코타",
    name_en: "South Dakota",
    level: "usa",
    lat: 44.2998,
    lng: -99.4388,
    region_group: "중부",
    neighbors: ["us_north_dakota", "us_minnesota", "us_iowa", "us_nebraska", "us_wyoming", "us_montana"],
    description: "대통령 4인의 얼굴 조각 러슈모어 산 국립기념지가 있는 대표적 주입니다."
  },
  {
    id: "us_north_dakota",
    name_kr: "노스다코타",
    name_en: "North Dakota",
    level: "usa",
    lat: 47.5515,
    lng: -101.002,
    region_group: "중부",
    neighbors: ["us_south_dakota", "us_minnesota", "us_montana"],
    description: "시어도어 루스벨트 국립공원과 캐나다 국경 부근 광활한 프레리 지역입니다."
  },

  // 5. 서부 (West)
  {
    id: "us_california",
    name_kr: "캘리포니아",
    name_en: "California",
    level: "usa",
    lat: 36.7783,
    lng: -119.4179,
    region_group: "서부",
    neighbors: ["us_oregon", "us_nevada", "us_arizona"],
    description: "LA 헐리우드, 실리콘밸리, 요세미티, 샌프란시스코가 있는 대표 서부 주입니다."
  },
  {
    id: "us_washington",
    name_kr: "워싱턴주",
    name_en: "Washington",
    level: "usa",
    lat: 47.7511,
    lng: -120.7401,
    region_group: "서부",
    neighbors: ["us_oregon", "us_idaho"],
    description: "시애틀 스페이스 니들, 스타벅스 1호점, 마이크로소프트, 아마존이 가득합니다."
  },
  {
    id: "us_oregon",
    name_kr: "오레곤",
    name_en: "Oregon",
    level: "usa",
    lat: 43.8041,
    lng: -120.5542,
    region_group: "서부",
    neighbors: ["us_washington", "us_california", "us_nevada", "us_idaho"],
    description: "포틀랜드 힙스터 문화와 크레이터 레이크의 청결한 자연 환경이 있는 주입니다."
  },
  {
    id: "us_nevada",
    name_kr: "네바다",
    name_en: "Nevada",
    level: "usa",
    lat: 38.8026,
    lng: -116.4194,
    region_group: "서부",
    neighbors: ["us_california", "us_arizona", "us_utah", "us_idaho", "us_oregon"],
    description: "화려한 불빛의 라스베이거스 스트립과 후버댐, 사막 지형이 유명합니다."
  },
  {
    id: "us_arizona",
    name_kr: "애리조나",
    name_en: "Arizona",
    level: "usa",
    lat: 34.0489,
    lng: -111.0937,
    region_group: "서부",
    neighbors: ["us_california", "us_nevada", "us_utah", "us_new_mexico"],
    description: "웅장한 그랜드 캐니언과 선인장 사막 피닉스가 펼쳐진 붉은 대지입니다."
  },
  {
    id: "us_colorado",
    name_kr: "콜로라도",
    name_en: "Colorado",
    level: "usa",
    lat: 39.5501,
    lng: -105.7821,
    region_group: "서부",
    neighbors: ["us_utah", "us_wyoming", "us_nebraska", "us_kansas", "us_oklahoma", "us_new_mexico"],
    description: "로키 산맥 스키 리조트와 덴버 마일하이 시티가 명성 높은 주입니다."
  },
  {
    id: "us_utah",
    name_kr: "유타",
    name_en: "Utah",
    level: "usa",
    lat: 39.321,
    lng: -111.0937,
    region_group: "서부",
    neighbors: ["us_nevada", "us_arizona", "us_colorado", "us_idaho", "us_wyoming"],
    description: "자이언 국립공원, 브라이스 캐니언, 솔트레이크시티 성지가 있습니다."
  },
  {
    id: "us_idaho",
    name_kr: "아이더호",
    name_en: "Idaho",
    level: "usa",
    lat: 44.0682,
    lng: -114.742,
    region_group: "서부",
    neighbors: ["us_washington", "us_oregon", "us_nevada", "us_utah", "us_montana", "us_wyoming"],
    description: "유명한 감자 농장과 선밸리 스키장, 보이시 시가 있는 서부 주입니다."
  },
  {
    id: "us_montana",
    name_kr: "몬태나",
    name_en: "Montana",
    level: "usa",
    lat: 46.8797,
    lng: -110.3626,
    region_group: "서부",
    neighbors: ["us_idaho", "us_wyoming", "us_north_dakota", "us_south_dakota"],
    description: "글래시어 국립공원의 로키 산맥 설경과 광활한 야생 서부 풍경이 자랑입니다."
  },
  {
    id: "us_wyoming",
    name_kr: "와이오밍",
    name_en: "Wyoming",
    level: "usa",
    lat: 43.0759,
    lng: -107.2903,
    region_group: "서부",
    neighbors: ["us_idaho", "us_montana", "us_south_dakota", "us_nebraska", "us_colorado", "us_utah"],
    description: "세계 최초 국립공원 옐로스톤과 그랜드티턴 산맥이 위치한 국립공원 천국입니다."
  },
  {
    id: "us_new_mexico",
    name_kr: "뉴멕시코",
    name_en: "New Mexico",
    level: "usa",
    lat: 34.5199,
    lng: -105.8701,
    region_group: "서부",
    neighbors: ["us_arizona", "us_colorado", "us_oklahoma", "us_texas"],
    description: "산타페 미술 건축물과 화이트샌즈 사막이 아름다운 이국적 주입니다."
  },

  // 6. 태평양 / 외곽 (Pacific / Non-Contiguous)
  {
    id: "us_hawaii",
    name_kr: "하와이",
    name_en: "Hawaii",
    level: "usa",
    lat: 19.8968,
    lng: -155.5828,
    region_group: "태평양",
    neighbors: ["us_california"],
    description: "와이키키 해변, 화산 국립공원, 훌라 춤이 유명한 태평양 낙원 제도입니다."
  },
  {
    id: "us_alaska",
    name_kr: "알래스카",
    name_en: "Alaska",
    level: "usa",
    lat: 64.2008,
    lng: -149.4937,
    region_group: "태평양",
    neighbors: ["us_washington"],
    description: "오로라, 빙하, 데날리 산이 높이 솟은 북극권 거대 자연주의 주입니다."
  }
];
