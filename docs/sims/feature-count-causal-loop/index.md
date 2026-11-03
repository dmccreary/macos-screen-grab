---
title: "Feature Count Causal Loop Diagram"
description: "The learner will analyze the causal loop diagram of software bloat by tracing each reinforcing and balancing loop through Feature Count and explaining, from the edge polarities, why each loop amplifies or limits feature growth."
status: built
image: /sims/feature-count-causal-loop/feature-count-causal-loop.png
og:image: /sims/feature-count-causal-loop/feature-count-causal-loop.png
hide:
  - toc
library: vis-network
bloom_level: Analyze
---

# Feature Count Causal Loop Diagram

<iframe src="main.html" width="100%" height="764px" scrolling="no"></iframe>

[Run the Feature Count Causal Loop Diagram MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Why do software products keep growing, even when most users need only a few of their features? This causal loop diagram (CLD) puts **Feature Count** at the center as a *stock*: a quantity that accumulates release after release. Seven feedback loops pass through it.

- **Three reinforcing loops (R)** push Feature Count up. A longer feature list sells more copies and upgrades (R1), rivals match each other's features (R2), and every new feature attracts users who ask for more (R3).
- **Four balancing loops (B)** push back. Complex code slows new work (B1), interface clutter lowers satisfaction and revenue (B2), a heavy product drives users to lean alternatives (B3), and clutter can lead a team to remove features (B4).

Reading the arrows: a green **+** link means the two variables move in the same direction, and a red **−** link means they move in opposite directions. Two bars (**||**) mark a delay, and a dashed arrow marks a weak link. To tell a loop's type, count its negative links. An even count (zero included) makes a reinforcing loop, and an odd count makes a balancing loop.

## How to Use This MicroSim

- **Trace a loop:** press one of the loop buttons below the diagram. The loop's boxes and arrows stay bright while the rest fade, and the panel traces a rise in Feature Count around the loop, link by link, showing whether it comes back as a rise (reinforcing) or a fall (balancing).
- **Inspect a variable or link:** click any box to read its definition and see which loops it belongs to. Click an arrow, or its **+** / **−** label, to read why the link has that polarity. Clicking an R or B marker selects that loop.
- **All loops:** press **All loops** to show the whole system again.
- **Zoom and pan:** drag the background to pan. Pinch or swipe sideways on a trackpad to zoom. Vertical scrolling scrolls the page.

## Lesson Plan

**Audience:** adult learners and software professionals. **Time:** 15 minutes.

**Learning objective:** The learner will analyze the causal loop diagram of software bloat by tracing each reinforcing and balancing loop through Feature Count and explaining, from the edge polarities, why each loop amplifies or limits feature growth.

1. **Predict (2 min).** Before pressing any button, learners look at R1 and say whether a rise in Feature Count comes back as a rise or a fall. They then press R1 and check the trace.
2. **Trace (6 min).** Learners trace every loop. For each one they count the negative links and state the loop type before reading the verdict in the panel.
3. **Compare (4 min).** Ask which balancing loops have a delay (||) or a weak link, and who feels each balancing loop. For example, the users who suffer interface clutter in B2 are not always the people who buy the product. Learners explain why the reinforcing loops usually win.
4. **Connect (3 min).** Ask what would make B3, *Exit to Lean Alternatives*, stronger. Connect the answer to the book's argument that an AI coding agent makes a small, single-purpose tool cheap to generate.

**Misconceptions to watch for:**

- *A negative link is a bad thing.* Polarity describes direction, not value. "Maintenance work − Feature Count" says that more maintenance means slower feature growth.
- *A loop with any negative link is balancing.* Only an odd number of negative links makes a balancing loop. Two negatives cancel.
- *Balancing loops stop growth right away.* Delays and weak links mean the brakes arrive late, after many releases of growth.

**Discussion questions:**

1. Feature Pruning (B4) is the only loop that drains the stock. Why is it the weakest loop in the system?
2. B2 and B3 both act through Vendor Revenue. What happens to them when a vendor moves from one-time sales to a yearly subscription?
3. Which single link would you change to slow bloat the most, and why?

## Editing the Layout

Add `?edit=true` to the URL to reposition the diagram:

[Open the Layout Editor](main.html?edit=true){ .md-button }

In edit mode you can drag every box and every R and B marker. Click an arrow to select it, then use **Flip Curve**, **Curve −**, **Curve +**, or **Straight** to reshape it. Your layout is kept in this browser as you work, so a reload does not lose it. **Reset Layout** discards it and reloads the layout from the JSON file. When the layout looks right, press **Copy JSON** or **Download JSON** and replace the contents of `feature-count-cld.json` with the result.

The diagram's variables, links, and loops all live in [feature-count-cld.json](feature-count-cld.json), which follows the CLD JSON schema used by the intelligent-textbook cld-viewer.

## References

- [Causal loop diagram](https://en.wikipedia.org/wiki/Causal_loop_diagram) - Wikipedia overview of CLD notation, polarity, and loop types.
- [Feature creep](https://en.wikipedia.org/wiki/Feature_creep) - Wikipedia article on the gradual growth of a product's features.
- [Software bloat](https://en.wikipedia.org/wiki/Software_bloat) - Wikipedia article on feature, code, and resource bloat.
- Donella H. Meadows, *Thinking in Systems: A Primer* (Chelsea Green, 2008) - the standard introduction to stocks, flows, and feedback loops.
- Peter M. Senge, *The Fifth Discipline* (Doubleday, 1990) - introduces the systems archetypes, including limits to growth and escalation.

## Related Resources

- [Chapter 1: Software Features and the Anatomy of Bloat](../../chapters/01-software-bloat/index.md)
- [Feature Growth and Usage Explorer](../bloat-feature-growth-explorer/index.md)
