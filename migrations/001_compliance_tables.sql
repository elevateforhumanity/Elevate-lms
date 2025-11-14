-- Compliance Tables Migration
-- Created for Elevate LMS compliance tracking

CREATE TABLE IF NOT EXISTS compliance_records (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    compliance_type VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    completed_at TIMESTAMP,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_compliance_user ON compliance_records(user_id);
CREATE INDEX idx_compliance_course ON compliance_records(course_id);
CREATE INDEX idx_compliance_status ON compliance_records(status);
