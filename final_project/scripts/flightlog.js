// Flight Log page functionality
document.addEventListener('DOMContentLoaded', () => {
    // Load and display flight log
    displayFlightLog();
    
    // Clear log button
    document.getElementById('clearLogBtn').addEventListener('click', clearFlightLog);
});

function displayFlightLog() {
    const flightLogBody = document.getElementById('flightLogBody');
    const history = JSON.parse(localStorage.getItem('issPositions') || '[]'); // Fixed missing parenthesis
    
    flightLogBody.innerHTML = '';
    
    if (history.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="3" style="text-align: center;">No flight data available</td>';
        flightLogBody.appendChild(row);
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

function clearFlightLog() {
    if (confirm('Are you sure you want to clear the flight log?')) {
        localStorage.removeItem('issPositions');
        displayFlightLog();
    }
}