/**
 * Input Component - shadcn/ui style
 * Input Component - shadcn/ui style
 */

class Input {
    constructor() {
        this.baseClasses = 'flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50';
    }

    create(options = {}) {
        const {
            type = 'text',
            placeholder = '',
            value = '',
            className = '',
            disabled = false,
            required = false,
            id = '',
            name = '',
            onChange = null,
            onInput = null
        } = options;

        const input = document.createElement('input');
        input.type = type;
        input.placeholder = placeholder;
        input.value = value;
        input.className = `${this.baseClasses} ${className}`.trim();
        input.disabled = disabled;
        input.required = required;

        if (id) input.id = id;
        if (name) input.name = name;
        if (onChange) input.addEventListener('change', onChange);
        if (onInput) input.addEventListener('input', onInput);

        return input;
    }

    // Create search input with icon
    createSearch(options = {}) {
        const {
            placeholder = 'Search...',
            className = '',
            onSearch = null,
            ...inputOptions
        } = options;

        const container = document.createElement('div');
        container.className = 'relative';

        const input = this.create({
            ...inputOptions,
            placeholder,
            className: `pl-10 ${className}`,
            onInput: onSearch
        });

        const icon = document.createElement('div');
        icon.className = 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400';
        icon.innerHTML = `
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
        `;

        container.appendChild(icon);
        container.appendChild(input);

        return container;
    }

    // Static methods for quick creation
    static create(options) {
        return new Input().create(options);
    }

    static createSearch(options) {
        return new Input().createSearch(options);
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Input;
} else {
    window.Input = Input;
}
