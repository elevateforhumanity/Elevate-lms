#!/bin/bash

# Add canonical tags to key pages
# Safe, tested, and reliable

echo "=== Adding Canonical Tags to Key Pages ==="
echo ""

count=0

# Function to add canonical
add_canonical() {
    local file="$1"
    local url="$2"
    
    # Check if file exists
    if [ ! -f "$file" ]; then
        echo "⚠️  File not found: $file"
        return 1
    fi
    
    # Check if already has canonical
    if grep -q "canonical:" "$file"; then
        echo "⏭️  $file (already has canonical)"
        return 0
    fi
    
    # Check if has metadata export
    if ! grep -q "export const metadata" "$file"; then
        echo "⚠️  $file (no metadata export)"
        return 1
    fi
    
    # Find the closing }; line
    local closing_line=$(grep -n "^};" "$file" | head -1 | cut -d: -f1)
    
    if [ -z "$closing_line" ]; then
        echo "⚠️  $file (couldn't find closing brace)"
        return 1
    fi
    
    # Get the line before closing
    local prev_line=$((closing_line - 1))
    local prev_content=$(sed -n "${prev_line}p" "$file")
    
    # Add comma to previous line if missing
    if [[ ! "$prev_content" =~ ,$ ]]; then
        sed -i "${prev_line}s/$/,/" "$file"
    fi
    
    # Insert alternates before closing brace
    sed -i "${closing_line}i\\  alternates: {\\n    canonical: '${url}',\\n  }," "$file"
    
    echo "✅ $file"
    echo "   → $url"
    ((count++))
    return 0
}

# Add canonical tags to key pages
add_canonical "app/about/page.tsx" "https://www.elevateforhumanity.org/about"
add_canonical "app/apply/page.tsx" "https://www.elevateforhumanity.org/apply"
add_canonical "app/programs/page.tsx" "https://www.elevateforhumanity.org/programs"
add_canonical "app/founder/page.tsx" "https://www.elevateforhumanity.org/founder"
add_canonical "app/training/certifications/page.tsx" "https://www.elevateforhumanity.org/training/certifications"
add_canonical "app/workforce-board/page.tsx" "https://www.elevateforhumanity.org/workforce-board"
add_canonical "app/career-services/page.tsx" "https://www.elevateforhumanity.org/career-services"
add_canonical "app/downloads/page.tsx" "https://www.elevateforhumanity.org/downloads"
add_canonical "app/student-handbook/page.tsx" "https://www.elevateforhumanity.org/student-handbook"
add_canonical "app/compliance/page.tsx" "https://www.elevateforhumanity.org/compliance"

echo ""
echo "=== SUMMARY ==="
echo "✅ Added: $count files"
echo ""

if [ $count -gt 0 ]; then
    echo "Next steps:"
    echo "1. Test build: pnpm run build"
    echo "2. If successful, commit and push"
fi
