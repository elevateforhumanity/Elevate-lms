#!/usr/bin/env tsx
/**
 * Generate full lesson content for Drake Training courses
 * Uses OpenAI to generate comprehensive lesson content for all 103 lessons
 */

import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

interface LessonData {
  course_id: string;
  lesson_number: number;
  title: string;
  content: string;
  duration_minutes: number;
  topics: string[];
  quiz_questions: unknown[];
}

const COURSE_TOPICS = {
  'tax-basics': [
    'Understanding the U.S. tax system',
    'Filing status determination (Single, MFJ, MFS, HOH, QW)',
    'Personal exemptions and dependents',
    'Income types: W-2 wages and salaries',
    'Income types: 1099-MISC, 1099-NEC, 1099-INT, 1099-DIV',
    'Self-employment income (Schedule C)',
    'Standard deduction vs itemized deductions',
    'Common itemized deductions (mortgage interest, property tax, charitable)',
    'Above-the-line deductions (student loan interest, IRA contributions)',
    'Child Tax Credit and Additional Child Tax Credit',
    'Earned Income Tax Credit (EITC)',
    'American Opportunity Tax Credit and Lifetime Learning Credit',
    'Tax calculations and tax brackets',
    'Federal withholding and estimated taxes',
    'Form 1040 line-by-line walkthrough',
    'Common schedules (Schedule 1, 2, 3)',
    'State tax return basics',
    'IRS forms and where to find them',
    'Ethics and due diligence requirements',
    'Client confidentiality (IRC Section 7216)',
    'PTIN requirements and how to get one',
    'Practice returns: Simple W-2 only',
    'Practice returns: W-2 with dependents and credits',
    'Practice returns: Self-employment income',
  ],
  'irs-regulations': [
    'IRS Circular 230 overview',
    'Preparer Tax Identification Number (PTIN)',
    'Who must have a PTIN',
    'Preparer penalties and sanctions',
    'Due diligence requirements for EITC, CTC, AOTC, and HOH',
    'Client confidentiality requirements (IRC 7216)',
    'Consent requirements for disclosure',
    'Record retention requirements',
    'Preparer signature requirements',
    'Electronic filing requirements',
    'Continuing education requirements',
    'Professional conduct and best practices',
  ],
  'advanced-returns': [
    'Rental property income and expenses (Schedule E)',
    'Depreciation and Section 179',
    'Capital gains and losses (Schedule D)',
    'Form 8949 for investment sales',
    'Cryptocurrency taxation',
    'Stock options and RSUs',
    'Qualified Business Income Deduction (QBI)',
    'Home office deduction',
    'Vehicle expenses (actual vs standard mileage)',
    'Multi-state tax returns',
    'Part-year resident returns',
    'Nonresident state returns',
    'Retirement distributions (1099-R)',
    'Social Security taxation',
    'Health Savings Accounts (HSA)',
    'Alternative Minimum Tax (AMT)',
    'Net Investment Income Tax',
    'Self-employment tax calculations',
    'Estimated tax payments',
    'Practice: Complex return with rental and investments',
  ],
  'business-returns': [
    'Business entity types overview',
    'Schedule C for sole proprietors',
    'Business income and expense categories',
    'Cost of goods sold (COGS)',
    'Business use of home',
    'Business vehicle expenses',
    'Form 1065 for partnerships',
    'Partnership K-1s',
    'Form 1120S for S-corporations',
    'S-corp shareholder basis',
    'Form 1120 for C-corporations',
    'Corporate tax rates and calculations',
    'Payroll tax basics',
    'Form 941 quarterly payroll',
    'Form 940 unemployment tax',
    'W-2 and W-3 preparation',
    '1099-NEC for contractors',
    'Sales tax obligations',
    'Business tax credits',
    'Section 199A QBI deduction',
    'Accounting methods (cash vs accrual)',
    'Inventory valuation',
    'Depreciation methods',
    'Practice: Schedule C return',
    'Practice: Partnership return',
  ],
  'drake-mastery': [
    'Drake Tax Software overview and navigation',
    'Setting up your Drake Tax account',
    'Client management in Drake',
    'Creating a new tax return',
    'Data entry best practices',
    'Form 1040 in Drake',
    'Schedules and forms in Drake',
    'Drake interview mode vs forms mode',
    'Error checking and diagnostics',
    'E-filing from Drake',
    'Drake bank products and refund advances',
    'Drake document management',
    'Drake reports and analytics',
    'Drake multi-user setup',
    'Drake backup and security',
    'Drake updates and tax law changes',
    'Drake troubleshooting common issues',
    'Drake keyboard shortcuts and efficiency tips',
    'Drake state returns',
    'Drake prior year returns',
    'Drake amendments and superseding returns',
    'Drake practice lab exercises',
  ],
};

async function generateLessonContent(
  courseId: string,
  lessonNumber: number,
  topic: string
): Promise<LessonData> {

  const prompt = `You are a professional tax preparation instructor creating comprehensive lesson content for tax preparers.

Course: ${courseId}
Lesson ${lessonNumber}: ${topic}

Create a detailed, professional lesson that includes:

1. **Learning Objectives** (3-5 specific, measurable objectives)
2. **Introduction** (2-3 paragraphs explaining why this topic matters)
3. **Core Content** (detailed explanation with examples, broken into sections)
4. **Key Concepts** (bullet points of critical information)
5. **Practical Examples** (2-3 real-world scenarios)
6. **Common Mistakes** (what to avoid)
7. **Best Practices** (professional tips)
8. **Summary** (key takeaways)
9. **Additional Resources** (IRS publications, forms, links)

Format the content in clean HTML with proper headings, paragraphs, lists, and emphasis.
Make it professional, accurate, and suitable for adult learners preparing for tax season.
Include specific IRS form numbers, tax code sections, and dollar amounts where relevant.

Return ONLY the HTML content, no markdown code blocks.`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content:
          'You are an expert tax preparation instructor with 20+ years of experience. You create clear, accurate, professional training content.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 4000,
  });

  const content = completion.choices[0].message.content || '';

  // Generate quiz questions
  const quizPrompt = `Create 5 multiple-choice quiz questions for this tax preparation lesson topic: "${topic}"

Each question should:
- Test understanding of key concepts
- Have 4 answer choices (A, B, C, D)
- Include the correct answer
- Include a brief explanation of why the answer is correct

Return as JSON array with this structure:
[
  {
    "question": "Question text",
    "choices": ["A) Choice 1", "B) Choice 2", "C) Choice 3", "D) Choice 4"],
    "correct_answer": "A",
    "explanation": "Explanation text"
  }
]`;

  const quizCompletion = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content:
          'You are an expert at creating tax preparation quiz questions. Return only valid JSON.',
      },
      {
        role: 'user',
        content: quizPrompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 2000,
  });

  let quizQuestions = [];
  try {
    const quizContent = quizCompletion.choices[0].message.content || '[]';
    quizQuestions = JSON.parse(quizContent);
  } catch (e) {
    console.error('Failed to parse quiz questions:', e);
    quizQuestions = [];
  }

  return {
    course_id: courseId,
    lesson_number: lessonNumber,
    title: topic,
    content,
    duration_minutes: 30,
    topics: [topic.toLowerCase()],
    quiz_questions: quizQuestions,
  };
}

async function generateAllLessons() {

  for (const [courseId, topics] of Object.entries(COURSE_TOPICS)) {
      `\n=== Generating lessons for ${courseId} (${topics.length} lessons) ===\n`
    );

    for (let i = 0; i < topics.length; i++) {
      const topic = topics[i];
      const lessonNumber = i + 1;

      try {
        const lessonData = await generateLessonContent(
          courseId,
          lessonNumber,
          topic
        );

        // Insert into database
        const { error } = await supabase
          .from('training_lessons')
          .insert(lessonData);

        if (error) {
          console.error(`Error inserting lesson ${lessonNumber}:`, error);
        } else {
        }

        // Rate limiting - wait 2 seconds between API calls
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(`Error generating lesson ${lessonNumber}:`, error);
      }
    }
  }

}

// Run the script
generateAllLessons().catch(console.error);
