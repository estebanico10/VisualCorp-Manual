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
    const current = window.location.pathname.split('/').pop() || 'index.html';
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

// ── Theme / Dark Mode Toggle ─────────────────────────────────
function initTheme() {
    // Determine initial theme
    const savedTheme = localStorage.getItem('vc-theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }

    // Attempt to update icon if button exists
    function updateIcon(btn) {
        btn.textContent = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
        btn.title = document.body.classList.contains('light-mode') ? 'Cambiar a Modo Oscuro' : 'Cambiar a Modo Claro';
    }

    const btn = document.querySelector('.nav__theme-btn');
    if (btn) {
        updateIcon(btn);
        btn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            localStorage.setItem('vc-theme', isLight ? 'light' : 'dark');
            updateIcon(btn);
        });
    }
}

// ── Global Search ────────────────────────────────────────────
const searchIndex = [
    { title: "Asesores - Matemáticas", desc: "Reglas de 3, promedios, áreas y márgenes.", url: "asesores.html#matematicas" },
    { title: "Asesores - Cotizaciones", desc: "Cómo usar el sistema Excel de ventas.", url: "asesores.html#cotizaciones" },
    { title: "Impresores - FlexiPRINT", desc: "Configuración, perfiles ICC y ripeo.", url: "impresores.html#flexiprint" },
    { title: "Impresores - Mantenimiento", desc: "Limpieza de cabezales y capping.", url: "impresores.html#mantenimiento" },
    { title: "Corte Láser - RDWorks", desc: "Software, sistema de colores de capas.", url: "corte-laser.html#software" },
    { title: "Corte Láser - Calibración", desc: "Foco a 7mm exactos y limpieza óptica.", url: "corte-laser.html#calibracion" },
    { title: "Diseñadores - Archivos", desc: "Nomenclatura y guardado seguro.", url: "disenadores.html#archivos" },
    { title: "Taller - Instalaciones", desc: "Cultura de trabajo en el sitio del cliente.", url: "taller.html#cultura" },
    { title: "Fundamentos - Color", desc: "Psicología del color, RGB vs CMYK.", url: "fundamentos.html#color" },
    { title: "Fundamentos - Sangría", desc: "Márgenes, bleeding y zona segura.", url: "fundamentos.html#sangria-detalle" },
    { title: "Marketing - Redes Sociales", desc: "Claves para Instagram, TikTok y Facebook.", url: "marketing.html#redes" },
    { title: "Marketing - Fotografía", desc: "Tips de iluminación, ángulos y contexto.", url: "marketing.html#fotografia" },
    { title: "Inducción - Primer Día", desc: "Bienvenida, cultura y pausas activas.", url: "induccion.html#cultura" },
    { title: "Seguridad - EPP", desc: "Uso de gafas y guantes de seguridad.", url: "seguridad.html#epp" }
];

function initSearch() {
    const input = document.querySelector('#manualSearch');
    if (!input) return;

    // Create dropdown wrapper
    const wrap = input.closest('.search-wrap');
    if(!wrap) return;

    let resultsBox = wrap.querySelector('.search-results');
    if (!resultsBox) {
        resultsBox = document.createElement('div');
        resultsBox.className = 'search-results';
        wrap.appendChild(resultsBox);
    }

    input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        if (!q) {
            resultsBox.classList.remove('active');
            return;
        }

        const hits = searchIndex.filter(item => 
            item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q)
        );

        resultsBox.innerHTML = '';
        if (hits.length === 0) {
            resultsBox.innerHTML = '<div class="search-empty">No se encontraron resultados para "'+q+'"</div>';
        } else {
            hits.forEach(item => {
                const a = document.createElement('a');
                a.href = item.url;
                a.className = 'search-result-item';
                a.innerHTML = `<div class="search-result-title">${item.title}</div><div class="search-result-desc">${item.desc}</div>`;
                
                // Add click listener, since standard link navigation might not trigger if they click an anchor on the current page
                a.addEventListener('click', () => {
                    resultsBox.classList.remove('active');
                    input.value = '';
                });

                resultsBox.appendChild(a);
            });
        }
        resultsBox.classList.add('active');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!wrap.contains(e.target)) {
            resultsBox.classList.remove('active');
        }
    });
}

// ── Interactive Quizzes ──────────────────────────────────────
function initQuizzes() {
    const quizzes = document.querySelectorAll('.quiz-container');
    if (!quizzes.length) return;

    quizzes.forEach((quiz, index) => {
        const options = quiz.querySelectorAll('.quiz-option');
        if (!options.length) return;

        let answered = false;

        options.forEach(opt => {
            opt.addEventListener('click', () => {
                if (answered) return; // Only one guess allowed for simplicity
                answered = true;

                // Lock all options
                options.forEach(o => o.classList.add('locked'));

                const isCorrect = opt.dataset.correct === 'true';

                if (isCorrect) {
                    opt.classList.add('correct');
                    // Add result text
                    const res = document.createElement('div');
                    res.className = 'quiz-result';
                    res.innerHTML = `<h3 style="color:var(--color-success);font-size:1.5rem;margin-bottom:0.5rem;">¡Correcto! 🎉</h3><p style="color:var(--color-text-muted);">Has demostrado que entiendes esta parte fundamental.</p>`;
                    quiz.appendChild(res);

                    // Fire Confetti if available
                    if (typeof confetti === 'function') {
                        confetti({
                            particleCount: 100,
                            spread: 70,
                            origin: { y: 0.6 },
                            colors: ['#f2b705', '#06b6d4', '#ec4899', '#22c55e']
                        });
                    }
                } else {
                    opt.classList.add('incorrect');
                    // Show correct answer visually
                    options.forEach(o => {
                        if (o.dataset.correct === 'true') {
                            o.classList.add('correct');
                        }
                    });

                    // Add result text
                    const res = document.createElement('div');
                    res.className = 'quiz-result';
                    res.innerHTML = `<h3 style="color:var(--color-danger);font-size:1.5rem;margin-bottom:0.5rem;">Incorrecto 👀</h3><p style="color:var(--color-text-muted);">Repasa la sección correspondiente y vuelve a intentarlo.</p>`;
                    quiz.appendChild(res);
                }
            });
        });
    });
}

// ── Init all ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initReveal();
    initNav();
    initActiveLink();
    initBackTop();
    initToc();
    initSearch();
    initProgressBar();
    initQuizzes();
});
