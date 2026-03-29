const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navAnchors = document.querySelectorAll('.nav-links a');

function closeMenu() {
  if (!menuToggle || !navLinks) {
    return;
  }

  menuToggle.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  navLinks.classList.remove('is-open');
  document.body.classList.remove('menu-open');
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const willOpen = !navLinks.classList.contains('is-open');

    menuToggle.classList.toggle('is-open', willOpen);
    menuToggle.setAttribute('aria-expanded', String(willOpen));
    navLinks.classList.toggle('is-open', willOpen);
    document.body.classList.toggle('menu-open', willOpen);
  });

  navAnchors.forEach((anchor) => {
    anchor.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (event) => {
    if (!navLinks.classList.contains('is-open')) {
      return;
    }

    const clickedInsideMenu = navLinks.contains(event.target) || menuToggle.contains(event.target);

    if (!clickedInsideMenu) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 820) {
      closeMenu();
    }
  });
}

// Smooth scroll with fixed header offset.
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const targetSelector = anchor.getAttribute('href');

    if (!targetSelector || targetSelector === '#') {
      return;
    }

    const target = document.querySelector(targetSelector);

    if (!target) {
      return;
    }

    event.preventDefault();

    const offset = header ? header.offsetHeight + 8 : 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: 'smooth'
    });
  });
});

// Reveal animation.
const revealElements = Array.from(document.querySelectorAll('.reveal'));

if (revealElements.length > 0) {
  if ('IntersectionObserver' in window) {
    let revealDelay = 0;

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.style.transitionDelay = `${revealDelay}ms`;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);

          revealDelay = (revealDelay + 55) % 220;
        });
      },
      {
        threshold: 0.16
      }
    );

    revealElements.forEach((item) => revealObserver.observe(item));
  } else {
    revealElements.forEach((item) => item.classList.add('is-visible'));
  }
}

// Hero image rotation.
const slides = Array.from(document.querySelectorAll('.hero-slide'));

if (slides.length > 1) {
  let currentSlide = 0;

  setInterval(() => {
    slides[currentSlide].classList.remove('is-active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('is-active');
  }, 6000);
}

const yearNode = document.getElementById('year');
if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}
