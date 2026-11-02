# Quiz: Bugs, Evidence, and Verification Plans

Test your understanding of bug reproduction, root cause analysis, regression tests, the limits of automated tests, evidence-based reporting, and verification status with these review questions.

---

#### 1. What is a regression test?

<div class="upper-alpha" markdown>
1. A test that measures how fast the software runs
2. A test added after a bug is fixed, which fails if the bug ever returns
3. A test written before any code exists
4. A test that confirms the software starts
</div>

??? question "Show Answer"
    The correct answer is **B**. Regression means going backwards: a fixed behavior breaking again after a later change. Because AI agents change code often and quickly, a fix without a regression test may quietly undo itself. The steps are to write the test from the reproduction recipe, watch it fail against the broken code, apply the fix, and watch it pass. Option D describes a smoke test.

    **Concept Tested:** Regression Tests

    **See:** [Regression Tests](index.md#regression-tests)

---

#### 2. What is bug reproduction?

<div class="upper-alpha" markdown>
1. Copying a bug into another program on purpose
2. Writing a report that describes the bug in general terms
3. Fixing the bug by editing the code
4. Making a bug happen again on demand using a written recipe
</div>

??? question "Show Answer"
    The correct answer is **D**. A bug you can reproduce is a bug you can fix and test, while one you cannot reproduce can only be guessed at. A good recipe has the starting state, the exact steps, the expected result, and the actual result, plus the environment: operating system version, hardware, and app version. The chapter's Retina example gives a recipe that anyone with a 2 times display can follow.

    **Concept Tested:** Bug Reproduction

    **See:** [Bug Reproduction](index.md#bug-reproduction)

---

#### 3. What is root cause analysis?

<div class="upper-alpha" markdown>
1. The search for the underlying reason a bug happens, rather than the nearest visible symptom
2. A review of the license terms
3. A count of how many users reported the bug
4. A comparison of two vendors' prices
</div>

??? question "Show Answer"
    The correct answer is **A**. Fixing the symptom, such as doubling the output size, can hide the problem and break other cases. The method is to keep asking why until you reach a cause that, if removed, makes the bug impossible. In the hypothetical Retina example, the chain ends at a scale conversion that was done in two places, with one skipping the scale factor.

    **Concept Tested:** Root Cause Analysis

    **See:** [Root Cause Analysis](index.md#root-cause-analysis)

---

#### 4. ScreenGrab's early hotkey failure was never explained, though a real key press later worked. Why does the chapter say not to call it fixed?

<div class="upper-alpha" markdown>
1. Because hotkeys can never work reliably
2. Because the later success proves nothing about any hotkey
3. Because nothing was changed that could account for the difference, so calling it fixed would be a false claim
4. Because the log was deleted
</div>

??? question "Show Answer"
    The correct answer is **C**. An unexplained failure is one that was observed but cannot be accounted for, usually because it could not be reproduced and not enough evidence was captured. The right response is to leave it open and write down what to capture next time. The later success, confirmed by the log, is real evidence for that moment, but it does not explain the earlier failure. Options A and D are not claims the chapter makes.

    **Concept Tested:** Unexplained Failure

    **See:** [The Unexplained Failure](index.md#the-unexplained-failure)

---

#### 5. Why is "it works on my machine" not evidence, according to the chapter?

<div class="upper-alpha" markdown>
1. Because all machines are identical
2. Because an environment-specific bug appears only on some setups, such as a particular OS version, hardware, tool installation, or shell
3. Because the author's machine is always broken
4. Because evidence must come from a vendor
</div>

??? question "Show Answer"
    The correct answer is **B**. ScreenGrab recorded two real examples. Macs with only the Command Line Tools ship the Swift Testing framework but not XCTest, so the test script passes three locations explicitly. And in non-interactive zsh scripts, plain `log` runs a shell built-in, so scripts must call `/usr/bin/log` by its full path. Behavior on hardware the author does not own cannot be seen from one machine.

    **Concept Tested:** Environment-Specific Bugs

    **See:** [Environment-Specific Bugs](index.md#environment-specific-bugs)

---

#### 6. All 94 of ScreenGrab's automated tests passed, yet the hotkey still had an open question. What does the chapter conclude?

<div class="upper-alpha" markdown>
1. A test result and a verification result are different things, because a program could not press the physical key
2. The tests were written incorrectly
3. Automated tests are useless
4. The hotkey needs no verification
</div>

??? question "Show Answer"
    The correct answer is **A**. The tests exercised everything after the press, including a hand-built hotkey event reaching the handler, but they could not show that the keyboard produced that event. The gap closed only when a person pressed the keys and the log showed the result. A stubbed test shows the code handles the stub's answers, not what the real tool does. Option C overstates the point, since the tests remain valuable.

    **Concept Tested:** Limits Of Automated Tests

    **See:** [Limits of Automated Tests](index.md#limits-of-automated-tests)

---

#### 7. Which verification status applies to the claim "Control-Shift-5 works with a real key press," for which no check has been done?

<div class="upper-alpha" markdown>
1. Verified automatically
2. Verified by hand
3. Claim exceeds evidence
4. Not yet run
</div>

??? question "Show Answer"
    The correct answer is **D**. The chapter uses four labels: verified automatically, verified by hand, not yet run, and claim exceeds evidence. In ScreenGrab's status table, the Control-Shift-5 press, the x86_64 half of the universal build, and several countdown and multi-display checks are all "not yet run." Writing that label plainly tells a reader what is risky and what to check next.

    **Concept Tested:** Verification Status

    **See:** [Verification Status](index.md#verification-status)

---

#### 8. When writing a regression test for a fixed bug, which step shows that the test can actually catch the bug?

<div class="upper-alpha" markdown>
1. Deleting the test after the fix
2. Writing the test after the fix without running it
3. Running the test against the broken code and watching it fail before applying the fix
4. Running the test only on a machine that never had the bug
</div>

??? question "Show Answer"
    The correct answer is **C**. A test that never failed has not shown it can catch the bug. The sequence is to write the test from the reproduction recipe, run it against the broken code and see it fail, apply the fix, and see it pass. This is the habit that keeps a fix from quietly undoing itself when an agent changes the code again.

    **Concept Tested:** Regression Tests

    **See:** [Regression Tests](index.md#regression-tests)

---

#### 9. In the hypothetical Retina bug, the crop used point values as pixel values because the scale conversion was done in two places and one skipped it. What is the fix the chapter describes?

<div class="upper-alpha" markdown>
1. Double the output size at the end
2. Tell users to avoid Retina displays
3. Remove the crop feature
4. Replace the duplicated conversion with a single tested conversion function
</div>

??? question "Show Answer"
    The correct answer is **D**. Root cause analysis points at the duplicated conversion, not at the half-size image. Doubling the output (option A) would fix one symptom and risk breaking other cases. A single tested function removes the possibility of one place skipping the scale factor, which is the mitigation the ScreenGrab design records for this risk. A regression test can then guard it.

    **Concept Tested:** Root Cause Analysis

    **See:** [Root Cause Analysis](index.md#root-cause-analysis)

---

#### 10. A report says "ScreenGrab works," and its only support is 94 passing automated tests. Which verification status label fits best?

<div class="upper-alpha" markdown>
1. Claim exceeds evidence
2. Verified by hand
3. Not yet run
4. Verified automatically for the whole claim
</div>

??? question "Show Answer"
    The correct answer is **A**. The sentence "ScreenGrab works" says far more than passing tests show: real key presses, real screen capture, pasting into real applications, and other hardware were not covered by those tests. The chapter says this fourth label has no rows in the real table because the author wrote claims carefully, and it is the label to apply to a sweeping sentence like this one. A better claim lists what was checked and what was not.

    **Concept Tested:** Evidence-Based Reporting

    **See:** [Verification Status](index.md#verification-status)
