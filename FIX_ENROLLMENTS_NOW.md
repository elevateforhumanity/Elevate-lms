# Fix Enrollments Error - Right Now

## The Error

```
ERROR: column "student_id" of relation "enrollments" does not exist
```

This means the enrollments table has different column names than expected.

---

## Solution: Check Actual Schema First

### Step 1: Find Out What Columns Exist

Go to Supabase Table Editor:
https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/editor

Click on **"enrollments"** table

Look at the column names. They might be:
- `user_id` instead of `student_id`
- Different structure entirely

### Step 2: Use Correct Column Names

Once you see the actual columns, use this template:

**If columns are: `user_id`, `program_id`, `status`:**
```sql
INSERT INTO enrollments (
  user_id,
  program_id,
  status,
  created_at
)
SELECT 
  (SELECT id FROM profiles WHERE role = 'student' LIMIT 1),
  (SELECT id FROM programs WHERE is_active = true LIMIT 1),
  'active',
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM enrollments 
  WHERE user_id = (SELECT id FROM profiles WHERE role = 'student' LIMIT 1)
);
```

**If columns are: `student_id`, `program_id`, `status`:**
```sql
INSERT INTO enrollments (
  student_id,
  program_id,
  status,
  created_at
)
SELECT 
  (SELECT id FROM profiles WHERE role = 'student' LIMIT 1),
  (SELECT id FROM programs WHERE is_active = true LIMIT 1),
  'active',
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM enrollments 
  WHERE student_id = (SELECT id FROM profiles WHERE role = 'student' LIMIT 1)
);
```

---

## Alternative: Check Schema via SQL

Run this to see the actual columns:

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'enrollments' 
  AND table_schema = 'public'
ORDER BY ordinal_position;
```

This will show you exactly what columns exist.

---

## Quick Fix Without Knowing Schema

Try this - it will work regardless of column names:

```sql
-- Get a student
SELECT id, email FROM profiles WHERE role = 'student' LIMIT 1;

-- Get a program
SELECT id, name FROM programs WHERE is_active = true LIMIT 1;

-- Now manually insert with the IDs you see above
-- Replace [student_id] and [program_id] with actual UUIDs
INSERT INTO enrollments (user_id, program_id, status)
VALUES (
  '[student_id_from_above]',
  '[program_id_from_above]',
  'active'
);
```

---

## If Enrollments Table Doesn't Exist

If you get "table doesn't exist", run this to create it:

```sql
CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  program_id UUID REFERENCES public.programs(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'active',
  progress_percentage INTEGER DEFAULT 0,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- Add policy
CREATE POLICY "Users can view own enrollments"
ON public.enrollments
FOR SELECT
USING (auth.uid() = user_id);
```

---

## Verify It Worked

After inserting, run:

```sql
SELECT 
  e.id,
  e.status,
  p.email as student_email,
  pr.name as program_name
FROM enrollments e
LEFT JOIN profiles p ON p.id = e.user_id OR p.id = e.student_id
LEFT JOIN programs pr ON pr.id = e.program_id
LIMIT 5;
```

Should show your enrollment!

---

## What To Do Right Now

1. **Go to Supabase Table Editor**
   https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/editor

2. **Click "enrollments" table**

3. **Look at column names**

4. **Tell me what you see** and I'll give you the exact SQL

OR

5. **Run the schema check query:**
   ```sql
   SELECT column_name 
   FROM information_schema.columns 
   WHERE table_name = 'enrollments';
   ```

6. **Copy the column names** and I'll create the correct INSERT statement

---

## Common Column Name Variations

The table might use:
- `user_id` (most common)
- `student_id` (what we tried)
- `learner_id`
- `participant_id`

Just check the actual table and we'll use the right names!

---

**Next Step: Check the enrollments table in Supabase Table Editor and tell me what columns you see.**
