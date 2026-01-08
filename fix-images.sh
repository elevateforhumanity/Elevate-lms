#!/bin/bash
# Replace all generic PNG images with real photos

cd /workspaces/Elevate-lms

# Find and replace image references
find app components -name "*.tsx" -type f -exec sed -i \
  -e "s|/images/homepage/reentry-career-coaching\.png|/images/artlist/cropped/hero-training-2-wide.jpg|g" \
  -e "s|/images/homepage/employer-partnerships\.png|/images/artlist/cropped/hero-training-4-wide.jpg|g" \
  -e "s|/images/general/workforce-development\.png|/media/programs/workforce-readiness-hero.jpg|g" \
  -e "s|/images/hero-banner-new\.png|/images/artlist/cropped/hero-training-1-wide.jpg|g" \
  -e "s|/images/hero-banner\.png|/images/artlist/cropped/hero-training-1-wide.jpg|g" \
  -e "s|/images/platform/platform-screenshot-1\.png|/images/artlist/cropped/hero-training-5-wide.jpg|g" \
  {} \;

echo "✅ Replaced all generic PNG images with real photos"
