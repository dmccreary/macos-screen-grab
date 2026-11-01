// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "ScreenGrab",
    platforms: [.macOS(.v14)],
    products: [
        .executable(name: "ScreenGrab", targets: ["ScreenGrab"]),
    ],
    targets: [
        .target(name: "ScreenGrabKit"),
        .executableTarget(name: "ScreenGrab", dependencies: ["ScreenGrabKit"]),
        .testTarget(name: "ScreenGrabKitTests", dependencies: ["ScreenGrabKit"]),
    ]
)
