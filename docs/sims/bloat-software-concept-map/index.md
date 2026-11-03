---
title: "Software Vocabulary Concept Map"
description: "The learner will classify six described examples under the correct term among software, software product, software feature, feature set, software version, and software release cycle, scoring at least 5 of 6 on the first attempt."
status: built
hide:
  - toc
library: vis-network
bloom_level: Understand
---

# Software Vocabulary Concept Map

<iframe src="main.html" width="100%" height="804px" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## How to Use This MicroSim

- **Explore:** click any node on the map. The *Definitions* card shows its definition and lists its connections, and the connected edges are highlighted. Exploring is not scored.
- **Quiz:** press **Start the quiz**. Each of the six items describes an example. Choose the term it is an example of from the six buttons. You get one attempt per item. Items 4 and 6 are marked *illustrative*.
- **Read the feedback:** a correct answer shows *Correct* and the reason. A wrong answer shows the reason and highlights the correct node on the map in yellow.
- **Score:** after item 6 the card shows *n of 6*, with *Mastery reached* at 5 or more on the first attempt. You can take the quiz again for practice.
- In fullscreen mode you can also drag and scroll to pan and zoom. In the textbook page, use the navigation buttons.

## Lesson Plan

**Grade level:** Undergraduate or adult learners. **Time:** 10 minutes.

1. **Explore (3 min).** Learners click each of the eight nodes and read the definitions. Ask them to read one edge aloud as a sentence, such as "Software Version is a snapshot of Software Product".
2. **Quiz (5 min).** Learners take the six-item matching quiz once. Mastery is 5 of 6 on the first attempt.
3. **Discuss (2 min).** Ask what separates software from a software product, and a single feature from a feature set. Then ask where bloat and a single-purpose utility sit on the map, and why both point at Feature Set.

**Misconceptions to watch for:** software and a software product are the same thing; a feature set is the same as a feature; a version is the same as a release cycle.

## Specification

The full specification below is extracted from
[Chapter 1: Software Features and the Anatomy of Bloat](../../chapters/01-software-bloat/index.md).

```text
Type: graph-model
**sim-id:** bloat-software-concept-map<br/>
**Library:** vis-network<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/computer-science/tree/main/docs/sims/oop-benefits-concept-map<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** classify<br/>
**Learning Objective:** The learner will classify six described examples under the correct term among software, software product, software feature, feature set, software version, and software release cycle, scoring at least 5 of 6 on the first attempt.

**Prerequisites:** software, software product, software feature, feature set, software version, software release cycle (each defined in the chapter sections "Software, Products, and Features" and "Versions and Release Cycles").

**Evidence of Mastery:** In the matching quiz, the learner picks one of the six terms for each of 6 described examples. An answer is correct when it equals the Correct term column in Content. Mastery is 5 of 6 correct on the first attempt. Clicking nodes to read definitions is exploration and is not scored.

**Misconceptions:** (1) Software and software product are the same thing. (2) A feature set is the same as a feature. (3) A version is the same as a release cycle.

**Instructional Rationale:** Classifying a concrete example under an abstract term makes the learner apply the definition instead of recalling its wording, which is the Understand-level behavior. The concept map gives the learner the relationships to reason from.

**Content:**

The map has eight nodes. Clicking a node opens its definition.

| Node | Definition shown on click |
|---|---|
| Software | A set of instructions that tells a computer what to do. |
| Software Product | Software packaged with an installer, documentation, a license, a price, updates, and support. |
| Software Feature | One distinct capability of a product that serves a purpose a user can name. |
| Feature Set | The complete collection of features a product offers. |
| Software Version | A numbered snapshot of a product at one point in time. |
| Software Release Cycle | The schedule on which a vendor publishes new versions. |
| Software Bloat | Growth of a feature set beyond what most users need or use. |
| Single-Purpose Utility | A small tool built to do one job and little else. |

The edges, shown with their labels, are:

| From | Label | To |
|---|---|---|
| Software Product | packages | Software |
| Software Feature | is one part of | Feature Set |
| Feature Set | belongs to | Software Product |
| Software Version | is a snapshot of | Software Product |
| Software Release Cycle | schedules | Software Version |
| Software Bloat | is what an oversized | Feature Set |
| Single-Purpose Utility | keeps a small | Feature Set |

The matching quiz has 6 items in this fixed order. The answer bank is the six terms software, software product, software feature, feature set, software version, and software release cycle.

| # | Description shown | Correct term | Why (shown as feedback) |
|---|---|---|---|
| 1 | The Swift source files that make up a screen grab app | software | They are instructions for the computer, with no license, price, or support around them. |
| 2 | The app, its installer, its license for three computers, and its update service sold under one name | software product | Software becomes a product when it is packaged with the means to obtain and keep using it. |
| 3 | Grabbing a region of the screen and copying it to the clipboard | software feature | It is one capability a user can name. |
| 4 | All 40 commands in a hypothetical editor's menus, taken together | feature set | It is the complete collection of capabilities, not a single one. |
| 5 | Release 4.2 as published in March | software version | It is a numbered snapshot of the product at one moment. |
| 6 | A new paid release published every fall | software release cycle | It describes the schedule on which versions appear, not any one version. |

**Provenance:** Node definitions come from the chapter sections above. Quiz items 1, 2, 3 and 5 follow the chapter's screen grab example; items 4 and 6 are illustrative and the sim labels them illustrative.

**Rules:** Each quiz item is answered once. An answer is correct when it equals the Correct term for that item. The score is the count of correct answers out of 6. Mastery is a score of at least 5 on the first attempt through the quiz.

**Learner Activity:**

1. The learner clicks any node to read its definition and sees which nodes it connects to.
2. The learner starts the matching quiz and reads item 1.
3. The learner chooses one of the six terms and sees the feedback at once.
4. The learner continues through items 2 to 6 and sees the final score.

**Feedback:** Six items in fixed order, one attempt each. A correct answer shows "Correct" and the Why text. An incorrect answer shows the Why text for that item and highlights the correct node on the map. The score "n of 6" is shown after the last item, with the message "Mastery reached" when n >= 5.

**Starting State:** The map is shown with no node selected and the quiz not started. The prompt reads "Click a node to see what it means, then test yourself."

**Chapter Anchors:** The chapter states that the author's screen grab utility cost $9, that three computers share one license, that a feature set is the complete collection of a product's capabilities, and that the map has six quiz items.
```

## Related Resources

- [Chapter 1: Software Features and the Anatomy of Bloat](../../chapters/01-software-bloat/index.md)
