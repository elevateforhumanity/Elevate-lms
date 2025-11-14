'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createBrowserClient } from '@supabase/ssr';
import { Plus, Edit, Trash2, ArrowLeft, GripVertical, Save } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface Props {
  params: {
    id: string;
  };
}

export default function CourseContentPage({ params }: Props) {
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<any>(null);
  const [modules, setModules] = useState<any[]>([]);
  const [showModuleForm, setShowModuleForm] = useState(false);
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [selectedModule, setSelectedModule] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    content_type: 'text',
    duration_minutes: 30,
    is_required: true,
  });
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  useEffect(() => {
    loadCourse();
  }, []);

  const loadCourse = async () => {
    try {
      // Fetch course
      const { data: courseData } = await supabase
        .from('courses')
        .select(`
          id,
          title,
          programs (
            name
          )
        `)
        .eq('id', params.id)
        .single();

      setCourse(courseData);

      // Fetch modules with lessons
      const { data: modulesData } = await supabase
        .from('modules')
        .select(`
          id,
          title,
          description,
          order_index,
          lessons (
            id,
            title,
            description,
            content_type,
            duration_minutes,
            order_index,
            is_required
          )
        `)
        .eq('course_id', params.id)
        .order('order_index', { ascending: true });

      setModules(modulesData || []);
      setLoading(false);
    } catch (error) {
      console.error('Error loading course:', error);
      setLoading(false);
    }
  };

  const handleCreateModule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('modules')
        .insert({
          course_id: parseInt(params.id),
          title: formData.title,
          description: formData.description,
          order_index: modules.length,
        });

      if (error) throw error;

      setShowModuleForm(false);
      setFormData({ title: '', description: '', content: '', content_type: 'text', duration_minutes: 30, is_required: true });
      loadCourse();
    } catch (error) {
      console.error('Error creating module:', error);
      alert('Failed to create module');
    }
  };

  const handleCreateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedModule) return;

    try {
      const { error } = await supabase
        .from('lessons')
        .insert({
          module_id: selectedModule.id,
          title: formData.title,
          description: formData.description,
          content: formData.content,
          content_type: formData.content_type,
          duration_minutes: formData.duration_minutes,
          is_required: formData.is_required,
          order_index: selectedModule.lessons?.length || 0,
        });

      if (error) throw error;

      setShowLessonForm(false);
      setSelectedModule(null);
      setFormData({ title: '', description: '', content: '', content_type: 'text', duration_minutes: 30, is_required: true });
      loadCourse();
    } catch (error) {
      console.error('Error creating lesson:', error);
      alert('Failed to create lesson');
    }
  };

  const handleDeleteModule = async (moduleId: number) => {
    if (!confirm('Delete this module and all its lessons?')) return;

    try {
      const { error } = await supabase
        .from('modules')
        .delete()
        .eq('id', moduleId);

      if (error) throw error;
      loadCourse();
    } catch (error) {
      console.error('Error deleting module:', error);
      alert('Failed to delete module');
    }
  };

  const handleDeleteLesson = async (lessonId: number) => {
    if (!confirm('Delete this lesson?')) return;

    try {
      const { error } = await supabase
        .from('lessons')
        .delete()
        .eq('id', lessonId);

      if (error) throw error;
      loadCourse();
    } catch (error) {
      console.error('Error deleting lesson:', error);
      alert('Failed to delete lesson');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <span>Elevate for Humanity</span>
        </div>
        <Link href="/admin/courses" className="text-gray-700 hover:text-red-600 font-medium flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Courses
        </Link>
      </header>

      <main className="elevate-container py-8">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="text-sm text-gray-500 mb-2">{course?.programs?.name}</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{course?.title}</h1>
            <p className="text-gray-600">Manage course modules and lessons</p>
          </div>

          {/* Add Module Button */}
          <div className="mb-6">
            <button
              onClick={() => setShowModuleForm(true)}
              className="elevate-btn-primary flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Module
            </button>
          </div>

          {/* Module Form */}
          {showModuleForm && (
            <div className="elevate-card mb-6">
              <h3 className="font-bold text-gray-900 mb-4">Create New Module</h3>
              <form onSubmit={handleCreateModule} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Module Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="elevate-input w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="elevate-textarea w-full"
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="elevate-btn-primary">
                    Create Module
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModuleForm(false);
                      setFormData({ title: '', description: '', content: '', content_type: 'text', duration_minutes: 30, is_required: true });
                    }}
                    className="elevate-btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Lesson Form */}
          {showLessonForm && selectedModule && (
            <div className="elevate-card mb-6">
              <h3 className="font-bold text-gray-900 mb-4">
                Add Lesson to: {selectedModule.title}
              </h3>
              <form onSubmit={handleCreateLesson} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Lesson Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="elevate-input w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="elevate-textarea w-full"
                    rows={2}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">Content Type *</label>
                    <select
                      value={formData.content_type}
                      onChange={(e) => setFormData({ ...formData, content_type: e.target.value })}
                      className="elevate-select w-full"
                    >
                      <option value="text">Text/HTML</option>
                      <option value="video">Video</option>
                      <option value="document">Document</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Duration (minutes) *</label>
                    <input
                      type="number"
                      value={formData.duration_minutes}
                      onChange={(e) => setFormData({ ...formData, duration_minutes: parseInt(e.target.value) })}
                      className="elevate-input w-full"
                      min="1"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Content</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="elevate-textarea w-full"
                    rows={6}
                    placeholder="Enter lesson content, video URL, or document URL"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_required"
                    checked={formData.is_required}
                    onChange={(e) => setFormData({ ...formData, is_required: e.target.checked })}
                    className="rounded"
                  />
                  <label htmlFor="is_required" className="text-sm font-medium">
                    Required lesson
                  </label>
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="elevate-btn-primary">
                    Create Lesson
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowLessonForm(false);
                      setSelectedModule(null);
                      setFormData({ title: '', description: '', content: '', content_type: 'text', duration_minutes: 30, is_required: true });
                    }}
                    className="elevate-btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Modules List */}
          <div className="space-y-4">
            {modules.length > 0 ? (
              modules.map((module, moduleIndex) => (
                <div key={module.id} className="elevate-card">
                  {/* Module Header */}
                  <div className="flex items-start justify-between mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-start gap-3">
                      <GripVertical className="h-5 w-5 text-gray-400 mt-1" />
                      <div>
                        <div className="text-sm font-bold text-gray-500 mb-1">
                          Module {moduleIndex + 1}
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg">{module.title}</h3>
                        {module.description && (
                          <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedModule(module);
                          setShowLessonForm(true);
                        }}
                        className="elevate-btn-secondary text-xs flex items-center gap-1"
                      >
                        <Plus className="h-3 w-3" />
                        Add Lesson
                      </button>
                      <button
                        onClick={() => handleDeleteModule(module.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Lessons */}
                  <div className="space-y-2">
                    {module.lessons && module.lessons.length > 0 ? (
                      module.lessons.map((lesson: any, lessonIndex: number) => (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-3">
                            <GripVertical className="h-4 w-4 text-gray-400" />
                            <div>
                              <div className="font-medium text-gray-900">
                                {lessonIndex + 1}. {lesson.title}
                              </div>
                              <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                <span className="capitalize">{lesson.content_type}</span>
                                <span>{lesson.duration_minutes} min</span>
                                {lesson.is_required && (
                                  <span className="elevate-pill elevate-pill--danger text-xs">
                                    Required
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteLesson(lesson.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-gray-500 text-sm">
                        No lessons yet. Click "Add Lesson" to create one.
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="elevate-card text-center py-12">
                <h3 className="font-bold text-gray-900 mb-2">No Modules Yet</h3>
                <p className="text-gray-600 mb-4">
                  Start building your course by adding modules and lessons.
                </p>
                <button
                  onClick={() => setShowModuleForm(true)}
                  className="elevate-btn-primary flex items-center gap-2 mx-auto"
                >
                  <Plus className="h-4 w-4" />
                  Add First Module
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
