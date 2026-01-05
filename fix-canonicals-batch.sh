#!/bin/bash

# Add canonical tags in batches of 100
# Batch 3: Next 100 public pages

echo "=== Adding Canonical Tags - Batch 3 (100 pages) ==="
echo ""

count=0
errors=0

# Function to add canonical
add_canonical() {
    local file="$1"
    local url="$2"
    
    # Check if file exists
    if [ ! -f "$file" ]; then
        return 1
    fi
    
    # Check if already has canonical
    if grep -q "canonical:" "$file"; then
        return 0
    fi
    
    # Check if has metadata export
    if ! grep -q "export const metadata" "$file"; then
        return 2
    fi
    
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

# Get URL from file path
get_url() {
    local file="$1"
    local url=$(echo "$file" | sed 's|^app||' | sed 's|/page\.tsx$||')
    if [ -z "$url" ]; then
        url="/"
    fi
    echo "https://www.elevateforhumanity.org${url}"
}

# Process files from batch list
while IFS= read -r file; do
    url=$(get_url "$file")
    add_canonical "$file" "$url"
    result=$?
    
    if [ $result -eq 1 ]; then
        echo "⚠️  File not found: $file"
        ((errors++))
    elif [ $result -eq 2 ]; then
        echo "⚠️  No metadata: $file"
        ((errors++))
    elif [ $result -eq 3 ]; then
        echo "⚠️  No closing brace: $file"
        ((errors++))
    fi
done < /tmp/batch3_files.txt

echo ""
echo "=== BATCH 3 SUMMARY ==="
echo "✅ Added: $count files"
echo "⚠️  Errors: $errors files"
echo ""

if [ $count -gt 0 ]; then
    echo "Next steps:"
    echo "1. Test build: pnpm run build"
    echo "2. Review changes: git diff --stat"
    echo "3. If successful: git add app/ && git commit && git push"
fi
