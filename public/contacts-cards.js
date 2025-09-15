// Компонент карточек контактов для мобильной версии
class ContactsCards {
    constructor() {
        this.container = null;
        this.contacts = [];
        this.selectedContacts = new Set();
        this.onContactSelect = null;
        this.onContactView = null;
    }

    init(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container with id '${containerId}' not found`);
            return;
        }
        this.setupEventListeners();
    }

    render(contacts) {
        this.contacts = contacts;
        if (!this.container) return;

        if (contacts.length === 0) {
            this.container.innerHTML = this.renderEmptyState();
            return;
        }

        this.container.innerHTML = contacts.map(contact => this.renderCard(contact)).join('');
        this.updateEventListeners();
    }

    renderCard(contact) {
        const isSelected = this.selectedContacts.has(contact.id);

        return `
            <div class="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 contact-card" data-contact-id="${contact.id}">
                <div class="p-4">
                    <!-- Заголовок карточки -->
                    <div class="flex items-start justify-between mb-3">
                        <div class="flex items-center gap-3">
                            <input 
                                type="checkbox" 
                                class="contact-checkbox h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2" 
                                data-contact-id="${contact.id}" 
                                ${isSelected ? 'checked' : ''}
                            >
                            <div>
                                <h3 class="font-semibold text-gray-900 text-sm">${this.escapeHtml(contact.name)}</h3>
                                <div class="flex items-center gap-1 mt-1">
                                    <div class="w-2 h-2 rounded-full ${this.getStatusColor(contact.status)}"></div>
                                    <span class="text-xs text-gray-500">${this.getStatusLabel(contact.status)}</span>
                                </div>
                            </div>
                        </div>
                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${this.getSourceBadgeClass(contact.source)}">
                            ${this.getSourceLabel(contact.source)}
                        </span>
                    </div>
                    
                    <!-- Контактная информация -->
                    <div class="space-y-2">
                        <div class="flex items-center gap-2 text-sm">
                            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                            <span class="text-gray-700">${this.formatPhone(contact.phone)}</span>
                        </div>
                        
                        <div class="flex items-center gap-2 text-sm">
                            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            <span class="text-gray-700 truncate">${this.escapeHtml(contact.email)}</span>
                        </div>
                        
                        <div class="flex items-center gap-2 text-sm">
                            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-2 13a2 2 0 002 2h6a2 2 0 002-2L16 7m-6 0V3"></path>
                            </svg>
                            <span class="text-gray-600">${this.formatDate(contact.lastContact)}</span>
                        </div>
                        
                        ${contact.aiSummary ? `
                            <div class="mt-3 p-3 bg-gray-50 rounded-md border border-gray-200">
                                <p class="text-xs text-gray-600 line-clamp-3">${this.escapeHtml(contact.aiSummary)}</p>
                            </div>
                        ` : ''}
                    </div>
                    
                    <!-- Действия -->
                    <div class="flex gap-2 mt-4 pt-3 border-t border-gray-100">
                        <button class="flex-1 view-contact-btn px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" data-contact-id="${contact.id}">
                            <svg class="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                            Просмотр
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderEmptyState() {
        return `
            <div class="text-center py-12">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">Контакты не найдены</h3>
                <p class="mt-1 text-sm text-gray-500">Попробуйте изменить фильтры или добавить новые контакты.</p>
            </div>
        `;
    }

    setupEventListeners() {
        if (!this.container) return;

        // Делегирование событий для чекбоксов и кнопок
        this.container.addEventListener('change', (e) => {
            if (e.target.classList.contains('contact-checkbox')) {
                this.handleContactSelect(e.target);
            }
        });

        this.container.addEventListener('click', (e) => {
            if (e.target.closest('.view-contact-btn')) {
                const contactId = e.target.closest('.view-contact-btn').dataset.contactId;
                this.handleContactView(contactId);
            }
        });
    }

    updateEventListeners() {
        // События уже настроены через делегирование
    }

    handleContactSelect(checkbox) {
        const contactId = checkbox.dataset.contactId;
        if (checkbox.checked) {
            this.selectedContacts.add(contactId);
        } else {
            this.selectedContacts.delete(contactId);
        }

        if (this.onContactSelect) {
            this.onContactSelect(contactId, checkbox.checked);
        }
    }

    handleContactView(contactId) {
        if (this.onContactView) {
            this.onContactView(contactId);
        }
    }

    // Утилиты
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatPhone(phone) {
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length === 11 && cleaned.startsWith('7')) {
            return `+7 ${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9)}`;
        }
        return phone;
    }

    formatDate(dateStr) {
        const date = new Date(dateStr);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return 'Вчера';
        if (diffDays < 7) return `${diffDays} дн. назад`;
        return date.toLocaleDateString('ru-RU');
    }

    getSourceLabel(source) {
        const labels = {
            'website': 'Сайт',
            'referral': 'Рекомендация',
            'social': 'Соц. сети',
            'advertising': 'Реклама',
            'cold-call': 'Холодный звонок'
        };
        return labels[source] || source;
    }

    getSourceBadgeClass(source) {
        const classes = {
            'website': 'bg-blue-100 text-blue-800',
            'referral': 'bg-green-100 text-green-800',
            'social': 'bg-purple-100 text-purple-800',
            'advertising': 'bg-orange-100 text-orange-800',
            'cold-call': 'bg-gray-100 text-gray-800'
        };
        return classes[source] || 'bg-gray-100 text-gray-800';
    }

    getStatusLabel(status) {
        const labels = {
            'new': 'Новый',
            'contacted': 'Связались',
            'qualified': 'Квалифицирован',
            'deal-in-progress': 'Сделка в работе',
            'rejected': 'Отклонен'
        };
        return labels[status] || status;
    }

    getStatusColor(status) {
        const colors = {
            'new': 'bg-blue-500',
            'contacted': 'bg-yellow-500',
            'qualified': 'bg-green-500',
            'deal-in-progress': 'bg-purple-500',
            'rejected': 'bg-red-500'
        };
        return colors[status] || 'bg-gray-500';
    }

    // Публичные методы
    setSelectedContacts(selectedIds) {
        this.selectedContacts = new Set(selectedIds);
        this.updateCheckboxes();
    }

    getSelectedContacts() {
        return Array.from(this.selectedContacts);
    }

    updateCheckboxes() {
        if (!this.container) return;

        const checkboxes = this.container.querySelectorAll('.contact-checkbox');
        checkboxes.forEach(checkbox => {
            const contactId = checkbox.dataset.contactId;
            checkbox.checked = this.selectedContacts.has(contactId);
        });
    }

    setCallbacks(callbacks) {
        if (callbacks.onContactSelect) {
            this.onContactSelect = callbacks.onContactSelect;
        }
        if (callbacks.onContactView) {
            this.onContactView = callbacks.onContactView;
        }
    }
}

// Экспорт для использования
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactsCards;
} else {
    window.ContactsCards = ContactsCards;
}