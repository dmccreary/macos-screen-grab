// Token Share Versus Cost Share MicroSim (Chart.js)
// Two stacked 100% bars: share of tokens and share of cost for the three
// token types of the whole ScreenGrab session. The learner predicts first.

const TYPES = [
  { name: 'Output', tokens: 325000, price: 20, color: '#D55E00' },
  { name: 'Other new (writes)', tokens: 825000, price: 5, color: '#E69F00' },
  { name: 'Cache reads', tokens: 18900000, price: 0.20, color: '#0072B2' }
];

// Rules: share of tokens = tokens / total tokens; cost = tokens x price / 1e6;
// share of cost = cost / total cost. Shares shown to one decimal.
const TOTAL_TOKENS = TYPES.reduce((s, t) => s + t.tokens, 0);   // 20,050,000
TYPES.forEach(t => { t.cost = t.tokens * t.price / 1e6; });
const TOTAL_COST = TYPES.reduce((s, t) => s + t.cost, 0);        // 14.405
TYPES.forEach(t => {
  t.tokenShare = t.tokens / TOTAL_TOKENS * 100;
  t.costShare = t.cost / TOTAL_COST * 100;
});

const QUESTIONS = [
  { answer: 'Cache reads',
    wrong: 'Cache reads are 18.9 million of 20.05 million tokens, or 94.3%, because the growing history is re-read on almost every turn.' },
  { answer: 'Output',
    wrong: 'Output is only 1.6% of tokens but 45.1% of cost, because each output token costs $20 per million, 100 times a cache read.' }
];

const $ = id => document.getElementById(id);
const pct = v => v.toFixed(1) + '%';
const fmtTokens = n => n.toLocaleString('en-US');
const fmtCost = v => '$' + v.toFixed(2);
let chart = null;
let revealed = false;

function buildQuestions() {
  QUESTIONS.forEach((q, qi) => {
    const fs = $('q' + qi);
    fs.querySelectorAll('.opt').forEach(n => n.remove());
    TYPES.forEach(t => {
      const lab = document.createElement('label');
      lab.className = 'opt';
      const inp = document.createElement('input');
      inp.type = 'radio';
      inp.name = 'q' + qi;
      inp.value = t.name;
      inp.addEventListener('change', updateReveal);
      const span = document.createElement('span');
      span.textContent = t.name;
      const mark = document.createElement('span');
      mark.className = 'mark';
      lab.append(inp, span, mark);
      fs.appendChild(lab);
    });
  });
}

function chosen(qi) {
  const el = document.querySelector('input[name="q' + qi + '"]:checked');
  return el ? el.value : null;
}

function updateReveal() {
  $('reveal-btn').disabled = revealed || chosen(0) === null || chosen(1) === null;
}

const segmentLabelPlugin = {
  id: 'segmentLabels',
  afterDatasetsDraw(c) {
    const { ctx } = c;
    ctx.save();
    ctx.font = 'bold 14px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    c.data.datasets.forEach((ds, di) => {
      c.getDatasetMeta(di).data.forEach((bar, bi) => {
        const width = Math.abs(bar.x - bar.base);
        const text = pct(ds.data[bi]);
        if (width < ctx.measureText(text).width + 8) return;
        ctx.fillStyle = di === 1 ? '#1a1a1a' : 'white';
        ctx.fillText(text, (bar.x + bar.base) / 2, bar.y);
      });
    });
    ctx.restore();
  }
};

function buildChart() {
  chart = new Chart($('chart').getContext('2d'), {
    type: 'bar',
    data: {
      labels: ['Share of tokens', 'Share of cost'],
      datasets: TYPES.map(t => ({
        label: t.name,
        data: [t.tokenShare, t.costShare],
        backgroundColor: t.color,
        borderColor: 'white',
        borderWidth: 1,
        barPercentage: 0.8
      }))
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 600 },
      scales: {
        x: { stacked: true, min: 0, max: 100,
          ticks: { font: { size: 14 }, callback: v => v + '%' },
          grid: { color: '#e3e8ee' } },
        y: { stacked: true, ticks: { font: { size: 14, weight: 'bold' } }, grid: { display: false } }
      },
      plugins: {
        legend: { position: 'bottom', labels: { font: { size: 14 } } },
        tooltip: {
          titleFont: { size: 14 }, bodyFont: { size: 14 },
          callbacks: {
            title: items => items[0].dataset.label,
            label: item => {
              const t = TYPES[item.datasetIndex];
              return item.dataIndex === 0
                ? fmtTokens(t.tokens) + ' tokens, ' + pct(t.tokenShare) + ' of tokens'
                : fmtCost(t.cost) + ', ' + pct(t.costShare) + ' of cost';
            },
            afterLabel: item => {
              const t = TYPES[item.datasetIndex];
              return item.dataIndex === 0
                ? 'Cost: ' + fmtCost(t.cost) + ' (' + pct(t.costShare) + ')'
                : 'Tokens: ' + fmtTokens(t.tokens) + ' (' + pct(t.tokenShare) + ')';
            }
          }
        }
      }
    },
    plugins: [segmentLabelPlugin]
  });
}

function reveal() {
  revealed = true;
  $('reveal-btn').disabled = true;
  $('restart-btn').classList.remove('hidden');
  let n = 0;
  const fb = $('feedback');
  fb.innerHTML = '';
  QUESTIONS.forEach((q, qi) => {
    const pick = chosen(qi);
    const ok = pick === q.answer;
    if (ok) n++;
    $('q' + qi).querySelectorAll('.opt').forEach(lab => {
      const inp = lab.querySelector('input');
      inp.disabled = true;
      const mark = lab.querySelector('.mark');
      if (inp.value === q.answer) { lab.classList.add('right'); mark.textContent = 'correct answer'; }
      else if (inp.value === pick) { lab.classList.add('wrong'); mark.textContent = 'your answer'; }
    });
    const p = document.createElement('p');
    p.innerHTML = '<strong>Q' + (qi + 1) + ':</strong> ' + (ok ? 'Correct: ' + q.answer + '.' : q.wrong);
    fb.appendChild(p);
  });
  fb.className = 'feedback ' + (n === 2 ? 'good' : 'bad');
  $('score').textContent = 'Questions correct: ' + n + ' of 2';
  $('placeholder').classList.add('hidden');
  if (!chart) buildChart();
}

function restart() {
  revealed = false;
  if (chart) { chart.destroy(); chart = null; }
  $('placeholder').classList.remove('hidden');
  $('restart-btn').classList.add('hidden');
  $('score').textContent = 'One attempt per question';
  $('feedback').className = 'feedback';
  $('feedback').textContent = 'Answer both questions, then press Reveal.';
  buildQuestions();
  updateReveal();
}

$('reveal-btn').addEventListener('click', reveal);
$('restart-btn').addEventListener('click', restart);
buildQuestions();
updateReveal();

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
