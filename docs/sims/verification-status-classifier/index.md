---
title: "Verification Status Classifier"
description: "The learner will judge the verification status of each of ten ScreenGrab claims from the evidence offered for it, with at least 8 of 10 correct on the first attempt."
status: built
library: p5.js
bloom_level: Evaluate
---

# Verification Status Classifier

<iframe src="main.html" width="100%" height="592px" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## How to Use This MicroSim

- **Read the claim and its evidence.** Each card shows one ScreenGrab claim and the evidence offered for it. Claims 2 and 5 are marked as constructed examples.
- **Choose a status.** Click **Verified automatically**, **Verified by hand**, **Not yet run**, or **Claim exceeds evidence**. Your first click is your answer.
- **Read the reason.** A correct answer shows the status and the reason. A wrong answer shows "Not quite" with the reason, and the correct button is outlined in green.
- **Move on.** Press **Next**. An answered claim cannot be changed.
- **Review.** After claim 10 the sim shows your first-attempt score and all ten claims grouped by status. Mastery is 8 of 10.

## Lesson Plan

**Grade level:** Undergraduate or adult learners. **Time:** 15 minutes.

1. **Set the criteria (3 min).** Review the four labels. Ask: who or what ran the check, and does the check cover the whole claim?
2. **Judge (7 min).** Learners classify the ten claims alone.
3. **Discuss (5 min).** Use the grouped table. Contrast claim 4 (no check at all) with claim 2 (a check that does not cover the claim). Then ask why claim 5 is not verified even though the key works now.

**Misconceptions to watch for:** passing automated tests verify the whole product; a later success explains an earlier failure; a claim with no evidence is false rather than unverified.

## Specification

The full specification below is extracted from
[Chapter 13: Bugs, Evidence, and Verification Plans](../../chapters/13-bugs-evidence-verification/index.md).

```text
Type: microsim
**sim-id:** verification-status-classifier<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/unicorns/tree/main/docs/sims/claim-verification-tree<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** judge<br/>
**Learning Objective:** The learner will judge the verification status of each of ten ScreenGrab claims from the evidence offered for it, with at least 8 of 10 correct on the first attempt.

**Prerequisites:** automated test, manual testing, evidence-based reporting, verification status, the four status labels (all defined in the chapter above this block).

**Evidence of Mastery:** The learner assigns one of the four status labels to each claim. An assignment is correct when it matches the Correct status in Content. Mastery is 8 of 10 correct on the first attempt per item. Reading the reasons after answering is exploration, not evidence.

**Misconceptions:** (1) Passing automated tests verify the whole product. (2) A later success explains an earlier failure. (3) A claim with no evidence is false rather than unverified.

**Instructional Rationale:** Judging requires applying criteria to evidence, which is the Evaluate-level skill. Ten mixed cases make the learner apply the same four criteria repeatedly, and each reason models the correct justification.

**Content:**

The four labels: Verified automatically, Verified by hand, Not yet run, Claim exceeds evidence.

| # | Claim | Evidence offered | Correct status | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | 94 automated tests pass | A test run reports 94 of 94 passing | Verified automatically | A program ran the tests and the output is on record. |
| 2 | ScreenGrab works | The 94 automated tests pass | Claim exceeds evidence | The tests cover logic, not the real key press, capture permission, or paste. |
| 3 | Control-Shift-4 starts a grab | A real key press at 14:48:56 on 2026-11-01, confirmed in the log | Verified by hand | A person pressed the keys and the log recorded the result. |
| 4 | Control-Shift-5 starts a delayed grab | None yet | Not yet run | No check has been done. |
| 5 | The earlier Control-Shift-4 failure is fixed | The key later worked, and nothing was changed | Claim exceeds evidence | The cause is unknown, so a later success does not show it is fixed. |
| 6 | The Intel (x86_64) half of the universal app works | The build contains the x86_64 slice, but it was never run | Not yet run | Containing the code is not the same as running it. |
| 7 | The app idles at about 0.0% CPU and 25 MB | A smoke check using `ps` on macOS 26.6.2 | Verified automatically | A script measured it and the output is on record. |
| 8 | The installer rolls back after a failed swap | A test with a stubbed move command | Verified automatically | A test confirmed the flow, with the stub noted. |
| 9 | A real grab pastes with correct orientation and colors | A 980 by 570 grab was pasted into another app and checked | Verified by hand | A person made the grab and looked at the pasted result. |
| 10 | The countdown cancel paths work | None yet | Not yet run | These need a person and have not been run. |

**Provenance:** Claims and evidence are from section 10.4 "Verification status" of the ScreenGrab design document. Items 2 and 5 are claims the chapter author wrote to illustrate the fourth label; the sim must label them "constructed example".

**Rules:** Four answer choices per item. An item is correct when the chosen label equals the Correct status. The score counts first answers only. The order is fixed as listed.

**Learner Activity:**

1. The learner reads claim 1 and the evidence offered.
2. The learner chooses one of the four labels.
3. The sim shows correct or incorrect and the Why text. An answered item cannot be changed.
4. After claim 10, the sim shows the score and a table of the ten claims grouped by status.
5. The learner should notice that "Not yet run" is a different label from "Claim exceeds evidence".

**Feedback:** Ten items, fixed order, one attempt each. Correct: "Correct: [status]." plus the Why text. Incorrect: "Not quite: [Why text]." The score "Correct on first attempt: n of 10" is shown at the end, with "Mastery" when n >= 8.

**Starting State:** Claim 1 is shown with its evidence and four unselected labels. The question on screen is "How well is this claim verified?"

**Chapter Anchors:** The chapter's status table lists these labels and states that the Intel half has not been run, Control-Shift-5 has not been run, Control-Shift-4 worked at 14:48:56 on 2026-11-01, and the earlier failure is unexplained.
```

## Related Resources

- [Chapter 13: Bugs, Evidence, and Verification Plans](../../chapters/13-bugs-evidence-verification/index.md)
