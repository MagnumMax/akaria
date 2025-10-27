/**
 * Badge Component - shadcn/ui style
 * Компонент бейджа в стиле shadcn/ui
 */

class Badge {
    constructor() {
        this.variants = {
            default: '',
            primary: 'ds-badge-primary',
            secondary: 'ds-badge-secondary',
            destructive: 'ds-badge-danger',
            outline: 'ds-badge-outline',
            success: 'ds-badge-success',
            warning: 'ds-badge-warning',
            info: 'ds-badge-accent',
            accent: 'ds-badge-accent'
        };

        this.sizes = {
            sm: 'ds-badge-sm',
            default: '',
            lg: 'ds-badge-lg'
        };

        this.baseClasses = 'ds-badge';
    }

    create(options = {}) {
        const {
            variant = 'default',
            size = 'default',
            className = '',
            children = '',
            onClick = null
        } = options;

        const variantClasses = this.variants[variant] || this.variants.default;
        const sizeClasses = this.sizes[size] || this.sizes.default;

        const badge = document.createElement('span');
        badge.className = `${this.baseClasses} ${variantClasses} ${sizeClasses} ${className}`.trim();

        if (typeof children === 'string') {
            badge.textContent = children;
        } else if (children instanceof HTMLElement) {
            badge.appendChild(children);
        }

        if (onClick) {
            badge.style.cursor = 'pointer';
            badge.addEventListener('click', onClick);
            badge.setAttribute('role', 'button');
            badge.setAttribute('tabindex', '0');

            // Добавляем поддержку клавиатуры
            badge.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick(e);
                }
            });
        }

        return badge;
    }

    // Создание бейджа со статусом
    createStatus(status, text, options = {}) {
        const statusVariants = {
            'new': 'info',
            'contacted': 'secondary',
            'qualified': 'success',
            'deal in progress': 'warning',
            'rejected': 'destructive',
            'all': 'default'
        };

        const variant = statusVariants[status.toLowerCase()] || 'default';

        return this.create({
            variant,
            children: text || status,
            ...options
        });
    }

    // Создание бейджа с иконкой
    createWithIcon(options = {}) {
        const {
            icon = '',
            iconPosition = 'left',
            children = '',
            ...restOptions
        } = options;

        const badge = this.create(restOptions);

        if (icon) {
            const iconElement = document.createElement('span');
            iconElement.innerHTML = icon;
            iconElement.className = iconPosition === 'left' ? 'mr-1' : 'ml-1';

            if (iconPosition === 'left') {
                badge.insertBefore(iconElement, badge.firstChild);
                if (children) {
                    badge.appendChild(document.createTextNode(children));
                }
            } else {
                if (children) {
                    badge.insertBefore(document.createTextNode(children), badge.firstChild);
                }
                badge.appendChild(iconElement);
            }
        } else if (children) {
            badge.textContent = children;
        }

        return badge;
    }

    // Создание бейджа с возможностью удаления
    createDismissible(options = {}) {
        const {
            onDismiss = null,
            children = '',
            ...restOptions
        } = options;

        const badge = this.create({
            children: '',
            className: 'pr-1',
            ...restOptions
        });

        // Добавляем текст
        if (children) {
            const textSpan = document.createElement('span');
            textSpan.textContent = children;
            textSpan.className = 'mr-1';
            badge.appendChild(textSpan);
        }

        // Добавляем кнопку закрытия
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '×';
        closeButton.className = 'ml-1 ds-badge-close';
        closeButton.setAttribute('aria-label', 'Удалить');

        if (onDismiss) {
            closeButton.addEventListener('click', (e) => {
                e.stopPropagation();
                onDismiss(e);
            });
        }

        badge.appendChild(closeButton);

        return badge;
    }

    // Статические методы для быстрого создания
    static create(options) {
        return new Badge().create(options);
    }

    static createStatus(status, text, options) {
        return new Badge().createStatus(status, text, options);
    }

    static createWithIcon(options) {
        return new Badge().createWithIcon(options);
    }

    static createDismissible(options) {
        return new Badge().createDismissible(options);
    }
}

// Экспорт для использования
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Badge;
} else {
    window.Badge = Badge;
}
