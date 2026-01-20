      8 -- High priority for new blog posts
    );
    
    -- Schedule posts for each active platform
    post_time := NOW() + INTERVAL '1 hour';
    
    FOR platform_name IN 
      SELECT platform FROM social_media_accounts WHERE is_active = true
    LOOP
      INSERT INTO social_media_posts (
        platform,
        post_type,
        title,
        content,
        media_url,
        blog_post_id,
        scheduled_for,
        status
      ) VALUES (
        platform_name,
        'link',
        NEW.title,
        COALESCE(NEW.excerpt, LEFT(NEW.content, 280)) || ' Read more: https://elevateforhumanity.org/blog/' || NEW.slug,
        NEW.featured_image,
        NEW.id,
        post_time,
        'scheduled'
      );
      
      -- Stagger posts by 30 minutes per platform
      post_time := post_time + INTERVAL '30 minutes';
    END LOOP;
    
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for blog publishing
DROP TRIGGER IF EXISTS blog_publish_social_trigger ON blog_posts;
CREATE TRIGGER blog_publish_social_trigger
  AFTER INSERT OR UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION auto_post_blog_to_social();

-- Function: Schedule 3x daily posts
CREATE OR REPLACE FUNCTION schedule_daily_social_posts(target_date DATE DEFAULT CURRENT_DATE)
RETURNS TABLE(posts_scheduled INTEGER) AS $$
DECLARE
  morning_time TIMESTAMPTZ;
  afternoon_time TIMESTAMPTZ;
  evening_time TIMESTAMPTZ;
  platform_rec RECORD;
  content_rec RECORD;
  posts_count INTEGER := 0;
BEGIN
  -- Set posting times (EST)
  morning_time := target_date + INTERVAL '9 hours';
  afternoon_time := target_date + INTERVAL '13 hours';
  evening_time := target_date + INTERVAL '18 hours';
  
  -- For each active platform
  FOR platform_rec IN 
    SELECT platform FROM social_media_accounts WHERE is_active = true
  LOOP
    
    -- Morning post
    SELECT * INTO content_rec
    FROM social_media_content_queue
    WHERE is_active = true
    ORDER BY priority DESC, used_count ASC, RANDOM()
    LIMIT 1;
    
    IF FOUND THEN
      INSERT INTO social_media_posts (
        platform,
        post_type,
        title,
        content,
        media_url,
        scheduled_for,
        status
      ) VALUES (
        platform_rec.platform,
        CASE WHEN content_rec.media_url IS NOT NULL THEN 'image' ELSE 'text' END,
        content_rec.title,
        content_rec.content,
        content_rec.media_url,
        morning_time,
        'scheduled'
      );
      
      UPDATE social_media_content_queue
      SET used_count = used_count + 1, last_used_at = NOW()
      WHERE id = content_rec.id;
      
      posts_count := posts_count + 1;
    END IF;
    
    -- Afternoon post
    SELECT * INTO content_rec
    FROM social_media_content_queue
    WHERE is_active = true AND id != content_rec.id
    ORDER BY priority DESC, used_count ASC, RANDOM()
    LIMIT 1;
    
    IF FOUND THEN
      INSERT INTO social_media_posts (
        platform,
        post_type,
        title,
        content,
        media_url,
        scheduled_for,
        status
      ) VALUES (
        platform_rec.platform,
        CASE WHEN content_rec.media_url IS NOT NULL THEN 'image' ELSE 'text' END,
        content_rec.title,
        content_rec.content,
        content_rec.media_url,
        afternoon_time,
        'scheduled'
      );
      
      UPDATE social_media_content_queue
      SET used_count = used_count + 1, last_used_at = NOW()
      WHERE id = content_rec.id;
      
      posts_count := posts_count + 1;
    END IF;
    
    -- Evening post
    SELECT * INTO content_rec
    FROM social_media_content_queue
    WHERE is_active = true AND id != content_rec.id
    ORDER BY priority DESC, used_count ASC, RANDOM()
    LIMIT 1;
    
    IF FOUND THEN
      INSERT INTO social_media_posts (
        platform,
        post_type,
        title,
        content,
        media_url,
        scheduled_for,
        status
      ) VALUES (
        platform_rec.platform,
        CASE WHEN content_rec.media_url IS NOT NULL THEN 'image' ELSE 'text' END,
        content_rec.title,
        content_rec.content,
        content_rec.media_url,
        evening_time,
        'scheduled'
      );
      
      UPDATE social_media_content_queue
      SET used_count = used_count + 1, last_used_at = NOW()
      WHERE id = content_rec.id;
      
      posts_count := posts_count + 1;
    END IF;
    
  END LOOP;
  
  RETURN QUERY SELECT posts_count;
END;
$$ LANGUAGE plpgsql;

-- Function: Update analytics
CREATE OR REPLACE FUNCTION update_social_analytics(
  p_platform TEXT,
  p_date DATE,
  p_followers INTEGER DEFAULT NULL,
  p_posts INTEGER DEFAULT NULL,
  p_likes INTEGER DEFAULT NULL,
  p_shares INTEGER DEFAULT NULL,
  p_comments INTEGER DEFAULT NULL,
  p_reach INTEGER DEFAULT NULL,
  p_impressions INTEGER DEFAULT NULL
)
RETURNS void AS $$
BEGIN
  INSERT INTO social_media_analytics (
    platform,
    date,
    followers_count,
    posts_count,
    likes_count,
    shares_count,
    comments_count,
    reach,
    impressions
  ) VALUES (
    p_platform,
    p_date,
    COALESCE(p_followers, 0),
    COALESCE(p_posts, 0),
    COALESCE(p_likes, 0),
    COALESCE(p_shares, 0),
    COALESCE(p_comments, 0),
    COALESCE(p_reach, 0),
    COALESCE(p_impressions, 0)
  )
  ON CONFLICT (platform, date) DO UPDATE SET
    followers_count = COALESCE(p_followers, social_media_analytics.followers_count),
    posts_count = COALESCE(p_posts, social_media_analytics.posts_count),
    likes_count = COALESCE(p_likes, social_media_analytics.likes_count),
    shares_count = COALESCE(p_shares, social_media_analytics.shares_count),
    comments_count = COALESCE(p_comments, social_media_analytics.comments_count),
    reach = COALESCE(p_reach, social_media_analytics.reach),
    impressions = COALESCE(p_impressions, social_media_analytics.impressions);
END;
$$ LANGUAGE plpgsql;

-- Seed initial social media accounts
INSERT INTO social_media_accounts (platform, account_name, account_url, is_active) VALUES
  ('linkedin', 'Elevate for Humanity', 'https://linkedin.com/company/elevateforhumanity', true),
  ('facebook', 'Elevate for Humanity', 'https://facebook.com/elevateforhumanity', true),
  ('youtube', 'Elevate for Humanity', 'https://youtube.com/@elevateforhumanity', true)
ON CONFLICT (platform) DO NOTHING;

-- Seed initial content queue with sample posts
INSERT INTO social_media_content_queue (content_type, title, content, priority) VALUES
  ('tip', 'Career Success Tip', 'Start your career transformation today. Our programs are designed to get you job-ready fast. #CareerDevelopment #Training', 7),
  ('announcement', 'Free Training Available', 'Did you know? Many of our programs are available with WIOA funding. Start learning at no cost to you. Apply today! #FreeTraining #WIOA', 8),
  ('tip', 'Skills That Matter', 'Employers are looking for skilled workers. Get certified in high-demand fields like healthcare, trades, and technology. #SkillsDevelopment', 6),
  ('success_story', 'Student Success', 'Our graduates are thriving in their new careers. Join them and transform your future. #SuccessStory #CareerChange', 7),
  ('announcement', 'Now Enrolling', 'New cohorts starting soon! Explore our programs and find the right path for you. #Enrollment #Training', 8)
ON CONFLICT DO NOTHING;

-- Grant permissions
GRANT ALL ON social_media_accounts TO authenticated;
GRANT ALL ON social_media_posts TO authenticated;
GRANT ALL ON social_media_analytics TO authenticated;
GRANT ALL ON social_media_content_queue TO authenticated;

-- Comments
COMMENT ON TABLE social_media_accounts IS 'Social media platform accounts for automation';
COMMENT ON TABLE social_media_posts IS 'Scheduled and posted social media content';
COMMENT ON TABLE social_media_analytics IS 'Daily analytics for each platform';
COMMENT ON TABLE social_media_content_queue IS 'Content pool for automated posting';
COMMENT ON FUNCTION auto_post_blog_to_social() IS 'Automatically create social posts when blog is published';
COMMENT ON FUNCTION schedule_daily_social_posts(DATE) IS 'Schedule 3 posts per day per platform';
COMMENT ON FUNCTION update_social_analytics(TEXT, DATE, INTEGER, INTEGER, INTEGER, INTEGER, INTEGER, INTEGER, INTEGER) IS 'Update daily analytics for a platform';


-- 20251226_staff_training_system.sql
-- Staff Training System
-- Tables for training modules and staff progress tracking

-- Training Modules Table
CREATE TABLE IF NOT EXISTS training_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  duration INTEGER, -- in minutes
  quiz_questions JSONB DEFAULT '[]'::jsonb,
  required BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Staff Training Progress Table
CREATE TABLE IF NOT EXISTS staff_training_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES training_modules(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ,
  quiz_score INTEGER,
  certification_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, module_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_training_modules_required ON training_modules(required);
CREATE INDEX IF NOT EXISTS idx_training_modules_order ON training_modules(order_index);
CREATE INDEX IF NOT EXISTS idx_staff_training_progress_user ON staff_training_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_staff_training_progress_module ON staff_training_progress(module_id);

-- RLS
ALTER TABLE training_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_training_progress ENABLE ROW LEVEL SECURITY;

-- Anyone can view training modules
CREATE POLICY "Anyone can view training modules"
  ON training_modules FOR SELECT
  USING (true);

-- Admin can manage training modules
CREATE POLICY "Admin can manage training modules"
  ON training_modules FOR ALL
  USING (
