// ScreenGrab First Install Size Breakdown MicroSim (Chart.js)
// CANVAS_HEIGHT: 552
// Four parts of the first install by line count and share of total,
// followed by four fixed comparison questions (one attempt each).

const PARTS = [
  { name: 'App code (Swift, 19 files)', short: 'App code', lines: 2000, color: '#0072B2' },
  { name: 'Tests (94 automated tests)', short: 'Tests', lines: 1370, color: '#009E73' },
  { name: 'Install and build scripts', short: 'Install and build scripts', lines: 500, color: '#E69F00' },
  { name: 'Specification, design, and README', short: 'Specification, design, and README', lines: 1340, color: '#CC79A7' }
];

const TOTAL = PARTS.reduce((s, p) => s + p.lines, 0); // 5,210
PARTS.forEach(p => { p.share = Math.round(p.lines / TOTAL * 100); });

const QUESTIONS = [
  { q: 'Which part is the largest?',
    choices: ['App code', 'Tests', 'Install and build scripts', 'Specification, design, and README'],
    answer: 'App code',
    why: 'At 2,000 lines it exceeds every other part' },
  { q: 'About what share of the lines are tests?',
    choices: ['10%', '26%', '38%', '50%'],
    answer: '26%',
    why: '1,370 of 5,210 is about 26%' },
  { q: 'How do the test lines compare with the app code lines?',
    choices: ['About one-third', 'About two-thirds', 'About equal', 'About double'],
    answer: 'About two-thirds',
    why: '1,370 divided by 2,000 is about 0.69' },
  { q: 'Which is larger, the install and build scripts or the specification, design, and README?',
    choices: ['Scripts', 'Specification, design, and README', 'Equal'],
    answer: 'Specification, design, and README',
    why: '1,340 lines is more than twice the 500 lines of scripts' }
];

let mode = 'lines';
let qIndex = -1;
let correctCount = 0;
let results = [];
let chart;

const $ = id => document.getElementById(id);
const fmt = n => n.toLocaleString('en-US');

const valueLabelPlugin = {
  id: 'valueLabels',
  afterDatasetsDraw(c) {
    const { ctx } = c;
    const meta = c.getDatasetMeta(0);
    ctx.save();
    ctx.font = 'bold 14px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#1a1a1a';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    meta.data.forEach((bar, i) => {
      const p = PARTS[i];
      const text = mode === 'lines' ? fmt(p.lines) + ' lines' : p.share + '%';
      ctx.fillText(text, bar.x + 6, bar.y);
    });
    ctx.restore();
  }
};

function chartData() {
  return PARTS.map(p => mode === 'lines' ? p.lines : p.share);
}

function buildChart() {
  chart = new Chart($('chart').getContext('2d'), {
    type: 'bar',
    data: {
      labels: PARTS.map(p => p.name),
      datasets: [{
        label: 'Lines',
        data: chartData(),
        backgroundColor: PARTS.map(p => p.color),
        borderWidth: 0,
        barPercentage: 0.75
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 400 },
      layout: { padding: { right: 90 } },
      scales: {
        x: {
          beginAtZero: true,
          max: 2400,
          title: { display: true, text: 'Lines', font: { size: 14 } },
          ticks: { font: { size: 14 }, callback: v => fmt(v) },
          grid: { color: '#e3e8ee' }
        },
        y: {
          ticks: {
            font: { size: 14 },
            callback: function (v) {
              const n = PARTS[v].name;
              return window.innerWidth < 560 ? PARTS[v].short : n;
            }
          },
          grid: { display: false }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          titleFont: { size: 14 }, bodyFont: { size: 14 },
          callbacks: {
            title: items => PARTS[items[0].dataIndex].name,
            label: item => {
              const p = PARTS[item.dataIndex];
              return fmt(p.lines) + ' lines, ' + p.share + '% of 5,210';
            }
          }
        }
      }
    },
    plugins: [valueLabelPlugin]
  });
}

function setMode(m) {
  mode = m;
  $('mode-lines').classList.toggle('active', m === 'lines');
  $('mode-share').classList.toggle('active', m === 'share');
  $('mode-lines').setAttribute('aria-pressed', String(m === 'lines'));
  $('mode-share').setAttribute('aria-pressed', String(m === 'share'));
  const x = chart.options.scales.x;
  if (m === 'lines') {
    x.max = 2400;
    x.title.text = 'Lines';
    x.ticks.callback = v => fmt(v);
    chart.data.datasets[0].label = 'Lines';
  } else {
    x.max = 50;
    x.title.text = 'Share of total (%)';
    x.ticks.callback = v => v + '%';
    chart.data.datasets[0].label = 'Share of total (%)';
  }
  chart.data.datasets[0].data = chartData();
  chart.update();
}

function updateScore() {
  $('score').textContent = 'Correct: ' + correctCount + ' of ' + QUESTIONS.length;
}

function showQuestion() {
  const item = QUESTIONS[qIndex];
  $('question').textContent = 'Question ' + (qIndex + 1) + ' of 4: ' + item.q;
  const box = $('choices');
  box.innerHTML = '';
  item.choices.forEach(choice => {
    const b = document.createElement('button');
    b.textContent = choice;
    b.addEventListener('click', () => answer(choice));
    box.appendChild(b);
  });
  $('feedback').className = 'feedback';
  $('feedback').textContent = 'Choose one answer. You get one attempt.';
  $('next-btn').classList.add('hidden');
}

function answer(choice) {
  const item = QUESTIONS[qIndex];
  const ok = choice === item.answer;
  results[qIndex] = ok;
  if (ok) correctCount++;
  updateScore();
  Array.from($('choices').children).forEach(b => {
    b.disabled = true;
    if (b.textContent === item.answer) b.classList.add('right');
    else if (b.textContent === choice) b.classList.add('wrong');
    else b.classList.add('dim');
  });
  const fb = $('feedback');
  fb.className = 'feedback ' + (ok ? 'good' : 'bad');
  fb.innerHTML = ok
    ? '<strong>Correct.</strong> ' + item.why + '.'
    : '<strong>The answer is ' + item.answer + '.</strong> ' + item.why + '.';
  if (qIndex < QUESTIONS.length - 1) {
    $('next-btn').textContent = 'Next question';
  } else {
    $('next-btn').textContent = 'See my score';
  }
  $('next-btn').classList.remove('hidden');
}

function finish() {
  $('question').textContent = 'All four questions answered.';
  $('choices').innerHTML = '';
  $('next-btn').classList.add('hidden');
  $('restart-btn').classList.remove('hidden');
  const fb = $('feedback');
  const mastered = correctCount >= 3;
  fb.className = 'feedback ' + (mastered ? 'good' : 'bad');
  let html = '<p><strong>Correct: ' + correctCount + ' of 4. ' +
    (mastered ? 'You can read the breakdown.' : 'Take a second look at the chart in both modes, then restart the questions.') +
    '</strong> The app code is the largest part, but it is under 40% of the whole.</p>';
  QUESTIONS.forEach((item, i) => {
    if (!results[i]) {
      html += '<p>Q' + (i + 1) + ': ' + item.answer + '. ' + item.why + '.</p>';
    }
  });
  fb.innerHTML = html;
}

function start() {
  qIndex = 0;
  correctCount = 0;
  results = [];
  updateScore();
  $('start-btn').classList.add('hidden');
  $('restart-btn').classList.add('hidden');
  showQuestion();
}

$('mode-lines').addEventListener('click', () => setMode('lines'));
$('mode-share').addEventListener('click', () => setMode('share'));
$('start-btn').addEventListener('click', start);
$('restart-btn').addEventListener('click', start);
$('next-btn').addEventListener('click', () => {
  if (qIndex < QUESTIONS.length - 1) { qIndex++; showQuestion(); }
  else finish();
});

buildChart();
updateScore();
$('feedback').textContent = 'Hover each bar, switch to Share of total, then press Start questions.';

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
