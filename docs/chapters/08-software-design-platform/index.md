---
title: "Software Design and Platform Constraints"
description: "How a specification becomes a design that fits a real platform, covering design decisions and trade-offs, prototypes, dependencies, and ScreenGrab's menu bar app, global hotkey, screen recording permission and freeze-frame selection."
generated_by: claude skill chapter-content-generator
date: "2026-11-01 20:20:05"
version: 1.11
---

# Software Design and Platform Constraints

## Summary

This chapter shows how a specification becomes a design that fits a real platform. It covers design decisions and trade-offs, prototypes and feasibility checks, third-party dependencies, and zero-dependency design, then applies them to ScreenGrab's menu bar app, global hotkey, screen recording permission, and freeze-frame selection. No Swift or macOS experience is assumed. After this chapter, you will be able to read a design document and judge the trade-offs behind its decisions.

## Concepts Covered

This chapter covers the following 17 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Software Design | 31 |
| Design Document | 1 |
| Design Decision | 11 |
| Design Trade-Off | 2 |
| Platform Constraints | 15 |
| Prototype | 3 |
| Technical Feasibility Check | 1 |
| Agent Experiments | 1 |
| Programming Language Choice | 1 |
| Third-Party Dependency | 3 |
| Zero-Dependency Design | 1 |
| Native Application | 11 |
| Menu Bar App | 6 |
| Global Hotkey | 5 |
| Hotkey Conflict | 1 |
| Screen Recording Permission | 4 |
| Freeze-Frame Selection | 4 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Software Features and the Anatomy of Bloat](../01-software-bloat/index.md)
- [Chapter 5: Generative AI and Coding Agents](../05-generative-ai-coding-agents/index.md)
- [Chapter 7: Requirements and Minimal Specifications](../07-requirements-minimal-specs/index.md)

---

!!! mascot-welcome "From the What to the How"
    ![Pinch waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    The specification said what the tool does. Now someone has to decide how, and every choice either keeps the shell light or loads it down. By the end of this chapter you will be able to read a design and tell which choices earned their place. Grab only what you need!

## What Design Is

**Software design** is the stage between the specification and the code where you decide how the software will be organized and built to meet the requirements. The specification says what the tool must do. The design says what pieces it will have, how they fit together, which technologies it will use, and how it will cope with the limits of the machine it runs on.

An analogy helps. A homeowner's request is "a kitchen where two people can cook at once". That is the specification. The design is the floor plan: where the stove, the sink, and the counters go, and why. Nobody can build a kitchen from the request alone, and nobody wants to discover the floor plan problems after the walls are up. The same holds for software, and it matters even more when an AI agent writes the code, because the agent will make design choices whether or not you do. If you leave the design unstated, the agent picks the common one.

Design works at three levels, from broad to narrow. At the broadest level, you choose the shape of the product: a menu bar utility, a window application, or a command-line program. In the middle, you choose the main pieces and how they talk to each other. At the narrowest level, you choose details such as the data each piece passes along. For a two-feature tool, most of the value is at the first two levels. A worked example: deciding "this is a menu bar utility with a hotkey, a capture step, and a clipboard step" settles more than any single line of code will, and it can be read and challenged in a minute.

### Design Document

A **design document** is a written record of the design: the main pieces, the technology choices, and the reasons behind them. It is read by the builder before coding starts, and by the reviewer afterward. In the ScreenGrab case the specification, design, and README together came to about 1,340 lines, and the design document is the middle piece of that set.

A short design document for a tool like this might contain a list of components, the decisions made with their reasons, the platform limits that shaped them, and the risks that remain. It is worth writing even for a small tool, because the agent can generate it from the specification in minutes and you can review it in a few more. A design document is also a safeguard: a year from now, it explains why the tool is built the way it is.

### Design Decisions and Trade-Offs

A **design decision** is a specific choice among alternatives about how the software will be built. Which language will it be written in? Will it have a window or live in the menu bar? Will it use a library or write the feature itself? Each decision should be recorded with the options considered and the reason for the choice.

A **design trade-off** is the cost that comes with a choice: gaining one quality means giving up another. There is almost never a free option. A worked example is the decision to write the clipboard feature yourself or to rely on a third-party library. The library saves effort now but adds an outside piece that must be kept up to date. Writing it yourself costs a little time now but nothing later.

| Decision | You gain | You give up |
|---|---|---|
| Use a library for a feature | Less code to write and test | An outside piece to update and trust |
| Write the feature yourself | Full control, nothing external | More code in your own tool |
| Add a settings window | User choice | More code, more tests, more things that can break |
| Keep one fixed behavior | Simplicity | Flexibility |

A design decision recorded without its trade-off is only half useful. When the reason is lost, a later reader cannot tell whether the choice still makes sense after circumstances change.

!!! mascot-thinking "Every Choice Has a Price Tag"
    ![Pinch thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Think of each design decision as a purchase: what do you get, and what do you pay? A design that lists only the benefits has hidden the bill. When you read a design document, look for the "gives up" half.

## Platform Constraints

**Platform constraints** are the rules and limits that the operating system and its environment impose on any software that runs there. A platform is the base that software is built on, such as macOS, Windows, or a web browser. The platform decides what an application may do on its own, what needs the user's permission, and what the system reserves for itself.

Platform constraints matter more for a screen grab tool than for most small programs, because capturing the screen touches things the system guards closely. Software that can see everything on your display could also spy on it, so macOS puts several gates in the way. A worked example of the constraints that shaped ScreenGrab, each explained in its own section below:

| Constraint | What the platform requires | Effect on the design |
|---|---|---|
| Screen recording permission | The user must grant the app permission before it can capture the screen | The design must ask for permission and handle a refusal |
| Global hotkeys | The system decides which shortcuts an app may claim | The design must pick a shortcut and cope with a conflict |
| Application packaging | macOS expects a particular structure for an app and a signature on it | The design must include a build and install step (Chapter 9) |
| Supported system versions | Newer macOS versions change what is allowed | The design states which versions it targets |

The lesson is that a specification can be perfectly reasonable and still be hard to build on a particular platform. Design is where that collision is found. It is far cheaper to find it in a document than in a failed build.

### Programming Language Choice

**Programming language choice** is the decision about which language the software will be written in. The choice is shaped by the platform. For a macOS application, the platform's own language is Swift, which gives direct access to every system feature. The case study's app is written in Swift, in about 2,000 lines across 19 files. A good habit is to let the agent propose a language, then ask it to justify the choice against the specification, because a language is hard to change once thousands of lines depend on it. Other options exist, such as wrapping a web page in a cross-platform shell, but they carry more weight and less system integration. You do not need to know Swift to follow this book. You only need to see that the language is a design decision with a reason attached.

### Native Application

A **native application** is software built with the platform's own tools and libraries, so that it runs directly on the operating system, not inside another layer such as a web browser. A native macOS app behaves like the other Mac apps: it starts quickly, uses the system's own controls, and can reach system features such as the menu bar and the clipboard without a go-between.

The alternative is a cross-platform application, which is written once and run on several systems, usually by including a large runtime that brings its own copy of a browser engine. The trade-off is clear. Cross-platform saves work if you need to support many systems, but it makes the application larger and slower to start and gives up some system integration.

A worked example for ScreenGrab: the tool is for Macs only, as the specification's assumption states. Nothing is gained from supporting other systems, so the native choice costs nothing and wins on size and integration. This ties to the install size and idle resource use that Chapter 1 named as parts of bloat. The case study's generated app came to about 2,000 lines of Swift in 19 files, small enough that the whole program fits in a few files you could read in an afternoon.

| | Native application | Cross-platform application |
|---|---|---|
| Built with | The platform's own tools | A shared runtime plus the app's code |
| Size and start-up | Small and quick | Larger and slower |
| System features | Direct access | Through an extra layer |
| Best when | One platform is enough | Many platforms must be served |

## Dependencies

### Third-Party Dependency

A **third-party dependency** is a piece of code written by someone else that your software relies on, such as a library you include so that you do not have to write a feature yourself. Dependencies are normal in modern software and often a good idea. They also carry costs: you must keep them updated, you inherit their bugs, and any security flaw in them becomes a flaw in your tool. A worked example: a library for copying images could save an hour of writing, but it arrives with its own updates, its own bugs, and the chance that its maker stops maintaining it. Each of those becomes your problem on the day you depend on it. Dependencies are a trade-off, not a mistake, and the decision should be made on purpose.

### Zero-Dependency Design

A **zero-dependency design** is a design that uses only what the platform already provides, with no third-party code at all. The ScreenGrab app takes this route: the case study records the generated app as having no third-party dependencies. The benefit is a short list of things that can go wrong. There is nothing to update, nothing for a vendor to abandon, and nothing outside the code that you must trust.

The cost is that you write, or have the agent write, features a library would have supplied. For a tool with two features this cost is small. That is why the zero-dependency choice fits a minimal specification so well: the smaller the tool, the cheaper it is to own all of it. In Chapter 14 you will see the maintenance payoff.

## Checking the Design Before Building It

A design can look sound on paper and still fail on the real platform. Three cheap activities find those failures early.

### Prototype

A **prototype** is a quick, rough version of part of the software, built to test an idea, not to be kept. A prototype may have no polish and no tests. Its job is to answer a question. Because an AI agent can write small programs in minutes, prototypes cost very little in this approach, so there is rarely a reason to guess when you can try. A worked example: to test whether a menu bar app can show a menu, a prototype might be a single file that puts an icon in the menu bar with one item that prints a message. If it works, you keep the knowledge and discard the file. The word "throwaway" is the point: do not let a prototype quietly become the product, because it was built without the tests and care the real tool needs.

### Technical Feasibility Check

A **technical feasibility check** is a test of whether something the design depends on can actually be done on the target platform. It is the question "can this work at all?" asked before committing to the rest of the build. For ScreenGrab, the riskiest assumptions are that an app living in the menu bar can respond to a global hotkey, and that it can capture the screen once the user grants permission. If either were impossible, the whole design would need to change. The answer is usually yes or no, and either answer is useful. A "no" saves you from building on something that cannot work, and a "yes" lets you proceed with less worry. Feasibility checks should be done in order of risk, starting with the item that would hurt most if it failed.

### Agent Experiments

**Agent experiments** are small trials that you ask the coding agent to run to answer a design question, such as "write a ten-line program that registers this hotkey and prints a message when it fires, then run it." The agent writes it, runs it, and reports what happened. Because the output is visible, you can see the answer for yourself rather than trust a description. Experiments turn a risky guess into a known result for a few cents of tokens.

A worked example ties the three together. The author's design depends on a global hotkey. Before building the whole app, the agent builds a tiny prototype that only registers the hotkey and prints a line when it is pressed. Running it is a feasibility check, and the agent doing so is an agent experiment. If nothing prints, the problem is found in minutes, not after the other 1,990 lines exist. The case study is candid that one early hotkey failure was never explained, which is a reminder that even this practice does not remove every surprise.

!!! mascot-tip "Test the Scary Part First"
    ![Pinch giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    List the two or three things in your design that you are least sure the platform allows, and ask the agent to prototype only those. Do it before it writes the rest, so a bad surprise costs minutes, not a rebuild.

## ScreenGrab's Design Choices

The next four sections apply the ideas above to the four features of the platform that shape ScreenGrab. Each is a platform constraint, a design decision, and a trade-off at once.

### Menu Bar App

A **menu bar app** is an application that lives in the strip of icons at the top of the macOS screen and has no regular window or Dock icon of its own. You click its icon to open a small menu, and otherwise it stays out of sight. Many small Mac utilities work this way, because it keeps them always available and almost invisible.

The choice fits a screen grab tool for three reasons. The tool is used for seconds at a time, so a full window would be wasted. It must be ready at once, so it should stay running in the background. And it should not clutter the screen it is about to photograph. The case study confirms that grabs from the menu were seen working, which means the menu is one of the two ways to start a capture. The usual trade-off is that a menu bar app can show very little: there is no room for a rich window, so everything must fit in a short menu. For a tool whose whole interface is "start a grab" and perhaps "quit," that limit costs nothing.

| Aspect | Menu bar app | Regular window app |
|---|---|---|
| Visible presence | A small icon in the menu bar | A window and a Dock icon |
| Good for | Quick utilities used for seconds | Tasks that need a workspace |
| Cost | Cannot show much; settings are cramped | Takes space and attention |
| Fit for ScreenGrab | Strong: always ready, out of the way | Poor: nothing to display |

### Global Hotkey

A **global hotkey** is a keyboard shortcut that works no matter which application is in front. Most shortcuts only work inside the program you are using, such as Command-C to copy. A global hotkey is registered with the system, which then reports the key press to your app even when you are working in another one.

A global hotkey suits a screen grab tool because the moment you want a grab is when another program is on screen, not your tool. The ScreenGrab design uses Control-Shift-4. The case study records grabs from the Control-Shift-4 hotkey as seen working. It also records that an early hotkey failure was never explained, so the hotkey is a good example of a platform feature that is easy to describe and harder to make reliable.

Global hotkeys connect to platform constraints in two ways. The system controls which shortcuts an app may claim, and some ways of watching the keyboard require the user to grant extra permission. A worked example of the design reasoning: the team wants the shortcut to work from any app, which requires a global registration. They want to avoid a permission prompt that has nothing to do with screen capture, so they prefer a mechanism that does not need one. Each of those is a design decision with a trade-off, and each belongs in the design document.

### Hotkey Conflict

A **hotkey conflict** happens when two programs, or the system and a program, both want the same shortcut. Only one can win, and the other silently does nothing. macOS already uses Command-Shift-3, 4, and 5 for its own built-in screenshots, so a custom tool that claimed Command-Shift-4 would collide with the system.  Choosing a combination the system does not use, such as Control-Shift-4, avoids this. A conflict is a good reason to make the shortcut a recorded design decision and to expect to change it if it clashes with another program on a user's machine. A worked example of the symptom: the user presses the hotkey and nothing happens, with no error message. That silence is typical of a conflict, which is why the troubleshooting list for any hotkey tool should begin with "is another program using this shortcut?" A clear design might also let the user change the shortcut, though that adds a feature, so a minimal tool may simply document the one it chose.

### Screen Recording Permission

**Screen recording permission** is the macOS setting that lets an app capture the contents of the screen. By default an app cannot see other programs' windows. The user must open the system's privacy settings and allow the app. Without the permission, a capture may produce an image missing the other windows, so the picture looks wrong while nothing reports an error.

The permission is a platform constraint that shapes the user's first experience. The design must decide how the app finds out whether it has permission, how it asks, and what it says when the answer is no. A worked example of the experience: the user installs the app, presses the hotkey, and nothing useful appears. Without a design for the permission, the tool seems broken. With one, the app notices that permission is missing and explains the single setting to change.

!!! mascot-warning "A Blank Picture Is Not a Bug in Your Code"
    ![Pinch warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    If a first capture shows a wallpaper or only one window, suspect the permission before you suspect the code. The fix is in the system's privacy settings, not in the app. Put that check first in your testing, and put the message in the app so the next user does not have to guess.

### Freeze-Frame Selection

**Freeze-frame selection** is a way of choosing a screen region by first capturing the whole screen as a still picture, then letting the user drag a rectangle over that still picture. The final capture is cut out of the frozen image, not taken from the live screen.

The design solves three problems that live selection has. The screen can change while the user drags, because a clock ticks, a video plays, or a notification arrives, and the result would differ from what the user saw when they started. The selection outline itself could end up in the picture. And a menu that closes when the mouse moves can be captured only if the picture is taken before the pointer reaches it. Freezing the screen first makes the picture match what the user saw at the instant they started.

The cost is that the tool must capture the full screen before the user selects anything, which makes the screen recording permission essential, and it must display the frozen picture as an overlay. A worked comparison:

| | Live selection | Freeze-frame selection |
|---|---|---|
| Picture taken | After the drag, from the live screen | Before the drag, then cropped |
| Moving content | May change during the drag | Fixed at the moment of the hotkey |
| Selection outline in the picture | A risk | Never, since the picture predates the outline |
| Needs | Less | Full-screen capture first |

!!! mascot-encourage "Platform Words Are Just Words"
    ![Pinch encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If terms like "global hotkey" and "permission" feel like a foreign language, remember that you only need the idea behind each one: where it lives, what it asks of the user, and what it costs. You have already used all of them as a user. This chapter just shows you the other side of the screen.

## Reading a Design by Its Trade-Offs

The component map below shows how the choices fit together. Before you use it, here is one more term: a **component** is a distinct part of the software with a single job. Seven components make up the simplified picture, and the map follows one immediate grab from the hotkey press to the clipboard. It is a teaching simplification, not a listing of the actual source files.

#### Diagram: ScreenGrab Component Map

<iframe src="../../sims/screengrab-component-map/main.html" height="764px" width="100%" scrolling="no"></iframe>

[Run the ScreenGrab Component Map MicroSim Fullscreen](../../sims/screengrab-component-map/main.html){ .md-button .md-button--primary }

<details markdown="1">
<summary>ScreenGrab Component Map</summary>
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
</details>

The second practice activity moves from structure to judgment. Reading a design well means asking, for each decision, which option best serves what the specification values. The judge below gives eight decisions with a stated priority and two options each.

#### Diagram: Design Trade-Off Judge

<iframe src="../../sims/design-trade-off-judge/main.html" height="525px" width="100%" scrolling="no"></iframe>

[Run the Design Trade-Off Judge MicroSim Fullscreen](../../sims/design-trade-off-judge/main.html){ .md-button .md-button--primary }

<details markdown="1">
<summary>Design Trade-Off Judge</summary>
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
</details>

!!! mascot-celebration "You Can Read a Design"
    ![Pinch celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now read a design document, name the trade-off behind each decision, and explain why ScreenGrab is a native, menu bar, zero-dependency app with a global hotkey, a permission check, and freeze-frame selection. Next, you will watch that design become running code.

[See Annotated References](./references.md)
