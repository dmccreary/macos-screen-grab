---
title: "Which Test Can Confirm This"
description: "The learner will classify each of twelve ScreenGrab behaviors as confirmable by a unit test, an integration test, a smoke test, or a manual acceptance test, with at least 10 of 12 correct on the first attempt."
status: built
library: p5.js
bloom_level: Understand
---

# Which Test Can Confirm This

<iframe src="main.html" width="100%" height="602px" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## How to Use This MicroSim

- **Read the behavior.** Each card describes one ScreenGrab behavior to confirm. Item 10 uses an illustrative maximum delay.
- **Choose a kind of test.** Click **Unit test**, **Integration test**, **Smoke test**, or **Manual acceptance test**. Your first click is your answer.
- **Read the reason.** A correct answer shows the kind and the reason. A wrong answer shows "Not quite" with the reason, and the correct button is outlined in green.
- **Move on.** Press **Next**. An answered behavior cannot be changed.
- **Review.** After behavior 12 the sim shows your first-attempt score and the twelve behaviors grouped by kind of test. Mastery is 10 of 12.

## Lesson Plan

**Grade level:** Undergraduate or adult learners. **Time:** 15 minutes.

1. **Frame the question (3 min).** Ask what each kind of test can observe: one function, several real parts together, the installed app, or the real screen and a person.
2. **Classify (7 min).** Learners sort the twelve behaviors alone.
3. **Discuss (5 min).** Use the grouped table. The manual group is the one that touches real keys, real permissions, and real displays. Ask why ScreenGrab's 94 automated tests still leave 34 acceptance tests for a person.

**Misconceptions to watch for:** automated tests can confirm everything about the software; passing unit tests mean the real screen behaves correctly; a smoke test proves the software is correct.

## Specification

The full specification below is extracted from
[Chapter 12: Software Testing: Automated and Manual](../../chapters/12-software-testing/index.md).

```text
Type: microsim
**sim-id:** which-test-can-confirm-this<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** classify<br/>
**Learning Objective:** The learner will classify each of twelve ScreenGrab behaviors as confirmable by a unit test, an integration test, a smoke test, or a manual acceptance test, with at least 10 of 12 correct on the first attempt.

**Prerequisites:** automated test, unit test, integration test, smoke test, manual testing, acceptance test (all defined in the chapter above this block).

**Evidence of Mastery:** The learner assigns each behavior to one of four test kinds. An assignment is correct when it matches the answer column in Content. Mastery is 10 of 12 correct on the first attempt per item. Reading the reasons after answering is exploration, not evidence.

**Misconceptions:** (1) Automated tests can confirm everything about the software. (2) Passing unit tests mean the real screen behaves correctly. (3) A smoke test proves the software is correct.

**Instructional Rationale:** Classification requires the learner to reason about what a check can observe, which is the Understand-level skill of sorting examples under a concept. Immediate reasons after each answer let the learner repair the wrong rule at once.

**Content:**

The four kinds of test: Unit test, Integration test, Smoke test, Manual acceptance test.

| # | Behavior to confirm | Correct kind | Why (shown as feedback) |
|---|---|---|---|
| 1 | A drag from bottom-right to top-left gives the same rectangle as top-left to bottom-right | Unit test | It is pure logic in one function, so it can be checked in isolation. |
| 2 | A synthetic image with known pixel colors is cropped through the real geometry and cropping functions, and the output pixels match exactly at 2 times scale | Integration test | Several real parts must agree about points and pixels. |
| 3 | Two grabs in the same second are saved with the second named with " (2)" | Unit test | File naming is pure logic with an injected "exists" check. |
| 4 | A hotkey that another app has already registered is reported as a conflict | Integration test | It calls the real operating system registration and checks the combined result. |
| 5 | Pressing the real Control-Shift-4 keys starts a grab while another app is in front | Manual acceptance test | A program cannot send a real key press without Accessibility permission. |
| 6 | The pasted image in a Keynote or Pages document is exactly the selected region at the expected size | Manual acceptance test | It needs a real other application and a person to judge the result. |
| 7 | The installed app runs with no Dock icon | Smoke test | A quick check of the installed app, with no permission prompt. |
| 8 | The selection overlay, rendered off-screen, dims outside the selection and leaves the selection undimmed | Integration test | The view and its drawing code are tested together, through pixels. |
| 9 | After Screen Recording permission is revoked, a grab shows an alert with a button to open System Settings and copies no image | Manual acceptance test | It needs the real operating-system permission, which a program cannot grant or revoke. |
| 10 | A delay of 99 seconds is clamped to the allowed maximum | Unit test | Delay clamping is a pure function of its input. |
| 11 | The app idles at about 0% CPU | Smoke test | A quick `ps` check of the installed app, with no permission prompt. |
| 12 | With two displays of different pixel density, the captured pixels match the highlighted area on both | Manual acceptance test | It needs two real displays and a person to compare. |

**Provenance:** Items come from the ScreenGrab design document section 10 and specification section 10 (acceptance tests AC-3, AC-4, AC-9, and AC-21), and from the chapter's examples. Item 10's maximum is illustrative; the sim must label item 10 "illustrative value".

**Rules:** Four answer choices per item. An item is correct when the chosen kind equals the Correct kind. The score counts correct first answers only. The order is fixed as listed.

**Learner Activity:**

1. The learner reads behavior 1 and chooses one of the four kinds.
2. The sim immediately shows correct or incorrect and the Why text.
3. The learner moves to the next behavior. An answered item cannot be changed.
4. After item 12, the sim shows the score and a table grouping the 12 behaviors by correct kind.
5. The learner should notice that the manual group is the one that touches real keys, real permissions, and real displays.

**Feedback:** Twelve items, fixed order, one attempt each. Correct: "Correct: [kind]." plus the Why text. Incorrect: "Not quite: [Why text]." The score "Correct on first attempt: n of 12" is shown at the end, with "Mastery" shown when n >= 10.

**Starting State:** Behavior 1 is shown with four unselected choices. The question on screen is "Which kind of test could confirm this?"

**Chapter Anchors:** The chapter states ScreenGrab has 94 automated tests and 34 acceptance tests (AC-1 to AC-34), and that the smoke checks report about 0.0% CPU and about 25 MB at idle.
```

## Related Resources

- [Chapter 12: Software Testing: Automated and Manual](../../chapters/12-software-testing/index.md)
