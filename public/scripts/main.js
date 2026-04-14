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

  /* ── Screenshot gallery groups + thumbnail interaction ─────── */
  // Delegated thumb click — registered once, works after content loads
  document.addEventListener('click', (e) => {
    const thumb = e.target.closest('.ss-thumb');
    if (!thumb) return;
    const panel = thumb.closest('.ss-group-panel');
    if (!panel) return;

    const featuredImg     = panel.querySelector('.ss-featured-img img');
    const featuredCaption = panel.querySelector('.ss-featured-caption');

    featuredImg.classList.add('fading');
    setTimeout(() => {
      featuredImg.src = thumb.dataset.src;
      featuredCaption.textContent = thumb.dataset.caption;
      featuredImg.classList.remove('fading');
    }, 180);

    panel.querySelectorAll('.ss-thumb').forEach((t) => t.classList.remove('active'));
    thumb.classList.add('active');
  });

  // Group tab switching — re-init after content loads (buttons are dynamic)
  function initGalleryTabs() {
    document.querySelectorAll('.ss-group-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const group = btn.dataset.group;
        document.querySelectorAll('.ss-group-btn').forEach((b) => {
          b.classList.toggle('active', b === btn);
          b.setAttribute('aria-selected', String(b === btn));
        });
        document.querySelectorAll('.ss-group-panel').forEach((p) => {
          p.classList.toggle('active', p.id === 'ss-group-' + group);
        });
      });
    });
  }

  initGalleryTabs();
  window.addEventListener('content-synced', initGalleryTabs);

  /* ── Carousel arrow injection + dots ──────────────────────── */
  document.querySelectorAll('.ss-carousel').forEach((carousel) => {
    const track = carousel.querySelector('.ss-track');
    if (!track) return;

    const prev = document.createElement('button');
    prev.className = 'ss-arrow ss-arrow--prev';
    prev.setAttribute('aria-label', 'Previous slide');
    prev.textContent = '‹';

    const next = document.createElement('button');
    next.className = 'ss-arrow ss-arrow--next';
    next.setAttribute('aria-label', 'Next slide');
    next.textContent = '›';

    carousel.appendChild(prev);
    carousel.appendChild(next);

    // Dot indicators
    const items = track.querySelectorAll('.guide-carousel-item');
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'ss-dots';
    dotsContainer.setAttribute('aria-hidden', 'true');

    const dots = Array.from(items).map((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'ss-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Slide ' + (i + 1));
      dot.addEventListener('click', () => {
        const gap = parseInt(getComputedStyle(track).gap) || 16;
        const itemW = (items[i] ? items[i].offsetWidth : 260) + gap;
        track.scrollTo({ left: i * itemW, behavior: 'smooth' });
      });
      dotsContainer.appendChild(dot);
      return dot;
    });

    carousel.appendChild(dotsContainer);

    const ITEM_W = () => {
      const gap = parseInt(getComputedStyle(track).gap) || 16;
      return (items[0] ? items[0].offsetWidth : 260) + gap;
    };

    prev.addEventListener('click', () => track.scrollBy({ left: -ITEM_W(), behavior: 'smooth' }));
    next.addEventListener('click', () => track.scrollBy({ left:  ITEM_W(), behavior: 'smooth' }));

    const update = () => {
      prev.style.opacity = track.scrollLeft > 8 ? '1' : '0.35';
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
      next.style.opacity = atEnd ? '0.35' : '1';

      if (dots.length) {
        const activeIndex = Math.round(track.scrollLeft / ITEM_W());
        dots.forEach((d, i) => d.classList.toggle('active', i === activeIndex));
      }
    };

    track.addEventListener('scroll', update, { passive: true });
    update();
  });

})();

/* ── Android waitlist handler ──────────────────────────────── */
function handleAndroidWaitlist() {
  const input = document.getElementById('android-email');
  const msg   = document.getElementById('android-waitlist-msg');
  if (!input || !msg) return;

  const email = input.value.trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!valid) {
    msg.style.color = 'var(--destructive)';
    msg.textContent = 'Enter a valid email address.';
    input.focus();
    return;
  }

  // Store locally and show confirmation
  // (Replace the fetch below with your preferred backend / Mailchimp / Resend etc.)
  const saved = JSON.parse(localStorage.getItem('android-waitlist') || '[]');
  if (!saved.includes(email)) {
    saved.push(email);
    localStorage.setItem('android-waitlist', JSON.stringify(saved));
  }

  msg.style.color = 'var(--accent)';
  msg.textContent = "You're on the list. We'll notify you when Android launches.";
  input.value = '';
  input.disabled = true;
  document.querySelector('.android-waitlist-btn').disabled = true;
}
