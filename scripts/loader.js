/* ============================================================
   LOADER.JS — Fetches HTML section partials and injects them
   Requires a server (GitHub Pages, Vercel, or `npx serve landing/`)
   ============================================================ */

(async function () {
  'use strict';

  const SECTIONS = ['nav', 'hero', 'guide', 'classes', 'screenshots', 'download', 'footer'];

  /* Load all sections in parallel, inject in document order */
  await Promise.all(SECTIONS.map(async (name) => {
    const placeholder = document.querySelector(`[data-section="${name}"]`);
    if (!placeholder) return;
    try {
      const res = await fetch(`sections/${name}.html`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      placeholder.innerHTML = await res.text();
    } catch (err) {
      console.error(`[loader] Failed to load section "${name}":`, err.message);
      placeholder.innerHTML = `<div style="padding:40px;text-align:center;color:#a89b8c;font-family:monospace">
        [section: ${name}] — open with a server to preview<br>
        <small>npx serve . &nbsp;|&nbsp; python3 -m http.server 8000</small>
      </div>`;
    }
  }));

  /* After all sections are injected, init main app logic */
  window.dispatchEvent(new CustomEvent('content-loaded'));
  initApp();
})();

function initApp() {
  /* ── Scroll reveal ───────────────────────────────────────── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  /* ── Stat bar animation ──────────────────────────────────── */
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          statObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll('.class-card').forEach((card) => statObserver.observe(card));

  /* ── Nav scroll behaviour ────────────────────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.background = window.scrollY > 60
        ? 'rgba(10,12,16,0.97)'
        : 'rgba(14,16,20,0.85)';
    }, { passive: true });
  }

  /* ── Mobile nav toggle ───────────────────────────────────── */
  const menuBtn = document.querySelector('.nav-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const open = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!open));
      navLinks.classList.toggle('nav-links--open', !open);
    });
  }

  /* ── Smooth anchor links ─────────────────────────────────── */
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      /* Close mobile nav if open */
      navLinks?.classList.remove('nav-links--open');
      menuBtn?.setAttribute('aria-expanded', 'false');
    }
  });
}

