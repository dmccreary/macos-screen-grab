---
title: 'ScreenGrab: Software Bloat and the Generated Alternative'
description: 'A free, single-purpose macOS menu bar app that copies a dragged region of the screen to the clipboard, with no subscription and no network access.'
image: img/cover.png
hide:
  - toc
---
<style>
.md-content__inner h1 {display: none !important;}
</style>

# ScreenGrab: Software Bloat and the Generated Alternative

<figure markdown>
  ![ScreenGrab: Software Bloat and the Generated Alternative. Cover image of Pinch the hermit crab surrounded by a crowded toolbar, a price tag rising from $9 to $30 per year, an 80% and 20% usage bar, a screen region selection, a prompt turning into Swift code, and a $14 cost gauge on an indigo background](./img/cover.png){ width="100%" }
</figure>

**A $9 screen grab tool became a $30-per-year subscription. A custom replacement took about $14 of AI work.**

A utility that once cost $9 now charges $30 per computer every year, and the
author runs it on three Macs. ScreenGrab is the answer: a free, single-purpose
macOS menu bar app that copies a dragged region of the screen to the clipboard,
with no subscription and no network access. It does two things: grab a region,
and grab a region after a delay.

This intelligent textbook uses that one small utility to show how software
bloats, what it costs, and what generative AI makes possible when you describe
the few features you actually use and generate your own tool.

## The Case in Numbers

| Measure | Result |
|---|---|
| Original price of the paid tool | $9 - one time perpetual license of $30  |
| Current price | $30 per computer per year, or $90 a year on three Macs |
| Features rarely or never used | about 80% ([Pendo, 2019](https://www.pendo.io/resources/the-2019-feature-adoption-report/)) |
| ScreenGrab at first install | about 2,000 lines of Swift, 94 automated tests, no third-party dependencies |
| Estimated AI cost to build and install | about $6 |
| Estimated cost of the whole session | about $14 |
| License | MIT, free for everyone |

The cost figures are estimates of API prices for the code only. They exclude
the author's time, this textbook, and later maintenance. Chapter 11 shows how
they were calculated.

## Who This Book Is For

Technically curious computer users, students, and software professionals who
pay for software they barely use and want to judge when generating a tool is a
better choice than buying one. You need to be comfortable installing desktop
apps and have basic familiarity with the command line and Git. No Swift or
macOS programming experience is required.

## What You Will Learn

1. How software bloat develops and why about 80% of features are rarely or never used
2. How one-time licenses, subscriptions, and vendor incentives differ
3. How to calculate total cost of ownership across several computers
4. When to buy, subscribe, or generate
5. How to write requirements that leave features out
6. How to work with an AI coding agent from specification to tests
7. How tokens, prompt caching, and pricing determine what a session costs
8. How to verify generated software, including what tests cannot confirm
9. How to maintain a personal tool and share it as open source

## How to Use This Book

Read the [chapters](chapters/index.md) in order the first time through. Each
concept appears only after the concepts it depends on.

- [**Chapters**](chapters/index.md) — 15 chapters, each with a quiz and annotated references
- [**Learning Graph**](learning-graph/index.md) — how the 206 concepts depend on each other
- [**MicroSims**](sims/index.md) — interactive simulations, including cost calculators and a ScreenGrab component map
- [**Glossary**](glossary.md) — definitions of the 206 key terms
- [**FAQ**](faq.md) — answers to common questions
- [**Specification**](specification.md) and [**Design**](design.md) — the real documents behind the ScreenGrab build
- [**Appendices**](appendices/snagit-prices-history.md) — Snagit price history, 2010–2026
- [**About**](about.md) and [**Course Description**](course-description.md) — audience, prerequisites, and learning outcomes

## Getting Started

Start with [Chapter 1: Software Features and the Anatomy of Bloat](chapters/01-software-bloat/index.md).
If you want the finish line first, read
[Chapter 15: The Final Decision and the Capstone Project](chapters/15-decision-and-capstone/index.md),
where you build a replacement for a paid tool of your own and publish a cost
comparison.

!!! mascot-welcome "Welcome! I'm Pinch."
    ![Pinch waving welcome](img/mascot/welcome.png){ class="mascot-admonition-img" }
    Grab only what you need! I'll show you how a tiny tool can beat a big one.
