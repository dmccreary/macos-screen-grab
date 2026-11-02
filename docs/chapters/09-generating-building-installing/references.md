# References: Generating, Building, and Installing the Code

1. [Compiler](https://en.wikipedia.org/wiki/Compiler) - Wikipedia - Explains how compilers translate source code into executable form, including the kinds of errors they report. Background for the chapter's treatment of compile errors during generation.

2. [Build automation](https://en.wikipedia.org/wiki/Build_automation) - Wikipedia - Describes scripting and tooling that make builds repeatable. Supports the chapter's emphasis on build and installer scripts with rollback. Read it with the installer and uninstall scripts.

3. [Code signing](https://en.wikipedia.org/wiki/Code_signing) - Wikipedia - Covers cryptographic signing of software to establish origin and integrity. Foundation for the chapter's discussion of ad-hoc signing on macOS.

4. The C Programming Language - Brian W. Kernighan and Dennis M. Ritchie - Prentice Hall - Kernighan and Ritchie began with the hello, world program as the first thing a reader compiles and runs. That minimal write-build-run loop became the standard way to teach any toolchain.

5. The Pragmatic Programmer (20th Anniversary Edition) - David Thomas and Andrew Hunt - Addison-Wesley - Hunt and Thomas advocate tracer bullets, automating everything, and keeping all work under version control. Their rules justify the scripted build, install, and commit habits in this chapter.

6. [Pro Git](https://git-scm.com/book/en/v2) - Scott Chacon and Ben Straub - The free, official Git book, covering commits, branches, and history. Explains the version control commands that record each step of a generated build.

7. [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) - Conventional Commits - Specifies a lightweight convention for commit messages that makes history readable. A model for the commit messages that document each generation step.

8. [Notarizing macOS Software Before Distribution](https://developer.apple.com/documentation/security/notarizing-macos-software-before-distribution) - Apple Developer Documentation - Describes Apple's notarization and signing requirements for distributed apps. Shows what ad-hoc signing leaves out for apps shared beyond one machine.

9. [Getting Started with Swift](https://www.swift.org/getting-started/) - Swift.org - Official tutorials for building Swift packages from the command line with swift build. Matches the build workflow used to compile the tool in this chapter.

10. [Make a README](https://www.makeareadme.com/) - Make a README - Gives a section-by-section template for a useful README. Supports the chapter's guidance on documenting install and uninstall steps for a generated tool.
