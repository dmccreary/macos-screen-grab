import CoreGraphics
import Testing
@testable import ScreenGrabKit

struct SelectionGeometryTests {
    private let bounds = CGRect(x: 0, y: 0, width: 400, height: 300)

    @Test("A drag in any direction gives the same rectangle", arguments: [
        (CGPoint(x: 10, y: 20), CGPoint(x: 110, y: 70)),
        (CGPoint(x: 110, y: 70), CGPoint(x: 10, y: 20)),
        (CGPoint(x: 110, y: 20), CGPoint(x: 10, y: 70)),
        (CGPoint(x: 10, y: 70), CGPoint(x: 110, y: 20)),
    ])
    func normalizesDirection(start: CGPoint, end: CGPoint) {
        let rect = SelectionGeometry.selectionRect(from: start, to: end, within: bounds)
        #expect(rect == CGRect(x: 10, y: 20, width: 100, height: 50))
    }

    @Test func clampsToDisplayEdges() {
        let rect = SelectionGeometry.selectionRect(
            from: CGPoint(x: 350, y: 250), to: CGPoint(x: 900, y: 900), within: bounds)
        #expect(rect == CGRect(x: 350, y: 250, width: 50, height: 50))

        let negative = SelectionGeometry.selectionRect(
            from: CGPoint(x: 50, y: 50), to: CGPoint(x: -20, y: -20), within: bounds)
        #expect(negative == CGRect(x: 0, y: 0, width: 50, height: 50))
    }

    @Test func pixelRectAtOneX() {
        let rect = SelectionGeometry.pixelRect(
            forPointRect: CGRect(x: 10, y: 20, width: 30, height: 40),
            scale: 1, imagePixelSize: CGSize(width: 400, height: 300))
        #expect(rect == CGRect(x: 10, y: 20, width: 30, height: 40))
    }

    @Test func pixelRectAtTwoX() {
        let rect = SelectionGeometry.pixelRect(
            forPointRect: CGRect(x: 10, y: 20, width: 30, height: 40),
            scale: 2, imagePixelSize: CGSize(width: 800, height: 600))
        #expect(rect == CGRect(x: 20, y: 40, width: 60, height: 80))
    }

    @Test func pixelRectRoundsEdgesToWholePixels() {
        let rect = SelectionGeometry.pixelRect(
            forPointRect: CGRect(x: 10.3, y: 20.8, width: 30.1, height: 40.1),
            scale: 2, imagePixelSize: CGSize(width: 800, height: 600))
        #expect(rect == CGRect(x: 21, y: 42, width: 60, height: 80))
    }

    @Test func pixelRectHandlesFractionalScale() {
        let rect = SelectionGeometry.pixelRect(
            forPointRect: CGRect(x: 100, y: 100, width: 100, height: 100),
            scale: 1.5, imagePixelSize: CGSize(width: 600, height: 450))
        #expect(rect == CGRect(x: 150, y: 150, width: 150, height: 150))
    }

    @Test func pixelRectClampsToImage() {
        let rect = SelectionGeometry.pixelRect(
            forPointRect: CGRect(x: 390, y: 290, width: 50, height: 50),
            scale: 2, imagePixelSize: CGSize(width: 800, height: 600))
        #expect(rect == CGRect(x: 780, y: 580, width: 20, height: 20))
    }

    @Test func pixelRectOutsideImageIsEmpty() {
        let rect = SelectionGeometry.pixelRect(
            forPointRect: CGRect(x: 500, y: 500, width: 10, height: 10),
            scale: 2, imagePixelSize: CGSize(width: 800, height: 600))
        #expect(rect == .zero)
    }

    @Test func pointAndPixelRectsRoundTrip() {
        let pixels = CGRect(x: 21, y: 43, width: 61, height: 81)
        let points = SelectionGeometry.pointRect(forPixelRect: pixels, scale: 2)
        let back = SelectionGeometry.pixelRect(
            forPointRect: points, scale: 2, imagePixelSize: CGSize(width: 800, height: 600))
        #expect(back == pixels)
    }

    @Test("Under 4 pixels in either dimension is accidental", arguments: [
        (CGRect(x: 0, y: 0, width: 0, height: 0), true),
        (CGRect(x: 0, y: 0, width: 3, height: 100), true),
        (CGRect(x: 0, y: 0, width: 100, height: 3), true),
        (CGRect(x: 0, y: 0, width: 4, height: 4), false),
        (CGRect(x: 0, y: 0, width: 100, height: 100), false),
    ])
    func accidentalSelections(rect: CGRect, expected: Bool) {
        #expect(SelectionGeometry.isAccidental(pixelRect: rect) == expected)
    }

    @Test func pixelScaleComesFromTheImage() {
        #expect(SelectionGeometry.pixelScale(imagePixelWidth: 2940, pointWidth: 1470) == 2)
        #expect(SelectionGeometry.pixelScale(imagePixelWidth: 1920, pointWidth: 1920) == 1)
        #expect(SelectionGeometry.pixelScale(imagePixelWidth: 0, pointWidth: 1920) == 1)
    }

    private let labelSize = CGSize(width: 80, height: 24)

    @Test func labelSitsBelowRightOfPointer() {
        let origin = SelectionGeometry.labelOrigin(
            pointer: CGPoint(x: 100, y: 100), labelSize: labelSize, bounds: bounds)
        #expect(origin == CGPoint(x: 114, y: 114))
    }

    @Test func labelFlipsAtRightAndBottomEdges() {
        let origin = SelectionGeometry.labelOrigin(
            pointer: CGPoint(x: 395, y: 295), labelSize: labelSize, bounds: bounds)
        #expect(origin == CGPoint(x: 301, y: 257))
    }

    @Test("The label stays on screen everywhere", arguments: [
        CGPoint(x: 0, y: 0), CGPoint(x: 400, y: 0), CGPoint(x: 0, y: 300), CGPoint(x: 400, y: 300),
        CGPoint(x: 200, y: 150), CGPoint(x: 320, y: 280),
    ])
    func labelStaysOnScreen(pointer: CGPoint) {
        let origin = SelectionGeometry.labelOrigin(pointer: pointer, labelSize: labelSize, bounds: bounds)
        #expect(bounds.contains(CGRect(origin: origin, size: labelSize)))
    }
}
