document.addEventListener("DOMContentLoaded", () => {
  const hero   = document.querySelector(".about-hero");
  const photo  = document.querySelector(".photo-card");
  const letter = document.querySelector(".letter");
  if (!hero || !photo || !letter) return;

  /* Parallax state */
  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;
  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX = (x - rect.width  / 2) / 28;
    mouseY = (y - rect.height / 2) / 28;
  });
  hero.addEventListener("mouseleave", () => {
    mouseX = 0;
    mouseY = 0;
  });

  /* Letter pop state */
  let isPopped    = false;
  let popProgress = 0;
  let isAnimating = false;

  letter.addEventListener("click", () => {
    if (isAnimating) return;
    isAnimating = true;
    isPopped = true;
    letter.classList.add("pop-out");

    // After pop-out, return the letter smoothly
    setTimeout(() => {
      isPopped = false;
      letter.classList.remove("pop-out");
      // (Can adjust easing here if needed for backtracking effect)
    }, 2200);
    setTimeout(() => { isAnimating = false; }, 2600);
  });

  /* Animation loop */
  function animate() {
    // Smooth parallax for card and letter
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;

    // Pop-out movement
    const targetPop = isPopped ? -180 : 0;
    popProgress += (targetPop - popProgress) * 0.08;

    // Move photo-card slightly with parallax
    photo.style.transform = `
      translate3d(${currentX * 1.2}px, ${currentY * 1.2}px, 0)
      rotate(8deg)
    `;

    // Calculate letter transforms
    const progressRatio = Math.abs(popProgress) / 180;
    const rotateValue   = -4 + (progressRatio * 4); // from -4deg to 0deg
    const scaleValue    = 1  + (progressRatio * 0.05);
    const zMove         = progressRatio * 120;

    letter.style.transform = `
      translate3d(
        ${currentX * 0.55}px,
        ${currentY * 0.55 + popProgress}px,
        ${zMove}px
      ) rotate(${rotateValue}deg) scale(${scaleValue})
    `;
    requestAnimationFrame(animate);
  }
  animate();
});
