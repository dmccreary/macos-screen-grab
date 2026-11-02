# Quiz: Software Features and the Anatomy of Bloat

Test your understanding of software products, feature sets, release cycles, bloat, the job to be done, and resource footprint with these review questions.

---

#### 1. What is a software product, as the chapter defines it?

<div class="upper-alpha" markdown>
1. The compiled program that copies pixels from the display into an image
2. Software packaged with an installer, documentation, a license, a price, updates, and support
3. The complete collection of capabilities a program offers
4. A numbered snapshot of a program at one point in time
</div>

??? question "Show Answer"
    The correct answer is **B**. A software product is software plus everything a buyer needs to obtain and keep using it: installer, documentation, license, price, updates, and usually support. Option A describes the software alone. Option C describes a feature set, and option D describes a software version. Keeping these four terms separate explains why a confusing price usually comes from the product wrapped around the code.

    **Concept Tested:** Software Product

    **See:** [Software, Products, and Features](index.md#software-products-and-features)

---

#### 2. What is a software version?

<div class="upper-alpha" markdown>
1. A number or name that identifies one exact snapshot of a product that the vendor chose to publish
2. Any compiled copy that the vendor's automated tools produce during a day
3. The schedule on which a vendor releases new capability
4. The set of features that most users actually use
</div>

??? question "Show Answer"
    The correct answer is **A**. A version is a build the vendor chose to name and publish, such as 4.2 or 4.2.1. Option B describes a build, which users never see. Option C describes the software release cycle, which is the schedule that produces versions. Option D has no connection to versioning. Versions let people talk precisely, so a bug report that names the version is far more useful than "the new one."

    **Concept Tested:** Software Version

    **See:** [Versions and Release Cycles](index.md#versions-and-release-cycles)

---

#### 3. Which statement best describes feature creep?

<div class="upper-alpha" markdown>
1. A deliberate redesign that removes rarely used features
2. A sudden doubling of a product's price in a single release
3. The gradual, unplanned addition of features beyond a product's original purpose
4. The slow growth of a program's idle memory use over time
</div>

??? question "Show Answer"
    The correct answer is **C**. Feature creep is how a feature set grows: each addition looks small and reasonable, such as a delay, then arrows, then video, then cloud sharing, yet together they change what the product is. Option A is the opposite of creep. Option B describes price bloat, and option D describes resource bloat. Creep hides because no single step looks unreasonable.

    **Concept Tested:** Feature Creep

    **See:** [What Software Bloat Is](index.md#what-software-bloat-is)

---

#### 4. What does install size measure?

<div class="upper-alpha" markdown>
1. The memory a program uses while it is running but not doing anything for you
2. The number of features a program offers
3. The total time a program adds to your computer's startup
4. The disk space a program occupies once installed, including its supporting files
</div>

??? question "Show Answer"
    The correct answer is **D**. Install size is the disk space an installed program occupies, including supporting files. It is the easiest footprint figure to find and grows with every added feature, bundled library, and embedded asset. Option A describes idle resource use. Option B describes the size of the feature set, and option C describes startup time, which is a separate part of the resource footprint.

    **Concept Tested:** Install Size

    **See:** [Resource Footprint](index.md#resource-footprint)

---

#### 5. A video editor with 400 features is not bloated for a professional editor but is bloated for someone who wants to trim one clip. What does this show about bloat?

<div class="upper-alpha" markdown>
1. Bloat depends only on how many features a product has
2. Professional editors tolerate bloat better than casual users
3. Bloat is a gap between what a product contains and what a particular user needs
4. Bloat appears only in video software
</div>

??? question "Show Answer"
    The correct answer is **C**. The chapter defines bloat as growth beyond what most of a product's users need or use, which makes it a statement about a gap, measured against a job. The professional uses most of the 400 features, so the gap is small. The clip trimmer uses a handful, so the gap is large. Feature count alone (A) cannot decide the question, and the idea applies to any product category (D).

    **Concept Tested:** Software Bloat

    **See:** [What Software Bloat Is](index.md#what-software-bloat-is)

---

#### 6. Why does the chapter say idle resource use can matter more day to day than install size?

<div class="upper-alpha" markdown>
1. Install size is charged every minute the machine is on, while idle use is paid once
2. Idle use is charged continuously while the program runs in the background, whereas install size is a one-time storage cost
3. Idle use only affects disk space, which is always scarce
4. Install size cannot be measured, but idle use can
</div>

??? question "Show Answer"
    The correct answer is **B**. A helper that loads at login, checks for updates, and syncs a gallery keeps consuming memory, processor time, and battery whenever the computer is on. Install size is paid once, as storage. Option A reverses the two. Option C is wrong because idle use concerns memory, processor, and battery rather than disk. Option D is wrong because both can be read from system tools such as Activity Monitor and Finder's Get Info.

    **Concept Tested:** Idle Resource Use

    **See:** [Resource Footprint](index.md#resource-footprint)

---

#### 7. A product moves from version 4.3.0 to 5.0.0. What should a careful user do before upgrading?

<div class="upper-alpha" markdown>
1. Install it immediately, because only the third number signals bug fixes
2. Ignore the release, since first-number changes only affect the vendor
3. Wait for 5.0.1, because 5.0.0 never contains fixes
4. Check what changed and what it costs, because a first-part change signals a major release and possibly a new price
</div>

??? question "Show Answer"
    The correct answer is **D**. By convention, a change in the first part of a version number signals large changes, and vendors often attach a new price to a major release. Reading the release notes tells you whether the new capability is worth the cost to your job. Option A confuses major and patch releases. Options B and C make claims the chapter does not support. Because vendors follow the convention loosely, treat the number as a hint, not a guarantee.

    **Concept Tested:** Software Version

    **See:** [Versions and Release Cycles](index.md#versions-and-release-cycles)

---

#### 8. Why do vendors sell products and licenses rather than just the instructions themselves?

<div class="upper-alpha" markdown>
1. Instructions cannot legally be sold
2. Copying software costs almost nothing, so price is set by what customers will accept and the cost sits in writing and maintaining it once
3. Every copy of software requires a separate custom build
4. Customers always prefer to buy support rather than software
</div>

??? question "Show Answer"
    The correct answer is **B**. Software's millionth copy costs nearly the same as its second, so the real cost is writing, testing, and maintaining the instructions once. A vendor therefore sells the packaging and the promise, and sets a price based on what customers will accept rather than on copy cost. Option A is false, and option C contradicts the near-zero copying cost. Option D invents a customer preference the chapter never claims.

    **Concept Tested:** Software Product

    **See:** [Software, Products, and Features](index.md#software-products-and-features)

---

#### 9. In the chapter's illustrative comparison, install size differs by 80 times, idle memory by 15 times, and helper processes by 3 times. What best explains why install size differs most?

<div class="upper-alpha" markdown>
1. Both programs must keep a helper running to catch the hotkey, so running costs cannot differ at all
2. Idle memory is always about one fifth of install size
3. Storage holds every feature whether it is used or not, while running costs include a minimum both programs must pay
4. Single-purpose utilities never install any supporting files
</div>

??? question "Show Answer"
    The correct answer is **C**. Install size grows with every feature, library, and asset stored, used or not. Idle memory and helper count have a floor, because both programs need something running to catch the hotkey, so the gap is smaller. Option A overstates the point, since the numbers do differ. Options B and D are not supported by the chapter. The numbers are illustrative, not measurements of real products.

    **Concept Tested:** Resource Footprint

    **See:** [Resource Footprint](index.md#resource-footprint)

---

#### 10. Using the author's job of grabbing a region, optionally after a delay, to the clipboard, which feature fails the test "would removing it stop the job from getting done?"

<div class="upper-alpha" markdown>
1. The video recorder, because removing it would change nothing about the job
2. The delayed grab, because menus that vanish on click can only be captured on a timer
3. The region grab, because it is the core capability
4. The clipboard copy, because it delivers the outcome
</div>

??? question "Show Answer"
    The correct answer is **A**. The test asks whether removing a feature stops the job. Removing delayed grab matters because transient menus and tooltips need a timer, and removing the region grab or clipboard copy would end the job outright. Removing the video recorder changes nothing, so it serves other people's jobs and is a bloat candidate. The test turns a vague feeling of bloat into a specific, checkable judgment.

    **Concept Tested:** Job To Be Done

    **See:** [The Job To Be Done](index.md#the-job-to-be-done)
