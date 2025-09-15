class ContactViewModal {
    constructor() {
        this.isOpen = false;
        this.callbacks = {};
        this.currentContact = null;
    }

    init(containerId) {
        this.containerId = containerId;
        this.render();
        this.attachEventListeners();
    }

    setCallbacks(callbacks) {
        this.callbacks = { ...this.callbacks, ...callbacks };
    }

    render() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        container.innerHTML = `
            <div id="contact-view-modal" class="fixed inset-0 z-50 ${this.isOpen ? 'flex' : 'hidden'} items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <div class="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-lg border bg-background shadow-lg animate-in fade-in-0 zoom-in-95 duration-300">
                    <!-- Header -->
                    <div class="flex items-center justify-between p-6 border-b">
                        <div class="space-y-1">
                            <h2 class="text-lg font-semibold leading-none tracking-tight">Карточка контакта</h2>
                            <p class="text-sm text-muted-foreground">Подробная информация о контакте</p>
                        </div>
                        <button class="rounded-sm opacity-70 hover:opacity-100 p-2 text-gray-600 hover:text-gray-800" id="close-contact-view-modal">
                            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                            <span class="sr-only">Закрыть</span>
                        </button>
                    </div>

                    <!-- Content -->
                    <div class="overflow-y-auto max-h-[calc(90vh-120px)]">
                        <div id="contact-view-content" class="p-6">
                            <!-- Content will be dynamically loaded here -->
                        </div>
                    </div>

                    <!-- Footer -->
                    <div class="flex items-center justify-between p-6 border-t">
                        <div class="flex items-center gap-2">
                            <button class="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" id="edit-contact-btn">
                                <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                                Редактировать
                            </button>
                            <button class="px-3 py-2 border border-red-200 text-red-600 bg-white hover:bg-red-50 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500" id="delete-contact-btn">
                                <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                                Удалить
                            </button>
                        </div>
                        <button class="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" id="close-contact-view-btn">
                            Закрыть
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        const modal = document.getElementById('contact-view-modal');
        const closeBtn = document.getElementById('close-contact-view-modal');
        const closeFooterBtn = document.getElementById('close-contact-view-btn');
        const editBtn = document.getElementById('edit-contact-btn');
        const deleteBtn = document.getElementById('delete-contact-btn');

        // Close modal events
        [closeBtn, closeFooterBtn].forEach(btn => {
            btn?.addEventListener('click', () => this.close());
        });

        // Close on backdrop click
        modal?.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.close();
            }
        });

        // Action buttons
        editBtn?.addEventListener('click', () => {
            if (this.callbacks.onEdit && this.currentContact) {
                this.callbacks.onEdit(this.currentContact.id);
            }
        });

        deleteBtn?.addEventListener('click', () => {
            if (this.callbacks.onDelete && this.currentContact) {
                this.confirmDelete();
            }
        });

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    open(contact) {
        this.currentContact = contact;
        this.isOpen = true;
        const modal = document.getElementById('contact-view-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden';
            this.renderContactContent(contact);
        }
    }

    close() {
        this.isOpen = false;
        const modal = document.getElementById('contact-view-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = '';
        }
        this.currentContact = null;
    }

    renderContactContent(contact) {
        const contentContainer = document.getElementById('contact-view-content');
        if (!contentContainer || !contact) return;

        const statusBadge = this.getStatusBadge(contact.status);
        const sourceBadge = this.getSourceBadge(contact.source);

        contentContainer.innerHTML = `
            <div class="space-y-6">
                <!-- Contact Header -->
                <div class="flex items-start justify-between">
                    <div class="flex items-center space-x-4">
                        <div class="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <span class="text-xl font-semibold">${this.getInitials(contact.name)}</span>
                        </div>
                        <div>
                            <h3 class="text-xl font-semibold">${contact.name}</h3>
                            ${contact.position ? `<p class="text-sm text-muted-foreground">${contact.position}</p>` : ''}
                            ${contact.company ? `<p class="text-sm text-muted-foreground">${contact.company}</p>` : ''}
                        </div>
                    </div>
                    <div class="flex flex-col items-end space-y-2">
                        ${statusBadge}
                        ${sourceBadge}
                    </div>
                </div>

                <!-- Contact Information -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Contact Details -->
                    <div class="space-y-4">
                        <h4 class="font-medium">Контактная информация</h4>
                        <div class="space-y-3">
                            <div class="flex items-center space-x-3">
                                <div class="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-sm font-medium">${contact.phone}</p>
                                    <p class="text-xs text-muted-foreground">Телефон</p>
                                </div>
                            </div>
                            <div class="flex items-center space-x-3">
                                <div class="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-sm font-medium">${contact.email}</p>
                                    <p class="text-xs text-muted-foreground">Email</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Additional Info -->
                    <div class="space-y-4">
                        <h4 class="font-medium">Дополнительная информация</h4>
                        <div class="space-y-3">
                            <div>
                                <p class="text-xs text-muted-foreground mb-1">Дата создания</p>
                                <p class="text-sm">${this.formatDate(contact.created_at)}</p>
                            </div>
                            ${contact.last_contact ? `
                                <div>
                                    <p class="text-xs text-muted-foreground mb-1">Последний контакт</p>
                                    <p class="text-sm">${this.formatDate(contact.last_contact)}</p>
                                </div>
                            ` : ''}
                            ${contact.deal_value ? `
                                <div>
                                    <p class="text-xs text-muted-foreground mb-1">Сумма сделки</p>
                                    <p class="text-sm font-medium">${this.formatCurrency(contact.deal_value)}</p>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>

                <!-- Notes -->
                ${contact.notes ? `
                    <div class="space-y-2">
                        <h4 class="font-medium">Примечания</h4>
                        <div class="rounded-md border p-3 bg-muted/50">
                            <p class="text-sm">${contact.notes}</p>
                        </div>
                    </div>
                ` : ''}

                <!-- Activity Timeline -->
                <div class="space-y-4">
                    <h4 class="font-medium">История активности</h4>
                    <div class="space-y-3">
                        <div class="flex items-start space-x-3">
                            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                            </div>
                            <div class="flex-1">
                                <p class="text-sm font-medium">Контакт создан</p>
                                <p class="text-xs text-muted-foreground">${this.formatDate(contact.created_at)}</p>
                            </div>
                        </div>
                        <!-- Additional activity items would go here -->
                    </div>
                </div>

                <!-- Quick Actions -->
                    <div class="space-y-4">
                        <h4 class="font-medium">Быстрые действия</h4>
                        <div class="flex flex-wrap gap-2">
                            <button class="h-9 px-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                📞 Позвонить
                            </button>
                            <button class="h-9 px-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                ✉️ Написать email
                            </button>
                            <button class="h-9 px-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                💬 WhatsApp
                            </button>
                            <button class="h-9 px-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                📅 Запланировать встречу
                            </button>
                        </div>
                    </div>
            </div>
        `;
    }

    getInitials(name) {
        return name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    }

    getStatusBadge(status) {
        const statusConfig = {
            'new': { label: 'Новый', class: 'bg-blue-100 text-blue-800' },
            'contacted': { label: 'Связались', class: 'bg-yellow-100 text-yellow-800' },
            'qualified': { label: 'Квалифицирован', class: 'bg-green-100 text-green-800' },
            'deal_in_progress': { label: 'Сделка в работе', class: 'bg-purple-100 text-purple-800' },
            'rejected': { label: 'Отклонен', class: 'bg-red-100 text-red-800' }
        };

        const config = statusConfig[status] || statusConfig['new'];
        return `<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.class}">${config.label}</span>`;
    }

    getSourceBadge(source) {
        const sourceConfig = {
            'website': { label: 'Сайт', class: 'bg-gray-100 text-gray-800' },
            'referral': { label: 'Рекомендация', class: 'bg-indigo-100 text-indigo-800' },
            'social': { label: 'Соц. сети', class: 'bg-pink-100 text-pink-800' },
            'advertising': { label: 'Реклама', class: 'bg-orange-100 text-orange-800' },
            'cold-call': { label: 'Холодный звонок', class: 'bg-cyan-100 text-cyan-800' }
        };

        const config = sourceConfig[source] || sourceConfig['website'];
        return `<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.class}">${config.label}</span>`;
    }

    formatDate(dateString) {
        if (!dateString) return 'Не указано';
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB'
        }).format(amount);
    }

    confirmDelete() {
        if (confirm(`Вы уверены, что хотите удалить контакт "${this.currentContact.name}"?`)) {
            if (this.callbacks.onDelete) {
                this.callbacks.onDelete(this.currentContact.id);
            }
            this.close();
        }
    }

    // Public methods
    show(contact) {
        this.open(contact);
    }

    hide() {
        this.close();
    }
}

// Export for global use
window.ContactViewModal = ContactViewModal;