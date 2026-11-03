// Long Tail of Feature Usage Explorer MicroSim (Chart.js)
// 20 illustrative features sorted by share of users. A threshold marks the
// features used by at least that share; three counting challenges follow.

const FEATURES = [
  ['Grab a region', 92], ['Grab a window', 55], ['Save to a file', 48],
  ['Grab after a delay', 30], ['Draw an arrow', 22], ['Add text', 16],
  ['Custom hotkeys', 12], ['Blur a region', 11], ['Scrolling capture', 9],
  ['Record the screen', 8], ['Extract text from an image', 6],
  ['Upload to a cloud gallery', 5], ['GIF export', 4], ['Team library', 3],
  ['Capture timeline', 3], ['Comments', 2], ['Image compare', 2],
  ['Stamp library', 2], ['Batch rename', 1], ['Plugin interface', 1]
].map(([name, share]) => ({ name, share }));

const CHALLENGES = [
  { t: 50, count: 2, why: 'Only grab a region (92) and grab a window (55) reach 50.' },
  { t: 20, count: 5, why: 'Adding save to a file (48), grab after a delay (30) and draw an arrow (22) gives 5.' },
  { t: 10, count: 8, why: 'Add text (16), custom hotkeys (12) and blur a region (11) bring the count to 8.' }
];
const HINT = 'Not quite. Count the bars that reach the threshold.';

const COLOR_COUNTED = '#0072B2';
const COLOR_OTHER = '#c3ccd6';
const COLOR_NEUTRAL = '#8a9bb0';

const $ = id => document.getElementById(id);
let threshold = 50;
let highlight = true;
let caseIdx = -1;
let attempts = 0;
let correctCount = 0;
let firstTryCount = 0;
let resolved = false;
let chart;

const countAt = t => FEATURES.filter(f => f.share >= t).length;

function barColors() {
  return FEATURES.map(f => !highlight ? COLOR_NEUTRAL : (f.share >= threshold ? COLOR_COUNTED : COLOR_OTHER));
}

const thresholdPlugin = {
  id: 'thresholdLine',
  afterDatasetsDraw(c) {
    const { ctx, chartArea, scales } = c;
    const x = scales.x.getPixelForValue(threshold);
    ctx.save();
    ctx.strokeStyle = '#B03A2E';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(x, chartArea.top);
    ctx.lineTo(x, chartArea.bottom);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.font = 'bold 14px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#B03A2E';
    ctx.textBaseline = 'top';
    const label = 'Threshold ' + threshold + '%';
    const w = ctx.measureText(label).width;
    const lx = x + 6 + w > chartArea.right ? x - 6 - w : x + 6;
    ctx.fillText(label, lx, chartArea.bottom - 20);
    ctx.restore();
  }
};

const valuePlugin = {
  id: 'barValues',
  afterDatasetsDraw(c) {
    const { ctx } = c;
    ctx.save();
    ctx.font = '14px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#1a1a1a';
    ctx.textBaseline = 'middle';
    c.getDatasetMeta(0).data.forEach((bar, i) => {
      ctx.fillText(FEATURES[i].share + '%', bar.x + 4, bar.y);
    });
    ctx.restore();
  }
};

function buildChart() {
  chart = new Chart($('chart').getContext('2d'), {
    type: 'bar',
    data: {
      labels: FEATURES.map((f, i) => (i + 1) + '. ' + f.name),
      datasets: [{ label: 'Share of users (%)', data: FEATURES.map(f => f.share),
        backgroundColor: barColors(), borderWidth: 0, barPercentage: 0.85, categoryPercentage: 0.9 }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 200 },
      scales: {
        x: { min: 0, max: 100,
          title: { display: true, text: 'Share of users (%)', font: { size: 14 } },
          ticks: { font: { size: 14 }, callback: v => v + '%' }, grid: { color: '#e3e8ee' } },
        y: { ticks: { font: { size: 14 }, autoSkip: false }, grid: { display: false } }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          titleFont: { size: 14 }, bodyFont: { size: 14 },
          callbacks: {
            title: items => FEATURES[items[0].dataIndex].name,
            label: item => {
              const f = FEATURES[item.dataIndex];
              let s = 'Used by ' + f.share + '% of users';
              if (highlight) s += f.share >= threshold ? ' (counted)' : ' (below threshold)';
              return s;
            }
          }
        }
      }
    },
    plugins: [thresholdPlugin, valuePlugin]
  });
}

function refresh() {
  $('t-value').textContent = String(threshold);
  $('t-slider').value = String(threshold);
  const n = countAt(threshold);
  $('count-value').textContent = highlight ? n + ' of 20 (' + Math.round(n / 20 * 100) + '%)' : 'hidden';
  chart.data.datasets[0].backgroundColor = barColors();
  chart.update();
}

function setFeedback(html, cls) {
  $('feedback').className = 'feedback' + (cls ? ' ' + cls : '');
  $('feedback').innerHTML = html;
}

function updateScore() { $('score').textContent = 'Correct: ' + correctCount + ' of 3'; }

function loadCase() {
  const c = CHALLENGES[caseIdx];
  threshold = c.t;
  highlight = false;
  attempts = 0;
  resolved = false;
  $('t-slider').disabled = true;
  $('case-label').textContent = 'Challenge ' + (caseIdx + 1) + ' of 3: threshold ' + c.t + '%';
  $('case-label').classList.remove('hidden');
  $('answer-wrap').classList.remove('hidden');
  $('check-btn').classList.remove('hidden');
  $('check-btn').disabled = false;
  $('next-btn').classList.add('hidden');
  $('answer').disabled = false;
  $('answer').value = '';
  setFeedback('How many of the 20 features are used by at least ' + c.t + '% of users? Two attempts.');
  refresh();
  $('answer').focus();
}

function resolve(ok) {
  resolved = true;
  if (ok) correctCount++;
  updateScore();
  highlight = true;
  $('answer').disabled = true;
  $('check-btn').disabled = true;
  $('next-btn').textContent = caseIdx < CHALLENGES.length - 1 ? 'Next challenge' : 'Finish';
  $('next-btn').classList.remove('hidden');
  refresh();
}

function check() {
  if (resolved) return;
  const raw = $('answer').value.trim();
  const v = Number(raw);
  if (raw === '' || !Number.isInteger(v)) { setFeedback('Type a whole number of features, from 0 to 20.'); return; }
  const c = CHALLENGES[caseIdx];
  attempts++;
  if (v === c.count) {
    if (attempts === 1) firstTryCount++;
    setFeedback('Correct: ' + c.count + ' features. ' + c.why, 'good');
    resolve(true);
  } else if (attempts < 2) {
    setFeedback(HINT, 'bad');
    $('answer').select();
  } else {
    setFeedback('The count is ' + c.count + '. ' + c.why, 'bad');
    resolve(false);
  }
}

function finish() {
  caseIdx = -1;
  highlight = true;
  $('t-slider').disabled = false;
  ['case-label', 'answer-wrap', 'check-btn', 'next-btn'].forEach(id => $(id).classList.add('hidden'));
  $('start-btn').textContent = 'Restart challenges';
  $('start-btn').classList.remove('hidden');
  const mastered = firstTryCount === 3;
  setFeedback('<strong>Correct: ' + correctCount + ' of 3' + (mastered ? ', all on the first attempt.' :
    ' (first attempt: ' + firstTryCount + ' of 3).') + '</strong> Now drag the threshold from 1 to 10 to 50 and watch the count fall: 20, then 8, then 2.',
    mastered ? 'good' : '');
  refresh();
}

function startChallenges() {
  caseIdx = 0;
  correctCount = 0;
  firstTryCount = 0;
  updateScore();
  $('start-btn').classList.add('hidden');
  loadCase();
}

$('t-slider').addEventListener('input', e => {
  if (caseIdx >= 0) return;
  threshold = Number(e.target.value);
  refresh();
});
$('start-btn').addEventListener('click', startChallenges);
$('check-btn').addEventListener('click', check);
$('answer').addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
$('next-btn').addEventListener('click', () => {
  if (caseIdx < CHALLENGES.length - 1) { caseIdx++; loadCase(); } else finish();
});

buildChart();
refresh();

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
