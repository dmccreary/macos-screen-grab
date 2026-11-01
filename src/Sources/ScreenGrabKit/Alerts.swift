import AppKit

@MainActor
enum Alerts {
    /// Shows a modal alert from this menu bar app, then returns focus to whichever app
    /// the user was in.
    @discardableResult
    static func show(
        message: String,
        info: String,
        buttons: [String] = ["OK"]
    ) -> NSApplication.ModalResponse {
        let previous = NSWorkspace.shared.frontmostApplication
        let alert = NSAlert()
        alert.alertStyle = .warning
        alert.messageText = message
        alert.informativeText = info
        buttons.forEach { alert.addButton(withTitle: $0) }

        NSApp.activate(ignoringOtherApps: true)
        let response = alert.runModal()
        if let previous, previous.processIdentifier != getpid() {
            previous.activate(options: [])
        }
        return response
    }
}
