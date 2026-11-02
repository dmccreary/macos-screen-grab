# Learning Graph Generator Session Log

| | |
|---|---|
| **Date** | 2026-11-01 |
| **Skill** | `learning-graph-generator` version 1.07 |
| **Tool** | Claude Code in the Claude desktop app |
| **Model** | Opus 5.5 |
| **Book** | ScreenGrab: Software Bloat and the Generated Alternative |

## Program versions

| Program | Version |
|---|---|
| `csv-to-json.py` | 1.05 |
| `analyze-graph.py` | No version recorded in the file |
| `taxonomy-distribution.py` | No version recorded in the file |
| `validate-learning-graph.py` | No version recorded in the file |
| Python | The `mkdocs` conda env's Python 3.13 |

## Prompts

These are the prompts that drove this skill's run:

1. "use the /course-description-analyzer to give the CD a score"
2. "Apply improvements"
3. "Run generator"
4. "Build graph"

## Steps

| Step | Result |
|---|---|
| 1. Course description assessment | Skipped to save tokens, because `quality_score` was already 100 |
| 2. Concept labels | 206 concepts. The longest label is 30 characters. The author approved the list without changes |
| 3. Dependencies | 316 edges in `learning-graph.csv` |
| 4. Quality validation | Valid DAG, no self-dependencies, one connected component, no orphaned nodes |
| 5. Taxonomy | 12 categories in `concept-taxonomy.md` and `taxonomy-names.json` |
| 6. Taxonomy in CSV | Written together with the dependencies, as described below |
| 7–8. Metadata and groups | `metadata.json` and `color-config.json` |
| 9. JSON | `learning-graph.json` passes schema validation |
| 10. Distribution | The largest category holds 14.6% and the smallest 4.9% |
| 11. Index page | `index.md` created from the template |
| 12. Session log | This file |

## Graph metrics

| Metric | Value |
|---|---|
| Concepts | 206 |
| Edges | 316 |
| Foundational concepts | 5: Software, Pareto Principle, Cognitive Load, Opportunity Cost, Copyright |
| Terminal concepts | 61 (29.6%) |
| Average dependencies per concept | 1.57 |
| Concepts with exactly one dependency | 111 (54%) |
| Longest chain | 16 concepts |
| Highest Concept Impact Score | Software (1095), Software Product (593), Software Feature (279) |

The highest-scoring concepts are broad foundations, so the edge direction looks correct.

## Differences from the skill's written steps

- Dependencies and taxonomy IDs were written in one pass from a single label-based source,
  so `add-taxonomy.py` wasn't used. Using labels meant a mistyped name would fail rather
  than silently point at the wrong ID.
- Cycles were checked before running the skill's tools, and `analyze-graph.py` confirmed
  the result.
- The index template's claim of 300–600 concepts, its comparison with similar courses, and
  its Miscellaneous category were removed or changed, because they don't apply to this book.
  A typo and two missing blank lines before links were also fixed.
- `validate-learning-graph.py` was run from the skill's directory rather than copied.

## Known limitations

- The dependencies are one model's judgment, and the author hasn't reviewed them yet.
- Some dependencies reflect course order more than strict prerequisites. For example,
  Non-Functional Requirement depends on Resource Footprint, which depends on Software Bloat.
- The concept count exceeds the earlier estimate of 120 to 150 that the course could
  naturally support, so some concepts may need only brief treatment or could be cut.
