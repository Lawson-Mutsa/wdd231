document.addEventListener('DOMContentLoaded', () => {
    // Load crew data
    const crewMembers = [
        {
            name: "Commander John Smith",
            agency: "NASA",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            bio: "Veteran astronaut with 3 spaceflights"
        },
        {
            name: "Flight Engineer Anna Kowalski",
            agency: "ESA",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            bio: "Specialist in life support systems"
        },
        {
            name: "Dr. Michael Chen",
            agency: "NASA",
            image: "https://randomuser.me/api/portraits/men/22.jpg",
            bio: "Lead scientist for biology experiments"
        }
    ];

    const crewGrid = document.getElementById('crewMembers');
    crewMembers.forEach(member => {
        const card = document.createElement('div');
        card.className = 'crew-member';
        card.innerHTML = `
             <img src="${member.image}" alt="${member.name}" class="crew-img" loading="lazy">
            <h3>${member.name}</h3>
            <p><strong>${member.agency}</strong></p>
            <p>${member.bio}</p>
        `;
        crewGrid.appendChild(card);
    });

    // Form handling
    const form = document.getElementById('notifyForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const modal = document.getElementById('confirmationModal');
        const details = document.getElementById('confirmationDetails');
        
        // Display confirmation
        details.innerHTML = `
            <h3>Thank You!</h3>
            <p>We'll notify <strong>${formData.get('name')}</strong> when the ISS is visible over ${formData.get('city')}.</p>
            <p>Confirmation sent to: ${formData.get('email')}</p>
        `;
        
        modal.style.display = 'block';
        
        // Store in localStorage
        const notification = {
            name: formData.get('name'),
            email: formData.get('email'),
            city: formData.get('city'),
            date: new Date().toLocaleString()
        };
        localStorage.setItem('issNotification', JSON.stringify(notification));
        
        form.reset();
    });

    // Close modal button
    document.querySelector('.close-modal').addEventListener('click', () => {
        document.getElementById('confirmationModal').style.display = 'none';
    });
});