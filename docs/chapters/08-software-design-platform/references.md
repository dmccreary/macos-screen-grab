# References: Software Design and Platform Constraints

1. [Software design](https://en.wikipedia.org/wiki/Software_design) - Wikipedia - Defines software design as the process of turning requirements into a plan for implementation, including structure and interfaces. Frames the design document the chapter teaches readers to interpret.

2. [AppKit](https://en.wikipedia.org/wiki/AppKit) - Wikipedia - Describes Apple's framework for building macOS graphical applications, including windows, menus, and events. Background for the native, menu bar design decisions in ScreenGrab.

3. [Screenshot](https://en.wikipedia.org/wiki/Screenshot) - Wikipedia - Explains how screen captures are produced and the operating-system facilities involved. Grounds the chapter's discussion of capture permissions and freeze-frame selection.

4. A Philosophy of Software Design - John Ousterhout - Yaknyan Press - Ousterhout's central idea is the deep module, with a simple interface hiding substantial functionality, as the weapon against complexity. His vocabulary helps readers judge whether a design stays small.

5. Fundamentals of Software Architecture - Mark Richards and Neal Ford - O'Reilly - The authors' first law states that everything in software architecture is a trade-off. That principle underlies the chapter's habit of naming the trade-off behind each design decision.

6. [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/) - Apple Developer - Apple's official design guidance for macOS apps, covering menu bar extras, windows, and system conventions. Explains why a platform-native design feels consistent to users.

7. [NSStatusItem](https://developer.apple.com/documentation/appkit/nsstatusitem) - Apple Developer Documentation - Reference for the menu bar item class used to place an app in the system status bar. Concrete documentation for the menu bar design choice.

8. [ScreenCaptureKit](https://developer.apple.com/documentation/screencapturekit) - Apple Developer Documentation - Documents Apple's framework for capturing screen content, including permission requirements. Shows the platform constraint behind the chapter's permission check. Read it alongside the design's permission check.

9. [Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) - Michael Nygard - Introduces the architecture decision record, a short note capturing context, decision, and consequences. A template for recording the trade-offs a design document explains.

10. [Architecture Decision Records](https://adr.github.io/) - ADR GitHub Organization - Collects ADR templates, tools, and examples from many teams. Gives students ready formats for documenting the design choices they read in this chapter.
