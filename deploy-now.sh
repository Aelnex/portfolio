#!/bin/bash
echo "🚀 Starting Automated Deployment..."
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

echo "💾 Saving changes..."
git add .
git commit -m "Final portfolio build for evaluation"

echo "⬆️ Pushing to GitHub (you may be asked for your credentials)..."
git push -u origin main --force

if [ $? -eq 0 ]; then
    echo "-----------------------------------"
    echo "✅ SUCCESS! Your code is now on GitHub."
    echo "🔗 Repo: $REPO_URL"
    echo ""
    echo "Final Step:"
    echo "1. Go to https://vercel.com"
    echo "2. Log in and click 'Add New' > 'Project'"
    echo "3. Select this repository and click 'Deploy'"
    echo "4. Send the Vercel link to your teacher!"
else
    echo "❌ Push failed. Make sure your GitHub URL is correct and you have permission."
fi
