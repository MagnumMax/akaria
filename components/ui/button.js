/**
 * Button Component - shadcn/ui style
 * Button Component - shadcn/ui style
 */

class Button {
    constructor() {
        this.variants = {
            default: 'bg-slate-900 text-slate-50 hover:bg-slate-900/90 focus:ring-slate-900',
            outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
            ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-blue-500',
            destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
        };

        this.sizes = {
            sm: 'px-3 py-1.5 text-sm',
            default: 'px-4 py-2 text-sm',
            lg: 'px-6 py-3 text-base'
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

        const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
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

    // Static method for quick creation
    static create(options) {
        return new Button().create(options);
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Button;
} else {
    window.Button = Button;
}
