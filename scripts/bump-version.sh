#!/bin/bash

# Script to bump version in all required files
# Usage: ./bump-version.sh <new_version>
# Example: ./bump-version.sh 2.5.0

if [ $# -eq 0 ]; then
    echo "Usage: $0 <new_version>"
    echo "Example: $0 2.5.0"
    exit 1
fi

NEW_VERSION=$1

# Validate version format
if ! [[ $NEW_VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "Error: Version must be in format x.y.z (e.g., 2.5.0)"
    exit 1
fi

echo "Updating version to $NEW_VERSION..."

# Get current version
CURRENT_VERSION=$(grep -Po '"version": "\K[0-9]+\.[0-9]+\.[0-9]+' package.json)
echo "Current version: $CURRENT_VERSION"

# Update package.json
echo "Updating package.json..."
sed -i.bak "s/\"version\": \"$CURRENT_VERSION\"/\"version\": \"$NEW_VERSION\"/" package.json

# Update package-lock.json by running npm install
echo "Updating package-lock.json..."
npm install

# Update src/index.ts
echo "Updating src/index.ts..."
if grep -q "VERSION = '" src/index.ts; then
    # If VERSION is already hardcoded, update it
    sed -i.bak "s/VERSION = '[0-9]\+\.[0-9]\+\.[0-9]\+'/VERSION = '$NEW_VERSION'/" src/index.ts
fi

# Clean up backup files
rm -f package.json.bak src/index.ts.bak

echo "Version bump complete!"
echo "Updated files:"
echo "  - package.json: $NEW_VERSION"
echo "  - package-lock.json: $NEW_VERSION"
echo "  - src/index.ts: $NEW_VERSION"