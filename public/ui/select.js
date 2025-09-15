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
        const baseClasses = [
            'flex',
            'h-10',
            'w-full',
            'items-center',
            'justify-between',
            'rounded-md',
            'border',
            'border-input',
            'bg-background',
            'px-3',
            'py-2',
            'text-sm',
            'ring-offset-background',
            'placeholder:text-muted-foreground',
            'focus:outline-none',
            'focus:ring-2',
            'focus:ring-ring',
            'focus:ring-offset-2',
            'disabled:cursor-not-allowed',
            'disabled:opacity-50',
            'cursor-pointer'
        ];

        // Стили для размеров
        const sizeClasses = {
            sm: ['h-9', 'px-2', 'text-xs'],
            default: ['h-10', 'px-3', 'text-sm'],
            lg: ['h-11', 'px-4', 'text-base']
        };

        // Стили для вариантов
        const variantClasses = {
            default: ['border-gray-300', 'focus:ring-blue-500', 'focus:border-transparent'],
            destructive: ['border-red-300', 'focus:ring-red-500', 'focus:border-transparent'],
            outline: ['border-gray-300', 'bg-transparent', 'focus:ring-blue-500'],
            ghost: ['border-transparent', 'bg-transparent', 'focus:ring-blue-500']
        };

        // Применяем классы
        const allClasses = [
            ...baseClasses,
            ...(sizeClasses[size] || sizeClasses.default),
            ...(variantClasses[variant] || variantClasses.default)
        ];

        if (className) {
            allClasses.push(...className.split(' ').filter(Boolean));
        }

        select.className = allClasses.join(' ');

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
        container.className = 'relative';

        const trigger = document.createElement('button');
        trigger.type = 'button';
        trigger.disabled = disabled;

        // Базовые стили для триггера
        const baseClasses = [
            'flex',
            'h-10',
            'w-full',
            'items-center',
            'justify-between',
            'rounded-md',
            'border',
            'border-input',
            'bg-background',
            'px-3',
            'py-2',
            'text-sm',
            'ring-offset-background',
            'placeholder:text-muted-foreground',
            'focus:outline-none',
            'focus:ring-2',
            'focus:ring-ring',
            'focus:ring-offset-2',
            'disabled:cursor-not-allowed',
            'disabled:opacity-50'
        ];

        // Стили для размеров
        const sizeClasses = {
            sm: ['h-9', 'px-2', 'text-xs'],
            default: ['h-10', 'px-3', 'text-sm'],
            lg: ['h-11', 'px-4', 'text-base']
        };

        // Стили для вариантов
        const variantClasses = {
            default: ['border-gray-300', 'focus:ring-blue-500', 'focus:border-transparent'],
            destructive: ['border-red-300', 'focus:ring-red-500', 'focus:border-transparent'],
            outline: ['border-gray-300', 'bg-transparent', 'focus:ring-blue-500'],
            ghost: ['border-transparent', 'bg-transparent', 'focus:ring-blue-500']
        };

        // Применяем классы к триггеру
        const allClasses = [
            ...baseClasses,
            ...(sizeClasses[size] || sizeClasses.default),
            ...(variantClasses[variant] || variantClasses.default)
        ];

        if (className) {
            allClasses.push(...className.split(' ').filter(Boolean));
        }

        trigger.className = allClasses.join(' ');

        // Текст триггера
        const triggerText = document.createElement('span');
        const selectedOption = selectOptions.find(opt => opt.value === defaultValue);
        triggerText.textContent = selectedOption ? selectedOption.label : placeholder;
        triggerText.className = selectedOption ? '' : 'text-gray-500';

        // Иконка стрелки
        const arrow = document.createElement('span');
        arrow.innerHTML = '▼';
        arrow.className = 'ml-2 h-4 w-4 opacity-50 transition-transform';

        trigger.appendChild(triggerText);
        trigger.appendChild(arrow);

        // Выпадающий список
        const dropdown = document.createElement('div');
        dropdown.className = 'absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 text-gray-950 shadow-md hidden top-full mt-1 w-full';

        // Поле поиска (если включено)
        if (searchable) {
            const searchInput = document.createElement('input');
            searchInput.type = 'text';
            searchInput.placeholder = 'Поиск...';
            searchInput.className = 'w-full px-2 py-1 text-sm border-b border-gray-200 focus:outline-none focus:border-blue-500 mb-1';
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
            item.className = 'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50';
            item.textContent = option.label;
            item.dataset.value = option.value;
            item.dataset.option = 'true';

            if (option.disabled) {
                item.dataset.disabled = 'true';
                item.className += ' opacity-50 pointer-events-none';
            }

            if (option.value === defaultValue) {
                item.className += ' bg-gray-100';
            }

            item.addEventListener('click', () => {
                if (option.disabled) return;

                // Обновляем текст триггера
                triggerText.textContent = option.label;
                triggerText.className = '';

                // Обновляем выбранное состояние
                dropdown.querySelectorAll('[data-option]').forEach(opt => {
                    opt.className = opt.className.replace(' bg-gray-100', '');
                });
                item.className += ' bg-gray-100';

                // Закрываем dropdown
                dropdown.classList.add('hidden');
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

            const isOpen = !dropdown.classList.contains('hidden');
            if (isOpen) {
                dropdown.classList.add('hidden');
                arrow.style.transform = '';
            } else {
                dropdown.classList.remove('hidden');
                arrow.style.transform = 'rotate(180deg)';
            }
        });

        // Закрытие при клике вне компонента
        document.addEventListener('click', (e) => {
            if (!container.contains(e.target)) {
                dropdown.classList.add('hidden');
                arrow.style.transform = '';
            }
        });

        container.appendChild(trigger);
        container.appendChild(dropdown);

        // Добавляем метод для получения значения
        container.getValue = () => {
            const selected = dropdown.querySelector('[data-option].bg-gray-100');
            return selected ? selected.dataset.value : '';
        };

        // Добавляем метод для установки значения
        container.setValue = (value) => {
            const option = selectOptions.find(opt => opt.value === value);
            if (option) {
                triggerText.textContent = option.label;
                triggerText.className = '';

                dropdown.querySelectorAll('[data-option]').forEach(opt => {
                    opt.className = opt.className.replace(' bg-gray-100', '');
                });
                const item = dropdown.querySelector(`[data-value="${value}"]`);
                if (item) {
                    item.className += ' bg-gray-100';
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
