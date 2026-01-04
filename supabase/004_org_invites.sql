-- ============================================
-- ORG INVITES TABLE
-- ============================================
-- Self-service staff invitation system
-- ============================================

CREATE TABLE IF NOT EXISTS public.org_invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_invite_role CHECK (role IN (
    'org_admin',
    'staff',
    'instructor',
    'employer_partner',
    'auditor'
  ))
);

CREATE INDEX IF NOT EXISTS idx_org_invites_token ON public.org_invites(token);
CREATE INDEX IF NOT EXISTS idx_org_invites_email ON public.org_invites(email);
CREATE INDEX IF NOT EXISTS idx_org_invites_org_id ON public.org_invites(organization_id);
CREATE INDEX IF NOT EXISTS idx_org_invites_expires_at ON public.org_invites(expires_at);

-- Prevent duplicate pending invites for same email+org
CREATE UNIQUE INDEX IF NOT EXISTS idx_org_invites_unique_pending 
ON public.org_invites(organization_id, email) 
WHERE expires_at > NOW();

-- Enable RLS
ALTER TABLE public.org_invites ENABLE ROW LEVEL SECURITY;

-- Org admins can manage invites
DROP POLICY IF EXISTS "org_admins_manage_invites" ON public.org_invites;
CREATE POLICY "org_admins_manage_invites"
ON public.org_invites
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.organization_users
    WHERE organization_users.organization_id = org_invites.organization_id
    AND organization_users.user_id = auth.uid()
    AND organization_users.role IN ('org_admin', 'super_admin')
  )
);

-- Org admins can view invites for their org
DROP POLICY IF EXISTS "anyone_can_view_own_invite" ON public.org_invites;
CREATE POLICY "org_admins_view_invites"
ON public.org_invites
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.organization_users
    WHERE organization_users.organization_id = org_invites.organization_id
    AND organization_users.user_id = auth.uid()
    AND organization_users.role IN ('org_admin', 'super_admin')
  )
);

-- Secure function to fetch invite by token (bypasses RLS for token-based lookup)
CREATE OR REPLACE FUNCTION public.get_invite_by_token(invite_token TEXT)
RETURNS TABLE (
  id UUID,
  organization_id UUID,
  email TEXT,
  role TEXT,
  expires_at TIMESTAMPTZ,
  organization_name TEXT
) 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    i.id,
    i.organization_id,
    i.email,
    i.role,
    i.expires_at,
    o.name as organization_name
  FROM public.org_invites i
  JOIN public.organizations o ON o.id = i.organization_id
  WHERE i.token = invite_token
  AND i.expires_at > NOW();
END;
$$;

COMMENT ON TABLE public.org_invites IS 'Organization staff invitation system';
