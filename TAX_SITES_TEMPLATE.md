# Tax Sites Template - Supersonic Fast Cash & VITA

**Date:** January 4, 2026  
**Requirement:** Both sites should use same template design  
**Status:** 🔄 IN PROGRESS

---

## Template Structure (From Old Repo)

### Common Elements:

1. **UniversalNav Component**
   - Custom navigation for each site
   - Logo and branding
   - CTA button
   - Responsive menu

2. **Top Contact Bar**
   - Phone number
   - Email
   - Location
   - Dark background

3. **Hero Section**
   - Picture hero (not video for performance)
   - Gradient overlay
   - Clear headline
   - Dual CTAs

4. **Services Grid**
   - 4 service cards
   - Icons
   - Descriptions
   - "Learn More" links

5. **Why Choose Us Section**
   - 4 benefit points
   - Icons
   - Descriptions
   - Stats sidebar

6. **CTA Section**
   - Call to action
   - Contact information
   - Appointment booking

---

## Supersonic Fast Cash Pages

### ✅ Existing Pages:
1. `/supersonic-fast-cash` - Main landing
2. `/supersonic-fast-cash/book-appointment` - Booking
3. `/supersonic-fast-cash/calculator` - Tax calculator
4. `/supersonic-fast-cash/how-it-works` - Process
5. `/supersonic-fast-cash/pricing` - Pricing
6. `/supersonic-fast-cash/services` - Services overview
7. `/supersonic-fast-cash/locations` - Office locations
8. `/supersonic-fast-cash/tax-tools` - Tools
9. `/supersonic-fast-cash/careers` - Job openings
10. `/supersonic-fast-cash/portal` - Client portal
11. `/supersonic-fast-cash/upload-documents` - Document upload
12. `/supersonic-fast-cash/diy-taxes` - DIY option
13. `/supersonic-fast-cash/tax-information` - Tax info
14. `/supersonic-fast-cash/sub-office-agreement` - Franchise

### 🔄 Need Template Update:
- Main page needs full template from old repo
- All subpages need UniversalNav
- Consistent branding throughout

---

## VITA (Rise Up Foundation) Pages

### ✅ Existing Pages:
1. `/tax/rise-up-foundation` - Main landing
2. `/tax/rise-up-foundation/free-tax-help` - Services
3. `/tax/rise-up-foundation/volunteer` - Volunteer info
4. `/tax/rise-up-foundation/training` - Training
5. `/tax/rise-up-foundation/site-locator` - Locations
6. `/tax/rise-up-foundation/faq` - FAQ
7. `/tax/rise-up-foundation/documents` - Required docs

### 🔄 Need Template Update:
- Apply same template as Supersonic Fast Cash
- Change branding colors (green instead of orange)
- Same structure, different content
- UniversalNav for all pages

---

## Template Differences

### Supersonic Fast Cash (Commercial):
- **Colors:** Orange (#F97316)
- **Tone:** Professional, fast, efficient
- **Services:** Paid tax preparation
- **CTA:** "Book Appointment"
- **Focus:** Speed and refunds

### VITA (Free Service):
- **Colors:** Green (#16A34A)
- **Tone:** Community, helpful, accessible
- **Services:** Free tax help
- **CTA:** "Get Free Help"
- **Focus:** Eligibility and volunteering

---

## UniversalNav Configuration

### Supersonic Fast Cash:
```tsx
<UniversalNav
  links={[
    { label: 'Home', href: '/supersonic-fast-cash' },
    { label: 'Services', href: '/supersonic-fast-cash/services' },
    { label: 'Pricing', href: '/supersonic-fast-cash/pricing' },
    { label: 'How It Works', href: '/supersonic-fast-cash/how-it-works' },
    { label: 'Locations', href: '/supersonic-fast-cash/locations' },
    { label: 'Tax Tools', href: '/supersonic-fast-cash/tax-tools' },
    { label: 'Careers', href: '/supersonic-fast-cash/careers' },
  ]}
  ctaText="Book Appointment"
  ctaHref="/supersonic-fast-cash/book-appointment"
  bgColor="bg-orange-600"
  textColor="text-white"
  logo="Supersonic Fast Cash"
  logoHref="/supersonic-fast-cash"
/>
```

### VITA:
```tsx
<UniversalNav
  links={[
    { label: 'Home', href: '/tax/rise-up-foundation' },
    { label: 'Free Tax Help', href: '/tax/rise-up-foundation/free-tax-help' },
    { label: 'Volunteer', href: '/tax/rise-up-foundation/volunteer' },
    { label: 'Training', href: '/tax/rise-up-foundation/training' },
    { label: 'Locations', href: '/tax/rise-up-foundation/site-locator' },
    { label: 'FAQ', href: '/tax/rise-up-foundation/faq' },
  ]}
  ctaText="Get Free Help"
  ctaHref="/tax/rise-up-foundation/free-tax-help"
  bgColor="bg-green-600"
  textColor="text-white"
  logo="Rise Up Foundation"
  logoHref="/tax/rise-up-foundation"
/>
```

---

## Action Plan

### Phase 1: Update Supersonic Fast Cash Main Page
- [ ] Copy full template from old repo
- [ ] Update hero to picture (not video)
- [ ] Add UniversalNav
- [ ] Add top contact bar
- [ ] Add services grid
- [ ] Add why choose us section
- [ ] Add stats
- [ ] Add CTA section

### Phase 2: Apply Template to VITA
- [ ] Use same structure as Supersonic
- [ ] Change colors to green
- [ ] Update content for free services
- [ ] Update navigation links
- [ ] Update CTAs
- [ ] Add volunteer focus

### Phase 3: Update All Subpages
- [ ] Add UniversalNav to all Supersonic pages
- [ ] Add UniversalNav to all VITA pages
- [ ] Ensure consistent branding
- [ ] Test all navigation links

---

## Key Design Elements

### Services Grid:
```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
  {/* Service Card */}
  <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition text-center">
    <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
      <Icon className="w-10 h-10 text-brand-blue-600" />
    </div>
    <h3 className="text-2xl font-bold text-slate-900 mb-3">
      Service Name
    </h3>
    <p className="text-slate-600 leading-relaxed mb-4">
      Description
    </p>
    <Link href="/link" className="text-brand-blue-600 font-semibold hover:underline">
      Learn More →
    </Link>
  </div>
</div>
```

### Why Choose Us:
```tsx
<div className="flex items-start gap-4">
  <div className="w-12 h-12 bg-brand-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
    <Icon className="w-6 h-6 text-brand-blue-600" />
  </div>
  <div>
    <h3 className="text-xl font-bold text-slate-900 mb-2">
      Benefit Title
    </h3>
    <p className="text-slate-600 leading-relaxed">
      Description
    </p>
  </div>
</div>
```

### Stats Sidebar:
```tsx
<div className="bg-slate-900 rounded-3xl p-12 text-white">
  <h3 className="text-3xl font-bold mb-8">Quick Facts</h3>
  <div className="space-y-6">
    <div className="border-b border-white/10 pb-6">
      <div className="text-slate-400 text-sm mb-2">Label</div>
      <div className="text-4xl font-bold">Value</div>
    </div>
  </div>
</div>
```

---

## Files to Update

### Supersonic Fast Cash:
1. `app/supersonic-fast-cash/page.tsx` - Main landing
2. All subpages - Add UniversalNav

### VITA:
1. `app/tax/rise-up-foundation/page.tsx` - Main landing
2. All subpages - Add UniversalNav

### Components:
- `components/UniversalNav.tsx` - Verify exists and works

---

## Next Steps

1. Copy complete template from old repo
2. Apply to Supersonic Fast Cash main page
3. Apply same template to VITA (green colors)
4. Add UniversalNav to all subpages
5. Test all navigation
6. Verify branding consistency

**Status:** Ready to implement
