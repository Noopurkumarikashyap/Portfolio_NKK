document.addEventListener("DOMContentLoaded", () => {

  /* ═══════════════════════════════════════════════════════
     ENVELOPE SCENE — MOUSE PARALLAX  ← Code_set_2
  ════════════════════════════════════════════════════════ */
  const scene  = document.querySelector(".envelope-scene");
  const photo  = document.querySelector(".photo-card");
  const letter = document.querySelector(".letter");

  if (scene && photo && letter) {

    let mouseX = 0;
    let mouseY = 0;

    scene.addEventListener("mousemove", (e) => {
      const rect = scene.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX = (x - rect.width  / 2) / 28;
      mouseY = (y - rect.height / 2) / 28;
      updateTransforms();
    });

    scene.addEventListener("mouseleave", () => {
      mouseX = 0;
      mouseY = 0;
      updateTransforms();
    });

    /* ─── LETTER CLICK POP  ← Code_set_2 ─── */
    let isPopped    = false;
    let isAnimating = false;

    letter.addEventListener("click", () => {
      if (isAnimating) return;
      isAnimating = true;
      isPopped    = true;

      letter.classList.add("pop-out");
      updateTransforms();

      setTimeout(() => {
        letter.classList.remove("pop-out");
        isPopped = false;
        updateTransforms();
        isAnimating = false;
      }, 2600);
    });

    /* ─── UPDATE TRANSFORMS ─── */
    function updateTransforms() {
      // Photo card
      photo.style.transform = `
        rotate(8deg)
        translate(${mouseX}px, ${mouseY}px)
      `;

      // Letter
      const popY      = isPopped ? -130 : 0;
      const popScale  = isPopped ? 1.02 : 1;
      const popRotate = isPopped ? -2   : -4;

      letter.style.transform = `
        rotate(${popRotate}deg)
        translate(
          ${mouseX * 0.6}px,
          ${mouseY * 0.6 + popY}px
        )
        scale(${popScale})
      `;
    }

  }

  /* ═══════════════════════════════════════════════════════
     PEG BOARD — SUBTLE HOVER LIFT  ← Code_set_1
  ════════════════════════════════════════════════════════ */
  document.querySelectorAll(".peg-photo, .peg-note").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      el.style.transition  = "transform 0.3s ease, box-shadow 0.3s ease";
      el.style.zIndex      = "10";
      el.style.boxShadow   = "0 24px 50px rgba(0,0,0,0.18)";
    });
    el.addEventListener("mouseleave", () => {
      el.style.zIndex    = "";
      el.style.boxShadow = "";
    });
  });

});
