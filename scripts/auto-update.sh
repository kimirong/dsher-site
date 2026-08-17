#!/bin/bash
set -e

cd /root/dsher-site

# Get GitHub token from gh config
export GITHUB_TOKEN=$(grep "oauth_token:" ~/.config/gh/hosts.yml | head -1 | awk '{print $2}')

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
