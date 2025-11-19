/**
 * Badge Component - shadcn/ui style
 * Badge Component - shadcn/ui style
 */

class Badge {
    constructor() {
        this.variants = {
            default: 'border-transparent bg-gray-900 text-gray-50 hover:bg-gray-900/80',
            secondary: 'border-transparent bg-gray-100 text-gray-900 hover:bg-gray-100/80',
            destructive: 'border-transparent bg-red-500 text-gray-50 hover:bg-red-500/80',
            outline: 'text-gray-950 border-gray-200 bg-white hover:bg-gray-100',
            success: 'border-transparent bg-green-500 text-gray-50 hover:bg-green-500/80',
            warning: 'border-transparent bg-yellow-500 text-gray-50 hover:bg-yellow-500/80',
            info: 'border-transparent bg-blue-500 text-gray-50 hover:bg-blue-500/80'
        };

        this.sizes = {
            sm: 'text-xs px-2 py-0.5',
            default: 'text-xs px-2.5 py-0.5',
            lg: 'text-sm px-3 py-1'
        };

        this.baseClasses = 'inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2';
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

            // Add keyboard support
            badge.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick(e);
                }
            });
        }

        return badge;
    }

    // Create badge with status
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

    // Create badge with icon
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

    // Create dismissible badge
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

        // Add text
        if (children) {
            const textSpan = document.createElement('span');
            textSpan.textContent = children;
            textSpan.className = 'mr-1';
            badge.appendChild(textSpan);
        }

        // Add close button
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '×';
        closeButton.className = 'ml-1 hover:bg-black/10 rounded-full w-4 h-4 flex items-center justify-center text-xs';
        closeButton.setAttribute('aria-label', 'Remove');

        if (onDismiss) {
            closeButton.addEventListener('click', (e) => {
                e.stopPropagation();
                onDismiss(e);
            });
        }

        badge.appendChild(closeButton);

        return badge;
    }

    // Static methods for quick creation
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

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Badge;
} else {
    window.Badge = Badge;
}
