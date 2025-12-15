// Navigation handler: accessible, idempotent, static asset
console.debug('[nav.js] executing');

if (!window.__jj_nav_delegated) {
  window.__jj_nav_delegated = true;

  const BURGER_SELECTOR = '.burger';
  const NAV_ID = 'site-navigation';

  function getBurger() {
    return document.querySelector(BURGER_SELECTOR);
  }

  function getNav() {
    return document.getElementById(NAV_ID) || document.querySelector('.nav-links');
  }

  function openNav() {
    const nav = getNav();
    const burger = getBurger();
    if (!nav) return;
    nav.classList.add('open');
    if (burger) burger.setAttribute('aria-expanded', 'true');
    const first = nav.querySelector('a');
    if (first && typeof first.focus === 'function') first.focus();
  }

  function closeNav() {
    const nav = getNav();
    const burger = getBurger();
    if (!nav) return;
    nav.classList.remove('open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
    if (burger && typeof burger.focus === 'function') burger.focus();
  }

  function toggleNav() {
    const nav = getNav();
    if (!nav) return;
    const willOpen = !nav.classList.contains('open');
    if (willOpen) openNav(); else closeNav();
  }

  function handleClick(e) {
    const target = e.target && (e.target.nodeType === 1 ? e.target : e.target.parentElement);
    if (!target) return;

    if (target.closest && target.closest(BURGER_SELECTOR)) {
      toggleNav();
      return;
    }

    if (target.closest && target.closest('.nav-links a')) {
      closeNav();
      return;
    }
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') {
      closeNav();
      return;
    }

    const burger = getBurger();
    if (!burger) return;

    // Enter or Space toggles when focused on the burger
    if ((e.key === 'Enter' || e.key === ' ') && document.activeElement === burger) {
      e.preventDefault();
      toggleNav();
    }
  }

  document.addEventListener('click', handleClick, { passive: true });
  document.addEventListener('keydown', handleKeydown);
  document.body.classList.add('is-loaded');
}
