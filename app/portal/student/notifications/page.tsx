'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bell, Check, Trash2, BookOpen, Calendar, Award, MessageSquare, AlertCircle } from 'lucide-react';

const mockNotifications = [
  { id: 1, type: 'assignment', title: 'New Assignment Posted', message: 'Patient Care Assessment is due Jan 22', time: '2 hours ago', read: false },
  { id: 2, type: 'grade', title: 'Quiz Graded', message: 'You scored 92% on Patient Safety Quiz', time: '5 hours ago', read: false },
  { id: 3, type: 'reminder', title: 'Class Tomorrow', message: 'Clinical Skills Lab at 9:00 AM', time: 'Yesterday', read: false },
  { id: 4, type: 'achievement', title: 'Badge Earned!', message: 'You earned the "Quick Learner" badge', time: '2 days ago', read: true },
  { id: 5, type: 'message', title: 'Message from Instructor', message: 'Great work on your last assignment!', time: '3 days ago', read: true },
  { id: 6, type: 'system', title: 'Schedule Updated', message: 'Your class schedule has been updated', time: '1 week ago', read: true },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'assignment': return <BookOpen className="w-5 h-5 text-blue-600" />;
    case 'grade': return <Award className="w-5 h-5 text-green-600" />;
    case 'reminder': return <Calendar className="w-5 h-5 text-orange-600" />;
    case 'achievement': return <Award className="w-5 h-5 text-purple-600" />;
    case 'message': return <MessageSquare className="w-5 h-5 text-blue-600" />;
    default: return <AlertCircle className="w-5 h-5 text-gray-600" />;
  }
};

export default function StudentNotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filtered = filter === 'all' ? notifications : filter === 'unread' ? notifications.filter(n => !n.read) : notifications.filter(n => n.type === filter);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600">{unreadCount} unread</p>
            </div>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllAsRead} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Mark all as read
            </button>
          )}
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['all', 'unread', 'assignment', 'grade', 'reminder', 'message'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${filter === f ? 'bg-blue-600 text-white' : 'bg-white border text-gray-600 hover:bg-gray-50'}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border divide-y">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No notifications</p>
            </div>
          ) : (
            filtered.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 flex items-start gap-4 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50/50' : ''}`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${!notification.read ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-600 mt-0.5">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {!notification.read && (
                        <button onClick={() => markAsRead(notification.id)} className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded">
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button onClick={() => deleteNotification(notification.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
