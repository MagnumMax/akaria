import { state } from "./state.js";

export function initLogin(updateUserUI, initMobileMenu) {
    const loginForm = document.getElementById("login-form");
    const roleSelect = document.getElementById("role-select");
    const emailInput = document.getElementById("email-address");
    const passwordInput = document.getElementById("password");
    const loginPage = document.getElementById("login-page");
    const appContainer = document.getElementById("app-container");

    const credentials = {
        CEO: { email: "elena@akaria.com", password: "password123" },
        Agent: { email: "agent@akaria.com", password: "agentpassword" },
        Admin: { email: "admin@akaria.com", password: "adminsecure" }
    };

    roleSelect.addEventListener("change", e => {
        const role = e.target.value;
        if (credentials[role]) {
            emailInput.value = credentials[role].email;
            passwordInput.value = credentials[role].password;
        }
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        const selectedRole = roleSelect.value;

        const btn = loginForm.querySelector("button");
        const originalText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Logging in...`;

        setTimeout(() => {
            state.currentUserRole = selectedRole;

            loginPage.style.opacity = "0";

            setTimeout(() => {
                loginPage.classList.add("hidden");
                appContainer.classList.remove("hidden");

                void appContainer.offsetWidth;

                appContainer.classList.add("flex");
                appContainer.style.opacity = "1";

                updateUserUI();
                initMobileMenu();

                btn.disabled = false;
                btn.innerHTML = originalText;
            }, 500);
        }, 800);
    });
}

export function initMobileMenu() {
    const btn = document.getElementById("mobile-menu-btn");
    const sidebar = document.getElementById("sidebar");
    const backdrop = document.getElementById("mobile-menu-backdrop");
    const closeBtn = document.getElementById("close-sidebar-btn");

    function toggleMenu() {
        const isClosed = sidebar.classList.contains("-translate-x-full");
        if (isClosed) {
            sidebar.classList.remove("-translate-x-full");
            backdrop.classList.remove("hidden");
        } else {
            sidebar.classList.add("-translate-x-full");
            backdrop.classList.add("hidden");
        }
    }

    btn.onclick = toggleMenu;
    closeBtn.onclick = toggleMenu;
    backdrop.onclick = toggleMenu;

    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth < 768) {
                sidebar.classList.add("-translate-x-full");
                backdrop.classList.add("hidden");
            }
        });
    });
}
