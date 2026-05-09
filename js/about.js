const scene = document.querySelector(".envelope-scene");

const photo = document.querySelector(".photo-card");
const letter = document.querySelector(".letter");

scene.addEventListener("mousemove", (e) => {

  const rect = scene.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const moveX = (x - rect.width / 2) / 28;
  const moveY = (y - rect.height / 2) / 28;

  photo.style.transform = `
    rotate(8deg)
    translate(${moveX}px, ${moveY}px)
  `;

  letter.style.transform = `
    rotate(-4deg)
    translate(${moveX * 0.6}px, ${moveY * 0.6}px)
  `;

});

scene.addEventListener("mouseleave", () => {

  photo.style.transform = `
    rotate(8deg)
    translate(0px,0px)
  `;

  letter.style.transform = `
    rotate(-4deg)
    translate(0px,0px)
  `;

});
