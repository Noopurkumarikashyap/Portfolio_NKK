const scene = document.querySelector(".envelope-scene");

const photo = document.querySelector(".photo-card");
const letter = document.querySelector(".letter");

/* ─────────────────────────────
   MOUSE PARALLAX
───────────────────────────── */

let mouseX = 0;
let mouseY = 0;

scene.addEventListener("mousemove", (e) => {

  const rect = scene.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  mouseX = (x - rect.width / 2) / 28;
  mouseY = (y - rect.height / 2) / 28;

  updateTransforms();

});

scene.addEventListener("mouseleave", () => {

  mouseX = 0;
  mouseY = 0;

  updateTransforms();

});

/* ─────────────────────────────
   LETTER CLICK POP
───────────────────────────── */

let isPopped = false;
let isAnimating = false;

letter.addEventListener("click", () => {

  if(isAnimating) return;

  isAnimating = true;

  isPopped = true;

  letter.classList.add("pop-out");

  updateTransforms();

  setTimeout(() => {

    letter.classList.remove("pop-out");

    isPopped = false;

    updateTransforms();

    isAnimating = false;

  }, 2600);

});

/* ─────────────────────────────
   UPDATE TRANSFORMS
───────────────────────────── */

function updateTransforms(){

  /* PHOTO */

  photo.style.transform = `
    rotate(8deg)
    translate(${mouseX}px, ${mouseY}px)
  `;

  /* LETTER */

  const popY = isPopped ? -130 : 0;
  const popScale = isPopped ? 1.02 : 1;
  const popRotate = isPopped ? -2 : -4;

  letter.style.transform = `
    rotate(${popRotate}deg)
    translate(
      ${mouseX * 0.6}px,
      ${mouseY * 0.6 + popY}px
    )
    scale(${popScale})
  `;

}
