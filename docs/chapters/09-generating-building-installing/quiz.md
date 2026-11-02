# Quiz: Generating, Building, and Installing the Code

Test your understanding of code generation, compiling, build and installer scripts, code signing, the README, version control, and the ScreenGrab case study with these review questions.

---

#### 1. What is a build script?

<div class="upper-alpha" markdown>
1. A document that lists the features the app must have
2. A short program that carries out every step needed to turn source code into a finished application, in a fixed order, with one command
3. A message the compiler prints when it finds an error
4. A copy of the app stored on a remote server
</div>

??? question "Show Answer"
    The correct answer is **B**. Without a build script a person must remember a dozen separate commands and run them correctly each time. With one, building is repeatable: the same command gives the same result on any machine with the toolchain. A script that begins with `set -e` stops at the first error rather than producing a broken result. Option A describes a specification, and option C describes a compiler error.

    **Concept Tested:** Build Script

    **See:** [Build Script](index.md#build-script)

---

#### 2. What is ad-hoc signing?

<div class="upper-alpha" markdown>
1. Signing an app with a paid developer identity so strangers can trust it
2. Leaving an app completely unsigned
3. Signing the README file
4. Code signing without an identity: the app carries a signature, but it names no developer and is not backed by a paid developer account
</div>

??? question "Show Answer"
    The correct answer is **D**. Ad-hoc signing satisfies the system's requirement that the code carry a signature. It is the right level for a personal tool you build and run on your own computers, and it costs nothing beyond the toolchain. It gives strangers no reason to trust the app, so a downloaded personal tool may need extra steps before the system will run it. Option A describes signing with a developer identity.

    **Concept Tested:** Ad-Hoc Signing

    **See:** [Ad-Hoc Signing](index.md#ad-hoc-signing)

---

#### 3. What is a Git commit?

<div class="upper-alpha" markdown>
1. A saved snapshot of the project at a moment in time, together with a message that says what changed and why
2. A command that sends changes to a remote server
3. A command that fetches changes from a remote server
4. A list of files Git should ignore
</div>

??? question "Show Answer"
    The correct answer is **A**. Commits are the steps of the history, and each can be inspected, compared with the one before, or returned to. A good message names the change and the reason, so "Add delayed capture" is useful and "update" is not. A commit should hold one logical change so it can be undone without disturbing anything else. Options B and C describe push and pull, and option D describes an ignore list.

    **Concept Tested:** Git Commit

    **See:** [Git Commit](index.md#git-commit)

---

#### 4. What is the purpose of install rollback?

<div class="upper-alpha" markdown>
1. To make the installer run faster
2. To remove the application permanently after use
3. To undo a failed or unwanted installation and restore the state before it began, such as bringing back an older working version
4. To hide the installer from the user
</div>

??? question "Show Answer"
    The correct answer is **C**. If an installer replaces a working older version and then fails halfway, a rollback restores the older version so the user is not left with nothing. The usual technique is to keep a backup of what is being replaced, install the new version, test that it starts, and only then discard the backup. Rollback matters most for a tool you depend on every day. Option B describes the uninstall process.

    **Concept Tested:** Install Rollback

    **See:** [Install Rollback](index.md#install-rollback)

---

#### 5. The build finishes with no compiler errors. What can you conclude?

<div class="upper-alpha" markdown>
1. The code is well-formed, but it can still do the wrong thing, so tests are still needed
2. The code is correct and ready to ship
3. The code has no hallucinations
4. The tool meets every acceptance criterion
</div>

??? question "Show Answer"
    The correct answer is **A**. A clean build says the code is well-formed, not that it is right. Compiler errors are a useful safety net because they catch problems before the program runs, but code that compiles can still behave incorrectly, as with a hotkey that never fires. Chapter 12 addresses that gap with tests. Options B, C, and D claim more than a clean build can show.

    **Concept Tested:** Compiler Errors

    **See:** [Compiling and Its Errors](index.md#compiling-and-its-errors)

---

#### 6. Why does version control matter even more when an AI agent changes the code?

<div class="upper-alpha" markdown>
1. Agents cannot write files without Git
2. Version control makes the agent faster
3. Agents never make mistakes
4. An agent can change many files at once and make mistakes confidently, so history lets you see exactly what changed and roll back
</div>

??? question "Show Answer"
    The correct answer is **D**. In the chapter's example, an agent adds a settings window that makes the app larger and slower and breaks the hotkey. With history you ask Git to show the changes since your last snapshot, see the dozens of lines you never asked for, and return to the earlier state with one command. This makes bold edits safe, and it applies the book's habit of leaving things out to code already written.

    **Concept Tested:** Version Control

    **See:** [Version Control](index.md#version-control)

---

#### 7. The compiler prints `CaptureController.swift:42:17: error: cannot find 'captureRegion' in scope`. What does this tell you?

<div class="upper-alpha" markdown>
1. The file CaptureController.swift does not exist
2. On line 42 of that file, the code uses a name the compiler cannot find, likely a misspelling or a name the agent assumed but never defined
3. The app has been successfully signed
4. The installer failed to copy the app
</div>

??? question "Show Answer"
    The correct answer is **B**. The message format gives the file name, then the line and column, then the word "error," then a plain description. A name that does not exist anywhere the compiler can see is most often a misspelling or a name the agent assumed, which is a form of the hallucination from Chapter 5. The agent usually reads such errors, edits the file, and builds again, so you need not understand each one.

    **Concept Tested:** Compiler Errors

    **See:** [Compiler Errors](index.md#compiler-errors)

---

#### 8. After you rebuild the app, a permission such as screen recording seems to vanish. What is the likely cause?

<div class="upper-alpha" markdown>
1. The README was edited
2. Git removed the permission during the commit
3. An ad-hoc signature is tied to the exact build, so rebuilding can change how the system recognizes the app and you may need to grant the permission again
4. The compiler deleted the privacy settings
</div>

??? question "Show Answer"
    The correct answer is **C**. The chapter notes that because an ad-hoc signature is tied to the exact build, a rebuild can change how the system recognizes the app. The practical result may be that screen recording must be granted again. This is a platform constraint of the kind Chapter 8 described. The other options attribute the change to tools that do not touch system privacy settings.

    **Concept Tested:** Ad-Hoc Signing

    **See:** [Ad-Hoc Signing](index.md#ad-hoc-signing)

---

#### 9. The author has three computers and builds the tool on one of them. What workflow does the chapter suggest for getting the same source onto the others?

<div class="upper-alpha" markdown>
1. Copy the files by hand each time
2. Push the commits to a remote copy such as GitHub, then pull on each other machine and run the installer script there
3. Rebuild the tool from scratch on each machine with a new prompt
4. Email the compiled app to each machine
</div>

??? question "Show Answer"
    The correct answer is **B**. Push sends commits to a remote repository for backup and sharing, and pull brings them down to another computer. The same installer script then builds the tool there. The chapter advises pulling before you push when working on several machines, so you start from the latest version. This is cheaper and clearer than copying files by hand and avoids regenerating the code.

    **Concept Tested:** Git Push and Pull

    **See:** [Git Push and Pull](index.md#git-push-and-pull)

---

#### 10. In the first install, the app code was about 2,000 lines out of about 5,200 total. What does this proportion suggest?

<div class="upper-alpha" markdown>
1. Software meant to be relied on carries substantial tests, scripts, and documents around the code, so the app code is less than half of the total
2. The agent wasted most of its effort
3. The tests were unnecessary
4. The project was poorly specified
</div>

??? question "Show Answer"
    The correct answer is **A**. The tests came to about 1,370 lines, the scripts about 500, and the specification, design, and README about 1,340. The chapter calls this proportion typical of software that is meant to be relied on. It also explains why the 1,340 lines of documents matter: they decided what the other 3,860 lines would be. Options B, C, and D misread the numbers.

    **Concept Tested:** ScreenGrab Case Study

    **See:** [The ScreenGrab Case Study](index.md#the-screengrab-case-study)
