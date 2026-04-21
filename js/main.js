document.addEventListener('DOMContentLoaded', () => {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorFollower = document.querySelector('.cursor-follower');
    const rotatingText = document.getElementById('rotatingText');

    // 1. Cursor Movement Logic
    // Set starting position to center screen to avoid a top-left jump on load
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX, dotY = mouseY;
    let followerX = mouseX, followerY = mouseY;

    // Listen to the window, not just the document, to bypass fixed layers
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        dotX += (mouseX - dotX) * 0.5; // Fast dot tracking
        dotY += (mouseY - dotY) * 0.5;
        followerX += (mouseX - followerX) * 0.15; // Smooth lag for the follower circle
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
    // Listen to window to catch global scroll reliably
    window.addEventListener('scroll', () => {
        // Use pageYOffset for maximum browser compatibility
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        const rotationAngle = scrollPosition * 0.2; // Adjust 0.2 to make it spin faster or slower
        
        if (rotatingText) {
            rotatingText.style.transform = `rotate(${rotationAngle}deg)`;
        }
    }, { passive: true }); // passive flag optimizes scrolling performance

    // 4. Force Hide System Arrow
    const forceHideCursor = () => {
        document.documentElement.style.cursor = 'none';
        document.body.style.cursor = 'none';
    };
    forceHideCursor();
    
    // Re-hide cursor if the user clicks away to another tab and comes back
    window.addEventListener('focus', forceHideCursor);
});
