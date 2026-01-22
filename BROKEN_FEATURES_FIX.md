# 🚨 BROKEN FEATURES - MUST FIX BEFORE SELLING LICENSES

## Summary
**15 issues found** that will cause features to fail in production.

---

## 🔴 CRITICAL: Run This SQL in Supabase

Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql/new

Copy and paste this entire SQL block:

```sql
-- ============================================================
-- FIX RLS POLICIES AND SCHEMA MISMATCHES
-- ============================================================

-- 1. ADD MISSING COLUMNS TO shop_products
ALTER TABLE shop_products 
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS stripe_product_id TEXT,
ADD COLUMN IF NOT EXISTS stripe_price_id TEXT;

-- 2. ADD MISSING COLUMNS TO testimonials
ALTER TABLE testimonials
ADD COLUMN IF NOT EXISTS quote TEXT,
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Copy content to quote
UPDATE testimonials SET quote = content WHERE quote IS NULL AND content IS NOT NULL;

-- 3. FIX RLS POLICIES - Allow public read access

-- shop_products
DROP POLICY IF EXISTS "Public can view active products" ON shop_products;
CREATE POLICY "Public can view active products" ON shop_products
  FOR SELECT USING (is_active = true);

-- blog_posts
DROP POLICY IF EXISTS "Public can view published posts" ON blog_posts;
CREATE POLICY "Public can view published posts" ON blog_posts
  FOR SELECT USING (published = true);

-- testimonials
DROP POLICY IF EXISTS "Public can view testimonials" ON testimonials;
CREATE POLICY "Public can view testimonials" ON testimonials
  FOR SELECT USING (true);

-- achievements
DROP POLICY IF EXISTS "Public can view achievements" ON achievements;
CREATE POLICY "Public can view achievements" ON achievements
  FOR SELECT USING (true);

-- 4. CREATE partners TABLE
CREATE TABLE IF NOT EXISTS partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  logo_url TEXT,
  website_url TEXT,
  partner_type TEXT DEFAULT 'employer',
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view active partners" ON partners;
CREATE POLICY "Public can view active partners" ON partners
  FOR SELECT USING (is_active = true);

-- 5. ENSURE RLS IS ENABLED
ALTER TABLE shop_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- 6. ADD DEFAULT IMAGES
UPDATE shop_products 
SET image_url = 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=400'
WHERE image_url IS NULL;

-- 7. GRANT PERMISSIONS
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON shop_products TO anon, authenticated;
GRANT SELECT ON blog_posts TO anon, authenticated;
GRANT SELECT ON testimonials TO anon, authenticated;
GRANT SELECT ON achievements TO anon, authenticated;
GRANT SELECT ON partners TO anon, authenticated;
GRANT SELECT ON programs TO anon, authenticated;
GRANT SELECT ON courses TO anon, authenticated;
GRANT SELECT ON lessons TO anon, authenticated;
```

---

## 🔴 CRITICAL: Sync Products to Stripe

Your shop products have NO Stripe IDs. Checkout will fail.

### Option 1: Manual (Quick)
1. Go to Stripe Dashboard → Products
2. Create each product manually
3. Copy the product ID and price ID
4. Update Supabase:
```sql
UPDATE shop_products SET 
  stripe_product_id = 'prod_xxx',
  stripe_price_id = 'price_xxx'
WHERE id = 'your-product-id';
```

### Option 2: Run Sync Script
```bash
pnpm run stripe:sync-products
```

---

## 📊 ISSUES BY CATEGORY

### RLS Policy Issues (4)
| Table | Issue | Impact |
|-------|-------|--------|
| shop_products | No public SELECT | Shop shows fallback data |
| blog_posts | No public SELECT | Blog empty |
| testimonials | No public SELECT | Homepage broken |
| achievements | No public SELECT | Achievements hidden |

### Schema Mismatches (7)
| Table | Missing Column | Used By |
|-------|---------------|---------|
| shop_products | image_url | /shop |
| shop_products | is_featured | /shop |
| shop_products | images | Product detail |
| shop_products | features | Product detail |
| testimonials | quote | Homepage |
| testimonials | image_url | Homepage |
| testimonials | avatar_url | Homepage |

### Empty Tables (4)
| Table | Feature Broken |
|-------|---------------|
| orders | Order history |
| cart_items | Shopping cart |
| entities | Org management |
| notifications | Notifications |

### Stripe Issues
| Issue | Impact |
|-------|--------|
| No stripe_product_id on products | Checkout fails |
| No stripe_price_id on products | Checkout fails |

---

## ✅ VERIFICATION

After running the SQL, test with:

```sql
-- Should return products (not permission denied)
SELECT * FROM shop_products LIMIT 5;

-- Should return posts
SELECT * FROM blog_posts WHERE published = true LIMIT 5;

-- Should return testimonials
SELECT * FROM testimonials LIMIT 5;
```

---

## 🔧 AUTOMATED PREVENTION

Quality gates have been added to prevent these issues:
- Pre-commit hooks check for common patterns
- `scripts/quality-gates.sh` runs on every commit
- ESLint rules for Suspense boundaries

Run manually: `./scripts/quality-gates.sh`
