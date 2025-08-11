document.addEventListener('DOMContentLoaded', () => {
    console.log('About page script loaded'); // Debugging confirmation

    // Set current year
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Load crew data
    loadCrew();

    // Modal elements
    const modal = document.getElementById('confirmationModal');
    const modalClose = document.querySelector('.close-modal');
    const confirmationDetails = document.getElementById('confirmationDetails');

    // Form handling - with more robust selection and error handling
    const form = document.getElementById('notifyForm');
    
    if (!form) {
        console.error('Could not find the notification form!');
        return;
    }

    form.addEventListener('submit', function handleFormSubmit(e) {
        // Prevent default form submission
        e.preventDefault();
        e.stopPropagation();
        console.log('Form submission handled');

        try {
            const formData = new FormData(form);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const city = formData.get('city').trim();

            // Basic validation
            if (!name || !email || !city) {
                throw new Error('Please fill in all fields');
            }

            // Email validation
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                throw new Error('Please enter a valid email address');
            }

            // Save to localStorage
            const notificationData = {
                name,
                email,
                city,
                date: new Date().toISOString()
            };
            localStorage.setItem('issNotification', JSON.stringify(notificationData));
            console.log('Notification data saved:', notificationData);

            // Set confirmation content
            confirmationDetails.innerHTML = `
                <h2>Thank You, ${name}!</h2>
                <p>We'll notify you at <strong>${email}</strong> when the ISS is visible over <strong>${city}</strong>.</p>
                <p>You'll receive your first notification within 24 hours.</p>
            `;

            // Show the modal
            modal.style.display = 'flex';
            modal.setAttribute('aria-hidden', 'false');

            // Reset form
            form.reset();

        } catch (error) {
            console.error('Form submission error:', error);
            confirmationDetails.innerHTML = `
                <h2>Error</h2>
                <p class="error-message">${error.message}</p>
                <button onclick="this.parentElement.parentElement.style.display='none'">Try Again</button>
            `;
            modal.style.display = 'flex';
        }

        return false;
    });

    // Close modal with better accessibility
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
        }
    });
});

// Enhanced crew data loader with error handling
function loadCrew() {
    try {
        const crew = [
            {
                name: "Jasmin Moghbeli",
                role: "Commander (NASA)",
                image: "https://randomuser.me/api/portraits/men/30.jpg",
            },
            {
                name: "Andreas Mogensen",
                role: "Flight Engineer (ESA)",
                image: "https://randomuser.me/api/portraits/men/3.jpg",
            },
            {
                name: "Satoshi Furukawa",
                role: "Flight Engineer (JAXA)",
                image: "https://randomuser.me/api/portraits/women/32.jpg",
            }
        ];

        const grid = document.getElementById('crewMembers');
        if (!grid) {
            console.warn('Crew members grid not found');
            return;
        }

        grid.innerHTML = crew.map(member => `
            <div class="crew-card" style="aspect-ratio: 1/1.2">
      <img 
        src="${member.image}" 
        alt="${member.name}"
        width="300" 
        height="240"
        loading="lazy"
        decoding="async"
      >
      <h3>${member.name}</h3>
      <p>${member.role}</p>
    </div>
        `).join('');

    } catch (error) {
        console.error('Error loading crew data:', error);
        const grid = document.getElementById('crewMembers');
        if (grid) {
            grid.innerHTML = `<p class="error">Unable to load crew information at this time.</p>`;
        }
    }
}