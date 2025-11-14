'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LMSNav from '@/components/lms/LMSNav';
import { 
  Bell,
  CheckCircle,
  Award,
  MessageSquare,
  Video,
  FileText,
  AlertCircle,
  Trash2,
  Check,
  Loader2
} from 'lucide-react';

type Notification = {
  id: string;
  type: string;
  title: string;
  message: string;
  course?: string;
  created_at: string;
  read: boolean;
  priority?: string;
};

// Mock notifications (fallback)
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'assignment',
    title: 'New Assignment Posted',
    message: 'Your instructor has posted a new assignment in HVAC Technician Training',
    course: 'HVAC Technician Training',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
    priority: 'high',
  },
  {
    id: '2',
    type: 'grade',
    title: 'Quiz Graded',
    message: 'Your Module 2 Quiz has been graded. You scored 90%',
    course: 'CNA Certification Prep',
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    read: false,
    priority: 'medium',
  },
  {
    id: '3',
    type: 'certificate',
    title: 'Certificate Earned!',
    message: 'Congratulations! You have earned your Barber Fundamentals certificate',
    course: 'Barber Fundamentals',
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: false,
    priority: 'high',
  },
  {
    id: '4',
    type: 'message',
    title: 'New Message from Instructor',
    message: 'Sarah Johnson sent you a message about your recent assignment',
    course: 'CNA Certification Prep',
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    priority: 'medium',
  },
  {
    id: '5',
    type: 'live-session',
    title: 'Live Session Reminder',
    message: 'HVAC Safety session starts in 24 hours',
    course: 'HVAC Technician Training',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    priority: 'high',
  },
  {
    id: '6',
    type: 'deadline',
    title: 'Assignment Due Soon',
    message: 'Module 3 Quiz is due in 3 days',
    course: 'CNA Certification Prep',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    priority: 'medium',
  },
  {
    id: '7',
    type: 'announcement',
    title: 'Course Update',
    message: 'New learning materials have been added to your course',
    course: 'HVAC Technician Training',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    priority: 'low',
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'assignment':
      return <FileText className="h-5 w-5 text-blue-600" />;
    case 'grade':
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    case 'certificate':
      return <Award className="h-5 w-5 text-yellow-600" />;
    case 'message':
      return <MessageSquare className="h-5 w-5 text-purple-600" />;
    case 'live-session':
      return <Video className="h-5 w-5 text-red-600" />;
    case 'deadline':
      return <AlertCircle className="h-5 w-5 text-orange-600" />;
    default:
      return <Bell className="h-5 w-5 text-gray-600" />;
  }
};

export default function NotificationsPage() {
  const [notificationList, setNotificationList] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      // For now, use analytics events as notifications
      const res = await fetch('/api/analytics/events?limit=50');
      const data = await res.json();
      
      // Transform events into notifications
      const notifications: Notification[] = (data.events || []).map((event: any) => ({
        id: event.id,
        type: event.event_type || 'info',
        title: formatEventTitle(event.event_type),
        message: event.event_data?.message || formatEventMessage(event),
        course: event.event_data?.course_title,
        created_at: event.created_at,
        read: false,
        priority: 'medium'
      }));
      
      setNotificationList(notifications.length > 0 ? notifications : mockNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setNotificationList(mockNotifications);
    } finally {
      setLoading(false);
    }
  };

  const formatEventTitle = (eventType: string) => {
    const titles: Record<string, string> = {
      'course_enrolled': 'Course Enrollment',
      'lesson_completed': 'Lesson Completed',
      'quiz_completed': 'Quiz Completed',
      'certificate_earned': 'Certificate Earned',
      'assignment_submitted': 'Assignment Submitted',
      'message_received': 'New Message'
    };
    return titles[eventType] || 'Notification';
  };

  const formatEventMessage = (event: any) => {
    return event.event_data?.description || 'You have a new notification';
  };

  const unreadCount = notificationList.filter(n => !n.read).length;
  
  const filteredNotifications = filter === 'unread' 
    ? notificationList.filter(n => !n.read)
    : notificationList;

  const markAsRead = (id: string) => {
    setNotificationList(notificationList.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotificationList(notificationList.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotificationList(notificationList.filter(n => n.id !== id));
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <LMSNav />
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-red-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <LMSNav />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">Notifications</h1>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="text-lg px-3 py-1">
                  {unreadCount} new
                </Badge>
              )}
            </div>
            {unreadCount > 0 && (
              <Button onClick={markAllAsRead} variant="outline" size="sm">
                <Check className="h-4 w-4 mr-2" />
                Mark all as read
              </Button>
            )}
          </div>
          <p className="text-muted-foreground">
            Stay updated with your courses, assignments, and messages
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as 'all' | 'unread')}>
            <TabsList>
              <TabsTrigger value="all">
                All Notifications ({notificationList.length})
              </TabsTrigger>
              <TabsTrigger value="unread">
                Unread ({unreadCount})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Notifications List */}
        {filteredNotifications.length > 0 ? (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`transition-all ${
                  !notification.read 
                    ? 'border-l-4 border-l-primary bg-primary/5' 
                    : 'opacity-70'
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`p-3 rounded-lg ${
                      !notification.read ? 'bg-background' : 'bg-secondary'
                    }`}>
                      {getNotificationIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <h3 className={`font-semibold ${
                            !notification.read ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {notification.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="h-2 w-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                        )}
                      </div>

                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-xs text-muted-foreground">
                          {notification.course}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(notification.created_at)}
                        </span>
                        {notification.priority === 'high' && (
                          <Badge variant="destructive" className="text-xs">
                            High Priority
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 flex-shrink-0">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          title="Mark as read"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <Bell className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No notifications</h3>
              <p className="text-muted-foreground">
                {filter === 'unread' 
                  ? "You're all caught up! No unread notifications."
                  : "You don't have any notifications yet."}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Notification Settings */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">Notification Preferences</h3>
                <p className="text-sm text-muted-foreground">
                  Manage how you receive notifications
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/lms/profile">Manage Settings</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
