// Acceptance Criteria Testability Judge
// Evaluate level: the learner judges whether each of 8 acceptance criteria is
// testable, using the test "would two people running the same check agree?"
// Eight criteria, fixed order, one attempt each. Mastery is 7 of 8.
// MicroSim template version 2026.02

// ---------- Canvas layout ----------
let canvasWidth = 400;
let drawHeight = 440;
const MIN_DRAW_HEIGHT = 440; // room for the summary screen
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

// ---------- Content (from the specification; all criteria are illustrative) ----------
const criteria = [
  { text: 'The tool should be fast.',
    verdict: 'Not testable',
    why: '"Fast" has no limit, so two people could disagree',
    repair: 'A grab completes within 1 second of releasing the mouse button' },
  { text: 'After the user drags a region and releases the mouse, the clipboard holds an image of exactly that region.',
    verdict: 'Testable',
    why: 'A person can paste and compare the picture with the region',
    repair: '' },
  { text: 'The tool is easy to use.',
    verdict: 'Not testable',
    why: '"Easy" depends on the person',
    repair: 'A new user starts a region capture using only the hotkey, with no instructions' },
  { text: 'With a 5-second delay set, the capture happens between 4.9 and 5.1 seconds after the user starts it.',
    verdict: 'Testable',
    why: 'It gives a measurable window',
    repair: '' },
  { text: 'Pressing Escape during selection ends the capture and leaves the clipboard unchanged.',
    verdict: 'Testable',
    why: 'It has a clear action and an observable result, though it needs no number',
    repair: '' },
  { text: 'The tool handles errors gracefully.',
    verdict: 'Not testable',
    why: '"Gracefully" and "errors" are undefined',
    repair: 'When the screen cannot be read, the tool shows a message and does not change the clipboard' },
  { text: 'The app works with all Macs.',
    verdict: 'Not testable',
    why: '"All" cannot be checked',
    repair: 'The app runs on the macOS versions named in the specification' },
  { text: 'Pressing Control-Shift-4 while a web browser is the frontmost app starts a region selection.',
    verdict: 'Testable',
    why: 'A person can try it and see whether a selection starts',
    repair: '' }
];
const OPTIONS = ['Testable', 'Not testable'];
const MASTERY = 7;
const QUESTION = 'Would two people running the same check reach the same verdict?';

// ---------- State ----------
let current = 0;          // index of the criterion being judged
let selected = null;      // option chosen but not yet confirmed
let answered = false;     // current criterion has been confirmed
let finished = false;     // all eight judged, summary showing
let correctCount = 0;
let results = [];         // { choice, correct } per criterion

// ---------- Controls ----------
let optionButtons = [];
let confirmButton, nextButton, restartButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Arial');

  // Create every control before positioning any of them.
  for (let i = 0; i < OPTIONS.length; i++) {
    const b = createButton(OPTIONS[i]);
    b.addClass('choice');
    b.mousePressed(() => chooseOption(i));
    optionButtons.push(b);
  }
  confirmButton = createButton('Confirm');
  confirmButton.mousePressed(confirmChoice);
  nextButton = createButton('Next criterion');
  nextButton.mousePressed(nextItem);
  restartButton = createButton('Restart');
  restartButton.mousePressed(restart);

  fitDrawHeight();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
  updateControls();
  describe('A testability judge. One acceptance criterion is shown at a time. The learner chooses Testable or Not testable, confirms, and reads feedback with a repair for untestable criteria.');
}

// Measures every item with its feedback panel open at the current width and
// sets drawHeight so the tallest one fits.
function fitDrawHeight() {
  const saved = { current, selected, answered, results: results.slice() };
  let maxY = 0;
  for (let i = 0; i < criteria.length; i++) {
    current = i;
    selected = 0;
    answered = true;
    results[i] = { choice: '', correct: false };
    maxY = Math.max(maxY, drawItem(118));
  }
  current = saved.current;
  selected = saved.selected;
  answered = saved.answered;
  results = saved.results;
  drawHeight = Math.max(MIN_DRAW_HEIGHT, Math.ceil(maxY + 16));
  canvasHeight = drawHeight + controlHeight;
}

function positionControls() {
  flowControls([...optionButtons, confirmButton, nextButton, restartButton]);
}

// Lays the buttons out left to right, wrapping to a new row when the canvas is
// narrow, and grows the control area to fit the rows.
function flowControls(list) {
  let x = margin;
  let row = 0;
  for (const b of list) {
    const bw = b.elt.offsetWidth;
    if (x > margin && x + bw > canvasWidth - margin) {
      row++;
      x = margin;
    }
    b.position(x, drawHeight + 10 + row * 40);
    x += bw + 8;
  }
  const needed = (row + 1) * 40 + 10;
  if (needed !== controlHeight) {
    controlHeight = needed;
    canvasHeight = drawHeight + controlHeight;
    resizeCanvas(canvasWidth, canvasHeight);
  }
}

function updateControls() {
  optionButtons.forEach((b, i) => {
    if (selected === i) b.addClass('selected'); else b.removeClass('selected');
    b.elt.disabled = answered || finished;
  });
  confirmButton.elt.disabled = answered || finished || selected === null;
  nextButton.elt.disabled = !answered || finished;
  nextButton.html(current === criteria.length - 1 ? 'See score' : 'Next criterion');
  positionControls();
}

function chooseOption(i) {
  if (answered || finished) return;
  selected = i;
  updateControls();
}

function confirmChoice() {
  if (answered || finished || selected === null) return;
  const choice = OPTIONS[selected];
  const ok = choice === criteria[current].verdict;
  if (ok) correctCount++;
  results[current] = { choice: choice, correct: ok };
  answered = true;
  updateControls();
}

function nextItem() {
  if (!answered) return;
  if (current < criteria.length - 1) {
    current++;
    selected = null;
    answered = false;
  } else {
    finished = true;
    selected = null;
  }
  updateControls();
}

function restart() {
  current = 0;
  selected = null;
  answered = false;
  finished = false;
  correctCount = 0;
  results = [];
  updateControls();
}

// ---------- Drawing ----------
function draw() {
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title and label
  noStroke();
  fill('#1a3a6c');
  textStyle(BOLD);
  textSize(22);
  textAlign(CENTER, TOP);
  text('Acceptance Criteria Testability Judge', canvasWidth / 2, 12);
  textStyle(NORMAL);
  textSize(14);
  fill('#555');
  text('Criteria are illustrative', canvasWidth / 2, 40);

  // Progress row
  textAlign(LEFT, TOP);
  textSize(16);
  fill('#222');
  const shown = finished ? criteria.length : current + 1;
  text(finished ? 'All 8 criteria judged' : 'Criterion ' + shown + ' of 8', margin, 66);
  textAlign(RIGHT, TOP);
  textStyle(BOLD);
  text('Correct: ' + correctCount + ' of 8', canvasWidth - margin, 66);
  textStyle(NORMAL);
  drawProgressDots(92);

  if (finished) drawSummary(118);
  else drawItem(118);
}

function drawProgressDots(y) {
  const n = criteria.length;
  const gap = 26;
  const startX = canvasWidth / 2 - ((n - 1) * gap) / 2;
  for (let i = 0; i < n; i++) {
    const x = startX + i * gap;
    stroke('#888');
    strokeWeight(1);
    if (results[i]) fill(results[i].correct ? '#2e7d32' : '#c62828');
    else if (i === current && !finished) fill('#ffd54f');
    else fill('white');
    circle(x, y + 8, 14);
  }
  noStroke();
}

function drawItem(y) {
  const c = criteria[current];
  const w = canvasWidth - 2 * margin;

  // Criterion card
  textSize(18);
  const lines = wrapLines('"' + c.text + '"', w - 30);
  const cardH = lines.length * 25 + 46;
  fill('white');
  stroke('#1a3a6c');
  strokeWeight(2);
  rect(margin, y, w, cardH, 8);
  noStroke();
  fill('#1a3a6c');
  textSize(14);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('Criterion ' + (current + 1), margin + 15, y + 10);
  textStyle(NORMAL);
  fill('#111');
  textSize(18);
  drawLines(lines, margin + 15, y + 32, 25);
  y += cardH + 14;

  // Question
  fill('#333');
  textSize(16);
  textStyle(ITALIC);
  const q = wrapLines(QUESTION, w);
  drawLines(q, margin, y, 22);
  textStyle(NORMAL);
  y += q.length * 22 + 12;

  if (!answered) {
    fill('#555');
    textSize(15);
    const hint = selected === null
      ? 'Choose Testable or Not testable below, then press Confirm.'
      : 'You chose ' + OPTIONS[selected] + '. Press Confirm to lock it in.';
    drawLines(wrapLines(hint, w), margin, y, 21);
    return;
  }

  // Feedback panel
  const r = results[current];
  const header = r.correct ? 'Correct: ' + c.verdict : 'Not quite. The verdict is: ' + c.verdict;
  textSize(16);
  const whyLines = wrapLines('Why: ' + c.why + '.', w - 30);
  const repLines = c.repair ? wrapLines('Repair: ' + c.repair + '.', w - 30) : [];
  const panelH = 40 + whyLines.length * 22 + (repLines.length ? repLines.length * 22 + 10 : 0) + 10;
  fill(r.correct ? '#e8f5e9' : '#ffebee');
  stroke(r.correct ? '#2e7d32' : '#c62828');
  strokeWeight(2);
  rect(margin, y, w, panelH, 8);
  noStroke();
  fill(r.correct ? '#1b5e20' : '#b71c1c');
  textStyle(BOLD);
  textSize(17);
  text(header, margin + 15, y + 12);
  textStyle(NORMAL);
  fill('#222');
  textSize(16);
  let ty = y + 40;
  drawLines(whyLines, margin + 15, ty, 22);
  ty += whyLines.length * 22 + 10;
  if (repLines.length) {
    fill('#0d47a1');
    drawLines(repLines, margin + 15, ty, 22);
  }
  return y + panelH;
}

function drawSummary(y) {
  const w = canvasWidth - 2 * margin;
  const mastered = correctCount >= MASTERY;
  fill(mastered ? '#e8f5e9' : '#fff8e1');
  stroke(mastered ? '#2e7d32' : '#f9a825');
  strokeWeight(2);
  rect(margin, y, w, 70, 8);
  noStroke();
  textAlign(CENTER, TOP);
  fill('#111');
  textStyle(BOLD);
  textSize(20);
  text('Score: ' + correctCount + ' of 8', canvasWidth / 2, y + 10);
  textStyle(NORMAL);
  textSize(16);
  text(mastered ? 'You can judge testability' : 'Mastery is 7 of 8. Press Restart to try again.', canvasWidth / 2, y + 40);
  y += 86;

  // Review table
  textAlign(LEFT, TOP);
  textSize(15);
  for (let i = 0; i < criteria.length; i++) {
    const c = criteria[i];
    const r = results[i];
    fill(r && r.correct ? '#2e7d32' : '#c62828');
    textStyle(BOLD);
    text((r && r.correct ? '✓ ' : '✗ ') + (i + 1) + '.', margin, y);
    textStyle(NORMAL);
    fill('#222');
    text(fitText(c.verdict + ': ' + c.text, w - 50), margin + 42, y);
    y += 24;
  }
  fill('#0d47a1');
  textStyle(ITALIC);
  drawLines(wrapLines('Notice criterion 5: it is testable without containing a number.', w), margin, y + 4, 20);
  textStyle(NORMAL);
}

// ---------- Text helpers ----------
// Shortens a string with an ellipsis so it fits on one line.
function fitText(str, maxW) {
  if (textWidth(str) <= maxW) return str;
  let t = str;
  while (t.length > 1 && textWidth(t + '\u2026') > maxW) t = t.slice(0, -1);
  return t.trimEnd() + '\u2026';
}

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
