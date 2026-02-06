'use client';

import { useState } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import Link from 'next/link';
import Image from 'next/image';

type Answer = 'managed' | 'source' | 'either';

interface Question {
  id: string;
  question: string;
  description: string;
  options: {
    text: string;
    points: Answer;
  }[];
}

const questions: Question[] = [
  {
    id: 'it-team',
    question: 'Do you have an IT team that can manage servers and deployments?',
    description: 'Source-use licenses require technical staff to deploy and maintain the platform.',
    options: [
      { text: 'No, we do not have dedicated IT staff', points: 'managed' },
      { text: 'Yes, we have DevOps engineers who manage our infrastructure', points: 'source' },
      { text: 'We have basic IT support but not server management expertise', points: 'managed' },
    ],
  },
  {
    id: 'data-residency',
    question: 'Do you have strict data residency or compliance requirements?',
    description: 'Some organizations must host data on specific servers or in specific locations.',
    options: [
      { text: 'No, standard cloud hosting is fine', points: 'managed' },
      { text: 'Yes, we must host data on our own servers or specific cloud regions', points: 'source' },
      { text: 'We have some compliance needs but can work with a managed provider', points: 'either' },
    ],
  },
  {
    id: 'budget',
    question: 'What is your budget for the platform?',
    description: 'This helps us recommend the right option for your organization.',
    options: [
      { text: 'Monthly subscription ($1,500-$3,500/month)', points: 'managed' },
      { text: 'One-time purchase ($75,000+)', points: 'source' },
      { text: 'We are flexible and want to understand both options', points: 'either' },
    ],
  },
  {
    id: 'timeline',
    question: 'How quickly do you need to launch?',
    description: 'Managed platforms launch faster. Source-use requires deployment time.',
    options: [
      { text: 'As soon as possible (within 2 weeks)', points: 'managed' },
      { text: 'We can wait 1-3 months for deployment', points: 'source' },
      { text: 'Timeline is flexible', points: 'either' },
    ],
  },
  {
    id: 'customization',
    question: 'Do you need to modify the source code?',
    description: 'Source-use allows code modifications. Managed platform is configured, not customized.',
    options: [
      { text: 'No, we just need to configure it with our branding and programs', points: 'managed' },
      { text: 'Yes, we need to integrate with internal systems or modify functionality', points: 'source' },
      { text: 'We might need some integrations but nothing major', points: 'either' },
    ],
  },
  {
    id: 'users',
    question: 'How many students will use the platform?',
    description: 'This helps determine which plan tier is right for you.',
    options: [
      { text: 'Under 500 students', points: 'managed' },
      { text: '500-2,000 students', points: 'either' },
      { text: 'Over 2,000 students', points: 'either' },
    ],
  },
];

export default function LicensingGuidePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (points: Answer) => {
    const newAnswers = [...answers, points];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const getRecommendation = () => {
    const managedCount = answers.filter(a => a === 'managed').length;
    const sourceCount = answers.filter(a => a === 'source').length;

    if (sourceCount >= 3) return 'source';
    if (managedCount >= 3) return 'managed';
    return 'managed'; // Default to managed
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  const recommendation = getRecommendation();

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Breadcrumbs items={[{ label: 'Store', href: '/store' }, { label: 'Guides', href: '/store/guides' }, { label: 'Find Your License' }]} />
        </div>
      </div>

      {/* Hero */}
      <section className="relative h-[300px] overflow-hidden">
        <Image
          src="/images/heroes-hq/how-it-works-hero.jpg"
          alt="Find the Right License"
          fill
          className="object-cover"
          priority
        />
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          
          {!showResults ? (
            <>
              <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-slate-900 mb-4">Find the Right License for Your Organization</h1>
                <p className="text-lg text-slate-600">
                  Answer a few questions and we will recommend the best option for your needs. 
                  Takes less than 2 minutes.
                </p>
              </div>

              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-slate-500 mb-2">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% complete</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full">
                  <div 
                    className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="bg-slate-50 rounded-2xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  {questions[currentQuestion].question}
                </h2>
                <p className="text-slate-600 mb-8">
                  {questions[currentQuestion].description}
                </p>

                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option.points)}
                      className="w-full text-left p-6 bg-white border-2 border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors"
                    >
                      <span className="text-lg text-slate-900">{option.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Results */}
              <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-slate-900 mb-4">Your Recommendation</h1>
                <p className="text-lg text-slate-600">
                  Based on your answers, here is what we recommend for your organization.
                </p>
              </div>

              {recommendation === 'managed' ? (
                <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8 mb-8">
                  <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                    <Image
                      src="/images/heroes-hq/programs-hero.jpg"
                      alt="Managed Platform"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Managed Platform License</h2>
                  <p className="text-slate-600 mb-6">
                    The managed platform is perfect for your organization. We handle all the technical 
                    work - hosting, security, updates, and backups. You focus on your students and programs. 
                    Launch in as little as 2 weeks with no IT staff required.
                  </p>
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-slate-900">$1,500 - $3,500/month</div>
                    <p className="text-slate-500">Plus $7,500 - $15,000 one-time setup</p>
                  </div>
                  <p className="text-slate-700 mb-6 font-medium">Why this is right for you:</p>
                  <ul className="list-disc list-inside space-y-2 text-slate-600 mb-8">
                    <li>No IT team required - we manage everything</li>
                    <li>Launch quickly without deployment delays</li>
                    <li>Predictable monthly costs</li>
                    <li>Automatic updates and security patches</li>
                    <li>24/7 monitoring and support</li>
                  </ul>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/store/licenses/managed-platform"
                      className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
                    >
                      View Managed Platform Plans
                    </Link>
                    <Link
                      href="/store/demo"
                      className="border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-100 transition-colors"
                    >
                      Watch Demo First
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-100 border-2 border-slate-300 rounded-2xl p-8 mb-8">
                  <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                    <Image
                      src="/images/technology/hero-programs-technology.jpg"
                      alt="Source-Use License"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Source-Use License</h2>
                  <p className="text-slate-600 mb-6">
                    The source-use license gives you full control. Deploy on your own infrastructure, 
                    modify the code as needed, and meet your specific compliance requirements. 
                    Your IT team manages the platform while you own the license forever.
                  </p>
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-slate-900">$75,000</div>
                    <p className="text-slate-500">One-time license fee</p>
                  </div>
                  <p className="text-slate-700 mb-6 font-medium">Why this is right for you:</p>
                  <ul className="list-disc list-inside space-y-2 text-slate-600 mb-8">
                    <li>Full source code access</li>
                    <li>Deploy on your own servers</li>
                    <li>Meet strict data residency requirements</li>
                    <li>Customize and integrate as needed</li>
                    <li>No ongoing subscription fees</li>
                  </ul>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/store/licenses/source-use"
                      className="bg-slate-900 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-800 transition-colors"
                    >
                      View Source-Use License
                    </Link>
                    <Link
                      href="/store/licenses/source-use/trial"
                      className="border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-white transition-colors"
                    >
                      Start 14-Day Free Trial
                    </Link>
                  </div>
                </div>
              )}

              {/* Other Option */}
              <div className="bg-slate-50 rounded-xl p-6 mb-8">
                <h3 className="font-bold text-slate-900 mb-2">
                  {recommendation === 'managed' ? 'Also Consider: Source-Use License' : 'Also Consider: Managed Platform'}
                </h3>
                <p className="text-slate-600 mb-4">
                  {recommendation === 'managed' 
                    ? 'If you have IT staff and need full control, the source-use license might also work for you.'
                    : 'If you want to launch faster without managing infrastructure, consider the managed platform.'
                  }
                </p>
                <Link
                  href={recommendation === 'managed' ? '/store/licenses/source-use' : '/store/licenses/managed-platform'}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Learn more about {recommendation === 'managed' ? 'Source-Use License' : 'Managed Platform'}
                </Link>
              </div>

              {/* Retake */}
              <div className="text-center">
                <button
                  onClick={resetQuiz}
                  className="text-slate-500 hover:text-slate-700 font-medium"
                >
                  Retake the quiz
                </button>
              </div>
            </>
          )}

          {/* Skip to Compare */}
          {!showResults && (
            <div className="text-center">
              <Link
                href="/store/licenses"
                className="text-slate-500 hover:text-slate-700 font-medium"
              >
                Skip quiz and compare all options
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
