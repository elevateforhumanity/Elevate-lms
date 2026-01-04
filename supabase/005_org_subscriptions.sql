-- ============================================
-- ORG SUBSCRIPTIONS & BILLING
-- ============================================
-- Org-level billing, seat limits, feature locking
-- Compatible with existing Stripe flows
-- ============================================

CREATE TABLE IF NOT EXISTS public.organization_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  stripe_customer_id TEXT NOT NULL,
  stripe_subscription_id TEXT,
  plan TEXT NOT NULL,
  status TEXT NOT NULL,
  seats INTEGER,
  current_period_end TIMESTAMPTZ,
  grace_until TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_plan CHECK (plan IN (
    'starter',
    'growth',
    'enterprise',
    'custom',
    'trial'
  )),
  CONSTRAINT valid_status CHECK (status IN (
    'active',
    'past_due',
    'canceled',
    'incomplete',
    'trialing',
    'unpaid'
  ))
);

CREATE INDEX IF NOT EXISTS idx_org_subscriptions_org_id 
  ON public.organization_subscriptions(organization_id);
CREATE INDEX IF NOT EXISTS idx_org_subscriptions_stripe_customer 
  ON public.organization_subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_org_subscriptions_stripe_subscription 
  ON public.organization_subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_org_subscriptions_status 
  ON public.organization_subscriptions(status);

-- Enable RLS
ALTER TABLE public.organization_subscriptions ENABLE ROW LEVEL SECURITY;

-- Org admins can view their subscription
DROP POLICY IF EXISTS "org_admins_view_subscription" ON public.organization_subscriptions;
CREATE POLICY "org_admins_view_subscription"
ON public.organization_subscriptions
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.organization_users
    WHERE organization_users.organization_id = organization_subscriptions.organization_id
    AND organization_users.user_id = auth.uid()
    AND organization_users.role IN ('org_admin', 'super_admin')
  )
);

-- Trigger for updated_at
DROP TRIGGER IF EXISTS update_org_subscriptions_updated_at ON public.organization_subscriptions;
CREATE TRIGGER update_org_subscriptions_updated_at 
BEFORE UPDATE ON public.organization_subscriptions
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

COMMENT ON TABLE public.organization_subscriptions IS 'Organization-level billing and subscriptions';

-- ============================================
-- UPDATE DEFAULT ORG CONFIG WITH LICENSE
-- ============================================

DO $$
DECLARE
  default_org UUID;
BEGIN
  -- Get default org
  SELECT id INTO default_org
  FROM public.organizations
  WHERE slug = 'elevate-for-humanity'
  LIMIT 1;

  IF default_org IS NOT NULL THEN
    -- Update config to include license section
    UPDATE public.organization_settings
    SET config = config || jsonb_build_object(
      'license', jsonb_build_object(
        'plan', 'enterprise',
        'features', jsonb_build_object(
          'reporting', true,
          'exports', true,
          'employer_portal', true,
          'white_label', true
        ),
        'limits', jsonb_build_object(
          'max_students', null,
          'max_staff', null,
          'max_programs', null
        ),
        'grace_days', 14
      )
    )
    WHERE organization_id = default_org;

    -- Create default subscription (active, unlimited)
    INSERT INTO public.organization_subscriptions (
      organization_id,
      stripe_customer_id,
      plan,
      status
    ) VALUES (
      default_org,
      'default',
      'enterprise',
      'active'
    )
    ON CONFLICT DO NOTHING;
  END IF;
END $$;

-- ============================================
-- VERIFICATION
-- ============================================

DO $$
DECLARE
  sub_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO sub_count
  FROM public.organization_subscriptions;
  
  RAISE NOTICE '✅ Billing & license enforcement installed';
  RAISE NOTICE '   Subscriptions: %', sub_count;
END $$;
