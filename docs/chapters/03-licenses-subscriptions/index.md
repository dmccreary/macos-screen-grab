---
title: "Licenses, Subscriptions, and Vendor Incentives"
description: "Follows the money behind software features, from copyright and licenses to subscriptions, recurring revenue, switching costs, and vendor lock-in."
generated_by: claude skill chapter-content-generator
date: "2026-11-01 20:08:43"
version: 1.11
---

# Licenses, Subscriptions, and Vendor Incentives

## Summary

This chapter follows the money behind the features. Starting from copyright and the software license, it compares one-time and perpetual licenses with subscriptions and per-computer licensing, then shows how recurring revenue, upgrade revenue, switching costs, and lock-in shape vendor incentives. After this chapter, you will be able to describe how a pricing model changes what a vendor chooses to build and charge.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Copyright | 120 |
| Software License | 118 |
| End User License Agreement | 1 |
| One-Time License | 9 |
| Perpetual License | 1 |
| Subscription License | 51 |
| Annual Fee | 37 |
| Per-Computer Licensing | 7 |
| Per-User Licensing | 1 |
| Recurring Revenue | 4 |
| Upgrade Revenue | 3 |
| Vendor Incentives | 2 |
| Customer Lifetime Value | 1 |
| Switching Costs | 7 |
| Proprietary File Format | 6 |
| Vendor Lock-In | 5 |
| Software As A Service | 1 |
| Price Increase | 1 |
| Freemium Model | 1 |
| Free Alternatives | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Software Features and the Anatomy of Bloat](../01-software-bloat/index.md)
- [Chapter 2: Feature Usage and the 80% Rule](../02-feature-usage/index.md)

---

!!! mascot-welcome "Follow the money, not the menu"
    ![Pinch waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Features come and go, but the way a tool is paid for decides which ones get built. By the end of this chapter you'll be able to read a license and a price tag and predict what a vendor will do next. Grab only what you need!

## Copyright and the Software License

Start with **copyright**, the legal right that gives the author of a creative work control over who may copy, distribute, and adapt it. In most countries, software is protected by copyright automatically the moment it is written, with no registration required. The author of the code, which might be a person or the company that employs them, owns that right from the start.

That ownership has a direct consequence for anyone who wants to use the software. By default, you have no permission to copy it, run it, or change it, because those acts belong to the copyright holder. The holder grants permission through a **software license**: a legal agreement that states what the user may do with the software and under what conditions. The license is the document that turns a program into something you can lawfully use.

Three ideas are easy to confuse and worth separating. *Copyright* is the owner's underlying right. A *license* is the permission the owner grants to a user. *Ownership of a copy* is something different again: when you buy a license, you usually do not buy the software itself. You buy permission to use a copy on the owner's terms. That is why a vendor can change future terms, and why a license can say "per computer" or "per year" and still be perfectly lawful.

!!! mascot-thinking "You rent permission, not the software"
    ![Pinch thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice what you actually hold after you pay: not the program, but a permission slip from the copyright holder. Who can change what the slip says?

A worked example makes the split concrete. The author wrote the screen grab app described in this book with an AI agent and now publishes it under the MIT License, a very permissive license. As the copyright holder, the author decided what permission to grant, and chose to grant a great deal: anyone may use, copy, modify, and share the code at no charge, so long as they keep the license notice. The vendor of the paid utility made the opposite choice and granted only the right to run the program on stated terms.

| Question | The copyright holder | A licensed user |
|---|---|---|
| Who may copy the code? | The holder | Only as the license allows |
| Who may modify it? | The holder | Only as the license allows |
| Who may choose the price? | The holder | No one; the user accepts or declines |
| Who may change the terms for a future version? | The holder | No one |
| Who may use it? | The holder | Whoever the license names, under its conditions |

Copyright has a boundary that matters a great deal for this book. It protects the *expression* of an idea, meaning the particular code, text, or artwork, and not the idea or the function itself. Nobody owns the idea of "grab a region of the screen." A vendor owns its specific code and its specific designs, and anyone is free to write different code that does the same job. That boundary is why a new tool can lawfully do what an older one does, as long as it does not copy the older one's code or protected designs. Questions at the edges of that line are for a lawyer.

This book does not give legal advice. The aim is to read a license well enough to understand what a price buys and what it doesn't. For anything involving a dispute or a business, ask a lawyer.

Licenses vary in the elements they contain. Most spell out who may use the software, how many copies or machines are covered, how long the permission lasts, whether the user may modify or share it, and what happens if the terms are broken. Reading those five items tells you more about a product than its feature list does.

| License element | Question it answers | Example from the book's case |
|---|---|---|
| Who | Who is allowed to use it? | The person who bought it |
| How many | How many copies or machines? | One license per computer |
| How long | For how long is the permission valid? | One year, then renew |
| What may change | Can the user modify or share it? | No, in a proprietary license |
| What if broken | What happens on violation? | The license can be ended |

Licenses sit on a spectrum from tightly closed to wide open. The table lists the common kinds and what each lets a user do.

| Kind of license | Use it | Read the code | Change and share it | Typical price |
|---|---|---|---|---|
| Proprietary | Yes, on stated terms | No | No | One-time or subscription fee |
| Permissive open source (the MIT License) | Yes | Yes | Yes, keeping the notice | Free |
| Copyleft open source | Yes | Yes | Yes, if shared changes stay open too | Free |
| Public domain | Yes | Yes | Yes, with no conditions | Free |

An **end user license agreement**, or EULA, is the license that a user accepts when installing or first opening a program, typically by clicking "I agree." It is long, written for lawyers, and rarely read in full. It is still a binding statement of what the vendor has granted and what it may do in the future, including raising prices and ending support.

!!! mascot-warning "Clicking Agree is signing"
    ![Pinch warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Most people accept a license without reading it, and that is how surprises arrive. Next time, search the text for "term," "renew," "transfer," and "devices" and read just those paragraphs.

## One-Time and Perpetual Licenses

A **one-time license** is a license purchased with a single payment that grants the right to use a specific version of the software. This is the classic model of boxed software: pay once, install, use. The $9 utility at the start of this book was sold this way. The buyer paid $9 once and ran it on all of their computers.

A **perpetual license** is a license that has no expiry date, so the right to use that version continues indefinitely. The term is usually paired with the one-time payment, and it is worth being exact about what it covers. A perpetual license usually means you may keep using the version you bought forever. It does not usually mean you will receive every future version, updates, or support. The vendor may stop issuing fixes, or may charge for the next major version.

Walk through the worked example. A buyer purchases version 3 for $9. Version 3 keeps working as long as the buyer's operating system runs it. When the vendor releases version 4 as a paid upgrade for, say, $5 more, the buyer can pay or stay on version 3. Staying carries a risk: the operating system may someday change in a way version 3 cannot handle. The choice is the buyer's, and the cost is visible, which is the key advantage of this model.

| Feature of a one-time perpetual license | Benefit to the user | Risk to the user |
|---|---|---|
| Single payment | Cost is known up front | Upgrades may be sold separately |
| No expiry | The tool keeps working | Support and fixes may stop |
| Tied to a version | No surprise changes | Newer features need a new purchase |

## Subscriptions and Annual Fees

A **subscription license** is a license that grants the right to use the software only while the user keeps paying a recurring fee. When the payments stop, so does the permission. The product may stop launching, refuse to open files, or fall back to a restricted mode. This reverses the logic of the one-time license. You no longer buy a version; you rent access to a service that changes.

What happens when the payments stop varies by product, and it should be a question you ask before you subscribe. Some products keep working in a limited mode. Some stop opening your own files. Some delete your cloud copies after a grace period. In the book's case, a user who pays for three years and then stops has paid $270 and holds no right to run the tool, while the user who paid $9 once still has a working program.

An **annual fee** is a subscription payment charged once per year. It is the simplest recurring charge to reason about, because multiplying by years gives a total. The book's case has a fee of $30 per computer per year. The arithmetic is short enough to do by hand, and doing it is the point of this section.

The total for any per-computer subscription follows one formula.

\[ C = n \times f \times y \]

where:

- \( C \) is the total cost in dollars
- \( n \) is the number of computers
- \( f \) is the annual fee per computer in dollars
- \( y \) is the number of years

Take the author's situation. There are three computers, each needing a license. The annual cost is \( 3 \times \$30 = \$90 \). Over five years, it is \( 5 \times \$90 = \$450 \). The one-time purchase it replaced cost $9 in total. The table below shows the running total at the end of each year.

| End of year | Annual cost (3 computers) | Running total | One-time $9 license for comparison |
|---|---|---|---|
| 1 | $90 | $90 | $9 |
| 2 | $90 | $180 | $9 |
| 3 | $90 | $270 | $9 |
| 4 | $90 | $360 | $9 |
| 5 | $90 | $450 | $9 |

Put the same figures from the vendor's side. A customer on the one-time license yielded $9 in total. A customer on the subscription, staying five years on three computers, yields $450. The same customer is worth fifty times as much. No feature changed the economics of that customer; the licensing model did. A reader who wonders why vendors moved to subscriptions need look no further than that multiplication.

The comparison hides a subtle change. Under the one-time license, the vendor's incentive stops at the sale. Under a subscription, the incentive continues for as long as the customer pays, which affects every decision about the product. The sections that follow develop that point.

The same pricing model appears under a common label. **Software as a service**, or SaaS, is software delivered over the internet and paid for by subscription, usually running on the vendor's servers rather than on the user's computer. A desktop utility with a yearly license is not strictly SaaS, but it shares the same revenue pattern.

A **price increase** is a rise in what the vendor charges for the same product. Subscriptions make increases easy: the vendor can raise the fee at renewal, and the customer must decide immediately whether to pay. Suppose, as an illustration, that the fee rose 10% each year from $30. The charges would be $30.00, $33.00, $36.30, $39.93, and $43.92, for a five-year total of about $183.15 per computer, or about $549 for three. The numbers are illustrative, and the book's actual figure is $30 flat.

!!! mascot-warning "Calendar the renewal"
    ![Pinch warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Subscriptions often renew automatically, at whatever the fee is on that day. Put the renewal date in your calendar a week early, so you can compare the new price with the alternatives while cancelling is still an option.

## Counting Licenses: Per Computer and Per User

A **per-computer license** is a license that is counted by the number of machines on which the software is installed. Each computer needs its own license. This is the model behind the book's $30 fee. A person with a desktop, a laptop, and a second laptop needs three.

Per-computer pricing has a worked consequence. The same $30 fee that looks modest for one machine multiplies with each device, and the multiplication falls hardest on the people who own the most. The author's three computers triple the cost compared with a one-computer user, for the same single job.

A **per-user license** is a license that is counted by the number of people who use the software, regardless of how many machines each person uses. It is common for business tools, where one employee works on several devices. For an individual with several computers, per-user pricing is usually cheaper than per-computer pricing. For a family or a team, the arithmetic can reverse.

| Model | What is counted | Cost for 1 person with 3 computers at $30 | Cost for 3 people with 1 computer each at $30 |
|---|---|---|---|
| Per computer | Machines | $90 | $90 |
| Per user | People | $30 | $90 |

The two sorting dimensions, how often the money is paid and what is counted, combine to form every offer in this chapter. The sorter below presents six offers and asks you to place each on both dimensions.

#### Diagram: License Offer Sorter

<iframe src="../../sims/licenses-offer-sorter/main.html" height="552px" width="100%" scrolling="no"></iframe>

[Run the License Offer Sorter MicroSim Fullscreen](../../sims/licenses-offer-sorter/main.html){ .md-button .md-button--primary }

<details markdown="1">
<summary>License Offer Sorter</summary>
Type: microsim
**sim-id:** licenses-offer-sorter<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/learning-linux/tree/main/docs/sims/open-vs-closed<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** classify<br/>
**Learning Objective:** The learner will classify six described software offers by when payment is made (one time or recurring) and by what is counted (per computer or per user), getting both answers right for at least 5 of 6 offers.

**Prerequisites:** one-time license, subscription license, per-computer licensing, per-user licensing (defined in the chapter sections above).

**Evidence of Mastery:** For each offer, the learner picks a payment pattern and a counting unit. An offer is correct only when both choices equal the Correct values in Content. Mastery is 5 of 6 offers correct on the first pass. Reading the definitions is exploration and is not scored.

**Misconceptions:** (1) A one-time price means the license is per computer. (2) A subscription always counts users rather than machines.

**Instructional Rationale:** Placing each offer on two independent dimensions shows the learner that payment timing and counting unit are separate choices, which is the distinction the chapter teaches.

**Content:**

The two choices are payment pattern (One time or Recurring) and counting unit (Per computer or Per user).

| # | Offer shown (all prices illustrative) | Correct payment | Correct counting unit | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | Pay $9 once and install it on each of your own computers. | One time | Per user | One payment; the license names the person, not the machines. |
| 2 | Pay $30 per year for each computer it is installed on. | Recurring | Per computer | The fee repeats yearly and is multiplied by machines. |
| 3 | Pay $12 per month for each person on a team, on any number of devices. | Recurring | Per user | Monthly payments repeat, and the count is people. |
| 4 | Pay $40 once for each computer; the next major version costs extra. | One time | Per computer | One payment, but each machine needs its own license. |
| 5 | Pay $60 per year per person, with unlimited computers. | Recurring | Per user | The fee repeats yearly and the count is people. |
| 6 | Buy a $25 key that works on one specific computer with no expiry. | One time | Per computer | A single payment with a license tied to one machine. |

**Provenance:** All offers and prices are illustrative and invented for this chapter; the sim labels them illustrative.

**Rules:** Each offer is answered once with two choices. An offer is correct when both choices match. The score is the number of correct offers out of 6. Mastery is a score >= 5.

**Learner Activity:**

1. The learner reads offer 1 and picks One time or Recurring.
2. The learner picks Per computer or Per user.
3. The learner presses Check and sees whether each choice was right, with the Why text.
4. The learner moves through offers 2 to 6 and then sees the score.

**Feedback:** Six offers in fixed order, one attempt each. Each choice is marked right or wrong, and the Why text is always shown. The final screen shows "n of 6" and the message "Mastery reached" when n >= 5.

**Starting State:** Offer 1 is shown with no choices selected. The question on screen is "How is this offer paid, and what is counted?"

**Chapter Anchors:** The chapter states that the book's case has a fee of $30 per computer per year, that three computers cost $90 per year, and that the sorter has 6 offers.
</details>

## How Pricing Shapes Vendor Behavior

Pricing models differ in who gets the money and when, and that determines what a vendor works on. **Recurring revenue** is income that a business receives repeatedly from the same customers, usually monthly or yearly. It is valued because it is predictable. A vendor with 10,000 customers each paying $30 per year can plan for about $300,000 every year, as long as the customers renew. Compare that to a vendor who must find 10,000 new buyers to earn the same amount a second time.

**Upgrade revenue** is income earned from existing customers who pay to move to a newer version. Under one-time licensing, upgrades are the main way to earn from a customer after the first sale. That creates an incentive to make each new version look significantly different, even when the old one did the job well.

**Customer lifetime value** is the total revenue a vendor expects from one customer over the whole time they remain a customer. As an illustration, a customer paying $30 per year who stays five years is worth $150. The figure justifies a vendor's spending on advertising, support, and features aimed at keeping customers. A one-time $9 sale has a customer lifetime value of $9 plus any upgrades.

**Vendor incentives** are the pressures, financial and otherwise, that push a vendor toward some decisions and away from others. The same person at the same company will choose differently when the revenue model changes. Under a one-time license, the strongest incentives are to win new buyers and persuade old ones to upgrade. Under a subscription, the strongest incentives are to keep customers from canceling and to raise the fee they pay.

!!! mascot-thinking "Pricing is a steering wheel"
    ![Pinch thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Think of the revenue model as the thing steering the product roadmap. The vendor's engineers and managers may be perfectly honest, and the incentives will still lean on every decision. Ask: what does this vendor earn when I do nothing?

The explorer below lists eight vendor decisions and asks you to predict which pricing model makes each one more likely. There is no trick here. The goal is to see that the incentive follows from the way the money flows.

#### Diagram: Vendor Incentive Explorer

<iframe src="../../sims/licenses-vendor-incentive-explorer/main.html" height="592px" width="100%" scrolling="no"></iframe>

[Run the Vendor Incentive Explorer MicroSim Fullscreen](../../sims/licenses-vendor-incentive-explorer/main.html){ .md-button .md-button--primary }

<details markdown="1">
<summary>Vendor Incentive Explorer</summary>
Type: microsim
**sim-id:** licenses-vendor-incentive-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** attribute<br/>
**Learning Objective:** The learner will attribute each of 8 vendor decisions to the pricing model, one-time or subscription, whose incentives make it more likely, scoring at least 7 of 8.

**Prerequisites:** one-time license, subscription license, recurring revenue, upgrade revenue, customer lifetime value, vendor incentives (defined in the chapter section "How Pricing Shapes Vendor Behavior").

**Evidence of Mastery:** The learner chooses One-time license or Subscription license for each of 8 decisions. A choice is correct when it equals the Correct model column in Content. Mastery is 7 of 8 correct on the first pass. Reading the revenue summaries is exploration and is not scored.

**Misconceptions:** (1) Vendors behave the same way under every pricing model. (2) Subscription pricing only changes how customers pay and not what vendors build.

**Instructional Rationale:** Attributing a decision to an incentive makes the learner trace a cause, which is the Analyze-level act, instead of memorizing which model is better.

**Content:**

The revenue summaries shown before the decisions:

| Model | Where the next dollar comes from | The vendor's strongest incentive |
|---|---|---|
| One-time license | A new buyer or an upgrade purchase | Win new buyers and make upgrades look worth buying |
| Subscription license | A renewal or a higher fee | Prevent cancellation and raise what each customer pays |

The 8 decisions, in this fixed order:

| # | Vendor decision shown | Correct model | Why (shown as feedback) |
|---|---|---|---|
| 1 | Add a showy feature so owners feel they must buy the next version. | One-time license | Upgrade revenue depends on making the next version look new. |
| 2 | Keep customers satisfied so they renew every year. | Subscription license | Each renewal is the next dollar, so keeping the customer matters. |
| 3 | Charge for each major version. | One-time license | The sale of a version is the revenue event. |
| 4 | Make cancellation steps long and hard to find. | Subscription license | Each canceled customer ends the recurring revenue. |
| 5 | Stop fixing bugs in old versions to push owners to the new one. | One-time license | Owners of old versions pay nothing more until they upgrade. |
| 6 | Raise the annual fee, expecting most customers to renew. | Subscription license | Customers who are locked in may pay more rather than switch. |
| 7 | Compete mainly on the number of new customers won each quarter. | One-time license | Without renewals, revenue depends on new sales. |
| 8 | Add reminders and features that bring users back every week. | Subscription license | Frequent use makes renewal feel worthwhile. |

**Provenance:** All eight decisions are illustrative scenarios invented for this chapter and derived from the incentives defined in the chapter text; the sim labels them illustrative.

**Rules:** Each decision is answered once. The score is the number of correct answers out of 8. Mastery is a score >= 7.

**Learner Activity:**

1. The learner reads the revenue summaries for the two models.
2. The learner reads decision 1 and chooses a model.
3. The sim shows right or wrong with the Why text.
4. The learner moves through decisions 2 to 8 and then sees the score.

**Feedback:** Eight decisions in fixed order, one attempt each. Correct: "Correct" with the Why text. Incorrect: the correct model and the Why text. The final screen shows "n of 8" and the message "Mastery reached" when n >= 7.

**Starting State:** Both revenue summaries are visible and decision 1 is shown. The question on screen is "Which pricing model makes this decision more likely?"

**Chapter Anchors:** The chapter states that 10,000 customers at $30 per year produce about $300,000, that a five-year customer paying $30 per year is worth $150, and that the explorer has 8 decisions.
</details>

## Switching Costs, File Formats, and Lock-In

A subscription's strongest advantage for the vendor is not the price. It is the moment of renewal, when the customer must decide yes or no once more. Every decision to stay is easier when leaving is expensive.

**Switching costs** are the costs a customer bears to move from one product to another, including money, time, effort, and risk. They can be small, like downloading another app, or large, like retraining a team and converting ten years of files. They matter to vendors because a customer who would face a high switching cost will tolerate a price increase that a free-to-leave customer would not.

A **proprietary file format** is a file layout that is defined and controlled by one vendor, and that other tools cannot reliably read or write. If your work is stored in such a format, leaving the vendor means converting every file, losing some information in the conversion, or abandoning the work. By contrast, an open format such as PNG for images or plain text for notes can be opened by many programs. The format is a hidden part of the price.

**Vendor lock-in** is the condition in which a customer's switching costs are high enough that they stay with a vendor even when a better or cheaper option exists. Lock-in is the combined result of the two terms above: the more of your work lives in a format only the vendor can read, the higher the cost of leaving. Lock-in need not be malicious. It is often a side effect of a vendor building features that only work within its own system.

The distinction between open and proprietary formats can be seen in a short comparison. Each row asks: if the vendor disappeared tomorrow, could you still use the file?

| Kind of file | Format | Readable by other tools? | Lock-in risk |
|---|---|---|---|
| A screen image saved as PNG | Open | Yes, by nearly everything | Very low |
| A note saved as plain text | Open | Yes | Very low |
| A project saved in a vendor's own editor format | Proprietary | Only by that vendor's tools | High |
| An image library kept in a vendor's cloud gallery | Proprietary storage | Only through the vendor's service | High |

For the book's case, the author's job produces a plain image on the clipboard. The output is already in an open format, so the switching cost of leaving is close to zero. That is a large part of why a two-feature replacement is realistic.

A worked example shows the calculation. Suppose a user has 200 files in a vendor's format, and each takes 1 minute to convert. Their time is worth $40 per hour, and learning a replacement tool takes 4 hours. The conversion takes \( 200 \times 1 / 60 = 3.33 \) hours, which at $40 costs $133.33. Learning costs \( 4 \times \$40 = \$160 \). The total switching cost is $293.33. If the move saves $90 per year in fees, the cost is recovered in \( 293.33 / 90 = 3.26 \) years. A vendor that knows this can raise the fee a little each year without losing the customer.

!!! mascot-tip "Test the exit before you enter"
    ![Pinch giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Before you commit to a tool, export one file into an open format and open it somewhere else. If that is hard now, it will be harder after a thousand files.

The calculator below lets you change the inputs and compute the years needed to recover a switching cost. It also includes the open-format case, where the conversion cost is zero.

#### Diagram: Switching Cost Calculator

<iframe src="../../sims/licenses-switching-cost-calculator/main.html" height="668px" width="100%" scrolling="no"></iframe>

[Run the Switching Cost Calculator MicroSim Fullscreen](../../sims/licenses-switching-cost-calculator/main.html){ .md-button .md-button--primary }

<details markdown="1">
<summary>Switching Cost Calculator</summary>
Type: microsim
**sim-id:** licenses-switching-cost-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the years needed to recover a switching cost from the annual fee saved, to within 0.1 years, for 3 challenge cases.

**Prerequisites:** switching costs, proprietary file format, vendor lock-in, annual fee (defined in the chapter sections above).

**Evidence of Mastery:** For 3 challenge cases, the learner types the years to recover the switching cost before the sim shows it. An entry is correct when it is within +/- 0.1 of the Model value in Content. Mastery is 3 of 3 correct. Changing the inputs freely is exploration and is not scored.

**Misconceptions:** (1) Switching is free if the new tool is free. (2) Files in an open format cost nothing to move, so lock-in is unrelated to file format.

**Instructional Rationale:** Computing the payback period from the learner's own inputs makes the learner apply the chapter's formula and see how conversion work stretches the recovery time.

**Content:**

All figures are illustrative and the sim labels them illustrative.

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Files in the vendor's format | 0 | 1000 | 50 | 200 | files |
| Minutes to convert one file | 1 | 10 | 1 | 1 | minutes |
| Value of the learner's time | 10 | 100 | 5 | 40 | dollars per hour |
| Hours to learn the replacement | 0 | 20 | 1 | 4 | hours |
| Annual fee saved | 10 | 300 | 10 | 90 | dollars per year |

Challenge cases, in this order:

| # | Files | Minutes per file | Time value ($/h) | Learning hours | Fee saved ($/yr) | Switching cost ($) | Model value: years |
|---|---|---|---|---|---|---|---|
| 1 | 200 | 1 | 40 | 4 | 90 | 293.33 | 3.3 |
| 2 | 600 | 2 | 30 | 2 | 90 | 660.00 | 7.3 |
| 3 | 0 | 1 | 40 | 4 | 90 | 160.00 | 1.8 |

Feedback text per case: case 1 "Conversion is 200 x 1 / 60 = 3.33 h = $133.33; learning is $160; total $293.33; 293.33 / 90 = 3.26, which rounds to 3.3." Case 2 "Conversion is 600 x 2 / 60 = 20 h = $600; learning is $60; total $660; 660 / 90 = 7.33, which rounds to 7.3." Case 3 "No files means no conversion cost; learning is $160; 160 / 90 = 1.78, which rounds to 1.8."

**Provenance:** The case 1 numbers are the chapter's worked example. Cases 2 and 3 are illustrative and invented for this chapter.

**Rules:** Conversion cost = files x minutes / 60 x time value. Learning cost = learning hours x time value. Switching cost = conversion cost + learning cost. Years to recover = switching cost / annual fee saved, rounded to 1 decimal place. The annual fee saved is always at least 10, so division by zero cannot occur.

**Learner Activity:**

1. The learner changes the five inputs and sees the conversion cost, learning cost, switching cost, and years to recover update.
2. The learner starts the challenges; for each, the sim sets the five inputs and hides the result.
3. The learner types the years to recover and presses Check.
4. The learner returns to free exploration and should notice that doubling the file count roughly doubles the conversion cost but not the learning cost.

**Feedback:** Three cases in fixed order, two attempts each. Correct: "Correct: n years." Incorrect on the first attempt: the matching feedback text without the final number. After the second wrong attempt, the full feedback text and the Model value are shown and the case counts as missed. "Correct: n of 3" is displayed.

**Starting State:** The defaults are shown (200 files, 1 minute, $40 per hour, 4 hours, $90 per year) with the result 3.3 years displayed. The question on screen is "How long until switching pays for itself?"

**Chapter Anchors:** The chapter's worked example states 200 files, 1 minute each, $40 per hour, 4 hours of learning, a switching cost of $293.33, $90 saved per year, and recovery in 3.26 years.
</details>

## Free Options and the Freemium Model

Not every route is a paid one. The **freemium model** gives a basic version of a product away for free and charges for advanced features or higher limits. The free version attracts users cheaply, and some fraction of them convert to paying customers. Freemium works well for the vendor when the free tier is useful enough to spread, but limited enough that heavy users upgrade.

A worked example: a utility offers free grabs but charges $30 per year to remove a watermark or unlock the editor. For the author's two-feature job, the free tier may already be enough. For someone who needs the editor, the free tier is a trial. Freemium pricing therefore depends on the vendor believing that most users will not pay, and structuring the product so that the bloat is behind the paywall.

**Free alternatives** are products offered without charge that do jobs similar to a paid product's. They come from open-source projects, from operating systems that bundle a basic version, and from small developers. Free alternatives change the calculation of a price rise: the real switching cost is no longer the fee of another product but only the effort of moving. Whether a free alternative is good enough depends on the job to be done, which Chapter 1 told you to write down first.

!!! mascot-celebration "You can follow the money"
    ![Pinch celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now trace a product's price from copyright through the license to the subscription, and say how recurring revenue, switching costs, and lock-in steer what a vendor does. That is the machinery behind the $9 to $450 story.

## Key Takeaways

- Copyright gives the author control; a software license is the permission the author grants.
- A one-time perpetual license buys a version for good; a subscription rents access and repeats the charge.
- Per-computer pricing multiplies the fee by machines; per-user pricing multiplies it by people.
- Recurring revenue, upgrade revenue, and customer lifetime value shape what a vendor builds.
- Proprietary file formats raise switching costs, and high switching costs produce vendor lock-in.

[See Annotated References](./references.md)
