import { state, ICONS } from "../state.js";


function renderDealsPage() {
    const page = document.getElementById('page-deals');
    const assistantName = state.currentUserRole === 'CEO' ? 'Leonardo' : 'Jessica';

    // Define statuses
    // Define statuses
    const aiStatuses = ['AI Outreach', 'AI Engaging', 'AI Qualification'];
    const agentStatuses = ['Ready for Agent', 'Offer Sent', 'Negotiation', 'Closed Won', 'Closed Lost'];

    let visibleStatuses = [];

    if (state.currentUserRole === 'Agent') {
        // Agents only see their pipeline
        visibleStatuses = agentStatuses;
    } else {
        // Admins/CEO see everything
        // Unsorted is always visible at the start
        visibleStatuses = ['Unsorted'];

        if (state.dealsFilter.showAiStages) {
            visibleStatuses = [...visibleStatuses, ...aiStatuses, ...agentStatuses];
        } else {
            visibleStatuses = [...visibleStatuses, ...agentStatuses];
        }
    }

    // Filter deals
    let filteredDeals = dealsData;
    if (state.dealsFilter.search) {
        const term = state.dealsFilter.search.toLowerCase();
        filteredDeals = filteredDeals.filter(d =>
            d.title.toLowerCase().includes(term) ||
            d.client.toLowerCase().includes(term) ||
            d.summary.toLowerCase().includes(term)
        );
    }
    if (state.dealsFilter.agent && state.dealsFilter.agent !== 'All') {
        filteredDeals = filteredDeals.filter(d => d.agent === state.dealsFilter.agent);
    }

    // Get unique agents for filter
    const agents = ['All', ...new Set(dealsData.map(d => d.agent))];

    // Helper to render a status block (List View)
    const renderStatusBlock = (status) => {
        const statusDeals = filteredDeals.filter(d => d.status === status);
        if (statusDeals.length === 0) return '';

        const isAiStage = aiStatuses.includes(status);
        const isUnsorted = status === 'Unsorted';

        return `
            <details open class="group">
                <summary class="font-semibold mb-3 cursor-pointer flex items-center justify-between py-2 select-none rounded-lg hover:bg-gray-50 px-2 -mx-2 transition-colors">
                    <div class="flex items-center gap-2">
                        <span class="${isAiStage ? 'text-purple-600' : ''} ${isUnsorted ? 'text-gray-600' : ''}">${status}</span>
                        <span class="text-xs font-normal text-muted-foreground bg-gray-100 px-2 py-0.5 rounded-full">${statusDeals.length}</span>
                        ${isAiStage ? `<span class="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full flex items-center gap-1">🤖 AI Zone</span>` : ''}
                        ${isUnsorted ? `<span class="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full flex items-center gap-1">📥 Inbox</span>` : ''}
                    </div>
                    <span class="transform transition-transform group-open:rotate-180 text-gray-400">${ICONS.chevron}</span>
                </summary>
                <div class="collapsible-content pb-4 animate-in slide-in-from-top-2 duration-200">
                    <div class="border rounded-lg overflow-hidden shadow-sm ${isAiStage ? 'border-purple-100' : ''} ${isUnsorted ? 'border-gray-200' : ''}">
                        <div class="overflow-x-auto">
                            <table class="w-full text-sm text-left">
                                <thead class="text-xs text-gray-500 uppercase bg-gray-50/50 border-b">
                                    <tr>
                                        <th class="px-6 py-3 font-medium">Deal</th>
                                        <th class="px-6 py-3 font-medium">Client</th>
                                        <th class="px-6 py-3 font-medium">Amount</th>
                                        <th class="px-6 py-3 font-medium">Agent</th>
                                        <th class="px-6 py-3 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-100">
                                    ${statusDeals.map((deal, index) => `
                                        <tr class="bg-white hover:bg-gray-50/80 cursor-pointer transition-colors" onclick="window.location.hash = '#deal-details/${deal.id}'">
                                            <td class="px-6 py-4 font-medium align-middle">
                                                <div class="text-gray-900">${deal.title}</div>
                                                ${deal.summary ? `<div class="text-xs text-gray-500 mt-1 line-clamp-1 max-w-xs">${deal.summary}</div>` : ''}
                                            </td>
                                            <td class="px-6 py-4 align-middle text-gray-600">${deal.client}</td>
                                            <td class="px-6 py-4 align-middle font-medium text-gray-900">$${deal.amount.toLocaleString()}</td>
                                            <td class="px-6 py-4 align-middle">
                                                <div class="flex items-center gap-2">
                                                    ${deal.agent === 'AI Bot' ? `<span class="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">${ICONS.bot}</span>` : `<span class="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">${deal.agent.charAt(0)}</span>`}
                                                    <span class="text-sm text-gray-600">${deal.agent}</span>
                                                </div>
                                            </td>
                                            <td class="px-6 py-4 align-middle">
                                                ${deal.status === 'Ready for Agent' ? `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">🔥 Handoff</span>` :
                deal.offerUrl ? `<a href="${deal.offerUrl}" class="font-medium text-blue-600 hover:underline" onclick="event.stopPropagation()">View Offer</a>` :
                    `<span class="text-gray-400">-</span>`}
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </details>
        `;
    };

    // Helper to render Kanban Column
    const renderKanbanColumn = (status) => {
        const statusDeals = filteredDeals.filter(d => d.status === status);
        const isAiStage = aiStatuses.includes(status);

        return `
        <div class="flex-shrink-0 w-80 flex flex-col h-full max-h-full bg-gray-100/50 rounded-xl border border-gray-200">
            <div class="p-3 border-b border-gray-200 flex items-center justify-between bg-gray-50 rounded-t-xl">
                <div class="flex items-center gap-2">
                    <span class="font-semibold text-sm text-gray-700 ${isAiStage ? 'text-purple-700' : ''} ${status === 'Unsorted' ? 'text-gray-800' : ''}">${status}</span>
                    ${isAiStage ? `<span class="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded border border-purple-200">AI</span>` : ''}
                    ${status === 'Unsorted' ? `<span class="text-[10px] bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded border border-gray-200">Inbox</span>` : ''}
                </div>
                <span class="bg-white border border-gray-200 text-gray-500 text-xs px-2 py-0.5 rounded-full">${statusDeals.length}</span>
            </div>
            <div class="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
                ${statusDeals.map(deal => `
                    <div onclick="window.location.hash = '#deal-details/${deal.id}'" class="bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                        <div class="flex justify-between items-start mb-2">
                            <span class="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full line-clamp-1 max-w-[70%]">${deal.client}</span>
                            <span class="text-xs text-gray-400 font-mono">$${(deal.amount / 1000).toFixed(0)}k</span>
                        </div>
                        <h4 class="text-sm font-medium text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">${deal.title}</h4>
                        ${deal.summary ? `<p class="text-xs text-gray-500 line-clamp-2 mb-3">${deal.summary}</p>` : ''}
                        
                        <div class="flex items-center justify-between pt-2 border-t border-gray-50 mt-2">
                            <div class="flex items-center gap-1.5">
                                ${deal.agent === 'AI Bot' ?
                `<div class="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-[10px]">${ICONS.bot}</div>` :
                `<div class="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-[10px] font-bold">${deal.agent.charAt(0)}</div>`
            }
                                <span class="text-xs text-gray-500 truncate max-w-[80px]">${deal.agent}</span>
                            </div>
                            ${deal.status === 'Ready for Agent' ? `<span class="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">🔥 Handoff</span>` : ''}
                        </div>
                    </div>
                `).join('')}
                ${statusDeals.length === 0 ? `<div class="h-20 flex items-center justify-center text-gray-400 text-xs italic border-2 border-dashed border-gray-200 rounded-lg m-1">No deals</div>` : ''}
            </div>
        </div>
    `;
    };

    page.innerHTML = `
        <div class="flex flex-col h-[calc(100vh-100px)]">
            <!-- Header -->
            <div class="flex-shrink-0 mb-6 space-y-4">
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 class="text-2xl font-bold tracking-tight">Deals Pipeline</h2>
                        <p class="text-muted-foreground">Manage your deals and track progress.</p>
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
                            <button onclick="state.dealsViewMode = 'list'; renderDealsPage();" class="px-3 py-1.5 rounded-md text-sm font-medium transition-all ${state.dealsViewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}">
                                List
                            </button>
                            <button onclick="state.dealsViewMode = 'kanban'; renderDealsPage();" class="px-3 py-1.5 rounded-md text-sm font-medium transition-all ${state.dealsViewMode === 'kanban' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}">
                                Kanban
                            </button>
                        </div>
                        <button class="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all shadow-sm hover:shadow-md">
                            + Add Deal
                        </button>
                    </div>
                </div>

                <!-- Filters -->
                <div class="flex flex-wrap items-center gap-3 bg-white p-1">
                    <div class="relative flex-1 min-w-[200px]">
                        <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input 
                            type="text" 
                            placeholder="Search deals..." 
                            value="${state.dealsFilter.search}"
                            oninput="state.dealsFilter.search = this.value; renderDealsPage();"
                            class="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                    </div>
                    <select 
                        onchange="state.dealsFilter.agent = this.value; renderDealsPage();"
                        class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                        ${agents.map(agent => `<option value="${agent}" ${state.dealsFilter.agent === agent ? 'selected' : ''}>${agent}</option>`).join('')}
                    </select>
                    ${state.currentUserRole !== 'Agent' ? `
                        <label class="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg bg-white cursor-pointer hover:bg-gray-50 select-none">
                            <input 
                                type="checkbox" 
                                ${state.dealsFilter.showAiStages ? 'checked' : ''} 
                                onchange="state.dealsFilter.showAiStages = this.checked; renderDealsPage();"
                                class="rounded text-purple-600 focus:ring-purple-500"
                            >
                            <span class="text-sm text-gray-700">Show AI Stages</span>
                        </label>
                    ` : ''}
                </div>
            </div>

            <!-- Content -->
            ${state.dealsViewMode === 'list' ? `
                <div class="flex-1 overflow-y-auto space-y-2 pb-10">
                    ${visibleStatuses.map(status => renderStatusBlock(status)).join('')}
                </div>
            ` : `
                <div class="flex-1 relative min-h-0">
                    <div class="absolute inset-0 overflow-x-auto overflow-y-hidden pb-4">
                        <div class="flex h-full gap-4 px-1 min-w-max">
                            ${visibleStatuses.map(status => renderKanbanColumn(status)).join('')}
                        </div>
                    </div>
                </div>
            `}
        </div>
    `;
}
window.renderDealsPage = renderDealsPage;


function renderDealDetailsPage(dealId) {
    const page = document.getElementById('page-deal-details');
    const deal = dealsData.find(d => d.id === dealId) || dealsData[0];
    const assistantName = state.currentUserRole === 'CEO' ? 'Leonardo' : 'Jessica';

    // Mock data generation for "more info"
    const probability = Math.min(95, 40 + (deal.id * 5) % 50);
    const phone = `+ 971 50 ${1000000 + (deal.id * 12345) % 9000000} `;
    const email = `${deal.client.toLowerCase().replace(/\s+/g, '.')} @example.com`;

    // Status colors
    const getStatusColor = (s) => {
        if (s.includes('AI')) return 'bg-purple-100 text-purple-700';
        if (s === 'Closed Won') return 'bg-green-100 text-green-700';
        if (s === 'Closed Lost') return 'bg-red-100 text-red-700';
        return 'bg-blue-100 text-blue-700';
    };

    page.innerHTML = `
    <div class="max-w-6xl mx-auto space-y-6 pb-10">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <a href="#deals" class="text-sm text-muted-foreground hover:text-foreground mb-2 inline-flex items-center gap-1 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Pipeline
                </a>
                <h1 class="text-3xl font-bold text-gray-900">${deal.title}</h1>
                <div class="flex items-center gap-3 mt-2">
                    <span class="px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(deal.status)}">
                        ${deal.status}
                    </span>
                    <span class="text-gray-300">|</span>
                    <span class="font-medium text-gray-600 flex items-center gap-1">
                        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        ${deal.client}
                    </span>
                </div>
            </div>
            <div class="flex gap-3">
                <button class="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-all">
                    Edit Deal
                </button>
                <button class="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 shadow-sm transition-all flex items-center gap-2">
                    <span>Move Stage</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Left Column (Main Info) -->
            <div class="lg:col-span-2 space-y-6">

                <!-- Client Card -->
                <div class="bg-white border rounded-xl p-6 shadow-sm">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="font-semibold text-lg flex items-center gap-2">
                            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0c0 .884-.896 1.688-2.094 2M10 6c0 .884.896 1.688 2.094 2m4 6h.01M12 12h.01M8 12h.01M12 16h.01M16 16h.01M8 16h.01" /></svg>
                            Client Details
                        </h3>
                        <button class="text-sm text-blue-600 hover:underline">View Profile</button>
                    </div>
                    <div class="flex flex-col sm:flex-row items-start gap-6">
                        <div class="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-600 shadow-inner">
                            ${deal.client.charAt(0)}
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 flex-1 w-full">
                            <div>
                                <p class="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Full Name</p>
                                <p class="font-medium text-gray-900">${deal.client}</p>
                            </div>
                            <div>
                                <p class="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Email Address</p>
                                <p class="font-medium text-blue-600 hover:underline cursor-pointer flex items-center gap-1">
                                    ${email}
                                </p>
                            </div>
                            <div>
                                <p class="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Phone Number</p>
                                <p class="font-medium text-gray-900 flex items-center gap-2">
                                    ${phone}
                                    <button class="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600" title="Copy">
                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                    </button>
                                </p>
                            </div>
                            <div>
                                <p class="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Location</p>
                                <p class="font-medium text-gray-900">Dubai, UAE</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- AI Summary -->
                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6 relative overflow-hidden">
                    <div class="absolute top-0 right-0 p-4 opacity-10">
                        <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7V5.73C7.4 5.39 7 4.74 7 4a2 2 0 0 1 2-2h3z" /></svg>
                    </div>
                    <div class="relative z-10">
                        <div class="flex items-center gap-3 mb-4">
                            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-200">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <h3 class="font-bold text-blue-900 text-lg">AI Insight & Summary</h3>
                        </div>
                        <p class="text-gray-800 leading-relaxed bg-white/60 p-4 rounded-lg border border-blue-100/50 backdrop-blur-sm">
                            ${deal.summary}
                        </p>

                        ${deal.feedback ? `
                                <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div class="bg-green-50/80 border border-green-100 p-3 rounded-lg">
                                        <div class="flex items-center gap-2 mb-1">
                                            <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/></svg>
                                            <span class="text-xs font-bold text-green-700 uppercase">Client Liked</span>
                                        </div>
                                        <p class="text-sm text-gray-800">${deal.feedback.liked}</p>
                                    </div>
                                    <div class="bg-red-50/80 border border-red-100 p-3 rounded-lg">
                                        <div class="flex items-center gap-2 mb-1">
                                            <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"/></svg>
                                            <span class="text-xs font-bold text-red-700 uppercase">Concerns</span>
                                        </div>
                                        <p class="text-sm text-gray-800">${deal.feedback.disliked}</p>
                                    </div>
                                </div>
                            ` : ''}
                    </div>
                </div>

                <!-- Chat Log -->
                <div class="bg-white border rounded-xl shadow-sm overflow-hidden flex flex-col h-[500px]">
                    <div class="p-4 border-b bg-gray-50 flex justify-between items-center">
                        <h3 class="font-semibold flex items-center gap-2">
                            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                            Communication History
                        </h3>
                        <span class="text-xs text-gray-500 bg-white px-2 py-1 rounded border">Last synced: Just now</span>
                    </div>
                    <div class="flex-1 p-6 space-y-6 overflow-y-auto bg-gray-50/30">
                        <!-- Mock Chat Items -->
                        <div class="flex gap-4">
                            <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-sm font-bold border-2 border-white shadow-sm flex-shrink-0">AI</div>
                            <div class="flex flex-col gap-1 max-w-[85%]">
                                <span class="text-xs text-gray-500 ml-1">${assistantName} • 2 days ago</span>
                                <div class="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-4 text-sm text-gray-800 shadow-sm">
                                    Hello ${deal.client}, I'm ${assistantName}, your dedicated AI assistant. I noticed you were looking at properties in ${deal.title.split(' in ')[1] || 'Dubai'}. How can I help you refine your search today?
                                </div>
                            </div>
                        </div>

                        <div class="flex gap-4 flex-row-reverse">
                            <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-bold border-2 border-white shadow-sm flex-shrink-0">
                                ${deal.client.charAt(0)}
                            </div>
                            <div class="flex flex-col gap-1 items-end max-w-[85%]">
                                <span class="text-xs text-gray-500 mr-1">${deal.client} • 2 days ago</span>
                                <div class="bg-blue-600 text-white rounded-2xl rounded-tr-none p-4 text-sm shadow-md">
                                    Hi! Yes, I'm looking for something spacious. My budget is around $${(deal.amount / 1000000).toFixed(1)}M. I prefer high floors and a sea view if possible.
                                </div>
                            </div>
                        </div>

                        <div class="flex gap-4">
                            <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-sm font-bold border-2 border-white shadow-sm flex-shrink-0">AI</div>
                            <div class="flex flex-col gap-1 max-w-[85%]">
                                <span class="text-xs text-gray-500 ml-1">${assistantName} • Yesterday</span>
                                <div class="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-4 text-sm text-gray-800 shadow-sm">
                                    I have found some excellent options that match your criteria perfectly. I've prepared a personalized offer for you. Would you like to schedule a viewing for the ${deal.title}?
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="p-4 border-t bg-white">
                        <div class="relative">
                            <input type="text" placeholder="Type a message or internal note..." class="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all">
                                <button class="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                                </button>
                        </div>
                    </div>
                </div>

            </div>

            <!-- Right Column (Sidebar) -->
            <div class="space-y-6">

                <!-- Deal Value Card -->
                <div class="bg-white border rounded-xl p-6 shadow-sm">
                    <p class="text-sm font-medium text-gray-500 mb-1 uppercase tracking-wide">Deal Value</p>
                    <div class="text-4xl font-bold text-gray-900 mb-6">$${deal.amount.toLocaleString()}</div>

                    <div class="space-y-5">
                        <div>
                            <div class="flex justify-between text-sm mb-2">
                                <span class="text-gray-600 font-medium">Win Probability</span>
                                <span class="font-bold text-gray-900">${probability}%</span>
                            </div>
                            <div class="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                <div class="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full shadow-sm" style="width: ${probability}%"></div>
                            </div>
                        </div>

                        <div class="pt-5 border-t border-gray-100">
                            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Assigned Agent</p>
                            <div class="flex items-center gap-3 p-2 -mx-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                                <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                                    ${deal.agent.charAt(0)}
                                </div>
                                <div>
                                    <p class="font-medium text-gray-900">${deal.agent}</p>
                                    <p class="text-xs text-gray-500">Senior Property Consultant</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Next Steps -->
                <div class="bg-white border rounded-xl p-6 shadow-sm">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="font-semibold">Next Steps</h3>
                        <span class="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded font-medium">2 Pending</span>
                    </div>
                    <div class="space-y-3">
                        <label class="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors group">
                            <input type="checkbox" class="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                                <span class="text-sm text-gray-700 group-hover:text-gray-900">Send follow-up email regarding ${deal.title}</span>
                        </label>
                        <label class="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors group">
                            <input type="checkbox" class="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                                <span class="text-sm text-gray-700 group-hover:text-gray-900">Schedule viewing for next week</span>
                        </label>
                    </div>
                    <button class="w-full mt-4 py-2.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                        Add Task
                    </button>
                </div>

                <!-- Timeline (Mock) -->
                <div class="bg-white border rounded-xl p-6 shadow-sm">
                    <h3 class="font-semibold mb-6">Activity Timeline</h3>
                    <div class="relative pl-4 border-l-2 border-gray-100 space-y-8">
                        <div class="relative">
                            <div class="absolute -left-[21px] top-1.5 w-3.5 h-3.5 rounded-full bg-blue-500 ring-4 ring-white shadow-sm"></div>
                            <p class="text-sm font-bold text-gray-900">Deal Created</p>
                            <p class="text-xs text-gray-500 mt-0.5">2 days ago • via Website Inquiry</p>
                        </div>
                        <div class="relative">
                            <div class="absolute -left-[21px] top-1.5 w-3.5 h-3.5 rounded-full bg-purple-500 ring-4 ring-white shadow-sm"></div>
                            <p class="text-sm font-bold text-gray-900">AI Qualification Completed</p>
                            <p class="text-xs text-gray-500 mt-0.5">Yesterday • Qualified by ${assistantName}</p>
                        </div>
                        <div class="relative">
                            <div class="absolute -left-[21px] top-1.5 w-3.5 h-3.5 rounded-full bg-indigo-500 ring-4 ring-white shadow-sm"></div>
                            <p class="text-sm font-bold text-gray-900">Agent Assigned</p>
                            <p class="text-xs text-gray-500 mt-0.5">Today • Assigned to ${deal.agent}</p>
                        </div>
                    </div>
                    <button class="w-full mt-6 text-xs text-gray-500 hover:text-gray-900 font-medium text-center">View Full History</button>
                </div>

            </div>
        </div>
    </div>`;
}


export {renderDealsPage, renderDealDetailsPage};
