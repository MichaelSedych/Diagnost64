document.addEventListener('DOMContentLoaded', () => {
    
    // Массив с вашими локальными картинками
    const images = [
        "img/1-ref.png",
        "img/2-ref.png",
        "img/3-ref.png",
        "img/4-ref.png"
    ];
    
    let currentIndex = 0;
    const imgElement = document.getElementById('sliderImage');
    const dotsContainer = document.getElementById('sliderDots');

    // Генерация точек навигации
    images.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => { currentIndex = index; updateSlider(); });
        dotsContainer.appendChild(dot);
    });
    const dots = document.querySelectorAll('.slider-dot');

    // Функция обновления слайдера
    function updateSlider() {
        imgElement.classList.add('fade');
        setTimeout(() => {
            imgElement.src = images[currentIndex];
            setTimeout(() => imgElement.classList.remove('fade'), 50);
        }, 200);
        dots.forEach(d => d.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }

    // Обработчики кнопок
    document.getElementById('nextBtn').addEventListener('click', () => {
        currentIndex++; if (currentIndex >= images.length) currentIndex = 0;
        updateSlider();
    });
    document.getElementById('prevBtn').addEventListener('click', () => {
        currentIndex--; if (currentIndex < 0) currentIndex = images.length - 1;
        updateSlider();
    });
    
    // Загрузка первой картинки
    imgElement.src = images[0];

    // --- БУРГЕР МЕНЮ ---
    const burgerBtn = document.getElementById('burgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.header__link');

    burgerBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const spans = burgerBtn.querySelectorAll('span');
        
        // Анимация крестика
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Закрытие при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = burgerBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
});
