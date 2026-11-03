---
title: "Weighted Decision Matrix Explorer"
description: "The learner will judge how robust the winner of a weighted decision matrix is by finding which single-criterion weight changes flip the winner, answering both evaluation questions correctly."
status: built
library: p5.js
bloom_level: Evaluate
---

# Weighted Decision Matrix Explorer

<iframe src="main.html" width="100%" height="723px" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## How to Use This MicroSim

- **Read** the matrix at default weights. Each cell shows score × weight, and the totals row sums them. The bars and the Leader line show who is ahead and by how much.
- **Explore:** drag one **Weight** slider at a time (1 to 5). Changed rows turn amber. Watch whether the leader changes. Press **Reset Weights** to return all five weights to their defaults before trying the next criterion.
- **Answer:** type a whole number in the **Answer** box and press **Check**. Question 1 asks for the margin at default weights; question 2 asks how many criteria can flip the winner on their own. You get two attempts per question.
- The scores and weights are illustrative judgments.

## Lesson Plan

**Grade level:** Adult continuing education and professional development. **Time:** 15 minutes.

1. **Predict (2 min).** Ask learners whether a 7-point lead out of 85 feels safe, and which criterion they think matters most.
2. **Explore (7 min).** Learners test every weight from 1 to 5 for each criterion in turn, resetting between criteria. They keep a tally of the settings that flip the winner.
3. **Answer (3 min).** Learners answer both questions from their tally.
4. **Discuss (3 min).** Ask: "Cost and Fit carry the result. If you are unsure how much you value them, how confident should you be in Generate?" Connect this to the chapter's point that weights are judgments.

**Misconceptions to watch for:**

- The option with the higher total is obviously right. The result depends on weights that a different person could set differently.
- Every criterion can change the outcome equally. Only Cost and Fit can flip the winner alone; Verification, Maintenance, and Risk cannot.
- Weights are facts rather than judgments. Learners should be able to say why they chose each weight.
- Learners sometimes change two weights at once and count a flip. Question 2 asks about one weight at a time with the others at default.

## Specification

The full specification below is extracted from
[Chapter 15: The Final Decision and the Capstone Project](../../chapters/15-decision-and-capstone/index.md).

```text
Type: microsim
**sim-id:** weighted-decision-matrix-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/3d-printing-course/tree/main/docs/sims/concept-selection-matrix<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** judge<br/>
**Learning Objective:** The learner will judge how robust the winner of a weighted decision matrix is by finding which single-criterion weight changes flip the winner, answering both evaluation questions correctly.

**Prerequisites:** decision criteria, decision matrix, weight, score (all defined in the chapter above this block).

**Evidence of Mastery:** After exploring, the learner answers two questions: "By how many points does the leading option win at the default weights?" and "For how many of the five criteria does changing that weight alone (to any whole number from 1 to 5) flip the winner?" Answers are correct when they match the Content (7 points; 2 criteria). Dragging weights is exploration, not evidence.

**Misconceptions:** (1) The option with the higher total is obviously right. (2) Every criterion can change the outcome equally. (3) Weights are facts rather than judgments.

**Instructional Rationale:** Evaluating a choice means testing it against alternative judgments. Letting the learner change weights one at a time exposes which criteria carry the result, and the two questions ask the learner to state a judgment about robustness.

**Content:**

Criteria, fixed scores (1 to 5, higher is better), and default weights:

| Criterion | Default weight | Subscribe score | Generate score |
|---|---|---|---|
| Cost over five years | 5 | 2 | 5 |
| Fit to what I use | 4 | 2 | 5 |
| Verification effort | 3 | 5 | 2 |
| Maintenance load | 3 | 5 | 2 |
| Risk if it fails | 2 | 4 | 3 |

Each weight can be changed: min 1, max 5, step 1, unit points. Defaults sit on the grid. At the defaults, Subscribe totals 56, Generate totals 63, and the maximum possible total is 85.

Weight changes of a single criterion (all others at default). Totals are weight x score summed over the five criteria:

| Criterion changed | New weight | Subscribe total | Generate total | Winner |
|---|---|---|---|---|
| Cost over five years | 1 | 48 | 43 | Subscribe |
| Cost over five years | 2 | 50 | 48 | Subscribe |
| Cost over five years | 3 | 52 | 53 | Generate |
| Fit to what I use | 1 | 50 | 48 | Subscribe |
| Fit to what I use | 2 | 52 | 53 | Generate |
| Verification effort | 5 | 66 | 67 | Generate |
| Maintenance load | 5 | 66 | 67 | Generate |
| Risk if it fails | 5 | 68 | 72 | Generate |

The table lists the boundary cases. Every other single-weight change from 1 to 5 also leaves Generate ahead.

Question feedback:

| # | Question | Correct answer | Feedback when wrong |
|---|---|---|---|
| 1 | By how many points does the leading option win at default weights? | 7 | Generate 63 minus Subscribe 56 = 7. |
| 2 | For how many criteria does changing that weight alone flip the winner? | 2 | Only Cost (weight 1 or 2) and Fit (weight 1) flip the winner; changing Verification, Maintenance, or Risk alone does not. |

**Provenance:** Criteria and scores are the chapter's worked example and are illustrative; the sim must label them "illustrative judgments". Totals are computed from the Rules.

**Rules:** Total for an option = sum over criteria of weight x score. The leader is the option with the strictly higher total; equal totals show "tie". The single-criterion flip count is found by trying every whole weight from 1 to 5 for one criterion at a time with the others at default. Cost flips at weights 1 and 2, Fit flips at weight 1, and Verification, Maintenance, and Risk never flip. The sim computes every total from the formula.

**Learner Activity:**

1. The learner sees the matrix at default weights with both totals.
2. The learner changes any weight. Both totals, the margin, and the leader update at once.
3. The learner resets the weights with a Reset action, which returns all five to default.
4. When ready, the learner answers question 1 and question 2.
5. The learner should notice that most weights can change a lot without changing the winner, and a few cannot.

**Feedback:** Two questions, fixed order, two attempts each. Correct: "Correct." Incorrect: the "Feedback when wrong" text. After the second wrong attempt the answer is revealed. A count "Questions correct: n of 2" is shown.

**Starting State:** The matrix is shown at default weights. The question on screen is "Is Generate's lead solid, or does it depend on one weight?"

**Chapter Anchors:** The chapter states totals of 56 for Subscribe and 63 for Generate, a margin of 7 points, and a maximum of 85.
```

## Related Resources

- [Chapter 15: The Final Decision and the Capstone Project](../../chapters/15-decision-and-capstone/index.md)
