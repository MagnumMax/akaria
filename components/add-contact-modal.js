class AddContactModal {
    constructor() {
        this.isOpen = false;
        this.callbacks = {};
        this.formData = {};
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
            <div id="add-contact-modal" class="fixed inset-0 z-50 ${this.isOpen ? 'flex' : 'hidden'} items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <div class="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-lg border bg-background shadow-lg animate-in fade-in-0 zoom-in-95 duration-300">
                    <!-- Header -->
                    <div class="flex items-center justify-between p-6 border-b">
                        <div class="space-y-1">
                            <h2 class="text-lg font-semibold leading-none tracking-tight">Add Contact</h2>
                            <p class="text-sm text-muted-foreground">Fill in the new contact information</p>
                        </div>
                        <button class="rounded-sm opacity-70 hover:opacity-100 p-2 text-gray-600 hover:text-gray-800" id="close-add-contact-modal">
                            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                            <span class="sr-only">Close</span>
                        </button>
                    </div>

                    <!-- Content -->
                    <div class="overflow-y-auto max-h-[calc(90vh-120px)]">
                        <form id="add-contact-form" class="p-6 space-y-6">
                            <!-- Basic Info -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="space-y-2">
                                    <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name *</label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        required 
                                        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Enter name"
                                    >
                                </div>
                                <div class="space-y-2">
                                    <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Company</label>
                                    <input 
                                        type="text" 
                                        name="company" 
                                        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Company name"
                                    >
                                </div>
                            </div>

                            <!-- Contact Info -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="space-y-2">
                                    <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Phone *</label>
                                    <input 
                                        type="tel" 
                                        name="phone" 
                                        required 
                                        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="+7 XXX XXX-XX-XX"
                                    >
                                </div>
                                <div class="space-y-2">
                                    <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email *</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        required 
                                        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="email@example.com"
                                    >
                                </div>
                            </div>

                            <!-- Additional Info -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="space-y-2">
                                    <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Position</label>
                                    <input 
                                        type="text" 
                                        name="position" 
                                        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Position"
                                    >
                                </div>
                                <div class="space-y-2">
                                    <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Source</label>
                                    <select 
                                        name="source" 
                                        class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="website">Website</option>
                                        <option value="referral">Referral</option>
                                        <option value="social">Social Media</option>
                                        <option value="advertising">Advertising</option>
                                        <option value="cold-call">Cold Call</option>
                                    </select>
                                </div>
                            </div>

                            <!-- Notes -->
                            <div class="space-y-2">
                                <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Notes</label>
                                <textarea 
                                    name="notes" 
                                    rows="3" 
                                    class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Additional contact information"
                                ></textarea>
                            </div>

                            <!-- Import Options -->
                            <div class="rounded-lg border p-4 space-y-3">
                                <h3 class="font-medium leading-none tracking-tight">Import Options</h3>
                                <div class="flex flex-col sm:flex-row gap-2">
                                    <button class="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" id="upload-csv-btn">
                                        📄 Upload CSV/Excel
                                    </button>
                                    <button class="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" id="sync-sheets-btn">
                                        📊 Sync with Google Sheets
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <!-- Footer -->
                    <div class="flex items-center justify-end gap-2 p-6 border-t">
                        <button class="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" id="cancel-add-contact">
                            Cancel
                        </button>
                        <button class="px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" type="submit" form="add-contact-form">
                            Save Contact
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        const modal = document.getElementById('add-contact-modal');
        const closeBtn = document.getElementById('close-add-contact-modal');
        const cancelBtn = document.getElementById('cancel-add-contact');
        const form = document.getElementById('add-contact-form');
        const uploadCsvBtn = document.getElementById('upload-csv-btn');
        const syncSheetsBtn = document.getElementById('sync-sheets-btn');

        // Close modal events
        [closeBtn, cancelBtn].forEach(btn => {
            btn?.addEventListener('click', () => this.close());
        });

        // Close on backdrop click
        modal?.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.close();
            }
        });

        // Form submission
        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit(e);
        });

        // Import options
        uploadCsvBtn?.addEventListener('click', () => {
            this.callbacks.onUploadCsv?.();
        });

        syncSheetsBtn?.addEventListener('click', () => {
            this.callbacks.onSyncSheets?.();
        });

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    open() {
        this.isOpen = true;
        const modal = document.getElementById('add-contact-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden';

            // Focus first input
            setTimeout(() => {
                const firstInput = modal.querySelector('input[name="name"]');
                if (firstInput instanceof HTMLElement) {
                    firstInput.focus();
                }
            }, 100);
        }
    }

    close() {
        this.isOpen = false;
        const modal = document.getElementById('add-contact-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = '';
        }
        this.resetForm();
    }

    handleSubmit(e) {
        const formData = new FormData(e.target);
        const contactData = {
            name: formData.get('name'),
            company: formData.get('company'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            position: formData.get('position'),
            source: formData.get('source'),
            notes: formData.get('notes'),
            created_at: new Date().toISOString()
        };

        // Validate required fields
        if (!contactData.name || !contactData.phone || !contactData.email) {
            this.showError('Please fill in all required fields');
            return;
        }

        // Call callback
        if (this.callbacks.onSubmit) {
            this.callbacks.onSubmit(contactData);
        }

        this.close();
    }

    resetForm() {
        const form = document.getElementById('add-contact-form');
        if (form instanceof HTMLFormElement) {
            form.reset();
        }
    }

    showError(message) {
        // Simple error display - could be enhanced with toast notifications
        alert(message);
    }

    // Public methods
    show() {
        this.open();
    }

    hide() {
        this.close();
    }
}

// Export for global use
window.AddContactModal = AddContactModal;