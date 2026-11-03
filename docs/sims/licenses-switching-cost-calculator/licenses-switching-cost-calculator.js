// Switching Cost Calculator
// CANVAS_HEIGHT: 666
// Conversion cost = files x minutes / 60 x time value
// Learning cost   = learning hours x time value
// Switching cost  = conversion cost + learning cost
// Years to recover = switching cost / annual fee saved, rounded to 1 decimal place
// All figures are illustrative teaching values.

// ---- canvas layout ----
let canvasWidth = 800;
let drawHeight = 430;
let controlHeight = 236;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;
let actionRowHeight = 38;
let cellHeight = 48;

const INPUTS = [
  { key: 'files', label: 'Files to convert', min: 0, max: 1000, step: 50, def: 200, fmt: v => '' + v },
  { key: 'minutes', label: 'Minutes per file', min: 1, max: 10, step: 1, def: 1, fmt: v => v + ' min' },
  { key: 'rate', label: 'Your time value', min: 10, max: 100, step: 5, def: 40, fmt: v => '$' + v + '/h' },
  { key: 'learn', label: 'Hours to learn', min: 0, max: 20, step: 1, def: 4, fmt: v => v + ' h' },
  { key: 'fee', label: 'Annual fee saved', min: 10, max: 300, step: 10, def: 90, fmt: v => '$' + v + '/yr' }
];

const CASES = [
  { v: { files: 200, minutes: 1, rate: 40, learn: 4, fee: 90 }, model: 3.3,
    hint: 'Conversion is 200 x 1 / 60 = 3.33 h = $133.33; learning is $160; total $293.33; 293.33 / 90 = ?',
    full: 'Conversion is 200 x 1 / 60 = 3.33 h = $133.33; learning is $160; total $293.33; 293.33 / 90 = 3.26, which rounds to 3.3.' },
  { v: { files: 600, minutes: 2, rate: 30, learn: 2, fee: 90 }, model: 7.3,
    hint: 'Conversion is 600 x 2 / 60 = 20 h = $600; learning is $60; total $660; 660 / 90 = ?',
    full: 'Conversion is 600 x 2 / 60 = 20 h = $600; learning is $60; total $660; 660 / 90 = 7.33, which rounds to 7.3.' },
  { v: { files: 0, minutes: 1, rate: 40, learn: 4, fee: 90 }, model: 1.8,
    hint: 'No files means no conversion cost; learning is $160; 160 / 90 = ?',
    full: 'No files means no conversion cost; learning is $160; 160 / 90 = 1.78, which rounds to 1.8.' }
];

const COLOR_CONVERT = '#e15759';
const COLOR_LEARN = '#4e79a7';
const COLOR_SAVED = '#59a14f';

let sliders = {};
let challengeButton, answerInput, checkButton, nextButton;

let mode = 'explore';          // 'explore' | 'challenge'
let caseIndex = 0;
let attempt = 1;
let caseStatus = 'answering';  // 'answering' | 'correct' | 'missed'
let correctCount = 0;
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

  challengeButton = createButton('Start challenges');
  challengeButton.mousePressed(toggleChallenges);

  answerInput = createInput('');
  answerInput.attribute('placeholder', 'e.g. 3.3');
  answerInput.attribute('inputmode', 'decimal');
  answerInput.elt.addEventListener('keydown', e => { if (e.key === 'Enter') checkAnswer(); });

  checkButton = createButton('Check');
  checkButton.mousePressed(checkAnswer);

  nextButton = createButton('Next case');
  nextButton.mousePressed(nextCase);

  positionControls();
  updateControlVisibility();

  describe('Switching cost calculator. Five sliders set the number of files in the vendor format, minutes to convert each file, the value of your time, hours to learn the replacement, and the annual fee saved. Bars show the conversion cost and learning cost, a strip marks how many years of saved fees cover the switching cost, and a challenge mode asks for the years to recover in three cases.');
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

  const v = readValues();
  const m = computeCosts(v);
  const hidden = mode === 'challenge' && caseStatus === 'answering';

  noStroke();
  fill('#1a3a6c');
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(20);
  text('Switching Cost Calculator', canvasWidth / 2, 10);
  textStyle(NORMAL);
  textSize(16);
  fill('#222');
  const question = mode === 'challenge'
    ? 'Case ' + (caseIndex + 1) + ' of 3: how many years to recover the cost?'
    : 'How long until switching pays for itself?';
  if (textWidth(question) > canvasWidth - 2 * margin) textSize(14);
  text(question, canvasWidth / 2, 38);
  textSize(14);
  fill('#555');
  text('All figures are illustrative.', canvasWidth / 2, 62);

  // cost rows
  const labelW = 215;
  const valueW = 80;
  const barX = margin + labelW;
  const barMaxW = canvasWidth - barX - valueW - margin;
  const maxCost = Math.max(1, m.switching);
  let y = 92;
  const rows = [
    { name: 'Conversion cost', formula: v.files + ' x ' + v.minutes + ' / 60 = ' + fmt2(m.convHours) + ' h x $' + v.rate,
      value: m.conversion, color: COLOR_CONVERT },
    { name: 'Learning cost', formula: v.learn + ' h x $' + v.rate, value: m.learning, color: COLOR_LEARN }
  ];
  for (const r of rows) {
    noStroke();
    fill(r.color);
    rect(margin, y + 3, 12, 12, 2);
    fill('#222');
    textAlign(LEFT, TOP);
    textSize(15);
    text(r.name, margin + 18, y);
    fill('#555');
    textSize(14);
    text(hidden ? 'set by the sliders below' : r.formula, margin + 18, y + 18);
    if (hidden) {
      fill('#ddd');
      rect(barX, y + 6, barMaxW, 18, 3);
    } else {
      fill(r.color);
      rect(barX, y + 6, Math.max(1, barMaxW * r.value / maxCost), 18, 3);
    }
    fill('#222');
    textAlign(RIGHT, TOP);
    textSize(15);
    text(hidden ? '?' : '$' + fmt2(r.value), canvasWidth - margin, y + 7);
    y += 40;
  }

  stroke('#aaa');
  line(margin, y + 2, canvasWidth - margin, y + 2);
  noStroke();
  textSize(16);
  fill('#222');
  textAlign(LEFT, TOP);
  text('Switching cost', margin, y + 10);
  textAlign(RIGHT, TOP);
  text(hidden ? '?' : '$' + fmt2(m.switching), canvasWidth - margin, y + 10);
  y += 30;
  textAlign(LEFT, TOP);
  text('Annual fee saved', margin, y);
  textAlign(RIGHT, TOP);
  text('$' + v.fee + ' per year', canvasWidth - margin, y);
  y += 28;
  textStyle(BOLD);
  textSize(18);
  fill('#1a3a6c');
  textAlign(LEFT, TOP);
  text('Years to recover', margin, y);
  textAlign(RIGHT, TOP);
  text(hidden ? '? years' : m.years.toFixed(1) + ' years', canvasWidth - margin, y);
  textStyle(NORMAL);
  y += 34;

  drawPaybackStrip(v, m, y, hidden);
  y += 52;

  // challenge panel or summary
  textAlign(LEFT, TOP);
  textSize(14);
  if (mode === 'challenge') {
    fill('#333');
    text('Attempt ' + attempt + ' of 2     Correct: ' + correctCount + ' of 3', margin, y);
    fill(feedbackColor);
    textSize(15);
    text(feedback, margin, y + 20, canvasWidth - 2 * margin, drawHeight - y - 22);
  } else {
    fill(summary ? '#333' : '#555');
    textSize(summary ? 15 : 14);
    text(summary || 'Move any slider to see the costs update. Press Start challenges to test yourself.',
      margin, y, canvasWidth - 2 * margin, drawHeight - y - 4);
  }

  drawControlLabels(v);
}

// A strip as long as the switching cost, with one tick for each year of saved fees.
function drawPaybackStrip(v, m, y, hidden) {
  const x0 = margin;
  const w = canvasWidth - 2 * margin;
  noStroke();
  fill('#555');
  textSize(14);
  textAlign(LEFT, TOP);
  if (hidden) {
    text('Payback strip appears after you answer.', x0, y);
    return;
  }
  text('Each block = one year saved. Red line = switching cost.', x0, y, w, 20);
  const top = y + 20;
  const scaleMax = Math.max(m.switching, v.fee) * 1.15;
  const pxPerDollar = w / scaleMax;
  const yearsShown = Math.ceil(scaleMax / v.fee);
  for (let i = 0; i < yearsShown; i++) {
    const bx = x0 + i * v.fee * pxPerDollar;
    const bw = Math.min(v.fee * pxPerDollar, x0 + w - bx);
    if (bw <= 0) break;
    fill(i % 2 === 0 ? COLOR_SAVED : '#7fbf73');
    rect(bx, top, bw, 18);
    if (v.fee * pxPerDollar > 26 && bw > 20) {
      fill('white');
      textAlign(CENTER, CENTER);
      textSize(12);
      text(i + 1, bx + bw / 2, top + 9);
    }
  }
  const sx = x0 + m.switching * pxPerDollar;
  stroke(COLOR_CONVERT);
  strokeWeight(3);
  line(sx, top - 4, sx, top + 22);
  strokeWeight(1);
  noStroke();
}

function drawControlLabels(v) {
  noStroke();
  textSize(14);
  textAlign(LEFT, CENTER);
  fill(mode === 'challenge' ? '#222' : '#999');
  const y2 = drawHeight + 8 + actionRowHeight + 13;
  text('Years to recover:', margin, y2);

  const g = gridGeometry();
  fill('#222');
  textAlign(LEFT, BASELINE);
  for (let i = 0; i < INPUTS.length; i++) {
    const spec = INPUTS[i];
    const x = margin + (i % g.cols) * g.colW;
    const y = g.top + Math.floor(i / g.cols) * cellHeight + 14;
    textStyle(NORMAL);
    text(spec.label + ': ', x, y);
    textStyle(BOLD);
    text(spec.fmt(v[spec.key]), x + textWidth(spec.label + ': ') + 2, y);
  }
  textStyle(NORMAL);
}

// ---- model ----
function computeCosts(v) {
  const convHours = v.files * v.minutes / 60;
  const conversion = convHours * v.rate;
  const learning = v.learn * v.rate;
  const switching = conversion + learning;
  const years = Math.round((switching / v.fee) * 10 + 1e-9) / 10;
  return { convHours, conversion, learning, switching, years };
}

function fmt2(x) {
  const r = Math.round(x * 100 + 1e-9) / 100;
  return Number.isInteger(r) ? r.toLocaleString('en-US')
    : r.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function readValues() {
  const v = {};
  for (const spec of INPUTS) v[spec.key] = Number(sliders[spec.key].value());
  return v;
}

function applyValues(vals) {
  for (const spec of INPUTS) sliders[spec.key].value(vals[spec.key]);
}

// ---- challenge flow ----
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
  feedback = 'The five inputs are set. Type the years to recover (one decimal place) and press Check.';
  feedbackColor = '#333';
  applyValues(CASES[caseIndex].v);
  answerInput.value('');
  updateControlVisibility();
}

function parseAnswer(s) {
  const cleaned = String(s).replace(/[,\s]|years?/gi, '');
  if (cleaned === '' || isNaN(Number(cleaned))) return null;
  return Number(cleaned);
}

function checkAnswer() {
  if (mode !== 'challenge' || caseStatus !== 'answering') return;
  const guess = parseAnswer(answerInput.value());
  if (guess === null) {
    feedback = 'Type a number of years, such as 2.5.';
    feedbackColor = '#a15c00';
    return;
  }
  const c = CASES[caseIndex];
  if (Math.abs(guess - c.model) <= 0.1 + 1e-9) {
    correctCount++;
    caseStatus = 'correct';
    feedback = 'Correct: ' + c.model.toFixed(1) + ' years.';
    feedbackColor = '#1b7a2e';
  } else if (attempt === 1) {
    attempt = 2;
    feedback = c.hint;
    feedbackColor = '#b02a2a';
  } else {
    caseStatus = 'missed';
    feedback = c.full + ' Model value: ' + c.model.toFixed(1) + ' years.';
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
      (correctCount === 3 ? 'Mastery shown. ' : 'Mastery is 3 of 3; press Restart challenges to try again. ') +
      'Now double the file count: which cost doubles, and which stays put?';
    updateControlVisibility();
  }
}

function updateControlVisibility() {
  const inChallenge = mode === 'challenge';
  for (const spec of INPUTS) sliders[spec.key].elt.disabled = inChallenge;
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
  challengeButton.position(margin, y1);
  challengeButton.size(140, 28);

  const y2 = drawHeight + 8 + actionRowHeight;
  answerInput.position(margin + 120, y2);
  answerInput.size(70, 22);
  checkButton.position(margin + 205, y2);
  nextButton.position(margin + 268, y2);

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
