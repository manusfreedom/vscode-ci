#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "Installing server dependencies..."
cd "$REPO_ROOT/server"
npm install

echo "Installing client dependencies..."
cd "$REPO_ROOT/client"
npm install

echo "Dev container setup complete."
