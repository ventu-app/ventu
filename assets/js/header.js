document.addEventListener("DOMContentLoaded", () => {
  // Ativa o JS para o CSS do fade-up não deixar a página invisível
  document.documentElement.classList.add('js');

  // Restaura o tema para evitar flash (caso não esteja no head da página)
  try {
    document.documentElement.setAttribute('data-theme', localStorage.getItem('ventu_theme') || 'dark');
  } catch (e) {}

  // Detecção de Rota para a Vercel (sem .html)
  const page = location.pathname.replace(/\/+$/, '').replace(/\.html$/, '').split('/').pop() || 'index';
  const isHome = page === 'index';
  const isJogar = page === 'jogar';
  const isBiblio = page.startsWith('biblioteca');
  const isDash = page === 'dashboard';
  const hasSession = !!localStorage.getItem('ventu_user_session');

  // SVGs
  const svgSun = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-sun" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
  const svgMoon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-moon" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
  const svgMenu = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`;
  const svgClose = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;

  // Lógica de Links
  let navLinks = '';
  if (isHome) {
    navLinks = `
      <a href="#como-funciona">Como funciona</a>
      <a href="#niveis">Níveis</a>
      <a href="/biblioteca.html" class="${isBiblio ? 'active' : ''}">Biblioteca</a>
      <a href="/jogar.html" class="${isJogar ? 'active' : ''}">Jogar</a>
    `;
  } else {
    navLinks = `
      <a href="/index.html" class="${isHome ? 'active' : ''}">Home</a>
      <a href="/jogar.html" class="${isJogar ? 'active' : ''}">Jogar</a>
      <a href="/biblioteca.html" class="${isBiblio ? 'active' : ''}">Biblioteca</a>
      ${hasSession ? `<a href="/dashboard.html" class="${isDash ? 'active' : ''}">Meu QG</a>` : ''}
    `;
  }

  const headerHTML = `
    <header class="site-header">
      <div class="header-inner">
        <a href="/" class="logo" aria-label="Ventu — Início">
          <img src="/assets/logo.svg" alt="Ventu" height="42" width="42" style="object-fit: contain;">
          <span class="logo-text">Ventu</span>
        </a>

        <nav class="main-nav" id="main-nav">
          ${navLinks}
          <div class="mobile-auth" id="mobile-auth-container">
            <div id="mobile-auth-logged-out" style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
              <a href="/auth.html" class="btn-login" style="justify-content: center; display: flex;">Entrar</a>
              <a href="/auth.html?tab=register" class="btn-register" style="justify-content: center; display: flex;">Criar conta</a>
            </div>
            <div id="mobile-auth-logged-in" style="display: none; flex-direction: column; gap: 8px; width: 100%;">
              <a href="/dashboard.html" class="btn-login" style="justify-content: center; display: flex;">Meu Painel</a>
              <button onclick="handleLogout()" class="btn-logout" style="width: 100%;">Sair</button>
            </div>
          </div>
        </nav>

        <div class="header-actions">
          <button class="theme-toggle" onclick="toggleTheme()" aria-label="Alternar tema">
            ${svgSun} ${svgMoon}
          </button>
          <a href="/jogar.html" class="btn-mobile-cta">Jogar</a>
          <div class="auth-actions" id="auth-actions">
            <div id="auth-logged-out" style="display: flex; gap: 8px;">
              <a href="/auth.html" class="btn-login">Entrar</a>
              <a href="/auth.html?tab=register" class="btn-register">Criar conta</a>
            </div>
            <div id="auth-logged-in" style="display: none; gap: 8px; align-items: center;">
              <a href="/dashboard.html" class="btn-login">Meu Painel</a>
              <button onclick="handleLogout()" class="btn-logout">Sair</button>
            </div>
          </div>
          <button class="mobile-menu-btn" onclick="toggleMobileMenu()" aria-label="Abrir menu" aria-expanded="false" aria-controls="main-nav">
            <span class="icon-menu">${svgMenu}</span>
            <span class="icon-close" style="display:none;">${svgClose}</span>
          </button>
        </div>
      </div>
    </header>
  `;

  document.body.insertAdjacentHTML('afterbegin', headerHTML);

  window.toggleTheme = () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('ventu_theme', next);
  };

  const closeMenu = () => {
    const nav = document.getElementById('main-nav');
    const btn = document.querySelector('.mobile-menu-btn');
    if (!nav || !nav.classList.contains('mobile-open')) return;
    nav.classList.remove('mobile-open');
    btn.setAttribute('aria-expanded', 'false');
    btn.querySelector('.icon-menu').style.display = 'block';
    btn.querySelector('.icon-close').style.display = 'none';
  };

  window.toggleMobileMenu = () => {
    const nav = document.getElementById('main-nav');
    const btn = document.querySelector('.mobile-menu-btn');
    const isOpen = nav.classList.toggle('mobile-open');
    btn.setAttribute('aria-expanded', isOpen);
    btn.querySelector('.icon-menu').style.display = isOpen ? 'none' : 'block';
    btn.querySelector('.icon-close').style.display = isOpen ? 'block' : 'none';
  };

  document.getElementById('main-nav').addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  // Auth UI Update
  const updateAuthUI = (loggedIn) => {
    document.getElementById('auth-logged-out').style.display = loggedIn ? 'none' : 'flex';
    document.getElementById('auth-logged-in').style.display = loggedIn ? 'flex' : 'none';
    document.getElementById('mobile-auth-logged-out').style.display = loggedIn ? 'none' : 'flex';
    document.getElementById('mobile-auth-logged-in').style.display = loggedIn ? 'flex' : 'none';
  };
  updateAuthUI(hasSession);

  window.handleLogout = () => {
    localStorage.removeItem('ventu_user_session');
    window.location.href = '/';
  };

  // --- SCRIPT DE ANIMAÇÃO FADE-UP ---
  const els = document.querySelectorAll('.fade-up');
  if (!('IntersectionObserver' in window)) {
    els.forEach(e => e.classList.add('visible'));
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: .12 });
    els.forEach(e => io.observe(e));
  }
});