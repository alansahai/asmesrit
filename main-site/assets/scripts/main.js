/**
 * ASME SRIT — Shared Site Scripts
 * main.js — loaded with `defer` on every page
 */

'use strict';

/* ── Vercel Speed Insights ── */
(function () {
  // Initialize Speed Insights queue
  window.si = window.si || function () {
    (window.siq = window.siq || []).push(arguments);
  };

  // Load Speed Insights script
  const script = document.createElement('script');
  script.defer = true;
  script.src = '/_vercel/speed-insights/script.js';
  document.head.appendChild(script);
}());

/* ── Navbar scroll transition ── */
(function () {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load
}());

/* ── Mobile menu toggle ── */
(function () {
  const btn = document.getElementById('mobile-menu-button');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', function () {
    const isOpen = menu.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', isOpen);
  });

  // Close on any menu link click
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      menu.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}());

/* ── Smooth scroll for anchor links ── */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      var targetEl = document.querySelector(targetId);
      if (!targetEl) return;
      e.preventDefault();

      var navH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '68', 10
      );
      var extra = document.querySelector('.announcement-bar') ? 37 : 0;

      window.scrollTo({
        top: targetEl.getBoundingClientRect().top + window.scrollY - navH - extra,
        behavior: 'smooth',
      });
    });
  });
}());

/* ── Loader fade-out ── */
(function () {
  var loader = document.getElementById('loader');
  if (!loader) return;

  window.addEventListener('load', function () {
    setTimeout(function () {
      loader.style.opacity = '0';
      setTimeout(function () {
        loader.style.display = 'none';
      }, 500);
    }, 600);
  });
}());

/* ── Footer year ── */
(function () {
  var el = document.getElementById('currentYear');
  if (el) el.textContent = new Date().getFullYear();
}());

/* ── Event Modal (index.html only) ── */
(function () {
  var modal = document.getElementById('event-modal');
  var closeBtn = document.getElementById('close-modal-btn');
  if (!modal) return;

  function hideModal() { modal.classList.add('hidden'); }

  if (closeBtn) closeBtn.addEventListener('click', hideModal);

  modal.addEventListener('click', function (e) {
    if (e.target === modal) hideModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') hideModal();
  });
}());

/* ── Achievement category filter (achievements.html only) ── */
(function () {
  var filterBtns = document.querySelectorAll('[data-filter]');
  var items = document.querySelectorAll('[data-category]');
  if (!filterBtns.length) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cat = this.getAttribute('data-filter');

      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');

      items.forEach(function (item) {
        if (cat === 'all' || item.getAttribute('data-category') === cat) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}());

/* ── Contact form (index.html only) ── */
(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;

  var SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzVq-kWarlk882H_3NqknEGrSpfhMyuatwUYqDWnaFR-n7Kdv2QWDIp9Y5QL5P1ECz0gA/exec';
  var submitBtn = document.getElementById('submitBtn');
  var btnText = document.getElementById('btnText');
  var btnSpinner = document.getElementById('btnSpinner');
  var statusEl = document.getElementById('formStatus');
  var affirm = document.getElementById('affirm');

  function setLoading(on) {
    submitBtn.disabled = on;
    if (btnSpinner) btnSpinner.style.display = on ? 'inline-block' : 'none';
    btnText.style.opacity = on ? '0' : '1';
  }

  function setStatus(msg, ok) {
    statusEl.textContent = msg || '';
    statusEl.className = 'form-status ' + (ok !== false ? 'form-status--ok' : 'form-status--err');
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    setStatus('');

    if (!form.checkValidity()) { form.reportValidity(); return; }
    if (!affirm.checked) { setStatus('Please confirm the checkbox to proceed.', false); return; }

    try {
      setLoading(true);
      var fd = new FormData(form);
      fd.set('affirm', affirm.checked ? 'true' : 'false');
      fd.append('page', window.location.href);
      fd.append('userAgent', navigator.userAgent);

      var res = await fetch(SCRIPT_URL, { method: 'POST', body: fd });
      var ct = res.headers.get('content-type') || '';
      var data = ct.includes('application/json') ? await res.json() : null;

      if (res.ok && (!data || data.ok)) {
        setStatus('✅ Message sent successfully!', true);
        form.reset();
      } else {
        setStatus('❌ Failed to send. ' + ((data && data.error) || 'Unexpected response.'), false);
      }
    } catch (err) {
      setStatus('❌ Failed to send. Please try again.', false);
    } finally {
      setLoading(false);
    }
  });
}());
