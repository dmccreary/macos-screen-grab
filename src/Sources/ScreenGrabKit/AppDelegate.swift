import AppKit

/// Startup and wiring. Everything that happens during a grab lives in `GrabCoordinator`.
@MainActor
public final class AppDelegate: NSObject, NSApplicationDelegate {
    private let settings = AppSettings()
    private let hotKeys = HotKeyCenter()
    private var statusMenu: StatusMenuController?
    private var coordinator: GrabCoordinator?
    private var preferences: PreferencesWindowController?

    public override init() {
        super.init()
    }

    public func applicationDidFinishLaunching(_ notification: Notification) {
        if isAnotherInstanceRunning() {
            NSApp.terminate(nil)
            return
        }

        installHiddenMainMenu()

        let statusMenu = StatusMenuController(settings: settings, actions: .init(
            grab: { [weak self] in self?.coordinator?.grabRegion(trigger: .menu) },
            grabWithDelay: { [weak self] in self?.coordinator?.grabRegionWithDelay() },
            cancel: { [weak self] in self?.coordinator?.cancel() },
            showPreferences: { [weak self] in self?.preferences?.show() },
            showCustomDelay: { [weak self] in self?.preferences?.show(focusingCustomDelay: true) }))
        statusMenu.install()
        self.statusMenu = statusMenu

        let settings = settings
        let coordinator = GrabCoordinator(
            capturer: ScreenCapturer(),
            permission: ScreenRecordingPermission(),
            countdown: CountdownHUD(),
            selector: RegionSelector(),
            output: GrabOutput(saveFolder: { settings.activeSaveFolder }),
            feedback: statusMenu,
            delaySeconds: { settings.delaySeconds })
        coordinator.onStateChange = { [weak statusMenu] state in statusMenu?.grabStateChanged(state) }
        self.coordinator = coordinator

        preferences = PreferencesWindowController(
            settings: settings,
            failedActions: { [weak hotKeys] in hotKeys?.failedActions ?? [] },
            onRecordingChanged: { [weak hotKeys] recording in
                if recording { hotKeys?.suspend() } else { hotKeys?.resume() }
            })

        hotKeys.handler = { [weak coordinator] action in
            switch action {
            case .region: coordinator?.grabRegion()
            case .delayedRegion: coordinator?.grabRegionWithDelay()
            }
        }
        settings.onChange = { [weak self] in self?.applySettings() }
        applySettings()

        NotificationCenter.default.addObserver(
            forName: NSApplication.didChangeScreenParametersNotification, object: nil, queue: .main
        ) { [weak coordinator] _ in
            MainActor.assumeIsolated { coordinator?.cancel() }
        }
    }

    /// Opening the app while it's already running shows Preferences. The menu bar icon
    /// can be hidden behind the notch, so this is the way to reach it in that case.
    public func applicationShouldHandleReopen(_ sender: NSApplication, hasVisibleWindows flag: Bool) -> Bool {
        preferences?.show()
        return false
    }

    private func applySettings() {
        hotKeys.apply(settings.hotKeys)
        preferences?.refresh()
    }

    private func isAnotherInstanceRunning() -> Bool {
        guard let id = Bundle.main.bundleIdentifier else { return false }
        return NSRunningApplication.runningApplications(withBundleIdentifier: id)
            .contains { $0 != NSRunningApplication.current }
    }

    /// An accessory app never shows a main menu, but its key equivalents still work.
    /// Without this, ⌘W and the Edit commands do nothing in Preferences.
    private func installHiddenMainMenu() {
        let editMenu = NSMenu(title: "Edit")
        editMenu.addItem(withTitle: "Cut", action: #selector(NSText.cut(_:)), keyEquivalent: "x")
        editMenu.addItem(withTitle: "Copy", action: #selector(NSText.copy(_:)), keyEquivalent: "c")
        editMenu.addItem(withTitle: "Paste", action: #selector(NSText.paste(_:)), keyEquivalent: "v")
        editMenu.addItem(withTitle: "Select All", action: #selector(NSText.selectAll(_:)), keyEquivalent: "a")

        let windowMenu = NSMenu(title: "Window")
        windowMenu.addItem(withTitle: "Close", action: #selector(NSWindow.performClose(_:)), keyEquivalent: "w")

        let mainMenu = NSMenu()
        for submenu in [NSMenu(title: "ScreenGrab"), editMenu, windowMenu] {
            let item = NSMenuItem(title: submenu.title, action: nil, keyEquivalent: "")
            item.submenu = submenu
            mainMenu.addItem(item)
        }
        NSApp.mainMenu = mainMenu
    }
}
