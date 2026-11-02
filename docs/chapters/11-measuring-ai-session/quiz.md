# Quiz: Measuring an AI Session: Time and Cost

Test your understanding of wall-clock and active time, estimation assumptions, API cost estimates, cost-weighted tokens, and session cost breakdowns with these review questions.

---

#### 1. What is wall-clock time?

<div class="upper-alpha" markdown>
1. The elapsed real time on the clock from a starting event to an ending event, including every pause
2. The time the agent spent writing code, with idle gaps removed
3. The time a cache entry remains valid
4. The time the compiler takes to build the app
</div>

??? question "Show Answer"
    The correct answer is **A**. If a session starts at 9:00 and the app is installed at 9:36, the wall-clock time is 36 minutes even if ten of those minutes went to making coffee. Option B describes active working time, which is always less than or equal to wall-clock time. The chapter urges you to say which of the time measures you mean, because each answers a different question.

    **Concept Tested:** Wall-Clock Time

    **See:** [Measuring Time](index.md#measuring-time)

---

#### 2. In the ScreenGrab case, what was the time to first install?

<div class="upper-alpha" markdown>
1. About 70 minutes
2. About 44 minutes
3. About 36 minutes
4. About 5 minutes
</div>

??? question "Show Answer"
    The correct answer is **C**. Time to first install is the wall-clock time from the first prompt to a working installed app, and for ScreenGrab it was about 36 minutes. It is the most useful number for a would-be builder because it answers how long until you have something usable. The first real screen grab came about 44 minutes after the first prompt, and the whole session took about 70 active minutes.

    **Concept Tested:** Time To First Install

    **See:** [Measuring Time](index.md#measuring-time)

---

#### 3. What is an estimation assumption?

<div class="upper-alpha" markdown>
1. A guarantee from the vendor about future prices
2. Any choice you make to turn measured usage into a dollar figure when the measurement alone does not say
3. A measurement taken directly from the usage record
4. A rounding rule for token counts only
</div>

??? question "Show Answer"
    The correct answer is **B**. Every cost estimate hides some assumptions, and a trustworthy estimate lists them. The chapter's list includes pricing all tokens at Opus 5.5 rates, treating other new tokens as cache writes, noting that the session ran on a subscription, and excluding the textbook, the author's time, and maintenance. Option C describes a measured fact, not an assumption.

    **Concept Tested:** Estimation Assumptions

    **See:** [Estimation Assumptions](index.md#estimation-assumptions)

---

#### 4. The chapter tests a hypothetical 25% premium on cache writes and finds the total barely moves. Which assumption does it say matters more?

<div class="upper-alpha" markdown>
1. The rounding of token counts
2. The number of files in the project
3. The color theme of the editor
4. The price tier, since Sonnet pricing would lower the whole figure far more than a write premium
</div>

??? question "Show Answer"
    The correct answer is **D**. A 25% write premium would add about $1.03 to a $14.41 total, roughly 7%. The session actually started on the cheaper Sonnet 5.5, but the estimate applies Opus 5.5 prices, so the headline probably overstates cost. Checking how far each assumption moves the answer tells you which ones to examine first. Options A, B, and C are not discussed as significant drivers.

    **Concept Tested:** Estimation Assumptions

    **See:** [Estimation Assumptions](index.md#estimation-assumptions)

---

#### 5. The first build used about 5% of one five-hour subscription usage window. Why can't you reliably convert that 5% into dollars?

<div class="upper-alpha" markdown>
1. Plans do not publish how they weigh output against cache reads, so the percentage is an observation, not a conversion
2. Because five hours is too short to measure
3. Because subscription plans have no usage limits
4. Because the percentage is always exactly $14
</div>

??? question "Show Answer"
    The correct answer is **A**. A subscription usage window is a block of time, often five hours, during which a flat-fee plan lets you do a limited amount of work. The 5% is a reported observation. What you can say is that the whole first build fit in a small fraction of one window. Option C is false, since the window itself is a usage limit, and option D confuses an observation with a price.

    **Concept Tested:** Subscription Usage Window

    **See:** [Subscription Usage Window](index.md#subscription-usage-window)

---

#### 6. Why are cost-weighted tokens a better yardstick than raw token counts?

<div class="upper-alpha" markdown>
1. They are always larger numbers
2. They weight each token type by its price relative to output, so cheap cache reads do not make a session look heavier than it is
3. They ignore output tokens entirely
4. They do not depend on prices
</div>

??? question "Show Answer"
    The correct answer is **B**. With the book's prices, output has weight 1, other new tokens 0.25, and cache reads 0.01. The ScreenGrab session's 20.05 million raw tokens weigh only 720,250 output-equivalent tokens, about 3.6%. The weights come from the price list, so if prices change the weights change, and the unit is comparable only between sessions priced the same way. Option D is therefore false.

    **Concept Tested:** Cost-Weighted Tokens

    **See:** [Cost-Weighted Tokens](index.md#cost-weighted-tokens)

---

#### 7. The usage record shows about 1.15 million new tokens including output and about 325,000 output tokens. How many other new tokens should be priced at the plain input rate?

<div class="upper-alpha" markdown>
1. 1,150,000
2. 325,000
3. 825,000
4. 1,475,000
</div>

??? question "Show Answer"
    The correct answer is **C**. Because the new-token figure already includes output, subtract: 1,150,000 − 325,000 = 825,000. These are tokens sent for the first time and written to the cache. If you price all 1.15 million new tokens as plain input and then add output separately, you count the output twice. Reading the labels before using the totals avoids that error.

    **Concept Tested:** Usage Measurement

    **See:** [Usage Measurement](index.md#usage-measurement)

---

#### 8. In the "built and installed" stage, output cost $4.12 and other new tokens cost $1.47. The stage had 3.8 million cache reads at $0.20 per million. What is the total cost?

<div class="upper-alpha" markdown>
1. $5.59
2. $4.12
3. $14.41
4. $6.35
</div>

??? question "Show Answer"
    The correct answer is **D**. Cache reads cost 3.8 × $0.20 = $0.76. Adding $4.12 + $1.47 + $0.76 gives $6.35, which the course description rounds to about $6. Option A is the sum without cache reads, and option C is the whole-session total. The chapter's table repeats the same method for the other two rows, getting about $7.70 for the first real grab and about $14.41 for the whole session.

    **Concept Tested:** API Cost Estimate

    **See:** [API Cost Estimate](index.md#api-cost-estimate)

---

#### 9. The whole session cost about $14.405 and produced about 5,200 lines. What is the approximate cost per line of code?

<div class="upper-alpha" markdown>
1. About $0.28
2. About $0.0028
3. About $0.00028
4. About $2.77
</div>

??? question "Show Answer"
    The correct answer is **B**. Dividing $14.405 by 5,200 lines gives about $0.0028 per line, or 0.28 cents. The chapter warns that this is a rough yardstick: it is useful for comparing your own sessions but misleading across projects, since test lines and installer-script lines are not the same effort, and a cheap line that is wrong costs more than an expensive one that is right.

    **Concept Tested:** Cost Per Line Of Code

    **See:** [Cost Per Line of Code](index.md#cost-per-line-of-code)

---

#### 10. Cache reads were 94% of the session's tokens but only 26% of its cost, while output was under 2% of the tokens and 45% of the cost. What does this show?

<div class="upper-alpha" markdown>
1. Output tokens are the cheapest token type
2. A chart of tokens alone would be a good guide to cost
3. Token share and cost share can differ sharply, so a token-only chart would send you looking in the wrong place
4. Cache reads should be eliminated entirely
</div>

??? question "Show Answer"
    The correct answer is **C**. Because output costs 100 times as much per token as a cache read, a tiny share of tokens can dominate the bill. The chapter also shows that about 80% of cache reads and 56% of the cost came after the app was installed, because every check re-read a large context. So testing is not free, and a cost breakdown by token type tells you where to look.

    **Concept Tested:** Session Cost Breakdown

    **See:** [Session Cost Breakdown](index.md#session-cost-breakdown)
