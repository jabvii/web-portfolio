const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

// Track mouse position
let mouse = {
    x: undefined,
    y: undefined,
    radius: 120 // area of interaction
};

window.addEventListener("mousemove", function(e) {
    mouse.x = e.x;
    mouse.y = e.y;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 2 + Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce on edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        // Mouse interaction
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
            // Push particle away
            let force = (mouse.radius - distance) / mouse.radius;
            let pushX = (dx / distance) * force * 4;
            let pushY = (dy / distance) * force * 4;

            this.x -= pushX;
            this.y -= pushY;
        }
    }

    draw() {
        ctx.fillStyle = "rgba(0, 255, 255, 0.3)"; 
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Create particles
function init() {
    particles = [];
    for (let i = 0; i < 60; i++) {
        particles.push(new Particle());
    }
}

// Connect lines between close particles
function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let dist = dx * dx + dy * dy;

            if (dist < 9000) {
                ctx.strokeStyle = "rgba(0, 255, 255, 0.04)";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    connectParticles();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

init();
animate();