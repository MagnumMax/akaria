/**
 * Card Component - shadcn/ui style
 * Компонент карточки в стиле shadcn/ui
 */

class Card {
    constructor() {
        this.baseClasses = 'ds-card';
    }

    create(options = {}) {
        const {
            className = '',
            children = '',
            onClick = null
        } = options;

        const card = document.createElement('div');
        card.className = `${this.baseClasses} ${className}`.trim();

        if (typeof children === 'string') {
            card.innerHTML = children;
        } else if (children instanceof HTMLElement) {
            card.appendChild(children);
        } else if (Array.isArray(children)) {
            children.forEach(child => {
                if (typeof child === 'string') {
                    card.innerHTML += child;
                } else if (child instanceof HTMLElement) {
                    card.appendChild(child);
                }
            });
        }

        if (onClick) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', onClick);
        }

        return card;
    }

    createHeader(options = {}) {
        const {
            className = '',
            children = ''
        } = options;

        const header = document.createElement('div');
        header.className = `ds-card-header ${className}`.trim();

        if (typeof children === 'string') {
            header.innerHTML = children;
        } else if (children instanceof HTMLElement) {
            header.appendChild(children);
        }

        return header;
    }

    createTitle(options = {}) {
        const {
            className = '',
            children = '',
            level = 3
        } = options;

        const title = document.createElement(`h${level}`);
        title.className = `ds-card-title ${className}`.trim();
        title.textContent = children;

        return title;
    }

    createDescription(options = {}) {
        const {
            className = '',
            children = ''
        } = options;

        const description = document.createElement('p');
        description.className = `text-sm text-muted-foreground ${className}`.trim();
        description.textContent = children;

        return description;
    }

    createContent(options = {}) {
        const {
            className = '',
            children = ''
        } = options;

        const content = document.createElement('div');
        content.className = `ds-card-content ${className}`.trim();

        if (typeof children === 'string') {
            content.innerHTML = children;
        } else if (children instanceof HTMLElement) {
            content.appendChild(children);
        } else if (Array.isArray(children)) {
            children.forEach(child => {
                if (typeof child === 'string') {
                    content.innerHTML += child;
                } else if (child instanceof HTMLElement) {
                    content.appendChild(child);
                }
            });
        }

        return content;
    }

    createFooter(options = {}) {
        const {
            className = '',
            children = ''
        } = options;

        const footer = document.createElement('div');
        footer.className = `ds-card-footer ${className}`.trim();

        if (typeof children === 'string') {
            footer.innerHTML = children;
        } else if (children instanceof HTMLElement) {
            footer.appendChild(children);
        } else if (Array.isArray(children)) {
            children.forEach(child => {
                if (typeof child === 'string') {
                    footer.innerHTML += child;
                } else if (child instanceof HTMLElement) {
                    footer.appendChild(child);
                }
            });
        }

        return footer;
    }

    // Статические методы для быстрого создания
    static create(options) {
        return new Card().create(options);
    }

    static createHeader(options) {
        return new Card().createHeader(options);
    }

    static createTitle(options) {
        return new Card().createTitle(options);
    }

    static createDescription(options) {
        return new Card().createDescription(options);
    }

    static createContent(options) {
        return new Card().createContent(options);
    }

    static createFooter(options) {
        return new Card().createFooter(options);
    }
}

// Экспорт для использования
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Card;
} else {
    window.Card = Card;
}
