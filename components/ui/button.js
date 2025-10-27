/**
 * Button Component - shadcn/ui style
 * Компонент кнопки в стиле shadcn/ui
 */

class Button {
    constructor() {
        this.variants = {
            default: 'ds-button-primary',
            primary: 'ds-button-primary',
            outline: 'ds-button-outline',
            ghost: 'ds-button-ghost',
            destructive: 'ds-button-destructive',
            subtle: 'ds-button-subtle'
        };

        this.sizes = {
            sm: 'ds-button-sm',
            default: 'ds-button-md',
            md: 'ds-button-md',
            lg: 'ds-button-lg'
        };
    }

    create(options = {}) {
        const {
            variant = 'default',
            size = 'default',
            className = '',
            disabled = false,
            children = '',
            onClick = null,
            type = 'button',
            id = ''
        } = options;

        const baseClasses = 'ds-button';
        const variantClasses = this.variants[variant] || this.variants.default;
        const sizeClasses = this.sizes[size] || this.sizes.default;

        const button = document.createElement('button');
        button.type = type;
        button.className = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`.trim();
        button.innerHTML = children;
        button.disabled = disabled;

        if (id) button.id = id;
        if (onClick) button.addEventListener('click', onClick);

        return button;
    }

    // Статический метод для быстрого создания
    static create(options) {
        return new Button().create(options);
    }
}

// Экспорт для использования
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Button;
} else {
    window.Button = Button;
}
