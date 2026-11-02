# Chapters

This textbook is organized into 15 chapters covering 206 concepts.

## Chapter Overview

1. [Software Features and the Anatomy of Bloat](01-software-bloat/index.md) - Defines software, features, versions, and release cycles, then shows how bloat, feature creep, and growing resource footprints arise, contrasted with the single-purpose utility.
2. [Feature Usage and the 95/5 Rule](02-feature-usage/index.md) - Examines how people actually use software, covering power and casual users, the long tail of features, interface complexity, and the roadmap pressures that keep adding features.
3. [Licenses, Subscriptions, and Vendor Incentives](03-licenses-subscriptions/index.md) - Compares one-time licenses with subscriptions, starting from copyright, and explains how recurring revenue, switching costs, and lock-in change what vendors choose to build and charge.
4. [Total Cost of Ownership](04-total-cost-of-ownership/index.md) - Teaches readers to calculate per-computer and multi-year costs, break-even points, and the hidden maintenance, learning, and opportunity costs behind a software choice.
5. [Generative AI and Coding Agents](05-generative-ai-coding-agents/index.md) - Introduces generative AI, source code, and coding agents such as Claude Code, covering prompts, sessions, permissions, human review, hallucination, and overconfident reporting.
6. [Build or Buy and the Rise of Personal Software](06-build-or-buy/index.md) - Frames buy, subscribe, and generate as three options, and weighs disposable and long-lived personal software against the risks and support duties of owning a tool.
7. [Requirements and Minimal Specifications](07-requirements-minimal-specs/index.md) - Moves from user needs to functional requirements, non-goals, and acceptance criteria, showing how a specification that leaves features out defines ScreenGrab's region, delay, and clipboard scope.
8. [Software Design and Platform Constraints](08-software-design-platform/index.md) - Covers design decisions, trade-offs, prototypes, and zero-dependency design, then applies them to ScreenGrab's menu bar app, global hotkey, screen recording permission, and freeze-frame selection.
9. [Generating, Building, and Installing the Code](09-generating-building-installing/index.md) - Follows generation through compiling, build and installer scripts, code signing, and Git, and closes by assembling the complete ScreenGrab case study.
10. [Tokens, Prompt Caching, and Token Pricing](10-tokens-caching-pricing/index.md) - Explains input, output, cache write, and cache read tokens, along with context windows, cache expiration, pricing, and how model tiers affect selection.
11. [Measuring an AI Session: Time and Cost](11-measuring-ai-session/index.md) - Applies token pricing to real sessions, separating wall-clock from active time and breaking the $6 build and $14 session into their cost drivers and assumptions.
12. [Software Testing: Automated and Manual](12-software-testing/index.md) - Introduces verification, unit and integration tests, isolation, stubs, and simulated input, then the manual, acceptance, and smoke tests that automation cannot replace.
13. [Bugs, Evidence, and Verification Plans](13-bugs-evidence-verification/index.md) - Works through reproduction, root cause analysis, and unexplained failures, then teaches evidence-based reporting and verification plans that separate automated tests from checks a person must run.
14. [Maintenance and Open Source Sharing](14-maintenance-open-source/index.md) - Covers technical debt, operating system and toolchain changes, and patch releases, then open source licensing, public repositories, forks, pull requests, and long-term stewardship.
15. [The Final Decision and the Capstone Project](15-decision-and-capstone/index.md) - Brings the course together with decision criteria, a decision matrix, and cost per feature used, leading to the capstone: build a replacement tool and publish a cost comparison.

## How to Use This Textbook

Read the chapters in order the first time through. The sequence follows the book's argument, from how software bloats, to what it costs, to generating, measuring, verifying, and maintaining a replacement, and every concept appears only after the concepts it depends on. Chapter 15 draws on nearly everything before it, so if you plan to complete the capstone, start thinking early about which paid tool you want to replace.

---

**Note:** Each chapter includes a list of concepts covered. Make sure to complete prerequisites before moving to advanced chapters.
