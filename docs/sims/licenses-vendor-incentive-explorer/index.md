---
title: "Vendor Incentive Explorer"
description: "The learner will attribute each of 8 vendor decisions to the pricing model, one-time or subscription, whose incentives make it more likely, scoring at least 7 of 8."
status: built
library: p5.js
bloom_level: Analyze
---

# Vendor Incentive Explorer

<iframe src="main.html" width="100%" height="593px" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## How to Use This MicroSim

- **Read** the two revenue summaries at the top. They show where each model's next dollar comes from and the vendor's strongest incentive.
- **Attribute** each vendor decision by pressing **One-time license** or **Subscription license**. You get one attempt per decision.
- **Read the feedback**, then press **Next Decision**. The dots track your right and wrong answers.
- After decision 8, the sim shows your score out of 8 and lists any decisions to review. Mastery is 7 of 8. Press **Restart** to try again.
- All eight decisions are illustrative.

## Lesson Plan

**Grade level:** Adult continuing education and professional development. **Time:** 12 minutes.

1. **Frame (2 min).** Ask: "If a vendor earns money only when you buy a new version, what would they want to build?" Then ask the same question for a vendor who earns money only when you renew.
2. **Attribute (6 min).** Learners work through the eight decisions. For each one they name the next dollar the decision protects before pressing a button.
3. **Review (2 min).** Learners reread the Why text for any decision they missed and match it to a row of the revenue summaries.
4. **Discuss (2 min).** Ask which decisions help the customer and which work against the customer, and whether the same company might make both kinds.

**Misconceptions to watch for:**

- Vendors behave the same way under every pricing model. The decisions split four and four because the next dollar comes from a different place.
- Subscription pricing only changes how customers pay and not what vendors build. Decisions 4, 6, and 8 change the product itself.
- Learners sometimes treat customer satisfaction as belonging to one model only. Point out that decision 2 is about renewal, which is the subscription vendor's revenue event.

## Specification

The full specification below is extracted from
[Chapter 3: Licenses, Subscriptions, and Vendor Incentives](../../chapters/03-licenses-subscriptions/index.md).

```text
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
```

## Related Resources

- [Chapter 3: Licenses, Subscriptions, and Vendor Incentives](../../chapters/03-licenses-subscriptions/index.md)
