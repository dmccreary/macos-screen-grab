---
title: "License Offer Sorter"
description: "The learner will classify six described software offers by when payment is made (one time or recurring) and by what is counted (per computer or per user), getting both answers right for at least 5 of 6 offers."
status: built
library: p5.js
bloom_level: Understand
---

# License Offer Sorter

<iframe src="main.html" width="100%" height="552" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## How to Use This MicroSim

- **Read the offer.** Each offer card says how the price is paid and what it is tied to. All six offers and prices are illustrative.
- **Choose twice.** Pick a payment pattern (**One time** or **Recurring**) and a counting unit (**Per computer** or **Per user**). You can change either choice until you press **Check**.
- **Check.** Each choice is marked right or wrong, and the reason appears. You get one attempt per offer.
- **Look up a term.** Tick **Show definitions** at any time to read the four terms. Reading them is not scored.
- **Finish.** After offer 6 the sim shows your score out of 6 and the correct pair for every offer. Mastery is 5 of 6.

## Lesson Plan

**Grade level:** Undergraduate or adult learners. **Time:** 10 minutes.

1. **Warm up (2 min).** Ask learners how they paid for the last app they bought. Was it once, or every month? Was it for one machine or for them as a person?
2. **Sort (5 min).** Learners work through the six offers alone. Encourage them to decide each dimension separately before pressing Check.
3. **Discuss (3 min).** Compare offers 1 and 6, which are both one-time payments but count different things. Then compare offers 2 and 5, which are both recurring. Ask what the book's $30-per-computer-per-year fee costs for three computers ($90 per year).

**Misconceptions to watch for:** a one-time price means the license is per computer; a subscription always counts users rather than machines.

## Specification

The full specification below is extracted from
[Chapter 3: Licenses, Subscriptions, and Vendor Incentives](../../chapters/03-licenses-subscriptions/index.md).

```text
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
```

## Related Resources

- [Chapter 3: Licenses, Subscriptions, and Vendor Incentives](../../chapters/03-licenses-subscriptions/index.md)
