// notify-confirm.html functionality
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const confirmationDiv = document.getElementById('confirmationDetails');
    
    if (params.toString()) {
        confirmationDiv.innerHTML = `
            <p><strong>Name:</strong> ${params.get('name')}</p>
            <p><strong>Email:</strong> ${params.get('email')}</p>
            <p><strong>City:</strong> ${params.get('city')}</p>
            <p>We'll notify you when the ISS is visible over ${params.get('city')}!</p>
        `;
    } else {
        confirmationDiv.innerHTML = '<p>No submission data found. <a href="notify.html">Try again</a>.</p>';
    }
});