/*
// CANVAS_HEIGHT: 800
 * Software Vocabulary Concept Map (vis-network MicroSim)
 * Bloom: Understand (classify). The learner explores an eight-node concept map,
 * then classifies six described examples under one of six terms.
 * Mastery: at least 5 of 6 correct on the first attempt through the quiz.
 */

// ---------------------------------------------------------------------------
// Content (from the specification)
// ---------------------------------------------------------------------------
const TERM = { fill: '#dbeafe', border: '#1e40af' };
const BLOAT = { fill: '#fee2e2', border: '#b91c1c' };
const UTILITY = { fill: '#dcfce7', border: '#15803d' };
const HIGHLIGHT = { fill: '#fde68a', border: '#b45309' };

// Fixed positions keep the map stable. No edge is perfectly horizontal
// (vis-network may skip a label on a perfectly horizontal edge at first draw).
const NODES = [
    { id: 'software', label: 'Software', x: -345, y: -185, colors: TERM,
      definition: 'A set of instructions that tells a computer what to do.' },
    { id: 'product', label: 'Software Product', x: -90, y: -115, colors: TERM,
      definition: 'Software packaged with an installer, documentation, a license, a price, updates, and support.' },
    { id: 'version', label: 'Software Version', x: -330, y: 5, colors: TERM,
      definition: 'A numbered snapshot of a product at one point in time.' },
    { id: 'cycle', label: 'Software Release Cycle', x: -150, y: 145, colors: TERM,
      definition: 'The schedule on which a vendor publishes new versions.' },
    { id: 'feature', label: 'Software Feature', x: 150, y: -150, colors: TERM,
      definition: 'One distinct capability of a product that serves a purpose a user can name.' },
    { id: 'featureset', label: 'Feature Set', x: 150, y: 20, colors: TERM,
      definition: 'The complete collection of features a product offers.' },
    { id: 'bloat', label: 'Software Bloat', x: 385, y: -75, colors: BLOAT,
      definition: 'Growth of a feature set beyond what most users need or use.' },
    { id: 'utility', label: 'Single-Purpose Utility', x: 235, y: 150, colors: UTILITY,
      definition: 'A small tool built to do one job and little else.' }
];

const EDGES = [
    { from: 'product', label: 'packages', to: 'software' },
    { from: 'feature', label: 'is one part of', to: 'featureset' },
    { from: 'featureset', label: 'belongs to', to: 'product' },
    { from: 'version', label: 'is a snapshot of', to: 'product' },
    { from: 'cycle', label: 'schedules', to: 'version' },
    { from: 'bloat', label: 'is what an oversized', to: 'featureset' },
    { from: 'utility', label: 'keeps a small', to: 'featureset' }
];

// Answer bank: the six terms, in the order the spec lists them.
const BANK = [
    { term: 'software', node: 'software' },
    { term: 'software product', node: 'product' },
    { term: 'software feature', node: 'feature' },
    { term: 'feature set', node: 'featureset' },
    { term: 'software version', node: 'version' },
    { term: 'software release cycle', node: 'cycle' }
];

// Six items, fixed order. Items 4 and 6 are illustrative (spec Provenance).
const ITEMS = [
    { description: 'The Swift source files that make up a screen grab app', correct: 'software',
      why: 'They are instructions for the computer, with no license, price, or support around them.' },
    { description: 'The app, its installer, its license for three computers, and its update service sold under one name',
      correct: 'software product',
      why: 'Software becomes a product when it is packaged with the means to obtain and keep using it.' },
    { description: 'Grabbing a region of the screen and copying it to the clipboard', correct: 'software feature',
      why: 'It is one capability a user can name.' },
    { description: 'All 40 commands in a hypothetical editor’s menus, taken together', correct: 'feature set',
      why: 'It is the complete collection of capabilities, not a single one.', illustrative: true },
    { description: 'Release 4.2 as published in March', correct: 'software version',
      why: 'It is a numbered snapshot of the product at one moment.' },
    { description: 'A new paid release published every fall', correct: 'software release cycle',
      why: 'It describes the schedule on which versions appear, not any one version.', illustrative: true }
];

const MASTERY = 5;
const PROMPT = 'Click a node to see what it means, then test yourself.';

// ---------------------------------------------------------------------------
// Environment helpers (vis-network guide)
// ---------------------------------------------------------------------------
function isInIframe() {
    try { return window.self !== window.top; } catch (e) { return true; }
}

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
let network = null;
let nodesDS = null;
let selectedNode = null;
let highlighted = null;
const quiz = { active: false, index: 0, answers: [], attempt: 0, firstScore: null, finished: false };

function nodeById(id) { return NODES.find(n => n.id === id); }
function nodeForTerm(term) { return BANK.find(b => b.term === term).node; }

function visColor(c, width) {
    return {
        color: { background: c.fill, border: c.border,
                 highlight: { background: c.fill, border: '#111827' },
                 hover: { background: c.fill, border: '#111827' } },
        borderWidth: width || 2
    };
}

// ---------------------------------------------------------------------------
// Network
// ---------------------------------------------------------------------------
function buildNetwork() {
    nodesDS = new vis.DataSet(NODES.map(n => Object.assign({
        id: n.id, label: n.label, x: n.x, y: n.y,
        title: undefined
    }, visColor(n.colors))));
    const edgesDS = new vis.DataSet(EDGES.map((e, i) => ({ id: 'e' + i, from: e.from, to: e.to, label: e.label })));

    const mouse = !isInIframe();
    const options = {
        physics: { enabled: false },
        layout: { improvedLayout: false },
        nodes: {
            shape: 'box',
            margin: { top: 8, bottom: 8, left: 10, right: 10 },
            widthConstraint: { maximum: 150 },
            font: { size: 17, face: 'Arial', color: '#111827' },
            borderWidthSelected: 4,
            fixed: { x: true, y: true }
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 0.8 } },
            color: { color: '#475569', highlight: '#111827', hover: '#111827' },
            width: 2,
            selectionWidth: 1.5,
            smooth: false,
            font: { size: 16, face: 'Arial', color: '#1f2937', background: 'rgba(255,255,255,0.92)',
                    strokeWidth: 0, align: 'horizontal' }
        },
        interaction: {
            hover: true,
            dragNodes: false,
            dragView: mouse,
            zoomView: mouse,
            navigationButtons: true,
            selectConnectedEdges: true,
            keyboard: { enabled: false }
        }
    };
    network = new vis.Network(document.getElementById('network'), { nodes: nodesDS, edges: edgesDS }, options);
    network.on('click', params => {
        if (params.nodes.length) showDefinition(params.nodes[0]);
        else showDefinition(null);
    });
    network.once('afterDrawing', fitMap);
    fitMap();
    window.addEventListener('resize', fitMap);
}

// Fit the whole map, never zooming in past 100% so text stays its real size.
// Nodes are placed so the bottom corners stay clear for the navigation buttons.
function fitMap() {
    if (!network) return;
    const box = document.getElementById('network').getBoundingClientRect();
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    NODES.forEach(n => {
        const b = network.getBoundingBox(n.id);
        minX = Math.min(minX, b.left); maxX = Math.max(maxX, b.right);
        minY = Math.min(minY, b.top); maxY = Math.max(maxY, b.bottom);
    });
    const padX = 16, padTop = 10, padBottom = 14;
    const scale = Math.min(1, (box.width - 2 * padX) / (maxX - minX), (box.height - padTop - padBottom) / (maxY - minY));
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2 + ((padBottom - padTop) / 2) / scale;
    network.moveTo({ position: { x: cx, y: cy }, scale, animation: false });
}

function setHighlight(id) {
    if (highlighted) {
        nodesDS.update(Object.assign({ id: highlighted }, visColor(nodeById(highlighted).colors)));
    }
    highlighted = id;
    if (id) nodesDS.update(Object.assign({ id }, visColor(HIGHLIGHT, 4)));
}

// ---------------------------------------------------------------------------
// Definition card
// ---------------------------------------------------------------------------
function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
}

function showDefinition(id) {
    selectedNode = id;
    const card = document.getElementById('definition');
    card.innerHTML = '';
    if (!id) {
        card.appendChild(el('h3', null, 'Definitions'));
        card.appendChild(el('p', 'hint', 'Click any node on the map to read its definition and see which nodes it connects to. Exploring is not scored.'));
        network.unselectAll();
        return;
    }
    const n = nodeById(id);
    card.appendChild(el('h3', null, n.label));
    card.appendChild(el('p', null, n.definition));
    const links = EDGES.filter(e => e.from === id || e.to === id);
    card.appendChild(el('p', 'hint', 'Connections:'));
    const ul = el('ul', 'links');
    links.forEach(e => ul.appendChild(el('li', null, `${nodeById(e.from).label} ${e.label} ${nodeById(e.to).label}`)));
    card.appendChild(ul);
    network.selectNodes([id], true);
}

// ---------------------------------------------------------------------------
// Matching quiz
// ---------------------------------------------------------------------------
function startQuiz() {
    quiz.active = true;
    quiz.finished = false;
    quiz.index = 0;
    quiz.answers = [];
    quiz.attempt += 1;
    setHighlight(null);
    renderQuiz();
}

function answer(term) {
    if (quiz.answers[quiz.index] !== undefined) return;   // one attempt per item
    const item = ITEMS[quiz.index];
    const ok = term === item.correct;
    quiz.answers[quiz.index] = { picked: term, correct: ok };
    if (!ok) setHighlight(nodeForTerm(item.correct));
    renderQuiz();
}

function nextItem() {
    setHighlight(null);
    if (quiz.index < ITEMS.length - 1) {
        quiz.index += 1;
    } else {
        quiz.finished = true;
        const score = quiz.answers.filter(a => a.correct).length;
        if (quiz.firstScore === null) quiz.firstScore = score;
    }
    renderQuiz();
}

function renderQuiz() {
    const card = document.getElementById('quiz');
    card.innerHTML = '';
    if (!quiz.active) {
        card.appendChild(el('h3', null, 'Matching quiz'));
        card.appendChild(el('p', null, 'Six short descriptions. For each one, choose the term it is an example of. You get one attempt per item.'));
        card.appendChild(el('p', 'hint', `Mastery is ${MASTERY} of 6 on your first attempt.`));
        const row = el('div', 'row');
        const b = el('button', 'btn', 'Start the quiz');
        b.type = 'button';
        b.addEventListener('click', startQuiz);
        row.appendChild(b);
        card.appendChild(row);
        return;
    }
    if (quiz.finished) {
        const score = quiz.answers.filter(a => a.correct).length;
        card.appendChild(el('h3', null, 'Matching quiz: done'));
        card.appendChild(el('p', 'score', `${score} of 6`));
        if (quiz.attempt === 1) {
            if (score >= MASTERY) card.appendChild(el('p', 'mastery', 'Mastery reached'));
            else card.appendChild(el('p', null, `Mastery is ${MASTERY} of 6. Reread the definitions of the terms you missed, then try again.`));
        } else {
            card.appendChild(el('p', 'hint', `Practice attempt. Mastery is judged on your first attempt (${quiz.firstScore} of 6` +
                (quiz.firstScore >= MASTERY ? ', mastery reached).' : ').')));
        }
        const missed = ITEMS.filter((it, i) => !quiz.answers[i].correct);
        if (missed.length) {
            card.appendChild(el('p', 'hint', 'Missed: ' + missed.map(it => `“${it.description}” is ${it.correct}`).join('; ') + '.'));
        }
        const row = el('div', 'row');
        const b = el('button', 'btn secondary', 'Try the quiz again');
        b.type = 'button';
        b.addEventListener('click', startQuiz);
        row.appendChild(b);
        card.appendChild(row);
        return;
    }
    const item = ITEMS[quiz.index];
    const ans = quiz.answers[quiz.index];
    const head = el('div', 'item-head');
    head.appendChild(el('span', 'item-num', `Item ${quiz.index + 1} of 6`));
    if (item.illustrative) head.appendChild(el('span', 'tag', 'illustrative'));
    card.appendChild(head);
    card.appendChild(el('p', 'desc', item.description));
    const grid = el('div', 'terms');
    BANK.forEach(b => {
        const btn = el('button', 'term', b.term);
        btn.type = 'button';
        if (ans) {
            btn.disabled = true;
            if (b.term === item.correct) btn.classList.add('is-correct');
            else if (b.term === ans.picked) btn.classList.add('picked-wrong');
        } else {
            btn.addEventListener('click', () => answer(b.term));
        }
        grid.appendChild(btn);
    });
    card.appendChild(grid);
    if (ans) {
        const fb = ans.correct
            ? el('div', 'feedback ok', `Correct. ${item.why}`)
            : el('div', 'feedback bad', `${item.why} The correct term, ${item.correct}, is highlighted on the map.`);
        fb.setAttribute('role', 'status');
        card.appendChild(fb);
        const row = el('div', 'row');
        const done = quiz.answers.filter(a => a).length;
        row.appendChild(el('span', 'hint', `Answered: ${done} of 6`));
        const b = el('button', 'btn', quiz.index < ITEMS.length - 1 ? 'Next item' : 'See my score');
        b.type = 'button';
        b.addEventListener('click', nextItem);
        row.appendChild(b);
        card.appendChild(row);
    }
}

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------
function init() {
    document.getElementById('prompt').textContent = PROMPT;
    buildNetwork();
    showDefinition(null);
    renderQuiz();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
