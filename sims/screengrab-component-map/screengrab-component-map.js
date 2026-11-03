// ScreenGrab Component Map — Predict mode for the shared callout overlay
// CANVAS_HEIGHT: 760
// diagram.js supplies Explore mode. Its Quiz mode asks learners to identify
// structures, so this file replaces it with the spec's six one-attempt
// predictions and draws each connection as it is revealed.

const SVG_NS = 'http://www.w3.org/2000/svg';
const PASS_SCORE = 5;
const IMAGE_WIDTH = 1200;   // units of the #path-layer viewBox
const IMAGE_HEIGHT = 900;
const EDGE_GAP = 95;        // keeps arrows off the illustrated components

let step = 0;
let correct = 0;

const byLabel = label => sim.data.callouts.find(c => c.label === label);
const scoreVal = () => document.getElementById('score-val');
const choicesEl = () => document.getElementById('trace-choices');

function clearEdges() {
  document.querySelectorAll('#path-layer line').forEach(line => line.remove());
}

function drawEdge(fromLabel, toLabel) {
  const from = byLabel(fromLabel);
  const to = byLabel(toLabel);
  const x1 = from.x / 100 * IMAGE_WIDTH;
  const y1 = from.y / 100 * IMAGE_HEIGHT;
  const x2 = to.x / 100 * IMAGE_WIDTH;
  const y2 = to.y / 100 * IMAGE_HEIGHT;
  const length = Math.hypot(x2 - x1, y2 - y1);
  const ux = (x2 - x1) / length;
  const uy = (y2 - y1) / length;

  const line = document.createElementNS(SVG_NS, 'line');
  line.setAttribute('x1', x1 + ux * EDGE_GAP);
  line.setAttribute('y1', y1 + uy * EDGE_GAP);
  line.setAttribute('x2', x2 - ux * EDGE_GAP);
  line.setAttribute('y2', y2 - uy * EDGE_GAP);
  line.setAttribute('marker-end', 'url(#arrowhead)');
  document.getElementById('path-layer').appendChild(line);
}

function highlight(label) {
  for (const callout of sim.data.callouts) {
    const isCurrent = callout.label === label;
    sim.markers.get(callout.id).classList.toggle('active', isCurrent);
    sim.labelRows.get(callout.id).classList.toggle('active', isCurrent);
  }
}

function setInfobox(heading, headingClass, text) {
  document.getElementById('infobox-prompt').style.display = 'none';
  document.getElementById('infobox-content').style.display = 'block';
  document.getElementById('infobox-ap-tip').style.display = 'none';
  const labelEl = document.getElementById('infobox-label');
  labelEl.textContent = heading;
  labelEl.className = headingClass;
  document.getElementById('infobox-desc').textContent = text;
}

function makeButton(text, onClick) {
  const btn = document.createElement('button');
  btn.className = 'mode-btn';
  btn.textContent = text;
  btn.onclick = onClick;
  return btn;
}

function showStep() {
  const current = sim.data.trace[step];
  highlight(current.current);
  setInfobox(`Step ${step + 1} of ${sim.data.trace.length}`, 'prompt-label', current.question);
  choicesEl().replaceChildren(...current.choices.map(choice =>
    makeButton(choice, event => answer(choice, event.currentTarget))));
}

function answer(choice, clickedBtn) {
  const current = sim.data.trace[step];
  const isRight = choice === current.next;
  if (isRight) scoreVal().textContent = ++correct;

  for (const btn of choicesEl().children) {
    btn.disabled = true;
    if (btn.textContent === current.next) btn.classList.add('right');
  }
  if (!isRight) clickedBtn.classList.add('wrong');

  drawEdge(current.current, current.next);
  setInfobox(
    isRight ? `Correct: ${current.next}` : `The next component is ${current.next}`,
    isRight ? 'correct-label' : '',
    current.why
  );

  const isLast = step === sim.data.trace.length - 1;
  choicesEl().appendChild(makeButton(isLast ? 'See the Result' : 'Next Step', () => {
    step++;
    if (isLast) showResult();
    else showStep();
  }));
}

function showResult() {
  highlight(null);
  choicesEl().replaceChildren();
  const passed = correct >= PASS_SCORE;
  setInfobox(
    passed ? 'You can trace a grab' : 'Try tracing the grab again',
    passed ? 'correct-label' : '',
    `Correct: ${correct} of ${sim.data.trace.length}. Look at where the two starts meet: ` +
    'the hotkey and the menu command both feed the same path.'
  );
  document.getElementById('quiz-restart').style.display = passed ? 'none' : 'block';
}

function startTrace() {
  step = 0;
  correct = 0;
  clearEdges();
  document.body.classList.add('tracing');
  document.getElementById('quiz-score').style.display = '';
  document.getElementById('quiz-restart').style.display = 'none';
  scoreVal().textContent = 0;
  document.getElementById('score-total').textContent = sim.data.trace.length;
  showStep();
}

// Replaced on the instance so the shared engine stays unmodified.
const engineInitExplore = sim.initExplore.bind(sim);
sim.initExplore = () => {
  clearEdges();
  document.body.classList.remove('tracing');
  choicesEl().replaceChildren();
  engineInitExplore();
};
sim.initQuiz = startTrace;
sim.restartQuiz = startTrace;
