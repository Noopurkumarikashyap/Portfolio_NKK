document.addEventListener('DOMContentLoaded', () => {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorFollower = document.querySelector('.cursor-follower');
    const rotatingText = document.getElementById('rotatingText');

    // State for mouse and cursor positions
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let dotPos = { x: mouse.x, y: mouse.y };
    let followerPos = { x: mouse.x, y: mouse.y };

    // 1. Mouse Tracking - Global window level
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }, { passive: true });

    // 2. Smooth Animation Loop
    function animate() {
        // Linear Interpolation (Lerp) for smooth lag
        dotPos.x += (mouse.x - dotPos.x) * 0.4;
        dotPos.y += (mouse.y - dotPos.y) * 0.4;
        
        followerPos.x += (mouse.x - followerPos.x) * 0.12;
        followerPos.y += (mouse.y - followerPos.y) * 0.12;

        if (cursorDot) {
            cursorDot.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0)`;
        }
        if (cursorFollower) {
            cursorFollower.style.transform = `translate3d(${followerPos.x}px, ${followerPos.y}px, 0)`;
        }

        requestAnimationFrame(animate);
    }
    animate();

    // 3. Scroll Rotation
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset || document.documentElement.scrollTop;
        if (rotatingText) {
            // Adjust 0.2 to change the spin speed
            rotatingText.style.transform = `rotate(${scrolled * 0.2}deg)`;
        }
    }, { passive: true });

    // 4. Interaction Hover States
    const interactives = document.querySelectorAll('a, button, .nav-button');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursorFollower) cursorFollower.classList.add('hover-active');
        });
        el.addEventListener('mouseleave', () => {
            if (cursorFollower) cursorFollower.classList.remove('hover-active');
        });
    });

    // 5. Hide System Cursor (Safety)
    const hideSystemCursor = () => {
        document.documentElement.style.cursor = 'none';
        document.body.style.cursor = 'none';
    };
    hideSystemCursor();
    window.addEventListener('focus', hideSystemCursor);
});
