import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  Users,
  MessageSquare,
  Calendar,
  Award,
  Trophy,
  BookOpen,
  Video,
  Flame,
  Star,
  Bell,
  Settings,
  Search,
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Zap,
} from 'lucide-react';
import { Gamification } from '@/components/Gamification';
import { Leaderboard } from '@/components/Leaderboard';
import { StudyGroups } from '@/components/StudyGroups';
import { DiscussionForum } from '@/components/DiscussionForum';

export const metadata: Metadata = {
  title: 'Community Hub | Elevate For Humanity',
  description: 'Your all-in-one community hub. Connect with learners, join discussions, track progress, and level up your skills.',
};

export const dynamic = 'force-dynamic';

export default async function CommunityHubPage() {
  const supabase = await createClient();
  
  if (!supabase) {
    redirect('/login');
  }

  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login?redirect=/hub');
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch user stats
  const [
    { data: achievements },
    { data: streak },
  ] = await Promise.all([
    supabase.from('achievements').select('*').eq('user_id', user.id).order('earned_at', { ascending: false }).limit(5),
    supabase.from('daily_streaks').select('*').eq('user_id', user.id).single(),
  ]);

  // Fetch community stats
  const { count: memberCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true });

  // Fetch recent activity
  const { data: recentPosts } = await supabase
    .from('forum_threads')
    .select('*, profiles(full_name, avatar_url)')
    .order('created_at', { ascending: false })
    .limit(5);

  // Fetch upcoming events
  const { data: upcomingEvents } = await supabase
    .from('events')
    .select('*')
    .gte('start_date', new Date().toISOString())
    .order('start_date', { ascending: true })
    .limit(3);

  const userPoints = profile?.points || 0;
  const userLevel = Math.floor(userPoints / 100) + 1;
  const pointsToNextLevel = 100 - (userPoints % 100);
  const currentStreak = streak?.current_streak || 0;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/hub" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl text-slate-900">Elevate Hub</span>
              </Link>
              
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/hub" className="text-slate-900 font-medium">Community</Link>
                <Link href="/hub/classroom" className="text-slate-600 hover:text-slate-900">Classroom</Link>
                <Link href="/hub/calendar" className="text-slate-600 hover:text-slate-900">Calendar</Link>
                <Link href="/hub/members" className="text-slate-600 hover:text-slate-900">Members</Link>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <Link href="/settings" className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg">
                <Settings className="w-5 h-5" />
              </Link>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                {profile?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar - User Profile & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="h-20 bg-gradient-to-r from-green-500 to-emerald-600"></div>
              <div className="px-6 pb-6">
                <div className="relative -mt-10 mb-4">
                  <div className="w-20 h-20 rounded-full border-4 border-white bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                    {profile?.full_name?.charAt(0) || 'U'}
                  </div>
                </div>
                <h2 className="text-xl font-bold text-slate-900">{profile?.full_name || 'Learner'}</h2>
                <p className="text-slate-500 text-sm">{profile?.role || 'Student'}</p>
                
                {/* Level Progress */}
                <div className="mt-4 p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">Level {userLevel}</span>
                    <span className="text-xs text-slate-500">{pointsToNextLevel} pts to next</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                      style={{ width: `${(userPoints % 100)}%` }}
                    />
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="text-center p-2 bg-slate-50 rounded-lg">
                    <div className="text-lg font-bold text-slate-900">{userPoints}</div>
                    <div className="text-xs text-slate-500">Points</div>
                  </div>
                  <div className="text-center p-2 bg-slate-50 rounded-lg">
                    <div className="text-lg font-bold text-slate-900 flex items-center justify-center gap-1">
                      <Flame className="w-4 h-4 text-orange-500" />
                      {currentStreak}
                    </div>
                    <div className="text-xs text-slate-500">Streak</div>
                  </div>
                  <div className="text-center p-2 bg-slate-50 rounded-lg">
                    <div className="text-lg font-bold text-slate-900">{achievements?.length || 0}</div>
                    <div className="text-xs text-slate-500">Badges</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4">
              <nav className="space-y-1">
                <Link href="/hub" className="flex items-center gap-3 px-3 py-2 text-slate-900 bg-slate-100 rounded-lg font-medium">
                  <MessageSquare className="w-5 h-5" />
                  Feed
                </Link>
                <Link href="/hub/classroom" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
                  <BookOpen className="w-5 h-5" />
                  Classroom
                </Link>
                <Link href="/hub/calendar" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
                  <Calendar className="w-5 h-5" />
                  Calendar
                </Link>
                <Link href="/hub/members" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
                  <Users className="w-5 h-5" />
                  Members
                </Link>
                <Link href="/hub/leaderboard" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
                  <Trophy className="w-5 h-5" />
                  Leaderboard
                </Link>
                <Link href="/hub/about" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
                  <Star className="w-5 h-5" />
                  About
                </Link>
              </nav>
            </div>

            {/* Community Stats */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Community</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Members</span>
                  <span className="font-semibold text-slate-900">{memberCount?.toLocaleString() || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Online Now</span>
                  <span className="font-semibold text-green-600">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    {Math.floor((memberCount || 0) * 0.05)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium flex-shrink-0">
                  {profile?.full_name?.charAt(0) || 'U'}
                </div>
                <div className="flex-1">
                  <textarea
                    placeholder="Share something with the community..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows={3}
                  />
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg">
                        <Video className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg">
                        <Calendar className="w-5 h-5" />
                      </button>
                    </div>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="space-y-4">
              {recentPosts && recentPosts.length > 0 ? (
                recentPosts.map((post: any) => (
                  <div key={post.id} className="bg-white rounded-2xl border border-slate-200 p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium flex-shrink-0">
                        {post.profiles?.full_name?.charAt(0) || 'U'}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-semibold text-slate-900">{post.profiles?.full_name || 'Member'}</span>
                            <span className="text-slate-500 text-sm ml-2">
                              {new Date(post.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <button className="p-1 text-slate-400 hover:text-slate-600">
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                        </div>
                        <h3 className="font-semibold text-slate-900 mt-2">{post.title}</h3>
                        <p className="text-slate-600 mt-1">{post.content?.substring(0, 200)}...</p>
                        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-100">
                          <button className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition">
                            <Heart className="w-5 h-5" />
                            <span className="text-sm">{post.likes || 0}</span>
                          </button>
                          <button className="flex items-center gap-2 text-slate-500 hover:text-blue-500 transition">
                            <MessageCircle className="w-5 h-5" />
                            <span className="text-sm">{post.reply_count || 0}</span>
                          </button>
                          <button className="flex items-center gap-2 text-slate-500 hover:text-green-500 transition">
                            <Share2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-medium flex-shrink-0">
                        E
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <span className="font-semibold text-slate-900">Elevate Team</span>
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full ml-2">Admin</span>
                        </div>
                        <h3 className="font-semibold text-slate-900 mt-2">Welcome to the Elevate Community!</h3>
                        <p className="text-slate-600 mt-1">
                          This is your space to connect with fellow learners, share your progress, ask questions, 
                          and celebrate wins together. Introduce yourself below!
                        </p>
                        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-100">
                          <button className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition">
                            <Heart className="w-5 h-5" />
                            <span className="text-sm">24</span>
                          </button>
                          <button className="flex items-center gap-2 text-slate-500 hover:text-blue-500 transition">
                            <MessageCircle className="w-5 h-5" />
                            <span className="text-sm">12</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-medium flex-shrink-0">
                        S
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <span className="font-semibold text-slate-900">Sarah M.</span>
                          <span className="text-slate-500 text-sm ml-2">2 hours ago</span>
                        </div>
                        <p className="text-slate-600 mt-2">
                          Just completed my CNA certification! Thank you to everyone who supported me through this journey. 
                          The study groups here were incredibly helpful!
                        </p>
                        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-100">
                          <button className="flex items-center gap-2 text-red-500">
                            <Heart className="w-5 h-5 fill-current" />
                            <span className="text-sm">47</span>
                          </button>
                          <button className="flex items-center gap-2 text-slate-500 hover:text-blue-500 transition">
                            <MessageCircle className="w-5 h-5" />
                            <span className="text-sm">8</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Discussion Forum Section */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900">Recent Discussions</h3>
                <Link href="/community/discussions" className="text-green-600 hover:text-green-700 text-sm font-medium">
                  View All
                </Link>
              </div>
              <DiscussionForum />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Leaderboard */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Top Learners
                </h3>
                <Link href="/hub/leaderboard" className="text-green-600 hover:text-green-700 text-sm">
                  View All
                </Link>
              </div>
              <Leaderboard />
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  Upcoming Events
                </h3>
                <Link href="/hub/calendar" className="text-green-600 hover:text-green-700 text-sm">
                  View All
                </Link>
              </div>
              <div className="space-y-3">
                {upcomingEvents && upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event: any) => (
                    <div key={event.id} className="p-3 bg-slate-50 rounded-xl">
                      <h4 className="font-medium text-slate-900 text-sm">{event.title}</h4>
                      <p className="text-xs text-slate-500 mt-1">
                        {new Date(event.start_date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <h4 className="font-medium text-slate-900 text-sm">Weekly Study Session</h4>
                      <p className="text-xs text-slate-500 mt-1">Tomorrow at 7:00 PM</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <h4 className="font-medium text-slate-900 text-sm">Career Workshop</h4>
                      <p className="text-xs text-slate-500 mt-1">Sat, Jan 25 at 10:00 AM</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <h4 className="font-medium text-slate-900 text-sm">Q&A with Industry Expert</h4>
                      <p className="text-xs text-slate-500 mt-1">Mon, Jan 27 at 6:00 PM</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Study Groups */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-500" />
                  Study Groups
                </h3>
                <Link href="/community/groups" className="text-green-600 hover:text-green-700 text-sm">
                  Browse
                </Link>
              </div>
              <StudyGroups />
            </div>

            {/* Gamification Progress */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-orange-500" />
                  Your Progress
                </h3>
              </div>
              <Gamification />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
