document.addEventListener('DOMContentLoaded', () => {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorFollower = document.querySelector('.cursor-follower');
    const rotatingText = document.getElementById('rotatingText');

    // Initialize positions off-screen to avoid a jump on load
    let mouseX = -100, mouseY = -100;
    let dotX = -100, dotY = -100;
    let followerX = -100, followerY = -100;

    // 1. Mouse Tracker - Listen on the window level
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // 2. Animation Loop for Cursor
    function render() {
        // Dot follows instantly, follower has a 0.15 delay for "lag" effect
        dotX += (mouseX - dotX);
        dotY += (mouseY - dotY);
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;

        if (cursorDot) {
            cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
        }
        if (cursorFollower) {
            cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
        }

        requestAnimationFrame(render);
    }
    render();

    // 3. Scroll Rotation Logic
    window.addEventListener('scroll', () => {
        // Calculate rotation: 1 degree for every 5 pixels scrolled
        const scrolled = window.pageYOffset || document.documentElement.scrollTop;
        const rotation = scrolled * 0.2; 
        
        if (rotatingText) {
            rotatingText.style.transform = `rotate(${rotation}deg)`;
        }
    });

    // 4. Hover Effects
    const interactives = document.querySelectorAll('a, .nav-button');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => cursorFollower.classList.add('hover-active'));
        el.addEventListener('mouseleave', () => cursorFollower.classList.remove('hover-active'));
    });

    // 5. Hide system cursor
    const hideCursor = () => {
        document.documentElement.style.cursor = 'none';
        document.body.style.cursor = 'none';
    };
    hideCursor();
    window.addEventListener('focus', hideCursor);
});
