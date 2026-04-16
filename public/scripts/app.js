/**
 * APP.JS — Section loader + data sync + UI behaviors
 */
(function () {
  'use strict';

  function getValueByPath(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }

  function renderTemplate(name, item, index) {
    switch (name) {
      case 'feature-card':
        return `
          <div class="feature-card reveal reveal-delay-${index % 3}" aria-labelledby="${item.id}">
            <span class="xp-badge">${item.badge}</span>
            <span class="feature-card-icon" aria-hidden="true">
              ${getIconForFeature(item.id)}
            </span>
            <h3 id="${item.id}">${item.title}</h3>
            <p>${item.description}</p>
            <ul class="feature-card-detail" aria-label="${item.title} highlights">
              ${item.details.map((d) => `<li>${d}</li>`).join('')}
            </ul>
          </div>
        `;
      case 'nav-link': {
        const isCta = item.href === '#download';
        return `<a href="${item.href}" role="listitem" class="${isCta ? 'nav-cta' : ''}">${item.label}</a>`;
      }
      case 'footer-link':
        return `<a href="${item.href}">${item.label}</a>`;
      default:
        return '';
    }
  }

  function getIconForFeature(id) {
    const icons = {
      'feat-rituals': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="36" height="36"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>',
      'feat-quests': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="36" height="36"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>',
      'feat-focus': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="36" height="36"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
      'feat-chars': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="36" height="36"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>',
      'feat-voice': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="36" height="36"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>',
      'feat-sync': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="36" height="36"><path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>'
    };
    return icons[id] || '';
  }

  function syncWithData() {
    if (typeof DATA === 'undefined') {
      console.error('[app] DATA.js not loaded.');
      return;
    }

    document.querySelectorAll('[data-text]').forEach((el) => {
      const path = el.getAttribute('data-text');
      const value = getValueByPath(DATA, path);
      if (value !== undefined) el.textContent = value;
    });

    document.querySelectorAll('[data-href]').forEach((el) => {
      const path = el.getAttribute('data-href');
      const value = getValueByPath(DATA, path);
      if (value !== undefined) el.setAttribute('href', value);
    });

    document.querySelectorAll('[data-img]').forEach((el) => {
      const path = el.getAttribute('data-img');
      const value = getValueByPath(DATA, path);
      if (value !== undefined) el.setAttribute('src', value);
    });

    document.querySelectorAll('[data-list]').forEach((container) => {
      const path = container.getAttribute('data-list');
      const templateName = container.getAttribute('data-template');
      const list = getValueByPath(DATA, path);

      if (Array.isArray(list)) {
        container.innerHTML = '';
        list.forEach((item, index) => {
          const html = renderTemplate(templateName, item, index);
          if (html) container.insertAdjacentHTML('beforeend', html);
        });
      }
    });

    window.dispatchEvent(new CustomEvent('content-synced'));
  }

  function initReveal() {
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

    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
  }

  function initStatCards() {
    const statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            statObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.class-card').forEach((card) => statObserver.observe(card));
  }

  function initNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    window.addEventListener(
      'scroll',
      () => {
        nav.style.background = window.scrollY > 60 ? 'rgba(10, 12, 16, 0.95)' : 'rgba(14, 16, 20, 0.85)';
      },
      { passive: true }
    );

    const menuBtn = document.querySelector('.nav-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
      menuBtn.addEventListener('click', () => {
        const open = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', String(!open));
        navLinks.classList.toggle('nav-links--open', !open);
      });

      navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('nav-links--open');
          menuBtn.setAttribute('aria-expanded', 'false');
        });
      });

      document.addEventListener('click', (e) => {
        if (!nav.contains(e.target)) {
          navLinks.classList.remove('nav-links--open');
          menuBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  function initSmoothAnchors() {
    document.addEventListener('click', (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      const navLinks = document.querySelector('.nav-links');
      const menuBtn = document.querySelector('.nav-menu-btn');
      navLinks && navLinks.classList.remove('nav-links--open');
      menuBtn && menuBtn.setAttribute('aria-expanded', 'false');
    });
  }

  function initScreenshotInteractions() {
    document.addEventListener('click', (e) => {
      const thumb = e.target.closest('.ss-thumb');
      if (!thumb) return;
      const panel = thumb.closest('.ss-group-panel');
      if (!panel) return;

      const featuredImg = panel.querySelector('.ss-featured-img img');
      const featuredCaption = panel.querySelector('.ss-featured-caption');
      if (!featuredImg || !featuredCaption) return;

      featuredImg.classList.add('fading');
      setTimeout(() => {
        featuredImg.src = thumb.dataset.src;
        featuredCaption.textContent = thumb.dataset.caption;
        featuredImg.classList.remove('fading');
      }, 180);

      panel.querySelectorAll('.ss-thumb').forEach((t) => t.classList.remove('active'));
      thumb.classList.add('active');
    });

    function initGalleryTabs() {
      document.querySelectorAll('.ss-group-btn').forEach((btn) => {
        if (btn.dataset.bound === 'true') return;
        btn.dataset.bound = 'true';
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
  }

  function initCarousels() {
    document.querySelectorAll('.ss-carousel').forEach((carousel) => {
      if (carousel.dataset.initialized === 'true') return;
      carousel.dataset.initialized = 'true';

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

      const items = track.querySelectorAll('.guide-carousel-item');
      const dotsContainer = document.createElement('div');
      dotsContainer.className = 'ss-dots';
      dotsContainer.setAttribute('aria-hidden', 'true');

      const dots = Array.from(items).map((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'ss-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Slide ' + (i + 1));
        dot.addEventListener('click', () => {
          const gap = parseInt(getComputedStyle(track).gap, 10) || 16;
          const itemW = (items[i] ? items[i].offsetWidth : 260) + gap;
          track.scrollTo({ left: i * itemW, behavior: 'smooth' });
        });
        dotsContainer.appendChild(dot);
        return dot;
      });

      carousel.appendChild(dotsContainer);

      const itemWidth = () => {
        const gap = parseInt(getComputedStyle(track).gap, 10) || 16;
        return (items[0] ? items[0].offsetWidth : 260) + gap;
      };

      prev.addEventListener('click', () => track.scrollBy({ left: -itemWidth(), behavior: 'smooth' }));
      next.addEventListener('click', () => track.scrollBy({ left: itemWidth(), behavior: 'smooth' }));

      const update = () => {
        prev.style.opacity = track.scrollLeft > 8 ? '1' : '0.35';
        const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
        next.style.opacity = atEnd ? '0.35' : '1';

        if (dots.length) {
          const activeIndex = Math.round(track.scrollLeft / itemWidth());
          dots.forEach((d, i) => d.classList.toggle('active', i === activeIndex));
        }
      };

      track.addEventListener('scroll', update, { passive: true });
      update();
    });
  }

  window.handleAndroidWaitlist = function handleAndroidWaitlist(e) {
    e.preventDefault();
    const input = document.getElementById('android-email');
    const msg = document.getElementById('android-waitlist-msg');
    if (!input || !msg) return;

    const email = input.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!valid) {
      msg.style.color = 'var(--destructive)';
      msg.textContent = 'Enter a valid email address.';
      input.focus();
      return;
    }

    const FORM_ID = '1FAIpQLSdPxf-FDgaXb6OCxJKEwhR7M5EfYjdVXQuJHwyqvrJshnTLKQ';
    const ENTRY = 'entry.1816769068';
    const url = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;

    fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `${ENTRY}=${encodeURIComponent(email)}`
    }).catch(() => {});

    msg.style.color = 'var(--accent)';
    msg.textContent = "You're on the list. We'll notify you when Android launches.";
    input.value = '';
    input.disabled = true;

    const btn = document.querySelector('.android-waitlist-btn');
    if (btn) btn.disabled = true;
  };

  (async function initApp() {
    const sections = ['nav', 'hero', 'features', 'guide', 'classes', 'screenshots', 'download', 'footer'];

    await Promise.all(
      sections.map(async (name) => {
        const placeholder = document.querySelector(`[data-section="${name}"]`);
        if (!placeholder) return;
        try {
          const res = await fetch(`sections/${name}.html`);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          placeholder.innerHTML = await res.text();
        } catch (err) {
          console.error(`[app] Failed to load section "${name}":`, err.message);
          placeholder.innerHTML = `<div style="padding:40px;text-align:center;color:#a89b8c;font-family:monospace">[section: ${name}] — open with a server to preview<br><small>npx serve . &nbsp;|&nbsp; python3 -m http.server 8000</small></div>`;
        }
      })
    );

    syncWithData();
    initReveal();
    initStatCards();
    initNav();
    initSmoothAnchors();
    initScreenshotInteractions();
    initCarousels();

    window.addEventListener('content-synced', () => {
      initReveal();
      initCarousels();
    });
  })();
})();
