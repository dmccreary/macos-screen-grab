import AppKit

struct GrabOutcome: Equatable {
    var clipboardError: String?
    var saveError: String?
    var savedURL: URL?
}

@MainActor
protocol GrabOutputting: AnyObject {
    func deliver(_ selection: GrabSelection) async -> GrabOutcome
}

/// Crops the selection from the frozen frame, puts it on the clipboard, and
/// optionally saves it. A failed save never undoes the clipboard copy.
@MainActor
final class GrabOutput: GrabOutputting {
    private let pasteboard: NSPasteboard
    private let saveFolder: () -> URL?
    private let now: () -> Date

    init(pasteboard: NSPasteboard = .general, now: @escaping () -> Date = { Date() }, saveFolder: @escaping () -> URL?) {
        self.pasteboard = pasteboard
        self.now = now
        self.saveFolder = saveFolder
    }

    func deliver(_ selection: GrabSelection) async -> GrabOutcome {
        var outcome = GrabOutcome()
        guard let image = selection.croppedImage() else {
            outcome.clipboardError = "The selected area could not be cropped from the captured image."
            return outcome
        }

        let scale = selection.display.scale
        let encoded: ImageEncoder.Encoded
        do {
            encoded = try await Task.detached(priority: .userInitiated) {
                try ImageEncoder.encode(image, scale: scale)
            }.value
        } catch {
            outcome.clipboardError = error.localizedDescription
            return outcome
        }

        if !Self.write(encoded, to: pasteboard) {
            outcome.clipboardError = "The image could not be written to the clipboard."
        }

        if let folder = saveFolder() {
            let date = now()
            let png = encoded.png
            do {
                outcome.savedURL = try await Task.detached(priority: .userInitiated) {
                    try FileNaming.save(png, in: folder, date: date)
                }.value
            } catch {
                outcome.saveError = error.localizedDescription
            }
        }
        return outcome
    }

    private static func write(_ encoded: ImageEncoder.Encoded, to pasteboard: NSPasteboard) -> Bool {
        pasteboard.clearContents()
        pasteboard.declareTypes([.png, .tiff], owner: nil)
        return pasteboard.setData(encoded.png, forType: .png)
            && pasteboard.setData(encoded.tiff, forType: .tiff)
    }
}
