---
title: 'Course Description for Course ScreenGrab: Software Bloat and the Generated Alternative'
description: 'A detailed course description for ScreenGrab: Software Bloat and the Generated Alternative including overview, topics covered and learning objectives in the format of the 2001 Bloom Taxonomy'
quality_score: 100
---

# Course Description

## Title

ScreenGrab: Software Bloat and the Generated Alternative

## Summary

This short course uses one small utility to show how software bloats, and what
generative AI now makes possible when it does. It follows a real case: replacing a
paid screen grab tool with a custom app that does only what its one user needs.

## The Story

### How a simple tool became a subscription

The story starts with a simple screen grab utility that cost $9 and ran on all of
the author's computers. Over the years it gained many more features, and it now
requires an annual fee of $30 per computer.

The author has three main computers, so the same job now costs $90 a year, or $450
over five years, compared with the original $9.

This is the core pattern of software bloat. As a rule of thumb, 95% of users use only
5% of the features. Everyone still pays for the rest, including people who never open
them.

### The alternative: generate only what you need

Generative AI offers another way out. Instead of paying for a large product or
searching for a smaller one, a user can describe the few features they actually use
and generate their own tool. The author needed just two: grab a region, and grab a
region after a delay, with the image going to the clipboard.

### How the first version was built

The author gave Claude Code a short request, answered four multiple-choice questions,
and later asked for it to be installed with a README. The work moved through a set
order: specification, design, code, tests, and installer.

| Result at first install | Amount |
|---|---|
| App code | about 2,000 lines of Swift in 19 files, with no third-party dependencies |
| Tests | about 1,370 lines, with 94 automated tests |
| Install and build scripts | about 500 lines |
| Specification, design, and README | about 1,340 lines |
| **Total** | **about 5,200 lines** |

| Stage | Wall-clock time from first prompt | New tokens, including output | Output tokens | Cache reads | Estimated API cost |
|---|---|---|---|---|---|
| Built and installed | about 36 minutes | about 500,000 | about 206,000 | about 3.8 million | **about $6** |
| First real screen grab | about 44 minutes | about 573,000 | about 238,000 | about 6.3 million | about $8 |
| Whole session, including hotkey testing | about 70 active minutes | about 1.15 million | about 325,000 | about 18.9 million | **about $14** |

These costs are estimates. They apply Claude Opus 5.5 API prices of $20 per million
output tokens and $0.20 per million cache reads, and treat all other new tokens as cache
writes at $5 per million. The session started on the cheaper Sonnet 5.5 and ran on a
subscription rather than the API, where the build used about 5% of one five-hour usage
window. The figures cover the code only. They exclude generating this textbook, the
author's own time, and later maintenance.

### The results

- The app is installed, and grabs from both the menu and the Control-Shift-4 hotkey
  have been seen working.
- At about $6 to build and about $14 for the whole session, the first version cost less
  than one-sixth of a single year's $90 in fees.
- The current version is fully open source under the MIT License, and everyone can use
  it without any fee.
- The work wasn't flawless. One early hotkey failure was never explained, several
  acceptance tests still have to be run by hand, and a later fix was needed for Macs
  with only the Command Line Tools.

## Audience

Adult continuing education and professional development learners: technically curious
computer users, students, and software professionals who pay for software they barely
use, and who want to judge when generating a tool is a better choice than buying one.

## Prerequisites

- Comfort installing and using desktop applications
- Basic familiarity with the command line and Git
- No Swift or macOS programming experience is required

## Topics

1. Software bloat and how it develops
2. Feature usage and the 95/5 rule of thumb
3. One-time licenses compared with subscriptions
4. Total cost of ownership across several computers
5. Build-or-buy decisions in the age of generative AI
6. Writing requirements that leave features out
7. Working with an AI coding agent: specification, design, code, and tests
8. Measuring AI work: wall-clock time, tokens, and cost
9. Verifying generated software, including what tests can't confirm
10. Maintaining and sharing a personal tool as open source

## Topics Not Covered

- Teaching Swift or AppKit programming
- The internals of large language models
- Comparing screen grab products
- Legal advice on software licensing

## Learning Outcomes

By the end of this course, the reader will be able to:

**Remember**

- Define software bloat.
- Name the stages of the AI-assisted build process.
- List the token types that determine API cost.

**Understand**

- Explain why products gain features most of their users never use.
- Describe how one-time licenses and subscriptions change a vendor's incentives.
- Explain why a specification that leaves features out can reduce the cost of generating
  software.

**Apply**

- Calculate the multi-year cost of a per-computer subscription.
- Write a minimal specification for a small tool.
- Estimate a session's API cost from its token counts.

**Analyze**

- Break a session's cost into input, output, and cache tokens.
- Compare a product's feature list with how it's actually used.
- Identify which parts of an AI session used the most tokens, and why.

**Evaluate**

- Decide whether to buy, subscribe to, or generate a tool, taking verification and
  maintenance into account.
- Judge whether generated software has been verified enough to rely on.
- Assess the long-term costs of maintaining a personal tool.

**Create**

- Use an AI coding agent to generate, test, and install a small single-purpose utility.
- Write a verification plan that separates automated tests from checks a person must run.
- **Capstone project:** Choose a paid tool you use, specify only the features you need,
  generate and test a replacement, and publish a cost comparison.
