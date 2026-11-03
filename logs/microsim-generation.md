# MicroSim Generator Session Log

**Skill:** microsim-generator 1.0.4
**Date:** 2026-11-03
**Model:** Claude Opus 5.5 (coordinator and all sub-agents)
**Execution Mode:** Parallel, up to five sub-agents at a time (the author asked for this; the skill's default is serial)

## Timing

Times are taken from the sub-agent launch records and their reported run durations.

| Metric | Value |
|--------|-------|
| First sub-agent started | 2026-11-03 06:54:55 |
| Last sub-agent finished | 2026-11-03 07:25:01 |
| **Elapsed time to generate the 30 MicroSims** | **about 30 minutes** |
| Strict build check after generation | 07:25 |
| Chapter embeds, commit `645affd` | 07:50:06 |
| Site deployed with `mkdocs gh-deploy` | about 07:51 |
| Total sub-agent time (sum of all six runs) | 90.5 minutes |

The six batches took about 90 agent-minutes in total, but ran in about 30 minutes of wall-clock time. Run serially, as the skill does by default, they would have taken about 90 minutes.

### Per-batch timing

| Batch | Sims | Library | Started | Duration | Tool calls | Sub-agent tokens |
|-------|-----:|---------|---------|---------:|-----------:|-----------------:|
| Cost calculators | 5 | p5.js | 06:54:55 | 15.9 min | 56 | 194,492 |
| Explorers | 5 | p5.js | 06:55:55 | 13.9 min | 58 | 179,560 |
| Sorters and matchers | 6 | p5.js | 06:55:55 | 16.1 min | 58 | 191,499 |
| Judges and steppers | 5 | p5.js | 06:55:55 | 15.7 min | 69 | 182,925 |
| Charts | 5 | Chart.js | 06:55:55 | 13.9 min | 49 | 162,415 |
| Flowcharts and concept map | 4 | Mermaid, vis-network | 07:10:04 | 14.9 min | 70 | 195,921 |
| **Total** | **30** | | | **90.5 min** | **360** | **1,106,812** |

The first batch started alone, because the skill runs batches serially by default. After the author asked for up to five parallel agents, four more batches started. The sixth batch started when the Chart.js batch finished.

## Results

- Sims that were scaffolds at the start: 30 of 31 (`screengrab-component-map` was already built)
- Sims built: 30, all now `status: built` (none set to `approved`; only the author does that after testing)
- Libraries: 21 p5.js 2.3.4, 5 Chart.js 4.4.0, 3 Mermaid 11.4.1, 1 vis-network 9.1.9
- `node --check` on every sim's JavaScript: passed
- Headless Chromium (Playwright): every sim loaded with zero console or page errors, and each one's challenge and scoring flow was played through from a script with right, wrong and second-attempt answers
- Spec arithmetic was recomputed for every preset and challenge case: no errors found
- Screenshots: all 30 stub screenshots replaced with real captures from `bk-capture-screenshot`
- Chapter embeds: 31 iframes added across 15 chapters, each with the height from the sim's own `index.md`
- `mkdocs build --strict`: passed after generation and again after the embeds

## Sims Built

| Sim | Library | Chapter | Iframe height | JS lines |
|-----|---------|--------:|--------------:|---------:|
| bloat-feature-growth-explorer | p5.js | 1 | 602 | 531 |
| bloat-footprint-comparison | Chart.js | 1 | 700 | 234 |
| bloat-software-concept-map | vis-network | 1 | 800 | 337 |
| usage-feature-driver-sorter | p5.js | 2 | 552 | 806 |
| usage-long-tail-explorer | Chart.js | 2 | 730 | 249 |
| licenses-offer-sorter | p5.js | 3 | 552 | 796 |
| licenses-switching-cost-calculator | p5.js | 3 | 668 | 405 |
| licenses-vendor-incentive-explorer | p5.js | 3 | 592 | 348 |
| tco-break-even-chart | Chart.js | 4 | 635 | 274 |
| tco-calculator | p5.js | 4 | 678 | 411 |
| agent-claim-evidence-checker | p5.js | 5 | 532 | 432 |
| ai-coding-agent-loop-stepper | p5.js | 5 | 664 | 548 |
| buy-subscribe-generate-decision-explorer | p5.js | 6 | 632 | 381 |
| acceptance-criteria-testability-judge | p5.js | 7 | 492 | 394 |
| requirement-type-sorter | p5.js | 7 | 539 | 794 |
| design-trade-off-judge | p5.js | 8 | 520 | 450 |
| ai-assisted-build-stage-sequencer | p5.js | 9 | 600 | 428 |
| screengrab-first-install-size-breakdown | Chart.js | 9 | 620 | 253 |
| prompt-cache-cost-calculator | p5.js | 10 | 622 | 451 |
| token-split-explorer | p5.js | 10 | 662 | 516 |
| session-cost-estimator | p5.js | 11 | 694 | 431 |
| token-share-versus-cost-share | Chart.js | 11 | 695 | 205 |
| grab-flow-test-coverage | Mermaid | 12 | 690 | 347 |
| which-test-can-confirm-this | p5.js | 12 | 600 | 788 |
| bug-investigation-workflow | Mermaid | 13 | 680 | 352 |
| verification-status-classifier | p5.js | 13 | 590 | 784 |
| fork-and-pull-request-flow | Mermaid | 14 | 580 | 332 |
| open-source-license-matcher | p5.js | 14 | 579 | 783 |
| subscribe-or-generate-cost-calculator | p5.js | 15 | 750 | 438 |
| weighted-decision-matrix-explorer | p5.js | 15 | 722 | 434 |

The six sorter sims share one engine with a configuration block per sim. Each sim's `.js` holds both parts, so it still pastes straight into the p5.js editor.

## Spec Changes Made During Generation

- **bug-investigation-workflow:** step 3's description says to continue to step 4, but the spec's own edges send "reproduced" to step 5. The sim says step 5.
- **grab-flow-test-coverage:** the six edge labels do not line up with the arrows if read in order. Each label was placed on the arrow where that thing is handed on, two labels were merged, and a "start capture" label was added. The author should confirm the mapping.

## Spec Issues for the Author

- **Answer given away after one miss:** in prompt-cache-cost-calculator, session-cost-estimator and weighted-decision-matrix-explorer, the first-miss feedback text contains the model value, so the second attempt is trivial. Implemented as written.
- **ai-coding-agent-loop-stepper:** the spec says Next without predicting is exploration, but also requires all six predictions. Next stays disabled until a prediction is made.
- **agent-claim-evidence-checker:** the spec gives no end-of-run mastery message, so the sim shows a neutral one.
- **licenses-offer-sorter:** offer 1 is scored "per user", but the offer text alone does not say so.
- **bloat-software-concept-map:** the edge label "is what an oversized → Feature Set" reads as unfinished and was kept word for word.
- **usage-long-tail-explorer:** the Related Resources link still names the "95/5 Rule" chapter, which is now the 80% rule.

## Design Additions Beyond the Specs

- **tco-break-even-chart:** a View option zooms to years 0 to 2, because crossings at 0.1 to 0.5 years cannot be seen on the 0 to 10 scale. In free exploration a learner could read challenge answers before starting.
- **bloat-footprint-comparison:** a log y-axis, so the small bars stay visible and the gaps show ratios.
- **Hidden values during challenges:** the calculators hide cost items and bars, not only the total, so the answer is not just a sum of what is on screen.
- **Correct answer shown after a miss:** the sorters outline the correct choice.
- **Restart:** several sims gained Restart or Start over buttons.
- **Missed items in summaries:** several end screens list the items the learner missed.

## Known Limitations

- Layouts are tuned for widths of about 600 to 700 px and up. Below that, some sims clip long text or scroll inside the iframe; fullscreen still works.
- The embedded chapter pages were checked by the strict build only, not viewed in a browser.
- `docs/sims/s1.png` through `s5.png` are test screenshots an agent saved in the wrong folder. They were already in the 07:15 commit and are still in the repo.

## Files Created

- `docs/sims/<sim-id>/<sim-id>.js` for all 30 sims
- `docs/sims/<sim-id>/style.css` for the Chart.js, Mermaid and vis-network sims
- `logs/microsim-generation.md`

## Files Changed

- `docs/sims/<sim-id>/main.html`, `index.md`, `metadata.json` and `<sim-id>.png` for all 30 sims
- `docs/chapters/*/index.md` for all 15 chapters (iframe embeds)
