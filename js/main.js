document.addEventListener('DOMContentLoaded', () => {
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-follower');

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let ringX = 0;
    let ringY = 0;

    // Start coordinates at center of screen
    mouseX = window.innerWidth / 2;
    mouseY = window.innerHeight / 2;

    // 1. Capture Global Mouse Move
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // 2. Animation Loop
    function render() {
        // Dot: fast movement (0.2)
        dotX += (mouseX - dotX) * 0.2;
        dotY += (mouseY - dotY) * 0.2;

        // Ring: smooth lag (0.1)
        ringX += (mouseX - ringX) * 0.1;
        ringY += (mouseY - ringY) * 0.1;

        // Update CSS transform (centering the elements with -50%)
        if (dot) {
            dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
        }
        if (ring) {
            ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        }

        requestAnimationFrame(render);
    }
    render();

    // 3. Hover Interactions
    const interactiveElements = document.querySelectorAll('a, .nav-button, .hero-illustration');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hover-active'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hover-active'));
    });
});
