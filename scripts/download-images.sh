#!/bin/bash

# Download Artlist Images - Aggressive Approach
# This script attempts multiple methods to bypass Cloudflare

set -e

echo "🖼️  Artlist Image Downloader"
echo ""

# Create directories
mkdir -p public/images/supersonic-fast-cash
mkdir -p public/images/career-services
mkdir -p public/images/programs

# Function to download with multiple fallbacks
download_image() {
    local name="$1"
    local url="$2"
    local output="$3"
    
    echo "📥 Downloading: $name"
    echo "   URL: $url"
    echo "   Output: $output"
    
    # Method 1: Try with curl and realistic headers
    if curl -L \
        -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \
        -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8" \
        -H "Accept-Language: en-US,en;q=0.9" \
        -H "Accept-Encoding: gzip, deflate, br" \
        -H "Connection: keep-alive" \
        -H "Upgrade-Insecure-Requests: 1" \
        -H "Sec-Fetch-Dest: document" \
        -H "Sec-Fetch-Mode: navigate" \
        -H "Sec-Fetch-Site: none" \
        -H "Cache-Control: max-age=0" \
        --compressed \
        -o "$output" \
        "$url" 2>/dev/null; then
        
        # Check if we got HTML (Cloudflare challenge) or actual image
        if file "$output" | grep -q "HTML"; then
            echo "   ⚠️  Got Cloudflare challenge page, trying alternative..."
            rm -f "$output"
            
            # Method 2: Try wget with different approach
            if wget \
                --user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" \
                --header="Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8" \
                --header="Accept-Language: en-US,en;q=0.9" \
                --no-check-certificate \
                -O "$output" \
                "$url" 2>/dev/null; then
                
                if file "$output" | grep -q "HTML"; then
                    echo "   ❌ Still getting Cloudflare challenge"
                    rm -f "$output"
                    return 1
                else
                    echo "   ✅ Success with wget!"
                    return 0
                fi
            else
                echo "   ❌ wget failed"
                return 1
            fi
        else
            echo "   ✅ Success with curl!"
            return 0
        fi
    else
        echo "   ❌ curl failed"
        return 1
    fi
}

# Download each image
echo ""
echo "Starting downloads..."
echo ""

# Image 1: Supersonic Fast Cash - Hero Banner
download_image \
    "Supersonic Fast Cash - Hero Banner" \
    "https://artlist.io/text-to-image-ai/creations/ae1fd783-34c7-4468-81a3-aba4e1e87813" \
    "public/images/supersonic-fast-cash/hero-banner.jpg" || echo "   ⚠️  Manual download required"

echo ""

# Image 2: Supersonic Fast Cash - CTA Instant Cash
download_image \
    "Supersonic Fast Cash - CTA Instant Cash" \
    "https://artlist.io/text-to-image-ai/creations/a6fb219d-6fb7-401d-9da9-d40a6819f204" \
    "public/images/supersonic-fast-cash/cta-instant-cash.jpg" || echo "   ⚠️  Manual download required"

echo ""

# Image 3: Supersonic Fast Cash - Subpage Hero
download_image \
    "Supersonic Fast Cash - Subpage Hero" \
    "https://artlist.io/text-to-image-ai/creations/a34be5f8-316c-47ed-925d-c65e14bcba67" \
    "public/images/supersonic-fast-cash/subpage-hero.jpg" || echo "   ⚠️  Manual download required"

echo ""

# Image 4: Career Services - Hero Banner (same URL as #3)
if [ -f "public/images/supersonic-fast-cash/subpage-hero.jpg" ]; then
    echo "📥 Copying: Career Services - Hero Banner"
    cp "public/images/supersonic-fast-cash/subpage-hero.jpg" "public/images/career-services/hero-banner.jpg"
    echo "   ✅ Copied from subpage-hero.jpg"
else
    download_image \
        "Career Services - Hero Banner" \
        "https://artlist.io/text-to-image-ai/creations/a34be5f8-316c-47ed-925d-c65e14bcba67" \
        "public/images/career-services/hero-banner.jpg" || echo "   ⚠️  Manual download required"
fi

echo ""

# Image 5: Skilled Trades - Hero Banner
download_image \
    "Skilled Trades - Hero Banner" \
    "https://artlist.io/text-to-image-ai/creations/5573d3b3-65e3-4dc5-9735-9955ae90e593" \
    "public/images/programs/skilled-trades-hero.jpg" || echo "   ⚠️  Manual download required"

echo ""
echo "📊 Download Summary:"
echo ""

# Check which files were successfully downloaded
success=0
failed=0

for file in \
    "public/images/supersonic-fast-cash/hero-banner.jpg" \
    "public/images/supersonic-fast-cash/cta-instant-cash.jpg" \
    "public/images/supersonic-fast-cash/subpage-hero.jpg" \
    "public/images/career-services/hero-banner.jpg" \
    "public/images/programs/skilled-trades-hero.jpg"; do
    
    if [ -f "$file" ] && [ -s "$file" ]; then
        size=$(du -h "$file" | cut -f1)
        echo "   ✅ $file ($size)"
        ((success++))
    else
        echo "   ❌ $file (missing or empty)"
        ((failed++))
    fi
done

echo ""
echo "Results: $success succeeded, $failed failed"
echo ""

if [ $failed -gt 0 ]; then
    echo "⚠️  Some downloads failed due to Cloudflare protection."
    echo ""
    echo "Alternative methods:"
    echo "1. Run: node scripts/download-artlist-puppeteer.js (requires: npm install puppeteer)"
    echo "2. Manually download from browser and place in directories"
    echo "3. Use browser extension to bypass Cloudflare"
    echo ""
    echo "See IMAGES_TO_DOWNLOAD.md for detailed instructions"
fi
