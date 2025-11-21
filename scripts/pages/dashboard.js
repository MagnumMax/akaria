import { state, ICONS } from "../state.js";
import { renderCeoCharts, renderAgentCharts } from "../charts.js";


function renderDashboard() {
    const page = document.getElementById('page-dashboard');
    const role = state.currentUserRole;
    if (role === 'CEO') renderCeoDashboard(page);
    else if (role === 'Agent') renderAgentDashboard(page);
    else if (role === 'Admin') renderAdminDashboard(page);
}


function renderAdminDashboard(page) {
    page.innerHTML = `
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
<div class="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
    <h3 class="text-sm font-medium text-gray-500">System Status</h3>
    <div class="flex items-center gap-2 mt-4">
        <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        <p class="text-2xl font-bold text-gray-900">Operational</p>
    </div>
</div>
<div class="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
    <h3 class="text-sm font-medium text-gray-500">Active Users</h3>
    <p class="text-2xl font-bold mt-4 text-gray-900">${Object.keys(users).length}</p>
</div>
<div class="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
    <h3 class="text-sm font-medium text-gray-500">Inactive Users</h3>
    <p class="text-2xl font-bold mt-4 text-gray-900">${inactiveUsers.length}</p>
</div>
<div class="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
    <h3 class="text-sm font-medium text-gray-500">System Errors (24h)</h3>
    <p class="text-2xl font-bold mt-4 ${systemErrors.length > 0 ? 'text-red-600' : 'text-green-600'}">${systemErrors.length}</p>
</div>
        </div>
        <div class="mt-8 bg-white border rounded-xl shadow-sm overflow-hidden">
<div class="p-6 border-b bg-gray-50"><h3 class="font-semibold text-gray-900">AI Assistant Overview</h3></div>
<div class="overflow-x-auto">
    <table class="w-full text-sm">
        <thead>
            <tr class="text-left text-gray-500 bg-gray-50 border-b">
                <th class="p-4 font-medium">Assistant</th>
                <th class="p-4 font-medium">Owner</th>
                <th class="p-4 font-medium">Dialogs Today</th>
                <th class="p-4 font-medium">Conversion</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
            ${assistantStats.map(s => `
                <tr class="hover:bg-gray-50 transition-colors">
                    <td class="p-4 font-medium text-gray-900 flex items-center gap-2">
                        <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">${ICONS.bot}</div>
                        ${s.assistant}
                    </td>
                    <td class="p-4 text-gray-600">${s.owner}</td>
                    <td class="p-4 text-gray-900 font-medium">${s.dialogs}</td>
                    <td class="p-4 text-green-600 font-medium">${s.conversion}</td>
                </tr>
            `).join('')}
        </tbody>
    </table>
</div>
        </div>
        <div class="mt-8 bg-white border rounded-xl shadow-sm overflow-hidden">
<div class="p-6 border-b bg-gray-50"><h3 class="font-semibold text-gray-900">Recent System Errors</h3></div>
<div class="overflow-x-auto">
    <table class="w-full text-sm">
        <thead>
            <tr class="text-left text-gray-500 bg-gray-50 border-b">
                <th class="p-4 font-medium">Time</th>
                <th class="p-4 font-medium">Code</th>
                <th class="p-4 font-medium">Message</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
            ${systemErrors.map(e => `
                <tr class="hover:bg-gray-50 transition-colors">
                    <td class="p-4 text-gray-500">${e.time}</td>
                    <td class="p-4 font-mono text-xs bg-gray-100 rounded px-2 py-1 w-fit">${e.code}</td>
                    <td class="p-4 text-gray-700">${e.message}</td>
                </tr>
            `).join('')}
        </tbody>
    </table>
</div>
        </div>`;
}


function renderCeoDashboard(page) {
    // Calculate dynamic stats
    const activeDealsCount = dealsData.filter(d => !['Closed Won', 'Closed Lost'].includes(d.status)).length;
    const newLeadsCount = dealsData.filter(d => d.status === 'New Lead').length;

    const kpiData = [
        { title: 'Total Revenue', value: '$12,450,000', change: '+15.2%', trend: 'up' },
        { title: 'Active Deals', value: activeDealsCount.toString(), change: '+5 this week', trend: 'up' },
        { title: 'New Leads (Today)', value: newLeadsCount.toString(), change: '+2 today', trend: 'up' },
        { title: 'Conversion Rate', value: '4.8%', change: '-0.2%', trend: 'down' }
    ];

    page.innerHTML = `
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            ${kpiData.map(kpi => `
                <div class="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="text-sm font-medium text-gray-500">${kpi.title}</h3>
                            <p class="text-3xl font-bold mt-2 text-gray-900">${kpi.value}</p>
                        </div>
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${kpi.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                            ${kpi.trend === 'up' ? '↑' : '↓'} ${kpi.change}
                        </span>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="grid gap-6 mt-8 grid-cols-1 lg:grid-cols-3">
            <div class="lg:col-span-2 bg-white border rounded-xl shadow-sm overflow-hidden">
                <div class="p-6 border-b flex justify-between items-center">
                    <h3 class="font-semibold text-lg text-gray-900">Team Pulse</h3>
                    <button class="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                        <thead>
                            <tr class="text-left text-gray-500 bg-gray-50 border-b">
                                <th class="py-3 px-6 font-medium">Agent</th>
                                <th class="py-3 px-6 font-medium">Active Dialogs</th>
                                <th class="py-3 px-6 font-medium">Avg. Response</th>
                                <th class="py-3 px-6 font-medium">Conversion</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            ${teamPulseData.map(p => `
                                <tr class="hover:bg-gray-50 transition-colors">
                                    <td class="py-4 px-6 font-medium text-gray-900 flex items-center gap-3">
                                        <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                            ${p.agent.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        ${p.agent}
                                    </td>
                                    <td class="py-4 px-6 text-gray-600">${p.dialogs}</td>
                                    <td class="py-4 px-6 text-gray-600">${p.responseTime}</td>
                                    <td class="py-4 px-6 text-gray-900 font-medium">${p.conversion}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 text-white flex flex-col justify-center items-center text-center shadow-lg relative overflow-hidden">
                <div class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-5 rounded-full blur-xl"></div>
                <div class="bg-white/10 text-yellow-400 rounded-full p-4 mb-4 backdrop-blur-sm">
                    ${ICONS.anomaly}
                </div>
                <h3 class="font-semibold text-lg mt-2">AI Anomaly Detected</h3>
                <p class="text-gray-300 mt-2 text-sm leading-relaxed">
                    <span class="font-medium text-white">${ceoAnomaly.agent}</span>'s ${ceoAnomaly.metric} is <span class="font-bold text-white">${ceoAnomaly.value}</span>. This is unusually high.
                </p>
                <button class="mt-6 bg-white text-gray-900 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors w-full">
                    Review Details
                </button>
            </div>
        </div>
        
        <div class="mt-8 bg-white border rounded-xl shadow-sm p-6">
            <div class="flex justify-between items-center mb-6">
                <h3 class="font-semibold text-lg text-gray-900">Leads Acquisition Trend</h3>
                <select class="text-sm border-gray-300 rounded-md text-gray-600 focus:ring-blue-500 focus:border-blue-500">
                    <option>Last 8 Weeks</option>
                    <option>Last Quarter</option>
                    <option>Year to Date</option>
                </select>
            </div>
            <div class="h-80">
                <canvas id="ceoLeadsChart"></canvas>
            </div>
        </div>
    `;
    renderCeoCharts();
}


function renderAgentDashboard(page) {
    // Dynamic counts
    const hotLeadsCount = dealsData.slice(0, 3).length; // Mock logic for "hot"
    const approvalCount = assistantDialogs.filter(d => d.status === 'Approval Needed').length;
    const urgentTasksCount = tasksData.filter(t => t.status === 'Overdue').length;

    page.innerHTML = `
        <div class="bg-white border rounded-xl shadow-sm p-6">
            <div class="flex items-center justify-between mb-6">
                <h3 class="font-semibold text-xl text-gray-900">My Focus Today</h3>
                <span class="text-sm text-gray-500">${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
            </div>
            
            <div class="border-b border-gray-100">
                <nav class="-mb-px flex gap-8" id="focus-tabs">
                    <button class="focus-tab tab-active py-4 border-b-2 border-blue-600 text-blue-600 font-medium transition-colors flex items-center gap-2" data-tab="hot-leads">
                        <span>🔥</span> Hot Leads <span class="bg-blue-100 text-blue-700 py-0.5 px-2 rounded-full text-xs">${hotLeadsCount}</span>
                    </button>
                    <button class="focus-tab py-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium transition-colors flex items-center gap-2" data-tab="approvals">
                        <span>👍</span> Awaiting Approval <span class="bg-gray-100 text-gray-700 py-0.5 px-2 rounded-full text-xs">${approvalCount}</span>
                    </button>
                    <button class="focus-tab py-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium transition-colors flex items-center gap-2" data-tab="tasks">
                        <span>❗</span> Urgent Tasks <span class="bg-red-100 text-red-700 py-0.5 px-2 rounded-full text-xs">${urgentTasksCount}</span>
                    </button>
                </nav>
            </div>
            
            <div class="pt-6 min-h-[200px]">
                <div id="tab-hot-leads" class="focus-tab-content space-y-3">
                    ${dealsData.slice(0, 3).map(deal => `
                        <a href="#deal-details/${deal.id}" class="group block p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all">
                            <div class="flex justify-between items-start">
                                <div>
                                    <h4 class="font-semibold text-gray-900 group-hover:text-blue-700">${deal.client}</h4>
                                    <p class="text-sm text-gray-600 mt-1">${deal.summary}</p>
                                </div>
                                <span class="text-xs font-medium bg-white border border-gray-200 px-2 py-1 rounded text-gray-500 group-hover:border-blue-200 group-hover:text-blue-600">View Deal</span>
                            </div>
                        </a>
                    `).join('')}
                </div>
                
                <div id="tab-approvals" class="focus-tab-content page-hidden space-y-3">
                    ${assistantDialogs.filter(d => d.status === 'Approval Needed').length > 0 ? assistantDialogs.filter(d => d.status === 'Approval Needed').map(d => `
                        <div data-offer-id="${d.id}" class="approval-item cursor-pointer p-4 border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50/50 transition-all">
                            <div class="flex items-start gap-3">
                                <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                                    ${ICONS.bot}
                                </div>
                                <div>
                                    <h4 class="font-semibold text-gray-900">Offer for ${d.client}</h4>
                                    <p class="text-sm text-gray-600 mt-1">Jessica has prepared a new offer page. Review content before sending.</p>
                                    <button class="mt-3 text-sm font-medium text-green-700 hover:text-green-800 hover:underline">Review & Send &rarr;</button>
                                </div>
                            </div>
                        </div>
                    `).join('') : '<p class="text-gray-500 text-center py-8">No items awaiting approval.</p>'}
                </div>
                
                <div id="tab-tasks" class="focus-tab-content page-hidden space-y-3">
                    ${tasksData.filter(t => t.status === 'Overdue').length > 0 ? tasksData.filter(t => t.status === 'Overdue').map(t => `
                        <a href="#tasks" class="group block p-4 border border-red-200 bg-red-50/30 rounded-xl hover:bg-red-50 transition-all">
                            <div class="flex items-center gap-3">
                                <div class="w-2 h-2 rounded-full bg-red-500"></div>
                                <div class="flex-1">
                                    <h4 class="font-medium text-gray-900 group-hover:text-red-700">${t.title}</h4>
                                    <p class="text-xs text-red-600 mt-1">Overdue by ${t.due}</p>
                                </div>
                                <span class="text-sm text-gray-400 group-hover:text-gray-600">&rarr;</span>
                            </div>
                        </a>
                    `).join('') : '<p class="text-gray-500 text-center py-8">No urgent tasks.</p>'}
                </div>
            </div>
        </div>
        
        <div class="grid gap-6 mt-8 grid-cols-1 lg:grid-cols-2">
            <div class="bg-white border rounded-xl shadow-sm p-6">
                <h3 class="font-semibold text-lg text-gray-900 mb-6">My Deal Pipeline</h3>
                <div class="h-64">
                    <canvas id="agentPipelineChart"></canvas>
                </div>
            </div>
            
            <div class="bg-white border rounded-xl shadow-sm p-6">
                <h3 class="font-semibold text-lg text-gray-900 mb-6">My Recent Activity</h3>
                <div class="space-y-6 relative">
                    <div class="absolute left-2.5 top-2 bottom-2 w-0.5 bg-gray-100"></div>
                    
                    <div class="relative pl-8">
                        <div class="absolute left-0 top-1.5 w-5 h-5 rounded-full border-2 border-white bg-blue-500 shadow-sm z-10"></div>
                        <p class="text-sm text-gray-900"><span class="font-semibold text-blue-600">Jessica</span> sent an offer to <span class="font-medium">Elon Musk</span>.</p>
                        <p class="text-xs text-gray-500 mt-1">10 minutes ago</p>
                    </div>
                    
                    <div class="relative pl-8">
                        <div class="absolute left-0 top-1.5 w-5 h-5 rounded-full border-2 border-white bg-green-500 shadow-sm z-10"></div>
                        <p class="text-sm text-gray-900">You closed the deal for <span class="font-medium">Villa in Palm Jumeirah</span>.</p>
                        <p class="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                    
                    <div class="relative pl-8">
                        <div class="absolute left-0 top-1.5 w-5 h-5 rounded-full border-2 border-white bg-purple-500 shadow-sm z-10"></div>
                        <p class="text-sm text-gray-900">New task assigned: <span class="font-medium">Follow up with Jeff Bezos</span>.</p>
                        <p class="text-xs text-gray-500 mt-1">Yesterday</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    renderAgentCharts();
}


export {renderDashboard, renderAdminDashboard, renderCeoDashboard, renderAgentDashboard};
