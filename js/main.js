document.addEventListener("DOMContentLoaded", function () {

  /* ─────────────────────────────
     CURSOR SYSTEM (SAFE)
  ───────────────────────────── */

  const dot = document.querySelector(".cursor-dot");
  const follower = document.querySelector(".cursor-follower");

  if (dot && follower) {

    document.body.classList.add("cursor-ready");

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      dot.style.opacity = "1";
      follower.style.opacity = "1";
    });

    function animateCursor() {
      dotX = mouseX;
      dotY = mouseY;

      followerX += (mouseX - followerX) * 0.18;
      followerY += (mouseY - followerY) * 0.18;

      dot.style.transform = `translate(${dotX}px, ${dotY}px)`;
      follower.style.transform = `translate(${followerX}px, ${followerY}px)`;

      requestAnimationFrame(animateCursor);
    }

    animateCursor();
  }


  /* ─────────────────────────────
     FISH SYSTEM (FIXED LOOP)
  ───────────────────────────── */

  const fishEls = document.querySelectorAll(".fish");

  function randomFishY() {
    const minY = window.innerHeight * 0.62;
    const maxY = window.innerHeight * 0.92;
    return minY + Math.random() * (maxY - minY);
  }

  const fishes = Array.from(fishEls).map((el, i) => ({
    el,
    x: Math.random() * window.innerWidth,
    y: randomFishY(),
    speed: 0.35 + Math.random() * 0.3,
    dir: i < 6 ? 1 : -1,
    hasFlipped: false
  }));

  function moveFish() {

    const time = Date.now() * 0.002;
    const nav = document.querySelector(".bottom-nav");
    const navRect = nav ? nav.getBoundingClientRect() : null;

    fishes.forEach((fish, i) => {
      if (!fish.el) return;

      fish.x += fish.speed * fish.dir;

      /* safety */
      if (isNaN(fish.x) || !isFinite(fish.x)) {
        fish.x = Math.random() * window.innerWidth;
        fish.y = randomFishY();
      }

      /* respawn */
      if (fish.x > window.innerWidth + 150) {
        fish.x = -120;
        fish.y = randomFishY();
        fish.hasFlipped = false;
      }

      if (fish.x < -150) {
        fish.x = window.innerWidth + 120;
        fish.y = randomFishY();
        fish.hasFlipped = false;
      }

      /* nav flip */
      if (navRect) {
        const rect = fish.el.getBoundingClientRect();

        const isNearNav =
          rect.bottom >= navRect.top &&
          rect.top <= navRect.bottom &&
          rect.right >= navRect.left &&
          rect.left <= navRect.right;

        if (isNearNav && !fish.hasFlipped) {
          fish.dir *= -1;
          fish.hasFlipped = true;
        }
      }

      /* movement */
      const wave = Math.sin(time * 1.2 + i * 1.7) * 4;
      const wobble = Math.sin(time * 3 + i * 2.3) * 1.5;

      fish.el.style.transform =
        `translate(${fish.x}px, ${fish.y + wave + wobble}px)
         scaleX(${fish.dir})`;
    });

    requestAnimationFrame(moveFish);
  }

  moveFish();


  /* ─────────────────────────────
     BUBBLES (SAFE)
  ───────────────────────────── */

  function spawnBubble(x, y) {

    const bubble = document.createElement("div");
    bubble.className = "bubble";

    const offsetX = (Math.random() - 0.5) * 6;
    const offsetY = -10;

    bubble.style.left = (x + offsetX) + "px";
    bubble.style.top = (y + offsetY) + "px";

    const size = 6 + Math.random() * 6;
    bubble.style.width = size + "px";
    bubble.style.height = size + "px";

    document.body.appendChild(bubble);

    setTimeout(() => bubble.remove(), 1600);
  }

  setInterval(() => {
    fishes.forEach(f => {
      if (Math.random() > 0.7) spawnBubble(f.x, f.y);
    });
  }, 500);


  /* ─────────────────────────────
     BIRD SYSTEM (FIXED FULL PATH TRAVEL)
  ───────────────────────────── */

  const path = document.querySelector("#birdPath");
  const bird = document.querySelector("#bird");

  if (path && bird) {

    const pathLength = path.getTotalLength();

    let current = 0;
    let target = 0;

    window.addEventListener("scroll", () => {
      const max = document.body.scrollHeight - window.innerHeight;

      /* ✅ FIX: full 0 → 1 range (no 0.6 cap) */
      target = window.scrollY / max;
    });

    function animateBird() {

      current += (target - current) * 0.08;

      /* safety clamp */
      current = Math.max(0, Math.min(1, current));

      const point = path.getPointAtLength(current * pathLength);

      bird.setAttribute(
        "transform",
        `translate(${point.x - 20}, ${point.y - 20})`
      );

      requestAnimationFrame(animateBird);
    }

    animateBird();
  }

});
