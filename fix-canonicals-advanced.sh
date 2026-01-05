#!/bin/bash

# Advanced script that adds metadata + canonical to pages without metadata

echo "=== Adding Canonical Tags - Advanced (handles pages without metadata) ==="
echo ""

count=0
errors=0
created_metadata=0

# Function to get URL from file path
get_url() {
    local file="$1"
    local url=$(echo "$file" | sed 's|^app||' | sed 's|/page\.tsx$||')
    if [ -z "$url" ]; then
        url="/"
    fi
    echo "https://www.elevateforhumanity.org${url}"
}

# Function to get page title from URL
get_title() {
    local url="$1"
    local path=$(echo "$url" | sed 's|https://www.elevateforhumanity.org||')
    
    if [ "$path" = "/" ]; then
        echo "Home"
    else
        # Convert /path/to/page to "Path To Page"
        echo "$path" | sed 's|/| |g' | sed 's/\b\(.\)/\u\1/g' | sed 's/^ //'
    fi
}

# Function to add metadata + canonical to pages without metadata
add_metadata_and_canonical() {
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
    if grep -q "export const metadata" "$file"; then
        # Has metadata, use old method
        return 2
    fi
    
    # No metadata - need to create it
    # Get title
    local title=$(get_title "$url")
    
    # Check if file has imports
    local has_metadata_import=$(grep -c "import.*Metadata.*from.*next" "$file")
    
    # Find the first line after imports (usually after "import" lines)
    local insert_line=$(grep -n "^import" "$file" | tail -1 | cut -d: -f1)
    
    if [ -z "$insert_line" ]; then
        # No imports, insert at line 1
        insert_line=0
    else
        # Insert after last import
        insert_line=$((insert_line + 1))
    fi
    
    # Add Metadata import if not present
    if [ "$has_metadata_import" -eq 0 ]; then
        sed -i "${insert_line}i\\import { Metadata } from 'next';" "$file"
        insert_line=$((insert_line + 1))
    fi
    
    # Add blank line
    sed -i "${insert_line}i\\" "$file"
    insert_line=$((insert_line + 1))
    
    # Add metadata export
    sed -i "${insert_line}i\\export const metadata: Metadata = {\\n  title: '${title} | Elevate for Humanity',\\n  alternates: {\\n    canonical: '${url}',\\n  },\\n};" "$file"
    
    echo "✅ $file (created metadata)"
    ((count++))
    ((created_metadata++))
    return 0
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
done | head -100 > /tmp/batch_advanced.txt

# Process files
while IFS= read -r file; do
    url=$(get_url "$file")
    
    # Try to add metadata + canonical
    add_metadata_and_canonical "$file" "$url"
    result=$?
    
    if [ $result -eq 0 ]; then
        continue
    elif [ $result -eq 2 ]; then
        # Has metadata, add canonical only
        add_canonical_only "$file" "$url"
        result=$?
        if [ $result -ne 0 ]; then
            echo "⚠️  Could not add canonical: $file"
            ((errors++))
        fi
    else
        echo "⚠️  Error: $file"
        ((errors++))
    fi
done < /tmp/batch_advanced.txt

echo ""
echo "=== ADVANCED BATCH SUMMARY ==="
echo "✅ Added canonical: $count files"
echo "📝 Created metadata: $created_metadata files"
echo "⚠️  Errors: $errors files"
echo ""

if [ $count -gt 0 ]; then
    echo "Next steps:"
    echo "1. Test build: pnpm run build"
    echo "2. Review changes: git diff app/ | head -100"
    echo "3. If successful: git add app/ && git commit && git push"
fi
