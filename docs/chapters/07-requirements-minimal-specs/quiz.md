# Quiz: Requirements and Minimal Specifications

Test your understanding of user needs, requirements, scope boundaries, acceptance criteria, and minimal specifications with these review questions.

---

#### 1. What is a user need?

<div class="upper-alpha" markdown>
1. A problem a person has or a result a person wants, stated without choosing how to achieve it
2. A list of features the product must include
3. A description of how the code is organized
4. A promise the vendor makes in its marketing
</div>

??? question "Show Answer"
    The correct answer is **A**. A need describes the goal, not the product, and it connects to the job to be done from Chapter 1. "I need to paste a picture of part of my screen into an email" is a need, while "I need a screenshot app with a toolbar" already names a solution that an agent will faithfully build. Option B describes requirements or features, and option C describes design.

    **Concept Tested:** User Need

    **See:** [From User Need to Requirements](index.md#from-user-need-to-requirements)

---

#### 2. What are non-goals in a specification?

<div class="upper-alpha" markdown>
1. Goals that the team failed to reach
2. Goals that only the vendor cares about
3. Explicit statements of what the project will not do
4. Features scheduled for a later release
</div>

??? question "Show Answer"
    The correct answer is **C**. Non-goals are the written form of omissions, listing the tempting things that are out of scope. They matter especially with AI agents, because an agent that is not told "no editing" may reasonably decide that a screenshot tool should have editing, since most do. A non-goal costs one line and prevents a whole feature from being generated, tested, and maintained.

    **Concept Tested:** Non-Goals

    **See:** [Non-Goals](index.md#non-goals)

---

#### 3. What are acceptance criteria?

<div class="upper-alpha" markdown>
1. The legal terms a user accepts during installation
2. The list of platforms the software supports
3. The marketing claims the vendor approves
4. Specific, testable conditions that a requirement must meet for the work to count as done
</div>

??? question "Show Answer"
    The correct answer is **D**. A requirement says what the tool should do, and an acceptance criterion says how you will know that it does. The chapter recommends the "Given a situation, when the user acts, then this result is observed" shape. Two people running the same check must reach the same verdict. Option A describes an end user license agreement from Chapter 3, which is a different kind of acceptance.

    **Concept Tested:** Acceptance Criteria

    **See:** [Acceptance Criteria](index.md#acceptance-criteria)

---

#### 4. Which of these is a non-functional requirement?

<div class="upper-alpha" markdown>
1. "The tool shall copy the captured image to the clipboard."
2. "A grab shall complete within 1 second of the user releasing the mouse button."
3. "The tool shall let the user cancel a selection with the Escape key."
4. "The tool shall start a region selection when the user presses Control-Shift-4."
</div>

??? question "Show Answer"
    The correct answer is **B**. A non-functional requirement states a quality or limit, such as speed, size, privacy, or platform, rather than a specific behavior. The time limit describes how well the tool does its job. The other three options each state an action and the tool's response, which makes them functional requirements. The chapter notes that usable non-functional requirements need a number, a named limit, or a clear yes or no.

    **Concept Tested:** Non-Functional Requirement

    **See:** [Non-Functional Requirements](index.md#non-functional-requirements)

---

#### 5. Why do precise requirements matter even more when an AI agent builds the software?

<div class="upper-alpha" markdown>
1. Agents cannot read text
2. Agents refuse to build anything from short requirements
3. Agents charge extra for each requirement
4. The agent reads requirements literally and fills any gaps with its best guess, which is usually the most common feature set
</div>

??? question "Show Answer"
    The correct answer is **D**. A human developer might infer that "support images" means common formats, but an agent may choose any reading or all of them. Each guess is a place where unwanted features or behavior can enter. Precise requirements are cheap to write and reduce the amount the agent must guess. A good requirement is clear, necessary, and testable, and every line should trace back to the need.

    **Concept Tested:** Requirements

    **See:** [Requirements](index.md#requirements)

---

#### 6. Why does the chapter ask you to write explicit assumptions?

<div class="upper-alpha" markdown>
1. An unstated assumption is invisible until it fails, while a stated one makes the cause of a problem easy to place
2. Assumptions are legally required in every specification
3. Assumptions make the tool run faster
4. Assumptions replace the need for acceptance criteria
</div>

??? question "Show Answer"
    The correct answer is **A**. ScreenGrab assumes a Mac running a recent macOS and one user capturing one display at a time. When the author later runs the tool on a second computer with two displays, the written assumption makes the problem easy to place: the tool did what it was specified to do, and the assumption has stopped holding. Options B, C, and D make claims the chapter does not support.

    **Concept Tested:** Explicit Assumptions

    **See:** [Explicit Assumptions](index.md#explicit-assumptions)

---

#### 7. A colleague asks, "Give me a toolbar with arrows and highlights." How should you classify this statement?

<div class="upper-alpha" markdown>
1. A user need, because it states a result
2. An acceptance criterion, because it can be tested
3. A solution, because it prescribes a feature instead of stating a goal
4. A non-functional requirement, because it concerns appearance
</div>

??? question "Show Answer"
    The correct answer is **C**. The chapter's table sorts "Give me a toolbar with arrows and highlights" as a solution because it prescribes a feature. By contrast, "Show a colleague an error message quickly" is a need because it states the purpose and leaves the method open. To find the real need, keep asking what the person is trying to do and why, as in the four-question chain for the ScreenGrab author.

    **Concept Tested:** User Need

    **See:** [From User Need to Requirements](index.md#from-user-need-to-requirements)

---

#### 8. Which statement is the most checkable version of the vague request "Keep it lightweight"?

<div class="upper-alpha" markdown>
1. "The tool should feel small."
2. "The tool shall use no third-party libraries."
3. "The tool should be efficient."
4. "The tool should be fast and secure."
</div>

??? question "Show Answer"
    The correct answer is **B**. Vague quality words such as "fast," "secure," and "lightweight" cannot be checked. A usable non-functional requirement has a number, a named limit, or a clear yes or no, and the zero-dependency line is a yes or no that a reviewer can verify by inspecting the project. The other options repeat vague words. This line is also a real feature of the ScreenGrab case study.

    **Concept Tested:** Non-Functional Requirement

    **See:** [Non-Functional Requirements](index.md#non-functional-requirements)

---

#### 9. While drafting a specification you think of "remember the last selected region." Tracing it back, no part of the need calls for it. What should you do?

<div class="upper-alpha" markdown>
1. Add it as a functional requirement because it is convenient
2. Add it as a non-functional requirement
3. Leave it out silently and say nothing
4. Place it on the non-goals list
</div>

??? question "Show Answer"
    The correct answer is **D**. Every requirement should trace back to the need, and one that serves no part of it is a candidate for deletion. Writing it down as a non-goal is better than silence, because the list settles later arguments and prevents an agent from adding the feature on its own. This question is described as the single most effective way to keep a specification minimal.

    **Concept Tested:** Scope Boundaries

    **See:** [Setting Boundaries](index.md#setting-boundaries)

---

#### 10. Why does choosing the clipboard as the only output avoid so much work?

<div class="upper-alpha" markdown>
1. Saving a file would require decisions about where, under what name, in which format, and what to do if the file exists, and each decision is a requirement, a test, and a possible bug
2. Clipboard output is the only output macOS allows
3. The clipboard requires no testing
4. Files cannot hold images
</div>

??? question "Show Answer"
    The correct answer is **A**. The specification makes the clipboard the only destination, which is itself a cut: no folders, no file names, no format menus. Each avoided decision removes a requirement, a test, and a place for bugs. This is omission paying off, and the explicit non-goal "the tool does not save the image to a file" keeps an agent from adding it back. Options B, C, and D are not true.

    **Concept Tested:** Clipboard Output

    **See:** [Region Selection, Delayed Capture and Clipboard Output](index.md#region-selection-delayed-capture-and-clipboard-output)
