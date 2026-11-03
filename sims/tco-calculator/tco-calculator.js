// Total Cost of Ownership Calculator
// CANVAS_HEIGHT: 676
// TCO = P + n x f x y + m x r x y + L x r, rounded to the nearest dollar.
//   P = purchase or build cost, n = computers, f = annual fee per computer,
//   y = years, m = maintenance hours per year, r = value of an hour,
//   L = learning or setup hours.
// All presets and challenge cases are illustrative teaching values.

// ---- canvas layout ----
let canvasWidth = 800;
let drawHeight = 390;
let controlHeight = 286;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;
let actionRowHeight = 38;
let cellHeight = 48;

// ---- inputs (symbol, label, min, max, step, default, format) ----
const INPUTS = [
  { key: 'P', label: 'P build or purchase', min: 0, max: 100, step: 1, def: 14, fmt: v => '$' + v },
  { key: 'n', label: 'n computers', min: 1, max: 10, step: 1, def: 3, fmt: v => '' + v },
  { key: 'f', label: 'f fee per computer', min: 0, max: 100, step: 5, def: 0, fmt: v => '$' + v + '/yr' },
  { key: 'y', label: 'y years', min: 1, max: 10, step: 1, def: 5, fmt: v => '' + v },
  { key: 'm', label: 'm maintenance', min: 0, max: 10, step: 0.5, def: 1, fmt: v => v + ' h/yr' },
  { key: 'r', label: 'r value of an hour', min: 10, max: 100, step: 5, def: 40, fmt: v => '$' + v + '/h' },
  { key: 'L', label: 'L learning or setup', min: 0, max: 40, step: 0.5, def: 1, fmt: v => v + ' h' }
];

const PRESETS = [
  { name: 'Paid subscription', v: { P: 0, n: 3, f: 30, y: 5, m: 0.5, r: 40, L: 1 } },
  { name: 'Original one-time license', v: { P: 9, n: 3, f: 0, y: 5, m: 0, r: 40, L: 0 } },
  { name: 'Generated tool', v: { P: 14, n: 3, f: 0, y: 5, m: 1, r: 40, L: 1 } }
];
const CUSTOM = 'Custom values';

const CASES = [
  { v: { P: 0, n: 3, f: 30, y: 3, m: 0.5, r: 40, L: 1 }, model: 370,
    wrong: 'Fees 3 x 30 x 3 = 270; maintenance 0.5 x 40 x 3 = 60; learning 1 x 40 = 40; total 370.' },
  { v: { P: 14, n: 3, f: 0, y: 10, m: 1, r: 40, L: 1 }, model: 454,
    wrong: 'Maintenance 1 x 40 x 10 = 400; learning 40; build 14; total 454.' },
  { v: { P: 0, n: 1, f: 30, y: 5, m: 0, r: 60, L: 2 }, model: 270,
    wrong: 'Fees 1 x 30 x 5 = 150; learning 2 x 60 = 120; total 270.' }
];

const ITEM_COLORS = ['#4e79a7', '#e15759', '#59a14f', '#9c6ade'];
const NUMBER_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

// ---- controls ----
let sliders = {};
let presetSelect, challengeButton, answerInput, checkButton, nextButton;

// ---- challenge state ----
let mode = 'explore';          // 'explore' | 'challenge'
let caseIndex = 0;
let attempt = 1;
let caseStatus = 'answering';  // 'answering' | 'correct' | 'missed'
let correctCount = 0;
let feedback = '';
let feedbackColor = '#333';
let summary = '';              // shown in explore mode after a finished run

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Arial');

  // Create every control before positioning any of them
  for (const spec of INPUTS) {
    sliders[spec.key] = createSlider(spec.min, spec.max, spec.def, spec.step);
    sliders[spec.key].input(onSliderInput);
  }

  presetSelect = createSelect();
  for (const p of PRESETS) presetSelect.option(p.name + ' (illustrative)', p.name);
  presetSelect.option(CUSTOM, CUSTOM);
  presetSelect.selected('Generated tool');
  presetSelect.changed(onPresetChange);

  challengeButton = createButton('Start challenges');
  challengeButton.mousePressed(toggleChallenges);

  answerInput = createInput('');
  answerInput.attribute('placeholder', 'e.g. 254');
  answerInput.attribute('inputmode', 'decimal');
  answerInput.elt.addEventListener('keydown', e => { if (e.key === 'Enter') checkAnswer(); });

  checkButton = createButton('Check');
  checkButton.mousePressed(checkAnswer);

  nextButton = createButton('Next case');
  nextButton.mousePressed(nextCase);

  applyValues(PRESETS[2].v);
  positionControls();
  updateControlVisibility();

  describe('Total cost of ownership calculator. Seven sliders set the purchase cost, computers, annual fee, years, maintenance hours, value of an hour, and learning hours. Four colored bars show the purchase, fee, maintenance, and learning cost items and the total. A challenge mode asks the learner to type the total for three cases.');
}

function draw() {
  // backgrounds
  noStroke();
  fill('aliceblue');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);
  stroke('silver');
  noFill();
  rect(0, 0, canvasWidth - 1, canvasHeight - 1);
  line(0, drawHeight, canvasWidth, drawHeight);

  const v = readValues();
  const items = costItems(v);
  const total = Math.round(items.reduce((s, it) => s + it.value, 0));
  const hidden = mode === 'challenge' && caseStatus === 'answering';

  // title
  noStroke();
  fill('#1a3a6c');
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(20);
  text('Total Cost of Ownership Calculator', canvasWidth / 2, 10);
  textStyle(NORMAL);

  // question / status line
  textSize(16);
  fill('#222');
  let question;
  if (mode === 'challenge') {
    question = 'Case ' + (caseIndex + 1) + ' of 3: what is the total cost of ownership?';
  } else {
    question = 'What does this tool really cost over ' + (NUMBER_WORDS[v.y] || v.y) + ' years?';
  }
  if (textWidth(question) > canvasWidth - 2 * margin) textSize(14);
  text(question, canvasWidth / 2, 38);

  textSize(14);
  fill('#555');
  text('TCO = P + n x f x y + m x r x y + L x r   (all values illustrative)', canvasWidth / 2, 62);

  // cost item rows
  const labelW = 200;
  const valueW = 70;
  const barX = margin + labelW;
  const barMaxW = canvasWidth - barX - valueW - margin;
  const maxItem = Math.max(1, ...items.map(it => it.value));
  let y = 92;
  const rowH = 40;
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    noStroke();
    fill(ITEM_COLORS[i]);
    rect(margin, y + 3, 12, 12, 2);
    fill('#222');
    textAlign(LEFT, TOP);
    textSize(15);
    text(it.name, margin + 18, y);
    textSize(14);
    fill('#555');
    text(it.formula, margin + 18, y + 18);

    if (hidden) {
      fill('#ddd');
      rect(barX, y + 6, barMaxW, 18, 3);
      fill('#666');
      textAlign(RIGHT, TOP);
      textSize(15);
      text('?', canvasWidth - margin, y + 7);
    } else {
      const w = barMaxW * it.value / maxItem;
      fill(ITEM_COLORS[i]);
      rect(barX, y + 6, Math.max(w, 1), 18, 3);
      fill('#222');
      textAlign(RIGHT, TOP);
      textSize(15);
      text(money(it.value), canvasWidth - margin, y + 7);
    }
    y += rowH;
  }

  // total
  stroke('#aaa');
  line(margin, y + 2, canvasWidth - margin, y + 2);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(18);
  textStyle(BOLD);
  fill('#1a3a6c');
  text('Total cost of ownership', margin, y + 10);
  textAlign(RIGHT, TOP);
  text(hidden ? '$ ?' : '$' + total.toLocaleString('en-US'), canvasWidth - margin, y + 10);
  textStyle(NORMAL);
  y += 42;

  // challenge panel or summary
  textAlign(LEFT, TOP);
  textSize(14);
  if (mode === 'challenge') {
    fill('#333');
    text('Attempt ' + Math.min(attempt, 2) + ' of 2     Correct: ' + correctCount + ' of 3', margin, y);
    fill(feedbackColor);
    textSize(15);
    text(feedback, margin, y + 20, canvasWidth - 2 * margin, drawHeight - y - 22);
  } else if (summary) {
    fill('#333');
    textSize(15);
    text(summary, margin, y, canvasWidth - 2 * margin, drawHeight - y - 4);
  } else {
    fill('#555');
    text('Choose a preset or move any slider. Press Start challenges to test yourself.', margin, y, canvasWidth - 2 * margin, 40);
  }

  // control labels
  drawControlLabels(v);
}

function drawControlLabels(v) {
  noStroke();
  fill('#222');
  textSize(14);
  textAlign(LEFT, CENTER);
  const y1 = drawHeight + 8 + 13;
  text('Preset:', margin, y1);
  const y2 = drawHeight + 8 + actionRowHeight + 13;
  fill(mode === 'challenge' ? '#222' : '#999');
  text('Your TCO: $', margin, y2);

  const g = gridGeometry();
  fill('#222');
  textAlign(LEFT, BASELINE);
  for (let i = 0; i < INPUTS.length; i++) {
    const spec = INPUTS[i];
    const col = i % g.cols;
    const row = Math.floor(i / g.cols);
    const x = margin + col * g.colW;
    const y = g.top + row * cellHeight + 14;
    textStyle(NORMAL);
    text(spec.label + ': ', x, y);
    textStyle(BOLD);
    text(spec.fmt(v[spec.key]), x + textWidth(spec.label + ': ') + 2, y);
  }
  textStyle(NORMAL);
}

// ---- model ----
function costItems(v) {
  return [
    { name: 'Purchase or build (P)', formula: '' + v.P, value: v.P },
    { name: 'Fees (n x f x y)', formula: v.n + ' x ' + v.f + ' x ' + v.y, value: v.n * v.f * v.y },
    { name: 'Maintenance (m x r x y)', formula: v.m + ' x ' + v.r + ' x ' + v.y, value: v.m * v.r * v.y },
    { name: 'Learning (L x r)', formula: v.L + ' x ' + v.r, value: v.L * v.r }
  ];
}

function tco(v) {
  return Math.round(costItems(v).reduce((s, it) => s + it.value, 0));
}

function money(x) {
  const r = Math.round(x * 100) / 100;
  if (Number.isInteger(r)) return '$' + r.toLocaleString('en-US');
  return '$' + r.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function readValues() {
  const v = {};
  for (const spec of INPUTS) v[spec.key] = Number(sliders[spec.key].value());
  return v;
}

function applyValues(vals) {
  for (const spec of INPUTS) sliders[spec.key].value(vals[spec.key]);
}

// ---- events ----
function onSliderInput() {
  const v = readValues();
  const match = PRESETS.find(p => INPUTS.every(s => p.v[s.key] === v[s.key]));
  presetSelect.selected(match ? match.name : CUSTOM);
}

function onPresetChange() {
  const p = PRESETS.find(p => p.name === presetSelect.value());
  if (p) applyValues(p.v);
}

function toggleChallenges() {
  if (mode === 'challenge') {
    mode = 'explore';
    summary = '';
  } else {
    mode = 'challenge';
    caseIndex = 0;
    correctCount = 0;
    summary = '';
    loadCase();
  }
  updateControlVisibility();
}

function loadCase() {
  attempt = 1;
  caseStatus = 'answering';
  feedback = 'The inputs are set. Type the total and press Check.';
  feedbackColor = '#333';
  applyValues(CASES[caseIndex].v);
  presetSelect.selected(CUSTOM);
  answerInput.value('');
  updateControlVisibility();
}

function parseAnswer(s) {
  const cleaned = String(s).replace(/[$,\s]/g, '');
  if (cleaned === '' || isNaN(Number(cleaned))) return null;
  return Number(cleaned);
}

function checkAnswer() {
  if (mode !== 'challenge' || caseStatus !== 'answering') return;
  const guess = parseAnswer(answerInput.value());
  if (guess === null) {
    feedback = 'Type a dollar amount, such as 254.';
    feedbackColor = '#a15c00';
    return;
  }
  const c = CASES[caseIndex];
  if (Math.abs(guess - c.model) <= 1 + 1e-9) {
    correctCount++;
    caseStatus = 'correct';
    feedback = 'Correct: $' + c.model + '.';
    feedbackColor = '#1b7a2e';
  } else if (attempt === 1) {
    attempt = 2;
    feedback = 'Not quite. Add the four cost items.';
    feedbackColor = '#b02a2a';
  } else {
    caseStatus = 'missed';
    feedback = c.wrong;
    feedbackColor = '#b02a2a';
  }
  updateControlVisibility();
}

function nextCase() {
  if (caseStatus === 'answering') return;
  if (caseIndex < CASES.length - 1) {
    caseIndex++;
    loadCase();
  } else {
    mode = 'explore';
    summary = 'Correct: ' + correctCount + ' of 3. ' +
      (correctCount === 3 ? 'Mastery shown. ' : 'Mastery is 3 of 3; press Start challenges to try again. ') +
      'Now try the Generated tool preset: does maintenance time or build cost move the total more?';
    updateControlVisibility();
  }
}

function updateControlVisibility() {
  const inChallenge = mode === 'challenge';
  for (const spec of INPUTS) sliders[spec.key].elt.disabled = inChallenge;
  presetSelect.elt.disabled = inChallenge;
  challengeButton.html(inChallenge ? 'Quit challenges' : (summary ? 'Restart challenges' : 'Start challenges'));
  answerInput.elt.disabled = !inChallenge || caseStatus !== 'answering';
  checkButton.elt.disabled = !inChallenge || caseStatus !== 'answering';
  nextButton.elt.disabled = !inChallenge || caseStatus === 'answering';
  nextButton.html(caseIndex === CASES.length - 1 ? 'Finish' : 'Next case');
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
  presetSelect.position(margin + 55, y1);
  presetSelect.size(Math.min(250, canvasWidth - 2 * margin - 55 - 160));
  challengeButton.position(canvasWidth - margin - 140, y1);
  challengeButton.size(140, 28);

  const y2 = drawHeight + 8 + actionRowHeight;
  answerInput.position(margin + 85, y2);
  answerInput.size(90, 22);
  checkButton.position(margin + 190, y2);
  nextButton.position(margin + 255, y2);

  const g = gridGeometry();
  for (let i = 0; i < INPUTS.length; i++) {
    const col = i % g.cols;
    const row = Math.floor(i / g.cols);
    const s = sliders[INPUTS[i].key];
    s.position(margin + col * g.colW, g.top + row * cellHeight + 20);
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
