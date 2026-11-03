// Break-Even Chart for a Generated Tool MicroSim (Chart.js)
// Cumulative cost = K + S * t for a paid subscription and a generated tool.
// The learner calculates the break-even time for three maintenance values.
// All values are illustrative.

const HOUR = 40;                 // value of an hour, $
const SUB_K = 1 * HOUR;          // 1 hour of learning = 40
const SUB_S = 3 * 30 + 0.5 * HOUR; // 90 in fees + 20 in time = 110
const GEN_K = 14 + 1 * HOUR;     // 14 build cost + 1 hour setup = 54
const genS = m => HOUR * m;      // m hours of maintenance per year

const CASES = [
  { m: 1,   model: 0.2, wrong: '(54 - 40) / (110 - 40 x 1) = 14 / 70 = 0.2 years.' },
  { m: 2,   model: 0.5, wrong: '(54 - 40) / (110 - 40 x 2) = 14 / 30 = 0.47, which rounds to 0.5 years.' },
  { m: 2.5, model: 1.4, wrong: '(54 - 40) / (110 - 40 x 2.5) = 14 / 10 = 1.4 years.' }
];
const HINT = 'Not quite. Divide the difference in upfront costs by the difference in yearly costs.';

const COLOR_SUB = '#0072B2';
const COLOR_GEN = '#D55E00';

const $ = id => document.getElementById(id);
let m = 1;
let xMax = 10;
let crossingVisible = false;
let caseIdx = -1;      // -1 = free exploration
let attempts = 0;
let correctCount = 0;
let caseResolved = false;
let chart;

// Exact break-even time, or null when the generated tool is never cheaper.
function breakEven(mVal) {
  const sGen = genS(mVal);
  if (sGen >= SUB_S) return null;
  return (GEN_K - SUB_K) / (SUB_S - sGen);
}
const round1 = v => Math.round(v * 10) / 10;
const money = v => '$' + Math.round(v).toLocaleString('en-US');

function lineData(k, s) {
  return [{ x: 0, y: k }, { x: xMax, y: k + s * xMax }];
}

function yMaxFor(x) { return x === 10 ? 1800 : 400; }

function crossingData() {
  const t = breakEven(m);
  if (!crossingVisible || t === null) return [];
  return [{ x: t, y: SUB_K + SUB_S * t }];
}

const crossLabelPlugin = {
  id: 'crossLabel',
  afterDatasetsDraw(c) {
    const pts = c.getDatasetMeta(2).data;
    if (!pts.length) return;
    const t = breakEven(m);
    const p = pts[0];
    const { ctx, chartArea } = c;
    ctx.save();
    ctx.strokeStyle = '#555';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x, chartArea.bottom);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.font = 'bold 14px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#1a1a1a';
    ctx.textBaseline = 'bottom';
    const label = 'Break-even ' + round1(t).toFixed(1) + ' yr';
    const w = ctx.measureText(label).width;
    let x = p.x + 10;
    if (x + w > chartArea.right) x = p.x - 10 - w;
    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    ctx.fillRect(x - 3, p.y - 58, w + 6, 20);
    ctx.fillStyle = '#1a1a1a';
    ctx.fillText(label, x, p.y - 40);
    ctx.restore();
  }
};

function buildChart() {
  chart = new Chart($('chart').getContext('2d'), {
    type: 'scatter',
    data: {
      datasets: [
        { label: 'Paid subscription (K = $40, S = $110/yr)', data: lineData(SUB_K, SUB_S),
          showLine: true, borderColor: COLOR_SUB, backgroundColor: COLOR_SUB,
          borderWidth: 3, pointRadius: 0, pointHoverRadius: 0 },
        { label: 'Generated tool (K = $54, S = $40 x m/yr)', data: lineData(GEN_K, genS(m)),
          showLine: true, borderColor: COLOR_GEN, backgroundColor: COLOR_GEN,
          borderWidth: 3, borderDash: [8, 4], pointRadius: 0, pointHoverRadius: 0 },
        { label: 'Crossing point', data: [], pointRadius: 7, pointHoverRadius: 9,
          backgroundColor: '#1a1a1a', borderColor: 'white', borderWidth: 2 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 250 },
      interaction: { mode: 'nearest', intersect: false },
      scales: {
        x: { type: 'linear', min: 0, max: xMax,
          title: { display: true, text: 'Years', font: { size: 14 } },
          ticks: { font: { size: 14 } }, grid: { color: '#e3e8ee' } },
        y: { min: 0, max: yMaxFor(xMax),
          title: { display: true, text: 'Cumulative cost ($)', font: { size: 14 } },
          ticks: { font: { size: 14 }, callback: v => '$' + v.toLocaleString('en-US') },
          grid: { color: '#e3e8ee' } }
      },
      plugins: {
        legend: { position: 'top', labels: { font: { size: 14 },
          filter: item => item.datasetIndex < 2 } },
        tooltip: {
          titleFont: { size: 14 }, bodyFont: { size: 14 },
          filter: item => item.datasetIndex === 2,
          callbacks: {
            title: () => 'Crossing point',
            label: item => round1(item.parsed.x).toFixed(1) + ' years, ' + money(item.parsed.y)
          }
        }
      }
    },
    plugins: [crossLabelPlugin]
  });
}

function refresh() {
  $('m-value').textContent = String(m);
  $('m-slider').value = String(m);
  $('s-gen').textContent = money(genS(m));
  const t = breakEven(m);
  if (!crossingVisible) $('be-readout').textContent = 'hidden';
  else $('be-readout').textContent = t === null ? 'never cheaper' : round1(t).toFixed(1) + ' years';

  chart.data.datasets[0].data = lineData(SUB_K, SUB_S);
  chart.data.datasets[1].data = lineData(GEN_K, genS(m));
  chart.data.datasets[2].data = crossingData();
  chart.options.scales.x.max = xMax;
  chart.options.scales.y.max = yMaxFor(xMax);
  chart.update();
}

function setFeedback(text, cls) {
  $('feedback').className = 'feedback' + (cls ? ' ' + cls : '');
  $('feedback').textContent = text;
}

function updateScore() { $('score').textContent = 'Correct: ' + correctCount + ' of 3'; }

function loadCase() {
  const c = CASES[caseIdx];
  m = c.m;
  attempts = 0;
  caseResolved = false;
  crossingVisible = false;
  $('m-slider').disabled = true;
  $('case-label').textContent = 'Case ' + (caseIdx + 1) + ' of 3: m = ' + c.m + ' h/yr';
  $('case-label').classList.remove('hidden');
  $('answer-wrap').classList.remove('hidden');
  $('check-btn').classList.remove('hidden');
  $('next-btn').classList.add('hidden');
  $('answer').value = '';
  $('answer').disabled = false;
  $('check-btn').disabled = false;
  setFeedback('Type the break-even time in years, to one decimal place, and press Check. Two attempts.');
  refresh();
  $('answer').focus();
}

function resolveCase(ok) {
  caseResolved = true;
  if (ok) correctCount++;
  updateScore();
  crossingVisible = true;
  $('answer').disabled = true;
  $('check-btn').disabled = true;
  $('next-btn').textContent = caseIdx < CASES.length - 1 ? 'Next case' : 'Finish';
  $('next-btn').classList.remove('hidden');
  refresh();
}

function check() {
  if (caseResolved) return;
  const raw = $('answer').value.trim();
  const v = parseFloat(raw);
  if (raw === '' || isNaN(v)) { setFeedback('Type a number of years, such as 0.3.'); return; }
  const c = CASES[caseIdx];
  attempts++;
  if (Math.abs(v - c.model) <= 0.1 + 1e-9) {
    setFeedback('Correct: ' + c.model.toFixed(1) + ' years.', 'good');
    resolveCase(true);
  } else if (attempts < 2) {
    setFeedback(HINT, 'bad');
    $('answer').select();
  } else {
    setFeedback(c.wrong, 'bad');
    resolveCase(false);
  }
}

function finish() {
  caseIdx = -1;
  $('m-slider').disabled = false;
  $('case-label').classList.add('hidden');
  $('answer-wrap').classList.add('hidden');
  $('check-btn').classList.add('hidden');
  $('next-btn').classList.add('hidden');
  $('start-btn').textContent = 'Restart challenges';
  $('start-btn').classList.remove('hidden');
  crossingVisible = true;
  setFeedback('Challenges done. Correct: ' + correctCount + ' of 3. Now set m to 3 or more and watch whether the lines ever cross.',
    correctCount === 3 ? 'good' : '');
  refresh();
}

function startChallenges() {
  caseIdx = 0;
  correctCount = 0;
  updateScore();
  $('start-btn').classList.add('hidden');
  loadCase();
}

$('m-slider').addEventListener('input', e => {
  if (caseIdx >= 0) return;
  m = parseFloat(e.target.value);
  crossingVisible = true;
  const t = breakEven(m);
  if (t === null) {
    setFeedback('At m = ' + m + ' the generated tool costs $' + genS(m) +
      ' a year, at least the $110 subscription, so the lines never cross after year 0: never cheaper.');
  } else {
    setFeedback('Break-even = (54 - 40) / (110 - ' + genS(m) + ') = 14 / ' + (SUB_S - genS(m)) +
      ' = ' + round1(t).toFixed(1) + ' years.');
  }
  refresh();
});
$('zoom').addEventListener('change', e => { xMax = Number(e.target.value); refresh(); });
$('start-btn').addEventListener('click', startChallenges);
$('check-btn').addEventListener('click', check);
$('answer').addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
$('next-btn').addEventListener('click', () => {
  if (caseIdx < CASES.length - 1) { caseIdx++; loadCase(); } else finish();
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
