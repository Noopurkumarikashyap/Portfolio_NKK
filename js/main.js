document.addEventListener("DOMContentLoaded", function () {

  const dot = document.querySelector(".cursor-dot");
  const follower = document.querySelector(".cursor-follower");

  if (!dot || !follower) {
    console.log("Cursor elements not found");
    return;
  }

  document.body.classList.add("cursor-ready");

  let mouseX = 0;
  let mouseY = 0;

  let dotX = 0;
  let dotY = 0;

  let followerX = 0;
  let followerY = 0;

  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.opacity = "1";
    follower.style.opacity = "1";
  });

function animate() {

  // Dot instant
  dotX = mouseX;
  dotY = mouseY;

  // Faster follower (less drag)
  followerX += (mouseX - followerX) * 0.18;
  followerY += (mouseY - followerY) * 0.18;

  dot.style.transform = `translate(${dotX}px, ${dotY}px)`;
  follower.style.transform = `translate(${followerX}px, ${followerY}px)`;

  requestAnimationFrame(animate);
}

  animate();

  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      follower.classList.add("hover-active");
    });

    el.addEventListener("mouseleave", () => {
      follower.classList.remove("hover-active");
    });
  });

});

// Ripple effect on click (5 ripples)
document.addEventListener("click", function (e) {

  for (let i = 0; i < 5; i++) {

    const ripple = document.createElement("div");
    ripple.classList.add("cursor-ripple");

    ripple.style.left = e.clientX + "px";
    ripple.style.top = e.clientY + "px";

    // Delay each ripple slightly
    ripple.style.animationDelay = `${i * 0.08}s`;

    document.body.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 1000);
  }

});
window.addEventListener("scroll", () => {

  const bird = document.querySelector(".flying-bird");
  if (!bird) return;

  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;

  const scrollPercent = scrollTop / docHeight;

  // Curved path
  const x = scrollPercent * window.innerWidth * 0.7;
  const y = Math.sin(scrollPercent * Math.PI) * -200;

  // Slight rotation
  const rotate = scrollPercent * 20;

  bird.style.transform = `
    translate(${x}px, ${y}px)
    rotate(${rotate}deg)
  `;

});
