// Смена темы
document.getElementById('themeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    this.textContent = document.body.classList.contains('dark-theme') 
        ? 'Светлая тема' 
        : 'Тёмная тема';
});

// Кнопка "Наверх"
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Аккордеон
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
        const content = this.nextElementSibling;
        const icon = this.querySelector('.accordion-icon');
        
        // Закрываем все открытые элементы
        document.querySelectorAll('.accordion-content').forEach(item => {
            if (item !== content) {
                item.classList.remove('active');
            }
        });
        
        document.querySelectorAll('.accordion-icon').forEach(item => {
            if (item !== icon) {
                item.textContent = '+';
            }
        });
        
        // Переключаем текущий элемент
        content.classList.toggle('active');
        icon.textContent = content.classList.contains('active') ? '−' : '+';
    });
});

// Фильтрация галереи
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Убираем активный класс у всех кнопок
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Добавляем активный класс текущей кнопке
        this.classList.add('active');
        
        const category = this.getAttribute('data-category');
        
        galleryItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Модальное окно для галереи
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const modalClose = document.querySelector('.modal-close');

galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        modal.style.display = 'block';
        modalImage.src = img.src;
        modalCaption.textContent = img.alt;
    });
});

modalClose.addEventListener('click', function() {
    modal.style.display = 'none';
});

modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Плавная прокрутка для навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Наблюдаем за элементами для анимации
document.querySelectorAll('.skill-card, .gallery-item, .accordion-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

console.log('JavaScript успешно загружен! Все функции активны.');