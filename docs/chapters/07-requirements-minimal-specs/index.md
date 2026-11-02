---
title: "Requirements and Minimal Specifications"
description: "How to move from a user need to functional and non-functional requirements, scope boundaries, non-goals, acceptance criteria and a minimal specification, using ScreenGrab's region selection, delayed capture and clipboard output as the running example."
generated_by: claude skill chapter-content-generator
date: "2026-11-01 20:17:47"
version: 1.11
---

# Requirements and Minimal Specifications

## Summary

This chapter begins the build sequence with the step that does the most to limit cost: deciding what to leave out. It moves from user needs to functional and non-functional requirements, scope boundaries, non-goals, acceptance criteria, and the minimal specification, using ScreenGrab's region selection, delayed capture, and clipboard output as the running example. After this chapter, you will be able to write a minimal specification for a small tool and explain why its omissions matter.

## Concepts Covered

This chapter covers the following 17 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| User Need | 141 |
| Requirements | 140 |
| Functional Requirement | 91 |
| Non-Functional Requirement | 41 |
| Scope Boundaries | 6 |
| Non-Goals | 5 |
| Explicit Assumptions | 1 |
| Default Behavior | 1 |
| Acceptance Criteria | 49 |
| Software Specification | 40 |
| Minimal Specification | 4 |
| Specification Review | 1 |
| Screen Capture | 25 |
| Screen Grab Tool | 20 |
| Region Selection | 9 |
| Delayed Capture | 4 |
| Clipboard Output | 4 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Software Features and the Anatomy of Bloat](../01-software-bloat/index.md)
- [Chapter 2: Feature Usage and the 95/5 Rule](../02-feature-usage/index.md)
- [Chapter 5: Generative AI and Coding Agents](../05-generative-ai-coding-agents/index.md)

---

!!! mascot-welcome "The Cheapest Place to Cut"
    ![Pinch waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    A feature you never ask for is a feature the agent never writes, never tests, and never breaks. In this chapter you will learn to write the short document that makes those omissions explicit. Grab only what you need!

## The Running Example: Screen Capture

**Screen capture** is the act of recording what is currently displayed on a computer screen as a picture. The result is an image file or an image held in memory, such as on the clipboard. People use it constantly: to show a colleague an error message, to save a receipt on a web page, or to put a chart from one program into a report. A single still picture is called a screenshot. The capture can cover the whole screen, one window, or a chosen rectangle, and the picture contains only what was visible at that instant: it cannot include anything hidden behind another window or below the edge of the display. Recording the screen as moving video is a different job that needs different tools, and this chapter leaves it out on purpose.

A **screen grab tool** is a program whose job is to perform screen capture on demand. You trigger it with a menu or a keyboard shortcut, it takes the picture, and it puts the result somewhere useful. Commercial screen grab tools tend to grow far beyond that. Typical additions include drawing and annotation, capturing a scrolling web page, recording video, cloud storage and sharing links, text recognition, and team accounts. Each addition is a software feature in the sense of Chapter 1, and each one adds code, tests, and decisions. A screen grab tool is therefore a good teaching case for this course: the core job is tiny and well understood, while the feature list around it can grow without limit. Because most readers have used one, you can judge each requirement in this chapter against your own experience.

A worked example anchors the chapter. The ScreenGrab author used a paid tool and needed exactly two things from it: grab a region of the screen, and grab a region after a delay, with the image going to the clipboard. Every other feature in the product was something the author paid for and did not use. The rest of this chapter turns that observation into a document an AI coding agent can build from.

| Feature in a typical commercial tool | Needed by the author? |
|---|---|
| Grab a region of the screen | Yes |
| Grab a region after a delay | Yes |
| Put the image on the clipboard | Yes |
| Annotate or draw on the image | No |
| Record video | No |
| Capture a scrolling page | No |
| Upload and share through a cloud account | No |

## From User Need to Requirements

### User Need

A **user need** is a problem a person has or a result a person wants, stated without choosing how to achieve it. It describes the goal, not the product. This connects directly to the job to be done from Chapter 1: the need is the job.

The difference between a need and a feature is easy to miss, so it deserves a careful look. "I need a screenshot app with a toolbar" names a solution. "I need to paste a picture of part of my screen into an email" names a need. The second statement leaves room for many solutions, including a very small one. The first statement already contains a toolbar, and an agent will faithfully build it.

To find the real need behind a request, keep asking what the person is trying to do and why. A worked example shows the chain for the ScreenGrab author:

1. "I want a screenshot tool." What for?
2. "To show someone part of what is on my screen." What do you do with the picture?
3. "I paste it into a message or document." Do you need the file afterward?
4. "No, the paste is the end of it."

The chain turns a vague wish into a precise need: put a picture of a chosen part of the screen on the clipboard, and nothing else. It also produced a cut: the author did not need to save files, so the tool will not save files.

A reliable way to write a need is to use a fixed sentence shape: "A person who is doing X needs to Y so that Z." For the author: "A person writing a message needs to put a picture of part of the screen into it so that the reader sees exactly what the writer sees." The shape forces you to name who is acting, what they need, and why. If you cannot fill in the "so that", you have probably written a feature instead of a need. Try the shape on a paid tool you use: a few honest minutes with it usually reveals that your real need is much smaller than the product.

| Statement | Need or solution? | Why |
|---|---|---|
| "Paste part of my screen into an email" | Need | States the result, not the means |
| "Give me a toolbar with arrows and highlights" | Solution | Prescribes a feature |
| "Share captures through a link" | Solution | Prescribes a method of sharing |
| "Show a colleague an error message quickly" | Need | States the purpose and leaves the method open |

!!! mascot-thinking "Ask for the Result, Not the Gadget"
    ![Pinch thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Think of the need as the destination and every feature as a possible vehicle. Name the destination first, and the agent is free to pick the smallest vehicle that gets you there. Name the vehicle first, and you get the whole garage.

### Requirements

**Requirements** are the specific statements of what a software product must do or must be, derived from the user need. If the need is the goal, the requirements are the checklist the finished tool must satisfy. A good requirement is clear, so that two readers understand it the same way. It is necessary, so that removing it would fail the need. And it is testable, so that someone can show whether it was met.

Requirements matter more when an AI agent builds the software, because the agent reads them literally and does not ask for the meaning behind a word. A human developer might notice that "support images" probably means common formats. An agent may choose any reading, or all of them. Precise requirements are cheap to write and reduce the amount the agent must guess, and each guess is a place where unwanted features or unwanted behavior can enter.

Each requirement should also trace back to the need. Ask of every line, "Which part of the need does this serve?" A requirement that serves no part of the need is a candidate for deletion, and that question is the single most effective way to keep a specification minimal. The table below applies the three tests to one requirement as it improves.

| Version | Clear? | Necessary? | Testable? |
|---|---|---|---|
| "The tool should be good at capturing." | No: "good" means different things | Unknown | No |
| "The tool shall capture images in several formats." | Partly: which formats? | No: the need ends at the clipboard | No: "several" has no count |
| "The tool shall place the captured region on the clipboard as an image." | Yes | Yes: the need is to paste it elsewhere | Yes: paste and look |

A worked example shows the traceability in action. The author lists a candidate requirement, "remember the last selected region." Tracing it back, no part of the need (grab a region, grab after a delay, copy to the clipboard) calls for it. It goes on the non-goals list. Requirements that survive this question are few, and that is what keeps the generated tool small.

A worked example from the ScreenGrab need produces three requirements: the user can select a region of the screen; the user can start a capture with a delay; the captured image is placed on the clipboard. Notice what is absent. Nothing is said about annotation, file formats, or sharing, because the need did not call for them.

Requirements fall into two families, described next. The table below previews them in one line each, after which the following sections explain each family with examples.

| Family | Answers the question | ScreenGrab example |
|---|---|---|
| Functional | What does the tool do? | Copy the selected region to the clipboard |
| Non-functional | How well, or under what limits, does it do it? | Complete a grab in under one second |

### Functional Requirements

A **functional requirement** states a specific behavior or function the software must provide: an action the user takes and the response the tool gives. Functional requirements are usually written as short sentences with the verb "shall", as in "The tool shall copy the captured image to the clipboard". The word "shall" marks something required, as opposed to something merely nice.

Good functional requirements describe observable behavior. You should be able to picture the user doing something and the tool responding. Compare two versions of the same requirement.

| Weak | Strong |
|---|---|
| "The tool handles region selection." | "The tool shall let the user select a rectangular region of the screen by dragging with the mouse." |
| "The tool supports a delay." | "The tool shall let the user start a capture that waits for a chosen number of seconds before the picture is taken." |
| "The tool works with the clipboard." | "The tool shall place the captured image on the system clipboard so that it can be pasted into other applications." |

The weak versions sound reasonable but leave the agent to guess what "handles", "supports", and "works with" mean. The strong versions can each be checked by a person at a keyboard in under a minute.

A complete functional requirement covers four things: what triggers the behavior, what the tool does, what the user sees or gets, and what happens when something goes wrong. The last one is easy to forget. For F2, the clipboard requirement, the error case might read: "If the screen cannot be read, the tool shall show a message and shall leave the clipboard unchanged." Without that line, the agent decides what a failure looks like, and the only way to learn its choice is to hit the failure.

A worked example lists an illustrative set of functional requirements for a ScreenGrab-style minimal tool, each with an identifier so later documents can refer to it:

| ID | Functional requirement |
|---|---|
| F1 | The tool shall let the user select a rectangular region of the screen by dragging with the mouse. |
| F2 | The tool shall place the captured region on the clipboard as an image. |
| F3 | The tool shall let the user start a capture that waits a chosen number of seconds before the picture is taken. |
| F4 | The tool shall let the user cancel a selection in progress by pressing the Escape key. |
| F5 | The tool shall start a region selection when the user presses the Control-Shift-4 hotkey. |

The first three come directly from the author's two needs. F4 and F5 are the small additions that make the tool usable: a way out of a mistake, and a quick way to start. The case study confirms that grabs from both the menu and the Control-Shift-4 hotkey were seen working.

### Non-Functional Requirements

A **non-functional requirement** states a quality the software must have or a limit it must respect, instead of a specific behavior. It describes how well the tool does its job, or the conditions it works under. Common families are speed, reliability, size, privacy, security, ease of installation, and the platforms it must run on.

Non-functional requirements are the ones most often left out, and then they are filled in by guess. If you do not say the tool must be small, the agent may add libraries that make it large. If you do not say it must not send data anywhere, you have not forbidden it. Vague quality words do no work: "fast", "secure", and "lightweight" cannot be checked. A usable non-functional requirement has a number, a named limit, or a clear yes or no.

Non-functional requirements also shape the design more than most people expect. A functional requirement tells the builder what to add, while a non-functional requirement tells the builder how to add it. "No third-party libraries" rules out a whole family of shortcuts, and "installable by running one script" forces the project to include an installer. Chapter 8 follows these choices into the design. Each non-functional line is cheap to write and sometimes expensive to satisfy, so keep the list short and include only the qualities you would actually check.

| Quality | Vague version | Checkable version (illustrative) |
|---|---|---|
| Speed | "It should be fast." | "A grab shall complete within 1 second of the user releasing the mouse button." |
| Dependencies | "Keep it lightweight." | "The tool shall use no third-party libraries." |
| Installation | "Easy to install." | "The tool shall be installable by running one script." |
| Platform | "Works on Macs." | "The tool shall run on macOS." |
| Privacy | "Respect my data." | "The tool shall not send captured images off the computer." |

The no-dependencies line is a real feature of the case study: the generated app uses no third-party dependencies. The other numbers in the table are illustrative examples of how to phrase a requirement, not measured results from ScreenGrab.

!!! mascot-warning "Beware the Quality Words"
    ![Pinch warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Words like "fast," "simple," and "secure" feel like requirements but carry none, because nobody can check them. They tempt you because they are quick to write. Replace each one with a number, a limit, or a yes-or-no statement before the agent sees it.

## Setting Boundaries

### Scope Boundaries

**Scope boundaries** are the lines that separate what a project includes from what it does not. The scope is the set of things the tool will do; the boundary is the edge. Without a boundary, a project drifts, because every new idea seems small on its own, and no single addition looks like the one that made the tool big. This drift is feature creep from Chapter 1, and in an AI-assisted project it happens quickly, since adding a feature is only one more sentence away.

Boundaries work best when written as concrete, checkable lines. "A small tool" is a hope, while "region capture, delayed capture, clipboard output, and nothing else" is a boundary. A worked example: midway through a project you think, "It would be nice to save a copy of each grab." Checking the boundary gives an immediate answer. File saving is not in the scope, so adding it means changing the scope on purpose, with its cost visible, not letting it slip in.

| Inside the scope | Outside the scope |
|---|---|
| Select a region by dragging | Whole-window or scrolling capture |
| Capture after a delay | Video recording |
| Image placed on the clipboard | Saving to files, sharing, cloud upload |
| Start by menu or hotkey | Editing or annotating the picture |

### Non-Goals

**Non-goals** are explicit statements of what the project will not do. They are the written form of the omissions. Where the scope lists what is in, the non-goals list the tempting things that are out. They are valuable for a reason specific to AI agents: an agent that is not told "no editing" may reasonably decide that a screenshot tool should have editing, because most screenshot tools do.

Writing a non-goal costs one line, and it prevents an entire feature from being generated, tested, and maintained. Non-goals also settle arguments later: when a new idea arrives, you check the list instead of debating it. A worked example of three non-goals for ScreenGrab:

1. The tool will not edit or annotate captured images.
2. The tool will not save captures to files or upload them anywhere.
3. The tool will not record video.

Each of these cuts directly against the typical commercial feature list in the table at the start of the chapter. This is the 95/5 rule from Chapter 2 put to use: the features most users never open are the ones to name as non-goals.

!!! mascot-tip "Write the 'No' Lines First"
    ![Pinch giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Before you list a single feature, write three or four non-goals for the features you know a similar product has. It takes two minutes, and the agent treats them as firm limits instead of suggestions.

### Explicit Assumptions

**Explicit assumptions** are the conditions a specification takes for granted and states openly, such as the platform the tool runs on or how the user will use it. Writing them down matters because an unstated assumption is invisible until it fails. ScreenGrab assumes a Mac running a recent version of macOS and one user capturing one display at a time. If either is false, the specification needs to change, and stating them makes that visible. A worked example: the author later runs the tool on a second computer with two displays. Because the assumption of one display at a time was written down, the problem is easy to place: the tool did what it was specified to do, and the assumption has stopped holding. The decision then is clear, either extend the specification or accept the limit.

### Default Behavior

**Default behavior** is what the tool does when the user has not chosen anything. A delay needs a default: if the user starts a delayed capture without picking a number, the tool must do something specific. Naming the default in the specification, for example "the delay defaults to 3 seconds", removes a question the agent would otherwise answer by guessing, and the tool behaves predictably on first use. Defaults are cheap decisions with a large effect, because most people never change a setting they were not asked to choose.

The sorter below lets you practice telling these four kinds of statement apart. The twelve illustrative statements are ones a ScreenGrab-style specification might contain, and you place each one in a category.

#### Diagram: Requirement Type Sorter

<details markdown="1">
<summary>Requirement Type Sorter</summary>
Type: microsim
**sim-id:** requirement-type-sorter<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** classify<br/>
**Learning Objective:** The learner will classify each of 12 specification statements as a functional requirement, a non-functional requirement, a non-goal, or an assumption, with at least 10 correct.

**Prerequisites:** functional requirement, non-functional requirement, non-goal, explicit assumption (all defined in this chapter above this block).

**Evidence of Mastery:** The learner assigns each of the 12 statements to exactly one of four categories and confirms the assignment. An assignment is correct when it matches the "Category" column in Content. Mastery is 10 of 12 correct. Reading the category definitions is exploration, not evidence.

**Misconceptions:** (1) A statement about what the tool will not do is a functional requirement. (2) A quality such as speed or size is a feature. (3) An assumption is a requirement the tool must satisfy.

**Instructional Rationale:** Classifying requires the learner to decide which defining property a statement has (behavior, quality, exclusion, or condition), which shows whether the four concepts are distinguished, not just recited.

**Content:**

The four categories and their definitions, available to the learner at any time:

| Category | Definition |
|---|---|
| Functional requirement | A specific behavior the tool must provide |
| Non-functional requirement | A quality the tool must have or a limit it must respect |
| Non-goal | Something the tool deliberately will not do |
| Assumption | A condition taken for granted and stated openly |

The twelve statements, in this order. All are illustrative statements for a ScreenGrab-style tool:

| # | Statement | Category | Why (shown as feedback) |
|---|---|---|---|
| 1 | The tool shall let the user drag a rectangle over any part of the screen. | Functional requirement | It describes a behavior the user performs and the tool responds to |
| 2 | The tool shall copy the captured image to the clipboard. | Functional requirement | It is an action the tool performs |
| 3 | A grab shall complete within 1 second of the user releasing the mouse button. | Non-functional requirement | It sets a speed limit, a quality of how well the behavior happens |
| 4 | The tool shall not include image editing or annotation. | Non-goal | It names a capability deliberately left out |
| 5 | The tool shall start a capture after a delay that the user chooses. | Functional requirement | It describes a behavior the user can trigger |
| 6 | The tool shall use no third-party libraries. | Non-functional requirement | It is a limit on how the tool is built, not a behavior |
| 7 | Cloud sharing is out of scope. | Non-goal | It states something deliberately excluded |
| 8 | The user has a Mac running a recent version of macOS. | Assumption | It states a condition taken for granted, not something the tool does |
| 9 | The tool shall be installable by running one script. | Non-functional requirement | It is a quality of installation, not a feature the user operates |
| 10 | The user captures only one display at a time. | Assumption | It is a condition the specification relies on |
| 11 | The tool shall let the user cancel a selection by pressing Escape. | Functional requirement | It describes a user action and the tool's response |
| 12 | Video recording is not part of this tool. | Non-goal | It excludes a capability explicitly |

Category counts: Functional requirement 4 (statements 1, 2, 5, 11), Non-functional requirement 3 (3, 6, 9), Non-goal 3 (4, 7, 12), Assumption 2 (8, 10).

**Provenance:** Statements are illustrative, written for this chapter, and the sim labels them "illustrative". Category definitions come from this chapter, sections "Functional Requirements", "Non-Functional Requirements", "Non-Goals" and "Explicit Assumptions".

**Rules:** Each statement belongs to exactly one category. A statement is correct only when the learner's category equals the Category column. Statements appear in the order of the table. A statement already answered cannot be changed.

**Learner Activity:**

1. The learner reads statement 1 and may open the category definitions.
2. The learner chooses one of the four categories and confirms.
3. The sim shows whether the choice is correct, with the Why text, and the next statement appears.
4. After statement 12, a summary shows the score and the statements answered wrongly, with their Why text. The learner should notice that exclusions and conditions are easy to confuse with requirements.

**Feedback:** Twelve statements, fixed order, one attempt each. Correct: "Correct: <category>" and the Why text. Incorrect: the correct category and the Why text. A running count "Correct: n of 12" is shown. A final score of 10 or more shows "You can separate the four kinds of statement"; a lower score invites a restart.

**Starting State:** Statement 1 is shown with the four categories unselected and the question "What kind of statement is this?"

**Chapter Anchors:** The chapter states four categories, twelve statements, and mastery at 10 of 12, with category counts of 4, 3, 3 and 2.
</details>

## Acceptance Criteria

**Acceptance criteria** are specific, testable conditions that a requirement must meet for the work to count as done. A requirement says what the tool should do. An acceptance criterion says how you will know that it does. Where requirements can sometimes remain broad, acceptance criteria must be concrete enough that two people running the same check reach the same verdict.

The shape that works well is a trio of parts. State the starting situation, the action, and the observable result. Using the format "Given a situation, when the user acts, then this result is observed", a criterion for requirement F2 reads: "Given that the user has dragged a region and released the mouse, when the capture completes, then pasting into an image viewer shows a picture of exactly that region."

A worked example gives criteria for three of the ScreenGrab requirements:

| Requirement | Acceptance criterion |
|---|---|
| F1 Region selection | Given the tool is running, when the user presses the hotkey and drags from one point to another, then a rectangle between those points is selected. |
| F3 Delayed capture | Given a delay of 5 seconds is chosen, when the user starts the capture, then the picture is taken between 4.9 and 5.1 seconds later. |
| F4 Cancel | Given a selection is in progress, when the user presses Escape, then no capture is made and the clipboard is unchanged. |

Write at least one criterion for every functional requirement, and no criterion that does not trace back to a requirement. That one-to-one habit keeps the checklist short and complete. A worked example for F5, the hotkey: "Given the app is running and another application is in front, when the user presses Control-Shift-4, then a region selection starts." The criterion names the situation, the action, and the observable result.

Notice that each criterion names something a person can see or measure. They also give the later chapters their target: Chapter 12 turns criteria like these into automated tests, and the case study notes that several acceptance tests still had to be run by hand.

Not every criterion is testable, and the difference is the point of the next MicroSim. Before using it, recall the test of testability: could two different people run the check and agree on the result? "It should be fast" fails that test, while "completes within 1 second" passes.

#### Diagram: Acceptance Criteria Testability Judge

<details markdown="1">
<summary>Acceptance Criteria Testability Judge</summary>
Type: microsim
**sim-id:** acceptance-criteria-testability-judge<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** assess<br/>
**Learning Objective:** The learner will assess whether each of 8 acceptance criteria is testable, by deciding if two people running the same check would reach the same verdict, with at least 7 correct.

**Prerequisites:** acceptance criteria, functional requirement, non-functional requirement (all defined in this chapter above this block).

**Evidence of Mastery:** For each of 8 criteria the learner commits "Testable" or "Not testable". A judgment is correct when it matches the "Verdict" column in Content. Mastery is 7 of 8 correct. Viewing the repair suggestion for a criterion after judging is feedback, not evidence.

**Misconceptions:** (1) A criterion that sounds positive and professional is a testable one. (2) A criterion with the word "all" or "gracefully" is stricter and so better. (3) Only numbers make a criterion testable.

**Instructional Rationale:** Assessing needs a criterion applied to cases. The criterion is "would two people agree?", and the mix of testable and untestable examples, including one testable criterion with no number, prevents the shortcut of looking for digits.

**Content:**

The eight criteria, in this order. All are illustrative:

| # | Criterion | Verdict | Why (shown as feedback) | Repair, shown when Not testable |
|---|---|---|---|---|
| 1 | The tool should be fast. | Not testable | "Fast" has no limit, so two people could disagree | A grab completes within 1 second of releasing the mouse button |
| 2 | After the user drags a region and releases the mouse, the clipboard holds an image of exactly that region. | Testable | A person can paste and compare the picture with the region | (not needed) |
| 3 | The tool is easy to use. | Not testable | "Easy" depends on the person | A new user starts a region capture using only the hotkey, with no instructions |
| 4 | With a 5-second delay set, the capture happens between 4.9 and 5.1 seconds after the user starts it. | Testable | It gives a measurable window | (not needed) |
| 5 | Pressing Escape during selection ends the capture and leaves the clipboard unchanged. | Testable | It has a clear action and an observable result, though it needs no number | (not needed) |
| 6 | The tool handles errors gracefully. | Not testable | "Gracefully" and "errors" are undefined | When the screen cannot be read, the tool shows a message and does not change the clipboard |
| 7 | The app works with all Macs. | Not testable | "All" cannot be checked | The app runs on the macOS versions named in the specification |
| 8 | Pressing Control-Shift-4 while a web browser is the frontmost app starts a region selection. | Testable | A person can try it and see whether a selection starts | (not needed) |

Verdict counts: Testable 4 (criteria 2, 4, 5, 8), Not testable 4 (criteria 1, 3, 6, 7).

**Provenance:** Criteria are illustrative and written for this chapter, and the sim labels them "illustrative". The Control-Shift-4 hotkey and the delay idea come from the course description section "The Story". The testability test comes from this chapter, section "Acceptance Criteria".

**Rules:** A criterion is Testable only when two people running the same check would agree on the result, regardless of whether it contains a number. Criteria appear in the order of the table. The repair text is shown only after a Not testable criterion has been judged.

**Learner Activity:**

1. The learner reads criterion 1.
2. The learner chooses Testable or Not testable and confirms.
3. The sim shows whether the judgment is correct and the Why text; for a Not testable criterion it also shows the repair.
4. The learner continues through criterion 8 and then sees the score. The learner should notice that criterion 5 is testable without containing a number.

**Feedback:** Eight criteria, fixed order, one attempt each. Correct: "Correct: <verdict>" and the Why text. Incorrect: the correct verdict, the Why text, and any repair. A running count "Correct: n of 8" is shown. A final score of 7 or more shows "You can judge testability"; a lower score invites a restart.

**Starting State:** Criterion 1 is shown with the question "Would two people running the same check reach the same verdict?"

**Chapter Anchors:** The chapter states the test of testability as "two different people run the check and agree on the result", gives 5 seconds with a 4.9 to 5.1 second window, and says the sim has 8 criteria with mastery at 7 of 8.
</details>

## Specifications

### Software Specification

A **software specification** is a written description of what a piece of software must do and be, assembled from the requirements, boundaries, assumptions, and acceptance criteria. It is the document a builder works from. In traditional projects a specification could run to hundreds of pages. In an AI-assisted project it is the main thing you hand the agent, and its quality sets the ceiling on what the agent can deliver.

A worked example shows the stakes. Compare two ways of asking for the same tool. The first is a single line: "Make a screenshot app." The second is the minimal specification in this chapter. From the first, an agent will probably produce a tool with a file menu, an editor, and a settings window, because that is what screenshot apps usually have. From the second, it produces the two features and the clipboard. The case study's documents, the specification, the design, and the README, together came to about 1,340 lines, a small part of the 5,200-line project but the part that decided what the other 3,860 lines would be.

A specification does four jobs at once. It tells the builder what to make. It tells the builder what not to make. It gives the reviewer a checklist to compare the result against. And it is a record, so months later someone can learn why the tool behaves as it does, even if that someone is you.

The parts fit together in a simple order, and each answers one question. The table below summarizes the parts that the chapter has already explained.

| Part | Question it answers | ScreenGrab example |
|---|---|---|
| User need | Why does this tool exist? | Paste a picture of part of my screen into a message |
| Scope and non-goals | What is in and out? | Region and delayed capture in; editing, saving, video out |
| Functional requirements | What does it do? | F1 to F5 |
| Non-functional requirements | How well, within what limits? | No third-party libraries; one-script install |
| Assumptions and defaults | What is taken for granted, and what happens untouched? | A Mac; the delay defaults to 3 seconds |
| Acceptance criteria | How will we know it works? | The Given, when, then checks |

### Minimal Specification

A **minimal specification** is a software specification that includes only what the user needs and states what is left out. It is short by design, because every line in it creates work for the agent and every omission removes work. It is not a vague specification: a minimal specification is exact about the few things it contains, and just as exact about the things it excludes.

The case study shows how this pays. The generated app came to about 2,000 lines of Swift in 19 files. A more generous specification would have produced more code, more tests, and more places for bugs. Chapter 2's 95/5 rule predicted this: if 95% of users use only 5% of the features, a tool built for one user's 5% can be a small fraction of the size.

Here is a complete minimal specification for a ScreenGrab-style tool, short enough to read in a minute. It is illustrative of the form; the precise numbers marked "illustrative" are examples of how to state a limit.

| Section | Content |
|---|---|
| Need | Paste a picture of a chosen part of the screen into other applications. |
| In scope | Select a region by dragging. Capture after a chosen delay. Place the image on the clipboard. Start by menu or hotkey. |
| Non-goals | No editing or annotation. No saving, sharing, or upload. No video. |
| Assumptions | A Mac with a recent macOS. One display captured at a time. |
| Functional requirements | F1 to F5, as listed earlier. |
| Non-functional requirements | No third-party libraries. Installable by running one script. A grab completes within 1 second (illustrative). |
| Defaults | The delay defaults to 3 seconds (illustrative). |
| Acceptance criteria | One Given, when, then check per functional requirement. |

### Specification Review

**Specification review** is the step where a person reads the specification before any code is generated, looking for missing, vague, or unwanted items. It is the cheapest review in the whole project, because correcting a sentence costs seconds and correcting generated software costs hours. A good review asks three questions of every line: is it needed, is it testable, and is anything missing that the agent would otherwise guess?

A worked example: reading the draft, the reviewer notices that F3 says "a chosen number of seconds" but gives no limits. What happens if the user chooses 0, or 5,000? Adding "at least 1 second and at most 10 seconds" closes the gap in one line. The same pass finds a requirement for "saving a recent history", which serves no part of the need and is cut. The reviewer can be the author, another person, or the agent itself asked to list ambiguities, though the final judgment stays with a person.

## Region Selection, Delayed Capture and Clipboard Output

The three ScreenGrab features are small enough to specify fully. Each one is a worked example of the ideas above, and each reveals a small decision the specification must settle.

### Region Selection

**Region selection** is the user's act of choosing which rectangular part of the screen to capture, usually by dragging the mouse from one corner to the opposite corner. It is the heart of the tool and the feature most users reach for first.

A specification for it must settle details the word "select" hides. Which corner does the drag start from, and does dragging up and to the left work as well as dragging down and to the right? What happens if the rectangle has no area because the user clicked without dragging? How does the user abandon a selection? The worked example below answers each with a requirement:

| Question | Answer in the specification |
|---|---|
| Drag direction | Any direction produces the same rectangle between the start and end points |
| Click without dragging | No capture is made |
| Abandoning a selection | Pressing Escape cancels it (F4) |
| What is captured | Exactly the pixels inside the rectangle |

Each answer is something an agent would otherwise decide for itself. Region selection is also where the tool's hardest platform problems begin, such as keeping the screen still while you drag, which Chapter 8 takes up as freeze-frame selection. Stating them keeps the behavior predictable and gives the later tests something exact to check.

### Delayed Capture

**Delayed capture** is a screen capture that takes the picture a set number of seconds after the user starts it. The delay lets the user prepare the screen first, for example by opening a menu that closes when the mouse moves, which would be impossible to photograph in a single immediate step.

A specification for it must say how the delay is chosen, what the range is, what the default is, and what happens during the wait. The worked example, with illustrative values, shows what a precise answer looks like:

| Question | Answer in the specification (illustrative) |
|---|---|
| How is the delay chosen? | The user picks a whole number of seconds before starting |
| What are the limits? | At least 1 second and at most 10 seconds |
| What is the default? | 3 seconds |
| What happens during the delay? | The tool waits; the user can set up the screen; no picture is taken until the delay ends |
| Does selection happen before or after the delay? | The user selects the region first, then the delay begins |

The last line illustrates why details matter. A specification that omits it leaves the agent to choose between two quite different behaviors, and only one of them matches the author's habit.

### Clipboard Output

**Clipboard output** means delivering the captured image to the system clipboard, the shared holding area behind Copy and Paste, so that the user can paste it directly into another application. The case study's specification makes the clipboard the only destination, which is itself a cut: no folders, no file names, no format menus.

The decision is a good illustration of omission paying off. Saving to a file would require decisions about where, under what name, in which format, and what to do if the file already exists. Each decision is a requirement, a test, and a possible bug. By choosing the clipboard alone, the specification avoids all of them. The worked example below states the requirement and its criterion:

| Item | Statement |
|---|---|
| Requirement F2 | The tool shall place the captured region on the clipboard as an image. |
| Acceptance criterion | Given a completed capture, when the user pastes into an image viewer, then a picture of exactly the selected region appears. |
| Explicit non-goal | The tool does not save the image to a file. |

!!! mascot-celebration "You Can Write the Short Version"
    ![Pinch celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now turn a user need into functional and non-functional requirements, draw the scope with non-goals, write testable acceptance criteria, and assemble a minimal specification for a tool like ScreenGrab. Next, you will see how a specification becomes a design that fits a real platform.

[See Annotated References](./references.md)
