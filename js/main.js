// Navbar toggle + small accessibility helpers
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  const navLinks = document.querySelectorAll('.site-nav a');

  if (!header || !toggle || !nav) return;

  function setOpen(open) {
    header.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    setOpen(!header.classList.contains('nav-open'));
  });

  // close on link click (mobile)
  navLinks.forEach(link => {
    link.addEventListener('click', () => setOpen(false));
  });

  // close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });

  // close when clicking outside nav on mobile
  document.addEventListener('click', (e) => {
    if (!header.classList.contains('nav-open')) return;
    const withinHeader = header.contains(e.target);
    if (!withinHeader) setOpen(false);
  });