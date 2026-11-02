# References: Bugs, Evidence, and Verification Plans

1. [Debugging](https://en.wikipedia.org/wiki/Debugging) - Wikipedia - Covers the process of finding and resolving defects, with common techniques and tools. Frames the reproduction-to-regression-test path taught in the chapter.

2. [Regression testing](https://en.wikipedia.org/wiki/Regression_testing) - Wikipedia - Explains rerunning tests to confirm that changes did not break existing behavior. Supports the chapter's rule that every fixed bug earns a regression test.

3. [Verification and validation](https://en.wikipedia.org/wiki/Verification_and_validation) - Wikipedia - Distinguishes building the product right from building the right product. Underpins the chapter's labeling of a claim's verification status. It separates a passing check from a verified claim.

4. Why Programs Fail: A Guide to Systematic Debugging - Andreas Zeller - Morgan Kaufmann - Zeller treats debugging as scientific method and introduced delta debugging to isolate failure causes automatically. His TRAFFIC steps give a repeatable path from report to fix.

5. Debugging: The 9 Indispensable Rules - David J. Agans - AMACOM - Agans distilled debugging into memorable rules such as make it fail and quit thinking and look. Their plain wording makes disciplined reproduction easy for beginners.

6. [How to Report Bugs Effectively](https://www.chiark.greenend.org.uk/~sgtatham/bugs.html) - Simon Tatham - A classic guide to writing bug reports with exact steps, expected results, and actual results. Teaches the evidence a reader needs to reproduce a problem.

7. [Bug Writing Guidelines](https://bugzilla.mozilla.org/page.cgi?id=bug-writing.html) - Mozilla - Mozilla's guidance on summaries, reproducible steps, and attachments for bug reports. A real project's standard for evidence in a report.

8. [How to Create a Minimal, Reproducible Example](https://stackoverflow.com/help/minimal-reproducible-example) - Stack Overflow - Explains how to shrink a failing case to the smallest code that still shows the problem. A practical method for the reproduction step of investigation.

9. [Effective Troubleshooting](https://sre.google/sre-book/effective-troubleshooting/) - Google SRE Book - Describes a hypothetico-deductive method for diagnosing failures: observe, hypothesize, test. Models the evidence-first investigation the chapter teaches. Read it before debugging a failure you cannot yet explain.

10. [Claude Code: Best Practices for Agentic Coding](https://www.anthropic.com/engineering/claude-code-best-practices) - Anthropic - Recommends giving an agent ways to verify its work, such as tests and screenshots. Supports the chapter's point that generated claims need independent evidence.
