/* ============================================================
   MAIN.JS — Scroll reveal + nav + screenshot tabs + carousel
   ============================================================ */

(function () {
  'use strict';

  /* ── Scroll reveal ─────────────────────────────────────────── */
  function initReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  initReveal();
  window.addEventListener('content-synced', initReveal);


  /* ── Nav scroll behaviour ──────────────────────────────────── */
  const nav = document.querySelector('.nav');

  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        nav.style.background = 'rgba(10, 12, 16, 0.95)';
      } else {
        nav.style.background = 'rgba(14, 16, 20, 0.85)';
      }
    }, { passive: true });
  }

  /* ── Hamburger menu ────────────────────────────────────────── */
  const menuBtn   = document.querySelector('.nav-menu-btn');
  const navLinks  = document.querySelector('.nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('nav-links--open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    // Close drawer when a link is tapped
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('nav-links--open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside tap
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target)) {
        navLinks.classList.remove('nav-links--open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Smooth anchor links ───────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id     = anchor.getAttribute('href');
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Screenshot tabs ───────────────────────────────────────── */
  const tabs   = document.querySelectorAll('.ss-tab');
  const panels = document.querySelectorAll('.ss-panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetId = 'tab-' + tab.dataset.tab;

      tabs.forEach((t)   => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      panels.forEach((p) => p.classList.remove('active'));

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const panel = document.getElementById(targetId);
      if (panel) panel.classList.add('active');
    });
  });

  /* ── Carousel arrow injection ──────────────────────────────── */
  document.querySelectorAll('.ss-carousel').forEach((carousel) => {
    const track = carousel.querySelector('.ss-track');
    if (!track) return;

    const prev = document.createElement('button');
    prev.className = 'ss-arrow ss-arrow--prev';
    prev.setAttribute('aria-label', 'Scroll left');
    prev.textContent = '‹';

    const next = document.createElement('button');
    next.className = 'ss-arrow ss-arrow--next';
    next.setAttribute('aria-label', 'Scroll right');
    next.textContent = '›';

    carousel.appendChild(prev);
    carousel.appendChild(next);

    const SCROLL_AMT = 240;

    prev.addEventListener('click', () => track.scrollBy({ left: -SCROLL_AMT, behavior: 'smooth' }));
    next.addEventListener('click', () => track.scrollBy({ left:  SCROLL_AMT, behavior: 'smooth' }));

    const update = () => {
      prev.style.opacity = track.scrollLeft > 8 ? '1' : '0.3';
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
      next.style.opacity = atEnd ? '0.3' : '1';
    };

    track.addEventListener('scroll', update, { passive: true });
    update();
  });

})();
