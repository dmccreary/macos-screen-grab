import AppKit
import Carbon.HIToolbox

/// A global shortcut: a virtual key code plus a Carbon modifier mask.
struct HotKeyCombo: Codable, Equatable, Hashable {
    var keyCode: UInt32
    var modifiers: UInt32

    static let defaultRegion = HotKeyCombo(keyCode: UInt32(kVK_ANSI_4), modifiers: UInt32(controlKey | shiftKey))
    static let defaultDelayedRegion = HotKeyCombo(keyCode: UInt32(kVK_ANSI_5), modifiers: UInt32(controlKey | shiftKey))

    init(keyCode: UInt32, modifiers: UInt32) {
        self.keyCode = keyCode
        self.modifiers = modifiers
    }

    init(event: NSEvent) {
        keyCode = UInt32(event.keyCode)
        modifiers = Self.carbonModifiers(from: event.modifierFlags)
    }

    enum Rejection: Equatable {
        case missingModifier
        case duplicate
    }

    /// A shortcut needs ⌃, ⌥, or ⌘, and can't match the other action's shortcut.
    static func validate(_ combo: HotKeyCombo, other: HotKeyCombo) -> Rejection? {
        if combo.modifiers & UInt32(controlKey | optionKey | cmdKey) == 0 { return .missingModifier }
        if combo == other { return .duplicate }
        return nil
    }

    var displayString: String {
        var text = ""
        if modifiers & UInt32(controlKey) != 0 { text += "⌃" }
        if modifiers & UInt32(optionKey) != 0 { text += "⌥" }
        if modifiers & UInt32(shiftKey) != 0 { text += "⇧" }
        if modifiers & UInt32(cmdKey) != 0 { text += "⌘" }
        return text + (Self.keys[Int(keyCode)]?.label ?? "Key \(keyCode)")
    }

    var menuKeyEquivalent: String {
        Self.keys[Int(keyCode)]?.menuKey ?? ""
    }

    var menuModifierFlags: NSEvent.ModifierFlags {
        var flags: NSEvent.ModifierFlags = []
        if modifiers & UInt32(controlKey) != 0 { flags.insert(.control) }
        if modifiers & UInt32(optionKey) != 0 { flags.insert(.option) }
        if modifiers & UInt32(shiftKey) != 0 { flags.insert(.shift) }
        if modifiers & UInt32(cmdKey) != 0 { flags.insert(.command) }
        return flags
    }

    private static func carbonModifiers(from flags: NSEvent.ModifierFlags) -> UInt32 {
        var result = 0
        if flags.contains(.control) { result |= controlKey }
        if flags.contains(.option) { result |= optionKey }
        if flags.contains(.shift) { result |= shiftKey }
        if flags.contains(.command) { result |= cmdKey }
        return UInt32(result)
    }

    private struct Key {
        let label: String
        let menuKey: String
    }

    /// Key names for a US layout.
    private static let keys: [Int: Key] = {
        var table: [Int: Key] = [:]

        let characters: [(Int, String)] = [
            (kVK_ANSI_A, "A"), (kVK_ANSI_B, "B"), (kVK_ANSI_C, "C"), (kVK_ANSI_D, "D"), (kVK_ANSI_E, "E"),
            (kVK_ANSI_F, "F"), (kVK_ANSI_G, "G"), (kVK_ANSI_H, "H"), (kVK_ANSI_I, "I"), (kVK_ANSI_J, "J"),
            (kVK_ANSI_K, "K"), (kVK_ANSI_L, "L"), (kVK_ANSI_M, "M"), (kVK_ANSI_N, "N"), (kVK_ANSI_O, "O"),
            (kVK_ANSI_P, "P"), (kVK_ANSI_Q, "Q"), (kVK_ANSI_R, "R"), (kVK_ANSI_S, "S"), (kVK_ANSI_T, "T"),
            (kVK_ANSI_U, "U"), (kVK_ANSI_V, "V"), (kVK_ANSI_W, "W"), (kVK_ANSI_X, "X"), (kVK_ANSI_Y, "Y"),
            (kVK_ANSI_Z, "Z"), (kVK_ANSI_0, "0"), (kVK_ANSI_1, "1"), (kVK_ANSI_2, "2"), (kVK_ANSI_3, "3"),
            (kVK_ANSI_4, "4"), (kVK_ANSI_5, "5"), (kVK_ANSI_6, "6"), (kVK_ANSI_7, "7"), (kVK_ANSI_8, "8"),
            (kVK_ANSI_9, "9"), (kVK_ANSI_Minus, "-"), (kVK_ANSI_Equal, "="), (kVK_ANSI_LeftBracket, "["),
            (kVK_ANSI_RightBracket, "]"), (kVK_ANSI_Backslash, "\\"), (kVK_ANSI_Semicolon, ";"),
            (kVK_ANSI_Quote, "'"), (kVK_ANSI_Comma, ","), (kVK_ANSI_Period, "."), (kVK_ANSI_Slash, "/"),
            (kVK_ANSI_Grave, "`"),
        ]
        for (code, name) in characters {
            table[code] = Key(label: name, menuKey: name.lowercased())
        }

        let functionKeys = [
            kVK_F1, kVK_F2, kVK_F3, kVK_F4, kVK_F5, kVK_F6, kVK_F7, kVK_F8, kVK_F9, kVK_F10,
            kVK_F11, kVK_F12, kVK_F13, kVK_F14, kVK_F15, kVK_F16, kVK_F17, kVK_F18, kVK_F19, kVK_F20,
        ]
        for (index, code) in functionKeys.enumerated() {
            table[code] = Key(label: "F\(index + 1)", menuKey: functionKey(NSF1FunctionKey + index))
        }

        table[kVK_Return] = Key(label: "↩", menuKey: "\r")
        table[kVK_Tab] = Key(label: "⇥", menuKey: "\t")
        table[kVK_Space] = Key(label: "Space", menuKey: " ")
        table[kVK_Delete] = Key(label: "⌫", menuKey: "\u{8}")
        table[kVK_ForwardDelete] = Key(label: "⌦", menuKey: functionKey(NSDeleteFunctionKey))
        table[kVK_Escape] = Key(label: "⎋", menuKey: "\u{1b}")
        table[kVK_LeftArrow] = Key(label: "←", menuKey: functionKey(NSLeftArrowFunctionKey))
        table[kVK_RightArrow] = Key(label: "→", menuKey: functionKey(NSRightArrowFunctionKey))
        table[kVK_UpArrow] = Key(label: "↑", menuKey: functionKey(NSUpArrowFunctionKey))
        table[kVK_DownArrow] = Key(label: "↓", menuKey: functionKey(NSDownArrowFunctionKey))
        table[kVK_Home] = Key(label: "↖", menuKey: functionKey(NSHomeFunctionKey))
        table[kVK_End] = Key(label: "↘", menuKey: functionKey(NSEndFunctionKey))
        table[kVK_PageUp] = Key(label: "⇞", menuKey: functionKey(NSPageUpFunctionKey))
        table[kVK_PageDown] = Key(label: "⇟", menuKey: functionKey(NSPageDownFunctionKey))
        return table
    }()

    private static func functionKey(_ code: Int) -> String {
        String(utf16CodeUnits: [unichar(code)], count: 1)
    }
}
