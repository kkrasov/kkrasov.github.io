(() => {
  const buttons = document.querySelectorAll('[data-lang]');
  function setLanguage(language) {
    const lang = language === 'ru' ? 'ru' : 'en';
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(element => {
      element.innerHTML = element.getAttribute(`data-${lang}`);
    });
    ['aria-label', 'alt'].forEach(attribute => {
      document.querySelectorAll(`[data-${attribute}-${lang}]`).forEach(element => {
        element.setAttribute(attribute, element.getAttribute(`data-${attribute}-${lang}`));
      });
    });
    document.querySelectorAll('time[datetime]').forEach(element => {
      element.textContent = '▦ ' + new Intl.DateTimeFormat(lang === 'ru' ? 'ru-RU' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(element.dateTime + 'T12:00:00Z'));
    });
    document.title = (lang === 'ru' ? 'Кирилл Красов' : 'Kirill Krasov') + ' / NetCrackHunter — reverse engineering';
    document.querySelector('meta[name="description"]').content = lang === 'ru' ? 'Кирилл Красов (NetCrackHunter). Реверс-инженерия клиентских модификаций Minecraft Java. SourceHunters, разборы и исходники.' : 'Kirill Krasov (NetCrackHunter). Reverse engineering Minecraft Java clients. SourceHunters, write-ups and source code.';
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === lang)));
    try { localStorage.setItem('portfolio-language', lang); } catch {}
  }
  let initial = 'en';
  try { initial = localStorage.getItem('portfolio-language') || 'en'; } catch {}
  setLanguage(initial);
  buttons.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
})();
