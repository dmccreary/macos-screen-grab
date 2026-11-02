---
title: "Generating, Building, and Installing the Code"
description: "How a design becomes running software: code generation, compiler errors, the developer toolchain, build and installer scripts, rollback, uninstall, code signing, the README, the Git workflow, and the ScreenGrab case study from specification to first install."
generated_by: claude skill chapter-content-generator
date: "2026-11-01 20:21:56"
version: 1.11
---

# Generating, Building, and Installing the Code

## Summary

This chapter follows the design into running software. It covers code generation, compiler errors, the developer toolchain, build and installer scripts, rollback and uninstall, code signing, the README, and the Git workflow that records each step. It closes by assembling the ScreenGrab case study from the specification through the first install. After this chapter, you will be able to describe every stage of the AI-assisted build process and direct an agent through them.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Code Generation | 3 |
| Compiler Errors | 4 |
| Build Script | 10 |
| Developer Toolchain | 3 |
| Installer Script | 4 |
| Install Rollback | 1 |
| Uninstall Process | 1 |
| README File | 4 |
| Version Control | 14 |
| Git Repository | 13 |
| Git Commit | 5 |
| Git Push And Pull | 4 |
| Code Signing | 2 |
| Ad-Hoc Signing | 1 |
| ScreenGrab Case Study | 3 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 5: Generative AI and Coding Agents](../05-generative-ai-coding-agents/index.md)
- [Chapter 7: Requirements and Minimal Specifications](../07-requirements-minimal-specs/index.md)
- [Chapter 8: Software Design and Platform Constraints](../08-software-design-platform/index.md)

---

!!! mascot-welcome "From Paper to Running Program"
    ![Pinch waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    You have a specification and a design, which means the hard thinking is done. Now watch an agent turn them into an app you can click, and learn the handful of scripts and habits that make the result repeatable. Grab only what you need!

## Code Generation

**Code generation** is the step where the AI coding agent writes the source code from the specification and the design. The agent reads the documents, decides which files are needed, and writes them. This is the step most people picture when they imagine AI building software, and it is the shortest part of the work in terms of your effort. Your effort went into the earlier steps, which determine what the agent writes.

The quality of generated code depends heavily on what came before. A precise specification with clear non-goals produces a small, focused program. A vague one produces something that guesses. In the ScreenGrab case, the app came to about 2,000 lines of Swift in 19 files with no third-party dependencies, because the specification asked for two features and the design chose to use only what the platform provides.

Generated code is a first draft, not a finished product. It has to be compiled, tested, and reviewed, and the sections below describe the loop that does that.

## Compiling and Its Errors

### The Developer Toolchain

A **developer toolchain** is the set of programs that turn source code into a running application and that support the work around it: the compiler, a linker that joins the pieces, build tools, and a debugger. On macOS the toolchain is supplied by Apple's developer tools, which come in two forms. Xcode is the full development environment. The Command Line Tools are a smaller package with just the compiler and related programs and no graphical environment.

The distinction matters in the case study. A later fix was needed for Macs that have only the Command Line Tools. The case study does not say more than that, but it illustrates the general lesson: a build depends on the toolchain, and different machines may have different ones. The toolchain should be named in the README so that the next user knows what to install. A worked example of checking: the command `swift --version` prints the compiler's version if the toolchain is installed, and an error if it is not. An installer script can run that one command first and stop with a clear message when it fails.

### Compiler Errors

A **compiler** is the program that translates source code, which people can read, into the machine instructions the computer runs. When the compiler finds something it cannot translate, it stops and prints a **compiler error**: a message that names the file, the line, and the reason. Compiler errors are not failures of the project. They are the compiler doing its job, and they are one of the most useful safety nets in the whole process, because the problem is found before the program ever runs.

Before the example, here is how to read the message format: first the file name, then the line number and column where the problem was found, then the word "error", then a plain description. A worked example, with illustrative content:

```text
CaptureController.swift:42:17: error: cannot find 'captureRegion' in scope
```

This says that on line 42 of the file `CaptureController.swift`, the code uses a name, `captureRegion`, that does not exist anywhere the compiler can see. The most likely causes are a misspelled name, or a name the agent assumed but never defined, which is a form of the hallucination described in Chapter 5.

With an agent, the usual cycle is quick. The agent builds the project, reads the errors, edits the files, and builds again. You do not need to understand each error, but you do need to know the cycle exists and that a clean build is only the first checkpoint: code that compiles can still do the wrong thing. A clean build says the code is well-formed, not that the code is right. Tests, covered in Chapter 12, address that gap.

!!! mascot-encourage "A Wall of Red Text Is Normal"
    ![Pinch encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    The first build of generated code often prints a screen of errors, and that can feel like failure. It is not: the agent reads those same messages and fixes them, usually in a loop of a few tries. Your job is only to notice if the same error keeps coming back, and then to ask the agent what it has tried.

## Build and Install

### Build Script

A **build script** is a short program that carries out every step needed to turn the source code into a finished application, in a fixed order, with one command. Without one, a person must remember a dozen separate commands and run them correctly each time. With one, building is repeatable: the same command gives the same result on any machine that has the toolchain.

Before the example, here are the pieces. The first line tells the system to run the file with the Bash shell. The command `set -e` tells the script to stop at the first error, instead of pressing on and producing a broken result. The `swift build` line compiles the code. The `codesign` line signs the finished app, a step explained later in this chapter. This is a simplified illustration of the idea, not the project's actual script.

```bash
#!/bin/bash
set -e
swift build -c release
cp .build/release/ScreenGrab ScreenGrab.app/Contents/MacOS/
codesign --force --sign - ScreenGrab.app
```

The script is five lines, but it already shows the value. If you change a file next month, you do not have to remember how the app is assembled. You run one command. The case study's install and build scripts came to about 500 lines, which is a measure of how much real-world detail a robust version includes: checking that the toolchain is present, handling errors with clear messages, and tidying up.

!!! mascot-thinking "A Script Is a Recipe You Can Rerun"
    ![Pinch thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that the build script moves knowledge out of your head and into a file. A step done by hand is done once, while a step in a script is done the same way every time, by you, by the agent, or by a stranger who downloads the project.

### Installer Script

An **installer script** is a program that takes the built application and puts it in place on a computer so that it can be used. For ScreenGrab, that means building the app, signing it, copying it to the Applications location, and starting it. The point of an installer script is that a user types one command and does not need to know the steps.

The script is also where many practical problems live. Does the folder already exist? Is an older version still running? Does the user have the tools? A good installer checks these and says what is wrong in plain words. A worked example of the contrast: a poor installer fails with a cryptic message, while a good one prints "The Swift toolchain was not found. Install the Command Line Tools and run this again." The second saves the user, which may be you in a year, an hour of searching.

The case study shows the pattern: the author asked for the app to be installed with a README, and the first install was done within about 36 minutes of the first prompt. A later fix was needed for Macs with only the Command Line Tools, which is the kind of environment difference an installer must anticipate.

### Install Rollback

**Install rollback** is the ability to undo a failed or unwanted installation and return to the state before it began. If the installer replaces a working older version and then fails halfway, a rollback restores the older version, so the user is not left with nothing. The usual technique is to keep a backup copy of what is being replaced, install the new version, test that it starts, and only then discard the backup. A rollback matters most for a tool you depend on every day. A worked example for ScreenGrab: the installer finds an older version, copies it aside, installs the new build, and launches it. If the launch fails, the installer puts the older copy back and prints the reason, so the hotkey that worked yesterday still works today.

### Uninstall Process

An **uninstall process** is the set of steps that removes the application and anything it created, leaving the computer as it was. A tool you can install but not remove is a liability. A good uninstall script deletes the app and its settings files. It also tells the user about anything it cannot remove itself, such as the permission granted in the system's privacy settings, which belongs to the user and which the user must take back. Writing the uninstall script at the same time as the installer keeps the tool honest about what it leaves behind. A worked example of the list it should work through: stop the running app, delete the app from the Applications location, delete any settings file it wrote, and print a reminder to remove the screen recording permission. The reminder is part of the process because the script cannot do that last step for you.

## Signing

### Code Signing

**Code signing** is the process of attaching a digital signature to an application, which lets the operating system verify who made it and that it has not been changed since. macOS checks signatures and refuses to run, or warns about, software that is unsigned. It is a platform constraint of the kind Chapter 8 described, and a build script must handle it. Signing also protects against tampering: if a signed app's files are altered after signing, the system can detect that the signature no longer matches. For a downloaded app from a stranger, that check is a real safeguard, and for your own build it is mostly a requirement to satisfy.

### Ad-Hoc Signing

**Ad-hoc signing** is code signing without an identity: the app is signed, which satisfies the system's requirement that the code carry a signature, but the signature names no developer and is not backed by a paid developer account. It is the right level for a personal tool that you build and run on your own computers. It does not give strangers any reason to trust the app, and it is why a downloaded personal tool may need extra steps before the system will run it.

A related point: because an ad-hoc signature is tied to the exact build, rebuilding the app can change how the system recognizes it. The practical result may be that you have to grant a permission such as screen recording again. If a permission seems to vanish after a rebuild, this is a likely cause.

| | Code signing with a developer identity | Ad-hoc signing |
|---|---|---|
| Needs | A developer account | Nothing beyond the toolchain |
| Tells the system | Who made the app | Only that the code is signed |
| Good for | Distributing to other people | A personal tool on your own computers |
| Cost | A recurring account fee | None |

## The README

A **README file** is a plain-text document, stored at the top of the project, that explains what the tool is, what it needs, how to install it, and how to use it. It is the first thing a visitor to the project reads. For a personal tool it is also the note you leave for your future self, who will have forgotten everything.

A useful README for ScreenGrab answers five questions in order: what does this do, what does it need before it can be installed, how do I install it, how do I use it, and how do I remove it. It also lists the non-goals, so nobody asks for a feature the tool deliberately omits. A worked example of its skeleton:

| Section | One line of content |
|---|---|
| What it does | Grabs a region of the screen, optionally after a delay, and puts it on the clipboard |
| Requirements | A Mac with the Swift toolchain installed |
| Install | Run the installer script |
| Use | Press Control-Shift-4 or use the menu bar icon |
| Uninstall | Run the uninstall script, then remove the permission in system settings |
| Not included | Editing, saving, sharing, video |

The case study counted the specification, the design, and the README together at about 1,340 lines. An agent writes a README well when it has the specification and the scripts in front of it, but you should still follow it once to confirm that the steps really work.

## Version Control

**Version control** is a system that records every change made to a project over time, so that you can see what changed, when, and why, and return to any earlier state. Without it, the only protection against a bad edit is a hope that you remember what the file used to say. With it, a mistake costs a few seconds.

Version control matters even more with an AI agent. An agent can change many files in one go, and it can make mistakes confidently. A complete history lets you compare the new version against the old, see exactly what the agent altered, and roll back if the result is worse. It makes bold edits safe.

A worked example: you ask the agent to add a settings window to ScreenGrab, and the result is larger, slower, and breaks the hotkey. Without history, you would be trying to remember what the project looked like an hour ago. With history, you ask Git to show the changes since your last snapshot, see that the agent added dozens of lines you never asked for, and return to the earlier state with one command. This is the same habit of leaving things out that the earlier chapters taught, applied to code that has already been written: if it should not be there, take it out.

### Git Repository

**Git** is the most widely used version control system, and a **Git repository** is a project folder that Git is tracking, together with its stored history. A repository holds the files as they are now and every earlier recorded version. Creating one is a single command in the project folder, and from then on Git can tell you what has changed.

A worked example of the first steps: in the project folder you run `git init` to start tracking, then `git status` to see which files Git has noticed. A new project shows every file as untracked, meaning Git sees them but has not yet recorded them. After the first commit, `git status` reports a clean state, and from then on it lists only what has changed since. A repository also keeps a list of files to ignore, such as the compiled app, because those can be rebuilt from the source and do not belong in the history.

A repository can be purely local, on your own computer, or it can have a copy on a hosting service such as GitHub, which provides a backup and a way to share the project. Chapter 14 covers sharing a tool as open source.

### Git Commit

A **Git commit** is a saved snapshot of the project at a moment in time, together with a message that says what changed and why. Commits are the steps of the history. Each one can be inspected, compared with the one before, or returned to.

Before the example, here is what the commands do. The `git add` command chooses which changed files go into the next snapshot. The `git commit` command saves the snapshot, with the text after `-m` as its message. The `git log` command lists the history, one line per commit when `--oneline` is added.

```bash
git add .
git commit -m "Add delayed capture with a default of 3 seconds"
git log --oneline
```

A good message names the change and the reason in a sentence. "Add delayed capture" is useful; "update" is not. A commit should also hold one logical change, so that if it turns out to be wrong, it can be undone without disturbing anything else.

!!! mascot-tip "Commit Before You Ask for the Next Thing"
    ![Pinch giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Before you send the agent off to change something, commit what you have. If the next change goes wrong, one command takes you back to a known good version.

### Git Push and Pull

**Git push** sends your commits from your computer to a remote copy of the repository, such as one on GitHub. **Git pull** brings commits from the remote copy down to your computer. Together they keep copies in step. Push makes your work backed up and shareable. Pull lets another computer, or another person, receive it.

This matters for a personal tool across several machines. The author has three main computers. After building the tool on one, a push and a pull on each of the others puts the same source on all three, and the same installer script builds it there. That is cheaper and clearer than copying files by hand.

Two cautions keep push and pull safe. First, pull before you push when you work on more than one machine, so that you start from the latest version. Second, if two machines changed the same lines, Git cannot decide which version wins and asks you to resolve the conflict. With a one-person project that rarely happens, which is another small benefit of a personal tool.

| Command | What it does | When you use it |
|---|---|---|
| `git commit` | Saves a snapshot locally | After each logical change |
| `git push` | Sends commits to the remote copy | When you want a backup or to share |
| `git pull` | Fetches commits from the remote copy | Before you start work on another machine |

## The ScreenGrab Case Study

The **ScreenGrab case study** is the real build that this book follows: a paid screen grab tool replaced by a generated app that does only what its one user needs. The work moved through a set order of specification, design, code, tests, and installer. The arrangement below lets you rehearse that order.

#### Diagram: AI-Assisted Build Stage Sequencer

<details markdown="1">
<summary>AI-Assisted Build Stage Sequencer</summary>
Type: microsim
**sim-id:** ai-assisted-build-stage-sequencer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/ai-persona-testing/tree/main/docs/sims/prompt-architecture-builder<br/>
**Bloom Level:** Remember<br/>
**Bloom Verb:** list<br/>
**Learning Objective:** The learner will list the five stages of the ScreenGrab build in their correct order, given five unordered cards that each show a stage and its output, within two attempts.

**Prerequisites:** minimal specification, design document, code generation, installer script, README file (all defined in this chapter or earlier chapters above this block).

**Evidence of Mastery:** The learner arranges five cards in a sequence and submits it. The sequence is correct when it matches the "Position" column in Content exactly. Mastery is a correct sequence on the first or second submission.

**Misconceptions:** (1) Code is written first and the specification is written afterward to describe it. (2) Tests are optional extras added at the end of a project. (3) The installer comes before the code that it installs.

**Instructional Rationale:** Remember-level recall of a sequence is best exercised by reconstructing the sequence from cards, because the learner must retrieve the order from memory instead of recognizing it in a list. Showing each card's output gives the learner a meaningful clue.

**Content:**

The five cards, shown in a scrambled initial order (Installer, Code, Specification, Tests, Design). Each card shows its stage name and its output:

| Position | Stage | Output shown on the card | Why it comes here (shown as feedback) |
|---|---|---|---|
| 1 | Specification | A minimal specification of what the tool does and does not do | Everything else is built from what the tool is supposed to do |
| 2 | Design | A design document of components, decisions, and trade-offs | The design turns the requirements into a plan that fits the platform |
| 3 | Code | About 2,000 lines of Swift in 19 files | Code is written from the design |
| 4 | Tests | About 1,370 lines, with 94 automated tests | Tests check the code against the specification |
| 5 | Installer | Install and build scripts of about 500 lines, plus a README | The installer packages code that already exists and has been checked |

**Provenance:** Stage order and the numbers on the cards come from the course description section "How the first version was built" and from this chapter's section "The ScreenGrab Case Study".

**Rules:** The correct sequence is exactly Specification, Design, Code, Tests, Installer. Two submissions are allowed. A submission is correct only if all five positions match.

**Learner Activity:**

1. The learner sees the five cards in the scrambled order and the instruction "Put the build in the order it happened."
2. The learner rearranges the cards into a sequence and submits it.
3. If the sequence is wrong, the sim tells the learner how many cards are in the right position and allows one more attempt. If it is right, the sim shows the Why text for each position.
4. After the second attempt or a correct sequence, the sim shows the correct order with the Why text for each card.

**Feedback:** Two attempts. After the first incorrect submission: "n of 5 cards are in the right position. Try once more." After the second incorrect submission, or after a correct one: the correct order and the Why text for each position. A correct submission shows "You can list the build stages".

**Starting State:** The five cards in the scrambled order and the question "Which stage came first?"

**Chapter Anchors:** The chapter states that the work moved through the order specification, design, code, tests, and installer, with about 2,000 lines of Swift in 19 files, about 1,370 test lines with 94 tests, and about 500 lines of scripts.
</details>

The first install produced the following, in the author's numbers. Before the table, note that each row counts lines of text in different kinds of files, which is why the totals matter: they show where the effort went.

| Result at first install | Amount |
|---|---|
| App code | about 2,000 lines of Swift in 19 files, with no third-party dependencies |
| Tests | about 1,370 lines, with 94 automated tests |
| Install and build scripts | about 500 lines |
| Specification, design, and README | about 1,340 lines |
| Total | about 5,200 lines |

The timeline matters as much as the size. The app was built and installed about 36 minutes after the first prompt. The first real screen grab came at about 44 minutes. The whole session, including hotkey testing, took about 70 active minutes. The estimated API cost was about $6 for the build and about $14 for the whole session, figures that exclude generating this textbook, the author's own time, and later maintenance. Chapter 11 breaks these numbers into tokens.

One observation deserves attention: the app code is less than half of the total. The tests are more than two-thirds as long as the app, and the documents and scripts together are longer than the tests. That proportion is typical of software that is meant to be relied on. The chart below lets you work with it directly.

#### Diagram: ScreenGrab First Install Size Breakdown

<details markdown="1">
<summary>ScreenGrab First Install Size Breakdown</summary>
Type: chart
**sim-id:** screengrab-first-install-size-breakdown<br/>
**Library:** Chart.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** compare<br/>
**Learning Objective:** The learner will compare the four parts of the ScreenGrab first install by line count and share of the total, answering at least 3 of 4 comparison questions correctly.

**Prerequisites:** lines of code, source code, installer script, README file, specification (all defined in this chapter or earlier chapters above this block).

**Evidence of Mastery:** After viewing the chart in both modes, the learner answers four comparison questions, each with a fixed answer. An answer is correct when it matches the "Correct answer" column in Content. Mastery is 3 of 4 correct. Switching modes and hovering are exploration, not evidence.

**Misconceptions:** (1) Most of the project is the app code. (2) Tests are a small add-on. (3) Specifications and documents are negligible in size.

**Instructional Rationale:** Analyzing means breaking a whole into parts and relating them. Comparing parts by both absolute count and share, and then answering questions that require relating two parts, shows whether the learner has absorbed the structure.

**Content:**

The chart shows four bars. Values are the rounded figures from the chapter, and the sim labels them "approximate, from the course description". The mode toggle switches between "Lines" and "Share of total (%)".

| Part | Lines | Share of total (%) |
|---|---|---|
| App code (Swift, 19 files) | 2,000 | 38 |
| Tests (94 automated tests) | 1,370 | 26 |
| Install and build scripts | 500 | 10 |
| Specification, design, and README | 1,340 | 26 |

Shares are computed from the four rounded values, whose sum is 5,210, and rounded to the nearest whole percent. The chapter's stated total is "about 5,200 lines".

The four comparison questions, in order:

| # | Question | Choices | Correct answer | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | Which part is the largest? | App code; Tests; Install and build scripts; Specification, design, and README | App code | At 2,000 lines it exceeds every other part |
| 2 | About what share of the lines are tests? | 10%; 26%; 38%; 50% | 26% | 1,370 of 5,210 is about 26% |
| 3 | How do the test lines compare with the app code lines? | About one-third; About two-thirds; About equal; About double | About two-thirds | 1,370 divided by 2,000 is about 0.69 |
| 4 | Which is larger, the install and build scripts or the specification, design, and README? | Scripts; Specification, design, and README; Equal | Specification, design, and README | 1,340 lines is more than twice the 500 lines of scripts |

**Provenance:** The four values come from the course description section "How the first version was built". Shares and ratios are computed from them as stated in Rules.

**Rules:** Share = part lines divided by 5,210, times 100, rounded to the nearest whole percent. Ratio of tests to app code = 1,370 divided by 2,000. The toggle changes only the displayed axis and values, not the order of the bars. Each question has exactly one correct choice.

**Learner Activity:**

1. The learner views the chart in Lines mode and hovers each bar to see its value.
2. The learner switches to Share mode and sees the percentages.
3. The learner answers the four questions in order, choosing one answer each.
4. After the fourth question, the sim shows the score and the explanations for any missed. The learner should notice that the app code is the largest part but under 40% of the whole.

**Feedback:** Four questions, fixed order, one attempt each. Correct: "Correct" and the Why text. Incorrect: the correct answer and the Why text. A running count "Correct: n of 4" is shown. A final score of 3 or 4 shows "You can read the breakdown"; a lower score invites a second look at the chart.

**Starting State:** The chart in Lines mode with all four bars visible and the question "Where did the lines go?"

**Chapter Anchors:** The chapter states the four values 2,000, 1,370, 500 and 1,340, the total of about 5,200 lines, 19 files, and 94 tests, and says the app code is less than half of the total.
</details>

The case study also records what did not go perfectly, and an honest account must include it. One early hotkey failure was never explained. Several acceptance tests still have to be run by hand, because only a person at the keyboard can see whether a real screen grab behaved. A later fix was needed for Macs with only the Command Line Tools. The installed app has been seen working from both the menu and the Control-Shift-4 hotkey. The current version is open source under the MIT License.

!!! mascot-warning "Installed Is Not the Same as Verified"
    ![Pinch warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    When the installer prints "success," it means the steps ran, not that the tool does its job on your machine. Press the hotkey and make a real grab yourself, then paste it. Do the check on each computer where you install it, because the toolchain and permissions can differ.

The pieces in this chapter fit together as a chain, in which each stage leaves something the next one needs. The table below summarizes the chain, using only terms defined above.

| Stage | What it leaves behind | What protects you |
|---|---|---|
| Code generation | Source files | Compiler errors that catch malformed code |
| Build script | A finished app | One repeatable command |
| Signing | A signed app | The system's signature check |
| Installer script | An installed app | Rollback if the install fails |
| README | Instructions | A reader who can follow them |
| Git commit and push | A recorded history and a backup | The ability to undo |
| Uninstall script | A clean removal | A tool you can leave |

!!! mascot-celebration "You Can Direct the Whole Build"
    ![Pinch celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now describe every stage from generated code to a running install: compiling and its errors, build and installer scripts with rollback and uninstall, signing, the README, and the Git commits that record each step. Next, you will learn what all of this cost in tokens.
