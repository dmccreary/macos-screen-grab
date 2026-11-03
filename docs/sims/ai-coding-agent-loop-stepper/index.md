---
title: "AI Coding Agent Loop Stepper"
description: "The learner will explain the order of the seven stages an AI coding agent moves through, by predicting the next stage correctly in at least 5 of 6 steps."
status: built
library: p5.js
bloom_level: Understand
---

# AI Coding Agent Loop Stepper

<iframe src="main.html" width="100%" height="644px" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## How to Use This MicroSim

- **Read** the current stage in the yellow chip and the card below it, which shows what happens and the ScreenGrab example.
- **Predict** the next stage: pick one of the three buttons, then press **Lock in**. You get one attempt per step, and the next stage is revealed only after you lock in.
- **Step** forward with **Next**, or go back with **Previous** to review an earlier step and its feedback.
- **Finish** after step 6 to see the full loop, the two permission checks, the final human review, and your score. Mastery is 5 of 6.

## Lesson Plan

**Grade level:** Undergraduate. **Time:** 10 minutes.

1. **Warm up (2 min).** Ask learners what an agent does right after it receives a request. Collect a few answers.
2. **Predict (5 min).** Learners step through the six predictions on their own.
3. **Discuss (3 min).** Ask why the two tool-use stages each need a permission check, and why the loop ends with a person checking the report instead of with the report itself.

**Misconceptions to watch for:** the agent writes all the code in one step and then stops; the agent never needs the person after the request; the agent's report that work is done proves the work is done.

## Specification

The full specification below is extracted from
[Chapter 5: Generative AI and Coding Agents](../../chapters/05-generative-ai-coding-agents/index.md).

```text
Type: microsim
**sim-id:** ai-coding-agent-loop-stepper<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/ai-strategy-for-education/tree/main/docs/sims/ai-agent-anatomy<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** explain<br/>
**Learning Objective:** The learner will explain the order of the seven stages an AI coding agent moves through, by predicting the next stage correctly in at least 5 of 6 steps.

**Prerequisites:** AI coding agent, prompt, natural language request, clarifying questions, agent planning, agent tool use, agent permissions, human review (all defined in this chapter above this block).

**Evidence of Mastery:** At each of six steps the learner commits a prediction of the next stage before it is revealed. A prediction is correct when it matches the "Next stage" column in Content. Mastery is 5 of 6 correct on the first try. Reading the stage descriptions and pressing Next without predicting is exploration, not evidence.

**Misconceptions:** (1) The agent writes all the code in one step and then stops. (2) The agent never needs the person after the request. (3) The agent's report that work is done proves the work is done.

**Instructional Rationale:** Predicting the next stage forces the learner to rebuild the loop from the meaning of each stage instead of reading a list. The concrete ScreenGrab example visible at every stage keeps the abstract loop tied to a real case.

**Content:**

The seven stages, in order, each shown with its ScreenGrab example:

| # | Stage | What happens | ScreenGrab example (from the chapter) |
|---|---|---|---|
| 1 | Request | The person states the goal in a natural language request | A short request for a tool that grabs a region and copies it to the clipboard |
| 2 | Clarifying questions | The agent asks the person to settle open choices | Four multiple-choice questions answered by the author |
| 3 | Plan | The agent lists the steps it intends to take | Specification first, then design, code, tests, installer |
| 4 | Tool use: write | The agent creates or edits files, after a permission check | Writing the Swift source files |
| 5 | Tool use: run | The agent runs commands such as a build or the tests, after a permission check | Building the app and running the automated tests |
| 6 | Report | The agent states what it did and what it believes the result is | A summary that the app was built and installed |
| 7 | Human review | The person checks the report against evidence and decides what happens next | Trying the hotkey and a first real screen grab |

Prediction steps (six): the learner is shown stage N and picks the next stage from three choices: the correct next stage and two other stages from the table.

| Step | Shown stage | Choices | Correct next stage | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | Request | Plan; Clarifying questions; Human review | Clarifying questions | The agent settles open choices before it commits to a plan |
| 2 | Clarifying questions | Plan; Report; Request | Plan | With the choices settled, the agent lays out its steps |
| 3 | Plan | Tool use: write; Report; Human review | Tool use: write | Files must exist before anything can be built or tested |
| 4 | Tool use: write | Tool use: run; Request; Plan | Tool use: run | New files are built and tested to see whether they work |
| 5 | Tool use: run | Report; Clarifying questions; Request | Report | After running commands, the agent summarizes the outcome |
| 6 | Report | Human review; Plan; Tool use: write | Human review | A report is a claim, and the person must check it |

**Provenance:** Stage names and definitions come from this chapter, sections "AI Coding Agents", "Prompts and Natural Language Requests", "Human in the Loop" and "Human Review". The ScreenGrab examples come from the course description section "How the first version was built".

**Rules:** The stage order is fixed. Stages 4 and 5 each show a permission check before they run. After stage 7 the sim states that the loop can return to stage 1 with a new or refined prompt. Choices are shown in a fixed order for each step.

**Learner Activity:**

1. The learner sees stage 1 with its description and example, and the question "What comes next?"
2. The learner picks one of three choices and locks it in. The sim reveals the correct next stage.
3. The learner moves to the next step and repeats until all six predictions are made.
4. After step 6, a summary lists the seven stages in order and marks the two permission checks and the final human review.

**Feedback:** Six predictions, fixed order, one attempt each. On a correct prediction the sim shows "Correct" with the Why text. On an incorrect prediction it shows the correct stage and the Why text. A running count "Correct: n of 6" is shown. At the end, 5 or 6 correct displays "You can explain the loop"; fewer than 5 invites a restart.

**Starting State:** Stage 1, Request, is shown with its example and the question "What does the agent do after it receives the request?"

**Chapter Anchors:** The chapter states that there are seven stages: request, clarifying questions, plan, tool use (write), tool use (run), report, and human review, and that the author answered four multiple-choice questions.
```

## Related Resources

- [Chapter 5: Generative AI and Coding Agents](../../chapters/05-generative-ai-coding-agents/index.md)
