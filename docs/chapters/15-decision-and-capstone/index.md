---
title: "The Final Decision and the Capstone Project"
description: "How to decide whether to buy, subscribe to, or generate a tool using cost per feature used, cost comparisons, and a decision matrix, and how to complete the replacement-tool capstone."
date: "2026-11-01 20:08:42"
generated_by: claude skill chapter-content-generator
version: 1.11
---

# The Final Decision and the Capstone Project

## Summary

This final chapter puts the book's analysis to work on a tool you choose. It covers cost per feature used, cost comparisons, the cost of generating software, decision criteria, and the decision matrix, then guides you through the capstone: specify, generate, and test a replacement for a paid tool and publish the cost comparison. After this chapter, you will be able to decide whether to buy, subscribe to, or generate a tool, with verification and maintenance taken into account.

## Concepts Covered

This chapter covers the following 8 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Cost Per Feature Used | 1 |
| Cost Comparison | 3 |
| Cost Of Generating Software | 5 |
| Decision Criteria | 4 |
| Decision Matrix | 3 |
| Sharing A Personal Tool | 2 |
| Replacement Tool Capstone | 2 |
| Published Cost Comparison | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Feature Usage and the 95/5 Rule](../02-feature-usage/index.md)
- [Chapter 3: Licenses, Subscriptions, and Vendor Incentives](../03-licenses-subscriptions/index.md)
- [Chapter 4: Total Cost of Ownership](../04-total-cost-of-ownership/index.md)
- [Chapter 6: Build or Buy and the Rise of Personal Software](../06-build-or-buy/index.md)
- [Chapter 9: Generating, Building, and Installing the Code](../09-generating-building-installing/index.md)
- [Chapter 11: Measuring an AI Session: Time and Cost](../11-measuring-ai-session/index.md)
- [Chapter 12: Software Testing: Automated and Manual](../12-software-testing/index.md)
- [Chapter 13: Bugs, Evidence, and Verification Plans](../13-bugs-evidence-verification/index.md)
- [Chapter 14: Maintenance and Open Source Sharing](../14-maintenance-open-source/index.md)

---

!!! mascot-welcome "Your Turn to Pick the Shell"
    ![Pinch waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    You have the whole toolkit now: the 95/5 rule, token arithmetic, tests, evidence, and licenses. In this chapter you use it on a tool you pay for, and decide with numbers whether to keep paying. Grab only what you need!

The book has followed one case. A utility that cost $9 grew into a $30 per computer per year subscription, and a custom replacement was generated for about $6 to build and about $14 for the whole session. This chapter turns that story into a method you can run on your own tools, and ends with a project that makes you run it.

## Cost per Feature Used

**Cost per feature used** is what you pay, in a given period, divided by the number of features you actually use. It exposes bloat in a way the sticker price hides. A $90 yearly fee sounds modest, but it is a different number once you divide by what you get.

#### Worked example: ScreenGrab's two features

The author used two features: grab a region, and grab a region after a delay. The subscription costs $90 a year across three computers, so the cost per feature used is \( 90 / 2 \) = $45 per feature per year, or \( 450 / 2 \) = $225 per feature over five years. The generated tool costs about $14 once, or \( 14 / 2 \) = $7 per feature. Cost per feature used is a rough yardstick and ignores maintenance, but it names the question: what am I paying for that I never touch?

## Cost Comparisons

A **cost comparison** puts two or more options on the same footing: the same time horizon, the same number of computers, and the same list of what is and is not counted. The common mistakes are comparing a one-time price with an annual one, and leaving out the costs that are hardest to count. Chapter 4 showed the subscription side. The next section builds the generated side. Two more rules keep a comparison fair: state the date you checked each price, because subscription prices change, and show the comparison at more than one horizon, because a generated tool's up-front cost is paid once while a subscription's cost keeps growing. At one year the subscription is $90 and the generated tool's build is $14; at five years the subscription is $450.

## The Cost of Generating Software

The **cost of generating software** is everything it takes to get a working, trusted, kept-alive tool from an AI agent, not only the token bill. It has four parts, and three of them are not on the usage report.

- **Build tokens:** about $6 for ScreenGrab's first install, and about $14 for the whole session (Chapter 11).
- **Your time:** the active minutes you spend directing the agent, about 70 for the session.
- **Verification:** the hand checks that no agent can do for you (Chapters 12 and 13).
- **Maintenance:** operating system and toolchain upkeep, year after year (Chapter 14).

The break-even depends mostly on the last two, and the next table shows how. It models five years with a three-computer subscription of \( 3 \times 30 \times 5 \) = $450. The generated option costs the $14 build plus five years of maintenance, where each year costs your hours times your time value, plus $14 per agent session. The scenarios below are illustrative.

| Scenario | Maintenance hours a year | Time value per hour | Agent sessions a year | Five-year cost |
|---|---|---|---|---|
| Subscribe | not applicable | not applicable | not applicable | $450 |
| Generate, hobbyist | 2 | $0 | 1 | $84 |
| Generate, light upkeep | 1 | $50 | 1 | $334 |
| Generate, Chapter 14's estimate | 4 | $50 | 2 | $1,154 |

The three generated rows give three different answers. The result is not that generating always wins or always loses. It is that the answer depends on how much upkeep the tool needs and what your time is worth, and ScreenGrab's design choices (no dependencies, isolated platform code) push toward the light end. At $50 an hour with one session a year, generating stays cheaper only while upkeep is below about 1.5 hours a year.

!!! mascot-warning "Don't Price Your Time at Zero by Accident"
    ![Pinch warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Leaving your own hours out makes generating look free. Decide on a time value, even a low one, and put the hours in the table. If the answer only works at zero, say so in your report.

Check your arithmetic with the calculator before moving on.

#### Diagram: Subscribe or Generate Cost Calculator

<details markdown="1">
<summary>Subscribe or Generate Cost Calculator</summary>
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
</details>

## Decision Criteria

**Decision criteria** are the factors you use to choose, written down before you compare options so that the numbers do not pick for you. Cost is only one. For a buy, subscribe, or generate choice, these are the criteria this book supports:

- **Cost over your horizon:** the cost comparison above, with its assumptions stated.
- **Fit:** how much of the product you actually use (the 95/5 rule).
- **Verification effort:** how much checking you must do yourself.
- **Maintenance load:** the upkeep you will carry.
- **Risk if it fails:** what breaks, or what data is lost, when the tool is wrong.

Add a sixth when it applies: **Continuity**, meaning what happens if the vendor changes the price or the tool is discontinued. Write the criteria and their importance before you look at prices, because it is easy to rationalize a choice afterward.

#### Worked example: ScreenGrab against the criteria

Cost over five years favors generating in the light-upkeep case. Fit favors generating strongly, since two features are used. Verification effort favors subscribing, because a vendor tests its product and ScreenGrab still has acceptance tests nobody has run. Maintenance favors subscribing. Risk is low for both, since a failed screen grab loses nothing. The criteria point both ways, which is why a decision matrix is worth building.

## The Decision Matrix

A **decision matrix** scores each option on each criterion, multiplies by the importance weight of that criterion, and adds the results. The highest total wins. It does not replace judgment. It forces you to write your weights down and shows how much the answer depends on them.

#### Worked example: a five-criterion matrix

Scores run from 1 (poor) to 5 (good), and weights from 1 (minor) to 5 (critical). The scores below are one person's illustrative judgment.

| Criterion | Weight | Subscribe score | Generate score |
|---|---|---|---|
| Cost over five years | 5 | 2 | 5 |
| Fit to what I use | 4 | 2 | 5 |
| Verification effort | 3 | 5 | 2 |
| Maintenance load | 3 | 5 | 2 |
| Risk if it fails | 2 | 4 | 3 |
| **Weighted total (maximum 85)** | | **56** | **63** |

Subscribe: \( 5 \times 2 + 4 \times 2 + 3 \times 5 + 3 \times 5 + 2 \times 4 = 56 \). Generate: \( 5 \times 5 + 4 \times 5 + 3 \times 2 + 3 \times 2 + 2 \times 3 = 63 \). Generating leads by 7 points. A margin that small deserves a robustness check, which is what the sim below does.

#### Diagram: Weighted Decision Matrix Explorer

<details markdown="1">
<summary>Weighted Decision Matrix Explorer</summary>
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
</details>

## Sharing a Personal Tool

**Sharing a personal tool** means preparing it so that strangers can use it safely: a license, a README, honest statements about verification status, and a clear note about support. Chapter 14 covered the mechanics. The decision question is whether sharing is worth the effort. A shared tool needs, at a minimum, a license, a README that gives the verification status honestly, and a statement of what support you offer. Sharing turns your maintenance into a community's, and it gives you a way to find bugs on machines you do not own. It also creates the duty of stewardship, so decide in advance how much support you will promise.

## The Replacement Tool Capstone

The **replacement tool capstone** is the course project: pick a paid tool you use, build your own minimal replacement, test it, and publish what it cost. You do the same work that this book followed, in your own domain. The steps are:

1. **Choose a paid tool** whose price bothers you, and record what you pay today.
2. **Log the features you use** for a week, and list them. Expect the 95/5 rule.
3. **Write a minimal specification** with an explicit list of what is left out (Chapter 7).
4. **Design within platform limits** (Chapter 8), then **generate, build, and install** (Chapter 9).
5. **Measure the session:** wall-clock time, active time, tokens by type, and an estimated cost (Chapter 11).
6. **Test and verify:** automated tests where a program can check, and a written verification plan for what you must check by hand (Chapters 12 and 13).
7. **Decide:** run the cost comparison and decision matrix above, including maintenance (Chapter 14).
8. **Publish** the result, as the next section describes.

!!! mascot-tip "Pick a Small Tool First"
    ![Pinch giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Choose a tool where you can name the features you use in one sentence and test them yourself without special hardware. A tool with two features is a good first capstone; a tool with twenty is a second project.

## The Published Cost Comparison

A **published cost comparison** is a public write-up of your capstone's costs and decision, in a form that a stranger can check. It makes the work useful to others and keeps you honest. It should include:

| Section | What it contains |
|---|---|
| The tool and its price | Product, plan, price, date checked, and where you checked it |
| Features used and left out | The list from your week-long log |
| Generated tool | Lines of code, token counts by type, estimated cost, time to first install, and the estimation assumptions |
| Verification status | A table that uses the four labels from Chapter 13 |
| Maintenance estimate | Hours and costs, labeled as an estimate |
| Comparison and decision | Multi-year cost, your decision matrix with weights, and the verdict |
| What is not counted | Your time, if you left it out, and anything else excluded |

!!! mascot-celebration "You Finished the Whole Book"
    ![Pinch celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now count what a tool costs per feature used, price a generated alternative honestly, verify it, decide with a weighted matrix, and publish the evidence. You came in knowing that software bloats, and you leave knowing what to do about it. Grab only what you need!

[See Annotated References](./references.md)
