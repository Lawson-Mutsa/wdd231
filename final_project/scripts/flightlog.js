document.addEventListener('DOMContentLoaded', () => {
    displayFlightLog();

    document.getElementById('clearLogBtn').addEventListener('click', () => {
        if (confirm('Are you sure you want to clear the flight log?')) {
            localStorage.removeItem('issPositions');
            displayFlightLog();
        }
    });
});

function displayFlightLog() {
    const flightLogBody = document.getElementById('flightLogBody');
    const history = JSON.parse(localStorage.getItem('issPositions') || '[]');

    flightLogBody.innerHTML = '';

    if (history.length === 0) {
        flightLogBody.innerHTML = '<tr><td colspan="3" style="text-align: center;">No flight data available</td></tr>';
        return;
    }

    history.forEach(position => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${new Date(position.timestamp * 1000).toLocaleString()}</td>
            <td>${position.latitude.toFixed(4)}</td>
            <td>${position.longitude.toFixed(4)}</td>
        `;
        flightLogBody.appendChild(row);
    });
}
