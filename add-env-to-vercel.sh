#!/bin/bash

# Add all environment variables to Vercel
# Run: ./add-env-to-vercel.sh

echo "Adding environment variables to Vercel..."

# Read .env.local and add each variable
while IFS='=' read -r key value; do
  # Skip empty lines and comments
  [[ -z "$key" || "$key" =~ ^#.*$ ]] && continue
  
  # Add to Vercel (production, preview, development)
  echo "Adding $key..."
  vercel env add "$key" production preview development <<< "$value"
done < .env.local

echo "✅ All environment variables added to Vercel"
