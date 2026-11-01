import AppKit
import Carbon.HIToolbox
import Testing
@testable import ScreenGrabKit

struct HotKeyComboTests {
    @Test func defaultsDisplayAsSpecified() {
        #expect(HotKeyCombo.defaultRegion.displayString == "⌃⇧4")
        #expect(HotKeyCombo.defaultDelayedRegion.displayString == "⌃⇧5")
    }

    @Test func displayOrdersModifiersTheMacWay() {
        let combo = HotKeyCombo(keyCode: UInt32(kVK_ANSI_S), modifiers: UInt32(cmdKey | shiftKey | optionKey | controlKey))
        #expect(combo.displayString == "⌃⌥⇧⌘S")
    }

    @Test func aBareKeyOrShiftOnlyIsRejected() {
        let other = HotKeyCombo.defaultDelayedRegion
        let bare = HotKeyCombo(keyCode: UInt32(kVK_ANSI_A), modifiers: 0)
        let shiftOnly = HotKeyCombo(keyCode: UInt32(kVK_ANSI_A), modifiers: UInt32(shiftKey))
        #expect(HotKeyCombo.validate(bare, other: other) == .missingModifier)
        #expect(HotKeyCombo.validate(shiftOnly, other: other) == .missingModifier)
    }

    @Test("Each of ⌃, ⌥, and ⌘ is enough", arguments: [controlKey, optionKey, cmdKey])
    func anyRequiredModifierIsAccepted(modifier: Int) {
        let combo = HotKeyCombo(keyCode: UInt32(kVK_ANSI_A), modifiers: UInt32(modifier))
        #expect(HotKeyCombo.validate(combo, other: .defaultRegion) == nil)
    }

    @Test func theOtherActionsShortcutIsRejected() {
        #expect(HotKeyCombo.validate(.defaultRegion, other: .defaultRegion) == .duplicate)
    }

    @Test func menuEquivalentsMatchTheShortcut() {
        #expect(HotKeyCombo.defaultRegion.menuKeyEquivalent == "4")
        #expect(HotKeyCombo.defaultRegion.menuModifierFlags == [.control, .shift])

        let function = HotKeyCombo(keyCode: UInt32(kVK_F5), modifiers: UInt32(cmdKey))
        #expect(function.displayString == "⌘F5")
        #expect(function.menuKeyEquivalent == String(utf16CodeUnits: [unichar(NSF5FunctionKey)], count: 1))
    }

    @Test func unknownKeysStillHaveALabel() {
        let combo = HotKeyCombo(keyCode: 200, modifiers: UInt32(cmdKey))
        #expect(combo.displayString == "⌘Key 200")
        #expect(combo.menuKeyEquivalent == "")
    }

    @Test func comboIsReadFromAKeyEvent() throws {
        let event = try #require(NSEvent.keyEvent(
            with: .keyDown, location: .zero, modifierFlags: [.command, .option], timestamp: 0, windowNumber: 0,
            context: nil, characters: "k", charactersIgnoringModifiers: "k", isARepeat: false,
            keyCode: UInt16(kVK_ANSI_K)))
        #expect(HotKeyCombo(event: event) == HotKeyCombo(keyCode: UInt32(kVK_ANSI_K), modifiers: UInt32(cmdKey | optionKey)))
    }
}

@MainActor
struct HotKeyCenterTests {
    // An unusual combination, unlikely to collide with anything on a real machine.
    private let combos: [GrabAction: HotKeyCombo] = [
        .region: HotKeyCombo(keyCode: UInt32(kVK_F18), modifiers: UInt32(controlKey | optionKey | shiftKey | cmdKey)),
        .delayedRegion: HotKeyCombo(keyCode: UInt32(kVK_F17), modifiers: UInt32(controlKey | optionKey | shiftKey | cmdKey)),
    ]

    @Test func registersShortcuts() {
        let center = HotKeyCenter()
        defer { center.suspend() }
        center.apply(combos)
        #expect(center.failedActions.isEmpty)
    }

    @Test func reportsAShortcutThatIsAlreadyTaken() {
        let owner = HotKeyCenter()
        defer { owner.suspend() }
        owner.apply(combos)

        let late = HotKeyCenter()
        defer { late.suspend() }
        late.apply(combos)

        #expect(late.failedActions == Set(GrabAction.allCases))
    }

    /// Sends the same Carbon event the system delivers for a key press, which tests
    /// everything after the key press itself.
    @Test func aHotKeyEventReachesTheHandler() async throws {
        let center = HotKeyCenter()
        defer { center.suspend() }
        var fired: [GrabAction] = []
        center.handler = { fired.append($0) }
        center.apply(combos)

        var event: EventRef?
        let created = CreateEvent(
            nil, OSType(kEventClassKeyboard), UInt32(kEventHotKeyPressed), 0,
            EventAttributes(kEventAttributeNone), &event)
        #expect(created == noErr)

        // IDs follow GrabAction's order, so 2 is the delayed grab.
        var id = EventHotKeyID(signature: 0x5347_5242, id: 2)
        let set = SetEventParameter(
            event, EventParamName(kEventParamDirectObject), EventParamType(typeEventHotKeyID),
            MemoryLayout<EventHotKeyID>.size, &id)
        #expect(set == noErr)

        #expect(SendEventToEventTarget(event, GetEventDispatcherTarget()) == noErr)
        #expect(await eventually { fired == [.delayedRegion] })
    }

    @Test func suspendingReleasesShortcutsAndResumingTakesThemBack() {
        let first = HotKeyCenter()
        defer { first.suspend() }
        first.apply(combos)
        first.suspend()

        let second = HotKeyCenter()
        second.apply(combos)
        #expect(second.failedActions.isEmpty)
        second.suspend()

        first.resume()
        #expect(first.failedActions.isEmpty)
    }
}

@MainActor
struct AppSettingsTests {
    private func makeSettings() -> (AppSettings, UserDefaults) {
        let defaults = InMemoryDefaults()
        return (AppSettings(defaults: defaults), defaults)
    }

    @Test func defaultsMatchTheSpecification() {
        let (settings, _) = makeSettings()
        #expect(settings.delaySeconds == 5)
        #expect(settings.playSound)
        #expect(!settings.saveToFolder)
        #expect(settings.activeSaveFolder == nil)
        #expect(settings.saveFolderPath == "~/Pictures/ScreenGrab")
        #expect(settings.hotKey(for: .region) == .defaultRegion)
        #expect(settings.hotKey(for: .delayedRegion) == .defaultDelayedRegion)
    }

    @Test("Delay is clamped to 1–60", arguments: [(-5, 1), (0, 1), (1, 1), (8, 8), (60, 60), (61, 60), (999, 60)])
    func delayIsClamped(input: Int, expected: Int) {
        let (settings, _) = makeSettings()
        settings.delaySeconds = input
        #expect(settings.delaySeconds == expected)
    }

    @Test func aBadStoredDelayIsClampedOnRead() {
        let (settings, defaults) = makeSettings()
        defaults.set(5000, forKey: "delaySeconds")
        #expect(settings.delaySeconds == 60)
    }

    @Test func settingsPersistAcrossInstances() {
        let (settings, defaults) = makeSettings()
        let custom = HotKeyCombo(keyCode: UInt32(kVK_ANSI_6), modifiers: UInt32(controlKey | shiftKey))
        settings.delaySeconds = 8
        settings.playSound = false
        settings.saveToFolder = true
        settings.setHotKey(custom, for: .region)

        let reopened = AppSettings(defaults: defaults)
        #expect(reopened.delaySeconds == 8)
        #expect(!reopened.playSound)
        #expect(reopened.saveToFolder)
        #expect(reopened.hotKey(for: .region) == custom)
    }

    @Test func aCorruptStoredShortcutFallsBackToTheDefault() {
        let (settings, defaults) = makeSettings()
        defaults.set(Data([1, 2, 3]), forKey: "hotKey.region")
        #expect(settings.hotKey(for: .region) == .defaultRegion)
    }

    @Test func theSaveFolderExpandsTildeOnlyWhenActive() {
        let (settings, _) = makeSettings()
        settings.saveFolderPath = NSHomeDirectory() + "/Grabs"
        #expect(settings.saveFolderPath == "~/Grabs")
        #expect(settings.activeSaveFolder == nil)

        settings.saveToFolder = true
        #expect(settings.activeSaveFolder?.path == NSHomeDirectory() + "/Grabs")
    }

    @Test func changesFireTheCallback() {
        let (settings, _) = makeSettings()
        var count = 0
        settings.onChange = { count += 1 }
        settings.delaySeconds = 3
        settings.playSound = false
        settings.setHotKey(.defaultRegion, for: .region)
        #expect(count == 3)
    }
}
