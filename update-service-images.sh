#!/bin/bash
# Update all service pages with Vecteezy business photos

cd /workspaces/Elevate-lms

# Vecteezy business photo URLs
BUSINESS_TEAM="https://static.vecteezy.com/system/resources/previews/007/108/099/non_2x/business-people-unity-concept-free-photo.jpg"
BUSINESS_MEETING="https://static.vecteezy.com/system/resources/previews/028/287/555/non_2x/an-indian-young-female-employee-working-with-clients-in-office-business-working-concept-free-photo.jpg"
BUSINESS_HANDSHAKE="https://static.vecteezy.com/system/resources/previews/032/006/156/non_2x/business-people-shaking-hands-together-free-photo.jpg"
BUSINESS_OFFICE="https://static.vecteezy.com/system/resources/previews/026/829/465/non_2x/business-professional-discussing-ideas-in-office-meeting-room-free-photo.jpg"
BUSINESS_SUCCESS="https://static.vecteezy.com/system/resources/previews/023/514/434/non_2x/business-people-working-together-on-project-and-brainstorming-in-office-free-photo.jpg"

# Replace generic image paths with Vecteezy URLs
find app/services app/career-services app/supersonic-fast-cash app/tax -name "*.tsx" -type f -exec sed -i \
  -e "s|/images/heroes/hero-homepage\.jpg|$BUSINESS_TEAM|g" \
  -e "s|/images/homepage/.*\.png|$BUSINESS_MEETING|g" \
  -e "s|/media/hero.*\.jpg|$BUSINESS_OFFICE|g" \
  {} \;

echo "✅ Updated service page images with Vecteezy business photos"
