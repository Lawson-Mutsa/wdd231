// you already pasted this data:
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming...',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web...',
        technology: ['HTML','CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized...',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects...',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals...',
        technology: ['HTML','CSS','JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals...',
        technology: ['HTML','CSS','JavaScript'],
        completed: false
    }
];

const courseList = document.querySelector(".course-list");
const totalCredits = document.querySelector(".total-credits");

function renderCourses(array) {
    courseList.innerHTML = "";
    const total = array.reduce((sum, c) => sum + c.credits, 0);
    totalCredits.textContent = `Total Credits: ${total}`;
    
    array.forEach(course => {
        const div = document.createElement("div");
        div.classList.add("course-card");
        if (course.completed) {
            div.classList.add("completed");
        }
        div.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p><strong>${course.title}</strong></p>
            <p>${course.description}</p>
            <p><em>Technologies: ${course.technology.join(", ")}</em></p>
            <p>Credits: ${course.credits}</p>
        `;
        courseList.appendChild(div);
    });
}

// default view
//renderCourses(courses);

// button logic
const buttonsOne = document.querySelectorAll(".courses-one button");
const buttonsTwo = document.querySelectorAll(".courses-two button");

// top row buttons
buttonsOne.forEach(button => {
    button.addEventListener("click", () => {
        const label = button.textContent.trim();
        let filtered;
        if (label === "ALL") {
            filtered = courses;
        } else if (label === "WDD") {
            filtered = courses.filter(c => c.subject === "WDD");
        } else if (label === "CSE") {
            filtered = courses.filter(c => c.subject === "CSE");
        }
        renderCourses(filtered);
    });
});

// specific course buttons
buttonsTwo.forEach(button => {
    button.addEventListener("click", () => {
        const label = button.textContent.trim();
        const filtered = courses.filter(c => `${c.subject}${c.number}` === label);
        renderCourses(filtered);
    });
});
