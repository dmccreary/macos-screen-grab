---
title: Glossary of Terms
---

# Glossary of Terms

#### 80% Rule Of Thumb

A heuristic stating that about 80 percent of the features in a typical software product are rarely or never used, based on Pendo's 2019 Feature Adoption Report. It is an average across many products, not a measured law for any single one.

The rule frames the book's case that most buyers pay for capabilities they never use.

**Example:** Of 40 features in a capture suite, about eight see regular use and the other 32 rarely or never do.

**See also:** Pareto Principle, Unused Features

#### Acceptance Criteria

Specific, checkable conditions that a feature must satisfy to be considered complete. They are agreed on before work begins.

Acceptance criteria turn "done" into something testable.

**Example:** "After a 5-second delay, the selected region is on the clipboard."

**See also:** Acceptance Test, Verification Plan

#### Acceptance Test

A test that checks whether a feature meets the agreed criteria for acceptance. It reflects the user's perspective.

It confirms that the tool does the job it was built for.

**Example:** Verify that the delayed capture puts the correct region on the clipboard.

**See also:** Acceptance Criteria, Manual Testing

#### Active Working Time

The portion of elapsed time in which a person is actually engaged in the task, excluding waiting and breaks. It reflects human effort.

Active time is the true labor cost of generation.

**Example:** Forty minutes of directing and reviewing within a longer session.

**See also:** Wall-Clock Time, Opportunity Cost

#### Ad-Hoc Signing

A form of code signing that uses a locally created identity instead of one issued by a recognized authority. It allows an app to run on the signer's own machine.

It is a practical choice for a personal tool.

**Example:** Signing ScreenGrab locally so that macOS permissions persist.

**See also:** Code Signing, Screen Recording Permission

#### Agent Experiments

Small trials of an AI agent on a bounded task to learn what it can do, how much it costs, and how it fails. Results guide larger use.

Experiments let a reader test the generate option cheaply.

**Example:** Asking the agent to build a one-feature tool to see the cost.

**See also:** Prototype, Cost Of Generating Software

#### Agent Instructions File

A file in a project that gives an AI coding agent standing guidance, such as rules, conventions, and commands. The agent reads it at the start of work.

It records preferences once so they need not be repeated in each prompt.

**Example:** A file stating that tests must run before a task is called done.

**See also:** Claude Code, Agent Permissions

#### Agent Permissions

Settings that control which actions an AI agent may take without asking, such as editing files or running commands. They limit what the agent can change.

Permissions balance convenience against safety.

**Example:** Allowing file edits but requiring approval for network access.

**See also:** Human In The Loop, Agent Tool Use

#### Agent Planning

The process by which an AI agent breaks a goal into ordered steps before or while acting. Plans can be revised as results arrive.

Visible plans let a human review the approach before code is written.

**Example:** The agent lists "create project, add capture, add delay, write tests."

**See also:** Human Review, AI Coding Agent

#### Agent Tool Use

The ability of an AI agent to invoke external tools, such as reading files, running commands, or searching, instead of only producing text. Tool results feed back into its next step.

Tool use turns a language model into an agent that can build and test software.

**Example:** The agent runs the test suite and reads the failures.

**See also:** AI Coding Agent, Agent Permissions

#### AI Coding Agent

A program that uses a language model to plan, write, run, and revise code, often by using tools such as a file editor and a command line. It works toward a goal with limited step-by-step instruction.

The coding agent is the means by which a non-programmer can obtain a custom tool.

**Example:** Claude Code building and testing the capture app.

**See also:** Claude Code, Agent Tool Use

#### AI Hallucination

Output from a language model that is false or invented but presented as if it were true. It can include nonexistent functions, facts, or results.

Hallucination is why generated code must be verified, not trusted.

**Example:** The agent calls a macOS function that does not exist.

**See also:** Overconfident Reporting, Software Verification

#### AI Session

One continuous interaction between a user and an AI agent, from the first prompt to the end of the work. It holds the conversation, actions, and results.

The session is the unit in which time and cost are measured in the case study.

**Example:** The single session that produced the ScreenGrab app.

**See also:** Session Log, Session Cost Breakdown

#### Annual Fee

A payment charged once per year for continued access to a product or service. It renews automatically in many software subscriptions.

The annual fee is the number that makes the multi-year cost of a subscription visible.

**Example:** $30 per computer per year for the screen grab tool.

**See also:** Subscription License, Multi-Year Cost

#### API Cost Estimate

A calculation of what a session would cost if billed at published per-token rates. It may differ from what a subscriber actually pays.

The estimate lets different users compare cost on a common basis.

**Example:** About $14 estimated for the full ScreenGrab session.

**See also:** Token Pricing, Subscription Usage Window

#### Automated Test

A test that a computer runs without human involvement, comparing actual results with expected ones. It can be repeated at any time.

Automated tests make it safe to change code.

**Example:** A test that checks a captured image has the selected size.

**See also:** Unit Test, Manual Testing

#### Bloatware

Software whose size, resource use, or bundled extras are disproportionate to its useful function. The term often describes programs that include unwanted components alongside the capability the user wanted.

Bloatware is the extreme outcome of unchecked growth and is the kind of product the Generate Option tries to avoid.

**Example:** An installer that adds background services and promotional apps along with a simple capture tool.

**See also:** Software Bloat, Resource Footprint

#### Break-Even Point

The point at which cumulative costs of one option equal those of another, after which the other option becomes cheaper. It is usually expressed in time or units of use.

The break-even point tells how soon a generated tool pays for itself relative to a subscription.

**Example:** A $14 generation cost breaks even against $90 per year in under two months.

**See also:** Cost Comparison, Multi-Year Cost

#### Bug Reproduction

The act of making a bug occur reliably by following known steps. Reproduction is the first step toward fixing it.

A reproducible bug can be tested and confirmed fixed.

**Example:** Capturing with a two-second delay on a second display triggers the fault.

**See also:** Software Bug, Regression Test

#### Build Script

A file of commands that automatically compiles and assembles a program into a runnable form. It makes the process repeatable.

Scripts let anyone rebuild the app with one command.

**Example:** A script that compiles ScreenGrab and produces the application.

**See also:** Installer Script, Developer Toolchain

#### Build-Or-Buy Decision

A choice between creating a solution yourself and acquiring one from a vendor. Factors include cost, time, risk, quality, and long-term control.

AI coding agents have changed this decision for small tools by reducing the cost of building.

**Example:** Deciding to generate a two-feature capture app instead of renewing a subscription.

**See also:** Buy Option, Generate Option, Decision Matrix

#### Buy Option

The choice to acquire software through a one-time purchase and use it under the vendor's license. The buyer receives the product as it exists.

It carries low effort but depends on the vendor's pricing and update policy.

**Example:** Purchasing a perpetual license for a utility.

**See also:** Subscribe Option, One-Time License

#### Cache Expiration

The end of a cached item's life after a period without use, after which it must be written again. The period is limited.

Long pauses can cause cache expiration and increase cost.

**Example:** Stepping away for an hour and returning to find the cache gone.

**See also:** Prompt Caching, Token-Heavy Activities

#### Cache Read Tokens

Input tokens retrieved from the cache instead of reprocessed. They are billed at a much lower rate than normal input.

Most tokens in a long session are cache reads, which keeps cost low.

**Example:** Each later turn reads the stored project files cheaply.

**See also:** Cache Write Tokens, Input Tokens

#### Cache Write Tokens

Input tokens stored into the cache the first time they are processed. They are typically billed at a rate above normal input.

Writing to the cache is a small upfront cost that later reads recover.

**Example:** Saving the specification to the cache at the start of a session.

**See also:** Cache Read Tokens, Prompt Caching

#### Casual Users

People who use a software product occasionally and for simple tasks, relying on a small set of basic features. They form the majority of most products' audiences.

The book focuses on casual users, whose needs a minimal tool can fully meet.

**Example:** A person who grabs a screen region a few times a month to paste into an email.

**See also:** Power Users, 80% Rule Of Thumb

#### Clarifying Questions

Questions an AI agent asks the user to resolve ambiguity before proceeding. Answers narrow the requirements.

They prevent wrong assumptions from becoming wrong code.

**Example:** "Should the image go to a file, the clipboard, or both?"

**See also:** Explicit Assumptions, Human In The Loop

#### Claude Code

An AI coding agent from Anthropic that runs in a developer's terminal and works on a project's files. It reads code, edits it, runs commands, and reports results.

Claude Code is the agent used to build the ScreenGrab app.

**Example:** Typing a request in the terminal and watching it create Swift files.

**See also:** AI Coding Agent, Agent Instructions File

#### Clipboard Output

Placing a captured image on the system clipboard so it can be pasted directly into another application. No file is created.

It keeps the workflow short and avoids clutter.

**Example:** Capturing and then pasting into an email.

**See also:** Screen Capture, Default Behavior

#### Code Generation

The automatic production of program code by a tool, here by a language model working from a description. The output needs checking.

Code generation lowers the cost of producing software.

**Example:** The agent writes the Swift files from the specification.

**See also:** AI Coding Agent, Software Verification

#### Code Signing

The process of attaching a digital signature to an application to show who produced it and that it has not been altered. Operating systems use it to decide whether to trust the app.

Signing affects how smoothly macOS lets a self-built app run.

**Example:** A signed app opens without a warning that the developer is unidentified.

**See also:** Ad-Hoc Signing, Developer Toolchain

#### Cognitive Load

The mental effort required to understand and operate something. In software it increases with the number of options, steps, and concepts a user must keep in mind.

Reducing cognitive load is a primary benefit of a minimal tool.

**Example:** Choosing among eight capture modes before every screenshot.

**See also:** Interface Complexity, Feature Discoverability

#### Community Contribution

Work given by people outside the original author to improve a shared project, such as code, fixes, or documentation. It is voluntary.

Contributions can extend a tool beyond what one person provides.

**Example:** Someone adds a translation of the README.

**See also:** Pull Request, Long-Term Stewardship

#### Competitive Feature Matching

The practice of adding features to a product primarily because competing products have them. The goal is to avoid appearing inferior in comparisons.

It drives products toward similar, large feature sets regardless of what customers use.

**Example:** Adding a video recorder because rival tools include one.

**See also:** Feature Checklist Marketing, Feature Creep

#### Compiler Errors

Messages produced when a compiler cannot convert source code into a runnable program because of faults in the code. They must be fixed before the program can run.

Agents commonly fix their own compiler errors by reading and retrying.

**Example:** A missing import causes a build failure that the agent corrects.

**See also:** Build Script, Developer Toolchain

#### Context Window

The maximum amount of text, measured in tokens, that a language model can consider at one time, including the conversation, files, and its own output. Content beyond the limit is not seen.

The window limits how much code and history an agent can keep in view during a session.

**Example:** A long session that fills the window and loses earlier detail.

**See also:** Token, Input Tokens

#### Copyright

A legal right that gives creators control over copying and distribution of their original works. Licenses are used to grant others permission.

Copyright is the base on which software licenses operate. This entry is not legal advice.

**Example:** The author holds copyright on the source code and licenses it to others.

**See also:** Software License, MIT License

#### Cost Comparison

A side-by-side evaluation of the expected costs of two or more options over a stated period. It uses consistent assumptions so results are comparable.

A careful comparison supports the build-or-buy decision with numbers.

**Example:** Comparing $90 per year with a one-time $14 generation cost over five years.

**See also:** Published Cost Comparison, Break-Even Point

#### Cost Of Generating Software

The total expense of producing a program with an AI coding agent, including model usage charges and the human time spent directing and checking it. It is usually far lower than traditional development.

This cost underpins the claim that building can compete with buying.

**Example:** About $6 to build the app and about $14 for the whole session.

**See also:** API Cost Estimate, Session Cost Breakdown

#### Cost Per Computer

The total cost of a product divided by the number of computers on which it is used, or the price charged for each installation. It supports comparison across licensing models.

Cost per computer makes multi-device pricing visible.

**Example:** $30 per year for each of 3 Macs.

**See also:** Per-Computer Licensing, Cost Comparison

#### Cost Per Feature Used

The total cost of a product divided by the number of its features that a person actually uses. It measures how much is paid for each capability that provides value.

The measure shows how unused features raise the effective price.

**Example:** $30 a year for a tool of which you use two features is $15 per feature used.

**See also:** Unused Features, Total Cost Of Ownership

#### Cost Per Line Of Code

The total cost of producing a program divided by its number of lines of code. It offers a rough measure of production efficiency.

It lets generated software be compared with traditional development.

**Example:** $6 across 2,000 lines is about 0.3 cents per line.

**See also:** Lines Of Code, Cost Of Generating Software

#### Cost-Weighted Tokens

A usage measure that scales each token by its price, so that more expensive kinds count for more. It combines input, output, and cache tokens into one comparable number.

It shows which parts of a session drive cost.

**Example:** An output token counts for more than a cache read token.

**See also:** Token Pricing, Session Cost Breakdown

#### Creative Commons License

A family of standard licenses for creative works, such as text and images, that let authors state what reuse is allowed. They are commonly used for content in place of software.

They apply to the book's text and images rather than the code. This entry is not legal advice.

**Example:** A badge on a page indicating the reuse terms of its content.

**See also:** Copyright, Open Source License

#### Customer Lifetime Value

The total revenue a business expects from one customer over the whole relationship. It guides how much a company will invest to acquire and keep customers.

Moving from a $9 sale to $30 per year raises a customer's lifetime value sharply.

**Example:** A customer who pays $30 a year for ten years yields $300.

**See also:** Recurring Revenue, Switching Costs

#### Decision Criteria

The factors used to judge and compare options, such as cost, time, quality, risk, and control. Explicit criteria make a decision transparent.

Naming criteria prevents decisions based only on familiarity.

**Example:** Total five-year cost, effort, and the ability to modify the tool.

**See also:** Decision Matrix, Build-Or-Buy Decision

#### Decision Matrix

A table that rates each option against each decision criterion, often with weights, to support a structured choice. The totals indicate which option scores best.

It turns the build-or-buy discussion into a visible comparison.

**Example:** A grid scoring buy, subscribe, and generate on cost, effort, and control.

**See also:** Decision Criteria, Build-Or-Buy Decision

#### Default Behavior

What a program does when the user has not chosen an option. Defaults reduce the number of decisions a user must make.

Good defaults let a simple tool work with no configuration.

**Example:** Capture goes to the clipboard unless told otherwise.

**See also:** Interface Complexity, Minimal Specification

#### Delayed Capture

A capture that occurs after a set waiting period, giving the user time to arrange the screen. It allows capturing transient items such as open menus.

Delayed capture is the second feature of the generated tool.

**Example:** Wait five seconds, then capture, so a pop-up menu can be opened first.

**See also:** Region Selection, Screen Capture

#### Design Decision

A specific choice made while designing software, with the reasons for it. Each decision excludes alternatives.

Recording decisions explains the shape of the program.

**Example:** Choosing to freeze the screen during region selection.

**See also:** Design Trade-Off, Design Document

#### Design Document

A written record of a program's structure, key choices, and reasoning. It helps others understand and maintain the program.

Design documents preserve intent for later maintenance.

**Example:** A page explaining why the app uses no outside libraries.

**See also:** Software Design, Documentation For Others

#### Design Trade-Off

A situation where improving one quality of a design worsens another, so a balance must be struck. Trade-offs require choosing priorities.

Seeing trade-offs makes simplicity a choice, not an accident.

**Example:** Fewer settings make the tool simpler but less flexible.

**See also:** Design Decision, Platform Constraints

#### Developer Toolchain

The set of programs used to build software, including the compiler, linker, and related utilities. It must be installed on the machine that builds the code.

Toolchain updates can break builds and are part of maintenance.

**Example:** Apple's developer tools needed to compile Swift.

**See also:** Toolchain Changes, Build Script

#### Disposable Software

Software made for a short-term need and discarded when the need ends, with little investment in long-term upkeep. Its low creation cost justifies throwing it away.

It is possible when generation is quick and cheap.

**Example:** A one-day script to rename files, deleted afterward.

**See also:** Long-Lived Software, Personal Software

#### Documentation For Others

Written material that lets people other than the author understand, install, and use or modify the software. It assumes no prior knowledge.

Without documentation, a personal tool cannot be shared.

**Example:** A README and a short usage guide.

**See also:** README File, Sharing A Personal Tool

#### End User License Agreement

A contract presented to a person installing or using software, stating the vendor's terms for use. Users typically accept it by clicking a button or by using the product.

The agreement sets the terms for transfers, number of devices, and what happens when payment stops.

**Example:** A dialog during installation that asks you to agree to terms before the app opens.

**See also:** Software License, Per-Computer Licensing

#### Environment-Specific Bug

A defect that appears only under certain conditions of the computer, such as operating system version, hardware, or settings. It may not occur elsewhere.

Such bugs are hard to find through tests on a single machine.

**Example:** A capture offset that appears only on a display with high pixel density.

**See also:** Hotkey Conflict, Bug Reproduction

#### Estimation Assumptions

The stated premises behind a cost or time estimate, such as rates used, model chosen, and counts of tokens. They determine how reliable the estimate is.

Listing them keeps the numbers honest and reproducible.

**Example:** Assuming list price for all tokens and no discounts.

**See also:** Explicit Assumptions, API Cost Estimate

#### Evidence-Based Reporting

Stating results only to the extent supported by observed evidence, such as test output or direct trial. Unchecked claims are marked as such.

It counters overconfident reports from agents.

**Example:** "Tests passed in the terminal log; manual check not performed."

**See also:** Overconfident Reporting, Verification Status

#### Explicit Assumptions

Conditions believed to be true that are written down so they can be checked and challenged. They make hidden premises visible.

Writing assumptions down prevents the agent from silently choosing differently than intended.

**Example:** "The user runs a recent version of macOS on Apple hardware."

**See also:** Clarifying Questions, Estimation Assumptions

#### Feature Checklist Marketing

A sales approach that promotes a product by listing the number or range of its features, often in comparison tables with competitors. It emphasizes breadth over fit to the buyer's need.

Checklist marketing encourages buyers to value unused features.

**Example:** A web page with a table of 40 check marks comparing capture tools.

**See also:** Competitive Feature Matching, Feature Set

#### Feature Creep

The gradual, continuous addition of features to a product beyond its original purpose, typically in small steps that each seem reasonable. Over time the accumulated additions change the product's character.

Feature creep is the mechanism by which a focused tool becomes a bloated one.

**Example:** A utility adds annotation, then video, then cloud storage, each justified separately.

**See also:** Software Bloat, Product Roadmap

#### Feature Discoverability

The degree to which users can find and understand the features available in an interface. Low discoverability means useful capabilities are hidden or unclear.

Adding features without care reduces the discoverability of the ones people actually need.

**Example:** A menu with thirty items makes the capture command harder to spot.

**See also:** Interface Complexity, Cognitive Load

#### Feature Set

The complete collection of features that a software product offers at a given version. It defines what the product can do and what a buyer receives.

Vendors often compare feature sets in marketing, even when most buyers use only a small portion of them.

**Example:** A screen utility's feature set might include region capture, video recording, annotation, cloud sharing, and OCR.

**See also:** Software Feature, Feature Checklist Marketing

#### Feature Usage

The extent to which users actually invoke each feature of a software product, measured by frequency, number of users, or time spent. It describes real behavior, not what a product offers.

Feature usage data shows how small a portion of a product most people use, which underlies the 80% rule.

**Example:** Usage data may show that most captures use only region selection.

**See also:** Usage Telemetry, 80% Rule Of Thumb

#### Forking

Making an independent copy of a repository so that changes can be made without affecting the original. The copy can be developed separately.

Forking lets others customize the tool for themselves.

**Example:** A reader copies ScreenGrab and adds a feature they want.

**See also:** Pull Request, Public Repository

#### Free Alternatives

Software that performs a similar function to a paid product at no charge, including built-in system tools and open source programs. They may have fewer features or different limits.

Free alternatives set the baseline in any cost comparison.

**Example:** The screenshot shortcut built into macOS.

**See also:** Freemium Model, Open Source Software

#### Freemium Model

A pricing approach that gives a basic version of a product for free and charges for advanced features or higher use. The free tier is meant to attract users who may later pay.

Freemium products often limit the basic version in ways that push users toward payment.

**Example:** A free capture tool that adds a watermark until you pay.

**See also:** Free Alternatives, Software As A Service

#### Freeze-Frame Selection

A selection method that freezes the screen image while the user chooses a region, so moving content does not change what is captured. The selection is made on a still picture.

It improves accuracy when capturing changing content.

**Example:** The screen stops while you drag a box over a video frame.

**See also:** Region Selection, Delayed Capture

#### Functional Requirement

A requirement describing a specific behavior or capability the software must perform. It states what the system does.

Functional requirements list the features the tool will include.

**Example:** "The app captures the selected region after a chosen delay."

**See also:** Non-Functional Requirement, Requirements

#### Generate Option

The choice to create a custom program by directing an AI coding agent from a written description. The result is software tailored to the user's own needs.

It is the third path introduced in this book alongside buying and subscribing.

**Example:** Prompting Claude Code to produce a two-feature screen grab app.

**See also:** Cost Of Generating Software, AI Coding Agent

#### Generative AI

Artificial intelligence systems that produce new content, such as text, images, or program code, in response to a prompt. They learn patterns from large collections of existing data.

Generative AI makes the Generate Option possible.

**Example:** A system that writes Swift code from a plain-English request.

**See also:** Large Language Model, AI Coding Agent

#### Git Commit

A saved snapshot of a project's changes in Git, with a message describing them. Each commit becomes a point in history.

Commits record the steps by which the app was built.

**Example:** A commit labeled "Add delayed capture."

**See also:** Version Control, Git Push And Pull

#### Git Push And Pull

Git operations that send local commits to a remote repository (push) or bring remote commits to the local copy (pull). They keep copies synchronized.

Pushing publishes the work; pulling retrieves others' changes.

**Example:** Pushing the project to a public site so others can download it.

**See also:** Git Repository, Public Repository

#### Git Repository

A project folder tracked by Git, containing files and the full history of changes to them. It can be stored locally and copied to remote servers.

The repository holds the source of the generated tool.

**Example:** The ScreenGrab project folder with its commit history.

**See also:** Git Commit, Public Repository

#### Global Hotkey

A keyboard shortcut that works in any application, even when the program is not in the foreground. It triggers an action immediately.

Hotkeys make capture fast.

**Example:** Pressing a key combination to begin region selection.

**See also:** Hotkey Conflict, Menu Bar App

#### Hotkey Conflict

A situation in which two programs or system functions claim the same keyboard shortcut, so one may not work. The user must change one of them.

Conflicts are a source of environment-specific problems.

**Example:** The capture shortcut is already taken by another utility.

**See also:** Global Hotkey, Environment-Specific Bug

#### Human In The Loop

A working arrangement in which a person reviews, approves, or corrects the output of an automated system at key points. It keeps responsibility with the human.

It is central to using coding agents safely.

**Example:** Approving each command before the agent runs it.

**See also:** Human Review, Agent Permissions

#### Human Review

Inspection of AI-generated output by a person to check correctness, fit, and safety. It supplements automated checks.

Review catches problems that tests do not cover.

**Example:** Reading the generated capture code before installing it.

**See also:** Human In The Loop, Specification Review

#### Idle Resource Use

The memory, processor time, or energy a program consumes while running in the background without performing a user-requested task. It is incurred even when the program is not being used.

Menu bar utilities run constantly, so their idle use is paid continually.

**Example:** A capture tool that polls the screen every second while waiting for the user.

**See also:** Resource Footprint, Menu Bar App

#### Input Tokens

Tokens sent to a model, including the prompt, files, and conversation history. They are billed at an input rate.

Large inputs repeated each turn drive cost, which prompt caching reduces.

**Example:** Sending the project files to the model on each step.

**See also:** Output Tokens, Prompt Caching

#### Install Rollback

The ability to restore a system to its prior state when an installation fails or is undone. It limits damage from a faulty install.

Rollback makes installing generated software safer.

**Example:** Restoring the previous version if the new one fails to launch.

**See also:** Installer Script, Uninstall Process

#### Install Size

The amount of disk storage a software product occupies once installed. It includes the program, libraries, and bundled assets.

Install size offers a simple, comparable measure of how much a product has grown.

**Example:** A capture suite that occupies 500 megabytes, compared with a generated app of a few megabytes.

**See also:** Resource Footprint, Zero-Dependency Design

#### Installer Script

A script that places a program and its supporting files in the correct locations on a computer. It automates setup.

It makes a self-built tool easy to deploy to several machines.

**Example:** A command that copies the app to the Applications folder.

**See also:** Install Rollback, Uninstall Process

#### Integration Test

A test that checks that several parts of a program work together correctly. It exercises their connections.

Integration tests find problems that unit tests miss.

**Example:** A test that selection, capture, and clipboard work in sequence.

**See also:** Unit Test, Smoke Test

#### Interface Complexity

The amount and intricacy of controls, menus, settings, and options that a user must understand to operate a program. It grows with each added feature.

Complex interfaces slow users and raise learning costs, even for simple tasks.

**Example:** A preferences window with six tabs for a tool used to take simple screenshots.

**See also:** Cognitive Load, Learning Cost

#### Job To Be Done

The specific task or outcome a person hires a product to accomplish. It describes the need in terms of progress the user wants to make, not the product's features.

Framing the need as a job keeps a specification small and helps judge whether a feature is relevant.

**Example:** "Put a picture of part of my screen on the clipboard" is the job to be done for ScreenGrab.

**See also:** User Need, Single-Purpose Utility

#### Large Language Model

A type of generative AI model trained on very large amounts of text to predict and produce language, including code. It responds to instructions written in natural language.

The model powers the coding agent used in the ScreenGrab case.

**Example:** A model that reads a specification and outputs a Swift program.

**See also:** Generative AI, Token

#### Learning Cost

The time and effort needed for a person to learn to use a product effectively. It is a real expense even though no money changes hands.

Complex tools carry higher learning costs than simple ones.

**Example:** An afternoon learning the settings of a capture suite.

**See also:** Interface Complexity, Total Cost Of Ownership

#### Limits Of Automated Tests

The kinds of problems that automated tests cannot reliably detect, such as visual quality, system permission prompts, and real-world conditions. Passing tests do not prove the software is right.

These limits explain why manual checks remain necessary.

**Example:** All tests pass, yet the permission prompt never appears on a real Mac.

**See also:** Manual Testing, Test Coverage

#### Lines Of Code

A count of the lines in a program's source code, used as a rough measure of its size. It does not directly measure quality or value.

It gives a simple scale for comparing programs and costs.

**Example:** ScreenGrab has about 2,000 lines of Swift.

**See also:** Cost Per Line Of Code, Source Code

#### Long Tail Of Features

The large number of rarely used features in a product, each valuable to only a few users but together making up most of the feature list. The pattern follows from uneven distribution of usage.

The long tail explains how a product can have dozens of features while a typical user touches only a few.

**Example:** Fifty obscure export options that each serve under one percent of users.

**See also:** Unused Features, Pareto Principle

#### Long-Lived Software

Software expected to be used and maintained for many years. It requires attention to documentation, testing, and compatibility.

The ScreenGrab app straddles both categories: cheap to make but worth keeping.

**Example:** A tool used daily across several operating system releases.

**See also:** Disposable Software, Software Maintenance

#### Long-Term Stewardship

The sustained responsibility for caring for a project over years, including maintaining it, reviewing contributions, and guiding its direction. It involves ongoing time.

Open sourcing a tool creates this obligation for the author.

**Example:** Reviewing issues and updating the app for each macOS release.

**See also:** Software Maintenance, Community Contribution

#### Maintenance Cost

The ongoing expense of keeping software working after it is delivered, including fixes, updates for new systems, and support. It continues for as long as the software is used.

Maintenance often exceeds the original creation cost over a long life.

**Example:** Time spent fixing a hotkey that stops working after an operating system update.

**See also:** Software Maintenance, Technical Debt

#### Manual Testing

Testing carried out by a person who operates the software and observes the result. It finds issues that scripted checks miss.

Some behavior, such as the feel of region selection, needs a human.

**Example:** Trying a capture and pasting it into a document.

**See also:** Automated Test, Limits Of Automated Tests

#### Menu Bar App

An application that lives as an icon in the menu bar at the top of the macOS screen and is used from there, usually without a main window. It runs in the background.

The ScreenGrab tool is designed as a menu bar app.

**Example:** Clicking a small icon to start a capture.

**See also:** Idle Resource Use, Global Hotkey

#### Minimal Specification

A specification limited to the essential behavior needed, with extras left out. It is short enough to read in minutes.

Minimal specifications keep generated software small and reviewable.

**Example:** Two features and clipboard output, with nothing else.

**See also:** Non-Goals, Software Specification

#### MIT License

A short, widely used open source license that allows reuse, modification, and distribution with few conditions, mainly keeping the copyright and license notice. It is considered permissive. This entry is not legal advice.

ScreenGrab uses this license.

**Example:** A LICENSE file containing the MIT text.

**See also:** Permissive License, Open Source License

#### Model Capability Tiers

Levels of language model offerings ranked by capability, with more capable models generally costing more and running slower. Vendors typically offer several tiers.

Tiers let users balance quality against cost.

**Example:** A small, fast tier for simple edits and a large tier for complex design.

**See also:** Model Selection, Token Pricing

#### Model Selection

The choice of which language model to use for a task. Models differ in capability, speed, and price.

Selecting a smaller model for simple steps reduces cost.

**Example:** Using a lower-cost model for routine edits and a stronger one for design.

**See also:** Model Capability Tiers, Token Pricing

#### Multi-Year Cost

The cumulative amount spent on a product over several years, including renewals and any upgrades. It shows how small recurring fees accumulate.

Multi-year cost reveals when a subscription exceeds the cost of alternatives.

**Example:** $90 per year over five years totals $450.

**See also:** Annual Fee, Break-Even Point

#### Native Application

A program built for a specific operating system using that system's own tools and interfaces. It usually runs faster and integrates better than cross-platform alternatives.

The generated ScreenGrab app is native to macOS.

**Example:** A Swift app that uses macOS capture interfaces directly.

**See also:** Programming Language Choice, Platform Constraints

#### Natural Language Request

An instruction written in everyday human language instead of a programming language. Language models interpret it to produce an action or output.

Natural language requests let non-programmers specify software.

**Example:** "Add a delay of five seconds before the capture."

**See also:** Prompt, Software Specification

#### Non-Functional Requirement

A requirement describing a quality of the software, such as speed, reliability, size, or security, instead of a specific behavior. It states how well the system works.

These requirements shape footprint and responsiveness.

**Example:** "The app must start in under one second and use little memory."

**See also:** Functional Requirement, Resource Footprint

#### Non-Goals

Explicit statements of what the software will not do. They set limits on the work.

Non-goals prevent the agent and the author from adding features.

**Example:** "No video recording, annotation, or cloud upload."

**See also:** Scope Boundaries, Feature Creep

#### Off-Screen Rendering

Drawing an image or interface in memory without showing it on the display. It lets tests inspect visuals without disturbing the screen.

It supports testing capture logic safely.

**Example:** Creating a test image in memory and cropping it.

**See also:** Test Side Effects, Simulated Input Events

#### One-Time License

A license obtained with a single payment that grants use of a specific version of the software, typically with no further charges for that version. Later versions may require another payment.

The one-time license is the model under which the $9 utility was originally sold.

**Example:** Paying $9 once to use a screen grab tool.

**See also:** Perpetual License, Subscription License

#### Open Source License

A license that grants broad permission to use, change, and distribute software and its source code under stated conditions. Conditions vary by license.

It states the terms for others using the code. This entry is not legal advice.

**Example:** A license file included in a project folder.

**See also:** MIT License, Permissive License

#### Open Source Software

Software whose source code is published and licensed so others can inspect, use, modify, and share it under stated terms. It is developed openly or shared openly.

ScreenGrab is released as open source so others can reuse it.

**Example:** A project on a public site that anyone can download and adapt.

**See also:** Open Source License, Public Repository

#### Operating System Compatibility

The ability of software to run correctly on a given version of an operating system. System updates can break it.

Compatibility is a recurring maintenance concern for utilities.

**Example:** A capture app that stops working after a macOS update.

**See also:** Toolchain Changes, Software Maintenance

#### Opportunity Cost

The value of the best alternative given up when a choice is made. In software decisions it includes time spent on one option that could have been spent elsewhere.

Opportunity cost keeps the build option honest, since the author's time is not free.

**Example:** An hour spent reviewing generated code is an hour not spent on other work.

**See also:** Active Working Time, Build-Or-Buy Decision

#### Output Tokens

Tokens produced by a model in its response, such as generated code or explanations. They are usually billed at a higher rate than input tokens.

Output volume determines a share of the session cost.

**Example:** The Swift code returned by the agent.

**See also:** Input Tokens, Token Pricing

#### Overconfident Reporting

A pattern in which an AI agent states that work is complete or correct without adequate evidence. The claim exceeds what was actually checked.

Recognizing it motivates evidence-based reporting.

**Example:** The agent says "all tests pass" without having run them.

**See also:** Evidence-Based Reporting, AI Hallucination

#### Pareto Principle

The observation that a small share of causes often produces a large share of effects, commonly stated as 80 percent of results from 20 percent of inputs. The specific percentages vary by context.

The Pareto principle gives general support for the 80% rule of thumb applied to software features.

**Example:** A small number of features generate most of a product's real use.

**See also:** 80% Rule Of Thumb, Long Tail Of Features

#### Patch Release

A small release that fixes specific defects without adding major features. It is meant to be quick to apply.

Patch releases let owners fix problems without waiting on a vendor.

**Example:** A version that corrects a capture alignment bug.

**See also:** Software Version, Software Maintenance

#### Per-Computer Licensing

A licensing model that charges separately for each computer on which the software is installed. Total price scales with the number of machines.

Per-computer pricing multiplies cost for people with several devices.

**Example:** $30 per year on each of 3 Macs totals $90 per year.

**See also:** Per-User Licensing, Cost Per Computer

#### Per-User Licensing

A licensing model that charges for each person who uses the software, usually allowing that person to install it on multiple devices. Cost scales with the number of individuals.

Comparing per-user and per-computer licensing shows how the same product can cost different amounts for the same person.

**Example:** A single user pays once and uses the app on a laptop and a desktop.

**See also:** Per-Computer Licensing, Software License

#### Permissive License

An open source license that places few conditions on reuse, allowing the code to be used even in other projects, including commercial ones. It typically requires only a notice. This entry is not legal advice.

It makes sharing easy.

**Example:** A license letting others adapt the tool freely.

**See also:** MIT License, Open Source License

#### Perpetual License

A license that allows a user to use a purchased version of software indefinitely, with no expiration date. Support and upgrades may be separate.

Perpetual licensing lets the cost be spread across many years of use.

**Example:** An app bought in 2018 that still runs on the same Mac today.

**See also:** One-Time License, Subscription License

#### Personal Software

Software created for the needs of one person or a small group, without the aim of broad sale. It fits narrow requirements and is typically small.

Cheaper generation makes personal software practical for ordinary professionals.

**Example:** A capture tool tuned to one person's workflow.

**See also:** Disposable Software, Sharing A Personal Tool

#### Platform Constraints

Limits imposed by the operating system or hardware on what an application can do. They include security rules and available interfaces.

Platform constraints shape design and, for capture tools, require user permission.

**Example:** macOS requires explicit permission before an app can record the screen.

**See also:** Screen Recording Permission, Native Application

#### Power Users

People who use a software product intensively and exploit its advanced features, often providing the demand for complex capabilities. They are typically a minority of the user base.

Power users justify advanced features, but designing for them can burden the majority who need only basics.

**Example:** A technical writer who annotates, blurs, and exports hundreds of screenshots a week.

**See also:** Casual Users, Long Tail Of Features

#### Price Increase

A raise in the amount charged for a product or service. In software it may occur at upgrade, at renewal, or when licensing changes.

A price increase can change the result of a build-or-buy decision after the purchase has been made.

**Example:** A $9 tool moving to $30 per computer each year.

**See also:** Annual Fee, Switching Costs

#### Product Roadmap

A vendor's plan describing which features and improvements a product will receive over future releases. It reflects business priorities as well as user requests.

Roadmaps tend to emphasize additions, which feeds feature creep.

**Example:** A roadmap listing cloud sharing and team dashboards for a tool most users run alone.

**See also:** Feature Creep, Competitive Feature Matching

#### Programming Language Choice

The selection of the language in which software is written. It affects performance, tooling, available libraries, and fit with the platform.

Swift was chosen because it is the standard language for native macOS apps.

**Example:** Choosing Swift over a cross-platform framework.

**See also:** Native Application, Third-Party Dependency

#### Prompt

The text or instructions given to a language model to direct its response. It can include a request, background, examples, and constraints.

Prompt quality strongly affects the quality of generated software.

**Example:** "Build a macOS menu bar app that captures a selected region to the clipboard."

**See also:** Natural Language Request, Prompt Iteration

#### Prompt Caching

A feature that stores previously processed input so repeated content can be reused at lower cost and with faster response. It benefits sessions that resend the same context.

Caching is a major reason an agent session can cost only a few dollars.

**Example:** Reusing the project files from earlier turns at a reduced rate.

**See also:** Cache Write Tokens, Cache Read Tokens, Cache Expiration

#### Prompt Iteration

The practice of refining a prompt through repeated attempts, using each result to improve the next request. It converges on the intended output.

Iteration is the normal way specifications become precise.

**Example:** Adding "do not save to disk" after the first version wrote files.

**See also:** Prompt, Specification Review

#### Proprietary File Format

A data format defined and controlled by a single vendor, often undocumented, which may be readable only by that vendor's software. Users depend on that software to access their files.

Proprietary formats are a common source of lock-in.

**Example:** A library file that only the vendor's editor can open.

**See also:** Vendor Lock-In, Open Source Software

#### Prototype

An early, simplified version of software built to test an idea or assumption. It need not be complete or polished.

A prototype shows quickly whether generation will meet the need.

**Example:** A first version that captures a region but lacks a delay.

**See also:** Technical Feasibility Check, Agent Experiments

#### Public Repository

A Git repository whose contents anyone can view and download. It is hosted on an online service.

It is the usual way to publish open source software.

**Example:** The ScreenGrab project on a public hosting site.

**See also:** Git Repository, Open Source Software

#### Published Cost Comparison

A public, documented comparison of the costs of options, with stated assumptions so others can check it. It shares the evidence behind a decision.

Publishing allows scrutiny and reuse.

**Example:** A table showing $90 per year versus about $14 one time.

**See also:** Cost Comparison, Estimation Assumptions

#### Pull Request

A proposal to merge changes from one copy of a repository into another, submitted for review. The owner may accept or decline.

It is the standard way to contribute to open source.

**Example:** A reader sends a fix for a bug to the project owner.

**See also:** Community Contribution, Forking

#### Purchase Price

The amount paid at the time of acquiring a product. It is only one part of total cost when other charges follow.

Comparing purchase price alone hides recurring costs.

**Example:** $9 for the original utility.

**See also:** Total Cost Of Ownership, One-Time License

#### README File

A text file at the top of a project that explains what it is, how to install it, and how to use it. It is usually the first document a reader sees.

A README makes a personal tool usable by others.

**Example:** Instructions for building and granting permission to ScreenGrab.

**See also:** Documentation For Others, Public Repository

#### Recurring Revenue

Income a business receives repeatedly from the same customers, such as subscription payments, as opposed to one-time sales. It is predictable and often valued highly by investors.

Recurring revenue gives vendors a financial reason to prefer subscriptions.

**Example:** A company with 100,000 subscribers paying $30 yearly collects $3 million each year.

**See also:** Vendor Incentives, Subscription License

#### Region Selection

A way of choosing part of the screen by dragging a rectangle with the pointer. Only the chosen area is captured.

Region selection is the first of the two features of the generated tool.

**Example:** Dragging a box around a chart on screen.

**See also:** Freeze-Frame Selection, Delayed Capture

#### Regression Test

A test that confirms that a previously fixed problem or working behavior has not returned after later changes. It protects past fixes.

Each fixed bug should add a regression test.

**Example:** A test written after fixing the offset bug.

**See also:** Software Bug, Automated Test

#### Replacement Tool Capstone

The culminating project in which a reader replaces a bloated or subscription tool with a small generated one, applying the book's methods from specification through verification. It integrates all earlier topics.

It gives the reader first-hand evidence of the cost and risk trade-offs.

**Example:** A reader specifies, generates, tests, and installs their own utility.

**See also:** ScreenGrab Case Study, Minimal Specification

#### Requirements

Statements of what a system must do or the qualities it must have, to meet the needs of its users. They define the problem before a solution is designed.

Clear requirements keep a small tool small.

**Example:** "Capture a selected area and place it on the clipboard."

**See also:** Functional Requirement, Non-Functional Requirement

#### Resource Footprint

The amount of computing resources a program consumes, including disk space, memory, processor time, and battery. It describes the program's load on the machine.

A large footprint is a visible cost of bloat that affects every computer on which the software runs.

**Example:** A utility that holds hundreds of megabytes of memory while waiting for a hotkey.

**See also:** Install Size, Idle Resource Use

#### Risks Of Ownership

The hazards that come with owning the software you generate, such as defects, security issues, and lack of vendor support. The owner bears them instead of a vendor.

Weighing these risks keeps the generate option from being treated as free.

**Example:** A bug in the capture code that no vendor will fix.

**See also:** Support Responsibility, Software Bug

#### Root Cause Analysis

The investigation of why a bug happened, to find the underlying fault and not just its symptoms. It aims to prevent recurrence.

Finding the cause avoids repeated patches.

**Example:** Discovering that the error came from a wrong coordinate scale.

**See also:** Software Bug, Unexplained Failure

#### Scope Boundaries

The limits that define what is included in and excluded from a project. They separate required work from optional or unrelated work.

Clear boundaries keep effort and cost under control.

**Example:** The app handles still images on one platform only.

**See also:** Non-Goals, Minimal Specification

#### Screen Capture

The act of recording the visual contents of a computer display as a still image or video. It is used for documentation, support, and sharing.

Screen capture is the task that the case-study tool performs.

**Example:** Saving an image of part of a window.

**See also:** Screen Grab Tool, Region Selection

#### Screen Grab Tool

A program that captures part or all of the screen as an image. It may offer options for timing, selection, and output.

The book follows the replacement of one such tool.

**Example:** A utility that copies a selected area to the clipboard.

**See also:** Screen Capture, ScreenGrab Case Study

#### Screen Recording Permission

A macOS privacy setting that must be granted before an application may read screen contents. Without it, captures are blank or limited.

Permission is a platform constraint that every capture tool must handle.

**Example:** Approving ScreenGrab in the privacy settings on first use.

**See also:** Platform Constraints, Ad-Hoc Signing

#### ScreenGrab Case Study

The book's running example: a $9 screen grab utility that became a $30-per-computer annual subscription was replaced by a two-feature macOS app generated with Claude Code. It provides real numbers for cost, time, and tests.

All of the book's concepts are tied back to this example.

**Example:** About 2,000 lines of Swift, 94 tests, and roughly $14 in estimated session cost.

**See also:** Screen Grab Tool, Replacement Tool Capstone

#### Session Cost Breakdown

A division of a session's total cost into its parts, such as input, output, and cache tokens or phases of work. It shows where money went.

The breakdown guides how to run cheaper sessions.

**Example:** Most of the $14 came from reading cached context.

**See also:** Cost-Weighted Tokens, Token-Heavy Activities

#### Session Log

A recorded transcript of an AI session, including prompts, agent actions, and outputs. It can be reviewed later.

Logs provide evidence for timing, token use, and decisions.

**Example:** Reading the log to find when the delay feature was added.

**See also:** AI Session, Usage Measurement

#### Sharing A Personal Tool

Making software built for one's own needs available to others, along with the license and documentation needed to use it. It turns a private tool into a public resource.

Sharing multiplies the value of a one-time generation.

**Example:** Publishing ScreenGrab so others avoid the subscription.

**See also:** Personal Software, Public Repository

#### Simulated Input Events

Artificial keyboard or mouse actions generated by code to mimic user behavior during testing. They allow interaction to be tested automatically.

Simulation lets tests exercise selection and hotkeys.

**Example:** A test that sends a drag from one point to another.

**See also:** Automated Test, Off-Screen Rendering

#### Single-Purpose Utility

A small program designed to perform one task well, with a limited interface and few options. It trades breadth of capability for simplicity and predictability.

The generated ScreenGrab app is a single-purpose utility, in contrast to the multipurpose products it replaces.

**Example:** A tool that only captures a screen region and copies it to the clipboard.

**See also:** Unix Philosophy, Minimal Specification

#### Smoke Test

A quick, basic test to confirm that a program starts and its main functions work at all. Failure means deeper testing is not worth starting.

It is a fast check after each build.

**Example:** Launch the app and capture one image.

**See also:** Integration Test, Verification Plan

#### Software

A set of instructions, written by people, that a computer follows to perform tasks. It is stored as files and runs on hardware without being physically consumed, so it can be copied, sold, or shared at almost no marginal cost.

Software is the subject of every decision in this book, from the utility you buy to the one you generate.

**Example:** A screen capture program is software; the same instructions can run on thousands of Macs.

**See also:** Software Product, Source Code

#### Software As A Service

A delivery model in which software is hosted by a vendor and accessed through the internet for ongoing payment, instead of being installed and owned by the customer. The vendor manages updates and infrastructure.

The model shifted many products from purchases to rentals.

**Example:** A web-based image editor billed monthly.

**See also:** Subscription License, Recurring Revenue

#### Software Bloat

The growth of a software product in features, size, and resource demands beyond what most of its users need for their tasks. Bloat raises complexity, cost, and risk without matching benefit for typical users.

Bloat is the central problem of this book and the motivation for generating a smaller alternative.

**Example:** A tool that began as a simple screen grabber and grew into a video editor and cloud service is bloated for someone who needs one screenshot.

**See also:** Feature Creep, Bloatware, Unused Features

#### Software Bug

A defect in software that causes it to behave differently from what is intended. It may come from code, design, or environment.

Bugs are inevitable and must be found and fixed.

**Example:** The capture includes the selection border by mistake.

**See also:** Bug Reproduction, Root Cause Analysis

#### Software Design

The process and result of deciding how a program will be structured to meet its requirements. It covers components, data, and interactions.

Design choices determine how simple the finished program is.

**Example:** Separating the capture logic from the user interface.

**See also:** Design Document, Design Decision

#### Software Feature

A distinct capability of a software product that a user can invoke to accomplish a specific task. Each feature adds code, interface elements, and testing obligations to the product.

Counting features is the starting point for measuring bloat and for deciding which capabilities are worth keeping.

**Example:** "Capture after a five-second delay" is one feature of a screen grab tool.

**See also:** Feature Set, Software Bloat

#### Software License

A legal agreement that grants a user specific permissions to use, copy, or modify software, along with limits and conditions. It defines what the buyer actually receives, which is usually the right to use and not ownership of the code.

License type determines whether costs are one-time, recurring, per computer, or free.

**Example:** A license that allows installation on one Mac for a single payment.

**See also:** End User License Agreement, One-Time License

#### Software Maintenance

The work of keeping software usable over time, including fixing defects, adapting to new systems, and making improvements. It continues through the software's life.

Maintenance determines whether a tool stays useful.

**Example:** Updating the app after a new macOS release.

**See also:** Maintenance Cost, Operating System Compatibility

#### Software Product

Software packaged, named, and offered to customers under defined terms of sale or licensing, usually with documentation, updates, and support. It is distinguished from code written only for internal use by being delivered to an external audience.

The commercial packaging of software explains why vendors add features and change pricing over time.

**Example:** A $9 screen grab application sold on a website is a software product.

**See also:** Software License, Software Feature

#### Software Release Cycle

The recurring schedule and process by which a vendor prepares, tests, and distributes new versions of a software product to customers. The cycle can be annual, monthly, or continuous.

Short release cycles encourage steady feature additions and recurring payments, which contributes to bloat.

**Example:** A vendor that ships a major version every year is on an annual release cycle.

**See also:** Upgrade Treadmill, Software Version

#### Software Specification

A written description of what a program should do and the constraints it must meet. It guides design, construction, and testing.

The specification is the main input to a coding agent.

**Example:** A one-page document describing the two capture features.

**See also:** Minimal Specification, Requirements

#### Software Testing

Running a program under controlled conditions to find defects and check behavior against expectations. Tests may be automated or manual.

Testing supplies evidence that the software works.

**Example:** Capturing a region and checking the clipboard contents.

**See also:** Automated Test, Manual Testing

#### Software Verification

The activities that confirm software meets its specification and works correctly. They include tests, inspection, and manual checks.

Verification is what makes generated code trustworthy.

**Example:** Running the tests and trying each feature by hand.

**See also:** Software Testing, Verification Plan

#### Software Version

A uniquely identified state of a software product at a specific point in its development, usually labeled with a number. Different versions can differ in features, fixes, and system requirements.

Version numbers matter here because upgrade pricing and compatibility depend on them.

**Example:** Moving from version 2024 to version 2025 of a utility may add features and require a new payment.

**See also:** Software Release Cycle, Patch Release

#### Source Code

The human-readable instructions of a program, written in a programming language. It is converted into a runnable form by a compiler.

Owning source code lets you change and inspect the software.

**Example:** The roughly 2,000 lines of Swift in ScreenGrab.

**See also:** Lines Of Code, Open Source Software

#### Specification Review

A check of a written specification for errors, gaps, and ambiguity before construction begins. Reviewers compare it with the actual need.

Reviewing the specification is cheaper than correcting generated code.

**Example:** Spotting that the specification never says what happens on cancel.

**See also:** Software Specification, Human Review

#### Stubbed Dependency

A simplified stand-in that replaces a real component during a test, returning fixed responses. It removes reliance on the real thing.

Stubs allow testing without the real screen or permissions.

**Example:** A fake screen source that returns a known image.

**See also:** Test Isolation, Unit Test

#### Subscribe Option

The choice to access software by paying recurring fees for as long as it is needed. Access ends when payment stops.

It lowers upfront cost but adds continuing cost and dependence.

**Example:** Paying $90 per year to use a capture tool on 3 Macs.

**See also:** Subscription License, Buy Option

#### Subscription License

A license that grants use of software only while recurring payments are made, typically monthly or yearly. When payments stop, access ends or becomes limited.

Subscriptions turn software into an ongoing expense and give the vendor continuing revenue.

**Example:** A utility that stops capturing images when the yearly fee lapses.

**See also:** Annual Fee, Recurring Revenue

#### Subscription Usage Window

The period and allowance within which a subscription plan permits a certain amount of AI usage, after which use is limited or reset. It gives a fixed price for bounded use.

Under a plan, the user pays a flat fee instead of per-token rates.

**Example:** A plan that resets its allowance every few hours.

**See also:** API Cost Estimate, Cost-Weighted Tokens

#### Support Responsibility

The obligation to diagnose and resolve problems when software fails. With generated software, the owner holds this duty.

It is a trade for the independence gained from not depending on a vendor.

**Example:** Fixing the app yourself when a new macOS release breaks it.

**See also:** Risks Of Ownership, Maintenance Cost

#### Switching Costs

The money, time, and effort a user must spend to move from one product to another. They include relearning, converting data, and lost customization.

High switching costs let vendors raise prices with less fear of losing customers.

**Example:** Relearning shortcuts and moving saved screenshots to a new tool.

**See also:** Vendor Lock-In, Learning Cost

#### Technical Debt

The future cost created by shortcuts or poor choices in software that make later changes harder. Like financial debt, it accrues interest.

Even generated code can accumulate debt.

**Example:** Duplicated code that must be changed in two places.

**See also:** Software Maintenance, Third-Party Dependency

#### Technical Feasibility Check

A quick investigation to determine whether a proposed approach can work with the available technology. It reduces the risk of building something impossible.

It prevents wasted effort on a design that the platform will not allow.

**Example:** Confirming that an app can read screen contents given system permissions.

**See also:** Platform Constraints, Prototype

#### Test Coverage

The portion of a program's code or behavior that is exercised by tests, usually given as a percentage. High coverage does not guarantee correctness.

Coverage shows where tests may be missing.

**Example:** Tests that run 85 percent of the lines.

**See also:** Automated Test, Limits Of Automated Tests

#### Test Isolation

The practice of designing tests so they do not depend on or affect each other or the real environment. Each test starts from a known state.

Isolation makes results reliable and repeatable.

**Example:** A test that uses a fake clipboard instead of the real one.

**See also:** Test Side Effects, Stubbed Dependency

#### Test Side Effects

Unintended changes to the real system caused by running a test, such as altering files or the clipboard. They can disrupt the user or other tests.

Avoiding them keeps testing safe.

**Example:** A test that overwrites the developer's clipboard.

**See also:** Test Isolation, Stubbed Dependency

#### Third-Party Dependency

Code written by someone else that a program relies on in order to work. It brings both convenience and risk.

Dependencies add size, update burden, and potential breakage.

**Example:** A package for capturing hotkeys that must be kept up to date.

**See also:** Zero-Dependency Design, Technical Debt

#### Time To First Install

The elapsed time from starting a project to having a working version installed and usable on a computer. It measures how quickly value arrives.

A short time to first install makes the generated route competitive with buying.

**Example:** A working app on the machine within the first hour.

**See also:** Wall-Clock Time, Prototype

#### Token

The basic unit of text a language model reads and writes, typically a word fragment of a few characters. Usage and pricing are counted in tokens.

Tokens are the unit of cost for AI-generated software.

**Example:** The word "screenshot" may be split into two tokens.

**See also:** Input Tokens, Output Tokens, Token Pricing

#### Token Pricing

The rates a provider charges per unit of tokens, usually per million, with different rates for input, output, and cached tokens. Rates vary by model.

Pricing converts token counts into dollars.

**Example:** A model priced per million input and output tokens.

**See also:** Input Tokens, API Cost Estimate

#### Token-Heavy Activities

Tasks that consume a large number of tokens, such as reading many files, long debugging loops, or generating large outputs. They raise session cost.

Knowing them helps control spend.

**Example:** Repeatedly rereading the whole project during debugging.

**See also:** Usage Measurement, Session Cost Breakdown

#### Toolchain Changes

Updates to compilers, languages, and build tools that can require changes to existing code. Old code may stop building.

They add periodic upkeep to any project.

**Example:** A new Swift version that rejects older syntax.

**See also:** Developer Toolchain, Patch Release

#### Total Cost Of Ownership

The full cost of acquiring and using a product over its lifetime, including purchase price, recurring fees, maintenance, learning, and support. It extends beyond the sticker price.

Total cost of ownership is the main analytical frame of this book.

**Example:** A subscription's yearly fee, multiplied by years of use and number of computers.

**See also:** Purchase Price, Multi-Year Cost, Maintenance Cost

#### Unexplained Failure

A failure whose cause has not been found. Software may behave wrongly without an obvious reason.

Admitting that a failure is unexplained is more honest than guessing.

**Example:** The app fails once on startup and cannot be reproduced.

**See also:** Root Cause Analysis, Overconfident Reporting

#### Uninstall Process

The steps that remove a program and its files from a computer. A clean process leaves no stray components.

A simple uninstall is a benefit of small tools.

**Example:** Deleting the app and its preference file.

**See also:** Installer Script, Install Rollback

#### Unit Test

An automated test that checks one small piece of code, such as a function, in isolation. It runs quickly.

Unit tests make up most of the 94 tests in the case study.

**Example:** A test that a delay of five seconds is calculated correctly.

**See also:** Integration Test, Test Isolation

#### Unix Philosophy

A design tradition holding that each program should do one thing well and that small programs should be combinable to accomplish larger tasks. It favors simplicity, modularity, and clear interfaces.

This tradition supports the book's argument that small, focused tools are often better than feature-heavy suites.

**Example:** A command that only sorts text lines is designed in the Unix tradition.

**See also:** Single-Purpose Utility, Software Bloat

#### Unused Features

Features that are present in a product but are never or rarely invoked by a given user or by most users. They still contribute to code size, interface clutter, and cost.

Unused features represent the part of a purchase price and subscription fee that buys nothing for the user.

**Example:** A user who never records video still pays for and installs the recording module.

**See also:** Cost Per Feature Used, Software Bloat

#### Upgrade Revenue

Income earned when existing customers pay to move to a newer version of a product. It depends on persuading them that the new version is worth the price.

Chasing upgrade revenue motivates new features whether or not customers need them.

**Example:** A paid upgrade that adds features few users want.

**See also:** Upgrade Treadmill, Vendor Incentives

#### Upgrade Treadmill

A pattern in which users must repeatedly pay for or install new versions to keep access to features, compatibility, or support, without gaining proportionate benefit. The cycle continues as long as the product is used.

The treadmill converts a one-time purchase into an ongoing obligation.

**Example:** A utility whose old version stops working on a new operating system, forcing a paid upgrade.

**See also:** Upgrade Revenue, Software Release Cycle

#### Usage Measurement

The recording and analysis of how many tokens or how much time a session uses. Measurement requires logs or reports from the tool.

Without measurement, cost claims cannot be checked.

**Example:** Reading the totals reported at the end of a session.

**See also:** Session Log, Token

#### Usage Telemetry

Data automatically collected from running software about how it is used, such as which features are invoked and how often, and sent to the vendor for analysis. Collection is typically governed by privacy settings.

Vendors use telemetry to decide which features to keep and promote, though results are rarely shared with customers.

**Example:** A utility reports to its vendor that the delay timer was used in 3 percent of sessions.

**See also:** Feature Usage, Product Roadmap

#### User Need

A requirement stated from the user's perspective about what they must accomplish or obtain. It explains why a feature is wanted.

Starting from user need avoids building features nobody asked for.

**Example:** "I need to paste a part of my screen into a document quickly."

**See also:** Job To Be Done, Requirements

#### Vendor Incentives

The financial and strategic motives that influence a seller's decisions, such as pricing, features, and licensing. They may differ from the interests of customers.

Understanding incentives explains why products shift from one-time purchases to subscriptions.

**Example:** A vendor adds features each year to justify a recurring fee.

**See also:** Recurring Revenue, Upgrade Revenue

#### Vendor Lock-In

A situation in which a customer cannot easily leave a vendor's product because of high switching costs, proprietary formats, or dependence on its services. The vendor gains pricing power as a result.

Lock-in is a risk to weigh when comparing buy and subscribe options.

**Example:** Years of captures stored in a format only one tool can open.

**See also:** Switching Costs, Proprietary File Format

#### Verification Plan

A written outline of how and in what order software will be checked, including automated and manual steps. It states what counts as passing.

A plan keeps verification complete and reportable.

**Example:** A checklist of tests plus three manual trials.

**See also:** Software Verification, Verification Status

#### Verification Status

A statement of what has been checked, how, and with what result, including what has not been checked. It reports the state of confidence.

Clear status prevents overstated claims.

**Example:** "94 automated tests pass; manual permission flow not yet tried."

**See also:** Evidence-Based Reporting, Verification Plan

#### Version Control

A system that records changes to files over time so earlier states can be recovered and changes compared. It supports collaboration.

Version control gives a history of how generated code evolved.

**Example:** Using Git to track each change to the app.

**See also:** Git Repository, Git Commit

#### Wall-Clock Time

The elapsed real-world time from the start to the end of a task, including waiting and idle periods. It is measured by a clock on the wall.

It differs from the time a person actively spends.

**Example:** A session that spans several hours including breaks.

**See also:** Active Working Time, Time To First Install

#### Zero-Dependency Design

A design that uses only the platform's built-in capabilities and no outside code libraries. It reduces size and avoids external breakage.

It makes the generated app small and easier to maintain.

**Example:** An app using only Apple's frameworks.

**See also:** Third-Party Dependency, Install Size

