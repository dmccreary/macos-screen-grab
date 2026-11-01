import Foundation

enum GrabAction: String, CaseIterable, Hashable {
    case region
    case delayedRegion

    var defaultHotKey: HotKeyCombo {
        switch self {
        case .region: return .defaultRegion
        case .delayedRegion: return .defaultDelayedRegion
        }
    }

    var other: GrabAction {
        self == .region ? .delayedRegion : .region
    }
}

enum DelayPolicy {
    static let presets = [3, 5, 10, 15]
    static let range = 1...60
    static let defaultSeconds = 5

    static func clamp(_ seconds: Int) -> Int {
        min(max(seconds, range.lowerBound), range.upperBound)
    }
}

/// Typed access to user defaults. Changes apply immediately through `onChange`.
@MainActor
final class AppSettings {
    private enum Key {
        static let delaySeconds = "delaySeconds"
        static let playSound = "playSound"
        static let saveToFolder = "saveToFolder"
        static let saveFolderPath = "saveFolderPath"
        static func hotKey(_ action: GrabAction) -> String { "hotKey.\(action.rawValue)" }
    }

    static let defaultSaveFolderPath = "~/Pictures/ScreenGrab"

    var onChange: (() -> Void)?

    private let defaults: UserDefaults

    init(defaults: UserDefaults = .standard) {
        self.defaults = defaults
    }

    var delaySeconds: Int {
        get {
            DelayPolicy.clamp(defaults.object(forKey: Key.delaySeconds) as? Int ?? DelayPolicy.defaultSeconds)
        }
        set {
            defaults.set(DelayPolicy.clamp(newValue), forKey: Key.delaySeconds)
            onChange?()
        }
    }

    var playSound: Bool {
        get { defaults.object(forKey: Key.playSound) as? Bool ?? true }
        set {
            defaults.set(newValue, forKey: Key.playSound)
            onChange?()
        }
    }

    var saveToFolder: Bool {
        get { defaults.bool(forKey: Key.saveToFolder) }
        set {
            defaults.set(newValue, forKey: Key.saveToFolder)
            onChange?()
        }
    }

    /// The path as the user sees it, with `~` for the home folder.
    var saveFolderPath: String {
        get { defaults.string(forKey: Key.saveFolderPath) ?? Self.defaultSaveFolderPath }
        set {
            defaults.set((newValue as NSString).abbreviatingWithTildeInPath, forKey: Key.saveFolderPath)
            onChange?()
        }
    }

    /// The folder to save into, or nil when saving is turned off.
    var activeSaveFolder: URL? {
        guard saveToFolder else { return nil }
        return URL(fileURLWithPath: (saveFolderPath as NSString).expandingTildeInPath, isDirectory: true)
    }

    func hotKey(for action: GrabAction) -> HotKeyCombo {
        guard let data = defaults.data(forKey: Key.hotKey(action)),
              let combo = try? JSONDecoder().decode(HotKeyCombo.self, from: data)
        else { return action.defaultHotKey }
        return combo
    }

    func setHotKey(_ combo: HotKeyCombo, for action: GrabAction) {
        defaults.set(try? JSONEncoder().encode(combo), forKey: Key.hotKey(action))
        onChange?()
    }

    var hotKeys: [GrabAction: HotKeyCombo] {
        Dictionary(uniqueKeysWithValues: GrabAction.allCases.map { ($0, hotKey(for: $0)) })
    }
}
