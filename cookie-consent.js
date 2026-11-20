/* Ezan Asistanı Pro — çerez tercih bandı (bağımsız, izleme yok).
   Yalnızca seçimi localStorage'da saklar; sunucuya hiçbir veri göndermez. */
(function () {
  'use strict';
  var KEY = 'ezanai_cookie_choice_v1';
  if (window.__ezanaiCookieBannerLoaded) return;
  window.__ezanaiCookieBannerLoaded = true;

  function read() {
    try { return JSON.parse(localStorage.getItem(KEY) || 'null'); }
    catch (e) { return null; }
  }

  function css() {
    var style = document.createElement('style');
    style.textContent =
      '.ez-cookie{position:fixed;left:0;right:0;bottom:0;z-index:2000;background:#fff;' +
      'border-top:1px solid #dbe5e1;padding:14px 18px;box-shadow:0 -8px 30px rgba(6,30,24,.16);' +
      'font:14px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;color:#14211d;display:none}' +
      '.ez-cookie.ez-open{display:block}' +
      '.ez-cookie .ez-inner{max-width:980px;margin:0 auto;display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between}' +
      '.ez-cookie p{margin:0;max-width:680px;font-size:13.5px}' +
      '.ez-cookie a{color:#0f766e}' +
      '.ez-cookie .ez-actions{display:flex;gap:8px;flex-wrap:wrap}' +
      '.ez-cookie button{font:inherit;font-size:13px;font-weight:600;border-radius:999px;padding:8px 14px;cursor:pointer;' +
      'border:1px solid #dbe5e1;background:#fff;color:#0f766e}' +
      '.ez-cookie button.ez-primary{background:#0f766e;border-color:#0f766e;color:#fff}';
    document.head.appendChild(style);
  }

  function save(choice) {
    var data = {
      choice: choice, necessary: true, analytics: false, marketing: false,
      version: 1, at: new Date().toISOString()
    };
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {}
    var box = document.querySelector('.ez-cookie');
    if (box) box.classList.remove('ez-open');
  }

  function show() {
    css();
    var box = document.createElement('div');
    box.className = 'ez-cookie ez-open';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', 'Çerez bildirimi');
    box.innerHTML =
      '<div class="ez-inner">' +
      '<p><strong>Çerezler ve gizlilik.</strong> Bu sitede analitik veya reklam ' +
      'çerezi kullanılmaz. Yalnızca tercihinizi hatırlamak için tarayıcı deposu ' +
      'kullanılır. <a href="cerez.html">Çerez politikası</a></p>' +
      '<div class="ez-actions">' +
      '<button type="button" data-choice="necessary">Yalnızca zorunlu</button>' +
      '<button type="button" class="ez-primary" data-choice="all">Kabul et</button>' +
      '</div></div>';
    document.body.appendChild(box);
    Array.prototype.forEach.call(box.querySelectorAll('[data-choice]'), function (btn) {
      btn.addEventListener('click', function () {
        save(btn.getAttribute('data-choice'));
      });
    });
  }

  function boot() {
    if (!read()) show();
    Array.prototype.forEach.call(
      document.querySelectorAll('[data-cookie-settings]'),
      function (link) {
        link.addEventListener('click', function (event) {
          event.preventDefault();
          try { localStorage.removeItem(KEY); } catch (e) {}
          var old = document.querySelector('.ez-cookie');
          if (old) old.remove();
          show();
        });
      }
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
