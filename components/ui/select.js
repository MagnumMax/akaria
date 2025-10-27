// Select компонент в стиле shadcn/ui
class Select {
    static create(options = {}) {
        const {
            options: selectOptions = [],
            defaultValue = '',
            placeholder = 'Выберите опцию',
            disabled = false,
            className = '',
            size = 'default',
            variant = 'default',
            onChange = null
        } = options;

        const select = document.createElement('select');
        select.disabled = disabled;
        select.value = defaultValue;

        // Базовые стили
        const baseClasses = ['ds-select'];

        const sizeClasses = {
            sm: 'ds-select-sm',
            default: '',
            lg: 'ds-select-lg'
        };

        const variantClasses = {
            default: '',
            outline: 'ds-select-outline',
            ghost: 'ds-select-ghost',
            destructive: 'ds-select-destructive'
        };

        const composed = [
            ...baseClasses,
            sizeClasses[size] || sizeClasses.default,
            variantClasses[variant] || variantClasses.default,
            className
        ].filter(Boolean);

        select.className = composed.join(' ');

        // Добавляем placeholder если нет defaultValue
        if (!defaultValue && placeholder) {
            const placeholderOption = document.createElement('option');
            placeholderOption.value = '';
            placeholderOption.textContent = placeholder;
            placeholderOption.disabled = true;
            placeholderOption.selected = true;
            select.appendChild(placeholderOption);
        }

        // Добавляем опции
        selectOptions.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.label;

            if (option.disabled) {
                optionElement.disabled = true;
            }

            if (option.value === defaultValue) {
                optionElement.selected = true;
            }

            select.appendChild(optionElement);
        });

        // Добавляем обработчик изменений
        if (onChange) {
            select.addEventListener('change', onChange);
        }

        return select;
    }

    // Создание кастомного select с выпадающим списком
    static createCustom(options = {}) {
        const {
            options: selectOptions = [],
            defaultValue = '',
            placeholder = 'Выберите опцию',
            disabled = false,
            className = '',
            size = 'default',
            variant = 'default',
            onChange = null,
            searchable = false
        } = options;

        const container = document.createElement('div');
        container.className = 'relative ds-select-container';

        const trigger = document.createElement('button');
        trigger.type = 'button';
        trigger.disabled = disabled;

        const sizeMap = {
            sm: 'ds-select-trigger-sm',
            default: '',
            lg: 'ds-select-trigger-lg'
        };

        const variantMap = {
            default: '',
            outline: 'ds-select-outline',
            ghost: 'ds-select-ghost',
            destructive: 'ds-select-destructive'
        };

        trigger.className = [
            'ds-select-trigger',
            sizeMap[size] || '',
            variantMap[variant] || '',
            className
        ].filter(Boolean).join(' ');

        // Текст триггера
        const triggerText = document.createElement('span');
        const selectedOption = selectOptions.find(opt => opt.value === defaultValue);
        triggerText.textContent = selectedOption ? selectedOption.label : placeholder;
        triggerText.className = selectedOption ? 'ds-select-trigger-label' : 'ds-select-placeholder';

        // Иконка стрелки
        const arrow = document.createElement('span');
        arrow.innerHTML = '▼';
        arrow.className = 'ds-select-arrow';

        trigger.appendChild(triggerText);
        trigger.appendChild(arrow);

        // Выпадающий список
        const dropdown = document.createElement('div');
        dropdown.className = 'ds-select-dropdown';

        // Поле поиска (если включено)
        if (searchable) {
            const searchInput = document.createElement('input');
            searchInput.type = 'text';
            searchInput.placeholder = 'Поиск...';
            searchInput.className = 'ds-input ds-select-search';
            dropdown.appendChild(searchInput);

            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                const items = dropdown.querySelectorAll('[data-option]');
                items.forEach(item => {
                    const text = item.textContent.toLowerCase();
                    item.style.display = text.includes(query) ? 'block' : 'none';
                });
            });
        }

        // Опции
        selectOptions.forEach(option => {
            const item = document.createElement('div');
            item.className = 'ds-select-option';
            item.textContent = option.label;
            item.dataset.value = option.value;
            item.dataset.option = 'true';

            if (option.disabled) {
                item.dataset.disabled = 'true';
                item.classList.add('is-disabled');
            }

            if (option.value === defaultValue) {
                item.classList.add('is-selected');
            }

            item.addEventListener('click', () => {
                if (option.disabled) return;

                // Обновляем текст триггера
                triggerText.textContent = option.label;
                triggerText.className = '';

                // Обновляем выбранное состояние
                dropdown.querySelectorAll('[data-option]').forEach(opt => {
                    opt.classList.remove('is-selected');
                });
                item.classList.add('is-selected');

                // Закрываем dropdown
                dropdown.classList.remove('open');
                arrow.style.transform = '';

                // Вызываем callback
                if (onChange) {
                    onChange({ target: { value: option.value } });
                }
            });

            dropdown.appendChild(item);
        });

        // Обработчик клика по триггеру
        trigger.addEventListener('click', () => {
            if (disabled) return;

            const isOpen = dropdown.classList.contains('open');
            dropdown.classList.toggle('open');
            arrow.style.transform = isOpen ? '' : 'rotate(180deg)';
        });

        // Закрытие при клике вне компонента
        document.addEventListener('click', (e) => {
            if (!container.contains(e.target)) {
                dropdown.classList.remove('open');
                arrow.style.transform = '';
            }
        });

        container.appendChild(trigger);
        container.appendChild(dropdown);

        // Добавляем метод для получения значения
        container.getValue = () => {
            const selected = dropdown.querySelector('[data-option].is-selected');
            return selected ? selected.dataset.value : '';
        };

        // Добавляем метод для установки значения
        container.setValue = (value) => {
            const option = selectOptions.find(opt => opt.value === value);
            if (option) {
                triggerText.textContent = option.label;
                triggerText.className = '';

                dropdown.querySelectorAll('[data-option]').forEach(opt => {
                    opt.classList.remove('is-selected');
                });
                const item = dropdown.querySelector(`[data-value="${value}"]`);
                if (item) {
                    item.classList.add('is-selected');
                }
            }
        };

        return container;
    }
}

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Select;
}

// Глобальная доступность
window.Select = Select;
