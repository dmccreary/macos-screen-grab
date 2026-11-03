---
title: "Token Split Explorer"
description: "The learner will compare their predicted token count with the illustrative split for each of five short texts, and identify the one text that the four-characters-per-token rule underestimates by more than 50%."
status: built
library: p5.js
bloom_level: Understand
---

# Token Split Explorer

<iframe src="main.html" width="100%" height="663px" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## How to Use This MicroSim

- **Predict:** read the text and the character count, set **Your prediction** with the slider, and press **Reveal**. Each text gets one prediction.
- **Compare:** the sim splits the text into pieces, shows the true token count next to the four-character estimate, and says "Close" (within 2 tokens) or how far off you were. Hover over any piece to see its exact characters. A dot (·) marks a leading space.
- **Repeat** for all five texts. The table keeps every revealed split.
- **Final question:** after the fifth text, pick the row the four-character rule underestimates by more than 50% and press **Check**. You get two attempts.
- The splits are illustrative: real tokenizers differ.

## Lesson Plan

**Grade level:** Adult continuing education and professional development. **Time:** 12 minutes.

1. **Recall (1 min).** Ask learners to state the rule of thumb: one token is about four characters, or three-quarters of a word.
2. **Predict and reveal (6 min).** Learners predict each of the five texts before revealing it. They write their prediction on paper first so they cannot adjust it after the reveal.
3. **Compare (3 min).** Using the table, learners compute 1.5 times the estimate for each row and find the one row where the tokens exceed it. They answer the final question.
4. **Discuss (2 min).** Ask which kinds of text in a real prompt (code, numbers, logs, plain English) would make the four-character rule least reliable for estimating cost.

**Misconceptions to watch for:**

- One word is always one token. The long word in row 3 becomes 10 pieces.
- The four-character rule works equally well for every kind of text. It fits row 1 exactly and badly underestimates the number in row 5.
- Every tokenizer splits text the same way. The splits shown are illustrative, and real tokenizers split differently.
- Learners often pick row 3 because it has the most tokens. The question asks about the gap between tokens and the estimate, not the largest count.

## Specification

The full specification below is extracted from
[Chapter 10: Tokens, Prompt Caching, and Token Pricing](../../chapters/10-tokens-caching-pricing/index.md).

```text
Type: microsim
**sim-id:** token-split-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/token-efficiency/tree/main/docs/sims/interactive-tokenizer-explorer<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** compare<br/>
**Learning Objective:** The learner will compare their predicted token count with the illustrative split for each of five short texts, and identify the one text that the four-characters-per-token rule underestimates by more than 50%.

**Prerequisites:** token, tokenizer, four-characters-per-token rule of thumb (all defined in the section "The Token" above).

**Evidence of Mastery:** For each of the five texts, the learner commits a predicted token count before the split is revealed. After all five reveals, the learner answers "Which text did the four-character rule underestimate by more than 50%?" The answer is correct when it names the text in row 5 of the Content table. Reading the reveal and hovering over pieces are exploration, not evidence.

**Misconceptions:** (1) One word is always one token. (2) The four-character rule works equally well for every kind of text. (3) Every tokenizer splits text the same way.

**Instructional Rationale:** Predicting before the reveal makes the learner commit to a mental model of tokens, and the reveal creates the mismatch that corrects it. Comparing prediction to split for five contrasting kinds of text lets the learner see where the rule holds and where it fails.

**Content:**

All token splits below are illustrative and the sim must label them "illustrative: real tokenizers differ".

| # | Text shown | Characters | Illustrative pieces | Tokens | Four-character estimate | Reason shown after reveal |
|---|---|---|---|---|---|---|
| 1 | Grab only what you need! | 24 | Grab, " only", " what", " you", " need", ! | 6 | 6.0 | Common words are one token each, so the rule fits ordinary English. |
| 2 | ScreenGrab | 10 | Screen, Grab | 2 | 2.5 | A joined name splits at its natural word boundary. |
| 3 | Supercalifragilisticexpialidocious | 34 | Super, cal, if, rag, il, istic, exp, ial, id, ocious | 10 | 8.5 | A rare long word breaks into many short pieces. |
| 4 | swift build -c release | 22 | swift, " build", " -", c, " release" | 5 | 5.5 | Command-line text splits at spaces and symbols. |
| 5 | 1,150,000 | 9 | 1, ",", 150, ",", 000 | 5 | 2.25 | Digits and separators each become their own piece, so the rule underestimates numbers. |

**Provenance:** The five texts are chosen by the chapter author. The pieces and counts are illustrative, not the output of a named tokenizer. The characters and four-character estimates are computed from the Rules.

**Rules:** Four-character estimate = characters / 4, shown to two decimals. A prediction is an integer from 1 to 40 (min 1, max 40, step 1, default 5). A prediction is "close" when |prediction - tokens| <= 2. The rule underestimates a text when tokens > 1.5 x estimate. Only row 5 meets this (5 > 1.5 x 2.25 = 3.375); row 3 does not (10 < 12.75).

**Learner Activity:**

1. The learner reads text 1 and sets a predicted token count.
2. The learner presses Reveal. The text is shown split into its pieces, with the true token count, the four-character estimate, and whether the prediction was close.
3. The learner repeats for texts 2 to 5 in order. A revealed split stays visible and cannot be re-predicted.
4. After the fifth reveal, a table of all five rows appears and the learner picks the text that the rule underestimates by more than 50%.
5. The learner should notice that the rule is good for ordinary English and poor for numbers.

**Feedback:** Five predictions, fixed order, one attempt each. After each reveal the sim states "Close" or "Off by N tokens" and shows the Reason text for that row. The final question allows two attempts. Correct: "Row 5: digit groups and commas each count as a token." Incorrect: "Compare tokens with the estimate in each row; the rule underestimates when tokens exceed 1.5 times the estimate." After the second wrong attempt the correct row is revealed. A score shows "Predictions close: n of 5".

**Starting State:** Text 1 is shown with the prediction at 5. The question on screen is "How many tokens will this take?"

**Chapter Anchors:** The chapter states one token is about four characters or three-quarters of a word. The chapter's table lists the same five texts with the same counts: 6, 2, 10, 5, 5.
```

## Related Resources

- [Chapter 10: Tokens, Prompt Caching, and Token Pricing](../../chapters/10-tokens-caching-pricing/index.md)
