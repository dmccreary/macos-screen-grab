// AI-Assisted Build Stage Sequencer
// Remember level: the learner lists the five stages of the ScreenGrab build in
// order by arranging five scrambled cards. Two submissions are allowed.
// Drag a card to a new position, or select it and use Move up / Move down.
// MicroSim template version 2026.02

// ---------- Canvas layout ----------
let canvasWidth = 400;
let drawHeight = 520;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;
const MIN_DRAW_HEIGHT = 420;
const MAX_ATTEMPTS = 2;

// ---------- Content (from the specification) ----------
// Listed in the correct order; position = index + 1.
const stages = [
  { name: 'Specification',
    output: 'A minimal specification of what the tool does and does not do',
    why: 'Everything else is built from what the tool is supposed to do' },
  { name: 'Design',
    output: 'A design document of components, decisions, and trade-offs',
    why: 'The design turns the requirements into a plan that fits the platform' },
  { name: 'Code',
    output: 'About 2,000 lines of Swift in 19 files',
    why: 'Code is written from the design' },
  { name: 'Tests',
    output: 'About 1,370 lines, with 94 automated tests',
    why: 'Tests check the code against the specification' },
  { name: 'Installer',
    output: 'Install and build scripts of about 500 lines, plus a README',
    why: 'The installer packages code that already exists and has been checked' }
];
// Scrambled starting order: Installer, Code, Specification, Tests, Design
const START_ORDER = [4, 2, 0, 3, 1];
const INSTRUCTION = 'Put the build in the order it happened.';
const QUESTION = 'Which stage came first?';

// ---------- State ----------
let order = START_ORDER.slice();   // order[slot] = stage index
let attempts = 0;
let lastCorrectCount = null;       // cards in the right position on the last wrong try
let solved = false;
let done = false;                  // solved, or out of attempts: show the answer
let selectedSlot = null;
let cardRects = [];                // slot geometry for hit testing

// drag state
let dragSlot = null;
let dragStartY = 0;
let dragOffsetY = 0;
let dragMoved = false;
let dragY = 0;

// ---------- Controls ----------
let upButton, downButton, submitButton, restartButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Arial');

  // Create every control before positioning any of them.
  upButton = createButton('↑ Move up');
  upButton.mousePressed(() => moveSelected(-1));
  downButton = createButton('↓ Move down');
  downButton.mousePressed(() => moveSelected(1));
  submitButton = createButton('Submit order');
  submitButton.mousePressed(submitOrder);
  restartButton = createButton('Restart');
  restartButton.mousePressed(restart);

  fitDrawHeight();
  resizeCanvas(canvasWidth, canvasHeight);
  updateControls();
  describe('A sequencing task with five cards, one for each stage of the ScreenGrab build and its output. The learner drags the cards into the order the build happened and submits, with two attempts.');
}

// ---------- Control logic ----------
function moveSelected(dir) {
  if (done || selectedSlot === null) return;
  const to = selectedSlot + dir;
  if (to < 0 || to >= order.length) return;
  [order[selectedSlot], order[to]] = [order[to], order[selectedSlot]];
  selectedSlot = to;
  updateControls();
}

function submitOrder() {
  if (done) return;
  attempts++;
  const n = order.filter((s, slot) => s === slot).length;
  if (n === order.length) {
    solved = true;
    done = true;
  } else {
    lastCorrectCount = n;
    if (attempts >= MAX_ATTEMPTS) done = true;
  }
  selectedSlot = null;
  updateControls();
}

function restart() {
  order = START_ORDER.slice();
  attempts = 0;
  lastCorrectCount = null;
  solved = false;
  done = false;
  selectedSlot = null;
  dragSlot = null;
  updateControls();
}

function updateControls() {
  upButton.elt.disabled = done || selectedSlot === null || selectedSlot === 0;
  downButton.elt.disabled = done || selectedSlot === null || selectedSlot === order.length - 1;
  submitButton.elt.disabled = done;
  submitButton.html(attempts === 0 ? 'Submit order' : 'Submit again');
  positionControls();
}

function positionControls() {
  const list = [upButton, downButton, submitButton, restartButton];
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

// ---------- Mouse: select and drag cards ----------
function slotAt(mx, my) {
  for (let i = 0; i < cardRects.length; i++) {
    const r = cardRects[i];
    if (mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h) return i;
  }
  return null;
}

function mousePressed() {
  if (done) return;
  const s = slotAt(mouseX, mouseY);
  if (s === null) return;
  dragSlot = s;
  dragStartY = mouseY;
  dragOffsetY = mouseY - cardRects[s].y;
  dragY = cardRects[s].y;
  dragMoved = false;
}

function mouseDragged() {
  if (dragSlot === null) return;
  if (Math.abs(mouseY - dragStartY) > 4) dragMoved = true;
  dragY = mouseY - dragOffsetY;
}

function mouseReleased() {
  if (dragSlot === null) return;
  if (!dragMoved) {
    selectedSlot = selectedSlot === dragSlot ? null : dragSlot;
  } else {
    // drop into the slot whose centre is nearest the dragged card's centre
    const centre = dragY + cardRects[dragSlot].h / 2;
    let best = dragSlot;
    let bestD = Infinity;
    for (let i = 0; i < cardRects.length; i++) {
      const d = Math.abs(cardRects[i].y + cardRects[i].h / 2 - centre);
      if (d < bestD) { bestD = d; best = i; }
    }
    const [moved] = order.splice(dragSlot, 1);
    order.splice(best, 0, moved);
    selectedSlot = best;
  }
  dragSlot = null;
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
  drawView();
}

function drawView() {
  const w = canvasWidth - 2 * margin;
  noStroke();
  fill('#1a3a6c');
  textStyle(BOLD);
  textSize(22);
  textAlign(CENTER, TOP);
  text('AI-Assisted Build Stage Sequencer', canvasWidth / 2, 12);
  textStyle(NORMAL);

  textAlign(LEFT, TOP);
  textSize(16);
  fill('#222');
  let y = 46;
  if (!done) {
    textStyle(BOLD);
    const il = wrapLines(INSTRUCTION + ' ' + QUESTION, w - 150);
    drawLines(il, margin, y, 22);
    textStyle(NORMAL);
    textAlign(RIGHT, TOP);
    text('Attempt ' + Math.min(attempts + 1, MAX_ATTEMPTS) + ' of 2', canvasWidth - margin, y);
    textAlign(LEFT, TOP);
    y += il.length * 22 + 4;
    fill('#555');
    textSize(15);
    const hl = wrapLines('Drag a card to move it, or click a card and use Move up / Move down. Position 1 is the first stage.', w);
    drawLines(hl, margin, y, 20);
    y += hl.length * 20 + 8;
    if (lastCorrectCount !== null) {
      const msg = lastCorrectCount + ' of 5 cards are in the right position. Try once more.';
      fill('#fff8e1');
      stroke('#f9a825');
      strokeWeight(2);
      rect(margin, y, w, 36, 8);
      noStroke();
      fill('#6d4c00');
      textStyle(BOLD);
      textSize(16);
      text(msg, margin + 12, y + 10);
      textStyle(NORMAL);
      y += 46;
    }
    return drawCards(y);
  }
  return drawAnswer(y);
}

function drawCards(y) {
  const w = canvasWidth - 2 * margin;
  const numW = 44;
  const cw = w - numW;
  textSize(16);
  const heights = order.map(s => 34 + wrapLines(stages[s].output, cw - 24).length * 21 + 6);
  cardRects = [];
  let ty = y;
  for (let slot = 0; slot < order.length; slot++) {
    cardRects.push({ x: margin + numW, y: ty, w: cw, h: heights[slot] });
    ty += heights[slot] + 8;
  }
  for (let slot = 0; slot < order.length; slot++) {
    const r = cardRects[slot];
    // position number
    noStroke();
    fill('#1a3a6c');
    circle(margin + 16, r.y + r.h / 2, 30);
    fill('white');
    textStyle(BOLD);
    textSize(16);
    textAlign(CENTER, CENTER);
    text(slot + 1, margin + 16, r.y + r.h / 2);
    textAlign(LEFT, TOP);
    textStyle(NORMAL);
    if (slot === dragSlot && dragMoved) {
      // empty slot outline while dragging
      noFill();
      stroke('#9e9e9e');
      strokeWeight(1);
      drawingContext.setLineDash([5, 4]);
      rect(r.x, r.y, r.w, r.h, 8);
      drawingContext.setLineDash([]);
      continue;
    }
    drawCard(order[slot], r.x, r.y, r.w, r.h, slot === selectedSlot);
  }
  if (dragSlot !== null && dragMoved) {
    const r = cardRects[dragSlot];
    drawCard(order[dragSlot], r.x, dragY, r.w, r.h, true, true);
  }
  return ty;
}

function drawCard(s, x, y, w, h, highlight, lifted) {
  if (lifted) {
    noStroke();
    fill(0, 0, 0, 40);
    rect(x + 4, y + 4, w, h, 8);
  }
  fill(highlight ? '#e8eaf6' : 'white');
  stroke(highlight ? '#1a3a6c' : '#888');
  strokeWeight(highlight ? 3 : 1);
  rect(x, y, w, h, 8);
  noStroke();
  fill('#1a3a6c');
  textStyle(BOLD);
  textSize(17);
  textAlign(LEFT, TOP);
  text(stages[s].name, x + 12, y + 9);
  textStyle(NORMAL);
  fill('#222');
  textSize(16);
  drawLines(wrapLines(stages[s].output, w - 24), x + 12, y + 34, 21);
}

// After a correct submission or the second wrong one: the correct order with
// the Why text for each position.
function drawAnswer(y) {
  const w = canvasWidth - 2 * margin;
  cardRects = [];
  const header = solved ? 'You can list the build stages' : 'Here is the correct order.';
  fill(solved ? '#e8f5e9' : '#fff8e1');
  stroke(solved ? '#2e7d32' : '#f9a825');
  strokeWeight(2);
  rect(margin, y, w, 40, 8);
  noStroke();
  fill(solved ? '#1b5e20' : '#6d4c00');
  textStyle(BOLD);
  textSize(17);
  textAlign(LEFT, TOP);
  const sub = solved ? '  (correct on attempt ' + attempts + ')' : '  (' + lastCorrectCount + ' of 5 were in place on attempt 2)';
  text(fitText(header + sub, w - 24), margin + 12, y + 11);
  textStyle(NORMAL);
  y += 50;
  const numW = 44;
  const cw = w - numW;
  for (let i = 0; i < stages.length; i++) {
    const st = stages[i];
    textSize(16);
    const outL = wrapLines(st.output, cw - 24);
    const whyL = wrapLines('Why here: ' + st.why + '.', cw - 24);
    const h = 32 + outL.length * 20 + 4 + whyL.length * 20 + 6;
    noStroke();
    fill('#2e7d32');
    circle(margin + 16, y + h / 2, 30);
    fill('white');
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(i + 1, margin + 16, y + h / 2);
    textAlign(LEFT, TOP);
    fill('white');
    stroke('#2e7d32');
    strokeWeight(1.5);
    rect(margin + numW, y, cw, h, 8);
    noStroke();
    fill('#1a3a6c');
    textSize(17);
    text(st.name, margin + numW + 12, y + 8);
    textStyle(NORMAL);
    textSize(16);
    fill('#222');
    drawLines(outL, margin + numW + 12, y + 32, 20);
    fill('#0d47a1');
    drawLines(whyL, margin + numW + 12, y + 36 + outL.length * 20, 20);
    y += h + 6;
  }
  return y;
}

// Measures the arranging view (with the retry message) and the answer view at
// the current width and sets drawHeight so the taller one fits.
function fitDrawHeight() {
  const saved = { attempts, lastCorrectCount, solved, done };
  attempts = 1; lastCorrectCount = 2; solved = false; done = false;
  let maxY = drawView();
  attempts = 2; done = true;
  maxY = Math.max(maxY, drawView());
  attempts = saved.attempts;
  lastCorrectCount = saved.lastCorrectCount;
  solved = saved.solved;
  done = saved.done;
  drawHeight = Math.max(MIN_DRAW_HEIGHT, Math.ceil(maxY + 12));
  canvasHeight = drawHeight + controlHeight;
}

// ---------- Text helpers ----------
function fitText(str, maxW) {
  if (textWidth(str) <= maxW) return str;
  let t = str;
  while (t.length > 1 && textWidth(t + '…') > maxW) t = t.slice(0, -1);
  return t.trimEnd() + '…';
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
