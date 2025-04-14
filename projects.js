// projects.js

document.addEventListener("DOMContentLoaded", () => {
    const projects = [
        {
            title: "Tovi Life Insurance App",
            description: "A dynamic PHP web app featuring secure login, PDF receipt generation, role-based dashboards, and session-based authentication.",
            link: "https://github.com/Tovi91-hub/IN453_Unit3_Sedjro",
            image: "assets/tovi-life-preview.jpg"
        },
        {
            title: "IN453 Unit 3 Secure App",
            description: "An N-tier application using PHP and MySQL with business/data layers, session handling, and Git version control. Developed for academic submission.",
            link: "https://github.com/Tovi91-hub/IN453_Unit3_Sedjro",
            image: "assets/unit3-app-preview.jpg"
        }
    ];

    const gallery = document.getElementById("project-gallery");

    projects.forEach(project => {
        const card = document.createElement("div");
        card.className = "project-card";

        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${project.link}" target="_blank" class="btn">View Project</a>
        `;

        gallery.appendChild(card);
    });
});