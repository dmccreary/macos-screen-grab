import AppKit

/// The menu bar item: its menu, and the feedback shown when a grab finishes.
@MainActor
final class StatusMenuController: NSObject, NSMenuDelegate {
    struct Actions {
        let grab: () -> Void
        let grabWithDelay: () -> Void
        let cancel: () -> Void
        let showPreferences: () -> Void
        let showCustomDelay: () -> Void
    }

    private static let idleSymbol = "camera.viewfinder"
    private static let successSymbol = "checkmark.circle"
    private static let captureSoundPath =
        "/System/Library/Components/CoreAudio.component/Contents/SharedSupport/SystemSounds/system/Screen Capture.aif"

    private let settings: AppSettings
    private let actions: Actions
    private let menu = NSMenu()
    private var statusItem: NSStatusItem?
    private var restoreIcon: DispatchWorkItem?
    private var sound: NSSound?
    private var isGrabActive = false

    init(settings: AppSettings, actions: Actions) {
        self.settings = settings
        self.actions = actions
        super.init()
        menu.delegate = self
    }

    func install() {
        let item = NSStatusBar.system.statusItem(withLength: NSStatusItem.squareLength)
        item.button?.image = Self.icon(Self.idleSymbol)
        item.button?.setAccessibilityLabel("ScreenGrab")
        item.menu = menu
        statusItem = item
    }

    func grabStateChanged(_ state: GrabCoordinator.State) {
        isGrabActive = state != .idle
        if state == .freezing { menu.cancelTracking() }
    }

    func menuNeedsUpdate(_ menu: NSMenu) {
        populate(menu)
    }

    /// Rebuilt each time the menu opens, so it always reflects the current settings.
    func populate(_ menu: NSMenu) {
        menu.removeAllItems()

        menu.addItem(grabItem("Grab Region", action: #selector(grabChosen), hotKey: settings.hotKey(for: .region)))
        menu.addItem(grabItem(
            "Grab Region with Delay (\(settings.delaySeconds) s)",
            action: #selector(grabWithDelayChosen),
            hotKey: settings.hotKey(for: .delayedRegion)))
        if isGrabActive {
            menu.addItem(item("Cancel Grab", action: #selector(cancelChosen)))
        }

        menu.addItem(.separator())
        let delayItem = NSMenuItem(title: "Delay", action: nil, keyEquivalent: "")
        delayItem.submenu = delayMenu()
        menu.addItem(delayItem)

        menu.addItem(.separator())
        menu.addItem(item("Preferences…", action: #selector(preferencesChosen), key: ","))
        menu.addItem(item("About ScreenGrab", action: #selector(aboutChosen)))
        menu.addItem(item("Quit ScreenGrab", action: #selector(quitChosen), key: "q"))
    }

    private func delayMenu() -> NSMenu {
        let submenu = NSMenu()
        let current = settings.delaySeconds
        for seconds in DelayPolicy.presets {
            let preset = item("\(seconds) seconds", action: #selector(delayChosen(_:)))
            preset.tag = seconds
            preset.state = seconds == current ? .on : .off
            submenu.addItem(preset)
        }
        let isCustom = !DelayPolicy.presets.contains(current)
        let custom = item(isCustom ? "Custom (\(current) seconds)…" : "Custom…", action: #selector(customDelayChosen))
        custom.state = isCustom ? .on : .off
        submenu.addItem(custom)
        return submenu
    }

    private func item(_ title: String, action: Selector, key: String = "") -> NSMenuItem {
        let item = NSMenuItem(title: title, action: action, keyEquivalent: key)
        item.target = self
        return item
    }

    private func grabItem(_ title: String, action: Selector, hotKey: HotKeyCombo) -> NSMenuItem {
        let item = item(title, action: action, key: hotKey.menuKeyEquivalent)
        item.keyEquivalentModifierMask = hotKey.menuModifierFlags
        return item
    }

    @objc private func grabChosen() { actions.grab() }
    @objc private func grabWithDelayChosen() { actions.grabWithDelay() }
    @objc private func cancelChosen() { actions.cancel() }
    @objc private func preferencesChosen() { actions.showPreferences() }
    @objc private func customDelayChosen() { actions.showCustomDelay() }
    @objc private func delayChosen(_ sender: NSMenuItem) { settings.delaySeconds = sender.tag }
    @objc private func quitChosen() { NSApp.terminate(nil) }

    @objc private func aboutChosen() {
        NSApp.activate(ignoringOtherApps: true)
        NSApp.orderFrontStandardAboutPanel(nil)
    }

    private static func icon(_ symbol: String) -> NSImage? {
        let image = NSImage(systemSymbolName: symbol, accessibilityDescription: "ScreenGrab")
        image?.isTemplate = true
        return image
    }
}

extension StatusMenuController: GrabFeedback {
    func grabSucceeded() {
        if settings.playSound {
            sound = NSSound(contentsOfFile: Self.captureSoundPath, byReference: true) ?? NSSound(named: "Pop")
            sound?.play()
        }

        restoreIcon?.cancel()
        statusItem?.button?.image = Self.icon(Self.successSymbol)
        let work = DispatchWorkItem { [weak self] in
            self?.statusItem?.button?.image = Self.icon(Self.idleSymbol)
        }
        restoreIcon = work
        DispatchQueue.main.asyncAfter(deadline: .now() + 1, execute: work)
    }

    func grabFailed(_ failure: GrabFailure) {
        switch failure {
        case .permissionDenied:
            ScreenRecordingPermission.showDeniedAlert()
        case .captureFailed(let detail):
            Alerts.show(message: "ScreenGrab couldn't capture the screen", info: detail)
        case .outputFailed(let detail):
            Alerts.show(message: "ScreenGrab couldn't copy the grab to the clipboard", info: detail)
        case .saveFailed(let detail):
            Alerts.show(message: "The grab is on the clipboard, but it couldn't be saved", info: detail)
        }
    }
}
