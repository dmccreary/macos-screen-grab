---
title: "Software Features and the Anatomy of Bloat"
description: "Defines software, products, features, versions, bloat and feature creep, and the resource footprint of bloated tools against single-purpose utilities."
generated_by: claude skill chapter-content-generator
date: "2026-11-01 20:08:43"
version: 1.11
---

# Software Features and the Anatomy of Bloat

## Summary

This chapter builds the vocabulary for the whole book: what a software product is, how features accumulate into a feature set, and how versions and release cycles keep adding to it. It then defines software bloat and feature creep, measures their footprint in install size and idle resource use, and contrasts them with the single-purpose utility that does one job to be done. After this chapter, you will be able to define software bloat and recognize its symptoms in a tool you use.

## Concepts Covered

This chapter covers the following 16 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Software | 1095 |
| Software Product | 593 |
| Software Feature | 279 |
| Feature Set | 135 |
| Software Version | 104 |
| Software Release Cycle | 59 |
| Software Bloat | 48 |
| Feature Creep | 4 |
| Bloatware | 1 |
| Job To Be Done | 185 |
| Single-Purpose Utility | 43 |
| Unix Philosophy | 1 |
| Resource Footprint | 44 |
| Install Size | 1 |
| Idle Resource Use | 1 |
| Upgrade Treadmill | 1 |

## Prerequisites

This chapter assumes only the prerequisites listed in the [course description](../../course-description.md).

---

!!! mascot-welcome "Hi, I'm Pinch"
    ![Pinch waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    I'm Pinch, a hermit crab who is frugal, curious, and a little suspicious of anything heavy that I'm asked to carry. Here is the whole job description, in the order you'll meet me in each chapter:

    1. Welcome: I tell you why the chapter is worth your time.
    2. Think: I mark an idea that should change how you reason about software.
    3. Tip: I hand you a shortcut you can use today.
    4. Warn: I flag a trap and show you the way out.
    5. Encourage: I admit that a passage is hard and suggest a way through.
    6. Celebrate: I name exactly what you just learned.

    If I'm not doing one of those six things, I'm not in the chapter. By the end of this one you'll be able to spot software bloat in a tool you pay for. Grab only what you need!

## Software, Products, and Features

Every program on your computer began as text that a person, or lately an AI agent, wrote and a machine can follow. That is the plainest definition of **software**: a set of instructions that tells a computer what to do. A screen grab utility is software. So is the operating system it runs on, the web browser beside it, and the firmware in your keyboard.

Software on its own is not something you buy. You buy a **software product**: software packaged with everything needed to obtain and keep using it, namely an installer, documentation, a license, a price, updates, and usually someone to call when it breaks. The same instructions can be sold as several products, and one product can bundle many separate programs. This distinction matters for the rest of the book, because most of what you pay for is the packaging and the promise, not the instructions themselves.

The book's running example makes the difference concrete. The author owns a screen grab utility that cost $9 and ran on every one of the author's computers. The *software* is the compiled program that copies pixels from the display into an image. The *product* is that program plus the installer, the license that lets three computers run it, the update service, and the vendor's support page.

Software comes in layers, and it helps to know which layer you are looking at. Firmware lives in a device and starts it up. The operating system manages the hardware and runs other programs. Applications, such as a screen grab utility, sit on top and do work for a person. A developer writes software as human-readable *source code* and a tool translates it into the *compiled* form that the computer runs. When you install an application, you receive the compiled form. When the application is open source, you can also read the source.

Software has one economic property that shapes everything in this book: copying it costs almost nothing. A carpenter's second chair costs nearly as much as the first. A programmer's millionth copy costs nearly the same as the second. All of the cost sits in writing, testing, and maintaining the instructions once. That is why vendors sell *products* and *licenses* rather than the instructions themselves, and why a price can be set by what customers will accept instead of by what the copy cost to make.

The generated utility described later in this book gives a sense of scale. At first install it was about 2,000 lines of Swift in 19 files, with no third-party dependencies. A line count is a crude measure, but it shows that a tool that does its job completely can be small enough for one person to read in an afternoon.

The packaging around the software is where products differ. The table below separates what a buyer pays for into parts. Each row is something the buyer receives or is promised, and only the first row is the software.

| Part of a software product | What the buyer receives | Present in a free script? |
|---|---|---|
| The software | Instructions the computer can run | Yes |
| The installer | A way to put the software in place and remove it | Sometimes |
| Documentation | Guides, help pages, and tutorials | Sometimes |
| The license | Permission to use the software under stated terms | Yes, implicitly or explicitly |
| Updates | New versions that fix problems or add capability | Rarely |
| Support | A person or service to ask when it breaks | Rarely |

The same software can appear as several products. A vendor might sell a "standard" and a "professional" edition built from one code base, with a different set of unlocked features and a different price. Equally, one product can bundle several programs, as an office suite does. The questions "what software is this?" and "what product am I buying?" have different answers, and a confusing price usually comes from the second.

Inside a product, the things a user can do are its **software features**. A feature is one distinct capability that serves a purpose a user can name. "Grab a rectangular region of the screen" is a feature. "Grab the same region after a five-second delay" is another. "Add an arrow to a captured image" is a third. Notice that each is described by what the user gets, not by how the code works. The complete collection of capabilities a product offers is its **feature set**. When a vendor says a product has "over 100 features," they are describing the size of the feature set.

Deciding what counts as one feature takes judgment. A feature should be something a user can name, notice, and in principle do without. "Grab a region" passes that test. "Uses a faster image buffer" does not, because the user cannot tell and would not miss it if it were gone. A feature is also different from a *setting*: choosing the image format is a setting of the grab feature, not a feature of its own. Vendors who count generously, with every setting and menu item as a feature, produce impressive numbers on a box. Counting strictly, as a user would, produces smaller ones.

The following table lists a feature set for the kind of screen grab utility used as the running example. The features are generic to the category and illustrative of the way a product accumulates them; they describe no particular vendor's product.

| Feature | Group | Minimal utility | After several releases |
|---|---|---|---|
| Grab a rectangular region | Capture | Yes | Yes |
| Grab after a delay | Capture | Yes | Yes |
| Grab a whole window | Capture | No | Yes |
| Scrolling capture of a long page | Capture | No | Yes |
| Draw arrows and boxes on an image | Edit | No | Yes |
| Blur a region | Edit | No | Yes |
| Record the screen as video | Record | No | Yes |
| Extract text from an image | Analyze | No | Yes |
| Upload to a cloud gallery | Share | No | Yes |
| Team libraries and comments | Share | No | Yes |

A feature set has *breadth*, the number of distinct things it can do, and *depth*, how fully it handles each one. Bloat is nearly always a growth in breadth. A tool with a deep grab feature and nothing else is a different kind of product from one with a shallow version of forty features. It is also useful to separate the *core* of a feature set, the features that serve the product's original job, from its *periphery*, the features added later. In the table, the first two rows are the core, and the remaining eight are the periphery.

The distinction predicts who benefits from growth. Core features are used by nearly everyone who bought the product for that job. Peripheral features are each used by a minority, and different minorities use different ones. Each peripheral feature is valuable to somebody, and that is exactly why it was added. The cost lands on the people who use none of them.

Before looking at the diagram below, here are the relationships it shows. A product contains software and wraps it in a license, installer, and support. A feature set is made of features. A product ships as numbered versions, and a release cycle decides when the next version appears. Those last two terms come in the next section; you can click any node to see its definition and check yourself with the six matching questions.

#### Diagram: Software Vocabulary Concept Map

<iframe src="../../sims/bloat-software-concept-map/main.html" height="804px" width="100%" scrolling="no"></iframe>

[Run the Software Vocabulary Concept Map MicroSim Fullscreen](../../sims/bloat-software-concept-map/main.html){ .md-button .md-button--primary }

<details markdown="1">
<summary>Software Vocabulary Concept Map</summary>
Type: graph-model
**sim-id:** bloat-software-concept-map<br/>
**Library:** vis-network<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/computer-science/tree/main/docs/sims/oop-benefits-concept-map<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** classify<br/>
**Learning Objective:** The learner will classify six described examples under the correct term among software, software product, software feature, feature set, software version, and software release cycle, scoring at least 5 of 6 on the first attempt.

**Prerequisites:** software, software product, software feature, feature set, software version, software release cycle (each defined in the chapter sections "Software, Products, and Features" and "Versions and Release Cycles").

**Evidence of Mastery:** In the matching quiz, the learner picks one of the six terms for each of 6 described examples. An answer is correct when it equals the Correct term column in Content. Mastery is 5 of 6 correct on the first attempt. Clicking nodes to read definitions is exploration and is not scored.

**Misconceptions:** (1) Software and software product are the same thing. (2) A feature set is the same as a feature. (3) A version is the same as a release cycle.

**Instructional Rationale:** Classifying a concrete example under an abstract term makes the learner apply the definition instead of recalling its wording, which is the Understand-level behavior. The concept map gives the learner the relationships to reason from.

**Content:**

The map has eight nodes. Clicking a node opens its definition.

| Node | Definition shown on click |
|---|---|
| Software | A set of instructions that tells a computer what to do. |
| Software Product | Software packaged with an installer, documentation, a license, a price, updates, and support. |
| Software Feature | One distinct capability of a product that serves a purpose a user can name. |
| Feature Set | The complete collection of features a product offers. |
| Software Version | A numbered snapshot of a product at one point in time. |
| Software Release Cycle | The schedule on which a vendor publishes new versions. |
| Software Bloat | Growth of a feature set beyond what most users need or use. |
| Single-Purpose Utility | A small tool built to do one job and little else. |

The edges, shown with their labels, are:

| From | Label | To |
|---|---|---|
| Software Product | packages | Software |
| Software Feature | is one part of | Feature Set |
| Feature Set | belongs to | Software Product |
| Software Version | is a snapshot of | Software Product |
| Software Release Cycle | schedules | Software Version |
| Software Bloat | is what an oversized | Feature Set |
| Single-Purpose Utility | keeps a small | Feature Set |

The matching quiz has 6 items in this fixed order. The answer bank is the six terms software, software product, software feature, feature set, software version, and software release cycle.

| # | Description shown | Correct term | Why (shown as feedback) |
|---|---|---|---|
| 1 | The Swift source files that make up a screen grab app | software | They are instructions for the computer, with no license, price, or support around them. |
| 2 | The app, its installer, its license for three computers, and its update service sold under one name | software product | Software becomes a product when it is packaged with the means to obtain and keep using it. |
| 3 | Grabbing a region of the screen and copying it to the clipboard | software feature | It is one capability a user can name. |
| 4 | All 40 commands in a hypothetical editor's menus, taken together | feature set | It is the complete collection of capabilities, not a single one. |
| 5 | Release 4.2 as published in March | software version | It is a numbered snapshot of the product at one moment. |
| 6 | A new paid release published every fall | software release cycle | It describes the schedule on which versions appear, not any one version. |

**Provenance:** Node definitions come from the chapter sections above. Quiz items 1, 2, 3 and 5 follow the chapter's screen grab example; items 4 and 6 are illustrative and the sim labels them illustrative.

**Rules:** Each quiz item is answered once. An answer is correct when it equals the Correct term for that item. The score is the count of correct answers out of 6. Mastery is a score of at least 5 on the first attempt through the quiz.

**Learner Activity:**

1. The learner clicks any node to read its definition and sees which nodes it connects to.
2. The learner starts the matching quiz and reads item 1.
3. The learner chooses one of the six terms and sees the feedback at once.
4. The learner continues through items 2 to 6 and sees the final score.

**Feedback:** Six items in fixed order, one attempt each. A correct answer shows "Correct" and the Why text. An incorrect answer shows the Why text for that item and highlights the correct node on the map. The score "n of 6" is shown after the last item, with the message "Mastery reached" when n >= 5.

**Starting State:** The map is shown with no node selected and the quiz not started. The prompt reads "Click a node to see what it means, then test yourself."

**Chapter Anchors:** The chapter states that the author's screen grab utility cost $9, that three computers share one license, that a feature set is the complete collection of a product's capabilities, and that the map has six quiz items.
</details>

!!! mascot-thinking "Software is cheap to copy"
    ![Pinch thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Think of it like a recipe: once it is written, every extra copy costs almost nothing. So what a vendor charges for is not the instructions, it is the product around them. Keep that in mind whenever a price changes.

A worked example shows how the terms separate. Suppose a utility starts with two features: grab a region, and grab a region after a delay. Its feature set has two items. The vendor adds "annotate with arrows," "record a video," "scan text from an image," and "share to a cloud gallery." The feature set now has six items, the *software* has grown, and the *product* has acquired a cloud account, a larger installer, and a longer support page. None of the original two features changed, yet the thing a customer buys is now quite different.

## Versions and Release Cycles

A product does not stay still. Each time a vendor publishes a changed copy, it assigns a **software version**, a number or name that identifies that exact snapshot of the product. Version numbers usually have two or three parts, such as 4.2 or 4.2.1. By convention, a change in the first part signals a major release with significant new capability, a change in the second signals a smaller set of additions, and a change in the third signals fixes only. Vendors follow that convention loosely, so treat the number as a hint rather than a guarantee.

A worked example of reading a version number: suppose a product moves from 4.2.0 to 4.2.1, then to 4.3.0, then to 5.0.0. The first step changes only the third part, so it should contain fixes and no new capability. The second step changes the second part, so it should add something modest. The third changes the first part, so it signals a major release, and often one that costs money. A reader who sees 5.0.0 should therefore expect larger changes than 4.2.1 and should read the release notes before upgrading.

| Change | Example | What it usually signals | What a careful user does |
|---|---|---|---|
| Third part (patch) | 4.2.0 to 4.2.1 | Bug and security fixes | Install promptly |
| Second part (minor) | 4.2.1 to 4.3.0 | New features, same design | Read the notes, then install |
| First part (major) | 4.3.0 to 5.0.0 | Large changes, possibly a new price | Check what changed and what it costs |

Do not confuse a version with a *build*. A build is one particular compiled copy, which may be produced many times a day by the vendor's automated tools. A version is a build the vendor chose to name and publish. Users only ever see versions.

Versions exist so that people can talk precisely. A bug report that says "the delayed grab fails in 4.2" is useful. One that says "it fails in the new one" is not. Versions also let a vendor sell the same product more than once, a point that Chapter 3 returns to when it covers upgrade revenue.

The **software release cycle** is the schedule on which a vendor publishes new versions. Some vendors publish a new major version every year, some every few months, and some update continuously with no visible numbers at all. The cycle shapes what the customer experiences. A slow cycle gives users time to learn and a stable tool. A fast cycle gives the vendor a steady reason to announce something new, whether or not users asked for it.

Release cycles differ in rhythm and in what they reward. The table lists four common patterns and the pressure each puts on a vendor and a user.

| Release cycle | Typical rhythm | Pressure on the vendor | Experience for the user |
|---|---|---|---|
| Annual major release | One big version a year | Must announce enough new capability to justify a new purchase | Large, occasional changes, sometimes with a new price |
| Quarterly updates | Four versions a year | Needs regular, visible additions | Frequent small changes to learn |
| Rolling release | Changes appear when ready | Must keep the product feeling alive | Changes without clear version names |
| Continuous delivery | Many tiny changes a day | Releases are cheap, so change is constant | The product shifts under the user without warning |

The pattern a vendor follows is connected to how it is paid. A vendor paid once per major version needs each release to look worth buying. A vendor paid every year needs the product to look worth renewing every year. Chapter 3 follows that thread.

Consider an illustrative product that follows an annual cycle. Version 1 ships with 6 features. Each later annual version adds 4 more. After ten versions, the product has 42 features. The numbers here are illustrative, not measurements of any real product, but the arithmetic shows the pattern: a modest, steady addition per release becomes a feature set seven times larger than the original.

| Version | Illustrative features in feature set |
|---|---|
| 1 | 6 |
| 2 | 10 |
| 5 | 22 |
| 10 | 42 |

Now consider what a single user needs across those ten versions. If the author needs only two of the features, a grab and a delayed grab, then every version after the first delivers the same value to that user while the product grows around them. The explorer below lets you pick a version and a kind of user, and then calculate how much of the product that user actually touches.

#### Diagram: Feature Growth and Usage Explorer

<iframe src="../../sims/bloat-feature-growth-explorer/main.html" height="603px" width="100%" scrolling="no"></iframe>

[Run the Feature Growth and Usage Explorer MicroSim Fullscreen](../../sims/bloat-feature-growth-explorer/main.html){ .md-button .md-button--primary }

<details markdown="1">
<summary>Feature Growth and Usage Explorer</summary>
Type: microsim
**sim-id:** bloat-feature-growth-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the percentage of an illustrative product's features that a given user never uses, for a given version, to within 1 percentage point.

**Prerequisites:** software feature, feature set, software version, software release cycle (defined in the chapter sections above).

**Evidence of Mastery:** For 3 challenge cases, the learner enters the unused percentage as a whole number before the sim reveals it. An entry is correct when it is within +/- 1 of the Model value in Content. Mastery is 3 of 3 correct. Moving the version control and choosing a user type is exploration and is not scored.

**Misconceptions:** (1) A product that adds features gives every user more value. (2) The share of unused features stays the same as the product grows.

**Instructional Rationale:** Calculating before seeing the answer makes the learner apply the formula to new inputs. Free exploration afterward shows the share of unused features climbing with every version.

**Content:**

All values are illustrative and the sim labels them illustrative.

The number of features in version v is F(v) = 6 + 4 x (v - 1).

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Version v | 1 | 10 | 1 | 1 | version number |

There are three user types. Each has a count of features they want to use.

| User type | Features wanted |
|---|---|
| Author (grab and delayed grab only) | 2 |
| Casual user | 4 |
| Power user | 18 |

A user uses the smaller of the features wanted and F(v).

| # | User type | Version | F(v) | Features used | Model value: unused % | Feedback when wrong |
|---|---|---|---|---|---|---|
| 1 | Author | 10 | 42 | 2 | 95 | Unused = (42 - 2) / 42 = 0.952, which is 95%. |
| 2 | Casual user | 10 | 42 | 4 | 90 | Unused = (42 - 4) / 42 = 0.905, which is 90%. |
| 3 | Power user | 5 | 22 | 18 | 18 | Unused = (22 - 18) / 22 = 0.182, which is 18%. |

**Provenance:** Illustrative numbers invented for this chapter; no real product is measured. The Author row echoes the book's case in which the author needs two features.

**Rules:** Used(v) = min(wanted, F(v)). Unused percentage = 100 x (F(v) - Used(v)) / F(v), rounded to the nearest whole number. Rounding uses half up. When F(v) equals Used(v), unused is 0.

**Learner Activity:**

1. The learner moves the version control and chooses a user type, and sees the number of features, the number used, and the used and unused shares update.
2. The learner starts the challenges. For each, the sim shows the user type and version, and the learner enters the unused percentage.
3. The learner presses Check and sees the Model value next to their entry.
4. After the third challenge, the learner returns to free exploration and should notice that the Author's unused share rises with every version while the Power user's rises more slowly.

**Feedback:** Three challenges, fixed order, two attempts each. Correct: "Correct: <value>% of features unused." Incorrect on the first attempt: the Feedback when wrong text without the final number. After the second wrong attempt the Model value is revealed and the challenge counts as missed. A count "Correct: n of 3" is shown.

**Starting State:** Version 1, Author selected, showing 6 features, 2 used, 67% unused. The question on screen is "How much of this product do you use?"

**Chapter Anchors:** The chapter states that F(v) is 6 at version 1, adds 4 per version, and reaches 42 at version 10; that the author needs 2 features; and that the numbers are illustrative.
</details>

## What Software Bloat Is

**Software bloat** is the growth of a product's feature set, code size, and resource demands beyond what most of its users need or use. The word "bloat" carries a judgment, so it helps to be precise about what makes growth bloat rather than healthy improvement. Growth is healthy when it solves a problem that many users actually have. It is bloat when the added capability serves few users yet is carried, installed, updated, loaded, and paid for by everyone.

Bloat is therefore a statement about the *gap* between what a product contains and what a given user needs. A video editor with 400 features is not bloated for a professional editor who uses most of them. The same editor is bloated for someone who wants to trim one clip. Bloat is relative to a job, which is why the next section introduces the job to be done as the measuring stick.

The book's central case shows the pattern. The author's screen grab utility cost $9 and did its job well. Over the years it gained many more features, and it now costs $30 per year for each computer. The author uses a grab and a delayed grab. Product-analytics research by Pendo found that about 80% of the features in a typical software product are rarely or never used, a figure Chapter 2 examines closely. For the author the share is even higher: 2 features out of dozens. Everything else is bloat from that user's point of view, and the user pays for all of it.

!!! mascot-thinking "Bloat is about the gap"
    ![Pinch thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    The same product can be bloated for me and just right for you. Before you call a tool bloated, ask: bloated compared to which job?

Bloat takes several forms, and a product can suffer from some and not others. The table separates them so that a vague complaint like "it feels bloated" can be turned into a specific one.

| Form of bloat | What grows | How a user notices it |
|---|---|---|
| Feature bloat | The feature set | Menus and toolbars full of commands never used |
| Code bloat | The size of the program and its libraries | Large downloads and long installs |
| Resource bloat | Memory, processor, and battery use | A slow computer and a fan that spins up |
| Price bloat | The cost of the product | A bill that rises faster than the value received |
| Process bloat | Accounts, sign-ins, and prompts | Having to log in to use a tool that never needed it |

Of the five, price bloat is the one this book follows most closely, because it is the one a user can calculate. Chapters 3 and 4 turn it into arithmetic.

Two related terms describe how bloat arrives and what it produces. **Feature creep** is the gradual, unplanned addition of features beyond a product's original purpose. The word "creep" is apt: no single addition looks unreasonable. Each is a small request from a few customers, a feature a competitor just announced, or an idea from a meeting. Taken one at a time, each is easy to justify. Taken together over ten releases, they produce a product its first customers would barely recognize.

A worked example shows the mechanism. A screen grab tool begins as "grab a region." A user asks for a delay, which is reasonable. Another asks for arrows on the image, also reasonable. A third wants to record video, and since the tool already captures pixels, that seems close enough. A fourth asks for cloud sharing, and now the tool needs accounts, servers, and a privacy policy. At every step the team said yes to something small. After the fourth step, the product is half an image editor, half a video recorder, and half a cloud service, and no one ever decided that it should be.

!!! mascot-warning "Watch for the 'just one more' step"
    ![Pinch warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Feature creep hides because each step looks small. Write the product's one-sentence purpose down first, and test every proposed addition against it: if the sentence has to change, say so out loud.

**Bloatware** is software that has become noticeably bloated, or software bundled onto a device that most users never asked for and cannot easily remove. In everyday use, it names the symptom, a product so large and slow that the size is the main thing people notice. Chapters later in this book use "bloat" for the growth itself and "bloatware" for the resulting product.

## The Job To Be Done

A **job to be done** is the specific task a person hires a product to accomplish. The phrase comes from product design, where it replaces the question "what features does this product have?" with "what is the customer actually trying to get done?" A person who buys a drill does not want a drill; they want a hole. Someone who installs a screen grab utility wants an image of part of the screen, in the clipboard, so that it can be pasted into a message.

The idea is useful here because it gives bloat a measuring stick. Features that serve the job are signal. Features that serve other jobs, or no job, are the candidates for bloat. Writing the job down in a single sentence also makes a requirements document short, a point that returns in Chapter 7 when you specify a tool to be generated.

Consider three people and one product. A support engineer's job is "capture an error dialog and paste it into a ticket within seconds." A trainer's job is "produce a polished tutorial with arrows, numbered steps, and a video." A casual user's job is "send my friend a picture of this recipe." All three open the same utility, but they hire it for different jobs, and a feature set built for the trainer is mostly dead weight for the other two.

| Person | Job to be done | Features that serve the job | Features that do not |
|---|---|---|---|
| Support engineer | Capture an error dialog and paste it into a ticket | Grab a region, copy to clipboard | Video recording, cloud gallery |
| Trainer | Produce a polished tutorial | Annotations, step numbers, video | Little of the feature set is unused |
| Casual user | Send a picture of a recipe | Grab a region | Nearly everything else |
| Author (this book) | Grab a region, optionally after a delay, to the clipboard | Grab, delayed grab | Everything else |

A job statement works best in a fixed form: "When [situation], I want to [action], so I can [outcome]." Take the author's job: "When I need to show someone what is on my screen, I want to grab a region and have it on the clipboard, so I can paste it into a message." Each part carries information. The situation tells you when the tool is used, the action tells you the minimum behavior, and the outcome tells you how to judge success. Notice that nothing in the statement mentions annotation, video, or a cloud account. Those are answers to other people's jobs.

A job statement also gives you a quick test for any proposed feature. Ask whether removing the feature would stop the job from getting done. For the author's job, removing delayed grab would matter, because a menu or a tooltip that disappears when you click away can only be captured on a timer. Removing the video recorder would change nothing at all.

A **single-purpose utility** is a small tool built to do one job well and little else. It is the opposite end of the spectrum from bloat: its feature set is small by design, and each feature serves the one job. Plenty of such tools are famous for it, and the Unix command-line tools are the classic case. The **Unix philosophy** is the design guideline, associated with the early Unix developers, that each program should do one thing well and that programs should be easy to combine. A single-purpose utility is that philosophy applied to a graphical tool.

The table compares the two approaches on the qualities a user feels. Neither column is always the better choice; the point is to see what each one trades.

| Quality | Single-purpose utility | Large multi-purpose product |
|---|---|---|
| Time to learn | Minutes | Hours to weeks |
| Fit for a user's one job | Exact, if the job matches | Covered among many other jobs |
| Coverage of different jobs | Narrow | Broad |
| Install size and idle use | Small | Large |
| Effort to inspect or verify | Low, because there is less to read | High |
| Ongoing change | Slow; few reasons to update | Constant; many reasons to update |

The trade-off is real. A single-purpose utility will never cover every need, and a user with five jobs may need five tools. The benefit is that each tool is small, fast to learn, easy to inspect, and cheap to maintain. Generative AI changes the calculation, as later chapters explain, because it makes it cheap to produce the one small tool that fits your exact job.

!!! mascot-tip "Write your job in one sentence"
    ![Pinch giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Before you evaluate any tool, finish this sentence: "I need to ___ so that I can ___." If you need more than one sentence, you probably have more than one job.

## Resource Footprint

Bloat shows up on your computer as well as on the price tag. A program's **resource footprint** is the total amount of computer resources it consumes: disk space to store it, memory to run it, processor time, battery, network traffic, and the startup time it adds to your day. Footprint is measurable, which makes it the most objective evidence of bloat. A feature set is an opinion about what a product does, but a footprint is a number you can read from your system's monitor.

Two parts of the footprint deserve their own names. **Install size** is the amount of disk space a program occupies once installed, including its supporting files. It is the easiest figure to find, and it grows with every added feature, bundled library, and embedded asset. **Idle resource use** is the memory, processor time, and battery a program consumes while it is running but not doing anything for you. A utility you open for ten seconds a day, yet which keeps a helper process running all day to watch for a hotkey, has idle use that dwarfs its active use.

Idle use is where bloat becomes a tax on everything else you do. A small helper that loads at login, checks for updates, syncs a gallery, and reports usage statistics may use little at any moment, but it never stops. Multiply by every such program on the machine, and the computer slows for reasons no single program explains.

The **upgrade treadmill** is the cycle in which each new version demands a larger footprint and more learning, which pushes users to upgrade their hardware, their skills, or their payments just to stay where they were. The treadmill is the combination of two pressures already named: a fast release cycle supplies the new versions, and feature creep makes each one heavier. Users run harder, with new hardware, new training, and new fees, to remain in the same place.

You can see footprint without special tools. On a Mac, Activity Monitor lists every running process with its memory and processor use, and the Finder's Get Info window shows an application's size on disk. A useful habit is to open Activity Monitor, sort by memory, and ask of each entry near the top: did I open this today, and does it do something I need right now? Anything you cannot answer yes to is idle use you are paying for in battery life and speed.

A worked example compares two illustrative programs that both do the author's job. The numbers below are invented to show the shape of the comparison and are labeled illustrative. They are not measurements of any real product.

| Measure | Full-featured product (illustrative) | Single-purpose utility (illustrative) | Ratio |
|---|---|---|---|
| Install size | 1,200 MB | 15 MB | 80 times |
| Idle memory | 450 MB | 30 MB | 15 times |
| Background helper processes | 3 | 1 | 3 times |

Looking at that table, a reader might guess that every measure differs by the same factor. It doesn't. Install size differs most, because storage holds every unused feature. Idle memory differs less, because both programs must keep something running to catch the hotkey. The helper count differs least. Each measure answers a different question, and a fair comparison reports all of them.

!!! mascot-thinking "A footprint is a bill you pay every day"
    ![Pinch thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Install size is a one-time cost, but idle use is charged every minute the machine is on. Which of the programs on your computer are running right now, and which of them did you open today?

Use the comparison chart below to see the three measures side by side and to test your intuition about which ratio is largest before the numbers are revealed.

#### Diagram: Resource Footprint Comparison

<iframe src="../../sims/bloat-footprint-comparison/main.html" height="716px" width="100%" scrolling="no"></iframe>

[Run the Resource Footprint Comparison MicroSim Fullscreen](../../sims/bloat-footprint-comparison/main.html){ .md-button .md-button--primary }

<details markdown="1">
<summary>Resource Footprint Comparison</summary>
Type: chart
**sim-id:** bloat-footprint-comparison<br/>
**Library:** Chart.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** compare<br/>
**Learning Objective:** The learner will compare the resource footprint of an illustrative full-featured product and an illustrative single-purpose utility on three measures, correctly ranking which measure differs most between them.

**Prerequisites:** resource footprint, install size, idle resource use, single-purpose utility (defined in the chapter section "Resource Footprint" above).

**Evidence of Mastery:** Before the values are revealed, the learner ranks the three measures from the largest to the smallest ratio between the two programs. The ranking is correct when it equals install size, idle memory, background helper processes. Mastery is a correct ranking in one attempt. Hovering bars after the reveal is exploration.

**Misconceptions:** (1) A smaller program is smaller by the same factor on every measure. (2) Install size is the only footprint that matters.

**Instructional Rationale:** Predicting a ranking before the reveal forces the learner to reason about why storage differs more than running cost, which is comparison rather than reading numbers off a chart.

**Content:**

All values are illustrative and the sim labels them illustrative.

| Measure | Unit | Full-featured product | Single-purpose utility | Ratio | Why the ratio is what it is (shown on hover) |
|---|---|---|---|---|---|
| Install size | MB | 1200 | 15 | 80 | Storage holds every feature, used or not. |
| Idle memory | MB | 450 | 30 | 15 | Both programs must keep something running to catch a hotkey, so the gap is smaller than for storage. |
| Background helper processes | count | 3 | 1 | 3 | Both need one helper for the hotkey. The full product adds an update checker and a sync agent. |

Ratio = full-featured value divided by single-purpose value.

**Provenance:** Illustrative numbers invented for this chapter. They are not measurements of any real product.

**Rules:** The ratio for each measure is the full-featured value divided by the utility value. Measures are ranked from the largest ratio to the smallest. Ties, if the values were changed, keep the table order.

**Learner Activity:**

1. The learner sees the three measure names with the values hidden and orders them from largest to smallest ratio.
2. The learner presses Reveal and sees the grouped bars and the ratios.
3. The learner hovers over a bar and reads the Why text for that measure.
4. The learner should notice that the largest ratio belongs to the measure that costs the user the least each day.

**Feedback:** One attempt at the ranking. Correct: "Correct: storage differs most, helpers least." Incorrect: the correct order is shown with the Why text for the measure the learner placed wrongly. The reveal always happens after the ranking.

**Starting State:** Three measure names are shown with no values. The question on screen is "Which measure differs most between the two programs?"

**Chapter Anchors:** The chapter states the six illustrative values 1,200 and 15 MB, 450 and 30 MB, 3 and 1 helpers, and the ratios 80, 15 and 3 times.
</details>

## Putting the Vocabulary to Work

You now have the vocabulary for the rest of the book. A product is built from software, offers a feature set, and ships as versions on a release cycle. When the feature set grows past what most users need through feature creep, the product is bloated, and the evidence appears in its resource footprint and its price. A single-purpose utility is the contrast case, and the job to be done is the yardstick.

!!! mascot-celebration "You can name the parts of bloat"
    ![Pinch celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now tell a software product from the software inside it, trace how a feature set grows through versions, and separate bloat from feature creep and from footprint. That is the vocabulary every later chapter builds on.

## Key Takeaways

- Software is instructions; a software product is software packaged with a license, installer, updates, and support.
- A feature set grows through versions published on a release cycle.
- Software bloat is a gap between a feature set and the job a user needs done. Feature creep is how the gap opens.
- Resource footprint, including install size and idle resource use, is the measurable side of bloat.
- A single-purpose utility, guided by the Unix philosophy, is the contrast case.

[See Annotated References](./references.md)
