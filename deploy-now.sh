#!/bin/bash
echo "🚀 Starting Deployment to GitHub Pages..."
echo "-----------------------------------"

# Get current repo URL if possible
CURRENT_REPO=$(git remote get-url origin 2>/dev/null)

if [ -z "$CURRENT_REPO" ]; then
    read -p "Enter your GitHub Repo URL (e.g., https://github.com/user/repo.git): " REPO_URL
else
    echo "Using existing remote: $CURRENT_REPO"
    REPO_URL=$CURRENT_REPO
fi

if [ -z "$REPO_URL" ]; then
    echo "❌ Error: Repo URL is required."
    exit 1
fi

# Ensure origin is correct
git remote remove origin 2>/dev/null
git remote add origin $REPO_URL

echo "💾 Saving source code to GitHub (main)..."
git add .
git commit -m "Update portfolio: $(date)"
git push -u origin main --force

echo "📦 Building project for production..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check for errors."
    exit 1
fi

echo "⬆️ Deploying build output (dist) to GitHub Pages (gh-pages)..."
# Create a temporary git repo in dist to push to gh-pages branch
cd dist
git init
git add -A
git commit -m "Deploy to GitHub Pages"
git push -f "$REPO_URL" master:gh-pages

if [ $? -eq 0 ]; then
    echo "-----------------------------------"
    echo "✅ SUCCESS! Your portfolio is now deployed to GitHub Pages."
    echo "🔗 Repo: $REPO_URL"
    echo "👉 Go to Repository Settings > Pages and ensure 'Branch' is set to 'gh-pages'."
else
    echo "❌ Deployment failed."
fi
