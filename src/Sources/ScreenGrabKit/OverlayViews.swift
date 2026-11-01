import AppKit
import Carbon.HIToolbox

/// A borderless panel covering one display, above the menu bar and Dock.
final class OverlayPanel: NSPanel {
    private let content: OverlayContentView

    init(display: FrozenDisplay, onFinish: @escaping (CGRect?) -> Void) {
        content = OverlayContentView(display: display, onFinish: onFinish)
        super.init(
            contentRect: display.screenFrame,
            styleMask: [.borderless, .nonactivatingPanel],
            backing: .buffered,
            defer: false)
        level = .screenSaver
        collectionBehavior = [.canJoinAllSpaces, .fullScreenAuxiliary, .stationary, .ignoresCycle]
        animationBehavior = .none
        hidesOnDeactivate = false
        isReleasedWhenClosed = false
        isMovable = false
        hasShadow = false
        isOpaque = true
        backgroundColor = .black
        acceptsMouseMovedEvents = true
        contentView = content
        setFrame(display.screenFrame, display: false)
    }

    override var canBecomeKey: Bool { true }
    override var canBecomeMain: Bool { false }

    override func constrainFrameRect(_ frameRect: NSRect, to screen: NSScreen?) -> NSRect {
        frameRect
    }

    func focusSelectionView() {
        makeFirstResponder(content.selectionView)
    }
}

/// Holds the two layers of an overlay, so that dragging never repaints the image.
final class OverlayContentView: NSView {
    let selectionView: SelectionOverlayView

    init(display: FrozenDisplay, onFinish: @escaping (CGRect?) -> Void) {
        let bounds = NSRect(origin: .zero, size: display.screenFrame.size)
        selectionView = SelectionOverlayView(frame: bounds, display: display, onFinish: onFinish)
        super.init(frame: bounds)

        let imageView = FrozenImageView(frame: bounds, display: display)
        imageView.autoresizingMask = [.width, .height]
        selectionView.autoresizingMask = [.width, .height]
        addSubview(imageView)
        addSubview(selectionView)
    }

    @available(*, unavailable)
    required init?(coder: NSCoder) { fatalError("init(coder:) is not supported") }
}

/// Draws the frozen image once, pixel for pixel.
final class FrozenImageView: NSView {
    private let image: NSImage

    init(frame: NSRect, display: FrozenDisplay) {
        image = NSImage(cgImage: display.image, size: display.screenFrame.size)
        super.init(frame: frame)
        wantsLayer = true
    }

    @available(*, unavailable)
    required init?(coder: NSCoder) { fatalError("init(coder:) is not supported") }

    override var isOpaque: Bool { true }

    override func hitTest(_ point: NSPoint) -> NSView? { nil }

    override func draw(_ dirtyRect: NSRect) {
        NSGraphicsContext.current?.imageInterpolation = .none
        image.draw(in: bounds, from: .zero, operation: .copy, fraction: 1)
    }
}

/// The top layer: dimming with a hole for the selection, the border, the size label,
/// and all mouse and keyboard input.
final class SelectionOverlayView: NSView {
    private static let dimColor = NSColor.black.withAlphaComponent(0.35)
    private static let labelAttributes: [NSAttributedString.Key: Any] = [
        .font: NSFont.monospacedDigitSystemFont(ofSize: 12, weight: .medium),
        .foregroundColor: NSColor.white,
    ]
    private static let labelPadding = CGSize(width: 8, height: 4)

    private let scale: CGFloat
    private let imagePixelSize: CGSize
    private let onFinish: (CGRect?) -> Void

    private var dragStart: CGPoint?
    private var pointer: CGPoint?
    /// The selection snapped to whole pixels, so the highlight is exactly what is cropped.
    private(set) var selection: CGRect?
    private var lastDirtyRect = CGRect.null

    init(frame: NSRect, display: FrozenDisplay, onFinish: @escaping (CGRect?) -> Void) {
        scale = display.scale
        imagePixelSize = display.imagePixelSize
        self.onFinish = onFinish
        super.init(frame: frame)
        wantsLayer = true
        setAccessibilityLabel("Screen region selector. Drag to select a region, or press Escape to cancel.")
    }

    @available(*, unavailable)
    required init?(coder: NSCoder) { fatalError("init(coder:) is not supported") }

    override var isFlipped: Bool { true }
    override var isOpaque: Bool { false }
    override var acceptsFirstResponder: Bool { true }
    override func acceptsFirstMouse(for event: NSEvent?) -> Bool { true }

    override func resetCursorRects() {
        addCursorRect(bounds, cursor: .crosshair)
    }

    override func updateTrackingAreas() {
        super.updateTrackingAreas()
        trackingAreas.forEach(removeTrackingArea)
        addTrackingArea(NSTrackingArea(
            rect: bounds,
            options: [.activeAlways, .mouseMoved, .mouseEnteredAndExited, .inVisibleRect],
            owner: self,
            userInfo: nil))
    }

    // MARK: Input

    override func mouseEntered(with event: NSEvent) {
        updatePointer(from: event)
    }

    override func mouseExited(with event: NSEvent) {
        guard dragStart == nil else { return }
        pointer = nil
        invalidateChangedArea()
    }

    override func mouseMoved(with event: NSEvent) {
        NSCursor.crosshair.set()
        updatePointer(from: event)
    }

    override func mouseDown(with event: NSEvent) {
        let point = location(of: event)
        dragStart = point
        pointer = point
        selection = nil
        invalidateChangedArea()
    }

    override func mouseDragged(with event: NSEvent) {
        updateSelection(from: event)
    }

    override func mouseUp(with event: NSEvent) {
        guard dragStart != nil else { return }
        updateSelection(from: event)
        dragStart = nil

        guard let selection else {
            onFinish(nil)
            return
        }
        let pixels = SelectionGeometry.pixelRect(
            forPointRect: selection, scale: scale, imagePixelSize: imagePixelSize)
        onFinish(SelectionGeometry.isAccidental(pixelRect: pixels) ? nil : selection)
    }

    override func rightMouseDown(with event: NSEvent) {
        onFinish(nil)
    }

    override func keyDown(with event: NSEvent) {
        if Int(event.keyCode) == kVK_Escape {
            onFinish(nil)
        }
    }

    private func location(of event: NSEvent) -> CGPoint {
        convert(event.locationInWindow, from: nil)
    }

    private func updatePointer(from event: NSEvent) {
        pointer = location(of: event)
        invalidateChangedArea()
    }

    private func updateSelection(from event: NSEvent) {
        guard let dragStart else { return }
        let end = location(of: event)
        pointer = end
        let raw = SelectionGeometry.selectionRect(from: dragStart, to: end, within: bounds)
        let pixels = SelectionGeometry.pixelRect(forPointRect: raw, scale: scale, imagePixelSize: imagePixelSize)
        selection = SelectionGeometry.pointRect(forPixelRect: pixels, scale: scale)
        invalidateChangedArea()
    }

    // MARK: Drawing

    override func draw(_ dirtyRect: NSRect) {
        let dim = NSBezierPath(rect: bounds)
        if let selection {
            dim.appendRect(selection)
            dim.windingRule = .evenOdd
        }
        Self.dimColor.setFill()
        dim.fill()

        if let selection, !selection.isEmpty {
            drawBorder(around: selection)
        }
        drawLabel()
    }

    private func drawBorder(around rect: CGRect) {
        NSColor.black.withAlphaComponent(0.4).setStroke()
        let outer = NSBezierPath(rect: rect.insetBy(dx: -1.5, dy: -1.5))
        outer.lineWidth = 1
        outer.stroke()

        NSColor.white.setStroke()
        let inner = NSBezierPath(rect: rect.insetBy(dx: -0.5, dy: -0.5))
        inner.lineWidth = 1
        inner.stroke()
    }

    private func drawLabel() {
        guard let rect = labelRect(), let text = labelText() else { return }
        NSColor.black.withAlphaComponent(0.75).setFill()
        NSBezierPath(roundedRect: rect, xRadius: 5, yRadius: 5).fill()
        NSAttributedString(string: text, attributes: Self.labelAttributes).draw(
            at: CGPoint(x: rect.minX + Self.labelPadding.width, y: rect.minY + Self.labelPadding.height))
    }

    /// The selection size in pixels while dragging, otherwise the pointer position.
    func labelText() -> String? {
        if let selection {
            let pixels = SelectionGeometry.pixelRect(
                forPointRect: selection, scale: scale, imagePixelSize: imagePixelSize)
            return "\(Int(pixels.width)) × \(Int(pixels.height))"
        }
        guard let pointer else { return nil }
        return "\(Int(pointer.x * scale)), \(Int(pointer.y * scale))"
    }

    private func labelRect() -> CGRect? {
        guard let pointer, let text = labelText() else { return nil }
        let textSize = NSAttributedString(string: text, attributes: Self.labelAttributes).size()
        let size = CGSize(
            width: ceil(textSize.width) + Self.labelPadding.width * 2,
            height: ceil(textSize.height) + Self.labelPadding.height * 2)
        let origin = SelectionGeometry.labelOrigin(pointer: pointer, labelSize: size, bounds: bounds)
        return CGRect(origin: origin, size: size)
    }

    private func invalidateChangedArea() {
        var dirty = CGRect.null
        if let selection { dirty = dirty.union(selection.insetBy(dx: -3, dy: -3)) }
        if let label = labelRect() { dirty = dirty.union(label.insetBy(dx: -1, dy: -1)) }

        let changed = lastDirtyRect.union(dirty)
        if !changed.isNull { setNeedsDisplay(changed) }
        lastDirtyRect = dirty
    }
}
