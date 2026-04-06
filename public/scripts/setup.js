/**
 * SETUP.JS — Helper functions to sync the DOM with DATA.js
 */

function getValueByPath(obj, path) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

function syncWithData() {
  if (typeof DATA === 'undefined') {
    console.error('[setup] DATA.js not loaded.');
    return;
  }

  // 1. Simple text replacements
  document.querySelectorAll('[data-text]').forEach(el => {
    const path = el.getAttribute('data-text');
    const value = getValueByPath(DATA, path);
    if (value !== undefined) {
      el.textContent = value;
    }
  });

  // 2. Simple href replacements
  document.querySelectorAll('[data-href]').forEach(el => {
    const path = el.getAttribute('data-href');
    const value = getValueByPath(DATA, path);
    if (value !== undefined) {
      el.setAttribute('href', value);
    }
  });

  // 3. Simple src replacements
  document.querySelectorAll('[data-img]').forEach(el => {
    const path = el.getAttribute('data-img');
    const value = getValueByPath(DATA, path);
    if (value !== undefined) {
      el.setAttribute('src', value);
    }
  });

  // 4. List rendering
  document.querySelectorAll('[data-list]').forEach(container => {
    const path = container.getAttribute('data-list');
    const templateName = container.getAttribute('data-template');
    const list = getValueByPath(DATA, path);
    
    if (Array.isArray(list)) {
      container.innerHTML = ''; // Clear placeholder
      list.forEach((item, index) => {
        const html = renderTemplate(templateName, item, index);
        if (html) {
          container.insertAdjacentHTML('beforeend', html);
        }
      });
    }
  });

  // Dispatch event for main.js to re-init observers
  window.dispatchEvent(new CustomEvent('content-synced'));
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
            ${item.details.map(d => `<li>${d}</li>`).join('')}
          </ul>
        </div>
      `;
    case 'nav-link':
      const isCta = item.href === '#download';
      return `<a href="${item.href}" role="listitem" class="${isCta ? 'nav-cta' : ''}">${item.label}</a>`;
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

// Auto-run when loader tells us content is ready
window.addEventListener('content-loaded', syncWithData);
