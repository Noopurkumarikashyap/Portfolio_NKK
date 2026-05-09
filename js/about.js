const photoWrapper = document.querySelector('.photo-wrapper');

window.addEventListener('mousemove', (e) => {

  const x = (window.innerWidth / 2 - e.clientX) / 40;
  const y = (window.innerHeight / 2 - e.clientY) / 40;

  photoWrapper.style.transform =
    `rotate(-4deg) translate(${x}px, ${y}px)`;

});


const observer = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if(entry.isIntersecting){
      entry.target.classList.add('show-item');
    }

  });

},{
  threshold:0.2
});


const cards = document.querySelectorAll(
  '.timeline-card, .edu-card, .skill-pill'
);

cards.forEach(card => {

  card.style.opacity = '0';
  card.style.transform += ' translateY(40px)';
  card.style.transition = '.8s ease';

  observer.observe(card);

});


document.querySelectorAll('.show-item').forEach(item => {
  item.style.opacity = '1';
});
