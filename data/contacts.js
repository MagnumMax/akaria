// Contacts Data
console.log('📂 Loading contacts data...');
window.contactsData = [
    {
        id: 1,
        name: 'John Doe',
        phone: '+971 50 123 4567',
        email: 'john.doe@email.com',
        source: 'Website',
        lastContact: '2024-01-15',
        status: 'New',
        company: 'Tech Corp',
        position: 'CEO',
        aiSummary: 'Interested in luxury properties in Palm Jumeirah. Budget $5M+. Prefers sea view.',
        notes: 'VIP client, very responsive to WhatsApp messages',
        interactions: [
            { date: '2024-01-15', type: 'WhatsApp', message: 'Initial inquiry about Palm Jumeirah properties' },
            { date: '2024-01-14', type: 'Email', message: 'Sent property catalog' }
        ]
    },
    {
        id: 2,
        name: 'Jane Smith',
        phone: '+971 50 234 5678',
        email: 'jane.smith@company.com',
        source: 'Referral',
        lastContact: '2024-01-14',
        status: 'Contacted',
        company: 'Investment Group',
        position: 'Partner',
        aiSummary: 'Looking for investment properties in Business Bay. Portfolio expansion.',
        notes: 'Prefers email communication, decision maker',
        interactions: [
            { date: '2024-01-14', type: 'Phone', message: 'Discussed investment opportunities' },
            { date: '2024-01-13', type: 'Email', message: 'Sent market analysis report' }
        ]
    },
    {
        id: 3,
        name: 'Bob Johnson',
        phone: '+971 50 345 6789',
        email: 'bob.johnson@gmail.com',
        source: 'Social Media',
        lastContact: '2024-01-13',
        status: 'Qualified',
        company: 'Freelancer',
        position: 'Consultant',
        aiSummary: 'First-time buyer, looking for 2BR apartment in Marina. Budget $1.5M.',
        notes: 'Young professional, needs financing assistance',
        interactions: [
            { date: '2024-01-13', type: 'WhatsApp', message: 'Shared Marina apartment options' },
            { date: '2024-01-12', type: 'Call', message: 'Qualification call completed' }
        ]
    },
    {
        id: 4,
        name: 'Alice Brown',
        phone: '+971 50 456 7890',
        email: 'alice.brown@corp.ae',
        source: 'Google Ads',
        lastContact: '2024-01-12',
        status: 'Deal in progress',
        company: 'Emirates Corp',
        position: 'Manager',
        aiSummary: 'Negotiating penthouse in Downtown. Price sensitive, needs quick closure.',
        notes: 'Corporate relocation, company paying. Urgent timeline.',
        interactions: [
            { date: '2024-01-12', type: 'Meeting', message: 'Property viewing and negotiation' },
            { date: '2024-01-11', type: 'Email', message: 'Sent revised offer' }
        ]
    },
    {
        id: 5,
        name: 'Charlie Wilson',
        phone: '+971 50 567 8901',
        email: 'charlie.w@email.com',
        source: 'Walk-in',
        lastContact: '2024-01-10',
        status: 'Rejected',
        company: 'Retail Business',
        position: 'Owner',
        aiSummary: 'Was interested in commercial space but budget too low for current market.',
        notes: 'Keep for future opportunities when budget increases',
        interactions: [
            { date: '2024-01-10', type: 'Meeting', message: 'Budget mismatch, politely declined' },
            { date: '2024-01-09', type: 'Phone', message: 'Initial commercial space inquiry' }
        ]
    },
    {
        id: 6,
        name: 'Diana Prince',
        phone: '+971 50 678 9012',
        email: 'diana.prince@luxury.com',
        source: 'Website',
        lastContact: '2024-01-11',
        status: 'New',
        company: 'Luxury Brands',
        position: 'Director',
        aiSummary: 'High-net-worth individual seeking exclusive villa in Emirates Hills.',
        notes: 'Extremely selective, only premium properties',
        interactions: [
            { date: '2024-01-11', type: 'Email', message: 'Luxury villa inquiry received' }
        ]
    },
    {
        id: 7,
        name: 'Elon Musk',
        phone: '+971 50 789 0123',
        email: 'elon@spacex.com',
        source: 'Referral',
        lastContact: '2024-01-09',
        status: 'Contacted',
        company: 'SpaceX',
        position: 'CEO',
        aiSummary: 'Interested in futuristic smart home in Dubai Hills. Tech integration important.',
        notes: 'Celebrity client, high privacy requirements',
        interactions: [
            { date: '2024-01-09', type: 'WhatsApp', message: 'Discussed smart home features' },
            { date: '2024-01-08', type: 'Email', message: 'Initial contact through referral' }
        ]
    },
    {
        id: 8,
        name: 'Sarah Connor',
        phone: '+971 50 890 1234',
        email: 'sarah.connor@tech.com',
        source: 'Google Ads',
        lastContact: '2024-01-08',
        status: 'Qualified',
        company: 'Tech Solutions',
        position: 'CTO',
        aiSummary: 'Relocating from US, needs family home in Arabian Ranches. School proximity important.',
        notes: 'Family with 2 kids, school district is priority',
        interactions: [
            { date: '2024-01-08', type: 'Video Call', message: 'Virtual property tour conducted' },
            { date: '2024-01-07', type: 'Email', message: 'School district information shared' }
        ]
    }
];

console.log('✅ Contacts data loaded successfully!');
console.log('📊 Total contacts:', window.contactsData.length);
console.log('📋 Contact statuses:', window.contactsData.map(c => `${c.name}: "${c.status}"`));
