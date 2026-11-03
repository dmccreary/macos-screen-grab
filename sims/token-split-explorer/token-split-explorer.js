// Token Split Explorer
// CANVAS_HEIGHT: 659
// The learner predicts the token count of five short texts, reveals an
// illustrative split, then names the text the four-characters-per-token rule
// underestimates by more than 50%. Splits are illustrative, not a real tokenizer.

let canvasWidth = 800;
let drawHeight = 530;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;
let sliderLeftMargin = 215;

const TEXTS = [
  { text: 'Grab only what you need!',
    pieces: ['Grab', ' only', ' what', ' you', ' need', '!'],
    reason: 'Common words are one token each, so the rule fits ordinary English.' },
  { text: 'ScreenGrab',
    pieces: ['Screen', 'Grab'],
    reason: 'A joined name splits at its natural word boundary.' },
  { text: 'Supercalifragilisticexpialidocious',
    pieces: ['Super', 'cal', 'if', 'rag', 'il', 'istic', 'exp', 'ial', 'id', 'ocious'],
    reason: 'A rare long word breaks into many short pieces.' },
  { text: 'swift build -c release',
    pieces: ['swift', ' build', ' -', 'c', ' release'],
    reason: 'Command-line text splits at spaces and symbols.' },
  { text: '1,150,000',
    pieces: ['1', ',', '150', ',', '000'],
    reason: 'Digits and separators each become their own piece, so the rule underestimates numbers.' }
];
const ANSWER_ROW = 4;   // zero-based index of row 5
const CHIP_COLORS = ['#ffe0b2', '#c8e6c9', '#bbdefb', '#f8bbd0', '#d1c4e9', '#fff9c4'];

// ---- State ----
let index = 0;
let phase = 'predict';      // 'predict' | 'revealed' | 'final'
let predictions = [];
let closeCount = 0;
let finalAttempts = 0;
let finalDone = false;
let finalCorrect = false;
let finalFeedback = '';
let chipRects = [];         // for hover tooltips

// ---- Controls ----
let predictionSlider, revealButton, nextButton, answerSelect, checkButton, restartButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Arial');

  predictionSlider = createSlider(1, 40, 5, 1);
  revealButton = createButton('Reveal');
  revealButton.mousePressed(reveal);
  nextButton = createButton('Next Text');
  nextButton.mousePressed(nextText);
  answerSelect = createSelect();
  answerSelect.option('Choose a text...', '');
  for (let i = 0; i < TEXTS.length; i++) answerSelect.option('Row ' + (i + 1) + ': ' + TEXTS[i].text, String(i));
  checkButton = createButton('Check');
  checkButton.mousePressed(checkFinal);
  restartButton = createButton('Restart');
  restartButton.mousePressed(restart);

  for (const el of [revealButton, nextButton, answerSelect, checkButton, restartButton]) el.style('font-size', '16px');

  positionControls();
  refreshControls();
}

function positionControls() {
  const row1 = drawHeight + 12;
  const row2 = drawHeight + 52;
  const sliderW = Math.max(100, Math.min(300, canvasWidth - sliderLeftMargin - 130));
  predictionSlider.position(sliderLeftMargin, row1);
  predictionSlider.size(sliderW);
  revealButton.position(sliderLeftMargin + sliderW + 15, row1 - 3);
  nextButton.position(sliderLeftMargin + sliderW + 15, row1 - 3);
  answerSelect.position(margin, row1 - 2);
  answerSelect.style('max-width', (canvasWidth - 120) + 'px');
  checkButton.position(Math.min(canvasWidth - 80, margin + answerSelect.elt.offsetWidth + 10), row1 - 3);
  restartButton.position(canvasWidth - 100, row2);
}

function refreshControls() {
  if (phase === 'final') {
    predictionSlider.hide();
    revealButton.hide();
    nextButton.hide();
    answerSelect.show();
    checkButton.show();
    if (finalDone) {
      answerSelect.attribute('disabled', '');
      checkButton.attribute('disabled', '');
    } else {
      answerSelect.removeAttribute('disabled');
      checkButton.removeAttribute('disabled');
    }
  } else {
    predictionSlider.show();
    answerSelect.hide();
    checkButton.hide();
    if (phase === 'predict') {
      predictionSlider.removeAttribute('disabled');
      revealButton.show();
      nextButton.hide();
    } else {
      predictionSlider.attribute('disabled', '');
      revealButton.hide();
      nextButton.show();
      nextButton.html(index < TEXTS.length - 1 ? 'Next Text' : 'Final Question');
    }
  }
  positionControls();
}

// ---- Model ----
function estimate(i) {
  return TEXTS[i].text.length / 4;
}

function tokens(i) {
  return TEXTS[i].pieces.length;
}

function isClose(i) {
  return Math.abs(predictions[i] - tokens(i)) <= 2;
}

function verdict(i) {
  const off = Math.abs(predictions[i] - tokens(i));
  if (off <= 2) return 'Close';
  return 'Off by ' + off + ' tokens';
}

// ---- Flow ----
function reveal() {
  if (phase !== 'predict') return;
  predictions[index] = predictionSlider.value();
  if (isClose(index)) closeCount++;
  phase = 'revealed';
  refreshControls();
}

function nextText() {
  if (phase !== 'revealed') return;
  if (index < TEXTS.length - 1) {
    index++;
    phase = 'predict';
    predictionSlider.value(5);
  } else {
    phase = 'final';
  }
  refreshControls();
}

function checkFinal() {
  if (phase !== 'final' || finalDone) return;
  const v = answerSelect.value();
  if (v === '') {
    finalFeedback = 'Choose one of the five texts first.';
    return;
  }
  finalAttempts++;
  if (Number(v) === ANSWER_ROW) {
    finalCorrect = true;
    finalDone = true;
    finalFeedback = 'Row 5: digit groups and commas each count as a token.';
  } else if (finalAttempts < 2) {
    finalFeedback = 'Compare tokens with the estimate in each row; the rule underestimates when tokens exceed 1.5 times the estimate.';
  } else {
    finalDone = true;
    finalFeedback = 'The answer is row 5, 1,150,000: 5 tokens against an estimate of 2.25, and 5 > 1.5 × 2.25 = 3.375. ' +
      'Row 5: digit groups and commas each count as a token.';
  }
  refreshControls();
}

function restart() {
  index = 0;
  phase = 'predict';
  predictions = [];
  closeCount = 0;
  finalAttempts = 0;
  finalDone = false;
  finalCorrect = false;
  finalFeedback = '';
  predictionSlider.value(5);
  answerSelect.selected('');
  refreshControls();
}

// ---- Drawing ----
function draw() {
  chipRects = [];
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
  text('Token Split Explorer', margin, 12);
  textStyle(NORMAL);

  // illustrative badge
  textSize(14);
  const badge = 'illustrative: real tokenizers differ';
  const bw = textWidth(badge) + 16;
  fill('#fff3cd');
  stroke('#e0c97f');
  rect(margin, 42, bw, 22, 11);
  noStroke();
  fill('#6c4a00');
  text(badge, margin + 8, 46);

  textAlign(RIGHT, TOP);
  textSize(16);
  textStyle(BOLD);
  fill('#1a3a6c');
  text('Predictions close: ' + closeCount + ' of 5', canvasWidth - margin, 16);
  textStyle(NORMAL);
  textAlign(LEFT, TOP);

  const cardTop = 76;
  const cardH = 214;
  drawCard(cardTop, cardH);
  drawTable(cardTop + cardH + 12);

  // prediction label in control area
  if (phase !== 'final') {
    fill('#212529');
    textSize(16);
    textAlign(LEFT, CENTER);
    text('Your prediction: ' + predictionSlider.value() + ' tokens', margin, drawHeight + 22);
    textAlign(LEFT, TOP);
  }

  drawTooltip();
}

function drawCard(y, h) {
  const w = canvasWidth - 2 * margin;
  fill('white');
  stroke('#d0d7de');
  rect(margin, y, w, h, 8);
  noStroke();
  const x = margin + 14;
  const iw = w - 28;
  let yy = y + 12;

  if (phase === 'final') {
    drawFinalCard(x, yy, iw);
    return;
  }

  fill('#555');
  textSize(15);
  text('Text ' + (index + 1) + ' of 5   ·   ' + TEXTS[index].text.length + ' characters', x, yy);
  yy += 26;

  if (phase === 'predict') {
    // Courier New is about 0.6 em per character; shrink long words to fit
    const size = Math.min(26, Math.floor(iw / (TEXTS[index].text.length * 0.62)));
    textSize(size);
    textFont('Courier New');
    fill('#212529');
    text(TEXTS[index].text, x, yy + (26 - size) / 2);
    yy += 46;
    textFont('Arial');
    fill('#3949ab');
    textSize(18);
    textStyle(BOLD);
    text('How many tokens will this take?', x, yy);
    textStyle(NORMAL);
    yy += 30;
    fill('#555');
    textSize(15);
    drawWrapped('Set your prediction with the slider below, then press Reveal. Each text gets one prediction.', x, yy, iw, 20);
  } else {
    yy += drawChips(index, x, yy, iw, 22) + 12;
    const i = index;
    fill('#212529');
    textSize(16);
    yy += drawWrapped('Tokens: ' + tokens(i) + '    Four-character estimate: ' + TEXTS[i].text.length +
      ' / 4 = ' + estimate(i).toFixed(2) + '    Your prediction: ' + predictions[i], x, yy, iw, 22) + 4;
    textStyle(BOLD);
    textSize(18);
    fill(isClose(i) ? '#2e7d32' : '#c62828');
    text(verdict(i), x, yy);
    textStyle(NORMAL);
    yy += 28;
    fill('#212529');
    textSize(16);
    drawWrapped(TEXTS[i].reason, x, yy, iw, 21);
  }
}

function drawFinalCard(x, y, w) {
  fill('#3949ab');
  textSize(18);
  textStyle(BOLD);
  y += drawWrapped('Which text did the four-character rule underestimate by more than 50%?', x, y, w, 24);
  textStyle(NORMAL);
  y += 8;
  fill('#555');
  textSize(15);
  if (!finalDone) {
    y += drawWrapped('Use the table below. Pick a row from the menu and press Check. Attempt ' +
      (finalAttempts + 1) + ' of 2.', x, y, w, 20);
  } else {
    y += drawWrapped('Final question complete.', x, y, w, 20);
  }
  y += 10;
  if (finalFeedback) {
    textSize(16);
    textStyle(BOLD);
    fill(finalCorrect ? '#2e7d32' : (finalFeedback.startsWith('Choose') ? '#6c4a00' : '#c62828'));
    y += drawWrapped(finalFeedback, x, y, w, 22) + 8;
    textStyle(NORMAL);
  }
  if (finalDone) {
    fill('#212529');
    textSize(15);
    drawWrapped('Notice: the rule fits ordinary English well and fails on numbers.', x, y, w, 20);
  }
}

// Draws a text's pieces as chips; returns the height used.
function drawChips(i, x, y, w, size) {
  textSize(size);
  textFont('Courier New');
  const padX = Math.round(size * 0.35);
  const chipH = Math.round(size * 1.45);
  const gap = 4;
  let cx = x;
  let cy = y;
  const pieces = TEXTS[i].pieces;
  for (let k = 0; k < pieces.length; k++) {
    const label = pieces[k].replace(/^ /, '·');
    const cw = textWidth(label) + 2 * padX;
    if (cx + cw > x + w && cx > x) {
      cx = x;
      cy += chipH + gap;
    }
    fill(CHIP_COLORS[k % CHIP_COLORS.length]);
    stroke('#90a4ae');
    strokeWeight(1);
    rect(cx, cy, cw, chipH, 4);
    noStroke();
    fill('#212529');
    textAlign(LEFT, CENTER);
    text(label, cx + padX, cy + chipH / 2 + 1);
    chipRects.push({ x: cx, y: cy, w: cw, h: chipH, piece: pieces[k], k, n: pieces.length });
    cx += cw + gap;
  }
  textAlign(LEFT, TOP);
  textFont('Arial');
  return cy + chipH - y;
}

function drawTable(y) {
  const x = margin;
  const w = canvasWidth - 2 * margin;
  const cols = [
    { key: '#', w: 30 },
    { key: 'Pieces', w: 0 },
    { key: 'Chars', w: 56 },
    { key: 'Estimate', w: 76 },
    { key: 'Tokens', w: 62 },
    { key: 'You', w: 44 }
  ];
  const fixed = cols.reduce((s, c) => s + c.w, 0);
  cols[1].w = w - fixed;

  fill('#212529');
  textSize(15);
  textStyle(BOLD);
  text('Revealed so far', x, y);
  textSize(13);
  textStyle(NORMAL);
  fill('#555');
  text('· marks a leading space. Hover over a piece to inspect it.', x + 140, y + 2);
  y += 24;

  // header
  fill('#e3e8f0');
  rect(x, y, w, 24);
  fill('#212529');
  textSize(14);
  textStyle(BOLD);
  let cx = x;
  for (const c of cols) {
    text(c.key, cx + 6, y + 5);
    cx += c.w;
  }
  textStyle(NORMAL);
  y += 24;

  for (let i = 0; i < TEXTS.length; i++) {
    const revealed = predictions[i] !== undefined;
    // measure row height using the chips area
    let rowH = 28;
    const piecesX = x + cols[0].w + 6;
    const piecesW = cols[1].w - 12;
    fill(i % 2 === 0 ? 'white' : '#f7f9fc');
    // draw chips first into a measured row; draw background after measuring
    if (revealed) {
      const h = measureChips(i, piecesW, 14);
      rowH = Math.max(28, h + 8);
    }
    const highlight = phase === 'final' && finalDone && i === ANSWER_ROW;
    fill(highlight ? '#e8f5e9' : (i % 2 === 0 ? 'white' : '#f7f9fc'));
    rect(x, y, w, rowH);
    fill('#212529');
    textSize(14);
    text(String(i + 1), x + 8, y + 7);
    if (revealed) {
      drawChips(i, piecesX, y + 4, piecesW, 14);
      cx = x + cols[0].w + cols[1].w;
      fill('#212529');
      textSize(14);
      text(String(TEXTS[i].text.length), cx + 6, y + 7); cx += cols[2].w;
      text(estimate(i).toFixed(2), cx + 6, y + 7); cx += cols[3].w;
      text(String(tokens(i)), cx + 6, y + 7); cx += cols[4].w;
      fill(isClose(i) ? '#2e7d32' : '#c62828');
      text(String(predictions[i]), cx + 6, y + 7);
    } else {
      fill('#9aa5b1');
      text('not yet revealed', piecesX, y + 7);
    }
    y += rowH;
  }
}

function measureChips(i, w, size) {
  textSize(size);
  textFont('Courier New');
  const padX = Math.round(size * 0.35);
  const chipH = Math.round(size * 1.45);
  const gap = 4;
  let cx = 0;
  let rows = 1;
  for (const p of TEXTS[i].pieces) {
    const cw = textWidth(p.replace(/^ /, '·')) + 2 * padX;
    if (cx + cw > w && cx > 0) {
      rows++;
      cx = 0;
    }
    cx += cw + gap;
  }
  textFont('Arial');
  return rows * chipH + (rows - 1) * gap;
}

function drawTooltip() {
  for (const r of chipRects) {
    if (mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h) {
      const shown = r.piece.startsWith(' ') ? '(space)' + r.piece.slice(1) : r.piece;
      const msg = 'Piece ' + (r.k + 1) + ' of ' + r.n + ': "' + shown + '", ' + r.piece.length +
        (r.piece.length === 1 ? ' character' : ' characters');
      textSize(14);
      const tw = textWidth(msg) + 16;
      let tx = Math.min(mouseX + 12, canvasWidth - tw - 4);
      let ty = mouseY - 30;
      if (ty < 2) ty = mouseY + 16;
      fill(33, 37, 41, 230);
      rect(tx, ty, tw, 24, 4);
      fill('white');
      text(msg, tx + 8, ty + 5);
      break;
    }
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
