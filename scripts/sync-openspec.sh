#!/usr/bin/env bash
set -euo pipefail

# Sync contents from docs/openspec-submodule to docs/openspec (exclude .git)
REPO_ROOT=$(cd "$(dirname "$0")"/.. && pwd)
cd "$REPO_ROOT"

SUBDIR="docs/openspec-submodule"
DESTDIR="docs/openspec"

CLONED_TEMP=0
if [ ! -d "$SUBDIR" ]; then
  echo "Submodule $SUBDIR not found — clonando temporalmente desde https://github.com/Fission-AI/openspec.git"
  git clone --depth 1 https://github.com/Fission-AI/openspec.git "$SUBDIR"
  CLONED_TEMP=1
fi

mkdir -p "$DESTDIR"
rsync -a --delete --exclude='.git' "$SUBDIR/" "$DESTDIR/"

# Stage changes
git add "$DESTDIR"

# If no staged changes, exit cleanly
if git diff --cached --quiet; then
  echo "No changes to sync."
  exit 0
fi

# Configure committer
git config user.name "github-actions[bot]"
git config user.email "github-actions[bot]@users.noreply.github.com"

BRANCH="${GITHUB_REF##refs/heads/}"
if [ -z "$BRANCH" ]; then
  BRANCH="main"
fi

COMMIT_MSG="chore(ci): sync docs/openspec from submodule on $(date -u +"%Y-%m-%d %H:%M:%S UTC")"
git commit -m "$COMMIT_MSG"

echo "Pushing changes to origin/$BRANCH"
git push "https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git" HEAD:"$BRANCH"

echo "Sync complete."

if [ "$CLONED_TEMP" -eq 1 ]; then
  echo "Removing temporary clone $SUBDIR"
  rm -rf "$SUBDIR"
fi
