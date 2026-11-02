#!/usr/bin/env bash
#
# Runs the unit tests. Extra arguments are passed to `swift test`.
#
# With only the Command Line Tools installed, SwiftPM may find neither Testing.framework
# nor its macro plugin, depending on the Swift version. So the plugin's folder is passed
# explicitly when it exists, and so are the framework's folder and the folder of the
# library it loads at run time.

set -euo pipefail

SRC_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

plugin_args=()
swift_path="$(xcrun --find swift)"
plugin_dir="$(dirname "$swift_path")/../lib/swift/host/plugins/testing"
if [[ -d "$plugin_dir" ]]; then
    plugin_args=(-Xswiftc -plugin-path -Xswiftc "$(cd "$plugin_dir" && pwd)")
fi

# These folders only exist in a Command Line Tools install. Xcode needs none of this.
framework_args=()
tools_dir="$(cd "$(dirname "$swift_path")/../.." && pwd)"
framework_dir="$tools_dir/Library/Developer/Frameworks"
interop_dir="$tools_dir/Library/Developer/usr/lib"
if [[ -d "$framework_dir/Testing.framework" ]]; then
    framework_args=(
        -Xswiftc -F -Xswiftc "$framework_dir"
        -Xlinker -F -Xlinker "$framework_dir"
        -Xlinker -rpath -Xlinker "$framework_dir"
    )
    if [[ -d "$interop_dir" ]]; then
        framework_args+=(-Xlinker -rpath -Xlinker "$interop_dir")
    fi
fi

exec swift test --package-path "$SRC_DIR" \
    ${plugin_args[@]+"${plugin_args[@]}"} \
    ${framework_args[@]+"${framework_args[@]}"} \
    "$@"
