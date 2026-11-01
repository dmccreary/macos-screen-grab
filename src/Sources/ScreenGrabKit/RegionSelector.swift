import AppKit

@MainActor
protocol SelectionPresenting: AnyObject {
    func begin(_ frames: [FrozenDisplay], onFinish: @escaping (GrabSelection?) -> Void)
    func cancel()
}

/// Shows one overlay per display and reports the chosen rectangle.
///
/// The frames were captured before this runs, so activating the app here can't affect
/// the image. Activation is what makes the crosshair and Esc reliable. See design §2.1.
@MainActor
final class RegionSelector: SelectionPresenting {
    private var panels: [OverlayPanel] = []
    private var onFinish: ((GrabSelection?) -> Void)?
    private var previousApp: NSRunningApplication?
    private var activationObserver: NSObjectProtocol?

    func begin(_ frames: [FrozenDisplay], onFinish: @escaping (GrabSelection?) -> Void) {
        self.onFinish = onFinish
        previousApp = NSWorkspace.shared.frontmostApplication

        panels = frames.map { display in
            OverlayPanel(display: display) { [weak self] pointRect in
                self?.finish(pointRect.map { GrabSelection(display: display, pointRect: $0) })
            }
        }
        panels.forEach { $0.orderFrontRegardless() }

        let mouse = NSEvent.mouseLocation
        let keyPanel = panels.first { $0.frame.contains(mouse) } ?? panels.first
        keyPanel?.makeKeyAndOrderFront(nil)
        keyPanel?.focusSelectionView()

        activationObserver = NotificationCenter.default.addObserver(
            forName: NSApplication.didBecomeActiveNotification, object: nil, queue: .main
        ) { _ in NSCursor.crosshair.set() }
        NSApp.activate(ignoringOtherApps: true)
        NSCursor.crosshair.set()
    }

    func cancel() {
        finish(nil)
    }

    /// Runs once, on every exit path.
    private func finish(_ selection: GrabSelection?) {
        guard let onFinish else { return }
        self.onFinish = nil

        if let activationObserver {
            NotificationCenter.default.removeObserver(activationObserver)
        }
        activationObserver = nil

        panels.forEach { $0.orderOut(nil) }
        panels.removeAll()
        NSCursor.arrow.set()

        if let previousApp, previousApp.processIdentifier != getpid() {
            previousApp.activate(options: [])
        }
        previousApp = nil

        onFinish(selection)
    }
}
