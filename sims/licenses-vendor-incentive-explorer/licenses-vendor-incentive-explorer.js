// Vendor Incentive Explorer
// CANVAS_HEIGHT: 589
// Eight illustrative vendor decisions in fixed order, one attempt each.
// The learner attributes each decision to the pricing model whose incentives
// make it more likely: one-time license or subscription license.

let canvasWidth = 800;
let drawHeight = 460;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;

const MODELS = [
  { name: 'One-time license', color: '#3949ab', bg: '#eef0fb',
    nextDollar: 'A new buyer or an upgrade purchase',
    incentive: 'Win new buyers and make upgrades look worth buying' },
  { name: 'Subscription license', color: '#8e44ad', bg: '#f6eefa',
    nextDollar: 'A renewal or a higher fee',
    incentive: 'Prevent cancellation and raise what each customer pays' }
];

const DECISIONS = [
  { text: 'Add a showy feature so owners feel they must buy the next version.',
    model: 'One-time license', why: 'Upgrade revenue depends on making the next version look new.' },
  { text: 'Keep customers satisfied so they renew every year.',
    model: 'Subscription license', why: 'Each renewal is the next dollar, so keeping the customer matters.' },
  { text: 'Charge for each major version.',
    model: 'One-time license', why: 'The sale of a version is the revenue event.' },
  { text: 'Make cancellation steps long and hard to find.',
    model: 'Subscription license', why: 'Each canceled customer ends the recurring revenue.' },
  { text: 'Stop fixing bugs in old versions to push owners to the new one.',
    model: 'One-time license', why: 'Owners of old versions pay nothing more until they upgrade.' },
  { text: 'Raise the annual fee, expecting most customers to renew.',
    model: 'Subscription license', why: 'Customers who are locked in may pay more rather than switch.' },
  { text: 'Compete mainly on the number of new customers won each quarter.',
    model: 'One-time license', why: 'Without renewals, revenue depends on new sales.' },
  { text: 'Add reminders and features that bring users back every week.',
    model: 'Subscription license', why: 'Frequent use makes renewal feel worthwhile.' }
];

// ---- State ----
let index = 0;
let answered = false;
let correctCount = 0;
let finished = false;
let results = [];   // { chosen, correct }

// ---- Controls ----
let modelButtons = [];
let nextButton, restartButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Arial');

  for (const m of MODELS) {
    const b = createButton(m.name);
    b.mousePressed(() => choose(m.name));
    modelButtons.push(b);
  }
  nextButton = createButton('Next Decision');
  nextButton.mousePressed(nextDecision);
  restartButton = createButton('Restart');
  restartButton.mousePressed(restart);

  for (const el of [...modelButtons, nextButton, restartButton]) el.style('font-size', '16px');

  positionControls();
  refreshControls();
}

function positionControls() {
  const row1 = drawHeight + 12;
  const row2 = drawHeight + 52;
  let x = margin;
  for (const b of modelButtons) {
    b.position(x, row1);
    x += b.elt.offsetWidth + 10;
  }
  nextButton.position(margin, row2);
  restartButton.position(Math.max(margin + 200, canvasWidth - 100), row2);
}

function refreshControls() {
  for (let i = 0; i < MODELS.length; i++) {
    const b = modelButtons[i];
    const r = results[index];
    const isChosen = answered && !finished && r && r.chosen === MODELS[i].name;
    b.style('background-color', isChosen ? MODELS[i].color : '');
    b.style('color', isChosen ? 'white' : '');
    if (answered || finished) b.attribute('disabled', '');
    else b.removeAttribute('disabled');
  }
  if (answered && !finished) {
    nextButton.show();
    nextButton.html(index < DECISIONS.length - 1 ? 'Next Decision' : 'See Score');
  } else {
    nextButton.hide();
  }
  positionControls();
}

// ---- Flow ----
function choose(name) {
  if (answered || finished) return;
  const ok = name === DECISIONS[index].model;
  if (ok) correctCount++;
  results[index] = { chosen: name, correct: ok };
  answered = true;
  refreshControls();
}

function nextDecision() {
  if (!answered) return;
  if (index < DECISIONS.length - 1) {
    index++;
    answered = false;
  } else {
    finished = true;
  }
  refreshControls();
}

function restart() {
  index = 0;
  answered = false;
  correctCount = 0;
  finished = false;
  results = [];
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
  text('Vendor Incentive Explorer', margin, 12);
  textStyle(NORMAL);
  textSize(14);
  fill('#555');
  text('All eight decisions are illustrative.', margin, 42);

  let y = 68;
  y = drawRevenueSummaries(y) + 16;

  if (finished) drawFinal(y);
  else drawDecision(y);
}

function drawRevenueSummaries(y) {
  const gap = 12;
  const pw = (canvasWidth - 2 * margin - gap) / 2;
  const inner = pw - 20;
  // measure both panels so they share a height
  textSize(14);
  let maxH = 0;
  const layouts = MODELS.map((m) => {
    const a = wrapLines('Next dollar: ' + m.nextDollar, inner);
    const b = wrapLines('Strongest incentive: ' + m.incentive, inner);
    const h = 10 + 22 + a.length * 18 + 6 + b.length * 18 + 10;
    maxH = Math.max(maxH, h);
    return { a, b };
  });
  for (let i = 0; i < MODELS.length; i++) {
    const m = MODELS[i];
    const x = margin + i * (pw + gap);
    fill(m.bg);
    stroke(m.color);
    strokeWeight(1.5);
    rect(x, y, pw, maxH, 8);
    noStroke();
    fill(m.color);
    textSize(16);
    textStyle(BOLD);
    text(m.name, x + 10, y + 10);
    textStyle(NORMAL);
    textSize(14);
    fill('#212529');
    let yy = y + 34;
    for (const line of layouts[i].a) { text(line, x + 10, yy); yy += 18; }
    yy += 6;
    for (const line of layouts[i].b) { text(line, x + 10, yy); yy += 18; }
  }
  return y + maxH;
}

function drawDecision(y) {
  const d = DECISIONS[index];
  const w = canvasWidth - 2 * margin;

  // progress row
  textSize(15);
  fill('#212529');
  text('Decision ' + (index + 1) + ' of 8', margin, y);
  const dotX = margin + 140;
  for (let i = 0; i < DECISIONS.length; i++) {
    let c = '#cfd8dc';
    if (results[i]) c = results[i].correct ? '#2e7d32' : '#c62828';
    else if (i === index) c = '#3949ab';
    fill(c);
    circle(dotX + i * 20, y + 9, 12);
  }
  textAlign(RIGHT, TOP);
  textStyle(BOLD);
  fill('#1a3a6c');
  textSize(16);
  text('Correct: ' + correctCount + ' of 8', canvasWidth - margin, y);
  textStyle(NORMAL);
  textAlign(LEFT, TOP);
  y += 30;

  // decision card
  textSize(18);
  const lines = wrapLines(d.text, w - 28);
  const cardH = lines.length * 25 + 24;
  fill('white');
  stroke('#d0d7de');
  rect(margin, y, w, cardH, 8);
  noStroke();
  fill('#212529');
  for (let i = 0; i < lines.length; i++) text(lines[i], margin + 14, y + 12 + i * 25);
  y += cardH + 14;

  fill('#3949ab');
  textSize(18);
  textStyle(BOLD);
  y += drawWrapped('Which pricing model makes this decision more likely?', margin, y, w, 24);
  textStyle(NORMAL);
  y += 10;

  textSize(16);
  if (!answered) {
    fill('#212529');
    text('Choose a model with the buttons below. You get one attempt.', margin, y);
    return;
  }
  const r = results[index];
  textSize(18);
  textStyle(BOLD);
  if (r.correct) {
    fill('#2e7d32');
    text('Correct', margin, y);
    y += 28;
  } else {
    fill('#c62828');
    y += drawWrapped('Not quite. The correct model is ' + d.model + '.', margin, y, w, 24) + 4;
  }
  textStyle(NORMAL);
  textSize(16);
  fill('#212529');
  drawWrapped(d.why, margin, y, w, 22);
}

function drawFinal(y) {
  const w = canvasWidth - 2 * margin;
  const mastery = correctCount >= 7;
  textSize(24);
  textStyle(BOLD);
  fill('#1a3a6c');
  text(correctCount + ' of 8', margin, y);
  y += 34;
  textSize(18);
  fill(mastery ? '#2e7d32' : '#c62828');
  if (mastery) {
    text('Mastery reached', margin, y);
    y += 30;
  } else {
    y += drawWrapped('Mastery is 7 of 8. Press Restart to try the decisions again.', margin, y, w, 24) + 6;
  }
  textStyle(NORMAL);

  const missed = [];
  for (let i = 0; i < DECISIONS.length; i++) if (results[i] && !results[i].correct) missed.push(i);
  if (missed.length > 0) {
    textSize(16);
    textStyle(BOLD);
    fill('#212529');
    text('Decisions to review:', margin, y);
    textStyle(NORMAL);
    y += 24;
    textSize(14);
    for (let k = 0; k < missed.length; k++) {
      const i = missed[k];
      const entry = (i + 1) + '. ' + DECISIONS[i].text + ' Correct: ' + DECISIONS[i].model + '. ' + DECISIONS[i].why;
      const lines = wrapLines(entry, w - 8);
      if (y + lines.length * 18 > drawHeight - 10) {
        fill('#555');
        text('...and ' + (missed.length - k) + ' more.', margin, y);
        break;
      }
      fill('#212529');
      for (let j = 0; j < lines.length; j++) text(lines[j], margin + 4, y + j * 18);
      y += lines.length * 18 + 6;
    }
  } else {
    textSize(16);
    fill('#212529');
    drawWrapped('Every decision traced to the right incentive. The same company builds different things under different pricing models.',
      margin, y, w, 22);
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
