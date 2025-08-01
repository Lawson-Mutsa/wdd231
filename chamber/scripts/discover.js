document.addEventListener("DOMContentLoaded", function() {
    // Load last visit information
    displayLastVisit();
    
    // Load attractions from JSON
    loadAttractions();
    
    // Set last modified date
    document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;
});

function displayLastVisit() {
    const visitMessage = document.getElementById("visit-message");
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();
    
    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSince = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        
        if (daysSince < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            const dayText = daysSince === 1 ? "day" : "days";
            visitMessage.textContent = `You last visited ${daysSince} ${dayText} ago.`;
        }
    }
    
    localStorage.setItem("lastVisit", now.toString());
}

async function loadAttractions() {
    try {
        const response = await fetch("data/attractions.json");
        const attractions = await response.json();
        displayAttractions(attractions);
    } catch (error) {
        console.error("Error loading attractions:", error);
    }
}

function displayAttractions(attractions) {
    const gallery = document.querySelector(".discover-gallery");
    
    attractions.forEach((attraction, index) => {
        const card = document.createElement("article");
        card.className = "discover-card";
        card.style.gridArea = `card${index + 1}`;
        
        card.innerHTML = `
            <figure>
                <img src="images/${attraction.image}" alt="${attraction.name}" loading="lazy">
            </figure>
            <div class="discover-card-content">
                <h2>${attraction.name}</h2>
                <address>${attraction.address}</address>
                <p>${attraction.description}</p>
                <button class="learn-more">Learn More</button>
            </div>
        `;
        
        gallery.appendChild(card);
    });
}