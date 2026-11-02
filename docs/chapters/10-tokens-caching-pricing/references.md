# References: Tokens, Prompt Caching, and Token Pricing

1. [Byte-pair encoding](https://en.wikipedia.org/wiki/Byte-pair_encoding) - Wikipedia - Explains the subword algorithm many language models use to split text into tokens. Shows why token counts differ from word counts, the basis of token pricing.

2. [Cache (computing)](https://en.wikipedia.org/wiki/Cache_(computing)) - Wikipedia - Describes how caches store results to speed repeated access, including hits, misses, and expiration. Provides the general concept behind prompt caching's write-once, read-cheaply pattern.

3. [Large language model](https://en.wikipedia.org/wiki/Large_language_model) - Wikipedia - Covers tokenization, context windows, and inference in language models. Background for why input and output tokens are priced separately. Read it to see why long prompts cost more.

4. Speech and Language Processing - Daniel Jurafsky and James H. Martin - Prentice Hall (3rd ed. draft online) - Jurafsky and Martin give a clear, worked treatment of tokenization and byte-pair encoding with small examples. Their step-by-step merges make the token concept concrete.

5. Computer Architecture: A Quantitative Approach - John L. Hennessy and David A. Patterson - Morgan Kaufmann - Hennessy and Patterson's average memory access time formula weighs hit time against miss penalty. The same hit-versus-miss reasoning, an analogy only, clarifies when a prompt cache pays off.

6. [Prompt Caching](https://docs.claude.com/en/docs/build-with-claude/prompt-caching) - Anthropic Docs - Official documentation of cache writes, cache reads, lifetimes, and pricing multipliers. The primary source for the caching mechanics and savings in this chapter.

7. [Token Counting](https://docs.claude.com/en/docs/build-with-claude/token-counting) - Anthropic Docs - Explains how to count the tokens in a request before sending it. Lets students check the token figures behind any cost estimate.

8. [Models Overview](https://docs.claude.com/en/docs/about-claude/models/overview) - Anthropic Docs - Lists available model tiers with capabilities and pricing. Supports the chapter's advice to choose the cheapest tier that can do the job.

9. [Summary of the Tokenizers](https://huggingface.co/docs/transformers/tokenizer_summary) - Hugging Face - Compares byte-pair, WordPiece, and SentencePiece tokenization with examples. Shows that tokenizers differ, so token counts vary by model. Read it before comparing token counts between tools.

10. [Let's Build the GPT Tokenizer](https://www.youtube.com/watch?v=zduSFxRajkE) - Andrej Karpathy - A two-hour video that builds a byte-pair tokenizer from scratch and explains its quirks. Gives students an intuition for why tokens behave oddly.
