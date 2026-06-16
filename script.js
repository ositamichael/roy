const menuButton = document.getElementById('menuButton');
const menu = document.getElementById('menu');
const year = document.getElementById('year');

year.textContent = new Date().getFullYear();

menuButton.addEventListener('click', () => {
  menu.classList.toggle('show');
  menuButton.classList.toggle('active');
  const isOpen = menu.classList.contains('show');
  menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

document.querySelectorAll('.menu a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('show');
    menuButton.classList.remove('active');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});
