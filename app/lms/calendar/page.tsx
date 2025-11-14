'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LMSNav from '@/components/lms/LMSNav';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  FileText, 
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Mock calendar events
const events = [
  {
    id: 1,
    title: 'Module 3 Quiz Due',
    course: 'CNA Certification Prep',
    type: 'assignment',
    date: '2024-11-15',
    time: '23:59',
    status: 'upcoming',
    priority: 'high',
  },
  {
    id: 2,
    title: 'Live Session: HVAC Safety',
    course: 'HVAC Technician Training',
    type: 'live-session',
    date: '2024-11-16',
    time: '14:00',
    status: 'upcoming',
    priority: 'medium',
  },
  {
    id: 3,
    title: 'Final Exam',
    course: 'Barber Fundamentals',
    type: 'exam',
    date: '2024-11-18',
    time: '10:00',
    status: 'upcoming',
    priority: 'high',
  },
  {
    id: 4,
    title: 'Assignment: Safety Procedures',
    course: 'HVAC Technician Training',
    type: 'assignment',
    date: '2024-11-20',
    time: '23:59',
    status: 'upcoming',
    priority: 'medium',
  },
  {
    id: 5,
    title: 'Module 2 Quiz',
    course: 'CNA Certification Prep',
    type: 'quiz',
    date: '2024-11-12',
    time: '23:59',
    status: 'completed',
    priority: 'medium',
  },
  {
    id: 6,
    title: 'Live Q&A Session',
    course: 'Barber Fundamentals',
    type: 'live-session',
    date: '2024-11-10',
    time: '15:00',
    status: 'completed',
    priority: 'low',
  },
];

const getEventIcon = (type: string) => {
  switch (type) {
    case 'live-session':
      return <Video className="h-5 w-5" />;
    case 'assignment':
      return <FileText className="h-5 w-5" />;
    case 'quiz':
    case 'exam':
      return <CheckCircle className="h-5 w-5" />;
    default:
      return <CalendarIcon className="h-5 w-5" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'border-l-red-500 bg-red-50 dark:bg-red-950';
    case 'medium':
      return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950';
    default:
      return 'border-l-blue-500 bg-blue-50 dark:bg-blue-950';
  }
};

const getDaysUntil = (dateStr: string) => {
  const eventDate = new Date(dateStr);
  const today = new Date();
  const diffTime = eventDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return 'Past';
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  return `In ${diffDays} days`;
};

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedView, setSelectedView] = useState<'month' | 'list'>('list');

  const upcomingEvents = events.filter(e => e.status === 'upcoming').sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const completedEvents = events.filter(e => e.status === 'completed').sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const todayEvents = upcomingEvents.filter(e => getDaysUntil(e.date) === 'Today');
  const thisWeekEvents = upcomingEvents.filter(e => {
    const days = getDaysUntil(e.date);
    return days !== 'Today' && days !== 'Past' && !days.includes('In') || (days.includes('In') && parseInt(days.split(' ')[1]) <= 7);
  });

  return (
    <div className="min-h-screen bg-background">
      <LMSNav />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Calendar</h1>
          <p className="text-muted-foreground">
            View all your upcoming deadlines, assignments, and live sessions
          </p>
        </div>

        {/* View Toggle */}
        <div className="mb-6">
          <Tabs value={selectedView} onValueChange={(v) => setSelectedView(v as 'month' | 'list')}>
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="month">Month View</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {selectedView === 'list' ? (
          <div className="space-y-8">
            {/* Today's Events */}
            {todayEvents.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                  Due Today
                </h2>
                <div className="space-y-3">
                  {todayEvents.map((event) => (
                    <Card key={event.id} className={`border-l-4 ${getPriorityColor(event.priority)}`}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="p-2 bg-background rounded-lg">
                              {getEventIcon(event.type)}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">{event.title}</h3>
                              <p className="text-sm text-muted-foreground">{event.course}</p>
                              <div className="flex items-center gap-4 mt-2 text-sm">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {event.time}
                                </span>
                                <Badge variant={event.priority === 'high' ? 'destructive' : 'secondary'}>
                                  {event.priority} priority
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <Button size="sm">View Details</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* This Week */}
            <section>
              <h2 className="text-2xl font-bold mb-4">This Week</h2>
              <div className="space-y-3">
                {thisWeekEvents.map((event) => (
                  <Card key={event.id} className={`border-l-4 ${getPriorityColor(event.priority)}`}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="p-2 bg-background rounded-lg">
                            {getEventIcon(event.type)}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{event.title}</h3>
                            <p className="text-sm text-muted-foreground">{event.course}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm">
                              <span className="flex items-center gap-1">
                                <CalendarIcon className="h-4 w-4" />
                                {new Date(event.date).toLocaleDateString('en-US', { 
                                  weekday: 'short', 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {event.time}
                              </span>
                              <Badge variant="outline">{getDaysUntil(event.date)}</Badge>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">View Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Upcoming (Beyond This Week) */}
            {upcomingEvents.filter(e => {
              const days = getDaysUntil(e.date);
              return days.includes('In') && parseInt(days.split(' ')[1]) > 7;
            }).length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Upcoming</h2>
                <div className="space-y-3">
                  {upcomingEvents.filter(e => {
                    const days = getDaysUntil(e.date);
                    return days.includes('In') && parseInt(days.split(' ')[1]) > 7;
                  }).map((event) => (
                    <Card key={event.id} className="border-l-4 border-l-gray-300">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="p-2 bg-background rounded-lg">
                              {getEventIcon(event.type)}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">{event.title}</h3>
                              <p className="text-sm text-muted-foreground">{event.course}</p>
                              <div className="flex items-center gap-4 mt-2 text-sm">
                                <span className="flex items-center gap-1">
                                  <CalendarIcon className="h-4 w-4" />
                                  {new Date(event.date).toLocaleDateString('en-US', { 
                                    month: 'long', 
                                    day: 'numeric' 
                                  })}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {event.time}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">View Details</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Completed */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Completed</h2>
              <div className="space-y-3">
                {completedEvents.map((event) => (
                  <Card key={event.id} className="opacity-60">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{event.title}</h3>
                            <p className="text-sm text-muted-foreground">{event.course}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <span>
                                Completed on {new Date(event.date).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <CalendarIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Month view calendar coming soon</p>
                <p className="text-sm mt-2">Use list view to see all your events</p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
