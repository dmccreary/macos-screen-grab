import Foundation

enum GrabTrigger {
    case hotKey
    case menu
}

enum GrabFailure: Equatable {
    case permissionDenied
    case captureFailed(String)
    case outputFailed(String)
    case saveFailed(String)
}

@MainActor
protocol GrabFeedback: AnyObject {
    func grabSucceeded()
    func grabFailed(_ failure: GrabFailure)
}

/// Owns the grab state machine and is the only type that sequences a grab.
/// See design §5.
@MainActor
final class GrabCoordinator {
    enum State: Equatable {
        case idle, countingDown, freezing, selecting, delivering
    }

    private(set) var state: State = .idle {
        didSet { if oldValue != state { onStateChange?(state) } }
    }
    var onStateChange: ((State) -> Void)?

    private let capturer: DisplayCapturing
    private let permission: PermissionChecking
    private let countdown: CountdownPresenting
    private let selector: SelectionPresenting
    private let output: GrabOutputting
    private let feedback: GrabFeedback
    private let delaySeconds: () -> Int
    private let menuCloseDelay: TimeInterval

    /// Incremented whenever a grab starts or is cancelled, so that a capture finishing
    /// late can tell it has been abandoned.
    private var generation = 0

    init(
        capturer: DisplayCapturing,
        permission: PermissionChecking,
        countdown: CountdownPresenting,
        selector: SelectionPresenting,
        output: GrabOutputting,
        feedback: GrabFeedback,
        delaySeconds: @escaping () -> Int,
        menuCloseDelay: TimeInterval = 0.1
    ) {
        self.capturer = capturer
        self.permission = permission
        self.countdown = countdown
        self.selector = selector
        self.output = output
        self.feedback = feedback
        self.delaySeconds = delaySeconds
        self.menuCloseDelay = menuCloseDelay
    }

    func grabRegion(trigger: GrabTrigger = .hotKey) {
        guard state == .idle, permission.ensureGranted() else { return }
        freeze(after: trigger == .menu ? menuCloseDelay : 0)
    }

    func grabRegionWithDelay() {
        switch state {
        case .idle:
            guard permission.ensureGranted() else { return }
            generation += 1
            state = .countingDown
            countdown.start(
                seconds: delaySeconds(),
                onFinish: { [weak self] in self?.freeze(after: 0) },
                onCancel: { [weak self] in self?.cancel() })
        case .countingDown:
            cancel()
        case .freezing, .selecting, .delivering:
            break
        }
    }

    func cancel() {
        switch state {
        case .countingDown:
            countdown.stop()
            generation += 1
            state = .idle
        case .freezing:
            generation += 1
            state = .idle
        case .selecting:
            selector.cancel()
        case .idle, .delivering:
            break
        }
    }

    private func freeze(after delay: TimeInterval) {
        generation += 1
        let current = generation
        state = .freezing
        Task {
            if delay > 0 {
                try? await Task.sleep(nanoseconds: UInt64(delay * 1_000_000_000))
                guard current == generation else { return }
            }
            do {
                let frames = try await capturer.captureAllDisplays()
                guard current == generation else { return }
                state = .selecting
                selector.begin(frames) { selection in
                    self.selectionFinished(selection)
                }
            } catch {
                guard current == generation else { return }
                report(error)
                state = .idle
            }
        }
    }

    private func selectionFinished(_ selection: GrabSelection?) {
        guard let selection else {
            state = .idle
            return
        }
        state = .delivering
        Task {
            let outcome = await output.deliver(selection)
            if let error = outcome.clipboardError {
                feedback.grabFailed(.outputFailed(error))
            } else {
                feedback.grabSucceeded()
            }
            if let error = outcome.saveError {
                feedback.grabFailed(.saveFailed(error))
            }
            state = .idle
        }
    }

    private func report(_ error: Error) {
        if case CaptureError.permissionDenied = error {
            feedback.grabFailed(.permissionDenied)
        } else {
            feedback.grabFailed(.captureFailed(error.localizedDescription))
        }
    }
}
