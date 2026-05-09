const photoWrapper = document.querySelector(".photo-wrapper");

document.addEventListener("mousemove", (e) => {

  const x = (window.innerWidth / 2 - e.clientX) / 45;
  const y = (window.innerHeight / 2 - e.clientY) / 45;

  photoWrapper.style.transform =
    `rotate(-4deg) translate(${x}px, ${y}px)`;

});


/* REVEAL ANIMATION */

const revealItems = document.querySelectorAll(
  ".timeline-card, .edu-card, .skill-pill"
);

const observer = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if(entry.isIntersecting){

      entry.target.classList.add("show-item");

    }

  });

},{
  threshold:0.2
});

revealItems.forEach(item => {

  item.classList.add("hidden-item");

  observer.observe(item);

});
