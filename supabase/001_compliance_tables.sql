-- Compliance Database Schema
-- Run this migration to create tables for compliance tracking

-- Compliance Reports Table
CREATE TABLE IF NOT EXISTS compliance_reports (
  id VARCHAR(255) PRIMARY KEY,
  program_id VARCHAR(255) NOT NULL,
  data JSONB NOT NULL,
  timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
  status VARCHAR(50) NOT NULL DEFAULT 'compliant',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Compliance Audits Table
CREATE TABLE IF NOT EXISTS compliance_audits (
  id VARCHAR(255) PRIMARY KEY,
  program_id VARCHAR(255) NOT NULL,
  performed_at TIMESTAMP NOT NULL,
  findings JSONB NOT NULL DEFAULT '[]',
  status VARCHAR(50) NOT NULL DEFAULT 'completed',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_compliance_reports_program_id ON compliance_reports(program_id);
CREATE INDEX IF NOT EXISTS idx_compliance_reports_timestamp ON compliance_reports(timestamp);
CREATE INDEX IF NOT EXISTS idx_compliance_reports_status ON compliance_reports(status);
CREATE INDEX IF NOT EXISTS idx_compliance_audits_program_id ON compliance_audits(program_id);
CREATE INDEX IF NOT EXISTS idx_compliance_audits_performed_at ON compliance_audits(performed_at);

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_compliance_reports_updated_at BEFORE UPDATE ON compliance_reports
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
