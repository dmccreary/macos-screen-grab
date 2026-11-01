#!/usr/bin/env bash
#
# Tests, builds, and installs ScreenGrab. Run with --help for the options, or see
# README.md.
#
# The installed copy is replaced only after the new build has passed its tests and
# been signed and verified. If the swap fails, the previous version is put back.

set -euo pipefail

readonly APP_NAME="ScreenGrab"
readonly BUNDLE_NAME="$APP_NAME.app"
readonly MIN_MACOS_MAJOR=14
readonly RUNNING_PATTERN="/$BUNDLE_NAME/Contents/MacOS/$APP_NAME\$"

SRC_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly SRC_DIR

# Options
ACTION="install"
DEST=""
USE_USER_DIR=0
RUN_TESTS=1
LAUNCH=1
UNIVERSAL=0
VERBOSE=0
PURGE=0
RESET_PERMISSION=0

# State used by the exit trap
LOG_FILE=""
STAGING=""
BACKUP=""
TARGET=""
WAS_RUNNING=0

if [[ -t 1 ]]; then
    BOLD=$'\033[1m'; GREEN=$'\033[32m'; YELLOW=$'\033[33m'; RED=$'\033[31m'; RESET=$'\033[0m'
else
    BOLD=""; GREEN=""; YELLOW=""; RED=""; RESET=""
fi

step() { printf '%s==>%s %s\n' "$BOLD" "$RESET" "$*"; }
ok()   { printf '%s  ok%s %s\n' "$GREEN" "$RESET" "$*"; }
warn() { printf '%swarning:%s %s\n' "$YELLOW" "$RESET" "$*" >&2; }
die()  { printf '%serror:%s %s\n' "$RED" "$RESET" "$*" >&2; exit 1; }

usage() {
    cat <<EOF
Usage: ./install.sh [options]

Tests, builds, and installs $APP_NAME, then opens it.

Install options:
  --user               Install to ~/Applications instead of /Applications.
  --dest DIR           Install to DIR.
  --skip-tests         Don't run the unit tests first.
  --no-launch          Don't open the app after installing.
  --universal          Build for both Apple Silicon and Intel.
  -v, --verbose        Show full test and build output.

Other actions:
  --uninstall          Remove the app. Add --purge to delete its preferences too.
  --reset-permission   Clear $APP_NAME's Screen Recording entry, then stop. Combine
                       with an install to do both. See README.md, Troubleshooting.
  -h, --help           Show this help.

Environment variables:
  SIGN_IDENTITY        Code signing identity. Default: ad-hoc. See README.md.
EOF
}

parse_args() {
    while [[ $# -gt 0 ]]; do
        case "$1" in
            --user) USE_USER_DIR=1 ;;
            --dest)
                [[ $# -ge 2 ]] || die "--dest needs a folder."
                DEST="$2"
                shift
                ;;
            --skip-tests) RUN_TESTS=0 ;;
            --no-launch) LAUNCH=0 ;;
            --universal) UNIVERSAL=1 ;;
            -v | --verbose) VERBOSE=1 ;;
            --uninstall) ACTION="uninstall" ;;
            --purge) PURGE=1 ;;
            --reset-permission) RESET_PERMISSION=1 ;;
            -h | --help)
                usage
                exit 0
                ;;
            *) die "Unknown option: $1 (run with --help for the options)" ;;
        esac
        shift
    done

    if [[ "$PURGE" == 1 && "$ACTION" != "uninstall" ]]; then
        die "--purge only applies to --uninstall."
    fi
    if [[ -n "$DEST" && "$USE_USER_DIR" == 1 ]]; then
        die "Use either --user or --dest, not both."
    fi
}

check_system() {
    [[ "$(uname -s)" == "Darwin" ]] || die "$APP_NAME only runs on macOS."
    [[ "$EUID" -ne 0 ]] || die "Don't run this with sudo. Root-owned build files would break later builds."

    local version major
    version="$(sw_vers -productVersion)"
    major="${version%%.*}"
    if [[ "$major" -lt "$MIN_MACOS_MAJOR" ]]; then
        die "$APP_NAME needs macOS $MIN_MACOS_MAJOR or later. This Mac has macOS $version."
    fi
}

check_build_tools() {
    # xcode-select is checked first because xcrun can open an installer dialog.
    if ! xcode-select -p >/dev/null 2>&1; then
        die "The Command Line Tools aren't installed. Run: xcode-select --install"
    fi
    local tool
    for tool in swift codesign plutil ditto lipo; do
        xcrun --find "$tool" >/dev/null 2>&1 || command -v "$tool" >/dev/null 2>&1 \
            || die "Can't find '$tool'. Reinstall the Command Line Tools with: xcode-select --install"
    done
    if ! swift --version >/dev/null 2>&1; then
        die "Swift won't run. If you've just installed Xcode, accept its license with: sudo xcodebuild -license"
    fi
}

bundle_id_of() {
    /usr/libexec/PlistBuddy -c 'Print :CFBundleIdentifier' "$1/Contents/Info.plist" 2>/dev/null || true
}

cdhash_of() {
    codesign -dvvv "$1" 2>&1 | sed -n 's/^CDHash=//p' || true
}

is_our_app() {
    [[ "$1" == */"$BUNDLE_NAME" && "$(bundle_id_of "$1")" == "$BUNDLE_ID" ]]
}

running_pids() {
    pgrep -f "$RUNNING_PATTERN" || true
}

stop_running_app() {
    local pids waited=0
    pids="$(running_pids)"
    [[ -n "$pids" ]] || return 0

    WAS_RUNNING=1
    step "Stopping the running copy of $APP_NAME"
    # shellcheck disable=SC2086  # One argument per process ID is intended.
    kill $pids 2>/dev/null || true
    while [[ -n "$(running_pids)" ]]; do
        if [[ "$waited" -ge 50 ]]; then
            warn "$APP_NAME didn't quit in 5 seconds, so it's being force-quit."
            # shellcheck disable=SC2086
            kill -9 $(running_pids) 2>/dev/null || true
            sleep 0.2
            break
        fi
        sleep 0.1
        waited=$((waited + 1))
    done
}

# Runs a command, showing its output only with --verbose or on failure.
run_logged() {
    local description="$1"
    shift
    if [[ "$VERBOSE" == 1 ]]; then
        "$@" 2>&1 | tee "$LOG_FILE"
        return "${PIPESTATUS[0]}"
    fi
    if ! "$@" >"$LOG_FILE" 2>&1; then
        printf '\n%s\n' "--- Last lines of output ---" >&2
        tail -n 40 "$LOG_FILE" >&2
        die "$description failed. Run again with --verbose for the full output."
    fi
}

run_tests() {
    step "Running the unit tests"
    run_logged "The test run" "$SRC_DIR/scripts/test.sh"
    local summary
    summary="$(sed 's/\x1b\[[0-9;]*m//g' "$LOG_FILE" | grep -E 'Test run with' | tail -n 1 || true)"
    ok "${summary:-Tests passed}"
}

build_app() {
    step "Building $BUNDLE_NAME"
    UNIVERSAL="$UNIVERSAL" run_logged "The build" "$SRC_DIR/scripts/build-app.sh"
    BUILT_APP="$(tail -n 1 "$LOG_FILE")"
    [[ -d "$BUILT_APP" ]] || die "The build finished, but no app was found at: $BUILT_APP"

    plutil -lint "$BUILT_APP/Contents/Info.plist" >/dev/null || die "The built Info.plist isn't valid."
    [[ -x "$BUILT_APP/Contents/MacOS/$APP_NAME" ]] || die "The built app has no executable."
    codesign --verify --strict "$BUILT_APP" || die "The built app failed signature verification."
    ok "Built and signed ($(lipo -archs "$BUILT_APP/Contents/MacOS/$APP_NAME"))"
}

choose_destination() {
    if [[ -n "$DEST" ]]; then
        mkdir -p "$DEST" || die "Can't create $DEST."
    elif [[ "$USE_USER_DIR" == 1 ]]; then
        DEST="$HOME/Applications"
        mkdir -p "$DEST" || die "Can't create $DEST."
    elif [[ -w /Applications ]]; then
        DEST="/Applications"
    else
        warn "/Applications isn't writable, so installing to ~/Applications instead."
        DEST="$HOME/Applications"
        mkdir -p "$DEST" || die "Can't create $DEST."
    fi
    DEST="$(cd "$DEST" && pwd)"
    [[ -w "$DEST" ]] || die "$DEST isn't writable."
    TARGET="$DEST/$BUNDLE_NAME"

    # Refuse to replace some other application that happens to have the same name.
    if [[ -e "$TARGET" ]] && ! is_our_app "$TARGET"; then
        TARGET=""
        die "$DEST/$BUNDLE_NAME already exists and isn't this app. Move it, or choose a folder with --dest."
    fi
}

warn_about_other_copies() {
    local location
    for location in /Applications "$HOME/Applications"; do
        if [[ "$location/$BUNDLE_NAME" != "$TARGET" ]] && is_our_app "$location/$BUNDLE_NAME"; then
            warn "Another copy is at $location/$BUNDLE_NAME. Consider removing it so that the two don't get mixed up."
        fi
    done
}

install_bundle() {
    local previous_hash=""
    [[ -e "$TARGET" ]] && previous_hash="$(cdhash_of "$TARGET")"

    step "Installing to $TARGET"
    STAGING="$DEST/.$BUNDLE_NAME.installing.$$"
    BACKUP="$DEST/.$BUNDLE_NAME.previous.$$"
    ditto "$BUILT_APP" "$STAGING" || die "Couldn't copy the app to $DEST."
    codesign --verify --strict "$STAGING" || die "The copied app failed signature verification."

    stop_running_app

    if [[ -e "$TARGET" ]]; then
        mv "$TARGET" "$BACKUP" || die "Couldn't move the previous version aside."
    fi
    mv "$STAGING" "$TARGET" || die "Couldn't move the new version into place."
    STAGING=""
    codesign --verify --strict "$TARGET" || die "The installed app failed signature verification."

    # The new version is in place, so the previous one is no longer needed.
    rm -rf "$BACKUP"
    BACKUP=""
    ok "Installed $(/usr/libexec/PlistBuddy -c 'Print :CFBundleShortVersionString' "$TARGET/Contents/Info.plist")"

    # Lets Spotlight and Launchpad find the app. Not being able to is harmless.
    local lsregister="/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister"
    [[ -x "$lsregister" ]] && "$lsregister" -f "$TARGET" >/dev/null 2>&1 || true

    if [[ -n "$previous_hash" && "$previous_hash" != "$(cdhash_of "$TARGET")" && "${SIGN_IDENTITY:--}" == "-" ]]; then
        warn "This build has a new ad-hoc signature, so macOS may ask for Screen Recording permission again."
        warn "If ScreenGrab says permission is missing while it's switched on, run: ./install.sh --reset-permission"
    fi
}

launch_app() {
    step "Opening $APP_NAME"
    open "$TARGET" || { warn "Couldn't open $TARGET. Open it from the Applications folder."; return 0; }

    local waited=0
    while [[ -z "$(running_pids)" && "$waited" -lt 50 ]]; do
        sleep 0.1
        waited=$((waited + 1))
    done
    if [[ -n "$(running_pids)" ]]; then
        ok "$APP_NAME is running in the menu bar"
    else
        warn "$APP_NAME doesn't seem to have started. Try opening $TARGET from the Finder."
    fi
}

reset_permission() {
    step "Clearing the Screen Recording entry for $APP_NAME"
    if tccutil reset ScreenCapture "$BUNDLE_ID" >/dev/null 2>&1; then
        ok "Cleared. macOS will ask again at the next grab."
    else
        warn "tccutil couldn't clear the entry. Remove $APP_NAME by hand in System Settings, under Privacy & Security, Screen & System Audio Recording."
    fi
}

print_next_steps() {
    cat <<EOF

${BOLD}$APP_NAME is installed at $TARGET${RESET}

  Grab Region              ⌃⇧4  (Control-Shift-4)
  Grab Region with Delay   ⌃⇧5  (Control-Shift-5)

The first grab asks for Screen Recording permission. Turn on $APP_NAME in System
Settings, then choose Quit & Reopen. See README.md for the details.
EOF
}

do_install() {
    check_build_tools
    choose_destination
    warn_about_other_copies
    if [[ "$RUN_TESTS" == 1 ]]; then run_tests; fi
    build_app
    install_bundle
    if [[ "$RESET_PERMISSION" == 1 ]]; then reset_permission; fi
    if [[ "$LAUNCH" == 1 ]]; then launch_app; fi
    print_next_steps
}

do_uninstall() {
    stop_running_app

    local locations=("/Applications" "$HOME/Applications")
    if [[ -n "$DEST" ]]; then locations=("$DEST"); fi

    local location path removed=0
    for location in "${locations[@]}"; do
        path="$location/$BUNDLE_NAME"
        if is_our_app "$path"; then
            rm -rf "$path"
            ok "Removed $path"
            removed=1
        elif [[ -e "$path" ]]; then
            warn "Leaving $path in place, because it isn't this app."
        fi
    done
    if [[ "$removed" == 0 ]]; then warn "No installed copy was found."; fi

    if [[ "$PURGE" == 1 ]]; then
        defaults delete "$BUNDLE_ID" >/dev/null 2>&1 || true
        ok "Deleted the preferences"
    fi
    if [[ "$RESET_PERMISSION" == 1 ]]; then reset_permission; fi
    echo "Any PNGs that $APP_NAME saved to a folder have been left where they are."
}

do_reset_permission_only() {
    stop_running_app
    reset_permission
    echo "Open $APP_NAME again and make a grab, then approve the request."
}

cleanup() {
    local status=$?
    trap - EXIT
    [[ -n "$STAGING" ]] && rm -rf "$STAGING"
    if [[ -n "$BACKUP" && -e "$BACKUP" ]]; then
        if [[ ! -e "$TARGET" ]]; then
            mv "$BACKUP" "$TARGET" && warn "The previous version has been put back."
            if [[ "$WAS_RUNNING" == 1 ]]; then open "$TARGET" || true; fi
        else
            rm -rf "$BACKUP"
        fi
    fi
    [[ -n "$LOG_FILE" ]] && rm -f "$LOG_FILE"
    exit "$status"
}

main() {
    parse_args "$@"
    check_system

    BUNDLE_ID="$(/usr/libexec/PlistBuddy -c 'Print :CFBundleIdentifier' "$SRC_DIR/Info.plist")"
    readonly BUNDLE_ID
    LOG_FILE="$(mktemp -t screengrab-install)"
    trap cleanup EXIT
    trap 'exit 130' INT
    trap 'exit 143' TERM

    case "$ACTION" in
        uninstall) do_uninstall ;;
        install)
            # --reset-permission on its own doesn't rebuild anything.
            if [[ "$RESET_PERMISSION" == 1 && "$RUN_TESTS" == 1 && "$LAUNCH" == 1 && "$UNIVERSAL" == 0 \
                && -z "$DEST" && "$USE_USER_DIR" == 0 && $# -eq 1 ]]; then
                do_reset_permission_only
            else
                do_install
            fi
            ;;
    esac
}

main "$@"
