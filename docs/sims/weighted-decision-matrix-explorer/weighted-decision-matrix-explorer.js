// Weighted Decision Matrix Explorer
// CANVAS_HEIGHT: 719
// Two options (Subscribe, Generate) scored 1-5 on five criteria.
// The learner changes one weight at a time to see which criteria can flip
// the winner, then answers two evaluation questions (two attempts each).

let canvasWidth = 800;
let drawHeight = 590;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;

const CRITERIA = [
  { name: 'Cost over five years', weight: 5, sub: 2, gen: 5 },
  { name: 'Fit to what I use', weight: 4, sub: 2, gen: 5 },
  { name: 'Verification effort', weight: 3, sub: 5, gen: 2 },
  { name: 'Maintenance load', weight: 3, sub: 5, gen: 2 },
  { name: 'Risk if it fails', weight: 2, sub: 4, gen: 3 }
];
const SUB_COLOR = '#8e44ad';
const GEN_COLOR = '#d35400';

const QUESTIONS = [
  { text: 'By how many points does the leading option win at default weights?',
    answer: 7,
    wrong: 'Generate 63 minus Subscribe 56 = 7.' },
  { text: 'For how many criteria does changing that weight alone flip the winner?',
    answer: 2,
    wrong: 'Only Cost (weight 1 or 2) and Fit (weight 1) flip the winner; changing Verification, Maintenance, or Risk alone does not.' }
];

// ---- State ----
let qIndex = 0;
let attempts = 0;
let resolved = false;
let feedback = '';
let feedbackColor = '#212529';
let correctCount = 0;
let allDone = false;

// ---- Controls ----
let weightSliders = [];
let resetButton, answerInput, checkButton, nextButton;

// table geometry (computed in layout())
let tableTop = 104;
let headerH = 30;
let rowH = 38;
let colX = {};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Arial');

  for (const c of CRITERIA) weightSliders.push(createSlider(1, 5, c.weight, 1));
  resetButton = createButton('Reset Weights');
  resetButton.mousePressed(resetWeights);
  answerInput = createInput('', 'number');
  answerInput.attribute('step', '1');
  answerInput.elt.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') checkAnswer();
  });
  checkButton = createButton('Check');
  checkButton.mousePressed(checkAnswer);
  nextButton = createButton('Next Question');
  nextButton.mousePressed(nextQuestion);

  for (const el of [resetButton, answerInput, checkButton, nextButton]) el.style('font-size', '16px');
  answerInput.size(70);

  positionControls();
  refreshControls();
}

function layout() {
  const w = canvasWidth - 2 * margin;
  const optW = Math.min(130, Math.max(96, w * 0.16));
  const weightW = Math.min(200, Math.max(130, w * 0.25));
  colX.criterion = margin;
  colX.weight = margin + w - 2 * optW - weightW;
  colX.sub = colX.weight + weightW;
  colX.gen = colX.sub + optW;
  colX.end = margin + w;
  colX.weightW = weightW;
  colX.optW = optW;
}

function positionControls() {
  layout();
  for (let i = 0; i < weightSliders.length; i++) {
    const y = tableTop + headerH + i * rowH + rowH / 2 - 10;
    weightSliders[i].position(colX.weight + 8, y);
    weightSliders[i].size(colX.weightW - 52);
  }
  const row1 = drawHeight + 12;
  const row2 = drawHeight + 52;
  resetButton.position(margin, row1);
  answerInput.position(margin + 75, row2);
  checkButton.position(margin + 165, row2);
  nextButton.position(margin + 235, row2);
}

function refreshControls() {
  if (allDone) {
    answerInput.attribute('disabled', '');
    checkButton.attribute('disabled', '');
    nextButton.hide();
  } else if (resolved) {
    answerInput.attribute('disabled', '');
    checkButton.attribute('disabled', '');
    nextButton.show();
    nextButton.html(qIndex < QUESTIONS.length - 1 ? 'Next Question' : 'Finish');
  } else {
    answerInput.removeAttribute('disabled');
    checkButton.removeAttribute('disabled');
    nextButton.hide();
  }
}

// ---- Model ----
function weights() {
  return weightSliders.map((s) => s.value());
}

function totals(ws) {
  let s = 0;
  let g = 0;
  for (let i = 0; i < CRITERIA.length; i++) {
    s += ws[i] * CRITERIA[i].sub;
    g += ws[i] * CRITERIA[i].gen;
  }
  return { sub: s, gen: g };
}

function leaderText(t) {
  if (t.sub === t.gen) return 'tie';
  return t.gen > t.sub ? 'Generate' : 'Subscribe';
}

// ---- Actions ----
function resetWeights() {
  for (let i = 0; i < CRITERIA.length; i++) weightSliders[i].value(CRITERIA[i].weight);
}

function checkAnswer() {
  if (resolved || allDone) return;
  const raw = String(answerInput.value()).trim();
  const n = Number(raw);
  if (raw === '' || !Number.isInteger(n)) {
    feedback = 'Enter a whole number.';
    feedbackColor = '#6c4a00';
    return;
  }
  const q = QUESTIONS[qIndex];
  attempts++;
  if (n === q.answer) {
    correctCount++;
    resolved = true;
    feedback = 'Correct.';
    feedbackColor = '#2e7d32';
  } else if (attempts < 2) {
    feedback = q.wrong + ' Try once more.';
    feedbackColor = '#c62828';
  } else {
    resolved = true;
    feedback = q.wrong + ' The answer is ' + q.answer + '.';
    feedbackColor = '#c62828';
  }
  refreshControls();
}

function nextQuestion() {
  if (!resolved) return;
  if (qIndex < QUESTIONS.length - 1) {
    qIndex++;
    attempts = 0;
    resolved = false;
    feedback = '';
    answerInput.value('');
  } else {
    allDone = true;
  }
  refreshControls();
}

// ---- Drawing ----
function draw() {
  stroke('silver');
  strokeWeight(1);
  fill('aliceblue');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  noStroke();
  textAlign(LEFT, TOP);
  fill('#1a3a6c');
  textSize(22);
  textStyle(BOLD);
  text('Weighted Decision Matrix Explorer', margin, 12);
  textStyle(NORMAL);

  textSize(14);
  const badge = 'Scores and weights are illustrative judgments';
  const bw = textWidth(badge) + 16;
  fill('#fff3cd');
  stroke('#e0c97f');
  rect(margin, 42, bw, 22, 11);
  noStroke();
  fill('#6c4a00');
  text(badge, margin + 8, 46);

  fill('#3949ab');
  textSize(18);
  textStyle(BOLD);
  text("Is Generate's lead solid, or does it depend on one weight?", margin, 74, canvasWidth - 2 * margin);
  textStyle(NORMAL);

  const ws = weights();
  const t = totals(ws);
  let y = drawTable(ws, t);
  y = drawTotals(t, y + 12);
  drawQuestion(y + 12);

  // control labels
  fill('#212529');
  textSize(16);
  textAlign(LEFT, CENTER);
  text('Answer:', margin, drawHeight + 64);
  textSize(14);
  fill('#555');
  text('Change one weight at a time, then reset.', margin + 140, drawHeight + 24);
  textAlign(LEFT, TOP);
}

function drawTable(ws, t) {
  layout();
  const x = margin;
  const w = canvasWidth - 2 * margin;
  const lead = leaderText(t);

  // header
  fill('#e3e8f0');
  rect(x, tableTop, w, headerH, 6, 6, 0, 0);
  textSize(14);
  textStyle(BOLD);
  fill('#212529');
  text('Criterion', colX.criterion + 8, tableTop + 8);
  text('Weight (1 to 5)', colX.weight + 8, tableTop + 8);
  fill(SUB_COLOR);
  text('Subscribe', colX.sub + 8, tableTop + 8);
  fill(GEN_COLOR);
  text('Generate', colX.gen + 8, tableTop + 8);
  textStyle(NORMAL);

  let y = tableTop + headerH;
  for (let i = 0; i < CRITERIA.length; i++) {
    const c = CRITERIA[i];
    const changed = ws[i] !== c.weight;
    fill(changed ? '#fff8e1' : (i % 2 === 0 ? 'white' : '#f7f9fc'));
    rect(x, y, w, rowH);
    fill('#212529');
    textSize(15);
    const lines = wrapLines(c.name, colX.weight - colX.criterion - 14);
    const ty = y + rowH / 2 - (lines.length * 18) / 2;
    for (let k = 0; k < lines.length; k++) text(lines[k], colX.criterion + 8, ty + k * 18);
    // weight value to the right of the slider
    textStyle(BOLD);
    textSize(16);
    fill(changed ? '#b26a00' : '#212529');
    textAlign(RIGHT, CENTER);
    text(ws[i], colX.sub - 12, y + rowH / 2);
    textAlign(LEFT, CENTER);
    textStyle(NORMAL);
    textSize(15);
    fill('#212529');
    text(c.sub + ' × ' + ws[i] + ' = ' + (c.sub * ws[i]), colX.sub + 8, y + rowH / 2);
    text(c.gen + ' × ' + ws[i] + ' = ' + (c.gen * ws[i]), colX.gen + 8, y + rowH / 2);
    textAlign(LEFT, TOP);
    y += rowH;
  }

  // totals row
  fill('#e3e8f0');
  rect(x, y, w, 34, 0, 0, 6, 6);
  fill('#212529');
  textStyle(BOLD);
  textSize(15);
  textAlign(LEFT, CENTER);
  text('Total (score × weight, max 85)', colX.criterion + 8, y + 17);
  fill(lead === 'Subscribe' ? SUB_COLOR : '#212529');
  text(t.sub, colX.sub + 8, y + 17);
  fill(lead === 'Generate' ? GEN_COLOR : '#212529');
  text(t.gen, colX.gen + 8, y + 17);
  textStyle(NORMAL);
  textAlign(LEFT, TOP);

  // grid lines
  stroke('#d0d7de');
  noFill();
  rect(x, tableTop, w, y + 34 - tableTop, 6);
  line(colX.weight, tableTop, colX.weight, y + 34);
  line(colX.sub, tableTop, colX.sub, y + 34);
  line(colX.gen, tableTop, colX.gen, y + 34);
  noStroke();
  return y + 34;
}

function drawTotals(t, y) {
  const lead = leaderText(t);
  const labelW = 90;
  const barX = margin + labelW;
  const barW = canvasWidth - 2 * margin - labelW - 50;
  const rows = [
    { name: 'Subscribe', v: t.sub, c: SUB_COLOR },
    { name: 'Generate', v: t.gen, c: GEN_COLOR }
  ];
  textSize(14);
  for (const r of rows) {
    fill('#212529');
    textAlign(LEFT, CENTER);
    text(r.name, margin, y + 9);
    fill('#e9ecef');
    rect(barX, y, barW, 18, 3);
    fill(r.c);
    rect(barX, y, barW * r.v / 85, 18, 3);
    fill('#212529');
    text(r.v, barX + barW + 6, y + 9);
    y += 24;
  }
  textAlign(LEFT, TOP);
  textSize(17);
  textStyle(BOLD);
  if (lead === 'tie') {
    fill('#6c4a00');
    text('Leader: tie (both ' + t.sub + ')', margin, y + 4);
  } else {
    fill(lead === 'Generate' ? GEN_COLOR : SUB_COLOR);
    text('Leader: ' + lead + ' by ' + Math.abs(t.gen - t.sub) + ' points', margin, y + 4);
  }
  textStyle(NORMAL);
  return y + 30;
}

function drawQuestion(y) {
  const w = canvasWidth - 2 * margin;
  const h = drawHeight - y - 10;
  fill('white');
  stroke('#d0d7de');
  rect(margin, y, w, h, 8);
  noStroke();
  const x = margin + 12;
  const iw = w - 24;
  let yy = y + 10;

  textAlign(RIGHT, TOP);
  textSize(15);
  textStyle(BOLD);
  fill('#1a3a6c');
  text('Questions correct: ' + correctCount + ' of 2', margin + w - 12, yy);
  textStyle(NORMAL);
  textAlign(LEFT, TOP);

  if (allDone) {
    textSize(16);
    fill('#212529');
    textStyle(BOLD);
    text('Both questions answered.', x, yy);
    textStyle(NORMAL);
    yy += 26;
    drawWrapped('Notice: most weights can change a lot without changing the winner, and a few cannot. ' +
      'Weights are judgments, so a robust choice is one that survives reasonable changes to them.', x, yy, iw, 21);
    return;
  }

  const q = QUESTIONS[qIndex];
  textSize(15);
  fill('#555');
  text('Question ' + (qIndex + 1) + ' of 2' + (resolved ? '' : '   ·   attempt ' + (attempts + 1) + ' of 2'), x, yy);
  yy += 24;
  textSize(16);
  textStyle(BOLD);
  fill('#212529');
  yy += drawWrapped(q.text, x, yy, iw, 21) + 6;
  textStyle(NORMAL);
  if (feedback) {
    fill(feedbackColor);
    textSize(15);
    textStyle(BOLD);
    drawWrapped(feedback, x, yy, iw, 20);
    textStyle(NORMAL);
  } else {
    fill('#555');
    textSize(15);
    drawWrapped('Type a whole number in the Answer box below and press Check.', x, yy, iw, 20);
  }
}

// ---- Text helpers ----
function wrapLines(str, maxW) {
  const words = String(str).split(' ');
  const lines = [];
  let cur = '';
  for (const word of words) {
    const t = cur ? cur + ' ' + word : word;
    if (cur && textWidth(t) > maxW) {
      lines.push(cur);
      cur = word;
    } else {
      cur = t;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

function drawWrapped(str, x, y, maxW, lineH) {
  const lines = wrapLines(str, maxW);
  for (let i = 0; i < lines.length; i++) text(lines[i], x, y + i * lineH);
  return lines.length * lineH;
}

// ---- Responsive sizing ----
function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = Math.max(420, Math.floor(container.getBoundingClientRect().width));
}
