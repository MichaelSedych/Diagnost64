document.addEventListener('DOMContentLoaded', () => {
    
    /* -------------------------------------------
       1. ЛОГИКА СЛАЙДЕРА (CAROUSEL)
    ------------------------------------------- */
    const track = document.querySelector('.slider__track');
    // Превращаем NodeList в Array для удобства
    const items = Array.from(document.querySelectorAll('.slider__item')); 
    
    if (track && items.length > 0) {
        let currentIndex = 0; // Индекс активного слайда

        function updateSlider() {
            // А. Сбрасываем активный класс у всех
            items.forEach(item => item.classList.remove('active'));
            
            // Б. Назначаем активный класс текущему слайду
            const activeSlide = items[currentIndex];
            activeSlide.classList.add('active');

            // В. Вычисляем смещение трека для центрирования активного слайда
            // Центр видимой области слайдера (контейнера)
            const containerCenter = track.parentElement.offsetWidth / 2;
            
            // Центр самого слайда (половина его ширины)
            const slideCenter = activeSlide.offsetWidth / 2;
            
            // Позиция левого края слайда относительно начала трека
            const slideLeftPos = activeSlide.offsetLeft;
            
            // Формула сдвига: (ЦентрКонтейнера) - (ПозицияСлайда + ПоловинаШирины)
            // Это двигает трек так, чтобы центр слайда совпал с центром экрана
            const moveAmount = containerCenter - (slideLeftPos + slideCenter);

            track.style.transform = `translateX(${moveAmount}px)`;
        }

        // Г. Вешаем события клика на каждый слайд
        items.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
            });
        });

        // Д. Инициализация при загрузке (с задержкой для рендера CSS)
        setTimeout(updateSlider, 100);

        // Е. Пересчет при изменении размера окна (чтобы центр не сбивался)
        window.addEventListener('resize', () => {
            requestAnimationFrame(updateSlider);
        });
    }

    /* -------------------------------------------
       2. ПЛАВНЫЙ СКРОЛЛ К ЯКОРЯМ
    ------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Отменяем стандартный резкий прыжок
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Высота шапки + небольшой отступ
                const headerOffset = 100; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

});
