---
title: "Tokens, Prompt Caching, and Token Pricing"
description: "How the token, the context window, input and output tokens, and prompt caching combine with token pricing to determine what an AI coding session costs."
date: "2026-11-01 20:08:42"
generated_by: claude skill chapter-content-generator
version: 1.11
---

# Tokens, Prompt Caching, and Token Pricing

## Summary

This chapter opens up the unit that AI work is billed in. It explains the token, the context window, input and output tokens, prompt caching, cache writes, reads, and expiration, then shows how token pricing and model capability tiers combine in model selection. After this chapter, you will be able to list the token types that determine API cost and explain why each is priced differently.

## Concepts Covered

This chapter covers the following 11 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Token | 106 |
| Input Tokens | 45 |
| Output Tokens | 14 |
| Context Window | 32 |
| Prompt Caching | 31 |
| Cache Write Tokens | 14 |
| Cache Read Tokens | 14 |
| Cache Expiration | 2 |
| Token Pricing | 13 |
| Model Capability Tiers | 2 |
| Model Selection | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 5: Generative AI and Coding Agents](../05-generative-ai-coding-agents/index.md)

---

!!! mascot-welcome "A Price Tag on Every Word"
    ![Pinch waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    The ScreenGrab build cost about $14, and by the end of this chapter you will know exactly which parts of that bill came from where. You will be able to read a usage report the way you read a grocery receipt. Grab only what you need!

Chapter 5 described a coding agent as a loop: it reads, it thinks, it writes, and it runs your tools. This chapter looks at the same loop through the billing meter. Every step of that loop is counted in one unit, and the price of that unit changes depending on what the step was doing. Once you can read that meter, the $6 and $14 figures in the ScreenGrab story stop being magic numbers and become arithmetic you can check.

## The Token

A **token** is the smallest piece of text that a language model reads or writes. It is not quite a word and not quite a letter. Before a model sees your request, a program called a tokenizer chops the text into pieces from a fixed vocabulary of common fragments. Short common words such as "the" or "need" are usually one token. Long or rare words are split into several pieces. Punctuation, spaces, digits, and code symbols also count.

A widely used rule of thumb for English prose is that one token is about four characters, or about three-quarters of a word. That rule is only an average. The exact split depends on the model's tokenizer, so two vendors can count the same sentence differently. The splits in this chapter are illustrative: they show the pattern, not any one vendor's exact output.

Tokens matter for three reasons. They are the unit of **billing**, because vendors charge per million tokens. They are the unit of **limits**, because a model can only hold a fixed number of tokens at once, a limit we meet shortly as the context window. And they are the unit of **time**, because a model produces its answer one token after another, so longer answers take longer.

Here is how the pattern looks on five short texts. The "four-character estimate" column divides the character count by four.

| Text | Characters | Illustrative split | Tokens | Four-character estimate |
|---|---|---|---|---|
| `Grab only what you need!` | 24 | Grab / only / what / you / need / ! | 6 | 6.0 |
| `ScreenGrab` | 10 | Screen / Grab | 2 | 2.5 |
| `Supercalifragilisticexpialidocious` | 34 | Super / cal / if / rag / il / istic / exp / ial / id / ocious | 10 | 8.5 |
| `swift build -c release` | 22 | swift / build / - / c / release | 5 | 5.5 |
| `1,150,000` | 9 | 1 / , / 150 / , / 000 | 5 | 2.25 |

Ordinary English lands close to the rule. A rare word costs somewhat more. Numbers and symbols cost the most, because each digit group and each comma is its own piece. This matters in a coding session, where much of the text is code, file paths, and numbers.

!!! mascot-thinking "Think in Tokens, Not Words"
    ![Pinch thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    A model never sees your sentence; it sees a numbered list of fragments. Every price in this chapter is a price per fragment, so counting fragments is the first step of every cost estimate.

#### Worked example: tokens in a small program

ScreenGrab has about 2,000 lines of Swift in its app code. If a line of Swift averages roughly 10 tokens (an illustrative figure, since code varies), the finished app code is about 20,000 tokens. Yet the first install stage in the course description used about 206,000 output tokens. The gap is not waste. Output tokens also include the agent's reasoning, the tests, the scripts, the specification, the README, and every draft that was rewritten. The finished files are only a fraction of what the model wrote on the way there.

Try the estimate yourself before the sim reveals the answers.

#### Diagram: Token Split Explorer

<details markdown="1">
<summary>Token Split Explorer</summary>
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
</details>

## Input Tokens

**Input tokens** are all the tokens you send to the model on a request. That sounds like "my question", but in a coding session the question is a tiny part of it. Each request carries the whole working context again. A model has no memory between requests, so the agent must resend everything the model needs to continue the job.

In a coding session, the input includes several layers that the following table separates. The first two layers do not change from turn to turn, and the last three grow as the session proceeds.

| Layer of input | What it holds | Changes between turns? |
|---|---|---|
| Instructions | The agent's system prompt and your project rules, such as the `CLAUDE.md` file | No |
| Tool definitions | Descriptions of what the agent may do: read a file, run a command | No |
| Conversation history | Every earlier request and reply in the session | Grows each turn |
| File contents | Source files the agent has read | Grows as it reads more |
| Tool results | Compiler errors, test output, command output | Grows each turn |

Two of these layers are bigger than they look. The instructions and tool definitions together can run to thousands of tokens before you type a word. File contents also stay: if the agent reads a 500-line Swift file at roughly 10 tokens a line (an illustrative figure), that adds about 5,000 tokens, and those 5,000 tokens ride along in the history on every later turn, whether or not the agent still needs the file.

Because history is resent on every turn, input does not grow in a straight line. If each turn adds 2,000 tokens, the history after turn \( n \) holds \( 2000n \) tokens, and the total sent over \( n \) turns is the sum of those histories.

#### Total Input Sent Over a Session

\[ T_{\text{sent}} = \sum_{k=1}^{n} (a \cdot k) = a \cdot \frac{n(n+1)}{2} \]

where:

- \( T_{\text{sent}} \) is the total input tokens sent across the whole session
- \( a \) is the number of tokens added per turn
- \( n \) is the number of turns
- \( k \) is the turn number

#### Worked example: a 40-turn session

Set \( a = 2000 \) and \( n = 40 \). Then \( T_{\text{sent}} = 2000 \times 40 \times 41 / 2 = 1{,}640{,}000 \) tokens. At $5 per million input tokens, the plain cost is \( 1.64 \times 5 \) = $8.20. The conversation itself ends at only \( 2000 \times 40 = 80{,}000 \) tokens, so the agent has paid to send about 20 times the final conversation. This is the problem prompt caching exists to solve, and the next sections show how it solves it.

!!! mascot-warning "The Hidden Re-Send"
    ![Pinch warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    It is easy to think a long session costs "what I typed". It costs what was resent, every turn. If a session feels expensive, look at how large the history has become before you blame the last question, and start a fresh session when the old context no longer helps.

## Output Tokens

**Output tokens** are the tokens the model writes in reply. In a coding session that means code, tests, shell commands, edits, and the model's visible reasoning. Output tokens are the most expensive kind. In the price table used by this book, output costs four times as much as a plain input token, and 100 times as much as a cached read.

Output also includes the model's reasoning when the tool shows or bills it, so a hard problem can produce thousands of output tokens before a single line of code appears. Output is expensive because it is slow and sequential. A model processes input in parallel, but it must produce output one token at a time, each token depending on the one before. That uses the vendor's computing hardware far longer per token.

#### Worked example: what 206,000 output tokens cost

In the first stage of the ScreenGrab build, the agent wrote about 206,000 output tokens. At $20 per million, that is \( 0.206 \times 20 \) = $4.12. The same stage used only about 500,000 new tokens in total, so output was roughly 41% of the new tokens but about 74% of the stage's spend ($4.12 of $5.59, counting the other 294,000 new tokens at $5 per million). Writing is the costly activity, which is why concise specifications (Chapter 7) that keep the agent from writing unneeded code save real money.

## The Context Window

The **context window** is the maximum number of tokens a model can consider at one time. It holds the input and the output together. Think of it as the model's desk: everything on the desk is visible, and nothing off the desk exists. Depending on the model, windows range from tens of thousands of tokens to over a million. Vendors raise these limits regularly, so check the current figure for the model you use.

When the history gets close to the limit, a coding agent usually compacts it: it asks the model to write a summary, then continues from the summary instead of the full history. Compaction keeps the session alive and shrinks later input, but the summary is lossy, and the summarizing step itself costs input and output tokens. The window matters to cost in two ways. First, when the history approaches the limit the agent must drop or summarize earlier material, and details can be lost. Second, a bigger window invites bigger prompts, and bigger prompts mean more input tokens on every turn.

#### Worked example: how full is the desk?

Using the 40-turn session above, the history after turn 40 holds 80,000 tokens plus the fixed instructions and tool definitions. If those add 20,000 tokens, the context holds 100,000 tokens. In a model with a 200,000-token window that is half full. Another 40 turns at the same pace would add 80,000 more, reaching 180,000 and leaving almost no room for the next answer. A long session therefore has a natural limit even before cost becomes a problem.

## Prompt Caching

**Prompt caching** lets the vendor keep the already-processed beginning of a prompt, so that the next request which starts with the same material does not pay full price to process it again. The cache is matched from the start of the prompt, so it works on a *prefix*: the stable material at the front.

Think of Pinch moving house. Without caching, you pack and unpack the whole shell every morning. With caching, the shell stays packed and you only carry in what changed since yesterday.

#### Worked example: 40 turns over 100,000 tokens

Suppose a 100,000-token project context is sent on each of 40 turns. Without caching, each turn pays the input price, so the cost is \( 40 \times 100{,}000 = 4{,}000{,}000 \) tokens, or 4 million tokens at $5 per million, which is $20.00. With caching, the first turn writes the context to the cache and the other 39 turns read it, at prices set out in the next two sections. The total falls to $1.28, a saving of about 94%.

!!! mascot-warning "Keep the Front of the Prompt Still"
    ![Pinch warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A cache matches from the first token onward, so changing something near the start of a prompt makes everything after it a miss. Keep stable material, such as rules and tool lists, at the front, and put the changing material at the end. If your reads suddenly drop to zero, look for an edit near the top.

## Cache Write Tokens

**Cache write tokens** are the input tokens the vendor stores in the cache the first time it sees them. A write is the setup cost: you pay to process and keep the material so that later requests can reuse it. Some vendors charge a premium for writes over the plain input price. This book's estimates follow the course description and price writes the same as plain input, at $5 per million, which keeps the arithmetic simple.

Some vendors charge a premium for writes. As a hypothetical, with a 25% premium the first-turn write above would cost $0.625 instead of $0.50, a difference of about 12 cents on a $1.28 total, so the saving stays large. Every turn also writes. The new request and the new reply added since the last turn were not in the cache, so they are written for the first time and become part of the cached prefix for the next turn.

#### Worked example: the first turn

In the 100,000-token project context example, the first turn writes 100,000 tokens. At $5 per million that costs \( 0.1 \times 5 \) = $0.50. That $0.50 is the entire up-front price of the cache. If the session ends after one turn, caching has saved nothing and cost nothing extra in this book's price model; the benefit only starts on turn two.

## Cache Read Tokens

**Cache read tokens** are the input tokens served from the cache instead of being processed again. A read is the cheap part of caching. In this book's price table, a cache read costs $0.20 per million tokens, which is one twenty-fifth of the $5 plain input price.

A read is cheap because the vendor stores the work it already did on that prefix and reuses it, instead of computing it again. The discount is steep: \( 1 - 0.20/5 = 96\% \) off the plain input price. In a long coding session, cache reads dominate the token count by a wide margin. The whole ScreenGrab session used about 18.9 million cache reads but only about 1.15 million new tokens. Reads are numerous because the growing history is read again on nearly every turn.

#### Worked example: the 39 reads

Continue the example above. Turns 2 to 40 each read the 100,000-token context from the cache, which is 39 reads and 3.9 million tokens. At $0.20 per million, that costs \( 3.9 \times 0.20 \) = $0.78. Add the $0.50 write from turn one, and the total is $1.28. Compare the growing-history example from the Input Tokens section: with caching, the 80,000 tokens written cost $0.40 and the earlier history read again costs 1.56 million tokens times $0.20 per million, or $0.31, for a total of about $0.71 against $8.20 uncached.

## Cache Expiration

**Cache expiration** is the rule that a cached prefix is discarded if it is not used within a time limit. A typical default lifetime is a few minutes, and each read usually renews it, but exact limits and options differ by vendor and change over time. If you step away from a session for longer than the lifetime, the next request pays to write the context again. This is why a burst of fast work is cheaper than the same work spread across a day.

!!! mascot-tip "Check the Cache Line"
    ![Pinch giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    After a long pause, look at the next usage report. If cache reads are near zero and cache writes jumped, the cache expired and you paid to rebuild it. Finish a chunk of related work in one sitting to avoid that.

## Token Pricing

**Token pricing** is the vendor's published price per million tokens for each token type. Four token types matter for estimating cost: output, plain input, cache writes, and cache reads. The prices below are the ones the course description uses for Claude Opus 5.5, with writes priced the same as plain input. These are the book's assumptions, and vendors change prices, so always check the current price page before you plan a real project.

| Token type | Price per million tokens | Relative to plain input |
|---|---|---|
| Output | $20.00 | 4 times |
| Plain input and cache write | $5.00 | 1 time |
| Cache read | $0.20 | one twenty-fifth |

The cost of a request is the sum over the token types of each count times its price.

#### Cost of a Request

\[ C = \frac{N_{\text{out}} \cdot p_{\text{out}} + N_{\text{new}} \cdot p_{\text{in}} + N_{\text{read}} \cdot p_{\text{read}}}{1{,}000{,}000} \]

where:

- \( C \) is the cost in dollars
- \( N_{\text{out}} \) is the number of output tokens
- \( N_{\text{new}} \) is the number of new input tokens, including cache writes
- \( N_{\text{read}} \) is the number of cache read tokens
- \( p_{\text{out}} = 20 \), \( p_{\text{in}} = 5 \) and \( p_{\text{read}} = 0.20 \) are the prices in dollars per million tokens

#### Worked example: the whole session

The ScreenGrab session had 325,000 output tokens, 825,000 other new tokens (1.15 million new minus 325,000 output), and 18.9 million cache reads. Then \( C = (325{,}000 \times 20 + 825{,}000 \times 5 + 18{,}900{,}000 \times 0.20) / 1{,}000{,}000 = 6.50 + 4.13 + 3.78 \) = $14.41, which the course description rounds to about $14.

The next sim lets you change the context size and number of turns and see how the totals move.

#### Diagram: Prompt Cache Cost Calculator

<details markdown="1">
<summary>Prompt Cache Cost Calculator</summary>
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
</details>

## Model Capability Tiers

**Model capability tiers** are the levels a vendor offers within one family of models, typically a large, a medium, and a small model. Larger models reason better on hard problems and cost more per token. As an illustration only, a small model might cost one-fifth of the largest model per token, with the medium model in between; check each vendor's price page for real ratios. Smaller models are faster and cheaper but make more mistakes on complex work. The ScreenGrab session shows both ends: it started on the cheaper Sonnet 5.5 and the cost estimate applies Opus 5.5 prices.

## Model Selection

**Model selection** is the choice of which tier to use for which job. A sound habit is to start with the cheapest tier that could plausibly do the work, and move up only when it fails. Switching tiers mid-session has a catch: a cache belongs to one model, so a switch means the new model writes the context again. Use a larger model for the design, the tricky debugging, and the review. Use a smaller one for routine edits and boilerplate.

!!! mascot-celebration "You Can Read the Meter"
    ![Pinch celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now separate tokens into output, new input, cache writes, and cache reads, and say why each is priced differently. That is the whole toolkit for estimating the cost of an AI session, and Chapter 11 puts it to work on ScreenGrab.

## Key Takeaways

- A token is a text fragment of about four characters, and it is the unit of billing, limits, and time.
- Input is resent on every turn, so total input grows much faster than the conversation itself.
- Output is the most expensive token type, at four times plain input in this book's price table.
- Prompt caching pays a one-time write and then cheap reads, which saved about 94% in the 40-turn example.
- Caches expire, so keep related work together and keep the front of the prompt stable.
- Choose the cheapest model tier that can do the job.

[See Annotated References](./references.md)
