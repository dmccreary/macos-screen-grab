import Carbon.HIToolbox
import Foundation

/// Registers global shortcuts with Carbon, which needs no Accessibility or Input
/// Monitoring permission.
@MainActor
final class HotKeyCenter {
    var handler: ((GrabAction) -> Void)?
    /// Actions whose shortcut couldn't be registered, typically because another app owns it.
    private(set) var failedActions: Set<GrabAction> = []

    private static let signature: OSType = 0x5347_5242 // "SGRB"

    private var combos: [GrabAction: HotKeyCombo] = [:]
    private var refs: [GrabAction: EventHotKeyRef] = [:]
    private var eventHandler: EventHandlerRef?
    private var isSuspended = false

    init() {
        var spec = EventTypeSpec(eventClass: OSType(kEventClassKeyboard), eventKind: UInt32(kEventHotKeyPressed))
        let context = Unmanaged.passUnretained(self).toOpaque()
        InstallEventHandler(GetEventDispatcherTarget(), hotKeyCallback, 1, &spec, context, &eventHandler)
    }

    func apply(_ newCombos: [GrabAction: HotKeyCombo]) {
        guard newCombos != combos else { return }
        combos = newCombos
        if !isSuspended { registerAll() }
    }

    /// Releases all shortcuts so that the keys being recorded in Preferences don't
    /// start a grab.
    func suspend() {
        isSuspended = true
        unregisterAll()
    }

    func resume() {
        isSuspended = false
        registerAll()
    }

    fileprivate func fire(id: UInt32) {
        guard let action = GrabAction.allCases.first(where: { Self.id(for: $0) == id }) else { return }
        handler?(action)
    }

    private func registerAll() {
        unregisterAll()
        failedActions = []
        for action in GrabAction.allCases {
            guard let combo = combos[action] else { continue }
            var ref: EventHotKeyRef?
            let status = RegisterEventHotKey(
                combo.keyCode,
                combo.modifiers,
                EventHotKeyID(signature: Self.signature, id: Self.id(for: action)),
                GetEventDispatcherTarget(),
                OptionBits(kEventHotKeyExclusive),
                &ref)
            if status == noErr, let ref {
                refs[action] = ref
            } else {
                failedActions.insert(action)
            }
        }
    }

    private func unregisterAll() {
        refs.values.forEach { UnregisterEventHotKey($0) }
        refs.removeAll()
    }

    private static func id(for action: GrabAction) -> UInt32 {
        UInt32(GrabAction.allCases.firstIndex(of: action)! + 1)
    }
}

private let hotKeyCallback: EventHandlerUPP = { _, event, context in
    guard let event, let context else { return OSStatus(eventNotHandledErr) }
    var id = EventHotKeyID()
    let status = GetEventParameter(
        event,
        EventParamName(kEventParamDirectObject),
        EventParamType(typeEventHotKeyID),
        nil,
        MemoryLayout<EventHotKeyID>.size,
        nil,
        &id)
    guard status == noErr else { return status }

    let center = Unmanaged<HotKeyCenter>.fromOpaque(context).takeUnretainedValue()
    let hotKeyID = id.id
    // Leave the Carbon callback first; handling a shortcut can run a modal alert.
    DispatchQueue.main.async {
        MainActor.assumeIsolated { center.fire(id: hotKeyID) }
    }
    return noErr
}
