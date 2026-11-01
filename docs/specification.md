# ScreenGrab — Product Specification

| | |
|---|---|
| **Status** | Draft v0.1 |
| **Date** | 2026-11-01 |
| **Requirements owner** | Dan McCreary |
| **Platform** | macOS only (14 Sonoma or later) |
| **Related documents** | [design.md](design.md) |

## 1. Purpose

ScreenGrab is a small, free, single-purpose macOS utility that replaces the one
part of Snagit that is actually used: **grabbing a rectangular region of the
screen and putting the image on the clipboard**. Snagit moved to an annual
license; the owner only uses it for screen grabs, so paying for the editor,
library, video capture, and sharing features is not worthwhile.

The working name is **ScreenGrab**.

## 2. Goals and non-goals

### 2.1 Goals

1. Capture a user-selected rectangular region of any display with a single
   gesture (hotkey → drag).
2. Capture the same way after a user-configurable countdown, so transient
   content (open menus, hover states, tooltips) can be arranged first.
3. Put the resulting image on the clipboard, ready to paste, **by default and
   without any extra step**.
4. Be tiny, fast, quiet, and invisible until needed (menu bar only).
5. Be buildable from source on the owner's machine with the tools already
   installed (Swift Command Line Tools; no full Xcode required).

### 2.2 Non-goals (v1)

- No image editor, annotation, markup, or effects.
- No full-screen, window, scrolling, or video capture modes.
- No capture library / history, tagging, or cloud sharing.
- No OCR, text grab, or QR scanning.
- No compatibility with Snagit file formats (`.snagx`) or its presets.
- No App Store distribution, notarization, auto-update, or telemetry.

See [§12](#12-out-of-scope-and-future-ideas) for the list of ideas deferred
beyond v1.

## 3. Users and context

**Single user: the owner.** Typical use is capturing parts of web pages, apps,
and diagrams to paste into documents, slide decks, chat, and the figures of
MkDocs-based intelligent textbooks. Because the user pastes into many different
applications, the clipboard image must work broadly (Keynote, Pages, Word,
Google Docs, Slack, browsers, Preview "New from Clipboard", etc.).

The user's display is a Retina laptop panel (2560×1664 native); external
displays and mixed-DPI setups are possible.

## 4. Decisions made during requirements clarification

The following answers were given by the owner and are binding for v1.

| # | Question | Decision |
|---|---|---|
| D1 | Technology | **Native Swift** (Swift Package, AppKit, ScreenCaptureKit) |
| D2 | How a grab is triggered | **Menu bar app + global hotkeys** (menu items as a fallback) |
| D3 | How the delay works | **Presets + custom value.** A visible countdown runs first; when it finishes the region selector appears |
| D4 | Output | **Clipboard only by default.** An optional preference also saves a PNG to a folder (off by default) |
| D5 | Interface complexity | Keep it simple; only *Grab Region* and *Grab Region with Delay* exist in v1 |

One further decision came out of testing during design, and it supports D3 rather
than changing it:

| # | Topic | Decision |
|---|---|---|
| D6 | Selection model | **Freeze-frame.** Every display is captured the instant the selector starts, and the overlay shows that still image. Testing on macOS 26 showed that a background app can't display a crosshair, and activating the app changes what is on screen. Capturing first means those changes never reach the image. See [design §2.1](design.md#21-freeze-frame-selection). |

### 4.1 Assumptions made by the specification author

These were not explicitly discussed; each is a sensible default and is easy to
change. Please veto any that are wrong.

| # | Assumption |
|---|---|
| A1 | The mouse cursor is **not** included in captured images. |
| A2 | Images are captured at the display's **native pixel resolution** (2× on Retina) and are never downscaled. |
| A3 | A selection can't span multiple displays; it is confined to the display where the drag began. |
| A4 | A short confirmation **sound** plays on success (can be turned off). |
| A5 | Default hotkeys are **⌃⇧4** (Grab Region) and **⌃⇧5** (Grab Region with Delay). Both are user-changeable. |
| A6 | Default delay is **5 seconds**; presets are 3, 5, 10, 15 s; custom range is 1–60 s. |
| A7 | The optional save folder defaults to `~/Pictures/ScreenGrab`. |
| A8 | Local-only distribution: built from source, ad-hoc or self-signed, not notarized. |

## 5. Platform and constraints

| Item | Requirement |
|---|---|
| OS | macOS 14.0 (Sonoma) or later. Developed and tested on macOS 26. |
| CPU | Apple Silicon (primary). Intel supported via an optional universal build. |
| Language / UI | Swift 5 language mode (toolchain Swift 6.x), AppKit |
| Capture API | ScreenCaptureKit (`SCScreenshotManager`). `CGWindowListCreateImage` is unavailable on current macOS and is not used. |
| Build tooling | Swift Package Manager and the Xcode Command Line Tools only. **No Xcode.app dependency.** |
| Third-party dependencies | None. |
| Sandboxing | Not sandboxed (personal tool, not App Store). |
| Network | None. The app makes no network connections. |

## 6. Functional requirements

Requirement IDs are stable and referenced from the acceptance tests in
[§10](#10-acceptance-tests).

### 6.1 Application presence (menu bar agent)

| ID | Requirement |
|---|---|
| FR-1.1 | The app runs as a **menu bar agent**: no Dock icon, no app-switcher entry, no main window. |
| FR-1.2 | A status item (icon) appears in the menu bar while the app runs. Clicking it opens the menu described in [§8.1](#81-menu-bar-menu). |
| FR-1.3 | Only **one instance** may run. Launching a second instance exits immediately. |
| FR-1.4 | **Quit** is available from the menu (⌘Q while the menu is open). |
| FR-1.5 | Launching the app shows no windows or alerts. A permission request occurs only when the first grab is attempted (see FR-8.x). |

### 6.2 Grab Region

| ID | Requirement |
|---|---|
| FR-2.1 | *Grab Region* can be started from the menu item or its global hotkey (default ⌃⇧4), regardless of which application is frontmost. |
| FR-2.2 | On start, **every connected display is captured immediately** (freeze-frame). An overlay covers each display, including displays showing full-screen apps, and shows that still image dimmed. The system cursor becomes a **crosshair**. |
| FR-2.3 | The user presses the mouse button, drags to define a rectangle in any direction, and releases. **Release performs the capture immediately** (no confirm step). |
| FR-2.4 | While dragging, the selected area is shown **un-dimmed** with a thin border, and a live label shows the selection size in **pixels** (e.g. `640 × 480`). |
| FR-2.5 | **Esc** or a **right-click** cancels the grab. Cancelling leaves the clipboard untouched and produces no sound. |
| FR-2.6 | A selection smaller than **4 × 4 pixels** (an accidental click) is treated as a cancel. |
| FR-2.7 | ScreenGrab's own overlay, labels, and countdown HUD **never appear in the captured image**. |
| FR-2.8 | The captured image **replaces the clipboard contents** (see [§6.5](#65-output)). |
| FR-2.9 | On success the user gets feedback per [§6.9](#69-feedback-and-errors). |
| FR-2.10 | Starting a grab while another grab or countdown is already in progress is ignored (except the cancel behavior in FR-3.4). |
| FR-2.11 | The grabbed image shows the screen **exactly as it was when the selector started**. Open menus, hover states, tooltips, and active window title bars are preserved, even if the real windows change underneath the overlay. |
| FR-2.12 | When a grab ends by any path, keyboard focus returns to the application that was frontmost before the selector appeared. |

### 6.3 Grab Region with Delay

| ID | Requirement |
|---|---|
| FR-3.1 | *Grab Region with Delay* can be started from the menu item or its global hotkey (default ⌃⇧5). |
| FR-3.2 | The delay is a whole number of seconds, **1–60**, default **5**. Presets of **3, 5, 10, 15** are offered; a custom value may be entered. The current value is shown in the menu item title, e.g. *Grab Region with Delay (5 s)*. |
| FR-3.3 | On start, a **countdown HUD** appears showing the remaining seconds, updating every second. The HUD must **not take keyboard focus or activate ScreenGrab**, so the application and any open menu or hover state the user is preparing is left undisturbed. |
| FR-3.4 | The countdown can be **cancelled** by (a) clicking the HUD, (b) choosing *Cancel Grab* in the menu bar menu (the item is visible only while a countdown or selection is active), or (c) pressing the Grab-with-Delay hotkey again. |
| FR-3.5 | When the countdown reaches zero the HUD closes, the screen is frozen at that instant, and the **same region selector as FR-2.2 – FR-2.8** appears. Anything arranged during the countdown, such as an open menu, is in the frozen image and can be selected. |
| FR-3.6 | The delay in effect **when the countdown starts** is used for that grab; changing it mid-countdown affects only later grabs. |

### 6.4 Region selection behavior

| ID | Requirement |
|---|---|
| FR-4.1 | The selection is confined to the display on which the mouse button went down; dragging beyond that display's edge **clamps** to the edge. |
| FR-4.2 | The overlay must appear above normal windows, the menu bar, and the Dock, and on whichever Space is active. |
| FR-4.3 | The overlay must work on **mixed-DPI** setups (e.g. Retina laptop panel plus a non-Retina external monitor); the captured area exactly matches what was highlighted. |
| FR-4.4 | The size label is placed near the pointer and **stays fully on screen** (flipping side near edges). |
| FR-4.5 | Pointer coordinates and the label are updated at interactive frame rates (no visible lag when dragging). |
| FR-4.6 | The overlay is dismissed on every exit path (success, cancel, error) and the cursor is restored. |

### 6.5 Output

| ID | Requirement |
|---|---|
| FR-5.1 | **Default behavior:** the captured image is written to the general pasteboard as **PNG** and **TIFF** representations so it pastes into the widest range of applications. |
| FR-5.2 | Retina fidelity: the image keeps native pixels (2× on Retina). Its size/DPI metadata is set so that the pasted image appears at the same on-screen size as the captured region (72 × scale DPI). |
| FR-5.3 | The app writes **nothing to disk** unless the optional save preference is enabled (no temp files, no logs containing image data). |
| FR-5.4 | **Optional save (off by default):** when enabled, the same image is also saved as a PNG in the chosen folder, in addition to the clipboard. |
| FR-5.5 | Saved filename: `ScreenGrab yyyy-MM-dd 'at' HH.mm.ss.png` (local time, mirrors macOS's own screenshot naming). If the name already exists, a numeric suffix is added: `… (2).png`. |
| FR-5.6 | The save folder is created if it doesn't exist. If saving fails (permissions, disk full), the clipboard copy still succeeds and the user is shown an error describing the save failure. |

### 6.6 Preferences

A single small Preferences window, opened from the menu (⌘, ) — see the layout
in [§8.4](#84-preferences-window). Changes apply **immediately** (no OK/Apply).

| ID | Requirement |
|---|---|
| FR-6.1 | **Delay**: presets 3 / 5 / 10 / 15 s and *Custom…* with a numeric field (1–60). |
| FR-6.2 | **Hotkeys**: one recorder control for each of the two actions, each with a *reset to default* affordance. |
| FR-6.3 | **Play sound** on successful grab (default on). |
| FR-6.4 | **Also save to folder** checkbox (default off) with a *Choose…* button and the current path displayed. |
| FR-6.5 | Preferences persist across launches (user defaults). |
| FR-6.6 | A quick **Delay** submenu in the menu bar menu offers the presets and checks the current one, so the delay can be changed without opening Preferences. |
| FR-6.7 | Opening the app while it's already running shows Preferences, which gives a way in if the menu bar icon is hidden behind the notch. |

### 6.7 Global hotkeys

| ID | Requirement |
|---|---|
| FR-7.1 | Hotkeys work while any application is frontmost and while ScreenGrab is not the active app. |
| FR-7.2 | Registering hotkeys **must not require Accessibility or Input Monitoring permission**. |
| FR-7.3 | A hotkey must include at least one of ⌃ ⌥ ⌘ (a bare key or ⇧-only combination is rejected by the recorder). |
| FR-7.4 | The two actions can't be assigned the same shortcut. |
| FR-7.5 | If the OS refuses a registration because another app already owns the shortcut, the Preferences window shows a warning next to that control and the menu item remains usable. |
| FR-7.6 | The assigned shortcuts are displayed next to the menu items. |

### 6.8 Permissions

macOS requires **Screen & System Audio Recording** permission to capture the
screen.

| ID | Requirement |
|---|---|
| FR-8.1 | Each grab checks permission before doing anything else (for a delayed grab, before the countdown). If permission is missing, the app asks macOS to show its system prompt; macOS itself limits how often that prompt appears. |
| FR-8.2 | If permission is missing, the grab is aborted and the user sees an alert explaining what is needed, with a button that opens **System Settings → Privacy & Security → Screen & System Audio Recording**. |
| FR-8.3 | The alert states that the app may need to be **quit and reopened** after the permission is granted. |
| FR-8.4 | A grab never produces a silently blank or wallpaper-only image because of missing permission. |

### 6.9 Feedback and errors

| ID | Requirement |
|---|---|
| FR-9.1 | **Success** is signalled by (a) the menu bar icon switching to a checkmark for about one second, and (b) a short system sound, unless sound is turned off. |
| FR-9.2 | **Cancel** is silent and leaves no visible trace. |
| FR-9.3 | **Errors** are shown in a standard alert with a plain-language message. Covered cases: missing permission, no display found, capture failure, clipboard write failure, save failure. |
| FR-9.4 | The overlay and HUD are always torn down, even when an error occurs. |
| FR-9.5 | If a display is connected or disconnected mid-grab, the grab is cancelled cleanly without a crash. |

### 6.10 Installation

| ID | Requirement |
|---|---|
| FR-10.1 | `src/install.sh` tests, builds, signs, and installs the app with one command, then opens it. |
| FR-10.2 | The default destination is `/Applications`, falling back to `~/Applications` if that isn't writable. A destination can also be chosen. |
| FR-10.3 | A failed test or build leaves any installed copy untouched. If replacing the installed copy fails, the previous version is restored. |
| FR-10.4 | The installer refuses to replace or remove an app with a different bundle identifier that happens to be named `ScreenGrab.app`. |
| FR-10.5 | The installer checks its prerequisites first and gives a specific instruction for anything missing. It refuses to run as root. |
| FR-10.6 | The installer can uninstall the app, optionally deleting its preferences, and can clear the app's Screen Recording entry. |
| FR-10.7 | `src/README.md` documents installation, permissions, usage, troubleshooting, and development. |

## 7. Non-functional requirements

| ID | Category | Requirement |
|---|---|---|
| NFR-1 | Responsiveness | Overlay visible within **300 ms** of the hotkey (excluding countdown). This includes capturing the frozen frames. |
| NFR-2 | Capture speed | Release-to-clipboard within **300 ms** for regions up to ~1 megapixel and within **1 s** for a full Retina screen. |
| NFR-3 | Idle cost | ~0 % CPU while idle; resident memory under **50 MB** idle. Frozen frames are released as soon as a grab ends. |
| NFR-4 | Privacy | No network access, no analytics, no persistence of image data unless FR-5.4 is enabled. Preferences contain no image data. |
| NFR-5 | Reliability | No crash on cancel, rapid repeated hotkeys, display changes, or empty clipboard states. |
| NFR-6 | Quality of image | Pixel-exact capture: output pixel size equals selection size × display scale; no resampling blur. |
| NFR-7 | Footprint | Source of about 2,000 lines of Swift, excluding tests; no third-party packages. |
| NFR-8 | Maintainability | Pure logic (geometry conversion, file naming, delay clamping, hotkey validation) is separated from UI and unit-tested. |
| NFR-9 | Accessibility | Menu items and Preferences controls have accessibility labels; every grab can be cancelled from the keyboard (Esc). |
| NFR-10 | Buildability | `src/scripts/build-app.sh` produces a runnable `ScreenGrab.app` on a Mac that has only the Command Line Tools. |

## 8. User interface specification

### 8.1 Menu bar menu

```
 ┌──────────────────────────────────────┐
 │ Grab Region                      ⌃⇧4 │
 │ Grab Region with Delay (5 s)     ⌃⇧5 │
 │ Cancel Grab                          │  ← only while a grab is active
 ├──────────────────────────────────────┤
 │ Delay                               ▸│ → ✓ 3 seconds
 │                                      │     5 seconds   (✓ marks current)
 │                                      │     10 seconds
 │                                      │     15 seconds
 │                                      │     Custom…
 ├──────────────────────────────────────┤
 │ Preferences…                     ⌘,  │
 │ About ScreenGrab                     │
 │ Quit ScreenGrab                  ⌘Q  │
 └──────────────────────────────────────┘
```

Menu bar icon: a template (auto light/dark) SF Symbol — `camera.viewfinder`
normally, `checkmark.circle` for ~1 s after a successful grab.

### 8.2 Region selector overlay

- The frozen image of the display, under a translucent black layer of roughly
  35 % opacity.
- Selected rectangle is cut out (shown at full brightness) with a 1 px white
  border plus a faint dark outline so it is visible on both light and dark
  content.
- Crosshair cursor everywhere on the overlay.
- Size label — white text on a dark rounded pill, e.g. `640 × 480` — follows
  the pointer, offset down-right, flipping to stay on screen.
- Before the drag begins, the label shows the pointer's position in pixels
  (e.g. `1280, 832`) to help with precise starts.

### 8.3 Countdown HUD

- Rounded, translucent dark panel ~140 × 140 pt, horizontally centered near the
  top of the display containing the pointer.
- Large white number (remaining seconds) and a small caption *Click to cancel*.
- Floats above all windows (including full-screen apps), does not take focus.

### 8.4 Preferences window

```
 ┌───────────────  ScreenGrab Preferences  ───────────────┐
 │                                                        │
 │  Delay            [ 5 seconds ▾ ]   (Custom: [ 5 ] s)  │
 │                                                        │
 │  Grab Region               [ ⌃⇧4  ]  [reset]           │
 │  Grab Region with Delay    [ ⌃⇧5  ]  [reset]           │
 │                                                        │
 │  [✓] Play sound when a grab is copied                  │
 │                                                        │
 │  [ ] Also save a PNG to a folder                       │
 │      ~/Pictures/ScreenGrab            [ Choose… ]      │
 │                                                        │
 └────────────────────────────────────────────────────────┘
```

## 9. Defaults

| Setting | Default |
|---|---|
| Delay | 5 s |
| Grab Region hotkey | ⌃⇧4 |
| Grab Region with Delay hotkey | ⌃⇧5 |
| Play sound | On |
| Save to folder | Off |
| Save folder | `~/Pictures/ScreenGrab` |
| Include mouse cursor | No (not configurable in v1) |

## 10. Acceptance tests

Manual acceptance tests (the geometry/naming logic is additionally covered by
automated unit tests; see [design.md](design.md#10-testing-strategy)).

| ID | Scenario | Expected result | Covers |
|---|---|---|---|
| AC-1 | Launch the app | Icon in menu bar; no Dock icon, no window | FR-1.1, 1.2, 1.5 |
| AC-2 | Launch a second copy | Second copy exits; one icon remains | FR-1.3 |
| AC-3 | Press ⌃⇧4 in another app, drag a region | Overlay appears, size label updates, release copies image; sound plays; icon shows ✓ | FR-2.1 – 2.4, 2.8, 2.9 |
| AC-4 | Paste into Preview (*File → New from Clipboard*) and into a Keynote/Pages doc | Image is exactly the selected region at expected size | FR-5.1, 5.2, NFR-6 |
| AC-5 | Start a grab, press Esc | Overlay disappears; clipboard still has its previous content | FR-2.5, 9.2 |
| AC-6 | Start a grab, click once without dragging | Treated as cancel; clipboard unchanged | FR-2.6 |
| AC-7 | Start a grab, right-click | Cancels | FR-2.5 |
| AC-8 | Capture a region containing a Retina photo on a 2× display | Pasted image has 2× pixel dimensions and no blur | FR-5.2, NFR-6 |
| AC-9 | With two displays of different DPI, grab on each | The captured pixels match the highlighted area on both | FR-4.1, 4.3 |
| AC-10 | Drag past the edge of the display | Selection clamps at the edge | FR-4.1 |
| AC-11 | Press ⌃⇧5; wait | HUD counts 5…1, then the selector appears; grab completes normally | FR-3.1 – 3.5 |
| AC-12 | During the countdown, open an app menu and leave it open | Menu stays open during the countdown (the HUD did not steal focus). At zero the selector appears with the menu visible, and the grabbed image includes it | FR-2.11, 3.3, 3.5 |
| AC-13 | During the countdown, click the HUD | Countdown cancelled; no overlay appears | FR-3.4 |
| AC-14 | During the countdown, press ⌃⇧5 again | Countdown cancelled | FR-3.4 |
| AC-15 | During the countdown, use *Cancel Grab* | Countdown cancelled | FR-3.4 |
| AC-16 | Change delay to Custom 8 s and run a delayed grab | HUD counts from 8 | FR-3.2, 6.1 |
| AC-17 | Check that the HUD and overlay are absent from captures | Neither appears in any pasted image | FR-2.7 |
| AC-18 | Enable *Also save a PNG*, grab twice in the same second | Two PNGs in the folder, the second with ` (2)` | FR-5.4, 5.5 |
| AC-19 | Point save folder at an unwritable path | Clipboard copy works; error alert about save | FR-5.6 |
| AC-20 | Save preference off | No files written anywhere | FR-5.3 |
| AC-21 | Revoke Screen Recording permission, then grab | Alert with *Open System Settings*; no image copied | FR-8.1 – 8.4 |
| AC-22 | Record ⌃⇧6 for Grab Region in Preferences, press it | New shortcut works, old one doesn't; persists after relaunch | FR-6.2, 6.5, 7.1 |
| AC-23 | Try to record a bare "A" or ⇧A | Rejected | FR-7.3 |
| AC-24 | Assign a shortcut already used by another app | Warning shown in Preferences | FR-7.5 |
| AC-25 | Press ⌃⇧4 repeatedly while the overlay is up | Ignored; no duplicate overlays | FR-2.10 |
| AC-26 | Unplug a display during a grab | Grab cancels; no crash | FR-9.5 |
| AC-27 | Observe app idle for 1 minute | ~0 % CPU in Activity Monitor | NFR-3 |
| AC-28 | Grab a region that includes the title bar of the frontmost window | Title bar and traffic lights appear active (in color), not greyed out | FR-2.11 |
| AC-29 | Type in a text editor, press ⌃⇧4, complete a grab, then keep typing without clicking. Repeat, cancelling with Esc | The text goes into the editor both times | FR-2.12 |
| AC-30 | Open the app from the Applications folder while it's running | Preferences appears | FR-6.7 |
| AC-31 | Run `src/install.sh` on a clean machine, then again as an upgrade | App is installed and running both times; preferences are kept | FR-10.1, 10.2 |
| AC-32 | Make the build fail, then run the installer | Error shown; the installed app is unchanged and still running | FR-10.3 |
| AC-33 | Put a different app named `ScreenGrab.app` in the destination, then install and uninstall | Both refuse to touch it | FR-10.4 |
| AC-34 | Run `src/install.sh --uninstall --purge` | App and preferences are gone; saved PNGs remain | FR-10.6 |

## 11. Risks and known operating-system behavior

| ID | Risk / behavior | Mitigation |
|---|---|---|
| R1 | macOS ties the Screen Recording grant to the app's **code signature**. An ad-hoc signed app gets a new identity whenever its code changes, so the permission must be re-granted after such a rebuild. | The scripts accept a `SIGN_IDENTITY` so a stable self-signed certificate can be used, as documented in `src/README.md`. The installer warns when the signature has changed. Rebuilds are rare for personal use. |
| R2 | Since macOS 15, the system periodically asks the user to **re-confirm** Screen Recording access for apps that capture the screen. | Out of the app's control; documented. |
| R3 | The selector has to activate ScreenGrab to show a crosshair, which closes other apps' open menus and greys their title bars. | Freeze-frame: the image is captured before activation, so none of this appears in grabs. The remaining effect is that a menu open when the selector starts is closed once the grab ends, including a cancelled one. |
| R4 | The chosen shortcuts may collide with other apps. | Configurable hotkeys; collision warning (FR-7.5). |
| R5 | Content protected by DRM (some video players, Apple TV) captures as black. | OS behavior; documented, no workaround. |
| R6 | Mixed-DPI coordinate conversion bugs (top-left vs bottom-left origins, points vs pixels). | Single tested conversion function; see design §6. |
| R7 | Screen capture uses a macOS API that Apple continues to evolve. | Isolated behind one `ScreenCapturer` type. |
| R8 | Because the screen is frozen, video and animations appear paused during selection. | Intended: the pixels selected are exactly the pixels copied. |

## 12. Out of scope and future ideas

Intentionally **not** part of v1, in rough priority order if the app grows:

1. Launch at login.
2. Hold **Space** while dragging to reposition the selection; arrow-key nudging.
3. Pixel **magnifier loupe** near the cursor for precise edges.
4. Optional **include cursor** setting.
5. Window-snap capture (hover a window to highlight and click to capture it).
6. Small floating **thumbnail** after capture with *Save As…*.
7. Full-screen capture, scrolling capture, delayed full-screen capture.
8. Basic annotation (arrows, boxes, callouts) — the only Snagit feature likely
   worth a future investment for documentation work.
9. Notarized, universal binary distribution.

## 13. Glossary

| Term | Meaning |
|---|---|
| **Region** | An axis-aligned rectangle on a single display chosen by dragging. |
| **Point (pt)** | macOS logical unit. A Retina display has 2 pixels per point. |
| **Overlay** | The borderless, translucent windows that cover each display during region selection. |
| **HUD** | The countdown panel shown during a delayed grab. |
| **TCC** | Transparency, Consent and Control — macOS's privacy-permission system that governs screen recording. |
