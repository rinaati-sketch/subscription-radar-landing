// תפריט נגישות: כפתור קבוע בפינה השמאלית התחתונה, ותפריט עם התאמות תצוגה.
// ההגדרות נשמרות בדפדפן של הגולש (localStorage) וחלות על כל עמודי האתר.
(function () {
  const KEY = 'radar_a11y';
  const root = document.documentElement;
  const OPTIONS = [
    { id: 'contrast', label: 'ניגודיות גבוהה' },
    { id: 'gray', label: 'גווני אפור' },
    { id: 'links', label: 'הדגשת קישורים' },
    { id: 'font', label: 'גופן קריא' },
    { id: 'spacing', label: 'ריווח טקסט' },
    { id: 'still', label: 'עצירת אנימציות' },
    { id: 'cursor', label: 'סמן עכבר גדול' }
  ];
  const SIZES = [1, 1.15, 1.3, 1.5];

  let state = { size: 0 };
  try { state = Object.assign(state, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) {}

  const css = `
  .a11y-btn{position:fixed;z-index:60;left:max(16px,env(safe-area-inset-left));bottom:max(16px,env(safe-area-inset-bottom));width:56px;height:56px;border-radius:50%;
    display:flex;align-items:center;justify-content:center;background:var(--purple);color:#fff;border:3px solid var(--ink);box-shadow:4px 4px 0 var(--ink);cursor:pointer;
    transition:transform .12s ease,box-shadow .12s ease}
  .a11y-btn:hover{transform:translate(2px,2px);box-shadow:2px 2px 0 var(--ink)}
  .a11y-btn svg{width:30px;height:30px}
  .a11y-panel{position:fixed;z-index:61;left:max(16px,env(safe-area-inset-left));bottom:calc(max(16px,env(safe-area-inset-bottom)) + 70px);width:min(340px,calc(100vw - 32px));
    max-height:calc(100vh - 110px);overflow:auto;background:#fff;color:var(--ink);border:3px solid var(--ink);border-radius:20px;box-shadow:6px 6px 0 var(--ink);
    padding:18px;font-family:"Rubik",system-ui,sans-serif;direction:rtl;text-align:right}
  .a11y-panel[hidden]{display:none}
  .a11y-head{display:flex;justify-content:space-between;align-items:center;gap:12px}
  .a11y-head h2{font-size:20px;font-weight:900;margin:0}
  .a11y-x{width:40px;height:40px;border-radius:50%;border:2.5px solid var(--ink);background:#fff;color:var(--ink);font:800 20px/1 "Rubik",sans-serif;cursor:pointer}
  .a11y-size{display:flex;align-items:center;gap:8px;margin-top:14px}
  .a11y-size span{flex:1;font-weight:800;font-size:16px}
  .a11y-size button{width:48px;height:44px;border-radius:12px;border:2.5px solid var(--ink);background:var(--field);color:var(--ink);font:900 18px/1 "Rubik",sans-serif;cursor:pointer}
  .a11y-size button:disabled{opacity:.45;cursor:default}
  .a11y-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}
  .a11y-opt{min-height:48px;padding:8px 10px;border-radius:12px;border:2.5px solid var(--ink);background:var(--field);color:var(--ink);font:700 15px/1.25 "Rubik",sans-serif;cursor:pointer;text-align:center}
  .a11y-opt[aria-pressed="true"]{background:var(--purple);color:#fff}
  .a11y-foot{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:14px;flex-wrap:wrap}
  .a11y-reset{min-height:44px;padding:0 16px;border-radius:12px;border:2.5px solid var(--ink);background:var(--lime);color:var(--ink);font:800 15px/1 "Rubik",sans-serif;cursor:pointer}
  .a11y-foot a{color:var(--purple);font-weight:800;font-size:15px;text-decoration:underline;text-underline-offset:3px}
  @media (max-width:600px){.a11y-btn{width:50px;height:50px;box-shadow:3px 3px 0 var(--ink)}.a11y-btn svg{width:26px;height:26px}.a11y-panel{bottom:calc(max(16px,env(safe-area-inset-bottom)) + 64px)}}

  /* ההתאמות עצמן */
  html.a11y-contrast{--bg:#fff;--field:#fff;--muted:var(--ink)}
  html.a11y-contrast .page{filter:contrast(1.15)}
  html.a11y-gray .page{filter:grayscale(1)}
  html.a11y-contrast.a11y-gray .page{filter:grayscale(1) contrast(1.15)}
  html.a11y-links .page a{text-decoration:underline!important;text-decoration-thickness:3px!important;text-underline-offset:4px!important;outline:2px dashed var(--ink);outline-offset:2px}
  html.a11y-font .page,html.a11y-font .page *{font-family:Arial,"Segoe UI",system-ui,sans-serif!important;letter-spacing:normal!important}
  html.a11y-spacing .page p,html.a11y-spacing .page blockquote,html.a11y-spacing .page li,html.a11y-spacing .page label{line-height:1.9!important;letter-spacing:.06em!important;word-spacing:.16em!important}
  html.a11y-still *,html.a11y-still *::before,html.a11y-still *::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}
  html.a11y-cursor,html.a11y-cursor *{cursor:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24'%3E%3Cpath d='M4 2l16 9-7 2-3 7z' fill='%23141120' stroke='white' stroke-width='1.5'/%3E%3C/svg%3E") 4 2,auto!important}
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'a11y-btn';
  btn.setAttribute('aria-label', 'תפריט נגישות');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', 'a11y-panel');
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="4" r="2.2"/><path d="M4 7.6l.5-1.9c2.4.6 4.9.9 7.5.9s5.1-.3 7.5-.9l.5 1.9c-2 .6-4.1.9-6.2 1.1v3.1l2.4 8.6-1.9.5L12 13.6l-2.3 7.3-1.9-.5 2.4-8.6V8.7C8.1 8.5 6 8.2 4 7.6z"/></svg>';

  const panel = document.createElement('div');
  panel.id = 'a11y-panel';
  panel.className = 'a11y-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-labelledby', 'a11y-title');
  panel.hidden = true;
  panel.innerHTML =
    '<div class="a11y-head"><h2 id="a11y-title">תפריט נגישות</h2><button type="button" class="a11y-x" aria-label="סגירת תפריט הנגישות">✕</button></div>' +
    '<div class="a11y-size" role="group" aria-labelledby="a11y-size-l"><span id="a11y-size-l">גודל טקסט</span>' +
    '<button type="button" data-size="-1" aria-label="הקטנת טקסט">א-</button><button type="button" data-size="1" aria-label="הגדלת טקסט">א+</button></div>' +
    '<div class="a11y-grid">' + OPTIONS.map(o => `<button type="button" class="a11y-opt" data-opt="${o.id}" aria-pressed="false">${o.label}</button>`).join('') + '</div>' +
    '<div class="a11y-foot"><button type="button" class="a11y-reset">איפוס הגדרות</button><a href="accessibility.html">הצהרת נגישות</a></div>';

  document.body.appendChild(btn);
  document.body.appendChild(panel);

  function apply() {
    OPTIONS.forEach(o => {
      root.classList.toggle('a11y-' + o.id, !!state[o.id]);
      panel.querySelector(`[data-opt="${o.id}"]`).setAttribute('aria-pressed', String(!!state[o.id]));
    });
    const page = document.querySelector('.page');
    if (page) page.style.zoom = SIZES[state.size] === 1 ? '' : SIZES[state.size];
    panel.querySelector('[data-size="-1"]').disabled = state.size <= 0;
    panel.querySelector('[data-size="1"]').disabled = state.size >= SIZES.length - 1;
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
    document.dispatchEvent(new CustomEvent('a11y:change', { detail: state }));
  }

  function open() {
    panel.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    panel.querySelector('.a11y-x').focus();
  }
  function close() {
    panel.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    btn.focus();
  }

  btn.addEventListener('click', () => panel.hidden ? open() : close());
  panel.querySelector('.a11y-x').addEventListener('click', close);
  panel.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  document.addEventListener('click', e => {
    if (!panel.hidden && !panel.contains(e.target) && !btn.contains(e.target)) { panel.hidden = true; btn.setAttribute('aria-expanded', 'false'); }
  });
  panel.addEventListener('click', e => {
    const opt = e.target.closest('[data-opt]');
    const size = e.target.closest('[data-size]');
    if (opt) state[opt.dataset.opt] = !state[opt.dataset.opt];
    else if (size) state.size = Math.max(0, Math.min(SIZES.length - 1, state.size + Number(size.dataset.size)));
    else if (e.target.closest('.a11y-reset')) state = { size: 0 };
    else return;
    apply();
  });

  apply();
})();
