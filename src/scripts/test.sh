#!/usr/bin/env bash
#
# Runs the unit tests. Extra arguments are passed to `swift test`.
#
# With only the Command Line Tools installed, SwiftPM finds Testing.framework but not
# its macro plugin, so the plugin's folder is passed explicitly when it exists.

set -euo pipefail

SRC_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

plugin_args=()
swift_path="$(xcrun --find swift)"
plugin_dir="$(dirname "$swift_path")/../lib/swift/host/plugins/testing"
if [[ -d "$plugin_dir" ]]; then
    plugin_args=(-Xswiftc -plugin-path -Xswiftc "$(cd "$plugin_dir" && pwd)")
fi

exec swift test --package-path "$SRC_DIR" ${plugin_args[@]+"${plugin_args[@]}"} "$@"
