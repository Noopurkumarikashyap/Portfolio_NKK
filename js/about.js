document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     ELEMENTS
  ========================================================= */

  const hero = document.querySelector(".about-hero");

  const photo = document.querySelector(".photo-card");

  const letter = document.querySelector(".letter");

  if(!hero || !photo || !letter) return;

  /* =========================================================
     PARALLAX
  ========================================================= */

  let mouseX = 0;
  let mouseY = 0;

  let currentX = 0;
  let currentY = 0;

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

  /* =========================================================
     LETTER POP
  ========================================================= */

  let isAnimating = false;

  let isPopped = false;

  let popProgress = 0;

  letter.addEventListener("click", () => {

    if(isAnimating) return;

    isAnimating = true;

    /*
      RESET GLARE
    */

    letter.classList.remove("shine");

    void letter.offsetWidth;

    /*
      POP OUT
    */

    isPopped = true;

    /*
      START GLARE
    */

    setTimeout(() => {

      letter.classList.add("shine");

    }, 300);

    /*
      HOLD OPEN
    */

    setTimeout(() => {

      isPopped = false;

    }, 2600);

    /*
      CLEANUP
    */

    setTimeout(() => {

      letter.classList.remove("shine");

      isAnimating = false;

    }, 3600);

  });

  /* =========================================================
     ANIMATION LOOP
  ========================================================= */

  function animate(){

    /*
      SMOOTH PARALLAX
    */

    currentX += (mouseX - currentX) * 0.08;

    currentY += (mouseY - currentY) * 0.08;

    /*
      LETTER POP MOTION
    */

    const targetPop = isPopped ? -180 : 0;

    popProgress += (targetPop - popProgress) * 0.07;

    /*
      PHOTO
    */

    photo.style.transform = `
      translate3d(
        ${currentX * 1.2}px,
        ${currentY * 1.2}px,
        0
      )
      rotate(8deg)
    `;

    /*
      LETTER
    */

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

    /*
      REALISTIC DEPTH
    */

    if(popProgress < -100){

      letter.style.zIndex = "25";

    }else{

      letter.style.zIndex = "2";

    }

    requestAnimationFrame(animate);

  }

  animate();

});
