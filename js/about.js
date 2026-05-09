// ─────────────────────────────
// TAB SWITCHING
// ─────────────────────────────

const tabs = document.querySelectorAll(".tab");

tabs.forEach(tab => {

  tab.addEventListener("click", () => {

    // remove active from all
    tabs.forEach(item => {
      item.classList.remove("active");
    });

    // add active to clicked
    tab.classList.add("active");

  });

});


// ─────────────────────────────
// PARALLAX FLOAT EFFECT
// ─────────────────────────────

const imageCard = document.querySelector(".image-card");

document.addEventListener("mousemove", (e) => {

  const x = (window.innerWidth / 2 - e.clientX) / 45;
  const y = (window.innerHeight / 2 - e.clientY) / 45;

  imageCard.style.transform =
    `rotate(-4deg) translate(${x}px, ${y}px)`;

});


// ─────────────────────────────
// SUBTLE STAR MOVEMENT
// ─────────────────────────────

const stars = document.querySelectorAll(".star");

stars.forEach((star, index) => {

  setInterval(() => {

    const randomX = Math.random() * 8 - 4;
    const randomY = Math.random() * 8 - 4;

    star.style.transform =
      `translate(${randomX}px, ${randomY}px)`;

  }, 2500 + index * 500);

});


// ─────────────────────────────
// CARD HOVER TILT
// ─────────────────────────────

const aboutCard = document.querySelector(".about-card");

aboutCard.addEventListener("mousemove", (e) => {

  const rect = aboutCard.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const rotateX = ((y / rect.height) - 0.5) * -2;
  const rotateY = ((x / rect.width) - 0.5) * 2;

  aboutCard.style.transform =
    `perspective(1400px)
     rotateX(${rotateX}deg)
     rotateY(${rotateY}deg)`;

});

aboutCard.addEventListener("mouseleave", () => {

  aboutCard.style.transform =
    `perspective(1400px)
     rotateX(0deg)
     rotateY(0deg)`;

});
