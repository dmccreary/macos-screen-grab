# References: Measuring an AI Session: Time and Cost

1. [Software development effort estimation](https://en.wikipedia.org/wiki/Software_development_effort_estimation) - Wikipedia - Reviews methods for estimating how long and how costly software work will be, and why estimates miss. Frames the chapter's careful, assumption-labeled estimates.

2. [Software metric](https://en.wikipedia.org/wiki/Software_metric) - Wikipedia - Defines measures of software and its development process and cautions against misuse. Supports the chapter's rule that a number needs a stated assumption.

3. [Telemetry](https://en.wikipedia.org/wiki/Telemetry) - Wikipedia - Explains automatic collection and transmission of measurements from remote systems. Background for the usage records from which session costs are computed.

4. How to Measure Anything - Douglas W. Hubbard - Wiley - Hubbard teaches that measurement means reducing uncertainty, not reaching certainty, and uses calibrated estimates and Fermi-style decomposition. This is the right mindset for pricing an AI session from imperfect records.

5. Software Estimation: Demystifying the Black Art - Steve McConnell - Microsoft Press - McConnell popularized the cone of uncertainty and the habit of giving estimate ranges instead of single numbers. His advice shapes how this chapter states cost with assumptions.

6. [Manage Costs Effectively](https://docs.claude.com/en/docs/claude-code/costs) - Anthropic Docs - Explains how Claude Code reports session cost and token usage, and ways to reduce spending. A primary source for reading a real session's usage record.

7. [Monitoring Usage](https://docs.claude.com/en/docs/claude-code/monitoring-usage) - Anthropic Docs - Describes the telemetry metrics Claude Code can export, such as token counts and cost. Shows where the numbers behind a session estimate come from.

8. [ccusage](https://github.com/ryoppippi/ccusage) - GitHub - An open-source command line tool that reads local usage logs and reports tokens and estimated cost by day and session. A concrete example of auditing an AI bill.

9. [Evidence Based Scheduling](https://www.joelonsoftware.com/2007/10/26/evidence-based-scheduling/) - Joel on Software - Spolsky shows how to turn a developer's past estimate accuracy into probability ranges. Illustrates using recorded data to question time claims.

10. [Pricing](https://www.anthropic.com/pricing) - Anthropic - Lists current per-token prices for each model tier. The input rates needed to convert a usage record into dollars. Use them with a usage record to estimate dollars.
