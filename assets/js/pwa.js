// Lógica de Instalação do PWA (Android/Chrome)
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  // Cria o botão de instalar se ele não existir
  if (!document.getElementById('pwa-install-btn')) {
    const installBtn = document.createElement('button');
    installBtn.id = 'pwa-install-btn';
    installBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
      <span>Instalar App</span>
    `;
    
    // Estilos inline para o botão flutuar no canto inferior esquerdo
    installBtn.style.cssText = `
      position: fixed; bottom: 20px; left: 20px; z-index: 9999;
      display: flex; align-items: center; gap: 8px;
      background: var(--gold); color: #0b0f19; border: none;
      padding: 12px 20px; border-radius: 999px; font-weight: 700; font-family: inherit;
      box-shadow: 0 10px 30px rgba(251,191,36,0.4); cursor: pointer;
      transition: transform 0.2s;
    `;
    
    installBtn.addEventListener('mouseover', () => installBtn.style.transform = 'translateY(-3px)');
    installBtn.addEventListener('mouseout', () => installBtn.style.transform = 'translateY(0)');
    
    document.body.appendChild(installBtn);
    
    installBtn.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        deferredPrompt = null;
        installBtn.remove();
      }
    });
  }
});

// Quando o app for instalado, esconde o botão
window.addEventListener('appinstalled', () => {
  const btn = document.getElementById('pwa-install-btn');
  if (btn) btn.remove();
});