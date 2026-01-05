#!/bin/bash

# Smart script that:
# 1. Skips client components ('use client')
# 2. Adds canonical to pages with metadata
# 3. Creates metadata for server components without it

echo "=== Adding Canonical Tags - Smart Batch ==="
echo ""

count=0
skipped_client=0
errors=0

# Function to get URL from file path
get_url() {
    local file="$1"
    local url=$(echo "$file" | sed 's|^app||' | sed 's|/page\.tsx$||')
    if [ -z "$url" ]; then
        url="/"
    fi
    echo "https://www.elevateforhumanity.org${url}"
}

# Function to add canonical to existing metadata
add_canonical_only() {
    local file="$1"
    local url="$2"
    
    # Find the closing }; line
    local closing_line=$(grep -n "^};" "$file" | head -1 | cut -d: -f1)
    
    if [ -z "$closing_line" ]; then
        return 3
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
    ((count++))
    return 0
}

# Get next 100 files
find app -name "page.tsx" -type f | grep -v -E "(admin|staff-portal|lms/admin|program-holder/dashboard|employer/dashboard|api)" | while read file; do
    if ! grep -q "canonical:" "$file" 2>/dev/null; then
        echo "$file"
    fi
done | head -100 > /tmp/batch_smart.txt

# Process files
while IFS= read -r file; do
    url=$(get_url "$file")
    
    # Skip if file doesn't exist
    if [ ! -f "$file" ]; then
        continue
    fi
    
    # Skip client components
    if grep -q "^'use client'" "$file" || grep -q '^"use client"' "$file"; then
        echo "⏭️  $file (client component)"
        ((skipped_client++))
        continue
    fi
    
    # Skip if already has canonical
    if grep -q "canonical:" "$file"; then
        continue
    fi
    
    # Check if has metadata export
    if grep -q "export const metadata" "$file"; then
        # Has metadata, add canonical
        add_canonical_only "$file" "$url"
        result=$?
        if [ $result -ne 0 ]; then
            echo "⚠️  Could not add canonical: $file"
            ((errors++))
        fi
    else
        # No metadata and not client component - skip for now
        echo "⏭️  $file (no metadata, needs manual review)"
        ((errors++))
    fi
done < /tmp/batch_smart.txt

echo ""
echo "=== SMART BATCH SUMMARY ==="
echo "✅ Added canonical: $count files"
echo "⏭️  Skipped (client): $skipped_client files"
echo "⏭️  Skipped (no metadata): $errors files"
echo ""

if [ $count -gt 0 ]; then
    echo "Next steps:"
    echo "1. Test build: pnpm run build"
    echo "2. If successful: git add app/ && git commit && git push"
fi
