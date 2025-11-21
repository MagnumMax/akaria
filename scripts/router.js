import { state, navLinks } from "./state.js";

let renderMap = {};
let renderOffer = null;

export function setRenderMap(map) {
    renderMap = map;
}

export function setOfferRenderer(fn) {
    renderOffer = fn;
}

export function renderSidebar() {
    const links = navLinks[state.currentUserRole];
    const navContainer = document.getElementById("sidebar-nav-links");
    navContainer.innerHTML = `<nav class="grid items-start px-4 text-sm font-medium gap-1">${links.map(link => {
        if (link.type === "divider") return '<hr class="my-4 border-border">';
        const isAssistantLink = link.id === "jessica" || link.id === "leonardo";
        const linkClasses = `nav-link flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-foreground hover:bg-muted/50 ${isAssistantLink ? "text-accent font-semibold" : ""}`;
        return `<a href="#${link.id}" data-page="${link.id}" class="${linkClasses}">${link.icon}<span>${link.name}</span></a>`;
    }).join("")}</nav>`;
    updateActiveNavLink();
}

export function updateActiveNavLink() {
    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("nav-active");
        if (link.dataset.page === state.currentPage.split("-")[0]) {
            link.classList.add("nav-active");
        }
    });
}

export function showPage(pageId, contextId = null) {
    document.querySelectorAll("#page-content-wrapper > section").forEach(page => page.classList.add("page-hidden"));

    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) {
        targetPage.classList.remove("page-hidden");
        state.currentPage = pageId;

        const renderer = renderMap[pageId];
        if (renderer) renderer(contextId);

        const pageConfig = (navLinks[state.currentUserRole] || []).find(p => p.id === pageId);
        document.getElementById("page-title").textContent = pageConfig ? pageConfig.name : pageId.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase());

        updateActiveNavLink();
    } else {
        showPage("dashboard");
    }
    document.getElementById("sidebar").classList.add("hidden");
}

export function handleRouting() {
    let hash = window.location.hash.substring(1);
    if (hash.startsWith("offer/")) {
        const token = hash.split("/")[1];
        if (renderOffer) renderOffer(token);
        document.getElementById("page-offer").classList.remove("page-hidden");
        document.getElementById("app-container").classList.add("page-hidden");
        document.getElementById("role-switcher").classList.add("page-hidden");
        return;
    } else {
        document.getElementById("page-offer").classList.add("page-hidden");
        document.getElementById("app-container").classList.remove("page-hidden");
        document.getElementById("role-switcher").classList.remove("page-hidden");
    }
    const [pageId, contextId] = hash.split("/");
    showPage(pageId || "dashboard", contextId ? parseInt(contextId, 10) : null);
}
