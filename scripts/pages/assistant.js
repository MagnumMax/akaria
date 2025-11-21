import { ICONS } from "../state.js";


function renderMyAssistantPage() {
    const page = document.getElementById('page-my-assistant');

    // Preset questions - shortened for minimalism
    const presetQuestions = [
        "🔥 Hot leads today",
        "💼 Active deals",
        "📊 Conversion report",
        "🏠 New properties",
        "📞 Calls for today",
        "📈 Market analysis"
    ];

    page.innerHTML = `
        <div class="max-w-5xl mx-auto px-4 py-6">


<!-- Quick commands - horizontal scroll -->
<div class="mb-8">
    <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        ${presetQuestions.map(question => `
            <button class="preset-question quick-command-btn flex-shrink-0 border border-gray-300 rounded-md px-3 py-2 text-sm hover:bg-gray-50">${question}</button>
        `).join('')}
    </div>
</div>

<!-- Main chat area - centered -->
<div class="max-w-4xl mx-auto">
    
    <!-- Main chat area -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-[70vh] min-h-[500px]">
        <!-- Chat status bar -->
        <div class="px-6 py-4 border-b border-gray-100">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="w-3 h-3 bg-green-500 rounded-full status-indicator"></div>
                    <span class="text-sm font-medium text-gray-900">Assistant Active</span>
                </div>
                <div class="text-xs text-gray-500">Avg. response time: 1.2s</div>
            </div>
        </div>
        
        <!-- Messages area -->
        <div id="chat-messages" class="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            <!-- Welcome message -->
            <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5"/>
                        <path d="M2 12l10 5 10-5"/>
                    </svg>
                </div>
                <div class="bg-gray-50 rounded-2xl rounded-tl-md p-4 max-w-[85%]">
                    <p class="text-gray-800 leading-relaxed">Hello! I am your personal AI real estate assistant. I am ready to help with lead analysis, report generation, and client information search.</p>
                    <div class="flex items-center gap-3 mt-3 pt-2 border-t border-gray-200">
                        <span class="text-xs text-gray-500">Just now</span>
                        <button class="copy-message text-xs font-medium text-gray-600 hover:text-gray-800">Copy</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Input form -->
        <div class="px-6 py-4 border-t border-gray-100">
            <form id="chat-form" class="flex gap-3">
                <div class="flex-1 relative">
                    <input 
                        type="text" 
                        id="chat-input" 
                        placeholder="Ask the assistant..." 
                        class="w-full px-4 py-3 pr-12 bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 text-gray-900 placeholder-gray-500"
                        autocomplete="off"
                    >
                    <button class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600" id="search-btn" title="Search history">
                        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"/>
                            <path d="m21 21-4.35-4.35"/>
                        </svg>
                    </button>
                </div>
                <button type="submit" class="btn-primary bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 flex items-center gap-2 font-medium shadow-sm">
                    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22,2 15,22 11,13 2,9"/>
                    </svg>
                    <span class="hidden sm:inline">Send</span>
                </button>
            </form>
        </div>
        </div>
    </div>
</div>

<!-- Statistics and settings - compact block -->
<div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Statistics -->
    <div class="stat-card bg-white rounded-xl border border-gray-100 p-6">
        <h3 class="font-medium text-gray-900 mb-4">Statistics Today</h3>
        <div class="grid grid-cols-3 gap-4">
            <div class="text-center">
                <div class="text-2xl font-bold text-blue-600">12</div>
                <div class="text-xs text-gray-500">Requests</div>
            </div>
            <div class="text-center">
                <div class="text-2xl font-bold text-green-600">1.2s</div>
                <div class="text-xs text-gray-500">Response</div>
            </div>
            <div class="text-center">
                <div class="text-2xl font-bold text-purple-600">8</div>
                <div class="text-xs text-gray-500">Resolved</div>
            </div>
        </div>
    </div>
    
    <!-- Settings -->
    <div class="stat-card bg-white rounded-xl border border-gray-100 p-6">
        <div class="flex items-center justify-between">
            <div>
                <h3 class="font-medium text-gray-900">Settings</h3>
                <p class="text-sm text-gray-500 mt-1">Assistant Personalization</p>
            </div>
            <a href="#my-assistant-settings" class="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors inline-block">Configure</a>
        </div>
    </div>
</div>
        </div>
    `;

    // Initialize event handlers
    initializeChatHandlers();

    // Load chat history when opening the page
    updateChatHistoryDisplay();
}

// Function to initialize chat handlers


function initializeChatHandlers() {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const presetButtons = document.querySelectorAll('.preset-question');

    // Form submission handler
    if (chatForm) {
        chatForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const message = chatInput.value.trim();
            if (message) {
                addUserMessage(message);
                chatInput.value = '';
                // Simulate assistant response
                setTimeout(() => {
                    addAssistantMessage(generateAssistantResponse(message));
                }, 1000);
            }
        });
    }

    // Preset questions handlers
    presetButtons.forEach(button => {
        button.addEventListener('click', function () {
            const question = this.textContent.trim();
            chatInput.value = question;
            chatInput.focus();
        });
    });

    // Message copy handlers
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('copy-message')) {
            const messageText = e.target.closest('.bg-muted').querySelector('p').textContent;
            navigator.clipboard.writeText(messageText).then(() => {
                e.target.textContent = 'Copied!';
                setTimeout(() => {
                    e.target.textContent = 'Copy';
                }, 2000);
            });
        }
    });
}

// Function to add user message


function addUserMessage(message) {
    const chatMessages = document.getElementById('chat-messages');

    // Add separator if there are previous messages
    if (chatMessages.children.length > 0) {
        const separator = document.createElement('div');
        separator.className = 'message-separator';
        chatMessages.appendChild(separator);
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = 'message flex items-start gap-3 justify-end';
    messageDiv.innerHTML = `
        <div class="user-message text-white rounded-lg p-3 max-w-[80%]">
<p class="text-sm">${message}</p>
<div class="flex items-center gap-2 mt-2 justify-end">
    <span class="chat-timestamp">Just now</span>
</div>
        </div>
        <div class="user-avatar w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
<span class="text-xs font-bold">${state.currentUserRole.substring(0, 2)}</span>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Save message to history
    saveChatMessage(message, 'user');
}

// Function to add assistant response


function addAssistantMessage(message) {
    const chatMessages = document.getElementById('chat-messages');

    // Add separator if there are previous messages
    if (chatMessages.children.length > 0) {
        const separator = document.createElement('div');
        separator.className = 'message-separator';
        chatMessages.appendChild(separator);
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = 'message flex items-start gap-3';
    messageDiv.innerHTML = `
        <div class="assistant-avatar w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
<svg class="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M12 8V4H8"/>
    <rect x="4" y="4" width="16" height="16" rx="2"/>
</svg>
        </div>
        <div class="assistant-message rounded-lg p-3 max-w-[80%]">
<p class="text-sm">${message}</p>
<div class="flex items-center gap-2 mt-2">
    <span class="chat-timestamp">Just now</span>
    <button class="copy-message text-xs text-accent hover:underline">Copy</button>
</div>
        </div>
    `;
    chatMessages.appendChild(messageDiv);

    // Save message to history
    saveChatMessage(message, 'assistant');

    // Save dialog to history after receiving assistant response
    saveDialogToHistory();
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to generate assistant response (simulation)


function generateAssistantResponse(userMessage) {
    const responses = {
        'hot leads': '🔥 **Found 3 hot leads for today:**\n\n1. **Elon Musk** - Interest in downtown penthouse, budget $2M\n2. **Jeff Bezos** - Looking for a seaside villa, budget $5M\n3. **Bill Gates** - Commercial property, budget $10M\n\n✅ All leads are active and awaiting contact today.',
        'deals': '💼 **You have 5 active deals requiring attention:**\n\n• **Villa Paradise** - awaiting signing (Elon Musk)\n• **Downtown Penthouse** - in negotiation stage\n• **Seaside Resort** - requires detail clarification\n\n💰 Total deal value: $12.5M',
        'conversion': '📊 **Conversion Report for the week:**\n\n📈 **Total Conversion**: 4.8%\n🚀 **Growth**: +0.3% vs last week\n🎯 **Best Day**: Tuesday (6.2%)\n📞 **Source**: Cold calls showed best results',
        'budget': '💰 **Clients with budget over $500K:**\n\n💎 **Elon Musk** - $2M (active)\n💎 **Jeff Bezos** - $5M (hot lead)\n💎 **Bill Gates** - $10M (negotiation)\n💎 **Warren Buffett** - $1.5M (considering)\n\n📊 Total: 4 clients, total potential $18.5M',
        'agents': '👥 **Agent Statistics:**\n\n🥇 **Jessica Smith**: 8 active dialogs, conversion 6.2%\n🥈 **Michael Johnson**: 12 leads, conversion 4.1%\n🥉 **Sarah Davis**: 6 deals in progress, conversion 5.8%\n\n🏆 Agent of the week: Jessica Smith',
        'tasks': '⏰ **Overdue Tasks:**\n\n🔴 **Call Jeff Bezos** - overdue by 2 days\n🔴 **Prepare Villa Paradise contract** - overdue by 1 day\n🟡 **Meeting with Bill Gates** - today at 15:00\n\n⚡ Recommend processing these tasks urgently.',
        'properties': '🏠 **New Properties:**\n\n🆕 **Luxury Villa**, Palm Jumeirah - $3.2M\n🆕 **Penthouse**, Downtown Dubai - $2.8M\n🆕 **Townhouse**, Arabian Ranches - $1.5M\n🆕 **Office Space**, DIFC - $4.1M\n\n📅 All properties added in the last 24 hours',
        'calls': '📞 **Call List for Today:**\n\n🔥 **14:00** - Elon Musk (hot lead)\n📋 **15:30** - Sarah Connor (clarify details)\n💼 **16:00** - Warren Buffett (new offer)\n📊 **17:00** - Bill Gates (final negotiations)\n\n⏰ Next call in 2 hours',
        'analysis': '📈 **Real Estate Market Analysis:**\n\n📊 Average Price: $1.8M (+5% this month)\n🏠 Most Popular Type: Villas (40%)\n📍 Top Area: Palm Jumeirah\n⏱️ Avg. Sale Time: 45 days\n\n🎯 **Recommendation**: focus on premium segment',
        'promising': '🎯 **Top 5 Promising Clients:**\n\n1. 💎 **Elon Musk** - $2.5M (probability 85%)\n2. 💎 **Jeff Bezos** - $1.8M (probability 70%)\n3. 💎 **Bill Gates** - $3.2M (probability 60%)\n4. 💰 **Warren Buffett** - $900K (probability 55%)\n5. 💰 **Tim Cook** - $1.2M (probability 45%)\n\n🚀 **Total Potential**: $9.6M',
        'plan': '📋 **Work Plan for Tomorrow:**\n\n🌅 **09:00** - Call Elon Musk\n📊 **10:30** - Prepare sales report\n🏠 **12:00** - Property viewing with Jeff Bezos\n📞 **14:00** - Call new leads\n📝 **16:00** - Update CRM\n\n✅ 5 tasks scheduled',
        'presentation': '💬 **Preparing Client Presentation:**\n\n📋 Choose presentation type:\n• 🏠 Property Object\n• 💰 Investment Proposal\n• 📊 Analytical Report\n• 🎯 Personal Offer\n\n⚡ Presentation will be ready in 15 minutes'
    };

    const lowerMessage = userMessage.toLowerCase();

    for (const [key, response] of Object.entries(responses)) {
        if (lowerMessage.includes(key)) {
            return response;
        }
    }

    return 'Understood your request. Analyzing data... 🤔\n\nUnfortunately, I did not find an exact match in the database. Try rephrasing the question or use the quick commands on the left.';
}

// Initialize chat event handlers


function initChatHandlers() {
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    const presetQuestions = document.querySelectorAll('.preset-question');

    if (chatForm) {
        chatForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const message = chatInput.value.trim();
            if (message) {
                addMessage(message, 'user');
                chatInput.value = '';

                // Simulate assistant response
                setTimeout(() => {
                    const response = generateAssistantResponse(message);
                    addMessage(response, 'assistant');
                }, 1000);
            }
        });
    }

    // Handlers for preset questions
    presetQuestions.forEach(button => {
        button.addEventListener('click', function () {
            const command = this.textContent.trim();
            addMessage(command, 'user');

            // Visual feedback
            this.style.backgroundColor = '#e5e7eb';
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 200);

            setTimeout(() => {
                const response = generateAssistantResponse(command);
                addMessage(response, 'assistant');
            }, 1000);
        });
    });

    // Autofocus on input field
    if (chatInput) {
        chatInput.focus();
    }
}

// Add message to chat


function addMessage(message, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    if (!messagesContainer) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `flex gap-3 ${sender === 'user' ? 'justify-end' : 'justify-start'}`;

    const isUser = sender === 'user';
    const messageId = 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

    messageDiv.innerHTML = `
        <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg relative group ${isUser
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-800'
        }">
<div class="flex items-start justify-between">
    <div class="flex-1">
        <p class="text-sm whitespace-pre-wrap" id="${messageId}">${message}</p>
        <p class="text-xs mt-1 opacity-70">${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
    </div>
    ${!isUser ? `
        <button onclick="copyMessage('${messageId}')" 
                class="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded hover:bg-gray-200 flex-shrink-0"
                title="Copy message">
            <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
        </button>
    ` : ''}
</div>
        </div>
    `;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Function to copy message


function copyMessage(messageId) {
    const messageElement = document.getElementById(messageId);
    if (!messageElement) return;

    const text = messageElement.textContent;

    // Use modern Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showCopyNotification();
        }).catch(err => {
            console.error('Copy error:', err);
            fallbackCopyTextToClipboard(text);
        });
    } else {
        fallbackCopyTextToClipboard(text);
    }
}

// Fallback copy method for older browsers


function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
        showCopyNotification();
    } catch (err) {
        console.error('Copy error:', err);
    }

    document.body.removeChild(textArea);
}

// Show copy notification


function showCopyNotification() {
    // Create temporary notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300';
    notification.textContent = '✅ Message copied!';

    document.body.appendChild(notification);

    // Remove notification after 2 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Variable to store current dialog
let currentDialog = {
    messages: [],
    startTime: null,
    userQuestion: '',
    assistantResponse: ''
};

// Function to save message to current dialog


function saveChatMessage(message, sender) {
    if (!currentDialog.startTime) {
        currentDialog.startTime = new Date();
    }

    currentDialog.messages.push({
        text: message,
        sender: sender,
        timestamp: new Date()
    });

    if (sender === 'user') {
        currentDialog.userQuestion = message;
    } else if (sender === 'assistant') {
        currentDialog.assistantResponse = message;
    }
}

// Function to save dialog to history


function saveDialogToHistory() {
    if (currentDialog.messages.length >= 2) {
        const dialogHistory = getChatHistory();

        const dialogSummary = {
            id: Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            title: generateDialogTitle(currentDialog.userQuestion),
            userQuestion: currentDialog.userQuestion,
            assistantResponse: currentDialog.assistantResponse,
            timestamp: currentDialog.startTime,
            messages: [...currentDialog.messages]
        };

        dialogHistory.unshift(dialogSummary);

        // Limit history to 50 dialogs
        if (dialogHistory.length > 50) {
            dialogHistory.splice(50);
        }

        localStorage.setItem('chatHistory', JSON.stringify(dialogHistory));

        // Update history display
        updateChatHistoryDisplay();

        // Reset current dialog
        currentDialog = {
            messages: [],
            startTime: null,
            userQuestion: '',
            assistantResponse: ''
        };
    }
}

// Function to get chat history


function getChatHistory() {
    try {
        const history = localStorage.getItem('chatHistory');
        return history ? JSON.parse(history) : [];
    } catch (error) {
        console.error('Error loading history:', error);
        return [];
    }
}

// Function to generate dialog title


function generateDialogTitle(userQuestion) {
    const question = userQuestion.toLowerCase();

    if (question.includes('lead') || question.includes('hot')) {
        return 'Hot Leads Analysis';
    } else if (question.includes('deal') || question.includes('transaction')) {
        return 'Deals Information';
    } else if (question.includes('conversion') || question.includes('report')) {
        return 'Conversion Report';
    } else if (question.includes('budget') || question.includes('price')) {
        return 'Budget Analysis';
    } else if (question.includes('agent') || question.includes('team')) {
        return 'Team Information';
    } else if (question.includes('task') || question.includes('todo')) {
        return 'Task Management';
    } else if (question.includes('property') || question.includes('object')) {
        return 'Property Catalog';
    } else if (question.includes('call') || question.includes('phone')) {
        return 'Call Analysis';
    } else if (question.includes('analysis')) {
        return 'Analytical Report';
    } else {
        return userQuestion.length > 30 ? userQuestion.substring(0, 30) + '...' : userQuestion;
    }
}

// Function to update history display


function updateChatHistoryDisplay() {
    const historyContainer = document.getElementById('chat-history');
    if (!historyContainer) return;

    const history = getChatHistory();

    if (history.length === 0) {
        historyContainer.innerHTML = '<p class="text-sm text-muted-foreground text-center py-4">Dialog history is empty</p>';
        return;
    }

    historyContainer.innerHTML = history.map(dialog => {
        const timeAgo = getTimeAgo(dialog.timestamp);
        return `
<div class="p-3 border rounded-md hover:bg-muted cursor-pointer" onclick="loadDialog('${dialog.id}')">
    <div class="flex justify-between items-start mb-1">
        <span class="font-medium text-sm">${dialog.title}</span>
        <span class="text-xs text-muted-foreground">${timeAgo}</span>
    </div>
    <p class="text-sm text-muted-foreground mb-1">You: "${dialog.userQuestion.length > 50 ? dialog.userQuestion.substring(0, 50) + '...' : dialog.userQuestion}"</p>
    <p class="text-sm text-muted-foreground">Assistant: "${dialog.assistantResponse.length > 50 ? dialog.assistantResponse.substring(0, 50) + '...' : dialog.assistantResponse}"</p>
</div>
        `;
    }).join('');
}

// Function to get "ago" time


function getTimeAgo(timestamp) {
    const now = new Date();
    const dialogTime = new Date(timestamp);
    const diffMs = now - dialogTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) {
        return 'Just now';
    } else if (diffMins < 60) {
        return `${diffMins} min ago`;
    } else if (diffHours < 24) {
        return `${diffHours} h ago`;
    } else if (diffDays === 1) {
        return 'Yesterday';
    } else if (diffDays < 7) {
        return `${diffDays} days ago`;
    } else {
        return dialogTime.toLocaleDateString('ru-RU');
    }
}

// Function to load dialog into chat


function loadDialog(dialogId) {
    const history = getChatHistory();
    const dialog = history.find(d => d.id === dialogId);

    if (!dialog) return;

    // Clear current chat
    const chatMessages = document.getElementById('chat-messages');
    if (chatMessages) {
        chatMessages.innerHTML = '';
    }

    // Load messages from dialog
    dialog.messages.forEach(msg => {
        if (msg.sender === 'user') {
            addMessage(msg.text, 'user');
        } else {
            addMessage(msg.text, 'assistant');
        }
    });
}

// Function to clear history


function clearChatHistory() {
    if (confirm('Are you sure you want to clear the entire dialog history?')) {
        localStorage.removeItem('chatHistory');
        updateChatHistoryDisplay();

        // Show notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
        notification.textContent = '🗑️ History cleared';
        document.body.appendChild(notification);

        setTimeout(() => {
            document.body.removeChild(notification);
        }, 2000);
    }
}


function renderMyAssistantSettingsPage() {
    const page = document.getElementById('page-my-assistant-settings');
    page.innerHTML = `
        <div class="space-y-6">
<!-- Main assistant settings -->
<div class="bg-white border rounded-lg">
    <div class="p-4 border-b">
        <h3 class="font-semibold">Assistant Settings</h3>
    </div>
    <div class="p-6 space-y-6">
        <div>
            <label class="block text-sm font-medium mb-1">Assistant Name</label>
            <input type="text" value="AI Assistant" class="w-full p-2 border rounded-md max-w-md">
        </div>
        <div>
            <label class="block text-sm font-medium mb-1">Personal Prompt</label>
            <textarea class="w-full p-2 border rounded-md h-32" placeholder="Describe how your assistant should behave...">You are a professional AI real estate assistant. Be friendly, efficient, and always ready to help with client tasks.</textarea>
        </div>
        <div class="flex items-center justify-between">
            <label class="block text-sm font-medium">Use data from all agents</label>
            <div class="relative inline-block w-10 align-middle select-none">
                <input type="checkbox" name="toggle" id="toggle" class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
                <label for="toggle" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
            </div>
        </div>
    </div>
</div>

<!-- Preset communication styles -->
<div class="bg-white border rounded-lg">
    <div class="p-4 border-b">
        <h3 class="font-semibold">Communication Styles</h3>
    </div>
    <div class="p-6">
        <div class="grid gap-4 md:grid-cols-3">
            <div class="border rounded-lg p-4 cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors" onclick="selectCommunicationStyle('formal')">
                <div class="flex items-center gap-2 mb-2">
                    <input type="radio" name="communication-style" value="formal" class="text-blue-600">
                    <h4 class="font-medium">Formal</h4>
                </div>
                <p class="text-sm text-gray-600">Professional and business communication style for corporate environment</p>
            </div>
            <div class="border rounded-lg p-4 cursor-pointer hover:bg-green-50 hover:border-green-300 transition-colors" onclick="selectCommunicationStyle('friendly')">
                <div class="flex items-center gap-2 mb-2">
                    <input type="radio" name="communication-style" value="friendly" class="text-green-600" checked>
                    <h4 class="font-medium">Friendly</h4>
                </div>
                <p class="text-sm text-gray-600">Warm and welcoming style to create a comfortable atmosphere</p>
            </div>
            <div class="border rounded-lg p-4 cursor-pointer hover:bg-purple-50 hover:border-purple-300 transition-colors" onclick="selectCommunicationStyle('brief')">
                <div class="flex items-center gap-2 mb-2">
                    <input type="radio" name="communication-style" value="brief" class="text-purple-600">
                    <h4 class="font-medium">Concise</h4>
                </div>
                <p class="text-sm text-gray-600">Concise and clear answers for quick task resolution</p>
            </div>
        </div>
    </div>
</div>

<!-- Notification settings -->
<div class="bg-white border rounded-lg">
    <div class="p-4 border-b">
        <h3 class="font-semibold">Notifications</h3>
    </div>
    <div class="p-6 space-y-6">
        <div>
            <h4 class="font-medium mb-3">Trigger Conditions</h4>
            <div class="space-y-3">
                <label class="flex items-center gap-3">
                    <input type="checkbox" class="rounded" checked>
                    <span class="text-sm">New hot leads</span>
                </label>
                <label class="flex items-center gap-3">
                    <input type="checkbox" class="rounded" checked>
                    <span class="text-sm">Offer approval required</span>
                </label>
                <label class="flex items-center gap-3">
                    <input type="checkbox" class="rounded">
                    <span class="text-sm">Overdue tasks</span>
                </label>
                <label class="flex items-center gap-3">
                    <input type="checkbox" class="rounded">
                    <span class="text-sm">Important deal updates</span>
                </label>
            </div>
        </div>
        <div>
            <h4 class="font-medium mb-3">Notification Methods</h4>
            <div class="grid gap-3 md:grid-cols-2">
                <label class="flex items-center gap-3">
                    <input type="checkbox" class="rounded" checked>
                    <span class="text-sm">In-app</span>
                </label>
                <label class="flex items-center gap-3">
                    <input type="checkbox" class="rounded">
                    <span class="text-sm">Email</span>
                </label>
                <label class="flex items-center gap-3">
                    <input type="checkbox" class="rounded">
                    <span class="text-sm">SMS</span>
                </label>
                <label class="flex items-center gap-3">
                    <input type="checkbox" class="rounded">
                    <span class="text-sm">Push notifications</span>
                </label>
            </div>
        </div>
    </div>
</div>

<!-- Integrations -->
<div class="bg-white border rounded-lg">
    <div class="p-4 border-b">
        <h3 class="font-semibold">Integrations</h3>
    </div>
    <div class="p-6">
        <div class="grid gap-4 md:grid-cols-2">
            <div class="border rounded-lg p-4">
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zM4 7h12v9H4V7z"/>
                            </svg>
                        </div>
                        <div>
                            <h4 class="font-medium">Calendar</h4>
                            <p class="text-sm text-gray-600">Google Calendar</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-green-500"></span>
                        <button class="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">Connected</button>
                    </div>
                </div>
                <p class="text-xs text-gray-500">Sync meetings and reminders</p>
            </div>

            <div class="border rounded-lg p-4">
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                            </svg>
                        </div>
                        <div>
                            <h4 class="font-medium">WhatsApp</h4>
                            <p class="text-sm text-gray-600">Business API</p>
                        </div>
                    </div>
                    <button class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                        <span>Save Changes</span>
                    </button>
                </div>
                <p class="text-xs text-gray-500">Send messages to clients</p>
            </div>

            <div class="border rounded-lg p-4">
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                            <svg class="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                            </svg>
                        </div>
                        <div>
                            <h4 class="font-medium">Email</h4>
                            <p class="text-sm text-gray-600">SMTP/Gmail</p>
                        </div>
                    </div>
                    <button class="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">Connected</button>
                </div>
                <p class="text-xs text-gray-500">Automated email campaigns</p>
            </div>

            <div class="border rounded-lg p-4">
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <svg class="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                            </svg>
                        </div>
                        <div>
                            <h4 class="font-medium">CRM</h4>
                            <p class="text-sm text-gray-600">Salesforce/HubSpot</p>
                        </div>
                    </div>
                    <button class="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors">Connect</button>
                </div>
                <p class="text-xs text-gray-500">Sync contacts and deals</p>
            </div>
        </div>
    </div>
</div>

<!-- Save settings button -->
<div class="flex justify-end">
    <button onclick="saveAssistantSettings()" class="bg-black text-white py-2 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors">Save Changes</button>
</div>
        </div>
    `;
}


function saveAssistantSettings() {
    // Get form values
    const assistantName = document.getElementById('assistant-name')?.value || 'My Assistant';
    const language = document.getElementById('language')?.value || 'ru';
    const tone = document.getElementById('tone')?.value || 'professional';
    const responseSpeed = document.getElementById('response-speed')?.value || 'normal';
    const emailNotifications = document.getElementById('email-notifications')?.checked || false;
    const smsNotifications = document.getElementById('sms-notifications')?.checked || false;
    const whatsappIntegration = document.getElementById('whatsapp-integration')?.checked || false;
    const telegramIntegration = document.getElementById('telegram-integration')?.checked || false;

    // Save settings (in a real app this would be an API call)
    const settings = {
        assistantName,
        language,
        tone,
        responseSpeed,
        notifications: {
            email: emailNotifications,
            sms: smsNotifications
        },
        integrations: {
            whatsapp: whatsappIntegration,
            telegram: telegramIntegration
        },
        savedAt: new Date().toISOString()
    };

    // Save to localStorage for demonstration
    localStorage.setItem('assistantSettings', JSON.stringify(settings));

    // Show success notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50';
    notification.textContent = 'Settings saved successfully!';
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);

    console.log('Assistant settings saved:', settings);
}

// Simulation function for AI SDR
window.simulateAiQualification = function () {
    const aiDeals = dealsData.filter(d => d.status === 'AI Qualification');
    if (aiDeals.length === 0) {
        // If no deals in qualification, reset one for demo purposes
        const demoDeal = dealsData.find(d => d.client === 'Sarah Connor');
        if (demoDeal) {
            demoDeal.status = 'AI Qualification';
            window.simulateAiQualification(); // Retry
            return;
        }
        alert('No deals available for simulation.');
        return;
    }

    const deal = aiDeals[0];
    deal.status = 'Ready for Agent';
    deal.summary = '✅ AI Qualified: Client confirmed budget of $5.5M and interest in Palm Jumeirah. Ready for viewing options.';

    // Show notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-4 rounded-lg shadow-xl z-50 animate-in slide-in-from-right duration-300 flex items-center gap-3';
    notification.innerHTML = `
        <div class="bg-white/20 p-2 rounded-full">
            ${ICONS.bot}
        </div>
        <div>
            <h4 class="font-bold">New Qualified Lead!</h4>
            <p class="text-sm opacity-90">${deal.client} is ready for handoff.</p>
        </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('opacity-0', 'translate-x-full');
        setTimeout(() => notification.remove(), 300);
    }, 4000);

    // Refresh views
    if (window.renderDealsPage) {
        window.renderDealsPage();
    }
}


export {renderMyAssistantPage, initializeChatHandlers, addUserMessage, addAssistantMessage, generateAssistantResponse, initChatHandlers, addMessage, copyMessage, fallbackCopyTextToClipboard, showCopyNotification, saveChatMessage, saveDialogToHistory, getChatHistory, generateDialogTitle, updateChatHistoryDisplay, getTimeAgo, loadDialog, clearChatHistory, renderMyAssistantSettingsPage, saveAssistantSettings};
