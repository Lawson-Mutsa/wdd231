document.addEventListener('DOMContentLoaded', () => {
    loadCrew();

    // Form handling
    const form = document.getElementById('notifyForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            localStorage.setItem('issNotification', JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                city: formData.get('city'),
                date: new Date().toISOString()
            }));
            alert(`Thank you! We'll notify ${formData.get('name')} about ISS passes over ${formData.get('city')}.`);
            form.reset();
        });
    }
});

function loadCrew() {
    const crew = [
        {
            name: "Jasmin Moghbeli",
            role: "Commander (NASA)",
            image: "https://randomuser.me/api/portraits/men/30.jpg",
        },
        {
            name: "Andreas Mogensen",
            role: "Flight Engineer (ESA)",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
            name: "Satoshi Furukawa",
            role: "Flight Engineer (JAXA)",
            image: "https://randomuser.me/api/portraits/women/32.jpg",
        }
    ];

    const grid = document.getElementById('crewMembers');
    if (grid) {
        grid.innerHTML = crew.map(member => `
            <div class="crew-card">
                <img src="${member.image}" alt="${member.name}" loading="lazy">
                <h3>${member.name}</h3>
                <p>${member.role}</p>
            </div>
        `).join('');
    }
}
