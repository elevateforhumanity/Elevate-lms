-- License Events Table for Webhook Logging
-- Tracks all license state changes for audit and debugging

CREATE TABLE IF NOT EXISTS license_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  license_id UUID REFERENCES licenses(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_license_events_license ON license_events(license_id);
CREATE INDEX IF NOT EXISTS idx_license_events_type ON license_events(event_type);
CREATE INDEX IF NOT EXISTS idx_license_events_created ON license_events(created_at DESC);

-- RLS
ALTER TABLE license_events ENABLE ROW LEVEL SECURITY;

-- Only admins can view license events
CREATE POLICY "Admins can view license events"
  ON license_events FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

-- System can insert events (via service role)
CREATE POLICY "System can insert license events"
  ON license_events FOR INSERT
  WITH CHECK (true);

COMMENT ON TABLE license_events IS 'Audit log for license state changes from Stripe webhooks';
