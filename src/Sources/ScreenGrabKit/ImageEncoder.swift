import CoreGraphics
import Foundation
import ImageIO
import UniformTypeIdentifiers

enum ImageEncoder {
    struct Encoded: Sendable {
        let png: Data
        let tiff: Data
    }

    enum EncodingError: LocalizedError {
        case failed(String)

        var errorDescription: String? {
            switch self {
            case .failed(let format): return "The image could not be encoded as \(format)."
            }
        }
    }

    private static let tiffLZWCompression = 5

    /// Encodes with DPI metadata of 72 × scale, which is what makes a 2× image paste
    /// at the same size it had on screen.
    static func encode(_ image: CGImage, scale: CGFloat) throws -> Encoded {
        let dpi = 72 * scale
        let dpiProperties: [CFString: Any] = [
            kCGImagePropertyDPIWidth: dpi,
            kCGImagePropertyDPIHeight: dpi,
        ]
        var tiffProperties = dpiProperties
        tiffProperties[kCGImagePropertyTIFFDictionary] = [kCGImagePropertyTIFFCompression: tiffLZWCompression]

        return Encoded(
            png: try data(for: image, type: .png, properties: dpiProperties),
            tiff: try data(for: image, type: .tiff, properties: tiffProperties))
    }

    private static func data(for image: CGImage, type: UTType, properties: [CFString: Any]) throws -> Data {
        let output = NSMutableData()
        guard let destination = CGImageDestinationCreateWithData(output, type.identifier as CFString, 1, nil) else {
            throw EncodingError.failed(type.identifier)
        }
        CGImageDestinationAddImage(destination, image, properties as CFDictionary)
        guard CGImageDestinationFinalize(destination) else {
            throw EncodingError.failed(type.identifier)
        }
        return output as Data
    }
}
