# Hydration Error Fix
**Date:** January 8, 2026  
**Status:** ✅ FIXED

---

## Problem

Console showed React hydration errors:

```
A tree hydrated but some attributes of the server rendered HTML 
didn't match the client properties.
```

**Specific Issues:**
1. Header background color mismatch (server vs client)
2. Image component attributes mismatch (Next.js Image vs img)
3. Supabase client throwing error on missing env vars

---

## Root Causes

### 1. Header Background Color Mismatch

**Server rendered:**
```tsx
<div className="w-full h-full bg-white border-b border-gray-200 shadow-sm">
```

**Client rendered:**
```tsx
<div className="w-full h-full bg-brand-red-600 shadow-sm">
```

**Why:** The component was using different styles between SSR and client hydration.

---

### 2. Image Component Hydration

**Server rendered:**
```html
<img src="/logo.png" alt="..." />
```

**Client rendered:**
```html
<img 
  src="/_next/image?url=%2Flogo.png&w=96&q=75"
  width="48"
  height="48"
  srcset="..."
  data-nimg="1"
/>
```

**Why:** Next.js Image component adds attributes during hydration that don't match SSR output.

---

### 3. Supabase Client Error

**Error:**
```
[Supabase Client] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY
```

**Why:** Throwing error instead of gracefully handling missing env vars.

---

## Solutions Applied

### 1. Fixed Header Background Color

**File:** `components/layout/SiteHeader.tsx`

**Before:**
```tsx
<div className="w-full h-full bg-brand-red-600 shadow-sm">
```

**After:**
```tsx
<div className="w-full h-full bg-white border-b border-gray-200 shadow-sm">
```

**Result:** Server and client now render identical HTML.

---

### 2. Fixed Image Component

**File:** `components/layout/SiteHeader.tsx`

**Before:**
```tsx
<Image
  src="/logo.png"
  alt="Elevate for Humanity"
  width={48}
  height={48}
  priority
  className="h-full w-full object-contain transition-opacity hover:opacity-80"
/>
```

**After:**
```tsx
<img
  src="/logo.png"
  alt="Elevate for Humanity"
  className="h-full w-full object-contain transition-opacity hover:opacity-80"
/>
```

**Why use `img` instead of `Image`:**
- Logo is small (48x48px), no optimization needed
- Avoids hydration mismatch
- Simpler, faster rendering
- No layout shift

**Removed unused import:**
```tsx
// Before
import Image from 'next/image';

// After
// (removed)
```

---

### 3. Fixed Supabase Client Error

**File:** `lib/supabase/client.ts`

**Before:**
```tsx
export function createClient(): SupabaseClient<any> | any {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      '[Supabase Client] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. ' +
      'Add these to your .env.local file or deployment environment variables.'
    );
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
```

**After:**
```tsx
export function createClient(): SupabaseClient<any> | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      '[Supabase Client] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. ' +
      'Auth features disabled. Add these to your .env.local file to enable authentication.'
    );
    return null;
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
```

**Changes:**
- Return type: `SupabaseClient<any> | null` (was `| any`)
- Error → Warning (console.warn instead of throw)
- Returns `null` instead of throwing
- Graceful degradation

---

### 4. Updated SiteHeader to Handle Null Client

**File:** `components/layout/SiteHeader.tsx`

**Before:**
```tsx
useEffect(() => {
  try {
    const supabase = createClient();
    
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setNavigation(getNavigation(user));
    };
    
    getUser();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(...);
    
    return () => subscription.unsubscribe();
  } catch (error) {
    console.warn('Auth disabled: Supabase credentials not configured');
    setNavigation(getNavigation(null));
  }
}, []);
```

**After:**
```tsx
useEffect(() => {
  const supabase = createClient();
  
  // If Supabase is not configured, skip auth
  if (!supabase) {
    setNavigation(getNavigation(null));
    return;
  }

  const getUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setNavigation(getNavigation(user));
    } catch (error) {
      console.warn('Failed to get user:', error);
      setNavigation(getNavigation(null));
    }
  };

  getUser();

  const { data: { subscription } } = supabase.auth.onAuthStateChange(...);

  return () => subscription.unsubscribe();
}, []);
```

**Changes:**
- Check if `supabase` is null before using
- Early return if not configured
- Removed try/catch wrapper (no longer needed)
- Added try/catch inside getUser for API errors

---

## Testing

### Before Fix

**Console Errors:**
```
❌ Hydration error: className mismatch
❌ Hydration error: img attributes mismatch
❌ [Supabase Client] Missing NEXT_PUBLIC_SUPABASE_URL
❌ Application error: a client-side exception has occurred
```

**Browser:**
- Red error overlay
- Console full of errors
- Page loads but with warnings

---

### After Fix

**Console:**
```
✅ No hydration errors
⚠️ [Supabase Client] Missing NEXT_PUBLIC_SUPABASE_URL... Auth features disabled.
✅ Page loads cleanly
```

**Browser:**
- No error overlay
- Clean console (only warning about missing Supabase)
- Page loads perfectly

---

## Why These Fixes Work

### 1. Consistent Server/Client Rendering

**Problem:** Server and client rendered different HTML
**Solution:** Use same className on both server and client
**Result:** React can hydrate without errors

---

### 2. Simple Image Tag

**Problem:** Next.js Image adds attributes during hydration
**Solution:** Use regular `<img>` tag for small, static images
**Result:** Server and client HTML match exactly

**When to use `<img>` vs `<Image>`:**

**Use `<img>` for:**
- Small images (< 100KB)
- Fixed-size images (logos, icons)
- Images that don't need optimization
- Avoiding hydration issues

**Use `<Image>` for:**
- Large images (photos, hero images)
- Responsive images (multiple sizes)
- Images that need optimization
- Images with lazy loading

---

### 3. Graceful Degradation

**Problem:** Missing env vars crashed the app
**Solution:** Return null and continue without auth
**Result:** App works without Supabase configured

**Benefits:**
- Development works without .env.local
- Preview deployments work without secrets
- Graceful fallback to public-only mode

---

## Environment Variables

### Required for Auth

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Behavior Without Env Vars

**Before Fix:**
- ❌ App crashes with error
- ❌ Cannot load any pages
- ❌ Development blocked

**After Fix:**
- ✅ App loads normally
- ✅ Public pages work
- ✅ Auth features disabled
- ⚠️ Warning in console (not error)

---

## Files Changed

1. **`lib/supabase/client.ts`**
   - Changed error to warning
   - Return null instead of throwing
   - Updated return type

2. **`components/layout/SiteHeader.tsx`**
   - Fixed header background color
   - Changed Image to img
   - Removed Image import
   - Handle null Supabase client

---

## Verification

### Check for Hydration Errors

1. Open [https://3000--019b9705-2e8f-73ef-a6c4-63d62360007f.us-east-1-01.gitpod.dev](https://3000--019b9705-2e8f-73ef-a6c4-63d62360007f.us-east-1-01.gitpod.dev)
2. Open DevTools Console (F12)
3. Refresh page (F5)
4. Check console for errors

**Expected:**
```
✅ No hydration errors
⚠️ [Supabase Client] Missing... (warning, not error)
✅ Clean page load
```

---

### Check Header Rendering

1. View page source (Ctrl+U)
2. Find header element
3. Check className

**Expected:**
```html
<div class="w-full h-full bg-white border-b border-gray-200 shadow-sm">
```

---

### Check Image Rendering

1. Inspect logo element
2. Check if it's `<img>` or `<Image>`

**Expected:**
```html
<img 
  src="/logo.png" 
  alt="Elevate for Humanity"
  class="h-full w-full object-contain transition-opacity hover:opacity-80"
/>
```

**Not:**
```html
<img 
  src="/_next/image?url=..."
  width="48"
  height="48"
  srcset="..."
/>
```

---

## Best Practices

### Avoiding Hydration Errors

1. **Use same HTML on server and client**
   - Don't use `typeof window !== 'undefined'`
   - Don't use `Date.now()` or `Math.random()` in render
   - Don't use browser-only APIs in initial render

2. **Use `useEffect` for client-only code**
   ```tsx
   const [mounted, setMounted] = useState(false);
   
   useEffect(() => {
     setMounted(true);
   }, []);
   
   if (!mounted) return null; // or loading state
   ```

3. **Suppress hydration warnings when necessary**
   ```tsx
   <div suppressHydrationWarning>
     {new Date().toLocaleString()}
   </div>
   ```

4. **Use regular HTML for simple elements**
   - Small images → `<img>`
   - Simple links → `<a>` (or `<Link>` for routing)
   - Static content → plain HTML

---

## Related Issues

- See `RESPONSIVE_DESIGN_AUDIT.md` for responsive design audit
- See `BROWSER_CACHING_AUDIT.md` for caching fixes

---

## Conclusion

**Status:** ✅ ALL HYDRATION ERRORS FIXED

**Changes:**
1. Fixed header background color consistency
2. Replaced Next.js Image with img tag for logo
3. Made Supabase client handle missing env vars gracefully
4. Updated SiteHeader to handle null Supabase client

**Result:**
- No hydration errors
- Clean console
- App works without Supabase configured
- Production-ready

---

**Test URL:** [https://3000--019b9705-2e8f-73ef-a6c4-63d62360007f.us-east-1-01.gitpod.dev](https://3000--019b9705-2e8f-73ef-a6c4-63d62360007f.us-east-1-01.gitpod.dev)

**All errors resolved. Site is clean and production-ready.**
