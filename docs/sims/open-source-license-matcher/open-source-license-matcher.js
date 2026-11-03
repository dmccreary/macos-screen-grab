// Open Source License Matcher MicroSim
// Choose the license that fits what the author wants in each of eight
// scenarios. One attempt per scenario, fixed order. Mastery is 7 of 8.
// An educational exercise, not legal advice.

const COPYLEFT = 'Copyleft license (such as the GNU General Public License)';

const CONFIG = {
  title: 'Open Source License Matcher',
  itemNoun: 'Scenario',
  note: 'This is an educational exercise, not legal advice.',
  question: 'Which license fits what this author wants?',
  dims: [
    { label: 'License', choices: ['MIT License', COPYLEFT, 'CC BY 4.0', 'CC BY-NC-SA 4.0', 'No license (all rights reserved)'] }
  ],
  mode: 'immediate',
  choosePrompt: 'Read what the author wants, then click one of the five licenses. You get one attempt.',
  definitions: null,
  cardHeight: 104,
  choiceHeight: 60,
  feedbackHeight: 84,
  minDrawHeight: 0,
  showRunningScore: false,
  mastery: 7,
  items: [
    { text: 'Source code of a small utility. Anyone may use it for any purpose, including commercially. They only need to keep your credit.',
      answer: ['MIT License'], why: 'MIT is permissive and asks only for the copyright notice.' },
    { text: 'Source code where anyone who distributes an improved version must also release its source.',
      answer: [COPYLEFT], why: 'Copyleft requires changed versions to carry the same license.' },
    { text: 'Chapters of a book that may be shared and adapted with credit, not used commercially, with adaptations under the same terms.',
      answer: ['CC BY-NC-SA 4.0'], why: 'BY gives credit, NC bars commercial use, SA keeps adaptations under the same terms.' },
    { text: 'A collection of diagrams that anyone, including companies, may reuse with credit.',
      answer: ['CC BY 4.0'], why: 'BY alone requires only credit and allows commercial reuse.' },
    { text: 'A personal script on your own laptop that you never share.',
      answer: ['No license (all rights reserved)'], why: 'Nobody else needs permission, so no license is needed.' },
    { text: 'Short code samples in a textbook that readers may paste into their own commercial apps.',
      answer: ['MIT License'], why: 'Code samples suit a permissive code license.' },
    { text: 'Photos on a website that may be reused commercially if the photographer is credited.',
      answer: ['CC BY 4.0'], why: 'Photos are creative works, and BY allows commercial reuse with credit.' },
    { text: 'Lesson plans that teachers may remix, provided remixes carry the same terms and are not resold.',
      answer: ['CC BY-NC-SA 4.0'], why: 'NC bars resale and SA keeps remixes under the same terms.' }
  ],
  feedbackCorrect: (item) => ({ tone: 'ok', title: 'Correct: ' + item.answer[0] + '.', body: item.why }),
  feedbackIncorrect: (item) => ({ tone: 'bad', title: '', body: 'Not quite: ' + item.why }),
  scoreText: (n, N) => 'Correct on first attempt: ' + n + ' of ' + N,
  masteryText: 'Mastery',
  notMasteryText: 'Mastery is 7 of 8. Press Restart to match the scenarios again.',
  summaryLineHeight: 21,
  summaryMaxRows: 13,
  summaryHeadings: 5,
  shortChoice: (c) => c === COPYLEFT ? 'Copyleft license' : c,
  summaryRows: () => groupedRows(),
  takeaway: 'The Creative Commons choices are used for text and images; the MIT and copyleft licenses are used for code.'
};

// ---------------------------------------------------------------------------
// Sorter engine: one item at a time, fixed order, one attempt per item.
// Everything above this line is the content for this sorter; everything below
// is generic. Built with p5.js 2.3.4 and only p5.js built-in controls.
// ---------------------------------------------------------------------------

let canvasWidth = 760;          // updated from the container width
let drawHeight = 500;           // computed in computeLayout()
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
const margin = 14;
const gap = 10;

// Colors
const C = {
  bg: '#f2f6fb', border: '#b8c4d4', ink: '#1d2733', soft: '#4c5a6b',
  title: '#1a3a6c', card: '#ffffff', tagBg: '#fff1c9', tagInk: '#7a4e00',
  okBg: '#dff3e4', okInk: '#17642f', badBg: '#fde4df', badInk: '#a12a1a',
  idleBg: '#eaeff5', control: '#ffffff'
};

// State
let current = 0;               // index of the item on screen
let selections = [];           // chosen choice index per dimension, or -1
let answered = false;          // the current item has been answered
let results = [];              // per item: {chosen:[...], correct:[bool per dim], ok:bool}
let finished = false;
let summaryPage = 0;            // page of the results list on the summary screen
let summaryPageCount = 1;

// Controls
let choiceButtons = [];        // [dim][choice] -> p5.Element
let checkButton, nextButton, restartButton, moreButton, defsCheckbox;

// Layout (computed)
let L = {};

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container && container.offsetWidth > 0) {
    canvasWidth = Math.floor(container.offsetWidth);
  } else {
    canvasWidth = Math.floor(windowWidth);
  }
  canvasWidth = Math.max(canvasWidth, 340);
}

function setup() {
  updateCanvasSize();
  computeLayout();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Arial');

  // --- create every control first ---
  for (let d = 0; d < CONFIG.dims.length; d++) {
    const row = [];
    CONFIG.dims[d].choices.forEach((label, c) => {
      const b = createButton(choiceLabelHTML(d, c));
      styleChoice(b, 'idle');
      b.mousePressed(() => choose(d, c));
      row.push(b);
    });
    choiceButtons.push(row);
  }
  if (CONFIG.mode === 'check') {
    checkButton = createButton(CONFIG.checkLabel || 'Check');
    styleControl(checkButton);
    checkButton.mousePressed(checkAnswer);
  }
  nextButton = createButton('Next');
  styleControl(nextButton);
  nextButton.mousePressed(goNext);
  restartButton = createButton('Restart');
  styleControl(restartButton);
  restartButton.mousePressed(restart);
  moreButton = createButton('More results');
  styleControl(moreButton);
  moreButton.mousePressed(() => { summaryPage = (summaryPage + 1) % summaryPageCount; });
  if (CONFIG.definitions && CONFIG.definitionsMode === 'toggle') {
    defsCheckbox = createCheckbox(' ' + (CONFIG.definitionsLabel || 'Show definitions'), false);
    defsCheckbox.style('font-size', '15px');
    defsCheckbox.style('font-family', 'Arial, Helvetica, sans-serif');
    defsCheckbox.changed(refreshControls);
  }

  // --- then position them ---
  restart();
  describe(CONFIG.title + ': a sorting activity. ' + CONFIG.question);
}

function windowResized() {
  updateCanvasSize();
  computeLayout();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}

// ----------------------------------------------------------------- layout
function computeLayout() {
  const w = canvasWidth - 2 * margin;
  const multi = CONFIG.dims.length > 1;
  L.choiceH = CONFIG.choiceHeight;
  if (multi) {
    L.rows = CONFIG.dims.length;
    L.labelW = Math.min(150, Math.floor(w * 0.26));
  } else {
    L.cols = 2;
    L.rows = Math.ceil(CONFIG.dims[0].choices.length / L.cols);
    L.labelW = 0;
  }
  L.choicesH = L.rows * L.choiceH + (L.rows - 1) * gap;
  // Height the item view needs with the configured card and feedback sizes
  const fixed = 66 + 10 + 30 + L.choicesH + 12 + 12;
  const itemHeight = fixed + CONFIG.cardHeight + CONFIG.feedbackHeight;
  // Height the summary needs so that every row fits
  const lineH = CONFIG.summaryLineHeight || 21;
  const summaryHeight = 146 + CONFIG.summaryMaxRows * lineH +
    (CONFIG.summaryHeadings || 1) * 10 + (CONFIG.takeaway ? 50 : 12) + 4;
  const extra = Math.max(0, summaryHeight - itemHeight);
  const third = Math.floor(extra / 3);
  const perRow = Math.floor(third / L.rows);
  L.choiceH = CONFIG.choiceHeight + perRow;
  L.choicesH = L.rows * L.choiceH + (L.rows - 1) * gap;
  L.cardY = 66;
  L.cardH = CONFIG.cardHeight + third;
  L.questionY = L.cardY + L.cardH + 10;
  L.choicesY = L.questionY + 30;
  L.feedbackY = L.choicesY + L.choicesH + 12;
  L.feedbackH = CONFIG.feedbackHeight + extra - third - perRow * L.rows;
  drawHeight = L.feedbackY + L.feedbackH + 12;
  canvasHeight = drawHeight + controlHeight;
}

function positionControls() {
  const w = canvasWidth - 2 * margin;
  const multi = CONFIG.dims.length > 1;
  for (let d = 0; d < CONFIG.dims.length; d++) {
    const n = CONFIG.dims[d].choices.length;
    for (let c = 0; c < n; c++) {
      const b = choiceButtons[d][c];
      let x, y, bw;
      if (multi) {
        bw = Math.floor((w - L.labelW - gap * (n - 1)) / n);
        x = margin + L.labelW + c * (bw + gap);
        y = L.choicesY + d * (L.choiceH + gap);
      } else {
        bw = Math.floor((w - gap * (L.cols - 1)) / L.cols);
        x = margin + (c % L.cols) * (bw + gap);
        y = L.choicesY + Math.floor(c / L.cols) * (L.choiceH + gap);
      }
      b.html(choiceLabelHTML(d, c));
      b.position(x, y);
      b.size(bw, L.choiceH);
    }
  }
  const cy = drawHeight + 10;
  const nw = isNarrow();
  let x = margin;
  if (checkButton) { checkButton.position(x, cy); checkButton.size(nw ? 78 : 110, 32); x += nw ? 86 : 120; }
  nextButton.position(x, cy); nextButton.size(nw ? 100 : 120, 32); x += nw ? 108 : 130;
  L.restartX = x;
  restartButton.position(x, cy); restartButton.size(nw ? 80 : 100, 32); x += nw ? 92 : 115;
  if (defsCheckbox) {
    defsCheckbox.position(x, cy + 6);
    defsCheckbox.style('white-space', 'nowrap');
    const span = defsCheckbox.elt.querySelector('span');
    if (span) span.textContent = ' ' + (nw ? 'Definitions' : (CONFIG.definitionsLabel || 'Show definitions'));
  }
  refreshControls();
}

// ----------------------------------------------------------------- state
function restart() {
  current = 0;
  results = [];
  finished = false;
  summaryPage = 0;
  summaryPageCount = 1;
  startItem();
  positionControls();
}

function startItem() {
  selections = CONFIG.dims.map(() => -1);
  answered = false;
  if (defsCheckbox) defsCheckbox.checked(false);
  refreshControls();
}

function choose(d, c) {
  if (answered || finished) return;
  selections[d] = c;
  if (CONFIG.mode === 'immediate') {
    checkAnswer();
  } else {
    refreshControls();
  }
}

function checkAnswer() {
  if (answered || finished) return;
  if (selections.some(s => s < 0)) return;
  const item = CONFIG.items[current];
  const correct = CONFIG.dims.map((dim, d) => dim.choices[selections[d]] === item.answer[d]);
  results[current] = {
    chosen: selections.map((s, d) => CONFIG.dims[d].choices[s]),
    correct: correct,
    ok: correct.every(Boolean)
  };
  answered = true;
  refreshControls();
}

function goNext() {
  if (!answered) return;
  if (current < CONFIG.items.length - 1) {
    current++;
    startItem();
  } else {
    finished = true;
    refreshControls();
  }
}

function score() {
  return results.filter(r => r && r.ok).length;
}

// ----------------------------------------------------------------- controls
function isNarrow() {
  return canvasWidth < 600;
}

function choiceLabelHTML(d, c) {
  const name = CONFIG.dims[d].choices[c];
  // On narrow screens the inline definitions no longer fit inside the buttons,
  // so only the names are shown there.
  if (CONFIG.definitionsMode === 'inline' && CONFIG.definitions && !isNarrow()) {
    const def = CONFIG.definitions.find(x => x.name === name);
    return '<b>' + name + '</b><br><span style="font-size:14px;color:' + C.soft + '">' +
      (def ? def.def : '') + '</span>';
  }
  return name;
}

function styleControl(b) {
  b.style('font-size', '15px');
  b.style('font-family', 'Arial, Helvetica, sans-serif');
  b.style('cursor', 'pointer');
}

function styleChoice(b, look) {
  const looks = {
    idle:     { bg: '#ffffff', bd: '#8c9cb2', ink: C.ink, w: '2px' },
    selected: { bg: '#dbe7ff', bd: '#2b5cb8', ink: '#12306b', w: '3px' },
    right:    { bg: C.okBg, bd: '#1e8a3c', ink: C.okInk, w: '3px' },
    wrong:    { bg: C.badBg, bd: '#c0392b', ink: C.badInk, w: '3px' },
    answer:   { bg: '#ffffff', bd: '#1e8a3c', ink: C.okInk, w: '3px' },
    faded:    { bg: '#f4f6f9', bd: '#c6cfdb', ink: '#5b6676', w: '2px' }
  };
  const s = looks[look];
  b.style('background', s.bg);
  b.style('border', s.w + ' solid ' + s.bd);
  b.style('color', s.ink);
  b.style('border-radius', '8px');
  b.style('font-size', isNarrow() ? '14px' : '15px');
  b.style('font-family', 'Arial, Helvetica, sans-serif');
  b.style('line-height', '1.2');
  b.style('padding', isNarrow() ? '2px 6px' : '4px 8px');
  b.style('white-space', 'normal');
  b.style('text-align', CONFIG.definitionsMode === 'inline' ? 'left' : 'center');
  b.style('opacity', '1');
  b.style('box-sizing', 'border-box');
  b.style('cursor', (look === 'idle' || look === 'selected') ? 'pointer' : 'default');
}

function defsShowing() {
  return defsCheckbox && defsCheckbox.checked();
}

function refreshControls() {
  const showChoices = !finished && !defsShowing();
  const item = CONFIG.items[current];
  for (let d = 0; d < choiceButtons.length; d++) {
    for (let c = 0; c < choiceButtons[d].length; c++) {
      const b = choiceButtons[d][c];
      if (!showChoices) { b.hide(); continue; }
      b.show();
      const name = CONFIG.dims[d].choices[c];
      let look = 'idle';
      if (answered) {
        const isAnswer = name === item.answer[d];
        if (c === selections[d]) look = isAnswer ? 'right' : 'wrong';
        else look = isAnswer ? 'answer' : 'faded';
      } else if (c === selections[d]) {
        look = 'selected';
      }
      styleChoice(b, look);
      b.elt.disabled = answered;
    }
  }
  if (checkButton) {
    if (finished) checkButton.hide(); else checkButton.show();
    checkButton.elt.disabled = answered || selections.some(s => s < 0) || defsShowing();
  }
  restartButton.position(finished ? margin : L.restartX, drawHeight + 10);
  moreButton.position(margin + 110, drawHeight + 10);
  moreButton.size(130, 32);
  if (finished && summaryPageCount > 1) moreButton.show(); else moreButton.hide();
  if (finished) {
    nextButton.hide();
  } else {
    nextButton.show();
    nextButton.html(current === CONFIG.items.length - 1 ? 'See results' : 'Next');
    nextButton.elt.disabled = !answered;
  }
  if (defsCheckbox) {
    if (finished) defsCheckbox.hide(); else defsCheckbox.show();
  }
}

// ----------------------------------------------------------------- drawing
function draw() {
  // drawing area
  stroke(C.border);
  strokeWeight(1);
  fill(C.bg);
  rect(0, 0, canvasWidth - 1, drawHeight);
  // control area
  fill(C.control);
  rect(0, drawHeight, canvasWidth - 1, controlHeight - 1);

  drawHeader();
  if (finished) {
    drawSummary();
  } else if (defsShowing()) {
    drawDefinitions();
  } else {
    drawItemCard();
    drawQuestion();
    if (CONFIG.dims.length > 1) drawDimLabels();
    drawFeedback();
  }
}

function drawHeader() {
  noStroke();
  fill(C.title);
  textStyle(BOLD);
  textAlign(LEFT, BASELINE);
  let ts = 22;
  textSize(ts);
  const right = headerRightText();
  textSize(16);
  const rw = textWidth(right);
  textSize(ts);
  while (ts > 16 && textWidth(CONFIG.title) > canvasWidth - 2 * margin - rw - 20) { ts--; textSize(ts); }
  text(CONFIG.title, margin, 30);
  textStyle(NORMAL);
  textSize(16);
  fill(C.soft);
  textAlign(RIGHT, BASELINE);
  text(right, canvasWidth - margin, 30);
  textAlign(LEFT, BASELINE);
  textStyle(ITALIC);
  textSize(14);
  fill(C.soft);
  text(fitLine(CONFIG.note, canvasWidth - 2 * margin), margin, 54);
  textStyle(NORMAL);
}

function headerRightText() {
  const N = CONFIG.items.length;
  if (finished) return 'Finished';
  let s = CONFIG.itemNoun + ' ' + (current + 1) + ' of ' + N;
  if (CONFIG.showRunningScore) s += '   Correct: ' + score() + ' of ' + N;
  return s;
}

function drawItemCard() {
  const item = CONFIG.items[current];
  const x = margin, y = L.cardY, w = canvasWidth - 2 * margin, h = L.cardH;
  stroke(C.border);
  strokeWeight(1);
  fill(C.card);
  rect(x, y, w, h, 10);
  noStroke();

  // caption and tag
  textStyle(BOLD);
  textSize(14);
  fill(C.soft);
  textAlign(LEFT, TOP);
  text((CONFIG.itemNoun + ' ' + (current + 1)).toUpperCase(), x + 14, y + 10);
  if (item.tag) {
    const tw = textWidth(item.tag) + 18;
    fill(C.tagBg);
    stroke('#e0b54a');
    rect(x + w - tw - 12, y + 7, tw, 22, 11);
    noStroke();
    fill(C.tagInk);
    textAlign(CENTER, TOP);
    text(item.tag, x + w - tw / 2 - 12, y + 11);
  }
  textStyle(NORMAL);

  // segments: main text, plus optional evidence
  const segs = [{ caption: null, text: item.text }];
  if (item.evidence !== undefined) {
    segs.push({ caption: CONFIG.evidenceCaption || 'Evidence offered', text: item.evidence });
  }
  const innerW = w - 28;
  const top = y + 36, avail = h - 36 - 10;
  let size = 18, layout;
  for (; size >= 13; size--) {
    layout = layoutSegments(segs, innerW, size);
    if (layout.height <= avail) break;
  }
  let yy = top;
  for (const seg of layout.segs) {
    if (seg.caption) {
      textStyle(BOLD);
      textSize(14);
      fill(C.soft);
      textAlign(LEFT, TOP);
      text(seg.caption.toUpperCase(), x + 14, yy);
      yy += 19;
    }
    textStyle(NORMAL);
    textSize(size);
    fill(C.ink);
    textAlign(LEFT, TOP);
    for (const line of seg.lines) {
      text(line, x + 14, yy);
      yy += size * 1.3;
    }
    yy += 6;
  }
}

function layoutSegments(segs, w, size) {
  textSize(size);
  textStyle(NORMAL);
  let height = 0;
  const out = [];
  segs.forEach((s, i) => {
    const lines = wrapText(s.text, w);
    if (s.caption) height += 19;
    height += lines.length * size * 1.3;
    if (i < segs.length - 1) height += 6;
    out.push({ caption: s.caption, lines: lines });
  });
  return { segs: out, height: height };
}

function drawQuestion() {
  noStroke();
  fill(C.title);
  textStyle(BOLD);
  textSize(17);
  textAlign(LEFT, TOP);
  text(fitLine(CONFIG.question, canvasWidth - 2 * margin), margin, L.questionY + 4);
  textStyle(NORMAL);
}

function drawDimLabels() {
  noStroke();
  fill(C.ink);
  textStyle(BOLD);
  textSize(15);
  textAlign(LEFT, CENTER);
  for (let d = 0; d < CONFIG.dims.length; d++) {
    const y = L.choicesY + d * (L.choiceH + gap) + L.choiceH / 2;
    const lines = wrapText(CONFIG.dims[d].label, L.labelW - 8);
    lines.forEach((ln, i) => text(ln, margin, y + (i - (lines.length - 1) / 2) * 18));
  }
  textStyle(NORMAL);
}

function drawFeedback() {
  const x = margin, y = L.feedbackY, w = canvasWidth - 2 * margin, h = L.feedbackH;
  const item = CONFIG.items[current];
  let fb;
  if (!answered) {
    fb = { tone: 'idle', title: '', body: CONFIG.mode === 'check' ? CONFIG.checkPrompt : CONFIG.choosePrompt };
  } else {
    fb = feedbackFor(item, results[current]);
  }
  const bg = fb.tone === 'ok' ? C.okBg : fb.tone === 'bad' ? C.badBg : C.idleBg;
  const bd = fb.tone === 'ok' ? '#1e8a3c' : fb.tone === 'bad' ? '#c0392b' : C.border;
  stroke(bd);
  strokeWeight(fb.tone === 'idle' ? 1 : 2);
  fill(bg);
  rect(x, y, w, h, 10);
  noStroke();
  strokeWeight(1);

  const innerW = w - 28;
  let yy = y + 10;
  const ink = fb.tone === 'ok' ? C.okInk : fb.tone === 'bad' ? C.badInk : C.soft;
  // title lines (may be several, e.g. one per dimension)
  const titles = Array.isArray(fb.title) ? fb.title : (fb.title ? [fb.title] : []);
  textAlign(LEFT, TOP);
  for (const t of titles) {
    textStyle(BOLD);
    textSize(16);
    fill(t.tone === 'bad' ? C.badInk : t.tone === 'ok' ? C.okInk : ink);
    const s = typeof t === 'string' ? t : t.text;
    for (const ln of wrapText(s, innerW)) { text(ln, x + 14, yy); yy += 21; }
  }
  textStyle(NORMAL);
  const avail = y + h - 8 - yy;
  let size = 16;
  let lines;
  for (; size >= 13; size--) {
    textSize(size);
    lines = wrapText(fb.body, innerW);
    if (lines.length * size * 1.3 <= avail) break;
  }
  fill(fb.tone === 'idle' ? C.soft : C.ink);
  if (fb.tone === 'idle') textStyle(ITALIC);
  for (const ln of lines) { text(ln, x + 14, yy); yy += size * 1.3; }
  textStyle(NORMAL);
}

function feedbackFor(item, r) {
  if (CONFIG.dims.length > 1) {
    const titles = CONFIG.dims.map((dim, d) => ({
      text: dim.label + ': ' + r.chosen[d] + (r.correct[d] ? '  (right)' : '  (wrong; correct: ' + item.answer[d] + ')'),
      tone: r.correct[d] ? 'ok' : 'bad'
    }));
    return { tone: r.ok ? 'ok' : 'bad', title: titles, body: 'Why: ' + item.why };
  }
  return r.ok ? CONFIG.feedbackCorrect(item, r) : CONFIG.feedbackIncorrect(item, r);
}

function drawDefinitions() {
  const x = margin, y = L.cardY, w = canvasWidth - 2 * margin, h = drawHeight - L.cardY - 12;
  stroke(C.border);
  fill(C.card);
  rect(x, y, w, h, 10);
  noStroke();
  fill(C.title);
  textStyle(BOLD);
  textSize(17);
  textAlign(LEFT, TOP);
  text(CONFIG.definitionsTitle || 'Definitions', x + 14, y + 12);
  let yy = y + 44;
  const innerW = w - 28;
  for (const d of CONFIG.definitions) {
    textStyle(BOLD);
    textSize(16);
    fill(C.ink);
    text(d.name, x + 14, yy);
    yy += 22;
    textStyle(NORMAL);
    textSize(15);
    fill(C.soft);
    for (const ln of wrapText(d.def, innerW - 14)) { text(ln, x + 28, yy); yy += 20; }
    yy += 10;
  }
  textStyle(ITALIC);
  textSize(14);
  fill(C.soft);
  text('Uncheck the definitions box to return to the ' + CONFIG.itemNoun.toLowerCase() + '.', x + 14, y + h - 26);
  textStyle(NORMAL);
}

// ----------------------------------------------------------------- summary
function drawSummary() {
  const N = CONFIG.items.length;
  const n = score();
  const x = margin, w = canvasWidth - 2 * margin;
  const mastered = n >= CONFIG.mastery;
  stroke(mastered ? '#1e8a3c' : C.border);
  strokeWeight(mastered ? 2 : 1);
  fill(mastered ? C.okBg : C.card);
  rect(x, 66, w, 66, 10);
  strokeWeight(1);
  noStroke();
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(22);
  fill(C.title);
  text(CONFIG.scoreText(n, N), x + 14, 74);
  textSize(16);
  fill(mastered ? C.okInk : C.soft);
  textStyle(mastered ? BOLD : NORMAL);
  text(fitLine(mastered ? CONFIG.masteryText : CONFIG.notMasteryText, w - 28), x + 14, 106);
  textStyle(NORMAL);

  const rows = CONFIG.summaryRows();
  const full = drawHeight - (CONFIG.takeaway ? 50 : 12);
  const lineH = CONFIG.summaryLineHeight || 21;
  let pages = paginate(rows, full, lineH);
  if (pages.length > 1) pages = paginate(rows, full - 24, lineH);  // leave room for the page line
  let yy;
  if (pages.length !== summaryPageCount) {
    summaryPageCount = pages.length;
    refreshControls();
  }
  summaryPage = Math.min(summaryPage, pages.length - 1);
  yy = 146;
  pages[summaryPage].forEach((row, i) => {
    if (row.heading && i > 0) yy += 8;
    drawSummaryRow(row, x, yy, w);
    yy += row.heading ? lineH + 2 : lineH;
  });
  if (pages.length > 1) {
    textStyle(ITALIC);
    textSize(14);
    fill(C.soft);
    textAlign(LEFT, TOP);
    text('Page ' + (summaryPage + 1) + ' of ' + pages.length + '. Press "More results" to see the rest.', x + 4, yy + 4);
    textStyle(NORMAL);
  }
  if (CONFIG.takeaway) {
    textStyle(ITALIC);
    textSize(15);
    fill(C.title);
    textAlign(LEFT, TOP);
    const lines = wrapText(CONFIG.takeaway, w);
    let ty = drawHeight - 12 - lines.length * 19;
    for (const ln of lines) { text(ln, x, ty); ty += 19; }
    textStyle(NORMAL);
  }
}

// Split summary rows into pages that fit between y = 146 and bottom.
// A note row always stays on the same page as the row above it.
function paginate(rows, bottom, lineH) {
  const pages = [[]];
  let yy = 146;
  for (let i = 0; i < rows.length; i++) {
    const own = rows[i].heading ? lineH + 2 + (pages[pages.length - 1].length ? 8 : 0) : lineH;
    const next = (rows[i + 1] && rows[i + 1].note) ? lineH : 0;
    if (!rows[i].note && pages[pages.length - 1].length > 0 && yy + own + next > bottom) {
      pages.push([]);
      yy = 146;
    }
    yy += rows[i].heading ? lineH + 2 + (pages[pages.length - 1].length ? 8 : 0) : lineH;
    pages[pages.length - 1].push(rows[i]);
  }
  return pages;
}

// row: {heading:true, text} | {mark: true/false/null, text, right, indent, note}
function drawSummaryRow(row, x, y, w) {
  textAlign(LEFT, TOP);
  if (row.heading) {
    textStyle(BOLD);
    textSize(16);
    fill(C.title);
    text(fitLine(row.text, w), x, y + 2);
    textStyle(NORMAL);
    return;
  }
  const indent = row.indent || 0;
  let xx = x + indent;
  textSize(15);
  if (row.mark !== undefined && row.mark !== null) {
    textStyle(BOLD);
    fill(row.mark ? C.okInk : C.badInk);
    text(row.mark ? '✓' : '✗', xx, y);
    textStyle(NORMAL);
    xx += 20;
  }
  let avail = x + w - xx;
  if (row.right) {
    textStyle(BOLD);
    const rw = textWidth(row.right);
    fill(row.rightTone === 'bad' ? C.badInk : C.soft);
    textAlign(RIGHT, TOP);
    text(row.right, x + w, y);
    textAlign(LEFT, TOP);
    textStyle(NORMAL);
    avail -= rw + 14;
  }
  if (row.note) { textStyle(ITALIC); textSize(14); fill(C.soft); }
  else { fill(C.ink); }
  text(fitLine(row.text, avail), xx, y);
  textStyle(NORMAL);
}

// Group items by correct answer (single-dimension sorters).
function groupedRows() {
  const rows = [];
  for (const cat of CONFIG.dims[0].choices) {
    const members = CONFIG.items.map((it, i) => ({ it, i })).filter(o => o.it.answer[0] === cat);
    rows.push({ heading: true, text: cat + ' (' + members.length + ')' });
    for (const o of members) {
      const r = results[o.i];
      rows.push({
        mark: r.ok, indent: 6,
        text: (o.i + 1) + '. ' + (CONFIG.shortText ? CONFIG.shortText(o.it) : o.it.text),
        right: r.ok ? '' : 'you chose: ' + (CONFIG.shortChoice ? CONFIG.shortChoice(r.chosen[0]) : r.chosen[0]),
        rightTone: 'bad'
      });
    }
  }
  return rows;
}

// ----------------------------------------------------------------- text helpers
function wrapText(str, w) {
  const words = String(str).split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    const test = line ? line + ' ' + word : word;
    if (textWidth(test) <= w || !line) {
      line = test;
    } else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function fitLine(str, w) {
  if (textWidth(str) <= w) return str;
  let s = str;
  while (s.length > 1 && textWidth(s + '…') > w) s = s.slice(0, -1);
  return s.trimEnd() + '…';
}
