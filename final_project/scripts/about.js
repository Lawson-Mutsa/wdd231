// About page functionality
document.addEventListener('DOMContentLoaded', () => {
    loadCrewInformation();
});

function loadCrewInformation() {
    const crewGrid = document.getElementById('crewMembers');
    const crewMembers = [
        {
            name: "Commander John Smith",
            agency: "NASA",
            position: "Commander",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            bio: "Veteran astronaut with 3 previous spaceflights. Leads Expedition 68."
        },
        // ... (other crew members)
    ];
    
    crewGrid.innerHTML = '';
    crewMembers.forEach(member => {
        const memberElement = document.createElement('div');
        memberElement.className = 'crew-member';
        memberElement.innerHTML = `
            <img src="${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p><strong>Agency:</strong> ${member.agency}</p>
            <p><strong>Position:</strong> ${member.position}</p>
            <p>${member.bio}</p>
        `;
        crewGrid.appendChild(memberElement);
    });
}