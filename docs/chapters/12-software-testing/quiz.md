# Quiz: Software Testing: Automated and Manual

Test your understanding of verification, automated and manual tests, unit and integration tests, stubs, acceptance tests, and smoke tests with these review questions.

---

#### 1. What is a unit test?

<div class="upper-alpha" markdown>
1. A test that checks the whole installed app on a real screen
2. A test that checks one small piece of logic in isolation, such as a single function or class
3. A test that a person runs by hand to judge how the screen looks
4. A test that confirms the software starts
</div>

??? question "Show Answer"
    The correct answer is **B**. Unit tests are the fastest and most precise kind, because when one fails you know which function broke. ScreenGrab's design deliberately separated pure logic, such as geometry conversion, file naming, delay limits, and hotkey validation, from window-handling code so that the logic could be unit tested. Option A describes manual or acceptance testing, and option D describes a smoke test.

    **Concept Tested:** Unit Tests

    **See:** [Unit Tests](index.md#unit-tests)

---

#### 2. What is a smoke test?

<div class="upper-alpha" markdown>
1. A test of how well the software handles overheating hardware
2. A complete proof that the software is correct
3. A test that measures code coverage
4. A quick set of checks that the software starts and its most basic parts are alive
</div>

??? question "Show Answer"
    The correct answer is **D**. The name comes from hardware: power it on and see whether smoke comes out. A smoke test does not prove the software correct, only that it is worth testing further. ScreenGrab's smoke checks confirm the app runs with no Dock icon, that a second launch exits and leaves the first process running, and that idle use is about 0.0% CPU and about 25 MB of memory.

    **Concept Tested:** Smoke Tests

    **See:** [Smoke Tests](index.md#smoke-tests)

---

#### 3. What are test side effects?

<div class="upper-alpha" markdown>
1. Benefits a test brings to unrelated code
2. Warnings printed by the compiler
3. Changes a test makes outside itself, such as writing files, changing settings, or overwriting the clipboard
4. Errors in the specification
</div>

??? question "Show Answer"
    The correct answer is **C**. Side effects are a hazard because they make tests depend on each other and can damage the machine under test. ScreenGrab's tests use a private named pasteboard so they never touch your real clipboard, and they hold preferences in an in-memory object because a real suite would leave a settings file in the user's library. The automated tests need no permissions and show nothing on the visible screen.

    **Concept Tested:** Test Side Effects

    **See:** [Test Side Effects](index.md#test-side-effects)

---

#### 4. Why must a test's expected value come from the requirement rather than from running the code and copying its output?

<div class="upper-alpha" markdown>
1. A test built from the code's own output passes by construction and proves nothing
2. Requirements are always shorter than code
3. The compiler refuses to accept copied values
4. Copied values make tests run slower
</div>

??? question "Show Answer"
    The correct answer is **A**. If you ask an agent to run the code and write down whatever it prints, the test cannot fail when the code is wrong. A useful test fails when the code is wrong, and the failure message should show which behavior broke. The chapter's clamping example shows a rectangle running past the display edge. Tests show the presence of confirmed behavior, not the absence of mistakes.

    **Concept Tested:** Software Testing

    **See:** [Software Testing](index.md#software-testing)

---

#### 5. What can an automated test generally not confirm that a manual test can?

<div class="upper-alpha" markdown>
1. Whether a function returns the right value
2. What real hardware and a real operating system do, such as delivering a physical key press or granting a real permission
3. Whether the code compiles
4. Whether a file name is formatted correctly
</div>

??? question "Show Answer"
    The correct answer is **B**. An automated test can only confirm what a program can observe. A program cannot easily press a physical key, feel whether a crosshair looks right, or ask the operating system's permission dialog for consent. The design document says a real key press cannot be simulated without Accessibility access. Options A, C, and D are things automation does well.

    **Concept Tested:** Manual Testing

    **See:** [Manual Testing](index.md#manual-testing)

---

#### 6. Why does high test coverage not prove that the tests are good?

<div class="upper-alpha" markdown>
1. Coverage numbers are always inaccurate
2. High coverage always means perfect software
3. Coverage only measures documentation
4. A test can run a line without checking its result, so coverage shows only which code nobody tested
</div>

??? question "Show Answer"
    The correct answer is **D**. Test coverage is the proportion of code or requirements a suite exercises, usually reported as the percentage of lines run. A line that runs but is never checked counts as covered. The chapter advises using coverage to find code that nobody tested, not as proof that the tested code is right. Option B is the misconception the chapter warns against.

    **Concept Tested:** Test Coverage

    **See:** [Test Coverage](index.md#test-coverage)

---

#### 7. You want to test ScreenGrab's grab coordinator without a real display or a permission prompt. What technique does the chapter describe?

<div class="upper-alpha" markdown>
1. Replace the screen capturer, permission checker, countdown, selector, and output with stubs or fakes supplied by the test
2. Run the test only on a machine with Xcode
3. Skip the test and rely on the agent's report
4. Grant every permission in advance
</div>

??? question "Show Answer"
    The correct answer is **A**. A stubbed dependency is a stand-in for a part the code relies on, returning fixed answers, and a fake also records what it was asked. Using them, every cell of the coordinator's state table can be exercised without a real display. The installer tests do the same with shell commands, such as a stubbed `mv` for rollback and stubbed `tccutil` and `defaults` for the permission reset.

    **Concept Tested:** Stubbed Dependencies

    **See:** [Stubbed Dependencies](index.md#stubbed-dependencies)

---

#### 8. An automated test sends a synthesized Esc event to the overlay view, and the view reports "cancel." What additional evidence is needed to show that pressing the real Esc key cancels a real grab?

<div class="upper-alpha" markdown>
1. Another identical automated test
2. A higher coverage percentage
3. A manual acceptance test such as AC-5, in which a person starts a grab, presses Esc, and observes the overlay disappear and the clipboard unchanged
4. A longer README
</div>

??? question "Show Answer"
    The correct answer is **C**. The synthesized-event test shows the view reacts to an Esc event, but it cannot prove that macOS delivers a physical key press to the view. The chapter's three rows of evidence form a chain from logic down to the real screen, and the manual test is the link that observes the real behavior. Repeating a test of the same kind, as in option A, adds no new kind of evidence.

    **Concept Tested:** Acceptance Tests

    **See:** [Acceptance Tests](index.md#acceptance-tests)

---

#### 9. How does a traceability matrix help you judge whether testing is complete?

<div class="upper-alpha" markdown>
1. It counts how many lines of code each developer wrote
2. It lists the files in the project
3. It measures how fast the tests run
4. It traces each requirement to the tests that cover it, so you can ask whether every requirement has at least one acceptance test
</div>

??? question "Show Answer"
    The correct answer is **D**. In ScreenGrab's specification, requirement FR-2.5, cancelling a grab with Esc or a right click, is covered by acceptance tests AC-5 and AC-7. The link lets you ask whether every requirement is covered by at least one test and whether every test traces to a requirement. The 34 acceptance tests are named AC-1 to AC-34, and several still have to be run by hand.

    **Concept Tested:** Acceptance Tests

    **See:** [Acceptance Tests](index.md#acceptance-tests)

---

#### 10. ScreenGrab's 94 automated tests are strongest where behavior is pure logic and weaker closer to the real screen and keyboard. What is the underlying reason?

<div class="upper-alpha" markdown>
1. The design separated pure logic so it could be tested in isolation, while real screen capture, key delivery, and permissions need a real system or a person
2. The agent wrote lazier tests for the screen code
3. Pure logic is harder to test than window code
4. Tests cannot check logic
</div>

??? question "Show Answer"
    The correct answer is **A**. Logic that takes inputs as parameters and returns results is easy to unit test, while code that reaches out to the clock, the disk, or the screen is hard. The design document says real ScreenCaptureKit output, on-screen overlay behavior, the live crosshair, and pasting into real applications are beyond automation. Those are covered by manual tests, which need a record of who ran them and when.

    **Concept Tested:** Automated Tests

    **See:** [Automated Tests](index.md#automated-tests)
