// script.js
// Обновлённый код для многостраничности
function initRouter() {
    const pages = document.querySelectorAll('.page');
    const navItems = document.querySelectorAll('.nav-item');

    function showPage(pageId) {
        pages.forEach(page => {
            page.classList.remove('active');
            if(page.id === pageId) {
                page.classList.add('active');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if(item.dataset.page === pageId) {
                item.classList.add('active');
            }
        });
    }

    function handleHashChange() {
        const pageId = location.hash.split('/')[1] || 'home';
        showPage(pageId);
    }

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
}

// Обновлённый календарь
function initDatePicker() {
    const dateInputs = document.querySelectorAll('[data-date-input]');
    
    dateInputs.forEach(input => {
        input.addEventListener('click', () => {
            document.getElementById('calendarModal').style.display = 'block';
        });
    });

    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('calendarModal').style.display = 'none';
    });

    window.onclick = function(event) {
        if(event.target == document.getElementById('calendarModal')) {
            document.getElementById('calendarModal').style.display = 'none';
        }
    }

    document.getElementById('datePicker').addEventListener('change', function(e) {
        // Обработка выбранной даты
        document.getElementById('calendarModal').style.display = 'none';
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    initRouter();
    initDatePicker();
    // Остальная инициализация
});
