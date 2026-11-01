import AppKit
import Carbon.HIToolbox

/// A button that shows a shortcut. Click it, then type a new one; Esc cancels.
final class ShortcutRecorderButton: NSButton {
    var combo: HotKeyCombo {
        didSet { updateTitle() }
    }

    /// Called with each typed shortcut. Returning false keeps recording.
    var onRecorded: ((HotKeyCombo) -> Bool)?
    var onRecordingChanged: ((Bool) -> Void)?

    private var isRecording = false

    init(combo: HotKeyCombo) {
        self.combo = combo
        super.init(frame: .zero)
        bezelStyle = .rounded
        target = self
        action = #selector(clicked)
        updateTitle()
        widthAnchor.constraint(greaterThanOrEqualToConstant: 120).isActive = true
    }

    @available(*, unavailable)
    required init?(coder: NSCoder) { fatalError("init(coder:) is not supported") }

    override var acceptsFirstResponder: Bool { true }

    override func resignFirstResponder() -> Bool {
        stopRecording()
        return super.resignFirstResponder()
    }

    override func performKeyEquivalent(with event: NSEvent) -> Bool {
        guard isRecording else { return super.performKeyEquivalent(with: event) }
        record(event)
        return true
    }

    override func keyDown(with event: NSEvent) {
        guard isRecording else {
            super.keyDown(with: event)
            return
        }
        record(event)
    }

    private func record(_ event: NSEvent) {
        let combo = HotKeyCombo(event: event)
        if Int(event.keyCode) == kVK_Escape, combo.modifiers == 0 {
            stopRecording()
        } else if onRecorded?(combo) == true {
            self.combo = combo
            stopRecording()
        }
    }

    @objc private func clicked() {
        if isRecording {
            stopRecording()
        } else {
            isRecording = true
            window?.makeFirstResponder(self)
            onRecordingChanged?(true)
            updateTitle()
        }
    }

    private func stopRecording() {
        guard isRecording else { return }
        isRecording = false
        onRecordingChanged?(false)
        updateTitle()
    }

    private func updateTitle() {
        title = isRecording ? "Type shortcut…" : combo.displayString
    }
}
