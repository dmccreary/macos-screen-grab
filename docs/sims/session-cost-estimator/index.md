---
title: "Session Cost Estimator"
description: "The learner will calculate the estimated API cost of each of the three ScreenGrab session stages from its token counts and the stated prices, to within $0.02."
status: built
library: p5.js
bloom_level: Apply
---

# Session Cost Estimator



<iframe src="main.html" width="100%" height="696px" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## How to Use This MicroSim

- **Challenge first:** the sim opens on stage 1 with its token counts. Type the total estimated cost and press **Check** (or Enter). Answers within $0.02 count, and you get two attempts per stage. Mastery is 3 of 3.
- **Read the bars:** each stage has a *tokens* bar and a *cost* bar, split by output, other new tokens, and cache reads. The cost bar appears once you answer.
- **Then explore:** after stage 3 the three price sliders unlock, and all three stage totals update together. Press **Restart stages** to try the challenge again.

The prices are the book's assumptions. Check current vendor pricing before using these numbers for a real budget.

## Lesson Plan

**Grade level:** Undergraduate. **Time:** 15 minutes.

1. **Predict (2 min).** Point at the stage 1 tokens bar, where cache reads are 88% of the tokens. Ask learners what share of the cost they expect cache reads to be.
2. **Challenge (7 min).** Learners compute the three totals. Remind them that "new tokens" includes output, so they must subtract output first.
3. **Explore (4 min).** Learners move the output price, then the cache read price, and compare how far each moves the totals.
4. **Discuss (2 min).** Compare each tokens bar with its cost bar. Why is the token count a poor guide to cost?

**Misconceptions to watch for:** the "new tokens" figure excludes output; cache reads, being most of the tokens, must be most of the cost; all tokens in a session are priced the same.

## Specification

The full specification below is extracted from
[Chapter 11: Measuring an AI Session: Time and Cost](../../chapters/11-measuring-ai-session/index.md).

```text
Type: microsim
**sim-id:** session-cost-estimator<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/token-efficiency/tree/main/docs/sims/openai-token-usage-anatomy<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the estimated API cost of each of the three ScreenGrab session stages from its token counts and the stated prices, to within $0.02.

**Prerequisites:** output tokens, other new tokens, cache read tokens, token pricing, API cost estimate (all defined in the chapter above this block).

**Evidence of Mastery:** For each of the three stages, the learner types the total estimated cost before the sim shows its value. An answer is correct when it is within $0.02 of the model value. Mastery is 3 of 3 correct. Changing the prices in free exploration is exploration, not evidence.

**Misconceptions:** (1) The "new tokens" figure excludes output. (2) Cache reads, being most of the tokens, must be most of the cost. (3) All tokens in a session are priced the same.

**Instructional Rationale:** Apply-level calculation needs practice with a check, so the learner commits a number before the result is shown. The what-if exploration afterward lets the learner see how sensitive the total is to each price.

**Content:**

Token counts per stage (from the chapter section "API Cost Estimate"):

| # | Stage | New tokens including output | Output tokens | Cache reads |
|---|---|---|---|---|
| 1 | Built and installed | 500,000 | 206,000 | 3,800,000 |
| 2 | First real grab | 573,000 | 238,000 | 6,300,000 |
| 3 | Whole session | 1,150,000 | 325,000 | 18,900,000 |

Default prices in dollars per million tokens: output 20.00, other new tokens 5.00, cache reads 0.20. Adjustable prices for free exploration:

| Price | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Output | 5.00 | 30.00 | 1.00 | 20.00 | dollars per million tokens |
| Other new tokens | 1.00 | 10.00 | 1.00 | 5.00 | dollars per million tokens |
| Cache reads | 0.05 | 1.00 | 0.05 | 0.20 | dollars per million tokens |

Challenge answers at the default prices:

| # | Output cost | Other new cost | Cache read cost | Total | Feedback when wrong |
|---|---|---|---|---|---|
| 1 | $4.12 | $1.47 | $0.76 | $6.35 | Other new = 500,000 - 206,000 = 294,000 tokens x $5 per million = $1.47. Add output $4.12 and reads $0.76. |
| 2 | $4.76 | $1.68 | $1.26 | $7.70 | Other new = 573,000 - 238,000 = 335,000 tokens x $5 per million = $1.675, shown as $1.68. Add output $4.76 and reads $1.26. |
| 3 | $6.50 | $4.13 | $3.78 | $14.41 | Other new = 1,150,000 - 325,000 = 825,000 tokens x $5 per million = $4.125, shown as $4.13. Add output $6.50 and reads $3.78. |

**Provenance:** Token counts and default prices are from docs/course-description.md and the chapter section "API Cost Estimate". The sim must label the prices "book assumptions: check current vendor pricing". Costs are computed from the Rules.

**Rules:** Other new tokens = new tokens including output - output tokens. Cost per type = tokens x price / 1,000,000. Total = sum of the three. Amounts are rounded half up to the nearest cent for display, and the total is computed before rounding (stage 2 is 7.695, shown $7.70; stage 3 is 14.405, shown $14.41).

**Learner Activity:**

1. The learner reads the token counts for stage 1 and types the total estimated cost.
2. The learner presses Check. The sim shows the three component costs and the total beside the learner's answer.
3. The learner repeats for stages 2 and 3 in order.
4. After stage 3, free exploration unlocks. The learner changes any of the three prices and all three stage totals update at once.
5. The learner should notice that changing the output price moves the total more than changing the cache read price, even though cache reads are far more numerous.

**Feedback:** Three stages, fixed order, two attempts each. Correct: "Correct: about $X." Incorrect: the "Feedback when wrong" text for that stage. After the second wrong attempt the model total and worked calculation are shown and the stage counts as missed. A running count "Stages correct: n of 3" is shown.

**Starting State:** Stage 1 is shown with the token counts and an empty answer box. The question on screen is "What would this stage have cost at API prices?"

**Chapter Anchors:** The chapter states about $6.35 for built and installed (reported as about $6), about $7.70 for the first real grab (reported as about $8), and about $14.41 for the whole session (reported as about $14), using $20, $5, and $0.20 per million.
```

## Related Resources

- [Chapter 11: Measuring an AI Session: Time and Cost](../../chapters/11-measuring-ai-session/index.md)
