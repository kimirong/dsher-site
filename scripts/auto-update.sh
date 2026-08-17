#!/bin/bash
set -e

cd /root/dsher-site

# Run the update script
python3 scripts/update-plugins.py

# Commit and push if there are changes
git add -A
if git diff --staged --quiet; then
    echo "No changes to commit"
else
    git commit -m "chore: auto-update plugins $(date '+%Y-%m-%d %H:%M')"
    git push
    echo "Pushed successfully"
fi
