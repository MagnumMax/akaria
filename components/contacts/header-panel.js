// Contacts header panel component using shadcn/ui
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

        // Create buttons using standard button elements
        const importButton = document.createElement('button');
        importButton.className = 'px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500';
        importButton.textContent = 'Import';
        importButton.id = 'import-contacts-btn';

        const messageButton = document.createElement('button');
        messageButton.className = 'px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed';
        messageButton.textContent = 'Message';
        messageButton.disabled = true;
        messageButton.id = 'bulk-send-message-btn';

        const addButton = document.createElement('button');
        addButton.className = 'px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500';
        addButton.textContent = 'Add';
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
                className: `cursor-pointer transition-colors hover:opacity-80 ${option.active ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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

        // Search field
        const searchInput = Input.create({
            type: 'text',
            placeholder: 'Search contacts...',
            className: 'w-full sm:w-64'
        });
        searchInput.id = 'contacts-search';

        // Source select
        const sourceSelect = Select.create({
            options: [
                { value: 'all', label: 'All Sources' },
                { value: 'website', label: 'Website' },
                { value: 'referral', label: 'Referral' },
                { value: 'social', label: 'Social Media' },
                { value: 'advertising', label: 'Advertising' },
                { value: 'cold-call', label: 'Cold Call' }
            ],
            defaultValue: 'all'
        });
        sourceSelect.id = 'source-filter';

        searchContainer.appendChild(searchInput);
        searchContainer.appendChild(sourceSelect);
    }

    bindEvents() {
        // Filter tabs handler
        document.addEventListener('click', (e) => {
            const target = e.target;
            if (target instanceof Element && target.classList.contains('contact-filter-tab')) {
                this.handleFilterTabClick(target);
            }
        });

        // Import button handler
        document.addEventListener('click', (e) => {
            const target = e.target;
            if (target instanceof Element && target.id === 'import-contacts-btn') {
                const fileInput = document.getElementById('import-file-input');
                if (fileInput instanceof HTMLElement) {
                    fileInput.click();
                }
            }
        });

        // Search handler
        const searchInput = document.getElementById('contacts-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const target = e.target;
                if (target instanceof HTMLInputElement) {
                    this.handleSearch(target.value);
                }
            });
        }

        // Source filter handler
        const sourceFilter = document.getElementById('source-filter');
        if (sourceFilter) {
            sourceFilter.addEventListener('change', (e) => {
                const target = e.target;
                if (target instanceof HTMLSelectElement) {
                    this.handleSourceFilter(target.value);
                }
            });
        }

        // Contacts selection change handler
        document.addEventListener('contacts-selection-changed', (e) => {
            if (e instanceof CustomEvent) {
                this.updateMessageButtonState(e.detail.count);
            }
        });
    }

    handleFilterTabClick(clickedTab) {
        // Remove active state from all tabs
        document.querySelectorAll('.contact-filter-tab').forEach(tab => {
            tab.className = tab.className.replace(
                'bg-blue-500 text-white',
                'bg-gray-100 text-gray-700 hover:bg-gray-200'
            );
        });

        // Add active state to selected tab
        clickedTab.className = clickedTab.className.replace(
            'bg-gray-100 text-gray-700 hover:bg-gray-200',
            'bg-blue-500 text-white'
        );

        // Trigger contact filtering
        const status = clickedTab.dataset.status;
        this.filterContacts(status);
    }

    handleSearch(query) {
        // Contact search logic
        if (window.contactsManager) {
            window.contactsManager.searchContacts(query);
        }
    }

    handleSourceFilter(source) {
        // Source filtering logic
        if (window.contactsManager) {
            window.contactsManager.filterBySource(source);
        }
    }

    filterContacts(status) {
        // Contact status filtering logic
        if (window.contactsManager) {
            window.contactsManager.filterByStatus(status);
        }
    }

    updateMessageButtonState(selectedCount) {
        const messageButton = document.getElementById('bulk-send-message-btn');
        if (messageButton instanceof HTMLButtonElement) {
            messageButton.disabled = selectedCount === 0;
            messageButton.textContent = selectedCount > 0
                ? `💬 Message (${selectedCount})`
                : '💬 Message';
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactsHeaderPanel;
}

// Global availability
window.ContactsHeaderPanel = ContactsHeaderPanel;