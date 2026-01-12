#!/bin/bash

# Create placeholder images using ImageMagick
# This creates temporary images so the site doesn't show broken images

echo "🎨 Creating placeholder images..."
echo ""

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick not installed. Installing..."
    sudo apt-get update && sudo apt-get install -y imagemagick
fi

# Create directories
mkdir -p public/images/supersonic-fast-cash
mkdir -p public/images/career-services
mkdir -p public/images/programs

# Function to create placeholder
create_placeholder() {
    local output="$1"
    local text="$2"
    local width="$3"
    local height="$4"
    local color="$5"
    
    convert -size ${width}x${height} \
        xc:"$color" \
        -gravity center \
        -pointsize 48 \
        -fill white \
        -font Arial-Bold \
        -annotate +0+0 "$text" \
        "$output"
    
    echo "✅ Created: $output"
}

# Create placeholders
echo "Creating placeholders..."
echo ""

create_placeholder \
    "public/images/supersonic-fast-cash/hero-banner.jpg" \
    "Supersonic Fast Cash\nHero Banner\n1200x800" \
    1200 800 \
    "#FF6B35"

create_placeholder \
    "public/images/supersonic-fast-cash/cta-instant-cash.jpg" \
    "Instant Cash\nUp to \$6,000\n1920x1080" \
    1920 1080 \
    "#FF6B35"

create_placeholder \
    "public/images/supersonic-fast-cash/subpage-hero.jpg" \
    "Supersonic Fast Cash\nSubpage Hero\n1920x1080" \
    1920 1080 \
    "#1E40AF"

create_placeholder \
    "public/images/career-services/hero-banner.jpg" \
    "Career Services\nHero Banner\n1920x1080" \
    1920 1080 \
    "#7C3AED"

create_placeholder \
    "public/images/programs/skilled-trades-hero.jpg" \
    "Skilled Trades\nHero Banner\n1920x1080" \
    1920 1080 \
    "#EA580C"

echo ""
echo "✅ All placeholder images created!"
echo ""
echo "📝 Note: These are temporary placeholders."
echo "   Replace with actual images from Artlist when available."
