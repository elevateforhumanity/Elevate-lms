# Homepage Hero Images

## Required Images

Upload these 3 images to this directory:

### 1. Certificate of Completion
**Filename:** `certificate-of-completion.png`
**Usage:** Certificate template, completion pages, download center
**Description:** The certificate mockup design

### 2. Top Homepage Hero Banner
**Filename:** `hero-top-homepage-gradient.png`
**Usage:** TOP homepage hero banner
**Description:** Dark blue → red gradient with logo in the middle

### 3. Second Homepage Hero Banner
**Filename:** `hero-second-homepage-programs.png`
**Usage:** SECOND homepage hero banner / middle section
**Description:** White background, 4 boxes (Career & Technical Training, Hybrid Apprenticeships, etc.)

## How to Verify

Run this command from the project root:

```bash
./scripts/setup-homepage-images.sh
```

It will check if all 3 images are in place.

## How to Use in Code

Import the image paths:

```typescript
import { homepageHeroImages } from "@/app/_data/homepageHeroImages";

// Use in your components:
<Image src={homepageHeroImages.topHeroBanner} alt="..." />
```
