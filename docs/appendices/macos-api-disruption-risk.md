---
title: macOS API Disruption Risk
description: Every Apple API ScreenGrab calls, ranked by how likely a future macOS release is to break or change it.
---

# macOS API Disruption Risk

ScreenGrab is a small app, but it touches a wide slice of macOS: a screen-capture framework, a deprecated event system, a window server, the clipboard, and System Settings. This appendix lists every Apple interface the code in `src/` uses and ranks them from the most likely to cause trouble in a future macOS release to the least.

!!! warning "These are estimates, not measurements"
    The percentages are the author's judgment, based on Apple's deprecation history for each API. They were not checked against the current macOS release notes. Treat them as a way to order the work, and check Apple's release notes before relying on a specific number.

## How to Read the Ranking

Each percentage is the chance that **at least one call in that group needs a source change or workaround within the next three major macOS releases**, roughly three years. A change means the code fails to build, behaves differently, or shows the user something wrong. A deprecation warning that leaves the app working does not count.

Two different things can go wrong, and they have different odds:

- **Interface change.** Apple renames, deprecates, or removes the call. The compiler tells you.
- **Behavior change.** The call still compiles but does something new, such as a new permission prompt. Nothing tells you until a user reports it.

Behavior changes are the bigger threat here, and they score higher in the table for that reason.

## Ranked List

| Rank | API or dependency | Used in | Chance of disruption | Main risk |
|------|-------------------|---------|----------------------|-----------|
| 1 | Hard-coded system sound file path | `StatusMenuController.swift` | 60% | Behavior: file moves or disappears |
| 2 | System Settings URL and pane names | `ScreenRecordingPermission.swift` | 50% | Behavior: link opens the wrong pane |
| 3 | Screen Recording permission (`CGPreflightScreenCaptureAccess`, `CGRequestScreenCaptureAccess`) | `ScreenRecordingPermission.swift` | 45% | Behavior: new prompts or expiry rules |
| 4 | App activation (`NSApp.activate`, `NSRunningApplication.activate`) | `RegionSelector.swift`, `Alerts.swift`, `PreferencesWindowController.swift`, `StatusMenuController.swift` | 45% | Interface and behavior: cooperative activation |
| 5 | ScreenCaptureKit (`SCShareableContent`, `SCContentFilter`, `SCStreamConfiguration`, `SCScreenshotManager`, `SCStreamError`) | `ScreenCapturer.swift` | 35% | Interface: young, fast-moving framework |
| 6 | Ad-hoc code signing and Gatekeeper | `scripts/build-app.sh`, `install.sh` | 30% | Behavior: stricter launch rules |
| 7 | Overlay window behavior (`NSPanel`, window `level`, `collectionBehavior`) | `OverlayViews.swift`, `CountdownHUD.swift` | 30% | Behavior: window server and Spaces changes |
| 8 | Carbon global hotkeys (`RegisterEventHotKey`, `InstallEventHandler`, `GetEventParameter`) | `HotKeyCenter.swift` | 25% | Interface: deprecated for decades, no replacement |
| 9 | Menu bar item (`NSStatusBar`, `NSStatusItem`) | `StatusMenuController.swift` | 20% | Behavior: menu bar redesign, notch hiding |
| 10 | AppKit controls in Preferences (`NSGridView`, `NSStackView`, `NSPopUpButton`, `NSStepper`, `NSOpenPanel`) | `PreferencesWindowController.swift` | 12% | Appearance only |
| 11 | `tccutil` and `PlistBuddy` | `install.sh` | 10% | Interface: command-line flags |
| 12 | Menus and key equivalents (`NSMenu`, `NSMenuItem`, hidden main menu) | `AppDelegate.swift`, `StatusMenuController.swift` | 10% | Behavior: accessory-app menu handling |
| 13 | SF Symbols by name (`NSImage(systemSymbolName:)`) | `StatusMenuController.swift` | 8% | Interface: symbol renamed or retired |
| 14 | Pasteboard (`NSPasteboard`) | `GrabOutput.swift` | 8% | Behavior: new privacy rules |
| 15 | Events, tracking, cursors, drawing (`NSEvent`, `NSTrackingArea`, `NSCursor`, `NSBezierPath`) | `OverlayViews.swift`, `RegionSelector.swift` | 8% | Low: long-stable AppKit core |
| 16 | `NSSound` | `StatusMenuController.swift`, `PreferencesWindowController.swift` | 5% | Low |
| 17 | Image encoding (`CGImage`, `CGImageDestination`, `kCGImageProperty*`) | `ImageEncoder.swift`, `ScreenCapturer.swift` | 4% | Low |
| 18 | Foundation, `UserDefaults`, `UniformTypeIdentifiers`, key code constants | `AppSettings.swift`, `FileNaming.swift`, `HotKeyCombo.swift` | 3% | Very low |

## Why the Top Items Rank Where They Do

### 1. The system sound path

`StatusMenuController.swift` loads the capture sound from a file path inside `/System/Library/Components/CoreAudio.component/`. That is an implementation detail of macOS, not a documented interface, and Apple has moved system resources before. The code already falls back to the named sound "Pop" if the file is missing, so the failure is a different sound rather than a crash. That is why this is the highest-probability item but not the most damaging one.

### 2. The System Settings link

The app opens `x-apple.systempreferences:com.apple.preference.security?Privacy_ScreenCapture`, and the alert text tells the user to look under "Screen & System Audio Recording". Apple has renamed this pane before and rebuilt Settings from the old System Preferences. If the URL stops resolving, the user lands on the wrong page. If the pane is renamed, the written instructions are wrong even when the link works. Both strings are plain text with no compiler check.

### 3. Screen Recording permission

`CGPreflightScreenCaptureAccess` and `CGRequestScreenCaptureAccess` are stable calls, but the rules around them have changed. Apple has tightened screen-capture consent in recent releases, including periodic re-approval prompts for apps that record the screen. A rule change would not alter a single line the compiler sees, yet it could make the grab flow ask for permission at a bad moment. The tests use a stub for `PermissionChecking`, so they cannot catch this.

### 4. App activation

`RegionSelector` calls `NSApp.activate(ignoringOtherApps: true)` so the crosshair cursor and the Esc key work reliably, and `Alerts` uses the same call for modal alerts. Apple changed activation to a cooperative model in macOS 14 and deprecated the `ignoringOtherApps` form. The app still works today. The risk is that Apple makes the old behavior a no-op, in which case the overlay may appear but not take keyboard focus.

### 5. ScreenCaptureKit

ScreenCaptureKit is the newest framework in the app. `SCScreenshotManager` and `captureResolution` both need macOS 14, which is why `Package.swift` sets that as the minimum. A young framework is more likely to have parameters deprecated or replaced than an old one. Apple usually adds to it rather than breaking it, which keeps the number below the permission and activation items. `ScreenCapturer.swift` is the only file that imports it, so a change lands in one place.

## Where the Design Already Helps

Two choices limit the damage:

- **Isolation behind protocols.** `DisplayCapturing`, `PermissionChecking`, `SelectionPresenting`, and `GrabOutputting` hide the risky APIs from `GrabCoordinator`. Replacing ScreenCaptureKit or the permission check touches one file each.
- **Fallbacks where Apple gives none.** The sound path falls back to a named sound, and `HotKeyCenter` records which shortcuts failed to register and shows a warning in Preferences.

The gap is that the string-based items (ranks 1 and 2) and the behavioral ones (ranks 3, 4, 6, and 7) have no automated test. They only fail on a real Mac running the new release.

## What to Do About It

A short checklist for each new macOS release, in the order of the ranking:

1. Run a grab on the new release and confirm the capture sound plays.
2. Click "Open System Settings" in the permission alert and confirm it opens the Screen Recording pane, and that the alert wording matches the pane's name.
3. Revoke the permission, grab again, and watch what the system asks.
4. Start a grab and confirm the crosshair appears and Esc cancels it.
5. Build with the new SDK and read every deprecation warning in `ScreenCapturer.swift` and `HotKeyCenter.swift`.
6. Reinstall with `install.sh` and confirm the app launches without a Gatekeeper block.

## What This Ranking Leaves Out

- **Swift and Xcode tooling.** The Swift toolchain, Swift Testing, and `swift build` change on Apple's developer-tools schedule, not on macOS releases.
- **Third-party code.** `Package.swift` has no external dependencies, so there is nothing to rank there.
- **Hardware.** Notch layout and display geometry affect the menu bar item, but they come from hardware changes rather than API changes.
