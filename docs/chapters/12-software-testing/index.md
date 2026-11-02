---
title: "Software Testing: Automated and Manual"
description: "How software verification and testing work, which behaviors automated unit and integration tests can confirm, and which checks a person must run by hand."
date: "2026-11-01 20:08:42"
generated_by: claude skill chapter-content-generator
version: 1.11
---

# Software Testing: Automated and Manual

## Summary

This chapter takes up the question of whether generated software actually works. It defines software verification and testing, then covers automated, unit, and integration tests, coverage, isolation, side effects, stubs, simulated input, and off-screen rendering, followed by the manual, acceptance, and smoke tests a person has to run. After this chapter, you will be able to tell which kinds of behavior a given test can confirm.

## Concepts Covered

This chapter covers the following 14 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Software Verification | 43 |
| Software Testing | 38 |
| Automated Test | 14 |
| Unit Test | 5 |
| Integration Test | 1 |
| Test Coverage | 1 |
| Test Isolation | 3 |
| Test Side Effects | 1 |
| Stubbed Dependency | 1 |
| Simulated Input Events | 1 |
| Off-Screen Rendering | 1 |
| Manual Testing | 11 |
| Acceptance Test | 5 |
| Smoke Test | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 5: Generative AI and Coding Agents](../05-generative-ai-coding-agents/index.md)
- [Chapter 7: Requirements and Minimal Specifications](../07-requirements-minimal-specs/index.md)
- [Chapter 8: Software Design and Platform Constraints](../08-software-design-platform/index.md)

---

!!! mascot-welcome "Did Anyone Actually Check That?"
    ![Pinch waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    An AI agent can write 5,200 lines in 36 minutes, and every line looks confident. This chapter teaches you to tell the difference between "the agent says it works" and "something checked that it works". Grab only what you need, and check what you grab!

Chapter 9 ended with ScreenGrab installed and running. That is not the same as ScreenGrab working. Generated code is fast to produce and easy to trust, and the cheapest moment to catch a mistake is before you depend on the tool. This chapter gives you the vocabulary for the checking, using the real test suite from the ScreenGrab project as the running example.

## Software Verification

**Software verification** is the activity of gathering evidence that software meets its stated requirements. It asks one question: did we build the thing we said we would build? The evidence can come from several sources. A program can run automatically and compare results with expected values. A person can use the software and watch what happens. A reviewer can read the code. A script can inspect the installed app.

Verification differs from asking whether the requirements were the right ones. That second question belongs to the specification work of Chapter 7. Verification takes the requirements as given and checks the software against them.

Four methods produce evidence, and a project usually needs more than one. **Testing** runs the software and compares results with expectations. **Inspection** reads the code or the configuration without running it. **Demonstration** uses the software by hand and watches. **Analysis** reasons from known facts, such as a timing calculation. This chapter concentrates on testing, but the weak links are usually found by demonstration.

The word *evidence* matters. A requirement such as "pressing Esc during a grab cancels it and leaves the clipboard unchanged" is verified only when something has observed that behavior. Saying "the agent wrote the cancel code" is a claim, not evidence. Good evidence has four properties:

- It was **observed**, not assumed from reading code.
- It can be **repeated** by someone else following the same steps.
- It was **recorded**, with the output or log line kept.
- It is **dated** and names the setup it ran on.

#### Worked example: one requirement, three kinds of evidence

Take that Esc requirement. The ScreenGrab project gathers evidence three ways, and each one proves something different.

| Evidence | What it observes | What it cannot show |
|---|---|---|
| An automated test of the grab coordinator using fake parts | After a cancel, no image was delivered and the stored clipboard was untouched | That the real overlay window receives a real Esc key press |
| An automated test of the overlay view with a synthesized key event | The view reports "cancel" when it is sent an Esc event | That macOS delivers a physical key press to the view |
| Manual acceptance test AC-5: start a grab, press Esc | The real overlay disappears, and the real clipboard still has its old content | Anything about a different Mac, a different display, or the next release |

No single row is enough. Together they form a chain from the logic down to the real screen. Verification is the work of building that chain and knowing where its weak links are.

The table above is also a map of this chapter. The first two rows are automated tests and the third is a manual one. The sections that follow explain each kind, and Chapter 13 explains how to report which links in the chain you actually have.

## Software Testing

**Software testing** is one method of verification: running the software with chosen inputs and comparing what it does with what was expected. Every test has the same three-part shape, often called arrange, act, assert.

1. **Arrange:** set up the starting situation and the inputs.
2. **Act:** run the one piece of behavior under test.
3. **Assert:** state the expected result and fail if the actual result differs.

The next snippet shows that shape in a real ScreenGrab test. Before you read it, here is what it does. The function `selectionRect` turns two points, where a drag started and ended, into a rectangle, and it clamps the rectangle so it cannot extend past the edge of the display (`bounds`). The test arranges a 400 by 300 display, drags from (350, 250) to far past the corner at (900, 900), and asserts that the result stops at the display edge.

```swift
private let bounds = CGRect(x: 0, y: 0, width: 400, height: 300)

@Test func clampsToDisplayEdges() {
    // Act: a drag that runs far past the bottom-right corner
    let rect = SelectionGeometry.selectionRect(
        from: CGPoint(x: 350, y: 250), to: CGPoint(x: 900, y: 900), within: bounds)
    // Assert: the selection stops at the display edge
    #expect(rect == CGRect(x: 350, y: 250, width: 50, height: 50))
}
```

Where does the expected value come from? It must come from the requirement, not from the code. If you ask an agent to write a test by running the code and copying down whatever it prints, the test passes by construction and proves nothing. A useful test fails when the code is wrong, and a failure looks like this (simplified):

```text
Expectation failed: (rect -> CGRect(x: 350, y: 250, width: 550, height: 650))
  == CGRect(x: 350, y: 250, width: 50, height: 50)
```

The message shows that the clamp did not happen: the rectangle ran past the edge of the 400 by 300 display. A reader can see at once which behavior broke. A test is an executable claim about behavior. When it passes, you know that this input produced that output, once, on this machine. It says nothing about inputs the test did not try. That is the central limit of testing: tests show the presence of confirmed behavior, not the absence of mistakes.

!!! mascot-thinking "A Test Is a Claim With a Receipt"
    ![Pinch thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that a passing test confirms exactly one thing: the one case it ran. When you read "94 tests pass", ask which behaviors those 94 claims are about, and which behaviors have no claim at all.

The next sections define each kind of test, and a sorting exercise at the end of the chapter lets you check that you can tell them apart.

## Automated Tests

An **automated test** is a test that a program runs and judges by itself, with no person watching. You start the whole suite with one command and read a pass or fail result. ScreenGrab's suite runs through `swift test`, and the project script `src/scripts/test.sh` wraps it for machines that have only the Command Line Tools.

Automated tests have three strengths. They are fast, so you can rerun them after every change. They are repeatable, so a failure points at a change, not at a different mood or a different mouse movement. And they are cheap to run again, so a bug fixed once stays fixed (Chapter 13 returns to this).

They also have a firm limit. An automated test can only confirm what a program can observe. A program cannot easily press a physical key, feel whether a crosshair looks right, or ask the operating system's permission dialog for consent. Those need a person.

#### Worked example: what ScreenGrab's 94 tests cover

ScreenGrab has 94 automated tests spread across five test files. They cover the selection geometry, the image encoder, file naming, hotkey records and settings, the grab state machine, and how the overlay view draws and responds. The project's design document lists them by area and says what each verifies. That list shows an important rule: the tests are strongest where behavior is pure logic, and they get weaker as the code gets closer to the real screen and the real keyboard.

## Unit Tests

A **unit test** checks one small piece of logic in isolation, such as a single function or class. The piece under test is the "unit". Unit tests are the fastest and most precise kind. When one fails, you know which function broke.

ScreenGrab's design deliberately separated its pure logic from its window-handling code so that the logic could be unit tested. Geometry conversion, file naming, delay limits, and hotkey validation are all pure logic. The `clampsToDisplayEdges` test above is a unit test. Code is easy to unit test when it takes its inputs as parameters and returns a result, and hard when it reaches out to the clock, the disk, or the screen. That is why the file naming function receives an "exists" check as a parameter, rather than looking at the real disk: a test can pass in a check that always says "the name is taken" and verify the " (2)" suffix without creating any file.

#### Worked example: a unit test with a table of cases

One ScreenGrab test checks that a drag in any of the four directions gives the same rectangle. It runs the same assertion on four start and end pairs: down and right, up and left, and the two diagonals. Each pair must produce the rectangle starting at (10, 20) with width 100 and height 50. This is a common unit-testing habit. Choose the cases that could plausibly fail, such as each direction, a minimum size, or an edge, and run them as a list rather than writing one case and hoping.

## Integration Tests

An **integration test** checks that several parts work correctly together. Where a unit test isolates one function, an integration test wires real parts to each other and checks the combined result. For example, ScreenGrab's crop-accuracy test builds an image where each pixel has a known color, passes it through the real geometry and cropping functions, and checks the exact pixels that come out, including at 2 times Retina scale. That test would not catch an error inside one function alone, but it would catch two correct functions that disagree about points versus pixels.

## Test Coverage

**Test coverage** is the proportion of the code, or of the requirements, that a test suite exercises. Code coverage is usually reported as the percentage of lines run during the tests. High coverage means few lines are untested. It does not mean the tests are good: a test can run a line without checking its result. Treat coverage as a way to find the code nobody tested, not as proof that the tested code is right.

!!! mascot-warning "Coverage Is Not Correctness"
    ![Pinch warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A suite can run every line and still check nothing, because running a line is not the same as asserting its result. Ask the agent which assertion protects each requirement, and treat a line with no assertion as untested.

## Test Isolation

**Test isolation** means each test runs independently of the others and of the outside world, so that one test's outcome cannot depend on another's. Isolated tests can run in any order and a failure points at one cause. The usual tools are a fresh setup for each test and private copies of anything shared, such as settings or the clipboard.

## Test Side Effects

**Test side effects** are changes a test makes outside itself: files written, settings changed, the clipboard overwritten, windows shown. Side effects are a hazard because they make tests depend on each other and can damage the machine under test. ScreenGrab's tests show the care this needs.

The tests use a private named pasteboard, so they never touch your real clipboard. Preferences are held in an in-memory object, because a real suite leaves a settings file in the user's library after every run, even after cleanup. The automated tests need no permissions and put nothing on the visible screen.

## Stubbed Dependencies

A **stubbed dependency** is a stand-in for a part that the code under test relies on, supplied by the test so that the real part is not needed. A stub returns fixed answers. Its more elaborate cousin, a fake, also records what it was asked. The reason to use them is to cut off the parts of the world that are slow, risky, or impossible to automate.

ScreenGrab's grab coordinator depends on a screen capturer, a permission checker, a countdown, a selector, and an output. The tests replace each with a fake, so every cell of the coordinator's state table can be exercised without a real display or a permission prompt. The installer tests do the same with shell commands: rollback was tested with a stubbed `mv`, and the permission-reset flow with stubbed `tccutil` and `defaults`, so no real settings changed.

## Simulated Input Events

**Simulated input events** are keyboard and mouse events that a test builds by hand and sends to a view, in place of a person's real input. ScreenGrab's overlay tests synthesize mouse drags and Esc presses and check that the view reports the right selection or a cancel. The limit is stated in the design document: a test can send a made-up event to the view, but it cannot prove that macOS delivers a physical key press, because producing a real one from a program needs Accessibility permission. Even the hotkey test builds a Carbon hotkey event by hand and checks everything after the key press itself.

## Off-Screen Rendering

**Off-screen rendering** draws a view into a bitmap in memory instead of onto the display, so a test can inspect the pixels. ScreenGrab's tests render the selection overlay this way and check three things: the area outside the selection is dimmed, the selection itself is not, and the image is the right way up. No window appears, and no screen-recording permission is needed. One test does order a window far off-screen, because only a window that is ordered in has real backing stores for its layers. Pixel checks like these catch drawing errors that a logic test cannot see.

!!! mascot-tip "Fake the World, Not the Logic"
    ![Pinch giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    When you ask an agent for tests, tell it to replace the clipboard, the clock, and the screen with stand-ins, and to leave your own logic real. A test that fakes the logic it is supposed to check proves nothing.

## Manual Testing

**Manual testing** is checking software by using it as a person would, and observing the result yourself. It is the only way to confirm what a program cannot observe: what real hardware and a real operating system do, and what a human can see and feel.

Automated and manual testing complement each other, as the table below shows.

| | Automated test | Manual test |
|---|---|---|
| Who runs it | A program, in seconds | A person, in minutes |
| Repeatable on every change | Yes | Only if someone does the work |
| Can press a real key, or grant a real permission | No, in general | Yes |
| Can judge how a screen looks and feels | Only by pixel checks | Yes |
| Risk | Misses what it cannot observe | Skipped, forgotten, or done differently each time |

#### Worked example: what ScreenGrab needs a person for

The design document says plainly what automation cannot reach: real ScreenCaptureKit output, on-screen overlay behavior, the live crosshair, and pasting into real applications. It adds that a real key press cannot be simulated without Accessibility access, so hotkey delivery has to be tried by hand. Each of these is a manual test, and each needs a note of who ran it and when. A manual test without a record is only a memory. The cost is also real: ScreenGrab's 34 acceptance tests take a person a good while, which is why they get skipped, and why the verification status of Chapter 13 exists to say which have been run.

## Acceptance Tests

An **acceptance test** is a check, defined in advance from the requirements, that decides whether the software is good enough to accept. Each one has an ID, a scenario, an expected result, and the requirements it covers. They are often run by hand. ScreenGrab's specification lists 34, named AC-1 to AC-34.

#### Worked example: reading one acceptance test

Take AC-5 from the specification: "Start a grab, press Esc. Expected: the overlay disappears and the clipboard still has its previous content. Covers FR-2.5 and FR-9.2." The table row links a scenario to numbered requirements. A table of this kind is called a traceability matrix: it traces each requirement to the tests that cover it. For example, requirement FR-2.5 (cancel a grab with Esc or a right click) is covered by AC-5 and AC-7. That link lets you ask two useful questions: is every requirement covered by at least one acceptance test, and has each acceptance test actually been run? Chapter 13 shows why the second question is the one that gets skipped.

## Smoke Tests

A **smoke test** is a quick set of checks that the software starts and its most basic parts are alive. The name comes from hardware: power it on and see whether smoke comes out. A smoke test does not prove the software correct. It proves that it is worth testing further.

ScreenGrab's smoke checks run against the installed app and trigger no permission prompt. One confirms that the app runs with no Dock icon (`lsappinfo` reports it as a background app). Another confirms that a second launch exits and leaves the first process running. A third reports idle CPU and memory, which came out at 0.0% CPU and about 25 MB.

#### Diagram: Which Test Can Confirm This

Now you have the vocabulary. Try classifying twelve real ScreenGrab behaviors.

<details markdown="1">
<summary>Which Test Can Confirm This</summary>
Type: microsim
**sim-id:** which-test-can-confirm-this<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** classify<br/>
**Learning Objective:** The learner will classify each of twelve ScreenGrab behaviors as confirmable by a unit test, an integration test, a smoke test, or a manual acceptance test, with at least 10 of 12 correct on the first attempt.

**Prerequisites:** automated test, unit test, integration test, smoke test, manual testing, acceptance test (all defined in the chapter above this block).

**Evidence of Mastery:** The learner assigns each behavior to one of four test kinds. An assignment is correct when it matches the answer column in Content. Mastery is 10 of 12 correct on the first attempt per item. Reading the reasons after answering is exploration, not evidence.

**Misconceptions:** (1) Automated tests can confirm everything about the software. (2) Passing unit tests mean the real screen behaves correctly. (3) A smoke test proves the software is correct.

**Instructional Rationale:** Classification requires the learner to reason about what a check can observe, which is the Understand-level skill of sorting examples under a concept. Immediate reasons after each answer let the learner repair the wrong rule at once.

**Content:**

The four kinds of test: Unit test, Integration test, Smoke test, Manual acceptance test.

| # | Behavior to confirm | Correct kind | Why (shown as feedback) |
|---|---|---|---|
| 1 | A drag from bottom-right to top-left gives the same rectangle as top-left to bottom-right | Unit test | It is pure logic in one function, so it can be checked in isolation. |
| 2 | A synthetic image with known pixel colors is cropped through the real geometry and cropping functions, and the output pixels match exactly at 2 times scale | Integration test | Several real parts must agree about points and pixels. |
| 3 | Two grabs in the same second are saved with the second named with " (2)" | Unit test | File naming is pure logic with an injected "exists" check. |
| 4 | A hotkey that another app has already registered is reported as a conflict | Integration test | It calls the real operating system registration and checks the combined result. |
| 5 | Pressing the real Control-Shift-4 keys starts a grab while another app is in front | Manual acceptance test | A program cannot send a real key press without Accessibility permission. |
| 6 | The pasted image in a Keynote or Pages document is exactly the selected region at the expected size | Manual acceptance test | It needs a real other application and a person to judge the result. |
| 7 | The installed app runs with no Dock icon | Smoke test | A quick check of the installed app, with no permission prompt. |
| 8 | The selection overlay, rendered off-screen, dims outside the selection and leaves the selection undimmed | Integration test | The view and its drawing code are tested together, through pixels. |
| 9 | After Screen Recording permission is revoked, a grab shows an alert with a button to open System Settings and copies no image | Manual acceptance test | It needs the real operating-system permission, which a program cannot grant or revoke. |
| 10 | A delay of 99 seconds is clamped to the allowed maximum | Unit test | Delay clamping is a pure function of its input. |
| 11 | The app idles at about 0% CPU | Smoke test | A quick `ps` check of the installed app, with no permission prompt. |
| 12 | With two displays of different pixel density, the captured pixels match the highlighted area on both | Manual acceptance test | It needs two real displays and a person to compare. |

**Provenance:** Items come from the ScreenGrab design document section 10 and specification section 10 (acceptance tests AC-3, AC-4, AC-9, and AC-21), and from the chapter's examples. Item 10's maximum is illustrative; the sim must label item 10 "illustrative value".

**Rules:** Four answer choices per item. An item is correct when the chosen kind equals the Correct kind. The score counts correct first answers only. The order is fixed as listed.

**Learner Activity:**

1. The learner reads behavior 1 and chooses one of the four kinds.
2. The sim immediately shows correct or incorrect and the Why text.
3. The learner moves to the next behavior. An answered item cannot be changed.
4. After item 12, the sim shows the score and a table grouping the 12 behaviors by correct kind.
5. The learner should notice that the manual group is the one that touches real keys, real permissions, and real displays.

**Feedback:** Twelve items, fixed order, one attempt each. Correct: "Correct: [kind]." plus the Why text. Incorrect: "Not quite: [Why text]." The score "Correct on first attempt: n of 12" is shown at the end, with "Mastery" shown when n >= 10.

**Starting State:** Behavior 1 is shown with four unselected choices. The question on screen is "Which kind of test could confirm this?"

**Chapter Anchors:** The chapter states ScreenGrab has 94 automated tests and 34 acceptance tests (AC-1 to AC-34), and that the smoke checks report about 0.0% CPU and about 25 MB at idle.
</details>

#### Diagram: ScreenGrab Grab Flow Test Coverage

The sorter classifies single behaviors. This second diagram follows one whole grab from key press to paste and shows where each kind of check applies.

<details markdown="1">
<summary>ScreenGrab Grab Flow Test Coverage</summary>
Type: workflow
**sim-id:** grab-flow-test-coverage<br/>
**Library:** Mermaid<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** distinguish<br/>
**Learning Objective:** The learner will distinguish the steps of a ScreenGrab grab that an automated test can confirm from the steps that only a person can confirm, by marking all 7 steps and matching the Content table on at least 6 of 7.

**Prerequisites:** automated test, simulated input events, stubbed dependency, off-screen rendering, manual testing (all defined in the chapter above this block).

**Evidence of Mastery:** The learner opens each step, commits "automated can confirm" or "only a person can confirm" before the answer is shown, and finishes with at least 6 of 7 matching the Content table. Opening a step to read its description is exploration, not evidence.

**Misconceptions:** (1) If most steps are automated, the whole flow is verified. (2) The key press itself is covered by the hotkey tests.

**Instructional Rationale:** Walking the flow in order shows that automation covers the middle of the chain but not its two ends, the real key press and the real pasted result. Committing a judgment per step makes the learner perform the distinguishing, not just read it.

**Content:**

The flow has 7 steps in this order, shown as a flowchart. Each step is clickable. Clicking opens an information box with the step's description, then two buttons for the learner's judgment, then the answer and reason.

| # | Step | Description | Answer | Reason |
|---|---|---|---|---|
| 1 | Press the hotkey | A person presses Control-Shift-4 in another app. | Only a person can confirm | A program cannot send a real key press without Accessibility permission. |
| 2 | Hotkey reaches the app | The registered hotkey event is delivered to ScreenGrab's handler. | Automated can confirm | A test builds a Carbon hotkey event by hand and checks the handler receives the right action. |
| 3 | Coordinator starts the grab | The state machine moves from idle to selecting. | Automated can confirm | Tested with fakes for every dependency. |
| 4 | Screen is captured | The real display is captured to a frozen still image. | Only a person can confirm | It needs the real Screen Recording permission and a real display. |
| 5 | User drags a selection | The overlay shows and the drag chooses a region. | Automated can confirm | Synthesized mouse events and off-screen rendering check selection and drawing. |
| 6 | Image is cropped and copied | The region is cropped, encoded, and written to the clipboard. | Automated can confirm | Tested with known pixels and a private named pasteboard. |
| 7 | Image is pasted into another app | The user pastes into Preview, Keynote, or Pages. | Only a person can confirm | It needs a real other application and a person to judge size and orientation. |

An edge label on every arrow states what is passed on: "key event", "action", "frozen image", "selection", "cropped PNG and TIFF", "clipboard contents".

**Provenance:** From the ScreenGrab design document sections 7 and 10 and specification section 10. The step descriptions are the chapter author's summary of those sections.

**Rules:** There are 7 steps and each has one answer. The learner's final score is the number of steps where the committed judgment matches the Answer column. Mastery when score >= 6.

**Learner Activity:**

1. The learner clicks step 1. The information box shows the description and two buttons.
2. The learner chooses a judgment. The answer and reason appear, and the step is marked answered.
3. The learner repeats for steps 2 to 7 in any order.
4. When all 7 are answered, the sim shows the score and highlights the steps that need a person.
5. The learner should notice that the first, fourth, and last steps cannot be fully confirmed by automation.

**Feedback:** Seven steps, any order, one attempt each. Correct: "Correct" plus the Reason. Incorrect: "Not quite" plus the Reason. The score "Matched: n of 7" is shown after step 7, with "Mastery" when n >= 6.

**Starting State:** The flow is shown with no steps answered. The question on screen is "At which steps does a person have to look?"

**Chapter Anchors:** The chapter states a real key press, the real screen capture, and the real paste need a person, and that the hotkey test builds the event by hand and checks everything after the key press.
</details>

!!! mascot-celebration "You Can Read a Test Suite"
    ![Pinch celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now name what unit, integration, smoke, and acceptance tests each confirm, and spot the behaviors that automation cannot reach. That is the skill that separates "the tests pass" from "it works".
