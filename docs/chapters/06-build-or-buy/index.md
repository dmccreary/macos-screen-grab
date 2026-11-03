---
title: "Build or Buy and the Rise of Personal Software"
description: "The central choice of the book: buy, subscribe, or generate, with personal software, disposable and long-lived tools, the risks of ownership, and who answers when something breaks."
generated_by: claude skill chapter-content-generator
date: "2026-11-01 20:15:52"
version: 1.11
---

# Build or Buy and the Rise of Personal Software

## Summary

With costs and coding agents both in hand, this chapter frames the central choice of the book: buy, subscribe, or generate. It introduces personal software, the difference between disposable and long-lived tools, and the risks and support responsibility that come with owning what you generate. After this chapter, you will be able to describe all three options and the responsibilities each one carries.

## Concepts Covered

This chapter covers the following 9 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Build-Or-Buy Decision | 22 |
| Buy Option | 4 |
| Subscribe Option | 4 |
| Personal Software | 21 |
| Disposable Software | 1 |
| Long-Lived Software | 1 |
| Risks Of Ownership | 6 |
| Support Responsibility | 1 |
| Generate Option | 9 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Software Features and the Anatomy of Bloat](../01-software-bloat/index.md)
- [Chapter 3: Licenses, Subscriptions, and Vendor Incentives](../03-licenses-subscriptions/index.md)
- [Chapter 4: Total Cost of Ownership](../04-total-cost-of-ownership/index.md)
- [Chapter 5: Generative AI and Coding Agents](../05-generative-ai-coding-agents/index.md)

---

!!! mascot-welcome "Three Doors, Not Two"
    ![Pinch waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    You now know what bloat costs and what a coding agent can do, so it is time to choose. By the end of this chapter you will be able to look at any paid tool you use and name three ways out, along with what each one asks of you. Grab only what you need!

## The Build-or-Buy Decision

A **build-or-buy decision** is the choice between making a tool yourself and paying someone else for one. Businesses have faced this choice for as long as there has been software: build an in-house system, or buy a product. For individuals, "build" used to be unrealistic. Writing even a small application took weeks of study and practice, so almost everyone bought.

Generative AI changes the price of building, and that is why this book exists. When a short request and a few answers can produce a working app in about 36 minutes, as the ScreenGrab case did, "build" becomes a real option for ordinary users. The decision also gains a third branch. Earlier chapters distinguished two ways of paying for existing software, a one-time license and a subscription. Adding generation gives three options in total:

- **Buy:** pay once for a product and keep using it.
- **Subscribe:** pay repeatedly for a product you rent.
- **Generate:** describe what you need and have an AI coding agent build it for you.

A worked example sets up the rest of the chapter. The ScreenGrab story began with a utility that cost $9 once and ran on all of the author's computers. Over the years it gained features, and it now requires an annual fee of $30 per computer. The author faced the decision directly: keep paying $90 a year for three computers, hunt for a smaller product, or generate a tool with just two features. The sections below describe each option, and the decision explorer later in the chapter lets you practice choosing.

!!! mascot-thinking "The Decision Is Not Free Versus Paid"
    ![Pinch thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that generating is not the "free" door. It costs tokens, time, and ongoing care. The useful question is not which option is cheapest in the first month, but which one fits the job over the whole time you will use it.

## The Buy Option

The **buy option** means paying a one-time price for software and then using that version for as long as it works for you. This is the perpetual license model from Chapter 3. You pay once, you own the right to run that version, and the vendor's incentive is to earn the money at the moment of sale.

Buying has real strengths. The cost is known in advance and does not recur. Someone else wrote, tested, and packaged the product, so you receive something that has been exercised by many users. If the tool is stable and does what you need, the cost per year of use falls every year you keep it.

The weaknesses are the ones this book has been tracing. A bought product still arrives with the vendor's full feature set, including the roughly 80% of features that are rarely or never used. A one-time license may not cover major new versions, and a vendor that depends on new sales has a reason to keep adding features so that you upgrade. Some products have also stopped offering one-time purchases at all.

A worked example from the case: the original utility at $9 was an excellent buy. It did its job, it ran on every computer the author owned, and it cost less than a coffee for several years of use. The buy option worked well until the product changed its pricing model.

| Aspect | Buy option |
|---|---|
| Cost pattern | One payment up front |
| Who maintains it | The vendor, until you stop upgrading |
| Features you get | The vendor's whole feature set |
| Main risk | Version lock-in or a product that stops being sold this way |

## The Subscribe Option

The **subscribe option** means paying a recurring fee, monthly or yearly, for continued access to software. Chapter 3 explained how this changes a vendor's incentives: because revenue depends on renewals, the vendor must keep showing you new value, and "new value" often arrives as new features.

Subscriptions have genuine benefits. Updates, security fixes, and support are normally included. The up-front cost is low. For software that must track a changing outside world, such as tax rules or an online service, a vendor who keeps it current is doing real work that you would otherwise do yourself.

The cost of that convenience compounds. A subscription never finishes. If the fee is per computer, it multiplies with every machine you own. And if you stop paying, you may lose access to the tool, sometimes including the files it created in its own format.

The worked example is the ScreenGrab utility today. At $30 per computer per year, three computers cost $90 a year, which is $450 over five years. The same job cost $9 before. Nothing about the job changed. What changed is the payment model and the number of features the author is paying for but not using.

| Aspect | Subscribe option |
|---|---|
| Cost pattern | Recurring, often per computer |
| Who maintains it | The vendor, for as long as you pay |
| Features you get | The vendor's whole feature set, growing over time |
| Main risk | Paying indefinitely for features you never use |

## The Generate Option

The **generate option** means describing the tool you want and having an AI coding agent build it. You pay no license fee, since the code is yours. You do pay in tokens, which are the units an AI service charges for, and in your own time to specify, review, and test the result.

The ScreenGrab case gives concrete numbers, drawn from the course description. The author needed only two features: grab a region, and grab a region after a delay, with the image going to the clipboard. The first version was built and installed in about 36 minutes and cost about $6 in estimated API cost. The whole session, including hotkey testing, took about 70 active minutes and cost about $14. That figure is less than one-sixth of a single year's $90 in fees.

Those costs are estimates, and they cover the code only. They exclude the author's own time and later maintenance. The table below puts the three options side by side using the case study's figures, and its last column shows what each figure leaves out.

| Option | Cost in the case study | What the figure leaves out |
|---|---|---|
| Buy (original utility) | $9 once | Anything the vendor later added or charged |
| Subscribe (current utility) | $90 a year for three computers; $450 over five years | The features that go unused |
| Generate (ScreenGrab) | About $14 for the whole session | The author's time, later maintenance, and testing effort |

!!! mascot-warning "Cheap to Build Is Not Cheap to Own"
    ![Pinch warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A $14 build can tempt you to stop counting. Before you call generation the winner, add the line the table leaves blank: your time to specify and check the tool, and the upkeep afterward. Chapter 4's total cost of ownership is the tool for doing that sum honestly.

## Personal Software

**Personal software** is software made for one person, or a very small group, to meet their own needs rather than the needs of a market. It does not need a sales page, support desk, or thousands of users. It needs to do one job for its owner.

Personal software is not new. People have always written spreadsheets with formulas, macros in a word processor, and little shell scripts. What is new is that someone with no programming experience can produce something larger, such as a native application, by describing it in plain language. The audience for this course, technically curious users who pay for software they barely use, is exactly the group for whom this option has just opened.

The defining feature is the size of the audience. A commercial product must serve millions of different users, so it accumulates features to cover all their needs, which is the root of bloat. Personal software serves one user, so it can be exactly the size of that person's job. The ScreenGrab app has two features because the person it was built for needed two.

A worked example: suppose you need a tool that renames photo files from a trip using the date in each file. A commercial photo manager offers hundreds of features and a subscription. A personal tool does one thing, you describe it in a sentence, and the agent produces it. You are the only user, so you decide what "works" means, and you can test it on your own files.

The trade is that a personal tool has no vendor behind it. No one else found the bugs, wrote the documentation, or waits to answer your questions. Everything the vendor provided as part of the price is now your job.

### Disposable Software

**Disposable software** is a tool made for a single occasion and thrown away when the job is done. A script that converts one folder of files, or a page that formats one event's name tags, are typical examples. Because it will be used once, it needs little polish, no installer, and no long-term maintenance.

A worked example: you have 40 scanned receipts named by the scanner with meaningless numbers, and you want each file renamed by its date. You describe that single job, the agent writes a short script, you run it once, check a few results, and delete the script. The total effort is minutes, and nothing remains to maintain.

Generative AI is especially suited to disposable software, because the cost of creating it can be lower than the cost of finding and learning a product for the same one-off job.

### Long-Lived Software

**Long-lived software** is a tool you expect to keep using for months or years, across operating system updates and changing needs. A screen grab utility used every day for years falls here. It needs a real installer, clear documentation, tests, and a plan for fixing problems, because you will return to it when something changes.

The distinction matters for the decision. The same generated app can be a bargain as a disposable tool and a burden as a long-lived one, because the long-lived version brings the maintenance and verification costs that the disposable version avoids. Ask early how long you expect to use the tool, and plan accordingly.

| | Disposable software | Long-lived software |
|---|---|---|
| Expected use | Once or a few times | Months or years |
| Polish needed | Little | Installer, README, tests |
| Maintenance | None; discard it | Ongoing |
| Example | Convert one folder of files | A daily screen grab tool |

## Risks of Ownership

The **risks of ownership** are the problems that come with being the owner of software that no vendor stands behind. When you buy or subscribe, a company carries most of these risks. When you generate, they move to you.

The main risks are:

- **Defects:** the generated code may contain bugs, some of which only appear in rare situations.
- **Unverified behavior:** a tool can look right and still fail in cases nobody tried.
- **Platform changes:** an operating system update can break a tool that worked yesterday.
- **Disappearing knowledge:** you may forget how the tool was built, and the agent that built it does not remember.
- **Security:** a tool with access to your screen or files must not do more than you intended.

The ScreenGrab case study shows these risks plainly, not as hypotheticals. One early hotkey failure was never explained. Several acceptance tests still have to be run by hand. A later fix was needed for Macs that have only the Command Line Tools installed. None of these ruined the project, and all of them are the kind of event a vendor would normally absorb. Chapters 12 to 14 return to testing, bugs, and maintenance in depth.

A worked example of risk in practice: the author installs the app and the hotkey works on the machine where it was built. On a second computer the app builds but the hotkey does nothing. Someone must diagnose it, and that someone is the owner. With a purchased product, you would file a support request. With your own tool, you open the session log, ask the agent to investigate, and test the fix yourself.

### Support Responsibility

**Support responsibility** is the duty to answer for the software when it breaks: to diagnose it, fix it, and keep it working. With bought or subscribed software this duty sits with the vendor. With generated software it sits with you.

That does not mean you must become a programmer. It means you must be willing to keep the project folder, keep the instructions file and README current, and run a coding agent when something needs fixing. If you will not do that, the generate option is a poor choice for a long-lived tool, however cheap the build was.

!!! mascot-tip "Ask Who Answers the Phone"
    ![Pinch giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Before you generate anything meant to last, finish this sentence: "When this breaks, I will ___." If you cannot fill the blank with a plan, choose buy or subscribe, or accept that the tool will be disposable.

## Practicing the Decision

The decision explorer below gives you eight short scenarios. For each, you choose buy, subscribe, or generate, and the explorer explains the reasoning. The scenarios are illustrative, and they use the ideas from this chapter: how long the tool will be used, who maintains it, and what happens when it breaks.

#### Diagram: Buy, Subscribe, or Generate Decision Explorer

<details markdown="1">
<summary>Buy, Subscribe, or Generate Decision Explorer</summary>
Type: microsim
**sim-id:** buy-subscribe-generate-decision-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/information-systems/tree/main/docs/sims/build-buy-saas-decision<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** recommend<br/>
**Learning Objective:** The learner will recommend buy, subscribe, or generate for each of 8 scenarios, justified by how long the tool will be used and who supports it, with at least 6 correct.

**Prerequisites:** build-or-buy decision, buy option, subscribe option, generate option, disposable software, long-lived software, risks of ownership, support responsibility (all defined in this chapter above this block).

**Evidence of Mastery:** For each scenario the learner commits one of three recommendations. A recommendation is correct when it matches the "Best option" column in Content. Mastery is 6 of 8 correct. Opening the three option summaries is exploration, not evidence.

**Misconceptions:** (1) Generating is always the cheapest choice. (2) A subscription is always a bad deal. (3) A one-time purchase never needs any further thought.

**Instructional Rationale:** Evaluating means judging against criteria. The scenarios vary the criteria (duration, support, regulation, verification) so the learner must weigh them instead of memorizing a single rule.

**Content:**

The three options, shown as reference summaries the learner can open at any time:

| Option | One-sentence summary |
|---|---|
| Buy | Pay once and keep using that version; the vendor maintains it until you stop upgrading |
| Subscribe | Pay repeatedly; the vendor maintains it and keeps it current for as long as you pay |
| Generate | Have an AI coding agent build exactly what you need; you pay tokens and time, and you carry support responsibility |

The eight scenarios, in order. All are illustrative:

| # | Scenario | Best option | Why (shown as feedback) |
|---|---|---|---|
| 1 | You must convert one folder of files to a different format this afternoon, and never again. | Generate | One-off job: disposable software has no maintenance cost, and no product is worth learning for one use |
| 2 | A 200-person company needs payroll software that must follow tax rules that change every year. | Subscribe | The outside rules change constantly, and the vendor's yearly updates and support are the real product |
| 3 | A $9 one-time utility does exactly your job on all your computers and has not changed in years. | Buy | A stable one-time purchase already fits; keep it, since the cost per year keeps falling |
| 4 | Your screen grab tool costs $30 per computer per year on 3 computers, and you use 2 of its features. | Generate | You can name the 2 features, the fee compounds ($90 a year), and a small tool is easy to test |
| 5 | A clinic must store patient records and follow privacy law, and no staff member can verify security. | Subscribe | The vendor carries compliance, security, and support, which the clinic cannot verify itself |
| 6 | You need name tags formatted for one event next weekend. | Generate | A single-occasion job suits disposable software, with no upkeep afterward |
| 7 | A $40 one-time-license drawing app does everything you need on one computer and rarely changes. | Buy | A stable tool with a fixed price and no recurring cost; generating adds work for no gain |
| 8 | You need one job done on two computers, the only product charges $15 per computer per year, and you can describe the job in two sentences and have time to test it. | Generate | A short specification and time to verify make generating practical, and the fee recurs forever |

Counts: Generate is the best option in 4 scenarios (1, 4, 6, 8), Subscribe in 2 (2, 5), and Buy in 2 (3, 7).

**Provenance:** Scenarios are illustrative and written for this chapter, and the sim labels them "illustrative". The $9, $30, $90 figures in scenarios 3 and 4 come from the course description section "How a simple tool became a subscription". The option summaries come from this chapter.

**Rules:** Each scenario has exactly one best option. The learner chooses exactly one of three options per scenario. No arithmetic is required of the learner. A scenario is correct only when the chosen option equals the Best option column.

**Learner Activity:**

1. The learner reads scenario 1 and may open the three option summaries.
2. The learner picks one of Buy, Subscribe, or Generate and confirms the choice.
3. The sim shows whether the choice was correct and the Why text, and the learner moves to the next scenario.
4. After scenario 8, the sim shows the score and lists the scenarios answered incorrectly with their Why text. The learner should notice that the best option depends on duration and support more than on price alone.

**Feedback:** Eight scenarios, fixed order, one attempt each. Correct: "Correct: <option>" and the Why text. Incorrect: the best option and the Why text. A running count "Correct: n of 8" is shown. A final score of 6 or more shows "You can weigh the three options"; a lower score invites a restart.

**Starting State:** Scenario 1 is shown with the three option summaries closed and the question "Which option fits this job best?"

**Chapter Anchors:** The chapter states three options (buy, subscribe, generate), the figures $9, $30 per computer per year, $90 a year, $450 over five years, about $6 for the first build, about $14 for the whole session, and about 70 active minutes. The explorer has 8 scenarios and mastery is 6 of 8.
</details>

!!! mascot-celebration "You Can Name Every Door"
    ![Pinch celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now describe buy, subscribe, and generate, say how personal, disposable, and long-lived software differ, and name who answers when a generated tool breaks. Next, you will learn how to write the specification that keeps a generated tool small.

[See Annotated References](./references.md)
