---
title: "Feature Usage and the 80% Rule"
description: "Compares a product's feature list with how it is actually used, covering telemetry, power and casual users, the long tail, the Pareto principle, cognitive load, and the forces that keep adding features."
generated_by: claude skill chapter-content-generator
date: "2026-11-01 20:08:43"
version: 1.11
---

# Feature Usage and the 80% Rule

## Summary

Having seen how products grow, this chapter asks who uses what they gain. It covers usage telemetry, power and casual users, the long tail of features, and the 80% rule of thumb alongside the Pareto Principle, along with the cognitive load that unused features impose. It closes with the roadmaps, competitive matching, and checklist marketing that keep features coming. After this chapter, you will be able to compare a product's feature list with how it is actually used.

## Concepts Covered

This chapter covers the following 14 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Feature Usage | 26 |
| Usage Telemetry | 1 |
| Power Users | 8 |
| Casual Users | 8 |
| Long Tail Of Features | 8 |
| Pareto Principle | 8 |
| 80% Rule Of Thumb | 7 |
| Unused Features | 2 |
| Cognitive Load | 31 |
| Interface Complexity | 2 |
| Feature Discoverability | 1 |
| Product Roadmap | 5 |
| Competitive Feature Matching | 2 |
| Feature Checklist Marketing | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Software Features and the Anatomy of Bloat](../01-software-bloat/index.md)

---

!!! mascot-welcome "Who actually clicks all those buttons?"
    ![Pinch waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Last chapter showed how a product piles up features. This one asks the question vendors rarely publish: who uses them? By the end you'll be able to hold a feature list up against real usage and see how much shell you are carrying for nothing. Grab only what you need!

## Measuring Feature Usage

**Feature usage** is the record of which features of a product people actually use, and how often. It is the missing half of any feature list. A list says what a product *can* do. Usage says what it *does* do for the people who own it. The two numbers are often far apart, and the distance between them is the practical meaning of bloat from Chapter 1.

Usage is measured as a share of users, a count of events, or both. "42% of users opened the blur tool at least once last month" is a share. "The blur tool was opened 8,000 times last month" is a count. They answer different questions, because a few enthusiasts can generate thousands of events while most users never touch the tool.

Vendors collect these numbers through **usage telemetry**: automated reports that a product sends back to its maker, recording which features were used and when. Telemetry is how a vendor learns that a feature nobody opens is still taking up a quarter of the menu. It also raises a privacy question, which is why a product should say plainly what it reports and let you turn it off.

A worked example uses the illustrative data below. A hypothetical screen grab utility has 20 features. The table gives the share of its users who used each feature at least once in a month. The numbers are invented for the chapter and labeled illustrative; they are not measurements of a real product.

| Rank | Feature | Share of users (illustrative) |
|---|---|---|
| 1 | Grab a region | 92% |
| 2 | Grab a window | 55% |
| 3 | Save to a file | 48% |
| 4 | Grab after a delay | 30% |
| 5 | Draw an arrow | 22% |
| 6 | Add text | 16% |
| 7 | Custom hotkeys | 12% |
| 8 | Blur a region | 11% |
| 9 | Scrolling capture | 9% |
| 10 | Record the screen | 8% |
| 11 | Extract text from an image | 6% |
| 12 | Upload to a cloud gallery | 5% |
| 13 | GIF export | 4% |
| 14 | Team library | 3% |
| 15 | Capture timeline | 3% |
| 16 | Comments | 2% |
| 17 | Image compare | 2% |
| 18 | Stamp library | 2% |
| 19 | Batch rename | 1% |
| 20 | Plugin interface | 1% |

Reading the table, only two features are used by more than half of the users. Eight features are used by at least 10%. The bottom twelve are each used by fewer than one user in ten.

Telemetry has limits worth knowing. It shows what people did, not why they did it. A feature with low use may be unneeded, or it may be hard to find, or it may matter intensely to a small group who would leave without it. A careful vendor treats low usage as a question to investigate, and a careful reader treats a vendor's claim of "unused" the same way.

!!! mascot-tip "Audit your own usage"
    ![Pinch giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Pick a tool you pay for and list every feature you used in the last month. Then count the features it advertises, and divide. That one ratio is your own bloat score.

## Power Users, Casual Users, and the Long Tail

Usage is not spread evenly across people. A **power user** is someone who uses a large share of a product's features, often and in combination, and who is usually willing to learn a complicated tool to get more from it. A **casual user** is someone who uses a small number of features, occasionally, and wants the tool to work without study. Both are real customers, and the same product serves both, though not equally well.

Power users matter to vendors out of proportion to their number. They write reviews, request features, and set the standard that reviewers use. A vendor listening mainly to its power users will keep adding depth, and each addition seems reasonable to the person who asked for it. Casual users rarely ask for anything; they simply stop opening the tool, or they keep paying and say nothing.

Here is the worked example, using the 20-feature data above. Three illustrative users open the same utility. The author uses 2 features, a grab and a delayed grab. A casual user uses 4, adding "save to a file" and "grab a window." A power user uses 18 of the 20. The author touches 10% of the feature set, the casual user 20%, and the power user 90%. The product is one thing; its usefulness depends on who is holding it.

The two groups differ in more ways than feature count, and the differences explain many design arguments. The table summarizes them.

| Trait | Power user | Casual user |
|---|---|---|
| Features used | Many, often in combination | A few |
| Frequency | Daily or hourly | Occasional |
| Tolerance for complexity | High, if the payoff is control | Low |
| Typical request | "Add an option for..." | "Make it simpler" |
| Effect on the roadmap | Pushes depth and options | Rarely heard |

The **long tail of features** is the pattern in which a few features are used by almost everyone while many others are each used by very few. Plot the 20 features from most used to least used, and the chart falls steeply and then flattens into a long, low tail. The name comes from the shape. The head of the chart is short and tall, and the tail stretches away to the right.

The tail is not worthless. A feature used by 2% of 100,000 users still serves 2,000 people, and for those people it may be the reason they bought the product. The difficulty is that every user, whether in the head or the tail, pays for and carries the entire tail. Use the explorer below to move a usage threshold along the chart and watch how few features survive as the threshold rises.

#### Diagram: Long Tail of Feature Usage Explorer

<details markdown="1">
<summary>Long Tail of Feature Usage Explorer</summary>
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
</details>

!!! mascot-thinking "The tail is paid for by the head"
    ![Pinch thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice who carries what: the head users need almost nothing from the tail, yet they download, update, and pay for all of it. Whenever a feature list is long, ask who it is long for.

## The Pareto Principle and the 80% Rule

The **Pareto principle** is the observation that a small share of causes produces a large share of effects. It is named for the economist Vilfredo Pareto and is usually summarized as the 80/20 rule: roughly 80% of results come from 20% of causes. Software offers many examples. A small share of the code causes most of the bugs, a small share of customers produces most of the revenue, and a small share of features gets most of the use.

The cumulative view makes the Pareto shape easy to read. Each row adds the next-most-used feature to the running total of 332 points in the illustrative data.

| Features included | Share of the 20 features | Cumulative use points | Share of all use |
|---|---|---|---|
| Top 2 | 10% | 147 | 44% |
| Top 4 | 20% | 225 | 68% |
| Top 5 | 25% | 247 | 74% |
| Top 8 | 40% | 286 | 86% |
| All 20 | 100% | 332 | 100% |

The 80/20 figures are a pattern, not a law, and the real split varies. Our illustrative data can be tested. The total of all 20 feature shares is 332 percentage points. The top four features account for 92 + 55 + 48 + 30 = 225 of them, which is 68%. The top 20% of the features (4 of 20) therefore carry about 68% of the use. That is the Pareto shape, but a softer version than 80/20.

The **80% rule of thumb** is the claim, used throughout this book, that about 80% of the features in a typical software product are rarely or never used. It comes from Pendo's [2019 Feature Adoption Report](https://www.pendo.io/resources/the-2019-feature-adoption-report/), which measured feature use across 615 software products over three months. The same report found that about 12% of features produced 80% of daily usage. For a product with 40 features, the rule leaves about 8 features in regular use; for a product with 100 features, about 20. The author uses only 2 of 40, which shows that one person's share can be far smaller than the product-wide average.

!!! mascot-warning "Rule of thumb, not a law"
    ![Pinch warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    The 80% figure is an average across hundreds of products measured by one analytics vendor. It is easy to repeat and says little about any single product. Treat it as a hypothesis to test, and check your own tool's usage before you quote it: a given product might leave 60% or 95% of its features unused.

**Unused features** are features that a given user never uses, or that almost no one uses. The phrase has two meanings, and it is worth keeping them apart. For one person, every feature outside their own use is unused, which is nearly the whole feature set. For the product as a whole, a feature is unused when telemetry shows that essentially no one opens it. The second kind is the strongest evidence of bloat, since no user receives value from it, yet it remains in the code, the menu, and the documentation.

## Why Unused Features Cost Something

An unused feature seems free: it sits there, and you don't have to touch it. That is not quite true, and the reason is **cognitive load**, the amount of mental effort a task demands of working memory. People can hold only a handful of items in mind at once. Interface designers reduce load by showing only what the task needs. Every extra button, menu, and dialog adds something to scan, read, and rule out.

A worked example makes it concrete. The author's job is to grab a region after a delay. In a minimal tool, a menu offers two commands, and the right one is found at a glance. In a product with 20 features, the same command is one of twenty menu items grouped under several headings, and the user must read, reject, or remember where it lives. Nothing in that menu is broken. The author simply spends effort on the 18 commands that are irrelevant, every time.

Researchers describe cognitive load in parts. *Intrinsic* load comes from the difficulty of the task itself, such as deciding what to capture. *Extraneous* load comes from how the task is presented, such as a cluttered menu. Designers can reduce only the second kind, and unused features are one of the largest sources of it.

**Interface complexity** is the number and arrangement of controls, menus, and options that a user must understand or navigate to use a product. It grows with the feature set, and it grows faster than the feature count, because each new feature must be placed relative to all the old ones. Complexity is the visible part of cognitive load, the part you can count by opening the menus.

**Feature discoverability** is how easily a user can find a feature they need. It pulls in the opposite direction from a large feature set. A small tool makes its few features obvious. A large tool buries the useful ones among the rest, so even a feature that exists and would help may never be found. A bloated product can therefore fail twice: its unwanted features crowd the screen, and its wanted ones become hard to find.

!!! mascot-thinking "Features you never use still cost you attention"
    ![Pinch thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Think of a drawer with 5 tools versus a drawer with 50. You pay for the extra 45 each time you rummage, even if you never pick one up. What could you take out of your busiest tool?

## Why Features Keep Arriving

If most features go unused and add load, why do vendors keep adding them? Three forces explain most of it. The first is the **product roadmap**, the vendor's plan for what to build and in what order. A roadmap is a reasonable thing to have, but it is written by a team that needs to show progress, and "we shipped five new features" is easier to show than "we made the existing three simpler."

A worked example of a roadmap shows the tension. Suppose a team plans four releases. Release one adds cloud sharing, release two adds team comments, release three adds a plug-in interface, and release four adds an AI summary. Each looks sensible in a planning meeting. None of them was requested by the users who bought the original tool for a quick, local grab. The roadmap serves the vendor's growth, and the old users inherit its results.

The second force is **competitive feature matching**: adding a feature because a rival has one, whether or not customers ask for it. If a competitor announces screen recording, the pressure to add recording is immediate. No team wants to explain why it lacks something on the other product's page. When all the rivals follow each other, the whole category drifts toward the same long feature list.

The third is **feature checklist marketing**: promoting a product by the length of its feature list rather than by how well it does a job. A comparison table with a check mark in every row is the typical form. It works on buyers who cannot judge quality in advance, because a count is easier to compare than a fit. It rewards adding a shallow version of every feature, which is bloat by construction.

The sorter below presents eight situations and asks you to name the force behind each one, with a fourth option for the one healthy cause, a feature added because usage data and customers showed a real need.

#### Diagram: Why Features Get Added Sorter

<details markdown="1">
<summary>Why Features Get Added Sorter</summary>
Type: microsim
**sim-id:** usage-feature-driver-sorter<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** distinguish<br/>
**Learning Objective:** The learner will distinguish four reasons a vendor adds a feature by assigning each of 8 described situations to the correct reason, scoring at least 7 of 8.

**Prerequisites:** usage telemetry, product roadmap, competitive feature matching, feature checklist marketing (defined in the chapter sections "Measuring Feature Usage" and "Why Features Keep Arriving").

**Evidence of Mastery:** The learner assigns each situation to one of four reasons. An assignment is correct when it equals the Correct reason column in Content. Mastery is 7 of 8 correct on the first attempt through. Reading the reason definitions is exploration and is not scored.

**Misconceptions:** (1) Every feature exists because customers asked for it. (2) A longer feature list always means a better product.

**Instructional Rationale:** Sorting similar-looking situations forces the learner to attend to the trigger behind each addition, which is the distinction at the Analyze level.

**Content:**

The four reasons, with the definition shown to the learner:

| Reason | Definition shown |
|---|---|
| Customer need shown by usage | The vendor adds the feature because telemetry or customer requests show many users need it. |
| Product roadmap | The vendor adds the feature because it is on a plan made to show progress and growth. |
| Competitive feature matching | The vendor adds the feature because a rival has it. |
| Feature checklist marketing | The vendor adds or counts the feature so the product wins a feature-by-feature comparison. |

The 8 situations, in this fixed order:

| # | Situation shown | Correct reason | Why (shown as feedback) |
|---|---|---|---|
| 1 | A rival announces AI summaries, and the vendor ships its own within a quarter. | Competitive feature matching | The trigger is the rival's move, not any request from users. |
| 2 | Telemetry shows 40% of users resize every grab by hand, so the vendor adds a resize handle. | Customer need shown by usage | Usage data shows a widespread need. |
| 3 | A three-year plan names cloud collaboration as the headline of next year's release. | Product roadmap | The feature comes from a plan, not from a stated need. |
| 4 | A package says "120+ features" and counts every menu item and setting. | Feature checklist marketing | The count is chosen to look large in a comparison. |
| 5 | Many support tickets ask for a delay timer, so the vendor adds one. | Customer need shown by usage | Repeated requests from users are a direct signal of need. |
| 6 | A comparison page ticks every row against the rivals, including a rarely used plug-in interface. | Feature checklist marketing | The row exists to earn a check mark, not to serve a job. |
| 7 | A planned platform release schedules a plug-in interface for the second half of the year. | Product roadmap | The date and scope come from the vendor's plan. |
| 8 | After a competitor adds screen recording, the vendor adds recording although no customer asked. | Competitive feature matching | The competitor's feature, not demand, is the cause. |

**Provenance:** All 8 situations are illustrative scenarios invented for this chapter; the sim labels them illustrative.

**Rules:** Each situation is assigned once to exactly one reason. The score is the number of correct assignments out of 8. Mastery is a score >= 7 on the first pass.

**Learner Activity:**

1. The learner reads the four reasons and their definitions.
2. The learner sees situation 1 and chooses one reason.
3. The sim shows whether the choice was correct, with the Why text, and the learner moves to the next situation.
4. After situation 8, the learner sees the score and which reasons they confused most often.

**Feedback:** Eight items in fixed order, one attempt each. Correct: "Correct" with the Why text. Incorrect: the correct reason and the Why text. The final screen shows "n of 8" and the message "Mastery reached" when n >= 7.

**Starting State:** The four reasons are listed with situation 1 shown. The question on screen is "Why was this feature added?"

**Chapter Anchors:** The chapter states that the sorter has 8 situations and 4 reasons, and that one reason, customer need shown by usage, is the healthy one.
</details>

!!! mascot-celebration "You can read a feature list critically"
    ![Pinch celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now compare a feature list with real usage, explain the long tail and the 80% rule, and say why unused features cost attention. Next stop: the money behind it all.

## Key Takeaways

- Feature usage measures what a feature list cannot: who uses what, and how often.
- Usage is uneven. A few features serve almost everyone, and a long tail serves few.
- The Pareto principle and the 80% rule of thumb describe that unevenness; treat the numbers as hypotheses.
- Unused features cost cognitive load, add interface complexity, and hurt discoverability.
- Roadmaps, competitive matching, and checklist marketing keep adding features that usage does not justify.

[See Annotated References](./references.md)
