---
title: "Fork and Pull Request Flow"
description: "The learner will classify each of the six steps of a contribution by where code changes (the contributor's fork, the original repository, or nowhere), with at least 5 of 6 correct."
status: built
hide:
  - toc
library: Mermaid
bloom_level: Understand
---

# Fork and Pull Request Flow

<iframe src="main.html" width="100%" height="580" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## How to Use This MicroSim

- **Explore:** click any of the six steps in the flowchart to read what happens at that step.
- **Classify:** for each step, choose where code changes: *Contributor's fork*, *Original repository*, or *Nowhere (no code changes)*. The three choices are always in the same order. You get one attempt per step.
- **Read the feedback:** a correct pick shows the reason. A wrong pick names the right place. Answered steps turn green or red and carry a badge.
- **Score:** after the sixth answer the panel shows *Correct: n of 6*. Mastery is 5 of 6. Press **Reset** to start again.

## Lesson Plan

**Grade level:** Undergraduate or adult learners. **Time:** 10 minutes.

1. **Predict (2 min).** Read the question on screen aloud: at which step does the original project actually change? Ask each learner to write down a step number.
2. **Classify (5 min).** Learners classify all six steps in any order. Mastery is 5 of 6.
3. **Compare (2 min).** Learners check their prediction against the result. Only step 6, the merge, changes the original repository.
4. **Discuss (1 min).** Follow the *feedback* arrow from step 5 back to step 3. Ask where the requested changes are made, and who decides when the loop ends.

**Misconceptions to watch for:** forking changes the original repository; opening a pull request changes the original code; a contributor can merge their own change into someone else's project.

## Specification

The full specification below is extracted from
[Chapter 14: Maintenance and Open Source Sharing](../../chapters/14-maintenance-open-source/index.md).

```text
Type: workflow
**sim-id:** fork-and-pull-request-flow<br/>
**Library:** Mermaid<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** classify<br/>
**Learning Objective:** The learner will classify each of the six steps of a contribution by where code changes (the contributor's fork, the original repository, or nowhere), with at least 5 of 6 correct.

**Prerequisites:** public repository, forking, pull request, community contribution (all defined in the chapter above this block).

**Evidence of Mastery:** For each step, the learner picks one of three places before the answer is shown. A pick is correct when it matches the Answer column in Content. Mastery is 5 of 6 correct. Opening a step to read its description is exploration, not evidence.

**Misconceptions:** (1) Forking changes the original repository. (2) Opening a pull request changes the original code. (3) The contributor can merge their own change into someone else's project.

**Instructional Rationale:** Classifying where code changes at each step corrects the most common confusion, that a fork or a pull request alters the original. Committing an answer before the reveal makes the learner reason about ownership instead of reading it.

**Content:**

The diagram is a flowchart with six steps in order. Each step is clickable. Clicking opens an information box with the description and three choices: "Contributor's fork", "Original repository", "Nowhere (no code changes)".

| # | Step | Description | Answer | Reason |
|---|---|---|---|---|
| 1 | Find the public repository | A contributor reads the code and the LICENSE file of a public repository | Nowhere (no code changes) | Reading changes nothing. |
| 2 | Fork it | The contributor makes their own copy under their own account | Contributor's fork | The new copy is created in the contributor's account; the original is untouched. |
| 3 | Change and test the fork | The contributor edits the copy and runs the tests | Contributor's fork | All edits happen in the copy. |
| 4 | Open a pull request | The contributor proposes the changes to the owner | Nowhere (no code changes) | A pull request is a proposal; no code moves yet. |
| 5 | The owner reviews | The owner reads the differences, asks questions, and requests changes | Nowhere (no code changes) | Review is discussion; the original code is unchanged. |
| 6 | The owner merges | The owner accepts the proposal and brings the changes in | Original repository | Only the owner's decision changes the original. |

Edge labels: "copy" from step 2 to step 3, "propose" from step 3 to step 4, "feedback" from step 5 back to step 3, "accept" from step 5 to step 6.

**Provenance:** From the chapter sections "Public Repositories", "Forking" and "Pull Requests". Step descriptions are the chapter author's wording.

**Rules:** Six steps, each with one correct answer. The score is the number of correct picks. Mastery when score >= 5. The order of the three choices is the same for every step.

**Learner Activity:**

1. The learner clicks a step. An information box shows the description and three choices.
2. The learner picks one choice. The sim marks it correct or incorrect and shows the Reason.
3. The learner opens the remaining steps in any order until all six are answered.
4. The learner should notice that only the final step changes the original repository.

**Feedback:** Six steps, any order, one attempt each. Correct: "Correct" plus the Reason. Incorrect: "Not quite: [Answer]" plus the Reason. The score "Correct: n of 6" is shown after the last step.

**Starting State:** The flowchart is shown with no step answered. The question on screen is "At which step does the original project actually change?"

**Chapter Anchors:** The chapter states a fork is a copy under the contributor's own account, a pull request is a proposal, and the owner decides whether to merge.
```

## Related Resources

- [Chapter 14: Maintenance and Open Source Sharing](../../chapters/14-maintenance-open-source/index.md)
