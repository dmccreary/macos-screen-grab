---
title: "Generative AI and Coding Agents"
description: "How generative AI, large language models and AI coding agents such as Claude Code turn a plain-language request into working software, and where a person must stay in the loop."
generated_by: claude skill chapter-content-generator
date: "2026-11-01 20:14:02"
version: 1.11
---

# Generative AI and Coding Agents

## Summary

This chapter introduces the technology that creates a new option. It explains generative AI and source code at the level this course needs, then shows how an AI coding agent such as Claude Code works through prompts, clarifying questions, tools, planning, and permissions within an AI session. It also sets out why human review matters, given hallucination and overconfident reporting. After this chapter, you will be able to explain what a coding agent does and where a person must stay in the loop.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Generative AI | 232 |
| Large Language Model | 231 |
| Source Code | 151 |
| Lines Of Code | 2 |
| AI Coding Agent | 56 |
| Claude Code | 4 |
| Prompt | 27 |
| Natural Language Request | 2 |
| Clarifying Questions | 1 |
| Agent Tool Use | 3 |
| Agent Planning | 1 |
| Human In The Loop | 4 |
| Human Review | 2 |
| Agent Permissions | 1 |
| Agent Instructions File | 1 |
| AI Session | 23 |
| Session Log | 4 |
| Prompt Iteration | 1 |
| AI Hallucination | 7 |
| Overconfident Reporting | 6 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Software Features and the Anatomy of Bloat](../01-software-bloat/index.md)

---

!!! mascot-welcome "A New Way to Get Software"
    ![Pinch waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    The first four chapters showed what a bloated tool costs you. This chapter shows the tool that makes a different answer possible: an AI that can write a small program to order. By the end you will know how it works, what it needs from you, and where you must keep watching. Grab only what you need!

## Generative AI

**Generative AI** is a kind of software that produces new content, such as text, images, audio, or program code, instead of only sorting, searching, or measuring content that already exists. You give it a request. It writes something that did not exist a moment ago.

Older software follows rules that a programmer wrote down in advance. A spreadsheet adds the cells you tell it to add, and a search box looks up pages that match your words. Generative AI works differently. Its behavior comes from patterns it absorbed from a very large collection of examples, so it can respond sensibly to requests nobody wrote a rule for. That flexibility is the whole attraction, and it is also the source of the problems later in this chapter, because the same flexibility lets it produce an answer that sounds right and is not.

Here is a worked example. Suppose you type this request into a generative AI tool: "List three features that every screen grab tool needs." A rule-based program would have no idea what to do with that sentence. A generative AI tool might answer: grab a region of the screen, put the image on the clipboard, and save the image to a file. Ask the same question again and you may get a slightly different list, perhaps with a keyboard shortcut in place of the file. The answer is generated fresh each time, not looked up.

Generative AI is not limited to text. Image generators turn a sentence into a picture, music generators produce audio, and code generators produce programs. This course cares about the last kind, because a program is the product we are trying to replace. In the ScreenGrab case study, the entire app was generated from a short request and a handful of answers to questions. No one typed the Swift code by hand.

The word "generative" also marks a boundary. A classifier looks at a photo and says "cat." A generator is asked for a photo of a cat and produces one. The first judges what exists, while the second makes something new, and making something new is exactly what lets a person describe a tool in words and receive a working version.

Before the table below, note the two phrases it uses. A **deterministic** program gives the same output for the same input every time. A **probabilistic** program may give different outputs for the same input, because chance plays a part in choosing the answer.

| Question | Traditional software | Generative AI |
|---|---|---|
| Where does its behavior come from? | Rules a programmer wrote | Patterns learned from many examples |
| What happens with an unusual request? | Error message or no result | A best-effort answer |
| Same input twice? | Same output (deterministic) | Often a different output (probabilistic) |
| Can it be wrong and sound sure? | Rarely; it fails visibly | Yes; wrong answers read fluently |
| Typical output | A calculation or a search result | New text, images, or code |

!!! mascot-thinking "Generated, Not Looked Up"
    ![Pinch thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice the shift: a calculator retrieves, while a generative tool composes. Composing is what lets it write a whole program from a paragraph, and it is why you must check the result instead of trusting it the way you trust arithmetic.

## Large Language Models

A **large language model**, or **LLM**, is the kind of generative AI that works with text, and it is the engine inside coding agents. It is a program trained on an enormous amount of written material, including books, web pages, and a great deal of program code. During training it learns which pieces of text tend to follow which other pieces.

To keep this precise, define one more term. A **token** is a small chunk of text, often a short word or part of a word, that the model reads and writes one at a time. Chapter 10 returns to tokens because they set the price of using an AI. For now, the key fact is that an LLM generates its answer one token at a time. At each step it estimates which token is most likely to come next, picks one, adds it to the text so far, and repeats.

A worked example makes this concrete. Give an LLM the unfinished sentence "To copy an image to the clipboard, you first need to". The model scores many possible next tokens. A word like "clear" or "get" might score high, because the training text often continued that way, while "banana" scores very low. It picks a likely word, appends it, and asks the same question again with the longer sentence. A few hundred repetitions later, you have a paragraph or a function.

That one-token-at-a-time process explains both the strength and the weakness of an LLM:

- It is strong at fluent, well-formed text, because it has seen millions of examples of well-formed text.
- It is strong at code, because program code is highly regular text with strict patterns.
- It is weak at knowing whether its output is true, because it was trained to continue text plausibly, not to check facts.
- It can use only what is in front of it: the instructions and files you give it in the current conversation, plus what it absorbed in training.

This book does not teach how an LLM is built inside, and you do not need that to use one well. You need the working model above: it continues text plausibly, and plausible is not the same as correct.

!!! mascot-thinking "Plausible Is Not Correct"
    ![Pinch thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Think of an LLM as a very well-read improviser: it always has a fluent next line ready, whether or not it knows the facts. Every safeguard later in this chapter exists because fluent and true are different things.

| Ability | Why an LLM is good or poor at it |
|---|---|
| Writing a short function in a common pattern | Good: this pattern appears constantly in its training text |
| Explaining an error message in plain language | Good: it has seen the message and many explanations |
| Knowing today's version of a small library | Poor: it may remember an older version |
| Confirming that its own code works | Poor: it can only continue text; running the code is a separate step |
| Remembering a conversation from last week | Poor: it only has what is in the current session |

## Source Code and Lines of Code

**Source code** is the human-readable text of instructions that tells a computer what to do. A programmer, or an AI, writes it in a programming language. A separate program called a compiler (Chapter 9) later translates it into the form the computer actually runs. When people say a tool is "open source," they mean its source code is published for anyone to read and reuse.

Source code differs from the app you double-click. The app is a finished, compiled product. The source code is the recipe that produced it. If you hold the recipe, you can change the dish: fix a bug, remove a feature, or move the tool to a new machine. If you hold only the app, you can use it as the vendor made it, and nothing more. This is one reason the generated alternative appeals. You own the recipe, in files you can read, instead of renting the dish.

You do not need to read code fluently to follow this book, but you should be able to look at a few lines and see that they are plain, structured text. Before the example, here is what it does. The three lines below belong to a program that puts a picture on the macOS clipboard, the shared holding area that the Copy and Paste commands use. The first line asks the system for the shared clipboard. The second empties it. The third places the picture there. The words `pasteboard` and `image` are names the programmer chose; `NSPasteboard` is the macOS name for the clipboard.

```swift
let pasteboard = NSPasteboard.general
pasteboard.clearContents()
pasteboard.writeObjects([image])
```

Three lines handle the clipboard step, which is the last step of a screen grab. A complete tool has many such pieces that must fit together: finding the screen, letting the user draw a region, capturing the pixels, and more. Counting how much code a tool contains gives a rough measure of its size. **Lines of code** (LOC) is that count of lines in the source files. It is an imperfect measure, since one clever line can replace ten plain ones, but it is easy to compute and good enough to compare scales. A worked comparison: a tool with 2,000 lines is roughly the size of a short story, while a large commercial product can contain millions of lines. When you ask an agent for a minimal tool, a small line count is a sign that the specification left features out.

The ScreenGrab case study supplies real numbers. The first install of the generated app contained about 2,000 lines of Swift in 19 files, with no third-party dependencies. The whole project, including tests, scripts, and documents, came to about 5,200 lines.

| Part of the first install | Approximate lines |
|---|---|
| App code (Swift, 19 files) | 2,000 |
| Tests (94 automated tests) | 1,370 |
| Install and build scripts | 500 |
| Specification, design, and README | 1,340 |
| Total | 5,200 |

!!! mascot-tip "Count the Lines Before You Judge"
    ![Pinch giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    When someone says a tool is "huge" or "tiny," ask for the line count and the number of files. About 2,000 lines of app code is small enough that a person can skim every file in an afternoon.

## Prompts and Natural Language Requests

A **prompt** is the input you give an AI model to tell it what you want. It can be a single question, a paragraph of instructions, a pasted error message, or a whole file. The model's output is shaped heavily by the prompt, so the quality of your prompt largely sets the quality of the result.

A **natural language request** is a prompt written in ordinary human language rather than a programming language or a special command syntax. "Make me a screen grab tool that copies a region to the clipboard" is a natural language request. It needs no code, no menu choices, and no special vocabulary, which is why people with no programming background can now ask for software.

Natural language requests are forgiving in one way and unforgiving in another. They accept almost any phrasing, so there is nothing to memorize. They also accept almost any level of vagueness, so the burden of being specific falls on you. Whatever you leave unsaid, the agent will fill in with its best guess, and its best guess is usually the most common feature set it has seen.

A worked example shows how much a prompt matters. Compare two requests for the same tool.

| Prompt | What the agent has to guess |
|---|---|
| "Make a screenshot app." | Which screens, which formats, where the file goes, whether to include editing, sharing, or cloud storage |
| "Make a macOS menu bar app that grabs a screen region after an optional delay and puts the image on the clipboard. No saving, no editing." | Very little: the platform, the two features, the output, and the exclusions are all stated |

The first prompt invites a large, general tool, because the agent fills each gap with a popular guess. The second prompt does the job of leaving features out, and that is the habit this book builds. Chapter 7 develops it into the minimal specification.

### Prompt Iteration

**Prompt iteration** is the practice of refining a prompt in a series of tries, using what each result shows you. You read the output, notice what is missing or wrong, and adjust the request. First attempts are rarely perfect, and that is normal; treat the first answer as a draft and the second prompt as an edit.

A worked example: the first prompt asks for a screen grab tool and the agent proposes saving files to a folder. You reply, "No file saving; the image goes to the clipboard only." The second result is smaller and closer to what you wanted, and the correction cost one sentence. Each round also teaches you something about your own request, which is why a short prompt iterated three times often beats a long prompt written once.

## AI Coding Agents

An **AI coding agent** is a program that uses an LLM to carry out multi-step software tasks on your behalf. A plain LLM chat answers a question and stops. An agent keeps going: it reads your files, decides what to do, writes or edits files, runs commands, looks at the results, and tries again. The LLM is the reasoning engine, while the agent supplies the hands. Most of what an agent does well comes from this combination, and most of what goes wrong comes from the same place: the engine can be plausible without being right, and the hands will act on whatever it decides.

An ordinary chat with an LLM is like asking a knowledgeable friend by text message: you get advice, and then you do the work yourself. An agent is like hiring that friend to sit at your desk. It can open the project, make the change, run the build, and show you what happened. The table below summarizes the difference once both terms are clear.

| | LLM chat | AI coding agent |
|---|---|---|
| Output | Text you read and copy | Changes made directly in your project files |
| Can it run the code? | No | Yes, through tools such as a build command |
| Does it see the result? | Only if you paste it back | Yes, and it can react to errors on its own |
| Typical number of steps | One reply per question | Many steps toward one goal |
| Where you stay involved | Copying and pasting | Approving actions and checking the result |

A worked example of one trip around the loop shows why the agent is more than a chat. The agent writes a new source file and then runs the build command. The build fails with a message that a variable name is misspelled. The agent reads that message, which is new information it did not have when it wrote the code, fixes the spelling, and builds again. The second build succeeds. You asked for none of those steps individually; the agent chose them to reach the goal you stated. This is also why agents can fail in more interesting ways than a chat: a wrong step early in the loop can carry through everything that follows.

The loop is the key idea. An agent receives a request, works out a plan, takes an action with a tool, observes the result, and repeats until the task is done or it needs you. The MicroSim below lets you step through that loop. Before you use it, here are the stage names it shows, each explained in the sections that follow: the request, clarifying questions, the plan, tool use, the report, and human review. A **permission check** is a moment when the agent stops and asks you to approve an action before it runs.

#### Diagram: AI Coding Agent Loop Stepper

<iframe src="../../sims/ai-coding-agent-loop-stepper/main.html" height="664px" width="100%" scrolling="no"></iframe>

[Run the AI Coding Agent Loop Stepper MicroSim Fullscreen](../../sims/ai-coding-agent-loop-stepper/main.html){ .md-button .md-button--primary }

<details markdown="1">
<summary>AI Coding Agent Loop Stepper</summary>
Type: microsim
**sim-id:** ai-coding-agent-loop-stepper<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/ai-strategy-for-education/tree/main/docs/sims/ai-agent-anatomy<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** explain<br/>
**Learning Objective:** The learner will explain the order of the seven stages an AI coding agent moves through, by predicting the next stage correctly in at least 5 of 6 steps.

**Prerequisites:** AI coding agent, prompt, natural language request, clarifying questions, agent planning, agent tool use, agent permissions, human review (all defined in this chapter above this block).

**Evidence of Mastery:** At each of six steps the learner commits a prediction of the next stage before it is revealed. A prediction is correct when it matches the "Next stage" column in Content. Mastery is 5 of 6 correct on the first try. Reading the stage descriptions and pressing Next without predicting is exploration, not evidence.

**Misconceptions:** (1) The agent writes all the code in one step and then stops. (2) The agent never needs the person after the request. (3) The agent's report that work is done proves the work is done.

**Instructional Rationale:** Predicting the next stage forces the learner to rebuild the loop from the meaning of each stage instead of reading a list. The concrete ScreenGrab example visible at every stage keeps the abstract loop tied to a real case.

**Content:**

The seven stages, in order, each shown with its ScreenGrab example:

| # | Stage | What happens | ScreenGrab example (from the chapter) |
|---|---|---|---|
| 1 | Request | The person states the goal in a natural language request | A short request for a tool that grabs a region and copies it to the clipboard |
| 2 | Clarifying questions | The agent asks the person to settle open choices | Four multiple-choice questions answered by the author |
| 3 | Plan | The agent lists the steps it intends to take | Specification first, then design, code, tests, installer |
| 4 | Tool use: write | The agent creates or edits files, after a permission check | Writing the Swift source files |
| 5 | Tool use: run | The agent runs commands such as a build or the tests, after a permission check | Building the app and running the automated tests |
| 6 | Report | The agent states what it did and what it believes the result is | A summary that the app was built and installed |
| 7 | Human review | The person checks the report against evidence and decides what happens next | Trying the hotkey and a first real screen grab |

Prediction steps (six): the learner is shown stage N and picks the next stage from three choices: the correct next stage and two other stages from the table.

| Step | Shown stage | Choices | Correct next stage | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | Request | Plan; Clarifying questions; Human review | Clarifying questions | The agent settles open choices before it commits to a plan |
| 2 | Clarifying questions | Plan; Report; Request | Plan | With the choices settled, the agent lays out its steps |
| 3 | Plan | Tool use: write; Report; Human review | Tool use: write | Files must exist before anything can be built or tested |
| 4 | Tool use: write | Tool use: run; Request; Plan | Tool use: run | New files are built and tested to see whether they work |
| 5 | Tool use: run | Report; Clarifying questions; Request | Report | After running commands, the agent summarizes the outcome |
| 6 | Report | Human review; Plan; Tool use: write | Human review | A report is a claim, and the person must check it |

**Provenance:** Stage names and definitions come from this chapter, sections "AI Coding Agents", "Prompts and Natural Language Requests", "Human in the Loop" and "Human Review". The ScreenGrab examples come from the course description section "How the first version was built".

**Rules:** The stage order is fixed. Stages 4 and 5 each show a permission check before they run. After stage 7 the sim states that the loop can return to stage 1 with a new or refined prompt. Choices are shown in a fixed order for each step.

**Learner Activity:**

1. The learner sees stage 1 with its description and example, and the question "What comes next?"
2. The learner picks one of three choices and locks it in. The sim reveals the correct next stage.
3. The learner moves to the next step and repeats until all six predictions are made.
4. After step 6, a summary lists the seven stages in order and marks the two permission checks and the final human review.

**Feedback:** Six predictions, fixed order, one attempt each. On a correct prediction the sim shows "Correct" with the Why text. On an incorrect prediction it shows the correct stage and the Why text. A running count "Correct: n of 6" is shown. At the end, 5 or 6 correct displays "You can explain the loop"; fewer than 5 invites a restart.

**Starting State:** Stage 1, Request, is shown with its example and the question "What does the agent do after it receives the request?"

**Chapter Anchors:** The chapter states that there are seven stages: request, clarifying questions, plan, tool use (write), tool use (run), report, and human review, and that the author answered four multiple-choice questions.
</details>

### Claude Code

**Claude Code** is Anthropic's AI coding agent, and it is the one used to build ScreenGrab. It runs in a terminal window on your own computer, which means it can read the files in a project folder, edit them, and run the same commands you would type yourself. You describe what you want, and it works through the stages above, asking for your approval at the points you have configured.

A worked example from the case study: the author gave Claude Code a short request, answered four multiple-choice questions, and later asked for the app to be installed with a README. The work moved through a set order of specification, design, code, tests, and installer. Claude Code did the typing, but the author decided what the tool should do and what should be left out. The same pattern applies to any coding agent; Claude Code is simply the concrete example in this book.

Two features of Claude Code matter for this course. First, because it runs on your computer and not as a web page, it works on real files in a folder you can open and read afterward. Everything it makes is inspectable, which is what makes human review possible. Second, it keeps a record of each session, which the later chapters use to measure time, tokens, and cost. Other coding agents exist and share these traits, so the skills in this book transfer even if the tool changes.

### Clarifying Questions

**Clarifying questions** are questions an agent asks before it starts work, to settle choices that the request left open. Good ones turn a vague request into a precise one at almost no cost. In the ScreenGrab session the four multiple-choice questions let the author pick among options instead of writing long answers.

A worked example, with illustrative wording: the agent asks, "Where should the captured image go? (a) Clipboard only, (b) Save to a folder, (c) Both." The author picks (a). That single answer rules out a file-saving feature, a folder setting, and a file-format option, three things that would otherwise have been generated, tested, and maintained. Clarifying questions are therefore also a tool for leaving features out, so answer them deliberately and pick the smaller option when you are unsure.

### Agent Tool Use

**Agent tool use** is the agent's ability to take actions beyond writing text, such as reading a file, writing a file, running a command, or searching a project. Each action is a call to a **tool**, a small capability the agent is allowed to use. Tool use is what turns a chatty assistant into something that can build and test a program.

A worked example: asked to fix a failing build, an agent might read the build output, search the project for the file named in the error, open that file, edit one line, and run the build again. That is four tool calls in a row, each one visible in the session log. Because tools act on real files and real commands, they are also where permissions apply, as described later in this chapter.

### Agent Planning

**Agent planning** is the step where the agent breaks a task into ordered actions before it starts acting. A visible plan lets you catch a wrong direction early, when changing course costs one sentence instead of a rewrite.

A worked example: for ScreenGrab the plan follows a set order of specification, design, code, tests, and installer. If the plan for a tool you wanted to keep small included "add an editing toolbar" or "sync captures to the cloud", you could cross those items out before any code existed. Reading the plan is the cheapest review you will ever do, because nothing has been built yet.

## Keeping a Person in the Loop

**Human in the loop** means a person takes part in the process at points where judgment is needed, instead of leaving the whole thing to the machine. For an AI coding agent, those points are the request, the answers to clarifying questions, the approval of risky actions, and the final check of the result. The agent is fast, but it cannot know what you meant to leave out, and it cannot be held responsible for what it ships.

A worked example from the case study shows the loop doing its job. The author stated the goal and made the choices when asked. The agent proposed, wrote, built, and tested. The author then tried the Control-Shift-4 hotkey and made a real screen grab. That final step is the one an agent cannot do for you, because the question is whether the tool matches what you needed.

Staying in the loop does not mean watching every keystroke. It means choosing the checkpoints where your judgment adds the most value. The table below lists four checkpoints, the question you answer at each, and what goes wrong if you skip it.

| Checkpoint | Question you answer | Risk if skipped |
|---|---|---|
| Request | What do I actually need, and what can go? | A bloated tool that does what is popular, not what you use |
| Plan | Does this list of steps match my intent? | Wasted work in the wrong direction |
| Permission prompts | Is this action safe and expected? | Deleted files or changed settings you did not mention |
| Final check | Does the real tool do the real job? | Relying on a claim nobody verified |

### Human Review

**Human review** is the act of a person reading the agent's output and checking it against evidence before relying on it. Review is not the same as skimming the agent's summary. It means opening the files, running the tool, and looking at test results.

A worked example: after the agent reports that the screen grab works, a reviewer does three things. They launch the app, press the hotkey, and grab a region. They paste the result into an image viewer to confirm the clipboard really holds the picture. They check that the session log shows the tests actually ran. Each step takes a minute or two, and together they replace trust with evidence. Review also scales with risk: a throwaway script deserves a glance, while a tool you will use daily deserves the full routine.

### Agent Permissions

**Agent permissions** are the settings that control which actions an agent may take without asking. Reading files might be allowed freely, while deleting files or running unfamiliar commands requires your approval. Tighter permissions mean more interruptions and more safety, and you choose the balance.

A worked example of how a sensible setup might look for ScreenGrab:

| Action | Suggested setting | Reason |
|---|---|---|
| Read project files | Allow without asking | Reading changes nothing |
| Edit files in the project folder | Ask at first, allow once you trust the plan | The project is under version control, so edits can be undone |
| Run the build and the tests | Allow | These are the commands the project documents |
| Delete files or run commands outside the project | Always ask | Hard to reverse, and outside the task |

### Agent Instructions File

An **agent instructions file** is a text file in a project that tells the agent how to behave there: the build commands, the style rules, and the things never to do. The agent reads it at the start of each session, so you state a rule once instead of repeating it in every prompt. This book's own project works this way: the file `CLAUDE.md` contains one line that points to `AGENTS.md`, and `AGENTS.md` holds the rules every coding agent must follow when working on the book.

!!! mascot-warning "Approve With Your Eyes Open"
    ![Pinch warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common trap is clicking "allow" on every permission prompt to make the interruptions stop. That hands the agent the keys. Read what it wants to run, approve the ordinary steps, and stop on anything that deletes files or changes settings you did not mention.

## AI Sessions and Session Logs

An **AI session** is one continuous working conversation with an agent, from the first prompt until you end it. Everything in the session, including your messages, the agent's replies, the files it read, and the results of its commands, forms the working memory the agent draws on. A new session starts almost fresh, apart from what the instructions file tells it.

Sessions matter in this book for a practical reason: they are what you measure. The cost, the time, and the number of tokens all attach to a session. The case study reports the whole session as about 70 active minutes, which Chapter 11 breaks down.

A worked example illustrates why sessions behave the way they do. Suppose you spend an hour with an agent building a tool, close the window, and open a new session the next day. The new session does not remember that you rejected a cloud-storage feature yesterday. If that decision lives only in the old conversation, the agent may suggest the feature again. If it lives in the instructions file or the specification, the new session reads it and complies.

The practical lesson is to write decisions into files, not into the conversation. A conversation is temporary, and a file in the project is permanent and visible to every future session and every future reader. A long session also has a cost: everything the agent has read and written stays in its working memory, so a very long conversation can become slower, more expensive, and more prone to confusion. Chapter 10 explains the cost side. Starting a fresh session for a new task, with a clear instructions file, is often the better habit.

### Session Log

A **session log** is the recorded history of a session: the prompts, the replies, the tool calls, and the results, in order. It answers the question "what actually happened?" after the fact, without relying on anyone's memory or on the agent's own summary. You can use it to find where a wrong turn began, to count tokens for cost, or to check whether a claimed test run really occurred.

A worked example: the agent's report says "all tests pass." You open the session log and look for the test command. If the log shows the command ran and printed 94 passing tests, the claim is supported. If the log shows no test command at all, the claim has no evidence behind it. The log turns an assertion into something you can verify.

| Question | Where to look |
|---|---|
| What did I ask for? | The prompts in the session log |
| What did the agent actually run? | The tool calls in the session log |
| What did it report, and did the log support it? | Compare the final report with the tool results |
| How many tokens did the session use? | The usage record for the session (Chapter 11) |

## When the Agent Is Wrong

### AI Hallucination

An **AI hallucination** is output from an AI model that is false or unsupported but presented fluently and confidently. In code, a hallucination might be a function name that does not exist, an option a library never had, or a claim about how a system behaves. The model is not lying; it is continuing text plausibly, and a plausible-looking name is easy to produce.

A worked example, with illustrative details: an agent writes a call to a clipboard function called `copyImageToClipboard()` and reports that the feature is done. The name reads naturally, but that function does not exist in the macOS system libraries. The compiler rejects it, which is the good outcome: a loud failure. The dangerous cases are hallucinations that compile and run but do the wrong thing, such as a hotkey that appears registered but never fires. The case study contains an honest example of that risk: one early hotkey failure was never explained.

Hallucinations are more likely when a request asks for something obscure, very recent, or very specific, because the model has less to draw on and fills the gap with a plausible guess. They are also more likely when the agent cannot run anything to check. The remedies follow from the causes. Prefer agents that can build and test. Ask for evidence, such as the actual command output. And treat any detail that you cannot see running, like a specific function name or option, as a claim to verify.

### Overconfident Reporting

**Overconfident reporting** is when an agent describes its work as done, tested, or working more strongly than the evidence supports. The words are cheerful and complete ("The feature is implemented and verified"), but nothing shows the verifying took place. It is a close cousin of hallucination, and it is easy to miss because a confident summary sounds like a result.

A worked example: an agent writes a delay feature and reports, "Delayed capture works correctly." What did it check? If it ran an automated test that captures after a one-second delay and compared the timing, that is evidence. If it only wrote the code and re-read it, the sentence is a hope. Several acceptance tests in the ScreenGrab case study still had to be run by hand, because only a person at the keyboard could see whether the real screen grab behaved.

The following MicroSim lets you practice the habit this chapter recommends: separating what an agent claims from what it showed. Each claim in a short report comes with the evidence the agent provided, and you decide whether the claim is supported.

#### Diagram: Claim and Evidence Checker

<iframe src="../../sims/agent-claim-evidence-checker/main.html" height="532px" width="100%" scrolling="no"></iframe>

[Run the Claim and Evidence Checker MicroSim Fullscreen](../../sims/agent-claim-evidence-checker/main.html){ .md-button .md-button--primary }

<details markdown="1">
<summary>Claim and Evidence Checker</summary>
Type: microsim
**sim-id:** agent-claim-evidence-checker<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/learning-sciences/tree/main/docs/sims/evidence-loop-authoring<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** judge<br/>
**Learning Objective:** The learner will judge whether each of 8 claims in an illustrative agent report is supported or unsupported by the evidence shown with it, with at least 7 correct.

**Prerequisites:** AI hallucination, overconfident reporting, human review, session log (all defined in this chapter above this block).

**Evidence of Mastery:** For each of 8 claims the learner commits "Supported" or "Unsupported" after reading the evidence panel. A judgment is correct when it matches the "Correct judgment" column in Content. Mastery is 7 of 8 correct. Reading the evidence without committing a judgment is exploration.

**Misconceptions:** (1) A confident, detailed report is a verified report. (2) Code that was written has been run. (3) A passing test of one thing confirms a different claim.

**Instructional Rationale:** Evaluating requires applying a criterion to a case. The criterion here is "does the evidence shown match the claim?", and eight short cases with contrasting evidence make the learner apply it repeatedly rather than recite it.

**Content:**

All reports and evidence are illustrative and the sim labels them "illustrative, not from a real session".

| # | Agent claim | Evidence shown | Correct judgment | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | "All 94 tests pass." | Test run output: "94 passed, 0 failed" | Supported | The output shows the test command ran and counts match the claim |
| 2 | "All tests pass." | None. The log contains no test command | Unsupported | No evidence that tests were run |
| 3 | "The app builds cleanly." | Build output ending in "error: cannot find 'copyImageToClipboard' in scope" | Unsupported | The build output shows an error, which contradicts the claim |
| 4 | "Delayed capture waits 3 seconds." | Unit test of the delay timer: "delay = 3.0 s, passed" | Supported | A passing test targets exactly this claim |
| 5 | "The hotkey works on every Mac." | The author tried the hotkey once on one Mac | Unsupported | One trial on one machine does not support "every Mac" |
| 6 | "The README explains installation." | The README file opened, with an "Install" section listing the install command | Supported | The file was opened and the section exists |
| 7 | "The screen recording permission is handled." | Code reviewed, never run; no permission prompt appeared in testing | Unsupported | Written code that was never run does not show the permission flow works |
| 8 | "The clipboard contains the captured image." | The author pasted into an image viewer and the grab appeared | Supported | A person checked the real result directly |

**Provenance:** Illustrative scenarios written for this chapter. The test count 94 comes from the course description section "How the first version was built". The definitions come from this chapter, sections "AI Hallucination", "Overconfident Reporting" and "Session Log".

**Rules:** Claims appear in the order of the table. A claim is "Supported" only when the evidence shown directly tests that same claim and the result matches it. Evidence that is absent, contradicts the claim, tests something else, or covers a narrower case than the claim makes it "Unsupported".

**Learner Activity:**

1. The learner reads claim 1 and its evidence panel.
2. The learner chooses Supported or Unsupported and confirms the choice.
3. The sim shows whether the judgment was correct, with the Why text.
4. The learner repeats for claims 2 through 8, then sees a summary of correct judgments and the two rules of thumb: "Evidence must test the same claim" and "Written is not run".

**Feedback:** Eight claims, fixed order, one attempt each. The correct judgment and Why text appear immediately after each confirmation. A running count "Correct: n of 8" is shown. The summary shows the claims judged wrongly with their Why text.

**Starting State:** Claim 1 and its evidence are shown with the question "Does the evidence support the claim?"

**Chapter Anchors:** The chapter states that there are 8 claims, that the test count in the example is 94, and that mastery is 7 of 8.
</details>

!!! mascot-encourage "Skepticism Gets Easier"
    ![Pinch encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If asking for evidence feels awkward with a tool that sounds so sure, that is normal. You already do this with a new coworker's first report. Start with one habit: for every "it works," ask "where is the output that shows it?"

## Putting the Pieces Together

Generative AI produces content from learned patterns. An LLM is the text engine behind it, trained to continue text plausibly. An AI coding agent wraps an LLM with tools so it can plan, write source code, run commands, and report. You steer it with prompts, refine with prompt iteration, set its boundaries with permissions and an instructions file, and check its work through human review, with the session log as the record.

| Piece | Job in one phrase |
|---|---|
| Generative AI | Creates new content from learned patterns |
| Large language model | Predicts text one token at a time |
| AI coding agent | Plans, uses tools, and reports on multi-step software tasks |
| Prompt and prompt iteration | Steers the work and refines it in rounds |
| Permissions and instructions file | Set the limits and standing rules |
| Human review and session log | Verify the claims against evidence |

!!! mascot-celebration "You Can Read an Agent Now"
    ![Pinch celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now explain what a coding agent does at each stage, name the points where a person must stay in the loop, and tell a supported claim from an overconfident one. That is the foundation for deciding, in the next chapter, whether to buy, subscribe, or generate.

[See Annotated References](./references.md)
