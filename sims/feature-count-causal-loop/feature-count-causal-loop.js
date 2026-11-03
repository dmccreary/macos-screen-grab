// Feature Count Causal Loop Diagram - vis-network
// CANVAS_HEIGHT: 760
/*
 * Bloom: Analyze (trace, explain). The learner traces each reinforcing and
 * balancing loop through Feature Count and explains from the edge polarities
 * why the loop amplifies or limits feature growth.
 *
 * The diagram is read from feature-count-cld.json (the CLD JSON schema used by
 * the cld-viewer). Nodes are locked in place for learners. Add ?edit=true to
 * the URL to drag nodes and R/B markers, adjust edge curves, and export the
 * updated JSON to paste back into feature-count-cld.json.
 */

const DATA_FILE = 'feature-count-cld.json';
const EDIT = new URLSearchParams(window.location.search).get('edit') === 'true';
const DRAFT_KEY = 'feature-count-cld-draft';

const COLORS = {
    variable: { background: '#ffffff', border: '#1e40af', highlight: { background: '#dbeafe', border: '#1e3a8a' },
        hover: { background: '#eff6ff', border: '#1e3a8a' } },
    stock: { background: '#fde68a', border: '#b45309', highlight: { background: '#fcd34d', border: '#92400e' },
        hover: { background: '#fcd34d', border: '#92400e' } },
    positive: '#15803d',
    negative: '#b91c1c',
    reinforcing: '#b91c1c',
    balancing: '#15803d'
};
const DIM = 0.15;
const DEFAULT_CURVE = { type: 'curvedCW', roundness: 0.15 };
const EDGE_WIDTH = { weak: 1.5, moderate: 2.5, strong: 3.5 };

let cld = null;
let network = null;
let nodes = null;
let edges = null;
let activeLoop = null;
let selectedEdge = null;
const curves = {};   // edge id -> {type, roundness}; edited in edit mode

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function wrapText(text, maxLength) {
    const lines = [];
    let line = '';
    text.split(' ').forEach(word => {
        if (line && (line + ' ' + word).length > maxLength) {
            lines.push(line);
            line = word;
        } else {
            line = line ? line + ' ' + word : word;
        }
    });
    if (line) lines.push(line);
    return lines.join('\n');
}

// A DOM tooltip (not a string) so vis-network lets the text wrap.
function makeTooltip(text) {
    const div = document.createElement('div');
    div.style.cssText = 'max-width:260px;white-space:normal;line-height:1.4;font-size:13px;';
    div.textContent = text;
    return div;
}

function escapeHTML(s) {
    return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

function nodeLabel(id) {
    const n = cld.nodes.find(node => node.id === id);
    return n ? n.label : id;
}

function findEdge(source, target) {
    return cld.edges.find(e => e.source === source && e.target === target);
}

// Edges along a loop path, in traversal order.
function loopEdges(loop) {
    const result = [];
    for (let i = 0; i < loop.path.length - 1; i++) {
        const e = findEdge(loop.path[i], loop.path[i + 1]);
        if (e) result.push(e);
    }
    return result;
}

function smoothFor(curve) {
    if (curve.type === 'straight') return { enabled: false };
    return { enabled: true, type: curve.type, roundness: curve.roundness };
}

// ---------------------------------------------------------------------------
// Build the vis-network data
// ---------------------------------------------------------------------------
function buildNodes() {
    const list = cld.nodes.map(n => {
        const isStock = n.type === 'stock';
        return {
            id: n.id,
            label: wrapText(n.label, isStock ? 14 : 16),
            x: n.position.x,
            y: n.position.y,
            shape: 'box',
            margin: isStock ? 14 : 8,
            borderWidth: isStock ? 4 : 2,
            color: isStock ? COLORS.stock : COLORS.variable,
            font: { size: isStock ? 22 : 16, face: 'Arial', bold: isStock, color: '#1f2937' },
            title: makeTooltip(n.description)
        };
    });
    cld.loops.forEach(loop => {
        const color = COLORS[loop.type];
        list.push({
            id: 'loop_' + loop.id,
            label: loop.id,
            x: loop.position.x,
            y: loop.position.y,
            shape: 'ellipse',
            margin: 10,
            borderWidth: 2,
            color: { background: color, border: '#111827', highlight: { background: color, border: '#facc15' },
                hover: { background: color, border: '#111827' } },
            font: { size: 18, face: 'Arial', color: '#ffffff', bold: true },
            title: makeTooltip(loop.label + '. ' + loop.description)
        });
    });
    return list;
}

function buildEdges() {
    return cld.edges.map(e => {
        const color = COLORS[e.polarity];
        const sign = e.polarity === 'positive' ? '+' : '−';
        curves[e.id] = Object.assign({}, DEFAULT_CURVE, e.curve || {});
        return {
            id: e.id,
            from: e.source,
            to: e.target,
            // Two bars mark a delay, as in standard CLD notation.
            label: e.delay && e.delay.present ? sign + ' ||' : sign,
            color: { color: color, highlight: color, hover: color },
            width: EDGE_WIDTH[e.strength] || 2.5,
            dashes: e.strength === 'weak',
            arrows: { to: { enabled: true, scaleFactor: 0.9 } },
            smooth: smoothFor(curves[e.id]),
            font: { size: 26, face: 'Arial', color: color, strokeWidth: 4, strokeColor: '#ffffff', bold: true },
            title: makeTooltip(nodeLabel(e.source) + ' → ' + nodeLabel(e.target) + ' (' + sign + '): ' + e.description)
        };
    });
}

// ---------------------------------------------------------------------------
// Loop highlighting
// ---------------------------------------------------------------------------
function setLoop(loopId) {
    activeLoop = loopId;
    const loop = loopId ? cld.loops.find(l => l.id === loopId) : null;
    const nodeIds = loop ? new Set(loop.path.concat(['loop_' + loop.id])) : null;
    const edgeIds = loop ? new Set(loopEdges(loop).map(e => e.id)) : null;

    nodes.update(nodes.getIds().map(id => ({ id: id, opacity: !nodeIds || nodeIds.has(id) ? 1 : DIM })));
    edges.update(cld.edges.map(e => {
        const on = !edgeIds || edgeIds.has(e.id);
        const color = COLORS[e.polarity];
        return {
            id: e.id,
            color: { color: color, highlight: color, hover: color, opacity: on ? 1 : DIM },
            font: { color: on ? color : 'rgba(100,116,139,0.25)', strokeWidth: on ? 4 : 0 }
        };
    }));

    document.querySelectorAll('.loop-btn').forEach(btn => {
        btn.classList.toggle('active', (btn.dataset.loop || null) === (loopId || null));
    });
    if (loop) showLoop(loop); else showOverview();
}

function buildLoopBar() {
    const bar = document.getElementById('loop-bar');
    const all = document.createElement('button');
    all.type = 'button';
    all.className = 'loop-btn active';
    all.textContent = 'All loops';
    all.addEventListener('click', () => setLoop(null));
    bar.appendChild(all);
    cld.loops.forEach(loop => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'loop-btn ' + loop.type;
        btn.dataset.loop = loop.id;
        btn.textContent = loop.label;
        btn.addEventListener('click', () => setLoop(activeLoop === loop.id ? null : loop.id));
        bar.appendChild(btn);
    });
}

// ---------------------------------------------------------------------------
// Details panel
// ---------------------------------------------------------------------------
const details = () => document.getElementById('details');

function showOverview() {
    const r = cld.loops.filter(l => l.type === 'reinforcing').length;
    const b = cld.loops.length - r;
    details().innerHTML =
        '<h3>' + escapeHTML(cld.metadata.title) + '</h3>' +
        '<p>' + escapeHTML(cld.metadata.description) + '</p>' +
        '<p class="hint">Choose a loop above to trace it, or click any box, arrow, or R/B marker. ' +
        r + ' reinforcing and ' + b + ' balancing loops pass through Feature Count.</p>';
}

// Push a rise in Feature Count around the loop and report what comes back.
function showLoop(loop) {
    const path = loopEdges(loop);
    let up = true;
    let negatives = 0;
    let trace = '<span class="up">' + escapeHTML(nodeLabel(loop.path[0])) + ' ↑</span>';
    path.forEach(e => {
        if (e.polarity === 'negative') { up = !up; negatives++; }
        const sign = e.polarity === 'positive' ? '+' : '−';
        trace += ' →(' + sign + ') <span class="' + (up ? 'up' : 'down') + '">' +
            escapeHTML(nodeLabel(e.target)) + (up ? ' ↑' : ' ↓') + '</span>';
    });
    const reinforcing = negatives % 2 === 0;
    details().innerHTML =
        '<h3>' + escapeHTML(loop.label) + '</h3>' +
        '<p>' + escapeHTML(loop.description) + '</p>' +
        '<p class="trace">' + trace + '</p>' +
        '<p><span class="verdict ' + (reinforcing ? 'reinforcing' : 'balancing') + '">' +
        negatives + ' negative link' + (negatives === 1 ? '' : 's') + ' (' + (reinforcing ? 'even' : 'odd') +
        '): a rise in Feature Count comes back as ' + (reinforcing ? 'a further rise, so the loop is reinforcing.' :
        'a fall, so the loop is balancing.') + '</span> ' + escapeHTML(loop.behavior_pattern) + '</p>';
}

function showNode(id) {
    const n = cld.nodes.find(node => node.id === id);
    const inLoops = cld.loops.filter(l => l.path.includes(id)).map(l => l.id);
    details().innerHTML =
        '<h3>' + escapeHTML(n.label) + (n.type === 'stock' ? ' (stock)' : '') + '</h3>' +
        '<p>' + escapeHTML(n.description) + '</p>' +
        (n.measurement ? '<p><span class="label">Measured as:</span> ' + escapeHTML(n.measurement) + '</p>' : '') +
        '<p><span class="label">Part of:</span> ' + (inLoops.length ? inLoops.join(', ') : 'no loop') + '</p>';
}

function showEdge(id) {
    const e = cld.edges.find(edge => edge.id === id);
    const positive = e.polarity === 'positive';
    details().innerHTML =
        '<h3>' + escapeHTML(nodeLabel(e.source)) + ' → ' + escapeHTML(nodeLabel(e.target)) + '</h3>' +
        '<p><span class="label">Polarity:</span> ' + (positive ? 'positive (+): when the first rises, the second rises.' :
            'negative (−): when the first rises, the second falls.') +
        ' <span class="label">Strength:</span> ' + escapeHTML(e.strength || 'not stated') + '</p>' +
        '<p>' + escapeHTML(e.description) + '</p>' +
        (e.delay && e.delay.present ? '<p><span class="label">Delay (||):</span> ' +
            escapeHTML(e.delay.duration) + '. ' + escapeHTML(e.delay.description || '') + '</p>' : '');
}

// ---------------------------------------------------------------------------
// Zoom: vertical wheel scrolls the page; pinch or sideways swipe zooms.
// ---------------------------------------------------------------------------
function attachCustomZoom(container) {
    const ZOOM_PER_TICK = 0.04;
    container.addEventListener('wheel', event => {
        const isPinch = event.ctrlKey;
        const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY) && event.deltaX !== 0;
        if (!isPinch && !horizontal) return;
        event.preventDefault();
        const delta = isPinch ? event.deltaY : event.deltaX;
        if (delta === 0) return;
        const magnitude = Math.min(Math.abs(delta), 60) / 60;
        const oldScale = network.getScale();
        const newScale = Math.max(0.1, Math.min(5, oldScale * (1 + (delta < 0 ? 1 : -1) * ZOOM_PER_TICK * magnitude)));
        const rect = container.getBoundingClientRect();
        const pointer = network.DOMtoCanvas({ x: event.clientX - rect.left, y: event.clientY - rect.top });
        const view = network.getViewPosition();
        network.moveTo({
            scale: newScale,
            position: {
                x: pointer.x - (pointer.x - view.x) * (oldScale / newScale),
                y: pointer.y - (pointer.y - view.y) * (oldScale / newScale)
            },
            animation: false
        });
    }, { passive: false });
}

// ---------------------------------------------------------------------------
// Edit mode: drag, curve tools, export
// ---------------------------------------------------------------------------
// Current layout as a full CLD JSON object. Positions come from
// network.getPositions(), because dragging does not update cld.nodes.
function exportCLD() {
    const live = network.getPositions();
    const out = JSON.parse(JSON.stringify(cld));
    out.nodes.forEach(n => {
        const p = live[n.id];
        if (p) n.position = { x: Math.round(p.x), y: Math.round(p.y) };
    });
    out.loops.forEach(l => {
        const p = live['loop_' + l.id];
        if (p) l.position = { x: Math.round(p.x), y: Math.round(p.y) };
    });
    out.edges.forEach(e => {
        const c = curves[e.id];
        if (c.type === DEFAULT_CURVE.type && c.roundness === DEFAULT_CURVE.roundness) delete e.curve;
        else e.curve = c.type === 'straight' ? { type: 'straight' } : { type: c.type, roundness: c.roundness };
    });
    out.metadata.updated_date = new Date().toISOString().slice(0, 10);
    return out;
}

function setStatus(text) {
    document.getElementById('edit-status').textContent = text;
}

function saveDraft() {
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(exportCLD())); } catch (err) { /* storage unavailable */ }
}

function loadDraft() {
    try {
        const raw = localStorage.getItem(DRAFT_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch (err) {
        return null;
    }
}

// Take only the layout (positions and curves) from a saved draft, so text
// edits made to the JSON file since the draft was saved still show.
function applyDraftLayout(data, draft) {
    const byId = list => Object.fromEntries((list || []).map(item => [item.id, item]));
    const dNodes = byId(draft.nodes);
    const dLoops = byId(draft.loops);
    const dEdges = byId(draft.edges);
    data.nodes.forEach(n => { if (dNodes[n.id]) n.position = dNodes[n.id].position; });
    data.loops.forEach(l => { if (dLoops[l.id]) l.position = dLoops[l.id].position; });
    data.edges.forEach(e => {
        if (!dEdges[e.id]) return;
        if (dEdges[e.id].curve) e.curve = dEdges[e.id].curve; else delete e.curve;
    });
}

function updateEdgeTools() {
    ['flip-btn', 'less-btn', 'more-btn', 'straight-btn'].forEach(id => {
        document.getElementById(id).disabled = !selectedEdge;
    });
    if (selectedEdge) {
        const c = curves[selectedEdge];
        setStatus(selectedEdge + ': ' + (c.type === 'straight' ? 'straight' : c.type + ' ' + c.roundness.toFixed(2)));
    }
}

function changeCurve(fn) {
    if (!selectedEdge) return;
    const c = curves[selectedEdge];
    fn(c);
    c.roundness = Math.round(Math.max(0, Math.min(1, c.roundness)) * 100) / 100;
    edges.update({ id: selectedEdge, smooth: smoothFor(c) });
    updateEdgeTools();
    saveDraft();
}

function wireEditMode() {
    document.body.classList.add('editing');
    document.getElementById('edit-bar').hidden = false;

    const showPosition = params => {
        if (!params.nodes.length) return;
        const id = params.nodes[0];
        const p = network.getPositions([id])[id];
        setStatus(id + ': (' + Math.round(p.x) + ', ' + Math.round(p.y) + ')');
    };
    network.on('dragging', showPosition);
    network.on('dragEnd', params => {
        if (!params.nodes.length) return;
        showPosition(params);
        saveDraft();
    });

    document.getElementById('copy-btn').addEventListener('click', async () => {
        const json = JSON.stringify(exportCLD(), null, 2);
        try {
            await navigator.clipboard.writeText(json);
            setStatus('Copied. Paste it into ' + DATA_FILE + '.');
        } catch (err) {
            details().innerHTML = '<p>Clipboard write failed. Copy the JSON below into ' + DATA_FILE + ':</p>' +
                '<textarea style="width:100%;height:110px;font-family:monospace;font-size:12px;">' + escapeHTML(json) + '</textarea>';
        }
    });
    document.getElementById('download-btn').addEventListener('click', () => {
        const blob = new Blob([JSON.stringify(exportCLD(), null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = DATA_FILE;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(a.href);
        setStatus('Downloaded ' + DATA_FILE + '.');
    });
    document.getElementById('reset-btn').addEventListener('click', () => {
        try { localStorage.removeItem(DRAFT_KEY); } catch (err) { /* storage unavailable */ }
        window.location.reload();
    });
    document.getElementById('flip-btn').addEventListener('click', () => changeCurve(c => {
        if (c.type === 'straight') { c.type = DEFAULT_CURVE.type; c.roundness = DEFAULT_CURVE.roundness; }
        else c.type = c.type === 'curvedCW' ? 'curvedCCW' : 'curvedCW';
    }));
    document.getElementById('less-btn').addEventListener('click', () => changeCurve(c => {
        if (c.type !== 'straight') c.roundness -= 0.05;
    }));
    document.getElementById('more-btn').addEventListener('click', () => changeCurve(c => {
        if (c.type === 'straight') { c.type = DEFAULT_CURVE.type; c.roundness = 0.05; } else c.roundness += 0.05;
    }));
    document.getElementById('straight-btn').addEventListener('click', () => changeCurve(c => { c.type = 'straight'; }));
}

// ---------------------------------------------------------------------------
// Start up
// ---------------------------------------------------------------------------
function start(data, restoredDraft) {
    cld = data;
    const container = document.getElementById('network');
    nodes = new vis.DataSet(buildNodes());
    edges = new vis.DataSet(buildEdges());
    network = new vis.Network(container, { nodes: nodes, edges: edges }, {
        physics: { enabled: false },
        layout: { improvedLayout: false },
        interaction: {
            dragNodes: EDIT,          // learners cannot move nodes; edit mode can
            dragView: true,
            zoomView: false,          // replaced by attachCustomZoom
            hover: true,
            selectConnectedEdges: false,
            tooltipDelay: 300
        },
        nodes: { shadow: { enabled: true, size: 4, x: 1, y: 1 } }
    });

    // Overlays go in after init: vis-network clears its container.
    const title = document.createElement('div');
    title.className = 'title-overlay';
    title.textContent = cld.metadata.title;
    container.appendChild(title);
    const legend = document.createElement('div');
    legend.className = 'legend-overlay';
    legend.innerHTML = '<span class="pos">+</span> same direction &nbsp; <span class="neg">−</span> opposite direction' +
        ' &nbsp; || delay &nbsp; dashed = weak';
    container.appendChild(legend);

    attachCustomZoom(container);
    buildLoopBar();
    showOverview();

    network.on('click', params => {
        selectedEdge = null;
        if (params.nodes.length) {
            const id = params.nodes[0];
            if (id.startsWith('loop_')) setLoop(id.slice(5));
            else showNode(id);
        } else if (params.edges.length) {
            selectedEdge = params.edges[0];
            showEdge(selectedEdge);
        } else if (!activeLoop) {
            showOverview();
        }
        if (EDIT) updateEdgeTools();
    });

    if (EDIT) {
        wireEditMode();
        setStatus(restoredDraft ? 'Restored the unsaved layout from this browser. Reset Layout discards it.' :
            'Drag boxes and R/B markers. Click an edge to change its curve.');
    }

    // Fit whenever the container size changes (iframe resize, window resize).
    let lastW = 0;
    let lastH = 0;
    new ResizeObserver(entries => {
        const r = entries[0].contentRect;
        if (r.width <= 0 || r.height <= 0 || (r.width === lastW && r.height === lastH)) return;
        lastW = r.width;
        lastH = r.height;
        network.setSize(r.width + 'px', r.height + 'px');
        fitBelowTitle();
    }).observe(container);
}

// Fit the diagram, then zoom out a little and shift it down so the top row of
// boxes clears the title overlay and the bottom row clears the legend.
function fitBelowTitle() {
    network.fit({ animation: false });
    const scale = network.getScale() * 0.9;
    const view = network.getViewPosition();
    network.moveTo({ scale: scale, position: { x: view.x, y: view.y - 12 / scale }, animation: false });
}

document.addEventListener('DOMContentLoaded', () => {
    fetch(DATA_FILE)
        .then(response => {
            if (!response.ok) throw new Error(DATA_FILE + ' returned ' + response.status);
            return response.json();
        })
        .then(data => {
            const draft = EDIT ? loadDraft() : null;
            if (draft) applyDraftLayout(data, draft);
            start(data, Boolean(draft));
        })
        .catch(err => {
            details().innerHTML = '<p>Could not load the diagram: ' + escapeHTML(err.message) +
                '. Open this page through a web server (for example mkdocs serve), not as a local file.</p>';
        });
});
