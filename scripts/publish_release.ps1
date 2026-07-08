# Publish Mneme-open binaries to a GitHub release.
#
# Prerequisites: gh CLI authenticated, Go toolchain, git tag for the release.
# Run from the private repo root.
#
# Usage:
#   publish_release.ps1 <tag>
#
# Example:
#   .\scripts\publish_release.ps1 v0.1.0

param([string] $Tag)

$ErrorActionPreference = "Stop"

if (-not $Tag) {
    Write-Host "Usage: publish_release.ps1 <tag>" -ForegroundColor Red
    exit 1
}

Write-Host "Building binaries for all platforms..."
python scripts/build_open_binaries.py --all
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

$openDir = "D:\profile\paper-code\AXISRobo-MNEME-Open"
Write-Host "Tagging Mneme-open $Tag..."
git -C $openDir tag $Tag
git -C $openDir push origin $Tag

Write-Host "Creating release and uploading binaries..."
gh release create $Tag dist/open/**/* `
    --repo axisrobo/mneme-open `
    --title "Mneme-open $Tag" `
    --notes "Prebuilt Mneme embedded server binaries for $Tag.`n`n- mneme-http: JSON-RPC-over-HTTP + REST`n- mneme-grpc: gRPC`n- mneme-jsonrpc-stdio: JSON-RPC over stdio`n- mneme-mcp-stdio: MCP server over stdio`n`nBuilt with CGO_ENABLED=0, embedded backends only.`n`nPlatforms: windows/amd64, linux/amd64, darwin/amd64, darwin/arm64.`n`nSee BINARY-LICENSE.md for distribution terms."

Write-Host "Done. Verify at https://github.com/axisrobo/mneme-open/releases/tag/$Tag"