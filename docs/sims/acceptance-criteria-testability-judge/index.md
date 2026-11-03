---
title: "Acceptance Criteria Testability Judge"
description: "The learner will assess whether each of 8 acceptance criteria is testable, by deciding if two people running the same check would reach the same verdict, with at least 7 correct."
status: built
library: p5.js
bloom_level: Evaluate
---

# Acceptance Criteria Testability Judge

<iframe src="main.html" width="100%" height="498px" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## How to Use This MicroSim

- **Read** the criterion on the card. All eight criteria are illustrative.
- **Judge** it with **Testable** or **Not testable**, then press **Confirm**. You get one attempt per criterion.
- **Check** the feedback. It gives the reason, and for an untestable criterion it shows a repaired version that two people could check and agree on.
- **Continue** with **Next criterion**. After criterion 8 the score appears. Mastery is 7 of 8.

## Lesson Plan

**Grade level:** Undergraduate. **Time:** 10 minutes.

1. **Set the test (2 min).** State the rule before learners start: a criterion is testable when two people running the same check would agree on the result.
2. **Judge (5 min).** Learners judge all eight criteria on their own. Ask them to read each repair before moving on.
3. **Discuss (3 min).** Ask why criterion 5 is testable even though it has no number. Then have learners rewrite "The tool should be fast" in their own words.

**Misconceptions to watch for:** a criterion that sounds positive and professional must be testable; words like "all" or "gracefully" make a criterion stricter and so better; only a number makes a criterion testable.

## Specification

The full specification below is extracted from
[Chapter 7: Requirements and Minimal Specifications](../../chapters/07-requirements-minimal-specs/index.md).

```text
Type: microsim
**sim-id:** acceptance-criteria-testability-judge<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** assess<br/>
**Learning Objective:** The learner will assess whether each of 8 acceptance criteria is testable, by deciding if two people running the same check would reach the same verdict, with at least 7 correct.

**Prerequisites:** acceptance criteria, functional requirement, non-functional requirement (all defined in this chapter above this block).

**Evidence of Mastery:** For each of 8 criteria the learner commits "Testable" or "Not testable". A judgment is correct when it matches the "Verdict" column in Content. Mastery is 7 of 8 correct. Viewing the repair suggestion for a criterion after judging is feedback, not evidence.

**Misconceptions:** (1) A criterion that sounds positive and professional is a testable one. (2) A criterion with the word "all" or "gracefully" is stricter and so better. (3) Only numbers make a criterion testable.

**Instructional Rationale:** Assessing needs a criterion applied to cases. The criterion is "would two people agree?", and the mix of testable and untestable examples, including one testable criterion with no number, prevents the shortcut of looking for digits.

**Content:**

The eight criteria, in this order. All are illustrative:

| # | Criterion | Verdict | Why (shown as feedback) | Repair, shown when Not testable |
|---|---|---|---|---|
| 1 | The tool should be fast. | Not testable | "Fast" has no limit, so two people could disagree | A grab completes within 1 second of releasing the mouse button |
| 2 | After the user drags a region and releases the mouse, the clipboard holds an image of exactly that region. | Testable | A person can paste and compare the picture with the region | (not needed) |
| 3 | The tool is easy to use. | Not testable | "Easy" depends on the person | A new user starts a region capture using only the hotkey, with no instructions |
| 4 | With a 5-second delay set, the capture happens between 4.9 and 5.1 seconds after the user starts it. | Testable | It gives a measurable window | (not needed) |
| 5 | Pressing Escape during selection ends the capture and leaves the clipboard unchanged. | Testable | It has a clear action and an observable result, though it needs no number | (not needed) |
| 6 | The tool handles errors gracefully. | Not testable | "Gracefully" and "errors" are undefined | When the screen cannot be read, the tool shows a message and does not change the clipboard |
| 7 | The app works with all Macs. | Not testable | "All" cannot be checked | The app runs on the macOS versions named in the specification |
| 8 | Pressing Control-Shift-4 while a web browser is the frontmost app starts a region selection. | Testable | A person can try it and see whether a selection starts | (not needed) |

Verdict counts: Testable 4 (criteria 2, 4, 5, 8), Not testable 4 (criteria 1, 3, 6, 7).

**Provenance:** Criteria are illustrative and written for this chapter, and the sim labels them "illustrative". The Control-Shift-4 hotkey and the delay idea come from the course description section "The Story". The testability test comes from this chapter, section "Acceptance Criteria".

**Rules:** A criterion is Testable only when two people running the same check would agree on the result, regardless of whether it contains a number. Criteria appear in the order of the table. The repair text is shown only after a Not testable criterion has been judged.

**Learner Activity:**

1. The learner reads criterion 1.
2. The learner chooses Testable or Not testable and confirms.
3. The sim shows whether the judgment is correct and the Why text; for a Not testable criterion it also shows the repair.
4. The learner continues through criterion 8 and then sees the score. The learner should notice that criterion 5 is testable without containing a number.

**Feedback:** Eight criteria, fixed order, one attempt each. Correct: "Correct: <verdict>" and the Why text. Incorrect: the correct verdict, the Why text, and any repair. A running count "Correct: n of 8" is shown. A final score of 7 or more shows "You can judge testability"; a lower score invites a restart.

**Starting State:** Criterion 1 is shown with the question "Would two people running the same check reach the same verdict?"

**Chapter Anchors:** The chapter states the test of testability as "two different people run the check and agree on the result", gives 5 seconds with a 4.9 to 5.1 second window, and says the sim has 8 criteria with mastery at 7 of 8.
```

## Related Resources

- [Chapter 7: Requirements and Minimal Specifications](../../chapters/07-requirements-minimal-specs/index.md)
