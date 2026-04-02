/* ═══════════════════════════════════════════════════════════════
   MINDMARK DIGITAL SOLUTIONS — main.js
═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll effect ──────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile hamburger ──────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close menu on link click
  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger?.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  /* ── Hamburger animation ───────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    .hamburger.active span:nth-child(1){transform:translateY(7px) rotate(45deg)}
    .hamburger.active span:nth-child(2){opacity:0;transform:scaleX(0)}
    .hamburger.active span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
  `;
  document.head.appendChild(style);

  /* ── Scroll-triggered fade-up animations ───────────────────── */
  const fadeTargets = document.querySelectorAll(
    '.service-card, .why-item, .testi-card, .process-step, ' +
    '.value-card, .team-card, .sf-item, .mission-stat, ' +
    '.contact-card, .faq-item'
  );

  fadeTargets.forEach((el, i) => {
    el.classList.add('fade-up');
    // stagger delay based on data-delay attr or index
    const delay = el.dataset.delay || (i % 4) * 80;
    el.style.transitionDelay = `${delay}ms`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

  fadeTargets.forEach(el => observer.observe(el));

  /* ── Smooth scroll for anchor links ────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Contact form submission ────────────────────────────────── */
  const forms = document.querySelectorAll('.contact-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast();
      form.reset();
    });
  });

  function showToast() {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }

  /* ── FAQ accordion ──────────────────────────────────────────── */
  window.toggleFaq = function(el) {
    const answer = el.nextElementSibling;
    const isOpen = answer.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
    document.querySelectorAll('.faq-q').forEach(q => q.classList.remove('open'));

    // Open clicked if it was closed
    if (!isOpen) {
      answer.classList.add('open');
      el.classList.add('open');
    }
  };

  /* ── Active nav link highlight ──────────────────────────────── */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  /* ── Marquee pause on hover ─────────────────────────────────── */
  const marquee = document.querySelector('.marquee-track');
  marquee?.parentElement?.addEventListener('mouseenter', () => {
    marquee.style.animationPlayState = 'paused';
  });
  marquee?.parentElement?.addEventListener('mouseleave', () => {
    marquee.style.animationPlayState = 'running';
  });

  /* ── Counter animation for stats ────────────────────────────── */
  const counters = document.querySelectorAll('.stat strong, .mission-stat span');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const num = parseFloat(text.replace(/[^0-9.]/g, ''));
        if (isNaN(num) || num === 0) return;

        const suffix = text.replace(/[0-9.]/g, '');
        const duration = 1500;
        const steps = 50;
        const increment = num / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
          step++;
          current = Math.min(current + increment, num);
          const display = Number.isInteger(num) ? Math.round(current) : current.toFixed(1);
          el.textContent = display + suffix;
          if (step >= steps) clearInterval(timer);
        }, duration / steps);

        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

});
