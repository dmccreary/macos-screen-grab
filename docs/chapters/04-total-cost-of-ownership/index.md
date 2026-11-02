---
title: "Total Cost of Ownership"
description: "Turns licensing terms into numbers using the book's $9-to-$30-per-year example, covering purchase price, multi-year cost, break-even, maintenance, learning, and opportunity cost."
generated_by: claude skill chapter-content-generator
date: "2026-11-01 20:08:43"
version: 1.11
---

# Total Cost of Ownership

## Summary

This chapter turns licensing terms into numbers, using the book's example of a $9 tool that became $30 per year on each of three computers. It covers purchase price, cost per computer, multi-year cost, and break-even points, then adds the maintenance, learning, and opportunity costs that a price tag leaves out. After this chapter, you will be able to calculate the multi-year total cost of ownership of a per-computer subscription.

## Concepts Covered

This chapter covers the following 9 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Purchase Price | 35 |
| Cost Per Computer | 6 |
| Multi-Year Cost | 5 |
| Break-Even Point | 1 |
| Opportunity Cost | 23 |
| Software Maintenance | 41 |
| Maintenance Cost | 28 |
| Learning Cost | 28 |
| Total Cost Of Ownership | 27 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Software Features and the Anatomy of Bloat](../01-software-bloat/index.md)
- [Chapter 2: Feature Usage and the 95/5 Rule](../02-feature-usage/index.md)
- [Chapter 3: Licenses, Subscriptions, and Vendor Incentives](../03-licenses-subscriptions/index.md)

---

!!! mascot-welcome "From price tag to real cost"
    ![Pinch waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    A price tag is the cheapest part of owning most tools. In this chapter you'll learn to add up everything else, so you can compare a subscription, an old one-time license, and a tool you generate yourself on equal terms. Grab only what you need!

## Purchase Price and Cost Per Computer

The **purchase price** is the amount a buyer pays to acquire a product, usually at the moment of acquisition. For a one-time license, it is the whole payment. For a subscription, it is the first fee, or even nothing at all if the first period is free. The purchase price is the number a vendor puts on the box, and it is the number people compare. It is also only one of several numbers that decide what a tool really costs.

The book's case offers three ways to acquire a screen grab tool, and their purchase prices look very different. The original utility was a one-time purchase of $9. The current version of the paid product asks for $30 per year, per computer. The generated replacement described in this book cost about $6 in API fees to build and install, and about $14 for the whole session, including testing. These are estimates drawn from the course description, and they cover the code only.

| Path | Purchase price | What the price covers |
|---|---|---|
| Original one-time license | $9 | The license for that version, on the author's computers |
| Current paid subscription | $30 per computer, charged yearly | One year of use on one computer |
| Generated replacement | About $6 to build, about $14 for the whole session | The AI session that wrote the code, not the author's time or later upkeep |

The **cost per computer** is the total cost of owning a tool, divided by the number of computers that use it. It matters because many licenses are sold per computer, and because the same tool installed on three machines costs three times as much to license even though it does one job. In the worked example, the subscription costs $30 per computer per year, so the cost per computer per year is simply $30, and the cost for three is $90.

Cost per computer can also be a way to spread a fixed cost. A generated tool that costs $14 once and runs on all three computers has a purchase price per computer of about $4.67. The comparison with $30 is not quite fair, because the $30 recurs every year and the $14 does not, which is the subject of the next section.

## Multi-Year Cost

A **multi-year cost** is the total expense of a product over a stated number of years, found by adding the costs of every year. It is the figure that exposes recurring charges. A fee that looks small in one year becomes large across five, and any decision about a tool you plan to keep for years should be made on the multi-year number.

For a per-computer subscription, the calculation uses the formula from Chapter 3, now with the year count chosen by the buyer.

\[ C = n \times f \times y \]

where:

- \( C \) is the total fee in dollars
- \( n \) is the number of computers
- \( f \) is the annual fee per computer in dollars
- \( y \) is the number of years

For the author, \( n = 3 \) and \( f = 30 \). Over one year, \( C = 90 \). Over five years, \( C = 450 \). Over ten years, \( C = 900 \), a hundred times the original $9. The table shows how the gap grows.

| Years | Subscription fees (3 computers at $30) | Original one-time license | Difference |
|---|---|---|---|
| 1 | $90 | $9 | $81 |
| 3 | $270 | $9 | $261 |
| 5 | $450 | $9 | $441 |
| 10 | $900 | $9 | $891 |

The horizon you choose changes the answer, which is why you should state it. A tool you will use for two months should be judged on two months. A tool you will use for a decade should be judged on ten years. Pick the horizon honestly, before you compare.

!!! mascot-thinking "Judge a tool by its horizon, not its sticker"
    ![Pinch thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    A $30 fee is small if you look at it once and large if you look at it every year for as long as you use the tool. How long do you actually keep your tools?

A **break-even point** is the moment at which the total costs of two options become equal, after which one of them is cheaper. For a generated tool compared with a subscription, it is the time when what you have saved in fees equals what you spent on the tool. Using only purchase prices, the $14 generated tool breaks even against the $90-per-year fees after \( 14 / 90 \approx 0.16 \) years, which is under two months. The later sections add the costs that move this number.

## Opportunity Cost

**Opportunity cost** is the value of the best alternative that you give up when you make a choice. Money spent on a subscription cannot be spent elsewhere, and time spent building a tool cannot be spent on other work. Opportunity cost is not a bill you receive. It is a cost you notice only by asking what else the same resource could have done.

The idea lets you put a number on time. Suppose an hour of your time is worth $40, either because that is what you earn or because it is what you would pay to have the hour back. Spending 70 minutes with an AI agent has an opportunity cost of about \( 70 / 60 \times 40 = \$46.67 \), as an illustration. That is more than the $14 of fees. The honest total for building the tool includes both.

Now the worked example runs the other way. A subscription costs $90 per year, and that money could have gone to something else. At 5% annual return, the $90 saved in the first year would be worth $94.50 a year later. The effect is small at these amounts, and the larger opportunity cost for a small tool is almost always time. Both views point to the same practice: price everything, including your own hours, in the same currency.

!!! mascot-tip "Put a price on your hour"
    ![Pinch giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Decide once what an hour of your time is worth, then use it for every build-or-buy comparison. A rough number you apply consistently beats a precise number you invent each time.

## Software Maintenance and Its Cost

**Software maintenance** is the ongoing work required to keep software useful after it is first delivered. It includes fixing bugs, adapting to new operating system releases, patching security problems, and making small changes as needs shift. Software does not wear out like a machine, but its surroundings change, and a program that does not change with them slowly stops working. Maintenance is why a tool that worked perfectly last year may fail after an update to the operating system.

Maintenance has to be done by someone. In a paid product, the vendor does most of it, and the fee pays in part for the work. In a personal tool, you or your AI agent do it. The book's own case shows a small example: after the first version was installed, a later fix was needed for Macs that had only the Command Line Tools. A tool built for one person still needs upkeep, though usually far less than a product built for millions.

| Kind of maintenance | What it fixes | Who does it for a paid product | Who does it for a personal tool |
|---|---|---|---|
| Corrective | Bugs and failures | The vendor | You or your AI agent |
| Adaptive | Changes in the operating system or hardware | The vendor | You or your AI agent |
| Security | Newly found weaknesses | The vendor | You or your AI agent |
| Enhancement | New wishes | The vendor, if it matches the roadmap | You, whenever you choose |

The **maintenance cost** is the money and time spent on maintenance over a stated period. It is easy to underestimate because it arrives in small, irregular pieces. A useful way to estimate it is to count the hours per year you expect to spend, multiply by the value of an hour, and then multiply by the number of years.

Take a worked example. If you expect to spend one hour a year keeping a small tool working, and an hour is worth $40, the yearly maintenance cost is $40, and over five years it is $200. That is more than twelve times the $14 it cost to generate, which shows why a build price alone would mislead. For the paid product, the same upkeep is in the fee, but you still spend a little time on renewals and updates.

!!! mascot-warning "Don't compare $14 with $450"
    ![Pinch warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    The build bill is only the entry fee. Before you claim a saving, add maintenance and your own time to the generated side, and add the same to the paid side, or you're comparing a part to a whole.

## Learning Cost

The **learning cost** is the time and effort needed to become able to use a tool well, valued in money or hours. It is paid up front when you adopt a tool, and again each time a major version changes the interface. A large feature set raises the learning cost because there is more to learn and more to skip. A tool you wrote yourself, for your own job, lowers it, since you already know what it does.

A worked example: suppose learning a new editing tool takes 4 hours, and an hour is worth $40. The learning cost is \( 4 \times 40 = \$160 \), which is larger than a year of the book's $90 fee. If the vendor redesigns the interface in a later release and relearning takes 1 hour, that adds another $40. Learning cost is one of the quiet reasons that people stay with a product they no longer like. The effort already invested seems to be lost on leaving, and the cost of learning a new tool seems higher than a year of fees.

Learning cost also applies when you generate a tool, though in a different form. You must learn to describe what you need, to review what the agent built, and to run the tests. Later chapters teach that skill, and it should be counted as a one-time cost that falls with practice.

## Total Cost of Ownership

The **total cost of ownership**, or TCO, is the sum of every cost of acquiring, using, learning, and maintaining a product over a stated period. It collects the numbers this chapter has introduced into a single comparable figure. The formula is straightforward.

\[ \text{TCO} = P + n \times f \times y + m \times r \times y + L \times r \]

where:

- \( P \) is the purchase or build cost in dollars
- \( n \) is the number of computers
- \( f \) is the annual fee per computer in dollars
- \( y \) is the number of years
- \( m \) is the maintenance time in hours per year
- \( r \) is the value of an hour of your time in dollars
- \( L \) is the one-time learning or setup time in hours

The time terms use \( r \), the value of an hour, which is how opportunity cost enters the formula. A worked example compares three paths over five years on three computers, with an hour valued at $40. All of the time estimates are illustrative.

| Cost item | Paid subscription | Original $9 license | Generated tool |
|---|---|---|---|
| Purchase or build cost \( P \) | $0 | $9 | $14 |
| Annual fees \( n \times f \times y \) | $450 | $0 | $0 |
| Maintenance (hours per year) | 0.5 | 0 | 1 |
| Maintenance cost \( m \times r \times y \) | $100 | $0 | $200 |
| Learning or setup (hours) | 1 | 0 | 1 |
| Learning cost \( L \times r \) | $40 | $0 | $40 |
| **TCO over five years** | **$590** | **$9** | **$254** |

Three lessons come out of the table. First, the original $9 license was far cheaper than either alternative, but it is no longer on offer, so the real choice is between the other two. Second, the generated tool's total of $254 is about eighteen times its $14 build price, because time dominates. Third, even after counting the time, the generated tool costs well under half of the subscription over five years. The result depends on the time estimates, which is why you should change them and see what happens.

Under these assumptions, the two paths break even quickly. The subscription starts at $40 of learning time and grows by $110 a year, while the generated tool starts at $54 and grows by $40 a year, so they cross after \( 14 / 70 = 0.2 \) years, about ten weeks. If the generated tool needed three hours of upkeep a year instead of one, its yearly cost would reach $120 and it would never catch up.

The calculator below lets you set the inputs for each path and read off the TCO.

#### Diagram: Total Cost of Ownership Calculator

<details markdown="1">
<summary>Total Cost of Ownership Calculator</summary>
Type: microsim
**sim-id:** tco-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/personal-finance/tree/main/docs/sims/total-cost-of-ownership-comparison<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the total cost of ownership of a software path over a chosen number of years, to within $1, for 3 challenge cases.

**Prerequisites:** purchase price, cost per computer, multi-year cost, software maintenance, maintenance cost, learning cost, opportunity cost, total cost of ownership (defined in the chapter sections above).

**Evidence of Mastery:** For 3 challenge cases, the learner types the TCO before the sim shows it. An entry is correct when it is within +/- 1 dollar of the Model value in Content. Mastery is 3 of 3 correct. Changing the inputs freely is exploration and is not scored.

**Misconceptions:** (1) The purchase price is the cost of owning a tool. (2) A tool that costs nothing after purchase has no ownership cost. (3) Time spent has no cost.

**Instructional Rationale:** Applying the formula to concrete cases makes the learner handle each cost item, and free exploration shows how the time estimates dominate the total.

**Content:**

TCO = P + n x f x y + m x r x y + L x r, with the meanings of P, n, f, y, m, r and L given in the chapter. All presets are illustrative and the sim labels them illustrative.

| Quantity | Symbol | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|---|
| Purchase or build cost | P | 0 | 100 | 1 | 14 | dollars |
| Computers | n | 1 | 10 | 1 | 3 | computers |
| Annual fee per computer | f | 0 | 100 | 5 | 0 | dollars per computer per year |
| Years | y | 1 | 10 | 1 | 5 | years |
| Maintenance time | m | 0 | 10 | 0.5 | 1 | hours per year |
| Value of an hour | r | 10 | 100 | 5 | 40 | dollars per hour |
| Learning or setup time | L | 0 | 40 | 0.5 | 1 | hours |

Three presets:

| Preset | P | n | f | y | m | r | L | TCO |
|---|---|---|---|---|---|---|---|---|
| Paid subscription | 0 | 3 | 30 | 5 | 0.5 | 40 | 1 | 590 |
| Original one-time license | 9 | 3 | 0 | 5 | 0 | 40 | 0 | 9 |
| Generated tool | 14 | 3 | 0 | 5 | 1 | 40 | 1 | 254 |

Challenge cases, in this order:

| # | P | n | f | y | m | r | L | Model TCO ($) | Feedback when wrong |
|---|---|---|---|---|---|---|---|---|
| 1 | 0 | 3 | 30 | 3 | 0.5 | 40 | 1 | 370 | Fees 3 x 30 x 3 = 270; maintenance 0.5 x 40 x 3 = 60; learning 1 x 40 = 40; total 370. |
| 2 | 14 | 3 | 0 | 10 | 1 | 40 | 1 | 454 | Maintenance 1 x 40 x 10 = 400; learning 40; build 14; total 454. |
| 3 | 0 | 1 | 30 | 5 | 0 | 60 | 2 | 270 | Fees 1 x 30 x 5 = 150; learning 2 x 60 = 120; total 270. |

**Provenance:** The preset values P = 14 and the fee of $30 per computer come from the course description. The hours and the value of an hour are illustrative assumptions invented for this chapter.

**Rules:** TCO = P + n x f x y + m x r x y + L x r, rounded to the nearest dollar. All inputs are non-negative. Inputs outside the ranges above are not allowed.

**Learner Activity:**

1. The learner chooses a preset and sees each cost item and the total.
2. The learner changes any input and sees the items and the total update.
3. The learner starts the challenges; for each, the sim sets the inputs and hides the total.
4. The learner types the TCO, presses Check, and sees the itemized feedback.
5. The learner returns to free exploration and should notice that, for the Generated tool preset, maintenance time moves the total more than the build cost.

**Feedback:** Three cases in fixed order, two attempts each. Correct: "Correct: $<value>." Incorrect on the first attempt: "Not quite. Add the four cost items." After the second wrong attempt the Feedback when wrong text is shown and the case counts as missed. "Correct: n of 3" is displayed.

**Starting State:** The Generated tool preset is shown with a TCO of $254. The question on screen is "What does this tool really cost over five years?"

**Chapter Anchors:** The chapter states presets with TCO values of $590, $9 and $254, a value of an hour of $40, a horizon of five years on three computers, and the formula TCO = P + n x f x y + m x r x y + L x r.
</details>

The calculator shows what each path costs in total. The chart below shows when the paths cross, which is the break-even point. The most important input here is the maintenance time of the generated tool, because it decides whether the generated tool is ever cheaper.

#### Diagram: Break-Even Chart for a Generated Tool

<details markdown="1">
<summary>Break-Even Chart for a Generated Tool</summary>
Type: chart
**sim-id:** tco-break-even-chart<br/>
**Library:** Chart.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the break-even time between a paid subscription and a generated tool, to within 0.1 year, for 3 values of the generated tool's yearly maintenance time.

**Prerequisites:** break-even point, multi-year cost, maintenance cost, learning cost, total cost of ownership (defined in the chapter sections above).

**Evidence of Mastery:** For 3 challenge cases, the learner types the break-even time in years before the sim draws the crossing point. An entry is correct when it is within +/- 0.1 of the Model value in Content. Mastery is 3 of 3 correct. Moving the maintenance control is exploration and is not scored.

**Misconceptions:** (1) A generated tool is always cheaper than a subscription. (2) Break-even depends only on the purchase price.

**Instructional Rationale:** Computing the crossing point for different maintenance assumptions shows the learner that the answer is sensitive to one input, which a single TCO figure hides.

**Content:**

Two cumulative cost lines are drawn from year 0 to year 10. All values are illustrative and the sim labels them illustrative.

| Line | Upfront cost K | Yearly cost S |
|---|---|---|
| Paid subscription | 40 | 110 |
| Generated tool | 54 | 40 x m |

The subscription's upfront cost is 1 hour of learning at $40. Its yearly cost is 3 x 30 = 90 in fees plus 0.5 x 40 = 20 in time. The generated tool's upfront cost is 14 in build cost plus 1 hour of setup at 40. Its yearly cost is m hours of maintenance at $40.

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Generated tool maintenance m | 0 | 4 | 0.5 | 1 | hours per year |

Challenge cases, in this order:

| # | m | Break-even (years) | Feedback when wrong |
|---|---|---|---|
| 1 | 1 | 0.2 | (54 - 40) / (110 - 40 x 1) = 14 / 70 = 0.2 years. |
| 2 | 2 | 0.5 | (54 - 40) / (110 - 40 x 2) = 14 / 30 = 0.47, which rounds to 0.5 years. |
| 3 | 2.5 | 1.4 | (54 - 40) / (110 - 40 x 2.5) = 14 / 10 = 1.4 years. |

**Provenance:** The $30 per computer fee, three computers and the $14 build cost come from the course description and the chapter. The hours and the $40 value of an hour are illustrative assumptions.

**Rules:** Break-even time = (K_generated - K_subscription) / (S_subscription - S_generated), rounded to 1 decimal place, when S_generated < S_subscription. When S_generated >= S_subscription, the lines never cross after year 0 and the sim shows "never cheaper" in place of a time. At m = 2.75 the yearly costs are equal; the control's step grid does not reach 2.75, so the "never cheaper" case is reached at m >= 3.

**Learner Activity:**

1. The learner moves the maintenance control and sees the generated tool's line change slope and the crossing point move.
2. The learner starts the challenges; for each, the sim sets m and hides the crossing point.
3. The learner types the break-even time and presses Check.
4. The learner returns to free exploration, sets m to 3 or more, and should notice that the generated line never falls below the subscription line.

**Feedback:** Three cases in fixed order, two attempts each. Correct: "Correct: <value> years." Incorrect on the first attempt: "Not quite. Divide the difference in upfront costs by the difference in yearly costs." After the second wrong attempt the Feedback when wrong text is shown and the case counts as missed. "Correct: n of 3" is displayed.

**Starting State:** The two lines are drawn with m = 1 and the crossing point hidden. The question on screen is "When does the generated tool become cheaper?"

**Chapter Anchors:** The chapter states a subscription cost of $90 per year in fees, a generated tool cost of $14, an hour valued at $40, and a break-even of about 0.2 years under the chapter's default assumptions.
</details>

!!! mascot-celebration "You can price a tool honestly"
    ![Pinch celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now compute the multi-year cost of a per-computer subscription, add maintenance, learning, and opportunity cost, and compare the total with a generated alternative. That is the arithmetic behind every build-or-buy decision in the next chapters.

## Key Takeaways

- The purchase price is one number among several; the multi-year cost exposes recurring fees.
- Opportunity cost lets you price your own time, and the value of an hour is an input you must choose.
- Software maintenance never ends, and its cost can exceed the cost of building the tool.
- Learning cost is paid up front and again after redesigns.
- Total cost of ownership adds purchase price, fees, maintenance, and learning over a stated horizon; the break-even point shows when one option overtakes another.
