// AI Coding Agent Loop Stepper
// Understand level: the learner explains the order of the seven stages an AI
// coding agent moves through by predicting the next stage at each of six steps.
// Step-through with Previous/Next; each prediction is locked in before the
// next stage is revealed. One attempt per step. Mastery is 5 of 6.
// MicroSim template version 2026.02

// ---------- Canvas layout ----------
let canvasWidth = 400;
let drawHeight = 560;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;
const MIN_DRAW_HEIGHT = 420;

// ---------- Content (from the specification) ----------
const stages = [
  { name: 'Request',
    what: 'The person states the goal in a natural language request',
    example: 'A short request for a tool that grabs a region and copies it to the clipboard' },
  { name: 'Clarifying questions',
    what: 'The agent asks the person to settle open choices',
    example: 'Four multiple-choice questions answered by the author' },
  { name: 'Plan',
    what: 'The agent lists the steps it intends to take',
    example: 'Specification first, then design, code, tests, installer' },
  { name: 'Tool use: write',
    what: 'The agent creates or edits files, after a permission check',
    example: 'Writing the Swift source files',
    permission: true },
  { name: 'Tool use: run',
    what: 'The agent runs commands such as a build or the tests, after a permission check',
    example: 'Building the app and running the automated tests',
    permission: true },
  { name: 'Report',
    what: 'The agent states what it did and what it believes the result is',
    example: 'A summary that the app was built and installed' },
  { name: 'Human review',
    what: 'The person checks the report against evidence and decides what happens next',
    example: 'Trying the hotkey and a first real screen grab' }
];

// Six prediction steps: stage shown, choices in fixed order, correct next stage, why.
const steps = [
  { shown: 0, choices: ['Plan', 'Clarifying questions', 'Human review'], correct: 'Clarifying questions',
    why: 'The agent settles open choices before it commits to a plan' },
  { shown: 1, choices: ['Plan', 'Report', 'Request'], correct: 'Plan',
    why: 'With the choices settled, the agent lays out its steps' },
  { shown: 2, choices: ['Tool use: write', 'Report', 'Human review'], correct: 'Tool use: write',
    why: 'Files must exist before anything can be built or tested' },
  { shown: 3, choices: ['Tool use: run', 'Request', 'Plan'], correct: 'Tool use: run',
    why: 'New files are built and tested to see whether they work' },
  { shown: 4, choices: ['Report', 'Clarifying questions', 'Request'], correct: 'Report',
    why: 'After running commands, the agent summarizes the outcome' },
  { shown: 5, choices: ['Human review', 'Plan', 'Tool use: write'], correct: 'Human review',
    why: 'A report is a claim, and the person must check it' }
];
const MASTERY = 5;
const FIRST_QUESTION = 'What does the agent do after it receives the request?';
const LATER_QUESTION = 'What comes next?';

// ---------- State ----------
let view = 0;          // 0..5 = prediction step, 6 = summary after stage 7
let answers = [];      // { choice, correct } for each answered step
let pending = null;    // index of the choice selected but not locked in
let correctCount = 0;

// ---------- Controls ----------
let choiceButtons = [];
let lockButton, prevButton, nextButton, restartButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Arial');

  // Create every control before positioning any of them.
  for (let i = 0; i < 3; i++) {
    const b = createButton('choice');
    b.addClass('choice');
    b.mousePressed(() => selectChoice(i));
    choiceButtons.push(b);
  }
  lockButton = createButton('Lock in');
  lockButton.mousePressed(lockIn);
  prevButton = createButton('← Previous');
  prevButton.mousePressed(goPrevious);
  nextButton = createButton('Next →');
  nextButton.mousePressed(goNext);
  restartButton = createButton('Restart');
  restartButton.mousePressed(restart);

  fitDrawHeight();
  resizeCanvas(canvasWidth, canvasHeight);
  updateControls();
  describe('A stepper for the seven-stage loop of an AI coding agent. At each of six steps the current stage is shown with its ScreenGrab example, and the learner predicts the next stage before it is revealed.');
}

// ---------- Control logic ----------
function isAnswered(v) { return v < steps.length && answers[v] !== undefined; }

function selectChoice(i) {
  if (view >= steps.length || isAnswered(view)) return;
  pending = i;
  updateControls();
}

function lockIn() {
  if (view >= steps.length || isAnswered(view) || pending === null) return;
  const s = steps[view];
  const choice = s.choices[pending];
  const ok = choice === s.correct;
  if (ok) correctCount++;
  answers[view] = { choice: choice, correct: ok };
  pending = null;
  updateControls();
}

function goNext() {
  // A prediction must be locked in before the next stage is revealed.
  if (view < steps.length && !isAnswered(view)) return;
  if (view < steps.length) view++;
  pending = null;
  updateControls();
}

function goPrevious() {
  if (view > 0) view--;
  pending = null;
  updateControls();
}

function restart() {
  view = 0;
  answers = [];
  pending = null;
  correctCount = 0;
  updateControls();
}

function updateControls() {
  const onStep = view < steps.length;
  for (let i = 0; i < 3; i++) {
    const b = choiceButtons[i];
    if (onStep) {
      b.html(steps[view].choices[i]);
      b.show();
    } else {
      b.hide();
    }
    const a = onStep ? answers[view] : null;
    const isSel = a ? steps[view].choices[i] === a.choice : pending === i;
    if (isSel) b.addClass('selected'); else b.removeClass('selected');
    b.elt.disabled = !onStep || isAnswered(view);
  }
  if (onStep) lockButton.show(); else lockButton.hide();
  lockButton.elt.disabled = !onStep || isAnswered(view) || pending === null;
  prevButton.elt.disabled = view === 0;
  nextButton.elt.disabled = view >= steps.length || !isAnswered(view);
  nextButton.html(view === steps.length - 1 ? 'Next: see the loop →' : 'Next →');
  positionControls();
}

// Row 1 holds the three choices and Lock in; row 2 holds navigation.
// Either row wraps when the canvas is narrow.
function positionControls() {
  const rows = [[...choiceButtons, lockButton], [prevButton, nextButton, restartButton]];
  let y = drawHeight + 10;
  for (const list of rows) {
    let x = margin;
    for (const b of list) {
      const bw = b.elt.offsetWidth;
      if (x > margin && x + bw > canvasWidth - margin) {
        y += 40;
        x = margin;
      }
      b.position(x, y);
      x += bw + 8;
    }
    y += 40;
  }
  const needed = y - drawHeight + 2;
  if (needed !== controlHeight) {
    controlHeight = needed;
    canvasHeight = drawHeight + controlHeight;
    resizeCanvas(canvasWidth, canvasHeight);
  }
}

// ---------- Drawing ----------
function draw() {
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);
  drawView();
  if (view >= steps.length) {
    noStroke();
    fill('#555');
    textSize(15);
    textAlign(LEFT, TOP);
    text('Use Previous to review any step, or Restart.', margin, drawHeight + 18);
  }
}

// Draws the whole drawing area and returns the lowest y used.
function drawView() {
  noStroke();
  fill('#1a3a6c');
  textStyle(BOLD);
  textSize(22);
  textAlign(CENTER, TOP);
  text('AI Coding Agent Loop Stepper', canvasWidth / 2, 12);
  textStyle(NORMAL);

  textAlign(LEFT, TOP);
  textSize(16);
  fill('#222');
  text(view < steps.length ? 'Step ' + (view + 1) + ' of 6' : 'All 6 steps done', margin, 46);
  textAlign(RIGHT, TOP);
  textStyle(BOLD);
  text('Correct: ' + correctCount + ' of 6', canvasWidth - margin, 46);
  textStyle(NORMAL);

  let y = drawLoop(76);
  y = drawStageCard(y + 10);
  if (view < steps.length) return drawPrediction(y + 10);
  return drawSummary(y + 10);
}

// Number of stages whose names are visible: stage 1 plus one per answered step.
function revealedCount() {
  let n = 1;
  while (n <= steps.length && answers[n - 1] !== undefined) n++;
  return n;
}

// The seven stages as chips in one row (two rows when narrow), with arrows,
// permission badges and, once complete, the return path to stage 1.
function drawLoop(y) {
  const w = canvasWidth - 2 * margin;
  const gap = 16;
  let perRow = 7;
  let chipW = (w - gap * (perRow - 1)) / perRow;
  if (chipW < 76) {
    perRow = 4;
    chipW = (w - gap * (perRow - 1)) / perRow;
  }
  const chipH = 52;
  const rowGap = 34;
  const revealed = revealedCount();
  const current = view < steps.length ? steps[view].shown : 6;
  const pos = [];
  for (let i = 0; i < 7; i++) {
    const r = Math.floor(i / perRow);
    const c = i % perRow;
    pos.push({ x: margin + c * (chipW + gap), y: y + r * (chipH + rowGap) });
  }
  // Arrows between consecutive stages
  stroke('#555');
  strokeWeight(2);
  fill('#555');
  for (let i = 0; i < 6; i++) {
    const a = pos[i];
    const b = pos[i + 1];
    if (a.y === b.y) {
      arrow(a.x + chipW + 2, a.y + chipH / 2, b.x - 2, b.y + chipH / 2);
    } else {
      // wrap to the next row: down from the end of row 1, then to the start of row 2
      const x1 = a.x + chipW / 2;
      const midY = a.y + chipH + rowGap / 2 + 4;
      noFill();
      line(x1, a.y + chipH + 2, x1, midY);
      line(x1, midY, b.x + chipW / 2, midY);
      fill('#555');
      arrow(b.x + chipW / 2, midY, b.x + chipW / 2, b.y - 2);
    }
  }
  // Return path from stage 7 to stage 1 once the loop is complete
  const badgeSpace = 40;
  let bottom = pos[6].y + chipH + badgeSpace;
  if (view >= steps.length) {
    stroke('#6a1b9a');
    strokeWeight(2);
    const x7 = pos[6].x + chipW / 2;
    const x1 = pos[0].x + chipW / 2;
    if (perRow === 7) {
      const yb = pos[6].y + chipH + badgeSpace;
      drawingContext.setLineDash([6, 4]);
      line(x7, pos[6].y + chipH + 2, x7, yb);
      line(x7, yb, x1, yb);
      drawingContext.setLineDash([]);
      fill('#6a1b9a');
      arrowColored(x1, yb, x1, pos[0].y + chipH + 3, '#6a1b9a');
      noStroke();
      fill('#6a1b9a');
      textSize(14);
      textAlign(CENTER, TOP);
      text('back to stage 1 with a new or refined prompt', (x1 + x7) / 2, yb + 4);
      bottom = yb + 24;
    } else {
      noStroke();
      fill('#6a1b9a');
      textSize(14);
      textAlign(LEFT, TOP);
      text('\u21BA 7 returns to 1 with a new or refined prompt', margin, bottom - 14);
      bottom += 8;
    }
  }
  // Chips
  for (let i = 0; i < 7; i++) {
    const p = pos[i];
    const shown = i < revealed;
    let bg = shown ? 'white' : '#e0e0e0';
    let border = shown ? '#1a3a6c' : '#9e9e9e';
    if (i === current) { bg = '#fff59d'; border = '#f57f17'; }
    fill(bg);
    stroke(border);
    strokeWeight(i === current ? 3 : 1.5);
    rect(p.x, p.y, chipW, chipH, 8);
    noStroke();
    fill(shown ? '#111' : '#757575');
    textAlign(CENTER, CENTER);
    textSize(14);
    const label = shown ? stages[i].name : '?';
    const lines = wrapLines((i + 1) + '. ' + label, chipW - 8);
    const lh = 16;
    const top = p.y + chipH / 2 - ((lines.length - 1) * lh) / 2;
    for (let k = 0; k < Math.min(lines.length, 3); k++) text(lines[k], p.x + chipW / 2, top + k * lh);
    // permission badge
    if (shown && stages[i].permission) {
      fill('#c62828');
      textSize(14);
      textStyle(BOLD);
      textAlign(CENTER, TOP);
      text('permission', p.x + chipW / 2, p.y + chipH + 3);
      text('check', p.x + chipW / 2, p.y + chipH + 19);
      textStyle(NORMAL);
    }
  }
  textAlign(LEFT, TOP);
  return bottom;
}

function arrow(x1, y1, x2, y2) {
  arrowColored(x1, y1, x2, y2, '#555');
}

function arrowColored(x1, y1, x2, y2, col) {
  stroke(col);
  line(x1, y1, x2, y2);
  const a = atan2(y2 - y1, x2 - x1);
  const s = 8;
  noStroke();
  fill(col);
  triangle(x2, y2, x2 - s * cos(a - 0.45), y2 - s * sin(a - 0.45), x2 - s * cos(a + 0.45), y2 - s * sin(a + 0.45));
  stroke(col);
}

// Detail card for the stage currently shown.
function drawStageCard(y) {
  const w = canvasWidth - 2 * margin;
  const idx = view < steps.length ? steps[view].shown : 6;
  const st = stages[idx];
  textSize(16);
  const whatL = wrapLines('What happens: ' + st.what + '.', w - 30);
  const exL = wrapLines('ScreenGrab example: ' + st.example + '.', w - 30);
  const permL = st.permission ? wrapLines('Permission check: the agent must be allowed to do this before the stage runs.', w - 30) : [];
  const h = 40 + whatL.length * 22 + 6 + exL.length * 22 + (permL.length ? 6 + permL.length * 22 : 0) + 10;
  fill('white');
  stroke('#1a3a6c');
  strokeWeight(2);
  rect(margin, y, w, h, 8);
  noStroke();
  fill('#1a3a6c');
  textStyle(BOLD);
  textSize(18);
  textAlign(LEFT, TOP);
  text('Stage ' + (idx + 1) + ': ' + st.name, margin + 15, y + 11);
  textStyle(NORMAL);
  textSize(16);
  fill('#222');
  let ty = y + 40;
  drawLines(whatL, margin + 15, ty, 22);
  ty += whatL.length * 22 + 6;
  fill('#0d47a1');
  drawLines(exL, margin + 15, ty, 22);
  ty += exL.length * 22 + 6;
  if (permL.length) {
    fill('#c62828');
    drawLines(permL, margin + 15, ty, 22);
  }
  return y + h;
}

function drawPrediction(y) {
  const w = canvasWidth - 2 * margin;
  const s = steps[view];
  const a = answers[view];
  fill('#333');
  textSize(17);
  textStyle(BOLD);
  const q = wrapLines(view === 0 ? FIRST_QUESTION : LATER_QUESTION, w);
  drawLines(q, margin, y, 23);
  textStyle(NORMAL);
  y += q.length * 23 + 8;
  if (!a) {
    fill('#555');
    textSize(15);
    const hint = pending === null
      ? 'Pick one of the three stages below, then press Lock in.'
      : 'You picked ' + s.choices[pending] + '. Press Lock in to reveal the next stage.';
    const hl = wrapLines(hint, w);
    drawLines(hl, margin, y, 21);
    return y + hl.length * 21;
  }
  const header = a.correct ? 'Correct' : 'Not quite. The next stage is: ' + s.correct;
  textSize(16);
  const whyL = wrapLines('Why: ' + s.why + '.', w - 30);
  textSize(17);
  const headL = wrapLines(header, w - 30);
  const h = 18 + headL.length * 23 + whyL.length * 22 + 12;
  fill(a.correct ? '#e8f5e9' : '#ffebee');
  stroke(a.correct ? '#2e7d32' : '#c62828');
  strokeWeight(2);
  rect(margin, y, w, h, 8);
  noStroke();
  fill(a.correct ? '#1b5e20' : '#b71c1c');
  textStyle(BOLD);
  drawLines(headL, margin + 15, y + 12, 23);
  textStyle(NORMAL);
  fill('#222');
  textSize(16);
  drawLines(whyL, margin + 15, y + 16 + headL.length * 23, 22);
  return y + h;
}

function drawSummary(y) {
  const w = canvasWidth - 2 * margin;
  const mastered = correctCount >= MASTERY;
  textSize(16);
  const msg = mastered ? 'You can explain the loop' : 'Mastery is 5 of 6. Press Restart to try again.';
  const loopL = wrapLines('After stage 7 the loop can return to stage 1 with a new or refined prompt.', w - 30);
  const h = 40 + 24 + loopL.length * 22 + 10;
  fill(mastered ? '#e8f5e9' : '#fff8e1');
  stroke(mastered ? '#2e7d32' : '#f9a825');
  strokeWeight(2);
  rect(margin, y, w, h, 8);
  noStroke();
  fill('#111');
  textStyle(BOLD);
  textSize(19);
  textAlign(LEFT, TOP);
  text('Score: ' + correctCount + ' of 6', margin + 15, y + 10);
  textStyle(NORMAL);
  textSize(16);
  text(msg, margin + 15, y + 38);
  fill('#6a1b9a');
  drawLines(loopL, margin + 15, y + 62, 22);
  y += h + 12;

  // The seven stages in order, with the permission checks and human review marked
  fill('#222');
  textStyle(BOLD);
  textSize(16);
  text('The seven stages in order', margin, y);
  textStyle(NORMAL);
  y += 24;
  const twoCol = w >= 680;
  const colW = twoCol ? w / 2 : w;
  textSize(15);
  for (let i = 0; i < 7; i++) {
    const col = twoCol && i >= 4 ? 1 : 0;
    const row = twoCol ? (i >= 4 ? i - 4 : i) : i;
    const x = margin + col * colW;
    const ty = y + row * 22;
    fill('#222');
    const base = (i + 1) + '. ' + stages[i].name;
    text(base, x, ty);
    let mark = '';
    if (stages[i].permission) { mark = '  (permission check first)'; fill('#c62828'); }
    if (i === 6) { mark = '  (the person checks the report)'; fill('#2e7d32'); }
    if (mark) {
      textStyle(BOLD);
      text(mark, x + textWidth(base), ty);
      textStyle(NORMAL);
    }
  }
  return y + (twoCol ? 4 : 7) * 22;
}

// Measures every view at the current width and sets drawHeight so the
// tallest one fits.
function fitDrawHeight() {
  const saved = { view, answers: answers.slice(), pending, correctCount };
  let maxY = 0;
  for (let v = 0; v <= steps.length; v++) {
    view = v;
    answers = [];
    for (let i = 0; i < Math.min(v + 1, steps.length); i++) answers[i] = { choice: '', correct: false };
    maxY = Math.max(maxY, drawView());
  }
  view = saved.view;
  answers = saved.answers;
  pending = saved.pending;
  correctCount = saved.correctCount;
  drawHeight = Math.max(MIN_DRAW_HEIGHT, Math.ceil(maxY + 16));
  canvasHeight = drawHeight + controlHeight;
}

// ---------- Text helpers ----------
function wrapLines(str, maxW) {
  const words = str.split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    const test = line ? line + ' ' + word : word;
    if (textWidth(test) > maxW && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function drawLines(lines, x, y, lh) {
  for (let i = 0; i < lines.length; i++) text(lines[i], x, y + i * lh);
}

// ---------- Responsive ----------
function windowResized() {
  updateCanvasSize();
  if (restartButton) fitDrawHeight();
  resizeCanvas(canvasWidth, canvasHeight);
  if (restartButton) positionControls();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = Math.max(360, container.offsetWidth);
}
