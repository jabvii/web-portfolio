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
];
// config
const ITEMS_PER_PAGE = {
    desktop: 3,
    tablet: 2,
    mobile: 999,
};
let currentPage = 0;
let itemsPerPage = ITEMS_PER_PAGE.desktop;
function getItemsPerPage() {
    const width = window.innerWidth;
    if (width <= 640) return ITEMS_PER_PAGE.mobile;
    if (width <= 1024) return ITEMS_PER_PAGE.tablet;
    return ITEMS_PER_PAGE.desktop;
}
function getTotalPages() {
    return Math.ceil(projects.length / itemsPerPage);
}
const icons = {
    code: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>`,
    externalLink: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>`,
    github: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>`,
    folder: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>`,
};
// render
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.id = `project-${project.id}`;

    let actionsHtml = '';
    if (project.githubUrl || project.previewUrl) {
    actionsHtml = '<div class="project-actions">';
    if (project.githubUrl) {
        actionsHtml += `
        <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link">
            ${icons.github}
            <span>Code</span>
        </a>
        `;
    }
    if (project.previewUrl) {
        actionsHtml += `
        <a href="${project.previewUrl}" target="_blank" rel="noopener noreferrer" class="project-link">
            ${icons.externalLink}
            <span>Preview</span>
        </a>
        `;
    }
    actionsHtml += '</div>';
    }

    card.innerHTML = `
    <div class="project-image">
        ${project.imageUrl 
        ? `<img src="${project.imageUrl}" alt="${project.title}">`
        : `<div class="project-image-placeholder">${icons.folder}</div>`
        }
    </div>
    <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-technologies">
        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        ${actionsHtml}
    </div>
    `;

    return card;
}
function renderProjects() {
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = '';

    const startIndex = currentPage * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, projects.length);
    const visibleProjects = projects.slice(startIndex, endIndex);

    visibleProjects.forEach(project => {
    grid.appendChild(createProjectCard(project));
    });
}
function renderPaginationDots() {
    const dotsContainer = document.getElementById('pagination-dots');
    dotsContainer.innerHTML = '';

    const totalPages = getTotalPages();

    if (totalPages <= 1) return;

    for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement('button');
    dot.className = `pagination-dot${i === currentPage ? ' active' : ''}`;
    dot.setAttribute('aria-label', `Go to page ${i + 1}`);
    dot.addEventListener('click', () => goToPage(i));
    dotsContainer.appendChild(dot);
    }
}
// nav
function goToPage(pageIndex) {
    const totalPages = getTotalPages();
    currentPage = Math.max(0, Math.min(pageIndex, totalPages - 1));
    renderProjects();
    renderPaginationDots();
}
// initialization
function init() {
    itemsPerPage = getItemsPerPage();
    currentPage = 0;
    renderProjects();
    renderPaginationDots();
}
// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
    const newItemsPerPage = getItemsPerPage();
    if (newItemsPerPage !== itemsPerPage) {
        itemsPerPage = newItemsPerPage;
        currentPage = 0;
        renderProjects();
        renderPaginationDots();
    }
    }, 150);
});

init();
// projects section