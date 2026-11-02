---
title: "ScreenGrab First Install Size Breakdown"
description: "The learner will compare the four parts of the ScreenGrab first install by line count and share of the total, answering at least 3 of 4 comparison questions correctly."
status: scaffold
library: Chart.js
bloom_level: Analyze
---

# ScreenGrab First Install Size Breakdown



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 9: Generating, Building, and Installing the Code](../../chapters/09-generating-building-installing/index.md).

```text
Type: chart
**sim-id:** screengrab-first-install-size-breakdown<br/>
**Library:** Chart.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** compare<br/>
**Learning Objective:** The learner will compare the four parts of the ScreenGrab first install by line count and share of the total, answering at least 3 of 4 comparison questions correctly.

**Prerequisites:** lines of code, source code, installer script, README file, specification (all defined in this chapter or earlier chapters above this block).

**Evidence of Mastery:** After viewing the chart in both modes, the learner answers four comparison questions, each with a fixed answer. An answer is correct when it matches the "Correct answer" column in Content. Mastery is 3 of 4 correct. Switching modes and hovering are exploration, not evidence.

**Misconceptions:** (1) Most of the project is the app code. (2) Tests are a small add-on. (3) Specifications and documents are negligible in size.

**Instructional Rationale:** Analyzing means breaking a whole into parts and relating them. Comparing parts by both absolute count and share, and then answering questions that require relating two parts, shows whether the learner has absorbed the structure.

**Content:**

The chart shows four bars. Values are the rounded figures from the chapter, and the sim labels them "approximate, from the course description". The mode toggle switches between "Lines" and "Share of total (%)".

| Part | Lines | Share of total (%) |
|---|---|---|
| App code (Swift, 19 files) | 2,000 | 38 |
| Tests (94 automated tests) | 1,370 | 26 |
| Install and build scripts | 500 | 10 |
| Specification, design, and README | 1,340 | 26 |

Shares are computed from the four rounded values, whose sum is 5,210, and rounded to the nearest whole percent. The chapter's stated total is "about 5,200 lines".

The four comparison questions, in order:

| # | Question | Choices | Correct answer | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | Which part is the largest? | App code; Tests; Install and build scripts; Specification, design, and README | App code | At 2,000 lines it exceeds every other part |
| 2 | About what share of the lines are tests? | 10%; 26%; 38%; 50% | 26% | 1,370 of 5,210 is about 26% |
| 3 | How do the test lines compare with the app code lines? | About one-third; About two-thirds; About equal; About double | About two-thirds | 1,370 divided by 2,000 is about 0.69 |
| 4 | Which is larger, the install and build scripts or the specification, design, and README? | Scripts; Specification, design, and README; Equal | Specification, design, and README | 1,340 lines is more than twice the 500 lines of scripts |

**Provenance:** The four values come from the course description section "How the first version was built". Shares and ratios are computed from them as stated in Rules.

**Rules:** Share = part lines divided by 5,210, times 100, rounded to the nearest whole percent. Ratio of tests to app code = 1,370 divided by 2,000. The toggle changes only the displayed axis and values, not the order of the bars. Each question has exactly one correct choice.

**Learner Activity:**

1. The learner views the chart in Lines mode and hovers each bar to see its value.
2. The learner switches to Share mode and sees the percentages.
3. The learner answers the four questions in order, choosing one answer each.
4. After the fourth question, the sim shows the score and the explanations for any missed. The learner should notice that the app code is the largest part but under 40% of the whole.

**Feedback:** Four questions, fixed order, one attempt each. Correct: "Correct" and the Why text. Incorrect: the correct answer and the Why text. A running count "Correct: n of 4" is shown. A final score of 3 or 4 shows "You can read the breakdown"; a lower score invites a second look at the chart.

**Starting State:** The chart in Lines mode with all four bars visible and the question "Where did the lines go?"

**Chapter Anchors:** The chapter states the four values 2,000, 1,370, 500 and 1,340, the total of about 5,200 lines, 19 files, and 94 tests, and says the app code is less than half of the total.
```

## Related Resources

- [Chapter 9: Generating, Building, and Installing the Code](../../chapters/09-generating-building-installing/index.md)
