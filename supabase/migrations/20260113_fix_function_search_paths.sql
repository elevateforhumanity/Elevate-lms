-- Fix function search_path security warnings
-- Sets search_path to empty string to prevent search path injection attacks
-- See: https://supabase.com/docs/guides/database/database-linter?lint=0011_function_search_path_mutable

-- touch_updated_at
ALTER FUNCTION public.touch_updated_at() SET search_path = '';

-- update_digital_purchases_updated_at
ALTER FUNCTION public.update_digital_purchases_updated_at() SET search_path = '';

-- sync_program_holder_documents_uploaded_at
ALTER FUNCTION public.sync_program_holder_documents_uploaded_at() SET search_path = '';

-- sync_program_holder_verification_fields
ALTER FUNCTION public.sync_program_holder_verification_fields() SET search_path = '';

-- check_license_valid
ALTER FUNCTION public.check_license_valid(uuid) SET search_path = '';

-- increment_license_usage
ALTER FUNCTION public.increment_license_usage(uuid) SET search_path = '';

-- decrement_license_usage (may have multiple signatures)
DO $$
BEGIN
  ALTER FUNCTION public.decrement_license_usage(uuid) SET search_path = '';
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

-- validate_enrollment_license
ALTER FUNCTION public.validate_enrollment_license() SET search_path = '';

-- track_license_usage
ALTER FUNCTION public.track_license_usage() SET search_path = '';

-- log_document_action
ALTER FUNCTION public.log_document_action() SET search_path = '';

-- update_document_timestamp
ALTER FUNCTION public.update_document_timestamp() SET search_path = '';

-- validate_partner_course_creation
ALTER FUNCTION public.validate_partner_course_creation() SET search_path = '';

-- is_ferpa_training_current
ALTER FUNCTION public.is_ferpa_training_current(uuid) SET search_path = '';

-- log_ferpa_access
ALTER FUNCTION public.log_ferpa_access() SET search_path = '';

-- external_modules_complete
ALTER FUNCTION public.external_modules_complete(uuid) SET search_path = '';

-- apply_stripe_subscription_update
DO $$
BEGIN
  ALTER FUNCTION public.apply_stripe_subscription_update(text, text, text, timestamptz, timestamptz) SET search_path = '';
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

-- notify_document_status_change
ALTER FUNCTION public.notify_document_status_change() SET search_path = '';

-- update_apprentice_placements_updated_at
ALTER FUNCTION public.update_apprentice_placements_updated_at() SET search_path = '';

-- is_shop_staff
ALTER FUNCTION public.is_shop_staff(uuid) SET search_path = '';

-- is_admin
ALTER FUNCTION public.is_admin() SET search_path = '';

-- notify_enrollment_created
ALTER FUNCTION public.notify_enrollment_created() SET search_path = '';

-- set_shop_onboarding_updated_at
ALTER FUNCTION public.set_shop_onboarding_updated_at() SET search_path = '';

-- update_shops_updated_at
ALTER FUNCTION public.update_shops_updated_at() SET search_path = '';

-- trigger_enrollment_email
ALTER FUNCTION public.trigger_enrollment_email() SET search_path = '';

-- update_updated_at_column
ALTER FUNCTION public.update_updated_at_column() SET search_path = '';

-- get_partner_license_info
ALTER FUNCTION public.get_partner_license_info(uuid) SET search_path = '';

-- can_user_enroll
ALTER FUNCTION public.can_user_enroll(uuid, uuid) SET search_path = '';

-- update_student_onboarding_updated_at
ALTER FUNCTION public.update_student_onboarding_updated_at() SET search_path = '';

-- get_user_document_requirements
ALTER FUNCTION public.get_user_document_requirements(uuid) SET search_path = '';

-- get_tax_document_stats
ALTER FUNCTION public.get_tax_document_stats(integer) SET search_path = '';

-- update_push_tokens_updated_at
ALTER FUNCTION public.update_push_tokens_updated_at() SET search_path = '';

-- trigger_hsi_enrollment
ALTER FUNCTION public.trigger_hsi_enrollment() SET search_path = '';

-- update_lms_progress_updated_at
ALTER FUNCTION public.update_lms_progress_updated_at() SET search_path = '';

-- enqueue_badge_earned_notification
ALTER FUNCTION public.enqueue_badge_earned_notification() SET search_path = '';

-- admin_upsert_push_token
DO $$
BEGIN
  ALTER FUNCTION public.admin_upsert_push_token(uuid, text, text) SET search_path = '';
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

-- Also fix cleanup_old_audit_logs from our earlier migration
DO $$
BEGIN
  ALTER FUNCTION public.cleanup_old_audit_logs(integer) SET search_path = '';
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

-- Additional functions from second batch

-- update_marketplace_creators_updated_at
ALTER FUNCTION public.update_marketplace_creators_updated_at() SET search_path = '';

-- update_marketplace_products_updated_at
ALTER FUNCTION public.update_marketplace_products_updated_at() SET search_path = '';

-- update_scorm_progress
DO $$
BEGIN
  ALTER FUNCTION public.update_scorm_progress(uuid, text, jsonb) SET search_path = '';
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

-- handle_new_auth_user
ALTER FUNCTION public.handle_new_auth_user() SET search_path = '';

-- generate_certificate_number
ALTER FUNCTION public.generate_certificate_number() SET search_path = '';

-- seed_application_checklist
ALTER FUNCTION public.seed_application_checklist() SET search_path = '';

-- calculate_course_progress
ALTER FUNCTION public.calculate_course_progress(uuid, uuid) SET search_path = '';

-- set_updated_at
ALTER FUNCTION public.set_updated_at() SET search_path = '';

-- applications_coerce_defaults
ALTER FUNCTION public.applications_coerce_defaults() SET search_path = '';

-- normalize_application_inputs
ALTER FUNCTION public.normalize_application_inputs() SET search_path = '';

-- update_shop_placements_updated_at
ALTER FUNCTION public.update_shop_placements_updated_at() SET search_path = '';

-- nullify_blank_text
ALTER FUNCTION public.nullify_blank_text(text) SET search_path = '';

-- applications_nullify_blanks
ALTER FUNCTION public.applications_nullify_blanks() SET search_path = '';

-- update_tax_appointments_updated_at
ALTER FUNCTION public.update_tax_appointments_updated_at() SET search_path = '';

-- tax_intake_sanitize_insert
ALTER FUNCTION public.tax_intake_sanitize_insert() SET search_path = '';

-- set_applications_user_id
ALTER FUNCTION public.set_applications_user_id() SET search_path = '';

-- update_status_on_enrollment
ALTER FUNCTION public.update_status_on_enrollment() SET search_path = '';

-- claim_applications_by_email
ALTER FUNCTION public.claim_applications_by_email(uuid) SET search_path = '';

-- sync_partner_enrollment_progress
ALTER FUNCTION public.sync_partner_enrollment_progress() SET search_path = '';

-- get_tax_appointment_stats
DO $$
BEGIN
  ALTER FUNCTION public.get_tax_appointment_stats() SET search_path = '';
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

-- auto_calculate_hours
ALTER FUNCTION public.auto_calculate_hours() SET search_path = '';

-- handle_new_user
ALTER FUNCTION public.handle_new_user() SET search_path = '';

-- calculate_payroll
DO $$
BEGIN
  ALTER FUNCTION public.calculate_payroll(uuid, date, date) SET search_path = '';
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

-- update_total_hours
ALTER FUNCTION public.update_total_hours() SET search_path = '';

-- Third batch of functions

-- check_course_completion
ALTER FUNCTION public.check_course_completion() SET search_path = '';

-- update_application_status
ALTER FUNCTION public.update_application_status() SET search_path = '';

-- external_modules_summary
ALTER FUNCTION public.external_modules_summary(uuid) SET search_path = '';

-- set_application_user_id
ALTER FUNCTION public.set_application_user_id() SET search_path = '';

-- _col_is_uuid
ALTER FUNCTION public._col_is_uuid(text, text) SET search_path = '';

-- set_quiz_attempts_user_uuid
ALTER FUNCTION public.set_quiz_attempts_user_uuid() SET search_path = '';

-- update_enrollment_steps_updated_at
ALTER FUNCTION public.update_enrollment_steps_updated_at() SET search_path = '';

-- get_current_step
ALTER FUNCTION public.get_current_step(uuid) SET search_path = '';

-- advance_to_next_step
ALTER FUNCTION public.advance_to_next_step(uuid) SET search_path = '';

-- mark_step_complete
ALTER FUNCTION public.mark_step_complete(uuid, text) SET search_path = '';

-- _table_exists
ALTER FUNCTION public._table_exists(text) SET search_path = '';

-- generate_enrollment_steps
ALTER FUNCTION public.generate_enrollment_steps() SET search_path = '';

-- is_enrollment_complete
ALTER FUNCTION public.is_enrollment_complete(uuid) SET search_path = '';

-- initiate_enrollment_payment
ALTER FUNCTION public.initiate_enrollment_payment(uuid, numeric, text) SET search_path = '';

-- _col_exists
ALTER FUNCTION public._col_exists(text, text) SET search_path = '';

-- _col_udt
ALTER FUNCTION public._col_udt(text, text) SET search_path = '';

-- check_missed_checkins
ALTER FUNCTION public.check_missed_checkins() SET search_path = '';

-- complete_enrollment_payment
ALTER FUNCTION public.complete_enrollment_payment(uuid, text) SET search_path = '';
