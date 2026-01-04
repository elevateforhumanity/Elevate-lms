-- ============================================
-- MULTI-TENANT FOUNDATION SCHEMA
-- ============================================
-- Backward-compatible, additive-only migration
-- Preserves all existing enrollments, LMS, and payment flows
-- ============================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. ORGANIZATIONS (TENANTS)
-- ============================================

CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'training_provider',
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_org_type CHECK (type IN (
    'training_provider',
    'employer',
    'workforce_board',
    'nonprofit',
    'government',
    'enterprise'
  )),
  CONSTRAINT valid_org_status CHECK (status IN ('active', 'suspended', 'inactive'))
);

CREATE INDEX IF NOT EXISTS idx_organizations_slug ON public.organizations(slug);
CREATE INDEX IF NOT EXISTS idx_organizations_type ON public.organizations(type);
CREATE INDEX IF NOT EXISTS idx_organizations_status ON public.organizations(status);

-- ============================================
-- 2. ORGANIZATION USERS (RBAC CORE)
-- ============================================

CREATE TABLE IF NOT EXISTS public.organization_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (organization_id, user_id),
  CONSTRAINT valid_role CHECK (role IN (
    'super_admin',
    'org_admin',
    'staff',
    'instructor',
    'employer_partner',
    'auditor'
  ))
);

CREATE INDEX IF NOT EXISTS idx_organization_users_org_id ON public.organization_users(organization_id);
CREATE INDEX IF NOT EXISTS idx_organization_users_user_id ON public.organization_users(user_id);
CREATE INDEX IF NOT EXISTS idx_organization_users_role ON public.organization_users(role);

-- ============================================
-- 3. ORGANIZATION SETTINGS (CONFIG ENGINE)
-- ============================================

CREATE TABLE IF NOT EXISTS public.organization_settings (
  organization_id UUID PRIMARY KEY REFERENCES public.organizations(id) ON DELETE CASCADE,
  config JSONB NOT NULL DEFAULT '{
    "features": {
      "lms": true,
      "micro_courses": true,
      "apprenticeships": true,
      "employer_portal": false,
      "workforce_reporting": true,
      "ai_autopilots": true
    },
    "funding": {
      "wioa": true,
      "wrg": true,
      "jri": true,
      "employer_paid": true,
      "self_pay": true
    },
    "delivery": {
      "online": true,
      "in_person": true,
      "hybrid": true
    },
    "reporting": {
      "attendance": true,
      "outcomes": true,
      "credentials": true,
      "exports_enabled": true
    },
    "branding": {
      "logo_url": null,
      "primary_color": null,
      "site_name": null
    },
    "limits": {
      "max_programs": null,
      "max_students": null,
      "max_staff": null
    }
  }'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_organization_settings_config ON public.organization_settings USING gin(config);

-- ============================================
-- 4. ADD ORG ID TO EXISTING TABLES (NON-DESTRUCTIVE)
-- ============================================

-- Profiles
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'profiles' 
    AND column_name = 'organization_id'
  ) THEN
    ALTER TABLE public.profiles 
    ADD COLUMN organization_id UUID REFERENCES public.organizations(id);
    
    CREATE INDEX idx_profiles_organization_id ON public.profiles(organization_id);
  END IF;
END $$;

-- Programs
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'programs' 
    AND column_name = 'organization_id'
  ) THEN
    ALTER TABLE public.programs 
    ADD COLUMN organization_id UUID REFERENCES public.organizations(id);
    
    CREATE INDEX idx_programs_organization_id ON public.programs(organization_id);
  END IF;
END $$;

-- Courses
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'courses' 
    AND column_name = 'organization_id'
  ) THEN
    ALTER TABLE public.courses 
    ADD COLUMN organization_id UUID REFERENCES public.organizations(id);
    
    CREATE INDEX idx_courses_organization_id ON public.courses(organization_id);
  END IF;
END $$;

-- Enrollments
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'enrollments' 
    AND column_name = 'organization_id'
  ) THEN
    ALTER TABLE public.enrollments 
    ADD COLUMN organization_id UUID REFERENCES public.organizations(id);
    
    CREATE INDEX idx_enrollments_organization_id ON public.enrollments(organization_id);
  END IF;
END $$;

-- Payments (if exists)
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'payments'
  ) THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'payments' 
      AND column_name = 'organization_id'
    ) THEN
      ALTER TABLE public.payments 
      ADD COLUMN organization_id UUID REFERENCES public.organizations(id);
      
      CREATE INDEX idx_payments_organization_id ON public.payments(organization_id);
    END IF;
  END IF;
END $$;

-- ============================================
-- 5. AUTO-ASSIGN ORG FOR EXISTING DATA (CRITICAL)
-- ============================================

DO $$
DECLARE
  default_org UUID;
BEGIN
  -- Check if default org exists
  SELECT id INTO default_org
  FROM public.organizations
  WHERE slug = 'elevate-for-humanity'
  LIMIT 1;

  -- Create default org if missing
  IF default_org IS NULL THEN
    INSERT INTO public.organizations (slug, name, type, status)
    VALUES ('elevate-for-humanity', 'Elevate for Humanity', 'training_provider', 'active')
    RETURNING id INTO default_org;

    -- Create default settings
    INSERT INTO public.organization_settings (organization_id)
    VALUES (default_org);
  END IF;

  -- Assign existing data to default org (preserves all current behavior)
  UPDATE public.profiles 
  SET organization_id = default_org 
  WHERE organization_id IS NULL;

  UPDATE public.programs 
  SET organization_id = default_org 
  WHERE organization_id IS NULL;

  UPDATE public.courses 
  SET organization_id = default_org 
  WHERE organization_id IS NULL;

  UPDATE public.enrollments 
  SET organization_id = default_org 
  WHERE organization_id IS NULL;

  -- Update payments if table exists
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'payments'
  ) THEN
    UPDATE public.payments 
    SET organization_id = default_org 
    WHERE organization_id IS NULL;
  END IF;

END $$;

-- ============================================
-- 6. ROW LEVEL SECURITY (ORG ISOLATION)
-- ============================================

-- Enable RLS on new tables
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (idempotent)
DROP POLICY IF EXISTS "org_members_can_view_org" ON public.organizations;
DROP POLICY IF EXISTS "super_admin_bypass_orgs" ON public.organizations;
DROP POLICY IF EXISTS "org_admins_manage_settings" ON public.organization_settings;
DROP POLICY IF EXISTS "org_members_view_settings" ON public.organization_settings;
DROP POLICY IF EXISTS "org_members_view_membership" ON public.organization_users;
DROP POLICY IF EXISTS "org_admins_manage_membership" ON public.organization_users;

-- Organizations: Members can view their org
CREATE POLICY "org_members_can_view_org"
ON public.organizations
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.organization_users
    WHERE organization_users.organization_id = organizations.id
    AND organization_users.user_id = auth.uid()
  )
);

-- Organizations: Super admin bypass
CREATE POLICY "super_admin_bypass_orgs"
ON public.organizations
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.organization_users
    WHERE organization_users.user_id = auth.uid()
    AND organization_users.role = 'super_admin'
  )
);

-- Settings: Org admins manage settings
CREATE POLICY "org_admins_manage_settings"
ON public.organization_settings
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.organization_users
    WHERE organization_users.organization_id = organization_settings.organization_id
    AND organization_users.user_id = auth.uid()
    AND organization_users.role IN ('org_admin', 'super_admin')
  )
);

-- Settings: Members can view settings
CREATE POLICY "org_members_view_settings"
ON public.organization_settings
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.organization_users
    WHERE organization_users.organization_id = organization_settings.organization_id
    AND organization_users.user_id = auth.uid()
  )
);

-- Organization Users: Members can view membership
CREATE POLICY "org_members_view_membership"
ON public.organization_users
FOR SELECT
USING (
  organization_id IN (
    SELECT organization_id FROM public.organization_users
    WHERE user_id = auth.uid()
  )
);

-- Organization Users: Admins manage membership
CREATE POLICY "org_admins_manage_membership"
ON public.organization_users
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.organization_users ou
    WHERE ou.organization_id = organization_users.organization_id
    AND ou.user_id = auth.uid()
    AND ou.role IN ('org_admin', 'super_admin')
  )
);

-- ============================================
-- 7. TRIGGERS FOR UPDATED_AT
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_organizations_updated_at ON public.organizations;
CREATE TRIGGER update_organizations_updated_at 
BEFORE UPDATE ON public.organizations
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_organization_users_updated_at ON public.organization_users;
CREATE TRIGGER update_organization_users_updated_at 
BEFORE UPDATE ON public.organization_users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_organization_settings_updated_at ON public.organization_settings;
CREATE TRIGGER update_organization_settings_updated_at 
BEFORE UPDATE ON public.organization_settings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 8. VERIFICATION
-- ============================================

DO $$
DECLARE
  org_count INTEGER;
  profile_count INTEGER;
  program_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO org_count FROM public.organizations;
  SELECT COUNT(*) INTO profile_count FROM public.profiles WHERE organization_id IS NOT NULL;
  SELECT COUNT(*) INTO program_count FROM public.programs WHERE organization_id IS NOT NULL;
  
  RAISE NOTICE '✅ Multi-tenant foundation installed';
  RAISE NOTICE '   Organizations: %', org_count;
  RAISE NOTICE '   Profiles with org: %', profile_count;
  RAISE NOTICE '   Programs with org: %', program_count;
END $$;
