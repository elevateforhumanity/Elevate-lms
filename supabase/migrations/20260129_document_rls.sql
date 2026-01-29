-- RLS DOCUMENTATION (policies already exist)
-- This migration documents existing Row Level Security policies for audit purposes

comment on table enrollments is 'RLS enforced: users see only own enrollments or org scope';
comment on table lesson_progress is 'RLS enforced: user_id = auth.uid()';
comment on table certificates is 'RLS enforced: owner or verifier access';
comment on table tenants is 'RLS enforced: tenant isolation';
comment on table profiles is 'RLS enforced: users can only read/update own profile';
comment on table courses is 'RLS enforced: public read, admin write';
comment on table lessons is 'RLS enforced: enrolled users can read, admin write';
