'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createBrowserClient } from '@supabase/ssr';
import { Plus, Trash2, ArrowLeft, GripVertical, Save } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface Props {
  params: {
    id: string;
    quizId: string;
  };
}

export default function QuizQuestionsPage({ params }: Props) {
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [formData, setFormData] = useState({
    question_text: '',
    question_type: 'multiple_choice',
    points: 1,
    options: ['', '', '', ''],
    correct_answer: '',
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
      // Fetch quiz
      const { data: quizData } = await supabase
        .from('quizzes')
        .select(`
          id,
          title,
          courses (
            id,
            title
          )
        `)
        .eq('id', params.quizId)
        .single();

      setQuiz(quizData);

      // Fetch questions
      const { data: questionsData } = await supabase
        .from('quiz_questions')
        .select('*')
        .eq('quiz_id', params.quizId)
        .order('order_index', { ascending: true });

      setQuestions(questionsData || []);
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  };

  const handleCreateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('quiz_questions')
        .insert({
          quiz_id: parseInt(params.quizId),
          question_text: formData.question_text,
          question_type: formData.question_type,
          options: formData.question_type === 'multiple_choice' || formData.question_type === 'true_false' 
            ? formData.options.filter(o => o.trim() !== '') 
            : null,
          correct_answer: formData.correct_answer,
          points: formData.points,
          order_index: questions.length,
        });

      if (error) throw error;

      setShowQuestionForm(false);
      setFormData({
        question_text: '',
        question_type: 'multiple_choice',
        points: 1,
        options: ['', '', '', ''],
        correct_answer: '',
      });
      loadData();
    } catch (error) {
      console.error('Error creating question:', error);
      alert('Failed to create question');
    }
  };

  const handleDeleteQuestion = async (questionId: number) => {
    if (!confirm('Delete this question?')) return;

    try {
      const { error } = await supabase
        .from('quiz_questions')
        .delete()
        .eq('id', questionId);

      if (error) throw error;
      loadData();
    } catch (error) {
      console.error('Error deleting question:', error);
      alert('Failed to delete question');
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const addOption = () => {
    setFormData({ ...formData, options: [...formData.options, ''] });
  };

  const removeOption = (index: number) => {
    const newOptions = formData.options.filter((_, i) => i !== index);
    setFormData({ ...formData, options: newOptions });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading questions...</p>
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
        <Link 
          href={`/admin/courses/${params.id}/quizzes`} 
          className="text-gray-700 hover:text-red-600 font-medium flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Quizzes
        </Link>
      </header>

      <main className="elevate-container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="text-sm text-gray-500 mb-2">{quiz?.courses?.title}</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{quiz?.title}</h1>
            <p className="text-gray-600">Manage quiz questions and answers</p>
          </div>

          {/* Add Question Button */}
          <div className="mb-6">
            <button
              onClick={() => setShowQuestionForm(true)}
              className="elevate-btn-primary flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Question
            </button>
          </div>

          {/* Question Form */}
          {showQuestionForm && (
            <div className="elevate-card mb-6">
              <h3 className="font-bold text-gray-900 mb-4">Create New Question</h3>
              <form onSubmit={handleCreateQuestion} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Question Type *</label>
                  <select
                    value={formData.question_type}
                    onChange={(e) => {
                      const type = e.target.value;
                      setFormData({
                        ...formData,
                        question_type: type,
                        options: type === 'true_false' ? ['True', 'False'] : ['', '', '', ''],
                        correct_answer: '',
                      });
                    }}
                    className="elevate-select w-full"
                  >
                    <option value="multiple_choice">Multiple Choice</option>
                    <option value="true_false">True/False</option>
                    <option value="short_answer">Short Answer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Question Text *</label>
                  <textarea
                    value={formData.question_text}
                    onChange={(e) => setFormData({ ...formData, question_text: e.target.value })}
                    className="elevate-textarea w-full"
                    rows={3}
                    placeholder="Enter your question here"
                    required
                  />
                </div>

                {/* Multiple Choice Options */}
                {formData.question_type === 'multiple_choice' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Answer Options *</label>
                    <div className="space-y-2">
                      {formData.options.map((option, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="correct_answer"
                            checked={formData.correct_answer === option}
                            onChange={() => setFormData({ ...formData, correct_answer: option })}
                            className="flex-shrink-0"
                          />
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => updateOption(index, e.target.value)}
                            className="elevate-input flex-1"
                            placeholder={`Option ${index + 1}`}
                            required
                          />
                          {formData.options.length > 2 && (
                            <button
                              type="button"
                              onClick={() => removeOption(index)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={addOption}
                      className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      + Add Option
                    </button>
                    <p className="text-xs text-gray-500 mt-2">
                      Select the radio button next to the correct answer
                    </p>
                  </div>
                )}

                {/* True/False Options */}
                {formData.question_type === 'true_false' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Correct Answer *</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="correct_answer"
                          value="True"
                          checked={formData.correct_answer === 'True'}
                          onChange={(e) => setFormData({ ...formData, correct_answer: e.target.value })}
                          required
                        />
                        <span>True</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="correct_answer"
                          value="False"
                          checked={formData.correct_answer === 'False'}
                          onChange={(e) => setFormData({ ...formData, correct_answer: e.target.value })}
                        />
                        <span>False</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Short Answer */}
                {formData.question_type === 'short_answer' && (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Correct Answer (or keywords) *
                    </label>
                    <input
                      type="text"
                      value={formData.correct_answer}
                      onChange={(e) => setFormData({ ...formData, correct_answer: e.target.value })}
                      className="elevate-input w-full"
                      placeholder="Enter the correct answer or keywords"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      For short answer questions, manual grading may be required
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-1">Points *</label>
                  <input
                    type="number"
                    value={formData.points}
                    onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) })}
                    className="elevate-input w-32"
                    min="1"
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <button type="submit" className="elevate-btn-primary">
                    Add Question
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowQuestionForm(false);
                      setFormData({
                        question_text: '',
                        question_type: 'multiple_choice',
                        points: 1,
                        options: ['', '', '', ''],
                        correct_answer: '',
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

          {/* Questions List */}
          <div className="space-y-3">
            {questions.length > 0 ? (
              questions.map((question, index) => (
                <div key={question.id} className="elevate-card">
                  <div className="flex items-start gap-3">
                    <GripVertical className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-bold text-gray-500">
                              Question {index + 1}
                            </span>
                            <span className="elevate-pill elevate-pill--info text-xs capitalize">
                              {question.question_type.replace('_', ' ')}
                            </span>
                            <span className="text-sm text-gray-500">
                              {question.points} {question.points === 1 ? 'point' : 'points'}
                            </span>
                          </div>
                          <p className="font-medium text-gray-900 mb-3">{question.question_text}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteQuestion(question.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded flex-shrink-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Display Options */}
                      {question.options && question.options.length > 0 && (
                        <div className="space-y-2">
                          {question.options.map((option: string, optIndex: number) => (
                            <div
                              key={optIndex}
                              className={`flex items-center gap-2 p-2 rounded ${
                                option === question.correct_answer
                                  ? 'bg-green-50 border border-green-200'
                                  : 'bg-gray-50'
                              }`}
                            >
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                option === question.correct_answer
                                  ? 'border-green-600 bg-green-600'
                                  : 'border-gray-300'
                              }`}>
                                {option === question.correct_answer && (
                                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </div>
                              <span className={`text-sm ${
                                option === question.correct_answer
                                  ? 'font-semibold text-green-900'
                                  : 'text-gray-700'
                              }`}>
                                {option}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Short Answer Correct Answer */}
                      {question.question_type === 'short_answer' && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded">
                          <div className="text-xs text-green-700 font-semibold mb-1">Correct Answer:</div>
                          <div className="text-sm text-green-900">{question.correct_answer}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="elevate-card text-center py-12">
                <h3 className="font-bold text-gray-900 mb-2">No Questions Yet</h3>
                <p className="text-gray-600 mb-4">
                  Add questions to this quiz to assess student knowledge.
                </p>
                <button
                  onClick={() => setShowQuestionForm(true)}
                  className="elevate-btn-primary flex items-center gap-2 mx-auto"
                >
                  <Plus className="h-4 w-4" />
                  Add First Question
                </button>
              </div>
            )}
          </div>

          {/* Summary */}
          {questions.length > 0 && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-bold text-blue-900 mb-2">Quiz Summary</h3>
              <div className="text-sm text-blue-800 space-y-1">
                <p>• Total Questions: {questions.length}</p>
                <p>• Total Points: {questions.reduce((sum, q) => sum + q.points, 0)}</p>
                <p>• Question Types: {Array.from(new Set(questions.map(q => q.question_type))).join(', ')}</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
