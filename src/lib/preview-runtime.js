// Aperçu des couleurs et du nom : exécuté dans <head> avant l'affichage (pas de clignotement).
// État lu dans l'URL (?p=ff9466&s=6b4430&nom=chateau-gonflable) ou mémorisé dans ce navigateur.
(function () {
  var KEY = 'rebondi-preview';
  var VARS = ['accent', 'on-accent', 'accent-ink', 'accent-soft', 'meadow', 'cream', 'forest', 'ink', 'muted', 'line'];
  var W = [255, 255, 255], K = [0, 0, 0];

  function rgb(h) {
    h = String(h).replace('#', '');
    if (h.length === 3) h = h.replace(/./g, '$&$&');
    return [0, 2, 4].map(function (i) { return parseInt(h.slice(i, i + 2), 16) || 0; });
  }
  function hex(c) { return '#' + c.map(function (v) { return ('0' + Math.round(v).toString(16)).slice(-2); }).join(''); }
  function lum(c) {
    var a = c.map(function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  }
  function contrast(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
  function mix(a, b, t) { return a.map(function (v, i) { return v + (b[i] - v) * t; }); }
  // Assombrit `c` jusqu'à atteindre le contraste voulu contre `bg`
  function darken(c, bg, target) {
    for (var t = 0, x = c; t <= 1; t += 0.02) { x = mix(c, K, t); if (contrast(x, bg) >= target) return x; }
    return K;
  }

  // Assombrit (vers le noir) ou éclaircit (vers le blanc) `c` jusqu'au contraste voulu contre tous les fonds
  function adjust(c, bgs, target, toward) {
    for (var t = 0; t <= 1.001; t += 0.02) {
      var x = mix(c, toward, t);
      if (bgs.every(function (b) { return contrast(x, b) >= target; })) return x;
    }
    return toward;
  }

  function build(p, s) {
    var P = rgb(p), S = rgb(s);
    var cream = mix(S, W, 0.92);
    var soft = mix(P, W, 0.85);
    var ink = darken(mix(S, K, 0.2), W, 13);
    // Bouton : texte blanc ou foncé, le plus lisible ; si aucun n'atteint 4,5:1, on ajuste la teinte du bouton
    var on = contrast(P, W) >= contrast(P, ink) ? W : ink;
    var accent = contrast(P, on) >= 4.6 ? P : adjust(P, [on], 4.6, on === W ? K : W);
    var muted = mix(ink, W, 0.35);
    while (contrast(muted, cream) < 5) muted = mix(muted, ink, 0.2);
    return {
      accent: hex(accent), 'on-accent': hex(on),
      'accent-ink': hex(adjust(P, [W, cream, soft], 4.7, K)),
      'accent-soft': hex(soft), meadow: hex(mix(P, W, 0.5)),
      cream: hex(cream), forest: hex(darken(S, W, 8)), ink: hex(ink),
      muted: hex(muted), line: hex(mix(S, W, 0.82)),
    };
  }

  function applyColors(state) {
    var st = document.documentElement.style;
    if (!state.p || !state.s) { VARS.forEach(function (v) { st.removeProperty('--color-' + v); }); return; }
    var v = build(state.p, state.s);
    for (var k in v) st.setProperty('--color-' + k, v[k]);
  }

  function read() {
    var state = {};
    try { state = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) {}
    var q = new URLSearchParams(location.search);
    var ok = function (x) { return /^[0-9a-f]{6}$/i.test(x || ''); };
    if (ok(q.get('p')) && ok(q.get('s'))) { state.p = '#' + q.get('p'); state.s = '#' + q.get('s'); state.preset = q.get('palette') || ''; }
    if (q.get('nom')) state.brand = q.get('nom');
    return state;
  }
  function save(state) { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }

  var state = read();
  save(state);
  applyColors(state);
  window.RebondiPreview = { state: state, build: build, applyColors: applyColors, save: save };
})();
