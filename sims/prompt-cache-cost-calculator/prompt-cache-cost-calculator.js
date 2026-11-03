// Prompt Cache Cost Calculator
// CANVAS_HEIGHT: 620
// A fixed context is resent on every turn of a conversation.
// Cost without caching = turns x context x 5.00 / 1,000,000
// Cost with caching    = context x 5.00 / 1,000,000            (one cache write)
//                      + (turns - 1) x context x 0.20 / 1,000,000  (cache reads)
// Saving = (without - with) / without, which is 0% when turns = 1.
// Only the fixed context is modeled; new tokens per turn and output are ignored.
// Prices are book assumptions: check current vendor pricing.

const PRICE_INPUT = 5.00;   // dollars per million plain input tokens
const PRICE_WRITE = 5.00;   // dollars per million cache write tokens
const PRICE_READ = 0.20;    // dollars per million cache read tokens

// ---- canvas layout ----
let canvasWidth = 800;
let drawHeight = 470;
let controlHeight = 150;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;
let actionRowHeight = 38;
let cellHeight = 48;

const INPUTS = [
  { key: 'context', label: 'Context size', min: 10000, max: 200000, step: 10000, def: 100000,
    fmt: v => v.toLocaleString('en-US') + ' tokens' },
  { key: 'turns', label: 'Number of turns', min: 1, max: 100, step: 1, def: 40, fmt: v => '' + v }
];

const SCENARIOS = [
  { context: 100000, turns: 40, without: 20.00, with: 1.28,
    wrong: 'Without: 40 x 100,000 = 4 million tokens x $5 = $20.00. With: one write ($0.50) plus 39 reads of 100,000 tokens x $0.20 per million ($0.78) = $1.28.' },
  { context: 50000, turns: 10, without: 2.50, with: 0.34,
    wrong: 'Without: 10 x 50,000 = 500,000 tokens x $5 per million = $2.50. With: write $0.25 plus 9 reads of 50,000 tokens ($0.09) = $0.34.' },
  { context: 200000, turns: 1, without: 1.00, with: 1.00,
    wrong: 'With one turn there is only a write and no reads, and a write costs the same as plain input here, so caching saves nothing.' }
];

const COLOR_PLAIN = '#e15759';
const COLOR_WRITE = '#f28e2b';
const COLOR_READ = '#4e79a7';

let sliders = {};
let withoutInput, withInput, checkButton, nextButton, restartButton;

let mode = 'challenge';        // 'challenge' | 'explore'
let scenarioIndex = 0;
let attempt = 1;
let scenarioStatus = 'answering';      // 'answering' | 'correct' | 'missed'
let correctCount = 0;
let feedback = '';
let worked = '';
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

  withoutInput = createInput('');
  withoutInput.attribute('inputmode', 'decimal');
  withoutInput.attribute('placeholder', '0.00');
  withInput = createInput('');
  withInput.attribute('inputmode', 'decimal');
  withInput.attribute('placeholder', '0.00');
  for (const inp of [withoutInput, withInput]) {
    inp.elt.addEventListener('keydown', e => { if (e.key === 'Enter') checkAnswer(); });
  }

  checkButton = createButton('Check');
  checkButton.mousePressed(checkAnswer);
  nextButton = createButton('Next scenario');
  nextButton.mousePressed(nextScenario);
  restartButton = createButton('Restart scenarios');
  restartButton.mousePressed(restartScenarios);

  positionControls();
  loadScenario();

  describe('Prompt cache cost calculator. Two bars compare the cost of resending a fixed context on every turn without caching and with caching, where the first turn is a cache write and later turns are cheap cache reads. A per-turn strip shows the cost of each turn. The learner types both costs for three scenarios, then free exploration unlocks sliders for context size and number of turns.');
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
  const c = costs(v);
  const hidden = mode === 'challenge' && scenarioStatus === 'answering';
  const w = canvasWidth - 2 * margin;

  noStroke();
  fill('#1a3a6c');
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(20);
  text('Prompt Cache Cost Calculator', canvasWidth / 2, 10);
  textStyle(NORMAL);

  let y = drawQuestion(questionText(v), 38);

  textSize(14);
  fill('#555');
  textAlign(CENTER, TOP);
  let priceLine = 'Prices per million tokens: input $5.00, cache write $5.00, cache read $0.20';
  if (textWidth(priceLine) > w) priceLine = 'Per 1M tokens: input $5.00, write $5.00, read $0.20';
  text(priceLine, canvasWidth / 2, y);
  fill('#a15c00');
  text('Book assumptions: check current vendor pricing.', canvasWidth / 2, y + 18);
  y += 44;

  fill('#222');
  textSize(15);
  text('Context: ' + v.context.toLocaleString('en-US') + ' tokens resent every turn     Turns: ' + v.turns,
    canvasWidth / 2, y);
  y += 28;

  // the two cost bars
  const labelW = 180;
  const valueW = 70;
  const barX = margin + labelW;
  const barMaxW = canvasWidth - barX - valueW - margin;
  const maxCost = Math.max(c.without, 0.0001);
  const readsN = v.turns - 1;

  // without caching
  drawRowLabel('Without caching', v.turns + ' x ' + v.context.toLocaleString('en-US') + ' x $5 / 1M', COLOR_PLAIN, y);
  if (hidden) {
    fill('#ddd'); rect(barX, y + 6, barMaxW, 18, 3);
  } else {
    fill(COLOR_PLAIN); rect(barX, y + 6, barMaxW, 18, 3);
  }
  drawValue(hidden ? '$ ?' : '$' + c.without.toFixed(2), y);
  y += 42;

  // with caching (write + reads, stacked)
  drawRowLabel('With caching', '1 write + ' + readsN + (readsN === 1 ? ' read' : ' reads'), COLOR_WRITE, y);
  if (hidden) {
    fill('#ddd'); rect(barX, y + 6, barMaxW, 18, 3);
  } else {
    const ww = barMaxW * c.write / maxCost;
    const rw = barMaxW * c.reads / maxCost;
    fill(COLOR_WRITE); rect(barX, y + 6, Math.max(ww, 1), 18);
    fill(COLOR_READ); rect(barX + ww, y + 6, rw, 18);
  }
  drawValue(hidden ? '$ ?' : '$' + c.with.toFixed(2), y);
  y += 42;

  textAlign(LEFT, TOP);
  textSize(16);
  textStyle(BOLD);
  fill('#1a3a6c');
  text('Saving from caching: ' + (hidden ? '?' : c.saving.toFixed(1) + '%'), margin, y);
  textStyle(NORMAL);
  if (!hidden) {
    textSize(14);
    fill('#555');
    textAlign(RIGHT, TOP);
    text('write $' + c.write.toFixed(2) + ' + reads $' + c.reads.toFixed(2), canvasWidth - margin, y + 2);
  }
  y += 28;

  drawTurnStrip(v, y, hidden);
  y += 66;

  // challenge panel
  textAlign(LEFT, TOP);
  textSize(14);
  if (mode === 'challenge') {
    fill('#333');
    text('Scenario ' + (scenarioIndex + 1) + ' of 3     Attempt ' + attempt + ' of 2     Scenarios correct: ' + correctCount + ' of 3', margin, y, w, 20);
    fill(feedbackColor);
    textSize(15);
    const fbText = worked ? feedback + '\n' + worked : feedback;
    text(fbText, margin, y + 20, w, drawHeight - y - 22);
  } else {
    fill('#333');
    textSize(15);
    text(summary, margin, y, w, drawHeight - y - 4);
  }

  drawControlLabels(v);
}

function questionText(v) {
  if (mode === 'explore') return 'How does the saving change as the number of turns grows?';
  return 'What does ' + v.turns + (v.turns === 1 ? ' turn' : ' turns') + ' over a ' +
    v.context.toLocaleString('en-US') + '-token context cost, with and without a cache?';
}

// Draw a centered question, wrapping to two lines on narrow screens. Returns the next y.
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

function drawRowLabel(name, formula, color, y) {
  noStroke();
  fill(color);
  rect(margin, y + 3, 12, 12, 2);
  fill('#222');
  textAlign(LEFT, TOP);
  textSize(15);
  text(name, margin + 18, y);
  fill('#555');
  textSize(14);
  text(formula, margin + 18, y + 18);
}

function drawValue(s, y) {
  fill('#222');
  noStroke();
  textAlign(RIGHT, TOP);
  textSize(15);
  text(s, canvasWidth - margin, y + 7);
}

// One column per turn: the top row is without caching, the bottom row is with caching.
function drawTurnStrip(v, y, hidden) {
  const x0 = margin;
  const w = canvasWidth - 2 * margin;
  textAlign(LEFT, TOP);
  textSize(14);
  fill('#555');
  noStroke();
  if (hidden) {
    text('The cost of each turn appears after you answer.', x0, y);
    return;
  }
  let caption = 'Cost of each turn (one column per turn): top row without caching, bottom row with caching';
  if (textWidth(caption) > w) caption = 'Cost per turn: top row without cache, bottom with';
  text(caption, x0, y);
  const colW = w / v.turns;
  const rowH = 18;
  const gap = colW > 4 ? 1 : 0;
  for (let i = 0; i < v.turns; i++) {
    const x = x0 + i * colW;
    // without: every turn costs the full input price
    fill(COLOR_PLAIN);
    rect(x, y + 20, colW - gap, rowH);
    // with: first turn is a write at full price, the rest are reads at 0.20 / 5.00 of the height
    const h = i === 0 ? rowH : Math.max(2, rowH * PRICE_READ / PRICE_WRITE);
    fill(i === 0 ? COLOR_WRITE : COLOR_READ);
    rect(x, y + 22 + rowH + (rowH - h), colW - gap, h);
  }
}

function drawControlLabels(v) {
  noStroke();
  textSize(14);
  textAlign(LEFT, CENTER);
  const active = mode === 'challenge' && scenarioStatus === 'answering';
  fill(active ? '#222' : '#999');
  const y1 = drawHeight + 8 + 13;
  text('Without: $', margin, y1);
  text('With: $', margin + 160, y1);

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
    text(spec.fmt(v[spec.key]), x + textWidth(spec.label + ': ') + 2, y);
  }
  textStyle(NORMAL);
  if (mode === 'challenge') {
    fill('#777');
    textAlign(LEFT, CENTER);
    text('Sliders unlock after scenario 3.', margin + 145, drawHeight + 8 + actionRowHeight + 13);
  }
}

// ---- model ----
function costs(v) {
  const without = v.turns * v.context * PRICE_INPUT / 1e6;
  const write = v.context * PRICE_WRITE / 1e6;
  const reads = (v.turns - 1) * v.context * PRICE_READ / 1e6;
  const withC = write + reads;
  const saving = without > 0 ? (without - withC) / without * 100 : 0;
  return { without: round2(without), with: round2(withC), write, reads, saving };
}

function round2(x) {
  return Math.round(x * 100 + 1e-7) / 100;
}

function readValues() {
  const v = {};
  for (const spec of INPUTS) v[spec.key] = Number(sliders[spec.key].value());
  return v;
}

// ---- challenge flow ----
function loadScenario() {
  const s = SCENARIOS[scenarioIndex];
  sliders.context.value(s.context);
  sliders.turns.value(s.turns);
  attempt = 1;
  scenarioStatus = 'answering';
  feedback = 'Type both costs in dollars and press Check.';
  worked = '';
  feedbackColor = '#333';
  withoutInput.value('');
  withInput.value('');
  updateControls();
}

function parseMoney(s) {
  const cleaned = String(s).replace(/[$,\s]/g, '');
  if (cleaned === '' || isNaN(Number(cleaned))) return null;
  return Number(cleaned);
}

function checkAnswer() {
  if (mode !== 'challenge' || scenarioStatus !== 'answering') return;
  const a = parseMoney(withoutInput.value());
  const b = parseMoney(withInput.value());
  if (a === null || b === null) {
    feedback = 'Type a dollar amount in both boxes, such as 1.25.';
    feedbackColor = '#a15c00';
    return;
  }
  const s = SCENARIOS[scenarioIndex];
  const okWithout = Math.abs(a - s.without) <= 0.01 + 1e-9;
  const okWith = Math.abs(b - s.with) <= 0.01 + 1e-9;
  if (okWithout && okWith) {
    correctCount++;
    scenarioStatus = 'correct';
    feedback = 'Correct: with caching $' + s.with.toFixed(2) + ', without $' + s.without.toFixed(2) + '.';
    worked = s.wrong;
    feedbackColor = '#1b7a2e';
  } else if (attempt === 1) {
    attempt = 2;
    const which = okWithout ? 'Without caching is right; with caching is not. '
      : okWith ? 'With caching is right; without caching is not. ' : '';
    feedback = which + s.wrong;
    feedbackColor = '#b02a2a';
  } else {
    scenarioStatus = 'missed';
    feedback = 'Model values: without $' + s.without.toFixed(2) + ', with $' + s.with.toFixed(2) + '.';
    worked = s.wrong;
    feedbackColor = '#b02a2a';
  }
  updateControls();
}

function nextScenario() {
  if (scenarioStatus === 'answering') return;
  if (scenarioIndex < SCENARIOS.length - 1) {
    scenarioIndex++;
    loadScenario();
  } else {
    mode = 'explore';
    summary = 'Scenarios correct: ' + correctCount + ' of 3. ' +
      (correctCount === 3 ? 'Mastery shown. ' : 'Mastery is 3 of 3; press Restart scenarios to try again. ') +
      'Free exploration is on: set turns to 1, then raise it. Where does the saving start, and how close to 96% does it get?';
    updateControls();
  }
}

function restartScenarios() {
  mode = 'challenge';
  scenarioIndex = 0;
  correctCount = 0;
  summary = '';
  loadScenario();
}

function updateControls() {
  const answering = mode === 'challenge' && scenarioStatus === 'answering';
  for (const spec of INPUTS) sliders[spec.key].elt.disabled = mode !== 'explore';
  withoutInput.elt.disabled = !answering;
  withInput.elt.disabled = !answering;
  checkButton.elt.disabled = !answering;
  nextButton.elt.disabled = !(mode === 'challenge' && scenarioStatus !== 'answering');
  nextButton.html(scenarioIndex === SCENARIOS.length - 1 ? 'Finish' : 'Next scenario');
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
  withoutInput.position(margin + 72, y1);
  withoutInput.size(70, 22);
  withInput.position(margin + 210, y1);
  withInput.size(70, 22);
  checkButton.position(margin + 295, y1);

  const y2 = y1 + actionRowHeight;
  nextButton.position(margin, y2);
  nextButton.size(125, 28);
  restartButton.position(canvasWidth - margin - 150, y2);
  restartButton.size(150, 28);

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
