---
title: "Bug Investigation Workflow"
description: "The learner will identify what each of the seven steps of a bug investigation produces, answering at least 6 of 7 correctly."
status: built
hide:
  - toc
library: Mermaid
bloom_level: Remember
---

# Bug Investigation Workflow

<iframe src="main.html" width="100%" height="684px" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## How to Use This MicroSim

- **Explore:** click any step in the flowchart. The panel on the right shows what the step involves. The grey end point, *Wait for new evidence*, is not scored.
- **Answer:** for each of the seven numbered steps, choose which of three outputs that step produces. You get one attempt per step, and the choices are shuffled each visit.
- **Read the feedback:** a correct pick shows the reason. A wrong pick names the output the step really produces. Answered steps turn green or red and carry a badge.
- **Score:** after the seventh answer the panel shows *Correct: n of 7*. Mastery is 6 of 7. Press **Reset** to start again.

## Lesson Plan

**Grade level:** Undergraduate or adult learners. **Time:** 10 minutes.

1. **Predict (2 min).** Before opening the sim, ask learners what should happen when a bug cannot be reproduced. Note their answers.
2. **Answer (5 min).** Learners click all seven steps in any order and commit an output for each one. Mastery is 6 of 7.
3. **Trace the branch (2 min).** Point at step 3. Ask what each path ends in. Both end in writing: a status report with dated evidence, or a note of known and missing facts.
4. **Discuss (1 min).** Ask why step 6 needs a test that failed before the fix, not just a code change.

**Misconceptions to watch for:** a bug that cannot be reproduced can be closed as fixed; fixing the visible symptom is the same as fixing the root cause; a fix is finished when the code changes.

## Specification

The full specification below is extracted from
[Chapter 13: Bugs, Evidence, and Verification Plans](../../chapters/13-bugs-evidence-verification/index.md).

```text
Type: workflow
**sim-id:** bug-investigation-workflow<br/>
**Library:** Mermaid<br/>
**Status:** Specified<br/>
**Bloom Level:** Remember<br/>
**Bloom Verb:** identify<br/>
**Learning Objective:** The learner will identify what each of the seven steps of a bug investigation produces, answering at least 6 of 7 correctly.

**Prerequisites:** software bug, bug reproduction, root cause analysis, unexplained failure, regression test (all defined in the chapter above this block).

**Evidence of Mastery:** For each step, the learner picks which of three outputs the step produces, before the correct output is shown. A pick is correct when it matches the Output column in Content. Mastery is 6 of 7 correct. Opening a step to read its description is exploration, not evidence.

**Misconceptions:** (1) A bug that cannot be reproduced can be closed as fixed. (2) Fixing the visible symptom is the same as fixing the root cause. (3) A fix is finished when the code changes.

**Instructional Rationale:** Remember-level recall of the sequence benefits from touching each step and committing an answer. The branch on "can it be reproduced?" shows that the process has an honest exit for unexplained failures.

**Content:**

The diagram is a flowchart with seven steps and one decision. Each step is clickable. Clicking opens an information box with the step's description and three possible outputs. The learner picks one.

| # | Step | Description | Correct output | Wrong outputs shown | Reason |
|---|---|---|---|---|---|
| 1 | Observe the failure | Notice a difference between expected and actual behavior | A written observation of expected versus actual | A fixed bug; a new feature | You cannot work on a bug nobody has written down. |
| 2 | Try to reproduce it | Follow the recipe on the original setup | A recipe that makes the bug happen on demand | A passing test; a release | Reproduction is a recipe, not a fix. |
| 3 | Decision: reproducible? | If yes continue to step 4. If no, record an unexplained failure | A yes or no, with the environment noted | A root cause; a regression test | The answer decides whether the investigation can continue. |
| 4 | Record an unexplained failure | State what was seen, what was known, and what to capture next time | A written note of known facts and missing facts | A claim that the bug is fixed; a deleted report | Honest reporting beats a false fix. |
| 5 | Find the root cause | Ask why until removing the cause makes the bug impossible | A named underlying cause | A workaround; a bigger test suite | The cause, not the symptom, is what you fix. |
| 6 | Fix and add a regression test | Change the code and write a test that fails before the fix | A fix plus a test that failed first and now passes | A new bug report; a README change | A fix without a test may silently return. |
| 7 | Re-verify and report | Run the full checks and record the evidence | A status report with dated evidence | A guess that it is fixed; a deleted test | A claim needs a receipt. |

Edge labels: "reproduced" from step 3 to step 5, "cannot reproduce" from step 3 to step 4. Step 4 leads to a final node "wait for new evidence" whose information box reads "Capture the frontmost app, the log, and the settings the next time it happens".

**Provenance:** Steps follow the chapter sections "Bug Reproduction", "Root Cause Analysis", "Regression Tests" and "The Unexplained Failure". The step descriptions are the chapter author's wording.

**Rules:** Seven steps, each with exactly one correct output. The score is the number of correct picks. Mastery when score >= 6. The order of the three choices for each step is shuffled once per visit.

**Learner Activity:**

1. The learner clicks a step. An information box shows the description and three outputs.
2. The learner picks one output. The sim marks it correct or incorrect and shows the Reason.
3. The learner opens the remaining steps in any order until all seven are answered.
4. The learner should notice that step 3 sends the process down one of two paths, and that both paths end in written evidence.

**Feedback:** Seven steps, any order, one attempt each. Correct: "Correct" plus the Reason. Incorrect: "Not quite: this step produces [correct output]" plus the Reason. The score "Correct: n of 7" is shown after the last step.

**Starting State:** The flowchart is shown with no step answered. The question on screen is "What does each step of a bug investigation produce?"

**Chapter Anchors:** The chapter lists reproduction recipes with four parts plus the environment, root cause by asking why, a regression test that must be seen to fail before the fix, and an unexplained failure branch.
```

## Related Resources

- [Chapter 13: Bugs, Evidence, and Verification Plans](../../chapters/13-bugs-evidence-verification/index.md)
