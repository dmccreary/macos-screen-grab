/*
 * Fork and Pull Request Flow (Mermaid MicroSim)
 * Bloom: Understand (classify). The learner clicks each of the six steps of a
 * contribution and classifies where code changes: the contributor's fork, the
 * original repository, or nowhere. One attempt per step. Mastery: 5 of 6.
 */

// ---------------------------------------------------------------------------
// Content (from the specification's Content table)
// ---------------------------------------------------------------------------
const FORK = "Contributor's fork";
const ORIGINAL = 'Original repository';
const NOWHERE = 'Nowhere (no code changes)';

// Rules: the order of the three choices is the same for every step.
const CHOICES = [FORK, ORIGINAL, NOWHERE];

const STEPS = {
    F1: {
        num: 1, title: 'Find the public repository',
        description: 'A contributor reads the code and the LICENSE file of a public repository',
        answer: NOWHERE,
        reason: 'Reading changes nothing.'
    },
    F2: {
        num: 2, title: 'Fork it',
        description: 'The contributor makes their own copy under their own account',
        answer: FORK,
        reason: 'The new copy is created in the contributor’s account; the original is untouched.'
    },
    F3: {
        num: 3, title: 'Change and test the fork',
        description: 'The contributor edits the copy and runs the tests',
        answer: FORK,
        reason: 'All edits happen in the copy.'
    },
    F4: {
        num: 4, title: 'Open a pull request',
        description: 'The contributor proposes the changes to the owner',
        answer: NOWHERE,
        reason: 'A pull request is a proposal; no code moves yet.'
    },
    F5: {
        num: 5, title: 'The owner reviews',
        description: 'The owner reads the differences, asks questions, and requests changes',
        answer: NOWHERE,
        reason: 'Review is discussion; the original code is unchanged.'
    },
    F6: {
        num: 6, title: 'The owner merges',
        description: 'The owner accepts the proposal and brings the changes in',
        answer: ORIGINAL,
        reason: 'Only the owner’s decision changes the original.'
    }
};

const INFO_NODES = {};

const TOTAL = Object.keys(STEPS).length;   // 6
const MASTERY = 5;
const QUESTION = 'At which step does the original project actually change?';

const DIAGRAM = `flowchart TD
    F1["1 · Find the public repository"]:::step
    F2["2 · Fork it"]:::step
    F3["3 · Change and test the fork"]:::step
    F4["4 · Open a pull request"]:::step
    F5["5 · The owner reviews"]:::step
    F6["6 · The owner merges"]:::step
    F1 --> F2
    F2 -->|copy| F3
    F3 -->|propose| F4
    F4 --> F5
    F5 -->|feedback| F3
    F5 -->|accept| F6
    classDef step fill:#dbeafe,stroke:#1e40af,stroke-width:2px,color:#111827,font-size:16px
    linkStyle default stroke:#475569,stroke-width:2px`;

// ---------------------------------------------------------------------------
// Sim-specific behavior (the engine below is shared by the Mermaid sims)
// ---------------------------------------------------------------------------
const RENDER_ID = 'forkflow';
const PROMPT = 'Where does code change at this step?';
const START_HINT = 'Click a step in the flowchart to begin. Each step gives you one attempt.';
const COMPLETION_NOTE = 'Look at the answers again: only step 6, when the owner merges, changes the original repository.';

function choicesFor(id) { return CHOICES.slice(); }

function isCorrect(id, choice) { return choice === STEPS[id].answer; }

function correctChoice(id) { return STEPS[id].answer; }

function feedbackText(step, ans) {
    return ans.correct
        ? `Correct. ${step.reason}`
        : `Not quite: ${step.answer}. ${step.reason}`;
}

function scoreText(done, score) {
    if (done < TOTAL) return `Answered: ${done} of ${TOTAL}`;
    return `Correct: ${score} of ${TOTAL}` +
        (score >= MASTERY ? ' — mastery reached' : ` — mastery is ${MASTERY} of ${TOTAL}; press Reset to try again`);
}

function nodeState(id) {
    const a = answers[id];
    return a ? (a.correct ? 'correct' : 'wrong') : null;
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
            flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis', nodeSpacing: 30, rankSpacing: 36, padding: 10 },
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
