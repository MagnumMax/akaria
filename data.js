// -----------------------------------------------------------------------------
// ДАННЫЕ ПРИЛОЖЕНИЯ
// -----------------------------------------------------------------------------

// Пользователи системы
const users = {
    CEO: { name: 'Alex Ivanov', role: 'CEO', avatar: 'https://i.pravatar.cc/150?u=ceo' },
    Agent: { name: 'Alex Ivanov', role: 'Agent', avatar: 'https://i.pravatar.cc/150?u=agent' },
    Admin: { name: 'Maria Sidorova', role: 'Admin', avatar: 'https://i.pravatar.cc/150?u=admin' }
};

// Иконки для интерфейса
const ICONS = {
    dashboard: `<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3L2 9l10 6 10-6-10-6z"/><path d="M2 9l10 6 10-6"/><path d="M2 15l10 6 10-6"/></svg>`,
    assistant: `<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 8V4H8"/><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M2 14h2m16 0h2M15 2v2M9 2v2"/></svg>`,
    deals: `<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/></svg>`,
    properties: `<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 21h12v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2z"/><path d="M14 10a4 4 0 0 1 4-4h2a2 2 0 0 1 2 2v2a4 4 0 0 1-4 4h-2a2 2 0 0 1-2-2v-2zM8 9V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><line x1="8" y1="13" x2="16" y2="13"/></svg>`,
    tasks: `<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="m9 14 2 2 4-4"/></svg>`,
    analytics: `<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>`,
    settings: `<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/></svg>`,
    imports: `<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>`,
    bot: `<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2" ry="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>`,
    chevron: `<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6,9 12,15 18,9"/></svg>`
};

// Данные сделок
const dealsData = [
    { id: 1, title: 'Villa in Palm Jumeirah', client: 'John Doe', agent: 'Alex Ivanov', amount: 5_200_000, status: 'New Lead', summary: 'Client John Doe, budget around $5.2M...', feedback: { liked: 'Sea view', disliked: 'Wants a modern kitchen', rating: 4, nextStep: 'Find properties with modern kitchens and sea views' } },
    { id: 2, title: 'Penthouse Downtown', client: 'Jane Smith', agent: 'Alex Ivanov', amount: 3_800_000, status: 'Qualified', summary: 'Jane Smith looking for luxury penthouse...', offerUrl: '#offer/2' },
    { id: 3, title: 'Marina Apartment', client: 'Bob Johnson', agent: 'Alex Ivanov', amount: 2_100_000, status: 'Offer Sent', summary: 'Bob Johnson interested in marina views...', offerUrl: '#offer/3' },
    { id: 4, title: 'Business Bay Office', client: 'Alice Brown', agent: 'Alex Ivanov', amount: 4_500_000, status: 'Negotiation', summary: 'Alice Brown negotiating office space...' },
    { id: 5, title: 'Luxury Villa JBR', client: 'Elon Musk', agent: 'Alex Ivanov', amount: 8_900_000, status: 'New Lead', summary: 'High-profile client interested in JBR area...', offerUrl: '#offer/5' }
];

// Данные задач
const tasksData = [
    { id: 1, title: 'Follow up with John Doe', due: '2024-09-10', status: 'Today', completed: false, agent: 'Alex Ivanov', createdBy: 'Jessica'},
    { id: 2, title: 'Prepare offer for Jane Smith', due: '2024-09-11', status: 'Upcoming', completed: false, agent: 'Alex Ivanov' },
    { id: 3, title: 'Schedule property viewing', due: '2024-09-09', status: 'Overdue', completed: false, agent: 'Alex Ivanov' },
    { id: 4, title: 'Update CRM with client feedback', due: '2024-09-10', status: 'Today', completed: true, agent: 'Alex Ivanov' },
    { id: 5, title: 'Review contract terms', due: '2024-09-12', status: 'Upcoming', completed: false, agent: 'Alex Ivanov' }
];

// Данные недвижимости
const propertiesData = [
    { id: 1, name: 'Luxury Villa with Sea View', location: 'Palm Jumeirah', price: 5_200_000, beds: 5, baths: 6, area: 6500, agent: 'Alex Ivanov', image: 'https://picsum.photos/seed/p1/800/600' },
    { id: 2, name: 'Modern Apartment, Marina View', location: 'Dubai Marina', price: 3_800_000, beds: 3, baths: 4, area: 2200, agent: 'Alex Ivanov', image: 'https://picsum.photos/seed/p2/800/600' },
    { id: 3, name: 'Penthouse in Downtown', location: 'Downtown Dubai', price: 7_500_000, beds: 4, baths: 5, area: 4500, agent: 'Alex Ivanov', image: 'https://picsum.photos/seed/p3/800/600' },
    { id: 4, name: 'Beachfront Apartment', location: 'JBR', price: 2_100_000, beds: 2, baths: 3, area: 1800, agent: 'Alex Ivanov', image: 'https://picsum.photos/seed/p4/800/600' },
    { id: 5, name: 'Commercial Office Space', location: 'Business Bay', price: 4_500_000, beds: 0, baths: 2, area: 3000, agent: 'Alex Ivanov', image: 'https://picsum.photos/seed/p5/800/600' }
];

// Диалоги с ассистентами
const assistantDialogs = [
    { id: 1, client: 'Mark Zuckerberg', lastMessage: 'Thanks, Jessica! Looks interesting...', status: 'Waiting for Client' },
    { id: 2, client: 'Elon Musk', lastMessage: 'Planning to send: "Based on your interest..."', status: 'Approval Needed' },
    { id: 3, client: 'Jeff Bezos', lastMessage: 'I found 3 properties that match...', status: 'Ready for Handoff' },
    { id: 4, client: 'Bill Gates', lastMessage: 'Client asked about financing options...', status: 'Waiting for Client' }
];

// Аномалия для CEO
const ceoAnomaly = {
    agent: 'Anna Petrova',
    metric: 'Lead Qualification Rate',
    value: '15% below team average',
    suggestion: 'Review AI prompt settings.'
};

// Данные команды
const teamPulseData = [
    { agent: 'Alex Ivanov', dialogs: 12, responseTime: '32s', conversion: '68%' },
    { agent: 'Anna Petrova', dialogs: 8, responseTime: '45s', conversion: '53%' },
    { agent: 'David Williams', dialogs: 15, responseTime: '28s', conversion: '71%' }
];

// Импортированные лиды
const importedLeads = [
    { name: 'Vitalik Buterin', phone: '+971 50 123 4567', status: 'Unassigned' },
    { name: 'Pavel Durov', phone: '+971 50 234 5678', status: 'Unassigned' },
    { name: 'Gavin Wood', phone: '+971 50 345 6789', status: 'Unassigned' },
    { name: 'Charles Hoskinson', phone: '+971 50 456 7890', status: 'Unassigned' },
    { name: 'Changpeng Zhao', phone: '+971 50 567 8901', status: 'Unassigned' }
];

// Неактивные пользователи
const inactiveUsers = [
    { name: 'Old Agent', lastSeen: '45 days ago' }
];

// Системные ошибки
const systemErrors = [
    { code: 'API-502', message: 'Failed to connect to WhatsApp Gateway', time: '2 hours ago' }
];

// Статистика ассистентов
const assistantStats = [
    { assistant: 'Jessica', owner: 'Alex Ivanov', dialogs: 152, conversion: '68%' },
    { assistant: 'Sarah', owner: 'Anna Petrova', dialogs: 121, conversion: '53%' },
    { assistant: 'David', owner: 'David Williams', dialogs: 189, conversion: '71%' }
];

// Навигационные ссылки для разных ролей
const navLinks = {
    CEO: [
        { id: 'dashboard', name: 'Dashboard', icon: ICONS.dashboard },
        { id: 'deals', name: 'Deals', icon: ICONS.deals },
        { id: 'properties', name: 'Properties', icon: ICONS.properties },
        { id: 'tasks', name: 'Tasks', icon: ICONS.tasks },
        { id: 'analytics', name: 'Analytics', icon: ICONS.analytics },
        { type: 'divider' },
        { id: 'my-assistant', name: 'My Assistant', icon: ICONS.assistant }
    ],
    Agent: [
        { id: 'dashboard', name: 'Dashboard', icon: ICONS.dashboard },
        { id: 'tasks', name: 'My Tasks', icon: ICONS.tasks },
        { id: 'deals', name: 'My Deals', icon: ICONS.deals },
        { id: 'properties', name: 'Properties', icon: ICONS.properties },
        { type: 'divider' },
        { id: 'my-assistant', name: 'My Assistant', icon: ICONS.assistant }
    ],
    Admin: [
        { id: 'dashboard', name: 'Dashboard', icon: ICONS.dashboard },
        { id: 'imports', name: 'Imports', icon: ICONS.imports },
        { id: 'properties', name: 'Manage Properties', icon: ICONS.properties },
        { id: 'settings', name: 'Settings', icon: ICONS.settings }
    ]
};