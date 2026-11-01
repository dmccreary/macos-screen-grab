import Foundation

/// Filenames for the optional save-to-folder feature, using the same pattern as
/// macOS's own screenshots.
enum FileNaming {
    static func filename(for date: Date, attempt: Int = 1, timeZone: TimeZone = .current) -> String {
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "en_US_POSIX")
        formatter.timeZone = timeZone
        formatter.dateFormat = "yyyy-MM-dd 'at' HH.mm.ss"
        let suffix = attempt > 1 ? " (\(attempt))" : ""
        return "ScreenGrab \(formatter.string(from: date))\(suffix).png"
    }

    /// The first name for `date` that isn't already taken in `folder`.
    static func uniqueURL(
        in folder: URL,
        date: Date,
        timeZone: TimeZone = .current,
        exists: (URL) -> Bool = { FileManager.default.fileExists(atPath: $0.path) }
    ) -> URL {
        var attempt = 1
        while true {
            let url = folder.appendingPathComponent(filename(for: date, attempt: attempt, timeZone: timeZone))
            if !exists(url) { return url }
            attempt += 1
        }
    }

    /// Writes `data` to a new file in `folder`, creating the folder if needed.
    static func save(_ data: Data, in folder: URL, date: Date) throws -> URL {
        try FileManager.default.createDirectory(at: folder, withIntermediateDirectories: true)
        let url = uniqueURL(in: folder, date: date)
        try data.write(to: url, options: .atomic)
        return url
    }
}
