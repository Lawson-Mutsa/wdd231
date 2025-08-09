document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('mapContainer').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const issIcon = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/2733/2733092.png',
        iconSize: [50, 50],
        iconAnchor: [25, 25]
    });

    const marker = L.marker([0, 0], { icon: issIcon }).addTo(map);

    fetchISSLocation();
    setInterval(fetchISSLocation, 5000);

    function fetchISSLocation() {
        fetch('https://api.wheretheiss.at/v1/satellites/25544')
            .then(response => response.json())
            .then(data => {
                const { latitude, longitude, timestamp, velocity, altitude, visibility } = data;

                document.getElementById('latitude').textContent = latitude.toFixed(4);
                document.getElementById('longitude').textContent = longitude.toFixed(4);
                document.getElementById('timestamp').textContent = new Date(timestamp * 1000).toLocaleString();

                marker.setLatLng([latitude, longitude]);
                map.setView([latitude, longitude], map.getZoom());

                document.getElementById('issSpeed').textContent = velocity.toFixed(2);
                document.getElementById('issAltitude').textContent = altitude.toFixed(2);
                document.getElementById('visibility').textContent = visibility;

                storePositionInHistory(latitude, longitude, timestamp);
                calculateSunTimes(latitude, longitude, timestamp);
            })
            .catch(error => {
                console.error('Error fetching ISS data:', error);
                document.getElementById('latitude').textContent = 'Error';
                document.getElementById('longitude').textContent = 'Error';
            });
    }

    function storePositionInHistory(lat, lon, timestamp) {
        let history = JSON.parse(localStorage.getItem('issPositions') || '[]');
        history.unshift({ latitude: lat, longitude: lon, timestamp });
        if (history.length > 15) history = history.slice(0, 15);
        localStorage.setItem('issPositions', JSON.stringify(history));
    }

    function calculateSunTimes(lat, lon, timestamp) {
        const date = new Date(timestamp * 1000);
        const hours = date.getHours();
        const sunrise = document.getElementById('sunrise');
        const sunset = document.getElementById('sunset');

        if (hours >= 6 && hours < 18) {
            sunrise.textContent = 'Already risen today';
            sunset.textContent = `Approx ${18 - hours} hours from now`;
        } else {
            sunset.textContent = 'Already set today';
            sunrise.textContent = `Approx ${(6 - hours + 24) % 24} hours from now`;
        }
    }
});
