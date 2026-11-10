document.addEventListener("DOMContentLoaded", () => {
  // 1. Define qual link está ativo baseado na URL
  const path = window.location.pathname;
  const isHome = path.includes('index.html') || path === '/' || path === '';
  const isJogar = path.includes('jogar.html');
  const isBiblio = path.includes('biblioteca.html');
  const isDash = path.includes('dashboard.html');

  // 2. HTML do Header
  const headerHTML = `
    <header class="site-header">
      <div class="header-inner">
        <a href="index.html" class="logo" aria-label="Ventu — Início">
          <svg viewBox="0 0 100 100" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 40 L10 10 L40 25 Z" fill="#fbbf24"/>
            <path d="M80 40 L90 10 L60 25 Z" fill="#fbbf24"/>
            <path d="M50 20 L20 40 L20 70 C20 85 35 95 50 95 C65 95 80 85 80 70 L80 40 Z" fill="#fbbf24"/>
            <circle cx="35" cy="55" r="5" fill="#0b0f19"/>
            <circle cx="65" cy="55" r="5" fill="#0b0f19"/>
            <path d="M45 70 L55 70 L50 78 Z" fill="#0b0f19"/>
          </svg>
          <span class="logo-text">VENTU</span>
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

  // Injeta o header no topo do body
  document.body.insertAdjacentHTML('afterbegin', headerHTML);

  // 3. Lógica do Tema
  const savedTheme = localStorage.getItem('ventu_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  window.toggleTheme = () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('ventu_theme', next);
  };

  // 4. Lógica do Menu Mobile
  window.toggleMobileMenu = () => {
    const nav = document.getElementById('main-nav');
    nav.classList.toggle('mobile-open');
  };

  // 5. Lógica de Autenticação (Supabase Mock)
  const hasSession = localStorage.getItem('ventu_user_session'); // Troque pela sua validação real
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
    // if (window.supabaseClient) await window.supabaseClient.auth.signOut();
    localStorage.removeItem('ventu_user_session');
    window.location.href = 'index.html';
  };
});