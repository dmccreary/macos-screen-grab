---
title: "Design Trade-Off Judge"
description: "The learner will judge which of two options best serves a stated priority in each of 8 design decisions, with at least 6 correct."
status: scaffold
library: p5.js
bloom_level: Evaluate
---

# Design Trade-Off Judge



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 8: Software Design and Platform Constraints](../../chapters/08-software-design-platform/index.md).

```text
Type: microsim
**sim-id:** design-trade-off-judge<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** judge<br/>
**Learning Objective:** The learner will judge which of two options best serves a stated priority in each of 8 design decisions, with at least 6 correct.

**Prerequisites:** design decision, design trade-off, third-party dependency, zero-dependency design, native application, menu bar app, global hotkey, hotkey conflict, screen recording permission, freeze-frame selection, prototype (all defined in this chapter above this block).

**Evidence of Mastery:** For each decision the learner commits one of two options. A choice is correct when it matches the "Better option" column in Content. Mastery is 6 of 8 correct. Reading the trade-off summary of an option before choosing is exploration.

**Misconceptions:** (1) Using a library is always better because it is less work. (2) The most feature-rich option is the best design. (3) A design decision has a right answer apart from the priority it serves.

**Instructional Rationale:** Evaluating means choosing against a criterion. Each decision states its criterion as a priority, so the learner must connect a trade-off to what the specification values instead of picking the option that sounds more impressive.

**Content:**

The eight decisions, in this order. All are illustrative and based on the ScreenGrab design described in the chapter.

| # | Decision | Stated priority | Option 1 | Option 2 | Better option | Why (shown as feedback) |
|---|---|---|---|---|---|---|
| 1 | How to read the screen's pixels | No third-party libraries; easy to maintain | Use the platform's own capture capability | Add a third-party capture library | Option 1 | It meets the no-libraries priority and leaves nothing outside to update |
| 2 | How the tool presents itself | Always ready; no window clutter | A regular app with a window and a Dock icon | A menu bar app | Option 2 | A menu bar app is always available and stays out of the way |
| 3 | How to start a capture while another app is in front | Works from any application | A shortcut that works only while the tool's own window is in front | A global hotkey | Option 2 | Only a global hotkey is reported to the tool when another app is in front |
| 4 | How to pick the region | The picture matches what the user saw when starting | Let the user drag over the live screen | Freeze the screen first, then drag over the still picture | Option 2 | A frozen picture cannot change during the drag |
| 5 | Which shortcut to choose | Avoid clashing with the system | Reuse Command-Shift-4 | Choose a combination the system does not already use | Option 2 | Command-Shift-4 is already a built-in macOS screenshot shortcut, which would conflict |
| 6 | How to learn whether hotkeys work for a background app | Find problems early and cheaply | Build the whole app, then test the hotkey | Write a tiny prototype that only registers the hotkey and prints a message | Option 2 | A prototype answers the risky question in minutes before the rest is built |
| 7 | How to build for a Mac-only tool | Small size; fits the system | A native application | A cross-platform shell wrapping a web page | Option 1 | Native is smaller and integrates directly, and no other platform is needed |
| 8 | What to do when screen recording permission is missing | Avoid blank pictures without explanation | Capture anyway and hope the picture is right | Detect the missing permission and tell the user what to change | Option 2 | Without the permission, captures can look wrong with no error, so the user needs a message |

Counts: Option 1 is better in 2 decisions (1 and 7), Option 2 is better in 6 decisions (2, 3, 4, 5, 6, 8).

**Provenance:** Decisions are illustrative and based on this chapter's sections. The Command-Shift-4 system shortcut is a standard macOS feature described in the section "Hotkey Conflict". The sim labels the scenarios "illustrative".

**Rules:** Each decision has exactly one better option given its stated priority. Option order is as in the table. Stating the priority is part of each decision. A decision cannot be re-answered.

**Learner Activity:**

1. The learner reads decision 1, its stated priority, and the two options.
2. The learner chooses Option 1 or Option 2 and confirms.
3. The sim shows whether the choice is correct and the Why text, then moves on.
4. After decision 8, the sim shows the score and, for each decision answered wrongly, the priority it served. The learner should notice that the right answer follows the priority.

**Feedback:** Eight decisions, fixed order, one attempt each. Correct: "Correct" and the Why text. Incorrect: the better option and the Why text. A running count "Correct: n of 8" is shown. A final score of 6 or more shows "You can judge a design"; a lower score invites a restart.

**Starting State:** Decision 1 is shown with its priority and two options, and the question "Which option better serves the priority?"

**Chapter Anchors:** The chapter states that Command-Shift-3, 4 and 5 are macOS's built-in screenshot shortcuts, that ScreenGrab uses Control-Shift-4, and that the app uses no third-party dependencies. The judge has 8 decisions with mastery at 6 of 8.
```

## Related Resources

- [Chapter 8: Software Design and Platform Constraints](../../chapters/08-software-design-platform/index.md)
