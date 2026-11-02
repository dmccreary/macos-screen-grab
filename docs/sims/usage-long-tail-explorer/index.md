---
title: "Long Tail of Feature Usage Explorer"
description: "The learner will examine an illustrative 20-feature usage distribution and state how many features are used by at least a chosen share of users, correctly for 3 of 3 thresholds."
status: scaffold
library: Chart.js
bloom_level: Analyze
---

# Long Tail of Feature Usage Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 2: Feature Usage and the 95/5 Rule](../../chapters/02-feature-usage/index.md).

```text
Type: chart
**sim-id:** usage-long-tail-explorer<br/>
**Library:** Chart.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** examine<br/>
**Learning Objective:** The learner will examine an illustrative 20-feature usage distribution and state how many features are used by at least a chosen share of users, correctly for 3 of 3 thresholds.

**Prerequisites:** feature usage, power users, casual users, long tail of features (defined in the chapter sections above).

**Evidence of Mastery:** For 3 challenge thresholds, the learner enters how many of the 20 features are used by at least that share of users, before the sim highlights them. An entry is correct when it equals the Count column in Content. Mastery is 3 of 3 on the first attempt. Dragging the threshold freely and hovering bars is exploration and is not scored.

**Misconceptions:** (1) Most features are used by most users. (2) A feature used by few users is unimportant to the vendor's revenue.

**Instructional Rationale:** Counting features above a threshold makes the learner read the distribution rather than glance at it, and the threshold control lets them see how steeply the count drops.

**Content:**

All values are illustrative and the sim labels them illustrative. The chart shows the 20 features in this order, from most to least used, with the share of users in percent.

| Rank | Feature | Share of users (%) |
|---|---|---|
| 1 | Grab a region | 92 |
| 2 | Grab a window | 55 |
| 3 | Save to a file | 48 |
| 4 | Grab after a delay | 30 |
| 5 | Draw an arrow | 22 |
| 6 | Add text | 16 |
| 7 | Custom hotkeys | 12 |
| 8 | Blur a region | 11 |
| 9 | Scrolling capture | 9 |
| 10 | Record the screen | 8 |
| 11 | Extract text from an image | 6 |
| 12 | Upload to a cloud gallery | 5 |
| 13 | GIF export | 4 |
| 14 | Team library | 3 |
| 15 | Capture timeline | 3 |
| 16 | Comments | 2 |
| 17 | Image compare | 2 |
| 18 | Stamp library | 2 |
| 19 | Batch rename | 1 |
| 20 | Plugin interface | 1 |

The adjustable quantity is the threshold.

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Usage threshold | 1 | 100 | 1 | 50 | percent of users |

Challenges, in this order:

| # | Threshold (%) | Count | Why (shown as feedback) |
|---|---|---|---|
| 1 | 50 | 2 | Only grab a region (92) and grab a window (55) reach 50. |
| 2 | 20 | 5 | Adding save to a file (48), grab after a delay (30) and draw an arrow (22) gives 5. |
| 3 | 10 | 8 | Add text (16), custom hotkeys (12) and blur a region (11) bring the count to 8. |

**Provenance:** Illustrative numbers invented for this chapter, shared with the chapter's table; no real product is measured.

**Rules:** A feature is counted when its share is >= the threshold. The count is shown as "n of 20" and as the percentage n / 20, rounded to the nearest whole percent. At threshold 100 the count is 0. At threshold 1 the count is 20.

**Learner Activity:**

1. The learner sees the sorted bars and moves the threshold; bars at or above the threshold are marked as counted and the count updates.
2. The learner starts the challenges. For each, the sim shows the threshold and the learner enters a count.
3. The learner presses Check; the counted bars are marked and the Why text appears.
4. After challenge 3, the learner returns to free exploration and should notice that the count falls from 20 to 8 between thresholds 1 and 10, then from 8 to 2 between thresholds 10 and 50.

**Feedback:** Three challenges, fixed order, two attempts each. Correct: "Correct: n features." Incorrect on the first attempt: "Not quite. Count the bars that reach the threshold." After the second wrong attempt the correct count and the Why text are shown and the challenge counts as missed. "Correct: n of 3" is displayed.

**Starting State:** The 20 bars are shown with the threshold at 50 and a count of 2 of 20. The question on screen is "How many features do most users really use?"

**Chapter Anchors:** The chapter states that the data has 20 features, that only 2 are used by more than half of the users, that 8 are used by at least 10%, and that the bottom 12 are each used by fewer than 1 user in 10.
```

## Related Resources

- [Chapter 2: Feature Usage and the 95/5 Rule](../../chapters/02-feature-usage/index.md)
