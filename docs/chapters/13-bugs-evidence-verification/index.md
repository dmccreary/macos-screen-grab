---
title: "Bugs, Evidence, and Verification Plans"
description: "How to investigate a bug, report software status with evidence, and write a verification plan that separates automated tests from checks a person must run."
date: "2026-11-01 20:08:42"
generated_by: claude skill chapter-content-generator
version: 1.11
---

# Bugs, Evidence, and Verification Plans

## Summary

This chapter deals with what happens when software fails and how to report its status honestly. It covers bug reproduction, root cause analysis, environment-specific bugs, regression tests, and the unexplained failure from the ScreenGrab session, then the limits of automated tests, evidence-based reporting, and verification status. After this chapter, you will be able to write a verification plan that separates automated tests from checks a person must run.

## Concepts Covered

This chapter covers the following 10 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Software Bug | 7 |
| Bug Reproduction | 3 |
| Root Cause Analysis | 2 |
| Unexplained Failure | 1 |
| Environment-Specific Bug | 1 |
| Regression Test | 1 |
| Limits Of Automated Tests | 4 |
| Evidence-Based Reporting | 5 |
| Verification Status | 4 |
| Verification Plan | 3 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 5: Generative AI and Coding Agents](../05-generative-ai-coding-agents/index.md)
- [Chapter 9: Generating, Building, and Installing the Code](../09-generating-building-installing/index.md)
- [Chapter 12: Software Testing: Automated and Manual](../12-software-testing/index.md)

---

!!! mascot-welcome "Honest Software Reports"
    ![Pinch waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    The most useful sentence in software is "I checked, and here is how". In this chapter you will learn to write status reports that say exactly what was verified, what was not, and what nobody can explain yet. Grab only what you need, including only the claims you can back up!

The ScreenGrab session did not end with a clean sweep. One early hotkey failure was never explained, several acceptance tests still have to be run by hand, and a later fix was needed for Macs that have only the Command Line Tools. This chapter uses those loose ends as teaching material, because real projects always have them. What separates a trustworthy report from a misleading one is not the absence of loose ends but whether they are written down.

## Software Bugs

A **software bug** is a difference between what the software does and what its requirements, or its user's reasonable expectation, say it should do. A bug is not the same as a crash. A tool that runs smoothly and copies the wrong region is buggy. A bug can live in the code, in a missing requirement, in a wrong assumption about the platform, or in the way pieces fit together.

AI-generated code has bugs for the same reasons human code does, plus one more: the agent may write confident code against a requirement you never actually stated. The cheapest defense is the one from Chapter 7, which is a clear specification. The second defense is the testing in Chapter 12.

#### Worked example: a hypothetical Retina bug

This example is hypothetical, built from a risk the ScreenGrab specification lists: coordinate conversion between points and pixels. On a Retina display, one point is two pixels. Suppose a grab of a region 490 points wide and 285 points tall came out as an image 490 by 285 pixels, when the correct size is 980 by 570 pixels. Compare expected and actual:

| | Expected | Actual |
|---|---|---|
| Image size | 980 by 570 pixels | 490 by 285 pixels |
| Appearance when pasted | Sharp, at the size on screen | Blurry or half size |

The difference is the bug. The next sections follow what you do with it.

## Bug Reproduction

**Bug reproduction** is the act of making a bug happen again on demand, using a written recipe. A bug you can reproduce is a bug you can fix and test. A bug you cannot reproduce can only be guessed at. A good recipe has four parts: the starting state, the exact steps, the expected result, and the actual result, plus the environment (operating system version, hardware, and app version).

For the hypothetical Retina bug the recipe reads: start on a 2 times display; press Control-Shift-4; drag over a region 490 by 285 points; release; paste into Preview using File, New from Clipboard; expect 980 by 570 pixels; actually get 490 by 285. Anyone with a Retina display can follow it.

## Root Cause Analysis

**Root cause analysis** is the search for the underlying reason a bug happens, rather than the nearest visible symptom. Fixing the symptom, for example by doubling the output size, can hide the problem and break other cases. The usual method is to keep asking why until you reach a cause that, if removed, makes the bug impossible.

For the Retina example: why was the image half size? Because the crop used point values as pixel values. Why? Because the scale factor was not applied. Why not? Because that conversion was done in two places and one place skipped it. The root cause is the duplicated conversion, and the fix is a single tested conversion function, which is exactly what the ScreenGrab design records as its mitigation for this risk.

## Environment-Specific Bugs

An **environment-specific bug** appears only on some setups, such as a particular operating system version, hardware, tool installation, or shell. These bugs are the reason "it works on my machine" is not evidence. The ScreenGrab project recorded two real ones.

The first was the Command Line Tools issue. A later fix was needed for Macs with only the Command Line Tools and no full Xcode. The design document explains the cause: the Command Line Tools ship the Swift Testing framework but not XCTest, and, depending on the Swift version, the build tool may not find the framework, its macro plugin, or a library loaded at run time. The test script therefore passes all three locations explicitly.

The second was a shell quirk. In non-interactive zsh scripts, plain `log` runs a shell built-in, not the system log command, because `/etc/zshrc` disables that built-in only for interactive shells. Scripts must call `/usr/bin/log` by its full path.

!!! mascot-warning "It Worked on My Machine Is Not a Report"
    ![Pinch warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Software that passes on the machine that built it can fail on a clean one. Whenever you report a result, record the operating system version and the tools installed, and test the install on a machine that has only what a real user would have.

## Regression Tests

A **regression test** is a test added after a bug is fixed, which fails if the bug ever returns. The word regression means going backwards: a fixed behavior breaking again after a later change. AI agents change code often and quickly, so a fix without a regression test is a fix that may quietly undo itself.

The steps are simple. Write the test from the reproduction recipe. Run it against the broken code and watch it fail. Apply the fix. Watch the test pass. The first step, seeing it fail, matters, because a test that never failed has not shown that it can catch the bug. ScreenGrab's test that repeated partial redraws do not stack up dimming in the overlay layer is the kind of check that is normally added once such a bug has been seen.

## The Unexplained Failure

An **unexplained failure** is a failure that was observed but that nobody can account for, usually because it could not be reproduced and not enough evidence was captured when it happened. ScreenGrab has one. An early report said the Control-Shift-4 hotkey did nothing. Later a real key press worked at 14:48:56 on 2026-11-01, confirmed by the log. The design document does not claim the earlier problem is fixed. It says the earlier failure is unexplained: the earlier processes logged no hotkey activity, with the same code and the shortcut registered, and neither Secure Input nor the frontmost app was recorded at those moments.

The right response is to leave it open and write down what to capture next time. Calling it fixed because it later worked would be a false claim, since nothing was changed that could account for the difference.

!!! mascot-thinking "Unexplained Is a Valid Status"
    ![Pinch thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that "I do not know why it failed" is more useful than "it must have been a glitch". The first tells the next person what to measure. The second hides the risk.

#### Diagram: Bug Investigation Workflow

The steps in this chapter form a sequence with one important branch: what happens when the bug cannot be reproduced. The next diagram lets you walk it.

<details markdown="1">
<summary>Bug Investigation Workflow</summary>
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
</details>

## Limits of Automated Tests

The **limits of automated tests** are the kinds of fact that a program cannot confirm, no matter how many tests it runs. Chapter 12 covered what tests can see. These limits are the other side of that coin, and the ScreenGrab record names several.

- A real physical key press needs Accessibility permission to simulate, so hotkey delivery has to be tried by hand.
- Real screen capture needs the Screen Recording permission, which a person grants.
- Pasting into real applications, and judging how the result looks, needs a person.
- Behavior on hardware the author does not own, such as the Intel half of the universal build, cannot be seen from one machine.
- A stubbed test shows the code handles the stub's answers, not what the real tool does.
- A test only covers the cases its author thought of, and a generated test suite shares the blind spots of the generated code.

#### Worked example: 94 passing tests and an open question

With all 94 automated tests passing, ScreenGrab's hotkey still had an open question, since a program could not press the key. The tests exercised everything after the press, including a hand-built hotkey event reaching the handler. They could not show that the keyboard produced that event. The gap was closed only when a person pressed the keys and the log showed the result. A test result and a verification result are different things.

## Evidence-Based Reporting

**Evidence-based reporting** is the practice of stating each claim about software together with the evidence for it, so a reader can judge how far to trust it. A claim without evidence is an opinion. A good evidence note includes what was checked, how, when, on what setup, and what was not checked. The last item is the one most often missing, and it is the one that stops a reader from over-trusting the rest.

#### Worked example: rewriting a vague claim

The vague claim: "Hotkeys work." Here is the same claim rewritten to the standard of the ScreenGrab design document:

- Control-Shift-4 with a real key press worked at 14:48:56 on 2026-11-01, confirmed by the log.
- An earlier report of it failing is unexplained.
- Control-Shift-5 with a real key press, and Control-Shift-4 with VS Code in front, have not yet been run.

The second version is longer and less comforting, and far more useful. A reader knows what is safe to rely on, what is risky, and what to check next.

!!! mascot-tip "Add a Date, a Setup, and a Source"
    ![Pinch giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    When an agent says "verified", ask three things: when, on what setup, and what output proves it. If it cannot give all three, change the claim to "not yet verified".

## Verification Status

A **verification status** is a label attached to one claim that says how well it has been verified. Using a small fixed set of labels keeps reports honest and quick to scan. This book uses four.

| Status | Meaning |
|---|---|
| Verified automatically | A test or script confirmed it, with output on record |
| Verified by hand | A person confirmed it, with a dated note or log line |
| Not yet run | No check has been done |
| Claim exceeds evidence | The claim says more than the evidence shows |

#### Worked example: reading ScreenGrab's status table

The design document ends its testing chapter with a status table. Read through the labels above, its rows sort like this.

| Claim from the design document | Status |
|---|---|
| 94 automated tests pass | Verified automatically |
| Installer rollback after a failed swap works (with a stubbed move command) | Verified automatically |
| Smoke checks pass, with 0.0% CPU and about 25 MB at idle | Verified automatically |
| A real 980 by 570 grab pasted into another app with correct orientation and colors | Verified by hand |
| Control-Shift-4 works with a real key press | Verified by hand |
| The x86_64 half of the universal build works | Not yet run |
| Control-Shift-5 works with a real key press | Not yet run |
| Countdown cancel paths, Preferences recording, timings, multiple displays | Not yet run |

The fourth label, "claim exceeds evidence", has no rows in the real table, because the author wrote the claims carefully. It is the label you apply when you meet a sentence such as "ScreenGrab works" resting on 94 passing tests.

Now judge ten claims yourself.

#### Diagram: Verification Status Classifier

<details markdown="1">
<summary>Verification Status Classifier</summary>
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
</details>

## Verification Plans

A **verification plan** is a written list of the checks that will establish a piece of software's status, naming for each one the requirement it covers, who or what runs it, and how it is judged. Its main job is to separate the checks a program can run from the checks a person must run, so that nothing falls into the gap between them.

A plan for ScreenGrab's hotkey requirements might look like this.

| Requirement | Check | Run by | Pass rule | Status |
|---|---|---|---|---|
| Hotkey is registered and conflicts are reported | Registration and conflict tests | Automated | Tests pass | Verified automatically |
| Hotkey event reaches the handler with the right action | Hand-built Carbon event test | Automated | Tests pass | Verified automatically |
| A real Control-Shift-4 press starts a grab | AC-3 with the log checked | Person | Log shows the grab started | Verified by hand |
| A real Control-Shift-5 press starts a delayed grab | AC-11 | Person | HUD counts down, grab completes | Not yet run |
| Hotkey works with VS Code in front | AC-3 with VS Code frontmost | Person | Grab starts | Not yet run |

The capstone in Chapter 15 asks you to write one of these for your own tool. Fill the "Run by" column first. Anything that says Person is work that no agent can do for you.

!!! mascot-celebration "You Can Back Up a Claim"
    ![Pinch celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now investigate a bug from reproduction to regression test, name the limits of automated tests, label a claim's verification status, and write a plan that hands the human checks to a human. Chapter 14 looks at what comes after the first install.

[See Annotated References](./references.md)
