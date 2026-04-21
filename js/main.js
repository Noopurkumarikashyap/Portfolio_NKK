document.addEventListener('DOMContentLoaded', () => {
    const marquee = document.getElementById('marquee');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorFollower = document.querySelector('.cursor-follower');

    // 1. SCROLLING MARQUEE
    window.addEventListener('scroll', () => {
        const scrollAmount = window.scrollY * 0.2; 
        if (marquee) marquee.style.transform = `translateX(-${scrollAmount % 50}%)`;
    });

    // 2. CUSTOM CURSOR LOGIC
    if (cursorDot && cursorFollower && window.matchMedia("(pointer: fine)").matches) {
        let mouseX = -100, mouseY = -100;
        let followerX = -100, followerY = -100;

        // THE ULTIMATE HIDE: Forces the system cursor to none on the HTML element
        const killSystemCursor = () => {
            document.documentElement.style.setProperty('cursor', 'none', 'important');
            document.body.style.setProperty('cursor', 'none', 'important');
        };

        // Run the kill command every 100ms just in case the browser resets it
        setInterval(killSystemCursor, 100);

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        });

        function animateFollower() {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
            requestAnimationFrame(animateFollower);
        }
        animateFollower();

        // HOVER EFFECTS
        const interactives = document.querySelectorAll('a, .nav-button, .hero-illustration');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => cursorFollower.classList.add('hover-active'));
            el.addEventListener('mouseleave', () => cursorFollower.classList.remove('hover-active'));
        });

        // RE-HIDE ON WINDOW FOCUS
        window.addEventListener('focus', killSystemCursor);
        killSystemCursor();
    }
});
