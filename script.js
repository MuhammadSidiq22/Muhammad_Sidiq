if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.scrollTo(0, 0);

document.querySelectorAll('[data-current-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const revealItems = document.querySelectorAll('.reveal');
const navigation = document.querySelector('.desktop-nav');
const menuToggle = document.querySelector('.menu-toggle');
const pageLoader = document.querySelector('.page-loader');
const scrollProgress = document.querySelector('.scroll-progress i');

const updateScrollProgress = () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  scrollProgress.style.transform = `scaleX(${progress})`;
};

window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

window.addEventListener('load', () => {
  window.setTimeout(() => pageLoader.classList.add('is-done'), 650);
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));

menuToggle.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Tutup menu' : 'Buka menu');
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Buka menu');
  });
});

const addTouchState = (selector) => {
  document.querySelectorAll(selector).forEach((item) => {
    item.addEventListener('pointerdown', () => {
      item.classList.remove('is-active');
      requestAnimationFrame(() => item.classList.add('is-active'));
      window.setTimeout(() => item.classList.remove('is-active'), 900);
    }, { passive: true });
  });
};

addTouchState('.project-card');
addTouchState('.portrait-wrap');
addTouchState('.experience-item');
