#!/bin/bash
set -uo pipefail

if [ $# -eq 0 ]; then
    mapfile -t VERSIONS < <(curl -m 3 -sSf https://api.adoptium.net/v3/info/available_releases | jq .available_releases[] -r)
    (IFS="|"; printf "Usage: %s [%s]\n" "$(basename "$0")" "${VERSIONS[*]}")
    exit 2
fi

if [ $EUID -ne 0 ]; then
    echo "This script needs to be run as root. Try 'sudo $0'"
    exit 2
fi

VERSION="$1"

if ! LINK="$(curl -s "https://api.adoptium.net/v3/assets/latest/$VERSION/hotspot?architecture=x64&image_type=jre&os=linux" | jq -re .[0].binary.package.link)"; then
    echo "Failed to find the supplied Java version"
    exit 1
fi

echo "Download link: $LINK"
read -rp "Download and install Java now? [y/n]: " -n1 next
if [ "$next" != 'y' ]; then
    exit 0;
fi

TMPDIR="$(mktemp -d)"
cd "$TMPDIR" || { echo "Failed to create a /tmp directory."; exit 1; }
TARPATH="$(realpath .)/java.tar.gz"
if ! wget "$LINK" -O "$TARPATH" -q --show-progress; then
    echo "Failed to download Java. Cleaning up..."
    rm -rf "$TMPDIR"
    exit 1
fi
echo "Extracting tar.gz"
tar xzf "$TARPATH"

echo "Removing tar.gz"
rm "$TARPATH"


if ! FOUND="$(find . -type f -name 'java' | head -1 | grep .)"; then
    echo "Failed to find Java executable. Cleaning up..."
    rm -rf "$TMPDIR"
    exit 1
fi
cd "$(dirname "$FOUND")/.." || { echo "Failed to find Java structure. Cleaning up..."; rm -rf "$TMPDIR"; exit 1; }

NEWDIR="/opt/java/$VERSION-jre"
if [ -d "$NEWDIR" ]; then
    echo "Removing old installation"
    rm -rf "$NEWDIR"
fi
mkdir -p "$NEWDIR/"

echo "Copying Java files over to '$NEWDIR/'"
cp -r ./* "$NEWDIR/"

echo "Cleaning up '$TMPDIR'"
cd "$HOME"
rm -rf "$TMPDIR"

echo "Successfully installed Java to '$NEWDIR/bin/java'"
read -rp "Add 'java' to PATH? [y/n]: " -n1 addpath
if [ "$addpath" != 'y' ]; then
    exit 0
fi

echo "Linking /usr/bin/java -> '$NEWDIR/bin/java'"
ln -fs "$NEWDIR/bin/java" /usr/bin/java

echo
java --version
echo

echo "All done!"









