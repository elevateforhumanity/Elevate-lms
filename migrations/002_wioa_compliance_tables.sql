-- WIOA Compliance Tables Migration
-- Workforce Innovation and Opportunity Act compliance tracking

CREATE TABLE IF NOT EXISTS wioa_participants (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    program_id INTEGER NOT NULL,
    enrollment_date DATE NOT NULL,
    exit_date DATE,
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_wioa_user ON wioa_participants(user_id);
CREATE INDEX idx_wioa_program ON wioa_participants(program_id);
CREATE INDEX idx_wioa_status ON wioa_participants(status);
