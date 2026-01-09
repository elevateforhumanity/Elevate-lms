#!/bin/bash
set -e

cd /workspaces/Elevate-lms

# Vecteezy URLs
TEAM="https://static.vecteezy.com/system/resources/previews/007/108/099/non_2x/business-people-unity-concept-free-photo.jpg"
MEETING="https://static.vecteezy.com/system/resources/previews/028/287/555/non_2x/an-indian-young-female-employee-working-with-clients-in-office-business-working-concept-free-photo.jpg"
HANDSHAKE="https://static.vecteezy.com/system/resources/previews/032/006/156/non_2x/business-people-shaking-hands-together-free-photo.jpg"
OFFICE="https://static.vecteezy.com/system/resources/previews/026/829/465/non_2x/business-professional-discussing-ideas-in-office-meeting-room-free-photo.jpg"
SUCCESS="https://static.vecteezy.com/system/resources/previews/023/514/434/non_2x/business-people-working-together-on-project-and-brainstorming-in-office-free-photo.jpg"
WOMAN="https://static.vecteezy.com/system/resources/previews/028/287/384/non_2x/ai-generated-a-professional-business-woman-manager-or-secretary-in-the-office-business-concept-photo.jpg"
COLLAB="https://static.vecteezy.com/system/resources/previews/029/870/595/non_2x/business-people-working-together-on-a-project-free-photo.jpg"
DISCUSS="https://static.vecteezy.com/system/resources/previews/026/494/514/non_2x/business-people-discussing-ideas-at-meeting-free-photo.jpg"

# Replace ALL image references in service pages
find app/services app/career-services app/supersonic-fast-cash app/tax -name "*.tsx" -type f -exec sed -i \
  -e "s|/images/heroes/hero-homepage\.jpg|$TEAM|g" \
  -e "s|/images/homepage/og-image\.png|$MEETING|g" \
  -e "s|/media/hero[^\"']*|$OFFICE|g" \
  -e "s|poster=\"[^\"]*\"|poster=\"$TEAM\"|g" \
  {} \;

echo "✅ Mass image replacement complete"
