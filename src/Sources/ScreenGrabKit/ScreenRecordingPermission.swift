import AppKit
import CoreGraphics

@MainActor
protocol PermissionChecking: AnyObject {
    func ensureGranted() -> Bool
}

@MainActor
final class ScreenRecordingPermission: PermissionChecking {
    private static let settingsURL = URL(
        string: "x-apple.systempreferences:com.apple.preference.security?Privacy_ScreenCapture")!
    private static var isShowingAlert = false

    func ensureGranted() -> Bool {
        if CGPreflightScreenCaptureAccess() { return true }
        // A hotkey can still fire while the alert is up; don't stack a second one.
        guard !Self.isShowingAlert else { return false }
        if CGRequestScreenCaptureAccess() { return true }
        Self.showDeniedAlert()
        return false
    }

    static func showDeniedAlert() {
        guard !isShowingAlert else { return }
        isShowingAlert = true
        defer { isShowingAlert = false }

        let response = Alerts.show(
            message: "ScreenGrab needs Screen Recording permission",
            info: """
                Turn on ScreenGrab in System Settings under Privacy & Security, \
                Screen & System Audio Recording. Then quit and reopen ScreenGrab.
                """,
            buttons: ["Open System Settings", "Cancel"])
        if response == .alertFirstButtonReturn {
            NSWorkspace.shared.open(settingsURL)
        }
    }
}
