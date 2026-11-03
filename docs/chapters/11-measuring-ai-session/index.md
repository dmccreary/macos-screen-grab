---
title: "Measuring an AI Session: Time and Cost"
description: "How to measure the time and token cost of an AI coding session, state the assumptions behind an estimate, and break the ScreenGrab session into its cost components."
date: "2026-11-01 20:08:42"
generated_by: claude skill chapter-content-generator
version: 1.11
---

# Measuring an AI Session: Time and Cost

## Summary

This chapter applies token pricing to the real ScreenGrab session. It separates wall-clock time from active working time, makes estimation assumptions explicit, and works through API cost estimates, subscription usage windows, cost per line of code, and session cost breakdowns. After this chapter, you will be able to estimate a session's API cost from its token counts and identify which activities used the most tokens.

## Concepts Covered

This chapter covers the following 11 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Wall-Clock Time | 3 |
| Active Working Time | 1 |
| Time To First Install | 1 |
| Usage Measurement | 12 |
| Estimation Assumptions | 11 |
| API Cost Estimate | 10 |
| Subscription Usage Window | 2 |
| Cost-Weighted Tokens | 1 |
| Cost Per Line Of Code | 1 |
| Session Cost Breakdown | 3 |
| Token-Heavy Activities | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 3: Licenses, Subscriptions, and Vendor Incentives](../03-licenses-subscriptions/index.md)
- [Chapter 5: Generative AI and Coding Agents](../05-generative-ai-coding-agents/index.md)
- [Chapter 9: Generating, Building, and Installing the Code](../09-generating-building-installing/index.md)
- [Chapter 10: Tokens, Prompt Caching, and Token Pricing](../10-tokens-caching-pricing/index.md)

---

!!! mascot-welcome "Check the Receipt"
    ![Pinch waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    A claim like "it only cost $6" is worth exactly as much as the arithmetic behind it. In this chapter you will rebuild that number from raw token counts, and then see which part of the session did the spending. Grab only what you need!

Chapter 10 gave you the price list. This chapter shows you how to use it on a real session. The goal is a habit: whenever someone reports what an AI build cost or how long it took, you can ask what was measured, what was assumed, and whether the arithmetic holds.

## Measuring Time

Time can be measured two ways, and the ScreenGrab story uses both, so it pays to keep them apart.

**Wall-clock time** is the elapsed real time on the clock, from a starting event to an ending event, including every pause. If you start a session at 9:00 and the app is installed at 9:36, the wall-clock time is 36 minutes, even if you spent ten of those minutes making coffee.

**Active working time** is the time the agent or the person was actually working, with idle gaps removed. It is always less than or equal to wall-clock time. The ScreenGrab session ran for about 70 active minutes, counted this way.

**Time to first install** is the wall-clock time from the first prompt to a working installed app. For ScreenGrab that was about 36 minutes. It is the number most useful to a would-be builder, because it answers "how long until I have something I can use?" The first real screen grab came about 44 minutes after the first prompt.

The three measures fit on one timeline of the ScreenGrab session, with every figure from the course description:

| Moment | Minutes from first prompt | Measure |
|---|---|---|
| App built and installed | about 36 | Time to first install (wall-clock) |
| First real screen grab | about 44 | Wall-clock |
| Session complete | not reported as wall-clock | About 70 active minutes |

Wall-clock numbers are what you would see on a stopwatch from the first prompt. The active-time figure removes idle gaps, so it is the one to use if you ask how much working time a similar build takes.

Putting time and output together gives a rate. The first install produced about 5,200 lines in about 36 minutes, which is roughly 144 lines per minute. No human types that fast, but a rate like this says nothing about quality, which is the subject of Chapters 12 and 13.

## Usage Measurement

**Usage measurement** is the practice of recording how many tokens of each type a session used. Coding agents keep a usage record for each request, listing input tokens, output tokens, cache writes, and cache reads. Summing the records over a session gives the totals that the cost formula needs.

Different tools label the totals differently, so read the labels before you use them. The course description reports "new tokens, including output", which means output is counted inside the new-token figure. To price the rest at the plain input price, you subtract output from the new tokens.

#### Worked example: reading the totals

For the whole ScreenGrab session the record shows about 1.15 million new tokens including output, about 325,000 output tokens, and about 18.9 million cache reads. Subtracting gives the other new tokens: \( 1{,}150{,}000 - 325{,}000 = 825{,}000 \). Those are the tokens that were not output and were not read from the cache, which means they were sent for the first time and written to the cache. If you forget the subtraction and price all 1.15 million new tokens as plain input and then also add output, you count the output twice.

!!! mascot-warning "Don't Count Output Twice"
    ![Pinch warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A usage report that says "new tokens, including output" has already folded output into the total. Subtract the output tokens first, then price the remainder as input, or your estimate comes out too high. Check by confirming that your three counts add up to the report's total.

## Estimation Assumptions

An **estimation assumption** is any choice you make to turn measured usage into a dollar figure when the measurement alone does not say. Every cost estimate hides some. A trustworthy estimate lists them. These are the assumptions behind the $6 and $14 figures:

- All tokens are priced at Claude Opus 5.5 rates: $20 per million output, $0.20 per million cache reads, and $5 per million for everything else.
- All other new tokens are treated as cache writes at $5 per million, the same as plain input.
- The session actually started on the cheaper Sonnet 5.5, so applying Opus prices probably overstates cost.
- The session ran on a subscription, so no API bill was ever sent. The estimate is "what it would have cost at API prices".
- The figures cover the code only. They exclude generating this textbook, the author's time, and later maintenance.
- Token counts are rounded to "about" values.

Assumptions can push the answer in either direction, and it helps to check how much they matter.

#### Worked example: how much does one assumption move the answer?

Suppose a vendor charged 25% more for cache writes than for plain input, which is a hypothetical for this exercise. The 825,000 other new tokens would cost \( 825{,}000 \times 6.25 / 1{,}000{,}000 \) = $5.16 instead of $4.13, a difference of about $1.03 on a $14.41 total, or about 7%. The headline stays near $14 to $15, which tells you that this particular assumption is not the one that matters most. The price tier is: Sonnet pricing would lower the whole figure far more.

## API Cost Estimate

An **API cost estimate** is the dollar cost a session would have had if it had been billed per token by the vendor's programming interface. Chapter 10 gave the formula. Apply it to each token type and add the results.

The course description reports three stages of the ScreenGrab session. This table sets out the token counts again, then the arithmetic for the "other new" tokens (new tokens minus output).

| Stage | New tokens (incl. output) | Output | Other new | Cache reads |
|---|---|---|---|---|
| Built and installed | 500,000 | 206,000 | 294,000 | 3.8 million |
| First real grab | 573,000 | 238,000 | 335,000 | 6.3 million |
| Whole session | 1,150,000 | 325,000 | 825,000 | 18.9 million |

#### Worked example: the "built and installed" stage

Output: \( 206{,}000 \times 20 / 1{,}000{,}000 \) = $4.12 (output at $20 per million). Other new: \( 294{,}000 \times 5 / 1{,}000{,}000 \) = $1.47. Cache reads: \( 3{,}800{,}000 \times 0.20 / 1{,}000{,}000 \) = $0.76. The total is \( 4.12 + 1.47 + 0.76 \) = $6.35, which the course description rounds to about $6. Repeating the steps for the other two rows gives about $7.70 for the first real grab (reported as about $8) and about $14.41 for the whole session (reported as about $14).

Use the next sim to check your own arithmetic against these rows and then try different prices.

#### Diagram: Session Cost Estimator

<iframe src="../../sims/session-cost-estimator/main.html" height="694px" width="100%" scrolling="no"></iframe>

[Run the Session Cost Estimator MicroSim Fullscreen](../../sims/session-cost-estimator/main.html){ .md-button .md-button--primary }

<details markdown="1">
<summary>Session Cost Estimator</summary>
Type: microsim
**sim-id:** session-cost-estimator<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/token-efficiency/tree/main/docs/sims/openai-token-usage-anatomy<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the estimated API cost of each of the three ScreenGrab session stages from its token counts and the stated prices, to within $0.02.

**Prerequisites:** output tokens, other new tokens, cache read tokens, token pricing, API cost estimate (all defined in the chapter above this block).

**Evidence of Mastery:** For each of the three stages, the learner types the total estimated cost before the sim shows its value. An answer is correct when it is within $0.02 of the model value. Mastery is 3 of 3 correct. Changing the prices in free exploration is exploration, not evidence.

**Misconceptions:** (1) The "new tokens" figure excludes output. (2) Cache reads, being most of the tokens, must be most of the cost. (3) All tokens in a session are priced the same.

**Instructional Rationale:** Apply-level calculation needs practice with a check, so the learner commits a number before the result is shown. The what-if exploration afterward lets the learner see how sensitive the total is to each price.

**Content:**

Token counts per stage (from the chapter section "API Cost Estimate"):

| # | Stage | New tokens including output | Output tokens | Cache reads |
|---|---|---|---|---|
| 1 | Built and installed | 500,000 | 206,000 | 3,800,000 |
| 2 | First real grab | 573,000 | 238,000 | 6,300,000 |
| 3 | Whole session | 1,150,000 | 325,000 | 18,900,000 |

Default prices in dollars per million tokens: output 20.00, other new tokens 5.00, cache reads 0.20. Adjustable prices for free exploration:

| Price | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Output | 5.00 | 30.00 | 1.00 | 20.00 | dollars per million tokens |
| Other new tokens | 1.00 | 10.00 | 1.00 | 5.00 | dollars per million tokens |
| Cache reads | 0.05 | 1.00 | 0.05 | 0.20 | dollars per million tokens |

Challenge answers at the default prices:

| # | Output cost | Other new cost | Cache read cost | Total | Feedback when wrong |
|---|---|---|---|---|---|
| 1 | $4.12 | $1.47 | $0.76 | $6.35 | Other new = 500,000 - 206,000 = 294,000 tokens x $5 per million = $1.47. Add output $4.12 and reads $0.76. |
| 2 | $4.76 | $1.68 | $1.26 | $7.70 | Other new = 573,000 - 238,000 = 335,000 tokens x $5 per million = $1.675, shown as $1.68. Add output $4.76 and reads $1.26. |
| 3 | $6.50 | $4.13 | $3.78 | $14.41 | Other new = 1,150,000 - 325,000 = 825,000 tokens x $5 per million = $4.125, shown as $4.13. Add output $6.50 and reads $3.78. |

**Provenance:** Token counts and default prices are from docs/course-description.md and the chapter section "API Cost Estimate". The sim must label the prices "book assumptions: check current vendor pricing". Costs are computed from the Rules.

**Rules:** Other new tokens = new tokens including output - output tokens. Cost per type = tokens x price / 1,000,000. Total = sum of the three. Amounts are rounded half up to the nearest cent for display, and the total is computed before rounding (stage 2 is 7.695, shown $7.70; stage 3 is 14.405, shown $14.41).

**Learner Activity:**

1. The learner reads the token counts for stage 1 and types the total estimated cost.
2. The learner presses Check. The sim shows the three component costs and the total beside the learner's answer.
3. The learner repeats for stages 2 and 3 in order.
4. After stage 3, free exploration unlocks. The learner changes any of the three prices and all three stage totals update at once.
5. The learner should notice that changing the output price moves the total more than changing the cache read price, even though cache reads are far more numerous.

**Feedback:** Three stages, fixed order, two attempts each. Correct: "Correct: about $X." Incorrect: the "Feedback when wrong" text for that stage. After the second wrong attempt the model total and worked calculation are shown and the stage counts as missed. A running count "Stages correct: n of 3" is shown.

**Starting State:** Stage 1 is shown with the token counts and an empty answer box. The question on screen is "What would this stage have cost at API prices?"

**Chapter Anchors:** The chapter states about $6.35 for built and installed (reported as about $6), about $7.70 for the first real grab (reported as about $8), and about $14.41 for the whole session (reported as about $14), using $20, $5, and $0.20 per million.
</details>

## Subscription Usage Window

A **subscription usage window** is a block of time, often five hours, during which a flat-fee plan lets you use a limited amount of AI work before it pauses you. Instead of sending a bill per token, the plan meters usage against the window and resets it. The ScreenGrab build ran on such a plan, and the course description reports that it used about 5% of one five-hour window.

That 5% is a reported observation, not a conversion. Plans do not publish how they weigh output against cache reads, so you cannot reliably turn 5% into dollars. What you can say is that the whole first build fit inside a small fraction of one window.

## Cost-Weighted Tokens

**Cost-weighted tokens** are a session's tokens converted to a common unit by weighting each type by its price relative to output. Using the book's prices, output has weight 1, other new tokens have weight 0.25 (because $5 is a quarter of $20), and cache reads have weight 0.01.

For the whole session: \( 325{,}000 \times 1 + 825{,}000 \times 0.25 + 18{,}900{,}000 \times 0.01 = 325{,}000 + 206{,}250 + 189{,}000 = 720{,}250 \) output-equivalent tokens. That is about 3.6% of the 20.05 million raw tokens, and it equals the cost divided by the output price: \( 14.405 / 20 = 0.72025 \) million. Raw token counts overstate what a session "weighs"; cost-weighted tokens do not. The weights come from the price list, so if prices change the weights change, and the unit is only comparable between sessions priced the same way.

## Cost Per Line of Code

**Cost per line of code** divides the session's cost by the number of lines it produced. The result is a rough yardstick, not a quality measure. With about 5,200 lines at first install, the build stage cost \( 6.35 / 5{,}200 \) = $0.0012 per line, or about 0.12 cents. The whole session works out at \( 14.405 / 5{,}200 \) = $0.0028 per line, about 0.28 cents.

Cost per line is useful for comparison across your own sessions, and misleading across projects, because a line of test code and a line of installer script are not the same effort. Treat this with care. Lines include tests, scripts, and documents, not only the 2,000 lines of Swift, and a cheap line that is wrong costs more than an expensive one that is right.

## Session Cost Breakdown

A **session cost breakdown** divides a session's total cost among its token types, so you can see which type drives the bill. The table below puts the token shares next to the cost shares for the whole session, so you can compare them.

| Token type | Tokens | Share of tokens | Cost | Share of cost |
|---|---|---|---|---|
| Output | 325,000 | 1.6% | $6.50 | 45.1% |
| Other new (writes) | 825,000 | 4.1% | $4.13 | 28.6% |
| Cache reads | 18,900,000 | 94.3% | $3.78 | 26.2% |
| Total | 20,050,000 | 100% | $14.41 | about 100% (shares are rounded) |

Cache reads are 94% of the tokens but only 26% of the cost. Output is under 2% of the tokens and 45% of the cost. A chart of tokens alone would send you looking in the wrong place.

!!! mascot-thinking "Count and Cost Are Different Rulers"
    ![Pinch thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Look at the two share columns. The biggest slice by count is the smallest slice by cost, which is why the question "what used the most tokens?" and the question "what cost the most?" can have different answers.

Try the comparison yourself before the chart reveals it.

#### Diagram: Token Share Versus Cost Share Chart

<iframe src="../../sims/token-share-versus-cost-share/main.html" height="695px" width="100%" scrolling="no"></iframe>

[Run the Token Share Versus Cost Share Chart MicroSim Fullscreen](../../sims/token-share-versus-cost-share/main.html){ .md-button .md-button--primary }

<details markdown="1">
<summary>Token Share Versus Cost Share Chart</summary>
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
</details>

## Token-Heavy Activities

**Token-heavy activities** are the kinds of work that consume the most tokens, and they differ by token type. Writing large amounts of code, tests, and documents drives output tokens. Reading many files or long command output drives new input tokens. Long sessions with a large history drive cache reads, because each step re-reads the whole context.

ScreenGrab shows the pattern. In the first 36 minutes the agent produced about 5,200 lines and used 206,000 output tokens and 3.8 million cache reads. In the rest of the session, which covered further testing and hotkey checks, output rose by only 119,000 tokens, yet cache reads rose by 15.1 million and the estimated cost by about $8.06. About 80% of all cache reads, and 56% of the cost, came after the app was installed. Checking the software was not free, because every check re-read a large context.

!!! mascot-tip "Restart a Bloated Session"
    ![Pinch giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    When a task is finished and the next one is unrelated, begin a fresh session. The new session starts with a small history, so its cache reads stay small. Carry over only the notes you need.

## Key Takeaways

An estimate is only as good as its stated assumptions, and a cost figure is only as good as the usage record behind it. Wall-clock time, active working time, and time to first install each answer a different question, so say which one you mean. Chapter 12 turns from what the session cost to whether the software it produced actually works.

!!! mascot-celebration "You Can Audit an AI Bill"
    ![Pinch celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now turn a usage record into a dollar estimate, state the assumptions behind it, and say which activity drove the spending. That is the skill that lets you question any "it only cost" claim, including the ones in this book.

[See Annotated References](./references.md)
