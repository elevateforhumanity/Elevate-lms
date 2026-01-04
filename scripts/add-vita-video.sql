-- =============================================
-- Update VITA Course with Your Custom Video
-- Replace placeholder videos with your actual video
-- =============================================

-- Update all lessons to use your video
UPDATE lessons
SET video_url = 'https://ai.invideo.io/watch/mDgPo5Ba1GH'
WHERE course_id IN (
  SELECT id FROM courses WHERE code = 'VITA101'
);

-- Verify the update
SELECT 
  l.idx,
  l.title,
  l.video_url
FROM lessons l
JOIN courses c ON c.id = l.course_id
WHERE c.code = 'VITA101'
ORDER BY l.idx;
