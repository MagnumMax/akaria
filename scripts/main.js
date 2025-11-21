import { state, ICONS } from "./state.js";
import { renderSidebar, updateActiveNavLink, showPage, handleRouting, setRenderMap, setOfferRenderer } from "./router.js";
import { initLogin, initMobileMenu } from "./auth.js";
import {
    renderDashboard,
    renderMyAssistantPage,
    renderMyAssistantSettingsPage,
    renderDealsPage,
    renderDealDetailsPage,
    renderPropertiesPage,
    renderPropertyDetailsPage,
    renderTasksPage,
    renderSettingsPage,
    renderImportsPage,
    renderOfferPage
} from "./pages/index.js";
import { setupModal } from "./modals.js";

        // ===================================================================================
        // SCRIPT: AKARIA Portal Interactive Prototype
        // ===================================================================================

        document.addEventListener('DOMContentLoaded', () => {

            // -----------------------------------------------------------------------------
            // 1. STATE MANAGEMENT
            // -----------------------------------------------------------------------------
            window.state = state;

            // -----------------------------------------------------------------------------
            // 2. NAVIGATION & ROUTING (via router module)
            // -----------------------------------------------------------------------------

            // Initialize Login
            setRenderMap({
                'dashboard': renderDashboard,
                'my-assistant': renderMyAssistantPage,
                'my-assistant-settings': renderMyAssistantSettingsPage,
                'deals': renderDealsPage,
                'deal-details': renderDealDetailsPage,
                'properties': renderPropertiesPage,
                'property-details': renderPropertyDetailsPage,
                'tasks': renderTasksPage,
                'settings': renderSettingsPage,
                'imports': renderImportsPage
            });
            setOfferRenderer(renderOfferPage);

            initLogin(updateUserUI, initMobileMenu);

            const { showModal } = setupModal();

            // -----------------------------------------------------------------------------
            // 6. EVENT LISTENERS & INITIALIZATION
            // -----------------------------------------------------------------------------

            function updateUserUI() {
                const user = users[state.currentUserRole];
                document.getElementById('user-avatar').src = user.avatar;
                document.getElementById('user-name').textContent = user.name;
                document.getElementById('user-role-display').textContent = user.role;
                renderSidebar();
                handleRouting();
                document.querySelectorAll('.role-btn').forEach(btn => {
                    btn.classList.remove('bg-black', 'text-white');
                    if (btn.dataset.role === state.currentUserRole) btn.classList.add('bg-black', 'text-white');
                });
            }

            document.getElementById('role-switcher').addEventListener('click', (e) => { if (e.target.closest('.role-btn')) { state.currentUserRole = e.target.closest('.role-btn').dataset.role; window.location.hash = '#dashboard'; updateUserUI(); } });
            document.getElementById('sidebar-nav-links').addEventListener('click', (e) => { const link = e.target.closest('a'); if (link) { e.preventDefault(); window.location.hash = link.getAttribute('href'); } });

            // Handler for chat button in top bar
            const assistantChatBtn = document.getElementById('assistant-chat-btn');
            if (assistantChatBtn) {
                assistantChatBtn.addEventListener('click', function () {
                    window.location.hash = '#my-assistant';
                });
            }

            document.getElementById('page-content-wrapper').addEventListener('click', e => {
                const link = e.target.closest('a');
                if (link && link.getAttribute('href')?.startsWith('#')) { e.preventDefault(); window.location.hash = link.getAttribute('href'); }

                if (e.target.closest('.focus-tab')) {
                    const tabButton = e.target.closest('.focus-tab');
                    document.querySelectorAll('.focus-tab').forEach(t => t.classList.remove('tab-active', 'text-muted-foreground'));
                    tabButton.classList.add('tab-active'); tabButton.classList.remove('text-muted-foreground');
                    document.querySelectorAll('.focus-tab-content').forEach(c => c.classList.add('page-hidden'));
                    document.getElementById(`tab - ${tabButton.dataset.tab} `).classList.remove('page-hidden');
                }

                if (e.target.closest('.approval-item')) {
                    const offerId = e.target.closest('.approval-item').dataset.offerId;
                    showModal('Review Offer for Elon Musk', `< div class="bg-muted p-4 rounded-md" ><h4 class="font-semibold">Mini-Landing Page Preview</h4><p class="text-sm text-muted-foreground">This is a simulation of the offer page that will be sent.</p><img src="https://picsum.photos/seed/offer${offerId}/800/450" class="mt-4 rounded-md w-full"></div><div class="mt-6 flex justify-end gap-3"><button class="px-4 py-2 text-sm font-medium border rounded-md" onclick="document.getElementById('modal-container').dataset.state = 'closed'">Reject</button><button class="px-4 py-2 text-sm font-medium bg-black text-white rounded-md" onclick="document.getElementById('modal-container').dataset.state = 'closed'">Approve & Send</button></div>`);
                }

                if (e.target.id === 'generate-forecast-btn') {
                    showModal('Q4 Revenue Forecast', `< div class="text-center" ><p class="text-sm text-muted-foreground">Generated by Leonardo</p><p class="text-5xl font-bold my-4">$2.5M - $2.8M</p><p class="text-sm">Based on the current pipeline and a <span class="font-semibold">85% confidence interval</span>.</p></div > `);
                }

                if (e.target.closest('details summary')) {
                    const details = e.target.closest('details');
                    const icon = details.querySelector('summary svg');
                    // Timeout to allow the 'open' attribute to update
                    setTimeout(() => {
                        if (details.open) {
                            icon.style.transform = 'rotate(0deg)';
                        } else {
                            icon.style.transform = 'rotate(-90deg)';
                        }
                    }, 0);
                }

                const distributeForm = e.target.closest('#distribute-form');
                if (distributeForm) {
                    e.preventDefault();
                    const countInput = document.getElementById('distribute-count');
                    const count = parseInt(countInput.value);
                    if (count > 0 && count <= state.unassignedLeads) {
                        state.unassignedLeads -= count;
                        alert(`${count} leads have been randomly distributed to agents and are now being processed by their AI assistants.`);
                        renderImportsPage();
                    } else {
                        alert('Please enter a valid number of leads to distribute.');
                    }
                }
            });



            document.getElementById('mobile-menu-btn').addEventListener('click', () => { document.getElementById('sidebar').classList.toggle('hidden'); });
            window.addEventListener('hashchange', handleRouting);
            updateUserUI();
        });
    
