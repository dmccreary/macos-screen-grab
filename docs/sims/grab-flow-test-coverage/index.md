---
title: "ScreenGrab Grab Flow Test Coverage"
description: "The learner will distinguish the steps of a ScreenGrab grab that an automated test can confirm from the steps that only a person can confirm, by marking all 7 steps and matching the Content table on at least 6 of 7."
status: built
hide:
  - toc
library: Mermaid
bloom_level: Analyze
---

# ScreenGrab Grab Flow Test Coverage

<iframe src="main.html" width="100%" height="694px" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## How to Use This MicroSim

- **Explore:** click any of the seven steps of a grab to read what happens. The label on each arrow says what that step hands to the next one.
- **Judge:** for each step, choose *Automated can confirm* or *Only a person can confirm*. You get one attempt per step, in any order.
- **Read the feedback:** each judgment shows the answer and the reason. Answered steps turn green when you matched and red when you did not.
- **Score:** after the seventh judgment the panel shows *Matched: n of 7*, with *Mastery* at 6 or more. The fills switch to show the answer: orange steps need a person, blue steps can be automated. The badges still show which ones you matched. Press **Reset** to start again.

## Lesson Plan

**Grade level:** Undergraduate or adult learners. **Time:** 12 minutes.

1. **Predict (2 min).** Ask learners whether a test suite that covers most steps of a grab proves the whole grab works.
2. **Judge (6 min).** Learners judge all seven steps. Mastery is 6 of 7.
3. **Look at the pattern (2 min).** After scoring, the orange steps are the first, fourth, and last. Automation covers the middle of the chain, not its two ends or the real capture.
4. **Discuss (2 min).** Ask what a person must actually do to confirm steps 1, 4, and 7, and why the hotkey test does not cover the real key press.

**Misconceptions to watch for:** if most steps are automated, the whole flow is verified; the key press itself is covered by the hotkey tests.

## Specification

The full specification below is extracted from
[Chapter 12: Software Testing: Automated and Manual](../../chapters/12-software-testing/index.md).

```text
Type: workflow
**sim-id:** grab-flow-test-coverage<br/>
**Library:** Mermaid<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** distinguish<br/>
**Learning Objective:** The learner will distinguish the steps of a ScreenGrab grab that an automated test can confirm from the steps that only a person can confirm, by marking all 7 steps and matching the Content table on at least 6 of 7.

**Prerequisites:** automated test, simulated input events, stubbed dependency, off-screen rendering, manual testing (all defined in the chapter above this block).

**Evidence of Mastery:** The learner opens each step, commits "automated can confirm" or "only a person can confirm" before the answer is shown, and finishes with at least 6 of 7 matching the Content table. Opening a step to read its description is exploration, not evidence.

**Misconceptions:** (1) If most steps are automated, the whole flow is verified. (2) The key press itself is covered by the hotkey tests.

**Instructional Rationale:** Walking the flow in order shows that automation covers the middle of the chain but not its two ends, the real key press and the real pasted result. Committing a judgment per step makes the learner perform the distinguishing, not just read it.

**Content:**

The flow has 7 steps in this order, shown as a flowchart. Each step is clickable. Clicking opens an information box with the step's description, then two buttons for the learner's judgment, then the answer and reason.

| # | Step | Description | Answer | Reason |
|---|---|---|---|---|
| 1 | Press the hotkey | A person presses Control-Shift-4 in another app. | Only a person can confirm | A program cannot send a real key press without Accessibility permission. |
| 2 | Hotkey reaches the app | The registered hotkey event is delivered to ScreenGrab's handler. | Automated can confirm | A test builds a Carbon hotkey event by hand and checks the handler receives the right action. |
| 3 | Coordinator starts the grab | The state machine moves from idle to selecting. | Automated can confirm | Tested with fakes for every dependency. |
| 4 | Screen is captured | The real display is captured to a frozen still image. | Only a person can confirm | It needs the real Screen Recording permission and a real display. |
| 5 | User drags a selection | The overlay shows and the drag chooses a region. | Automated can confirm | Synthesized mouse events and off-screen rendering check selection and drawing. |
| 6 | Image is cropped and copied | The region is cropped, encoded, and written to the clipboard. | Automated can confirm | Tested with known pixels and a private named pasteboard. |
| 7 | Image is pasted into another app | The user pastes into Preview, Keynote, or Pages. | Only a person can confirm | It needs a real other application and a person to judge size and orientation. |

An edge label on every arrow states what is passed on: "key event", "action", "frozen image", "selection", "cropped PNG and TIFF", "clipboard contents".

**Provenance:** From the ScreenGrab design document sections 7 and 10 and specification section 10. The step descriptions are the chapter author's summary of those sections.

**Rules:** There are 7 steps and each has one answer. The learner's final score is the number of steps where the committed judgment matches the Answer column. Mastery when score >= 6.

**Learner Activity:**

1. The learner clicks step 1. The information box shows the description and two buttons.
2. The learner chooses a judgment. The answer and reason appear, and the step is marked answered.
3. The learner repeats for steps 2 to 7 in any order.
4. When all 7 are answered, the sim shows the score and highlights the steps that need a person.
5. The learner should notice that the first, fourth, and last steps cannot be fully confirmed by automation.

**Feedback:** Seven steps, any order, one attempt each. Correct: "Correct" plus the Reason. Incorrect: "Not quite" plus the Reason. The score "Matched: n of 7" is shown after step 7, with "Mastery" when n >= 6.

**Starting State:** The flow is shown with no steps answered. The question on screen is "At which steps does a person have to look?"

**Chapter Anchors:** The chapter states a real key press, the real screen capture, and the real paste need a person, and that the hotkey test builds the event by hand and checks everything after the key press.
```

## Related Resources

- [Chapter 12: Software Testing: Automated and Manual](../../chapters/12-software-testing/index.md)
