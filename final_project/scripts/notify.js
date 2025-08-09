// notify.html form handling
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('notifyForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const params = new URLSearchParams(formData);
            
            localStorage.setItem('issNotification', JSON.stringify(Object.fromEntries(formData)));
            window.location.href = `notify-confirm.html?${params.toString()}`;
        });
    }
});