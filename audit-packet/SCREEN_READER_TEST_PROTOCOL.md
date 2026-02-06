# Screen Reader Test Protocol

**Purpose:** Manual verification of screen reader compatibility  
**Status:** PROTOCOL DEFINED (Execution Required)  
**Estimated Time:** 45-60 minutes

---

## Test Environment Requirements

| Tool | Platform | Download |
|------|----------|----------|
| NVDA | Windows | https://www.nvaccess.org/download/ |
| VoiceOver | macOS/iOS | Built-in (Cmd+F5) |
| JAWS | Windows | https://www.freedomscientific.com/ |

**Minimum:** Test with at least one screen reader (NVDA recommended for free option)

---

## Test Checklist

### 1. Homepage Navigation

| Test | Expected | Pass/Fail |
|------|----------|-----------|
| Page title announced | "Elevate for Humanity" or similar | [ ] |
| Skip link announced first | "Skip to main content" | [ ] |
| Skip link works | Focus moves to main content | [ ] |
| Main navigation announced | "Navigation" landmark | [ ] |
| Headings navigable (H key) | H1 → H2 → H3 in order | [ ] |

### 2. Program Browsing

| Test | Expected | Pass/Fail |
|------|----------|-----------|
| Program cards announced | Title, description readable | [ ] |
| Links have context | "Learn more about [program]" | [ ] |
| Images have alt text | Descriptive or decorative | [ ] |
| Category filters announced | Button role, state | [ ] |

### 3. Application Form (/inquiry)

| Test | Expected | Pass/Fail |
|------|----------|-----------|
| Form landmark announced | "Form" or form name | [ ] |
| Labels read with inputs | "First name, edit text" | [ ] |
| Required fields indicated | "Required" announced | [ ] |
| Error messages announced | Live region or focus | [ ] |
| Submit button accessible | "Submit application, button" | [ ] |

### 4. Authentication (/login)

| Test | Expected | Pass/Fail |
|------|----------|-----------|
| Email field labeled | "Email, edit text" | [ ] |
| Password field labeled | "Password, edit text, protected" | [ ] |
| Error on invalid login | Error announced | [ ] |
| Success redirects | New page title announced | [ ] |

### 5. Mobile Menu (375px viewport)

| Test | Expected | Pass/Fail |
|------|----------|-----------|
| Menu button announced | "Menu, button" or "Open menu" | [ ] |
| Menu state announced | "Expanded/collapsed" | [ ] |
| Menu items focusable | Tab through all items | [ ] |
| Escape closes menu | Focus returns to button | [ ] |

---

## NVDA Quick Commands

| Action | Key |
|--------|-----|
| Start reading | Insert + Down Arrow |
| Stop reading | Ctrl |
| Next heading | H |
| Next link | K |
| Next form field | F |
| Next button | B |
| List all headings | Insert + F7 |
| List all links | Insert + F7, then Alt+L |

---

## VoiceOver Quick Commands

| Action | Key |
|--------|-----|
| Start VoiceOver | Cmd + F5 |
| Next item | VO + Right Arrow |
| Previous item | VO + Left Arrow |
| Activate | VO + Space |
| Rotor (headings, links) | VO + U |
| Read all | VO + A |

---

## Common Issues to Check

1. **Missing labels** - Input announced as "edit text" only
2. **Unlabeled buttons** - "Button" with no name
3. **Decorative images** - Should be hidden (aria-hidden or empty alt)
4. **Focus traps** - Can't tab out of a component
5. **Missing landmarks** - No main, nav, or footer regions
6. **Dynamic content** - Changes not announced

---

## Test Results Template

```
Screen Reader: [NVDA/VoiceOver/JAWS]
Version: [x.x]
Browser: [Chrome/Firefox/Safari]
Date: [YYYY-MM-DD]
Tester: [Name]

Homepage: [ ] Pass [ ] Fail
Programs: [ ] Pass [ ] Fail
Inquiry Form: [ ] Pass [ ] Fail
Login: [ ] Pass [ ] Fail
Mobile Menu: [ ] Pass [ ] Fail

Issues Found:
1. [Description]
2. [Description]

Overall: [ ] Pass [ ] Fail
```

---

## Acceptance Criteria

**PASS:** All 5 sections pass with no critical issues  
**CONDITIONAL PASS:** Minor issues documented with remediation plan  
**FAIL:** Critical issues blocking screen reader users

---

## Post-Test Actions

1. Document results in this file
2. Create issues for any failures
3. Update ACCESSIBILITY_TEST_RESULTS.md
4. Re-test after fixes

---

**Protocol Version:** 1.0  
**Last Updated:** February 6, 2025
