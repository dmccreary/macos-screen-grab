import AppKit

/// The Preferences window. Changes apply immediately; there's no OK or Apply button.
@MainActor
final class PreferencesWindowController: NSWindowController, NSWindowDelegate {
    private static let customDelayTag = 0

    private let settings: AppSettings
    private let failedActions: () -> Set<GrabAction>
    private let onRecordingChanged: (Bool) -> Void

    private let delayPopup = NSPopUpButton(frame: .zero, pullsDown: false)
    private let customField = NSTextField()
    private let customStepper = NSStepper()
    private let customStack = NSStackView()
    private var recorders: [GrabAction: ShortcutRecorderButton] = [:]
    private var warnings: [GrabAction: NSTextField] = [:]
    private var rejections: [GrabAction: HotKeyCombo.Rejection] = [:]
    private let soundCheckbox = NSButton(checkboxWithTitle: "Play sound when a grab is copied", target: nil, action: nil)
    private let saveCheckbox = NSButton(checkboxWithTitle: "Also save a PNG to a folder", target: nil, action: nil)
    private let folderLabel = NSTextField(labelWithString: "")
    private let chooseButton = NSButton(title: "Choose…", target: nil, action: nil)
    private var isCustomDelay = false

    init(
        settings: AppSettings,
        failedActions: @escaping () -> Set<GrabAction>,
        onRecordingChanged: @escaping (Bool) -> Void
    ) {
        self.settings = settings
        self.failedActions = failedActions
        self.onRecordingChanged = onRecordingChanged

        let window = NSWindow(
            contentRect: NSRect(x: 0, y: 0, width: 480, height: 300),
            styleMask: [.titled, .closable],
            backing: .buffered,
            defer: true)
        window.title = "ScreenGrab Preferences"
        window.isReleasedWhenClosed = false
        super.init(window: window)
        window.delegate = self

        buildContent(in: window)
        refresh()
    }

    @available(*, unavailable)
    required init?(coder: NSCoder) { fatalError("init(coder:) is not supported") }

    func show(focusingCustomDelay: Bool = false) {
        if focusingCustomDelay { isCustomDelay = true }
        refresh()
        if window?.isVisible != true { window?.center() }
        NSApp.activate(ignoringOtherApps: true)
        window?.makeKeyAndOrderFront(nil)
        if focusingCustomDelay { window?.makeFirstResponder(customField) }
    }

    func refresh() {
        let delay = settings.delaySeconds
        isCustomDelay = isCustomDelay || !DelayPolicy.presets.contains(delay)
        delayPopup.selectItem(withTag: isCustomDelay ? Self.customDelayTag : delay)
        customStack.isHidden = !isCustomDelay
        customField.integerValue = delay
        customStepper.integerValue = delay

        let failed = failedActions()
        for action in GrabAction.allCases {
            recorders[action]?.combo = settings.hotKey(for: action)
            let message = warningMessage(rejection: rejections[action], registrationFailed: failed.contains(action))
            warnings[action]?.stringValue = message ?? ""
            warnings[action]?.isHidden = message == nil
        }

        soundCheckbox.state = settings.playSound ? .on : .off
        saveCheckbox.state = settings.saveToFolder ? .on : .off
        folderLabel.stringValue = settings.saveFolderPath
        folderLabel.textColor = settings.saveToFolder ? .labelColor : .secondaryLabelColor
        chooseButton.isEnabled = settings.saveToFolder
    }

    func windowWillClose(_ notification: Notification) {
        // Ends any shortcut recording, which also resumes the global hotkeys.
        window?.makeFirstResponder(nil)
    }

    private func warningMessage(rejection: HotKeyCombo.Rejection?, registrationFailed: Bool) -> String? {
        switch rejection {
        case .missingModifier: return "A shortcut needs at least one of ⌃, ⌥, or ⌘."
        case .duplicate: return "The other action already uses that shortcut."
        case nil: return registrationFailed ? "Another app is using this shortcut. Choose a different one." : nil
        }
    }

    // MARK: Layout

    private func buildContent(in window: NSWindow) {
        let grid = NSGridView(views: [
            [fieldLabel("Delay:"), delayRow()],
            [fieldLabel("Grab Region:"), shortcutRow(for: .region)],
            [fieldLabel("Grab Region with Delay:"), shortcutRow(for: .delayedRegion)],
            [NSGridCell.emptyContentView, soundCheckbox],
            [NSGridCell.emptyContentView, saveCheckbox],
            [NSGridCell.emptyContentView, folderRow()],
        ])
        grid.column(at: 0).xPlacement = .trailing
        grid.rowSpacing = 12
        grid.columnSpacing = 10
        grid.rowAlignment = .firstBaseline
        grid.translatesAutoresizingMaskIntoConstraints = false

        soundCheckbox.target = self
        soundCheckbox.action = #selector(soundToggled)
        saveCheckbox.target = self
        saveCheckbox.action = #selector(saveToggled)

        let content = NSView()
        content.addSubview(grid)
        NSLayoutConstraint.activate([
            grid.topAnchor.constraint(equalTo: content.topAnchor, constant: 20),
            grid.bottomAnchor.constraint(equalTo: content.bottomAnchor, constant: -20),
            grid.leadingAnchor.constraint(equalTo: content.leadingAnchor, constant: 20),
            grid.trailingAnchor.constraint(equalTo: content.trailingAnchor, constant: -20),
        ])
        window.contentView = content
    }

    private func fieldLabel(_ text: String) -> NSTextField {
        NSTextField(labelWithString: text)
    }

    private func delayRow() -> NSView {
        for seconds in DelayPolicy.presets {
            delayPopup.addItem(withTitle: "\(seconds) seconds")
            delayPopup.lastItem?.tag = seconds
        }
        delayPopup.addItem(withTitle: "Custom…")
        delayPopup.lastItem?.tag = Self.customDelayTag
        delayPopup.target = self
        delayPopup.action = #selector(delayPopupChanged)

        let formatter = NumberFormatter()
        formatter.minimum = NSNumber(value: DelayPolicy.range.lowerBound)
        formatter.maximum = NSNumber(value: DelayPolicy.range.upperBound)
        formatter.allowsFloats = false
        customField.formatter = formatter
        customField.alignment = .right
        customField.target = self
        customField.action = #selector(customFieldChanged)
        customField.widthAnchor.constraint(equalToConstant: 44).isActive = true
        customField.setAccessibilityLabel("Custom delay in seconds")

        customStepper.minValue = Double(DelayPolicy.range.lowerBound)
        customStepper.maxValue = Double(DelayPolicy.range.upperBound)
        customStepper.target = self
        customStepper.action = #selector(customStepperChanged)

        customStack.orientation = .horizontal
        customStack.spacing = 4
        [customField, customStepper, NSTextField(labelWithString: "seconds")].forEach(customStack.addArrangedSubview)

        let row = NSStackView(views: [delayPopup, customStack])
        row.orientation = .horizontal
        row.spacing = 10
        return row
    }

    private func shortcutRow(for action: GrabAction) -> NSView {
        let recorder = ShortcutRecorderButton(combo: settings.hotKey(for: action))
        recorder.onRecordingChanged = { [weak self] recording in self?.onRecordingChanged(recording) }
        recorder.onRecorded = { [weak self] combo in self?.record(combo, for: action) ?? false }
        recorders[action] = recorder

        let reset = NSButton(title: "Reset", target: self, action: #selector(resetShortcut(_:)))
        reset.tag = GrabAction.allCases.firstIndex(of: action) ?? 0
        reset.setAccessibilityLabel("Reset shortcut to default")

        let controls = NSStackView(views: [recorder, reset])
        controls.orientation = .horizontal
        controls.spacing = 8

        let warning = NSTextField(wrappingLabelWithString: "")
        warning.font = .systemFont(ofSize: NSFont.smallSystemFontSize)
        warning.textColor = .systemRed
        warning.preferredMaxLayoutWidth = 280
        warning.isHidden = true
        warnings[action] = warning

        let column = NSStackView(views: [controls, warning])
        column.orientation = .vertical
        column.alignment = .leading
        column.spacing = 4
        return column
    }

    private func folderRow() -> NSView {
        folderLabel.lineBreakMode = .byTruncatingMiddle
        folderLabel.setContentCompressionResistancePriority(.defaultLow, for: .horizontal)
        folderLabel.widthAnchor.constraint(lessThanOrEqualToConstant: 240).isActive = true
        chooseButton.target = self
        chooseButton.action = #selector(chooseFolder)

        let row = NSStackView(views: [folderLabel, chooseButton])
        row.orientation = .horizontal
        row.spacing = 8
        return row
    }

    // MARK: Actions

    private func record(_ combo: HotKeyCombo, for action: GrabAction) -> Bool {
        if let rejection = HotKeyCombo.validate(combo, other: settings.hotKey(for: action.other)) {
            NSSound.beep()
            rejections[action] = rejection
            refresh()
            return false
        }
        rejections[action] = nil
        settings.setHotKey(combo, for: action)
        return true
    }

    @objc private func resetShortcut(_ sender: NSButton) {
        let action = GrabAction.allCases[sender.tag]
        rejections[action] = nil
        if action.defaultHotKey != settings.hotKey(for: action.other) {
            settings.setHotKey(action.defaultHotKey, for: action)
        } else {
            rejections[action] = .duplicate
            refresh()
        }
    }

    @objc private func delayPopupChanged() {
        let tag = delayPopup.selectedTag()
        isCustomDelay = tag == Self.customDelayTag
        if isCustomDelay {
            refresh()
            window?.makeFirstResponder(customField)
        } else {
            settings.delaySeconds = tag
        }
    }

    @objc private func customFieldChanged() {
        settings.delaySeconds = customField.integerValue
    }

    @objc private func customStepperChanged() {
        settings.delaySeconds = customStepper.integerValue
    }

    @objc private func soundToggled() {
        settings.playSound = soundCheckbox.state == .on
    }

    @objc private func saveToggled() {
        settings.saveToFolder = saveCheckbox.state == .on
    }

    @objc private func chooseFolder() {
        guard let window else { return }
        let panel = NSOpenPanel()
        panel.canChooseDirectories = true
        panel.canChooseFiles = false
        panel.canCreateDirectories = true
        panel.allowsMultipleSelection = false
        panel.prompt = "Choose"
        panel.beginSheetModal(for: window) { [weak self] response in
            guard response == .OK, let url = panel.url else { return }
            self?.settings.saveFolderPath = url.path
        }
    }
}
