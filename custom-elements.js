(function() {
  const s = document.createElement('style');
  s.textContent = 'ce { visibility: hidden; } ce.v { visibility: visible; }';
  document.head.appendChild(s);

  const url = 'https://cdn.jsdelivr.net/gh/250metres/Custom-Elements/custom-elements.json';
  const fetchPromise = fetch(url, { priority: 'high' }).then(res => res.json()).catch(() => null);

  const procesar = (data) => {
    if (!data) return;
    const els = document.getElementsByTagName('ce');
    const len = els.length;
    for (let i = 0; i < len; i++) {
      const el = els[i];
      const id = el.textContent.trim();
      if (data[id]) {
        el.textContent = data[id];
      }
      el.classList.add('v');
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('readystatechange', () => {
      if (document.readyState === 'interactive') fetchPromise.then(procesar);
    });
  } else {
    fetchPromise.then(procesar);
  }
})();