#!/bin/bash

# Add metadata + canonical to 54 server components without metadata

echo "=== Adding Metadata + Canonical to 54 Pages ===" 
echo ""

count=0
errors=0

# Function to get URL and title
get_url() {
    local file="$1"
    local url=$(echo "$file" | sed 's|^app||' | sed 's|/page\.tsx$||')
    if [ -z "$url" ]; then
        url="/"
    fi
    echo "https://www.elevateforhumanity.org${url}"
}

get_title() {
    local url="$1"
    local path=$(echo "$url" | sed 's|https://www.elevateforhumanity.org||')
    
    if [ "$path" = "/" ]; then
        echo "Home"
    else
        # Convert /path/to/page to "Path To Page"
        echo "$path" | sed 's|/| |g' | sed 's/\b\(.\)/\u\1/g' | sed 's/^ //' | sed 's/\[.*\]/Dynamic/'
    fi
}

# Process each file
while IFS= read -r file; do
    if [ ! -f "$file" ]; then
        continue
    fi
    
    url=$(get_url "$file")
    title=$(get_title "$url")
    
    # Check if file has any imports
    if ! grep -q "^import" "$file"; then
        # No imports, add at top
        sed -i "1i\\import { Metadata } from 'next';\n\nexport const metadata: Metadata = {\n  title: '${title} | Elevate for Humanity',\n  alternates: {\n    canonical: '${url}',\n  },\n};\n" "$file"
    else
        # Has imports, add after last import
        last_import_line=$(grep -n "^import" "$file" | tail -1 | cut -d: -f1)
        
        # Check if Metadata is already imported
        if ! grep -q "import.*Metadata.*from.*next" "$file"; then
            # Add Metadata import
            sed -i "${last_import_line}a\\import { Metadata } from 'next';" "$file"
            last_import_line=$((last_import_line + 1))
        fi
        
        # Add metadata export after imports
        sed -i "${last_import_line}a\\\nexport const metadata: Metadata = {\n  title: '${title} | Elevate for Humanity',\n  alternates: {\n    canonical: '${url}',\n  },\n};" "$file"
    fi
    
    echo "✅ $file"
    ((count++))
    
done < /tmp/need_metadata.txt

echo ""
echo "=== SUMMARY ==="
echo "✅ Added metadata + canonical: $count files"
echo "⚠️  Errors: $errors files"
echo ""

if [ $count -gt 0 ]; then
    echo "Next: pnpm run build"
fi
