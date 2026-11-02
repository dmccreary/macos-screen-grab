# Quiz: Software Design and Platform Constraints

Test your understanding of design decisions, platform constraints, dependencies, feasibility checks, and the ScreenGrab design choices with these review questions.

---

#### 1. What is a zero-dependency design?

<div class="upper-alpha" markdown>
1. A design that has no requirements
2. A design that depends on a single large library
3. A design that uses only what the platform already provides, with no third-party code
4. A design that needs no operating system
</div>

??? question "Show Answer"
    The correct answer is **C**. ScreenGrab takes this route, and the case study records the generated app as having no third-party dependencies. The benefit is a short list of things that can go wrong: nothing to update, nothing for a vendor to abandon, and nothing outside the code that you must trust. The cost is writing features a library would have supplied, which is small for a two-feature tool.

    **Concept Tested:** Zero-Dependency Design

    **See:** [Dependencies](index.md#dependencies)

---

#### 2. What is a global hotkey?

<div class="upper-alpha" markdown>
1. A keyboard shortcut registered with the system that works no matter which application is in front
2. A shortcut that works only inside one program
3. A key combination that restarts the computer
4. A shortcut shared by all programs at once
</div>

??? question "Show Answer"
    The correct answer is **A**. Most shortcuts, such as Command-C, only work inside the program you are using. A global hotkey is registered with the system, which reports the key press to your app even when you work in another one. That suits a screen grab tool because the moment you want a grab is when another program is on screen. ScreenGrab uses Control-Shift-4.

    **Concept Tested:** Global Hotkey

    **See:** [Global Hotkey](index.md#global-hotkey)

---

#### 3. What is screen recording permission?

<div class="upper-alpha" markdown>
1. A license that allows an app to be sold
2. A setting that lets an app record video only
3. A fee charged for each screenshot
4. The macOS setting that lets an app capture the contents of the screen
</div>

??? question "Show Answer"
    The correct answer is **D**. By default an app cannot see other programs' windows, so the user must allow it in the system's privacy settings. Without the permission, a capture may produce an image missing the other windows, so the picture looks wrong while nothing reports an error. The design must decide how the app learns whether it has permission, how it asks, and what it says when the answer is no.

    **Concept Tested:** Screen Recording Permission

    **See:** [Screen Recording Permission](index.md#screen-recording-permission)

---

#### 4. What is a design trade-off?

<div class="upper-alpha" markdown>
1. A discount offered when two products are bought together
2. The cost that comes with a choice, where gaining one quality means giving up another
3. A disagreement between the designer and the user
4. A choice that has no downsides
</div>

??? question "Show Answer"
    The correct answer is **B**. There is almost never a free option. Using a library gains less code to write and test but gives up an outside piece to update and trust. Writing the feature yourself gives control and nothing external but adds more code to your own tool. The chapter advises recording each design decision with its trade-off, because without the reason a later reader cannot tell whether the choice still makes sense.

    **Concept Tested:** Design Trade-Off

    **See:** [Design Decisions and Trade-Offs](index.md#design-decisions-and-trade-offs)

---

#### 5. Why does freeze-frame selection capture the whole screen before the user drags a rectangle?

<div class="upper-alpha" markdown>
1. To make the final image larger
2. To avoid needing screen recording permission
3. So the final picture matches what the user saw at the instant they started, unaffected by moving content or the selection outline
4. To save memory
</div>

??? question "Show Answer"
    The correct answer is **C**. With live selection, the screen can change while the user drags, the selection outline might appear in the picture, and a menu that closes when the mouse moves may be lost. Freezing the screen first fixes all three problems, because the final capture is cut from the frozen image. The cost is that the full-screen capture happens first, which makes screen recording permission essential. Option B is therefore the opposite of the truth.

    **Concept Tested:** Freeze-Frame Selection

    **See:** [Freeze-Frame Selection](index.md#freeze-frame-selection)

---

#### 6. What is the main trade-off between a native application and a cross-platform application?

<div class="upper-alpha" markdown>
1. Cross-platform saves work when many systems must be served but is larger, slower to start, and has less direct system integration
2. Native applications cannot use the clipboard
3. Cross-platform applications are always smaller
4. Native applications require a web browser
</div>

??? question "Show Answer"
    The correct answer is **A**. A native app is built with the platform's own tools, so it starts quickly, uses system controls, and reaches features such as the menu bar and clipboard directly. A cross-platform app usually includes a large runtime that brings its own browser engine. Because ScreenGrab is for Macs only, the native choice costs nothing and wins on size and integration, which connects to Chapter 1's install size and idle resource use.

    **Concept Tested:** Native Application

    **See:** [Native Application](index.md#native-application)

---

#### 7. Your design depends on a global hotkey, and you are unsure it will work. What is the cheapest sensible first step?

<div class="upper-alpha" markdown>
1. Build the entire app and hope the hotkey works
2. Remove the hotkey from the design without testing
3. Ask users to guess whether it works
4. Ask the agent to build a tiny prototype that only registers the hotkey and prints a line when pressed
</div>

??? question "Show Answer"
    The correct answer is **D**. This is both a technical feasibility check and an agent experiment: a small throwaway test answers whether the design can work at all, for a few cents of tokens. If nothing prints, you find the problem in minutes instead of after the other 1,990 lines exist. The chapter also candidly notes that one early hotkey failure in the case study was never explained, so even this practice does not remove every surprise.

    **Concept Tested:** Technical Feasibility Check

    **See:** [Checking the Design Before Building It](index.md#checking-the-design-before-building-it)

---

#### 8. A user presses a custom hotkey and nothing happens, with no error message. According to the chapter, which cause is typical of this symptom?

<div class="upper-alpha" markdown>
1. A native application
2. A hotkey conflict, where another program or the system already claims the same shortcut
3. A zero-dependency design
4. Too many acceptance criteria
</div>

??? question "Show Answer"
    The correct answer is **B**. When two programs, or the system and a program, want the same shortcut, only one wins and the other silently does nothing. macOS already uses Command-Shift-3, 4, and 5 for built-in screenshots, which is why ScreenGrab chose Control-Shift-4. The silence is the telltale sign, and the chapter suggests recording the shortcut as a design decision you expect to change if it clashes on a user's machine.

    **Concept Tested:** Hotkey Conflict

    **See:** [Hotkey Conflict](index.md#hotkey-conflict)

---

#### 9. A user installs the app, presses the hotkey, and the captured image is missing other programs' windows. What is the most likely platform constraint at work?

<div class="upper-alpha" markdown>
1. The screen recording permission has not been granted
2. The delay is set too short
3. The clipboard is full
4. The app uses too many libraries
</div>

??? question "Show Answer"
    The correct answer is **A**. Without screen recording permission, a capture may omit other programs' windows, and the picture looks wrong while nothing reports an error. The chapter says a design without a permission plan makes the tool seem broken, while a good design notices that permission is missing and explains the single setting to change. Options B, C, and D do not explain missing windows.

    **Concept Tested:** Screen Recording Permission

    **See:** [Screen Recording Permission](index.md#screen-recording-permission)

---

#### 10. Why is the menu bar app form a strong fit for ScreenGrab?

<div class="upper-alpha" markdown>
1. It lets the app show a rich workspace window
2. It guarantees the tool never has bugs
3. The tool is used for seconds at a time, must be ready at once, and should not clutter the screen it is about to photograph
4. It removes the need for a hotkey
</div>

??? question "Show Answer"
    The correct answer is **C**. A menu bar app lives in the strip of icons at the top of the screen with no regular window or Dock icon, so it is always available and nearly invisible. The usual trade-off, that it can show very little, costs nothing when the whole interface is "start a grab" and perhaps "quit." A regular window app would take space and attention for a tool with nothing to display.

    **Concept Tested:** Menu Bar App

    **See:** [Menu Bar App](index.md#menu-bar-app)
