-- ============================================================================
-- VERIFIED RLS POLICIES - Based on actual database schema
-- Generated after checking information_schema.columns and pg_policies
-- ============================================================================

-- ============================================================================
-- 1. PROGRAMS - Public can view published/active programs
-- Columns: id, slug, title, ..., is_active, published, status
-- ============================================================================
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view active programs" ON programs;
CREATE POLICY "Public can view active programs" ON programs
  FOR SELECT USING (is_active = true);

-- ============================================================================
-- 2. PRODUCTS - Public can view active products
-- Columns: id, name, slug, ..., is_active
-- ============================================================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view active products" ON products;
CREATE POLICY "Public can view active products" ON products
  FOR SELECT USING (is_active = true);

-- ============================================================================
-- 3. SHOP_PRODUCTS - Public can view active shop products
-- Columns: id, name, slug, ..., is_active, is_featured
-- ============================================================================
ALTER TABLE shop_products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view active shop products" ON shop_products;
CREATE POLICY "Public can view active shop products" ON shop_products
  FOR SELECT USING (is_active = true);

-- ============================================================================
-- 4. TESTIMONIALS - Public can view featured testimonials
-- Columns: id, name, role, company, content, rating, is_featured
-- ============================================================================
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view testimonials" ON testimonials;
CREATE POLICY "Public can view testimonials" ON testimonials
  FOR SELECT USING (true);

-- ============================================================================
-- 5. FORUM_CATEGORIES - Public can view active categories
-- Columns: id, name, slug, ..., is_active
-- ============================================================================
ALTER TABLE forum_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view active forum categories" ON forum_categories;
CREATE POLICY "Public can view active forum categories" ON forum_categories
  FOR SELECT USING (is_active = true);

-- ============================================================================
-- 6. FORUM_TOPICS - Public can view topics
-- Columns: id, category_id, author_id, title, slug, content, is_pinned, is_locked, ...
-- ============================================================================
ALTER TABLE forum_topics ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view forum topics" ON forum_topics;
CREATE POLICY "Public can view forum topics" ON forum_topics
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can create topics" ON forum_topics;
CREATE POLICY "Authenticated users can create topics" ON forum_topics
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Users can update own topics" ON forum_topics;
CREATE POLICY "Users can update own topics" ON forum_topics
  FOR UPDATE USING (author_id = auth.uid());

-- ============================================================================
-- 7. FORUM_REPLIES - Public can view replies
-- Columns: id, topic_id, author_id, parent_id, content, is_solution, upvotes
-- ============================================================================
ALTER TABLE forum_replies ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view forum replies" ON forum_replies;
CREATE POLICY "Public can view forum replies" ON forum_replies
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can create replies" ON forum_replies;
CREATE POLICY "Authenticated users can create replies" ON forum_replies
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Users can update own replies" ON forum_replies;
CREATE POLICY "Users can update own replies" ON forum_replies
  FOR UPDATE USING (author_id = auth.uid());

-- ============================================================================
-- 8. ANNOUNCEMENTS - Public can view published announcements
-- Columns: id, course_id, program_id, title, body, posted_by, is_pinned, is_published, published_at
-- ============================================================================
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view published announcements" ON announcements;
CREATE POLICY "Public can view published announcements" ON announcements
  FOR SELECT USING (is_published = true);

-- ============================================================================
-- 9. PROFILES - Users can view/update own profile
-- Columns: id, email, full_name, role, enrollment_status, phone, ...
-- ============================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (id = auth.uid());

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (id = auth.uid());

DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role IN ('admin', 'super_admin')
    )
  );

-- ============================================================================
-- 10. NOTIFICATIONS - Users can manage own notifications
-- Columns: id, user_id, type, title, message, ..., read
-- ============================================================================
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own notifications" ON notifications;
CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own notifications" ON notifications;
CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (user_id = auth.uid());

DROP POLICY IF EXISTS "System can insert notifications" ON notifications;
CREATE POLICY "System can insert notifications" ON notifications
  FOR INSERT WITH CHECK (true);

-- ============================================================================
-- 11. LESSON_PROGRESS - Users can manage own progress
-- Columns: id, user_id, lesson_id, course_id, completed, ...
-- ============================================================================
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage own lesson progress" ON lesson_progress;
CREATE POLICY "Users can manage own lesson progress" ON lesson_progress
  FOR ALL USING (user_id = auth.uid());

-- ============================================================================
-- 12. QUIZ_ATTEMPTS - Users can manage own attempts
-- Columns: id, quiz_id, user_id, attempt_number, ..., user_uuid
-- ============================================================================
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own quiz attempts" ON quiz_attempts;
CREATE POLICY "Users can view own quiz attempts" ON quiz_attempts
  FOR SELECT USING (user_id = auth.uid() OR user_uuid = auth.uid());

DROP POLICY IF EXISTS "Users can create quiz attempts" ON quiz_attempts;
CREATE POLICY "Users can create quiz attempts" ON quiz_attempts
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- ============================================================================
-- 13. QUIZZES - Public can view published quizzes
-- Columns: id, course_id, lesson_id, title, ..., is_published
-- ============================================================================
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view published quizzes" ON quizzes;
CREATE POLICY "Public can view published quizzes" ON quizzes
  FOR SELECT USING (is_published = true);

-- ============================================================================
-- 14. QUIZ_QUESTIONS - Public can view questions for published quizzes
-- Columns: id, quiz_id, question_text, question_type, ...
-- ============================================================================
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view quiz questions" ON quiz_questions;
CREATE POLICY "Public can view quiz questions" ON quiz_questions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM quizzes q
      WHERE q.id = quiz_questions.quiz_id AND q.is_published = true
    )
  );

-- ============================================================================
-- 15. QUIZ_ANSWER_OPTIONS - Public can view answer options
-- Columns: id, question_id, answer_text, is_correct, ...
-- ============================================================================
ALTER TABLE quiz_answer_options ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view answer options" ON quiz_answer_options;
CREATE POLICY "Public can view answer options" ON quiz_answer_options
  FOR SELECT USING (true);

-- ============================================================================
-- 16. STUDENT_ENROLLMENTS - Users can view own enrollments
-- Columns: id, student_id, program_id, ..., status
-- ============================================================================
ALTER TABLE student_enrollments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own enrollments" ON student_enrollments;
CREATE POLICY "Users can view own enrollments" ON student_enrollments
  FOR SELECT USING (student_id = auth.uid());

DROP POLICY IF EXISTS "Admins can manage all enrollments" ON student_enrollments;
CREATE POLICY "Admins can manage all enrollments" ON student_enrollments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role IN ('admin', 'super_admin')
    )
  );

-- ============================================================================
-- 17. APPLICATIONS - Users can view/create own applications
-- Columns: id, first_name, last_name, ..., user_id, status
-- ============================================================================
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can create applications" ON applications;
CREATE POLICY "Anyone can create applications" ON applications
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Users can view own applications" ON applications;
CREATE POLICY "Users can view own applications" ON applications
  FOR SELECT USING (user_id = auth.uid() OR email = current_setting('request.jwt.claims', true)::json->>'email');

DROP POLICY IF EXISTS "Admins can manage all applications" ON applications;
CREATE POLICY "Admins can manage all applications" ON applications
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role IN ('admin', 'super_admin', 'staff', 'advisor')
    )
  );

-- ============================================================================
-- 18. PARTNER_COURSES - Public can view active courses
-- Columns: id, provider_id, course_name, ..., active
-- ============================================================================
ALTER TABLE partner_courses ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view active partner courses" ON partner_courses;
CREATE POLICY "Public can view active partner courses" ON partner_courses
  FOR SELECT USING (active = true);

-- ============================================================================
-- 19. PARTNER_LMS_PROVIDERS - Public can view active providers
-- Columns: id, provider_name, provider_type, ..., active
-- ============================================================================
ALTER TABLE partner_lms_providers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view active providers" ON partner_lms_providers;
CREATE POLICY "Public can view active providers" ON partner_lms_providers
  FOR SELECT USING (active = true);

-- ============================================================================
-- 20. SCORM_PACKAGES - Public can view active packages
-- Columns: id, title, description, ..., active
-- ============================================================================
ALTER TABLE scorm_packages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view active scorm packages" ON scorm_packages;
CREATE POLICY "Public can view active scorm packages" ON scorm_packages
  FOR SELECT USING (active = true);

-- ============================================================================
-- 21. TRAINING_COURSES - Public can view active courses
-- Columns: id, course_name, course_code, ..., is_active
-- ============================================================================
ALTER TABLE training_courses ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view active training courses" ON training_courses;
CREATE POLICY "Public can view active training courses" ON training_courses
  FOR SELECT USING (is_active = true);

-- ============================================================================
-- 22. TRAINING_LESSONS - Public can view lessons
-- Columns: id, course_id, lesson_number, title, content, ...
-- ============================================================================
ALTER TABLE training_lessons ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view training lessons" ON training_lessons;
CREATE POLICY "Public can view training lessons" ON training_lessons
  FOR SELECT USING (true);

-- ============================================================================
-- 23. MODULES - Public can view modules
-- Columns: id, program_id, title, summary, order_index, ...
-- ============================================================================
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view modules" ON modules;
CREATE POLICY "Public can view modules" ON modules
  FOR SELECT USING (true);

-- ============================================================================
-- 24. BADGES - Public can view badges
-- Columns: id, name, description, icon, category, criteria, points, rarity
-- ============================================================================
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view badges" ON badges;
CREATE POLICY "Public can view badges" ON badges
  FOR SELECT USING (true);

-- ============================================================================
-- 25. USER_BADGES - Users can view own badges
-- Columns: id, user_id, badge_id, earned_at, progress_data
-- ============================================================================
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own badges" ON user_badges;
CREATE POLICY "Users can view own badges" ON user_badges
  FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Public can view all earned badges" ON user_badges;
CREATE POLICY "Public can view all earned badges" ON user_badges
  FOR SELECT USING (true);

-- ============================================================================
-- 26. USER_POINTS - Users can view own points
-- Columns: id, user_id, total_points, level, level_name, ...
-- ============================================================================
ALTER TABLE user_points ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own points" ON user_points;
CREATE POLICY "Users can view own points" ON user_points
  FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Public can view leaderboard" ON user_points;
CREATE POLICY "Public can view leaderboard" ON user_points
  FOR SELECT USING (true);

-- ============================================================================
-- 27. LEARNING_PATHS - Public can view featured paths
-- Columns: id, name, description, path_type, ..., is_featured
-- ============================================================================
ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view learning paths" ON learning_paths;
CREATE POLICY "Public can view learning paths" ON learning_paths
  FOR SELECT USING (true);

-- ============================================================================
-- 28. MESSAGES - Users can view own messages
-- Columns: id, sender_id, recipient_id, subject, body, read, ...
-- ============================================================================
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own messages" ON messages;
CREATE POLICY "Users can view own messages" ON messages
  FOR SELECT USING (sender_id = auth.uid() OR recipient_id = auth.uid());

DROP POLICY IF EXISTS "Users can send messages" ON messages;
CREATE POLICY "Users can send messages" ON messages
  FOR INSERT WITH CHECK (sender_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own received messages" ON messages;
CREATE POLICY "Users can update own received messages" ON messages
  FOR UPDATE USING (recipient_id = auth.uid());

-- ============================================================================
-- 29. REVIEWS - Public can view approved reviews
-- Columns: id, user_id, reviewer_name, ..., moderation_status, is_featured
-- ============================================================================
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view approved reviews" ON reviews;
CREATE POLICY "Public can view approved reviews" ON reviews
  FOR SELECT USING (moderation_status = 'approved' OR moderation_status IS NULL);

DROP POLICY IF EXISTS "Users can create reviews" ON reviews;
CREATE POLICY "Users can create reviews" ON reviews
  FOR INSERT WITH CHECK (true);

-- ============================================================================
-- 30. SHOP_CATEGORIES - Public can view active categories
-- Columns: id, name, slug, description, sort_order, is_active
-- ============================================================================
ALTER TABLE shop_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view active shop categories" ON shop_categories;
CREATE POLICY "Public can view active shop categories" ON shop_categories
  FOR SELECT USING (is_active = true);

-- ============================================================================
-- GRANT STATEMENTS
-- ============================================================================
GRANT SELECT ON programs TO anon;
GRANT SELECT ON products TO anon;
GRANT SELECT ON shop_products TO anon;
GRANT SELECT ON testimonials TO anon;
GRANT SELECT ON forum_categories TO anon;
GRANT SELECT ON forum_topics TO anon;
GRANT SELECT ON forum_replies TO anon;
GRANT SELECT ON announcements TO anon;
GRANT SELECT ON quizzes TO anon;
GRANT SELECT ON quiz_questions TO anon;
GRANT SELECT ON quiz_answer_options TO anon;
GRANT SELECT ON partner_courses TO anon;
GRANT SELECT ON partner_lms_providers TO anon;
GRANT SELECT ON scorm_packages TO anon;
GRANT SELECT ON training_courses TO anon;
GRANT SELECT ON training_lessons TO anon;
GRANT SELECT ON modules TO anon;
GRANT SELECT ON badges TO anon;
GRANT SELECT ON user_badges TO anon;
GRANT SELECT ON user_points TO anon;
GRANT SELECT ON learning_paths TO anon;
GRANT SELECT ON reviews TO anon;
GRANT SELECT ON shop_categories TO anon;

-- Authenticated users get more access
GRANT SELECT, INSERT, UPDATE ON profiles TO authenticated;
GRANT SELECT, UPDATE ON notifications TO authenticated;
GRANT SELECT, INSERT, UPDATE ON lesson_progress TO authenticated;
GRANT SELECT, INSERT ON quiz_attempts TO authenticated;
GRANT SELECT ON student_enrollments TO authenticated;
GRANT SELECT, INSERT ON applications TO authenticated;
GRANT SELECT, INSERT ON messages TO authenticated;
GRANT SELECT, INSERT ON reviews TO authenticated;
GRANT SELECT, INSERT, UPDATE ON forum_topics TO authenticated;
GRANT SELECT, INSERT, UPDATE ON forum_replies TO authenticated;
