#!/bin/bash
echo "🚀 Starting Final Deployment with Your Data..."
echo "-----------------------------------"
read -p "Enter your GitHub Repo URL (e.g., https://github.com/user/repo.git): " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo "❌ Error: Repo URL is required."
    exit 1
fi

git remote remove origin
git remote add origin $REPO_URL

echo "📦 Building project for production..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check for errors."
    exit 1
fi

echo "💾 Saving your actual data to GitHub..."
git add .
git commit -m "Update portfolio with actual user data"

echo "⬆️ Pushing to GitHub..."
git push -u origin main --force

if [ $? -eq 0 ]; then
    echo "-----------------------------------"
    echo "✅ SUCCESS! Your REAL portfolio is now on GitHub."
    echo "🔗 Repo: $REPO_URL"
    echo ""
    echo "Now Vercel will automatically update your site (wait about 1 minute)."
    echo "You can then send the Vercel link to your teacher!"
else
    echo "❌ Push failed. Make sure your GitHub URL is correct and you have permission."
fi
