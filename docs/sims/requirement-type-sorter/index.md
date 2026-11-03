---
title: "Requirement Type Sorter"
description: "The learner will classify each of 12 specification statements as a functional requirement, a non-functional requirement, a non-goal, or an assumption, with at least 10 correct."
status: built
library: p5.js
bloom_level: Understand
---

# Requirement Type Sorter

<iframe src="main.html" width="100%" height="541px" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## How to Use This MicroSim

- **Read the statement.** All twelve statements are illustrative lines from a ScreenGrab-style specification.
- **Choose a category.** Click **Functional requirement**, **Non-functional requirement**, **Non-goal**, or **Assumption**. You can change your choice until you press **Confirm**.
- **Confirm.** The sim tells you whether you were right and why. An answered statement cannot be changed, and the running count shows how many you have right.
- **Look up a category.** Tick **Show definitions** at any time to read the four definitions. Reading them is not scored.
- **Review.** After statement 12 the sim lists every statement you missed, with its correct category and reason. If the list is long, press **More results** to page through it. Mastery is 10 of 12.

## Lesson Plan

**Grade level:** Undergraduate or adult learners. **Time:** 15 minutes.

1. **Recall (3 min).** Ask learners to name the defining property of each category: a behavior, a quality or limit, an exclusion, or a condition.
2. **Sort (7 min).** Learners classify the twelve statements alone and note any they found hard.
3. **Discuss (5 min).** Use the summary list. Ask why "The tool shall not include image editing" is not a functional requirement even though it starts with "The tool shall". Then ask what goes wrong if an assumption, such as one display at a time, is treated as a requirement the tool must enforce.

**Misconceptions to watch for:** a statement about what the tool will not do is a functional requirement; a quality such as speed or size is a feature; an assumption is a requirement the tool must satisfy.

## Specification

The full specification below is extracted from
[Chapter 7: Requirements and Minimal Specifications](../../chapters/07-requirements-minimal-specs/index.md).

```text
Type: microsim
**sim-id:** requirement-type-sorter<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** classify<br/>
**Learning Objective:** The learner will classify each of 12 specification statements as a functional requirement, a non-functional requirement, a non-goal, or an assumption, with at least 10 correct.

**Prerequisites:** functional requirement, non-functional requirement, non-goal, explicit assumption (all defined in this chapter above this block).

**Evidence of Mastery:** The learner assigns each of the 12 statements to exactly one of four categories and confirms the assignment. An assignment is correct when it matches the "Category" column in Content. Mastery is 10 of 12 correct. Reading the category definitions is exploration, not evidence.

**Misconceptions:** (1) A statement about what the tool will not do is a functional requirement. (2) A quality such as speed or size is a feature. (3) An assumption is a requirement the tool must satisfy.

**Instructional Rationale:** Classifying requires the learner to decide which defining property a statement has (behavior, quality, exclusion, or condition), which shows whether the four concepts are distinguished, not just recited.

**Content:**

The four categories and their definitions, available to the learner at any time:

| Category | Definition |
|---|---|
| Functional requirement | A specific behavior the tool must provide |
| Non-functional requirement | A quality the tool must have or a limit it must respect |
| Non-goal | Something the tool deliberately will not do |
| Assumption | A condition taken for granted and stated openly |

The twelve statements, in this order. All are illustrative statements for a ScreenGrab-style tool:

| # | Statement | Category | Why (shown as feedback) |
|---|---|---|---|
| 1 | The tool shall let the user drag a rectangle over any part of the screen. | Functional requirement | It describes a behavior the user performs and the tool responds to |
| 2 | The tool shall copy the captured image to the clipboard. | Functional requirement | It is an action the tool performs |
| 3 | A grab shall complete within 1 second of the user releasing the mouse button. | Non-functional requirement | It sets a speed limit, a quality of how well the behavior happens |
| 4 | The tool shall not include image editing or annotation. | Non-goal | It names a capability deliberately left out |
| 5 | The tool shall start a capture after a delay that the user chooses. | Functional requirement | It describes a behavior the user can trigger |
| 6 | The tool shall use no third-party libraries. | Non-functional requirement | It is a limit on how the tool is built, not a behavior |
| 7 | Cloud sharing is out of scope. | Non-goal | It states something deliberately excluded |
| 8 | The user has a Mac running a recent version of macOS. | Assumption | It states a condition taken for granted, not something the tool does |
| 9 | The tool shall be installable by running one script. | Non-functional requirement | It is a quality of installation, not a feature the user operates |
| 10 | The user captures only one display at a time. | Assumption | It is a condition the specification relies on |
| 11 | The tool shall let the user cancel a selection by pressing Escape. | Functional requirement | It describes a user action and the tool's response |
| 12 | Video recording is not part of this tool. | Non-goal | It excludes a capability explicitly |

Category counts: Functional requirement 4 (statements 1, 2, 5, 11), Non-functional requirement 3 (3, 6, 9), Non-goal 3 (4, 7, 12), Assumption 2 (8, 10).

**Provenance:** Statements are illustrative, written for this chapter, and the sim labels them "illustrative". Category definitions come from this chapter, sections "Functional Requirements", "Non-Functional Requirements", "Non-Goals" and "Explicit Assumptions".

**Rules:** Each statement belongs to exactly one category. A statement is correct only when the learner's category equals the Category column. Statements appear in the order of the table. A statement already answered cannot be changed.

**Learner Activity:**

1. The learner reads statement 1 and may open the category definitions.
2. The learner chooses one of the four categories and confirms.
3. The sim shows whether the choice is correct, with the Why text, and the next statement appears.
4. After statement 12, a summary shows the score and the statements answered wrongly, with their Why text. The learner should notice that exclusions and conditions are easy to confuse with requirements.

**Feedback:** Twelve statements, fixed order, one attempt each. Correct: "Correct: <category>" and the Why text. Incorrect: the correct category and the Why text. A running count "Correct: n of 12" is shown. A final score of 10 or more shows "You can separate the four kinds of statement"; a lower score invites a restart.

**Starting State:** Statement 1 is shown with the four categories unselected and the question "What kind of statement is this?"

**Chapter Anchors:** The chapter states four categories, twelve statements, and mastery at 10 of 12, with category counts of 4, 3, 3 and 2.
```

## Related Resources

- [Chapter 7: Requirements and Minimal Specifications](../../chapters/07-requirements-minimal-specs/index.md)
