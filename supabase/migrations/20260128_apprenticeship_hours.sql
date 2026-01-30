-- =====================================================
-- APPRENTICESHIP HOURS TRACKING
-- Required for: hours export, partner approval, compliance
-- =====================================================

-- Main hours tracking table
CREATE TABLE IF NOT EXISTS apprenticeship_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  shop_id UUID REFERENCES shops(id) ON DELETE SET NULL,
  partner_id UUID REFERENCES partners(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  hours_worked DECIMAL(4,2) NOT NULL CHECK (hours_worked >= 0 AND hours_worked <= 24),
  description TEXT,
  task_type TEXT CHECK (task_type IN ('practical', 'theory', 'observation', 'assessment', 'other')),
  
  -- Approval workflow
  approved BOOLEAN DEFAULT false,
  approved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  approved_at TIMESTAMPTZ,
  rejection_reason TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Prevent duplicate entries for same student/date/shop
  UNIQUE(student_id, date, shop_id)
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_apprenticeship_hours_student ON apprenticeship_hours(student_id);
CREATE INDEX IF NOT EXISTS idx_apprenticeship_hours_shop ON apprenticeship_hours(shop_id);
CREATE INDEX IF NOT EXISTS idx_apprenticeship_hours_date ON apprenticeship_hours(date);
CREATE INDEX IF NOT EXISTS idx_apprenticeship_hours_approved ON apprenticeship_hours(approved);
CREATE INDEX IF NOT EXISTS idx_apprenticeship_hours_partner ON apprenticeship_hours(partner_id);

-- RLS
ALTER TABLE apprenticeship_hours ENABLE ROW LEVEL SECURITY;

-- Students can view their own hours
CREATE POLICY "Students view own hours" ON apprenticeship_hours
  FOR SELECT USING (auth.uid() = student_id);

-- Students can insert their own hours (pending approval)
CREATE POLICY "Students insert own hours" ON apprenticeship_hours
  FOR INSERT WITH CHECK (auth.uid() = student_id AND approved = false);

-- Partners/shops can view hours for their students
CREATE POLICY "Partners view assigned hours" ON apprenticeship_hours
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM partners p 
      WHERE p.user_id = auth.uid() 
      AND p.id = apprenticeship_hours.partner_id
    )
    OR
    EXISTS (
      SELECT 1 FROM shops s 
      WHERE s.owner_id = auth.uid() 
      AND s.id = apprenticeship_hours.shop_id
    )
  );

-- Partners/shops can approve hours
CREATE POLICY "Partners approve hours" ON apprenticeship_hours
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM partners p 
      WHERE p.user_id = auth.uid() 
      AND p.id = apprenticeship_hours.partner_id
    )
    OR
    EXISTS (
      SELECT 1 FROM shops s 
      WHERE s.owner_id = auth.uid() 
      AND s.id = apprenticeship_hours.shop_id
    )
  );

-- Admin full access
CREATE POLICY "Admin full access to hours" ON apprenticeship_hours
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super_admin')
    )
  );

-- Shops table (if not exists) - referenced by apprenticeship_hours
CREATE TABLE IF NOT EXISTS shops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  license_number TEXT,
  owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  partner_id UUID REFERENCES partners(id) ON DELETE SET NULL,
  address TEXT,
  city TEXT,
  state TEXT DEFAULT 'IN',
  zip TEXT,
  phone TEXT,
  email TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_shops_owner ON shops(owner_id);
CREATE INDEX IF NOT EXISTS idx_shops_partner ON shops(partner_id);

ALTER TABLE shops ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read shops" ON shops FOR SELECT USING (true);
CREATE POLICY "Owners manage shops" ON shops FOR ALL USING (auth.uid() = owner_id);
CREATE POLICY "Admin manage shops" ON shops FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);

-- Partners table (if not exists) - referenced by apprenticeship_hours
CREATE TABLE IF NOT EXISTS partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  organization_name TEXT,
  email TEXT,
  phone TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'inactive', 'suspended')),
  partner_type TEXT CHECK (partner_type IN ('training_provider', 'employer', 'workforce_agency', 'community_org')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

CREATE INDEX IF NOT EXISTS idx_partners_user ON partners(user_id);
CREATE INDEX IF NOT EXISTS idx_partners_status ON partners(status);

ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own partner" ON partners FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users update own partner" ON partners FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admin manage partners" ON partners FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);

-- Hours summary view for reporting
CREATE OR REPLACE VIEW apprenticeship_hours_summary AS
SELECT 
  student_id,
  DATE_TRUNC('week', date) as week_start,
  SUM(hours_worked) as total_hours,
  SUM(CASE WHEN approved THEN hours_worked ELSE 0 END) as approved_hours,
  SUM(CASE WHEN NOT approved THEN hours_worked ELSE 0 END) as pending_hours,
  COUNT(*) as entry_count
FROM apprenticeship_hours
GROUP BY student_id, DATE_TRUNC('week', date);
