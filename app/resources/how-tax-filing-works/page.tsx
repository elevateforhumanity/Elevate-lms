import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ResourcePageTemplate, generateResourceMetadata } from '@/components/templates/ResourcePageTemplate';

const PAGE_PATH = '/resources/how-tax-filing-works';
const LAST_REVIEWED = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export const metadata: Metadata = generateResourceMetadata({
  title: 'How Tax Filing Works: A Step-by-Step Overview',
  description: 'Understand the general process of filing a tax return, from preparation through submission and refund processing.',
  path: PAGE_PATH,
});

export default function HowTaxFilingWorksPage() {
  return (
    <ResourcePageTemplate
      title="How Tax Filing Works: A Step-by-Step Overview"
      description="Understand the general process of filing a tax return, from preparation through submission and refund processing."
      lastReviewed={LAST_REVIEWED}
      reviewedBy="Program Support Team"
      version="1.0"
      
      intro="This page explains the general process of filing a tax return, from preparation through submission and refund processing. It is intended to help you understand what typically happens when you file taxes and what factors can affect timing and outcomes. This information is provided for general understanding and is not tax advice."
      
      overview={
        <div className="space-y-4 text-slate-700">
          <p>
            Filing a tax return is a process that involves gathering financial information, 
            completing required forms, and submitting them to the appropriate tax authority. 
            The process can be completed electronically or by mail, with electronic filing 
            being the most common method due to faster processing times.
          </p>
          <p>
            Understanding each step of the process can help you prepare effectively and 
            reduce the likelihood of delays or errors during filing.
          </p>
        </div>
      }
      
      howItWorks={{
        title: 'The Tax Filing Process',
        steps: [
          'Preparing Your Information: Before filing, individuals typically gather documents such as income statements (W-2s, 1099s), expense records, and identification details. Having complete and accurate information helps reduce delays and errors during filing.',
          'Completing a Tax Return: A tax return summarizes income, deductions, and credits for a given tax year. Filing may be completed electronically or by mail, depending on the method used. Electronic filing is commonly used because it allows for faster submission and confirmation.',
          'Reviewing Before Submission: Most filing processes include a review step. This helps identify missing information or potential errors before submission. Completing this step carefully can reduce the likelihood of processing delays.',
          'Submitting the Return: Once submitted, the return is received by the appropriate tax authority for processing. Submission confirmation does not mean the return has been fully processed; it confirms receipt.',
          'Processing and Refund Issuance: If a refund is due, it is issued after the return is processed. Processing times vary and depend on factors such as filing method, completeness, and review requirements.',
        ],
      }}
      
      timingAndVariability={{
        title: 'Factors That Affect Processing',
        content: (
          <div className="space-y-4 text-slate-700">
            <p>
              Processing times can vary based on several factors. Electronic filing is 
              generally processed faster than paper filing. Returns that require additional 
              review may take longer to process.
            </p>
            <p>
              Peak filing periods, such as the weeks leading up to tax deadlines, may also 
              affect processing times due to higher volume. Ensuring your return is complete 
              and accurate before submission can help minimize delays.
            </p>
          </div>
        ),
      }}
      
      faqs={[
        {
          question: 'What documents do I need to file taxes?',
          answer: 'Common documents include income statements (W-2s, 1099s), identification information, and records of deductions or credits you plan to claim. The specific documents needed depend on your individual situation.',
        },
        {
          question: 'How long does it take to get a refund?',
          answer: 'Refund timing varies based on filing method, completeness of the return, and processing requirements. Electronic filing with direct deposit is typically the fastest method.',
        },
        {
          question: 'What happens if there is an error on my return?',
          answer: 'Errors may result in processing delays or requests for additional information. Reviewing your return carefully before submission can help reduce the likelihood of errors.',
        },
        {
          question: 'Can I file taxes electronically?',
          answer: 'Yes, electronic filing is available and is the most common method used today. It allows for faster submission and confirmation compared to paper filing.',
        },
      ]}
      
      platformRelation="Our platform is designed to guide users through tax preparation in a structured way, helping them understand each step. The process explains what information is needed and provides clear instructions throughout. Filing does not require selecting any optional services."
      
      parentPage={{ href: '/supersonic-fast-cash', label: 'Tax Preparation Services' }}
      
      relatedResources={[
        { href: '/resources/tax-refund-timeline-explained', label: 'Tax Refund Timelines: What to Expect' },
        { href: '/resources/how-refund-advances-work', label: 'How Refund-Based Advances Work' },
        { href: '/resources/understanding-tax-prep-fees', label: 'Understanding Tax Preparation Fees' },
      ]}
      
      governanceLinks={[
        { href: '/governance/security', label: 'Security & Data Protection' },
      ]}
    />
  );
}
