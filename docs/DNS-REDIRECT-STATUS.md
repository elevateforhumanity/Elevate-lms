# Domain Redirect Status

## .institute → .org Migration

**Status:** ACTION REQUIRED (DNS/Registrar level)

### Current State
- `elevateforhumanity.institute` is not resolving
- DNS needs to be configured at registrar level

### Required Actions
1. Access domain registrar for elevateforhumanity.institute
2. Either:
   - Point nameservers to a service that can handle 301 redirects, OR
   - Configure DNS to redirect all traffic to elevateforhumanity.org
3. Verify all paths redirect correctly:
   - `elevateforhumanity.institute/*` → `elevateforhumanity.org/*`
   - `www.elevateforhumanity.institute/*` → `www.elevateforhumanity.org/*`

### Why This Matters
- SEO: Consolidates link equity to .org domain
- Trust: Single canonical domain for government/employer credibility
- Prevents confusion for returning visitors

### Verification Checklist
- [ ] DNS configured at registrar
- [ ] 301 redirects working (not 302)
- [ ] All subpaths redirect correctly
- [ ] www and non-www both redirect
- [ ] SSL certificate valid during redirect

---
*Last updated: January 2025*
