#!/usr/bin/env bash
#
# Builds ScreenGrab.app from source, using only the Command Line Tools.
#
# Environment variables:
#   SIGN_IDENTITY  Code signing identity. Default: "-" (ad-hoc).
#   DIST_DIR       Output folder. Default: <repository>/dist.
#   UNIVERSAL      Set to 1 to build for both arm64 and x86_64.
#
# Prints the path of the finished app on the last line of its output.

set -euo pipefail

SRC_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST_DIR="${DIST_DIR:-$(dirname "$SRC_DIR")/dist}"
SIGN_IDENTITY="${SIGN_IDENTITY:--}"
APP_DIR="$DIST_DIR/ScreenGrab.app"
STAGING_DIR="$DIST_DIR/.ScreenGrab.app.building.$$"

trap 'rm -rf "$STAGING_DIR"' EXIT

plutil -lint "$SRC_DIR/Info.plist" >/dev/null

mkdir -p "$STAGING_DIR/Contents/MacOS"
binary="$STAGING_DIR/Contents/MacOS/ScreenGrab"

if [[ "${UNIVERSAL:-0}" == "1" ]]; then
    # Each architecture gets its own scratch folder so the builds can't overwrite
    # each other's products.
    slices=()
    for arch in arm64 x86_64; do
        scratch="$SRC_DIR/.build/universal-$arch"
        swift build -c release --package-path "$SRC_DIR" --arch "$arch" --scratch-path "$scratch"
        bin_path="$(swift build -c release --package-path "$SRC_DIR" --arch "$arch" --scratch-path "$scratch" --show-bin-path)"
        slices+=("$bin_path/ScreenGrab")
    done
    lipo -create "${slices[@]}" -output "$binary"
else
    swift build -c release --package-path "$SRC_DIR"
    bin_path="$(swift build -c release --package-path "$SRC_DIR" --show-bin-path)"
    cp "$bin_path/ScreenGrab" "$binary"
fi

cp "$SRC_DIR/Info.plist" "$STAGING_DIR/Contents/Info.plist"
printf 'APPL????' > "$STAGING_DIR/Contents/PkgInfo"

# Extended attributes make codesign fail with "resource fork, Finder information, or
# similar detritus not allowed".
xattr -cr "$STAGING_DIR"
codesign --force --sign "$SIGN_IDENTITY" --timestamp=none "$STAGING_DIR"
codesign --verify --strict "$STAGING_DIR"

# Replace the previous build only once the new one is complete and signed.
rm -rf "$APP_DIR"
mv "$STAGING_DIR" "$APP_DIR"

echo "$APP_DIR"
