---
title: "Open Source License Matcher"
description: "The learner will apply the conditions of five license choices to choose the license that fits each of eight scenarios, with at least 7 of 8 correct on the first attempt."
status: scaffold
library: p5.js
bloom_level: Apply
---

# Open Source License Matcher



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 14: Maintenance and Open Source Sharing](../../chapters/14-maintenance-open-source/index.md).

```text
Type: microsim
**sim-id:** open-source-license-matcher<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/search-microsims/tree/main/docs/sims/cc-license-chooser<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** apply<br/>
**Learning Objective:** The learner will apply the conditions of five license choices to choose the license that fits each of eight scenarios, with at least 7 of 8 correct on the first attempt.

**Prerequisites:** open source license, permissive license, copyleft, MIT License, Creative Commons license, the BY, NC and SA conditions (all defined in the chapter above this block).

**Evidence of Mastery:** The learner assigns one of five license choices to each of eight scenarios. An assignment is correct when it matches the Correct choice in Content. Mastery is 7 of 8 correct on the first attempt per scenario. Reading the reasons is exploration, not evidence.

**Misconceptions:** (1) Any Creative Commons license is also an open source license. (2) A public repository with no license can be reused freely. (3) Copyleft and permissive licenses place the same conditions on reuse.

**Instructional Rationale:** Applying the conditions to concrete scenarios shows that license choice depends on what the author wants others to be able to do. Eight scenarios cover each choice at least once and force the learner to apply the conditions rather than recall names.

**Content:**

The five choices: MIT License, Copyleft license (such as the GNU General Public License), CC BY 4.0, CC BY-NC-SA 4.0, No license (all rights reserved).

| # | Scenario | Correct choice | Why (shown as feedback) |
|---|---|---|---|
| 1 | Source code of a small utility. Anyone may use it for any purpose, including commercially. They only need to keep your credit. | MIT License | MIT is permissive and asks only for the copyright notice. |
| 2 | Source code where anyone who distributes an improved version must also release its source. | Copyleft license (such as the GNU General Public License) | Copyleft requires changed versions to carry the same license. |
| 3 | Chapters of a book that may be shared and adapted with credit, not used commercially, with adaptations under the same terms. | CC BY-NC-SA 4.0 | BY gives credit, NC bars commercial use, SA keeps adaptations under the same terms. |
| 4 | A collection of diagrams that anyone, including companies, may reuse with credit. | CC BY 4.0 | BY alone requires only credit and allows commercial reuse. |
| 5 | A personal script on your own laptop that you never share. | No license (all rights reserved) | Nobody else needs permission, so no license is needed. |
| 6 | Short code samples in a textbook that readers may paste into their own commercial apps. | MIT License | Code samples suit a permissive code license. |
| 7 | Photos on a website that may be reused commercially if the photographer is credited. | CC BY 4.0 | Photos are creative works, and BY allows commercial reuse with credit. |
| 8 | Lesson plans that teachers may remix, provided remixes carry the same terms and are not resold. | CC BY-NC-SA 4.0 | NC bars resale and SA keeps remixes under the same terms. |

**Provenance:** The license conditions are from the chapter sections "Permissive Licenses", "The MIT License" and "Creative Commons Licenses". Scenarios are written by the chapter author.

**Rules:** Five answer choices per scenario. A scenario is correct when the chosen license equals the Correct choice. The score counts first answers only. The order is fixed as listed. The sim states that it is an educational exercise and not legal advice.

**Learner Activity:**

1. The learner reads scenario 1 and chooses one of five licenses.
2. The sim shows correct or incorrect and the Why text. An answered scenario cannot be changed.
3. The learner moves through scenarios 2 to 8 in order.
4. After scenario 8, the sim shows the score and a table of the eight scenarios grouped by license.
5. The learner should notice that the Creative Commons choices are used for text and images, and the other choices for code.

**Feedback:** Eight scenarios, fixed order, one attempt each. Correct: "Correct: [license]." plus the Why text. Incorrect: "Not quite: [Why text]." The score "Correct on first attempt: n of 8" is shown at the end, with "Mastery" when n >= 7.

**Starting State:** Scenario 1 is shown with five unselected license choices. The question on screen is "Which license fits what this author wants?"

**Chapter Anchors:** The chapter states ScreenGrab's code is under the MIT License, this book's text is CC BY-NC-SA 4.0, and a license with the NC condition is generally not considered open source.
```

## Related Resources

- [Chapter 14: Maintenance and Open Source Sharing](../../chapters/14-maintenance-open-source/index.md)
