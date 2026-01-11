# Monitoring System - Quick Start Guide

**Status:** ✅ Table exists, just needs column verification

---

## ✅ Good News!

The `audit_logs` table already exists in your database. We just need to verify it has all the required columns for monitoring.

---

## 🚀 Quick Setup (2 minutes)

### Step 1: Verify Schema

Visit the setup page to check if your table is ready:

**URL:** `https://elevateforhumanity.institute/admin/monitoring/setup`

This will automatically check:
- ✅ Table exists
- ✅ Required columns present
- ✅ Permissions granted
- ✅ Can insert/query data

### Step 2: Add Missing Columns (if needed)

If the setup page shows missing columns, it will provide SQL to run. Just:

1. Copy the SQL from the setup page
2. Go to Supabase Dashboard → SQL Editor
3. Paste and run the SQL
4. Click "Re-check Setup" on the setup page

### Step 3: Access Monitoring Dashboard

Once setup is complete:

**URL:** `https://elevateforhumanity.institute/admin/monitoring`

---

## 📋 Required Columns

The `audit_logs` table needs these columns:

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `created_at` | TIMESTAMP | When log was created |
| `action_type` | TEXT | Type of action (error, api_request, etc) |
| `description` | TEXT | Human-readable description |
| `user_id` | UUID | User who triggered action (nullable) |
| `ip_address` | TEXT | IP address (nullable) |
| `details` | JSONB | Additional data (nullable) |

---

## 🔧 Manual Setup (if needed)

If the automated setup doesn't work, run this SQL in Supabase:

```sql
-- Add missing columns (safe - only adds if not exists)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'audit_logs' AND column_name = 'action_type'
    ) THEN
        ALTER TABLE audit_logs ADD COLUMN action_type TEXT;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'audit_logs' AND column_name = 'description'
    ) THEN
        ALTER TABLE audit_logs ADD COLUMN description TEXT;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'audit_logs' AND column_name = 'user_id'
    ) THEN
        ALTER TABLE audit_logs ADD COLUMN user_id UUID REFERENCES profiles(id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'audit_logs' AND column_name = 'ip_address'
    ) THEN
        ALTER TABLE audit_logs ADD COLUMN ip_address TEXT;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'audit_logs' AND column_name = 'details'
    ) THEN
        ALTER TABLE audit_logs ADD COLUMN details JSONB;
    END IF;
END $$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_audit_logs_action_type ON audit_logs(action_type);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_ip_address ON audit_logs(ip_address);
```

---

## 🎯 What You Get

Once setup is complete, you'll have:

### Real-Time Dashboard
- System health status
- Service checks (Database, Redis, Stripe, Email)
- Performance metrics
- Rate limiting analytics
- Recent errors table
- Auto-refresh every 10 seconds

### Monitoring Features
- ✅ Error tracking
- ✅ Performance monitoring
- ✅ Rate limit analytics
- ✅ Security event logging
- ✅ Request logging
- ✅ IP tracking

---

## 📱 Access URLs

| Page | URL | Purpose |
|------|-----|---------|
| **Setup** | `/admin/monitoring/setup` | Verify schema |
| **Dashboard** | `/admin/monitoring` | Main monitoring |
| **Status API** | `/api/admin/monitoring/status` | Health checks |
| **Errors API** | `/api/admin/monitoring/errors` | Error logs |
| **Performance API** | `/api/admin/monitoring/performance` | Metrics |
| **Rate Limits API** | `/api/admin/monitoring/rate-limits` | Rate analytics |

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Can access `/admin/monitoring/setup`
- [ ] Setup page shows "✅ Ready"
- [ ] Can access `/admin/monitoring`
- [ ] Dashboard loads without errors
- [ ] Service status cards show data
- [ ] Metrics display correctly
- [ ] Auto-refresh works

---

## 🐛 Troubleshooting

### "Table already exists" error
✅ **This is fine!** The table exists, just needs column verification.
→ Go to `/admin/monitoring/setup` to verify columns

### Setup page shows missing columns
→ Copy SQL from setup page
→ Run in Supabase SQL Editor
→ Click "Re-check Setup"

### Dashboard shows no data
→ Check if audit_logs table has data
→ Verify permissions (SELECT, INSERT)
→ Check browser console for errors

### Can't access monitoring pages
→ Verify you're logged in
→ Verify you have admin role
→ Check profile.role = 'admin'

---

## 📞 Support

**Setup Issues:**
1. Visit `/admin/monitoring/setup`
2. Follow on-screen instructions
3. Copy/paste SQL if needed
4. Re-check after running SQL

**Dashboard Issues:**
1. Check browser console
2. Verify admin access
3. Check database permissions
4. Review error logs

---

## 🎉 Next Steps

1. **Visit Setup Page:** `/admin/monitoring/setup`
2. **Verify Schema:** Check if ready or needs SQL
3. **Run SQL (if needed):** Copy from setup page
4. **Access Dashboard:** `/admin/monitoring`
5. **Start Monitoring:** View real-time metrics

---

**Quick Links:**
- Setup: [/admin/monitoring/setup](/admin/monitoring/setup)
- Dashboard: [/admin/monitoring](/admin/monitoring)
- Full Docs: See `MONITORING_SETUP.md`

---

**Status:** Ready to verify and use! 🚀
