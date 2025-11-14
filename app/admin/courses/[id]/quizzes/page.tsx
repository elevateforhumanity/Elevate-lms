'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { Plus, Edit, Trash2, ArrowLeft, FileQuestion, Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface Props {
  params: {
    id: string;
  };
}

export default function CourseQuizzesPage({ params }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<any>(null);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    passing_score: 70,
    time_limit_minutes: 30,
    max_attempts: 3,
    is_required: true,
  });
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
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

      // Fetch quizzes with question count
      const { data: quizzesData } = await supabase
        .from('quizzes')
        .select(`
          id,
          title,
          description,
          passing_score,
          time_limit_minutes,
          max_attempts,
          is_required,
          created_at
        `)
        .eq('course_id', params.id)
        .order('created_at', { ascending: false });

      // Get question counts for each quiz
      if (quizzesData) {
        const quizzesWithCounts = await Promise.all(
          quizzesData.map(async (quiz) => {
            const { count } = await supabase
              .from('quiz_questions')
              .select('*', { count: 'exact', head: true })
              .eq('quiz_id', quiz.id);
            
            return { ...quiz, questionCount: count || 0 };
          })
        );
        setQuizzes(quizzesWithCounts);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  };

  const handleCreateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('quizzes')
        .insert({
          course_id: parseInt(params.id),
          title: formData.title,
          description: formData.description,
          passing_score: formData.passing_score,
          time_limit_minutes: formData.time_limit_minutes,
          max_attempts: formData.max_attempts,
          is_required: formData.is_required,
        })
        .select()
        .single();

      if (error) throw error;

      setShowQuizForm(false);
      setFormData({
        title: '',
        description: '',
        passing_score: 70,
        time_limit_minutes: 30,
        max_attempts: 3,
        is_required: true,
      });

      // Navigate to quiz questions page
      router.push(`/admin/courses/${params.id}/quizzes/${data.id}/questions`);
    } catch (error) {
      console.error('Error creating quiz:', error);
      alert('Failed to create quiz');
    }
  };

  const handleDeleteQuiz = async (quizId: number) => {
    if (!confirm('Delete this quiz and all its questions?')) return;

    try {
      const { error } = await supabase
        .from('quizzes')
        .delete()
        .eq('id', quizId);

      if (error) throw error;
      loadData();
    } catch (error) {
      console.error('Error deleting quiz:', error);
      alert('Failed to delete quiz');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quizzes...</p>
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
            <p className="text-gray-600">Manage course quizzes and assessments</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setShowQuizForm(true)}
              className="elevate-btn-primary flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Quiz
            </button>
            <Link
              href={`/admin/courses/${params.id}/content`}
              className="elevate-btn-secondary"
            >
              Manage Content
            </Link>
          </div>

          {/* Quiz Form */}
          {showQuizForm && (
            <div className="elevate-card mb-6">
              <h3 className="font-bold text-gray-900 mb-4">Create New Quiz</h3>
              <form onSubmit={handleCreateQuiz} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Quiz Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="elevate-input w-full"
                    placeholder="e.g., Module 1 Assessment"
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
                    placeholder="Brief description of what this quiz covers"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Passing Score (%) *</label>
                    <input
                      type="number"
                      value={formData.passing_score}
                      onChange={(e) => setFormData({ ...formData, passing_score: parseInt(e.target.value) })}
                      className="elevate-input w-full"
                      min="0"
                      max="100"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Time Limit (minutes)</label>
                    <input
                      type="number"
                      value={formData.time_limit_minutes}
                      onChange={(e) => setFormData({ ...formData, time_limit_minutes: parseInt(e.target.value) })}
                      className="elevate-input w-full"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Max Attempts *</label>
                    <input
                      type="number"
                      value={formData.max_attempts}
                      onChange={(e) => setFormData({ ...formData, max_attempts: parseInt(e.target.value) })}
                      className="elevate-input w-full"
                      min="1"
                      required
                    />
                  </div>
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
                    Required for course completion
                  </label>
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="elevate-btn-primary">
                    Create Quiz & Add Questions
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowQuizForm(false);
                      setFormData({
                        title: '',
                        description: '',
                        passing_score: 70,
                        time_limit_minutes: 30,
                        max_attempts: 3,
                        is_required: true,
                      });
                    }}
                    className="elevate-btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Quizzes List */}
          <div className="space-y-4">
            {quizzes.length > 0 ? (
              quizzes.map((quiz) => (
                <div key={quiz.id} className="elevate-card hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-gray-900 text-lg">{quiz.title}</h3>
                        {quiz.is_required && (
                          <span className="elevate-pill elevate-pill--danger text-xs">
                            Required
                          </span>
                        )}
                      </div>
                      {quiz.description && (
                        <p className="text-sm text-gray-600 mb-3">{quiz.description}</p>
                      )}
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <FileQuestion className="h-4 w-4" />
                          <span>{quiz.questionCount} questions</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{quiz.time_limit_minutes} min</span>
                        </div>
                        <span>Passing: {quiz.passing_score}%</span>
                        <span>Max attempts: {quiz.max_attempts}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/courses/${params.id}/quizzes/${quiz.id}/questions`}
                        className="elevate-btn-secondary text-xs flex items-center gap-1"
                      >
                        <Edit className="h-3 w-3" />
                        Manage Questions
                      </Link>
                      <button
                        onClick={() => handleDeleteQuiz(quiz.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="elevate-card text-center py-12">
                <FileQuestion className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">No Quizzes Yet</h3>
                <p className="text-gray-600 mb-4">
                  Create quizzes to assess student learning and track progress.
                </p>
                <button
                  onClick={() => setShowQuizForm(true)}
                  className="elevate-btn-primary flex items-center gap-2 mx-auto"
                >
                  <Plus className="h-4 w-4" />
                  Create First Quiz
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
