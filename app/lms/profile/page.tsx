'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Bell, 
  Lock, 
  CreditCard,
  Award,
  BookOpen,
  Save,
  Camera
} from 'lucide-react';

// Mock user data
const userData = {
  profile: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60601',
    bio: 'Aspiring barber passionate about learning new techniques and building a successful career in the beauty industry.',
    avatar: null,
  },
  notifications: {
    emailCourseUpdates: true,
    emailNewContent: true,
    emailCertificates: true,
    emailPromotions: false,
    pushCourseReminders: true,
    pushAssignmentDue: true,
    pushNewMessages: true,
  },
  enrollments: [
    { id: 1, courseName: 'Barber Fundamentals', status: 'completed', enrolledDate: '2024-09-01' },
    { id: 2, courseName: 'CNA Certification Prep', status: 'active', enrolledDate: '2024-10-15' },
    { id: 3, courseName: 'HVAC Technician Training', status: 'active', enrolledDate: '2024-11-01' },
  ],
  certificates: [
    { id: 1, name: 'Barber Fundamentals Certificate', issueDate: '2024-11-05', credentialId: 'CERT-2024-001' },
  ],
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(userData.profile);
  const [notifications, setNotifications] = useState(userData.notifications);
  const [isSaving, setIsSaving] = useState(false);

  const handleProfileChange = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications({ ...notifications, [field]: value });
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    // Show success message (in production, use toast notification)
    alert('Profile updated successfully!');
  };

  const handleSaveNotifications = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert('Notification preferences updated!');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">My Profile</h1>
              <p className="text-muted-foreground mt-1">
                Manage your account settings and preferences
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/lms/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="enrollments">
              <BookOpen className="h-4 w-4 mr-2" />
              Enrollments
            </TabsTrigger>
            <TabsTrigger value="certificates">
              <Award className="h-4 w-4 mr-2" />
              Certificates
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Upload */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                      {profile.avatar ? (
                        <img src={profile.avatar} alt="Avatar" className="h-24 w-24 rounded-full object-cover" />
                      ) : (
                        <User className="h-12 w-12 text-primary" />
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full p-0"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="font-semibold">{profile.firstName} {profile.lastName}</h3>
                    <p className="text-sm text-muted-foreground">{profile.email}</p>
                    <Button variant="link" className="h-auto p-0 mt-1">
                      Change profile photo
                    </Button>
                  </div>
                </div>

                {/* Name Fields */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) => handleProfileChange('firstName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) => handleProfileChange('lastName', e.target.value)}
                    />
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      <Mail className="inline h-4 w-4 mr-1" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      <Phone className="inline h-4 w-4 mr-1" />
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => handleProfileChange('phone', e.target.value)}
                    />
                  </div>
                </div>

                {/* Address Fields */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      Street Address
                    </Label>
                    <Input
                      id="address"
                      value={profile.address}
                      onChange={(e) => handleProfileChange('address', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={profile.city}
                        onChange={(e) => handleProfileChange('city', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={profile.state}
                        onChange={(e) => handleProfileChange('state', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={profile.zipCode}
                        onChange={(e) => handleProfileChange('zipCode', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    rows={4}
                    value={profile.bio}
                    onChange={(e) => handleProfileChange('bio', e.target.value)}
                    placeholder="Tell us about yourself..."
                  />
                  <p className="text-xs text-muted-foreground">
                    Brief description for your profile. Max 500 characters.
                  </p>
                </div>

                <Button onClick={handleSaveProfile} disabled={isSaving}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </CardContent>
            </Card>

            {/* Security Card */}
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>
                  Manage your password and security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Password</p>
                      <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                    </div>
                  </div>
                  <Button variant="outline">Change Password</Button>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods Card */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Manage your payment methods for course purchases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">No payment methods added</p>
                      <p className="text-sm text-muted-foreground">Add a payment method to purchase courses</p>
                    </div>
                  </div>
                  <Button variant="outline">Add Payment Method</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>
                  Choose what email notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailCourseUpdates">Course Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails about updates to your enrolled courses
                    </p>
                  </div>
                  <Switch
                    id="emailCourseUpdates"
                    checked={notifications.emailCourseUpdates}
                    onCheckedChange={(checked) => handleNotificationChange('emailCourseUpdates', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNewContent">New Content</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when new lessons or materials are added
                    </p>
                  </div>
                  <Switch
                    id="emailNewContent"
                    checked={notifications.emailNewContent}
                    onCheckedChange={(checked) => handleNotificationChange('emailNewContent', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailCertificates">Certificates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails when you earn new certificates
                    </p>
                  </div>
                  <Switch
                    id="emailCertificates"
                    checked={notifications.emailCertificates}
                    onCheckedChange={(checked) => handleNotificationChange('emailCertificates', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailPromotions">Promotions</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive promotional emails and special offers
                    </p>
                  </div>
                  <Switch
                    id="emailPromotions"
                    checked={notifications.emailPromotions}
                    onCheckedChange={(checked) => handleNotificationChange('emailPromotions', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Push Notifications</CardTitle>
                <CardDescription>
                  Manage push notifications for the mobile app
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="pushCourseReminders">Course Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Reminders to continue your learning
                    </p>
                  </div>
                  <Switch
                    id="pushCourseReminders"
                    checked={notifications.pushCourseReminders}
                    onCheckedChange={(checked) => handleNotificationChange('pushCourseReminders', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="pushAssignmentDue">Assignment Due</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications when assignments are due soon
                    </p>
                  </div>
                  <Switch
                    id="pushAssignmentDue"
                    checked={notifications.pushAssignmentDue}
                    onCheckedChange={(checked) => handleNotificationChange('pushAssignmentDue', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="pushNewMessages">New Messages</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications for new messages from instructors
                    </p>
                  </div>
                  <Switch
                    id="pushNewMessages"
                    checked={notifications.pushNewMessages}
                    onCheckedChange={(checked) => handleNotificationChange('pushNewMessages', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Button onClick={handleSaveNotifications} disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save Preferences'}
            </Button>
          </TabsContent>

          {/* Enrollments Tab */}
          <TabsContent value="enrollments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Enrollments</CardTitle>
                <CardDescription>
                  View and manage your course enrollments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.enrollments.map((enrollment) => (
                    <div
                      key={enrollment.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <BookOpen className="h-8 w-8 text-primary" />
                        <div>
                          <h3 className="font-semibold">{enrollment.courseName}</h3>
                          <p className="text-sm text-muted-foreground">
                            Enrolled: {new Date(enrollment.enrolledDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={enrollment.status === 'completed' ? 'default' : 'secondary'}>
                          {enrollment.status === 'completed' ? 'Completed' : 'Active'}
                        </Badge>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/lms/courses/${enrollment.id}`}>
                            {enrollment.status === 'completed' ? 'Review' : 'Continue'}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Certificates</CardTitle>
                <CardDescription>
                  View and download your earned certificates
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userData.certificates.length > 0 ? (
                  <div className="space-y-4">
                    {userData.certificates.map((cert) => (
                      <div
                        key={cert.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <Award className="h-8 w-8 text-primary" />
                          <div>
                            <h3 className="font-semibold">{cert.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Issued: {new Date(cert.issueDate).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Credential ID: {cert.credentialId}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href="/lms/certificates">View All</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Award className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">No certificates earned yet</p>
                    <Button variant="link" asChild className="mt-2">
                      <Link href="/lms/courses">Browse Courses</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
