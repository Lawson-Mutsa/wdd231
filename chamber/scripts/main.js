document.addEventListener("DOMContentLoaded", () => {
    const directory = document.getElementById("directory");
    const gridBtn = document.getElementById("gridView");
    const listBtn = document.getElementById("listView");
    const lastModifiedParagraph = document.getElementById("lastModified");

    if (lastModifiedParagraph) {
        lastModifiedParagraph.textContent = "Last Modified: " + document.lastModified;
    }

    async function fetchMembers() {
        try {
            const response = await fetch("data/members.json");
            const members = await response.json();
            displayMembers(members);
        } catch (error) {
            console.error("Error fetching member data:", error);
        }
    }

    function displayMembers(members) {
        if (!directory) return;
        directory.innerHTML = "";

        members.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("member-card");

            card.innerHTML = `
                <h3>${member.name}</h3>
                <div class="card-body">
                    <img src="images/${member.image_icon || 'placeholder.jpg'}" 
                         alt="${member.name} logo" 
                         class="member-img"
                         loading="lazy"
                         width="120" height="120">
                    <div class="member-info">
                        <p><strong>Address:</strong> ${member.address}</p>
                        <p><strong>Phone:</strong> ${member.phone_number}</p>
                        <p><strong>Website:</strong> 
                            <a href="${member["website-url"]}" target="_blank" rel="noopener noreferrer">
                                ${member["website-url"]}
                            </a>
                        </p>
                        <p><strong>Membership:</strong> ${member.membership_level || "Member"}</p>
                    </div>
                </div>
            `;
            directory.appendChild(card);
        });
    }

    if (gridBtn) {
        gridBtn.addEventListener("click", () => {
            directory.classList.add("grid-view");
            directory.classList.remove("list-view");
        });
    }

    if (listBtn) {
        listBtn.addEventListener("click", () => {
            directory.classList.add("list-view");
            directory.classList.remove("grid-view");
        });
    }

    fetchMembers();
});

document.addEventListener('DOMContentLoaded', function() {
    // Set timestamp
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // Modal functionality
    document.querySelectorAll('.modal-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('href');
            const modal = document.querySelector(modalId);
            if (modal) {
                modal.style.display = 'block';
            } else {
                console.error('Modal not found:', modalId);
            }
        });
    });

    // Close buttons
    document.querySelectorAll('.close').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    // Close when clicking outside modal content
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Only run on thank-you page
    if (document.getElementById('displayFirstName')) {
        // Parse URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        
        // Display the submitted values
        document.getElementById('displayFirstName').textContent = urlParams.get('firstName') || 'Not provided';
        document.getElementById('displayLastName').textContent = urlParams.get('lastName') || 'Not provided';
        document.getElementById('displayEmail').textContent = urlParams.get('email') || 'Not provided';
        document.getElementById('displayPhone').textContent = urlParams.get('phone') || 'Not provided';
        document.getElementById('displayOrgName').textContent = urlParams.get('orgName') || 'Not provided';
        
        // Format the timestamp
        const timestamp = urlParams.get('timestamp');
        if (timestamp) {
            const date = new Date(timestamp);
            document.getElementById('displayTimestamp').textContent = date.toLocaleString();
        } else {
            document.getElementById('displayTimestamp').textContent = 'Not available';
        }
    }
});