import AppKit
import Carbon.HIToolbox
import Testing
@testable import ScreenGrabKit

/// An overlay in a real window that is never put on screen, driven with synthesized events.
@MainActor
private final class OverlayHarness {
    let display: FrozenDisplay
    let window: NSWindow
    let content: OverlayContentView
    private(set) var results: [CGRect?] = []

    var view: SelectionOverlayView { content.selectionView }

    init(scale: Int = 2) {
        _ = NSApplication.shared
        let display = TestImages.display(scale: scale)
        self.display = display
        var received: (CGRect?) -> Void = { _ in }
        content = OverlayContentView(display: display) { received($0) }
        window = NSWindow(
            contentRect: NSRect(origin: .zero, size: display.screenFrame.size),
            styleMask: .borderless, backing: .buffered, defer: true)
        window.isReleasedWhenClosed = false
        window.contentView = content
        received = { [weak self] in self?.results.append($0) }
    }

    /// `point` is in overlay coordinates, with a top-left origin.
    private func mouse(_ type: NSEvent.EventType, at point: CGPoint) -> NSEvent {
        NSEvent.mouseEvent(
            with: type,
            location: CGPoint(x: point.x, y: display.screenFrame.height - point.y),
            modifierFlags: [], timestamp: 0, windowNumber: window.windowNumber, context: nil,
            eventNumber: 0, clickCount: 1, pressure: 1)!
    }

    func press(at point: CGPoint) { view.mouseDown(with: mouse(.leftMouseDown, at: point)) }
    func drag(to point: CGPoint) { view.mouseDragged(with: mouse(.leftMouseDragged, at: point)) }
    func release(at point: CGPoint) { view.mouseUp(with: mouse(.leftMouseUp, at: point)) }
    func move(to point: CGPoint) { view.mouseMoved(with: mouse(.mouseMoved, at: point)) }
    func rightClick(at point: CGPoint) { view.rightMouseDown(with: mouse(.rightMouseDown, at: point)) }

    func press(key code: Int, characters: String = "") {
        view.keyDown(with: NSEvent.keyEvent(
            with: .keyDown, location: .zero, modifierFlags: [], timestamp: 0, windowNumber: window.windowNumber,
            context: nil, characters: characters, charactersIgnoringModifiers: characters, isARepeat: false,
            keyCode: UInt16(code))!)
    }

    func color(in rep: NSBitmapImageRep, atPoint point: CGPoint) -> NSColor {
        let scale = CGFloat(rep.pixelsWide) / display.screenFrame.width
        return rep.colorAt(x: Int(point.x * scale), y: Int(point.y * scale))!.usingColorSpace(.sRGB)!
    }
}

@MainActor
struct OverlayInputTests {
    @Test func aDragProducesTheSelection() {
        let h = OverlayHarness()
        h.press(at: CGPoint(x: 50, y: 50))
        h.drag(to: CGPoint(x: 100, y: 80))
        h.release(at: CGPoint(x: 150, y: 100))
        #expect(h.results == [CGRect(x: 50, y: 50, width: 100, height: 50)])
    }

    @Test func aDragUpAndLeftProducesTheSameSelection() {
        let h = OverlayHarness()
        h.press(at: CGPoint(x: 150, y: 100))
        h.release(at: CGPoint(x: 50, y: 50))
        #expect(h.results == [CGRect(x: 50, y: 50, width: 100, height: 50)])
    }

    @Test func aDragPastTheEdgeIsClamped() {
        let h = OverlayHarness()
        h.press(at: CGPoint(x: 300, y: 200))
        h.drag(to: CGPoint(x: 1000, y: 1000))
        h.release(at: CGPoint(x: 1000, y: 1000))
        #expect(h.results == [CGRect(x: 300, y: 200, width: 100, height: 100)])
    }

    @Test func theSelectionIsSnappedToWholePixels() {
        let h = OverlayHarness(scale: 2)
        h.press(at: CGPoint(x: 10.3, y: 20.3))
        h.release(at: CGPoint(x: 50.3, y: 60.3))
        let rect = h.results[0]!
        let pixels = GrabSelection(display: h.display, pointRect: rect).pixelRect
        #expect(pixels == CGRect(x: 21, y: 41, width: 80, height: 80))
        #expect(rect == CGRect(x: 10.5, y: 20.5, width: 40, height: 40))
    }

    @Test func theHighlightedRectangleIsWhatGetsCropped() {
        let h = OverlayHarness(scale: 2)
        h.press(at: CGPoint(x: 0, y: 140))
        h.release(at: CGPoint(x: 100, y: 160))
        let cropped = GrabSelection(display: h.display, pointRect: h.results[0]!).croppedImage()!
        #expect(cropped.width == 200)
        #expect(cropped.height == 40)
        // The red and blue halves of the test image meet at y = 150 pt.
        #expect(TestImages.pixel(of: cropped, x: 0, y: 19) == (255, 0, 0))
        #expect(TestImages.pixel(of: cropped, x: 0, y: 20) == (0, 0, 255))
    }

    @Test func aClickWithoutADragCancels() {
        let h = OverlayHarness()
        h.press(at: CGPoint(x: 50, y: 50))
        h.release(at: CGPoint(x: 50, y: 50))
        #expect(h.results.count == 1)
        #expect(h.results[0] == nil)
    }

    @Test func aTinyDragCancels() {
        let h = OverlayHarness(scale: 1)
        h.press(at: CGPoint(x: 50, y: 50))
        h.release(at: CGPoint(x: 53, y: 200))
        #expect(h.results.count == 1)
        #expect(h.results[0] == nil)
    }

    @Test func escapeCancels() {
        let h = OverlayHarness()
        h.press(key: kVK_Escape, characters: "\u{1b}")
        #expect(h.results.count == 1)
        #expect(h.results[0] == nil)
    }

    @Test func escapeCancelsInTheMiddleOfADrag() {
        let h = OverlayHarness()
        h.press(at: CGPoint(x: 50, y: 50))
        h.drag(to: CGPoint(x: 150, y: 100))
        h.press(key: kVK_Escape, characters: "\u{1b}")
        #expect(h.results.count == 1)
        #expect(h.results[0] == nil)
    }

    @Test func otherKeysDoNothing() {
        let h = OverlayHarness()
        h.press(key: kVK_ANSI_A, characters: "a")
        #expect(h.results.isEmpty)
    }

    @Test func aRightClickCancels() {
        let h = OverlayHarness()
        h.rightClick(at: CGPoint(x: 50, y: 50))
        #expect(h.results.count == 1)
        #expect(h.results[0] == nil)
    }

    @Test func aMouseUpWithoutAPressIsIgnored() {
        let h = OverlayHarness()
        h.release(at: CGPoint(x: 50, y: 50))
        #expect(h.results.isEmpty)
    }

    @Test func theFirstClickIsAccepted() {
        let h = OverlayHarness()
        #expect(h.view.acceptsFirstMouse(for: nil))
        #expect(h.view.acceptsFirstResponder)
    }

    @Test func theLabelShowsPositionThenSizeInPixels() {
        let h = OverlayHarness(scale: 2)
        #expect(h.view.labelText() == nil)

        h.move(to: CGPoint(x: 100, y: 75))
        #expect(h.view.labelText() == "200, 150")

        h.press(at: CGPoint(x: 100, y: 75))
        h.drag(to: CGPoint(x: 200, y: 125))
        #expect(h.view.labelText() == "200 × 100")
    }
}

@MainActor
struct OverlayRenderingTests {
    @Test func theSelectionIsUndimmedAndEverythingElseIsDimmed() {
        let h = OverlayHarness()
        h.press(at: CGPoint(x: 50, y: 50))
        h.drag(to: CGPoint(x: 150, y: 100))

        let rep = render(h.content, name: "overlay-selection")

        // The top half of the test image is red and the bottom half is blue.
        let inside = h.color(in: rep, atPoint: CGPoint(x: 100, y: 75))
        #expect(inside.redComponent > 0.9, "The selection should show the image at full brightness")

        let outside = h.color(in: rep, atPoint: CGPoint(x: 300, y: 75))
        #expect(outside.redComponent > 0.45 && outside.redComponent < 0.8, "Outside the selection should be dimmed")

        let bottom = h.color(in: rep, atPoint: CGPoint(x: 100, y: 250))
        #expect(bottom.blueComponent > 0.45 && bottom.blueComponent < 0.8)
        #expect(bottom.redComponent < 0.2, "The image should be the right way up")
    }

    @Test func theWholeDisplayIsDimmedBeforeADrag() {
        let h = OverlayHarness()
        let rep = render(h.content, name: "overlay-idle")
        let top = h.color(in: rep, atPoint: CGPoint(x: 200, y: 75))
        #expect(top.redComponent > 0.45 && top.redComponent < 0.8)
    }

    /// Reads the selection layer's real backing store, which partial redraws update.
    /// Returns the alpha at a point in overlay coordinates.
    private func layerAlpha(of view: SelectionOverlayView, at point: CGPoint) -> CGFloat {
        let width = Int(view.bounds.width), height = Int(view.bounds.height)
        let context = CGContext(
            data: nil, width: width, height: height, bitsPerComponent: 8, bytesPerRow: 0,
            space: CGColorSpace(name: CGColorSpace.sRGB)!,
            bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
        view.layer!.render(in: context)
        let bytes = context.data!.assumingMemoryBound(to: UInt8.self)
        let row = height - 1 - Int(point.y)
        return CGFloat(bytes[row * context.bytesPerRow + Int(point.x) * 4 + 3]) / 255
    }

    /// AppKit has to clear a non-opaque layer's dirty area before each redraw. If it
    /// didn't, dimming would build up and old selections would leave marks behind.
    @Test func repeatedPartialRedrawsDontAccumulate() throws {
        let h = OverlayHarness()
        // Far off-screen, so nothing appears on the display during the test.
        h.window.setFrameOrigin(CGPoint(x: -20000, y: -20000))
        h.window.orderFrontRegardless()
        defer { h.window.orderOut(nil) }
        spinRunLoop()

        let far = CGPoint(x: 380, y: 280)
        let baseline = layerAlpha(of: h.view, at: far)
        #expect(abs(baseline - 0.35) < 0.02, "Untouched areas should be dimmed once")

        h.press(at: CGPoint(x: 20, y: 20))
        for step in stride(from: 40, through: 200, by: 40) {
            h.drag(to: CGPoint(x: step, y: step))
            spinRunLoop(seconds: 0.03)
        }
        h.drag(to: CGPoint(x: 60, y: 60))
        spinRunLoop()

        let insideCurrent = layerAlpha(of: h.view, at: CGPoint(x: 40, y: 40))
        #expect(insideCurrent < 0.02, "The current selection should be a clear hole")

        let insideOld = layerAlpha(of: h.view, at: CGPoint(x: 150, y: 110))
        #expect(abs(insideOld - 0.35) < 0.02, "An area left behind by the drag should be dimmed exactly once")

        #expect(abs(layerAlpha(of: h.view, at: far) - 0.35) < 0.02)
    }
}

@MainActor
struct StatusMenuTests {
    private func makeController(defaults: UserDefaults? = nil) -> (StatusMenuController, AppSettings) {
        let suite = defaults ?? UserDefaults(suiteName: "com.dmccreary.screengrab.tests.\(UUID().uuidString)")!
        let settings = AppSettings(defaults: suite)
        let controller = StatusMenuController(settings: settings, actions: .init(
            grab: {}, grabWithDelay: {}, cancel: {}, showPreferences: {}, showCustomDelay: {}))
        return (controller, settings)
    }

    private func titles(_ menu: NSMenu) -> [String] {
        menu.items.map { $0.isSeparatorItem ? "---" : $0.title }
    }

    @Test func theMenuMatchesTheSpecification() {
        let (controller, _) = makeController()
        let menu = NSMenu()
        controller.populate(menu)

        #expect(titles(menu) == [
            "Grab Region", "Grab Region with Delay (5 s)", "---", "Delay", "---",
            "Preferences…", "About ScreenGrab", "Quit ScreenGrab",
        ])
        #expect(menu.items[0].keyEquivalent == "4")
        #expect(menu.items[0].keyEquivalentModifierMask == [.control, .shift])
        #expect(menu.items[1].keyEquivalent == "5")
    }

    @Test func cancelAppearsOnlyDuringAGrab() {
        let (controller, _) = makeController()
        let menu = NSMenu()

        controller.grabStateChanged(.countingDown)
        controller.populate(menu)
        #expect(titles(menu).contains("Cancel Grab"))

        controller.grabStateChanged(.idle)
        controller.populate(menu)
        #expect(!titles(menu).contains("Cancel Grab"))
    }

    @Test func theDelaySubmenuChecksTheCurrentPreset() throws {
        let (controller, settings) = makeController()
        settings.delaySeconds = 10
        let menu = NSMenu()
        controller.populate(menu)

        let submenu = try #require(menu.item(withTitle: "Delay")?.submenu)
        #expect(titles(submenu) == ["3 seconds", "5 seconds", "10 seconds", "15 seconds", "Custom…"])
        #expect(submenu.items.filter { $0.state == .on }.map(\.title) == ["10 seconds"])
        #expect(menu.items[1].title == "Grab Region with Delay (10 s)")
    }

    @Test func aCustomDelayIsShownAndChecked() throws {
        let (controller, settings) = makeController()
        settings.delaySeconds = 8
        let menu = NSMenu()
        controller.populate(menu)

        let submenu = try #require(menu.item(withTitle: "Delay")?.submenu)
        #expect(submenu.items.filter { $0.state == .on }.map(\.title) == ["Custom (8 seconds)…"])
    }
}

@MainActor
struct PreferencesAndHUDTests {
    private func makePreferences(failed: Set<GrabAction> = []) -> (PreferencesWindowController, AppSettings) {
        _ = NSApplication.shared
        let settings = AppSettings(defaults: UserDefaults(suiteName: "com.dmccreary.screengrab.tests.\(UUID().uuidString)")!)
        let controller = PreferencesWindowController(
            settings: settings, failedActions: { failed }, onRecordingChanged: { _ in })
        return (controller, settings)
    }

    private func allSubviews(of view: NSView) -> [NSView] {
        view.subviews + view.subviews.flatMap(allSubviews)
    }

    @Test func preferencesLaysOutWithoutOverflowing() throws {
        let (controller, _) = makePreferences()
        let content = try #require(controller.window?.contentView)
        content.layoutSubtreeIfNeeded()

        let fitting = content.fittingSize
        #expect(fitting.width > 200 && fitting.width <= 640)
        #expect(fitting.height > 100 && fitting.height <= 480)

        controller.window?.setContentSize(fitting)
        content.layoutSubtreeIfNeeded()
        _ = render(content, name: "preferences")
    }

    @Test func aRegistrationFailureShowsAWarning() throws {
        let (controller, _) = makePreferences(failed: [.region])
        let content = try #require(controller.window?.contentView)
        controller.window?.setContentSize(content.fittingSize)
        content.layoutSubtreeIfNeeded()

        let labels = allSubviews(of: content).compactMap { $0 as? NSTextField }
        let warnings = labels.filter { !$0.isHidden && $0.stringValue.contains("Another app") }
        #expect(warnings.count == 1)
        _ = render(content, name: "preferences-warning")
    }

    @Test func theHUDShowsTheCountAndCancelsOnClick() throws {
        _ = NSApplication.shared
        var clicks = 0
        let view = HUDContentView(frame: NSRect(x: 0, y: 0, width: 140, height: 140)) { clicks += 1 }
        let window = NSWindow(
            contentRect: view.frame, styleMask: .borderless, backing: .buffered, defer: true)
        window.isReleasedWhenClosed = false
        window.contentView = view
        view.show(seconds: 5)
        view.layoutSubtreeIfNeeded()

        let labels = allSubviews(of: view).compactMap { $0 as? NSTextField }.map(\.stringValue)
        #expect(labels.contains("5"))
        #expect(labels.contains("Click to cancel"))
        #expect(view.acceptsFirstMouse(for: nil))
        _ = render(view, name: "hud")

        let event = try #require(NSEvent.mouseEvent(
            with: .leftMouseDown, location: CGPoint(x: 70, y: 70), modifierFlags: [], timestamp: 0,
            windowNumber: window.windowNumber, context: nil, eventNumber: 0, clickCount: 1, pressure: 1))
        view.mouseDown(with: event)
        #expect(clicks == 1)
    }
}
