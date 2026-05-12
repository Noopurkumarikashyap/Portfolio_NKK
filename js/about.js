document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     ELEMENTS
  ========================================================= */

  const hero = document.querySelector(".about-hero");

  const scene = document.querySelector(".envelope-scene");

  const photo = document.querySelector(".photo-card");

  const letter = document.querySelector(".letter");

  if(!hero || !scene || !photo || !letter) return;

  /* =========================================================
     MOUSE PARALLAX
  ========================================================= */

  let mouseX = 0;
  let mouseY = 0;

  let currentX = 0;
  let currentY = 0;

  /*
    ENTIRE HERO AREA REACTS
  */

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
     LETTER POP STATE
  ========================================================= */

  let isPopped = false;

  let isAnimating = false;

  let popAmount = 0;

  /* =========================================================
     LETTER CLICK
  ========================================================= */

  letter.addEventListener("click", () => {

    if(isAnimating) return;

    isAnimating = true;

    /*
      RESET SHINE
    */

    letter.classList.remove("pop-out");

    void letter.offsetWidth;

    /*
      START POP
    */

    isPopped = true;

    /*
      GLOW AFTER EMERGING
    */

    setTimeout(() => {

      letter.classList.add("pop-out");

    }, 500);

    /*
      STAY OPEN
    */

    setTimeout(() => {

      isPopped = false;

    }, 3200);

    /*
      REMOVE SHINE
    */

    setTimeout(() => {

      letter.classList.remove("pop-out");

      isAnimating = false;

    }, 4200);

  });

  /* =========================================================
     ANIMATION LOOP
  ========================================================= */

  function animate(){

    /*
      SMOOTH CURSOR FOLLOW
    */

    currentX += (mouseX - currentX) * 0.08;

    currentY += (mouseY - currentY) * 0.08;

    /*
      LETTER POP HEIGHT
    */

    const targetPop = isPopped ? -260 : 0;

    popAmount += (targetPop - popAmount) * 0.10;

    /* =====================================================
       PHOTO MOVEMENT
    ===================================================== */

    photo.style.transform = `
      translate3d(
        ${currentX * 1.2}px,
        ${currentY * 1.2}px,
        0
      )
      rotate(8deg)
    `;

    /* =====================================================
       LETTER MOVEMENT
    ===================================================== */

    const letterScale = isPopped ? 1.08 : 1;

    /*
      Starts tilted
      becomes straighter when popped
    */

    const letterRotate = isPopped ? 0 : -4;

    letter.style.transform = `
      translate3d(
        ${currentX * 0.55}px,
        ${currentY * 0.55 + popAmount}px,
        0
      )
      rotate(${letterRotate}deg)
      scale(${letterScale})
    `;

    /* =====================================================
       REAL ENVELOPE EFFECT
    ===================================================== */

    /*
      While paper is inside envelope:
      stay BEHIND flap

      Once enough emerges:
      bring IN FRONT
    */

    if(popAmount < -120){

      letter.style.zIndex = "20";

    }else{

      letter.style.zIndex = "2";

    }

    requestAnimationFrame(animate);

  }

  animate();

  /* =========================================================
     OPTIONAL REEL SCROLL
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
