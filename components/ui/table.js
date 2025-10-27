/**
 * Table Component - shadcn/ui style
 * Компонент таблицы в стиле shadcn/ui
 */

class Table {
    constructor() {
        this.baseClasses = 'ds-table';
    }

    create(options = {}) {
        const {
            className = '',
            children = ''
        } = options;

        const table = document.createElement('table');
        table.className = `${this.baseClasses} ${className}`.trim();

        if (typeof children === 'string') {
            table.innerHTML = children;
        } else if (children instanceof HTMLElement) {
            table.appendChild(children);
        } else if (Array.isArray(children)) {
            children.forEach(child => {
                if (child instanceof HTMLElement) {
                    table.appendChild(child);
                }
            });
        }

        return table;
    }

    createHeader(options = {}) {
        const {
            className = '',
            children = ''
        } = options;

        const thead = document.createElement('thead');
        thead.className = `ds-table-header ${className}`.trim();

        if (typeof children === 'string') {
            thead.innerHTML = children;
        } else if (children instanceof HTMLElement) {
            thead.appendChild(children);
        } else if (Array.isArray(children)) {
            children.forEach(child => {
                if (child instanceof HTMLElement) {
                    thead.appendChild(child);
                }
            });
        }

        return thead;
    }

    createBody(options = {}) {
        const {
            className = '',
            children = ''
        } = options;

        const tbody = document.createElement('tbody');
        tbody.className = `ds-table-body ${className}`.trim();

        if (typeof children === 'string') {
            tbody.innerHTML = children;
        } else if (children instanceof HTMLElement) {
            tbody.appendChild(children);
        } else if (Array.isArray(children)) {
            children.forEach(child => {
                if (child instanceof HTMLElement) {
                    tbody.appendChild(child);
                }
            });
        }

        return tbody;
    }

    createRow(options = {}) {
        const {
            className = '',
            children = '',
            onClick = null,
            hover = true
        } = options;

        const tr = document.createElement('tr');
        const hoverClass = hover ? 'is-hoverable' : '';
        tr.className = `ds-table-row ${hoverClass} ${className}`.trim();

        if (typeof children === 'string') {
            tr.innerHTML = children;
        } else if (children instanceof HTMLElement) {
            tr.appendChild(children);
        } else if (Array.isArray(children)) {
            children.forEach(child => {
                if (child instanceof HTMLElement) {
                    tr.appendChild(child);
                }
            });
        }

        if (onClick) {
            tr.style.cursor = 'pointer';
            tr.addEventListener('click', onClick);
        }

        return tr;
    }

    createHead(options = {}) {
        const {
            className = '',
            children = '',
            sortable = false,
            onSort = null
        } = options;

        const sortableClass = sortable ? 'is-sortable' : '';
        const th = document.createElement('th');
        th.className = `ds-table-head ${sortableClass} ${className}`.trim();

        if (typeof children === 'string') {
            th.innerHTML = children;
        } else if (children instanceof HTMLElement) {
            th.appendChild(children);
        }

        if (sortable && onSort) {
            th.addEventListener('click', onSort);
        }

        return th;
    }

    createCell(options = {}) {
        const {
            className = '',
            children = ''
        } = options;

        const td = document.createElement('td');
        td.className = `ds-table-cell ${className}`.trim();

        if (typeof children === 'string') {
            td.innerHTML = children;
        } else if (children instanceof HTMLElement) {
            td.appendChild(children);
        } else if (Array.isArray(children)) {
            children.forEach(child => {
                if (typeof child === 'string') {
                    td.innerHTML += child;
                } else if (child instanceof HTMLElement) {
                    td.appendChild(child);
                }
            });
        }

        return td;
    }

    // Создание контейнера таблицы с прокруткой
    createContainer(options = {}) {
        const {
            className = '',
            children = ''
        } = options;

        const container = document.createElement('div');
        container.className = `ds-table-container ${className}`.trim();

        if (children instanceof HTMLElement) {
            container.appendChild(children);
        }

        return container;
    }

    // Статические методы для быстрого создания
    static create(options) {
        return new Table().create(options);
    }

    static createHeader(options) {
        return new Table().createHeader(options);
    }

    static createBody(options) {
        return new Table().createBody(options);
    }

    static createRow(options) {
        return new Table().createRow(options);
    }

    static createHead(options) {
        return new Table().createHead(options);
    }

    static createCell(options) {
        return new Table().createCell(options);
    }

    static createContainer(options) {
        return new Table().createContainer(options);
    }
}

// Экспорт для использования
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Table;
} else {
    window.Table = Table;
}
