/* =========================================================
   Bouquet Builder
   1. ITEMS      – every flower/charm. Swap the SVGs or labels here.
   2. Inventory  – tiles are generated from ITEMS.
   3. Dragging   – Pointer Events (one code path for mouse + touch).
   4. Finale     – gift box animation, open gift, reveal letter + bouquet, save image.
   ========================================================= */

/* ---------- 1. ITEMS ----------
   width = how wide the item is on the canvas, as % of the wrapper width. */
const ITEMS = [
  { id: 'lotus', label: 'Lotus', note: 'Your favorite', special: true, width: 38,
    svg: `<svg viewBox="0 0 120 135" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 80 C57 105 63 118 60 134" stroke="#8CCB9B" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M60 112 C80 98 98 104 104 116 C88 126 70 122 60 112Z" fill="#A9DDB4"/>
      <g stroke="#E58AB0" stroke-width="2.5" stroke-linejoin="round">
        <path fill="#F7C1DB" transform="rotate(-68 60 85)" d="M60 85 C40 75 38 40 60 18 C82 40 80 75 60 85Z"/>
        <path fill="#F7C1DB" transform="rotate(68 60 85)" d="M60 85 C40 75 38 40 60 18 C82 40 80 75 60 85Z"/>
        <path fill="#F9A8C9" transform="rotate(-36 60 85)" d="M60 85 C40 75 38 40 60 18 C82 40 80 75 60 85Z"/>
        <path fill="#F9A8C9" transform="rotate(36 60 85)" d="M60 85 C40 75 38 40 60 18 C82 40 80 75 60 85Z"/>
        <path fill="#FFD3E6" d="M60 88 C38 78 36 40 60 12 C84 40 82 78 60 88Z"/>
      </g>
      <path d="M60 30 C54 48 55 64 60 76" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>
      <g fill="#FFD966"><circle cx="52" cy="82" r="3.5"/><circle cx="60" cy="85" r="3.5"/><circle cx="68" cy="82" r="3.5"/></g>
      <path d="M100 18 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5Z" fill="#FFE59A"/>
      <path d="M16 30 l2 4.5 4.5 2 -4.5 2 -2 4.5 -2 -4.5 -4.5 -2 4.5 -2Z" fill="#FFE59A"/>
    </svg>` },

  { id: 'tulip', label: 'Tulip', width: 20,
    svg: `<svg viewBox="0 0 80 130" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 66 C38 90 42 110 40 129" stroke="#8CCB9B" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M40 112 C20 100 12 82 16 70 C32 78 40 96 40 112Z" fill="#A9DDB4"/>
      <path d="M16 22 C12 56 24 72 40 72 C56 72 68 56 64 22 C54 36 48 30 40 14 C32 30 26 36 16 22Z" fill="#FF9DB8" stroke="#E9779F" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M40 14 C30 34 28 56 40 72 C52 56 50 34 40 14Z" fill="#FFC1D3"/>
      <circle cx="33" cy="52" r="2" fill="#5B3A5E"/><circle cx="47" cy="52" r="2" fill="#5B3A5E"/>
      <path d="M37 57 Q40 60 43 57" stroke="#5B3A5E" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    </svg>` },

  { id: 'sunflower', label: 'Sunflower', width: 26,
    svg: `<svg viewBox="0 0 100 135" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 78 C48 100 52 118 50 134" stroke="#8CCB9B" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M50 108 C70 96 86 100 90 112 C74 122 58 118 50 108Z" fill="#A9DDB4"/>
      <g fill="#FFD966" stroke="#F2B93B" stroke-width="2">
        ${[0,30,60,90,120,150].map(a => `<ellipse cx="50" cy="40" rx="9" ry="26" transform="rotate(${a} 50 44)"/>`).join('')}
      </g>
      <circle cx="50" cy="44" r="17" fill="#A9714B" stroke="#8B5A3A" stroke-width="2.5"/>
      <circle cx="44" cy="41" r="2.2" fill="#3D2530"/><circle cx="56" cy="41" r="2.2" fill="#3D2530"/>
      <path d="M45 48 Q50 53 55 48" stroke="#3D2530" stroke-width="2" fill="none" stroke-linecap="round"/>
      <circle cx="40" cy="47" r="2.6" fill="#F9A8C9" opacity=".8"/><circle cx="60" cy="47" r="2.6" fill="#F9A8C9" opacity=".8"/>
    </svg>` },

  { id: 'matcha', label: 'Matcha', width: 17,
    svg: `<svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 10 q-6 8 0 14 M45 6 q-6 8 0 14 M60 10 q-6 8 0 14" stroke="#CFE9D6" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M66 40 C84 38 84 62 64 62" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M66 40 C84 38 84 62 64 62" stroke="#E5D9F7" stroke-width="2" fill="none"/>
      <path d="M14 34 H70 C70 62 60 74 42 74 C24 74 14 62 14 34Z" fill="#fff" stroke="#E5D9F7" stroke-width="2.5"/>
      <ellipse cx="42" cy="34" rx="28" ry="7" fill="#A8D5A2" stroke="#8CC187" stroke-width="2"/>
      <ellipse cx="42" cy="82" rx="30" ry="5" fill="#F7C1DB"/>
      <circle cx="32" cy="54" r="2.2" fill="#5B3A5E"/><circle cx="52" cy="54" r="2.2" fill="#5B3A5E"/>
      <path d="M38 58 Q42 62 46 58" stroke="#5B3A5E" stroke-width="2" fill="none" stroke-linecap="round"/>
      <circle cx="26" cy="59" r="3" fill="#F9A8C9" opacity=".7"/><circle cx="58" cy="59" r="3" fill="#F9A8C9" opacity=".7"/>
    </svg>` },

  { id: 'cake', label: 'Cake', width: 20,
    svg: `<svg viewBox="0 0 100 90" xmlns="http://www.w3.org/2000/svg">
      <circle cx="68" cy="14" r="7" fill="#FF6F91"/><path d="M68 8 q4 -6 9 -6" stroke="#8CCB9B" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M8 74 V34 L90 34 V74 Q90 80 84 80 H14 Q8 80 8 74Z" fill="#FFE9D6" stroke="#E8C4A6" stroke-width="2.5" stroke-linejoin="round"/>
      <rect x="8" y="50" width="82" height="9" fill="#8B5A4A"/>
      <path d="M6 36 Q6 24 18 24 H80 Q94 24 94 38 Q88 46 82 38 Q76 48 68 38 Q60 48 52 38 Q44 48 36 38 Q28 48 20 38 Q12 46 6 36Z" fill="#7B4A3A" stroke="#5E372B" stroke-width="2" stroke-linejoin="round"/>
      <circle cx="34" cy="68" r="2.2" fill="#5B3A5E"/><circle cx="64" cy="68" r="2.2" fill="#5B3A5E"/>
      <path d="M45 70 Q49 74 53 70" stroke="#5B3A5E" stroke-width="2" fill="none" stroke-linecap="round"/>
    </svg>` },

  { id: 'moon', label: 'Moon', width: 15,
    svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 8 A32 32 0 1 0 72 50 A25 25 0 0 1 50 8Z" fill="#FFE8A3" stroke="#F4CE6A" stroke-width="3" stroke-linejoin="round"/>
      <path d="M22 44 q4 4 8 0 M30 56 q4 3 7 0" stroke="#5B3A5E" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <circle cx="22" cy="53" r="3" fill="#F9A8C9" opacity=".7"/>
      <path d="M64 14 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2Z" fill="#FFD966"/>
    </svg>` }
];

/* ---------- Helpers ---------- */
const $ = s => document.querySelector(s);
const stage = $('#stage'), layer = $('#items'), inventory = $('#inventory'), hint = $('#hint');
const MAX_Z = 4900;               // keeps items below the front wrapper (z-index 5000)
let z = 1;
const rand = n => (Math.random() - .5) * n;
const stageRect = () => stage.getBoundingClientRect();
const inside = (r, x, y) => x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
const toPct = (r, x, y) => [(x - r.left) / r.width * 100, (y - r.top) / r.height * 100];
const count = () => layer.children.length;
const say = t => (hint.textContent = t);

/* ---------- 2. Inventory ---------- */
ITEMS.forEach(item => {
  const tile = document.createElement('button');
  tile.type = 'button';
  tile.className = 'tile' + (item.special ? ' special' : '');
  tile.setAttribute('aria-label', 'Add ' + item.label + ' to the bouquet');
  const art = `<span class="art">${item.svg}</span>`;
  tile.innerHTML = item.special
    ? `${art}<span class="text"><span class="name">${item.label}</span><span class="note">${item.note}</span></span>`
    : `${art}<span class="name">${item.label}</span>`;
  inventory.append(tile);
  wireTile(tile, item);
});

/* ---------- 3a. Drag from inventory ---------- */
function wireTile(tile, item) {
  tile.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    e.preventDefault();
    tile.setPointerCapture(e.pointerId);
    const sx = e.clientX, sy = e.clientY;
    let ghost = null;

    const move = ev => {
      if (!ghost) {
        if (Math.hypot(ev.clientX - sx, ev.clientY - sy) < 6) return;   // below threshold = still a tap
        ghost = document.createElement('div');
        ghost.className = 'ghost';
        ghost.style.width = stageRect().width * item.width / 100 + 'px';
        ghost.innerHTML = item.svg;
        document.body.append(ghost);
      }
      ghost.style.left = ev.clientX + 'px';
      ghost.style.top = ev.clientY + 'px';
      stage.classList.toggle('hot', inside(stageRect(), ev.clientX, ev.clientY));
    };
    const end = (ev, drop) => {
      tile.removeEventListener('pointermove', move);
      tile.removeEventListener('pointerup', up);
      tile.removeEventListener('pointercancel', cancel);
      stage.classList.remove('hot');
      if (drop) {
        const r = stageRect();
        if (!ghost) addItem(item, 50 + rand(30), 34 + rand(16));              // tap: drop near the middle
        else if (inside(r, ev.clientX, ev.clientY)) addItem(item, ...toPct(r, ev.clientX, ev.clientY));
      }
      if (ghost) ghost.remove();
    };
    const up = ev => end(ev, true);
    const cancel = ev => end(ev, false);
    tile.addEventListener('pointermove', move);
    tile.addEventListener('pointerup', up);
    tile.addEventListener('pointercancel', cancel);
  });

  // Keyboard users: Enter/Space fires a click with detail 0
  tile.addEventListener('click', e => { if (e.detail === 0) addItem(item, 50 + rand(30), 34 + rand(16)); });
}

/* ---------- 3b. Placed items: create + re-drag + drag-out-to-remove ---------- */
function addItem(item, xPct, yPct) {
  const el = document.createElement('div');
  el.className = 'placed';
  el.style.width = item.width + '%';
  el.style.left = xPct + '%';
  el.style.top = yPct + '%';
  el.style.zIndex = Math.min(++z, MAX_Z);
  el.innerHTML = item.svg;
  layer.append(el);
  wirePlaced(el);
  say(count() + (count() === 1 ? ' bloom' : ' blooms') + ' in the bouquet. Drag one to move it.');
}

function wirePlaced(el) {
  el.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    e.preventDefault();
    el.setPointerCapture(e.pointerId);
    el.classList.add('dragging');
    el.style.zIndex = Math.min(++z, MAX_Z);                                    // bring to front
    const r = stageRect(), box = el.getBoundingClientRect();
    const offX = e.clientX - (box.left + box.width / 2);                        // grab offset from item center
    const offY = e.clientY - (box.top + box.height / 2);

    const move = ev => {
      const [x, y] = toPct(stageRect(), ev.clientX - offX, ev.clientY - offY);
      el.style.left = x + '%';
      el.style.top = y + '%';
      stage.classList.toggle('hot', inside(r, ev.clientX, ev.clientY));
    };
    const finish = (ev, keep) => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', cancel);
      el.classList.remove('dragging');
      stage.classList.remove('hot');
      if (!keep || !inside(stageRect(), ev.clientX, ev.clientY)) {              // dropped outside = remove
        el.classList.add('poof');
        setTimeout(() => { el.remove(); say('Removed. ' + count() + ' left.'); }, 200);
      }
    };
    const up = ev => finish(ev, true);
    const cancel = ev => finish(ev, true);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', cancel);
  });
}

$('#clear').addEventListener('click', () => { layer.innerHTML = ''; say('Fresh wrapper. Pick your blooms!'); });

/* ---------- 4. Gift box → reveal → save image ---------- */
const shelf = $('#shelf'), canvasActions = $('#canvas-actions'), app = $('#app');
const giftScene = $('#gift-scene'), giftBox = $('#gift-box'), openGiftBtn = $('#open-gift');
const revealView = $('#reveal-view'), revealHost = $('#reveal-bouquet'), memoryCapture = $('#memory-capture');
const GIFT_DROP_MS = 1400;
const GIFT_CLOSE_MS = 2200;
let bouquetSnapshot = null;

function snapshotBouquet() {
  bouquetSnapshot = stage.cloneNode(true);
  bouquetSnapshot.removeAttribute('id');
  bouquetSnapshot.classList.remove('hot', 'glow');
  bouquetSnapshot.querySelectorAll('.placed').forEach(el => {
    el.classList.remove('dragging');
  });
}

function pinStageForGift() {
  const r = stage.getBoundingClientRect();
  stage.classList.add('gift-pinned');
  stage.style.width = r.width + 'px';
  stage.style.height = r.height + 'px';
  stage.style.left = r.left + 'px';
  stage.style.top = r.top + 'px';
}

function resetStagePin() {
  stage.classList.remove('gift-pinned', 'gift-drop', 'gift-hidden');
  stage.style.width = '';
  stage.style.height = '';
  stage.style.left = '';
  stage.style.top = '';
}

function startGiftSequence() {
  shelf.hidden = true;
  canvasActions.hidden = true;
  hint.hidden = true;
  app.classList.add('builder-finished');

  snapshotBouquet();
  pinStageForGift();
  giftScene.hidden = false;
  void giftScene.offsetWidth;
  giftScene.classList.add('active');

  requestAnimationFrame(() => {
    requestAnimationFrame(() => stage.classList.add('gift-drop'));
  });

  setTimeout(() => {
    stage.classList.add('gift-hidden');
    giftBox.classList.add('closed');
  }, GIFT_DROP_MS);

  setTimeout(() => {
    openGiftBtn.hidden = false;
    openGiftBtn.focus();
  }, GIFT_CLOSE_MS);
}

function cloneBouquetForReveal() {
  revealHost.innerHTML = '';
  const clone = (bouquetSnapshot || stage).cloneNode(true);
  clone.classList.remove('gift-pinned', 'gift-drop', 'gift-hidden', 'hot', 'glow');
  clone.classList.add('reveal-stage');
  clone.querySelectorAll('.placed').forEach(el => {
    el.classList.remove('dragging');
    el.style.pointerEvents = 'none';
  });
  revealHost.append(clone);
}

function showRevealView() {
  cloneBouquetForReveal();
  resetStagePin();

  giftScene.classList.remove('active');
  giftScene.hidden = true;
  openGiftBtn.hidden = true;
  giftBox.classList.remove('closed', 'opening');

  revealView.hidden = false;
  void revealView.offsetWidth;
  revealView.classList.add('open');
  $('#save-memory').focus();
}

function openGift() {
  giftBox.classList.add('opening');
  openGiftBtn.disabled = true;
  setTimeout(showRevealView, 900);
}

async function saveMemoryImage() {
  const btn = $('#save-memory');
  if (typeof html2canvas !== 'function') {
    say('Could not load image capture. Check your connection and refresh.');
    return;
  }
  btn.disabled = true;
  const prev = btn.textContent;
  btn.textContent = 'Saving…';
  try {
    const canvas = await html2canvas(memoryCapture, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#FFF8F3',
      logging: false
    });
    const link = document.createElement('a');
    link.download = 'our-memory.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  } finally {
    btn.disabled = false;
    btn.textContent = prev;
  }
}

$('#finish').addEventListener('click', () => {
  if (!count()) { say('Add a bloom or two first!'); return; }
  startGiftSequence();
});
openGiftBtn.addEventListener('click', openGift);
$('#save-memory').addEventListener('click', saveMemoryImage);
