# Quiz: The Final Decision and the Capstone Project

Test your understanding of cost per feature used, decision criteria, decision matrices, the cost of generating software, and the capstone with these review questions.

---

#### 1. What is a decision matrix?

<div class="upper-alpha" markdown>
1. A list of every feature a product offers
2. A table that scores each option on each criterion, multiplies by the criterion's importance weight, and adds the results
3. A schedule of software releases
4. A record of the commands an agent ran
</div>

??? question "Show Answer"
    The correct answer is **B**. The highest weighted total wins, but the matrix does not replace judgment. It forces you to write your weights down and shows how much the answer depends on them. In the chapter, scores run from 1 to 5 and weights from 1 to 5, so a five-criterion matrix has a maximum of 85. Options A, C, and D describe different documents.

    **Concept Tested:** Decision Matrix

    **See:** [The Decision Matrix](index.md#the-decision-matrix)

---

#### 2. Which parts of the cost of generating software do NOT appear on the token usage report?

<div class="upper-alpha" markdown>
1. Output tokens and cache reads
2. Build tokens only
3. Plain input tokens
4. Your time, verification, and maintenance
</div>

??? question "Show Answer"
    The correct answer is **D**. The cost of generating software has four parts: build tokens (about $6 for the first install and about $14 for the session), your time (about 70 active minutes), verification (hand checks no agent can do), and maintenance (operating system and toolchain upkeep every year). Three of the four are not on the usage report, and the break-even depends mostly on the last two.

    **Concept Tested:** Cost Of Generating Software

    **See:** [The Cost of Generating Software](index.md#the-cost-of-generating-software)

---

#### 3. Why does the chapter say to write your decision criteria and their importance before you look at prices?

<div class="upper-alpha" markdown>
1. It is easy to rationalize a choice afterward, so deciding what matters first stops the numbers from picking for you
2. Prices are never available in advance
3. Criteria cannot be changed after prices are known
4. Vendors require it
</div>

??? question "Show Answer"
    The correct answer is **A**. Decision criteria are the factors you use to choose, written down before you compare options. The chapter's criteria are cost over your horizon, fit, verification effort, maintenance load, and risk if it fails, with continuity as a sixth when it applies. Writing weights first keeps a preferred option from quietly reshaping the criteria. Options B, C, and D make claims that the chapter does not support.

    **Concept Tested:** Decision Criteria

    **See:** [Decision Criteria](index.md#decision-criteria)

---

#### 4. Why do the criteria for ScreenGrab point in both directions, making a decision matrix worth building?

<div class="upper-alpha" markdown>
1. All criteria favor subscribing
2. All criteria favor generating
3. Cost and fit favor generating, while verification effort and maintenance favor subscribing, so no single criterion settles the choice
4. The criteria cannot be scored
</div>

??? question "Show Answer"
    The correct answer is **C**. Cost over five years favors generating in the light-upkeep case, and fit favors it strongly since only two features are used. Verification and maintenance favor subscribing because a vendor tests its product, while ScreenGrab still has acceptance tests nobody has run. Risk is low for both, since a failed grab loses nothing. With mixed signals, weights decide the outcome.

    **Concept Tested:** Decision Criteria

    **See:** [Decision Criteria](index.md#decision-criteria)

---

#### 5. The subscription costs $90 a year, and you use two of its features. What is the cost per feature used per year?

<div class="upper-alpha" markdown>
1. $45
2. $90
3. $7
4. $225
</div>

??? question "Show Answer"
    The correct answer is **A**. Dividing $90 by 2 features gives $45 per feature per year, or $225 per feature over five years ($450 ÷ 2, which is option D's five-year figure). The generated tool at about $14 once comes to $7 per feature. The measure is rough and ignores maintenance, but it names the useful question: what am I paying for that I never touch?

    **Concept Tested:** Cost Per Feature Used

    **See:** [Cost per Feature Used](index.md#cost-per-feature-used)

---

#### 6. A decision matrix has three criteria weighted 5, 4, and 3. An option scores 3, 5, and 2 on them in that order. What is its weighted total?

<div class="upper-alpha" markdown>
1. 38
2. 41
3. 47
4. 10
</div>

??? question "Show Answer"
    The correct answer is **B**. Multiply each score by its weight and add: 5 × 3 + 4 × 5 + 3 × 2 = 15 + 20 + 6 = 41. Option D is the sum of the scores alone, which ignores weights. The chapter's worked matrix uses the same method, with a subscribe total of 56 and a generate total of 63, a seven-point margin that deserves a robustness check.

    **Concept Tested:** Decision Matrix

    **See:** [The Decision Matrix](index.md#the-decision-matrix)

---

#### 7. In the chapter's scenarios, generating with 4 maintenance hours a year at $50 an hour and 2 agent sessions a year costs $1,154 over five years, against $450 for the subscription. What does this show?

<div class="upper-alpha" markdown>
1. Generating is always cheaper
2. Token costs dominate the total
3. The subscription is always a bad choice
4. Maintenance time dominates, so the answer depends on how much upkeep the tool needs and what your time is worth
</div>

??? question "Show Answer"
    The correct answer is **D**. The generated rows give three different answers: $84 for a hobbyist who values time at zero, $334 for light upkeep, and $1,154 at four hours a year. At $50 an hour with one session a year, generating stays cheaper only while upkeep is below about 1.5 hours a year. Tokens of $14 per session are small next to the value of your hours.

    **Concept Tested:** Cost Comparisons

    **See:** [The Cost of Generating Software](index.md#the-cost-of-generating-software)

---

#### 8. In the chapter's matrix, generate scores 63 and subscribe scores 56. Why does this seven-point margin deserve a robustness check?

<div class="upper-alpha" markdown>
1. Seven points is always decisive
2. Scores can never change
3. The scores are one person's illustrative judgment, so small changes in weights or scores could reverse the result
4. Matrices are only valid when totals are equal
</div>

??? question "Show Answer"
    The correct answer is **C**. The matrix does not replace judgment. It exposes how much the answer depends on the weights you wrote down. A small margin built on subjective scores may flip if cost matters a little less or verification matters a little more. The chapter's weighted decision matrix explorer exists to test exactly this sensitivity before you act on the verdict.

    **Concept Tested:** Decision Matrix

    **See:** [The Decision Matrix](index.md#the-decision-matrix)

---

#### 9. You are designing the published cost comparison for your own capstone so that a stranger can check it. Which design is best?

<div class="upper-alpha" markdown>
1. A short paragraph saying the new tool is cheaper
2. A write-up with the price and date checked, the feature log, lines of code and token counts by type, time to first install, estimation assumptions, a verification-status table, a labeled maintenance estimate, the decision matrix, and a list of what is not counted
3. Only a screenshot of the finished app
4. Only the token bill
</div>

??? question "Show Answer"
    The correct answer is **B**. A published cost comparison should be checkable: product, plan, price, date checked, and where; the week-long feature log; lines of code, token counts by type, estimated cost, and time to first install; verification status using the four labels; a maintenance estimate labeled as an estimate; multi-year cost and the weighted matrix; and what is not counted. Naming exclusions keeps the work honest and useful to others.

    **Concept Tested:** Published Cost Comparison

    **See:** [The Published Cost Comparison](index.md#the-published-cost-comparison)

---

#### 10. A reader claims, "Generating always beats subscribing, because a $14 session is far less than a $90 fee." What is the best critique?

<div class="upper-alpha" markdown>
1. The claim leaves out your time, verification, and yearly maintenance, which can outweigh the token bill, so the result depends on upkeep and what an hour is worth
2. The claim is correct, because token cost is the only cost
3. The claim fails because subscriptions are always cheaper
4. The claim cannot be evaluated because costs are secret
</div>

??? question "Show Answer"
    The correct answer is **A**. Comparing one session to one year's fee is the kind of mismatch the chapter warns about: a cost comparison needs the same time horizon, the same number of computers, and the same list of what is counted. Once your hours, hand verification, and upkeep are included, the generated option can cost more than the subscription, as in the $1,154 scenario. The honest conclusion is conditional, not universal.

    **Concept Tested:** Cost Comparisons

    **See:** [Cost Comparisons](index.md#cost-comparisons)
