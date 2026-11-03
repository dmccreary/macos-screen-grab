---
title: "About This Book"
description: "About ScreenGrab: Software Bloat and the Generated Alternative — its purpose, audience, design, and the author behind it."
---

# About This Book

## Welcome from Pinch

!!! mascot-welcome "Welcome!"
    ![Pinch the hermit crab waving welcome](./img/mascot/welcome.png){ class="mascot-admonition-img" }
    I'm Pinch. I carry one shell and nothing else, which makes me a good guide for a book about software you carry but never use. We'll follow one real case, a $9 screen grab tool that grew into a yearly fee, and see what it takes to generate a tool that does only what you need. Grab only what you need!

## Why This Intelligent Textbook

Most people pay for software they barely use, and few ever ask what the alternative would cost. Generative AI has changed that question. For the first time, an ordinary user can describe the two features they actually need and have a working tool built in an afternoon.

This book makes that choice concrete with one documented case, drawn from the author's own screen grab utility:[^1]

- The original tool cost **$9** and ran on all of the author's computers. It now requires an annual fee of **$30 per computer**.
- With three main computers, the same job costs **$90 a year**, or **$450 over five years**.
- About **80% of the features in a typical product are rarely or never used** ([Pendo, 2019](https://www.pendo.io/resources/the-2019-feature-adoption-report/)), yet everyone pays for them.
- The replacement app is about **5,200 lines** in total, including roughly **2,000 lines of Swift** and **94 automated tests**.
- The first version was built and installed in about **36 minutes** for an estimated **$6** in API cost, and the whole session cost about **$14**.[^2]

Those figures are one author's experience and the cost numbers are estimates, so the book treats them as a worked example to question, not a law. It also records what went wrong: an unexplained hotkey failure, acceptance tests that still need a human, and a later fix for Macs with only the Command Line Tools.

If you are deciding what to buy, build, or stop paying for, this book gives you the vocabulary and the arithmetic to decide with evidence.

This textbook is built on a **learning graph of 206 interconnected concepts** organized into 12 categories, from software bloat and licensing through generative AI, requirements, testing, and open source. Concepts are introduced in prerequisite order, so understanding builds from chapter to chapter. **Interactive MicroSims** let you change the numbers yourself, such as break-even points, token costs, and feature usage. The whole book is **open source and free**, with no paywalls and no access codes.

## How to Use This Book

This textbook is designed for self-paced study. Each chapter builds on the previous ones, so reading in order is recommended. The book includes:

- **15 chapters** covering software bloat, feature usage, licenses and subscriptions, total cost of ownership, AI coding agents, build-or-buy decisions, requirements, design, building and installing, tokens and pricing, measuring AI sessions, testing, bugs and evidence, maintenance and open source, and a capstone decision
- **Interactive MicroSims**, more than 30 browser-based simulations you can adjust to explore each idea
- **A quiz** at the end of every chapter to test your understanding
- **References** for every chapter
- **A glossary** with definitions for all 206 concepts
- **An FAQ** with answers to common questions
- **A learning graph** that visualizes the concept dependencies
- **Search** from any page using the search bar

The [Learning Graph](learning-graph/index.md) shows how concepts connect across chapters. If you want to explore non-linearly or check the prerequisites for a topic, start there. Adult learners with comfort installing desktop apps and basic command line and Git skills will be well prepared. No Swift or macOS programming experience is required.

## About the Author

![Dan McCreary](./img/dan-headshot-small.png){ width="150px" align="right"}

Dan McCreary is a semi-retired AI researcher, solution architect, and
educator who has spent more than three decades helping Fortune 100
organizations reason over massive datasets. At Optum he founded the
Generative AI Center of Excellence and led the team that built one of the
world's largest healthcare knowledge graphs — spanning over 25 billion
vertices — to unify member, provider, and patient insights. Dan's deep
background in knowledge representation and systems thinking underpins the
precise learning graphs and intelligent textbook workflows used throughout
this course.

He is the co-author of *Making Sense of NoSQL* (Manning Publications), the
founding chair of the NoSQL Now! conference, and a frequent keynote speaker
on semantic search, ontology strategy, and AI hardware. Beyond industry, Dan
has mentored students as a STEM volunteer since 2014 and now applies the same
rigor to building open educational resources. You can visit the
[Intelligent Textbooks Case Studies](https://dmccreary.github.io/intelligent-textbooks/case-studies/)
to see over 87 textbooks that Dan has created or co-created with other
authors.

**Selected Credentials**

- B.A. in Physics and Computer Science from Carleton College
- M.S.E.E. from the University of Minnesota
- MBA coursework at the University of St. Thomas
- Patent holder in semantic search and ontology management techniques
- Advocate for large-scale Enterprise Knowledge Graph adoption across
  healthcare and education
- Long-time promoter of accessible, low-cost AI-powered learning experiences

## How to Cite This Book

If you reference this textbook in academic work, curriculum proposals,
lesson plans, or other publications, please use one of the following
citation formats.

**APA (7th edition)**

McCreary, D. (2026). *ScreenGrab: Software Bloat and the Generated Alternative*. https://dmccreary.github.io/macos-screen-grab/

**Chicago (17th edition)**

McCreary, Dan. 2026. *ScreenGrab: Software Bloat and the Generated Alternative*. https://dmccreary.github.io/macos-screen-grab/.

**MLA (9th edition)**

McCreary, Dan. *ScreenGrab: Software Bloat and the Generated Alternative*. 2026, dmccreary.github.io/macos-screen-grab/.

**BibTeX**

```bibtex
@book{mccreary2026screengrab,
  title     = {ScreenGrab: Software Bloat and the Generated Alternative},
  author    = {McCreary, Dan},
  year      = {2026},
  url       = {https://dmccreary.github.io/macos-screen-grab/},
  note      = {Interactive intelligent textbook}
}
```

To cite a specific chapter, append the chapter number and title — for
example:

McCreary, D. (2026). Chapter 1: Software Features and the Anatomy of Bloat. In
*ScreenGrab: Software Bloat and the Generated Alternative*. https://dmccreary.github.io/macos-screen-grab/chapters/01-software-bloat/

## License

The ScreenGrab app's source code is released under the MIT License. The book's
written content is released under the
[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
License (CC BY-NC-SA 4.0)](license.md). You are free to share and adapt the
material for non-commercial purposes as long as you give appropriate credit
and share your adaptations under the same license.

## References

[^1]: McCreary, D. (2026). *Course Description: ScreenGrab: Software Bloat and the Generated Alternative*. [The Story](course-description.md). Prices and fees are the author's own figures, not independently audited statistics. The 80% rule of thumb comes from Pendo's 2019 Feature Adoption Report, a vendor study of 615 products.
[^2]: McCreary, D. (2026). *Course Description*, "How the first version was built." Costs are estimates using Claude Opus 5.5 API prices of $20 per million output tokens, $0.20 per million cache reads, and $5 per million cache writes. They exclude generating this textbook, the author's time, and later maintenance. See [Tokens, Caching, and Pricing](chapters/10-tokens-caching-pricing/index.md).  I should note that I didn't actually pay Anthropic an additional $14.  This was done under my Anthropic Max monthly subscription and it only uses a small fraction (5%) of my weekly token quota. See the [session log](https://github.com/dmccreary/macos-screen-grab/blob/main/logs/01-initial-session.md) file for precise details.
