/* Night Hog — main.js */

// ---- Year in footer ----
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---- Sticky Nav ----
const header = document.querySelector('.site-header');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---- Mobile Nav Toggle ----
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    const spans = toggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      const spans = toggle.querySelectorAll('span');
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  document.addEventListener('click', (e) => {
    if (!header.contains(e.target) && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      const spans = toggle.querySelectorAll('span');
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
}

// ---- Scroll-in animations ----
const revealEls = document.querySelectorAll(
  '.member-card, .video-card, .setlist-column, .photo-item, .booking-form-wrap, .about-text'
);
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(22px)';
  el.style.transition = `opacity 0.6s ease ${(i % 4) * 0.08}s, transform 0.6s ease ${(i % 4) * 0.08}s`;
  revealObserver.observe(el);
});
document.head.insertAdjacentHTML('beforeend', `
  <style>.revealed { opacity: 1 !important; transform: translateY(0) !important; }</style>
`);

// ---- Booking Form validation ----
const form = document.querySelector('.booking-form');
if (form) {
  form.addEventListener('submit', (e) => {
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const eventType = form.querySelector('#event-type').value;
    if (!name || !email || !eventType) {
      e.preventDefault();
      alert('Please fill in your name, email, and event type.');
      return;
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      e.preventDefault();
      alert('Please enter a valid email address.');
    }
  });
}

// ---- Photo error fallbacks ----
document.querySelectorAll('.photo-item img').forEach(img => {
  img.addEventListener('error', () => {
    img.style.display = 'none';
    img.parentElement.style.background = '#1a1710';
    img.parentElement.style.position = 'relative';
    img.parentElement.insertAdjacentHTML('beforeend',
      '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#9a5e1e;font-size:2rem;">📷</div>'
    );
  });
});
