# Quiz: Maintenance and Open Source Sharing

Test your understanding of technical debt, compatibility, patch releases, open source licenses, forks, pull requests, and stewardship with these review questions.

---

#### 1. What is a patch release?

<div class="upper-alpha" markdown>
1. A major version that adds many new features
2. A new product sold under a different name
3. A small new version that fixes a defect without adding features
4. A license change that removes source code access
</div>

??? question "Show Answer"
    The correct answer is **C**. Version numbers often follow the pattern major, minor, patch, and a bug fix moves the last number, for example from 1.0.0 to 1.0.1 (a hypothetical example). A patch release tells users that updating is low risk. For a personal tool it is also a record that lets you tell which build is installed on which computer.

    **Concept Tested:** Patch Releases

    **See:** [Patch Releases](index.md#patch-releases)

---

#### 2. What is a Creative Commons license designed for?

<div class="upper-alpha" markdown>
1. Creative works such as text, images, and music, not software code
2. Compiled applications only
3. Operating systems
4. Hardware designs only
</div>

??? question "Show Answer"
    The correct answer is **A**. Creative Commons licenses combine conditions: BY means credit the author, NC means non-commercial use only, and SA means share adaptations under the same license. This book's text is CC BY-NC-SA 4.0, while its code is MIT. A license with the NC condition restricts commercial use, so it is generally not considered open source. Use Creative Commons for writing and images, and an open source license for code.

    **Concept Tested:** Creative Commons License

    **See:** [Creative Commons Licenses](index.md#creative-commons-licenses)

---

#### 3. How does a permissive license differ from a copyleft license?

<div class="upper-alpha" markdown>
1. Permissive licenses forbid all reuse
2. Copyleft licenses allow reuse without any conditions
3. They are identical in every respect
4. A permissive license places very few conditions on reuse, while copyleft requires distributed changes to be released under the same license
</div>

??? question "Show Answer"
    The correct answer is **D**. Under a permissive license such as MIT, BSD, or Apache 2.0, others may use, change, and even sell your code, usually if they keep your copyright notice. Under a copyleft license such as the GNU General Public License, someone who distributes a changed version must release it under the same license. Neither is better in general, and the author's goal decides.

    **Concept Tested:** Permissive License

    **See:** [Permissive Licenses](index.md#permissive-licenses)

---

#### 4. How does open source change the cost of the work of building a tool?

<div class="upper-alpha" markdown>
1. It removes the cost of the work entirely
2. It does not remove the cost of the work, but lets many people share one copy of that cost
3. It makes the work more expensive for every user
4. It transfers all costs to the vendor
</div>

??? question "Show Answer"
    The correct answer is **B**. A reader who only installs the finished app pays $0 in money and the time to run the installer. A reader who wants changes pays the time to fork and edit. The author paid $14 in tokens, and sharing adds time to prepare and document the project. Open source does not mean free of support or effort, only free of permission barriers.

    **Concept Tested:** Open Source Software

    **See:** [Open Source Software](index.md#open-source-software)

---

#### 5. While preparing to make a repository public, you find a password that was deleted from the files in an earlier commit. What does the chapter say about this?

<div class="upper-alpha" markdown>
1. It is safe, because deleted content is gone forever
2. It is safe, because only the owner can read the history
3. It is dangerous, because a secret deleted in a later change is still in the history that anyone can read
4. It is only a problem for private repositories
</div>

??? question "Show Answer"
    The correct answer is **C**. The pre-publication checklist lists a LICENSE file, a README, no passwords, keys, tokens, or personal data in the files or the history, generic paths, and a build that runs on a clean machine from the instructions alone. The chapter calls the secrets item the dangerous one, because the full change history is published with a public repository.

    **Concept Tested:** Public Repositories

    **See:** [Public Repositories](index.md#public-repositories)

---

#### 6. A reader prefers Control-Option-S as the default shortcut and wants a version of ScreenGrab with that change. What does the chapter suggest?

<div class="upper-alpha" markdown>
1. Fork the repository, change the default in the copy, and build it, then offer the change back with a pull request if it would help everyone
2. Ask the author to rewrite the app
3. Edit the original repository directly without permission
4. Buy a commercial replacement
</div>

??? question "Show Answer"
    The correct answer is **A**. A fork is your own copy of someone else's repository under your own account, and it keeps its link to the original so you can sync later updates. Because the license is MIT, no permission is needed. The fork is then yours to maintain, and a pull request can propose the change back. Option C is not possible without write access, and a stranger's change should be reviewed anyway.

    **Concept Tested:** Forking

    **See:** [Forking](index.md#forking)

---

#### 7. The chapter's illustrative year of maintenance totals 4 hours of your time plus $28 in agent sessions. At $50 an hour, how does the yearly ownership cost compare with the $90 subscription it replaces?

<div class="upper-alpha" markdown>
1. It is far below the subscription at about $28
2. It is about equal at $90
3. It is $14 per year
4. It is about $228, higher than the subscription, because ownership cost is mostly your time
</div>

??? question "Show Answer"
    The correct answer is **D**. Four hours at $50 is $200, and adding $28 gives about $228 a year, more than the $90 in fees. The chapter calls the illustration deliberately unflattering: the hours are invented, and you should substitute your own time value. It shows that the token bill is the cheap part, and it motivates sharing the work, since open source spreads the maintenance across more people.

    **Concept Tested:** Maintenance Cost

    **See:** [Patch Releases](index.md#patch-releases)

---

#### 8. Why does ScreenGrab accumulate so little technical debt?

<div class="upper-alpha" markdown>
1. It was never tested
2. It has no third-party dependencies, separates pure logic from window code with tests, and isolates screen capture behind one type
3. It is updated hourly by a vendor
4. It relies on many outside libraries that update themselves
</div>

??? question "Show Answer"
    The correct answer is **B**. Technical debt is the future cost of a quick or incomplete solution, and like financial debt it accrues interest because every later change takes longer. ScreenGrab's design choices cost a little at design time and save more in maintenance. With no outside libraries there is nothing to fall behind, and a change in Apple's capture technology touches only one file.

    **Concept Tested:** Technical Debt

    **See:** [Technical Debt](index.md#technical-debt)

---

#### 9. Why must the Screen Recording permission often be granted again after rebuilding an ad-hoc signed app?

<div class="upper-alpha" markdown>
1. macOS ties the permission to the app's code signature, and an ad-hoc signed app gets a new identity whenever its code changes
2. Rebuilding deletes all system settings
3. The permission expires every hour
4. The compiler removes it
</div>

??? question "Show Answer"
    The correct answer is **A**. This is an operating system compatibility issue. The scripts accept a stable signing identity to avoid it. A second issue is outside the app's control: since macOS 15, the system periodically asks the user to re-confirm Screen Recording access for apps that capture the screen, so the README documents it. Options B, C, and D invent mechanisms that the chapter does not describe.

    **Concept Tested:** Operating System Compatibility

    **See:** [Operating System Compatibility](index.md#operating-system-compatibility)

---

#### 10. The author wants ScreenGrab to be a free tool with no strings, even if a company later embeds it in a commercial product. Which license choice best fits that goal?

<div class="upper-alpha" markdown>
1. A copyleft license, so the company must release its changes
2. A Creative Commons NC license, so commercial use is banned
3. A permissive license such as MIT, which allows commercial use if the notice is kept
4. No license, so nobody can copy it
</div>

??? question "Show Answer"
    The correct answer is **C**. The chapter's company example shows that under a permissive license it may embed the code if it keeps the copyright and license notice, while a copyleft license would force it to publish its changed source. ScreenGrab is meant to give people a free tool with no strings, and the MIT License fits that goal. Without any license, the law's default is that nobody except the author may copy or change the work.

    **Concept Tested:** Permissive License

    **See:** [Permissive Licenses](index.md#permissive-licenses)
