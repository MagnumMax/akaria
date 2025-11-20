// Contacts table component using shadcn/ui Table
const { Table, Badge } = window;

class ContactsTable {
    constructor() {
        this.selectedContacts = new Set();
        this.currentSort = { field: 'name', direction: 'asc' };
        this.initializeTable();
        this.bindEvents();
    }

    initializeTable() {
        this.renderTable();
    }

    renderTable() {
        const container = document.getElementById('contacts-desktop');
        if (!container) return;

        // Create table container using shadcn/ui
        const tableContainer = Table.createContainer({
            className: 'rounded-md border'
        });

        // Create table
        const table = new Table().create({
            className: 'w-full caption-bottom text-sm'
        });

        // Create table header
        const thead = Table.createHeader({
            className: '[&_tr]:border-b',
            children: this.createHeaderRow()
        });

        // Create table body
        const tbody = document.createElement('tbody');
        tbody.id = 'contacts-table-body';
        tbody.className = '[&_tr:last-child]:border-0';

        table.appendChild(thead);
        table.appendChild(tbody);
        tableContainer.appendChild(table);

        // Replace container content
        container.innerHTML = '';
        container.appendChild(tableContainer);
    }

    createHeaderRow() {
        const headerRow = Table.createRow({
            className: 'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'
        });

        // Checkbox column
        const checkboxCell = Table.createHead({
            className: 'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
            children: this.createSelectAllCheckbox()
        });
        headerRow.appendChild(checkboxCell);

        // Name column (sortable)
        const nameCell = Table.createHead({
            className: 'h-12 px-4 text-left align-middle font-medium text-muted-foreground cursor-pointer hover:bg-muted/50',
            children: `
                <div class="flex items-center gap-2" data-sort="name">
                    Name
                    <span class="sort-indicator text-xs opacity-50">↕</span>
                </div>
            `
        });
        headerRow.appendChild(nameCell);

        // Other columns
        const columns = [
            { label: 'Phone', key: 'phone' },
            { label: 'Email', key: 'email' },
            { label: 'Source', key: 'source' },
            { label: 'Last Contact', key: 'lastContact', sortable: true },
            { label: 'AI Summary', key: 'aiSummary' },
            { label: 'Actions', key: 'actions' }
        ];

        columns.forEach(column => {
            const cell = Table.createHead({
                className: `h-12 px-4 text-left align-middle font-medium text-muted-foreground ${column.sortable ? 'cursor-pointer hover:bg-muted/50' : ''
                    }`,
                children: column.sortable ? `
                    <div class="flex items-center gap-2" data-sort="${column.key}">
                        ${column.label}
                        <span class="sort-indicator text-xs opacity-50">↕</span>
                    </div>
                ` : column.label
            });
            headerRow.appendChild(cell);
        });

        return headerRow;
    }

    createSelectAllCheckbox() {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'select-all-contacts';
        checkbox.className = 'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground';
        return checkbox;
    }

    renderContacts(contacts) {
        const tbody = document.getElementById('contacts-table-body');
        if (!tbody) return;

        tbody.innerHTML = '';

        contacts.forEach(contact => {
            const row = this.createContactRow(contact);
            tbody.appendChild(row);
        });
    }

    createContactRow(contact) {
        const row = Table.createRow({
            className: 'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted contact-row',
            attributes: {
                'data-contact-id': contact.id
            }
        });

        // Checkbox
        const checkboxCell = Table.createCell({
            className: 'p-4 align-middle [&:has([role=checkbox])]:pr-0',
            children: this.createContactCheckbox(contact.id)
        });
        row.appendChild(checkboxCell);

        // Name
        const nameCell = Table.createCell({
            className: 'p-4 align-middle font-medium',
            children: `<div class="font-semibold text-foreground">${contact.name}</div>`
        });
        row.appendChild(nameCell);

        // Phone
        const phoneCell = Table.createCell({
            className: 'p-4 align-middle',
            children: `<span class="text-sm text-muted-foreground">${this.formatPhone(contact.phone)}</span>`
        });
        row.appendChild(phoneCell);

        // Email
        const emailCell = Table.createCell({
            className: 'p-4 align-middle',
            children: `<span class="text-sm text-muted-foreground">${contact.email}</span>`
        });
        row.appendChild(emailCell);

        // Source
        const sourceCell = Table.createCell({
            className: 'p-4 align-middle',
            children: this.createSourceBadge(contact.source)
        });
        row.appendChild(sourceCell);

        // Last Contact
        const lastContactCell = Table.createCell({
            className: 'p-4 align-middle',
            children: `<span class="text-sm text-muted-foreground">${this.formatDate(contact.lastContact)}</span>`
        });
        row.appendChild(lastContactCell);

        // AI Summary
        const aiSummaryCell = Table.createCell({
            className: 'p-4 align-middle',
            children: contact.aiSummary ?
                `<div class="text-xs text-muted-foreground max-w-xs truncate" title="${contact.aiSummary}">${contact.aiSummary}</div>` :
                '<span class="text-xs text-muted-foreground">—</span>'
        });
        row.appendChild(aiSummaryCell);

        // Actions
        const actionsCell = Table.createCell({
            className: 'p-4 align-middle',
            children: this.createActionButton(contact.id)
        });
        row.appendChild(actionsCell);

        return row;
    }

    createContactCheckbox(contactId) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'contact-checkbox peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground';
        checkbox.dataset.contactId = contactId;
        checkbox.checked = this.selectedContacts.has(contactId);
        return checkbox;
    }

    createSourceBadge(source) {
        const badge = Badge.create({
            variant: 'secondary',
            children: this.getSourceLabel(source)
        });
        return badge.outerHTML;
    }

    createActionButton(contactId) {
        return `<button class="view-contact-btn px-2 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded" data-contact-id="${contactId}">View</button>`;
    }

    bindEvents() {
        // Sort handler
        document.addEventListener('click', (e) => {
            const target = e.target;
            if (target instanceof Element) {
                const sortElement = target.closest('[data-sort]');
                if (sortElement instanceof HTMLElement && sortElement.dataset.sort) {
                    this.handleSort(sortElement.dataset.sort);
                }
            }
        });

        // Select all handler
        document.addEventListener('change', (e) => {
            const target = e.target;
            if (target instanceof HTMLInputElement) {
                if (target.id === 'select-all-contacts') {
                    this.handleSelectAll(target.checked);
                } else if (target.classList.contains('contact-checkbox')) {
                    this.handleContactSelect(target);
                }
            }
        });
    }

    handleSort(field) {
        if (this.currentSort.field === field) {
            this.currentSort.direction = this.currentSort.direction === 'asc' ? 'desc' : 'asc';
        } else {
            this.currentSort.field = field;
            this.currentSort.direction = 'asc';
        }

        // Update sort indicators
        this.updateSortIndicators();

        // Dispatch sort event
        document.dispatchEvent(new CustomEvent('contacts-sort-changed', {
            detail: this.currentSort
        }));
    }

    updateSortIndicators() {
        document.querySelectorAll('.sort-indicator').forEach(indicator => {
            indicator.textContent = '↕';
            indicator.classList.remove('text-primary');
            indicator.classList.add('opacity-50');
        });

        const activeIndicator = document.querySelector(`[data-sort="${this.currentSort.field}"] .sort-indicator`);
        if (activeIndicator) {
            activeIndicator.textContent = this.currentSort.direction === 'asc' ? '↑' : '↓';
            activeIndicator.classList.add('text-primary');
            activeIndicator.classList.remove('opacity-50');
        }
    }

    handleSelectAll(checked) {
        console.log('🔄 handleSelectAll called with checked:', checked);
        const checkboxes = document.querySelectorAll('.contact-checkbox');
        console.log('📋 Found contact checkboxes:', checkboxes.length);

        checkboxes.forEach(checkbox => {
            if (checkbox instanceof HTMLInputElement) {
                checkbox.checked = checked;
                const contactId = parseInt(checkbox.dataset.contactId || '0');
                console.log(`✅ Setting contact ${contactId} to ${checked}`);
                if (checked) {
                    this.selectedContacts.add(contactId);
                } else {
                    this.selectedContacts.delete(contactId);
                }
            }
        });

        console.log('📊 Selected contacts after selectAll:', Array.from(this.selectedContacts));
        this.updateBulkActions();
    }

    handleContactSelect(checkbox) {
        console.log('🔄 handleContactSelect called');
        const contactId = parseInt(checkbox.dataset.contactId);
        console.log('📋 Contact ID:', contactId, 'checked:', checkbox.checked);

        if (checkbox.checked) {
            this.selectedContacts.add(contactId);
            console.log('✅ Added contact to selection');
        } else {
            this.selectedContacts.delete(contactId);
            console.log('❌ Removed contact from selection');
        }

        console.log('📊 Current selected contacts:', Array.from(this.selectedContacts));
        this.updateBulkActions();
    }

    updateBulkActions() {
        console.log('🔄 ContactsTable updateBulkActions called');
        console.log('📊 Selected contacts:', Array.from(this.selectedContacts));
        console.log('📋 Selected contacts count:', this.selectedContacts.size);

        const event = new CustomEvent('contacts-selection-changed', {
            detail: {
                selectedContacts: Array.from(this.selectedContacts),
                count: this.selectedContacts.size
            }
        });

        console.log('🚀 Dispatching contacts-selection-changed event:', event.detail);
        document.dispatchEvent(event);
    }

    // Helper methods
    formatPhone(phone) {
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length === 11 && cleaned.startsWith('7')) {
            return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9)}`;
        }
        return phone;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;

        return date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    getSourceLabel(source) {
        const labels = {
            'website': 'Website',
            'referral': 'Referral',
            'social': 'Social Media',
            'advertising': 'Advertising',
            'cold_call': 'Cold Call',
            'import': 'Import',
            'manual': 'Manual Entry'
        };
        return labels[source] || source;
    }

    // Public methods
    render(contacts) {
        this.renderContacts(contacts);
    }

    getSelectedContacts() {
        return Array.from(this.selectedContacts);
    }

    clearSelection() {
        this.selectedContacts.clear();
        document.querySelectorAll('.contact-checkbox').forEach(checkbox => {
            if (checkbox instanceof HTMLInputElement) {
                checkbox.checked = false;
            }
        });
        const selectAllCheckbox = document.getElementById('select-all-contacts');
        if (selectAllCheckbox instanceof HTMLInputElement) {
            selectAllCheckbox.checked = false;
        }
        this.updateBulkActions();
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactsTable;
} else {
    window.ContactsTable = ContactsTable;
}