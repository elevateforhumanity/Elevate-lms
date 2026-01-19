import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * POST /api/ai/generate-site
 * 
 * AI generates a complete site configuration based on user input.
 * Returns preview config that can be used to render a preview site.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      organizationName,
      organizationType,
      industry,
      targetAudience,
      trainingTypes,
      brandColors,
      description,
    } = body;

    if (!organizationName || !organizationType) {
      return NextResponse.json(
        { error: 'Organization name and type required' },
        { status: 400 }
      );
    }

    // Generate site configuration using AI
    const prompt = `You are a learning management system configuration expert. Generate a complete site configuration for a training organization.

Organization Details:
- Name: ${organizationName}
- Type: ${organizationType}
- Industry: ${industry || 'General'}
- Target Audience: ${targetAudience || 'Adult learners'}
- Training Types: ${trainingTypes || 'Professional development'}
- Brand Colors: ${brandColors || 'Auto-generate professional colors'}
- Description: ${description || 'Not provided'}

Generate a JSON configuration with:
1. branding: { primaryColor, secondaryColor, accentColor, logoText, tagline }
2. homepage: { heroTitle, heroSubtitle, heroCtaText, features (array of 3), testimonialPlaceholder }
3. programs: Array of 3 suggested training programs with { name, description, duration, level }
4. navigation: Array of nav items { label, href }
5. footer: { description, contactEmail, socialLinks }
6. seo: { title, description, keywords (array) }

Make it specific to their industry and audience. Be creative but professional.
Return ONLY valid JSON, no markdown or explanation.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a site configuration generator. Return only valid JSON.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const responseText = completion.choices[0]?.message?.content || '';
    
    // Parse JSON from response
    let siteConfig;
    try {
      // Remove markdown code blocks if present
      const jsonStr = responseText.replace(/```json\n?|\n?```/g, '').trim();
      siteConfig = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error('Failed to parse AI response:', responseText);
      // Return default config if parsing fails
      siteConfig = getDefaultConfig(organizationName, organizationType);
    }

    // Generate unique preview ID
    const previewId = `preview_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

    // Store in temporary storage (in production, use Redis or database)
    // For now, we'll return it and let the client store it
    
    return NextResponse.json({
      success: true,
      previewId,
      config: {
        ...siteConfig,
        meta: {
          organizationName,
          organizationType,
          generatedAt: new Date().toISOString(),
          previewId,
        }
      },
      previewUrl: `/preview/${previewId}`,
    });
  } catch (error) {
    console.error('AI generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate site configuration' },
      { status: 500 }
    );
  }
}

function getDefaultConfig(name: string, type: string) {
  const colors = {
    workforce_board: { primary: '#1e40af', secondary: '#3b82f6', accent: '#f59e0b' },
    training_provider: { primary: '#059669', secondary: '#10b981', accent: '#f97316' },
    nonprofit: { primary: '#7c3aed', secondary: '#8b5cf6', accent: '#ec4899' },
    employer: { primary: '#0f172a', secondary: '#334155', accent: '#3b82f6' },
  };

  const colorSet = colors[type as keyof typeof colors] || colors.training_provider;

  return {
    branding: {
      primaryColor: colorSet.primary,
      secondaryColor: colorSet.secondary,
      accentColor: colorSet.accent,
      logoText: name,
      tagline: 'Empowering learners through quality training',
    },
    homepage: {
      heroTitle: `Welcome to ${name}`,
      heroSubtitle: 'Start your learning journey today with industry-recognized training programs.',
      heroCtaText: 'Explore Programs',
      features: [
        { title: 'Expert Instructors', description: 'Learn from industry professionals' },
        { title: 'Flexible Learning', description: 'Study at your own pace, anywhere' },
        { title: 'Career Support', description: 'Job placement assistance included' },
      ],
    },
    programs: [
      { name: 'Fundamentals Course', description: 'Build your foundation', duration: '4 weeks', level: 'Beginner' },
      { name: 'Advanced Training', description: 'Take your skills further', duration: '8 weeks', level: 'Intermediate' },
      { name: 'Professional Certification', description: 'Industry-recognized credential', duration: '12 weeks', level: 'Advanced' },
    ],
    navigation: [
      { label: 'Home', href: '/' },
      { label: 'Programs', href: '/programs' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    footer: {
      description: `${name} is dedicated to providing quality training and education.`,
      contactEmail: 'info@example.com',
    },
    seo: {
      title: `${name} - Professional Training Programs`,
      description: `${name} offers comprehensive training programs for career advancement.`,
      keywords: ['training', 'education', 'professional development', 'certification'],
    },
  };
}
