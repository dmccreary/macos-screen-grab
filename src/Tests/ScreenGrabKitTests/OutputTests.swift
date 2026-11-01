import AppKit
import ImageIO
import Testing
@testable import ScreenGrabKit

@MainActor
struct OutputTests {
    private func privatePasteboard() -> NSPasteboard {
        NSPasteboard(name: NSPasteboard.Name("com.dmccreary.screengrab.tests.\(UUID().uuidString)"))
    }

    private func temporaryFolder() -> URL {
        FileManager.default.temporaryDirectory
            .appendingPathComponent("ScreenGrabTests-\(UUID().uuidString)", isDirectory: true)
    }

    private func properties(of data: Data) -> [CFString: Any] {
        let source = CGImageSourceCreateWithData(data as CFData, nil)!
        return CGImageSourceCopyPropertiesAtIndex(source, 0, nil) as! [CFString: Any]
    }

    @Test func cropReturnsExactPixelsAtTwoX() {
        // Red left of pixel x=200, blue right of it, on a 200×100 pt display at 2×.
        let image = TestImages.make(width: 400, height: 200) { x, _ in x < 200 ? (255, 0, 0) : (0, 0, 255) }
        let display = FrozenDisplay(
            displayID: 1, screenFrame: CGRect(x: 0, y: 0, width: 200, height: 100), image: image)
        let selection = GrabSelection(display: display, pointRect: CGRect(x: 90, y: 10, width: 20, height: 10))

        let cropped = selection.croppedImage()!

        #expect(cropped.width == 40)
        #expect(cropped.height == 20)
        #expect(TestImages.pixel(of: cropped, x: 19, y: 10) == (255, 0, 0))
        #expect(TestImages.pixel(of: cropped, x: 20, y: 10) == (0, 0, 255))
    }

    @Test func cropKeepsTopToBottomOrder() {
        let selection = GrabSelection(
            display: TestImages.display(), pointRect: CGRect(x: 0, y: 140, width: 100, height: 20))

        let cropped = selection.croppedImage()!

        #expect(TestImages.pixel(of: cropped, x: 10, y: 0) == (255, 0, 0))
        #expect(TestImages.pixel(of: cropped, x: 10, y: cropped.height - 1) == (0, 0, 255))
    }

    @Test func encoderWritesDPIForRetina() throws {
        let image = TestImages.make(width: 100, height: 50) { _, _ in (10, 20, 30) }

        let encoded = try ImageEncoder.encode(image, scale: 2)

        for data in [encoded.png, encoded.tiff] {
            let props = properties(of: data)
            #expect(props[kCGImagePropertyPixelWidth] as? Int == 100)
            #expect(props[kCGImagePropertyPixelHeight] as? Int == 50)
            #expect(props[kCGImagePropertyDPIWidth] as? Double == 144)
            #expect(props[kCGImagePropertyDPIHeight] as? Double == 144)
        }
        #expect(NSImage(data: encoded.png)?.size == CGSize(width: 50, height: 25))
    }

    @Test func encoderCompressesTIFFWithLZW() throws {
        let image = TestImages.make(width: 100, height: 50) { _, _ in (10, 20, 30) }

        let encoded = try ImageEncoder.encode(image, scale: 1)

        let tiff = properties(of: encoded.tiff)[kCGImagePropertyTIFFDictionary] as? [CFString: Any]
        #expect(tiff?[kCGImagePropertyTIFFCompression] as? Int == 5)
    }

    @Test func deliverPutsPNGAndTIFFOnThePasteboard() async {
        let pasteboard = privatePasteboard()
        defer { pasteboard.releaseGlobally() }
        pasteboard.clearContents()
        pasteboard.setString("previous contents", forType: .string)

        let output = GrabOutput(pasteboard: pasteboard, saveFolder: { nil })
        let selection = GrabSelection(
            display: TestImages.display(), pointRect: CGRect(x: 10, y: 10, width: 50, height: 25))

        let outcome = await output.deliver(selection)

        #expect(outcome == GrabOutcome())
        #expect(pasteboard.string(forType: .string) == nil)
        let png = pasteboard.data(forType: .png)
        #expect(pasteboard.data(forType: .tiff) != nil)
        #expect(png.map { properties(of: $0)[kCGImagePropertyPixelWidth] as? Int } == 100)
        #expect(png.flatMap { NSImage(data: $0)?.size } == CGSize(width: 50, height: 25))
    }

    @Test func nothingIsWrittenWhenSavingIsOff() async {
        let pasteboard = privatePasteboard()
        defer { pasteboard.releaseGlobally() }
        let folder = temporaryFolder()

        let output = GrabOutput(pasteboard: pasteboard, saveFolder: { nil })
        let outcome = await output.deliver(GrabSelection(
            display: TestImages.display(), pointRect: CGRect(x: 0, y: 0, width: 50, height: 50)))

        #expect(outcome.savedURL == nil)
        #expect(!FileManager.default.fileExists(atPath: folder.path))
    }

    @Test func savingCreatesTheFolderAndAvoidsOverwriting() async throws {
        let pasteboard = privatePasteboard()
        defer { pasteboard.releaseGlobally() }
        let folder = temporaryFolder().appendingPathComponent("nested", isDirectory: true)
        defer { try? FileManager.default.removeItem(at: folder.deletingLastPathComponent()) }

        let fixedDate = Date(timeIntervalSince1970: 1_800_000_000)
        let output = GrabOutput(pasteboard: pasteboard, now: { fixedDate }, saveFolder: { folder })
        let selection = GrabSelection(
            display: TestImages.display(), pointRect: CGRect(x: 0, y: 0, width: 50, height: 50))

        let first = await output.deliver(selection)
        let second = await output.deliver(selection)

        let names = try FileManager.default.contentsOfDirectory(atPath: folder.path).sorted()
        #expect(names.count == 2)
        #expect(first.savedURL?.lastPathComponent == FileNaming.filename(for: fixedDate))
        #expect(second.savedURL?.lastPathComponent == FileNaming.filename(for: fixedDate, attempt: 2))
    }

    @Test func aSaveFailureLeavesTheClipboardCopyInPlace() async throws {
        let pasteboard = privatePasteboard()
        defer { pasteboard.releaseGlobally() }

        // A folder path that runs through a regular file can never be created.
        let root = temporaryFolder()
        try FileManager.default.createDirectory(at: root, withIntermediateDirectories: true)
        defer { try? FileManager.default.removeItem(at: root) }
        let file = root.appendingPathComponent("not-a-folder")
        try Data().write(to: file)
        let badFolder = file.appendingPathComponent("sub", isDirectory: true)

        let output = GrabOutput(pasteboard: pasteboard, saveFolder: { badFolder })
        let outcome = await output.deliver(GrabSelection(
            display: TestImages.display(), pointRect: CGRect(x: 0, y: 0, width: 50, height: 50)))

        #expect(outcome.clipboardError == nil)
        #expect(outcome.saveError != nil)
        #expect(pasteboard.data(forType: .png) != nil)
    }

    @Test func anEmptyCropReportsAnErrorAndLeavesTheClipboardAlone() async {
        let pasteboard = privatePasteboard()
        defer { pasteboard.releaseGlobally() }
        pasteboard.clearContents()
        pasteboard.setString("previous contents", forType: .string)

        let output = GrabOutput(pasteboard: pasteboard, saveFolder: { nil })
        let outcome = await output.deliver(GrabSelection(
            display: TestImages.display(), pointRect: CGRect(x: 5000, y: 5000, width: 50, height: 50)))

        #expect(outcome.clipboardError != nil)
        #expect(pasteboard.string(forType: .string) == "previous contents")
    }
}

struct FileNamingTests {
    private let utc = TimeZone(identifier: "UTC")!
    // 2027-01-15 08:00:00 UTC
    private let date = Date(timeIntervalSince1970: 1_800_000_000)

    @Test func filenameMatchesTheSpecifiedPattern() {
        #expect(FileNaming.filename(for: date, timeZone: utc) == "ScreenGrab 2027-01-15 at 08.00.00.png")
    }

    @Test func laterAttemptsGetANumericSuffix() {
        #expect(FileNaming.filename(for: date, attempt: 2, timeZone: utc) == "ScreenGrab 2027-01-15 at 08.00.00 (2).png")
    }

    @Test func uniqueURLSkipsTakenNames() {
        let folder = URL(fileURLWithPath: "/tmp/grabs")
        let taken: Set<String> = [
            FileNaming.filename(for: date, timeZone: utc),
            FileNaming.filename(for: date, attempt: 2, timeZone: utc),
        ]
        let url = FileNaming.uniqueURL(in: folder, date: date, timeZone: utc) { taken.contains($0.lastPathComponent) }
        #expect(url.lastPathComponent == "ScreenGrab 2027-01-15 at 08.00.00 (3).png")
    }
}
