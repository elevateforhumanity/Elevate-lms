# Elevate for Humanity Course Covers

This directory contains professional course cover images for all Elevate training programs.

## Structure

Each course has its own subdirectory:

- `barber-apprenticeship/` - Barber & Cosmetology Training
- `cna-training/` - Certified Nursing Assistant Program
- `hvac-tech/` - HVAC Technician Certification
- `building-tech/` - Building Maintenance Technology
- `life-coach/` - Life Coach Certification
- `peer-recovery/` - Peer Recovery Specialist
- `tax-prep/` - Tax Preparation Professional
- `medical-assistant/` - Medical Assistant Training
- `truck-driving/` - Commercial Truck Driving (CDL)
- `workforce-readiness/` - Workforce Readiness & Soft Skills

## Image Specifications

- **Format**: JPG or PNG
- **Dimensions**: 1200x800px (3:2 aspect ratio)
- **File naming**: `cover.jpg` or `cover.png`
- **Style**: Professional, non-cartoon, multimedia collage
- **Brand colors**: Red (#dc2626), Orange (#f97316), Blue (#2563eb), White

## Usage in Code

```jsx
import Image from 'next/image';

<Image
  src="/course-covers/barber-apprenticeship/cover.jpg"
  alt="Barber Apprenticeship Program"
  width={1200}
  height={800}
  className="rounded-xl shadow-lg"
/>;
```

## Adding New Covers

1. Create a new folder with the course slug
2. Add `cover.jpg` (1200x800px)
3. Commit and push to GitHub
4. Netlify will automatically deploy
