// Design Trade-Off Judge
// Evaluate level: for each of 8 illustrative ScreenGrab design decisions the
// learner judges which of two options better serves the stated priority.
// Eight decisions, fixed order, one attempt each. Mastery is 6 of 8.
// MicroSim template version 2026.02

// ---------- Canvas layout ----------
let canvasWidth = 400;
let drawHeight = 460;
const MIN_DRAW_HEIGHT = 460; // room for the summary screen
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

// ---------- Content (from the specification; all decisions are illustrative) ----------
const items = [
  { decision: "How to read the screen's pixels",
    priority: 'No third-party libraries; easy to maintain',
    options: ["Use the platform's own capture capability", 'Add a third-party capture library'],
    verdict: 'Option 1',
    why: 'It meets the no-libraries priority and leaves nothing outside to update' },
  { decision: 'How the tool presents itself',
    priority: 'Always ready; no window clutter',
    options: ['A regular app with a window and a Dock icon', 'A menu bar app'],
    verdict: 'Option 2',
    why: 'A menu bar app is always available and stays out of the way' },
  { decision: 'How to start a capture while another app is in front',
    priority: 'Works from any application',
    options: ["A shortcut that works only while the tool's own window is in front", 'A global hotkey'],
    verdict: 'Option 2',
    why: 'Only a global hotkey is reported to the tool when another app is in front' },
  { decision: 'How to pick the region',
    priority: 'The picture matches what the user saw when starting',
    options: ['Let the user drag over the live screen', 'Freeze the screen first, then drag over the still picture'],
    verdict: 'Option 2',
    why: 'A frozen picture cannot change during the drag' },
  { decision: 'Which shortcut to choose',
    priority: 'Avoid clashing with the system',
    options: ['Reuse Command-Shift-4', 'Choose a combination the system does not already use'],
    verdict: 'Option 2',
    why: 'Command-Shift-4 is already a built-in macOS screenshot shortcut, which would conflict' },
  { decision: 'How to learn whether hotkeys work for a background app',
    priority: 'Find problems early and cheaply',
    options: ['Build the whole app, then test the hotkey', 'Write a tiny prototype that only registers the hotkey and prints a message'],
    verdict: 'Option 2',
    why: 'A prototype answers the risky question in minutes before the rest is built' },
  { decision: 'How to build for a Mac-only tool',
    priority: 'Small size; fits the system',
    options: ['A native application', 'A cross-platform shell wrapping a web page'],
    verdict: 'Option 1',
    why: 'Native is smaller and integrates directly, and no other platform is needed' },
  { decision: 'What to do when screen recording permission is missing',
    priority: 'Avoid blank pictures without explanation',
    options: ['Capture anyway and hope the picture is right', 'Detect the missing permission and tell the user what to change'],
    verdict: 'Option 2',
    why: 'Without the permission, captures can look wrong with no error, so the user needs a message' }
];
const OPTIONS = ['Option 1', 'Option 2'];
const MASTERY = 6;
const QUESTION = 'Which option better serves the priority?';
const NEXT_LABEL = 'Next decision';
const DESCRIPTION = 'A design trade-off judge. Each of eight illustrative ScreenGrab design decisions shows a stated priority and two options. The learner picks the option that better serves the priority, confirms, and reads why.';

// ---------- State ----------
let current = 0;          // index of the decision being judged
let selected = null;      // option chosen but not yet confirmed
let answered = false;     // current decision has been confirmed
let finished = false;     // all eight judged, summary showing
let correctCount = 0;
let results = [];         // { choice, correct } per decision

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
  text('Design Trade-Off Judge', canvasWidth / 2, 12);
  textStyle(NORMAL);
  textSize(14);
  fill('#555');
  text('Decisions are illustrative', canvasWidth / 2, 40);

  textAlign(LEFT, TOP);
  textSize(16);
  fill('#222');
  text(finished ? 'All 8 decisions judged' : 'Decision ' + (current + 1) + ' of 8', margin, 66);
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
  textAlign(LEFT, TOP);

  // Decision and its stated priority
  textSize(18);
  textStyle(BOLD);
  const dLines = wrapLines(c.decision, w - 30);
  textStyle(NORMAL);
  textSize(16);
  const pLines = wrapLines('Stated priority: ' + c.priority, w - 30);
  const cardH = 34 + dLines.length * 25 + 8 + pLines.length * 22 + 10;
  fill('white');
  stroke('#1a3a6c');
  strokeWeight(2);
  rect(margin, y, w, cardH, 8);
  noStroke();
  fill('#1a3a6c');
  textSize(14);
  textStyle(BOLD);
  text('Decision ' + (current + 1), margin + 15, y + 10);
  fill('#111');
  textSize(18);
  drawLines(dLines, margin + 15, y + 32, 25);
  textStyle(NORMAL);
  let ty = y + 32 + dLines.length * 25 + 6;
  fill('#e65100');
  textSize(16);
  textStyle(BOLD);
  drawLines(pLines, margin + 15, ty, 22);
  textStyle(NORMAL);
  y += cardH + 12;

  // The two options: side by side when there is room, stacked otherwise
  const side = w >= 560;
  const ow = side ? (w - 12) / 2 : w;
  textSize(16);
  const oLines = c.options.map(o => wrapLines(o, ow - 24));
  const oh = (lines) => 36 + lines.length * 22 + 8;
  const rowH = side ? Math.max(oh(oLines[0]), oh(oLines[1])) : 0;
  for (let i = 0; i < 2; i++) {
    const ox = side ? margin + i * (ow + 12) : margin;
    const h = side ? rowH : oh(oLines[i]);
    let border = '#888';
    let bg = 'white';
    if (answered && OPTIONS[i] === c.verdict) { border = '#2e7d32'; bg = '#f1f8e9'; }
    else if (selected === i) { border = '#1a3a6c'; bg = '#e8eaf6'; }
    fill(bg);
    stroke(border);
    strokeWeight(selected === i || (answered && OPTIONS[i] === c.verdict) ? 3 : 1);
    rect(ox, y, ow, h, 8);
    noStroke();
    fill('#1a3a6c');
    textStyle(BOLD);
    textSize(15);
    let tag = OPTIONS[i];
    if (answered && OPTIONS[i] === c.verdict) tag += '  (better option)';
    else if (selected === i) tag += '  (your choice)';
    text(tag, ox + 12, y + 10);
    textStyle(NORMAL);
    fill('#111');
    textSize(16);
    drawLines(oLines[i], ox + 12, y + 32, 22);
    if (!side) y += h + 8;
  }
  if (side) y += rowH + 12;
  else y += 4;

  fill('#333');
  textStyle(ITALIC);
  drawLines(wrapLines(QUESTION, w), margin, y, 22);
  textStyle(NORMAL);
  y += 30;

  if (!answered) {
    fill('#555');
    textSize(15);
    const hint = selected === null
      ? 'Choose Option 1 or Option 2 below, then press Confirm.'
      : 'You chose ' + OPTIONS[selected] + '. Press Confirm to lock it in.';
    drawLines(wrapLines(hint, w), margin, y, 21);
    return;
  }

  const r = results[current];
  const header = r.correct ? 'Correct' : 'Not quite. The better option is ' + c.verdict;
  textSize(16);
  const whyLines = wrapLines('Why: ' + c.why + '.', w - 30);
  const panelH = 40 + whyLines.length * 22 + 8;
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
  drawLines(whyLines, margin + 15, y + 38, 22);
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
  text(mastered ? 'You can judge a design' : 'Mastery is 6 of 8. Press Restart to try again.', canvasWidth / 2, y + 40);
  y += 86;

  textAlign(LEFT, TOP);
  const wrong = items.map((c, i) => i).filter(i => results[i] && !results[i].correct);
  fill('#222');
  textStyle(BOLD);
  textSize(16);
  text(wrong.length ? 'Decisions answered wrongly, and the priority each one served' : 'You chose the better option in every decision.', margin, y);
  textStyle(NORMAL);
  y += 26;
  textSize(15);
  // Full form uses two lines per decision; fall back to one line when crowded.
  const compact = y + wrong.length * 44 + 40 > drawHeight;
  for (const i of wrong) {
    const c = items[i];
    if (!compact) {
      fill('#333');
      text(fitText((i + 1) + '. ' + c.decision, w), margin, y);
      y += 20;
    }
    fill('#e65100');
    textStyle(BOLD);
    const lead = compact ? (i + 1) + '. Priority: ' : 'Priority: ';
    const lx = compact ? margin : margin + 20;
    text(lead, lx, y);
    const lw = textWidth(lead.trim()) + 6;
    textStyle(NORMAL);
    text(fitText(c.priority, w - (lx - margin) - lw), lx + lw, y);
    y += compact ? 22 : 24;
  }
  y += 8;
  fill('#0d47a1');
  textStyle(ITALIC);
  drawLines(wrapLines('Notice that the better option follows the stated priority, not the option that sounds more impressive.', w), margin, y, 20);
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
