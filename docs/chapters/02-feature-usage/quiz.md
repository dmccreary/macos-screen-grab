# Quiz: Feature Usage and the 95/5 Rule

Test your understanding of usage telemetry, power and casual users, the long tail, the Pareto principle, cognitive load, and the forces that keep features arriving with these review questions.

---

#### 1. What is usage telemetry?

<div class="upper-alpha" markdown>
1. A survey in which customers rank the features they would like to see added
2. A list of every feature a product advertises on its box
3. Automated reports a product sends back to its maker, recording which features were used and when
4. A monthly count of how many licenses a vendor has sold
</div>

??? question "Show Answer"
    The correct answer is **C**. Usage telemetry is how a vendor learns which features are used, such as discovering that a feature nobody opens still occupies a quarter of the menu. Option A describes a survey, which records opinions rather than behavior. Option B is a feature list, the half of the picture that usage fills in. Option D concerns sales. Telemetry also raises a privacy question, so a product should say what it reports and allow you to turn it off.

    **Concept Tested:** Usage Telemetry

    **See:** [Measuring Feature Usage](index.md#measuring-feature-usage)

---

#### 2. What does the long tail of features describe?

<div class="upper-alpha" markdown>
1. A pattern in which a few features are used by almost everyone while many others are each used by very few
2. A pattern in which every feature is used by about the same number of people
3. A list of features scheduled for future releases
4. A group of users who use every feature in the product
</div>

??? question "Show Answer"
    The correct answer is **A**. Plot features from most used to least used and the chart falls steeply, then flattens into a long, low tail. In the chapter's illustrative data, only two of twenty features are used by more than half of users, and the bottom twelve are each used by fewer than one user in ten. Option B contradicts that shape. Option C describes a roadmap, and option D describes power users.

    **Concept Tested:** Long Tail Of Features

    **See:** [Power Users, Casual Users, and the Long Tail](index.md#power-users-casual-users-and-the-long-tail)

---

#### 3. Which statement best defines the Pareto principle?

<div class="upper-alpha" markdown>
1. Exactly 95% of users use exactly 5% of features in every product
2. Every cause contributes equally to a result
3. Software defects are always spread evenly across the code
4. A small share of causes produces a large share of effects, commonly summarized as 80/20
</div>

??? question "Show Answer"
    The correct answer is **D**. The Pareto principle, named for the economist Vilfredo Pareto, observes that roughly 80% of results come from 20% of causes. In software, a small share of the code causes most bugs, a small share of customers produces most revenue, and a small share of features gets most of the use. The chapter calls it a pattern, not a law. Option A overstates the 95/5 rule of thumb, and options B and C describe the opposite of Pareto.

    **Concept Tested:** Pareto Principle

    **See:** [The Pareto Principle and the 95/5 Rule](index.md)

---

#### 4. What is feature checklist marketing?

<div class="upper-alpha" markdown>
1. Testing each feature against a checklist before release
2. Promoting a product by the length of its feature list rather than by how well it does a job
3. Asking users to check off the features they use in a survey
4. Listing a product's known bugs in the release notes
</div>

??? question "Show Answer"
    The correct answer is **B**. Checklist marketing, typically a comparison table with a check mark in every row, works on buyers who cannot judge quality in advance, because a count is easier to compare than a fit. It rewards adding a shallow version of every feature, which is bloat by construction. Options A and D describe quality assurance and release notes, and option C describes a survey, none of which promote a product.

    **Concept Tested:** Feature Checklist Marketing

    **See:** [Why Features Keep Arriving](index.md#why-features-keep-arriving)

---

#### 5. A feature shows very low usage in telemetry. What is the most careful conclusion?

<div class="upper-alpha" markdown>
1. Low usage is a question to investigate, because the feature may be unneeded, hard to find, or vital to a small group
2. The feature is useless and should be removed immediately
3. Users prefer simpler tools in every case
4. The telemetry system is broken
</div>

??? question "Show Answer"
    The correct answer is **A**. Telemetry shows what people did, not why. A rarely used feature may be unneeded, but it may also be poorly discoverable, or it may matter intensely to a small group who would leave without it. A careful vendor treats low usage as a prompt for investigation, and a careful reader treats a vendor's claim of "unused" the same way. Options B, C, and D jump to conclusions the data cannot support.

    **Concept Tested:** Usage Telemetry

    **See:** [Measuring Feature Usage](index.md#measuring-feature-usage)

---

#### 6. Why does the chapter say unused features still cost the user something?

<div class="upper-alpha" markdown>
1. They always increase the monthly subscription fee
2. They cause the program to crash more often
3. They add extraneous cognitive load, because every extra button and menu must be scanned and ruled out
4. They reduce the intrinsic difficulty of the task
</div>

??? question "Show Answer"
    The correct answer is **C**. Cognitive load is the mental effort a task demands of working memory. Intrinsic load comes from the task itself, but extraneous load comes from how the task is presented, and a cluttered menu is a major source. In the chapter's example, the author finds one command among twenty menu items and spends effort on 18 irrelevant ones every time. Options A and B are not claims the chapter makes, and D reverses the effect.

    **Concept Tested:** Cognitive Load

    **See:** [Why Unused Features Cost Something](index.md#why-unused-features-cost-something)

---

#### 7. Under the 95/5 rule of thumb, roughly how many features would a typical user of a 100-feature product use?

<div class="upper-alpha" markdown>
1. 1
2. 5
3. 50
4. 95
</div>

??? question "Show Answer"
    The correct answer is **B**. The 95/5 rule of thumb says about 95% of users use only about 5% of a product's features, and 5% of 100 features is 5. For a 40-feature product the same rule gives 2, which is exactly what the author uses. The chapter stresses that this is a rough guide, not a measurement, so a product's true split might be 90/10 or 99/1 and you should check your own tool's usage.

    **Concept Tested:** 95/5 Rule Of Thumb

    **See:** [The Pareto Principle and the 95/5 Rule](index.md)

---

#### 8. In the chapter's illustrative data, the top four features have use shares of 92%, 55%, 48%, and 30%, and all twenty features total 332 percentage points. What share of all use do the top four carry?

<div class="upper-alpha" markdown>
1. About 20%
2. About 44%
3. About 86%
4. About 68%
</div>

??? question "Show Answer"
    The correct answer is **D**. The top four sum to 92 + 55 + 48 + 30 = 225 points, and 225 divided by 332 is about 68%. Four of twenty features is 20% of the feature set, so the top 20% of features carry about 68% of the use. That is a Pareto shape, but softer than the 80/20 figure, which is why the chapter calls 80/20 a pattern rather than a law.

    **Concept Tested:** Pareto Principle

    **See:** [The Pareto Principle and the 95/5 Rule](index.md)

---

#### 9. Why does a vendor that listens mainly to its power users tend to keep adding depth to a product?

<div class="upper-alpha" markdown>
1. Power users make up most of a product's customers
2. Casual users prefer complicated tools
3. Power users request features, and each addition seems reasonable to the person who asked, while casual users rarely ask and simply stop opening the tool or keep paying silently
4. Telemetry only records the actions of power users
</div>

??? question "Show Answer"
    The correct answer is **C**. Power users matter to vendors out of proportion to their number: they write reviews, request features, and set the standard reviewers use. Casual users rarely ask for anything. They either stop opening the tool or pay without comment. The result is a roadmap that pushes depth and options. Option A is wrong because casual users are typically the larger group, and options B and D are not supported by the chapter.

    **Concept Tested:** Power Users

    **See:** [Power Users, Casual Users, and the Long Tail](index.md#power-users-casual-users-and-the-long-tail)

---

#### 10. A rival announces screen recording, and a team immediately adds recording to its own tool although no customer asked for it. Which force is at work, and why is it risky?

<div class="upper-alpha" markdown>
1. A healthy usage-driven decision, because the data showed a real need
2. Competitive feature matching, which adds features because a rival has them and pushes the whole category toward the same long feature list
3. Feature discoverability, which makes the new feature easy to find
4. Interface simplification, because recording replaces several older features
</div>

??? question "Show Answer"
    The correct answer is **B**. Competitive feature matching means adding a feature because a rival has one, whether or not customers ask. The pressure is immediate because no team wants to explain why it lacks something on the other product's page. When rivals follow each other, the whole category drifts toward the same long list of features. Option A describes the one healthy cause, which requires usage data. Options C and D name unrelated ideas.

    **Concept Tested:** Competitive Feature Matching

    **See:** [Why Features Keep Arriving](index.md#why-features-keep-arriving)
