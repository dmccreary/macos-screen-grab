---
title: "Prompt Cache Cost Calculator"
description: "The learner will calculate the cost of repeating a fixed context over several turns with and without prompt caching, to within $0.01."
status: built
library: p5.js
bloom_level: Apply
---

# Prompt Cache Cost Calculator



<iframe src="main.html" width="100%" height="622" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## How to Use This MicroSim

- **Challenge first:** the sim opens on scenario 1. Type the cost without caching and the cost with caching, then press **Check** (or Enter). Answers within $0.01 count, and you get two attempts per scenario. Mastery is 3 of 3 scenarios with both answers right.
- **Then explore:** after scenario 3 the two sliders unlock. Change the context size and the number of turns to see both costs, the saving, and the cost of each turn update. Press **Restart scenarios** to try the challenge again.

The prices are the book's assumptions. Check current vendor pricing before using these numbers for a real budget.

## Lesson Plan

**Grade level:** Undergraduate. **Time:** 15 minutes.

1. **Predict (2 min).** Ask learners whether caching makes the first request cheaper. Collect a show of hands.
2. **Challenge (7 min).** Learners work the three scenarios with a calculator. Scenario 3 has one turn and no saving.
3. **Explore (4 min).** Learners set turns to 1, then raise it step by step and watch the saving climb toward 96%. The per-turn strip shows why: only the first turn pays the full price.
4. **Discuss (2 min).** Why can the saving never reach 100%? Where does the 96% limit come from?

**Misconceptions to watch for:** caching makes every request cheaper, including the first; cache reads cost the same as plain input; a single-turn request benefits from caching.

## Specification

The full specification below is extracted from
[Chapter 10: Tokens, Prompt Caching, and Token Pricing](../../chapters/10-tokens-caching-pricing/index.md).

```text
Type: microsim
**sim-id:** prompt-cache-cost-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/token-efficiency/tree/main/docs/sims/tool-use-loop-cost<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the cost of repeating a fixed context over several turns with and without prompt caching, to within $0.01.

**Prerequisites:** input tokens, cache write tokens, cache read tokens, token pricing (all defined in the chapter above this block).

**Evidence of Mastery:** For three challenge scenarios, the learner types the cost with caching and the cost without caching before the sim shows its values. An answer is correct when it is within $0.01 of the model value. Mastery is 3 of 3 scenarios with both answers correct. Changing the free-exploration inputs is exploration, not evidence.

**Misconceptions:** (1) Caching makes every request cheaper, including the first. (2) Cache reads cost the same as plain input. (3) A single-turn request benefits from caching.

**Instructional Rationale:** Apply-level calculation needs practice with a check, so the learner commits numbers before seeing the model result. Free exploration afterward lets the learner see the break-even behavior that the third scenario hints at.

**Content:**

Prices (per million tokens, from the section "Token Pricing"): plain input $5.00, cache write $5.00, cache read $0.20.

The fixed context is resent every turn. The learner can adjust:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Context size | 10,000 | 200,000 | 10,000 | 100,000 | tokens |
| Number of turns | 1 | 100 | 1 | 40 | turns |

Challenge scenarios, in order:

| # | Context (tokens) | Turns | Cost without caching | Cost with caching | Feedback when wrong |
|---|---|---|---|---|---|
| 1 | 100,000 | 40 | $20.00 | $1.28 | Without: 40 x 100,000 = 4 million tokens x $5 = $20.00. With: one write ($0.50) plus 39 reads of 100,000 tokens x $0.20 per million ($0.78) = $1.28. |
| 2 | 50,000 | 10 | $2.50 | $0.34 | Without: 10 x 50,000 = 500,000 tokens x $5 per million = $2.50. With: write $0.25 plus 9 reads of 50,000 tokens ($0.09) = $0.34. |
| 3 | 200,000 | 1 | $1.00 | $1.00 | With one turn there is only a write and no reads, and a write costs the same as plain input here, so caching saves nothing. |

**Provenance:** Prices are the Claude Opus 5.5 figures stated in docs/course-description.md and the chapter section "Token Pricing". The sim must label them "book assumptions: check current vendor pricing". Scenario values are computed from the Rules.

**Rules:** Cost without caching = turns x context x 5 / 1,000,000. Cost with caching = context x 5 / 1,000,000 + (turns - 1) x context x 0.20 / 1,000,000. Costs are shown in dollars rounded to two decimals. Only the fixed context is modeled; new tokens added per turn and output are ignored. The saving is shown as a percentage, (without - with) / without, which is 0% when turns = 1.

**Learner Activity:**

1. The learner reads scenario 1 (context and turns) and types the cost without caching and the cost with caching.
2. The learner presses Check. The sim shows both model values and the worked calculation next to the learner's numbers.
3. After all three scenarios, free exploration unlocks and the learner changes context size and turns. Both costs and the percentage saving update at once.
4. The learner should notice that the saving is zero at one turn and rises toward 96% as turns grow.

**Feedback:** Three scenarios, fixed order, two attempts each. Correct: "Correct: with caching $X, without $Y." Incorrect: the "Feedback when wrong" text for that scenario. After the second wrong attempt the model values and worked calculation are shown and the scenario counts as missed. A running count "Scenarios correct: n of 3" is shown.

**Starting State:** Scenario 1 is shown with two empty answer boxes. The question on screen is "What does 40 turns over a 100,000-token context cost, with and without a cache?"

**Chapter Anchors:** The chapter's worked example states $20.00 without caching, $1.28 with caching, a $0.50 write, a $0.78 read cost, and a saving of about 94% for 100,000 tokens over 40 turns.
```

## Related Resources

- [Chapter 10: Tokens, Prompt Caching, and Token Pricing](../../chapters/10-tokens-caching-pricing/index.md)
