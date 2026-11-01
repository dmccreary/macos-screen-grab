import AppKit
@testable import ScreenGrabKit

typealias RGB = (r: UInt8, g: UInt8, b: UInt8)

enum TestImages {
    private static let sRGB = CGColorSpace(name: CGColorSpace.sRGB)!

    /// Builds an image pixel by pixel. `color` receives x and y from the top-left.
    static func make(width: Int, height: Int, color: (Int, Int) -> RGB) -> CGImage {
        let context = CGContext(
            data: nil, width: width, height: height, bitsPerComponent: 8, bytesPerRow: 0, space: sRGB,
            bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
        let bytes = context.data!.assumingMemoryBound(to: UInt8.self)
        for y in 0..<height {
            for x in 0..<width {
                let pixel = color(x, y)
                let offset = y * context.bytesPerRow + x * 4
                bytes[offset] = pixel.r
                bytes[offset + 1] = pixel.g
                bytes[offset + 2] = pixel.b
                bytes[offset + 3] = 255
            }
        }
        return context.makeImage()!
    }

    static func pixel(of image: CGImage, x: Int, y: Int) -> RGB {
        let context = CGContext(
            data: nil, width: image.width, height: image.height, bitsPerComponent: 8, bytesPerRow: 0, space: sRGB,
            bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
        context.draw(image, in: CGRect(x: 0, y: 0, width: image.width, height: image.height))
        let bytes = context.data!.assumingMemoryBound(to: UInt8.self)
        let offset = y * context.bytesPerRow + x * 4
        return (bytes[offset], bytes[offset + 1], bytes[offset + 2])
    }

    /// A display whose top half is red and bottom half is blue.
    static func display(pointWidth: Int = 400, pointHeight: Int = 300, scale: Int = 2) -> FrozenDisplay {
        let pixelHeight = pointHeight * scale
        let image = make(width: pointWidth * scale, height: pixelHeight) { _, y in
            y < pixelHeight / 2 ? (255, 0, 0) : (0, 0, 255)
        }
        return FrozenDisplay(
            displayID: 1,
            screenFrame: CGRect(x: 0, y: 0, width: pointWidth, height: pointHeight),
            image: image)
    }
}

/// Defaults held in memory. A real suite leaves a plist in ~/Library/Preferences on every
/// test run, even after its persistent domain is removed.
final class InMemoryDefaults: UserDefaults {
    private var values: [String: Any] = [:]

    override func object(forKey key: String) -> Any? { values[key] }
    override func string(forKey key: String) -> String? { values[key] as? String }
    override func data(forKey key: String) -> Data? { values[key] as? Data }
    override func bool(forKey key: String) -> Bool { values[key] as? Bool ?? false }
    override func set(_ value: Any?, forKey key: String) { values[key] = value }
    override func set(_ value: Int, forKey key: String) { values[key] = value }
    override func set(_ value: Bool, forKey key: String) { values[key] = value }
}

/// Polls until `condition` holds, for state that changes in a `Task`.
@MainActor
func eventually(timeoutSeconds: Double = 5, _ condition: () -> Bool) async -> Bool {
    let deadline = Date().addingTimeInterval(timeoutSeconds)
    while Date() < deadline {
        if condition() { return true }
        try? await Task.sleep(nanoseconds: 2_000_000)
    }
    return condition()
}

/// Renders a view off-screen. Set SCREENGRAB_TEST_RENDER_DIR to keep a PNG for review.
@MainActor
func render(_ view: NSView, name: String) -> NSBitmapImageRep {
    let rep = view.bitmapImageRepForCachingDisplay(in: view.bounds)!
    view.cacheDisplay(in: view.bounds, to: rep)
    if let directory = ProcessInfo.processInfo.environment["SCREENGRAB_TEST_RENDER_DIR"] {
        // Flattened on the window color, because a transparent PNG hides light-on-clear
        // Dark Mode controls when it's reviewed.
        let image = NSImage(size: view.bounds.size, flipped: false) { rect in
            NSColor.windowBackgroundColor.setFill()
            rect.fill()
            rep.draw(in: rect, from: .zero, operation: .sourceOver, fraction: 1, respectFlipped: true, hints: nil)
            return true
        }
        if let tiff = image.tiffRepresentation,
           let png = NSBitmapImageRep(data: tiff)?.representation(using: .png, properties: [:]) {
            try? png.write(to: URL(fileURLWithPath: directory).appendingPathComponent("\(name).png"))
        }
    }
    return rep
}

/// Runs the main run loop briefly, so that a window on screen commits its drawing.
@MainActor
func spinRunLoop(seconds: TimeInterval = 0.1) {
    RunLoop.main.run(until: Date().addingTimeInterval(seconds))
}
