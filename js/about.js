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
     LETTER POP
  ───────────────────────────── */

  let isPopped = false;
  let isAnimating = false;

  letter.addEventListener("click", () => {

    if(isAnimating) return;

    isAnimating = true;

    isPopped = true;

    setTimeout(() => {

      isPopped = false;
      isAnimating = false;

    }, 2200);

  });

  /* ─────────────────────────────
     ANIMATION LOOP
  ───────────────────────────── */

  function animate(){

    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;

    const time = Date.now() * 0.001;

    const letterFloat = Math.sin(time * 1.2) * 8;
    const photoFloat = Math.sin(time * 1.1) * 10;

    /* PHOTO */

    photo.style.transform = `
      translate(${currentX}px, ${currentY + photoFloat}px)
      rotate(8deg)
    `;

    /* LETTER */

    const popY = isPopped ? -130 : 0;
    const popScale = isPopped ? 1.03 : 1;

    letter.style.transform = `
      translate(
        ${currentX * 0.6}px,
        ${currentY * 0.6 + letterFloat + popY}px
      )
      rotate(-4deg)
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
