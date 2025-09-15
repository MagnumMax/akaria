// Временный скрипт для отладки - захват логов консоли
(function() {
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    const logs = [];

    function captureLog(type, args) {
        logs.push({
            type: type,
            message: Array.from(args).join(' '),
            timestamp: new Date().toISOString(),
            stack: new Error().stack
        });

        // Отображаем логи на странице для отладки
        displayLogs();
    }

    console.log = function(...args) {
        captureLog('log', args);
        originalLog.apply(console, args);
    };

    console.error = function(...args) {
        captureLog('error', args);
        originalError.apply(console, args);
    };

    console.warn = function(...args) {
        captureLog('warn', args);
        originalWarn.apply(console, args);
    };

    function displayLogs() {
        if (document.readyState !== 'complete') return;

        let debugPanel = document.getElementById('debug-console');
        if (!debugPanel) {
            debugPanel = document.createElement('div');
            debugPanel.id = 'debug-console';
            debugPanel.style.cssText = `
                position: fixed;
                top: 10px;
                right: 10px;
                width: 400px;
                max-height: 300px;
                background: rgba(0,0,0,0.9);
                color: white;
                font-family: monospace;
                font-size: 12px;
                padding: 10px;
                border-radius: 5px;
                z-index: 10000;
                overflow-y: auto;
            `;
            if (document.body) {
                document.body.appendChild(debugPanel);
            } else {
                return; // Подождем загрузки DOM
            }
        }

        debugPanel.innerHTML = logs.slice(-10).map(log =>
            `<div style="color: ${log.type === 'error' ? '#ff6b6b' : log.type === 'warn' ? '#ffd93d' : '#51cf66'}; margin-bottom: 5px;">
                [${log.type.toUpperCase()}] ${log.message}
            </div>`
        ).join('');
    }

    // Глобальный доступ к логам для отладки
    window.getConsoleLogs = () => logs;
    window.clearConsoleLogs = () => { logs.length = 0; displayLogs(); };

    // Отложенный вызов для избежания ошибок
    if (document.readyState === 'complete') {
        console.log('Console logger initialized');
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('Console logger initialized');
        });
    }
})();
