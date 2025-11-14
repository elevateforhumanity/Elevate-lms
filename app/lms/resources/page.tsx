'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LMSNav from '@/components/lms/LMSNav';
import { 
  FileText,
  Download,
  Search,
  File,
  Video,
  Image,
  Archive,
  BookOpen,
  ExternalLink
} from 'lucide-react';

// Mock resources data
const resources = [
  {
    id: 1,
    title: 'Barber Fundamentals Handbook',
    description: 'Complete guide to barbering techniques and best practices',
    type: 'pdf',
    size: '2.4 MB',
    course: 'Barber Fundamentals',
    courseId: 1,
    uploadedDate: '2024-09-01',
    downloads: 45,
  },
  {
    id: 2,
    title: 'Hair Cutting Techniques Video Tutorial',
    description: 'Step-by-step video demonstrations of advanced cutting techniques',
    type: 'video',
    size: '156 MB',
    course: 'Barber Fundamentals',
    courseId: 1,
    uploadedDate: '2024-09-15',
    downloads: 32,
  },
  {
    id: 3,
    title: 'CNA Skills Checklist',
    description: 'Comprehensive checklist of all required CNA skills',
    type: 'pdf',
    size: '850 KB',
    course: 'CNA Certification Prep',
    courseId: 2,
    uploadedDate: '2024-10-01',
    downloads: 67,
  },
  {
    id: 4,
    title: 'Vital Signs Reference Chart',
    description: 'Quick reference guide for normal vital sign ranges',
    type: 'pdf',
    size: '1.2 MB',
    course: 'CNA Certification Prep',
    courseId: 2,
    uploadedDate: '2024-10-05',
    downloads: 89,
  },
  {
    id: 5,
    title: 'Patient Care Procedures Manual',
    description: 'Detailed procedures for common patient care tasks',
    type: 'pdf',
    size: '3.8 MB',
    course: 'CNA Certification Prep',
    courseId: 2,
    uploadedDate: '2024-10-10',
    downloads: 54,
  },
  {
    id: 6,
    title: 'HVAC Safety Guidelines',
    description: 'Essential safety procedures for HVAC technicians',
    type: 'pdf',
    size: '1.5 MB',
    course: 'HVAC Technician Training',
    courseId: 3,
    uploadedDate: '2024-11-01',
    downloads: 28,
  },
  {
    id: 7,
    title: 'Refrigerant Handling Guide',
    description: 'Best practices for safe refrigerant handling and disposal',
    type: 'pdf',
    size: '2.1 MB',
    course: 'HVAC Technician Training',
    courseId: 3,
    uploadedDate: '2024-11-03',
    downloads: 22,
  },
  {
    id: 8,
    title: 'HVAC System Diagrams',
    description: 'Collection of common HVAC system diagrams and schematics',
    type: 'zip',
    size: '8.4 MB',
    course: 'HVAC Technician Training',
    courseId: 3,
    uploadedDate: '2024-11-05',
    downloads: 19,
  },
  {
    id: 9,
    title: 'Troubleshooting Flowcharts',
    description: 'Step-by-step flowcharts for diagnosing common HVAC issues',
    type: 'pdf',
    size: '1.8 MB',
    course: 'HVAC Technician Training',
    courseId: 3,
    uploadedDate: '2024-11-08',
    downloads: 15,
  },
];

const getFileIcon = (type: string) => {
  switch (type) {
    case 'pdf':
      return <FileText className="h-8 w-8 text-red-600" />;
    case 'video':
      return <Video className="h-8 w-8 text-purple-600" />;
    case 'image':
      return <Image className="h-8 w-8 text-blue-600" />;
    case 'zip':
      return <Archive className="h-8 w-8 text-yellow-600" />;
    default:
      return <File className="h-8 w-8 text-gray-600" />;
  }
};

const getFileTypeBadge = (type: string) => {
  const colors: Record<string, string> = {
    pdf: 'bg-red-100 text-red-700 border-red-200',
    video: 'bg-purple-100 text-purple-700 border-purple-200',
    image: 'bg-blue-100 text-blue-700 border-blue-200',
    zip: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  };
  
  return (
    <Badge variant="outline" className={colors[type] || 'bg-gray-100 text-gray-700 border-gray-200'}>
      {type.toUpperCase()}
    </Badge>
  );
};

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');

  const courses = Array.from(new Set(resources.map(r => r.course)));

  const filteredResources = resources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.course.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCourse = selectedCourse === 'all' || resource.course === selectedCourse;
    
    return matchesSearch && matchesCourse;
  });

  const handleDownload = (resourceId: number) => {
    alert(`Downloading resource ${resourceId}...`);
  };

  return (
    <div className="min-h-screen bg-background">
      <LMSNav />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Course Resources</h1>
          <p className="text-muted-foreground">
            Access and download course materials, handbooks, and supplementary resources
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{resources.length}</div>
              <p className="text-xs text-muted-foreground">
                Across all courses
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {resources.reduce((sum, r) => sum + r.downloads, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                By all students
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">File Types</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(resources.map(r => r.type)).size}
              </div>
              <p className="text-xs text-muted-foreground">
                Different formats
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs value={selectedCourse} onValueChange={setSelectedCourse}>
            <TabsList>
              <TabsTrigger value="all">All Courses</TabsTrigger>
              {courses.map(course => (
                <TabsTrigger key={course} value={course}>
                  {course}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Resources Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-3 bg-secondary rounded-lg">
                      {getFileIcon(resource.type)}
                    </div>
                    {getFileTypeBadge(resource.type)}
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span>Course:</span>
                      <Link 
                        href={`/lms/courses/${resource.courseId}`}
                        className="text-primary hover:underline"
                      >
                        {resource.course}
                      </Link>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Size:</span>
                      <span>{resource.size}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Downloads:</span>
                      <span>{resource.downloads}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Uploaded:</span>
                      <span>{new Date(resource.uploadedDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleDownload(resource.id)}
                    className="w-full"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No resources found</h3>
              <p className="text-muted-foreground">
                {searchQuery 
                  ? 'Try adjusting your search terms'
                  : 'No resources available for this course yet'}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              If you're having trouble accessing or downloading resources, please contact your instructor or visit our help center.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" asChild>
                <Link href="/lms/help">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Help Center
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/lms/support">
                  Contact Support
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
