// Session Cost Estimator
// CANVAS_HEIGHT: 692
// Other new tokens = new tokens including output - output tokens
// Cost per type    = tokens x price / 1,000,000
// Total            = output cost + other new cost + cache read cost
// Amounts are rounded half up to the nearest cent for display; the total is
// computed before rounding (stage 2 is 7.695 -> $7.70, stage 3 is 14.405 -> $14.41).
// Prices are book assumptions: check current vendor pricing.

// ---- canvas layout ----
let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 192;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;
let actionRowHeight = 38;
let cellHeight = 48;

const STAGES = [
  { name: 'Built and installed', newTokens: 500000, output: 206000, reads: 3800000,
    wrong: 'Other new = 500,000 - 206,000 = 294,000 tokens x $5 per million = $1.47. Add output $4.12 and reads $0.76.' },
  { name: 'First real grab', newTokens: 573000, output: 238000, reads: 6300000,
    wrong: 'Other new = 573,000 - 238,000 = 335,000 tokens x $5 per million = $1.675, shown as $1.68. Add output $4.76 and reads $1.26.' },
  { name: 'Whole session', newTokens: 1150000, output: 325000, reads: 18900000,
    wrong: 'Other new = 1,150,000 - 325,000 = 825,000 tokens x $5 per million = $4.125, shown as $4.13. Add output $6.50 and reads $3.78.' }
];

const DEFAULT_PRICES = { output: 20, other: 5, reads: 0.20 };

const INPUTS = [
  { key: 'output', label: 'Output price', min: 5, max: 30, step: 1, def: 20 },
  { key: 'other', label: 'Other new price', min: 1, max: 10, step: 1, def: 5 },
  { key: 'reads', label: 'Cache read price', min: 0.05, max: 1, step: 0.05, def: 0.20 }
];

const COLORS = { output: '#e15759', other: '#f28e2b', reads: '#4e79a7' };

let sliders = {};
let answerInput, checkButton, nextButton, restartButton;

let mode = 'challenge';       // 'challenge' | 'explore'
let stageIndex = 0;
let attempt = 1;
let stageState = 'answering'; // 'answering' | 'correct' | 'missed'
let correctCount = 0;
let lastGuess = null;
let feedback = '';
let feedbackColor = '#333';
let summary = '';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Arial');

  for (const spec of INPUTS) {
    sliders[spec.key] = createSlider(spec.min, spec.max, spec.def, spec.step);
  }

  answerInput = createInput('');
  answerInput.attribute('inputmode', 'decimal');
  answerInput.attribute('placeholder', '0.00');
  answerInput.elt.addEventListener('keydown', e => { if (e.key === 'Enter') checkAnswer(); });

  checkButton = createButton('Check');
  checkButton.mousePressed(checkAnswer);
  nextButton = createButton('Next stage');
  nextButton.mousePressed(nextStage);
  restartButton = createButton('Restart stages');
  restartButton.mousePressed(restartStages);

  positionControls();
  loadStage();

  describe('Session cost estimator for the three ScreenGrab session stages. Each stage row shows two bars: the share of tokens by type and the share of cost by type, for output, other new tokens, and cache reads, with the stage total. The learner types the total cost of each stage at the default prices, then free exploration unlocks three price sliders.');
}

function draw() {
  noStroke();
  fill('aliceblue');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);
  stroke('silver');
  noFill();
  rect(0, 0, canvasWidth - 1, canvasHeight - 1);
  line(0, drawHeight, canvasWidth, drawHeight);

  const prices = readPrices();
  const w = canvasWidth - 2 * margin;

  noStroke();
  fill('#1a3a6c');
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(20);
  text('Session Cost Estimator', canvasWidth / 2, 10);
  textStyle(NORMAL);

  const q = mode === 'challenge'
    ? 'Stage ' + (stageIndex + 1) + ': What would this stage have cost at API prices?'
    : 'Change a price: which one moves the totals most?';
  let y = drawQuestion(q, 38);

  textSize(14);
  fill('#555');
  textAlign(CENTER, TOP);
  let priceLine = 'Prices per million tokens: output $' + prices.output.toFixed(2) +
    ', other new $' + prices.other.toFixed(2) + ', cache reads $' + prices.reads.toFixed(2);
  if (textWidth(priceLine) > w) {
    priceLine = 'Per 1M: output $' + prices.output.toFixed(2) + ', other $' + prices.other.toFixed(2) +
      ', reads $' + prices.reads.toFixed(2);
  }
  text(priceLine, canvasWidth / 2, y);
  fill('#a15c00');
  text('Book assumptions: check current vendor pricing.', canvasWidth / 2, y + 18);
  y += 44;

  // legend
  let lx = margin;
  textAlign(LEFT, TOP);
  textSize(14);
  for (const [key, label] of [['output', 'Output'], ['other', 'Other new'], ['reads', 'Cache reads']]) {
    fill(COLORS[key]);
    rect(lx, y + 2, 12, 12, 2);
    fill('#222');
    text(label, lx + 17, y);
    lx += textWidth(label) + 40;
  }
  y += 24;

  // stage rows
  for (let i = 0; i < STAGES.length; i++) {
    drawStageRow(i, prices, y);
    y += 62;
  }

  // detail and feedback panel
  y += 2;
  textAlign(LEFT, TOP);
  if (mode === 'challenge') {
    const s = STAGES[stageIndex];
    fill('#222');
    textSize(15);
    text('Stage ' + (stageIndex + 1) + ' tokens: new including output ' + fmtInt(s.newTokens) +
      ', output ' + fmtInt(s.output) + ', cache reads ' + fmtInt(s.reads), margin, y, w, 40);
    y += textWidth('Stage 1 tokens: new including output 1,150,000, output 325,000, cache reads 18,900,000') > w ? 40 : 22;
    textSize(14);
    fill('#333');
    text('Attempt ' + attempt + ' of 2     Stages correct: ' + correctCount + ' of 3', margin, y);
    y += 20;
    textSize(15);
    fill(feedbackColor);
    let fb = feedback;
    if (stageState !== 'answering') {
      const c = stageCosts(s, DEFAULT_PRICES);
      fb += '\nOutput $' + cents(c.output) + ' + other new $' + cents(c.other) + ' + cache reads $' +
        cents(c.reads) + ' = $' + cents(c.total) + '     Your answer: $' + lastGuess.toFixed(2);
    }
    text(fb, margin, y, w, drawHeight - y - 4);
  } else {
    fill('#333');
    textSize(15);
    text(summary, margin, y, w, drawHeight - y - 4);
  }

  drawControlLabels(prices);
}

function drawStageRow(i, prices, y) {
  const s = STAGES[i];
  const shown = mode === 'explore' || i < stageIndex || (i === stageIndex && stageState !== 'answering');
  const current = mode === 'challenge' && i === stageIndex;
  const w = canvasWidth - 2 * margin;

  if (current) {
    noStroke();
    fill(255, 244, 200);
    rect(margin - 6, y - 4, w + 12, 58, 4);
  }
  noStroke();
  fill('#222');
  textAlign(LEFT, TOP);
  textSize(15);
  textStyle(BOLD);
  text((i + 1) + '. ' + s.name, margin, y);
  textStyle(NORMAL);

  const c = stageCosts(s, prices);
  textAlign(RIGHT, TOP);
  textSize(16);
  textStyle(BOLD);
  fill('#1a3a6c');
  text(shown ? '$' + cents(c.total) : '$ ?', canvasWidth - margin, y);
  textStyle(NORMAL);

  const labelW = 60;
  const barX = margin + labelW;
  const barW = canvasWidth - barX - margin;
  fill('#555');
  textSize(14);
  textAlign(LEFT, TOP);
  text('tokens', margin, y + 18);
  text('cost', margin, y + 36);

  // token share bar (always visible: the counts are given)
  const other = s.newTokens - s.output;
  const totalTokens = s.output + other + s.reads;
  drawShareBar(barX, y + 20, barW, [s.output / totalTokens, other / totalTokens, s.reads / totalTokens]);

  // cost share bar
  if (shown) {
    drawShareBar(barX, y + 38, barW, [c.output / c.total, c.other / c.total, c.reads / c.total]);
  } else {
    fill('#ddd');
    rect(barX, y + 38, barW, 14, 2);
  }
}

function drawShareBar(x, y, w, shares) {
  const keys = ['output', 'other', 'reads'];
  let cx = x;
  for (let k = 0; k < 3; k++) {
    const sw = w * shares[k];
    fill(COLORS[keys[k]]);
    noStroke();
    rect(cx, y, sw, 14);
    if (sw > 44) {
      fill('white');
      textAlign(CENTER, CENTER);
      textSize(12);
      text(Math.round(shares[k] * 100) + '%', cx + sw / 2, y + 7);
    }
    cx += sw;
  }
}

function drawQuestion(q, y) {
  textSize(16);
  fill('#222');
  noStroke();
  const w = canvasWidth - 2 * margin;
  textAlign(CENTER, TOP);
  if (textWidth(q) <= w) {
    text(q, canvasWidth / 2, y);
    return y + 26;
  }
  textSize(15);
  if (textWidth(q) <= w) {
    text(q, canvasWidth / 2, y);
    return y + 26;
  }
  text(q, margin, y, w, 44);
  return y + 44;
}

function drawControlLabels(prices) {
  noStroke();
  textSize(14);
  textAlign(LEFT, CENTER);
  fill(mode === 'challenge' && stageState === 'answering' ? '#222' : '#999');
  text('Your total: $', margin, drawHeight + 8 + 13);

  if (mode === 'challenge') {
    fill('#777');
    text('Price sliders unlock after stage 3.', margin, drawHeight + 8 + actionRowHeight + 13);
  }

  const g = gridGeometry();
  fill(mode === 'explore' ? '#222' : '#999');
  textAlign(LEFT, BASELINE);
  for (let i = 0; i < INPUTS.length; i++) {
    const spec = INPUTS[i];
    const x = margin + (i % g.cols) * g.colW;
    const y = g.top + Math.floor(i / g.cols) * cellHeight + 14;
    textStyle(NORMAL);
    text(spec.label + ': ', x, y);
    textStyle(BOLD);
    text('$' + prices[spec.key].toFixed(2) + ' per 1M', x + textWidth(spec.label + ': ') + 2, y);
  }
  textStyle(NORMAL);
}

// ---- model ----
function stageCosts(s, prices) {
  const output = s.output * prices.output / 1e6;
  const other = (s.newTokens - s.output) * prices.other / 1e6;
  const reads = s.reads * prices.reads / 1e6;
  return { output, other, reads, total: output + other + reads };
}

// Round half up to the nearest cent; the small epsilon fixes binary float cases such as 14.405.
function roundCents(x) {
  return Math.round(x * 100 + 1e-7) / 100;
}

function cents(x) {
  return roundCents(x).toFixed(2);
}

function fmtInt(n) {
  return n.toLocaleString('en-US');
}

function readPrices() {
  const p = {};
  for (const spec of INPUTS) p[spec.key] = Math.round(Number(sliders[spec.key].value()) * 100) / 100;
  return p;
}

// ---- challenge flow ----
function loadStage() {
  for (const spec of INPUTS) sliders[spec.key].value(DEFAULT_PRICES[spec.key]);
  attempt = 1;
  stageState = 'answering';
  lastGuess = null;
  feedback = 'Type the total estimated cost in dollars and press Check.';
  feedbackColor = '#333';
  answerInput.value('');
  updateControls();
}

function parseMoney(s) {
  const cleaned = String(s).replace(/[$,\s]/g, '');
  if (cleaned === '' || isNaN(Number(cleaned))) return null;
  return Number(cleaned);
}

function workedText(s) {
  const c = stageCosts(s, DEFAULT_PRICES);
  return 'Model total: $' + cents(c.total) + '. Output ' + fmtInt(s.output) + ' x $20 per million = $' + cents(c.output) +
    '; other new ' + fmtInt(s.newTokens - s.output) + ' x $5 per million = $' + cents(c.other) +
    '; cache reads ' + fmtInt(s.reads) + ' x $0.20 per million = $' + cents(c.reads) + '.';
}

function checkAnswer() {
  if (mode !== 'challenge' || stageState !== 'answering') return;
  const guess = parseMoney(answerInput.value());
  if (guess === null) {
    feedback = 'Type a dollar amount, such as 5.25.';
    feedbackColor = '#a15c00';
    return;
  }
  const s = STAGES[stageIndex];
  const modelTotal = roundCents(stageCosts(s, DEFAULT_PRICES).total);
  lastGuess = guess;
  if (Math.abs(guess - modelTotal) <= 0.02 + 1e-9) {
    correctCount++;
    stageState = 'correct';
    feedback = 'Correct: about $' + modelTotal.toFixed(2) + '.';
    feedbackColor = '#1b7a2e';
  } else if (attempt === 1) {
    attempt = 2;
    feedback = s.wrong;
    feedbackColor = '#b02a2a';
  } else {
    stageState = 'missed';
    feedback = workedText(s);
    feedbackColor = '#b02a2a';
  }
  updateControls();
}

function nextStage() {
  if (stageState === 'answering') return;
  if (stageIndex < STAGES.length - 1) {
    stageIndex++;
    loadStage();
  } else {
    mode = 'explore';
    summary = 'Stages correct: ' + correctCount + ' of 3. ' +
      (correctCount === 3 ? 'Mastery shown. ' : 'Mastery is 3 of 3; press Restart stages to try again. ') +
      'Free exploration is on. Move the output price, then the cache read price: which moves the totals more, even though cache reads are most of the tokens?';
    updateControls();
  }
}

function restartStages() {
  mode = 'challenge';
  stageIndex = 0;
  correctCount = 0;
  summary = '';
  loadStage();
}

function updateControls() {
  const answering = mode === 'challenge' && stageState === 'answering';
  for (const spec of INPUTS) sliders[spec.key].elt.disabled = mode !== 'explore';
  answerInput.elt.disabled = !answering;
  checkButton.elt.disabled = !answering;
  nextButton.elt.disabled = !(mode === 'challenge' && stageState !== 'answering');
  nextButton.html(stageIndex === STAGES.length - 1 ? 'Finish' : 'Next stage');
  if (mode === 'explore') restartButton.show(); else restartButton.hide();
}

// ---- layout ----
function gridGeometry() {
  const cols = 2;
  const top = drawHeight + 8 + 2 * actionRowHeight + 4;
  const colW = (canvasWidth - 2 * margin) / cols;
  return { cols, top, colW };
}

function positionControls() {
  const y1 = drawHeight + 8;
  answerInput.position(margin + 92, y1);
  answerInput.size(80, 22);
  checkButton.position(margin + 188, y1);
  nextButton.position(margin + 250, y1);
  restartButton.position(margin, y1 + actionRowHeight);
  restartButton.size(140, 28);

  const g = gridGeometry();
  for (let i = 0; i < INPUTS.length; i++) {
    const s = sliders[INPUTS[i].key];
    s.position(margin + (i % g.cols) * g.colW, g.top + Math.floor(i / g.cols) * cellHeight + 20);
    s.size(g.colW - 20);
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}

function updateCanvasSize() {
  const main = document.querySelector('main');
  const w = main ? main.getBoundingClientRect().width : windowWidth;
  canvasWidth = Math.max(420, Math.floor(w));
}
