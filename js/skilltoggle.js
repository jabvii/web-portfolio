document.querySelectorAll('.skills-toggle button').forEach(btn => {
    btn.addEventListener('click', () => {

        const show = btn.dataset.show;
        const grid = document.querySelector('.skills-grid');

        document.querySelectorAll('.skills-toggle button')
            .forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const items = document.querySelectorAll('.skill-item');

        // Filter visibility
        items.forEach(item => {
            if (show === "all" || item.dataset.category === show) {
                item.style.display = "flex";
            } else {
                item.style.display = "none";
            }
        });

        // Reset compact classes
        grid.classList.remove("compact", "fw-2");

        // Apply compact when few items
        if (show === "tools") {
            grid.classList.add("compact");
        }

        if (show === "frameworks") {
            grid.classList.add("compact", "fw-2");
        }

    });
});