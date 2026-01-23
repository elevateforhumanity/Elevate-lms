-- ============================================================================
-- MISSING RLS POLICIES - Verified against actual database schema
-- Run in Supabase SQL Editor
-- ============================================================================

-- ============================================================================
-- CRITICAL USER-FACING TABLES
-- ============================================================================

-- 1. APPLICATIONS (columns: id, user_id, email, status, ...)
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can create applications" ON applications;
CREATE POLICY "Anyone can create applications" ON applications
  FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Users can view own applications" ON applications;
CREATE POLICY "Users can view own applications" ON applications
  FOR SELECT USING (user_id = auth.uid() OR email = current_setting('request.jwt.claims', true)::json->>'email');
DROP POLICY IF EXISTS "Admins can manage applications" ON applications;
CREATE POLICY "Admins can manage applications" ON applications
  FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin', 'staff', 'advisor')));

-- 2. ANNOUNCEMENTS (columns: id, is_published, ...)
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view published announcements" ON announcements;
CREATE POLICY "Public can view published announcements" ON announcements
  FOR SELECT USING (is_published = true);

-- 3. MODULES (columns: id, program_id, title, ...)
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view modules" ON modules;
CREATE POLICY "Public can view modules" ON modules
  FOR SELECT USING (true);

-- 4. BADGES (columns: id, name, description, ...)
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view badges" ON badges;
CREATE POLICY "Public can view badges" ON badges
  FOR SELECT USING (true);

-- 5. USER_BADGES (columns: id, user_id, badge_id, ...)
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own badges" ON user_badges;
CREATE POLICY "Users can view own badges" ON user_badges
  FOR SELECT USING (user_id = auth.uid());
DROP POLICY IF EXISTS "Public can view earned badges" ON user_badges;
CREATE POLICY "Public can view earned badges" ON user_badges
  FOR SELECT USING (true);

-- 6. USER_POINTS (columns: id, user_id, total_points, level, ...)
ALTER TABLE user_points ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own points" ON user_points;
CREATE POLICY "Users can view own points" ON user_points
  FOR SELECT USING (user_id = auth.uid());
DROP POLICY IF EXISTS "Public can view leaderboard" ON user_points;
CREATE POLICY "Public can view leaderboard" ON user_points
  FOR SELECT USING (true);

-- 7. LEARNING_PATHS (columns: id, name, description, is_featured, ...)
ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view learning paths" ON learning_paths;
CREATE POLICY "Public can view learning paths" ON learning_paths
  FOR SELECT USING (true);

-- 8. MESSAGES (columns: id, sender_id, recipient_id, ...)
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own messages" ON messages;
CREATE POLICY "Users can view own messages" ON messages
  FOR SELECT USING (sender_id = auth.uid() OR recipient_id = auth.uid());
DROP POLICY IF EXISTS "Users can send messages" ON messages;
CREATE POLICY "Users can send messages" ON messages
  FOR INSERT WITH CHECK (sender_id = auth.uid());
DROP POLICY IF EXISTS "Users can update received messages" ON messages;
CREATE POLICY "Users can update received messages" ON messages
  FOR UPDATE USING (recipient_id = auth.uid());

-- 9. QUIZZES (columns: id, is_published, ...)
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view published quizzes" ON quizzes;
CREATE POLICY "Public can view published quizzes" ON quizzes
  FOR SELECT USING (is_published = true);

-- 10. QUIZ_QUESTIONS (columns: id, quiz_id, ...)
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view quiz questions" ON quiz_questions;
CREATE POLICY "Public can view quiz questions" ON quiz_questions
  FOR SELECT USING (EXISTS (SELECT 1 FROM quizzes WHERE id = quiz_questions.quiz_id AND is_published = true));

-- 11. QUIZ_ANSWER_OPTIONS (columns: id, question_id, ...)
ALTER TABLE quiz_answer_options ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view answer options" ON quiz_answer_options;
CREATE POLICY "Public can view answer options" ON quiz_answer_options
  FOR SELECT USING (true);

-- 12. QUIZ_ATTEMPTS (columns: id, user_id, user_uuid, ...)
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own attempts" ON quiz_attempts;
CREATE POLICY "Users can view own attempts" ON quiz_attempts
  FOR SELECT USING (user_id = auth.uid() OR user_uuid = auth.uid());
DROP POLICY IF EXISTS "Users can create attempts" ON quiz_attempts;
CREATE POLICY "Users can create attempts" ON quiz_attempts
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- 13. FORUM_CATEGORIES (columns: id, is_active, ...)
ALTER TABLE forum_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view active categories" ON forum_categories;
CREATE POLICY "Public can view active categories" ON forum_categories
  FOR SELECT USING (is_active = true);

-- 14. FORUM_TOPICS (columns: id, author_id, ...)
ALTER TABLE forum_topics ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view topics" ON forum_topics;
CREATE POLICY "Public can view topics" ON forum_topics
  FOR SELECT USING (true);
DROP POLICY IF EXISTS "Users can create topics" ON forum_topics;
CREATE POLICY "Users can create topics" ON forum_topics
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "Users can update own topics" ON forum_topics;
CREATE POLICY "Users can update own topics" ON forum_topics
  FOR UPDATE USING (author_id = auth.uid());

-- 15. FORUM_REPLIES (columns: id, author_id, ...)
ALTER TABLE forum_replies ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view replies" ON forum_replies;
CREATE POLICY "Public can view replies" ON forum_replies
  FOR SELECT USING (true);
DROP POLICY IF EXISTS "Users can create replies" ON forum_replies;
CREATE POLICY "Users can create replies" ON forum_replies
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "Users can update own replies" ON forum_replies;
CREATE POLICY "Users can update own replies" ON forum_replies
  FOR UPDATE USING (author_id = auth.uid());

-- 16. PARTNER_COURSES (columns: id, active, ...)
ALTER TABLE partner_courses ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view active courses" ON partner_courses;
CREATE POLICY "Public can view active courses" ON partner_courses
  FOR SELECT USING (active = true);

-- 17. EVENTS (columns: id, is_public, ...)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view public events" ON events;
CREATE POLICY "Public can view public events" ON events
  FOR SELECT USING (is_public = true);

-- 18. EVENT_REGISTRATIONS (columns: id, user_id, ...)
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage own registrations" ON event_registrations;
CREATE POLICY "Users can manage own registrations" ON event_registrations
  FOR ALL USING (user_id = auth.uid());

-- 19. STUDENTS (columns: id, ...)
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own student record" ON students;
CREATE POLICY "Users can view own student record" ON students
  FOR SELECT USING (id = auth.uid());
DROP POLICY IF EXISTS "Admins can manage students" ON students;
CREATE POLICY "Admins can manage students" ON students
  FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin', 'staff')));

-- 20. STUDENT_RECORDS (columns: id, user_id, ...)
ALTER TABLE student_records ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own records" ON student_records;
CREATE POLICY "Users can view own records" ON student_records
  FOR SELECT USING (user_id = auth.uid());
DROP POLICY IF EXISTS "Admins can manage records" ON student_records;
CREATE POLICY "Admins can manage records" ON student_records
  FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin', 'staff')));

-- 21. STUDENT_ONBOARDING (columns: id, student_id, ...)
ALTER TABLE student_onboarding ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage own onboarding" ON student_onboarding;
CREATE POLICY "Users can manage own onboarding" ON student_onboarding
  FOR ALL USING (student_id = auth.uid());

-- 22. STUDENT_POINTS (columns: id, student_id, ...)
ALTER TABLE student_points ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own points" ON student_points;
CREATE POLICY "Users can view own points" ON student_points
  FOR SELECT USING (student_id = auth.uid());
DROP POLICY IF EXISTS "Public leaderboard" ON student_points;
CREATE POLICY "Public leaderboard" ON student_points
  FOR SELECT USING (true);

-- 23. STUDENT_NEXT_STEPS (columns: id, user_id, ...)
ALTER TABLE student_next_steps ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage own next steps" ON student_next_steps;
CREATE POLICY "Users can manage own next steps" ON student_next_steps
  FOR ALL USING (user_id = auth.uid());

-- 24. USER_PROGRESS (columns: id, user_id, ...)
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage own progress" ON user_progress;
CREATE POLICY "Users can manage own progress" ON user_progress
  FOR ALL USING (user_id = auth.uid());

-- 25. USER_STREAKS (columns: id, user_id, ...)
ALTER TABLE user_streaks ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage own streaks" ON user_streaks;
CREATE POLICY "Users can manage own streaks" ON user_streaks
  FOR ALL USING (user_id = auth.uid());

-- 26. USER_ACHIEVEMENTS (columns: id, user_id, ...)
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own achievements" ON user_achievements;
CREATE POLICY "Users can view own achievements" ON user_achievements
  FOR SELECT USING (user_id = auth.uid());
DROP POLICY IF EXISTS "Public achievements" ON user_achievements;
CREATE POLICY "Public achievements" ON user_achievements
  FOR SELECT USING (true);

-- 27. USER_ONBOARDING (columns: id, user_id, ...)
ALTER TABLE user_onboarding ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage own onboarding" ON user_onboarding;
CREATE POLICY "Users can manage own onboarding" ON user_onboarding
  FOR ALL USING (user_id = auth.uid());

-- 28. USER_RESUMES (columns: id, user_id, is_public, ...)
ALTER TABLE user_resumes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage own resumes" ON user_resumes;
CREATE POLICY "Users can manage own resumes" ON user_resumes
  FOR ALL USING (user_id = auth.uid());
DROP POLICY IF EXISTS "Public can view public resumes" ON user_resumes;
CREATE POLICY "Public can view public resumes" ON user_resumes
  FOR SELECT USING (is_public = true);

-- 29. ACCESSIBILITY_PREFERENCES (columns: id, user_id, ...)
ALTER TABLE accessibility_preferences ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage own preferences" ON accessibility_preferences;
CREATE POLICY "Users can manage own preferences" ON accessibility_preferences
  FOR ALL USING (user_id = auth.uid());

-- 30. CALENDAR_EVENTS - already has policy, skip

-- 31. COURSE_MODULES (columns: id, course_id, ...)
ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view modules" ON course_modules;
CREATE POLICY "Public can view modules" ON course_modules
  FOR SELECT USING (true);

-- 32. ASSIGNMENTS (columns: id, course_id, ...)
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view assignments" ON assignments;
CREATE POLICY "Public can view assignments" ON assignments
  FOR SELECT USING (true);

-- 33. ASSIGNMENT_SUBMISSIONS (columns: id, user_id, ...)
ALTER TABLE assignment_submissions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage own submissions" ON assignment_submissions;
CREATE POLICY "Users can manage own submissions" ON assignment_submissions
  FOR ALL USING (user_id = auth.uid());
DROP POLICY IF EXISTS "Admins can manage submissions" ON assignment_submissions;
CREATE POLICY "Admins can manage submissions" ON assignment_submissions
  FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin', 'staff')));

-- 34. CREDENTIALS_ATTAINED (columns: id, user_id, ...)
ALTER TABLE credentials_attained ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own credentials" ON credentials_attained;
CREATE POLICY "Users can view own credentials" ON credentials_attained
  FOR SELECT USING (user_id = auth.uid());
DROP POLICY IF EXISTS "Public can verify credentials" ON credentials_attained;
CREATE POLICY "Public can verify credentials" ON credentials_attained
  FOR SELECT USING (verified = true);

-- 35. ORGANIZATIONS (columns: id, status, ...)
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view active orgs" ON organizations;
CREATE POLICY "Public can view active orgs" ON organizations
  FOR SELECT USING (status = 'active');

-- 36. ORGANIZATION_USERS (columns: id, user_id, organization_id, ...)
ALTER TABLE organization_users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own org membership" ON organization_users;
CREATE POLICY "Users can view own org membership" ON organization_users
  FOR SELECT USING (user_id = auth.uid());

-- 37. PAYMENTS (columns: id, user_id, ...)
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own payments" ON payments;
CREATE POLICY "Users can view own payments" ON payments
  FOR SELECT USING (user_id = auth.uid());

-- 38. REFERRALS (columns: id, referrer_id, referred_user_id, ...)
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own referrals" ON referrals;
CREATE POLICY "Users can view own referrals" ON referrals
  FOR SELECT USING (referrer_id = auth.uid() OR referred_user_id = auth.uid());

-- 39. REFERRAL_CODES (columns: id, user_id, is_active, ...)
ALTER TABLE referral_codes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage own codes" ON referral_codes;
CREATE POLICY "Users can manage own codes" ON referral_codes
  FOR ALL USING (user_id = auth.uid());
DROP POLICY IF EXISTS "Public can view active codes" ON referral_codes;
CREATE POLICY "Public can view active codes" ON referral_codes
  FOR SELECT USING (is_active = true);

-- ============================================================================
-- SENSITIVE/ADMIN TABLES - Restrict to admins only
-- ============================================================================

-- 40. AUDIT_LOGS - already has policy

-- 41. SECURITY_AUDIT_LOGS (columns: id, user_id, ...)
ALTER TABLE security_audit_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can view security logs" ON security_audit_logs;
CREATE POLICY "Admins can view security logs" ON security_audit_logs
  FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin')));

-- 42. FAILED_LOGIN_ATTEMPTS (columns: id, email, ...)
ALTER TABLE failed_login_attempts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can view login attempts" ON failed_login_attempts;
CREATE POLICY "Admins can view login attempts" ON failed_login_attempts
  FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin')));

-- 43. TWO_FACTOR_AUTH (columns: id, user_id, ...)
ALTER TABLE two_factor_auth ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage own 2FA" ON two_factor_auth;
CREATE POLICY "Users can manage own 2FA" ON two_factor_auth
  FOR ALL USING (user_id = auth.uid());

-- 44. PASSWORD_HISTORY (columns: id, user_id, ...)
ALTER TABLE password_history ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "System only" ON password_history;
CREATE POLICY "System only" ON password_history
  FOR ALL USING (false);

-- 45. API_KEYS (columns: id, tenant_id, created_by, ...)
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can manage API keys" ON api_keys;
CREATE POLICY "Admins can manage API keys" ON api_keys
  FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin')));

-- 46. WEBHOOKS (columns: id, created_by, ...)
ALTER TABLE webhooks ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can manage webhooks" ON webhooks;
CREATE POLICY "Admins can manage webhooks" ON webhooks
  FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin')));

-- ============================================================================
-- TENANT TABLES
-- ============================================================================

-- 47. TENANT_MEMBERS (columns: id, tenant_id, user_id, ...)
ALTER TABLE tenant_members ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own tenant membership" ON tenant_members;
CREATE POLICY "Users can view own tenant membership" ON tenant_members
  FOR SELECT USING (user_id = auth.uid());

-- 48. TENANT_SETTINGS (columns: id, tenant_id, ...)
ALTER TABLE tenant_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Tenant members can view settings" ON tenant_settings;
CREATE POLICY "Tenant members can view settings" ON tenant_settings
  FOR SELECT USING (EXISTS (SELECT 1 FROM tenant_members WHERE tenant_id = tenant_settings.tenant_id AND user_id = auth.uid()));

-- 49. TENANT_BRANDING (columns: id, tenant_id, ...)
ALTER TABLE tenant_branding ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Tenant members can view branding" ON tenant_branding;
CREATE POLICY "Tenant members can view branding" ON tenant_branding
  FOR SELECT USING (EXISTS (SELECT 1 FROM tenant_members WHERE tenant_id = tenant_branding.tenant_id AND user_id = auth.uid()));

-- ============================================================================
-- PROGRAM HOLDER TABLES
-- ============================================================================

-- 50. PROGRAM_HOLDERS (columns: id, user_id, status, ...)
ALTER TABLE program_holders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own program holder" ON program_holders;
CREATE POLICY "Users can view own program holder" ON program_holders
  FOR SELECT USING (user_id = auth.uid());
DROP POLICY IF EXISTS "Admins can manage program holders" ON program_holders;
CREATE POLICY "Admins can manage program holders" ON program_holders
  FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin')));

-- 51. PROGRAM_HOLDER_DOCUMENTS (columns: id, user_id, ...)
ALTER TABLE program_holder_documents ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage own docs" ON program_holder_documents;
CREATE POLICY "Users can manage own docs" ON program_holder_documents
  FOR ALL USING (user_id = auth.uid());

-- 52. PROGRAM_HOLDER_STUDENTS (columns: id, program_holder_id, student_id, ...)
ALTER TABLE program_holder_students ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Program holders can view own students" ON program_holder_students;
CREATE POLICY "Program holders can view own students" ON program_holder_students
  FOR SELECT USING (EXISTS (SELECT 1 FROM program_holders WHERE id = program_holder_students.program_holder_id AND user_id = auth.uid()));
DROP POLICY IF EXISTS "Students can view own record" ON program_holder_students;
CREATE POLICY "Students can view own record" ON program_holder_students
  FOR SELECT USING (student_id = auth.uid());

-- ============================================================================
-- MARKETPLACE TABLES
-- ============================================================================

-- 53. MARKETPLACE_CREATORS (columns: id, user_id, status, ...)
ALTER TABLE marketplace_creators ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own creator profile" ON marketplace_creators;
CREATE POLICY "Users can view own creator profile" ON marketplace_creators
  FOR ALL USING (user_id = auth.uid());
DROP POLICY IF EXISTS "Public can view approved creators" ON marketplace_creators;
CREATE POLICY "Public can view approved creators" ON marketplace_creators
  FOR SELECT USING (status = 'approved');

-- 54. MARKETPLACE_PRODUCTS (columns: id, creator_id, status, ...)
ALTER TABLE marketplace_products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Creators can manage own products" ON marketplace_products;
CREATE POLICY "Creators can manage own products" ON marketplace_products
  FOR ALL USING (EXISTS (SELECT 1 FROM marketplace_creators WHERE id = marketplace_products.creator_id AND user_id = auth.uid()));
DROP POLICY IF EXISTS "Public can view approved products" ON marketplace_products;
CREATE POLICY "Public can view approved products" ON marketplace_products
  FOR SELECT USING (status = 'approved');

-- 55. MARKETPLACE_SALES (columns: id, creator_id, buyer_email, ...)
ALTER TABLE marketplace_sales ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Creators can view own sales" ON marketplace_sales;
CREATE POLICY "Creators can view own sales" ON marketplace_sales
  FOR SELECT USING (EXISTS (SELECT 1 FROM marketplace_creators WHERE id = marketplace_sales.creator_id AND user_id = auth.uid()));

-- ============================================================================
-- GRANT STATEMENTS
-- ============================================================================
GRANT SELECT ON applications TO anon;
GRANT SELECT ON announcements TO anon;
GRANT SELECT ON modules TO anon;
GRANT SELECT ON badges TO anon;
GRANT SELECT ON user_badges TO anon;
GRANT SELECT ON user_points TO anon;
GRANT SELECT ON learning_paths TO anon;
GRANT SELECT ON quizzes TO anon;
GRANT SELECT ON quiz_questions TO anon;
GRANT SELECT ON quiz_answer_options TO anon;
GRANT SELECT ON forum_categories TO anon;
GRANT SELECT ON forum_topics TO anon;
GRANT SELECT ON forum_replies TO anon;
GRANT SELECT ON partner_courses TO anon;
GRANT SELECT ON events TO anon;
GRANT SELECT ON organizations TO anon;
GRANT SELECT ON referral_codes TO anon;
GRANT SELECT ON marketplace_creators TO anon;
GRANT SELECT ON marketplace_products TO anon;
GRANT SELECT ON course_modules TO anon;
GRANT SELECT ON assignments TO anon;
GRANT SELECT ON credentials_attained TO anon;
GRANT SELECT ON student_points TO anon;
GRANT SELECT ON user_achievements TO anon;
GRANT SELECT ON user_resumes TO anon;

-- Authenticated users
GRANT ALL ON applications TO authenticated;
GRANT SELECT ON announcements TO authenticated;
GRANT ALL ON messages TO authenticated;
GRANT ALL ON quiz_attempts TO authenticated;
GRANT ALL ON forum_topics TO authenticated;
GRANT ALL ON forum_replies TO authenticated;
GRANT ALL ON event_registrations TO authenticated;
GRANT ALL ON students TO authenticated;
GRANT ALL ON student_records TO authenticated;
GRANT ALL ON student_onboarding TO authenticated;
GRANT ALL ON student_points TO authenticated;
GRANT ALL ON student_next_steps TO authenticated;
GRANT ALL ON user_progress TO authenticated;
GRANT ALL ON user_streaks TO authenticated;
GRANT ALL ON user_achievements TO authenticated;
GRANT ALL ON user_onboarding TO authenticated;
GRANT ALL ON user_resumes TO authenticated;
GRANT ALL ON accessibility_preferences TO authenticated;
GRANT ALL ON assignment_submissions TO authenticated;
GRANT SELECT ON credentials_attained TO authenticated;
GRANT SELECT ON organization_users TO authenticated;
GRANT SELECT ON payments TO authenticated;
GRANT ALL ON referrals TO authenticated;
GRANT ALL ON referral_codes TO authenticated;
GRANT ALL ON two_factor_auth TO authenticated;
GRANT SELECT ON tenant_members TO authenticated;
GRANT SELECT ON tenant_settings TO authenticated;
GRANT SELECT ON tenant_branding TO authenticated;
GRANT ALL ON program_holders TO authenticated;
GRANT ALL ON program_holder_documents TO authenticated;
GRANT SELECT ON program_holder_students TO authenticated;
GRANT ALL ON marketplace_creators TO authenticated;
GRANT ALL ON marketplace_products TO authenticated;
GRANT SELECT ON marketplace_sales TO authenticated;
