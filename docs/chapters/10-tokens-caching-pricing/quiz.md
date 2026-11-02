# Quiz: Tokens, Prompt Caching, and Token Pricing

Test your understanding of tokens, the context window, prompt caching, token pricing, and model selection with these review questions.

---

#### 1. What is a token?

<div class="upper-alpha" markdown>
1. A software license key
2. A complete sentence of text
3. The smallest piece of text that a language model reads or writes, from a fixed vocabulary of common fragments
4. A single letter of the alphabet
</div>

??? question "Show Answer"
    The correct answer is **C**. A token is not quite a word and not quite a letter. A tokenizer splits text into pieces, so short common words are usually one token while rare words are split into several. A rule of thumb for English is about four characters per token. Tokens are the unit of billing, limits, and time, and exact splits vary by vendor.

    **Concept Tested:** Token

    **See:** [The Token](index.md#the-token)

---

#### 2. What is the context window?

<div class="upper-alpha" markdown>
1. The maximum number of tokens a model can consider at one time, holding input and output together
2. The window in which a cache entry stays valid
3. The user interface of a coding agent
4. The time limit for a single answer
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter compares it to the model's desk: everything on the desk is visible and nothing off it exists. When history nears the limit, an agent usually compacts it by asking the model to write a summary, which is lossy and itself costs tokens. Option B describes cache expiration, which is a time limit rather than a size limit. Options C and D are not what the term means.

    **Concept Tested:** Context Window

    **See:** [The Context Window](index.md#the-context-window)

---

#### 3. In this book's price table, how does the price of a cache read compare with plain input?

<div class="upper-alpha" markdown>
1. Four times as much
2. The same
3. Half as much
4. One twenty-fifth as much, or $0.20 per million tokens against $5.00
</div>

??? question "Show Answer"
    The correct answer is **D**. A cache read costs $0.20 per million tokens, a 96% discount from the $5 plain input price. The vendor stores the work already done on that prefix and reuses it. Option A is the ratio of output to plain input. Because the growing history is read again on nearly every turn, cache reads dominate the token count: the ScreenGrab session used about 18.9 million of them.

    **Concept Tested:** Cache Read Tokens

    **See:** [Cache Read Tokens](index.md#cache-read-tokens)

---

#### 4. Why are output tokens the most expensive token type?

<div class="upper-alpha" markdown>
1. Because vendors dislike long answers
2. Because the model must produce output one token at a time, each depending on the one before, which uses hardware far longer per token
3. Because output tokens are stored in the cache
4. Because output always contains personal data
</div>

??? question "Show Answer"
    The correct answer is **B**. A model processes input in parallel but writes output sequentially. In the book's table, output costs $20 per million, four times plain input and 100 times a cache read. Output includes code, tests, commands, and visible reasoning, so concise specifications that keep the agent from writing unneeded code save real money.

    **Concept Tested:** Output Tokens

    **See:** [Output Tokens](index.md#output-tokens)

---

#### 5. Why does the total input sent over a coding session grow much faster than the conversation itself?

<div class="upper-alpha" markdown>
1. The model forgets earlier turns, so the user retypes them
2. Tokens grow longer over time
3. The model has no memory between requests, so the whole working context is resent on every turn
4. Vendors add hidden text to each request
</div>

??? question "Show Answer"
    The correct answer is **C**. Each request carries instructions, tool definitions, conversation history, file contents, and tool results again. If each turn adds 2,000 tokens, the total sent over 40 turns is 2,000 × 40 × 41 ÷ 2 = 1,640,000 tokens, about 20 times the final 80,000-token conversation. This is the problem prompt caching exists to solve.

    **Concept Tested:** Input Tokens

    **See:** [Input Tokens](index.md#input-tokens)

---

#### 6. What does cache expiration imply for how you should work?

<div class="upper-alpha" markdown>
1. A burst of fast work is cheaper than the same work spread across a day, because a cache unused past its lifetime must be written again
2. Caches never expire, so you can step away freely
3. Longer breaks always make sessions cheaper
4. Expiration only affects output tokens
</div>

??? question "Show Answer"
    The correct answer is **A**. A cached prefix is discarded if it is not used within a time limit, typically a few minutes, and each read usually renews it. If you step away longer than the lifetime, the next request pays to write the context again. Exact limits differ by vendor and change over time, so check current documentation. Options B, C, and D contradict this behavior.

    **Concept Tested:** Cache Expiration

    **See:** [Cache Expiration](index.md#cache-expiration)

---

#### 7. A session adds 2,000 tokens per turn for 40 turns, and the full history is resent each turn. About how many input tokens are sent in total?

<div class="upper-alpha" markdown>
1. 80,000
2. 800,000
3. 164,000
4. 1,640,000
</div>

??? question "Show Answer"
    The correct answer is **D**. Use T = a × n(n+1) ÷ 2 with a = 2,000 and n = 40: 2,000 × 40 × 41 ÷ 2 = 1,640,000 tokens. At $5 per million, that costs $8.20 without caching. Option A is only the final conversation size, 2,000 × 40. The gap between 80,000 and 1,640,000 shows why total input grows faster than a straight line.

    **Concept Tested:** Input Tokens

    **See:** [Input Tokens](index.md#input-tokens)

---

#### 8. A 100,000-token context is sent on each of 40 turns with no caching, at $5 per million input tokens. What is the cost?

<div class="upper-alpha" markdown>
1. $1.28
2. $20.00
3. $0.50
4. $8.20
</div>

??? question "Show Answer"
    The correct answer is **B**. Forty turns of 100,000 tokens is 4,000,000 tokens, and at $5 per million that is $20.00. With caching, the first turn writes the context for $0.50 and the other 39 turns read it at $0.20 per million, for $0.78, a total of $1.28, a saving of about 94%. Option A is the cached total, and option D belongs to the growing-history example.

    **Concept Tested:** Prompt Caching

    **See:** [Prompt Caching](index.md#prompt-caching)

---

#### 9. The first stage of the ScreenGrab build wrote about 206,000 output tokens at $20 per million. What did that output cost?

<div class="upper-alpha" markdown>
1. About $4.12
2. About $41.20
3. About $1.03
4. About $0.41
</div>

??? question "Show Answer"
    The correct answer is **A**. Convert 206,000 tokens to 0.206 million and multiply by $20: 0.206 × 20 = $4.12. This is the cost formula from the chapter applied to the output term alone. Options B, C, and D come from misplacing the decimal point or using the wrong price. Note that the output total is far larger than the roughly 20,000 tokens in the finished app, because output includes reasoning, tests, scripts, and rewritten drafts.

    **Concept Tested:** Token Pricing

    **See:** [Token Pricing](index.md#token-pricing)

---

#### 10. In the first build stage, output was about 41% of the new tokens but about 74% of the spend. What best explains this gap?

<div class="upper-alpha" markdown>
1. Output tokens are served from the cache
2. Input tokens are free
3. Output costs four times as much per token as plain input, so a smaller share of tokens produces a larger share of cost
4. The vendor charges a flat fee per stage
</div>

??? question "Show Answer"
    The correct answer is **C**. At $20 per million, output tokens carry 4 times the price of plain input at $5 per million, so $4.12 of the stage's $5.59 came from output. Writing is the costly activity, which is why a concise specification pays off. Option A is wrong because output tokens cannot be read from a cache, and options B and D contradict the book's pricing model.

    **Concept Tested:** Output Tokens

    **See:** [Output Tokens](index.md#output-tokens)
