// Отладочный скрипт для проверки загрузки контактов
console.log('=== Отладка загрузки контактов ===');

// Проверка доступности данных
console.log('1. Проверка доступности contactsData:', window.contactsData ? '✅ Доступен' : '❌ Недоступен');
console.log('2. Тип contactsData:', typeof window.contactsData);
console.log('3. contactsData является массивом:', Array.isArray(window.contactsData));

if (window.contactsData) {
    console.log('4. Количество контактов:', window.contactsData.length);
    console.log('5. Первый контакт:', window.contactsData[0] || 'Нет данных');
    console.log('6. Структура первого контакта:', window.contactsData[0] ? Object.keys(window.contactsData[0]) : 'N/A');
} else {
    console.log('4-6. Данные контактов отсутствуют');
}

// Проверка DOM элементов
console.log('\n=== Проверка DOM элементов ===');
console.log('7. contacts-desktop элемент:', document.getElementById('contacts-desktop') ? '✅ Найден' : '❌ Не найден');
console.log('8. contacts-table-body элемент:', document.getElementById('contacts-table-body') ? '✅ Найден' : '❌ Не найден');
console.log('9. contacts-mobile элемент:', document.getElementById('contacts-mobile') ? '✅ Найден' : '❌ Не найден');

// Проверка загрузки скриптов
console.log('\n=== Проверка загрузки скриптов ===');
console.log('10. ContactsTable класс:', typeof window.ContactsTable !== 'undefined' ? '✅ Загружен' : '❌ Не загружен');
console.log('11. ContactsCards класс:', typeof window.ContactsCards !== 'undefined' ? '✅ Загружен' : '❌ Не загружен');

// Проверка текущей страницы
console.log('\n=== Проверка текущего состояния ===');
console.log('12. Текущий хэш:', window.location.hash);
console.log('13. Текущая страница (state):', window.state?.currentPage || 'N/A');

// Проверка ошибок в консоли
console.error = function(...args) {
    console.log('\n❌ ОШИБКА:', ...args);
};

// Проверка сетевых запросов
console.log('\n=== Проверка сетевых запросов ===');
console.log('14. Все скрипты загружены:', document.readyState);

// Дополнительная проверка после полной загрузки
window.addEventListener('load', function() {
    console.log('\n=== После полной загрузки ===');
    setTimeout(() => {
        console.log('15. contactsData после загрузки:', window.contactsData ? window.contactsData.length : 'Нет данных');
        console.log('16. contacts-desktop после загрузки:', document.getElementById('contacts-desktop') ? '✅ Найден' : '❌ Не найден');
    }, 1000);
});

// Авоматическая проверка при переходе на страницу контактов
window.addEventListener('hashchange', function() {
    if (window.location.hash === '#contacts') {
        console.log('\n=== Переход на страницу контактов ===');
        setTimeout(() => {
            console.log('17. Данные после перехода:', window.contactsData ? window.contactsData.length : 'Нет данных');
            console.log('18. Элементы таблицы после перехода:', {
                desktop: document.getElementById('contacts-desktop') ? '✅' : '❌',
                mobile: document.getElementById('contacts-mobile') ? '✅' : '❌'
            });
        }, 500);
    }
});
