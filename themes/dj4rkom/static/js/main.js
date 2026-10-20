/* ==========================================================================
   DJ4RKOM - Main JavaScript
   Theme toggle, Search, Code Copy, Progress Bar, Mobile Nav
   Using Lucide SVG Icons (No Emojis)
   ========================================================================== */

(function () {
  'use strict';

  // --- 1. Theme Switcher ---
  const THEME_KEY = 'dj4rkom_theme';

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    return 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.innerHTML = theme === 'light'
        ? '<svg class="lucide lucide-moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>'
        : '<svg class="lucide lucide-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>';
      toggleBtn.setAttribute('aria-label', `Ganti ke mode ${theme === 'light' ? 'gelap' : 'terang'}`);
    }
  }

  // Initial theme application
  applyTheme(getPreferredTheme());

  document.addEventListener('DOMContentLoaded', () => {
    // Re-bind theme button after DOM is loaded
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      applyTheme(getPreferredTheme());
      toggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
      });
    }

    // --- 2. Reading Progress Bar ---
    const progressBar = document.getElementById('reading-progress');
    if (progressBar) {
      window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
          const progress = (window.scrollY / totalHeight) * 100;
          progressBar.style.width = Math.min(100, Math.max(0, progress)) + '%';
        }
      });
    }

    // --- 3. Enhanced Code Blocks with Copy Button ---
    const codeBlocks = document.querySelectorAll('.highlight');
    codeBlocks.forEach(block => {
      // Create code header
      const header = document.createElement('div');
      header.className = 'code-header';

      const dots = document.createElement('div');
      dots.className = 'code-dots';
      dots.innerHTML = '<span class="code-dot red"></span><span class="code-dot yellow"></span><span class="code-dot green"></span>';

      const pre = block.querySelector('pre');
      let lang = 'CODE';
      if (pre && pre.querySelector('code')) {
        const cls = pre.querySelector('code').className;
        const match = cls.match(/language-([a-zA-Z0-9]+)/);
        if (match) lang = match[1];
      }

      const langLabel = document.createElement('span');
      langLabel.textContent = lang.toUpperCase();

      const copyBtn = document.createElement('button');
      copyBtn.className = 'copy-code-btn';
      copyBtn.innerHTML = '<svg class="lucide lucide-copy" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg> <span>Salin</span>';

      copyBtn.addEventListener('click', async () => {
        const text = pre ? pre.innerText : block.innerText;
        try {
          await navigator.clipboard.writeText(text);
          copyBtn.innerHTML = '<svg class="lucide lucide-check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg> <span>Tersalin!</span>';
          copyBtn.style.background = 'var(--pop-mint)';
          setTimeout(() => {
            copyBtn.innerHTML = '<svg class="lucide lucide-copy" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg> <span>Salin</span>';
            copyBtn.style.background = '';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      });

      const actions = document.createElement('div');
      actions.style.display = 'flex';
      actions.style.alignItems = 'center';
      actions.style.gap = '0.75rem';
      actions.appendChild(langLabel);
      actions.appendChild(copyBtn);

      header.appendChild(dots);
      header.appendChild(actions);

      block.insertBefore(header, block.firstChild);
    });

    // --- 4. Mobile Drawer Navigation ---
    const mobileToggle = document.getElementById('mobile-nav-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    if (mobileToggle && mobileDrawer) {
      mobileToggle.addEventListener('click', () => {
        mobileDrawer.classList.toggle('open');
      });
    }

    // --- 5. Toast Notification System with Lucide CheckCircle ---
    window.showToast = function (message) {
      let toast = document.getElementById('toast-notice');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notice';
        toast.className = 'toast-notice';
        document.body.appendChild(toast);
      }
      toast.innerHTML = `<svg class="lucide lucide-check-circle-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg> <span>${message}</span>`;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    };

    // --- 6. Live Search Modal ---
    const searchModal = document.getElementById('search-modal');
    const searchTriggers = document.querySelectorAll('.search-trigger');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchClose = document.getElementById('search-close');

    let searchIndex = null;

    async function loadSearchIndex() {
      if (searchIndex) return searchIndex;
      try {
        const res = await fetch('/index.json');
        if (res.ok) {
          searchIndex = await res.json();
        }
      } catch (e) {
        console.error('Failed to load search index', e);
      }
      return searchIndex || [];
    }

    function openSearch() {
      if (!searchModal) return;
      searchModal.classList.add('active');
      loadSearchIndex();
      setTimeout(() => {
        if (searchInput) searchInput.focus();
      }, 100);
    }

    function closeSearch() {
      if (!searchModal) return;
      searchModal.classList.remove('active');
      if (searchInput) searchInput.value = '';
      if (searchResults) searchResults.innerHTML = '';
    }

    searchTriggers.forEach(btn => btn.addEventListener('click', openSearch));
    if (searchClose) searchClose.addEventListener('click', closeSearch);
    if (searchModal) {
      searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) closeSearch();
      });
    }

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (searchModal && searchModal.classList.contains('active')) {
          closeSearch();
        } else {
          openSearch();
        }
      } else if (e.key === 'Escape' && searchModal && searchModal.classList.contains('active')) {
        closeSearch();
      }
    });

    if (searchInput && searchResults) {
      searchInput.addEventListener('input', async (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (!query) {
          searchResults.innerHTML = '';
          return;
        }

        const items = await loadSearchIndex();
        const matches = items.filter(item => {
          const t = (item.title || '').toLowerCase();
          const d = (item.description || item.summary || '').toLowerCase();
          const tags = Array.isArray(item.tags) ? item.tags.join(' ').toLowerCase() : '';
          return t.includes(query) || d.includes(query) || tags.includes(query);
        });

        if (matches.length === 0) {
          searchResults.innerHTML = `<div class="search-empty">Tidak ada artikel yang cocok dengan "<strong>${escapeHtml(query)}</strong>"</div>`;
          return;
        }

        searchResults.innerHTML = matches.map(item => `
          <a href="${item.permalink}" class="search-result-item">
            <div class="search-result-title">${escapeHtml(item.title)}</div>
            <div class="search-result-snippet">${escapeHtml(item.summary || item.description || '')}</div>
          </a>
        `).join('');
      });
    }

    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }
  });

  // Global helper for copy link
  window.copyArticleLink = async function () {
    try {
      await navigator.clipboard.writeText(window.location.href);
      if (window.showToast) {
        window.showToast('Tautan artikel berhasil disalin ke clipboard!');
      }
    } catch (err) {
      console.error(err);
    }
  };
})();
