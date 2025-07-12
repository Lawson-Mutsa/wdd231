const directory = document.getElementById('directory');
const gridBtn = document.getElementById('gridView');
const listBtn = document.getElementById('listView');



// last modified date
const lastModifiedParagraph = document.getElementById("lastModified");
lastModifiedParagraph.textContent = "Last Modified: " + document.lastModified;


async function fetchMembers() {
    try {
        const response = await fetch('data/members.json'); // adjust path if needed
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

function displayMembers(members) {
    directory.innerHTML = '';

    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('member-card');

        card.innerHTML = `
            <h3>${member.name}</h3>
            <div class="card-body">
                <img src="images/${member.image_icon || 'placeholder.jpg'}" alt="${member.name} logo" class="member-img" />
                <div class="member-info">
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p><strong>Phone:</strong> ${member.phone_number}</p>
                    <p><strong>Website:</strong> <a href="${member["website-url"]}" target="_blank">${member["website-url"]}</a></p>
                    <p><strong>Membership:</strong> ${member.membership_level || "Member"}</p>
                </div>
            </div>
        `;

        directory.appendChild(card);
    });
}


// Toggle view
gridBtn.addEventListener('click', () => {
    directory.classList.add('grid-view');
    directory.classList.remove('list-view');
});

listBtn.addEventListener('click', () => {
    directory.classList.add('list-view');
    directory.classList.remove('grid-view');
});

fetchMembers();
