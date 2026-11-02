# Quiz: Generative AI and Coding Agents

Test your understanding of generative AI, large language models, prompts, AI coding agents, human review, sessions, and the ways an agent can be wrong with these review questions.

---

#### 1. What is an AI coding agent?

<div class="upper-alpha" markdown>
1. A chat window that answers one question and stops
2. A search engine that finds existing programs
3. A program that uses an LLM to carry out multi-step software tasks, reading files, running commands, and checking results
4. A compiler that translates source code into an app
</div>

??? question "Show Answer"
    The correct answer is **C**. An agent keeps going where a plain chat stops: it reads your files, decides what to do, edits files, runs commands, observes the results, and tries again. The LLM is the reasoning engine, and the agent supplies the hands. Option A describes an LLM chat, and option D describes a compiler, which Chapter 9 covers. Option B describes search, which only finds what already exists.

    **Concept Tested:** AI Coding Agent

    **See:** [AI Coding Agents](index.md#ai-coding-agents)

---

#### 2. What is an agent instructions file?

<div class="upper-alpha" markdown>
1. A text file in a project that tells the agent how to behave there, which the agent reads at the start of each session
2. A log of every command the agent has run
3. The compiled version of the application
4. A list of the user's passwords for the agent to use
</div>

??? question "Show Answer"
    The correct answer is **A**. The instructions file holds build commands, style rules, and things never to do, so you state a rule once instead of repeating it in every prompt. In this book's project, `CLAUDE.md` contains one line pointing to `AGENTS.md`, which holds the rules every coding agent must follow. Option B describes a session log, and option C describes the built product. Option D is not what such a file is for.

    **Concept Tested:** Agent Instructions File

    **See:** [Agent Instructions File](index.md#agent-instructions-file)

---

#### 3. What is a session log?

<div class="upper-alpha" markdown>
1. A list of the features requested in the first prompt
2. The agent's own summary of what it believes it accomplished
3. A calendar of when a subscription renews
4. The recorded history of a session: the prompts, replies, tool calls, and results, in order
</div>

??? question "Show Answer"
    The correct answer is **D**. A session log answers "what actually happened?" without relying on anyone's memory or the agent's own summary. You can use it to find where a wrong turn began, count tokens, or check whether a claimed test run occurred. Option B is exactly what the log lets you verify, since a summary is a claim and the log is the evidence. Options A and C describe unrelated records.

    **Concept Tested:** Session Log

    **See:** [AI Sessions and Session Logs](index.md#ai-sessions-and-session-logs)

---

#### 4. Why is a large language model weak at knowing whether its own output is true?

<div class="upper-alpha" markdown>
1. It cannot produce fluent text
2. It was trained to continue text plausibly, not to check facts
3. It has no training data about code
4. It always refuses to answer questions about facts
</div>

??? question "Show Answer"
    The correct answer is **B**. An LLM generates its answer one token at a time, choosing likely continuations from patterns in its training text. That makes it strong at fluent text and regular code, but plausibility is not correctness. It can use only what is in the current conversation plus what it absorbed in training, and running the code to confirm it works is a separate step. Options A and C are the opposite of its strengths, and D is false.

    **Concept Tested:** Large Language Model

    **See:** [Large Language Models](index.md#large-language-models)

---

#### 5. What is the main practical difference between an LLM chat and an AI coding agent?

<div class="upper-alpha" markdown>
1. An agent makes changes directly in your files, can run the code, and reacts to errors on its own, while a chat gives text you copy and paste
2. A chat can run commands, but an agent cannot
3. A chat produces code, but an agent only produces documentation
4. They differ only in the color of the interface
</div>

??? question "Show Answer"
    The correct answer is **A**. In a chat you receive text, then do the work yourself and paste results back. An agent, like a friend hired to sit at your desk, opens the project, makes the change, runs the build, and sees the result. The chapter's example is a build that fails on a misspelled variable, which the agent reads, fixes, and rebuilds without being asked. Option B reverses the two, and options C and D are incorrect.

    **Concept Tested:** AI Coding Agent

    **See:** [AI Coding Agents](index.md#ai-coding-agents)

---

#### 6. How do clarifying questions help keep a generated tool small?

<div class="upper-alpha" markdown>
1. They make the agent write code more slowly
2. They remove the need to review the output
3. Each answer can rule out whole features, such as choosing clipboard only, which avoids file saving, a folder setting, and a format option
4. They require the user to write the full specification first
</div>

??? question "Show Answer"
    The correct answer is **C**. Clarifying questions settle choices the request left open, and choosing the smaller option removes features that would otherwise be generated, tested, and maintained. In the ScreenGrab session, four multiple-choice questions let the author pick options instead of writing long answers. Option B is wrong because human review is still required, and options A and D misstate the purpose of the questions.

    **Concept Tested:** Clarifying Questions

    **See:** [Clarifying Questions](index.md#clarifying-questions)

---

#### 7. An agent's report says "all tests pass." What should you look for in the session log to support that claim?

<div class="upper-alpha" markdown>
1. The agent's confident wording in the final report
2. The number of lines of code in the project
3. The length of the conversation
4. A test command that actually ran and printed passing results
</div>

??? question "Show Answer"
    The correct answer is **D**. The log turns an assertion into something verifiable. If it shows the test command ran and printed, for example, 94 passing tests, the claim is supported. If the log shows no test command, the claim has no evidence behind it. Option A is the claim itself, not evidence. Options B and C do not show that tests ran. This habit is the antidote to overconfident reporting.

    **Concept Tested:** Session Log

    **See:** [AI Sessions and Session Logs](index.md#ai-sessions-and-session-logs)

---

#### 8. The agent proposes saving screen grabs to a folder, and you reply, "No file saving; the image goes to the clipboard only." What practice is this?

<div class="upper-alpha" markdown>
1. Agent planning
2. Prompt iteration, which refines a prompt in rounds using what each result shows
3. An AI hallucination
4. A permission check
</div>

??? question "Show Answer"
    The correct answer is **B**. Prompt iteration treats the first answer as a draft and the second prompt as an edit. Here a single sentence made the result smaller and closer to the goal. The chapter notes that a short prompt iterated three times often beats a long prompt written once. Agent planning (A) is the agent's own step of ordering actions. A hallucination (C) is false output, and a permission check (D) asks you to approve an action.

    **Concept Tested:** Prompt Iteration

    **See:** [Prompt Iteration](index.md#prompt-iteration)

---

#### 9. Which permission setting does the chapter suggest for deleting files or running commands outside the project folder?

<div class="upper-alpha" markdown>
1. Allow without asking, because the agent is fast
2. Allow only on the first day of a project
3. Always ask, because the actions are hard to reverse and outside the task
4. Never allow reads of project files
</div>

??? question "Show Answer"
    The correct answer is **C**. The chapter's sample setup allows reading files freely, asks at first before edits and then relaxes once you trust the plan, allows the documented build and test commands, and always asks before deleting files or running commands outside the project. Reading changes nothing, and project edits can be undone under version control, but deletions are hard to reverse. Tighter permissions mean more interruptions and more safety.

    **Concept Tested:** Agent Permissions

    **See:** [Agent Permissions](index.md#agent-permissions)

---

#### 10. Why is a hallucination that compiles and runs more dangerous than one the compiler rejects?

<div class="upper-alpha" markdown>
1. A compiled hallucination can do the wrong thing silently, such as a hotkey that appears registered but never fires, while a rejected one fails loudly
2. A rejected hallucination deletes the project
3. Compilers cannot detect any hallucination
4. Compiled hallucinations always run faster
</div>

??? question "Show Answer"
    The correct answer is **A**. A call to a nonexistent function such as `copyImageToClipboard()` is rejected by the compiler, which is the good outcome because the failure is visible. The dangerous cases produce no error but behave wrongly, and the case study contains an unexplained early hotkey failure as an example. Remedies include preferring agents that can build and test, asking for actual command output, and verifying details you cannot see running.

    **Concept Tested:** AI Hallucination

    **See:** [AI Hallucination](index.md#ai-hallucination)
