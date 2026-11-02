# ScreenGrab

ScreenGrab is a small macOS menu bar app that does one job: you drag across part of
the screen, and that image is on the clipboard, ready to paste. It covers the one
part of Snagit this project set out to replace, with no subscription, no network
access, and no third-party code.

- **Grab Region** (⌃⇧4): drag a rectangle, and it's copied when you let go.
- **Grab Region with Delay** (⌃⇧5): a countdown runs first, so you can open a menu or
  get a hover state showing. Then you drag a rectangle over the frozen screen.

For the reasoning behind the app, see the [specification](../docs/specification.md)
and the [design](../docs/design.md).

## Contents

- [Requirements](#requirements)
- [Installing](#installing)
- [First run: Screen Recording permission](#first-run-screen-recording-permission)
- [Using ScreenGrab](#using-screengrab)
- [Preferences](#preferences)
- [Updating](#updating)
- [Uninstalling](#uninstalling)
- [Starting at login](#starting-at-login)
- [Keeping the permission across rebuilds](#keeping-the-permission-across-rebuilds)
- [Troubleshooting](#troubleshooting)
- [Privacy](#privacy)
- [Developing](#developing)
- [License](#license)

## Requirements

| Requirement | Details |
|---|---|
| macOS | 14 Sonoma or later |
| Processor | Apple Silicon or Intel (Intel needs `--universal`, or a build on that Mac) |
| Build tools | Xcode Command Line Tools with a Swift 5.9 or later compiler. The full Xcode app isn't needed. |

To install the Command Line Tools:

```bash
xcode-select --install
```

## Installing

From this `src` folder:

```bash
./install.sh
```

The script does the following, and it stops at the first problem:

1. Checks the macOS version and build tools.
2. Runs the unit tests.
3. Builds a release version of `ScreenGrab.app` and signs it.
4. Verifies the build, then copies it into `/Applications`. It falls back to
   `~/Applications` if `/Applications` isn't writable.
5. Quits any running copy and swaps in the new version. If the swap fails, the
   previous version is put back.
6. Opens the app. Look for the viewfinder icon in the menu bar.

The installed app doesn't depend on this source folder afterwards. Don't use `sudo`;
the script refuses to run as root.

### Options

| Option | What it does |
|---|---|
| `--user` | Installs to `~/Applications` instead of `/Applications`. |
| `--dest DIR` | Installs to a folder you choose. |
| `--skip-tests` | Skips the unit tests. |
| `--no-launch` | Doesn't open the app afterwards. A copy that was already running stays closed. |
| `--universal` | Builds for both Apple Silicon and Intel. |
| `-v`, `--verbose` | Shows the full test and build output. |
| `--uninstall` | Removes the app. See [Uninstalling](#uninstalling). |
| `--purge` | With `--uninstall`, also deletes the preferences. |
| `--reset-permission` | Clears the app's Screen Recording entry. See [Troubleshooting](#troubleshooting). |
| `-h`, `--help` | Shows the help. |

The `SIGN_IDENTITY` environment variable sets the signing identity. See
[Keeping the permission across rebuilds](#keeping-the-permission-across-rebuilds).

## First run: Screen Recording permission

macOS requires your approval before any app can capture the screen. Installing
doesn't trigger this; it happens on your first grab.

1. Press **⌃⇧4**. macOS shows its permission request, and ScreenGrab shows an alert
   explaining what it needs.
2. Choose **Open System Settings**. This opens **Privacy & Security > Screen & System
   Audio Recording**.
3. Turn on **ScreenGrab**.
4. Choose **Quit & Reopen** if macOS offers it. Otherwise, quit ScreenGrab from its
   menu and open it again from the Applications folder.
5. Press **⌃⇧4** again. The screen should dim, and you can drag a rectangle.

macOS may occasionally ask you to reconfirm this permission. That's a system
behavior that applies to all screen-capturing apps.

## Using ScreenGrab

### Grab a region

1. Press **⌃⇧4**, or choose **Grab Region** from the menu bar icon.
2. The screen freezes and dims, and the pointer becomes a crosshair. A label shows the
   pointer's position in pixels.
3. Drag across the area you want. The area stays bright, and the label shows its size
   in pixels.
4. Let go. You'll hear a capture sound and the menu bar icon briefly shows a checkmark.
5. Paste with **⌘V** in any app.

### Grab with a delay

Use this for anything that disappears when you press a key or click, such as an open
menu or a tooltip.

1. Press **⌃⇧5**, or choose **Grab Region with Delay**.
2. A countdown appears near the top of the screen. It doesn't take focus, so you can
   keep working in the other app. Open the menu or hover over the item you want.
3. When the countdown reaches zero the screen freezes, with your menu still in the
   picture.
4. Drag across the area you want, as above.

### Cancelling

| When | How to cancel |
|---|---|
| Selecting a region | Press **Esc** or right-click |
| During a countdown | Click the countdown, press **⌃⇧5** again, or choose **Cancel Grab** from the menu |

Cancelling leaves the clipboard as it was. A single click without dragging also
counts as a cancel, as does any selection under 4 pixels wide or tall.

### Good to know

- **The screen is frozen while you select.** The pixels you see are exactly the pixels
  you get. Video and animations appear paused until you finish.
- **Grabs are full Retina resolution.** A region 100 points wide on a 2× display gives
  an image 200 pixels wide. It's tagged so that it pastes at its on-screen size.
- **One display at a time.** A selection stays on the display where the drag began,
  and dragging past the edge stops at the edge.
- **The pointer isn't included** in grabs.
- **ScreenGrab's own windows aren't included** in grabs, and neither is its menu bar icon.
- **A menu left open** when the selector appears closes once you finish the grab,
  because ScreenGrab has to become the active app. It's still in the image.

### The menu

Click the viewfinder icon in the menu bar for **Grab Region**, **Grab Region with
Delay**, a **Delay** submenu for quickly changing the delay, **Preferences**, **About**,
and **Quit**. **Cancel Grab** appears only while a grab is under way.

## Preferences

Open Preferences from the menu bar icon. If the icon is hidden, open ScreenGrab again
from the Applications folder while it's running. Changes take effect immediately.

| Setting | Default | Notes |
|---|---|---|
| Delay | 5 seconds | Presets of 3, 5, 10, and 15 seconds, or a custom value from 1 to 60. |
| Grab Region shortcut | ⌃⇧4 | Click the button, then type a new shortcut. Esc cancels. |
| Grab Region with Delay shortcut | ⌃⇧5 | As above. **Reset** restores the default. |
| Play sound | On | Plays when a grab is copied. |
| Also save a PNG to a folder | Off | Keeps a copy as well as the clipboard image. |
| Save folder | `~/Pictures/ScreenGrab` | Created when needed. |

A shortcut must include at least one of ⌃, ⌥, or ⌘. If another app already owns a
shortcut, a red warning appears beside it. The menu items keep working either way.

Saved files are named like `ScreenGrab 2026-11-01 at 14.05.33.png`. If two grabs land
in the same second, the second one gets ` (2)` added.

## Updating

Pull or edit the source, then run the installer again:

```bash
./install.sh
```

Your preferences are kept. With the default ad-hoc signing, macOS may ask for Screen
Recording permission again after a rebuild. The next section explains how to avoid this.

## Uninstalling

To remove the app and keep its preferences:

```bash
./install.sh --uninstall
```

To remove the app and its preferences, and clear its Screen Recording entry:

```bash
./install.sh --uninstall --purge --reset-permission
```

Any PNGs you chose to save are left in place. The script only removes an app whose
bundle identifier is `com.dmccreary.screengrab`, so it won't delete another app that
happens to have the same name.

## Starting at login

ScreenGrab doesn't add itself to your login items. To start it automatically, open
**System Settings > General > Login Items & Extensions**, click **+** under **Open at
Login**, and choose ScreenGrab from the Applications folder.

## Keeping the permission across rebuilds

By default, the app is *ad-hoc signed*. macOS identifies an ad-hoc signed app by a hash
of its code, so **each rebuild looks like a new app** and the permission has to be
granted again. If you only install once this doesn't matter, but if you plan to
change the code, a free self-signed certificate avoids it. You only need to do this once:

1. Open Keychain Access:

   ```bash
   open -a "Keychain Access"
   ```

2. Choose **Keychain Access > Certificate Assistant > Create a Certificate…**
3. Set **Name** to `ScreenGrab Local`, **Identity Type** to **Self-Signed Root**, and
   **Certificate Type** to **Code Signing**. Then click **Create**.
4. Install using that certificate:

   ```bash
   SIGN_IDENTITY="ScreenGrab Local" ./install.sh
   ```

5. If macOS asks whether `codesign` may use the key, choose **Always Allow**.
6. Grant the Screen Recording permission one more time. From then on, rebuilds signed
   with this certificate keep it.

The script never creates a certificate for you, because that changes your keychain.

## Troubleshooting

### ScreenGrab says permission is missing, but it's switched on

This usually follows a rebuild: the entry in System Settings belongs to the previous
signature. Clear it, then approve the new request:

```bash
./install.sh --reset-permission
```

Then open ScreenGrab, press ⌃⇧4, and follow the
[first-run steps](#first-run-screen-recording-permission). If you've just granted
the permission, you may only need to quit and reopen the app.

### I can't see the menu bar icon

On a Mac with a notch, icons that don't fit are hidden behind it. Quit other menu bar
apps to make room, or hold ⌘ and drag the icon to the left. The hotkeys work either way.
Opening ScreenGrab from the Applications folder while it's running shows Preferences.

### A hotkey does nothing

Work through these in order. The menu items keep working either way.

1. **Check that ScreenGrab is running.** Its icon should be in the menu bar, or look for
   it in Activity Monitor.
2. **Look for a red warning** beside the shortcut in Preferences. A warning means another
   app owns the shortcut, so choose a different one.
3. **Try from a different app.** macOS can block global shortcuts while some apps are in
   front. A focused password field and Terminal's **Secure Keyboard Entry** setting can
   both do this. To see whether anything is holding this mode on, run the following
   command. A line of output gives the ID of the process holding it, and no output means
   nothing is.

   ```bash
   ioreg -l -w 0 | grep -a kCGSSessionSecureInputPID
   ```

4. **Quit and reopen ScreenGrab.**

### The image pastes larger or smaller than expected

Some apps ignore the DPI tag and show a Retina image at twice its on-screen size. The
pixels are correct; resize it in the destination app.

### Part of the image is black

Protected video, such as streaming apps, is blacked out by macOS for every screen
capture tool.

### The installer stops with an error

| Message | What to do |
|---|---|
| `The Command Line Tools aren't installed` | Run `xcode-select --install`, then try again. |
| `Swift won't run` | If you've just installed Xcode, run `sudo xcodebuild -license`. |
| `already exists and isn't this app` | Another app named `ScreenGrab.app` is in that folder. Move it, or use `--dest`. |
| `The test run failed` | Run with `--verbose` to see which test failed. `--skip-tests` installs anyway. |
| `Don't run this with sudo` | Run it without `sudo`. Use `--user` if `/Applications` isn't writable. |

### Reading the app's log

ScreenGrab reports problems in alerts and doesn't write a log of its own. To check for
system messages about it, run:

```bash
log show --last 10m --predicate 'process == "ScreenGrab"' --style compact
```

## Privacy

- ScreenGrab makes no network connections and collects nothing.
- Images stay in memory and on the clipboard. Nothing is written to disk unless you
  turn on **Also save a PNG to a folder**.
- Frozen screen images are released as soon as a grab ends.
- Preferences are stored in `~/Library/Preferences/com.dmccreary.screengrab.plist` and
  contain no image data.

## Developing

### Layout

| Path | Contents |
|---|---|
| `install.sh` | Tests, builds, and installs the app |
| `scripts/build-app.sh` | Builds and signs `dist/ScreenGrab.app` |
| `scripts/test.sh` | Runs the unit tests |
| `Package.swift` | Swift package definition |
| `Info.plist` | App bundle metadata |
| `Sources/ScreenGrab/` | Program entry point |
| `Sources/ScreenGrabKit/` | All application code |
| `Tests/ScreenGrabKitTests/` | Unit tests |

[`docs/design.md`](../docs/design.md) describes each component.

### Common commands

Run the tests:

```bash
scripts/test.sh
```

Run a subset of the tests:

```bash
scripts/test.sh --filter GrabCoordinatorTests
```

Build the app without installing it, which leaves it in `../dist/ScreenGrab.app`:

```bash
scripts/build-app.sh
```

Use `scripts/test.sh` rather than `swift test` on its own. With only the Command Line
Tools installed, `swift test` can't always find Swift Testing or its macro plugin, and
fails with `no such module 'Testing'`. This script supplies their locations.

### What the tests cover

The tests need no permissions, don't touch your real clipboard, and put nothing on
screen. They cover selection geometry, pixel-exact cropping, image encoding, the
clipboard, file naming and saving, hotkeys, settings, every state of the grab state
machine, overlay mouse and keyboard handling, and overlay rendering.

Set `SCREENGRAB_TEST_RENDER_DIR` to a folder to keep PNGs of the rendered overlay,
countdown, and Preferences window for review.

Real screen capture needs the Screen Recording permission and a person moving the
pointer, so it's checked by hand with the acceptance tests in
[the specification](../docs/specification.md#10-acceptance-tests).

## License

ScreenGrab is free and open source under the [MIT License](../LICENSE).
