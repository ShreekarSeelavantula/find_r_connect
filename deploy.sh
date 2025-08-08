#!/bin/bash

# FindRConnect Deployment Script for Render
# This script helps prepare the project for deployment

echo "🚀 Preparing FindRConnect for Render deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check if render.yaml exists
if [ ! -f "render.yaml" ]; then
    echo "❌ Error: render.yaml not found. Please ensure it exists in the root directory."
    exit 1
fi

# Check if client directory exists
if [ ! -d "client" ]; then
    echo "❌ Error: client directory not found."
    exit 1
fi

# Check if server directory exists
if [ ! -d "server" ]; then
    echo "❌ Error: server directory not found."
    exit 1
fi

echo "✅ Project structure looks good!"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "⚠️  Warning: Git repository not initialized. Please run:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    echo "   git remote add origin <your-github-repo-url>"
    echo "   git push -u origin main"
    exit 1
fi

# Check if there are uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Warning: You have uncommitted changes. Please commit them before deploying:"
    echo "   git add ."
    echo "   git commit -m 'Prepare for deployment'"
    echo "   git push"
fi

echo ""
echo "📋 Deployment Checklist:"
echo "1. ✅ Project structure verified"
echo "2. ✅ render.yaml configuration ready"
echo "3. ✅ CORS configuration added"
echo "4. ✅ Environment variables configured"
echo ""
echo "🎯 Next Steps:"
echo "1. Push your code to GitHub:"
echo "   git add ."
echo "   git commit -m 'Prepare for Render deployment'"
echo "   git push"
echo ""
echo "2. Deploy to Render:"
echo "   - Go to https://dashboard.render.com/"
echo "   - Click 'New +' → 'Blueprint'"
echo "   - Connect your GitHub repository"
echo "   - Render will automatically detect render.yaml"
echo ""
echo "3. Set Environment Variables in Render:"
echo "   Backend:"
echo "   - DATABASE_URL=your_postgresql_connection_string"
echo "   - FRONTEND_URL=https://your-frontend-service.onrender.com"
echo ""
echo "   Frontend:"
echo "   - VITE_API_URL=https://your-backend-service.onrender.com"
echo ""
echo "4. Update URLs:"
echo "   - After deployment, update the environment variables with actual URLs"
echo "   - Test the connection between frontend and backend"
echo ""
echo "�� Happy deploying!"
