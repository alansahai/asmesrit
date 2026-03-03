'use strict';

/* ── Navbar scroll ── */
(function () {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;
    function onScroll() { navbar.classList.toggle('scrolled', window.scrollY > 40); }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}());

/* ── Mobile menu toggle ── */
(function () {
    var btn = document.getElementById('mobile-menu-button');
    var menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;
    btn.addEventListener('click', function () {
        var isOpen = menu.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', isOpen);
    });
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
            var navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '72', 10);
            var extra = document.querySelector('.announcement-bar') ? 38 : 0;
            window.scrollTo({ top: targetEl.getBoundingClientRect().top + window.scrollY - navH - extra, behavior: 'smooth' });
        });
    });
}());

/* ── Loader ── */
(function () {
    var loader = document.getElementById('loader');
    if (!loader) return;
    window.addEventListener('load', function () {
        setTimeout(function () {
            loader.style.opacity = '0';
            setTimeout(function () { loader.style.display = 'none'; }, 500);
        }, 900);
    });
}());

/* ── Footer year ── */
(function () {
    var el = document.getElementById('currentYear');
    if (el) el.textContent = new Date().getFullYear();
}());

/* ── FAQ Accordion ── */
(function () {
    document.querySelectorAll('.faq-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var item = this.closest('.faq-item');
            var isOpen = item.classList.contains('open');

            // Close all
            document.querySelectorAll('.faq-item').forEach(function (i) {
                i.classList.remove('open');
                i.querySelector('.faq-btn').setAttribute('aria-expanded', 'false');
            });

            // Toggle clicked
            if (!isOpen) {
                item.classList.add('open');
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });
}());

/* ── Scroll-reveal for sections ── */
(function () {
    if (!('IntersectionObserver' in window)) return;
    var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .track-card, .stat-card, .sdg-item, .faq-item, .timeline-item, .person-card').forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity .5s ease, transform .5s ease';
        obs.observe(el);
    });
}());
