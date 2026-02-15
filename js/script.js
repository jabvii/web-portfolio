// Open links in new tab
function openLink(url) {
    window.open(url, '_blank');
}

const contactInfo = {
    email: 'john@example.com',
    github: 'https://github.com/jabvii',
    linkedin: 'https://linkedin.com'
};

// nav bar active section
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute("id");

                    navLinks.forEach((link) => {
                        link.classList.remove("active");
                        if (link.getAttribute("href") === `#${id}`) {
                            link.classList.add("active");
                        }
                    });
                }
            });
        },
        { threshold: 0.5 } // Once 50% of section is visible, mark active
    );
    sections.forEach((section) => observer.observe(section));
});

// projects section
const projects = [
    {
    id: 'lorskie-store',
    title: 'Lorskie Store',
    description: 'A responsive record management system designed to streamline data handling, user access, and report generation, with a focus on user-friendly UI and system reliability.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    imageUrl: null,
    previewUrl: 'https://jabvii.github.io/lorskiestore-demo/',
    githubUrl: null,
    },
    {
    id: 'pocket-stash',
    title: 'Pocket Stash',
    description: 'A personal finance management system designed to track expenses, monitor budgets, and generate financial reports, emphasizing usability, data accuracy, and efficient record keeping.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    imageUrl: './images/pocket_stash.png',
    previewUrl: 'https://jabvii.github.io/pocketstash-demo/',
    githubUrl: null,
    },
    {
    id: 'undead-ascension',
    title: 'Undead Ascension',
    description: 'A zombie survival game where players fight waves of undead, manage resources, and strive to stay alive as long as possible.',
    technologies: ['Scratch'],
    imageUrl: './images/undead_ascension.png',
    previewUrl: 'https://scratch.mit.edu/projects/969228217/',
    githubUrl: null,
    },
        {
    id: 'project-x',
    title: 'Project X',
    description: '',
    technologies: [''],
    imageUrl: '',
    previewUrl: '',
    githubUrl: null,
    },
    
    
];
// projects config
function renderProjects() {
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = '';

    projects.forEach(project => {
        grid.appendChild(createProjectCard(project));
    });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';

    card.innerHTML = `
    <div class="project-image">
        ${project.imageUrl
            ? `<img src="${project.imageUrl}" alt="${project.title}">`
            : `<div class="project-image-placeholder">📁</div>`
        }
    </div>

    <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>

        <div class="project-technologies">
            ${project.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>

        <div class="project-actions">
            ${project.previewUrl ? `<a href="${project.previewUrl}" target="_blank" class="project-link">Preview</a>` : ``}
            ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="project-link">Code</a>` : ``}
        </div>
    </div>
    `;

    return card;
}

document.addEventListener("DOMContentLoaded", renderProjects);