#!/bin/bash

# Fix the 55 server components that have metadata but no canonical

echo "=== Fixing 55 Server Components with Metadata ==="
echo ""

count=0
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
add_canonical() {
    local file="$1"
    local url="$2"
    
    # Find the closing }; line
    local closing_line=$(grep -n "^};" "$file" | head -1 | cut -d: -f1)
    
    if [ -z "$closing_line" ]; then
        echo "⚠️  No closing brace: $file"
        ((errors++))
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
    ((count++))
    return 0
}

# Process all 55 files
while IFS= read -r file; do
    url=$(get_url "$file")
    add_canonical "$file" "$url"
done < /tmp/easy_fixes.txt

echo ""
echo "=== SUMMARY ===" 
echo "✅ Added: $count files"
echo "⚠️  Errors: $errors files"
echo ""

if [ $count -gt 0 ]; then
    echo "Next: pnpm run build"
fi
