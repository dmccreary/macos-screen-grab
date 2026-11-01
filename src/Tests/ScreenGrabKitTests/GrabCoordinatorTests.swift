import Foundation
import Testing
@testable import ScreenGrabKit

// MARK: Fakes

@MainActor
private final class FakeCapturer: DisplayCapturing {
    var callCount = 0
    var error: Error?
    var holdsCapture = false
    private var gate: CheckedContinuation<Void, Never>?

    func captureAllDisplays() async throws -> [FrozenDisplay] {
        callCount += 1
        if holdsCapture { await withCheckedContinuation { gate = $0 } }
        if let error { throw error }
        return [TestImages.display(pointWidth: 40, pointHeight: 30)]
    }

    var isHolding: Bool { gate != nil }

    func release() {
        gate?.resume()
        gate = nil
    }
}

@MainActor
private final class FakePermission: PermissionChecking {
    var granted = true
    func ensureGranted() -> Bool { granted }
}

@MainActor
private final class FakeCountdown: CountdownPresenting {
    var startedSeconds: [Int] = []
    var stopCount = 0
    var onFinish: (() -> Void)?
    var onCancel: (() -> Void)?

    func start(seconds: Int, onFinish: @escaping () -> Void, onCancel: @escaping () -> Void) {
        startedSeconds.append(seconds)
        self.onFinish = onFinish
        self.onCancel = onCancel
    }

    func stop() { stopCount += 1 }
}

@MainActor
private final class FakeSelector: SelectionPresenting {
    var beginCount = 0
    var frames: [FrozenDisplay] = []
    private var onFinish: ((GrabSelection?) -> Void)?

    func begin(_ frames: [FrozenDisplay], onFinish: @escaping (GrabSelection?) -> Void) {
        beginCount += 1
        self.frames = frames
        self.onFinish = onFinish
    }

    func cancel() { finish(nil) }

    func finish(_ selection: GrabSelection?) {
        let done = onFinish
        onFinish = nil
        done?(selection)
    }

    func selectSomething() {
        finish(GrabSelection(display: frames[0], pointRect: CGRect(x: 1, y: 1, width: 10, height: 10)))
    }
}

@MainActor
private final class FakeOutput: GrabOutputting {
    var outcome = GrabOutcome()
    var delivered = 0

    func deliver(_ selection: GrabSelection) async -> GrabOutcome {
        delivered += 1
        return outcome
    }
}

@MainActor
private final class FakeFeedback: GrabFeedback {
    var successes = 0
    var failures: [GrabFailure] = []
    func grabSucceeded() { successes += 1 }
    func grabFailed(_ failure: GrabFailure) { failures.append(failure) }
}

@MainActor
private struct Harness {
    let capturer = FakeCapturer()
    let permission = FakePermission()
    let countdown = FakeCountdown()
    let selector = FakeSelector()
    let output = FakeOutput()
    let feedback = FakeFeedback()
    let coordinator: GrabCoordinator

    init(delaySeconds: @escaping () -> Int = { 5 }, menuCloseDelay: TimeInterval = 0) {
        coordinator = GrabCoordinator(
            capturer: capturer, permission: permission, countdown: countdown, selector: selector,
            output: output, feedback: feedback, delaySeconds: delaySeconds, menuCloseDelay: menuCloseDelay)
    }

    func reachSelecting() async {
        coordinator.grabRegion()
        #expect(await eventually { coordinator.state == .selecting })
    }
}

// MARK: Tests

@MainActor
struct GrabCoordinatorTests {
    @Test func anImmediateGrabCapturesThenSelects() async {
        let h = Harness()
        h.coordinator.grabRegion()
        #expect(h.coordinator.state == .freezing)
        #expect(await eventually { h.coordinator.state == .selecting })
        #expect(h.capturer.callCount == 1)
        #expect(h.selector.beginCount == 1)
        #expect(h.selector.frames.count == 1)
    }

    @Test func aFinishedSelectionIsDeliveredAndConfirmed() async {
        let h = Harness()
        await h.reachSelecting()

        h.selector.selectSomething()

        #expect(await eventually { h.coordinator.state == .idle })
        #expect(h.output.delivered == 1)
        #expect(h.feedback.successes == 1)
        #expect(h.feedback.failures.isEmpty)
    }

    @Test func cancellingASelectionIsSilent() async {
        let h = Harness()
        await h.reachSelecting()

        h.selector.finish(nil)

        #expect(h.coordinator.state == .idle)
        #expect(h.output.delivered == 0)
        #expect(h.feedback.successes == 0)
        #expect(h.feedback.failures.isEmpty)
    }

    @Test func cancelDuringSelectionDismissesTheSelector() async {
        let h = Harness()
        await h.reachSelecting()

        h.coordinator.cancel()

        #expect(h.coordinator.state == .idle)
        #expect(h.output.delivered == 0)
    }

    @Test func missingPermissionStopsAnImmediateGrab() {
        let h = Harness()
        h.permission.granted = false
        h.coordinator.grabRegion()
        #expect(h.coordinator.state == .idle)
        #expect(h.capturer.callCount == 0)
    }

    @Test func missingPermissionStopsADelayedGrabBeforeTheCountdown() {
        let h = Harness()
        h.permission.granted = false
        h.coordinator.grabRegionWithDelay()
        #expect(h.coordinator.state == .idle)
        #expect(h.countdown.startedSeconds.isEmpty)
    }

    @Test func triggersAreIgnoredWhileSelecting() async {
        let h = Harness()
        await h.reachSelecting()

        for _ in 0..<5 {
            h.coordinator.grabRegion()
            h.coordinator.grabRegionWithDelay()
        }

        #expect(h.coordinator.state == .selecting)
        #expect(h.capturer.callCount == 1)
        #expect(h.selector.beginCount == 1)
        #expect(h.countdown.startedSeconds.isEmpty)
    }

    @Test func triggersAreIgnoredWhileFreezing() async {
        let h = Harness()
        h.capturer.holdsCapture = true
        h.coordinator.grabRegion()
        #expect(await eventually { h.capturer.isHolding })

        h.coordinator.grabRegion()
        h.coordinator.grabRegionWithDelay()

        #expect(h.coordinator.state == .freezing)
        #expect(h.capturer.callCount == 1)
        h.capturer.release()
        #expect(await eventually { h.coordinator.state == .selecting })
    }

    @Test func aDelayedGrabCountsDownThenSelects() async {
        let h = Harness(delaySeconds: { 8 })
        h.coordinator.grabRegionWithDelay()

        #expect(h.coordinator.state == .countingDown)
        #expect(h.countdown.startedSeconds == [8])
        #expect(h.capturer.callCount == 0)

        h.countdown.onFinish?()

        #expect(await eventually { h.coordinator.state == .selecting })
        #expect(h.capturer.callCount == 1)
    }

    @Test func theDelayIsReadWhenTheCountdownStarts() {
        var delay = 3
        let h = Harness(delaySeconds: { delay })
        h.coordinator.grabRegionWithDelay()
        delay = 15
        #expect(h.countdown.startedSeconds == [3])
    }

    @Test func pressingTheDelayedHotkeyAgainCancelsTheCountdown() {
        let h = Harness()
        h.coordinator.grabRegionWithDelay()
        h.coordinator.grabRegionWithDelay()
        #expect(h.coordinator.state == .idle)
        #expect(h.countdown.stopCount == 1)
        #expect(h.countdown.startedSeconds.count == 1)
    }

    @Test func theImmediateHotkeyIsIgnoredDuringACountdown() {
        let h = Harness()
        h.coordinator.grabRegionWithDelay()
        h.coordinator.grabRegion()
        #expect(h.coordinator.state == .countingDown)
        #expect(h.capturer.callCount == 0)
    }

    @Test func clickingTheHUDCancelsTheCountdown() async {
        let h = Harness()
        h.coordinator.grabRegionWithDelay()
        h.countdown.onCancel?()
        #expect(h.coordinator.state == .idle)
        #expect(h.countdown.stopCount == 1)
        try? await Task.sleep(nanoseconds: 20_000_000)
        #expect(h.capturer.callCount == 0)
    }

    @Test func cancelFromTheMenuStopsTheCountdown() {
        let h = Harness()
        h.coordinator.grabRegionWithDelay()
        h.coordinator.cancel()
        #expect(h.coordinator.state == .idle)
        #expect(h.countdown.stopCount == 1)
    }

    @Test func framesArrivingAfterACancelAreDiscarded() async {
        let h = Harness()
        h.capturer.holdsCapture = true
        h.coordinator.grabRegion()
        #expect(await eventually { h.capturer.isHolding })

        h.coordinator.cancel()
        #expect(h.coordinator.state == .idle)

        h.capturer.release()
        try? await Task.sleep(nanoseconds: 20_000_000)
        #expect(h.selector.beginCount == 0)
        #expect(h.coordinator.state == .idle)
    }

    @Test func aStaleCaptureCantDisturbANewerGrab() async {
        let h = Harness()
        h.capturer.holdsCapture = true
        h.coordinator.grabRegion()
        #expect(await eventually { h.capturer.isHolding })
        h.coordinator.cancel()
        let staleRelease = h.capturer.release
        staleRelease()
        try? await Task.sleep(nanoseconds: 20_000_000)

        h.capturer.holdsCapture = false
        h.coordinator.grabRegion()

        #expect(await eventually { h.coordinator.state == .selecting })
        #expect(h.selector.beginCount == 1)
    }

    @Test func aCaptureErrorIsReported() async {
        struct Boom: LocalizedError { var errorDescription: String? { "boom" } }
        let h = Harness()
        h.capturer.error = Boom()

        h.coordinator.grabRegion()

        #expect(await eventually { h.coordinator.state == .idle })
        #expect(h.feedback.failures == [.captureFailed("boom")])
        #expect(h.selector.beginCount == 0)
    }

    @Test func aDeclinedCaptureReportsThePermissionProblem() async {
        let h = Harness()
        h.capturer.error = CaptureError.permissionDenied

        h.coordinator.grabRegion()

        #expect(await eventually { h.coordinator.state == .idle })
        #expect(h.feedback.failures == [.permissionDenied])
    }

    @Test func aClipboardFailureIsReportedWithoutSuccessFeedback() async {
        let h = Harness()
        h.output.outcome = GrabOutcome(clipboardError: "no clipboard")
        await h.reachSelecting()

        h.selector.selectSomething()

        #expect(await eventually { h.coordinator.state == .idle })
        #expect(h.feedback.successes == 0)
        #expect(h.feedback.failures == [.outputFailed("no clipboard")])
    }

    @Test func aSaveFailureStillCountsAsACopiedGrab() async {
        let h = Harness()
        h.output.outcome = GrabOutcome(saveError: "disk full")
        await h.reachSelecting()

        h.selector.selectSomething()

        #expect(await eventually { h.coordinator.state == .idle })
        #expect(h.feedback.successes == 1)
        #expect(h.feedback.failures == [.saveFailed("disk full")])
    }

    @Test func aMenuTriggeredGrabWaitsForTheMenuToClose() async {
        let h = Harness(menuCloseDelay: 0.05)
        h.coordinator.grabRegion(trigger: .menu)
        #expect(h.capturer.callCount == 0)
        #expect(await eventually { h.capturer.callCount == 1 })
    }

    @Test func cancellingDuringTheMenuWaitPreventsTheCapture() async {
        let h = Harness(menuCloseDelay: 0.05)
        h.coordinator.grabRegion(trigger: .menu)
        h.coordinator.cancel()
        try? await Task.sleep(nanoseconds: 120_000_000)
        #expect(h.capturer.callCount == 0)
        #expect(h.coordinator.state == .idle)
    }

    @Test func stateChangesAreObservable() async {
        let h = Harness()
        var seen: [GrabCoordinator.State] = []
        h.coordinator.onStateChange = { seen.append($0) }

        await h.reachSelecting()
        h.selector.selectSomething()

        #expect(await eventually { h.coordinator.state == .idle })
        #expect(seen == [.freezing, .selecting, .delivering, .idle])
    }

    @Test func aNewGrabCanStartAfterTheLastOneFinishes() async {
        let h = Harness()
        await h.reachSelecting()
        h.selector.selectSomething()
        #expect(await eventually { h.coordinator.state == .idle })

        await h.reachSelecting()

        #expect(h.capturer.callCount == 2)
    }
}

struct CountdownTimingTests {
    private let now = Date(timeIntervalSince1970: 1000)

    @Test("Remaining seconds round up and stop at zero", arguments: [
        (5.0, 5), (4.9, 5), (4.0, 4), (0.01, 1), (0.0, 0), (-3.0, 0),
    ])
    func remainingSeconds(offset: Double, expected: Int) {
        let remaining = CountdownHUD.remainingSeconds(until: now.addingTimeInterval(offset), now: now)
        #expect(remaining == expected)
    }
}
