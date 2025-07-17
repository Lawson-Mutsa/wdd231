const members = [
  { name: "Midlands Private Hospital", address: "Gymkhana Grounds 8766 J. Tongogara Ave", phone_number: "054-2227218", "website-url": "https://www.themph.co.zw/", image_icon: "mph.png", membership_level: "Silver" },
  { name: "Bethel Clinic", address: "73 6th Street", phone_number: "+263 (54) 223 1628/709", "website-url": "https://bethelclinic.co.zw/", image_icon: "bethel.jpg", membership_level: "Gold" },
  { name: "Gweru Specialist Children's Hospital", address: "74-9th Street Gweru", phone_number: "0542229650", "website-url": "http://gsch.co.zw/", image_icon: "gsch.jpg", membership_level: "" },
  { name: "Bata Shoe Company", address: "Stand Number 521 - 522, Bulawayo Road", phone_number: "242758250", "website-url": "https://www.bata.com/zw/", image_icon: "bata.webp", membership_level: "Silver" },
  { name: "CritiCare Ambulance Services", address: "Gymkhana Grounds 9186 J. Tongogara Ave", phone_number: "+263788946660", "website-url": "https://criticareambulance24.co.zw/", image_icon: "criticare.jpg", membership_level: "Gold" },
  { name: "Series Technology", address: "GRW7+2FQ", phone_number: "0542022120471", "website-url": "http://www.seriestechnologies.com/", image_icon: "series.jpg", membership_level: "Silver" },
  { name: "Sheasham Investments", address: "75 7th Street", phone_number: "+263 717 267 049", "website-url": "https://sheashaminvestments.co.zw/", image_icon: "sheasham.png", membership_level: "Gold" }
];

const spotlightMembers = members.filter(m =>
  m.membership_level === "Gold" || m.membership_level === "Silver"
);

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const randomSpotlights = shuffleArray(spotlightMembers).slice(0, Math.floor(Math.random() * 2) + 2);

const spotlightContainer = document.querySelector(".spotlights");

randomSpotlights.forEach(member => {
  const card = document.createElement("div");
  card.classList.add("spotlight-card");
  card.innerHTML = `
    <img src="images/${member.image_icon}" alt="${member.name} logo">
    <h3>${member.name}</h3>
    <p><strong>Phone:</strong> ${member.phone_number}</p>
    <p><strong>Address:</strong> ${member.address}</p>
    <p><strong>Website:</strong> <a href="${member["website-url"]}" target="_blank">${member["website-url"]}</a></p>
    <p class="membership ${member.membership_level.toLowerCase()}">${member.membership_level} Member</p>
  `;
  spotlightContainer.appendChild(card);
});
