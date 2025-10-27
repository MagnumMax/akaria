/**
 * Input Component - shadcn/ui style
 * Компонент поля ввода в стиле shadcn/ui
 */

class Input {
    constructor() {
        this.baseClasses = 'ds-input';
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

    // Создание поля поиска с иконкой
    createSearch(options = {}) {
        const {
            placeholder = 'Поиск...',
            className = '',
            onSearch = null,
            ...inputOptions
        } = options;

        const container = document.createElement('div');
        container.className = 'relative';

        const input = this.create({
            ...inputOptions,
            placeholder,
            className: `ds-input-with-icon ${className}`.trim(),
            onInput: onSearch
        });

        const icon = document.createElement('div');
        icon.className = 'ds-input-icon';
        icon.innerHTML = `
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
        `;

        container.appendChild(icon);
        container.appendChild(input);

        return container;
    }

    // Статические методы для быстрого создания
    static create(options) {
        return new Input().create(options);
    }

    static createSearch(options) {
        return new Input().createSearch(options);
    }
}

// Экспорт для использования
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Input;
} else {
    window.Input = Input;
}
