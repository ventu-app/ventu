document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  const isHome = path.includes('index.html') || path === '/' || path === '';
  const isJogar = path.includes('jogar.html');
  const isBiblio = path.includes('biblioteca.html');
  const isDash = path.includes('dashboard.html');

  // Ícones SVG (Lucide)
  const svgSun = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-sun" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
  const svgMoon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-moon" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
  const svgMenu = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`;
  const svgClose = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;

  const headerHTML = `
    <header class="site-header">
      <div class="header-inner">
        
        <!-- APENAS A RAPOSA -->
        <a href="index.html" class="logo" aria-label="Ventu — Início">
          <img src="assets/logo.svg" alt="Ventu" height="42" style="object-fit: contain;">
        </a>

        <nav class="main-nav" id="main-nav">
          <a href="index.html" class="${isHome ? 'active' : ''}" ${isHome ? 'aria-current="page"' : ''}>Home</a>
          <a href="jogar.html" class="${isJogar ? 'active' : ''}" ${isJogar ? 'aria-current="page"' : ''}>Jogar</a>
          <a href="biblioteca.html" class="${isBiblio ? 'active' : ''}" ${isBiblio ? 'aria-current="page"' : ''}>Biblioteca</a>
          <a href="dashboard.html" class="${isDash ? 'active' : ''}" ${isDash ? 'aria-current="page"' : ''}>Meu QG</a>
          
          <!-- Auth Actions movidas para o menu mobile -->
          <div class="mobile-auth" id="mobile-auth-container">
            <div id="mobile-auth-logged-out" style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
              <a href="auth.html" class="btn-login" style="justify-content: center; display: flex;">Entrar</a>
              <a href="auth.html?tab=register" class="btn-register" style="justify-content: center; display: flex;">Criar conta</a>
            </div>
            <div id="mobile-auth-logged-in" style="display: none; flex-direction: column; gap: 8px; width: 100%;">
              <a href="dashboard.html" class="btn-login" style="justify-content: center; display: flex;">Meu Painel</a>
              <button onclick="handleLogout()" class="btn-logout" style="width: 100%;">Sair</button>
            </div>
          </div>
        </nav>

        <div class="header-actions">
          <button class="theme-toggle" onclick="toggleTheme()" aria-label="Alternar tema">
            ${svgSun}
            ${svgMoon}
          </button>

          <!-- Auth Actions Desktop -->
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

          <button class="mobile-menu-btn" onclick="toggleMobileMenu()" aria-label="Abrir menu" aria-expanded="false" aria-controls="main-nav">
            <span class="icon-menu">${svgMenu}</span>
            <span class="icon-close" style="display:none;">${svgClose}</span>
          </button>
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
    const btn = document.querySelector('.mobile-menu-btn');
    const iconMenu = btn.querySelector('.icon-menu');
    const iconClose = btn.querySelector('.icon-close');
    
    const isOpen = nav.classList.toggle('mobile-open');
    btn.setAttribute('aria-expanded', isOpen);
    
    if (isOpen) {
      iconMenu.style.display = 'none';
      iconClose.style.display = 'block';
    } else {
      iconMenu.style.display = 'block';
      iconClose.style.display = 'none';
    }
  };

  const hasSession = localStorage.getItem('ventu_user_session'); 
  
  // Atualiza Desktop
  const elLoggedOut = document.getElementById('auth-logged-out');
  const elLoggedIn = document.getElementById('auth-logged-in');
  
  // Atualiza Mobile
  const elMobLoggedOut = document.getElementById('mobile-auth-logged-out');
  const elMobLoggedIn = document.getElementById('mobile-auth-logged-in');

  if (hasSession) {
    if(elLoggedOut) elLoggedOut.style.display = 'none';
    if(elLoggedIn) elLoggedIn.style.display = 'flex';
    if(elMobLoggedOut) elMobLoggedOut.style.display = 'none';
    if(elMobLoggedIn) elMobLoggedIn.style.display = 'flex';
  } else {
    if(elLoggedOut) elLoggedOut.style.display = 'flex';
    if(elLoggedIn) elLoggedIn.style.display = 'none';
    if(elMobLoggedOut) elMobLoggedOut.style.display = 'flex';
    if(elMobLoggedIn) elMobLoggedIn.style.display = 'none';
  }

  window.handleLogout = async () => {
    localStorage.removeItem('ventu_user_session');
    window.location.href = 'index.html';
  };
});