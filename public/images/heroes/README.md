# Hero Image Asset Convention

## Naming Pattern

```
{category}-{subcategory}.jpg
```

All hero images use kebab-case, `.jpg` format, and follow category ownership.

---

## Category Structure

### 1. Programs - Healthcare (`program-healthcare-*`)
```
program-healthcare-cna.jpg
program-healthcare-medical-assistant.jpg
program-healthcare-phlebotomy.jpg
program-healthcare-cpr-first-aid.jpg
program-healthcare-drug-collector.jpg
program-healthcare-dsp.jpg
```

### 2. Programs - Trades (`program-trades-*`)
```
program-trades-hvac.jpg
program-trades-cdl.jpg
program-trades-welding.jpg
program-trades-electrical.jpg
program-trades-plumbing.jpg
program-trades-diesel.jpg
```

### 3. Programs - Apprenticeship (`program-apprenticeship-*`)
```
program-apprenticeship-barber.jpg
program-apprenticeship-cosmetology.jpg
program-apprenticeship-esthetician.jpg
program-apprenticeship-nail-tech.jpg
```

### 4. Programs - Technology (`program-technology-*`)
```
program-technology-it-support.jpg
program-technology-cybersecurity.jpg
program-technology-web-dev.jpg
```

### 5. Programs - Business (`program-business-*`)
```
program-business-tax-prep.jpg
program-business-entrepreneurship.jpg
program-business-admin.jpg
```

### 6. Marketing (`marketing-*`)
```
marketing-homepage.jpg
marketing-programs-index.jpg
marketing-about.jpg
marketing-careers.jpg
marketing-contact.jpg
marketing-testimonials.jpg
```

### 7. Enterprise (`enterprise-*`)
```
enterprise-licensing.jpg
enterprise-white-label.jpg
enterprise-partners.jpg
enterprise-government.jpg
```

### 8. LMS/Portal (`lms-*`)
```
lms-student-portal.jpg
lms-dashboard.jpg
lms-courses.jpg
lms-progress.jpg
```

### 9. Governance (`governance-*`)
```
governance-privacy.jpg
governance-terms.jpg
governance-ferpa.jpg
governance-accessibility.jpg
governance-compliance.jpg
```

---

## Rules

1. **No duplicates across categories** - Each program gets its own image
2. **Same category = same visual family** - Consistent style, different subjects
3. **No generic stock** - Real environments or real diagrams only
4. **No gradients in images** - Clean, well-lit photography
5. **Aspect ratio** - 16:9 or 3:2 preferred for split heroes
6. **Resolution** - Minimum 1920px wide, optimized for web

---

## Migration Map (Legacy → New)

| Legacy Name | New Name |
|-------------|----------|
| `hero-homepage.jpg` | `marketing-homepage.jpg` |
| `programs.jpg` | `marketing-programs-index.jpg` |
| `about-mission.jpg` | `marketing-about.jpg` |
| `contact.jpg` | `marketing-contact.jpg` |
| `student-dashboard.jpg` | `lms-dashboard.jpg` |
| `lms-courses.jpg` | `lms-courses.jpg` (keep) |

---

## Adding New Images

1. Determine category from the page type
2. Use the naming pattern: `{category}-{subcategory}.jpg`
3. Place in `/public/images/heroes/`
4. Update `lib/hero-config.ts` with the new path
5. No subdirectories - flat structure for simplicity

---

## Audit Checklist

Before shipping a new hero image:

- [ ] Follows naming convention
- [ ] No gradient/overlay baked into image
- [ ] Not reused from another category
- [ ] Minimum 1920px wide
- [ ] Optimized file size (< 500KB)
- [ ] Added to `lib/hero-config.ts`
