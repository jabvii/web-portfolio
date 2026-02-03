document.addEventListener("DOMContentLoaded", () => {
    const cards = Array.from(document.querySelectorAll(".project-card"));
    const dotsContainer = document.querySelector(".project-dots");

    const ITEMS_PER_PAGE = 3;
    const totalPages = Math.ceil(cards.length / ITEMS_PER_PAGE);
    let currentPage = 0;

    // Create dots
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement("div");
        dot.classList.add("project-dot");
        if (i === 0) dot.classList.add("active");
        dot.dataset.page = i;
        dotsContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll(".project-dot");

    // Show only cards for the selected page
    function renderPage(page) {
        currentPage = page;

        // Hide all cards first
        cards.forEach(card => card.style.display = "none");

        // Show the relevant group of 3
        const start = page * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;

        cards.slice(start, end).forEach(card => {
            card.style.display = "block";
        });

        // Update dots
        dots.forEach(dot => dot.classList.remove("active"));
        dots[page].classList.add("active");
    }

    // Attach events to dots
    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            renderPage(parseInt(dot.dataset.page));
        });
    });

    // Initial view
    renderPage(0);
});
