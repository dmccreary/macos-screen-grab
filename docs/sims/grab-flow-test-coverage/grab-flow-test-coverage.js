/*
// CANVAS_HEIGHT: 690
 * ScreenGrab Grab Flow Test Coverage (Mermaid MicroSim)
 * Bloom: Analyze (distinguish). The learner opens each of the seven steps of a
 * grab and commits "Automated can confirm" or "Only a person can confirm"
 * before the answer is shown. One attempt per step. Mastery: 6 of 7.
 */

// ---------------------------------------------------------------------------
// Content (from the specification's Content table)
// ---------------------------------------------------------------------------
const AUTO = 'Automated can confirm';
const PERSON = 'Only a person can confirm';
const CHOICES = [AUTO, PERSON];

const STEPS = {
    G1: {
        num: 1, title: 'Press the hotkey',
        description: 'A person presses Control-Shift-4 in another app.',
        answer: PERSON,
        reason: 'A program cannot send a real key press without Accessibility permission.'
    },
    G2: {
        num: 2, title: 'Hotkey reaches the app',
        description: 'The registered hotkey event is delivered to ScreenGrab’s handler.',
        answer: AUTO,
        reason: 'A test builds a Carbon hotkey event by hand and checks the handler receives the right action.'
    },
    G3: {
        num: 3, title: 'Coordinator starts the grab',
        description: 'The state machine moves from idle to selecting.',
        answer: AUTO,
        reason: 'Tested with fakes for every dependency.'
    },
    G4: {
        num: 4, title: 'Screen is captured',
        description: 'The real display is captured to a frozen still image.',
        answer: PERSON,
        reason: 'It needs the real Screen Recording permission and a real display.'
    },
    G5: {
        num: 5, title: 'User drags a selection',
        description: 'The overlay shows and the drag chooses a region.',
        answer: AUTO,
        reason: 'Synthesized mouse events and off-screen rendering check selection and drawing.'
    },
    G6: {
        num: 6, title: 'Image is cropped and copied',
        description: 'The region is cropped, encoded, and written to the clipboard.',
        answer: AUTO,
        reason: 'Tested with known pixels and a private named pasteboard.'
    },
    G7: {
        num: 7, title: 'Image is pasted into another app',
        description: 'The user pastes into Preview, Keynote, or Pages.',
        answer: PERSON,
        reason: 'It needs a real other application and a person to judge size and orientation.'
    }
};

const INFO_NODES = {};

const TOTAL = Object.keys(STEPS).length;   // 7
const MASTERY = 6;
const QUESTION = 'At which steps does a person have to look?';

// Edge labels state what each step passes on. Read in the spec's order, the six
// labels do not line up with the six arrows (the frozen image comes out of
// step 4, not step 3). They are placed where each item is actually handed on:
// the capture hands on the frozen image, the overlay hands on the selection,
// and the crop step hands the clipboard contents (cropped PNG and TIFF) to the
// paste. The arrow from step 3 to step 4 is labeled "start capture".
const DIAGRAM = `flowchart TD
    G1["1 · Press the hotkey"]:::step
    G2["2 · Hotkey reaches the app"]:::step
    G3["3 · Coordinator starts the grab"]:::step
    G4["4 · Screen is captured"]:::step
    G5["5 · User drags a selection"]:::step
    G6["6 · Image is cropped and copied"]:::step
    G7["7 · Image is pasted into another app"]:::step
    G1 -->|key event| G2
    G2 -->|action| G3
    G3 -->|start capture| G4
    G4 -->|frozen image| G5
    G5 -->|selection| G6
    G6 -->|"clipboard contents:<br/>cropped PNG and TIFF"| G7
    classDef step fill:#dbeafe,stroke:#1e40af,stroke-width:2px,color:#111827,font-size:16px
    linkStyle default stroke:#475569,stroke-width:2px`;

// ---------------------------------------------------------------------------
// Sim-specific behavior (the engine below is shared by the Mermaid sims)
// ---------------------------------------------------------------------------
const RENDER_ID = 'grabflow';
const PROMPT = 'Can an automated test confirm this step?';
const START_HINT = 'Click a step in the flowchart to begin. Each step gives you one attempt.';
const COMPLETION_NOTE = 'The orange steps need a person: the first, fourth, and last. Automation covers the middle of the chain, but not the real key press, the real capture, or the real paste. The badge shows whether your judgment matched.';

function choicesFor(id) { return CHOICES.slice(); }

function isCorrect(id, choice) { return choice === STEPS[id].answer; }

function correctChoice(id) { return STEPS[id].answer; }

function feedbackText(step, ans) {
    return (ans.correct ? 'Correct. ' : 'Not quite. ') + `Answer: ${step.answer}. ${step.reason}`;
}

function scoreText(done, score) {
    if (done < TOTAL) return `Answered: ${done} of ${TOTAL}`;
    return `Matched: ${score} of ${TOTAL}` +
        (score >= MASTERY ? ' — Mastery' : ` — mastery is ${MASTERY} of ${TOTAL}; press Reset to try again`);
}

// While answering, a node shows whether the judgment matched. When all seven
// are answered, the fill switches to the answer itself so the steps that need
// a person stand out; the badge still shows whether the learner matched.
function nodeState(id) {
    const a = answers[id];
    if (!a) return null;
    if (Object.keys(answers).length === TOTAL) return STEPS[id].answer === PERSON ? 'person' : 'auto';
    return a.correct ? 'correct' : 'wrong';
}

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
let answers = {};        // id -> { picked, correct }
let choiceOrder = {};    // id -> shuffled array of output strings
let selectedId = null;
let nodeEls = {};        // id -> SVG <g> element

function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function newVisit() {
    answers = {};
    selectedId = null;
    choiceOrder = {};
    Object.keys(STEPS).forEach(id => { choiceOrder[id] = choicesFor(id); });
}

// ---------------------------------------------------------------------------
// Rendering the diagram
// ---------------------------------------------------------------------------
async function renderDiagram() {
    const host = document.getElementById('diagram');
    try {
        mermaid.initialize({
            startOnLoad: false,
            theme: 'default',
            securityLevel: 'loose',
            flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis', nodeSpacing: 30, rankSpacing: 22, padding: 8 },
            themeVariables: { fontSize: '16px', fontFamily: 'Arial, Helvetica, sans-serif' }
        });
        const { svg } = await mermaid.render(RENDER_ID, DIAGRAM);
        host.innerHTML = svg;
    } catch (err) {
        host.innerHTML = '<p class="error">The diagram could not be drawn.</p>';
        console.error('Mermaid render failed:', err);
        return;
    }
    nodeEls = {};
    host.querySelectorAll('.node').forEach(g => {
        const m = g.id.match(/flowchart-([A-Za-z0-9_]+)-\d+$/);
        if (!m) return;
        const id = m[1];
        if (!STEPS[id] && !INFO_NODES[id]) return;
        nodeEls[id] = g;
        g.setAttribute('tabindex', '0');
        g.setAttribute('role', 'button');
        const name = STEPS[id] ? `Step ${STEPS[id].num}: ${STEPS[id].title}` : INFO_NODES[id].title;
        g.setAttribute('aria-label', name);
        g.addEventListener('click', () => selectNode(id));
        g.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectNode(id); }
        });
    });
    applyNodeStates();
}

// Mermaid 11 writes classDef colors as inline "!important" styles, so state
// colors must be painted inline too (a stylesheet rule cannot win).
const STATE_STYLE = {
    correct: { fill: '#bbf7d0', stroke: '#15803d' },
    wrong:   { fill: '#fecaca', stroke: '#b91c1c' },
    person:  { fill: '#fed7aa', stroke: '#c2410c' },
    auto:    { fill: '#e0f2fe', stroke: '#0369a1' }
};

function paintNode(g, state, selected) {
    g.querySelectorAll('rect, polygon').forEach(shape => {
        if (shape.closest('.label')) return;
        if (shape.dataset.origStyle === undefined) shape.dataset.origStyle = shape.getAttribute('style') || '';
        shape.setAttribute('style', shape.dataset.origStyle);
        if (state) {
            shape.style.setProperty('fill', STATE_STYLE[state].fill, 'important');
            shape.style.setProperty('stroke', STATE_STYLE[state].stroke, 'important');
        }
        if (selected) {
            shape.style.setProperty('stroke', '#111827', 'important');
            shape.style.setProperty('stroke-width', '4px', 'important');
        }
    });
}

// A drawn badge (not a text glyph) so it never falls back to an emoji font.
function makeMark(cx, cy, ok) {
    const NS = 'http://www.w3.org/2000/svg';
    const m = document.createElementNS(NS, 'g');
    m.setAttribute('class', 'mark');
    m.setAttribute('transform', `translate(${cx},${cy})`);
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('r', '10');
    c.style.setProperty('fill', ok ? '#15803d' : '#b91c1c', 'important');
    c.style.setProperty('stroke', '#ffffff', 'important');
    c.style.setProperty('stroke-width', '2px', 'important');
    const p = document.createElementNS(NS, 'path');
    p.setAttribute('d', ok ? 'M-5,0 L-1.5,4 L5,-4' : 'M-4,-4 L4,4 M4,-4 L-4,4');
    p.style.setProperty('fill', 'none', 'important');
    p.style.setProperty('stroke', '#ffffff', 'important');
    p.style.setProperty('stroke-width', '2.5px', 'important');
    p.style.setProperty('stroke-linecap', 'round');
    m.appendChild(c);
    m.appendChild(p);
    const title = document.createElementNS(NS, 'title');
    title.textContent = ok ? 'Answered correctly' : 'Answered incorrectly';
    m.appendChild(title);
    return m;
}

function applyNodeStates() {
    Object.entries(nodeEls).forEach(([id, g]) => {
        const a = answers[id];
        paintNode(g, nodeState(id), id === selectedId);
        const old = g.querySelector('.mark');
        if (old) old.remove();
        if (a) {
            const box = g.getBBox();
            g.appendChild(makeMark(box.x + box.width - 2, box.y + 2, a.correct));
        }
    });
}

// ---------------------------------------------------------------------------
// Info panel
// ---------------------------------------------------------------------------
function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
}

function selectNode(id) {
    selectedId = id;
    applyNodeStates();
    renderCard();
}

function renderCard() {
    const card = document.getElementById('card');
    card.innerHTML = '';
    if (!selectedId) {
        card.appendChild(el('p', 'hint', START_HINT));
        return;
    }
    if (INFO_NODES[selectedId]) {
        const info = INFO_NODES[selectedId];
        card.appendChild(el('h3', null, info.title));
        card.appendChild(el('p', null, info.text));
        card.appendChild(el('p', 'hint', 'This end point is not scored.'));
        return;
    }
    const step = STEPS[selectedId];
    card.appendChild(el('h3', null, `Step ${step.num}: ${step.title}`));
    card.appendChild(el('p', null, step.description));
    card.appendChild(el('p', 'prompt', PROMPT));
    const ans = answers[selectedId];
    choiceOrder[selectedId].forEach(choice => {
        const b = el('button', 'choice', choice);
        b.type = 'button';
        if (ans) {
            b.disabled = true;
            if (choice === correctChoice(selectedId)) b.classList.add('is-correct');
            else if (choice === ans.picked) b.classList.add('picked-wrong');
        } else {
            b.addEventListener('click', () => pick(selectedId, choice));
        }
        card.appendChild(b);
    });
    if (ans) {
        const fb = el('div', ans.correct ? 'feedback ok' : 'feedback bad', feedbackText(step, ans));
        fb.setAttribute('role', 'status');
        card.appendChild(fb);
    }
}

function lowerFirst(s) { return s.charAt(0).toLowerCase() + s.slice(1); }

function pick(id, choice) {
    if (answers[id]) return;               // one attempt per step
    answers[id] = { picked: choice, correct: isCorrect(id, choice) };
    applyNodeStates();
    renderCard();
    updateScore();
}

function updateScore() {
    const done = Object.keys(answers).length;
    const score = Object.values(answers).filter(a => a.correct).length;
    const s = document.getElementById('score');
    s.textContent = scoreText(done, score);
    const note = document.getElementById('note');
    note.textContent = done === TOTAL ? COMPLETION_NOTE : '';
    note.hidden = done !== TOTAL;
    applyNodeStates();
}

function reset() {
    newVisit();
    applyNodeStates();
    renderCard();
    updateScore();
}

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------
function init() {
    document.getElementById('question').textContent = QUESTION;
    document.getElementById('reset').addEventListener('click', reset);
    newVisit();
    renderCard();
    updateScore();
    renderDiagram();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
