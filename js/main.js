document.addEventListener('DOMContentLoaded', () => {
  const dot = document.querySelector('.dot');
  const outline = document.querySelector('.outline');
  
  let mouseX = 0;
  let mouseY = 0;
  
  // Update mouse coordinates on every move
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Immediate update for the tiny dot (zero lag)
    dot.style.setProperty('--x', mouseX);
    dot.style.setProperty('--y', mouseY);
  });

  // Smooth update for the outline (the "lag" effect)
  const animateOutline = () => {
    // This allows the outline to slightly trail the dot
    outline.style.setProperty('--x', mouseX);
    outline.style.setProperty('--y', mouseY);
    
    requestAnimationFrame(animateOutline);
  };
  animateOutline();

  // Handle Hover States
  const interactiveElements = document.querySelectorAll('a, button, .nav-button');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => outline.classList.add('active'));
    el.addEventListener('mouseleave', () => outline.classList.remove('active'));
  });
});
