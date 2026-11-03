---
title: "Why Features Get Added Sorter"
description: "The learner will distinguish four reasons a vendor adds a feature by assigning each of 8 described situations to the correct reason, scoring at least 7 of 8."
status: built
library: p5.js
bloom_level: Analyze
---

# Why Features Get Added Sorter

<iframe src="main.html" width="100%" height="552" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## How to Use This MicroSim

- **Read the four reasons.** Each answer button shows a reason and its definition. On a narrow screen only the reason names fit on the buttons.
- **Read the situation.** All eight situations are illustrative.
- **Choose one reason.** Your first click is your answer. The sim marks it right or wrong at once and gives the reason.
- **Move on.** Press **Next** for the next situation. An answered situation cannot be changed.
- **Review.** After situation 8 the sim shows your score out of 8, the reasons you confused most often, and the correct reason for every situation. Mastery is 7 of 8.

## Lesson Plan

**Grade level:** Undergraduate or adult learners. **Time:** 10 minutes.

1. **Predict (2 min).** Ask learners to guess what fraction of the features in a big app exist because users asked for them.
2. **Sort (5 min).** Learners assign the eight situations alone. Remind them to look for the trigger: data, a plan, a rival, or a comparison chart.
3. **Discuss (3 min).** Use the confusion list. Situations 6 and 7 both involve a plug-in interface but have different causes. Ask which of the four reasons is the healthy one, and why the other three keep adding features that most people never use.

**Misconceptions to watch for:** every feature exists because customers asked for it; a longer feature list always means a better product.

## Specification

The full specification below is extracted from
[Chapter 2: Feature Usage and the 80% Rule](../../chapters/02-feature-usage/index.md).

```text
Type: microsim
**sim-id:** usage-feature-driver-sorter<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** distinguish<br/>
**Learning Objective:** The learner will distinguish four reasons a vendor adds a feature by assigning each of 8 described situations to the correct reason, scoring at least 7 of 8.

**Prerequisites:** usage telemetry, product roadmap, competitive feature matching, feature checklist marketing (defined in the chapter sections "Measuring Feature Usage" and "Why Features Keep Arriving").

**Evidence of Mastery:** The learner assigns each situation to one of four reasons. An assignment is correct when it equals the Correct reason column in Content. Mastery is 7 of 8 correct on the first attempt through. Reading the reason definitions is exploration and is not scored.

**Misconceptions:** (1) Every feature exists because customers asked for it. (2) A longer feature list always means a better product.

**Instructional Rationale:** Sorting similar-looking situations forces the learner to attend to the trigger behind each addition, which is the distinction at the Analyze level.

**Content:**

The four reasons, with the definition shown to the learner:

| Reason | Definition shown |
|---|---|
| Customer need shown by usage | The vendor adds the feature because telemetry or customer requests show many users need it. |
| Product roadmap | The vendor adds the feature because it is on a plan made to show progress and growth. |
| Competitive feature matching | The vendor adds the feature because a rival has it. |
| Feature checklist marketing | The vendor adds or counts the feature so the product wins a feature-by-feature comparison. |

The 8 situations, in this fixed order:

| # | Situation shown | Correct reason | Why (shown as feedback) |
|---|---|---|---|
| 1 | A rival announces AI summaries, and the vendor ships its own within a quarter. | Competitive feature matching | The trigger is the rival's move, not any request from users. |
| 2 | Telemetry shows 40% of users resize every grab by hand, so the vendor adds a resize handle. | Customer need shown by usage | Usage data shows a widespread need. |
| 3 | A three-year plan names cloud collaboration as the headline of next year's release. | Product roadmap | The feature comes from a plan, not from a stated need. |
| 4 | A package says "120+ features" and counts every menu item and setting. | Feature checklist marketing | The count is chosen to look large in a comparison. |
| 5 | Many support tickets ask for a delay timer, so the vendor adds one. | Customer need shown by usage | Repeated requests from users are a direct signal of need. |
| 6 | A comparison page ticks every row against the rivals, including a rarely used plug-in interface. | Feature checklist marketing | The row exists to earn a check mark, not to serve a job. |
| 7 | A planned platform release schedules a plug-in interface for the second half of the year. | Product roadmap | The date and scope come from the vendor's plan. |
| 8 | After a competitor adds screen recording, the vendor adds recording although no customer asked. | Competitive feature matching | The competitor's feature, not demand, is the cause. |

**Provenance:** All 8 situations are illustrative scenarios invented for this chapter; the sim labels them illustrative.

**Rules:** Each situation is assigned once to exactly one reason. The score is the number of correct assignments out of 8. Mastery is a score >= 7 on the first pass.

**Learner Activity:**

1. The learner reads the four reasons and their definitions.
2. The learner sees situation 1 and chooses one reason.
3. The sim shows whether the choice was correct, with the Why text, and the learner moves to the next situation.
4. After situation 8, the learner sees the score and which reasons they confused most often.

**Feedback:** Eight items in fixed order, one attempt each. Correct: "Correct" with the Why text. Incorrect: the correct reason and the Why text. The final screen shows "n of 8" and the message "Mastery reached" when n >= 7.

**Starting State:** The four reasons are listed with situation 1 shown. The question on screen is "Why was this feature added?"

**Chapter Anchors:** The chapter states that the sorter has 8 situations and 4 reasons, and that one reason, customer need shown by usage, is the healthy one.
```

## Related Resources

- [Chapter 2: Feature Usage and the 80% Rule](../../chapters/02-feature-usage/index.md)
