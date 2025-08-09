// Shared functionality across all pages
const navigation = document.querySelector('.navigation');
const hamburgerButton = document.querySelector('#menu');

if (hamburgerButton) {
    hamburgerButton.addEventListener('click', onClick);
}

function onClick() {
    navigation.classList.toggle('show');
    hamburgerButton.classList.toggle('show');
}

// Modal functionality
function setupModal(modalId, triggerId, closeClass) {
    const modal = document.getElementById(modalId);
    const trigger = document.getElementById(triggerId);
    const closeBtn = document.querySelector(`.${closeClass}`);

    if (trigger) {
        trigger.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Initialize any modals on the page
document.addEventListener('DOMContentLoaded', () => {
    setupModal('issDetailsModal', 'detailsBtn', 'close-modal');
    
    // Set current year in footer (shared across all pages)
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});