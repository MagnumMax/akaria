const chartConfig = {
    colors: {
        primary: '#2563eb',
        secondary: '#60a5fa',
        accent: '#f59e0b',
        success: '#10b981',
        danger: '#ef4444',
        background: ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'],
        border: '#ffffff'
    },
    fonts: {
        family: "'Inter', sans-serif"
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: { family: "'Inter', sans-serif", size: 12 }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(17, 24, 39, 0.9)',
                titleFont: { family: "'Inter', sans-serif", size: 13, weight: '600' },
                bodyFont: { family: "'Inter', sans-serif", size: 12 },
                padding: 10,
                cornerRadius: 8,
                displayColors: false
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { font: { family: "'Inter', sans-serif" } }
            },
            y: {
                beginAtZero: true,
                grid: { color: '#f3f4f6', borderDash: [4, 4] },
                ticks: { font: { family: "'Inter', sans-serif" } }
            }
        }
    }
};

let chartInstances = {};
function destroyAllCharts() { Object.values(chartInstances).forEach(chart => chart.destroy()); chartInstances = {}; }

function renderAgentCharts() {
    destroyAllCharts();
    const pipelineCtx = document.getElementById('agentPipelineChart')?.getContext('2d');
    if (pipelineCtx) {
        // Calculate dynamic data from dealsData
        const stages = ['New', 'Qualified', 'Offer', 'Negotiation'];
        const data = stages.map(stage => dealsData.filter(d => d.status.includes(stage) || (stage === 'New' && d.status === 'New Lead')).length);

        chartInstances.pipeline = new Chart(pipelineCtx, {
            type: 'bar',
            data: {
                labels: stages,
                datasets: [{
                    label: 'My Deals',
                    data: data,
                    backgroundColor: chartConfig.colors.background.slice(0, 4),
                    borderRadius: 6,
                    barThickness: 40
                }]
            },
            options: {
                ...chartConfig.options,
                plugins: { ...chartConfig.options.plugins, legend: { display: false } }
            }
        });
    }
}

function renderCeoCharts() {
    destroyAllCharts();
    const leadsCtx = document.getElementById('ceoLeadsChart')?.getContext('2d');
    if (leadsCtx) {
        // Mock data for leads trend (could be calculated if we had dates on all contacts)
        const weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'];
        const data = [22, 25, 31, 28, 35, 41, 38, 45];

        chartInstances.leads = new Chart(leadsCtx, {
            type: 'line',
            data: {
                labels: weeks,
                datasets: [{
                    label: 'New Leads',
                    data: data,
                    borderColor: chartConfig.colors.primary,
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: chartConfig.colors.primary,
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                ...chartConfig.options,
                plugins: { ...chartConfig.options.plugins, legend: { display: false } }
            }
        });
    }
}

function renderAnalyticsCharts() {
    destroyAllCharts();
    const funnelCtx = document.getElementById('funnelChart')?.getContext('2d');
    const agentCtx = document.getElementById('agentChart')?.getContext('2d');

    if (funnelCtx) {
        // Calculate funnel data
        const totalLeads = 100; // Base
        const qualified = dealsData.filter(d => !['New Lead', 'Disqualified'].includes(d.status)).length + 40; // Mock + real
        const offers = dealsData.filter(d => ['Offer Sent', 'Negotiation', 'Closed Won'].includes(d.status)).length + 20;
        const negotiations = dealsData.filter(d => ['Negotiation', 'Closed Won'].includes(d.status)).length + 10;
        const closed = dealsData.filter(d => d.status === 'Closed Won').length + 5;

        chartInstances.funnel = new Chart(funnelCtx, {
            type: 'bar',
            data: {
                labels: ['New Leads', 'Qualified', 'Offer Sent', 'Negotiation', 'Closed'],
                datasets: [{
                    label: 'Conversion',
                    data: [totalLeads, qualified, offers, negotiations, closed],
                    backgroundColor: chartConfig.colors.background,
                    borderRadius: 4,
                    barThickness: 30
                }]
            },
            options: {
                ...chartConfig.options,
                indexAxis: 'y',
                plugins: { ...chartConfig.options.plugins, legend: { display: false } }
            }
        });
    }

    if (agentCtx) {
        // Calculate agent performance
        const agentPerformance = { 'Alex Ivanov': 0, 'Anna Petrova': 0, 'Other': 0 };
        dealsData.forEach(d => {
            if (d.status === 'Closed Won') {
                if (agentPerformance[d.agent] !== undefined) agentPerformance[d.agent]++;
                else agentPerformance['Other']++;
            }
        });
        // Add some mock data to make it look good if empty
        if (Object.values(agentPerformance).every(v => v === 0)) {
            agentPerformance['Alex Ivanov'] = 12;
            agentPerformance['Anna Petrova'] = 9;
            agentPerformance['Other'] = 5;
        }

        chartInstances.agent = new Chart(agentCtx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(agentPerformance),
                datasets: [{
                    data: Object.values(agentPerformance),
                    backgroundColor: [chartConfig.colors.primary, chartConfig.colors.secondary, '#e5e7eb'],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '75%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { usePointStyle: true, padding: 20, font: { family: "'Inter', sans-serif" } }
                    }
                }
            }
        });
    }
}
function renderAssistantActivityChart() {
    const activityCtx = document.getElementById('assistantActivityChart')?.getContext('2d');
    if (activityCtx) {
        // Activity data for the last 7 days
        const activityData = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Messages Sent',
                    data: [45, 52, 38, 67, 59, 23, 31],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Leads Processed',
                    data: [12, 15, 8, 18, 14, 6, 9],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Meetings Scheduled',
                    data: [3, 4, 2, 6, 5, 1, 2],
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        };

        chartInstances.assistantActivity = new Chart(activityCtx, {
            type: 'line',
            data: activityData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderWidth: 1
                    }
                },
                scales: {
                    x: {
                        display: true,
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        display: true,
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                }
            }
        });
    }
}

export { destroyAllCharts, renderAgentCharts, renderCeoCharts, renderAnalyticsCharts, renderAssistantActivityChart };
