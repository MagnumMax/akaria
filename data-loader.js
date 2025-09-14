// Загрузчик данных для приложения

// Импорт всех данных
import { ICONS } from './data/icons.js';
import { dealsData } from './data/deals.js';
import { tasksData } from './data/tasks.js';
import { propertiesData } from './data/properties.js';
import { assistantDialogs } from './data/assistant.js';

// Экспорт для глобального использования
window.ICONS = ICONS;
window.dealsData = dealsData;
window.tasksData = tasksData;
window.propertiesData = propertiesData;
window.assistantDialogs = assistantDialogs;

// Дополнительные данные, которые остались в основном файле
window.ceoAnomaly = {
    detected: true,
    type: 'Unusual Activity Pattern',
    description: 'CEO accessed system at 3:47 AM, reviewed 47 deals in 12 minutes',
    riskLevel: 'Medium',
    timestamp: '2024-09-09 03:47:23',
    actions: ['Monitor', 'Alert Security', 'Review Access Logs']
};

window.teamPulseData = {
    overall: 78,
    trends: {
        productivity: +12,
        satisfaction: -3,
        collaboration: +8
    },
    alerts: [
        { agent: 'Alex Ivanov', issue: 'Missed 2 follow-ups', severity: 'medium' },
        { agent: 'Anna Petrova', issue: 'Client complaint', severity: 'high' }
    ]
};

window.importedLeads = [
    { id: 1, name: 'Michael Chen', source: 'LinkedIn', budget: '2.5M-3M', status: 'New', imported: '2024-09-09' },
    { id: 2, name: 'Sarah Williams', source: 'Website', budget: '5M+', status: 'Contacted', imported: '2024-09-08' },
    { id: 3, name: 'David Rodriguez', source: 'Referral', budget: '1M-2M', status: 'Qualified', imported: '2024-09-07' }
];

window.inactiveUsers = [
    { id: 1, name: 'Tom Wilson', role: 'Agent', lastActive: '2024-08-15', deals: 3 },
    { id: 2, name: 'Lisa Brown', role: 'Agent', lastActive: '2024-08-20', deals: 7 }
];

window.systemErrors = [
    { id: 1, type: 'Database Connection', message: 'Timeout connecting to leads DB', time: '2024-09-09 14:23', status: 'Resolved' },
    { id: 2, type: 'API Error', message: 'Property images failing to load', time: '2024-09-09 15:45', status: 'Investigating' }
];

window.assistantStats = {
    totalConversations: 1247,
    activeChats: 23,
    avgResponseTime: '1.2s',
    successRate: 94.7,
    topQueries: ['Property search', 'Price inquiry', 'Viewing schedule']
};

console.log('Данные успешно загружены');