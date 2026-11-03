---
title: "Claim and Evidence Checker"
description: "The learner will judge whether each of 8 claims in an illustrative agent report is supported or unsupported by the evidence shown with it, with at least 7 correct."
status: built
library: p5.js
bloom_level: Evaluate
---

# Claim and Evidence Checker

<iframe src="main.html" width="100%" height="532" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## How to Use This MicroSim

- **Read** the agent's claim and the evidence panel under it. The reports are illustrative, not from a real session.
- **Judge** the claim with **Supported** or **Unsupported**, then press **Confirm**. You get one attempt per claim.
- **Check** the feedback, which gives the correct judgment and the reason.
- **Continue** with **Next claim**. After claim 8 a summary lists the claims you judged wrongly and two rules of thumb. Mastery is 7 of 8.

## Lesson Plan

**Grade level:** Undergraduate. **Time:** 10 to 15 minutes.

1. **Frame (2 min).** Remind learners that an agent's report is a claim. The question for each case is whether the evidence tests that same claim.
2. **Judge (6 min).** Learners work through all eight claims on their own.
3. **Compare (3 min).** Put claims 1 and 2 side by side. Both say the tests pass, but only one comes with evidence.
4. **Discuss (3 min).** Use claims 5 and 7 to draw out the two rules of thumb: evidence must test the same claim, and written is not run.

**Misconceptions to watch for:** a confident, detailed report is a verified report; code that was written has also been run; a passing test of one thing confirms a different claim.

## Specification

The full specification below is extracted from
[Chapter 5: Generative AI and Coding Agents](../../chapters/05-generative-ai-coding-agents/index.md).

```text
Type: microsim
**sim-id:** agent-claim-evidence-checker<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/learning-sciences/tree/main/docs/sims/evidence-loop-authoring<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** judge<br/>
**Learning Objective:** The learner will judge whether each of 8 claims in an illustrative agent report is supported or unsupported by the evidence shown with it, with at least 7 correct.

**Prerequisites:** AI hallucination, overconfident reporting, human review, session log (all defined in this chapter above this block).

**Evidence of Mastery:** For each of 8 claims the learner commits "Supported" or "Unsupported" after reading the evidence panel. A judgment is correct when it matches the "Correct judgment" column in Content. Mastery is 7 of 8 correct. Reading the evidence without committing a judgment is exploration.

**Misconceptions:** (1) A confident, detailed report is a verified report. (2) Code that was written has been run. (3) A passing test of one thing confirms a different claim.

**Instructional Rationale:** Evaluating requires applying a criterion to a case. The criterion here is "does the evidence shown match the claim?", and eight short cases with contrasting evidence make the learner apply it repeatedly rather than recite it.

**Content:**

All reports and evidence are illustrative and the sim labels them "illustrative, not from a real session".

| # | Agent claim | Evidence shown | Correct judgment | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | "All 94 tests pass." | Test run output: "94 passed, 0 failed" | Supported | The output shows the test command ran and counts match the claim |
| 2 | "All tests pass." | None. The log contains no test command | Unsupported | No evidence that tests were run |
| 3 | "The app builds cleanly." | Build output ending in "error: cannot find 'copyImageToClipboard' in scope" | Unsupported | The build output shows an error, which contradicts the claim |
| 4 | "Delayed capture waits 3 seconds." | Unit test of the delay timer: "delay = 3.0 s, passed" | Supported | A passing test targets exactly this claim |
| 5 | "The hotkey works on every Mac." | The author tried the hotkey once on one Mac | Unsupported | One trial on one machine does not support "every Mac" |
| 6 | "The README explains installation." | The README file opened, with an "Install" section listing the install command | Supported | The file was opened and the section exists |
| 7 | "The screen recording permission is handled." | Code reviewed, never run; no permission prompt appeared in testing | Unsupported | Written code that was never run does not show the permission flow works |
| 8 | "The clipboard contains the captured image." | The author pasted into an image viewer and the grab appeared | Supported | A person checked the real result directly |

**Provenance:** Illustrative scenarios written for this chapter. The test count 94 comes from the course description section "How the first version was built". The definitions come from this chapter, sections "AI Hallucination", "Overconfident Reporting" and "Session Log".

**Rules:** Claims appear in the order of the table. A claim is "Supported" only when the evidence shown directly tests that same claim and the result matches it. Evidence that is absent, contradicts the claim, tests something else, or covers a narrower case than the claim makes it "Unsupported".

**Learner Activity:**

1. The learner reads claim 1 and its evidence panel.
2. The learner chooses Supported or Unsupported and confirms the choice.
3. The sim shows whether the judgment was correct, with the Why text.
4. The learner repeats for claims 2 through 8, then sees a summary of correct judgments and the two rules of thumb: "Evidence must test the same claim" and "Written is not run".

**Feedback:** Eight claims, fixed order, one attempt each. The correct judgment and Why text appear immediately after each confirmation. A running count "Correct: n of 8" is shown. The summary shows the claims judged wrongly with their Why text.

**Starting State:** Claim 1 and its evidence are shown with the question "Does the evidence support the claim?"

**Chapter Anchors:** The chapter states that there are 8 claims, that the test count in the example is 94, and that mastery is 7 of 8.
```

## Related Resources

- [Chapter 5: Generative AI and Coding Agents](../../chapters/05-generative-ai-coding-agents/index.md)
