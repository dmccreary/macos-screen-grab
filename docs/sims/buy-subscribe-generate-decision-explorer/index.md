---
title: "Buy, Subscribe, or Generate Decision Explorer"
description: "The learner will recommend buy, subscribe, or generate for each of 8 scenarios, justified by how long the tool will be used and who supports it, with at least 6 correct."
status: scaffold
library: p5.js
bloom_level: Evaluate
---

# Buy, Subscribe, or Generate Decision Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 6: Build or Buy and the Rise of Personal Software](../../chapters/06-build-or-buy/index.md).

```text
Type: microsim
**sim-id:** buy-subscribe-generate-decision-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/information-systems/tree/main/docs/sims/build-buy-saas-decision<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** recommend<br/>
**Learning Objective:** The learner will recommend buy, subscribe, or generate for each of 8 scenarios, justified by how long the tool will be used and who supports it, with at least 6 correct.

**Prerequisites:** build-or-buy decision, buy option, subscribe option, generate option, disposable software, long-lived software, risks of ownership, support responsibility (all defined in this chapter above this block).

**Evidence of Mastery:** For each scenario the learner commits one of three recommendations. A recommendation is correct when it matches the "Best option" column in Content. Mastery is 6 of 8 correct. Opening the three option summaries is exploration, not evidence.

**Misconceptions:** (1) Generating is always the cheapest choice. (2) A subscription is always a bad deal. (3) A one-time purchase never needs any further thought.

**Instructional Rationale:** Evaluating means judging against criteria. The scenarios vary the criteria (duration, support, regulation, verification) so the learner must weigh them instead of memorizing a single rule.

**Content:**

The three options, shown as reference summaries the learner can open at any time:

| Option | One-sentence summary |
|---|---|
| Buy | Pay once and keep using that version; the vendor maintains it until you stop upgrading |
| Subscribe | Pay repeatedly; the vendor maintains it and keeps it current for as long as you pay |
| Generate | Have an AI coding agent build exactly what you need; you pay tokens and time, and you carry support responsibility |

The eight scenarios, in order. All are illustrative:

| # | Scenario | Best option | Why (shown as feedback) |
|---|---|---|---|
| 1 | You must convert one folder of files to a different format this afternoon, and never again. | Generate | One-off job: disposable software has no maintenance cost, and no product is worth learning for one use |
| 2 | A 200-person company needs payroll software that must follow tax rules that change every year. | Subscribe | The outside rules change constantly, and the vendor's yearly updates and support are the real product |
| 3 | A $9 one-time utility does exactly your job on all your computers and has not changed in years. | Buy | A stable one-time purchase already fits; keep it, since the cost per year keeps falling |
| 4 | Your screen grab tool costs $30 per computer per year on 3 computers, and you use 2 of its features. | Generate | You can name the 2 features, the fee compounds ($90 a year), and a small tool is easy to test |
| 5 | A clinic must store patient records and follow privacy law, and no staff member can verify security. | Subscribe | The vendor carries compliance, security, and support, which the clinic cannot verify itself |
| 6 | You need name tags formatted for one event next weekend. | Generate | A single-occasion job suits disposable software, with no upkeep afterward |
| 7 | A $40 one-time-license drawing app does everything you need on one computer and rarely changes. | Buy | A stable tool with a fixed price and no recurring cost; generating adds work for no gain |
| 8 | You need one job done on two computers, the only product charges $15 per computer per year, and you can describe the job in two sentences and have time to test it. | Generate | A short specification and time to verify make generating practical, and the fee recurs forever |

Counts: Generate is the best option in 4 scenarios (1, 4, 6, 8), Subscribe in 2 (2, 5), and Buy in 2 (3, 7).

**Provenance:** Scenarios are illustrative and written for this chapter, and the sim labels them "illustrative". The $9, $30, $90 figures in scenarios 3 and 4 come from the course description section "How a simple tool became a subscription". The option summaries come from this chapter.

**Rules:** Each scenario has exactly one best option. The learner chooses exactly one of three options per scenario. No arithmetic is required of the learner. A scenario is correct only when the chosen option equals the Best option column.

**Learner Activity:**

1. The learner reads scenario 1 and may open the three option summaries.
2. The learner picks one of Buy, Subscribe, or Generate and confirms the choice.
3. The sim shows whether the choice was correct and the Why text, and the learner moves to the next scenario.
4. After scenario 8, the sim shows the score and lists the scenarios answered incorrectly with their Why text. The learner should notice that the best option depends on duration and support more than on price alone.

**Feedback:** Eight scenarios, fixed order, one attempt each. Correct: "Correct: <option>" and the Why text. Incorrect: the best option and the Why text. A running count "Correct: n of 8" is shown. A final score of 6 or more shows "You can weigh the three options"; a lower score invites a restart.

**Starting State:** Scenario 1 is shown with the three option summaries closed and the question "Which option fits this job best?"

**Chapter Anchors:** The chapter states three options (buy, subscribe, generate), the figures $9, $30 per computer per year, $90 a year, $450 over five years, about $6 for the first build, about $14 for the whole session, and about 70 active minutes. The explorer has 8 scenarios and mastery is 6 of 8.
```

## Related Resources

- [Chapter 6: Build or Buy and the Rise of Personal Software](../../chapters/06-build-or-buy/index.md)
