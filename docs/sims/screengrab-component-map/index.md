---
title: "ScreenGrab Component Map"
description: "The learner will explain the order in which seven components handle one immediate screen grab, by choosing the next component correctly in at least 5 of 6 steps."
status: built
hide:
  - toc
library: Infographic Overlay
bloom_level: Understand
---

# ScreenGrab Component Map

<iframe src="main.html" width="100%" height="762" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## How to Use This MicroSim

!!! note "Illustration needed"
    This sim needs `component-map-illustration.png` before its markers appear. Render it from `image-prompt.md` in this directory.

- **Explore:** hover over a numbered marker or a label to read what that component does.
- **Predict:** press **Predict** and choose the next component at each of six steps. You get one attempt per step, and each answer reveals a connection. Mastery is 5 of 6.

## The Seven Components

1. Crop
2. Global hotkey
3. Screen freeze
4. Clipboard
5. Permission check
6. Selection overlay
7. Menu bar item

The numbers mark positions on the illustration. They are not the order of the path.

## Lesson Plan

**Grade level:** Undergraduate. **Time:** 10 minutes.

1. **Explore (3 min).** Hover over each marker and read what the component does. Ask learners to guess the order of a grab before predicting.
2. **Predict (5 min).** Learners choose the next component at each of six steps. Mastery is 5 of 6.
3. **Discuss (2 min).** Two starts, the hotkey and the menu command, merge at the permission check. Ask why the menu bar item does not capture anything itself.

**Misconceptions to watch for:** the picture is taken after the drag finishes; the permission is checked once at install and never again; the menu bar icon does the capturing.

## Specification

The full specification below is extracted from
[Chapter 8: Software Design and Platform Constraints](../../chapters/08-software-design-platform/index.md).

```text
Type: infographic-overlay
**sim-id:** screengrab-component-map<br/>
**Library:** Infographic Overlay (diagram.js)<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** explain<br/>
**Learning Objective:** The learner will explain the order in which seven components handle one immediate screen grab, by choosing the next component correctly in at least 5 of 6 steps.

**Image:** A text-free illustration of the seven components, spaced around a ring so that position and marker number do not reveal the path. Labels, markers and arrows are rendered over it at runtime.

**Prerequisites:** menu bar app, global hotkey, screen recording permission, freeze-frame selection, clipboard output, component (all defined in this chapter above this block).

**Evidence of Mastery:** At each of six steps the learner commits the next component in the path before it is revealed. A choice is correct when it matches the "Next component" column in Content. Mastery is 5 of 6 correct. Clicking a component to read its description is exploration, not evidence.

**Misconceptions:** (1) The picture is taken after the user finishes dragging. (2) The permission is checked only once at install time and then never matters. (3) The menu bar icon does the capturing.

**Instructional Rationale:** Predicting the next component forces the learner to reason from each component's job to the sequence, which shows the design is understood as a flow and not as a list of parts.

**Content:**

The seven components (the nodes), each with the description shown when the learner opens it. The map is a simplified, illustrative teaching model of the design described in this chapter.

| # | Component | Description shown |
|---|---|---|
| 1 | Global hotkey | Listens for Control-Shift-4 from any application and starts a grab |
| 2 | Menu bar item | Shows the icon in the menu bar and offers a menu command that starts a grab; it does not capture anything itself |
| 3 | Permission check | Confirms that screen recording permission has been granted; if not, tells the user what to change |
| 4 | Screen freeze | Captures the whole screen as a still picture at the moment of the grab |
| 5 | Selection overlay | Shows the still picture and lets the user drag a rectangle over it |
| 6 | Crop | Cuts the chosen rectangle out of the still picture |
| 7 | Clipboard | Receives the cropped image so that it can be pasted |

The connections (the edges), shown as the path of one immediate grab: Global hotkey to Permission check; Menu bar item to Permission check; Permission check to Screen freeze; Screen freeze to Selection overlay; Selection overlay to Crop; Crop to Clipboard.

Six prediction steps, in this order:

| Step | Component shown | Choices | Next component | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | Global hotkey | Permission check; Crop; Clipboard | Permission check | Nothing can be captured until permission is confirmed |
| 2 | Permission check | Selection overlay; Screen freeze; Clipboard | Screen freeze | With permission confirmed, the whole screen is captured as a still |
| 3 | Screen freeze | Crop; Selection overlay; Global hotkey | Selection overlay | The still picture is displayed so the user can drag over it |
| 4 | Selection overlay | Clipboard; Crop; Screen freeze | Crop | The chosen rectangle is cut from the still picture |
| 5 | Crop | Clipboard; Permission check; Menu bar item | Clipboard | The cropped image is delivered to the clipboard |
| 6 | Menu bar item | Permission check; Selection overlay; Clipboard | Permission check | The menu command starts the same path, so it also goes through the permission check first |

**Provenance:** Component names and the order come from this chapter, sections "Menu Bar App", "Global Hotkey", "Screen Recording Permission", "Freeze-Frame Selection" and "Clipboard Output" (Chapter 7). The map is a simplified teaching model, and the sim labels it "simplified and illustrative, not the source code layout".

**Rules:** The path has exactly one correct next component at each step. The two start points (Global hotkey and Menu bar item) merge at Permission check. Choices are shown in the fixed order of the table.

**Learner Activity:**

1. The learner sees the seven components and may open any one to read its description.
2. The learner starts the six prediction steps. At each step the current component is highlighted and the learner chooses the next one from three choices.
3. After each choice the sim reveals the correct next component, draws the connection, and shows the Why text.
4. After step 6, the full path is shown, and the learner should notice that two different starts share the same path.

**Feedback:** Six steps, fixed order, one attempt each. Correct: "Correct: <component>" and the Why text. Incorrect: the correct component and the Why text. A running count "Correct: n of 6" is shown. A final score of 5 or 6 shows "You can trace a grab"; a lower score invites a restart.

**Starting State:** The seven components are shown with no connections drawn, and the question is "What happens first when the user presses the hotkey?"

**Chapter Anchors:** The chapter states seven components, six prediction steps, mastery at 5 of 6, and the hotkey Control-Shift-4.
```

## Related Resources

- [Chapter 8: Software Design and Platform Constraints](../../chapters/08-software-design-platform/index.md)
- [ScreenGrab design](../../design.md)
