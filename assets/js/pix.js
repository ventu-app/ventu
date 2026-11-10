/* ============================================================
   VENTU · Pix (global)
   Lê window.VENTU_PIX_CONFIG e monta QR + copia-e-cola EMV.
   Zero dependência externa. Funciona em file:// e http://.
   ============================================================ */
(function () {
  'use strict';
  const cfg = window.VENTU_PIX_CONFIG || {};
  if (!cfg.key) return;

  /* ---------- CRC16-CCITT (EMV) ---------- */
  function crc16(str) {
    let crc = 0xFFFF;
    for (let i = 0; i < str.length; i++) {
      crc ^= str.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) : (crc << 1);
      }
    }
    return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
  }

  /* ---------- TLV ---------- */
  function tlv(id, val) {
    const len = String(val.length).padStart(2, '0');
    return id + len + val;
  }

  /* ---------- Payload Pix (BR Code) ---------- */
  function buildPayload(c) {
    const gui = 'BR.GOV.BCB.PIX';
    const merchantAcc = tlv('00', gui) + tlv('01', c.key);
    let p = '';
    p += tlv('00', '01');                     // Payload Format Indicator
    p += tlv('26', merchantAcc);              // Merchant Account Info
    p += tlv('52', '0000');                   // MCC
    p += tlv('53', '986');                    // BRL
    if (c.amount) p += tlv('54', c.amount);   // valor (opcional)
    p += tlv('58', 'BR');                     // país
    p += tlv('59', c.name);                   // nome (ASCII)
    p += tlv('60', c.city);                   // cidade (ASCII)
    p += tlv('62', tlv('05', '***'));         // txid
    p += '6304';                              // CRC header
    return p + crc16(p);                      // CRC final
  }

  /* ---------- ready ---------- */
  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  ready(function () {
    const fab   = document.getElementById('ventu-pix-fab');
    const modal = document.getElementById('ventu-pix-modal');
    if (!fab || !modal) return;

    const payload = buildPayload(cfg);
    const qr      = modal.querySelector('[data-pix-qr]');
    const keyEl   = modal.querySelector('[data-pix-key]');
    const openEl  = modal.querySelector('[data-pix-open]');
    const copyBtn = modal.querySelector('[data-pix-copy]');
    const closers = modal.querySelectorAll('[data-pix-close]');

    // Render
    qr.src = 'https://api.qrserver.com/v1/create-qr-code/?size=440x440&margin=12&data=' + encodeURIComponent(payload);
    keyEl.textContent = cfg.key;
    openEl.href = 'pix://' + payload;

    // Abrir / fechar
    let lastFocus = null;
    const open = function () {
      lastFocus = document.activeElement;
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
      fab.setAttribute('aria-expanded', 'true');
      const closeBtn = modal.querySelector('.ventu-pix-close');
      if (closeBtn) closeBtn.focus();
    };
    const close = function () {
      modal.hidden = true;
      document.body.style.overflow = '';
      fab.setAttribute('aria-expanded', 'false');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };

    fab.addEventListener('click', function () {
      if (modal.hidden) open(); else close();
    });
    closers.forEach(function (el) { el.addEventListener('click', close); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) close();
    });

    // Copiar payload
    function copyPayload() {
      const done = function () {
        copyBtn.textContent = '✓ Copiado!';
        setTimeout(function () { copyBtn.textContent = 'Copiar'; }, 2000);
      };
      const fallback = function () {
        const ta = document.createElement('textarea');
        ta.value = payload;
        ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); } catch (e) {}
        document.body.removeChild(ta);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(payload).then(done).catch(fallback);
      } else {
        fallback();
      }
    }
    if (copyBtn) copyBtn.addEventListener('click', copyPayload);
  });
})();