// Фикс для загрузки данных контактов
(function() {
    'use strict';

    // Проверяем наличие данных каждые 100мс
    const checkDataInterval = setInterval(() => {
        if (window.contactsData && Array.isArray(window.contactsData)) {
            console.log('✅ Данные контактов загружены:', window.contactsData.length);
            clearInterval(checkDataInterval);
            initializeContacts();
        } else {
            console.log('⏳ Ожидание загрузки данных контактов...');
        }
    }, 100);

    // Функция инициализации контактов
    function initializeContacts() {
        // Проверяем, что мы на странице контактов
        if (window.location.hash === '#contacts') {
            console.log('📋 Инициализация компонентов контактов...');

            // Ждем полной загрузки DOM
            setTimeout(() => {
                initializeContactComponents();
            }, 500);
        }
    }

    // Функция инициализации компонентов контактов
    function initializeContactComponents() {
        console.log('🔄 Инициализация компонентов контактов...');

        if (!window.contactsData || !Array.isArray(window.contactsData)) {
            console.error('❌ Данные контактов отсутствуют');
            return;
        }

        // Инициализируем компонент для десктопной таблицы
        if (window.ContactsTable && document.getElementById('contacts-desktop')) {
            window.contactsTable = new window.ContactsTable();
            window.contactsTable.renderContacts(window.contactsData);
            console.log('✅ Десктопная таблица инициализирована');
        }

        // Мобильные карточки пока не реализованы
        // TODO: Добавить компонент ContactsCards для мобильной версии

        console.log('✅ Все компоненты контактов инициализированы');
    }

    // Обработчик изменения хэша
    window.addEventListener('hashchange', () => {
        if (window.location.hash === '#contacts') {
            setTimeout(() => {
                initializeContactComponents();
            }, 300);
        }
    });

    // Резервный вариант: загрузка данных напрямую, если модуль не сработал
    if (!window.contactsData) {
        console.log('🔄 Попытка загрузки данных напрямую...');

        // Создаем script для загрузки contacts.js напрямую
        const script = document.createElement('script');
        script.src = 'data/contacts.js';
        script.onload = () => {
            console.log('✅ contacts.js загружен напрямую');
            if (window.contactsData) {
                initializeContactComponents();
            }
        };
        document.head.appendChild(script);
    }

    console.log('🔧 Фикс для загрузки контактов инициализирован');
})();