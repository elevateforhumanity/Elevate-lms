#!/bin/bash
# Create SVG placeholder images for programs

programs=("hvac-hero" "barber-hero" "cna-hero" "building-tech-hero" "cdl-hero" "career-readiness-hero")
colors=("#EA580C" "#8B5CF6" "#10B981" "#F59E0B" "#3B82F6" "#EC4899")
titles=("HVAC Training" "Barber Apprenticeship" "CNA Training" "Building Tech" "CDL Training" "Career Readiness")

for i in "${!programs[@]}"; do
  cat > "${programs[$i]}.svg" <<SVG
<svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="800" fill="${colors[$i]}"/>
  <text x="600" y="400" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">
    ${titles[$i]}
  </text>
  <text x="600" y="460" font-family="Arial, sans-serif" font-size="24" fill="rgba(255,255,255,0.8)" text-anchor="middle" dominant-baseline="middle">
    Elevate for Humanity
  </text>
</svg>
SVG
done

echo "✅ Created ${#programs[@]} placeholder images"
