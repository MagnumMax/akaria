export function setupModal() {
    const modal = {
        container: document.getElementById("modal-container"),
        title: document.getElementById("modal-title"),
        body: document.getElementById("modal-body"),
        closeBtn: document.getElementById("modal-close-btn")
    };

    const showModal = (title, contentHTML) => {
        modal.title.textContent = title;
        modal.body.innerHTML = contentHTML;
        modal.container.dataset.state = "open";
    };

    const hideModal = () => {
        modal.container.dataset.state = "closed";
    };

    modal.closeBtn.onclick = hideModal;
    modal.container.onclick = e => {
        if (e.target === modal.container) hideModal();
    };

    return { showModal, hideModal };
}
