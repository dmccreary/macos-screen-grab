// Buy, Subscribe, or Generate Decision Explorer
// CANVAS_HEIGHT: 629
// Eight illustrative scenarios in fixed order, one attempt each.
// The learner picks Buy, Subscribe, or Generate, confirms, and sees the Why text.

let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;

const OPTIONS = [
  { name: 'Buy', color: '#3949ab',
    summary: 'Pay once and keep using that version; the vendor maintains it until you stop upgrading' },
  { name: 'Subscribe', color: '#8e44ad',
    summary: 'Pay repeatedly; the vendor maintains it and keeps it current for as long as you pay' },
  { name: 'Generate', color: '#d35400',
    summary: 'Have an AI coding agent build exactly what you need; you pay tokens and time, and you carry support responsibility' }
];

const SCENARIOS = [
  { text: 'You must convert one folder of files to a different format this afternoon, and never again.',
    best: 'Generate',
    why: 'One-off job: disposable software has no maintenance cost, and no product is worth learning for one use' },
  { text: 'A 200-person company needs payroll software that must follow tax rules that change every year.',
    best: 'Subscribe',
    why: "The outside rules change constantly, and the vendor's yearly updates and support are the real product" },
  { text: 'A $9 one-time utility does exactly your job on all your computers and has not changed in years.',
    best: 'Buy',
    why: 'A stable one-time purchase already fits; keep it, since the cost per year keeps falling' },
  { text: 'Your screen grab tool costs $30 per computer per year on 3 computers, and you use 2 of its features.',
    best: 'Generate',
    why: 'You can name the 2 features, the fee compounds ($90 a year), and a small tool is easy to test' },
  { text: 'A clinic must store patient records and follow privacy law, and no staff member can verify security.',
    best: 'Subscribe',
    why: 'The vendor carries compliance, security, and support, which the clinic cannot verify itself' },
  { text: 'You need name tags formatted for one event next weekend.',
    best: 'Generate',
    why: 'A single-occasion job suits disposable software, with no upkeep afterward' },
  { text: 'A $40 one-time-license drawing app does everything you need on one computer and rarely changes.',
    best: 'Buy',
    why: 'A stable tool with a fixed price and no recurring cost; generating adds work for no gain' },
  { text: 'You need one job done on two computers, the only product charges $15 per computer per year, and you can describe the job in two sentences and have time to test it.',
    best: 'Generate',
    why: 'A short specification and time to verify make generating practical, and the fee recurs forever' }
];

// ---- State ----
let index = 0;
let selected = null;     // option name chosen but not yet confirmed
let answered = false;
let correctCount = 0;
let finished = false;
let results = [];        // { chosen, correct } per scenario

// ---- Controls ----
let optionButtons = [];
let confirmButton, nextButton, restartButton, summaryCheckbox;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Arial');

  for (const opt of OPTIONS) {
    const b = createButton(opt.name);
    b.mousePressed(() => selectOption(opt.name));
    optionButtons.push(b);
  }
  confirmButton = createButton('Confirm');
  confirmButton.mousePressed(confirmChoice);
  nextButton = createButton('Next Scenario');
  nextButton.mousePressed(nextScenario);
  restartButton = createButton('Restart');
  restartButton.mousePressed(restart);
  summaryCheckbox = createCheckbox(' Show option summaries', false);

  for (const el of [...optionButtons, confirmButton, nextButton, restartButton, summaryCheckbox]) {
    el.style('font-size', '16px');
  }

  positionControls();
  refreshControls();
}

function positionControls() {
  const row1 = drawHeight + 12;
  const row2 = drawHeight + 52;
  let x = margin;
  for (const b of optionButtons) {
    b.position(x, row1);
    x += b.elt.offsetWidth + 8;
  }
  confirmButton.position(x + 12, row1);
  nextButton.position(x + 12 + confirmButton.elt.offsetWidth + 8, row1);
  summaryCheckbox.position(margin, row2 + 4);
  restartButton.position(Math.max(margin + 240, canvasWidth - 100), row2);
}

function refreshControls() {
  for (let i = 0; i < OPTIONS.length; i++) {
    const b = optionButtons[i];
    const isSel = selected === OPTIONS[i].name;
    b.style('background-color', isSel ? OPTIONS[i].color : '');
    b.style('color', isSel ? 'white' : '');
    b.style('font-weight', isSel ? 'bold' : 'normal');
    if (answered || finished) b.attribute('disabled', '');
    else b.removeAttribute('disabled');
  }
  if (!selected || answered || finished) confirmButton.attribute('disabled', '');
  else confirmButton.removeAttribute('disabled');
  if (answered && !finished) {
    nextButton.show();
    nextButton.html(index < SCENARIOS.length - 1 ? 'Next Scenario' : 'See Results');
  } else {
    nextButton.hide();
  }
  positionControls();
}

// ---- Flow ----
function selectOption(name) {
  if (answered || finished) return;
  selected = name;
  refreshControls();
}

function confirmChoice() {
  if (!selected || answered || finished) return;
  const sc = SCENARIOS[index];
  const ok = selected === sc.best;
  if (ok) correctCount++;
  results[index] = { chosen: selected, correct: ok };
  answered = true;
  refreshControls();
}

function nextScenario() {
  if (!answered) return;
  if (index < SCENARIOS.length - 1) {
    index++;
    selected = null;
    answered = false;
  } else {
    finished = true;
  }
  refreshControls();
}

function restart() {
  index = 0;
  selected = null;
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
  text('Buy, Subscribe, or Generate?', margin, 12);
  textStyle(NORMAL);
  textSize(14);
  fill('#555');
  text('All scenarios are illustrative.', margin, 42);

  // running score, right side of the progress row
  textAlign(RIGHT, TOP);
  textSize(16);
  textStyle(BOLD);
  fill('#1a3a6c');
  text('Correct: ' + correctCount + ' of 8', canvasWidth - margin, finished ? 16 : 70);
  textStyle(NORMAL);
  textAlign(LEFT, TOP);

  if (finished) drawResults();
  else drawScenario();
}

function drawScenario() {
  const sc = SCENARIOS[index];
  const showSummaries = summaryCheckbox.checked();
  const summaryH = showSummaries ? summaryPanelHeight() : 0;
  const w = canvasWidth - 2 * margin;

  // progress dots
  let y = 70;
  textSize(15);
  fill('#212529');
  text('Scenario ' + (index + 1) + ' of 8', margin, y);
  const dotX = margin + 140;
  for (let i = 0; i < SCENARIOS.length; i++) {
    let c = '#cfd8dc';
    if (results[i]) c = results[i].correct ? '#2e7d32' : '#c62828';
    else if (i === index) c = '#3949ab';
    fill(c);
    circle(dotX + i * 20, y + 9, 12);
  }
  y += 30;

  // scenario card
  textSize(18);
  const lines = wrapLines(sc.text, w - 28);
  const cardH = lines.length * 25 + 24;
  fill('white');
  stroke('#d0d7de');
  rect(margin, y, w, cardH, 8);
  noStroke();
  fill('#212529');
  for (let i = 0; i < lines.length; i++) text(lines[i], margin + 14, y + 12 + i * 25);
  y += cardH + 14;

  // question
  fill('#3949ab');
  textSize(18);
  textStyle(BOLD);
  text('Which option fits this job best?', margin, y);
  textStyle(NORMAL);
  y += 32;

  textSize(16);
  fill('#212529');
  if (!answered) {
    if (selected) text('Your choice: ' + selected + '. Press Confirm to lock it in.', margin, y);
    else text('Choose Buy, Subscribe, or Generate below, then press Confirm.', margin, y);
  } else {
    const r = results[index];
    textStyle(BOLD);
    textSize(18);
    if (r.correct) {
      fill('#2e7d32');
      text('Correct: ' + sc.best, margin, y);
    } else {
      fill('#c62828');
      y += drawWrapped('Not this time. You chose ' + r.chosen + '; the best option is ' + sc.best + '.',
        margin, y, w, 24) - 24;
    }
    textStyle(NORMAL);
    y += 30;
    fill('#212529');
    textSize(16);
    y += drawWrapped('Why: ' + sc.why + '.', margin, y, w, 22);
  }

  // option summaries panel at the bottom
  if (showSummaries) {
    drawSummaries(Math.max(y + 12, drawHeight - summaryH - 10), summaryH);
  } else {
    fill('#555');
    textSize(14);
    text('Tick "Show option summaries" to review what each option means.', margin, drawHeight - 30);
  }
}

function summaryPanelHeight() {
  textSize(15);
  const w = canvasWidth - 2 * margin - 112;
  let h = 12;
  for (const opt of OPTIONS) h += Math.max(1, wrapLines(opt.summary, w).length) * 20 + 8;
  return h + 4;
}

function drawSummaries(y, h) {
  const w = canvasWidth - 2 * margin;
  fill('#fffdf5');
  stroke('#e0c97f');
  rect(margin, y, w, h, 8);
  noStroke();
  let yy = y + 10;
  for (const opt of OPTIONS) {
    textSize(15);
    textStyle(BOLD);
    fill(opt.color);
    text(opt.name, margin + 12, yy);
    textStyle(NORMAL);
    fill('#212529');
    const used = drawWrapped(opt.summary, margin + 102, yy, w - 112, 20);
    yy += Math.max(20, used) + 8;
  }
}

function drawResults() {
  const w = canvasWidth - 2 * margin;
  let y = 72;
  const mastery = correctCount >= 6;
  textSize(22);
  textStyle(BOLD);
  fill('#1a3a6c');
  text('Final score: ' + correctCount + ' of 8', margin, y);
  y += 32;
  textSize(18);
  fill(mastery ? '#2e7d32' : '#c62828');
  if (mastery) text('You can weigh the three options', margin, y);
  else y += drawWrapped('Mastery is 6 of 8. Press Restart to try the scenarios again.', margin, y, w, 24) - 24;
  textStyle(NORMAL);
  y += 34;

  const missed = [];
  for (let i = 0; i < SCENARIOS.length; i++) if (results[i] && !results[i].correct) missed.push(i);

  textSize(16);
  fill('#212529');
  if (missed.length === 0) {
    text('No scenarios answered incorrectly.', margin, y);
    y += 28;
  } else {
    textStyle(BOLD);
    text('Scenarios answered incorrectly:', margin, y);
    textStyle(NORMAL);
    y += 26;
    textSize(14);
    for (let k = 0; k < missed.length; k++) {
      const i = missed[k];
      const entry = (i + 1) + '. Best: ' + SCENARIOS[i].best + ' (you chose ' + results[i].chosen + '). ' +
        SCENARIOS[i].why + '.';
      const lines = wrapLines(entry, w - 10);
      if (y + lines.length * 18 > drawHeight - 40) {
        fill('#555');
        text('...and ' + (missed.length - k) + ' more. Widen the window to see them all.', margin, y);
        y += 20;
        break;
      }
      fill('#212529');
      for (let j = 0; j < lines.length; j++) text(lines[j], margin + 4, y + j * 18);
      y += lines.length * 18 + 6;
    }
  }
  fill('#3949ab');
  textSize(15);
  drawWrapped('Notice: the best option depends on how long the tool is used and who supports it, more than on price alone.',
    margin, drawHeight - 44, w, 20);
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
