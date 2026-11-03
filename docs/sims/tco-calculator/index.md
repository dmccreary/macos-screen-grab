---
title: "Total Cost of Ownership Calculator"
description: "The learner will calculate the total cost of ownership of a software path over a chosen number of years, to within $1, for 3 challenge cases."
status: built
library: p5.js
bloom_level: Apply
---

# Total Cost of Ownership Calculator



<iframe src="main.html" width="100%" height="678" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## How to Use This MicroSim

- **Explore:** pick a preset or move any of the seven sliders. Each cost item and the total update at once. The sim opens on the Generated tool preset, $254 over five years.
- **Challenge:** press **Start challenges**. The sim sets the inputs for each of three cases and hides the costs. Type the total cost of ownership and press **Check** (or Enter). You get two attempts per case, and an answer within $1 counts. Mastery is 3 of 3.

## Lesson Plan

**Grade level:** Undergraduate. **Time:** 15 minutes.

1. **Predict (2 min).** Before touching anything, ask learners which preset is cheapest over five years on three computers, and why.
2. **Explore (4 min).** Learners step through the three presets and read each cost item. The original one-time license costs $9; the subscription costs $590 even though it has no purchase price.
3. **Challenge (6 min).** Learners run the three cases. A miss after two attempts shows the itemized sum.
4. **Discuss (3 min).** Return to the Generated tool preset. Move maintenance time from 1 to 2 hours a year, then move the build cost from $14 to $28. Which one moved the total more, and why?

**Misconceptions to watch for:** the purchase price is the cost of owning a tool; a tool with no fee after purchase has no ownership cost; time spent on setup or upkeep is free.

## Specification

The full specification below is extracted from
[Chapter 4: Total Cost of Ownership](../../chapters/04-total-cost-of-ownership/index.md).

```text
Type: microsim
**sim-id:** tco-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/personal-finance/tree/main/docs/sims/total-cost-of-ownership-comparison<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the total cost of ownership of a software path over a chosen number of years, to within $1, for 3 challenge cases.

**Prerequisites:** purchase price, cost per computer, multi-year cost, software maintenance, maintenance cost, learning cost, opportunity cost, total cost of ownership (defined in the chapter sections above).

**Evidence of Mastery:** For 3 challenge cases, the learner types the TCO before the sim shows it. An entry is correct when it is within +/- 1 dollar of the Model value in Content. Mastery is 3 of 3 correct. Changing the inputs freely is exploration and is not scored.

**Misconceptions:** (1) The purchase price is the cost of owning a tool. (2) A tool that costs nothing after purchase has no ownership cost. (3) Time spent has no cost.

**Instructional Rationale:** Applying the formula to concrete cases makes the learner handle each cost item, and free exploration shows how the time estimates dominate the total.

**Content:**

TCO = P + n x f x y + m x r x y + L x r, with the meanings of P, n, f, y, m, r and L given in the chapter. All presets are illustrative and the sim labels them illustrative.

| Quantity | Symbol | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|---|
| Purchase or build cost | P | 0 | 100 | 1 | 14 | dollars |
| Computers | n | 1 | 10 | 1 | 3 | computers |
| Annual fee per computer | f | 0 | 100 | 5 | 0 | dollars per computer per year |
| Years | y | 1 | 10 | 1 | 5 | years |
| Maintenance time | m | 0 | 10 | 0.5 | 1 | hours per year |
| Value of an hour | r | 10 | 100 | 5 | 40 | dollars per hour |
| Learning or setup time | L | 0 | 40 | 0.5 | 1 | hours |

Three presets:

| Preset | P | n | f | y | m | r | L | TCO |
|---|---|---|---|---|---|---|---|---|
| Paid subscription | 0 | 3 | 30 | 5 | 0.5 | 40 | 1 | 590 |
| Original one-time license | 9 | 3 | 0 | 5 | 0 | 40 | 0 | 9 |
| Generated tool | 14 | 3 | 0 | 5 | 1 | 40 | 1 | 254 |

Challenge cases, in this order:

| # | P | n | f | y | m | r | L | Model TCO ($) | Feedback when wrong |
|---|---|---|---|---|---|---|---|---|
| 1 | 0 | 3 | 30 | 3 | 0.5 | 40 | 1 | 370 | Fees 3 x 30 x 3 = 270; maintenance 0.5 x 40 x 3 = 60; learning 1 x 40 = 40; total 370. |
| 2 | 14 | 3 | 0 | 10 | 1 | 40 | 1 | 454 | Maintenance 1 x 40 x 10 = 400; learning 40; build 14; total 454. |
| 3 | 0 | 1 | 30 | 5 | 0 | 60 | 2 | 270 | Fees 1 x 30 x 5 = 150; learning 2 x 60 = 120; total 270. |

**Provenance:** The preset values P = 14 and the fee of $30 per computer come from the course description. The hours and the value of an hour are illustrative assumptions invented for this chapter.

**Rules:** TCO = P + n x f x y + m x r x y + L x r, rounded to the nearest dollar. All inputs are non-negative. Inputs outside the ranges above are not allowed.

**Learner Activity:**

1. The learner chooses a preset and sees each cost item and the total.
2. The learner changes any input and sees the items and the total update.
3. The learner starts the challenges; for each, the sim sets the inputs and hides the total.
4. The learner types the TCO, presses Check, and sees the itemized feedback.
5. The learner returns to free exploration and should notice that, for the Generated tool preset, maintenance time moves the total more than the build cost.

**Feedback:** Three cases in fixed order, two attempts each. Correct: "Correct: $<value>." Incorrect on the first attempt: "Not quite. Add the four cost items." After the second wrong attempt the Feedback when wrong text is shown and the case counts as missed. "Correct: n of 3" is displayed.

**Starting State:** The Generated tool preset is shown with a TCO of $254. The question on screen is "What does this tool really cost over five years?"

**Chapter Anchors:** The chapter states presets with TCO values of $590, $9 and $254, a value of an hour of $40, a horizon of five years on three computers, and the formula TCO = P + n x f x y + m x r x y + L x r.
```

## Related Resources

- [Chapter 4: Total Cost of Ownership](../../chapters/04-total-cost-of-ownership/index.md)
