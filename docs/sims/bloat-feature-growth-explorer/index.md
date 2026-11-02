---
title: "Feature Growth and Usage Explorer"
description: "The learner will calculate the percentage of an illustrative product's features that a given user never uses, for a given version, to within 1 percentage point."
status: scaffold
library: p5.js
bloom_level: Apply
---

# Feature Growth and Usage Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 1: Software Features and the Anatomy of Bloat](../../chapters/01-software-bloat/index.md).

```text
Type: microsim
**sim-id:** bloat-feature-growth-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the percentage of an illustrative product's features that a given user never uses, for a given version, to within 1 percentage point.

**Prerequisites:** software feature, feature set, software version, software release cycle (defined in the chapter sections above).

**Evidence of Mastery:** For 3 challenge cases, the learner enters the unused percentage as a whole number before the sim reveals it. An entry is correct when it is within +/- 1 of the Model value in Content. Mastery is 3 of 3 correct. Moving the version control and choosing a user type is exploration and is not scored.

**Misconceptions:** (1) A product that adds features gives every user more value. (2) The share of unused features stays the same as the product grows.

**Instructional Rationale:** Calculating before seeing the answer makes the learner apply the formula to new inputs. Free exploration afterward shows the share of unused features climbing with every version.

**Content:**

All values are illustrative and the sim labels them illustrative.

The number of features in version v is F(v) = 6 + 4 x (v - 1).

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Version v | 1 | 10 | 1 | 1 | version number |

There are three user types. Each has a count of features they want to use.

| User type | Features wanted |
|---|---|
| Author (grab and delayed grab only) | 2 |
| Casual user | 4 |
| Power user | 18 |

A user uses the smaller of the features wanted and F(v).

| # | User type | Version | F(v) | Features used | Model value: unused % | Feedback when wrong |
|---|---|---|---|---|---|---|
| 1 | Author | 10 | 42 | 2 | 95 | Unused = (42 - 2) / 42 = 0.952, which is 95%. |
| 2 | Casual user | 10 | 42 | 4 | 90 | Unused = (42 - 4) / 42 = 0.905, which is 90%. |
| 3 | Power user | 5 | 22 | 18 | 18 | Unused = (22 - 18) / 22 = 0.182, which is 18%. |

**Provenance:** Illustrative numbers invented for this chapter; no real product is measured. The Author row echoes the book's case in which the author needs two features.

**Rules:** Used(v) = min(wanted, F(v)). Unused percentage = 100 x (F(v) - Used(v)) / F(v), rounded to the nearest whole number. Rounding uses half up. When F(v) equals Used(v), unused is 0.

**Learner Activity:**

1. The learner moves the version control and chooses a user type, and sees the number of features, the number used, and the used and unused shares update.
2. The learner starts the challenges. For each, the sim shows the user type and version, and the learner enters the unused percentage.
3. The learner presses Check and sees the Model value next to their entry.
4. After the third challenge, the learner returns to free exploration and should notice that the Author's unused share rises with every version while the Power user's rises more slowly.

**Feedback:** Three challenges, fixed order, two attempts each. Correct: "Correct: <value>% of features unused." Incorrect on the first attempt: the Feedback when wrong text without the final number. After the second wrong attempt the Model value is revealed and the challenge counts as missed. A count "Correct: n of 3" is shown.

**Starting State:** Version 1, Author selected, showing 6 features, 2 used, 67% unused. The question on screen is "How much of this product do you use?"

**Chapter Anchors:** The chapter states that F(v) is 6 at version 1, adds 4 per version, and reaches 42 at version 10; that the author needs 2 features; and that the numbers are illustrative.
```

## Related Resources

- [Chapter 1: Software Features and the Anatomy of Bloat](../../chapters/01-software-bloat/index.md)
