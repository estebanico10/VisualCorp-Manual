// js/nav.js
(function () {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const depts = ['asesores.html', 'impresores.html', 'corte-laser.html', 'disenadores.html', 'taller.html'];
  const isDeptActive = depts.includes(currentPath);
  const apps = ['app-checklist.html', 'app-calculadora.html'];
  const isAppActive = apps.includes(currentPath);

  const navHTML = `
    <header class="site-header">
      <div class="container">
        <nav class="nav">
          <a href="index.html" class="nav__logo">
            <img class="nav__logo-img"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmSKnD00M-kkEpOeoGxEL9UP7_Zfgf8Ug33Q&s"
              alt="VisualCorp Logo">
            <span class="nav__logo-text">Visual<span>Corp</span></span>
            <span class="nav__badge">Manual Interno</span>
          </a>
          <ul class="nav__links" id="navLinks">
            <li><a href="index.html" class="nav__link ${currentPath === 'index.html' ? 'active' : ''}">Inicio</a></li>
            <li class="nav__item-dropdown">
              <span class="nav__link ${isDeptActive ? 'active' : ''}">Departamentos <i class="fa-solid fa-chevron-down" style="font-size:0.8em;margin-left:4px;"></i></span>
              <ul class="nav__dropdown">
                <li><a href="asesores.html" class="nav__dropdown-link ${currentPath === 'asesores.html' ? 'active' : ''}">🟡 Asesores</a></li>
                <li><a href="impresores.html" class="nav__dropdown-link ${currentPath === 'impresores.html' ? 'active' : ''}">🖨️ Impresores</a></li>
                <li><a href="corte-laser.html" class="nav__dropdown-link ${currentPath === 'corte-laser.html' ? 'active' : ''}">⚡ Corte Láser</a></li>
                <li><a href="disenadores.html" class="nav__dropdown-link ${currentPath === 'disenadores.html' ? 'active' : ''}">🎨 Diseñadores</a></li>
                <li><a href="taller.html" class="nav__dropdown-link ${currentPath === 'taller.html' ? 'active' : ''}">🔧 Taller</a></li>
              </ul>
            </li>
            <li class="nav__item-dropdown">
              <span class="nav__link ${isAppActive ? 'active' : ''}">Mini Apps <i class="fa-solid fa-chevron-down" style="font-size:0.8em;margin-left:4px;"></i></span>
              <ul class="nav__dropdown">
                <li><a href="app-checklist.html" class="nav__dropdown-link ${currentPath === 'app-checklist.html' ? 'active' : ''}">✅ Checklist pre-impresión</a></li>
                <li><a href="app-calculadora.html" class="nav__dropdown-link ${currentPath === 'app-calculadora.html' ? 'active' : ''}">🧮 Calculadora de área</a></li>
              </ul>
            </li>
            <li><a href="fundamentos.html" class="nav__link ${currentPath === 'fundamentos.html' ? 'active' : ''}">Fundamentos</a></li>
            <li><a href="marketing.html" class="nav__link ${currentPath === 'marketing.html' ? 'active' : ''}">Marketing</a></li>
            <li><a href="induccion.html" class="nav__link ${currentPath === 'induccion.html' ? 'active' : ''}">Inducción</a></li>
            <li><a href="seguridad.html" class="nav__link ${currentPath === 'seguridad.html' ? 'active' : ''}">Seguridad</a></li>
            <li style="display:flex;align-items:center;">
              <button class="nav__theme-btn" title="Cambiar Tema">🌙</button>
            </li>
          </ul>
          <button class="nav__hamburger" id="burger" aria-label="Menú">
            <span></span><span></span><span></span>
          </button>
        </nav>
      </div>
    </header>
    `;

  // Inyectar de forma síncrona
  document.write(navHTML);
})();

// Función global para actualizar el estado "active" (usada por Swup)
window.updateNavActiveLink = function () {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  const depts = ['asesores.html', 'impresores.html', 'corte-laser.html', 'disenadores.html', 'taller.html'];
  const apps = ['app-checklist.html', 'app-calculadora.html'];

  // Remover activaciones anteriores
  document.querySelectorAll('.nav__link, .nav__dropdown-link').forEach(el => {
    el.classList.remove('active');
  });

  // Activar los nuevos correspondientes
  document.querySelectorAll('.nav__link').forEach(a => {
    if (a.getAttribute('href') === current) {
      a.classList.add('active');
    }
  });

  document.querySelectorAll('.nav__dropdown-link').forEach(a => {
    if (a.getAttribute('href') === current) {
      a.classList.add('active');
      const parentDropdownItem = a.closest('.nav__item-dropdown');
      if (parentDropdownItem) {
        const parentLink = parentDropdownItem.querySelector('.nav__link');
        if (parentLink) parentLink.classList.add('active');
      }
    }
  });
};
