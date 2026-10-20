/* Google Analytics: loaded only after an explicit analytics choice. */
(() => {
  const id = 'G-S5TJKLX1DC';
  const key = 'hari-analytics-consent-v1';
  let started = false;
  function read() { try { return localStorage.getItem(key); } catch (_) { return null; } }
  function start() {
    if (started) return;
    started = true;
    window['ga-disable-' + id] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', id, { allow_google_signals: false, allow_ad_personalization_signals: false, page_location: location.origin + location.pathname });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.appendChild(script);
  }
  function choose(value) {
    try { localStorage.setItem(key, value); } catch (_) {}
    if (value === 'accepted') start();
    else {
      window['ga-disable-' + id] = true;
      document.cookie.split(';').forEach(part => {
        const name = part.trim().split('=')[0];
        if (!/^_ga(?:_|$)/.test(name)) return;
        ['', location.hostname, '.' + location.hostname, '.hariyim.com'].forEach(domain => {
          document.cookie = name + '=; Max-Age=0; path=/' + (domain ? '; domain=' + domain : '');
        });
      });
    }
    panel.hidden = true;
  }
  const lang = (navigator.language || 'en').slice(0, 2);
  const copy = {
    en: ['Analytics preferences', 'Allow Google Analytics to measure visits and interactions? It loads only if you accept. You can change your choice here at any time.', 'Accept analytics', 'Reject analytics', 'Privacy'],
    ko: ['방문 분석 설정', '방문 및 이용 현황 분석을 위해 Google Analytics를 허용하시겠어요? 허용한 경우에만 실행되며, 언제든 설정을 바꿀 수 있습니다.', '분석 허용', '분석 거절', '개인정보 안내'],
    de: ['Analyse-Einstellungen', 'Google Analytics zur Messung von Besuchen und Interaktionen erlauben? Es wird erst nach Ihrer Zustimmung geladen. Sie können Ihre Auswahl jederzeit ändern.', 'Analyse erlauben', 'Analyse ablehnen', 'Datenschutz']
  }[lang] || null;
  const t = copy || ['Analytics preferences', 'Allow Google Analytics to measure visits and interactions? It loads only if you accept. You can change your choice here at any time.', 'Accept analytics', 'Reject analytics', 'Privacy'];
  const style = document.createElement('style');
  style.textContent = '.analytics-panel{position:fixed;bottom:60px;left:16px;right:16px;margin:auto;max-width:620px;padding:20px;background:#171714;color:#f4f0e7;border:1px solid #a89d86;box-shadow:0 5px 30px #0006;z-index:10000;font:15px/1.5 system-ui}.analytics-panel[hidden]{display:none}.analytics-panel p{margin:10px 0}.analytics-panel button,.analytics-settings{font:inherit;padding:9px 14px;background:#f4f0e7;color:#171714;border:1px solid #a89d86;cursor:pointer;border-radius:3px}.analytics-actions{display:flex;gap:10px;flex-wrap:wrap}.analytics-panel a{color:#f4f0e7;text-decoration:underline}.analytics-settings{position:fixed;bottom:12px;left:16px;z-index:9999;font:12px system-ui}';
  document.head.appendChild(style);
  const panel = document.createElement('section');
  panel.className = 'analytics-panel';
  panel.setAttribute('aria-label', t[0]);
  const title = document.createElement('strong'); title.textContent = t[0];
  const message = document.createElement('p'); message.textContent = t[1];
  const actions = document.createElement('div'); actions.className = 'analytics-actions';
  ['accepted', 'rejected'].forEach((value, index) => {
    const button = document.createElement('button'); button.type = 'button'; button.textContent = t[index + 2];
    button.addEventListener('click', () => choose(value)); actions.appendChild(button);
  });
  const privacy = document.createElement('a'); privacy.href = '/privacy.html'; privacy.textContent = t[4];
  panel.append(title, message, actions, privacy); document.body.appendChild(panel);
  const settings = document.createElement('button'); settings.type = 'button'; settings.className = 'analytics-settings'; settings.textContent = t[0];
  settings.addEventListener('click', () => { panel.hidden = false; actions.querySelector('button').focus(); });
  document.body.appendChild(settings);
  const consent = read();
  panel.hidden = consent === 'accepted' || consent === 'rejected';
  if (consent === 'accepted') start();
})();
