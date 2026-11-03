---
title: "Resource Footprint Comparison"
description: "The learner will compare the resource footprint of an illustrative full-featured product and an illustrative single-purpose utility on three measures, correctly ranking which measure differs most between them."
status: built
library: Chart.js
bloom_level: Analyze
---

# Resource Footprint Comparison

Two illustrative programs are compared on three measures: install size, idle memory, and background helper processes. You rank the measures by how many times larger the full-featured product is before any numbers appear.

<iframe src="main.html" width="100%" height="716px" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## How to Use This MicroSim

- **Rank:** choose a different measure for 1st, 2nd and 3rd place, ordered by the ratio *full-featured value ÷ utility value*, largest first. Reveal stays disabled until all three places hold different measures.
- **Reveal:** press **Reveal** to commit. You get one attempt. The feedback names the correct order and, if you misplaced a measure, explains why its ratio is what it is.
- **Explore:** the grouped bars use a logarithmic axis, so the gap between a pair of bars shows the ratio. Hover a bar to read its value, the ratio and the reason.
- **Start over** clears the ranking so another learner can try.

## Lesson Plan

**Grade level:** Undergraduate. **Time:** 10 minutes.

1. **Predict (3 min).** Before anyone touches the sim, ask learners whether a program that is 80 times smaller on disk is also 80 times lighter in memory. Each learner then commits a ranking in the sim.
2. **Reveal and explore (4 min).** Learners press Reveal and hover each pair of bars. Ask them to state, in one sentence each, why the memory and helper ratios are so much smaller than the storage ratio.
3. **Discuss (3 min).** The largest ratio belongs to install size, the measure that costs the user least each day. Ask which measure a laptop user on battery would care about most, and why.

**Misconceptions to watch for:** a smaller program is smaller by the same factor on every measure; install size is the only footprint that matters; a log axis hides differences (point out that equal-looking gaps on a log axis mean equal ratios).

## Specification

The full specification below is extracted from
[Chapter 1: Software Features and the Anatomy of Bloat](../../chapters/01-software-bloat/index.md).

```text
Type: chart
**sim-id:** bloat-footprint-comparison<br/>
**Library:** Chart.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** compare<br/>
**Learning Objective:** The learner will compare the resource footprint of an illustrative full-featured product and an illustrative single-purpose utility on three measures, correctly ranking which measure differs most between them.

**Prerequisites:** resource footprint, install size, idle resource use, single-purpose utility (defined in the chapter section "Resource Footprint" above).

**Evidence of Mastery:** Before the values are revealed, the learner ranks the three measures from the largest to the smallest ratio between the two programs. The ranking is correct when it equals install size, idle memory, background helper processes. Mastery is a correct ranking in one attempt. Hovering bars after the reveal is exploration.

**Misconceptions:** (1) A smaller program is smaller by the same factor on every measure. (2) Install size is the only footprint that matters.

**Instructional Rationale:** Predicting a ranking before the reveal forces the learner to reason about why storage differs more than running cost, which is comparison rather than reading numbers off a chart.

**Content:**

All values are illustrative and the sim labels them illustrative.

| Measure | Unit | Full-featured product | Single-purpose utility | Ratio | Why the ratio is what it is (shown on hover) |
|---|---|---|---|---|---|
| Install size | MB | 1200 | 15 | 80 | Storage holds every feature, used or not. |
| Idle memory | MB | 450 | 30 | 15 | Both programs must keep something running to catch a hotkey, so the gap is smaller than for storage. |
| Background helper processes | count | 3 | 1 | 3 | Both need one helper for the hotkey. The full product adds an update checker and a sync agent. |

Ratio = full-featured value divided by single-purpose value.

**Provenance:** Illustrative numbers invented for this chapter. They are not measurements of any real product.

**Rules:** The ratio for each measure is the full-featured value divided by the utility value. Measures are ranked from the largest ratio to the smallest. Ties, if the values were changed, keep the table order.

**Learner Activity:**

1. The learner sees the three measure names with the values hidden and orders them from largest to smallest ratio.
2. The learner presses Reveal and sees the grouped bars and the ratios.
3. The learner hovers over a bar and reads the Why text for that measure.
4. The learner should notice that the largest ratio belongs to the measure that costs the user the least each day.

**Feedback:** One attempt at the ranking. Correct: "Correct: storage differs most, helpers least." Incorrect: the correct order is shown with the Why text for the measure the learner placed wrongly. The reveal always happens after the ranking.

**Starting State:** Three measure names are shown with no values. The question on screen is "Which measure differs most between the two programs?"

**Chapter Anchors:** The chapter states the six illustrative values 1,200 and 15 MB, 450 and 30 MB, 3 and 1 helpers, and the ratios 80, 15 and 3 times.
```

## Related Resources

- [Chapter 1: Software Features and the Anatomy of Bloat](../../chapters/01-software-bloat/index.md)
