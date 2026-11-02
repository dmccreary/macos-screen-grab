---
title: "AI-Assisted Build Stage Sequencer"
description: "The learner will list the five stages of the ScreenGrab build in their correct order, given five unordered cards that each show a stage and its output, within two attempts."
status: scaffold
library: p5.js
bloom_level: Remember
---

# AI-Assisted Build Stage Sequencer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 9: Generating, Building, and Installing the Code](../../chapters/09-generating-building-installing/index.md).

```text
Type: microsim
**sim-id:** ai-assisted-build-stage-sequencer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/ai-persona-testing/tree/main/docs/sims/prompt-architecture-builder<br/>
**Bloom Level:** Remember<br/>
**Bloom Verb:** list<br/>
**Learning Objective:** The learner will list the five stages of the ScreenGrab build in their correct order, given five unordered cards that each show a stage and its output, within two attempts.

**Prerequisites:** minimal specification, design document, code generation, installer script, README file (all defined in this chapter or earlier chapters above this block).

**Evidence of Mastery:** The learner arranges five cards in a sequence and submits it. The sequence is correct when it matches the "Position" column in Content exactly. Mastery is a correct sequence on the first or second submission.

**Misconceptions:** (1) Code is written first and the specification is written afterward to describe it. (2) Tests are optional extras added at the end of a project. (3) The installer comes before the code that it installs.

**Instructional Rationale:** Remember-level recall of a sequence is best exercised by reconstructing the sequence from cards, because the learner must retrieve the order from memory instead of recognizing it in a list. Showing each card's output gives the learner a meaningful clue.

**Content:**

The five cards, shown in a scrambled initial order (Installer, Code, Specification, Tests, Design). Each card shows its stage name and its output:

| Position | Stage | Output shown on the card | Why it comes here (shown as feedback) |
|---|---|---|---|
| 1 | Specification | A minimal specification of what the tool does and does not do | Everything else is built from what the tool is supposed to do |
| 2 | Design | A design document of components, decisions, and trade-offs | The design turns the requirements into a plan that fits the platform |
| 3 | Code | About 2,000 lines of Swift in 19 files | Code is written from the design |
| 4 | Tests | About 1,370 lines, with 94 automated tests | Tests check the code against the specification |
| 5 | Installer | Install and build scripts of about 500 lines, plus a README | The installer packages code that already exists and has been checked |

**Provenance:** Stage order and the numbers on the cards come from the course description section "How the first version was built" and from this chapter's section "The ScreenGrab Case Study".

**Rules:** The correct sequence is exactly Specification, Design, Code, Tests, Installer. Two submissions are allowed. A submission is correct only if all five positions match.

**Learner Activity:**

1. The learner sees the five cards in the scrambled order and the instruction "Put the build in the order it happened."
2. The learner rearranges the cards into a sequence and submits it.
3. If the sequence is wrong, the sim tells the learner how many cards are in the right position and allows one more attempt. If it is right, the sim shows the Why text for each position.
4. After the second attempt or a correct sequence, the sim shows the correct order with the Why text for each card.

**Feedback:** Two attempts. After the first incorrect submission: "n of 5 cards are in the right position. Try once more." After the second incorrect submission, or after a correct one: the correct order and the Why text for each position. A correct submission shows "You can list the build stages".

**Starting State:** The five cards in the scrambled order and the question "Which stage came first?"

**Chapter Anchors:** The chapter states that the work moved through the order specification, design, code, tests, and installer, with about 2,000 lines of Swift in 19 files, about 1,370 test lines with 94 tests, and about 500 lines of scripts.
```

## Related Resources

- [Chapter 9: Generating, Building, and Installing the Code](../../chapters/09-generating-building-installing/index.md)
