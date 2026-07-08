# Publish binaries to a Mneme-open GitHub release

# Prerequisites: gh CLI authenticated, git tag for the release, Go 1.25+
# Run from the private repo root.

set -e

echo "Building binaries for all platforms..."
python scripts/build_open_binaries.py --all

echo "Creating release..."
read -p "Release version tag (e.g. v0.1.0): " TAG
git -C "$(cd "$(dirname "$0")/../.." && pwd)/../AXISRobo-MNEME-Open" tag "$TAG"

echo "Uploading binaries..."
gh release create "$TAG" dist/open/**/* \
  --repo axisrobo/mneme-open \
  --title "Mneme-open $TAG" \
  --notes "Prebuilt Mneme embedded server binaries for $TAG."

echo "Done. Verify at https://github.com/axisrobo/mneme-open/releases/tag/$TAG"
