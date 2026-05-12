document.addEventListener("DOMContentLoaded", () => {

  const scene = document.querySelector(".envelope-scene");

  const photo = document.querySelector(".photo-card");
  const letter = document.querySelector(".letter");

  if(!scene || !photo || !letter) return;

  let mouseX = 0;
  let mouseY = 0;

  let currentX = 0;
  let currentY = 0;

  /* ─────────────────────────────
     MOUSE PARALLAX
  ───────────────────────────── */

  scene.addEventListener("mousemove", (e) => {

    const rect = scene.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX = (x - rect.width / 2) / 25;
    mouseY = (y - rect.height / 2) / 25;

  });

  scene.addEventListener("mouseleave", () => {

    mouseX = 0;
    mouseY = 0;

  });

  /* ─────────────────────────────
     LETTER POP + SHINE
  ───────────────────────────── */

  let isPopped = false;
  let isAnimating = false;

  letter.addEventListener("click", () => {

    if(isAnimating) return;

    isAnimating = true;

    /* REMOVE OLD CLASS FIRST */
    letter.classList.remove("pop-out");

    /* FORCE REFLOW */
    void letter.offsetWidth;

    /* POP UP */
    isPopped = true;

    /* ADD GLOW AFTER POP */
    setTimeout(() => {

      letter.classList.add("pop-out");

    }, 180);

    /* RETURN BACK */
    setTimeout(() => {

      isPopped = false;

    }, 1200);

    /* REMOVE SHINE */
    setTimeout(() => {

      letter.classList.remove("pop-out");

      isAnimating = false;

    }, 1800);

  });

  /* ─────────────────────────────
     ANIMATION LOOP
  ───────────────────────────── */

  function animate(){

    /* SMOOTH CURSOR FOLLOW */

    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;

    /* PHOTO */

    photo.style.transform = `
      translate3d(
        ${currentX}px,
        ${currentY}px,
        0
      )
      rotate(8deg)
    `;

    /* LETTER */

    const popY = isPopped ? -130 : 0;

    const popScale = isPopped ? 1.03 : 1;

    const popRotate = isPopped ? -2deg : -4deg;

    letter.style.transform = `
      translate3d(
        ${currentX * 0.6}px,
        ${currentY * 0.6 + popY}px,
        0
      )
      rotate(${isPopped ? -2 : -4}deg)
      scale(${popScale})
    `;

    requestAnimationFrame(animate);

  }

  animate();

  /* =========================================================
     OPTIONAL REEL
  ========================================================= */

  const reelTrack = document.querySelector(".reel-track");

  if(reelTrack){

    window.addEventListener("scroll", () => {

      const scrollY = window.scrollY;

      reelTrack.style.transform = `
        translateX(-${scrollY * 0.45}px)
      `;

    });

  }

});
