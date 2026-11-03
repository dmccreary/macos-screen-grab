// Subscribe or Generate Cost Calculator
// CANVAS_HEIGHT: 748
// Subscribe cost = computers x fee x years
// Generate cost  = build cost + years x (maintenance hours x time value + sessions x session cost)
// Break-even maintenance hours per year (shown only when time value > 0)
//   = ((subscribe cost - build cost) / years - sessions x session cost) / time value
// Maintenance hours, time value and sessions are illustrative values.

// ---- canvas layout ----
let canvasWidth = 800;
let drawHeight = 460;
let controlHeight = 288;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;
let actionRowHeight = 38;
let cellHeight = 48;

const INPUTS = [
  { key: 'computers', label: 'Computers', min: 1, max: 10, step: 1, def: 3, fmt: v => '' + v },
  { key: 'fee', label: 'Fee per computer', min: 0, max: 100, step: 5, def: 30, fmt: v => '$' + v + '/yr' },
  { key: 'years', label: 'Years', min: 1, max: 10, step: 1, def: 5, fmt: v => '' + v },
  { key: 'build', label: 'Build cost', min: 0, max: 50, step: 1, def: 14, fmt: v => '$' + v },
  { key: 'hours', label: 'Upkeep (illus.)', min: 0, max: 10, step: 0.5, def: 1, fmt: v => v + ' h/yr' },
  { key: 'rate', label: 'Time value (illus.)', min: 0, max: 150, step: 10, def: 50, fmt: v => '$' + v + '/h' },
  { key: 'sessions', label: 'Sessions (illus.)', min: 0, max: 5, step: 1, def: 1, fmt: v => v + '/yr' },
  { key: 'sessionCost', label: 'Session cost', min: 0, max: 50, step: 1, def: 14, fmt: v => '$' + v }
];

const DEFAULTS = { computers: 3, fee: 30, years: 5, build: 14, hours: 1, rate: 50, sessions: 1, sessionCost: 14 };

const ROWS = [
  { name: 'Subscribe', kind: 'subscribe', v: {}, model: 450,
    detail: 'pay the annual fee on every computer',
    wrong: '3 computers x $30 x 5 years = $450.' },
  { name: 'Generate, hobbyist', kind: 'generate', v: { hours: 2, rate: 0, sessions: 1 }, model: 84,
    detail: 'upkeep 2 h/yr at $0/h, 1 session/yr',
    wrong: '$14 build + 5 x (2 x $0 + 1 x $14) = $14 + $70 = $84.' },
  { name: 'Generate, light upkeep', kind: 'generate', v: { hours: 1, rate: 50, sessions: 1 }, model: 334,
    detail: 'upkeep 1 h/yr at $50/h, 1 session/yr',
    wrong: '$14 + 5 x (1 x $50 + $14) = $14 + $320 = $334.' },
  { name: "Generate, Chapter 14's estimate", kind: 'generate', v: { hours: 4, rate: 50, sessions: 2 }, model: 1154,
    detail: 'upkeep 4 h/yr at $50/h, 2 sessions/yr',
    wrong: '$14 + 5 x (4 x $50 + 2 x $14) = $14 + 5 x $228 = $1,154.' }
];

const COLORS = { subscribe: '#e15759', build: '#4e79a7', upkeep: '#59a14f', sessions: '#f28e2b' };

let sliders = {};
let answerInput, checkButton, nextButton, restartButton;

let mode = 'challenge';      // 'challenge' | 'explore'
let rowIndex = 0;
let attempt = 1;
let rowState = 'answering';  // 'answering' | 'correct' | 'missed'
let correctCount = 0;
let results = [null, null, null, null];  // 'correct' | 'missed' per row
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
  answerInput.attribute('placeholder', 'e.g. 500');
  answerInput.elt.addEventListener('keydown', e => { if (e.key === 'Enter') checkAnswer(); });

  checkButton = createButton('Check');
  checkButton.mousePressed(checkAnswer);
  nextButton = createButton('Next row');
  nextButton.mousePressed(nextRow);
  restartButton = createButton('Restart rows');
  restartButton.mousePressed(restartRows);

  positionControls();
  loadRow();

  describe('Subscribe or generate cost calculator. A table lists four five-year cost rows: a three-computer subscription and three generated-tool scenarios. The learner types each five-year cost, then free exploration unlocks eight sliders, two bars compare the subscription cost with the generated cost split into build, upkeep time and agent sessions, and the sim states which option is cheaper and the break-even upkeep hours.');
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
  const w = canvasWidth - 2 * margin;

  noStroke();
  fill('#1a3a6c');
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(20);
  text('Subscribe or Generate Cost Calculator', canvasWidth / 2, 10);
  textStyle(NORMAL);

  let y = drawQuestion(questionText(), 38);

  textSize(14);
  fill('#555');
  textAlign(CENTER, TOP);
  let note = 'All rows: 5 years, 3 computers, $30 fee per computer per year, $14 build, $14 per session';
  if (textWidth(note) > w) note = 'All rows: 5 years, 3 computers, $30 fee, $14 build, $14 session';
  text(note, canvasWidth / 2, y);
  fill('#a15c00');
  text('Upkeep hours, time value and sessions are illustrative.', canvasWidth / 2, y + 18);
  y += 44;

  // the four challenge rows
  for (let i = 0; i < ROWS.length; i++) {
    drawTableRow(i, y);
    y += 38;
  }
  y += 8;

  textAlign(LEFT, TOP);
  if (mode === 'challenge') {
    textSize(14);
    fill('#333');
    text('Row ' + (rowIndex + 1) + ' of 4     Attempt ' + attempt + ' of 2     Rows correct: ' + correctCount + ' of 4', margin, y, w, 20);
    textSize(15);
    fill(feedbackColor);
    text(feedback, margin, y + 22, w, drawHeight - y - 24);
  } else {
    drawComparison(v, y);
  }

  drawControlLabels(v);
}

function questionText() {
  if (mode === 'explore') return 'Which option is cheaper, and what would flip the answer?';
  if (rowIndex === 0) return 'What does the subscription cost over five years?';
  return 'What does this generated tool cost over five years?';
}

function drawTableRow(i, y) {
  const r = ROWS[i];
  const w = canvasWidth - 2 * margin;
  const current = mode === 'challenge' && i === rowIndex;
  const shown = mode === 'explore' || i < rowIndex || (i === rowIndex && rowState !== 'answering');
  noStroke();
  if (current) {
    fill(255, 244, 200);
    rect(margin - 6, y - 3, w + 12, 36, 4);
  }
  fill('#222');
  textAlign(LEFT, TOP);
  textSize(15);
  textStyle(BOLD);
  text((i + 1) + '. ' + r.name, margin, y);
  textStyle(NORMAL);
  textSize(14);
  fill('#555');
  text(r.detail, margin + 18, y + 17);
  textAlign(RIGHT, TOP);
  textSize(16);
  textStyle(BOLD);
  fill('#1a3a6c');
  text(shown ? dollars(r.model) : '$ ?', canvasWidth - margin, y + 6);
  textStyle(NORMAL);
  if (results[i]) {
    textSize(14);
    fill(results[i] === 'correct' ? '#1b7a2e' : '#b02a2a');
    text(results[i] === 'correct' ? 'correct' : 'missed', canvasWidth - margin - 75, y + 8);
  }
}

// Explore mode: two bars, the verdict, and the break-even upkeep.
function drawComparison(v, y) {
  const c = computeCosts(v);
  const labelW = 110;
  const valueW = 70;
  const barX = margin + labelW;
  const barMaxW = canvasWidth - barX - valueW - margin;
  const maxCost = Math.max(c.subscribe, c.generate, 1);

  textAlign(LEFT, TOP);
  textSize(15);
  fill('#222');
  text('Subscribe', margin, y + 2);
  fill(COLORS.subscribe);
  rect(barX, y + 2, Math.max(1, barMaxW * c.subscribe / maxCost), 18, 3);
  fill('#222');
  textAlign(RIGHT, TOP);
  text(dollars(c.subscribe), canvasWidth - margin, y + 3);
  y += 28;

  textAlign(LEFT, TOP);
  text('Generate', margin, y + 2);
  let x = barX;
  for (const [key, val] of [['build', c.buildPart], ['upkeep', c.upkeepPart], ['sessions', c.sessionPart]]) {
    const bw = barMaxW * val / maxCost;
    fill(COLORS[key]);
    rect(x, y + 2, bw, 18);
    x += bw;
  }
  fill('#222');
  textAlign(RIGHT, TOP);
  text(dollars(c.generate), canvasWidth - margin, y + 3);
  y += 26;

  // legend for the generate bar
  textAlign(LEFT, TOP);
  textSize(14);
  let lx = barX;
  for (const [key, label] of [['build', 'build ' + dollars(c.buildPart)], ['upkeep', 'upkeep ' + dollars(c.upkeepPart)], ['sessions', 'sessions ' + dollars(c.sessionPart)]]) {
    fill(COLORS[key]);
    rect(lx, y + 2, 12, 12, 2);
    fill('#444');
    text(label, lx + 16, y);
    lx += textWidth(label) + 34;
  }
  y += 26;

  textSize(16);
  textStyle(BOLD);
  fill('#1a3a6c');
  text(verdict(c), margin, y);
  textStyle(NORMAL);
  y += 24;
  textSize(15);
  fill('#222');
  if (v.rate > 0) {
    const be = c.breakEven;
    text('Break-even upkeep: ' + be.toFixed(2) + ' hours per year' +
      (be < 0 ? ' (generating cannot win at these inputs)' : ' (Generate wins below this)'), margin, y, canvasWidth - 2 * margin, 40);
  } else {
    text('Break-even upkeep: not shown when time value is $0.', margin, y);
  }
  y += 26;
  textSize(14);
  fill('#333');
  text(summary, margin, y, canvasWidth - 2 * margin, drawHeight - y - 4);
}

function verdict(c) {
  const d = Math.round(Math.abs(c.subscribe - c.generate));
  if (c.generate < c.subscribe) return 'Generate is cheaper by ' + dollars(d);
  if (c.generate === c.subscribe) return 'Equal: both cost ' + dollars(c.subscribe);
  return 'Subscribe is cheaper by ' + dollars(d);
}

function drawQuestion(q, y) {
  textSize(16);
  fill('#222');
  noStroke();
  const w = canvasWidth - 2 * margin;
  textAlign(CENTER, TOP);
  if (textWidth(q) > w) textSize(15);
  if (textWidth(q) <= w) {
    text(q, canvasWidth / 2, y);
    return y + 26;
  }
  text(q, margin, y, w, 44);
  return y + 44;
}

function drawControlLabels(v) {
  noStroke();
  textSize(14);
  textAlign(LEFT, CENTER);
  fill(mode === 'challenge' && rowState === 'answering' ? '#222' : '#999');
  text('Five-year cost: $', margin, drawHeight + 8 + 13);
  if (mode === 'challenge') {
    fill('#777');
    text('Sliders unlock after row 4.', margin, drawHeight + 8 + actionRowHeight + 13);
  }

  const g = gridGeometry();
  fill(mode === 'explore' ? '#222' : '#999');
  textAlign(LEFT, BASELINE);
  for (let i = 0; i < INPUTS.length; i++) {
    const spec = INPUTS[i];
    const x = margin + (i % g.cols) * g.colW;
    const y = g.top + Math.floor(i / g.cols) * cellHeight + 14;
    const label = g.colW > 260 ? spec.label.replace('(illus.)', '(illustrative)') : spec.label;
    textStyle(NORMAL);
    text(label + ': ', x, y);
    textStyle(BOLD);
    text(spec.fmt(v[spec.key]), x + textWidth(label + ': ') + 2, y);
  }
  textStyle(NORMAL);
}

// ---- model ----
function computeCosts(v) {
  const subscribe = v.computers * v.fee * v.years;
  const buildPart = v.build;
  const upkeepPart = v.years * v.hours * v.rate;
  const sessionPart = v.years * v.sessions * v.sessionCost;
  const generate = buildPart + upkeepPart + sessionPart;
  const breakEven = v.rate > 0 ? ((subscribe - v.build) / v.years - v.sessions * v.sessionCost) / v.rate : null;
  return { subscribe, generate, buildPart, upkeepPart, sessionPart, breakEven };
}

function dollars(x) {
  return '$' + Math.round(x).toLocaleString('en-US');
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
function loadRow() {
  applyValues(Object.assign({}, DEFAULTS, ROWS[rowIndex].v));
  attempt = 1;
  rowState = 'answering';
  feedback = 'Type the five-year cost in dollars and press Check.';
  feedbackColor = '#333';
  answerInput.value('');
  updateControls();
}

function parseMoney(s) {
  const cleaned = String(s).replace(/[$,\s]/g, '');
  if (cleaned === '' || isNaN(Number(cleaned))) return null;
  return Number(cleaned);
}

function checkAnswer() {
  if (mode !== 'challenge' || rowState !== 'answering') return;
  const guess = parseMoney(answerInput.value());
  if (guess === null) {
    feedback = 'Type a dollar amount, such as 500.';
    feedbackColor = '#a15c00';
    return;
  }
  const r = ROWS[rowIndex];
  if (Math.abs(guess - r.model) <= 1 + 1e-9) {
    correctCount++;
    rowState = 'correct';
    results[rowIndex] = 'correct';
    feedback = 'Correct: ' + dollars(r.model) + '.';
    feedbackColor = '#1b7a2e';
  } else if (attempt === 1) {
    attempt = 2;
    feedback = r.wrong;
    feedbackColor = '#b02a2a';
  } else {
    rowState = 'missed';
    results[rowIndex] = 'missed';
    feedback = 'Model value: ' + dollars(r.model) + '. ' + r.wrong;
    feedbackColor = '#b02a2a';
  }
  updateControls();
}

function nextRow() {
  if (rowState === 'answering') return;
  if (rowIndex < ROWS.length - 1) {
    rowIndex++;
    loadRow();
  } else {
    mode = 'explore';
    applyValues(DEFAULTS);
    summary = 'Rows correct: ' + correctCount + ' of 4. ' +
      (correctCount === 4 ? 'Mastery shown. ' : 'Mastery is 4 of 4; press Restart rows to try again. ') +
      'Raise the upkeep hours or the time value: when does the winner change?';
    updateControls();
  }
}

function restartRows() {
  mode = 'challenge';
  rowIndex = 0;
  correctCount = 0;
  results = [null, null, null, null];
  summary = '';
  loadRow();
}

function updateControls() {
  const answering = mode === 'challenge' && rowState === 'answering';
  for (const spec of INPUTS) sliders[spec.key].elt.disabled = mode !== 'explore';
  answerInput.elt.disabled = !answering;
  checkButton.elt.disabled = !answering;
  nextButton.elt.disabled = !(mode === 'challenge' && rowState !== 'answering');
  nextButton.html(rowIndex === ROWS.length - 1 ? 'Finish' : 'Next row');
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
  answerInput.position(margin + 118, y1);
  answerInput.size(80, 22);
  checkButton.position(margin + 214, y1);
  nextButton.position(margin + 276, y1);
  restartButton.position(margin, y1 + actionRowHeight);
  restartButton.size(130, 28);

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
