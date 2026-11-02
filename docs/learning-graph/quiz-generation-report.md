# Quiz Generation Quality Report

Generated: 2026-11-01
Execution Mode: Serial (1 agent)

## Overall Statistics

- **Total Chapters:** 15
- **Total Questions:** 150
- **Avg Questions per Chapter:** 10.0
- **Questions with explanations:** 150 of 150 (100%)
- **Estimated Overall Quality Score:** 84/100

Every chapter has more than 2,000 words, so each scored in the "excellent" band for chapter length. Quiz files are `quiz.md` in each chapter directory.

## Per-Chapter Summary

| Chapter | Questions | Chapter Type | Bloom's (R/U/Ap/An/E/C) | Answers (A/B/C/D) |
|---------|-----------|--------------|--------------------------|--------------------|
| 1. Software Features and the Anatomy of Bloat | 10 | Introductory | 4/3/2/1/0/0 | 2/3/3/2 |
| 2. Feature Usage and the 95/5 Rule | 10 | Introductory | 4/3/2/1/0/0 | 2/3/3/2 |
| 3. Licenses, Subscriptions, and Vendor Incentives | 10 | Introductory | 4/3/2/1/0/0 | 2/3/2/3 |
| 4. Total Cost of Ownership | 10 | Intermediate | 3/3/3/1/0/0 | 3/2/2/3 |
| 5. Generative AI and Coding Agents | 10 | Intermediate | 3/3/3/1/0/0 | 3/2/3/2 |
| 6. Build or Buy and the Rise of Personal Software | 10 | Intermediate | 3/3/3/1/0/0 | 2/3/3/2 |
| 7. Requirements and Minimal Specifications | 10 | Intermediate | 3/3/3/1/0/0 | 3/2/2/3 |
| 8. Software Design and Platform Constraints | 10 | Intermediate | 3/3/3/1/0/0 | 3/2/3/2 |
| 9. Generating, Building, and Installing the Code | 10 | Intermediate | 3/3/3/1/0/0 | 3/3/2/2 |
| 10. Tokens, Prompt Caching, and Token Pricing | 10 | Intermediate | 3/3/3/1/0/0 | 3/2/3/2 |
| 11. Measuring an AI Session: Time and Cost | 10 | Intermediate | 3/3/3/1/0/0 | 2/3/3/2 |
| 12. Software Testing: Automated and Manual | 10 | Intermediate | 3/3/3/1/0/0 | 3/2/2/3 |
| 13. Bugs, Evidence, and Verification Plans | 10 | Intermediate | 3/3/3/1/0/0 | 3/2/2/3 |
| 14. Maintenance and Open Source Sharing | 10 | Advanced | 2/2/2/3/1/0 | 3/2/3/2 |
| 15. The Final Decision and the Capstone Project | 10 | Advanced | 2/2/2/2/1/1 | 3/3/2/2 |

## Bloom's Taxonomy Distribution (Overall)

| Level | Questions | Actual |
|-------|-----------|--------|
| Remember | 46 | 31% |
| Understand | 43 | 29% |
| Apply | 40 | 27% |
| Analyze | 18 | 12% |
| Evaluate | 2 | 1% |
| Create | 1 | 1% |

Chapters 1 to 3 target 40/40/15/5, chapters 4 to 13 target 25/30/30/15, and chapters 14 and 15 target the advanced mix. Each chapter lands within the plus or minus 15 point tolerance. Chapters 1 to 3 run slightly below the Understand target because one Understand slot in each went to Apply.

## Answer Balance (Overall)

- A: 27% (40/150)
- B: 25% (37/150)
- C: 25% (38/150)
- D: 23% (35/150)

Every chapter has between 2 and 3 correct answers per letter, and no letter is correct more than 3 times in a chapter.

## Validation Notes

- All questions use the `upper-alpha` wrapper, a `??? question "Show Answer"` admonition, a **Concept Tested** label, and a **See** link.
- **See** links point to section anchors in the same chapter's `index.md`. For the section "The Pareto Principle and the 95/5 Rule" the link goes to the page without an anchor, because the generated heading anchor contains the slash from "95/5".
- No question uses "All of the above" or "None of the above."
- Calculation questions (Chapters 3, 4, 10, 11, 15) were checked against the chapter's own worked examples.
- Concept coverage was judged from each chapter's concept list. Each quiz tests the headline concepts of its chapter, and no formal percentage was computed.

## Recommendations

- Chapters 1 to 3 could take one more Understand question each if the quiz length is raised to 12.
- A learning-graph-based coverage check would give a measured concept coverage figure. This run judged coverage by hand.
- Consider adding a chapter-level Evaluate question to Chapters 12 and 13, where the content supports judging evidence quality.
