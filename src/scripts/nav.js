export function setupNav() {
  const navButton = document.querySelector('.burger');
  const navMenu = document.querySelector('.nav-links');

  if (!navButton || !navMenu) return;

  const closeNav = () => {
    navMenu.classList.remove('open');
    navButton.setAttribute('aria-expanded', 'false');
  };

  const toggleNav = () => {
    const isOpen = navMenu.classList.contains('open');

    navMenu.classList.toggle('open', !isOpen);
    navButton.setAttribute('aria-expanded', String(!isOpen));
  };

  navButton.addEventListener('click', toggleNav);

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  return () => {
    navButton.removeEventListener('click', toggleNav);
    navMenu.querySelectorAll('a').forEach((link) => {
      link.removeEventListener('click', closeNav);
    });
  };
}
