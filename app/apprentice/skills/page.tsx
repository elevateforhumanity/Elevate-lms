// @ts-nocheck
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  CheckCircle, 
  Circle, 
  Clock, 
  Award,
  ChevronDown,
  ChevronRight,
  Star,
  Scissors,
  Sparkles,
} from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  description: string;
  min_demonstrations: number;
  demonstrations_count: number;
  status: 'not_started' | 'in_progress' | 'demonstrated' | 'verified';
  verified_at?: string;
}

interface SkillCategory {
  id: string;
  name: string;
  description: string;
  required_for_completion: boolean;
  skills: Skill[];
}

export default function PracticalSkillsPage() {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [programSlug, setProgramSlug] = useState('barber-apprenticeship');

  useEffect(() => {
    fetchSkills();
  }, [programSlug]);

  async function fetchSkills() {
    setLoading(true);
    try {
      const res = await fetch(`/api/apprentice/skills?program=${programSlug}`);
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || []);
        // Expand first category by default
        if (data.categories?.length > 0) {
          setExpandedCategories(new Set([data.categories[0].id]));
        }
      }
    } catch (error) {
      console.error('Failed to fetch skills:', error);
    } finally {
      setLoading(false);
    }
  }

  function toggleCategory(categoryId: string) {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  }

  // Calculate overall progress
  const totalSkills = categories.reduce((sum, cat) => sum + cat.skills.length, 0);
  const verifiedSkills = categories.reduce(
    (sum, cat) => sum + cat.skills.filter(s => s.status === 'verified').length, 
    0
  );
  const demonstratedSkills = categories.reduce(
    (sum, cat) => sum + cat.skills.filter(s => s.status === 'demonstrated' || s.status === 'verified').length, 
    0
  );
  const overallProgress = totalSkills > 0 ? (verifiedSkills / totalSkills) * 100 : 0;

  function getStatusIcon(status: string) {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'demonstrated':
        return <Star className="w-5 h-5 text-amber-500" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <Circle className="w-5 h-5 text-slate-300" />;
    }
  }

  function getStatusBadge(status: string) {
    switch (status) {
      case 'verified':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Verified</span>;
      case 'demonstrated':
        return <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">Awaiting Verification</span>;
      case 'in_progress':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">In Progress</span>;
      default:
        return <span className="px-2 py-1 bg-slate-100 text-slate-500 text-xs font-semibold rounded-full">Not Started</span>;
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-slate-200 rounded w-1/3"></div>
            <div className="h-4 bg-slate-200 rounded w-2/3"></div>
            <div className="h-32 bg-slate-200 rounded"></div>
            <div className="h-32 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-black flex items-center gap-3">
              <Scissors className="w-8 h-8 text-purple-600" />
              Practical Skills
            </h1>
            <p className="text-slate-600 mt-1">
              Track your hands-on competencies and get verified by your mentor
            </p>
          </div>
          <Link
            href="/lms/progress"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            ← Back to Progress
          </Link>
        </div>

        {/* Overall Progress Card */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Skills Progress</h2>
              <p className="text-purple-100">
                {verifiedSkills} of {totalSkills} skills verified
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-black">{overallProgress.toFixed(0)}%</div>
              <div className="text-purple-100">Complete</div>
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-4">
            <div
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-3 text-sm text-purple-100">
            <span>{demonstratedSkills} demonstrated</span>
            <span>{totalSkills - demonstratedSkills} remaining</span>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Circle className="w-4 h-4 text-slate-300" />
              <span className="text-slate-600">Not Started</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-slate-600">In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500" />
              <span className="text-slate-600">Demonstrated (Awaiting Verification)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-slate-600">Verified by Mentor</span>
            </div>
          </div>
        </div>

        {/* Skill Categories */}
        <div className="space-y-4">
          {categories.map((category) => {
            const isExpanded = expandedCategories.has(category.id);
            const categoryVerified = category.skills.filter(s => s.status === 'verified').length;
            const categoryTotal = category.skills.length;
            const categoryProgress = categoryTotal > 0 ? (categoryVerified / categoryTotal) * 100 : 0;

            return (
              <div key={category.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      categoryProgress === 100 ? 'bg-green-100' : 'bg-purple-100'
                    }`}>
                      {categoryProgress === 100 ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Sparkles className="w-5 h-5 text-purple-600" />
                      )}
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-black">{category.name}</h3>
                      <p className="text-sm text-slate-500">
                        {categoryVerified}/{categoryTotal} skills verified
                        {category.required_for_completion && (
                          <span className="ml-2 text-red-500">• Required</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-full rounded-full transition-all ${
                          categoryProgress === 100 ? 'bg-green-500' : 'bg-purple-500'
                        }`}
                        style={{ width: `${categoryProgress}%` }}
                      />
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Skills List */}
                {isExpanded && (
                  <div className="border-t border-slate-200">
                    {category.skills.map((skill, index) => (
                      <div
                        key={skill.id}
                        className={`p-4 flex items-center justify-between ${
                          index !== category.skills.length - 1 ? 'border-b border-slate-100' : ''
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          {getStatusIcon(skill.status)}
                          <div>
                            <div className="font-medium text-black">{skill.name}</div>
                            {skill.description && (
                              <div className="text-sm text-slate-500">{skill.description}</div>
                            )}
                            <div className="text-xs text-slate-400 mt-1">
                              {skill.demonstrations_count}/{skill.min_demonstrations} demonstrations
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {/* Progress dots */}
                          <div className="flex gap-1">
                            {Array.from({ length: skill.min_demonstrations }).map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full ${
                                  i < skill.demonstrations_count
                                    ? skill.status === 'verified'
                                      ? 'bg-green-500'
                                      : 'bg-purple-500'
                                    : 'bg-slate-200'
                                }`}
                              />
                            ))}
                          </div>
                          {getStatusBadge(skill.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-blue-900 mb-2">How Skills Verification Works</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800 text-sm">
            <li><strong>Practice</strong> - Work on each skill during your OJT hours at the shop</li>
            <li><strong>Demonstrate</strong> - Show your mentor you can perform the skill correctly</li>
            <li><strong>Get Verified</strong> - Your mentor marks the skill as verified in the system</li>
            <li><strong>Complete All</strong> - All required skills must be verified before state board exam</li>
          </ol>
          <p className="mt-4 text-sm text-blue-700">
            <strong>Note:</strong> Your mentor/supervisor will verify skills as you demonstrate proficiency. 
            Ask them to log into the mentor portal to update your progress.
          </p>
        </div>

        {/* State Board Readiness */}
        {overallProgress === 100 && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white text-center">
            <Award className="w-12 h-12 mx-auto mb-3" />
            <h2 className="text-2xl font-bold mb-2">All Skills Verified!</h2>
            <p className="text-green-100">
              You have demonstrated proficiency in all required practical skills.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
