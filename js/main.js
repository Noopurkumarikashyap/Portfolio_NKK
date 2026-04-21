document.addEventListener('DOMContentLoaded', () => {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorFollower = document.querySelector('.cursor-follower');
    const rotatingText = document.getElementById('rotatingText');

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let followerX = 0, followerY = 0;

    // 1. Cursor Movement Logic
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function render() {
        dotX += (mouseX - dotX) * 1;
        dotY += (mouseY - dotY) * 1;
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;

        if (cursorDot) cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
        if (cursorFollower) cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;

        requestAnimationFrame(render);
    }
    render();

    // 2. Fixed Scroll Rotation Logic
    // We use a passive listener for better performance
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const rotation = scrollTop * 0.2; // Adjust speed here
        
        if (rotatingText) {
            rotatingText.style.transform = `rotate(${rotation}deg)`;
        }
    }, { passive: true });

    // 3. Hover States
    document.querySelectorAll('a, .nav-button').forEach(el => {
        el.addEventListener('mouseenter', () => cursorFollower.classList.add('hover-active'));
        el.addEventListener('mouseleave', () => cursorFollower.classList.remove('hover-active'));
    });

    // 4. Force Hide System Arrow
    const hideCursor = () => {
        document.documentElement.style.cursor = 'none';
        document.body.style.cursor = 'none';
    };
    window.addEventListener('focus', hideCursor);
    hideCursor();
});
