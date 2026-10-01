/* بوابة كلمة المرور — حماية واجهة الموقع فقط (مناسبة لـ GitHub Pages) */
(function () {
  const DATA = window.SITE_DATA || {};
  const KEY = 'birthday_site_unlocked';
  const PASSWORD = String(DATA.password || '20/6').trim();

  if (sessionStorage.getItem(KEY) === '1') return;

  document.documentElement.classList.add('password-locked');
  const overlay = document.createElement('div');
  overlay.className = 'password-overlay';
  overlay.innerHTML = `
    <div class="password-card" role="dialog" aria-modal="true" aria-labelledby="passwordTitle">
      <h2 id="passwordTitle">اكتبي الباسورد</h2>
      <form class="password-form" id="passwordForm">
        <input id="sitePassword" type="password" inputmode="text" autocomplete="off" aria-label="الباسورد" autofocus>
        <button type="submit" aria-label="دخول">→</button>
      </form>
    </div>`;
  document.body.appendChild(overlay);

  const form = overlay.querySelector('#passwordForm');
  const input = overlay.querySelector('#sitePassword');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const value = input.value.trim();
    if (value === PASSWORD) {
      sessionStorage.setItem(KEY, '1');
      overlay.classList.add('unlocked');
      document.documentElement.classList.remove('password-locked');
      setTimeout(() => overlay.remove(), 350);
    } else {
      input.value = '';
      input.focus();
      input.classList.remove('shake');
      void input.offsetWidth;
      input.classList.add('shake');
    }
  });
})();
