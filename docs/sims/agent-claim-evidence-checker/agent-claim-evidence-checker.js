// Claim and Evidence Checker
// CANVAS_HEIGHT: 534
// Evaluate level: the learner judges whether each of 8 claims in an
// illustrative agent report is supported by the evidence shown with it.
// Eight claims, fixed order, one attempt each. Mastery is 7 of 8.
// MicroSim template version 2026.02

// ---------- Canvas layout ----------
let canvasWidth = 400;
let drawHeight = 480;
const MIN_DRAW_HEIGHT = 480; // room for the summary screen
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

// ---------- Content (from the specification; illustrative, not from a real session) ----------
const items = [
  { claim: 'All 94 tests pass.',
    evidence: 'Test run output: "94 passed, 0 failed"',
    verdict: 'Supported',
    why: 'The output shows the test command ran and counts match the claim' },
  { claim: 'All tests pass.',
    evidence: 'None. The log contains no test command',
    verdict: 'Unsupported',
    why: 'No evidence that tests were run' },
  { claim: 'The app builds cleanly.',
    evidence: 'Build output ending in "error: cannot find \'copyImageToClipboard\' in scope"',
    verdict: 'Unsupported',
    why: 'The build output shows an error, which contradicts the claim' },
  { claim: 'Delayed capture waits 3 seconds.',
    evidence: 'Unit test of the delay timer: "delay = 3.0 s, passed"',
    verdict: 'Supported',
    why: 'A passing test targets exactly this claim' },
  { claim: 'The hotkey works on every Mac.',
    evidence: 'The author tried the hotkey once on one Mac',
    verdict: 'Unsupported',
    why: 'One trial on one machine does not support "every Mac"' },
  { claim: 'The README explains installation.',
    evidence: 'The README file opened, with an "Install" section listing the install command',
    verdict: 'Supported',
    why: 'The file was opened and the section exists' },
  { claim: 'The screen recording permission is handled.',
    evidence: 'Code reviewed, never run; no permission prompt appeared in testing',
    verdict: 'Unsupported',
    why: 'Written code that was never run does not show the permission flow works' },
  { claim: 'The clipboard contains the captured image.',
    evidence: 'The author pasted into an image viewer and the grab appeared',
    verdict: 'Supported',
    why: 'A person checked the real result directly' }
];
const OPTIONS = ['Supported', 'Unsupported'];
const MASTERY = 7;
const QUESTION = 'Does the evidence support the claim?';
const NEXT_LABEL = 'Next claim';
const RULES_OF_THUMB = ['Evidence must test the same claim', 'Written is not run'];
const DESCRIPTION = 'A claim and evidence checker. Each of eight claims from an illustrative agent report is shown with its evidence. The learner judges Supported or Unsupported, confirms, and reads why.';

// ---------- State ----------
let current = 0;          // index of the claim being judged
let selected = null;      // option chosen but not yet confirmed
let answered = false;     // current claim has been confirmed
let finished = false;     // all eight judged, summary showing
let correctCount = 0;
let results = [];         // { choice, correct } per claim

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
  nextButton = createButton(NEXT_LABEL);
  nextButton.mousePressed(nextItem);
  restartButton = createButton('Restart');
  restartButton.mousePressed(restart);

  fitDrawHeight();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
  updateControls();
  describe(DESCRIPTION);
}

// Measures every item with its feedback panel open at the current width and
// sets drawHeight so the tallest one fits.
function fitDrawHeight() {
  const saved = { current, selected, answered, results: results.slice() };
  let maxY = 0;
  for (let i = 0; i < items.length; i++) {
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
  nextButton.html(current === items.length - 1 ? 'See score' : NEXT_LABEL);
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
  const ok = choice === items[current].verdict;
  if (ok) correctCount++;
  results[current] = { choice: choice, correct: ok };
  answered = true;
  updateControls();
}

function nextItem() {
  if (!answered) return;
  if (current < items.length - 1) {
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

  noStroke();
  fill('#1a3a6c');
  textStyle(BOLD);
  textSize(22);
  textAlign(CENTER, TOP);
  text('Claim and Evidence Checker', canvasWidth / 2, 12);
  textStyle(NORMAL);
  textSize(14);
  fill('#555');
  text('Illustrative, not from a real session', canvasWidth / 2, 40);

  textAlign(LEFT, TOP);
  textSize(16);
  fill('#222');
  text(finished ? 'All 8 claims judged' : 'Claim ' + (current + 1) + ' of 8', margin, 66);
  textAlign(RIGHT, TOP);
  textStyle(BOLD);
  text('Correct: ' + correctCount + ' of 8', canvasWidth - margin, 66);
  textStyle(NORMAL);
  drawProgressDots(92);

  if (finished) drawSummary(118);
  else drawItem(118);
}

function drawProgressDots(y) {
  const n = items.length;
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
  const c = items[current];
  const w = canvasWidth - 2 * margin;

  // Agent report card
  textSize(18);
  const lines = wrapLines('"' + c.claim + '"', w - 30);
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
  text('Agent report says', margin + 15, y + 10);
  textStyle(NORMAL);
  fill('#111');
  textSize(18);
  drawLines(lines, margin + 15, y + 32, 25);
  y += cardH + 10;

  // Evidence panel
  textSize(16);
  const ev = wrapLines(c.evidence, w - 30);
  const evH = ev.length * 22 + 44;
  fill('#f3f3f3');
  stroke('#777');
  strokeWeight(1);
  rect(margin, y, w, evH, 8);
  noStroke();
  fill('#444');
  textSize(14);
  textStyle(BOLD);
  text('Evidence shown', margin + 15, y + 10);
  textStyle(NORMAL);
  fill('#111');
  textSize(16);
  drawLines(ev, margin + 15, y + 32, 22);
  y += evH + 14;

  fill('#333');
  textStyle(ITALIC);
  drawLines(wrapLines(QUESTION, w), margin, y, 22);
  textStyle(NORMAL);
  y += 34;

  if (!answered) {
    fill('#555');
    textSize(15);
    const hint = selected === null
      ? 'Choose Supported or Unsupported below, then press Confirm.'
      : 'You chose ' + OPTIONS[selected] + '. Press Confirm to lock it in.';
    drawLines(wrapLines(hint, w), margin, y, 21);
    return;
  }

  const r = results[current];
  const header = r.correct ? 'Correct: ' + c.verdict : 'Not quite. The correct judgment is: ' + c.verdict;
  textSize(16);
  const whyLines = wrapLines('Why: ' + c.why + '.', w - 30);
  textSize(17);
  const headLines = wrapLines(header, w - 30);
  const panelH = 18 + headLines.length * 23 + whyLines.length * 22 + 12;
  fill(r.correct ? '#e8f5e9' : '#ffebee');
  stroke(r.correct ? '#2e7d32' : '#c62828');
  strokeWeight(2);
  rect(margin, y, w, panelH, 8);
  noStroke();
  fill(r.correct ? '#1b5e20' : '#b71c1c');
  textStyle(BOLD);
  drawLines(headLines, margin + 15, y + 12, 23);
  textStyle(NORMAL);
  fill('#222');
  textSize(16);
  drawLines(whyLines, margin + 15, y + 16 + headLines.length * 23, 22);
  return y + panelH;
}

function drawSummary(y) {
  const w = canvasWidth - 2 * margin;
  fill('#e3f2fd');
  stroke('#1565c0');
  strokeWeight(2);
  rect(margin, y, w, 70, 8);
  noStroke();
  textAlign(CENTER, TOP);
  fill('#111');
  textStyle(BOLD);
  textSize(20);
  text('Correct judgments: ' + correctCount + ' of 8', canvasWidth / 2, y + 10);
  textStyle(NORMAL);
  textSize(16);
  text(correctCount >= MASTERY ? 'Mastery is 7 of 8: reached.' : 'Mastery is 7 of 8. Press Restart to try again.', canvasWidth / 2, y + 40);
  y += 84;

  // Rules of thumb
  textAlign(LEFT, TOP);
  fill('#0d47a1');
  textStyle(BOLD);
  textSize(16);
  text('Two rules of thumb', margin, y);
  textStyle(NORMAL);
  y += 24;
  for (const rule of RULES_OF_THUMB) {
    text('• ' + rule, margin + 10, y);
    y += 22;
  }
  y += 10;

  // Claims judged wrongly
  const wrong = items.map((c, i) => i).filter(i => results[i] && !results[i].correct);
  fill('#222');
  textStyle(BOLD);
  text(wrong.length ? 'Claims you judged wrongly' : 'You judged every claim correctly.', margin, y);
  textStyle(NORMAL);
  y += 24;
  textSize(15);
  // Full form: claim on one line, Why underneath. If that would overflow the
  // drawing area, fall back to one line per claim: "n. Verdict: Why".
  let fullH = 0;
  for (const i of wrong) fullH += 26 + wrapLines(items[i].why + '.', w - 20).length * 19;
  const compact = y + fullH > drawHeight - 8;
  for (const i of wrong) {
    const c = items[i];
    if (compact) {
      fill('#b71c1c');
      textStyle(BOLD);
      text((i + 1) + '. ' + c.verdict + ':', margin, y);
      const lw = textWidth((i + 1) + '. ' + c.verdict + ':') + 6;
      textStyle(NORMAL);
      fill('#333');
      text(fitText(c.why, w - lw), margin + lw, y);
      y += 21;
      continue;
    }
    fill('#b71c1c');
    text(fitText((i + 1) + '. "' + c.claim + '" is ' + c.verdict, w), margin, y);
    y += 20;
    fill('#333');
    const ls = wrapLines(c.why + '.', w - 20);
    drawLines(ls, margin + 20, y, 19);
    y += ls.length * 19 + 6;
  }
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
