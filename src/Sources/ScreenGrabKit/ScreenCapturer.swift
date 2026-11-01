import AppKit
import ScreenCaptureKit

/// A still image of one display, taken when a grab starts.
struct FrozenDisplay: @unchecked Sendable {
    let displayID: CGDirectDisplayID
    /// The display's frame in AppKit global coordinates, in points.
    let screenFrame: CGRect
    let image: CGImage

    var imagePixelSize: CGSize { CGSize(width: image.width, height: image.height) }

    var scale: CGFloat {
        SelectionGeometry.pixelScale(imagePixelWidth: image.width, pointWidth: screenFrame.width)
    }
}

/// A rectangle chosen on one frozen display.
struct GrabSelection: @unchecked Sendable {
    let display: FrozenDisplay
    /// Display-local rectangle in points, with a top-left origin.
    let pointRect: CGRect

    var pixelRect: CGRect {
        SelectionGeometry.pixelRect(
            forPointRect: pointRect, scale: display.scale, imagePixelSize: display.imagePixelSize)
    }

    func croppedImage() -> CGImage? {
        display.image.cropping(to: pixelRect)
    }
}

enum CaptureError: LocalizedError {
    case permissionDenied
    case noDisplays

    var errorDescription: String? {
        switch self {
        case .permissionDenied: return "Screen Recording permission has not been granted."
        case .noDisplays: return "No display could be found to capture."
        }
    }
}

@MainActor
protocol DisplayCapturing: AnyObject {
    func captureAllDisplays() async throws -> [FrozenDisplay]
}

/// Captures every display to a still image. This is the only type that uses
/// ScreenCaptureKit.
@MainActor
final class ScreenCapturer: DisplayCapturing {
    private struct Target {
        let index: Int
        let display: SCDisplay
        let screenFrame: CGRect
        let backingScale: CGFloat
    }

    func captureAllDisplays() async throws -> [FrozenDisplay] {
        do {
            let content = try await SCShareableContent.excludingDesktopWindows(false, onScreenWindowsOnly: true)
            let ownApp = content.applications.filter { $0.processID == getpid() }
            let targets = Self.targets(for: content)
            guard !targets.isEmpty else { throw CaptureError.noDisplays }

            return try await withThrowingTaskGroup(of: (Int, FrozenDisplay).self) { group in
                for target in targets {
                    group.addTask { (target.index, try await Self.capture(target, excluding: ownApp)) }
                }
                var results: [(Int, FrozenDisplay)] = []
                for try await result in group { results.append(result) }
                return results.sorted { $0.0 < $1.0 }.map(\.1)
            }
        } catch {
            throw Self.mapped(error)
        }
    }

    private static func targets(for content: SCShareableContent) -> [Target] {
        NSScreen.screens.enumerated().compactMap { index, screen in
            let key = NSDeviceDescriptionKey("NSScreenNumber")
            guard let id = screen.deviceDescription[key] as? CGDirectDisplayID,
                  let display = content.displays.first(where: { $0.displayID == id })
            else { return nil }
            return Target(index: index, display: display, screenFrame: screen.frame,
                          backingScale: screen.backingScaleFactor)
        }
    }

    private nonisolated static func capture(_ target: Target, excluding apps: [SCRunningApplication]) async throws -> FrozenDisplay {
        // Excluding this app keeps Preferences and the closing HUD out of the frame.
        let filter = SCContentFilter(display: target.display, excludingApplications: apps, exceptingWindows: [])
        let config = SCStreamConfiguration()
        config.width = Int((target.screenFrame.width * target.backingScale).rounded())
        config.height = Int((target.screenFrame.height * target.backingScale).rounded())
        config.captureResolution = .best
        config.showsCursor = false
        config.colorSpaceName = CGColorSpace.sRGB
        let image = try await SCScreenshotManager.captureImage(contentFilter: filter, configuration: config)
        return FrozenDisplay(displayID: target.display.displayID, screenFrame: target.screenFrame, image: image)
    }

    private static func mapped(_ error: Error) -> Error {
        let nsError = error as NSError
        if nsError.domain == SCStreamErrorDomain, nsError.code == SCStreamError.Code.userDeclined.rawValue {
            return CaptureError.permissionDenied
        }
        return error
    }
}
