# Skool-Like Community Features

This platform includes a complete set of community and social learning features similar to Skool.

## Feature Overview

### 1. Gamification System
**Components:**
- `components/Gamification.tsx` - Main gamification hub with points, levels, streaks
- `components/Leaderboard.tsx` - Competition leaderboard
- `components/dashboard/GlobalLeaderboard.tsx` - Platform-wide rankings
- `components/AchievementsBadges.tsx` - Achievement display
- `components/dashboard/AchievementsStrip.tsx` - Compact achievements bar
- `components/dashboard/StudentAchievementsWidget.tsx` - Student achievements widget
- `components/dashboard/StudentStreakWidget.tsx` - Daily streak tracker
- `components/Confetti.tsx` - Celebration effects

**Database Tables:**
- `achievements` - Earned achievements
- `daily_streaks` - User streak data
- `points_ledger` - Points transactions
- `leaderboard_cache` - Cached rankings

**Pages:**
- `/community/leaderboard` - Full leaderboard page

### 2. Discussion Forums
**Components:**
- `components/DiscussionForum.tsx` - Main forum component
- `components/forums/ForumList.tsx` - List of forum categories
- `components/forums/ThreadView.tsx` - Thread detail view

**Database Tables:**
- `forum_categories` - Forum categories
- `forum_threads` - Discussion threads
- `forum_posts` - Individual posts
- `forum_reactions` - Likes/reactions

**Pages:**
- `/community/discussions` - Forum listing

### 3. Study Groups
**Components:**
- `components/StudyGroups.tsx` - Study group management
- `components/RealTimeCollaboration.tsx` - Real-time document collaboration

**Database Tables:**
- `study_groups` - Group definitions
- `study_group_members` - Group membership
- `study_group_sessions` - Scheduled sessions

**Pages:**
- `/community/groups` - Browse/create groups

### 4. Peer Learning
**Components:**
- `components/PeerReview.tsx` - Peer review assignments
- `components/PeerReviewSystem.tsx` - Full peer review system
- `components/PeerTutoringMarketplace.tsx` - Find peer tutors

**Database Tables:**
- `peer_reviews` - Review assignments
- `peer_review_submissions` - Submitted reviews
- `tutor_profiles` - Peer tutor listings

### 5. Social Learning Community
**Components:**
- `components/SocialLearningCommunity.tsx` - Full community hub with:
  - Activity feed
  - Member directory
  - Group discussions
  - Resource sharing
  - Events calendar

**Pages:**
- `/community` - Main community hub
- `/community/members` - Member directory
- `/community/events` - Community events

### 6. Communication
**Components:**
- `components/LiveChatSupport.tsx` - Real-time chat
- `components/LiveChatWidget.tsx` - Chat widget
- `components/NotificationCenter.tsx` - Notifications hub
- `components/communication/AnnouncementsSystem.tsx` - System announcements
- `components/SMSNotificationSystem.tsx` - SMS notifications
- `components/EmailCampaignManager.tsx` - Email campaigns

### 7. Referral System
**Components:**
- `components/ReferralDashboard.tsx` - Track referrals and rewards

**Database Tables:**
- `referrals` - Referral tracking
- `referral_rewards` - Earned rewards

### 8. Live Events
**Components:**
- `components/LiveStreamingClassroom.tsx` - Live class streaming
- `components/VideoConferencingIntegration.tsx` - Video calls
- `components/VirtualCareerFair.tsx` - Virtual events

**Pages:**
- `/community/events` - Event calendar

## Integration Points

### Student Dashboard (`/student/dashboard`)
Should include:
- `StudentStreakWidget` - Daily streak
- `StudentAchievementsWidget` - Recent achievements
- `ActivityFeed` - Recent activity
- `GlobalLeaderboard` - Top performers
- `UpcomingCalendar` - Upcoming events

### LMS Dashboard (`/lms/(app)/dashboard`)
Should include:
- `ProgressChart` - Course progress
- `DueSoonList` - Upcoming deadlines
- `CourseCardGrid` - Enrolled courses
- `AchievementsStrip` - Achievement progress

### Community Hub (`/community`)
Already includes:
- Activity feed
- Leaderboard preview
- Group highlights
- Event calendar
- Member spotlight

## Database Schema

```sql
-- Core gamification tables
CREATE TABLE achievements (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  achievement_type VARCHAR(50),
  title VARCHAR(255),
  description TEXT,
  points INTEGER,
  earned_at TIMESTAMPTZ
);

CREATE TABLE daily_streaks (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE
);

CREATE TABLE points_ledger (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  points INTEGER,
  reason VARCHAR(255),
  created_at TIMESTAMPTZ
);

-- Forum tables
CREATE TABLE forum_threads (
  id UUID PRIMARY KEY,
  category_id UUID,
  author_id UUID REFERENCES profiles(id),
  title VARCHAR(255),
  content TEXT,
  is_pinned BOOLEAN DEFAULT false,
  reply_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ
);

-- Study groups
CREATE TABLE study_groups (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  course_id UUID,
  creator_id UUID REFERENCES profiles(id),
  is_public BOOLEAN DEFAULT true,
  max_members INTEGER DEFAULT 10,
  created_at TIMESTAMPTZ
);
```

## Usage Examples

### Adding Gamification to a Page
```tsx
import { Gamification } from '@/components/Gamification';
import { Leaderboard } from '@/components/Leaderboard';
import { StudentStreakWidget } from '@/components/dashboard/StudentStreakWidget';

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2">
        <Gamification userId={user.id} />
      </div>
      <div>
        <StudentStreakWidget userId={user.id} />
        <Leaderboard limit={10} />
      </div>
    </div>
  );
}
```

### Adding Discussion Forum
```tsx
import { DiscussionForum } from '@/components/DiscussionForum';

export default function CoursePage({ courseId }) {
  return (
    <div>
      <h2>Course Discussions</h2>
      <DiscussionForum courseId={courseId} />
    </div>
  );
}
```

### Adding Study Groups
```tsx
import { StudyGroups } from '@/components/StudyGroups';

export default function CommunityPage() {
  return (
    <div>
      <StudyGroups 
        showCreateButton={true}
        filterByCourse={courseId}
      />
    </div>
  );
}
```

## Feature Comparison with Skool

| Feature | Skool | Elevate LMS |
|---------|-------|-------------|
| Leaderboards | ✅ | ✅ `Leaderboard.tsx` |
| Points System | ✅ | ✅ `Gamification.tsx` |
| Achievements | ✅ | ✅ `AchievementsBadges.tsx` |
| Daily Streaks | ✅ | ✅ `StudentStreakWidget.tsx` |
| Discussion Forums | ✅ | ✅ `DiscussionForum.tsx` |
| Study Groups | ✅ | ✅ `StudyGroups.tsx` |
| Live Events | ✅ | ✅ `LiveStreamingClassroom.tsx` |
| Member Directory | ✅ | ✅ `/community/members` |
| Activity Feed | ✅ | ✅ `ActivityFeed.tsx` |
| Direct Messages | ✅ | ✅ `LiveChatWidget.tsx` |
| Course Content | ✅ | ✅ Full LMS |
| Certificates | ❌ | ✅ `CertificateGenerator.tsx` |
| SCORM Support | ❌ | ✅ `SCORMPlayer.tsx` |
| Employer Portal | ❌ | ✅ `/employer-portal` |
| WIOA Compliance | ❌ | ✅ `WIOAComplianceDashboard.tsx` |
