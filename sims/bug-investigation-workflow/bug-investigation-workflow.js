/*
 * Bug Investigation Workflow (Mermaid MicroSim)
 * Bloom: Remember (identify). The learner clicks each of the seven steps,
 * picks which of three outputs the step produces, and gets one attempt per step.
 * Mastery: 6 of 7 correct.
 */

// ---------------------------------------------------------------------------
// Content (from the specification's Content table)
// ---------------------------------------------------------------------------
const STEPS = {
    S1: {
        num: 1, title: 'Observe the failure',
        description: 'Notice a difference between expected and actual behavior',
        correct: 'A written observation of expected versus actual',
        wrong: ['A fixed bug', 'A new feature'],
        reason: 'You cannot work on a bug nobody has written down.'
    },
    S2: {
        num: 2, title: 'Try to reproduce it',
        description: 'Follow the recipe on the original setup',
        correct: 'A recipe that makes the bug happen on demand',
        wrong: ['A passing test', 'A release'],
        reason: 'Reproduction is a recipe, not a fix.'
    },
    S3: {
        num: 3, title: 'Decision: reproducible?',
        // The spec text says "continue to step 4", but its own edge labels send
        // "reproduced" to step 5 (Find the root cause). Step 5 is used here.
        description: 'If yes continue to step 5. If no, record an unexplained failure',
        correct: 'A yes or no, with the environment noted',
        wrong: ['A root cause', 'A regression test'],
        reason: 'The answer decides whether the investigation can continue.'
    },
    S4: {
        num: 4, title: 'Record an unexplained failure',
        description: 'State what was seen, what was known, and what to capture next time',
        correct: 'A written note of known facts and missing facts',
        wrong: ['A claim that the bug is fixed', 'A deleted report'],
        reason: 'Honest reporting beats a false fix.'
    },
    S5: {
        num: 5, title: 'Find the root cause',
        description: 'Ask why until removing the cause makes the bug impossible',
        correct: 'A named underlying cause',
        wrong: ['A workaround', 'A bigger test suite'],
        reason: 'The cause, not the symptom, is what you fix.'
    },
    S6: {
        num: 6, title: 'Fix and add a regression test',
        description: 'Change the code and write a test that fails before the fix',
        correct: 'A fix plus a test that failed first and now passes',
        wrong: ['A new bug report', 'A README change'],
        reason: 'A fix without a test may silently return.'
    },
    S7: {
        num: 7, title: 'Re-verify and report',
        description: 'Run the full checks and record the evidence',
        correct: 'A status report with dated evidence',
        wrong: ['A guess that it is fixed', 'A deleted test'],
        reason: 'A claim needs a receipt.'
    }
};

// Unscored information node
const INFO_NODES = {
    W: {
        title: 'Wait for new evidence',
        text: 'Capture the frontmost app, the log, and the settings the next time it happens'
    }
};

const TOTAL = Object.keys(STEPS).length;   // 7
const MASTERY = 6;
const QUESTION = 'What does each step of a bug investigation produce?';

const DIAGRAM = `flowchart TD
    S1["1 · Observe the failure"]:::step
    S2["2 · Try to reproduce it"]:::step
    S3{"3 · Reproducible?"}:::decision
    S4["4 · Record an<br/>unexplained failure"]:::step
    S5["5 · Find the root cause"]:::step
    S6["6 · Fix and add a<br/>regression test"]:::step
    S7["7 · Re-verify and report"]:::step
    W("Wait for new evidence"):::endnode
    S1 --> S2 --> S3
    S3 -->|reproduced| S5
    S3 -->|cannot reproduce| S4
    S5 --> S6 --> S7
    S4 --> W
    classDef step fill:#dbeafe,stroke:#1e40af,stroke-width:2px,color:#111827,font-size:16px
    classDef decision fill:#fef3c7,stroke:#b45309,stroke-width:2px,color:#111827,font-size:16px
    classDef endnode fill:#e5e7eb,stroke:#4b5563,stroke-width:2px,color:#111827,font-size:16px
    linkStyle default stroke:#475569,stroke-width:2px`;

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
    // Shuffled once per visit (rules): order stays fixed until Reset.
    Object.keys(STEPS).forEach(id => {
        choiceOrder[id] = shuffle([STEPS[id].correct].concat(STEPS[id].wrong));
    });
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
            flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis', nodeSpacing: 30, rankSpacing: 36, padding: 10 },
            themeVariables: { fontSize: '16px', fontFamily: 'Arial, Helvetica, sans-serif' }
        });
        const { svg } = await mermaid.render('bugflow', DIAGRAM);
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
    wrong:   { fill: '#fecaca', stroke: '#b91c1c' }
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

function applyNodeStates() {
    Object.entries(nodeEls).forEach(([id, g]) => {
        const a = answers[id];
        paintNode(g, a ? (a.correct ? 'correct' : 'wrong') : null, id === selectedId);
        const old = g.querySelector('.mark');
        if (old) old.remove();
        if (a) {
            const box = g.getBBox();
            const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            t.setAttribute('class', 'mark');
            t.setAttribute('x', box.x + box.width - 7);
            t.setAttribute('y', box.y + 5);
            t.setAttribute('text-anchor', 'end');
            t.setAttribute('dominant-baseline', 'hanging');
            t.style.setProperty('fill', a.correct ? '#15803d' : '#b91c1c', 'important');
            t.textContent = a.correct ? '\u2713' : '\u2717';
            g.appendChild(t);
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
        card.appendChild(el('p', 'hint', 'Click a step in the flowchart to begin. Each step gives you one attempt.'));
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
    card.appendChild(el('p', 'prompt', 'What does this step produce?'));
    const ans = answers[selectedId];
    choiceOrder[selectedId].forEach(choice => {
        const b = el('button', 'choice', choice);
        b.type = 'button';
        if (ans) {
            b.disabled = true;
            if (choice === step.correct) b.classList.add('is-correct');
            else if (choice === ans.picked) b.classList.add('picked-wrong');
        } else {
            b.addEventListener('click', () => pick(selectedId, choice));
        }
        card.appendChild(b);
    });
    if (ans) {
        const fb = ans.correct
            ? el('div', 'feedback ok', `Correct. ${step.reason}`)
            : el('div', 'feedback bad', `Not quite: this step produces ${lowerFirst(step.correct)}. ${step.reason}`);
        fb.setAttribute('role', 'status');
        card.appendChild(fb);
    }
}

function lowerFirst(s) { return s.charAt(0).toLowerCase() + s.slice(1); }

function pick(id, choice) {
    if (answers[id]) return;               // one attempt per step
    answers[id] = { picked: choice, correct: choice === STEPS[id].correct };
    applyNodeStates();
    renderCard();
    updateScore();
}

function updateScore() {
    const done = Object.keys(answers).length;
    const score = Object.values(answers).filter(a => a.correct).length;
    const s = document.getElementById('score');
    if (done < TOTAL) {
        s.textContent = `Answered: ${done} of ${TOTAL}`;
    } else {
        s.textContent = `Correct: ${score} of ${TOTAL}` +
            (score >= MASTERY ? ' — mastery reached' : ` — mastery is ${MASTERY} of ${TOTAL}; press Reset to try again`);
    }
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
