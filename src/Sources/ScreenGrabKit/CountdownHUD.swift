import AppKit

@MainActor
protocol CountdownPresenting: AnyObject {
    func start(seconds: Int, onFinish: @escaping () -> Void, onCancel: @escaping () -> Void)
    func stop()
}

/// The panel shown during a delayed grab. It never takes focus, so anything the user
/// is arranging in another app, such as an open menu, stays as it is.
@MainActor
final class CountdownHUD: CountdownPresenting {
    private static let size = CGSize(width: 140, height: 140)
    private static let topMargin: CGFloat = 40

    private var panel: HUDPanel?
    private var content: HUDContentView?
    private var timer: Timer?
    private var deadline = Date()
    private var onFinish: (() -> Void)?

    /// Whole seconds still to show. Computed from a fixed deadline so it can't drift.
    nonisolated static func remainingSeconds(until deadline: Date, now: Date) -> Int {
        max(0, Int(deadline.timeIntervalSince(now).rounded(.up)))
    }

    func start(seconds: Int, onFinish: @escaping () -> Void, onCancel: @escaping () -> Void) {
        stop()
        self.onFinish = onFinish
        deadline = Date().addingTimeInterval(TimeInterval(seconds))

        let content = HUDContentView(frame: NSRect(origin: .zero, size: Self.size), onClick: onCancel)
        let panel = HUDPanel(
            contentRect: NSRect(origin: Self.origin(), size: Self.size),
            styleMask: [.borderless, .nonactivatingPanel],
            backing: .buffered,
            defer: false)
        panel.contentView = content
        panel.orderFrontRegardless()
        self.panel = panel
        self.content = content
        content.show(seconds: seconds)

        // Common modes keep the timer running while the status menu is open.
        let timer = Timer(timeInterval: 0.1, repeats: true) { [weak self] _ in
            MainActor.assumeIsolated { self?.tick() }
        }
        RunLoop.main.add(timer, forMode: .common)
        self.timer = timer
    }

    func stop() {
        timer?.invalidate()
        timer = nil
        panel?.orderOut(nil)
        panel = nil
        content = nil
        onFinish = nil
    }

    private func tick() {
        let remaining = Self.remainingSeconds(until: deadline, now: Date())
        if remaining > 0 {
            content?.show(seconds: remaining)
        } else {
            let finished = onFinish
            stop()
            finished?()
        }
    }

    private static func origin() -> CGPoint {
        let mouse = NSEvent.mouseLocation
        let screen = NSScreen.screens.first { $0.frame.contains(mouse) } ?? NSScreen.main
        let visible = screen?.visibleFrame ?? CGRect(origin: .zero, size: size)
        return CGPoint(x: visible.midX - size.width / 2, y: visible.maxY - size.height - topMargin)
    }
}

private final class HUDPanel: NSPanel {
    override init(
        contentRect: NSRect,
        styleMask style: NSWindow.StyleMask,
        backing backingStoreType: NSWindow.BackingStoreType,
        defer flag: Bool
    ) {
        super.init(contentRect: contentRect, styleMask: style, backing: backingStoreType, defer: flag)
        level = .screenSaver
        collectionBehavior = [.canJoinAllSpaces, .fullScreenAuxiliary, .stationary, .ignoresCycle]
        animationBehavior = .none
        hidesOnDeactivate = false
        isReleasedWhenClosed = false
        isMovable = false
        becomesKeyOnlyIfNeeded = true
        isOpaque = false
        backgroundColor = .clear
        hasShadow = true
    }

    override var canBecomeKey: Bool { false }
    override var canBecomeMain: Bool { false }
}

final class HUDContentView: NSView {
    private let numberLabel = NSTextField(labelWithString: "")
    private let onClick: () -> Void

    init(frame: NSRect, onClick: @escaping () -> Void) {
        self.onClick = onClick
        super.init(frame: frame)
        wantsLayer = true
        layer?.backgroundColor = NSColor.black.withAlphaComponent(0.78).cgColor
        layer?.cornerRadius = 22

        numberLabel.font = .monospacedDigitSystemFont(ofSize: 64, weight: .semibold)
        numberLabel.textColor = .white
        numberLabel.alignment = .center

        let caption = NSTextField(labelWithString: "Click to cancel")
        caption.font = .systemFont(ofSize: 12)
        caption.textColor = NSColor.white.withAlphaComponent(0.8)
        caption.alignment = .center

        let stack = NSStackView(views: [numberLabel, caption])
        stack.orientation = .vertical
        stack.spacing = 4
        stack.translatesAutoresizingMaskIntoConstraints = false
        addSubview(stack)
        NSLayoutConstraint.activate([
            stack.centerXAnchor.constraint(equalTo: centerXAnchor),
            stack.centerYAnchor.constraint(equalTo: centerYAnchor),
        ])
    }

    @available(*, unavailable)
    required init?(coder: NSCoder) { fatalError("init(coder:) is not supported") }

    func show(seconds: Int) {
        let text = String(seconds)
        guard numberLabel.stringValue != text else { return }
        numberLabel.stringValue = text
        setAccessibilityLabel("Grabbing in \(seconds) seconds. Click to cancel.")
    }

    override func acceptsFirstMouse(for event: NSEvent?) -> Bool { true }

    override func hitTest(_ point: NSPoint) -> NSView? {
        frame.contains(point) ? self : nil
    }

    override func mouseDown(with event: NSEvent) {
        onClick()
    }
}
