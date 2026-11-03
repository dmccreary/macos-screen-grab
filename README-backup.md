# ScreenGrab: Software Bloat and the Generated Alternative

[![MkDocs](https://img.shields.io/badge/Made%20with-MkDocs-526CFE?logo=materialformkdocs)](https://www.mkdocs.org/)
[![Material for MkDocs](https://img.shields.io/badge/Material%20for%20MkDocs-526CFE?logo=materialformkdocs)](https://squidfunk.github.io/mkdocs-material/)
[![GitHub Pages](https://img.shields.io/badge/View%20on-GitHub%20Pages-blue?logo=github)](https://dmccreary.github.io/macos-screen-grab/)
[![Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code-DA7857?logo=anthropic)](https://claude.ai/code)
[![Claude Skills](https://img.shields.io/badge/Uses-Claude%20Skills-DA7857?logo=anthropic)](https://github.com/dmccreary/ibook-skills)
[![p5.js](https://img.shields.io/badge/p5.js-ED225D?logo=p5.js&logoColor=white)](https://p5js.org/)
[![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT (code)](https://img.shields.io/badge/Code-MIT-yellow.svg)](LICENSE)
[![License: CC BY-NC-SA 4.0 (book)](https://img.shields.io/badge/Book-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

## View the Live Site

Visit the interactive textbook at:
[https://dmccreary.github.io/macos-screen-grab/](https://dmccreary.github.io/macos-screen-grab/)

## Overview

A screen grab utility that once cost $9 now charges $30 per computer every year.
The author runs it on three Macs. **ScreenGrab** is the answer: a free,
single-purpose macOS menu bar app that copies a dragged region of the screen to
the clipboard, with no subscription and no network access. A custom replacement
took about $14 of AI work.

This repository holds both the app and the intelligent textbook built around it.
The book uses that one small utility to show how software bloats, what it costs,
and what generative AI makes possible when you describe the few features you
actually use and generate your own tool. It covers feature usage and the long
tail, licenses and subscriptions, total cost of ownership, build-or-buy
decisions, writing minimal requirements, working with AI coding agents, token
and caching costs, testing, verification, and long-term maintenance.

The book is a Level 2+ intelligent textbook: it has a learning graph of concept
dependencies, chapter quizzes, an FAQ, a glossary, and interactive MicroSims
(p5.js and Chart.js simulations) that let readers explore the cost models
themselves.

## Site Status and Metrics

| Metric | Count |
|--------|-------|
| Concepts in Learning Graph | 206 |
| Chapters | 15 |
| MicroSims | 31 |
| Glossary Terms | 206 |
| FAQ Questions | 76 |
| Quiz Questions | 150 |
| References | 150 |
| Diagrams | 31 |
| Equations | 83 |
| Links | 725 |
| Appendices | 2 |
| Total Words | 142,354 |
| Equivalent Printed Pages | 592 |

Counts come from `docs/learning-graph/book-metrics.json`. See the
[Book Metrics](https://dmccreary.github.io/macos-screen-grab/learning-graph/book-metrics/)
and
[Chapter Metrics](https://dmccreary.github.io/macos-screen-grab/learning-graph/chapter-metrics/)
pages for the full breakdown.

## The App

The ScreenGrab app lives in [`src/`](src/) and has its own
[README](src/README.md) with requirements, installation, the Screen Recording
permission, and usage. It does two things:

- **Grab Region** (Ctrl+Shift+4): drag a rectangle, and it is copied when you let go.
- **Grab Region with Delay** (Ctrl+Shift+5): a countdown runs first, so you can
  open a menu or get a hover state showing, then drag a rectangle over the frozen screen.

## Getting Started with the Book

### Clone the Repository

```bash
git clone https://github.com/dmccreary/macos-screen-grab.git
cd macos-screen-grab
```

### Install Dependencies

The book uses MkDocs with the Material theme:

```bash
pip install mkdocs mkdocs-material
```

### Build and Serve Locally

```bash
mkdocs build --strict
```

```bash
mkdocs serve
```

Open `http://localhost:8000/macos-screen-grab/` in your browser.

### Deploy to GitHub Pages

```bash
mkdocs gh-deploy
```

### Using the Book

- Use the left sidebar to browse the 15 chapters. Each has a quiz and annotated references.
- Use the search box to search all content.
- Open the MicroSims section to run the simulations in your browser. Adjust the
  sliders and controls to test your own numbers.

## Repository Structure

```
macos-screen-grab/
├── docs/                      # MkDocs source for the textbook
│   ├── chapters/              # 15 chapters, each with index, quiz, references
│   ├── sims/                  # Interactive MicroSims (main.html + index.md each)
│   ├── learning-graph/        # Concept list, taxonomy, dependency graph, metrics
│   ├── specification.md       # What the ScreenGrab app must do
│   ├── design.md              # How the app is built
│   ├── glossary.md            # ISO 11179-style definitions
│   ├── faq.md                 # Frequently asked questions
│   └── img/                   # Cover image, mascot poses, license badge
├── src/                       # The ScreenGrab macOS app (Swift package)
├── dist/                      # Built ScreenGrab.app
├── plugins/                   # MkDocs hook for social preview meta tags
├── scripts/                   # Helper scripts (mascot pose generator)
├── mkdocs.yml                 # Site configuration and navigation
└── README.md                  # This file
```

## Reporting Issues

Found a bug, typo, or have a suggestion? Please open an issue:
[GitHub Issues](https://github.com/dmccreary/macos-screen-grab/issues)

Please include a description of the problem, steps to reproduce (for bugs),
expected versus actual behavior, and screenshots or browser details for MicroSim problems.

## License

- **App source code:** [MIT License](LICENSE). Use, change, and share it freely,
  including commercially.
- **Book content:** [Creative Commons Attribution-NonCommercial-ShareAlike 4.0
  International](https://creativecommons.org/licenses/by-nc-sa/4.0/). Share and
  adapt with attribution, for non-commercial use, under the same license. See
  [docs/license.md](docs/license.md) for details.

## Acknowledgements

- **[MkDocs](https://www.mkdocs.org/)** and
  **[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)** for the site
- **[p5.js](https://p5js.org/)** for the interactive MicroSims
- **[Claude Code](https://claude.ai/code)** by Anthropic for AI-assisted content and app generation
- **[GitHub Pages](https://pages.github.com/)** for free hosting

## Contact

**Dan McCreary**

- LinkedIn: [linkedin.com/in/danmccreary](https://www.linkedin.com/in/danmccreary/)
- GitHub: [@dmccreary](https://github.com/dmccreary)

Questions, suggestions, or collaboration ideas? Connect on LinkedIn or open an issue on GitHub.
