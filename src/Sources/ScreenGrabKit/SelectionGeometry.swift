import CoreGraphics

/// Pure geometry for region selection.
///
/// Rectangles in points are display-local with a top-left origin. That matches both
/// the flipped overlay view and `CGImage` cropping, so the only conversion needed is
/// points to pixels. See design §6.
enum SelectionGeometry {
    /// Selections narrower or shorter than this are treated as accidental clicks.
    static let minimumPixelSize: CGFloat = 4
    private static let labelOffset: CGFloat = 14

    /// Normalizes a drag in any direction and clamps it to the display.
    static func selectionRect(from start: CGPoint, to end: CGPoint, within bounds: CGRect) -> CGRect {
        let a = clamped(start, to: bounds)
        let b = clamped(end, to: bounds)
        return CGRect(x: min(a.x, b.x), y: min(a.y, b.y), width: abs(a.x - b.x), height: abs(a.y - b.y))
    }

    /// Pixels per point, taken from the captured image so that scaled display modes
    /// can't cause a mismatch between what is highlighted and what is cropped.
    static func pixelScale(imagePixelWidth: Int, pointWidth: CGFloat) -> CGFloat {
        guard imagePixelWidth > 0, pointWidth > 0 else { return 1 }
        return CGFloat(imagePixelWidth) / pointWidth
    }

    /// Converts a point rectangle to whole pixels, clamped to the image.
    static func pixelRect(forPointRect rect: CGRect, scale: CGFloat, imagePixelSize: CGSize) -> CGRect {
        let minX = (rect.minX * scale).rounded()
        let minY = (rect.minY * scale).rounded()
        let maxX = (rect.maxX * scale).rounded()
        let maxY = (rect.maxY * scale).rounded()
        let rounded = CGRect(x: minX, y: minY, width: maxX - minX, height: maxY - minY)
        let result = rounded.intersection(CGRect(origin: .zero, size: imagePixelSize))
        return result.isNull ? .zero : result
    }

    static func pointRect(forPixelRect rect: CGRect, scale: CGFloat) -> CGRect {
        CGRect(x: rect.minX / scale, y: rect.minY / scale, width: rect.width / scale, height: rect.height / scale)
    }

    static func isAccidental(pixelRect: CGRect) -> Bool {
        pixelRect.width < minimumPixelSize || pixelRect.height < minimumPixelSize
    }

    /// Places the size label down and to the right of the pointer, flipping to the
    /// other side near an edge so that it stays fully on screen.
    static func labelOrigin(pointer: CGPoint, labelSize: CGSize, bounds: CGRect) -> CGPoint {
        var x = pointer.x + labelOffset
        var y = pointer.y + labelOffset
        if x + labelSize.width > bounds.maxX { x = pointer.x - labelOffset - labelSize.width }
        if y + labelSize.height > bounds.maxY { y = pointer.y - labelOffset - labelSize.height }
        x = min(max(x, bounds.minX), max(bounds.minX, bounds.maxX - labelSize.width))
        y = min(max(y, bounds.minY), max(bounds.minY, bounds.maxY - labelSize.height))
        return CGPoint(x: x, y: y)
    }

    private static func clamped(_ point: CGPoint, to bounds: CGRect) -> CGPoint {
        CGPoint(x: min(max(point.x, bounds.minX), bounds.maxX), y: min(max(point.y, bounds.minY), bounds.maxY))
    }
}
