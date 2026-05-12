document.addEventListener("DOMContentLoaded", () => {

  const hero = document.querySelector(".about-hero");
  const photo = document.querySelector(".photo-card");
  const letter = document.querySelector(".letter");

  if (!hero || !photo || !letter) return;

  /* =========================
     PARALLAX STATE
  ========================= */

  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX = (x - rect.width / 2) / 28;
    mouseY = (y - rect.height / 2) / 28;
  });

  hero.addEventListener("mouseleave", () => {
    mouseX = 0;
    mouseY = 0;
  });

  /* =========================
     LETTER POP STATE
  ========================= */

  let isPopped = false;
  let popProgress = 0;
  let isAnimating = false;

  letter.addEventListener("click", () => {
    if (isAnimating) return;

    isAnimating = true;

    // toggle state
    isPopped = true;
    letter.classList.add("pop-out");

    // hold open then close
    setTimeout(() => {
      isPopped = false;
      letter.classList.remove("pop-out");
    }, 2200);

    // unlock interaction
    setTimeout(() => {
      isAnimating = false;
    }, 2600);
  });

  /* =========================
     ANIMATION LOOP
  ========================= */

  function animate() {

    // smooth parallax
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;

    // pop motion easing
    const targetPop = isPopped ? -180 : 0;
    popProgress += (targetPop - popProgress) * 0.08;

    // photo movement
    photo.style.transform = `
      translate3d(${currentX * 1.2}px, ${currentY * 1.2}px, 0)
      rotate(8deg)
    `;

    // letter movement (JS-driven depth + CSS pop class)
    const progressRatio = Math.abs(popProgress) / 180;

    const rotateValue = -4 + (progressRatio * 4);
    const scaleValue = 1 + (progressRatio * 0.05);
    const zMove = progressRatio * 120;

    letter.style.transform = `
      translate3d(
        ${currentX * 0.55}px,
        ${currentY * 0.55 + popProgress}px,
        ${zMove}px
      )
      rotate(${rotateValue}deg)
      scale(${scaleValue})
    `;

    requestAnimationFrame(animate);
  }

  animate();
});
