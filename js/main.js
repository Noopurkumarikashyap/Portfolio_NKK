document.addEventListener('DOMContentLoaded', () => {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorFollower = document.querySelector('.cursor-follower');
    const rotatingText = document.getElementById('rotatingText');

    // 1. Cursor Movement Logic
    // Set starting position to center screen instead of top-left
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX, dotY = mouseY;
    let followerX = mouseX, followerY = mouseY;

    // Listen to the document, not just the window
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        dotX += (mouseX - dotX) * 0.5; // Faster dot
        dotY += (mouseY - dotY) * 0.5;
        followerX += (mouseX - followerX) * 0.15; // Slower circle
        followerY += (mouseY - followerY) * 0.15;

        if (cursorDot) cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
        if (cursorFollower) cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // 2. Hover Effects for Links
    document.querySelectorAll('a, .nav-button').forEach(el => {
        el.addEventListener('mouseenter', () => cursorFollower.classList.add('hover-active'));
        el.addEventListener('mouseleave', () => cursorFollower.classList.remove('hover-active'));
    });

    // 3. Scroll Rotation Logic
    document.addEventListener('scroll', () => {
        // Multiplier controls speed (0.2 is moderate, 0.5 is fast)
        const rotationAngle = window.scrollY * 0.2; 
        if (rotatingText) {
            rotatingText.style.transform = `rotate(${rotationAngle}deg)`;
        }
    });

    // 4. Force Hide System Arrow
    const forceHideCursor = () => {
        document.documentElement.style.cursor = 'none';
        document.body.style.cursor = 'none';
    };
    forceHideCursor();
    window.addEventListener('focus', forceHideCursor);
});
