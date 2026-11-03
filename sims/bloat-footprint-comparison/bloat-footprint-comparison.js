// Resource Footprint Comparison MicroSim (Chart.js)
// CANVAS_HEIGHT: 712
// Learner ranks three measures by ratio (full-featured / single-purpose)
// before the grouped bars and ratios are revealed. All values illustrative.

const MEASURES = [
  { name: 'Install size', unit: 'MB', full: 1200, util: 15,
    why: 'Storage holds every feature, used or not.' },
  { name: 'Idle memory', unit: 'MB', full: 450, util: 30,
    why: 'Both programs must keep something running to catch a hotkey, so the gap is smaller than for storage.' },
  { name: 'Background helper processes', unit: 'count', full: 3, util: 1,
    why: 'Both need one helper for the hotkey. The full product adds an update checker and a sync agent.' }
];

MEASURES.forEach(m => { m.ratio = m.full / m.util; });

// Correct order: largest ratio first; ties keep table order (stable sort).
const CORRECT_ORDER = MEASURES
  .map((m, i) => ({ i, r: m.ratio }))
  .sort((a, b) => (b.r - a.r) || (a.i - b.i))
  .map(o => o.i);

const COLOR_FULL = '#0072B2';   // Okabe-Ito blue
const COLOR_UTIL = '#E69F00';   // Okabe-Ito orange

const selects = [0, 1, 2].map(i => document.getElementById('rank' + i));
const revealBtn = document.getElementById('reveal-btn');
const restartBtn = document.getElementById('restart-btn');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const placeholder = document.getElementById('placeholder');
let chart = null;
let revealed = false;

function fmt(n) { return n.toLocaleString('en-US'); }

function fmtValue(v, unit) {
  return unit === 'count' ? fmt(v) + (v === 1 ? ' helper' : ' helpers') : fmt(v) + ' ' + unit;
}

function wrap(text, width) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  words.forEach(w => {
    if ((line + ' ' + w).trim().length > width) { lines.push(line.trim()); line = w; }
    else line += ' ' + w;
  });
  if (line.trim()) lines.push(line.trim());
  return lines;
}

function fillSelects() {
  selects.forEach(sel => {
    sel.innerHTML = '';
    const ph = document.createElement('option');
    ph.value = '';
    ph.textContent = 'Choose a measure';
    sel.appendChild(ph);
    MEASURES.forEach((m, i) => {
      const o = document.createElement('option');
      o.value = String(i);
      o.textContent = m.name;
      sel.appendChild(o);
    });
    sel.disabled = false;
  });
}

function currentRanking() {
  return selects.map(s => s.value === '' ? null : Number(s.value));
}

function updateRevealState() {
  const r = currentRanking();
  const complete = r.every(v => v !== null);
  const distinct = new Set(r.filter(v => v !== null)).size === r.filter(v => v !== null).length;
  revealBtn.disabled = revealed || !complete || !distinct;
  if (!revealed) {
    if (!distinct) {
      feedbackEl.className = 'feedback';
      feedbackEl.textContent = 'Each measure can appear only once. Pick a different measure for each place.';
    } else {
      feedbackEl.className = 'feedback';
      feedbackEl.textContent = 'Choose a different measure for each place, then press Reveal.';
    }
  }
}

const ratioLabelPlugin = {
  id: 'ratioLabels',
  afterDatasetsDraw(c) {
    const { ctx, scales } = c;
    const yTop = scales.y.getPixelForValue(scales.y.max);
    ctx.save();
    ctx.font = 'bold 16px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#1a1a1a';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    MEASURES.forEach((m, i) => {
      const x = scales.x.getPixelForValue(i);
      ctx.fillText('Ratio ' + fmt(m.ratio) + '×', x, yTop + 2);
    });
    ctx.restore();
  }
};

function buildChart() {
  const ctx = document.getElementById('chart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: MEASURES.map(m => [m.name, '(' + m.unit + ')']),
      datasets: [
        { label: 'Full-featured product', data: MEASURES.map(m => m.full),
          backgroundColor: COLOR_FULL, borderColor: COLOR_FULL, borderWidth: 1 },
        { label: 'Single-purpose utility', data: MEASURES.map(m => m.util),
          backgroundColor: COLOR_UTIL, borderColor: '#9a6a00', borderWidth: 1 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 600 },
      layout: { padding: { top: 4 } },
      scales: {
        y: {
          type: 'logarithmic',
          min: 0.5,
          max: 20000,
          title: { display: true, text: 'Value (log scale: MB or count)', font: { size: 14 } },
          ticks: {
            font: { size: 14 },
            callback: v => [1, 10, 100, 1000].includes(v) ? fmt(v) : ''
          },
          grid: { color: '#e3e8ee' }
        },
        x: { ticks: { font: { size: 14 }, maxRotation: 0, autoSkip: false }, grid: { display: false } }
      },
      plugins: {
        legend: { position: 'bottom', labels: { font: { size: 14 } } },
        tooltip: {
          titleFont: { size: 14 }, bodyFont: { size: 14 }, footerFont: { size: 14, weight: 'normal' },
          callbacks: {
            title: items => MEASURES[items[0].dataIndex].name,
            label: item => {
              const m = MEASURES[item.dataIndex];
              const v = item.datasetIndex === 0 ? m.full : m.util;
              return item.dataset.label + ': ' + fmtValue(v, m.unit);
            },
            footer: items => {
              const m = MEASURES[items[0].dataIndex];
              return ['Ratio: ' + fmt(m.ratio) + '×'].concat(wrap(m.why, 48));
            }
          }
        }
      }
    },
    plugins: [ratioLabelPlugin]
  });
}

function reveal() {
  const r = currentRanking();
  revealed = true;
  selects.forEach(s => { s.disabled = true; });
  revealBtn.disabled = true;
  restartBtn.classList.remove('hidden');

  const correct = r.every((v, i) => v === CORRECT_ORDER[i]);
  feedbackEl.innerHTML = '';
  if (correct) {
    feedbackEl.className = 'feedback good';
    feedbackEl.textContent = 'Correct: storage differs most, helpers least.';
    scoreEl.textContent = 'Ranking correct: 1 of 1';
  } else {
    feedbackEl.className = 'feedback bad';
    const p1 = document.createElement('p');
    p1.innerHTML = '<strong>Not quite.</strong> The correct order is ' +
      CORRECT_ORDER.map(i => MEASURES[i].name + ' (' + fmt(MEASURES[i].ratio) + '×)').join(', then ') + '.';
    feedbackEl.appendChild(p1);
    r.forEach((v, place) => {
      if (v !== CORRECT_ORDER[place]) {
        const p = document.createElement('p');
        p.innerHTML = '<strong>' + MEASURES[v].name + ':</strong> ' + MEASURES[v].why;
        feedbackEl.appendChild(p);
      }
    });
    scoreEl.textContent = 'Ranking correct: 0 of 1';
  }

  placeholder.classList.add('hidden');
  if (!chart) buildChart();
}

function restart() {
  revealed = false;
  if (chart) { chart.destroy(); chart = null; }
  placeholder.classList.remove('hidden');
  restartBtn.classList.add('hidden');
  scoreEl.textContent = 'One attempt';
  fillSelects();
  updateRevealState();
}

selects.forEach(s => s.addEventListener('change', updateRevealState));
revealBtn.addEventListener('click', reveal);
restartBtn.addEventListener('click', restart);

fillSelects();
updateRevealState();

// Keep the page inside its iframe: when feedback text grows (or the iframe
// is narrow), shrink the chart instead of letting the page scroll.
(function () {
  const box = document.querySelector('.chart-box');
  const base = parseInt(box.style.height, 10);
  const min = Math.round(base * 0.5);
  let pending = false;
  function fit() {
    pending = false;
    box.style.height = base + 'px';
    const over = Math.ceil(document.body.getBoundingClientRect().height) - window.innerHeight;
    if (over > 0) box.style.height = Math.max(min, base - over) + 'px';
  }
  function schedule() {
    if (!pending) { pending = true; requestAnimationFrame(fit); }
  }
  new MutationObserver(schedule).observe(document.body, {
    childList: true, subtree: true, characterData: true,
    attributes: true, attributeFilter: ['class']
  });
  window.addEventListener('resize', schedule);
  schedule();
})();
