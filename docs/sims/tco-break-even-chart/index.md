---
title: "Break-Even Chart for a Generated Tool"
description: "The learner will calculate the break-even time between a paid subscription and a generated tool, to within 0.1 year, for 3 values of the generated tool's yearly maintenance time."
status: scaffold
library: Chart.js
bloom_level: Apply
---

# Break-Even Chart for a Generated Tool



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 4: Total Cost of Ownership](../../chapters/04-total-cost-of-ownership/index.md).

```text
Type: chart
**sim-id:** tco-break-even-chart<br/>
**Library:** Chart.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the break-even time between a paid subscription and a generated tool, to within 0.1 year, for 3 values of the generated tool's yearly maintenance time.

**Prerequisites:** break-even point, multi-year cost, maintenance cost, learning cost, total cost of ownership (defined in the chapter sections above).

**Evidence of Mastery:** For 3 challenge cases, the learner types the break-even time in years before the sim draws the crossing point. An entry is correct when it is within +/- 0.1 of the Model value in Content. Mastery is 3 of 3 correct. Moving the maintenance control is exploration and is not scored.

**Misconceptions:** (1) A generated tool is always cheaper than a subscription. (2) Break-even depends only on the purchase price.

**Instructional Rationale:** Computing the crossing point for different maintenance assumptions shows the learner that the answer is sensitive to one input, which a single TCO figure hides.

**Content:**

Two cumulative cost lines are drawn from year 0 to year 10. All values are illustrative and the sim labels them illustrative.

| Line | Upfront cost K | Yearly cost S |
|---|---|---|
| Paid subscription | 40 | 110 |
| Generated tool | 54 | 40 x m |

The subscription's upfront cost is 1 hour of learning at $40. Its yearly cost is 3 x 30 = 90 in fees plus 0.5 x 40 = 20 in time. The generated tool's upfront cost is 14 in build cost plus 1 hour of setup at 40. Its yearly cost is m hours of maintenance at $40.

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Generated tool maintenance m | 0 | 4 | 0.5 | 1 | hours per year |

Challenge cases, in this order:

| # | m | Break-even (years) | Feedback when wrong |
|---|---|---|---|
| 1 | 1 | 0.2 | (54 - 40) / (110 - 40 x 1) = 14 / 70 = 0.2 years. |
| 2 | 2 | 0.5 | (54 - 40) / (110 - 40 x 2) = 14 / 30 = 0.47, which rounds to 0.5 years. |
| 3 | 2.5 | 1.4 | (54 - 40) / (110 - 40 x 2.5) = 14 / 10 = 1.4 years. |

**Provenance:** The $30 per computer fee, three computers and the $14 build cost come from the course description and the chapter. The hours and the $40 value of an hour are illustrative assumptions.

**Rules:** Break-even time = (K_generated - K_subscription) / (S_subscription - S_generated), rounded to 1 decimal place, when S_generated < S_subscription. When S_generated >= S_subscription, the lines never cross after year 0 and the sim shows "never cheaper" in place of a time. At m = 2.75 the yearly costs are equal; the control's step grid does not reach 2.75, so the "never cheaper" case is reached at m >= 3.

**Learner Activity:**

1. The learner moves the maintenance control and sees the generated tool's line change slope and the crossing point move.
2. The learner starts the challenges; for each, the sim sets m and hides the crossing point.
3. The learner types the break-even time and presses Check.
4. The learner returns to free exploration, sets m to 3 or more, and should notice that the generated line never falls below the subscription line.

**Feedback:** Three cases in fixed order, two attempts each. Correct: "Correct: <value> years." Incorrect on the first attempt: "Not quite. Divide the difference in upfront costs by the difference in yearly costs." After the second wrong attempt the Feedback when wrong text is shown and the case counts as missed. "Correct: n of 3" is displayed.

**Starting State:** The two lines are drawn with m = 1 and the crossing point hidden. The question on screen is "When does the generated tool become cheaper?"

**Chapter Anchors:** The chapter states a subscription cost of $90 per year in fees, a generated tool cost of $14, an hour valued at $40, and a break-even of about 0.2 years under the chapter's default assumptions.
```

## Related Resources

- [Chapter 4: Total Cost of Ownership](../../chapters/04-total-cost-of-ownership/index.md)
