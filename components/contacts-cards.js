// Contact cards component for mobile version
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
            <div class="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 contact-card group" data-contact-id="${contact.id}">
                <div class="p-5">
                    <!-- Card Header -->
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex items-center gap-3">
                            <input 
                                type="checkbox" 
                                class="contact-checkbox h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 cursor-pointer" 
                                data-contact-id="${contact.id}" 
                                ${isSelected ? 'checked' : ''}
                            >
                            <div>
                                <h3 class="font-semibold text-gray-900 text-base group-hover:text-blue-600 transition-colors">${this.escapeHtml(contact.name)}</h3>
                                <div class="flex items-center gap-2 mt-1">
                                    <div class="w-2 h-2 rounded-full ${this.getStatusColor(contact.status)} ring-2 ring-white"></div>
                                    <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">${this.getStatusLabel(contact.status)}</span>
                                </div>
                            </div>
                        </div>
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${this.getSourceBadgeClass(contact.source)} border border-transparent">
                            ${this.getSourceLabel(contact.source)}
                        </span>
                    </div>
                    
                    <!-- Contact Information -->
                    <div class="space-y-3">
                        <div class="flex items-center gap-3 text-sm group/item">
                            <div class="p-1.5 bg-gray-50 rounded-md group-hover/item:bg-blue-50 transition-colors">
                                <svg class="w-4 h-4 text-gray-400 group-hover/item:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                </svg>
                            </div>
                            <span class="text-gray-700 font-medium">${this.formatPhone(contact.phone)}</span>
                        </div>
                        
                        <div class="flex items-center gap-3 text-sm group/item">
                            <div class="p-1.5 bg-gray-50 rounded-md group-hover/item:bg-blue-50 transition-colors">
                                <svg class="w-4 h-4 text-gray-400 group-hover/item:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                            <span class="text-gray-700 truncate">${this.escapeHtml(contact.email)}</span>
                        </div>
                        
                        <div class="flex items-center gap-3 text-sm group/item">
                            <div class="p-1.5 bg-gray-50 rounded-md group-hover/item:bg-blue-50 transition-colors">
                                <svg class="w-4 h-4 text-gray-400 group-hover/item:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-2 13a2 2 0 002 2h6a2 2 0 002-2L16 7m-6 0V3"></path>
                                </svg>
                            </div>
                            <span class="text-gray-600">${this.formatDate(contact.lastContact)}</span>
                        </div>
                        
                        ${contact.aiSummary ? `
                            <div class="mt-4 p-3 bg-blue-50/50 rounded-lg border border-blue-100/50">
                                <div class="flex gap-2">
                                    <span class="text-lg">✨</span>
                                    <p class="text-xs text-gray-600 line-clamp-3 leading-relaxed">${this.escapeHtml(contact.aiSummary)}</p>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                    
                    <!-- Actions -->
                    <div class="flex gap-2 mt-5 pt-4 border-t border-gray-100">
                        <button class="flex-1 view-contact-btn px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 flex items-center justify-center gap-2" data-contact-id="${contact.id}">
                            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                            View
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
                <h3 class="mt-2 text-sm font-medium text-gray-900">No contacts found</h3>
                <p class="mt-1 text-sm text-gray-500">Try changing filters or add new contacts.</p>
            </div>
        `;
    }

    setupEventListeners() {
        if (!this.container) return;

        // Event delegation for checkboxes and buttons
        this.container.addEventListener('change', (e) => {
            const target = e.target;
            if (target instanceof Element && target.classList.contains('contact-checkbox')) {
                this.handleContactSelect(target);
            }
        });

        this.container.addEventListener('click', (e) => {
            const target = e.target;
            if (target instanceof Element) {
                const btn = target.closest('.view-contact-btn');
                if (btn instanceof HTMLElement && btn.dataset.contactId) {
                    this.handleContactView(btn.dataset.contactId);
                }
            }
        });
    }

    updateEventListeners() {
        // Events are already set up via delegation
    }

    handleContactSelect(checkbox) {
        if (!(checkbox instanceof HTMLInputElement)) return;

        const contactId = checkbox.dataset.contactId;
        if (!contactId) return;

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

    // Utilities
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
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString('en-US');
    }

    getSourceLabel(source) {
        const labels = {
            'website': 'Website',
            'referral': 'Referral',
            'social': 'Social Media',
            'advertising': 'Advertising',
            'cold-call': 'Cold Call'
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
            'new': 'New',
            'contacted': 'Contacted',
            'qualified': 'Qualified',
            'deal-in-progress': 'Deal in Progress',
            'rejected': 'Rejected'
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

    // Public methods
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
            if (checkbox instanceof HTMLInputElement) {
                const contactId = checkbox.dataset.contactId;
                if (contactId) {
                    checkbox.checked = this.selectedContacts.has(contactId);
                }
            }
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

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactsCards;
} else {
    window.ContactsCards = ContactsCards;
}