# Character Sheet: Pinch the Hermit Crab

The canonical identity document for Pinch, the pedagogical
mascot for the **ScreenGrab: Software Bloat and the Generated Alternative**
textbook. Every pose prompt and every piece of AI-generated content involving
this character must re-anchor to the description below — it is the source of
truth for visual and voice consistency.

## Identity

- **Name:** Pinch
- **Species:** Hermit Crab
- **Subject:** Software bloat and generating small tools with AI
- **Catchphrase:** "Grab only what you need!"
- **Pronouns:** Pinch has no gender. Always write "Pinch" or *they/them*.

## Visual Description

- **Body color:** Coral orange — hex `#FF7043`, with a darker outline `#BF360C` and a pale belly `#FFAB91`
- **Accent color:** Indigo shell — hex `#3F51B5`, with a darker outline `#1A237E` and a pale spiral `#9FA8DA`
- **Clothing / accessories:** No clothing. A round spiral shell on their back, marked with a small amber (`#FFB300`) crosshair like the one a screen grab tool shows.
- **Expression:** Big round eyes on two short stalks, with a friendly, slightly wry smile
- **Size proportion:** Compact and chunky, with one large claw (viewer's left) and one small claw (viewer's right), readable at 90 px
- **Art style:** Modern flat vector cartoon with clean, even outlines and no gradients

## Personality

- Curious about how things actually work
- Frugal, and suspicious of anything they have to carry but never use
- Candid about what hasn't been checked yet
- Encouraging without being sugary

## Voice

- Speaks to adult learners as peers, in short plain sentences
- Dry, light humor about shells, claws, and carrying too much, used sparingly
- Asks the practical question: what does it cost, what can go, and who checked it?
- Signature phrases: "Grab only what you need!", "What can we leave out?", "Did anyone actually check that?"

## Pose Set

| Pose | Filename | Use |
|------|----------|-----|
| Neutral | `neutral.png` | General-purpose / sidebars |
| Welcome | `welcome.png` | Chapter openings |
| Thinking | `thinking.png` | Key concepts |
| Tip | `tip.png` | Hints and helpful guidance |
| Warning | `warning.png` | Common mistakes / pitfalls |
| Encouraging | `encouraging.png` | Difficult content / struggle |
| Celebration | `celebration.png` | End of chapter / achievements |

The current poses are drawn by `scripts/generate-mascot-poses.py`. Change the
character there, then rerun the trimmer on each pose. See
[`image-prompts.md`](image-prompts.md) for the full text of each pose prompt, for
anyone who would rather generate the art with an AI image tool. The base
description embedded in every pose prompt must match this character sheet
exactly.

## Why This Mascot

A hermit crab carries only the shell it needs and moves on when that shell stops
fitting, which is this book's argument about software in one animal. Its claw is
also a literal grabber, so the name Pinch points at both the screen grab and the
pinch of paying for features you never use. The indigo shell and coral body pick
up the book's indigo and orange theme.
