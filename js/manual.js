'use strict';

/* ============================================================
   VisualCorp Manual Interno — JS
   ============================================================ */

// ── Reveal on scroll ─────────────────────────────────────────
function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const delay = parseInt(e.target.dataset.delay || 0);
            setTimeout(() => e.target.classList.add('is-visible'), delay);
            io.unobserve(e.target);
        });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
}

// ── Hamburger menu ───────────────────────────────────────────
function initNav() {
    const burger = document.querySelector('.nav__hamburger');
    const links = document.querySelector('.nav__links');
    if (!burger || !links) return;
    burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        links.classList.toggle('open');
    });
}

// ── Active nav link ──────────────────────────────────────────
function initActiveLink() {
    const current = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav__link').forEach(a => {
        if (a.getAttribute('href') === current) a.classList.add('active');
    });
}

// ── Back-to-top ──────────────────────────────────────────────
function initBackTop() {
    const btn = document.querySelector('.back-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── TOC active highlight (manual pages) ──────────────────────
function initToc() {
    const tocLinks = document.querySelectorAll('.toc-item a');
    const sections = document.querySelectorAll('.manual-section[id]');
    if (!tocLinks.length || !sections.length) return;

    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            tocLinks.forEach(l => l.classList.remove('active'));
            const active = document.querySelector(`.toc-item a[href="#${e.target.id}"]`);
            if (active) active.classList.add('active');
        });
    }, { rootMargin: '-20% 0px -70% 0px' });

    sections.forEach(s => io.observe(s));
}

// ── Inline search (manual pages) ─────────────────────────────
function initSearch() {
    const input = document.querySelector('#manualSearch');
    if (!input) return;
    const sections = document.querySelectorAll('.manual-section');

    input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        if (!q) {
            sections.forEach(s => s.style.display = '');
            return;
        }
        sections.forEach(s => {
            const text = s.textContent.toLowerCase();
            s.style.display = text.includes(q) ? '' : 'none';
        });
    });
}

// ── Progress bar (reading) ───────────────────────────────────
function initProgressBar() {
    const bar = document.querySelector('#readProgress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = pct + '%';
    });
}

// ── Init all ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initReveal();
    initNav();
    initActiveLink();
    initBackTop();
    initToc();
    initSearch();
    initProgressBar();
});
