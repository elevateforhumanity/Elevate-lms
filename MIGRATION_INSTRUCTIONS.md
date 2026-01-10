# Database Migration Instructions

**Date:** January 10, 2026  
**Migration:** Add Creator Rejection/Approval Tracking Fields  
**Status:** ⚠️ **NEEDS TO BE RUN MANUALLY**

---

## Migration File

**File:** `supabase/migrations/20260110_add_creator_rejection_fields.sql`

**Purpose:** Add fields to track who rejected/approved creators and when

---

## How to Run Migration

### Option 1: Supabase Dashboard (Recommended)

1. **Go to Supabase SQL Editor:**
   - Visit: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql/new

2. **Copy the migration SQL:**
   ```sql
   -- Add rejection and approval tracking fields to marketplace_creators
   -- Migration: 20260110_add_creator_rejection_fields
   -- Date: January 10, 2026
   -- Purpose: Track who rejected/approved creators and when

   -- Add rejection tracking fields
   ALTER TABLE marketplace_creators
     ADD COLUMN IF NOT EXISTS rejection_reason TEXT,
     ADD COLUMN IF NOT EXISTS rejected_at TIMESTAMPTZ,
     ADD COLUMN IF NOT EXISTS rejected_by UUID REFERENCES auth.users(id);

   -- Add approval tracking fields
   ALTER TABLE marketplace_creators
     ADD COLUMN IF NOT EXISTS approved_at TIMESTAMPTZ,
     ADD COLUMN IF NOT EXISTS approved_by UUID REFERENCES auth.users(id);

   -- Add indexes for querying
   CREATE INDEX IF NOT EXISTS idx_marketplace_creators_status 
     ON marketplace_creators(status);

   CREATE INDEX IF NOT EXISTS idx_marketplace_creators_rejected_by 
     ON marketplace_creators(rejected_by);

   CREATE INDEX IF NOT EXISTS idx_marketplace_creators_approved_by 
     ON marketplace_creators(approved_by);

   -- Add comments
   COMMENT ON COLUMN marketplace_creators.rejection_reason IS 'Reason provided when creator application was rejected';
   COMMENT ON COLUMN marketplace_creators.rejected_at IS 'Timestamp when creator was rejected';
   COMMENT ON COLUMN marketplace_creators.rejected_by IS 'Admin user who rejected the creator';
   COMMENT ON COLUMN marketplace_creators.approved_at IS 'Timestamp when creator was approved';
   COMMENT ON COLUMN marketplace_creators.approved_by IS 'Admin user who approved the creator';
   ```

3. **Paste into SQL Editor**

4. **Click "Run"**

5. **Verify Success:**
   - Should see "Success. No rows returned"
   - Check that columns were added

---

### Option 2: Command Line (If you have psql)

```bash
# Set your database URL
export DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.cuxzzpsyufcewtmicszk.supabase.co:5432/postgres"

# Run migration
psql $DATABASE_URL -f supabase/migrations/20260110_add_creator_rejection_fields.sql
```

---

### Option 3: Supabase CLI

```bash
# Link to your project (first time only)
npx supabase link --project-ref cuxzzpsyufcewtmicszk

# Run migrations
npx supabase db push
```

---

## Verification

### Check if Migration Ran Successfully

Run this query in Supabase SQL Editor:

```sql
-- Check if columns exist
SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns
WHERE table_name = 'marketplace_creators'
  AND column_name IN (
    'rejection_reason',
    'rejected_at',
    'rejected_by',
    'approved_at',
    'approved_by'
  )
ORDER BY column_name;
```

**Expected Result:**
```
column_name       | data_type                   | is_nullable
------------------+-----------------------------+-------------
approved_at       | timestamp with time zone    | YES
approved_by       | uuid                        | YES
rejected_at       | timestamp with time zone    | YES
rejected_by       | uuid                        | YES
rejection_reason  | text                        | YES
```

---

### Check Indexes

```sql
-- Check if indexes exist
SELECT 
  indexname,
  indexdef
FROM pg_indexes
WHERE tablename = 'marketplace_creators'
  AND indexname LIKE 'idx_marketplace_creators_%'
ORDER BY indexname;
```

**Expected Result:**
```
indexname                                | indexdef
-----------------------------------------+--------------------------------------------------
idx_marketplace_creators_approved_by     | CREATE INDEX ... ON marketplace_creators(approved_by)
idx_marketplace_creators_rejected_by     | CREATE INDEX ... ON marketplace_creators(rejected_by)
idx_marketplace_creators_status          | CREATE INDEX ... ON marketplace_creators(status)
```

---

## What This Migration Does

### Adds 5 New Columns:

1. **rejection_reason** (TEXT)
   - Stores why a creator was rejected
   - Used in rejection emails
   - Helps track rejection patterns

2. **rejected_at** (TIMESTAMPTZ)
   - When the creator was rejected
   - For audit trail
   - For analytics

3. **rejected_by** (UUID)
   - Which admin rejected the creator
   - References auth.users(id)
   - For accountability

4. **approved_at** (TIMESTAMPTZ)
   - When the creator was approved
   - For audit trail
   - For analytics

5. **approved_by** (UUID)
   - Which admin approved the creator
   - References auth.users(id)
   - For accountability

### Adds 3 Indexes:

1. **idx_marketplace_creators_status**
   - Speeds up queries filtering by status
   - Used in admin dashboard

2. **idx_marketplace_creators_rejected_by**
   - Speeds up queries by admin who rejected
   - Used in audit reports

3. **idx_marketplace_creators_approved_by**
   - Speeds up queries by admin who approved
   - Used in audit reports

---

## Why This Migration is Needed

### Before Migration:
- ❌ Creators were **deleted** when rejected (data loss!)
- ❌ No record of who rejected/approved
- ❌ No record of when rejection/approval happened
- ❌ No rejection reason stored
- ❌ Can't track rejection patterns
- ❌ No audit trail

### After Migration:
- ✅ Creators are **updated** to 'rejected' status (no data loss)
- ✅ Track who rejected/approved
- ✅ Track when rejection/approval happened
- ✅ Store rejection reason
- ✅ Can analyze rejection patterns
- ✅ Complete audit trail

---

## Related Code Changes

This migration supports the fixes in:

**File:** `app/api/admin/creators/reject/route.ts`

**New Code:**
```typescript
const { error: updateError } = await adminSupabase
  .from('marketplace_creators')
  .update({
    status: 'rejected',
    rejection_reason: reason,           // ← New field
    rejected_at: new Date().toISOString(), // ← New field
    rejected_by: user.id,                // ← New field
    updated_at: new Date().toISOString(),
  })
  .eq('id', creatorId);
```

---

## Rollback (If Needed)

If you need to undo this migration:

```sql
-- Remove columns
ALTER TABLE marketplace_creators
  DROP COLUMN IF EXISTS rejection_reason,
  DROP COLUMN IF EXISTS rejected_at,
  DROP COLUMN IF EXISTS rejected_by,
  DROP COLUMN IF EXISTS approved_at,
  DROP COLUMN IF EXISTS approved_by;

-- Remove indexes
DROP INDEX IF EXISTS idx_marketplace_creators_status;
DROP INDEX IF EXISTS idx_marketplace_creators_rejected_by;
DROP INDEX IF EXISTS idx_marketplace_creators_approved_by;
```

**⚠️ Warning:** Only rollback if absolutely necessary. This will lose rejection/approval tracking data.

---

## Testing After Migration

### 1. Test Creator Rejection

```bash
# Test the API endpoint
curl -X POST https://elevateforhumanity.institute/api/admin/creators/reject \
  -H "Content-Type: application/json" \
  -H "Cookie: your-auth-cookie" \
  -d '{
    "creatorId": "test-creator-uuid",
    "reason": "Does not meet quality standards"
  }'
```

### 2. Verify Data

```sql
-- Check that rejection data is stored
SELECT 
  id,
  status,
  rejection_reason,
  rejected_at,
  rejected_by
FROM marketplace_creators
WHERE status = 'rejected'
LIMIT 5;
```

### 3. Check Audit Logs

```sql
-- Verify audit logs are created
SELECT 
  action,
  actor_id,
  target_id,
  metadata,
  created_at
FROM audit_logs
WHERE action = 'creator_rejected'
ORDER BY created_at DESC
LIMIT 5;
```

---

## Troubleshooting

### Error: "relation marketplace_creators does not exist"

**Solution:** The marketplace_creators table hasn't been created yet. Run the table creation migration first:

```sql
-- Check if table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_name = 'marketplace_creators'
);
```

### Error: "column already exists"

**Solution:** Migration already ran. This is safe - the `IF NOT EXISTS` clause prevents errors.

### Error: "permission denied"

**Solution:** Make sure you're using the service role key or have admin permissions in Supabase.

---

## Status Checklist

- [ ] Migration file reviewed
- [ ] SQL copied to Supabase dashboard
- [ ] Migration executed successfully
- [ ] Columns verified to exist
- [ ] Indexes verified to exist
- [ ] API endpoint tested
- [ ] Rejection data verified
- [ ] Audit logs verified

---

## Next Steps After Migration

1. ✅ Migration complete
2. Test creator rejection flow
3. Monitor audit logs
4. Verify no errors in production
5. Update documentation

---

**Migration File:** `supabase/migrations/20260110_add_creator_rejection_fields.sql`  
**Status:** ⚠️ Waiting to be run  
**Priority:** HIGH - Required for API fixes to work properly
