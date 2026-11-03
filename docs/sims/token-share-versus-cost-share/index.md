---
title: "Token Share Versus Cost Share Chart"
description: "The learner will distinguish the token type that has the largest share of tokens from the token type that has the largest share of cost in the whole ScreenGrab session, and select each correctly on the first attempt."
status: built
library: Chart.js
bloom_level: Analyze
---

# Token Share Versus Cost Share Chart

A whole ScreenGrab build session used about 20 million tokens of three types. This sim asks you to predict which type is the largest by count and which is the largest by cost, then shows both shares side by side.

<iframe src="main.html" width="100%" height="695" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## How to Use This MicroSim

- **Predict:** choose an answer for both questions before any chart is shown. **Reveal** is enabled once both are answered.
- **Reveal:** press **Reveal** to commit. Each question has one attempt. Your answers are marked, the correct answers are shown, and the score reads "Questions correct: n of 2".
- **Explore:** hover each segment of the two 100% bars to read its tokens, cost and share. **Start over** clears the answers for another learner.

## Lesson Plan

**Grade level:** Undergraduate. **Time:** 10 minutes.

1. **Predict (2 min).** Learners answer both questions on their own before the chart is shown. Ask a few to say why they chose their answer.
2. **Reveal (3 min).** Learners press Reveal and hover each segment, writing down the token share and cost share for each type.
3. **Explain (3 min).** Ask learners to explain, using the prices in the note, how 1.6% of the tokens can be 45.1% of the cost.
4. **Discuss (2 min).** Cache reads are the largest segment in the token bar and the smallest in the cost bar. Ask what this means for anyone who tries to cut session cost by cutting token count alone.

**Misconceptions to watch for:** the type with the most tokens must cost the most; output is a small part of a session's cost because there is little of it; shares of tokens and shares of cost should match.

## Specification

The full specification below is extracted from
[Chapter 11: Measuring an AI Session: Time and Cost](../../chapters/11-measuring-ai-session/index.md).

```text
Type: chart
**sim-id:** token-share-versus-cost-share<br/>
**Library:** Chart.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/token-efficiency/tree/main/docs/sims/cross-vendor-token-drift<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** distinguish<br/>
**Learning Objective:** The learner will distinguish the token type that has the largest share of tokens from the token type that has the largest share of cost in the whole ScreenGrab session, and select each correctly on the first attempt.

**Prerequisites:** output tokens, other new tokens, cache read tokens, session cost breakdown (all defined in the chapter above this block).

**Evidence of Mastery:** Before the chart is revealed, the learner answers two questions: "Which token type is the largest share of tokens?" and "Which token type is the largest share of cost?" An answer is correct when it matches the Content table (cache reads for tokens, output for cost). Mastery is both correct on the first attempt. Hovering over bars after the reveal is exploration, not evidence.

**Misconceptions:** (1) The type with the most tokens must cost the most. (2) Output is a small part of a session's cost because there is little of it.

**Instructional Rationale:** Predicting before the reveal commits the learner to the intuition that count equals cost, and the two-bar comparison then breaks it. Analyze-level work asks the learner to separate two measures that look alike.

**Content:**

Whole-session figures (from the chapter section "Session Cost Breakdown"):

| Token type | Tokens | Share of tokens (%) | Cost ($) | Share of cost (%) |
|---|---|---|---|---|
| Output | 325,000 | 1.6 | 6.50 | 45.1 |
| Other new (writes) | 825,000 | 4.1 | 4.13 | 28.6 |
| Cache reads | 18,900,000 | 94.3 | 3.78 | 26.2 |

The chart shows two stacked bars of 100%: one for token share and one for cost share. Hovering over a segment shows the type, its tokens or cost, and its share. A note states that cost uses the book's assumed prices ($20, $5, and $0.20 per million tokens).

Question feedback:

| # | Question | Correct answer | Feedback when wrong |
|---|---|---|---|
| 1 | Which token type is the largest share of tokens? | Cache reads | Cache reads are 18.9 million of 20.05 million tokens, or 94.3%, because the growing history is re-read on almost every turn. |
| 2 | Which token type is the largest share of cost? | Output | Output is only 1.6% of tokens but 45.1% of cost, because each output token costs $20 per million, 100 times a cache read. |

**Provenance:** Token counts and prices are from docs/course-description.md. Shares and costs are computed from the Rules and match the chapter table.

**Rules:** Share of tokens = type tokens / 20,050,000. Cost = tokens x price / 1,000,000, with prices $20, $5, and $0.20 per million. Share of cost = type cost / 14.405. Shares are shown to one decimal, so they may sum to 99.9% or 100.0%.

**Learner Activity:**

1. The learner chooses an answer to question 1 and then to question 2, before any chart is shown.
2. The learner presses Reveal. The two stacked bars appear, with correct and incorrect answers marked.
3. The learner hovers over each segment to read its tokens, cost, and share.
4. The learner should notice that the cache read segment is largest in the token bar and smallest in the cost bar.

**Feedback:** Two questions, fixed order, one attempt each. Correct: "Correct: [type]." Incorrect: the "Feedback when wrong" text for that question. The correct answers are revealed together with the chart. A score "Questions correct: n of 2" is shown.

**Starting State:** The two questions are shown with three answer choices each and no chart. The prompt on screen is "Which kind of token is the biggest? Which kind costs the most?"

**Chapter Anchors:** The chapter states cache reads are 94.3% of tokens and 26.2% of cost, output is 1.6% of tokens and 45.1% of cost, and the whole session costs about $14.41.
```

## Related Resources

- [Chapter 11: Measuring an AI Session: Time and Cost](../../chapters/11-measuring-ai-session/index.md)
