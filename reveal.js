(function () {
  if (window.__lsReveal) return; window.__lsReveal = true;
  (function theme() {
    var N = 'html[data-theme="night"] ';
    var R = function (sel, decl) { return sel.split('|').map(function (s) { s = s.trim(); return N + (s.charAt(0) === '[' ? s + ':not(nav *):not(nav)' : s); }).join(',') + '{' + decl + '}'; };
    var css = [
      N.trim() + ',' + N + 'body{background:#04101F !important;color-scheme:dark;}',
      R('[style*="background: rgb(255, 255, 255)"]|[style*="background-color: rgb(255, 255, 255)"]', 'background:#0D2645 !important;'),
      R('[style*="background: radial-gradient"][style*="), rgb(255, 255, 255)"]', 'background:radial-gradient(38% 45% at 8% 18%,rgba(93,224,230,.12),rgba(93,224,230,0) 70%),radial-gradient(40% 50% at 92% 85%,rgba(0,74,173,.22),rgba(0,74,173,0) 70%),#08203D !important;'),
      R('[style*="background: rgb(233, 237, 242)"]', 'background:#04101F !important;'),
      R('[style*="background: rgb(247, 249, 251)"]|[style*="background: rgb(244, 247, 250)"]|[style*="background-color: rgb(244, 247, 250)"]', 'background:#0A2040 !important;'),
      R('[style*="background: rgba(255, 255, 255, 0.62)"]|[style*="background: rgba(255, 255, 255, 0.9)"]|[style*="background: rgba(255, 255, 255, 0.86)"]', 'background:rgba(16,45,80,.62) !important;border-color:rgba(255,255,255,.14) !important;box-shadow:inset 0 1px 0 rgba(255,255,255,.1),0 16px 36px rgba(0,0,0,.35) !important;'),
      R('[style^="color: rgb(12, 48, 87)"]|[style*="; color: rgb(12, 48, 87)"]', 'color:#EAF2FA !important;'),
      R('[style^="color: rgb(66, 88, 108)"]|[style*="; color: rgb(66, 88, 108)"]', 'color:#A9BCCE !important;'),
      R('[style^="color: rgb(0, 74, 173)"]|[style*="; color: rgb(0, 74, 173)"]', 'color:#6FC3FF !important;'),
      R('[style*="rgb(230, 234, 240)"]|[style*="rgb(221, 227, 234)"]', 'border-color:rgba(255,255,255,.13) !important;'),
      R('[style*="border-top: 2px solid rgb(12, 48, 87)"]', 'border-top-color:rgba(234,242,250,.7) !important;'),
      R('input|select|textarea', 'color:#EAF2FA !important;'),
      R('input::placeholder|textarea::placeholder', 'color:#7F93A8 !important;'),
      // Section Le mot de la gerante : son fond est une photo eclaircie sous un voile
      // blanc. En nuit, le texte passe en clair mais le voile restait blanc, donc les
      // ecritures devenaient invisibles. On assombrit le voile et la photo.
      // Section Nos valeurs : son fond #EEF3F8 restait clair en nuit, le titre blanc
      // disparaissait dessus.
      // Pied de page : un fondu blanc de 120 px raccorde le pied sombre a une page
      // claire. En nuit la page est sombre, la bande blanche n a plus lieu d etre.
      R('[style*="height: 120px"][style*="linear-gradient(rgb(255, 255, 255), rgba(255, 255, 255, 0))"]',
        'background:linear-gradient(180deg,#04101F,rgba(4,16,31,0)) !important;'),
      R('[style*="rgb(238, 243, 248)"]',
        'background:radial-gradient(45% 60% at 12% 20%,rgba(93,224,230,.14),rgba(93,224,230,0) 70%),radial-gradient(45% 60% at 88% 80%,rgba(0,74,173,.24),rgba(0,74,173,0) 70%),#08203D !important;'),
      R('[style*="rgba(255, 255, 255, 0.94)"]',
        'background:linear-gradient(90deg,rgba(4,16,31,.93) 0%,rgba(4,16,31,.86) 42%,rgba(8,32,61,.62) 100%),radial-gradient(40% 50% at 8% 18%,rgba(93,224,230,.16),rgba(93,224,230,0) 70%) !important;'),
      R('[style*="brightness(1.35)"]', 'filter:brightness(.42) saturate(.8) !important;'),
      R('img[src$="logo-lexs.webp"]', 'content:url(assets/logo-lexs-ondark.webp);'),
      R('img[src$="logo-lexs-icon.webp"]', 'content:url(assets/logo-lexs-icon-ondark.webp);'),
      '[style*="0.35s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s"] > div:first-child{transition:color .3s ease;}',
      '[style*="0.35s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s"]:not(nav):not(nav *):not(#x):hover > div:first-child{color:#004AAD !important;}',
      N + '[style*="0.35s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s"]:not(nav):not(nav *):not(#x):hover{border-color:#5DE0E6 !important;}',
      N + '[style*="0.35s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s"]:not(nav):not(nav *):not(#x):hover > div:first-child{color:#5DE0E6 !important;}',
      '[role="button"][style*="color 0.5s"]:hover:not(#x){color:#004AAD !important;}',
      N + '[role="button"][style*="color 0.5s"]:hover:not(#x):not(#y){color:#5DE0E6 !important;}',
      '[style*="overflow: hidden"] > img:not([src*="logo"]):not([style*="opacity"]){transition:scale .8s cubic-bezier(.2,.8,.2,1);}',
      '[style*="overflow: hidden"]:hover > img:not([src*="logo"]):not([style*="opacity"]){scale:1.06;}',
      'html.ls-theming *,html.ls-theming *::before{transition:background .6s ease,background-color .6s ease,color .6s ease,border-color .6s ease !important;}'
    ].join('\n');
    var st = document.createElement('style'); st.id = 'ls-theme'; st.textContent = css; document.head.appendChild(st);
    var saved = null; try { saved = localStorage.getItem('ls-theme'); } catch (e) {}
    document.documentElement.setAttribute('data-theme', saved === 'night' ? 'night' : 'day');
    window.lsTheme = function () { return document.documentElement.getAttribute('data-theme'); };
    window.lsSetTheme = function (t) {
      var h = document.documentElement; h.classList.add('ls-theming'); h.setAttribute('data-theme', t);
      try { localStorage.setItem('ls-theme', t); } catch (e) {}
      clearTimeout(window.__lsTT); window.__lsTT = setTimeout(function () { h.classList.remove('ls-theming'); }, 700);
      dispatchEvent(new CustomEvent('ls-theme', { detail: t }));
    };
  })();
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var EASE = 'cubic-bezier(.16,1,.3,1)';
  var seen = new WeakSet();
  var parallax = [], drift = [];

  function isGrid(el) { var d = el.style && el.style.display; return d === 'grid'; }
  function skip(el) { return el.closest('nav') || el.closest('[aria-label*="WhatsApp"]') || getComputedStyle(el).position === 'fixed'; }

  function candidates() {
    var list = [];
    document.querySelectorAll('h1,h2,p,blockquote,form,article').forEach(function (e) { list.push(e); });
    document.querySelectorAll('[style*="display:grid"],[style*="display: grid"]').forEach(function (g) {
      if (!isGrid(g)) return;
      for (var i = 0; i < g.children.length; i++) list.push(g.children[i]);
    });
    document.querySelectorAll('section [style*="flex-direction:column"][style*="gap:12px"] > div').forEach(function (e) { list.push(e); });
    var set = new Set(list);
    return Array.from(set).filter(function (el) {
      if (seen.has(el) || skip(el)) return false;
      for (var p = el.parentElement; p; p = p.parentElement) if (set.has(p)) return false;
      return el.getBoundingClientRect().height > 0;
    });
  }

  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      io.unobserve(en.target); play(en.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }) : null;

  function play(el) {
    var sibs = Array.prototype.filter.call(el.parentElement ? el.parentElement.children : [], function (s) { return s.__lsHidden; });
    var idx = Math.max(0, sibs.indexOf(el));
    var delay = Math.min(idx * 90, 540);
    var hasImg = !!el.querySelector('img') && (el.tagName === 'ARTICLE' || el.tagName === 'A' || el.style.minHeight);
    var heading = /^H[12]$/.test(el.tagName);
    var from = hasImg ? { opacity: 0, transform: 'translateY(60px) scale(.94)', filter: 'blur(6px)' }
      : heading ? { opacity: 0, transform: 'translateY(46px) skewY(2deg)', filter: 'blur(10px)', clipPath: 'inset(0 0 100% 0)' }
      : { opacity: 0, transform: 'translateY(38px)', filter: 'blur(6px)' };
    var to = hasImg ? { opacity: 1, transform: 'none', filter: 'blur(0)' }
      : heading ? { opacity: 1, transform: 'none', filter: 'blur(0)', clipPath: 'inset(0 0 -20% 0)' }
      : { opacity: 1, transform: 'none', filter: 'blur(0)' };
    el.style.opacity = el.__lsOp || '';
    el.__lsHidden = false;
    el.animate([from, to], { duration: heading ? 1100 : 950, delay: delay, easing: EASE, fill: 'backwards' });
  }

  function scan() {
    if (reduce || !io) return;
    candidates().forEach(function (el) {
      if (seen.has(el)) return;
      seen.add(el);
      el.__lsOp = el.style.opacity; el.__lsHidden = true;
      el.style.opacity = '0';
      io.observe(el);
    });
    document.querySelectorAll('header > img, section > img, section > div > img').forEach(function (img) {
      if (img.__lsPx || img.style.position !== 'absolute') return;
      img.__lsPx = true; img.style.willChange = 'transform'; parallax.push(img);
    });
    document.querySelectorAll('[aria-hidden="true"]').forEach(function (d) {
      if (d.__lsDr || !/Playfair/.test(d.style.fontFamily || '') ) return;
      d.__lsDr = true; drift.push(d);
    });
    tick();
  }

  var bar, rail, head, hideT, lastDust = 0, lastP = -1;
  function ensureBar() {
    if (rail || !document.body) return;
    rail = document.createElement('div');
    rail.setAttribute('aria-hidden', 'true');
    rail.style.cssText = 'position:fixed;left:clamp(10px,2.2vw,34px);top:50%;height:min(46vh,420px);width:2px;margin-top:calc(min(46vh,420px) / -2);z-index:200;pointer-events:none;opacity:0;transition:opacity .7s ease;border-radius:2px;background:rgba(93,224,230,.14);';
    bar = document.createElement('div');
    bar.style.cssText = 'position:absolute;inset:0;transform-origin:50% 0;transform:scaleY(0);border-radius:2px;background:linear-gradient(180deg,rgba(93,224,230,.2),#5DE0E6 70%,#fff);box-shadow:0 0 10px rgba(93,224,230,.8);';
    head = document.createElement('div');
    head.style.cssText = 'position:absolute;left:50%;top:0;width:9px;height:9px;margin:-4.5px 0 0 -4.5px;border-radius:50%;background:#fff;box-shadow:0 0 8px 2px #5DE0E6,0 0 22px 6px rgba(93,224,230,.55);';
    rail.appendChild(bar); rail.appendChild(head);
    document.body.appendChild(rail);
  }
  function dust(y, dir) {
    if (reduce) return;
    for (var k = 0; k < 3; k++) {
      var s = document.createElement('div'), sz = 1.5 + Math.random() * 2.5;
      s.style.cssText = 'position:absolute;left:50%;top:' + y + 'px;width:' + sz + 'px;height:' + sz + 'px;margin-left:' + (-sz / 2) + 'px;border-radius:50%;background:' + (Math.random() > .4 ? '#5DE0E6' : '#fff') + ';box-shadow:0 0 6px 1px rgba(93,224,230,.9);';
      rail.appendChild(s);
      var dx = (Math.random() - .5) * 34, dy = -dir * (8 + Math.random() * 26);
      var a = s.animate([{ transform: 'translate(0,0) scale(1)', opacity: 1 }, { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(.2)', opacity: 0 }], { duration: 700 + Math.random() * 700, easing: 'cubic-bezier(.2,.7,.3,1)' });
      a.onfinish = (function (el) { return function () { el.remove(); }; })(s);
    }
  }
  function updateRail(p) {
    ensureBar(); if (!rail) return;
    var h = rail.offsetHeight, y = p * h;
    bar.style.transform = 'scaleY(' + p + ')';
    head.style.transform = 'translateY(' + y + 'px)';
    if (lastP >= 0 && Math.abs(p - lastP) > 0.0005) {
      rail.style.opacity = '1';
      var now = performance.now();
      if (now - lastDust > 40) { lastDust = now; dust(y, p > lastP ? 1 : -1); }
      clearTimeout(hideT);
      hideT = setTimeout(function () { rail.style.opacity = '0'; }, 900);
    }
    lastP = p;
  }

  var ticking = false;
  function tick() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var vh = innerHeight, max = document.documentElement.scrollHeight - vh;
      updateRail(max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0);
      if (reduce) return;
      parallax.forEach(function (img) {
        var host = img.parentElement, r = host.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        var p = (r.top + r.height / 2 - vh / 2) / (vh + r.height);
        img.style.transform = 'translate3d(0,' + (p * -90).toFixed(1) + 'px,0) scale(1.18)';
      });
      drift.forEach(function (d, i) {
        var r = d.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        var p = (r.top - vh / 2) / vh;
        d.style.transform = 'translate3d(' + (p * (i % 2 ? 60 : -60)).toFixed(1) + 'px,0,0)';
      });
    });
  }

  var t;
  function schedule() { clearTimeout(t); t = setTimeout(scan, 120); }
  function start() {
    scan();
    new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
    addEventListener('scroll', tick, { passive: true });
    addEventListener('resize', tick);
    setTimeout(function () { document.querySelectorAll('*').forEach(function (el) { if (el.__lsHidden) { var r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) { io.unobserve(el); play(el); } } }); }, 2500);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
