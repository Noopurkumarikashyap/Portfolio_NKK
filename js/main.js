document.addEventListener('DOMContentLoaded', () => {
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');

    // Use window listener to ensure tracking isn't blocked by other elements
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Update the tiny dot immediately
        dot.style.setProperty('--x', posX);
        dot.style.setProperty('--y', posY);

        // Update the outline with a slight delay (handled by CSS transition)
        outline.style.setProperty('--x', posX);
        outline.style.setProperty('--y', posY);
    });

    // Hover interactions
    const links = document.querySelectorAll('a, .nav-button');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => outline.classList.add('active'));
        link.addEventListener('mouseleave', () => outline.classList.remove('active'));
    });
});
