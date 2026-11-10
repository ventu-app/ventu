document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  const isHome = path.includes('index.html') || path === '/' || path === '';
  const isJogar = path.includes('jogar.html');
  const isBiblio = path.includes('biblioteca.html');
  const isDash = path.includes('dashboard.html');

  // CORREÇÃO: Usando a sua imagem oficial do logo (assets/logo.svg)
  const headerHTML = `
    <header class="site-header">
      <div class="header-inner">
        
        <!-- LOGO OFICIAL -->
        <a href="index.html" class="logo" aria-label="Ventu — Início">
          <img src="assets/logo.svg" alt="Ventu" height="36" style="object-fit: contain;">
          <span class="logo-text" style="margin-left: 8px;">VENTU</span>
        </a>

        <button class="mobile-menu-btn" onclick="toggleMobileMenu()" aria-label="Abrir menu">☰</button>

        <nav class="main-nav" id="main-nav">
          <a href="index.html" class="${isHome ? 'active' : ''}">Home</a>
          <a href="jogar.html" class="${isJogar ? 'active' : ''}">Jogar</a>
          <a href="biblioteca.html" class="${isBiblio ? 'active' : ''}">Biblioteca</a>
          <a href="dashboard.html" class="${isDash ? 'active' : ''}">Meu QG</a>
        </nav>

        <div class="header-actions">
          <button class="theme-toggle" onclick="toggleTheme()" aria-label="Alternar tema">
            <span class="icon-sun">☀️</span>
            <span class="icon-moon">🌙</span>
          </button>

          <div class="auth-actions" id="auth-actions">
            <div id="auth-logged-out" style="display: flex; gap: 8px;">
              <a href="auth.html" class="btn-login">Entrar</a>
              <a href="auth.html?tab=register" class="btn-register">Criar conta</a>
            </div>
            <div id="auth-logged-in" style="display: none; gap: 8px; align-items: center;">
              <a href="dashboard.html" class="btn-login">Meu Painel</a>
              <button onclick="handleLogout()" class="btn-logout">Sair</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  `;

  document.body.insertAdjacentHTML('afterbegin', headerHTML);

  const savedTheme = localStorage.getItem('ventu_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  window.toggleTheme = () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('ventu_theme', next);
  };

  window.toggleMobileMenu = () => {
    const nav = document.getElementById('main-nav');
    nav.classList.toggle('mobile-open');
  };

  const hasSession = localStorage.getItem('ventu_user_session'); 
  const elLoggedOut = document.getElementById('auth-logged-out');
  const elLoggedIn = document.getElementById('auth-logged-in');

  if (hasSession) {
    elLoggedOut.style.display = 'none';
    elLoggedIn.style.display = 'flex';
  } else {
    elLoggedOut.style.display = 'flex';
    elLoggedIn.style.display = 'none';
  }

  window.handleLogout = async () => {
    localStorage.removeItem('ventu_user_session');
    window.location.href = 'index.html';
  };
});