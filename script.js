/* DOM 로드 완료 후 실행 */
document.addEventListener('DOMContentLoaded', () => {


/* 메뉴바 스크롤 제어 */
    const menuList = document.querySelector('.menu-list');
    const menuPrevBtn = document.querySelector('.menu-prev');
    const menuNextBtn = document.querySelector('.menu-next');

    if (menuList && menuPrevBtn && menuNextBtn) {
        const menuItems = menuList.querySelectorAll('li');
        const itemWidth = menuItems[0]?.offsetWidth || 0; // 각 메뉴 항목의 너비
        const scrollAmount = itemWidth + 30; // 마진 포함 이동 거리 (margin: 0 15px이므로 30px 추가)

        menuPrevBtn.addEventListener('click', () => {
            menuList.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        menuNextBtn.addEventListener('click', () => {
            menuList.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }

/* 슬라이더 제어 */
    const slides = document.querySelectorAll('.slide');
    const backSlideBtn = document.querySelector('.back-slide');
    const nextSlideBtn = document.querySelector('.next-slide');
    const hmsColor = document.querySelector('.hms-color');
    let currentSlide = 0;

    // 슬라이드별 배경 정의
    const slideBackgrounds = [
        'linear-gradient(to right, #debcfb, #ffffff)', // 슬라이드 1 (부산)
        'linear-gradient(to right, #b3e5fc, #ffffff)'  // 슬라이드 2 (제주도)
        
    ];

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
                // 배경 그라디언트 변경
                if (hmsColor) {
                    hmsColor.style.background = slideBackgrounds[index];
                }
            }
        });
        updateSlideNumber();
    }

    function updateSlideNumber() {
        const totalSlides = slides.length;
        const currentNumber = (currentSlide + 1).toString().padStart(2, '0');
        document.querySelector('.slide-number').textContent = `${currentNumber} / ${totalSlides.toString().padStart(2, '0')}`;
    }

    if (backSlideBtn && nextSlideBtn && slides.length && hmsColor) {
        nextSlideBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });

        backSlideBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });

        // 초기 슬라이드 및 배경 표시
        showSlide(currentSlide);

        // 5초마다 슬라이드 및 배경 자동 전환
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000); // 5000ms = 5초
    }



    /* 지역 메뉴 버튼 클릭 시 내용 변경 */
    const regionButtons = document.querySelectorAll('.region-btn');
    const regionTitle = document.querySelector('#region-title');
    const regionDescription = document.querySelector('#region-description');
    const regionImage = document.querySelector('#region-image');

    // 지역별 데이터 정의
    const regionData = {
        //제주
        'seogwipo': {
            title: '서귀포',
            description: '서귀포는 제주도 남쪽에 위치한 아름다운 도시로, 푸른 바다와 독특한 자연경관으로 유명합니다. 주요 관광지로는 천지연 폭포, 정방 폭포, 그리고 오설록 티 뮤지엄이 있습니다. 따뜻한 기후와 신선한 해산물 요리도 큰 매력입니다.',
            image: 'picture/jeju_flower.jpg',
            alt: '서귀포 이미지'
        },
        'jeju-city': {
            title: '제주시',
            description: '제주시는 제주도의 중심 도시로, 공항과 가까워 접근성이 좋습니다. 용두암, 한라산 국립공원, 동문시장이 유명하며, 다양한 맛집과 카페도 즐길 수 있습니다.',
            image: 'picture/jeju_city.jpg',
            alt: '제주시 이미지'
        },
        'hallim': {
            title: '한림',
            description: '한림은 제주도 서쪽에 위치하며, 한림공원과 협재 해수욕장으로 유명합니다. 특히 금능 해변의 에메랄드빛 바다와 고즈넉한 풍경이 매력적입니다.',
            image: 'picture/hallim.jpg',
            alt: '한림 이미지'
        },
        'aewol': {
            title: '애월',
            description: '애월은 제주도 북서쪽에 자리 잡고 있으며, 해안 드라이브 코스로 유명합니다. 곽지 해수욕장과 애월 한담 해안 산책로에서 멋진 바다 풍경을 감상할 수 있습니다.',
            image: 'picture/aewol.jpg',
            alt: '애월 이미지'
        }, 
        //경북
        'gyeongju': {
            title: '경주',
            description: '경주는 천년 고도 신라의 수도로 도시 전체가 하나의 박물관이라 불릴만큼 풍부한 역사 유산을 간직한 곳입니다 불국사와 석굴암은 유네스코 세계 문화유산으로 지정되어 있으며 청성대,대릉원 등 고대 신라의 문명을 직접 느낄 수 있는 명소로 가득합니다.',
            image: 'picture/gyeongju.jpg',
            alt: '경주 이미지'
        },
        'andong': {
            title: '안동',
            description: '안동은 하회마을이 유네스코 세계문화유산으로 지정되어 있으며 조선시대의 서원이 그대로 보존되어 있습니다 안동국제탈춤페스티벌과 안동찜닭, 간고등어 등 지역 특산물도 유명합니다 한국 전통 정신문화와 풍속을 깊이 있게 체험 할 수 있는 귀중한 여행지입니다.',
            image: 'picture/andong.jpg',
            alt: '안동 이미지'
        },
        'pohang': {
            title: '포항',
            description: '포항은 대한민국 동해안의 대표 항구 도시로 산업과 해양 관광이 조화를 이루는 도시입니다 호미곶 해맞이광장은 한번도에서 해가 가장 먼저 뜨는 곳으로 매년 많은 관광객이 찾으며 죽도시장은 신선한 해산물과 지역 먹거리를 즐길 수 있는 명소입니다.',
            image: 'picture/pohang.jpg',
            alt: '포항 이미지'
        },
        'mungyeong': {
            title: '문경',
            description: '문경은 깊은 산세와 아름다운 자연경관으로 유명한 경북 내륙의 대표 관광도시입니다 문경새재는 옛길을 따라 걷는 트레킹 코스로 유명하며 주변의 전통 한옥 체험 마을과 도자기 체험 공간 철로 자전거 문명온천 등 관광 자원이 풍부해 가족 단위 여행객에게 안성맞춤인 지역입니다.',
            image: 'picture/mungyeong.jpg',
            alt: '문경 이미지'
        },
        //경남
        'jinhae': {
            title: '진해',
            description: ' 진해는 봄이 되면 진해 전역이 벚꽃으로 가득 차 아름다운 경관을 자랑하며 해군기자와 해군사관 학교가 위치해 있어 해군의 역사와 문화를 함께 느낄 수 있는 도시입니다 바다와 산이 어루어진 자연경관도 뛰어나고 군항제 기간에는 다양한 문화행사와 퍼레이드도 열려 가족 단위 관광객에게 인기가 많습니다.',
            image: 'picture/jinhae.jpg',
            alt: '경주 이미지'
        },
        'geoje island': {
            title: '거제도',
            description: '거제도는 경상남도에서 가장 큰 섬으로 깨끗한 해변과 푸른 바다 아름다운 산세가 어우러진 자연 휴양지입니다 인근에는 아름다운 해양 식물원으로 유명하며 관광객들이 많이 찾는 명소입니다',
            image: 'picture/geoje_island.jpg',
            alt: '거제도 이미지'
        },
        'tongyeong': {
            title: '통영',
            description: '통영은 다도해의 아름다운 섬과 해안선을 자랑하며 신선한 해산물 요리가 유명합니다 통영국제음악제 같은 행사가 열리고 동피랑 벽화마을 같은 예술적 명소도 있어 관광객들에게 인기가 많습니다 역사적으로는 해군기지가 있었던 곳입니다.',
            image: 'picture/tongyeong.jpg',
            alt: '통영 이미지'
        },
        'changwon': {
            title: '창원',
            description: '창원은 산업도시로서 기계 자동차 조선 등 다양한 제조업이 발달해 있으며 산과 바다가 가까워 자연과 도시가 조화를 이루고 있고 창원시립마산박물관, 마산가고파국화축제 등 다양한 문화행사와 관광 명소가 있습니다.',
            image: 'picture/changwon.jpg',
            alt: '창원 이미지'
        },
        //전북
        'jeonju': {
            title: '전주',
            description: '전주는 전통 한옥이 밀집해 있어 한국의 전통 가옥 음식 복식을 체험할 수 있는 명소입니다 비빔밥의 본고장으로 유명하며 한지,전통술,판소리 등 다양한 전통문화 콘텐츠를 체험할 수 있어 외국인 관광객들에게도 인기가 많습니다.',
            image: 'picture/jeonju.jpg',
            alt: '전주 이미지'
        },
        'gunsan': {
            title: '군산',
            description: '군산은 서해안에 위치한 항구 도시로 일제강점기의 건축물과 역사가 고스란히 남아있는 도시입니다 근대문화유산이 잘 보존된 도시로 옛 철길 일본식 건물 동국사 히로쓰 가옥 등 역사적 건축물이 관광지로 개발되어 있습니다 군산은 또한 신선한 해산물과 군산 짬뽕 이성당 빵집 같은 먹거리로도 유명하며 고군산군도 섬 여행도 인기입니다.',
            image: 'picture/gunsan.jpg',
            alt: '군산 이미지'
        },
        'iksan': {
            title: '익산',
            description: '익산은 예부터 백제의 주요 도시였으며 유네스코 세계문화유산인 미륵사지와 왕궁리 유적을 중심으로 고대 백제 문화를 느낄 수 있는 도시입니다 미륵사지 석탑은 한국 석탑 가운데 가장 오래되고 큰 석탑으로 유명하며 주변에는 미륵사지 유물전시관도 잘 갖추어져 있습니다 매년 열리는 익산 보석대축제도 많은 사람들의 관심을 끕니다.',
            image: 'picture/iksan.jpg',
            alt: '익산 이미지'
        },
        'muju': {
            title: '무주',
            description: '무주는 자연 관광과 겨울 레저의 중심으로 무주덕유산리조트는 겨울에는 스키장 여름에는 휴양지로 각광 받으며 덕유산의 수려한 자연 경관은 등산객에게도 인기가 많습니다 설천봉에서도 향적봉에까지 이어지는 능선 트레킹 코스는 눈꽃 산행지로도 유명합니다.',
            image: 'picture/muju.jpg',
            alt: '무주 이미지'
        },
        //전남
        'suncheon': {
            title: '순천',
            description: '순천은 생태 관광의 중심지로 자연환경과 도시가 조화를 대표적인 친환경 도시입니다 순천만 습지와 순천만 국가정원이 유명하며 다양한 테마 정원과 문화시설이 어루어진 도심 속 쉼터입니다.',
            image: 'picture/suncheon.jpg',
            alt: '순천 이미지'
        },
        'yeosu': {
            title: '여수',
            description: '여수는 전라남도 남해안에 위치한 아름다운 바다와 야경으로 유명한 항구 도시입니다 특히 여수밤바다는 아름다운 야경과 해양 문화 축제로 많은 관광객을 끌어모으는 명소로 낭만적인 분위기를 느낄 수 있습니다.',
            image: 'picture/yeosu.jpg',
            alt: '여수 이미지'
        },
        'mokpo': {
            title: '목포',
            description: '목포는 전라남도 서남부에 위치한 항구 도시로 맛있는 해산물이 유명한데 세발낙지 홍어삼합 민어 요리 등 지역 특색 있는 해산물 음식이 많습니다 유달산, 갓바위, 목포해상케이블카 등의 자연 명소도 함께 즐길 수 있습니다.',
            image: 'picture/mokpo.jpg',
            alt: '목포 이미지'
        },
        'wando': {
            title: '완도',
            description: '완도는 전라남도 남쪽 끝에 위치한 청정 해양 관광지이자 해조류의 고장입니다 청보리밭길과 돌담길 등 걷기 좋은 트레킹 코스가 많습니다 완도는 전복, 다시마, 미역 등 해조류 양식이 활발한 지역으로 깨끗한 바다에서 나오는 해산물과 건강식품으로도 널리 알려져 있습니다.',
            image: 'picture/wando.jpg',
            alt: '완도 이미지'
        },
        //경기도
        'suwon': {
            title: '수원',
            description: '수원은 유네스코세계문화유산인 웅장하고 아름다운 수원화성을 중심으로 역사적인 매력이 가득한 도시입니다. 활기 넘치는 팔달문 시장에서 다양한 먹거리와 볼거리를 즐길 수 있고, 현대적인 쇼핑몰과 편리한 교통까지 갖춰져 있는 것이 큰 매력입니다.',
            image: 'picture/suwon.jpg',
            alt: '수원 이미지'
        },
        'gapyeong': {
            title: '가평',
            description: '가평은 맑은 자연과 레저 활동으로 유명한 관광지입니다. 남이섬, 아침고요수목원, 쁘띠프랑스 등 낭만적인 명소와 계곡, 래프팅 등 야외 활동이 풍부합니다.',
            image: 'picture/gapyeong.jpg',
            alt: '가평 이미지'
        },
        'paju': {
            title: '파주',
            description: '파주는 출판단지와 헤이리 예술마을로 문화적 매력을 뽐내는 도시입니다. 임진각과 DMZ 투어로 역사적 의미를 느낄 수 있으며, 프로방스 마을과 같은 이색적인 명소도 인기입니다.',
            image: 'picture/paju.jpg',
            alt: '파주 이미지'
        },
        'yangpyeong': {
            title: '양평',
            description: '양평은 서울 근교의 자연 친화적 휴양지로, 두물머리와 세미원, 용문사 등 아름다운 자연과 전통이 어우러진 명소가 많습니다. 자전거 길과 지역 특산물도 관광객을 끌어모읍니다.',
            image: 'picture/yangpyeong.jpg',
            alt: '양평 이미지'
        },
        //강원도
        'gangneung': {
            title: '강릉',
            description: '강릉은 푸른 등해 바다와 울창한 산을 동시에 만끽할 수 있는 아름다운 도시 입니다. 역사, 문화, 자연을 아우르는 다양한 볼거리가 있고, 안목해변 거리에서 특별한 분위기가 매력적입니다.',
            image: 'picture/gangneung.jpg',
            alt: '강릉 이미지'
        },
        'sokcho': {
            title: '속초',
            description: '속초는 설악산 국립공원과 동해 바다를 품은 자연 관광지입니다. 속초 중앙시장의 먹거리와 대포항의 신선한 해산물, 설악산 케이블카로 유명하며, 자연과 미식이 조화를 이룹니다.',
            image: 'picture/sokcho.jpg',
            alt: '속초 이미지'
        },
        'pyeongchang': {
            title: '평창',
            description: '평창은 2018 동계올림픽 개최지로, 알펜시아와 용평리조트 등 겨울 스포츠 명소가 많습니다. 대관령 양떼목장과 한옥마을, 맑은 자연 환경으로 사계절 관광지로 사랑받습니다.',
            image: 'picture/pyeongchang.jpg',
            alt: '평창 이미지'
        },
        'chuncheon': {
            title: '춘천',
            description: '춘천은 남이섬과 소양강, 춘천호를 중심으로 한 낭만적인 호수 도시입니다. 닭갈비와 막국수로 유명하며, 레일바이크와 같은 레저 활동으로 가족 단위 관광객에게 인기입니다.',
            image: 'picture/chuncheon.jpg',
            alt: '춘천 이미지'
        },
        //충남
        'hongseong': {
            title: '홍성',
            description: '싱싱한 해산물과 맛있는 먹거리가 가득해서 입이 즐겁고 바다와 아름다운 풍경을 보며 기분 전환하기 좋은 장소입니다.',
            image: 'picture/hongseong.jpg',
            alt: '홍성 이미지'
        },
        'dangjin': {
            title: '당진',
            description: '당진은 서해안의 청정 바다와 역사 유적이 매력적인 도시입니다. 솔뫼성지, 면천읍성, 삽교호 관광지와 함께 두견주, 백련막걸리 등 지역 특산주를 체험할 수 있습니다. 안섬포구와 왜목마을의 일출, 일몰도 놓칠 수 없습니다.',
            image: 'picture/dangjin.jpg',
            alt: '당진 이미지'
        },
        'cheonan': {
            title: '천안',
            description: '천안은 교통의 요지로, 독립기념관과 외암민속마을이 대표적인 관광지입니다. 흥타령쌀과 같은 지역 특산물, 천안빵소의 먹거리, 지중해마을의 이국적인 분위기로 다양한 매력을 제공합니다.',
            image: 'picture/cheonan.jpg',
            alt: '천안 이미지'
        },
        'buyeo': {
            title: '부여',
            description: '부여는 백제의 고도로, 궁남지, 백제문화단지, 국립부여박물관 등 역사 유적이 풍부합니다. 능산리 고분군과 부소산성은 역사 속 산책 코스로, 부여 연꽃빵과 구드래국밥 등 전통 먹거리도 인기를 끌고 있습니다.',
            image: 'picture/buyeo.jpg',
            alt: '부여 이미지'
        },
        //충북
        'jecheon': {
            title: '제천',
            description: '제천은 푸른 청풍호와 수려한 월악산이 어우러진 아름다운 지역을 만끽 할 수 있는 곳 입니다. 의림지와 같은 역사적인 명소에서 여유를 즐길 수 도 있으며, 약초 시장 등 특색 있는 볼거리도 풍부합니다. 자연과 문화를 동시에 즐길 수 있는 것이 큰 매력입니다.',
            image: 'picture/jecheon.jpg',
            alt: '제천 이미지'
        },
        'danyang': {
            title: '단양',
            description: '단양은 남한강과 소백산이 어우러진 자연 관광지로, 단양팔경과 도담삼봉이 대표적입니다. 만천하스카이워크와 고수동굴은 모험과 탐험을 즐기는 관광객에게 큰 매력을 제공합니다.',
            image: 'picture/danyang.jpg',
            alt: '단양 이미지'
        },
        'boeun': {
            title: '보은',
            description: '보은은 속리산 국립공원과 법주사를 중심으로 한 자연과 불교 문화의 도시입니다. 삼년산성과 정이품송 등 역사 유적과 함께, 대추와 같은 지역 특산물로도 잘 알려져 있습니다.',
            image: 'picture/boeun.jpg',
            alt: '보은 이미지'
        },
        'chungju': {
            title: '충주',
            description: '충주는 충주호와 탄금대가 있는 호수의 도시로, 수상 스포츠와 레저 활동이 활발합니다. 중원탑평리칠층석탑과 지역 특산물인 사과, 고구마로 유명하며, 자연과 역사를 함께 즐길 수 있습니다.',
            image: 'picture/chungju.jpg',
            alt: '충주 이미지'
        },
        //부산
        'haeundae': {
            title: '해운대',
            description: '해운대는 부산의 대표적인 해변 지역으로, 넓은 백사장과 고층 빌딩이 어우러진 현대적인 분위기가 특징입니다. 여름철 해수욕과 겨울철 야경이 특히 매력적이며, 다양한 레스토랑과 카페가 즐비합니다.',
            image: 'picture/haeundae.jpg',
            alt: '해운대 지역 이미지'
        },
        'gwangalli': {
            title: '광안리',
            description: '광안리는 광안대교의 화려한 야경으로 유명한 해변 지역입니다. 트렌디한 카페와 바가 많아 젊은이들에게 인기 있으며, 해변 산책과 함께 다양한 해산물 요리를 즐길 수 있습니다.',
            image: 'picture/gwangalli.jpg',
            alt: '광안리 지역 이미지'
        },
        'suyeong': {
            title: '수영',
            description: '수영은 역사와 현대가 공존하는 지역으로, 수영사적공원과 같은 유적지와 함께 현대적인 상점가가 조화를 이룹니다. 지역 축제와 먹거리 골목도 관광객들에게 인기가 많습니다.',
            image: 'picture/suyeong.jpg',
            alt: '수영 지역 이미지'
        },
        'yeonje': {
            title: '연제',
            description: '연제는 부산의 중심부에 위치한 주거 및 상업 지역으로, 부산시민공원과 가까워 여유로운 산책을 즐길 수 있습니다. 지역 내 다양한 로컬 맛집과 쇼핑 시설이 매력적입니다.',
            image: 'picture/yeonje.jpg',
            alt: '연제 지역 이미지'
        },
        //울산
        'namgu': {
            title: '남구',
            description: '남구는 울산의 중심 지역으로, 울산대공원과 태화강 국가정원이 위치해 자연과 도시가 조화를 이룹니다. 신선한 해산물 요리와 현대적인 쇼핑몰도 큰 매력입니다.',
            image: 'picture/namgu.jpg',
            alt: '남구 지역 이미지'
        },
        'junggu': {
            title: '중구',
            description: '중구는 울산의 전통과 현대가 공존하는 지역으로, 성남동 젊음의 거리와 울산 중앙시장이 활기찬 분위기를 제공합니다. 다양한 먹거리와 쇼핑이 즐거움을 더합니다.',
            image: 'picture/jungu_4.jpg',
            alt: '중구 지역 이미지'
        },
        'donggu': {
            title: '동구',
            description: '동구는 울산의 해안 지역으로, 대왕암공원과 일산 해변이 있어 바다 풍경을 즐기기에 최적입니다. 해양 스포츠와 신선한 회 요리도 큰 인기를 끌고 있습니다.',
            image: 'picture/donggu.jpg',
            alt: '동구 지역 이미지'
        },
        'bukgu': {
            title: '북구',
            description: '북구는 울산의 산업과 자연이 어우러진 지역으로, 강동 해변과 천마산의 등산로가 유명합니다. 조용한 휴식과 야외 활동을 즐기기에 좋은 곳입니다.',
            image: 'picture/bukgu.jpg',
            alt: '북구 지역 이미지'
        },
        //세종
        'jochiwon': {
            title: '조치원',
            description: '조치원은 세종시의 역사적인 중심지로, 조치원 전통시장과 세종호수공원이 위치해 있습니다. 전통과 현대가 어우러진 분위기에서 맛있는 로컬 음식을 즐길 수 있습니다.',
            image: 'picture/jochiwon.jpg',
            alt: '조치원 지역 이미지'
        },
        'geumnam': {
            title: '금남',
            description: '금남은 세종시의 남쪽에 위치한 지역으로, 금강변의 아름다운 풍경과 산책로가 매력적입니다. 자연 속에서 여유로운 시간을 보내기에 적합한 곳입니다.',
            image: 'picture/geumnam_2.jpg',
            alt: '금남 지역 이미지'
        },
        'yeongi': {
            title: '연기',
            description: '연기는 세종시의 행정 중심지로, 정부세종청사와 국립세종수목원이 자리 잡고 있습니다. 현대적인 도시 풍경과 함께 자연을 즐길 수 있는 지역입니다.',
            image: 'picture/yeongi.jpg',
            alt: '연기 지역 이미지'
        },
        'boram': {
            title: '보람',
            description: '보람은 세종시의 신도시 지역으로, 세종호수공원과 인접해 있어 가족 단위 나들이에 적합합니다. 카페와 레스토랑이 많아 여유로운 분위기를 제공합니다.',
            image: 'picture/boram.jpg',
            alt: '보람 지역 이미지'
        },
        //서울
        'gangnam': {
            title: '강남',
            description: '강남은 서울의 현대적인 중심지로, 고층 빌딩과 럭셔리 쇼핑몰, 트렌디한 카페와 레스토랑이 즐비합니다. COEX몰의 별마당 도서관과 강남역 주변의 활기찬 밤문화를 즐길 수 있습니다.',
            image: 'picture/gangnam.jpg',
            alt: '강남 지역 이미지'
        },
        'myeongdong': {
            title: '명동',
            description: '명동은 서울의 대표적인 쇼핑과 먹거리 중심지로, 다양한 화장품 매장과 길거리 음식이 유명합니다. 밤에는 화려한 네온사인과 활기찬 분위기가 매력적입니다.',
            image: 'picture/myeongdong.jpg',
            alt: '명동 지역 이미지'
        },
        'hongdae': {
            title: '홍대',
            description: '홍대는 젊음과 예술의 거리로, 독특한 카페, 거리 공연, 벽화 골목이 가득합니다. 젊은이들에게 인기 있는 클럽과 라이브 음악 공연장도 큰 매력입니다.',
            image: 'picture/hongdae.jpg',
            alt: '홍대 지역 이미지'
        },
        'itaewon': {
            title: '이태원',
            description: '이태원은 다문화적인 분위기로 유명한 지역으로, 다양한 국제 요리 레스토랑과 바가 있습니다. 경리단길과 해방촌의 트렌디한 분위기도 큰 인기를 끌고 있습니다.',
            image: 'picture/itaewon.jpg',
            alt: '이태원 지역 이미지'
        },
        //인천
        'songdo': {
            title: '송도',
            description: '송도는 인천의 현대적인 신도시로, 센트럴파크와 고층 빌딩의 스카이라인이 인상적입니다. 해양 레저와 국제적인 레스토랑을 즐길 수 있는 지역입니다.',
            image: 'picture/songdo.jpg',
            alt: '송도 지역 이미지'
        },
        'yeonsu': {
            title: '연수',
            description: '연수는 송도와 인접한 지역으로, 인천 상륙작전 기념관과 다양한 공원이 있습니다. 조용한 주거지와 함께 자연을 즐기기에 좋은 곳입니다.',
            image: 'picture/yeonsu.jpg',
            alt: '연수 지역 이미지'
        },
        'bupyeong': {
            title: '부평',
            description: '부평은 인천의 상업 중심지로, 부평 지하상가와 다양한 먹거리 골목이 활기찬 분위기를 제공합니다. 부평 시장의 로컬 음식도 큰 매력입니다.',
            image: 'picture/bupyeong.jpg',
            alt: '부평 지역 이미지'
        },
        'jungu': {
            title: '중구',
            description: '중구는 인천 차이나타운과 월미도가 위치한 지역으로, 독특한 문화와 바다 풍경을 즐길 수 있습니다. 월미도 유람선과 해산물 요리가 인기입니다.',
            image: 'picture/jungu_3.jpg',
            alt: '중구 지역 이미지'
        },
        //광주
        'sangmu': {
            title: '상무',
            description: '상무는 광주의 현대적인 상업 중심지로, 세련된 카페와 레스토랑, 대형 쇼핑몰이 위치해 있습니다. 5·18 기념공원과도 가까워 역사와 현대를 함께 느낄 수 있습니다.',
            image: 'picture/sangmu.jpg',
            alt: '상무 지역 이미지'
        },
        'dongmyeong': {
            title: '동명',
            description: '동명은 광주의 예술과 문화 중심지로, 동명동 카페 거리와 아트 갤러리가 유명합니다. 트렌디한 분위기와 함께 지역 예술을 경험할 수 있습니다.',
            image: 'picture/dongmyeong.jpg',
            alt: '동명 지역 이미지'
        },
        'chungjang': {
            title: '충장',
            description: '충장은 광주의 전통과 현대가 어우러진 지역으로, 충장로 쇼핑 거리와 다양한 먹거리가 있고 매년 열리는 충장 축제가 있습니다. 밤에는 화려한 거리 분위기가 매력적입니다.',
            image: 'picture/chungjang.jpg',
            alt: '충장 지역 이미지'
        },
        'geumnam': {
            title: '금남',
            description: '금남은 광주의 중심지로, 금남로와 국립아시아문화전당이 위치해 있습니다. 문화 행사와 전통 시장을 즐기기에 좋은 지역입니다.',
            image: 'picture/geumnam.jpg',
            alt: '금남 지역 이미지'
        },
        //대구
        'dongseongno': {
            title: '동성로',
            description: '동성로는 대구의 젊음과 활기가 넘치는 중심지로, 다양한 쇼핑몰과 레스토랑, 카페가 있습니다. 밤에는 거리 공연과 화려한 조명이 매력적입니다.',
            image: 'picture/dongseongno.jpg',
            alt: '동성로 지역 이미지'
        },
        'suseong': {
            title: '수성',
            description: '수성은 대구의 고급 주거와 상업 지역으로, 수성못과 어린이회관이 위치해 있습니다. 가족 단위 나들이와 여유로운 산책을 즐기기에 좋습니다.',
            image: 'picture/suseong.jpg',
            alt: '수성 지역 이미지'
        },
        'jungu': {
            title: '중구',
            description: '중구는 대구의 전통과 현대가 공존하는 지역으로, 서문시장과 근대골목이 유명합니다. 전통 음식과 역사 탐방을 즐길 수 있습니다.',
            image: 'picture/jungu_2.jpg',
            alt: '중구 지역 이미지'
        },
        'dalseo': {
            title: '달서',
            description: '달서는 대구의 주거 중심지로, 두류공원과 이월드의 야경이 매력적입니다. 다양한 레저 활동과 지역 축제를 즐길 수 있는 곳입니다.',
            image: 'picture/dalseo.jpg',
            alt: '달서 지역 이미지'
        },
        //대전
        'dunsan': {
            title: '둔산',
            description: '둔산은 대전의 현대적인 중심지로, 둔산 대공원과 정부청사가 위치해 있습니다. 세련된 카페와 레스토랑에서 도시의 활기를 느낄 수 있습니다.',
            image: 'picture/dunsan.jpg',
            alt: '둔산 지역 이미지'
        },
        'yuseong': {
            title: '유성',
            description: '유성은 온천과 과학 연구 단지로 유명한 지역으로, 유성온천과 국립중앙과학관, 유림공원이 있습니다. 휴식과 교육적인 여행을 즐기기에 좋습니다.',
            image: 'picture/yuseong.jpg',
            alt: '유성 지역 이미지'
        },
        'jungu': {
            title: '중구',
            description: '중구는 대전의 전통과 현대가 공존하는 중심지로, 명물 빵집 성심당이 위치해 있습니다. 1956년에 시작된 성심당은 튀김소보로와 판타롱 부추빵으로 전국적인 인기를 끌고 있으며, 대전 여행의 필수 코스로 꼽힙니다.',
            image: 'picture/jungu_1.jpg',
            alt: '성심당 외관 이미지'
        },
        'seogu': {
            title: '서구',
            description: '서구는 대전의 자연과 레저를 즐길 수 있는 지역으로, 한밭수목원과 갑천변 산책로가 있습니다. 조용한 휴식과 야외 활동에 적합합니다.',
            image: 'picture/seogu_1.jpg',
            alt: '서구 지역 이미지'
        },
    };

    // 버튼 클릭 이벤트 추가
    if (regionButtons.length && regionTitle && regionDescription && regionImage) {
        regionButtons.forEach(button => {
            button.addEventListener('click', () => {
                // 모든 버튼에서 active 클래스 제거
                regionButtons.forEach(btn => btn.classList.remove('active'));
                // 클릭된 버튼에 active 클래스 추가
                button.classList.add('active');

                // 선택된 지역 데이터 가져오기
                const region = button.getAttribute('data-region');
                const data = regionData[region];

                // 내용 업데이트
                if (data) {
                    regionTitle.textContent = data.title;
                    regionDescription.textContent = data.description;
                    regionImage.src = data.image;
                    regionImage.alt = data.alt;
                }
            });
        });
    } else {
        console.error('지역 메뉴 요소를 찾을 수 없습니다.');
    }
});

function initializeMap() {
    const mapOptions = {
        center: new naver.maps.LatLng(37.5665, 126.9780), // 서울 중심
        zoom: 13
    };
    const map = new naver.maps.Map('map', mapOptions);
}