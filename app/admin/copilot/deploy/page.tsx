import { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/admin/copilot/deploy',
  },
  title: 'Deploy AI Copilot | Elevate For Humanity',
  description: 'Deploy and configure AI copilot features for your platform.',
};

export default async function DeployCopilotPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Unavailable</h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
    redirect('/unauthorized');
  }

  const deploymentOptions = [
    {
      id: 'tutor',
      name: 'AI Tutor',
      description: 'Personalized learning assistance for students',
      status: 'available',
      features: ['24/7 availability', 'Multi-language support', 'Course-specific knowledge']
    },
    {
      id: 'assistant',
      name: 'Admin Assistant',
      description: 'Help with administrative tasks and reporting',
      status: 'available',
      features: ['Report generation', 'Data analysis', 'Task automation']
    },
    {
      id: 'support',
      name: 'Support Bot',
      description: 'Automated support for common inquiries',
      status: 'coming_soon',
      features: ['FAQ handling', 'Ticket routing', 'Self-service support']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <nav className="text-sm mb-4">
            <ol className="flex items-center space-x-2 text-gray-500">
              <li><Link href="/admin" className="hover:text-primary">Admin</Link></li>
              <li>/</li>
              <li><Link href="/admin/copilot" className="hover:text-primary">Copilot</Link></li>
              <li>/</li>
              <li className="text-gray-900 font-medium">Deploy</li>
            </ol>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900">Deploy AI Copilot</h1>
          <p className="text-gray-600 mt-2">Choose and configure AI features for your platform</p>
        </div>

        {/* Deployment Options */}
        <div className="space-y-6">
          {deploymentOptions.map((option) => (
            <div key={option.id} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{option.name}</h3>
                      {option.status === 'coming_soon' && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mt-1">{option.description}</p>
                    <ul className="mt-3 space-y-1">
                      {option.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <button 
                  className={`px-4 py-2 rounded-lg font-medium ${
                    option.status === 'available'
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={option.status !== 'available'}
                >
                  {option.status === 'available' ? 'Deploy' : 'Coming Soon'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Configuration Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Deployment Configuration</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Key
              </label>
              <input 
                type="password" 
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Enter your OpenAI API key"
              />
              <p className="text-xs text-gray-500 mt-1">Required for AI features</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Model Selection
              </label>
              <select className="w-full border rounded-lg px-3 py-2">
                <option value="gpt-4">GPT-4 (Recommended)</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Faster)</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="logging" className="w-4 h-4 rounded" />
              <label htmlFor="logging" className="text-sm text-gray-700">
                Enable conversation logging for quality improvement
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
