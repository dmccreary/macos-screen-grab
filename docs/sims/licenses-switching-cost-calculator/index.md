---
title: "Switching Cost Calculator"
description: "The learner will calculate the years needed to recover a switching cost from the annual fee saved, to within 0.1 years, for 3 challenge cases."
status: built
library: p5.js
bloom_level: Apply
---

# Switching Cost Calculator



<iframe src="main.html" width="100%" height="670px" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## How to Use This MicroSim

- **Explore:** move the five sliders. The conversion cost, learning cost, switching cost, and years to recover update at once. The strip at the bottom shows each year of saved fees as a block, with a red line at the switching cost.
- **Challenge:** press **Start challenges**. The sim sets the inputs for each of three cases and hides the results. Type the years to recover to one decimal place and press **Check** (or Enter). You get two attempts per case, and an answer within 0.1 years counts. Mastery is 3 of 3.

## Lesson Plan

**Grade level:** Undergraduate. **Time:** 15 minutes.

1. **Predict (2 min).** Ask learners whether switching to a free tool is free. Have them guess how long the default case takes to pay back.
2. **Explore (4 min).** Starting from the defaults (3.3 years), learners set the file count to 0, then to 1,000, and watch the payback strip.
3. **Challenge (6 min).** Learners run the three cases. A first miss shows the calculation up to the division; a second miss shows the full calculation and the model value.
4. **Discuss (3 min).** Double the file count from 200 to 400. Which cost doubled and which stayed the same? What does this say about tools that store your work in a proprietary format?

**Misconceptions to watch for:** switching is free if the new tool is free; the format your files are stored in has nothing to do with lock-in.

## Specification

The full specification below is extracted from
[Chapter 3: Licenses, Subscriptions, and Vendor Incentives](../../chapters/03-licenses-subscriptions/index.md).

```text
Type: microsim
**sim-id:** licenses-switching-cost-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the years needed to recover a switching cost from the annual fee saved, to within 0.1 years, for 3 challenge cases.

**Prerequisites:** switching costs, proprietary file format, vendor lock-in, annual fee (defined in the chapter sections above).

**Evidence of Mastery:** For 3 challenge cases, the learner types the years to recover the switching cost before the sim shows it. An entry is correct when it is within +/- 0.1 of the Model value in Content. Mastery is 3 of 3 correct. Changing the inputs freely is exploration and is not scored.

**Misconceptions:** (1) Switching is free if the new tool is free. (2) Files in an open format cost nothing to move, so lock-in is unrelated to file format.

**Instructional Rationale:** Computing the payback period from the learner's own inputs makes the learner apply the chapter's formula and see how conversion work stretches the recovery time.

**Content:**

All figures are illustrative and the sim labels them illustrative.

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Files in the vendor's format | 0 | 1000 | 50 | 200 | files |
| Minutes to convert one file | 1 | 10 | 1 | 1 | minutes |
| Value of the learner's time | 10 | 100 | 5 | 40 | dollars per hour |
| Hours to learn the replacement | 0 | 20 | 1 | 4 | hours |
| Annual fee saved | 10 | 300 | 10 | 90 | dollars per year |

Challenge cases, in this order:

| # | Files | Minutes per file | Time value ($/h) | Learning hours | Fee saved ($/yr) | Switching cost ($) | Model value: years |
|---|---|---|---|---|---|---|---|
| 1 | 200 | 1 | 40 | 4 | 90 | 293.33 | 3.3 |
| 2 | 600 | 2 | 30 | 2 | 90 | 660.00 | 7.3 |
| 3 | 0 | 1 | 40 | 4 | 90 | 160.00 | 1.8 |

Feedback text per case: case 1 "Conversion is 200 x 1 / 60 = 3.33 h = $133.33; learning is $160; total $293.33; 293.33 / 90 = 3.26, which rounds to 3.3." Case 2 "Conversion is 600 x 2 / 60 = 20 h = $600; learning is $60; total $660; 660 / 90 = 7.33, which rounds to 7.3." Case 3 "No files means no conversion cost; learning is $160; 160 / 90 = 1.78, which rounds to 1.8."

**Provenance:** The case 1 numbers are the chapter's worked example. Cases 2 and 3 are illustrative and invented for this chapter.

**Rules:** Conversion cost = files x minutes / 60 x time value. Learning cost = learning hours x time value. Switching cost = conversion cost + learning cost. Years to recover = switching cost / annual fee saved, rounded to 1 decimal place. The annual fee saved is always at least 10, so division by zero cannot occur.

**Learner Activity:**

1. The learner changes the five inputs and sees the conversion cost, learning cost, switching cost, and years to recover update.
2. The learner starts the challenges; for each, the sim sets the five inputs and hides the result.
3. The learner types the years to recover and presses Check.
4. The learner returns to free exploration and should notice that doubling the file count roughly doubles the conversion cost but not the learning cost.

**Feedback:** Three cases in fixed order, two attempts each. Correct: "Correct: n years." Incorrect on the first attempt: the matching feedback text without the final number. After the second wrong attempt, the full feedback text and the Model value are shown and the case counts as missed. "Correct: n of 3" is displayed.

**Starting State:** The defaults are shown (200 files, 1 minute, $40 per hour, 4 hours, $90 per year) with the result 3.3 years displayed. The question on screen is "How long until switching pays for itself?"

**Chapter Anchors:** The chapter's worked example states 200 files, 1 minute each, $40 per hour, 4 hours of learning, a switching cost of $293.33, $90 saved per year, and recovery in 3.26 years.
```

## Related Resources

- [Chapter 3: Licenses, Subscriptions, and Vendor Incentives](../../chapters/03-licenses-subscriptions/index.md)
