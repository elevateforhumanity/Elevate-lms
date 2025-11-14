'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LMSNav from '@/components/lms/LMSNav';
import { 
  MessageSquare,
  Send,
  Search,
  Reply,
  Trash2,
  User,
  Clock,
  Loader2
} from 'lucide-react';

type Message = {
  id: string;
  subject: string;
  body: string;
  read: boolean;
  created_at: string;
  courseName?: string;
  sender: {
    id: string;
    email: string;
    profiles: {
      full_name: string;
    };
  };
  recipient: {
    id: string;
    email: string;
    profiles: {
      full_name: string;
    };
  };
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sentMessages, setSentMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showCompose, setShowCompose] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);
  
  // Compose form state
  const [composeTo, setComposeTo] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');

  // Fetch messages on mount
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      
      // Fetch inbox
      const inboxRes = await fetch('/api/messages?type=inbox');
      const inboxData = await inboxRes.json();
      
      // Fetch sent
      const sentRes = await fetch('/api/messages?type=sent');
      const sentData = await sentRes.json();
      
      setMessages(inboxData.messages || []);
      setSentMessages(sentData.messages || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (messageId: string) => {
    try {
      await fetch(`/api/messages/${messageId}`, {
        method: 'PATCH',
      });
      
      // Update local state
      setMessages(messages.map(m => 
        m.id === messageId ? { ...m, read: true } : m
      ));
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const handleSendReply = async () => {
    if (!selectedMessage || !replyText.trim()) return;
    
    try {
      setSending(true);
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientId: selectedMessage.sender.id,
          subject: `Re: ${selectedMessage.subject}`,
          messageBody: replyText,
        }),
      });
      
      setReplyText('');
      setSelectedMessage(null);
      fetchMessages(); // Refresh messages
    } catch (error) {
      console.error('Error sending reply:', error);
      alert('Failed to send reply');
    } finally {
      setSending(false);
    }
  };

  const handleSendMessage = async () => {
    if (!composeTo.trim() || !composeSubject.trim() || !composeBody.trim()) {
      alert('Please fill in all fields');
      return;
    }
    
    try {
      setSending(true);
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientId: composeTo,
          subject: composeSubject,
          messageBody: composeBody,
        }),
      });
      
      setShowCompose(false);
      setComposeTo('');
      setComposeSubject('');
      setComposeBody('');
      fetchMessages(); // Refresh messages
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    try {
      await fetch(`/api/messages/${messageId}`, {
        method: 'DELETE',
      });
      
      setMessages(messages.filter(m => m.id !== messageId));
      setSentMessages(sentMessages.filter(m => m.id !== messageId));
      setSelectedMessage(null);
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Failed to delete message');
    }
  };

  const unreadCount = messages.filter(m => !m.read).length;

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
  };

  const filteredMessages = messages.filter(m => 
    m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.sender?.profiles?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.sender?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSentMessages = sentMessages.filter(m => 
    m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.recipient?.profiles?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.recipient?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <LMSNav />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">Messages</h1>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="text-lg px-3 py-1">
                  {unreadCount} new
                </Badge>
              )}
            </div>
            <Button onClick={() => setShowCompose(true)}>
              <Send className="mr-2 h-4 w-4" />
              New Message
            </Button>
          </div>
          <p className="text-muted-foreground">
            Communicate with your instructors and classmates
          </p>
        </div>

        {/* Compose Message Modal */}
        {showCompose && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">New Message</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowCompose(false)}>
                  Cancel
                </Button>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="to">To</Label>
                  <Input
                    id="to"
                    placeholder="Instructor name or email"
                    value={composeTo}
                    onChange={(e) => setComposeTo(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Message subject"
                    value={composeSubject}
                    onChange={(e) => setComposeSubject(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="body">Message</Label>
                  <Textarea
                    id="body"
                    rows={6}
                    placeholder="Type your message here..."
                    value={composeBody}
                    onChange={(e) => setComposeBody(e.target.value)}
                  />
                </div>
                <Button onClick={handleSendMessage} className="w-full" disabled={sending}>
                  {sending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="mr-2 h-4 w-4" />
                  )}
                  {sending ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="inbox" className="space-y-6">
          <TabsList>
            <TabsTrigger value="inbox">
              Inbox ({messages.length})
            </TabsTrigger>
            <TabsTrigger value="sent">
              Sent ({sentMessages.length})
            </TabsTrigger>
          </TabsList>

          {/* Inbox Tab */}
          <TabsContent value="inbox">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Message List */}
              <div className="lg:col-span-1 space-y-2">
                {filteredMessages.length > 0 ? (
                  filteredMessages.map((message) => (
                    <Card
                      key={message.id}
                      className={`cursor-pointer transition-all ${
                        !message.read ? 'border-l-4 border-l-primary bg-primary/5' : ''
                      } ${selectedMessage?.id === message.id ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => {
                        setSelectedMessage(message);
                        if (!message.read) {
                          handleMarkAsRead(message.id);
                        }
                      }}
                    >
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <User className="h-4 w-4" />
                            </div>
                            <div>
                              <p className={`text-sm font-medium ${!message.read ? 'font-bold' : ''}`}>
                                {message.sender?.profiles?.full_name || message.sender?.email || 'Unknown'}
                              </p>
                              <p className="text-xs text-muted-foreground">Instructor</p>
                            </div>
                          </div>
                          {!message.read && (
                            <div className="h-2 w-2 bg-primary rounded-full" />
                          )}
                        </div>
                        <p className={`text-sm mb-1 ${!message.read ? 'font-semibold' : ''}`}>
                          {message.subject}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                          {message.body.substring(0, 100)}...
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{formatTime(message.created_at)}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                      <p className="text-muted-foreground">No messages found</p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Message Detail */}
              <div className="lg:col-span-2">
                {selectedMessage ? (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        {/* Message Header */}
                        <div>
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="h-6 w-6" />
                              </div>
                              <div>
                                <p className="font-semibold">{selectedMessage.sender?.profiles?.full_name || selectedMessage.sender?.email || 'Unknown'}</p>
                                <p className="text-sm text-muted-foreground">Instructor</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteMessage(selectedMessage.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <h2 className="text-2xl font-bold mb-2">{selectedMessage.subject}</h2>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {formatTime(selectedMessage.created_at)}
                            </span>
                            <span>{selectedMessage.courseName}</span>
                          </div>
                        </div>

                        {/* Message Body */}
                        <div className="p-4 bg-secondary rounded-lg">
                          <p className="text-sm whitespace-pre-wrap">{selectedMessage.body}</p>
                        </div>

                        {/* Reply Section */}
                        <div className="space-y-4">
                          <h3 className="font-semibold flex items-center gap-2">
                            <Reply className="h-4 w-4" />
                            Reply
                          </h3>
                          <Textarea
                            rows={4}
                            placeholder="Type your reply..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                          />
                          <Button onClick={handleSendReply} disabled={!replyText.trim() || sending}>
                            {sending ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              <Send className="mr-2 h-4 w-4" />
                            )}
                            {sending ? 'Sending...' : 'Send Reply'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="py-24 text-center">
                      <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                      <p className="text-muted-foreground">Select a message to read</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Sent Tab */}
          <TabsContent value="sent">
            <div className="space-y-2">
              {filteredSentMessages.length > 0 ? (
                filteredSentMessages.map((message) => (
                  <Card key={message.id}>
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">To: {message.recipient?.profiles?.full_name || message.recipient?.email || 'Unknown'}</p>
                            <p className="text-xs text-muted-foreground">Instructor</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteMessage(message.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm font-semibold mb-1">{message.subject}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                        {message.body.substring(0, 100)}...
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{formatTime(message.created_at)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Send className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">No sent messages</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
