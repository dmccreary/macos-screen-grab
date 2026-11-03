---
title: "Subscribe or Generate Cost Calculator"
description: "The learner will calculate the five-year cost of a three-computer subscription and of three generated-tool scenarios, each to within $1."
status: built
library: p5.js
bloom_level: Apply
---

# Subscribe or Generate Cost Calculator



<iframe src="main.html" width="100%" height="752px" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## How to Use This MicroSim

- **Challenge first:** the sim opens on row 1, the subscription. Type each row's five-year cost and press **Check** (or Enter). Answers within $1 count, and you get two attempts per row. Mastery is 4 of 4.
- **Then explore:** after row 4 the eight sliders unlock. Two bars compare the subscription with the generated tool, split into build, upkeep time, and agent sessions. The sim states which option is cheaper and the break-even upkeep in hours per year. Press **Restart rows** to try the challenge again.

Upkeep hours, time value, and sessions per year are illustrative.

## Lesson Plan

**Grade level:** Undergraduate. **Time:** 20 minutes.

1. **Predict (3 min).** Ask learners whether generating a tool is always cheaper than a $30-a-year subscription on three computers.
2. **Challenge (8 min).** Learners compute the four rows. The hobbyist row values time at $0; the Chapter 14 row is the most expensive of the four.
3. **Explore (6 min).** At the default inputs, Generate is cheaper by $116 and the break-even upkeep is 1.46 hours a year. Learners raise the upkeep hours past 1.5 and watch the winner change, then change the years from 5 to 2.
4. **Discuss (3 min).** Which input decides the comparison most often: the token bill, the upkeep time, or the time horizon?

**Misconceptions to watch for:** generating is always cheaper than subscribing; the token bill is the whole cost of a generated tool; the time horizon does not change the comparison.

## Specification

The full specification below is extracted from
[Chapter 15: The Final Decision and the Capstone Project](../../chapters/15-decision-and-capstone/index.md).

```text
Type: microsim
**sim-id:** subscribe-or-generate-cost-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/token-efficiency/tree/main/docs/sims/cost-attribution-rollup<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the five-year cost of a three-computer subscription and of three generated-tool scenarios, each to within $1.

**Prerequisites:** cost comparison, cost of generating software, subscription fee, maintenance (all defined in the chapter above this block).

**Evidence of Mastery:** For the four challenge rows, the learner types the five-year cost before the sim shows its value. An answer is correct when it is within $1 of the model value. Mastery is 4 of 4 correct. Changing the inputs in free exploration is exploration, not evidence.

**Misconceptions:** (1) Generating is always cheaper than subscribing. (2) The token bill is the whole cost of a generated tool. (3) The time horizon does not affect the comparison.

**Instructional Rationale:** Apply-level calculation needs a check, so the learner commits a number before the model value is shown. Free exploration then lets the learner find the break-even point that the chapter's text states.

**Content:**

Model inputs and their ranges:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Computers | 1 | 10 | 1 | 3 | computers |
| Annual fee per computer | 0 | 100 | 5 | 30 | dollars |
| Years | 1 | 10 | 1 | 5 | years |
| Build cost | 0 | 50 | 1 | 14 | dollars |
| Maintenance hours per year | 0 | 10 | 0.5 | 1 | hours |
| Time value | 0 | 150 | 10 | 50 | dollars per hour |
| Agent sessions per year | 0 | 5 | 1 | 1 | sessions |
| Cost of one agent session | 0 | 50 | 1 | 14 | dollars |

Challenge rows, in order, with years = 5, computers = 3, fee = 30, and build cost = 14:

| # | Row | Maintenance hours per year | Time value | Agent sessions per year | Correct five-year cost | Feedback when wrong |
|---|---|---|---|---|---|---|
| 1 | Subscribe | not applicable | not applicable | not applicable | $450 | 3 computers x $30 x 5 years = $450. |
| 2 | Generate, hobbyist | 2 | $0 | 1 | $84 | $14 build + 5 x (2 x $0 + 1 x $14) = $14 + $70 = $84. |
| 3 | Generate, light upkeep | 1 | $50 | 1 | $334 | $14 + 5 x (1 x $50 + $14) = $14 + $320 = $334. |
| 4 | Generate, Chapter 14's estimate | 4 | $50 | 2 | $1,154 | $14 + 5 x (4 x $50 + 2 x $14) = $14 + 5 x $228 = $1,154. |

**Provenance:** The $30 fee, 3 computers, and $14 session cost are from docs/course-description.md. The maintenance hours, time value, and number of sessions are illustrative and the sim must label them "illustrative". Costs are computed from the Rules.

**Rules:** Subscribe cost = computers x fee x years. Generate cost = build cost + years x (maintenance hours x time value + sessions x session cost). The break-even maintenance hours per year, shown in exploration only when time value > 0, = ((subscribe cost - build cost) / years - sessions x session cost) / time value, shown to two decimals; at the default inputs it is 1.46 hours. When the generated cost is less than the subscribe cost, the sim shows "Generate is cheaper by $X"; when equal or greater, "Subscribe is cheaper by $X" (or "equal").

**Learner Activity:**

1. The learner reads row 1 and types its five-year cost, then presses Check.
2. The sim shows the model value and the worked calculation. The learner repeats for rows 2 to 4 in order.
3. After row 4, free exploration unlocks. The learner changes any input and both five-year costs and the cheaper option update at once.
4. The learner should notice that raising maintenance hours or time value moves the winner from Generate to Subscribe.

**Feedback:** Four rows, fixed order, two attempts each. Correct: "Correct: $X." Incorrect: the "Feedback when wrong" text for that row. After the second wrong attempt the model value and the worked calculation are shown and the row counts as missed. A running count "Rows correct: n of 4" is shown.

**Starting State:** Row 1 (Subscribe) is shown with an empty answer box. The question on screen is "What does the subscription cost over five years?"

**Chapter Anchors:** The chapter's table states $450 for the subscription and $84, $334, and $1,154 for the three generated scenarios, and says generating stays cheaper only while upkeep is below about 1.5 hours a year at $50 an hour with one session a year.
```

## Related Resources

- [Chapter 15: The Final Decision and the Capstone Project](../../chapters/15-decision-and-capstone/index.md)
