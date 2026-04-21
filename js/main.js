document.addEventListener('DOMContentLoaded', () => {
    const marquee = document.getElementById('marquee');
    const rotatingText = document.getElementById('rotatingText');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorFollower = document.querySelector('.cursor-follower');

    // 1. SCROLL ANIMATIONS
    window.addEventListener('scroll', () => {
        const scrollVal = window.scrollY;

        // Background Marquee
        const marqueeAmount = scrollVal * 0.2; 
        if (marquee) marquee.style.transform = `translateX(-${marqueeAmount % 50}%)`;

        // Circular Text Rotation
        // Multiplying by 0.2 determines the speed of rotation
        if (rotatingText) {
            rotatingText.style.transform = `rotate(${scrollVal * 0.2}deg)`;
        }
    });

    // 2. CUSTOM CURSOR LOGIC
    if (cursorDot && cursorFollower && window.matchMedia("(pointer: fine)").matches) {
        let mouseX = -100, mouseY = -100;
        let followerX = -100, followerY = -100;

        const killSystemCursor = () => {
            document.documentElement.style.setProperty('cursor', 'none', 'important');
            document.body.style.setProperty('cursor', 'none', 'important');
        };

        // Aggressive persistent hide
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

        // Hover effects for links and buttons
        document.querySelectorAll('a, .nav-button').forEach(el => {
            el.addEventListener('mouseenter', () => cursorFollower.classList.add('hover-active'));
            el.addEventListener('mouseleave', () => cursorFollower.classList.remove('hover-active'));
        });

        window.addEventListener('focus', killSystemCursor);
        killSystemCursor();
    }
});
