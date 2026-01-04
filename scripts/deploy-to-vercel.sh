#!/bin/bash

# Elevate for Humanity - Vercel Autodeploy Script
# This script automates the entire deployment process to Vercel

set -e  # Exit on error

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  🚀 Elevate for Humanity - Vercel Deployment Script      ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Vercel CLI is installed
print_status "Checking for Vercel CLI..."
if ! command -v vercel &> /dev/null; then
    print_warning "Vercel CLI not found. Installing..."
    npm install -g vercel
    print_success "Vercel CLI installed"
else
    print_success "Vercel CLI found"
fi

# Check if logged in to Vercel
print_status "Checking Vercel authentication..."
if ! vercel whoami &> /dev/null; then
    print_warning "Not logged in to Vercel. Please login..."
    vercel login
else
    print_success "Already logged in to Vercel"
fi

# Install dependencies
print_status "Installing dependencies..."
npm install
print_success "Dependencies installed"

# Build the project
print_status "Building project..."
npm run build
print_success "Build completed successfully"

# Ask for deployment type
echo ""
echo "Select deployment type:"
echo "  1) Preview (staging)"
echo "  2) Production"
echo ""
read -p "Enter choice (1 or 2): " -n 1 -r
echo ""

if [[ $REPLY == "1" ]]; then
    DEPLOY_TYPE="preview"
    DEPLOY_CMD="vercel"
elif [[ $REPLY == "2" ]]; then
    DEPLOY_TYPE="production"
    DEPLOY_CMD="vercel --prod"
else
    print_error "Invalid choice"
    exit 1
fi

# Deploy to Vercel
print_status "Deploying to Vercel ($DEPLOY_TYPE)..."
echo ""

$DEPLOY_CMD

DEPLOY_STATUS=$?

echo ""
if [ $DEPLOY_STATUS -eq 0 ]; then
    print_success "Deployment successful! 🎉"
    echo ""
    echo "╔════════════════════════════════════════════════════════════╗"
    echo "║              ✅ Deployment Complete                        ║"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo ""
else
    print_error "Deployment failed"
    exit 1
fi
