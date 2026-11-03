// Feature Growth and Usage Explorer
// Illustrative model: F(v) = 6 + 4 x (v - 1); a user uses min(wanted, F(v)).
// Learners explore with the version slider and user-type select, then
// complete three challenges (two attempts each) calculating the unused share.

let canvasWidth = 800;
let drawHeight = 470;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;
let sliderLeftMargin = 115;

// ---- Model data (from the specification) ----
const USERS = [
  { name: 'Author', label: 'Author (grab and delayed grab only)', wanted: 2, color: '#e8684a' },
  { name: 'Casual user', label: 'Casual user', wanted: 4, color: '#3949ab' },
  { name: 'Power user', label: 'Power user', wanted: 18, color: '#2e7d32' }
];

const CHALLENGES = [
  { user: 0, version: 10, model: 95,
    hint: 'Unused = (42 - 2) / 42 = 0.952',
    full: 'Unused = (42 - 2) / 42 = 0.952, which is 95%.' },
  { user: 1, version: 10, model: 90,
    hint: 'Unused = (42 - 4) / 42 = 0.905',
    full: 'Unused = (42 - 4) / 42 = 0.905, which is 90%.' },
  { user: 2, version: 5, model: 18,
    hint: 'Unused = (22 - 18) / 22 = 0.182',
    full: 'Unused = (22 - 18) / 22 = 0.182, which is 18%.' }
];

// ---- State ----
let mode = 'explore';          // 'explore' | 'challenge'
let challengeIndex = 0;
let attempts = 0;
let resolved = false;          // current challenge finished (correct or missed)
let lastEntry = null;
let feedback = '';
let feedbackColor = '#212529';
let correctCount = 0;
let challengesFinished = false;

// ---- Controls ----
let versionSlider, userSelect, startButton, answerInput, checkButton, nextButton, exitButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Arial');

  // Create every control before positioning any of them
  versionSlider = createSlider(1, 10, 1, 1);
  userSelect = createSelect();
  for (const u of USERS) userSelect.option(u.name);
  userSelect.selected('Author');

  startButton = createButton('Start Challenges');
  startButton.mousePressed(startChallenges);

  answerInput = createInput('', 'number');
  answerInput.attribute('min', '0');
  answerInput.attribute('max', '100');
  answerInput.attribute('step', '1');
  answerInput.elt.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') checkAnswer();
  });

  checkButton = createButton('Check');
  checkButton.mousePressed(checkAnswer);
  nextButton = createButton('Next');
  nextButton.mousePressed(nextChallenge);
  exitButton = createButton('Back to Exploring');
  exitButton.mousePressed(exitChallenges);

  for (const el of [userSelect, startButton, answerInput, checkButton, nextButton, exitButton]) {
    el.style('font-size', '16px');
  }
  answerInput.size(70);

  positionControls();
  updateControlVisibility();
}

function positionControls() {
  const row1 = drawHeight + 12;
  const row2 = drawHeight + 52;
  versionSlider.position(sliderLeftMargin, row1);
  const selectX = Math.max(sliderLeftMargin + 160, canvasWidth - 230);
  versionSlider.size(Math.max(100, selectX - sliderLeftMargin - 110));
  userSelect.position(selectX, row1 - 2);

  startButton.position(margin, row2);
  answerInput.position(margin + 85, row2);
  checkButton.position(margin + 175, row2);
  nextButton.position(margin + 245, row2);
  exitButton.position(margin + 315, row2);
}

function updateControlVisibility() {
  const inChallenge = mode === 'challenge';
  if (inChallenge) {
    startButton.hide();
    answerInput.show();
    checkButton.show();
    exitButton.show();
    versionSlider.attribute('disabled', '');
    userSelect.attribute('disabled', '');
    if (resolved) {
      nextButton.show();
      nextButton.html(challengeIndex < CHALLENGES.length - 1 ? 'Next' : 'Finish');
      checkButton.attribute('disabled', '');
      answerInput.attribute('disabled', '');
    } else {
      nextButton.hide();
      checkButton.removeAttribute('disabled');
      answerInput.removeAttribute('disabled');
    }
  } else {
    startButton.show();
    startButton.html(challengesFinished ? 'Restart Challenges' : 'Start Challenges');
    answerInput.hide();
    checkButton.hide();
    nextButton.hide();
    exitButton.hide();
    versionSlider.removeAttribute('disabled');
    userSelect.removeAttribute('disabled');
  }
}

// ---- Model ----
function featureCount(v) {
  return 6 + 4 * (v - 1);
}

function usedCount(wanted, v) {
  return Math.min(wanted, featureCount(v));
}

function unusedPercent(wanted, v) {
  const f = featureCount(v);
  const u = usedCount(wanted, v);
  if (f === u) return 0;
  // half-up rounding; the epsilon guards against floating-point error
  return Math.floor(100 * (f - u) / f + 0.5 + 1e-9);
}

function usedPercent(wanted, v) {
  const f = featureCount(v);
  return Math.floor(100 * usedCount(wanted, v) / f + 0.5 + 1e-9);
}

function selectedUserIndex() {
  const name = userSelect.value();
  return Math.max(0, USERS.findIndex((u) => u.name === name));
}

// ---- Challenge flow ----
function startChallenges() {
  mode = 'challenge';
  challengeIndex = 0;
  correctCount = 0;
  challengesFinished = false;
  resetChallengeState();
  updateControlVisibility();
}

function resetChallengeState() {
  attempts = 0;
  resolved = false;
  lastEntry = null;
  feedback = '';
  answerInput.value('');
}

function checkAnswer() {
  if (mode !== 'challenge' || resolved) return;
  const raw = String(answerInput.value()).trim();
  const n = Number(raw);
  if (raw === '' || !Number.isInteger(n) || n < 0 || n > 100) {
    feedback = 'Enter a whole number from 0 to 100.';
    feedbackColor = '#6c4a00';
    return;
  }
  const c = CHALLENGES[challengeIndex];
  attempts++;
  lastEntry = n;
  if (Math.abs(n - c.model) <= 1) {
    correctCount++;
    resolved = true;
    feedback = 'Correct: ' + c.model + '% of features unused.';
    feedbackColor = '#2e7d32';
  } else if (attempts < 2) {
    feedback = 'Not yet. ' + c.hint + '. Try once more.';
    feedbackColor = '#c62828';
  } else {
    resolved = true;
    feedback = 'Missed. ' + c.full;
    feedbackColor = '#c62828';
  }
  updateControlVisibility();
}

function nextChallenge() {
  if (challengeIndex < CHALLENGES.length - 1) {
    challengeIndex++;
    resetChallengeState();
  } else {
    challengesFinished = true;
    mode = 'explore';
  }
  updateControlVisibility();
}

function exitChallenges() {
  mode = 'explore';
  updateControlVisibility();
}

// ---- Drawing ----
function draw() {
  // drawing region
  stroke('silver');
  strokeWeight(1);
  fill('aliceblue');
  rect(0, 0, canvasWidth, drawHeight);
  // control region
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  noStroke();
  textAlign(LEFT, TOP);
  fill('#1a3a6c');
  textSize(22);
  textStyle(BOLD);
  text('Feature Growth and Usage Explorer', margin, 12);
  textStyle(NORMAL);
  textSize(14);
  fill('#555');
  text('Illustrative values: no real product is measured.', margin, 42);

  if (mode === 'explore') drawExplore();
  else drawChallenge();

  drawControlLabels();
}

function drawControlLabels() {
  noStroke();
  fill('#212529');
  textSize(16);
  textAlign(LEFT, CENTER);
  text('Version: ' + versionSlider.value(), margin, drawHeight + 22);
  const selectX = Math.max(sliderLeftMargin + 160, canvasWidth - 230);
  text('User:', selectX - 50, drawHeight + 22);
  if (mode === 'challenge') {
    text('Unused %', margin, drawHeight + 64);
  }
}

function drawExplore() {
  const v = versionSlider.value();
  const ui = selectedUserIndex();
  const user = USERS[ui];
  const f = featureCount(v);
  const used = usedCount(user.wanted, v);

  fill('#3949ab');
  textSize(18);
  textStyle(BOLD);
  text('How much of this product do you use?', margin, 66);
  textStyle(NORMAL);

  const top = 100;
  const leftW = Math.floor((canvasWidth - 3 * margin) * 0.45);
  const rightX = margin * 2 + leftW;
  const rightW = canvasWidth - rightX - margin;

  // ---- Left panel: feature grid ----
  drawPanel(margin, top, leftW, drawHeight - top - 10);
  fill('#212529');
  textSize(16);
  textStyle(BOLD);
  text('Version ' + v + ': ' + f + ' features', margin + 10, top + 10);
  textStyle(NORMAL);

  const cols = 7;
  const cell = Math.min(40, Math.floor((leftW - 20) / cols));
  const gridX = margin + 10;
  const gridY = top + 38;
  for (let i = 0; i < f; i++) {
    const cx = gridX + (i % cols) * cell;
    const cy = gridY + Math.floor(i / cols) * cell;
    stroke('white');
    strokeWeight(2);
    fill(i < used ? '#43a047' : '#cfd8dc');
    rect(cx, cy, cell - 2, cell - 2, 4);
  }
  noStroke();

  // legend
  const legY = gridY + 6 * cell + 10;
  textSize(14);
  fill('#43a047');
  rect(gridX, legY, 14, 14, 3);
  fill('#212529');
  text('used (' + used + ')', gridX + 20, legY);
  const narrow = leftW < 300;
  const l2x = narrow ? gridX : gridX + 120;
  const l2y = narrow ? legY + 22 : legY;
  fill('#cfd8dc');
  rect(l2x, l2y, 14, 14, 3);
  fill('#212529');
  text('never used (' + (f - used) + ')', l2x + 20, l2y);

  if (challengesFinished) {
    fill(correctCount === 3 ? '#2e7d32' : '#6c4a00');
    textSize(14);
    const msg = 'Challenges complete. Correct: ' + correctCount + ' of 3.' +
      (correctCount === 3 ? ' Mastery reached.' : ' Mastery is 3 of 3; restart to try again.');
    drawWrapped(msg, gridX, l2y + 26, leftW - 20, 18);
  }

  // ---- Right panel: numbers and chart ----
  drawPanel(rightX, top, rightW, drawHeight - top - 10);
  let y = top + 10;
  const x = rightX + 12;
  const w = rightW - 24;
  fill('#212529');
  textSize(15);
  y += drawWrapped('User type: ' + user.label, x, y, w, 19);
  text('Features wanted: ' + user.wanted, x, y); y += 21;
  text('F(v) = 6 + 4 × (' + v + ' − 1) = ' + f, x, y); y += 21;
  text('Features used = min(' + user.wanted + ', ' + f + ') = ' + used, x, y); y += 21;
  text('Used share: ' + usedPercent(user.wanted, v) + '%', x, y); y += 21;
  textStyle(BOLD);
  fill('#c0392b');
  textSize(17);
  text('Unused share: ' + unusedPercent(user.wanted, v) + '%', x, y); y += 28;
  textStyle(NORMAL);

  drawChart(x, y, w, drawHeight - 20 - y, v, ui);
}

function drawChart(x, y, w, h, v, ui) {
  const labelW = 38;
  const px = x + labelW;
  const pw = w - labelW - 6;
  const legendH = 22;
  const py = y + 26;
  const ph = h - 26 - 22 - legendH;
  if (ph < 40) return;

  fill('#212529');
  textSize(14);
  textAlign(LEFT, TOP);
  text('Unused share by version', x, y);

  // axes and grid
  stroke('#d0d7de');
  strokeWeight(1);
  textSize(12);
  for (let p = 0; p <= 100; p += 25) {
    const gy = py + ph - (p / 100) * ph;
    line(px, gy, px + pw, gy);
    noStroke();
    fill('#555');
    textAlign(RIGHT, CENTER);
    text(p + '%', px - 4, gy);
    stroke('#d0d7de');
  }
  noStroke();
  textAlign(CENTER, TOP);
  for (let ver = 1; ver <= 10; ver++) {
    const gx = px + ((ver - 1) / 9) * pw;
    fill('#555');
    text(ver, gx, py + ph + 4);
  }

  // current version marker
  const vx = px + ((v - 1) / 9) * pw;
  stroke('#9aa5b1');
  strokeWeight(1);
  drawingContext.setLineDash([4, 4]);
  line(vx, py, vx, py + ph);
  drawingContext.setLineDash([]);

  // three lines, selected one thicker
  for (let k = 0; k < USERS.length; k++) {
    const u = USERS[k];
    stroke(u.color);
    strokeWeight(k === ui ? 3.5 : 1.5);
    noFill();
    beginShape();
    for (let ver = 1; ver <= 10; ver++) {
      vertex(px + ((ver - 1) / 9) * pw, py + ph - (unusedPercent(u.wanted, ver) / 100) * ph);
    }
    endShape();
  }
  // highlighted point
  noStroke();
  fill(USERS[ui].color);
  circle(vx, py + ph - (unusedPercent(USERS[ui].wanted, v) / 100) * ph, 10);

  // legend
  textAlign(LEFT, CENTER);
  textSize(13);
  let lx = pw < 280 ? x : px;
  const ly = py + ph + 30;
  for (const u of USERS) {
    const label = pw < 280 ? u.name.replace(' user', '') : u.name;
    fill(u.color);
    rect(lx, ly - 5, 14, 10);
    fill('#212529');
    text(label, lx + 18, ly);
    lx += textWidth(label) + (pw < 280 ? 26 : 34);
  }
  textAlign(LEFT, TOP);
}

function drawChallenge() {
  const c = CHALLENGES[challengeIndex];
  const user = USERS[c.user];

  fill('#3949ab');
  textSize(18);
  textStyle(BOLD);
  const qh = drawWrapped('Challenge ' + (challengeIndex + 1) + ' of 3: What percentage of features does this user never use?',
    margin, 66, canvasWidth - 2 * margin, 22);
  textStyle(NORMAL);

  const top = Math.max(100, 66 + qh + 12);
  const x = margin + 14;
  const w = canvasWidth - 2 * margin - 28;
  drawPanel(margin, top, canvasWidth - 2 * margin, drawHeight - top - 10);

  let y = top + 14;
  fill('#212529');
  textSize(18);
  textStyle(BOLD);
  y += drawWrapped('User type: ' + user.label + ', who wants ' + user.wanted + ' features', x, y, w, 24);
  text('Version: ' + c.version, x, y);
  y += 34;
  textStyle(NORMAL);

  textSize(16);
  fill('#333');
  y += drawWrapped('F(v) = 6 + 4 × (v − 1)', x, y, w, 22);
  y += drawWrapped('Used = the smaller of features wanted and F(v)', x, y, w, 22);
  y += drawWrapped('Unused % = 100 × (F(v) − Used) / F(v), rounded to a whole number', x, y, w, 22);
  y += 10;
  fill('#555');
  textSize(15);
  y += drawWrapped('Enter the unused percentage below as a whole number and press Check. An entry within 1 point of the model value is correct.',
    x, y, w, 20);
  y += 12;

  fill('#212529');
  textSize(16);
  const attemptText = resolved ? 'Challenge complete' : 'Attempt ' + (attempts + 1) + ' of 2';
  text(attemptText, x, y);
  y += 28;

  if (feedback) {
    textStyle(BOLD);
    fill(feedbackColor);
    textSize(17);
    y += drawWrapped(feedback, x, y, w, 23);
    textStyle(NORMAL);
    y += 6;
  }
  if (resolved && lastEntry !== null) {
    fill('#212529');
    textSize(16);
    text('Your entry: ' + lastEntry + '%      Model value: ' + c.model + '%', x, y);
    y += 26;
  }

  fill('#1a3a6c');
  textSize(16);
  textStyle(BOLD);
  text('Correct: ' + correctCount + ' of 3', x, drawHeight - 40);
  textStyle(NORMAL);
}

function drawPanel(x, y, w, h) {
  noStroke();
  fill('white');
  rect(x, y, w, h, 8);
  stroke('#d0d7de');
  noFill();
  rect(x, y, w, h, 8);
  noStroke();
  textAlign(LEFT, TOP);
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
