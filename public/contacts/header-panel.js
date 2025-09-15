// Компонент верхней панели контактов с использованием shadcn/ui
class ContactsHeaderPanel {
    constructor() {
        this.initializeComponents();
        this.bindEvents();
    }

    initializeComponents() {
        this.renderActionButtons();
        this.renderFilterTabs();
        this.renderSearchPanel();
    }

    renderActionButtons() {
        const actionsContainer = document.getElementById('contacts-actions');
        if (!actionsContainer) return;

        // Создаем кнопки с использованием обычных button элементов
        const importButton = document.createElement('button');
        importButton.className = 'px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500';
        importButton.textContent = 'Импорт';
        importButton.id = 'import-contacts-btn';

        const messageButton = document.createElement('button');
        messageButton.className = 'px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed';
        messageButton.textContent = 'Сообщение';
        messageButton.disabled = true;
        messageButton.id = 'bulk-send-message-btn';

        const addButton = document.createElement('button');
        addButton.className = 'px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500';
        addButton.textContent = 'Добавить';
        addButton.id = 'add-contact-btn';

        actionsContainer.appendChild(importButton);
        actionsContainer.appendChild(messageButton);
        actionsContainer.appendChild(addButton);
    }

    renderFilterTabs() {
        const tabsContainer = document.getElementById('contacts-filter-tabs');
        if (!tabsContainer) return;

        const filterOptions = [
            { status: 'all', label: 'All', active: true },
            { status: 'new', label: 'New' },
            { status: 'contacted', label: 'Contacted' },
            { status: 'qualified', label: 'Qualified' },
            { status: 'deal-in-progress', label: 'Deal in progress' },
            { status: 'rejected', label: 'Rejected' }
        ];

        filterOptions.forEach(option => {
            const badge = Badge.create({
                variant: option.active ? 'default' : 'secondary',
                size: 'sm',
                className: `cursor-pointer transition-colors hover:opacity-80 ${
                    option.active ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`,
                children: option.label
            });

            badge.classList.add('contact-filter-tab');
            badge.dataset.status = option.status;

            tabsContainer.appendChild(badge);
        });
    }

    renderSearchPanel() {
        const searchContainer = document.getElementById('contacts-search-panel');
        if (!searchContainer) return;

        // Поле поиска
        const searchInput = Input.create({
            type: 'text',
            placeholder: 'Поиск контактов...',
            className: 'w-full sm:w-64'
        });
        searchInput.id = 'contacts-search';

        // Селект источников
        const sourceSelect = Select.create({
            options: [
                { value: 'all', label: 'Все источники' },
                { value: 'website', label: 'Сайт' },
                { value: 'referral', label: 'Рекомендация' },
                { value: 'social', label: 'Соц. сети' },
                { value: 'advertising', label: 'Реклама' },
                { value: 'cold-call', label: 'Холодный звонок' }
            ],
            defaultValue: 'all'
        });
        sourceSelect.id = 'source-filter';

        searchContainer.appendChild(searchInput);
        searchContainer.appendChild(sourceSelect);
    }

    bindEvents() {
        // Обработчик для табов фильтрации
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('contact-filter-tab')) {
                this.handleFilterTabClick(e.target);
            }
        });

        // Обработчик для кнопки импорта
        document.addEventListener('click', (e) => {
            if (e.target.id === 'import-contacts-btn') {
                document.getElementById('import-file-input').click();
            }
        });

        // Обработчик для поиска
        const searchInput = document.getElementById('contacts-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // Обработчик для фильтра источников
        const sourceFilter = document.getElementById('source-filter');
        if (sourceFilter) {
            sourceFilter.addEventListener('change', (e) => {
                this.handleSourceFilter(e.target.value);
            });
        }

        // Обработчик для изменения выбора контактов
        document.addEventListener('contacts-selection-changed', (e) => {
            this.updateMessageButtonState(e.detail.count);
        });
    }

    handleFilterTabClick(clickedTab) {
        // Убираем активное состояние со всех табов
        document.querySelectorAll('.contact-filter-tab').forEach(tab => {
            tab.className = tab.className.replace(
                'bg-blue-500 text-white',
                'bg-gray-100 text-gray-700 hover:bg-gray-200'
            );
        });

        // Добавляем активное состояние к выбранному табу
        clickedTab.className = clickedTab.className.replace(
            'bg-gray-100 text-gray-700 hover:bg-gray-200',
            'bg-blue-500 text-white'
        );

        // Вызываем фильтрацию контактов
        const status = clickedTab.dataset.status;
        this.filterContacts(status);
    }

    handleSearch(query) {
        // Логика поиска контактов
        if (window.contactsManager) {
            window.contactsManager.searchContacts(query);
        }
    }

    handleSourceFilter(source) {
        // Логика фильтрации по источникам
        if (window.contactsManager) {
            window.contactsManager.filterBySource(source);
        }
    }

    filterContacts(status) {
        // Логика фильтрации контактов по статусу
        if (window.contactsManager) {
            window.contactsManager.filterByStatus(status);
        }
    }

    updateMessageButtonState(selectedCount) {
        const messageButton = document.getElementById('bulk-send-message-btn');
        if (messageButton) {
            messageButton.disabled = selectedCount === 0;
            messageButton.textContent = selectedCount > 0
                ? `💬 Сообщение (${selectedCount})`
                : '💬 Сообщение';
        }
    }
}

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactsHeaderPanel;
}

// Глобальная доступность
window.ContactsHeaderPanel = ContactsHeaderPanel;