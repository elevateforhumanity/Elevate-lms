import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ResourcePageTemplate, generateResourceMetadata } from '@/components/templates/ResourcePageTemplate';

const PAGE_PATH = '/resources/how-refund-advances-work';
const LAST_REVIEWED = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export const metadata: Metadata = generateResourceMetadata({
  title: 'How Refund-Based Advances Work (General Information)',
  description: 'Understand how refund-based advances typically work, including eligibility, repayment, and the optional nature of these services.',
  path: PAGE_PATH,
});

export default function HowRefundAdvancesWorkPage() {
  return (
    <ResourcePageTemplate
      title="How Refund-Based Advances Work (General Information)"
      description="Understand how refund-based advances typically work, including eligibility, repayment, and the optional nature of these services."
      lastReviewed={LAST_REVIEWED}
      reviewedBy="Compliance & Program Operations"
      version="1.0"
      
      intro="Some tax filers may be offered the option to receive a portion of an expected tax refund before the refund is issued. This page explains, at a high level, how refund-based advances typically work. This information is provided for general understanding and is not financial advice."
      
      overview={
        <div className="space-y-4 text-slate-700">
          <p>
            A refund-based advance is a financial product that allows eligible tax filers to 
            receive a portion of their expected tax refund before the refund is officially 
            processed and issued by the tax authority.
          </p>
          <p>
            These advances are typically offered after a tax return has been completed and 
            are repaid directly from the tax refund when it is issued. Understanding how 
            these products work can help individuals make informed decisions about whether 
            to use them.
          </p>
        </div>
      }
      
      howItWorks={{
        title: 'How the Process Typically Works',
        steps: [
          'Tax Return Completion: Refund-based advances are generally considered only after a tax return has been completed. The completed return provides the information needed to estimate the expected refund amount.',
          'Eligibility Determination: Eligibility is usually based on information in the completed tax return and related processing requirements. Factors may include the expected refund amount, the type of return, and other criteria. Eligibility can vary and is not guaranteed.',
          'Advance Offer (If Eligible): If eligible, the filer may be presented with information about the advance option, including any terms and conditions. This is typically presented as an optional choice.',
          'Decision to Accept or Decline: The filer decides whether to accept the advance. Accepting is not required to complete the tax filing process.',
          'Repayment from Refund: If an advance is provided, it is typically repaid directly from the tax refund when the refund is issued. The filer does not make separate payments in advance of the refund.',
        ],
      }}
      
      timingAndVariability={{
        title: 'Important Considerations',
        content: (
          <div className="space-y-4 text-slate-700">
            <p>Several factors can affect refund-based advances:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Eligibility varies:</strong> Not everyone who files a tax return will be eligible for an advance. Eligibility depends on multiple factors.</li>
              <li><strong>Amounts vary:</strong> The amount available as an advance is typically a portion of the expected refund, not the full amount.</li>
              <li><strong>Terms and conditions apply:</strong> Specific terms, including any fees or conditions, vary by provider and should be reviewed before accepting.</li>
              <li><strong>Refund changes:</strong> If the actual refund amount differs from the estimate, this may affect the advance or repayment.</li>
            </ul>
          </div>
        ),
      }}
      
      faqs={[
        {
          question: 'Is a refund advance required to file taxes?',
          answer: 'No. Choosing to file a tax return does not require selecting a refund-based advance. Filing can be completed without using this option. The advance is an optional service.',
        },
        {
          question: 'How is the advance repaid?',
          answer: 'If an advance is provided, it is typically repaid directly from the tax refund when the refund is issued by the tax authority. The filer does not make separate payments before the refund arrives.',
        },
        {
          question: 'What if my refund is less than expected?',
          answer: 'If the actual refund amount differs from the estimate used for the advance, this may affect the repayment. Specific terms vary by provider and should be reviewed before accepting an advance.',
        },
        {
          question: 'Are there fees associated with refund advances?',
          answer: 'Terms and conditions, including any fees, vary by provider. This information should be reviewed and understood before accepting any advance offer.',
        },
        {
          question: 'How quickly can I receive an advance?',
          answer: 'Timing varies by provider and method of delivery. Specific timing information is typically provided when an advance offer is presented.',
        },
      ]}
      
      platformRelation="Our platform presents refund-based advance information only after filing steps are complete. The option is clearly explained as optional, and users can complete their tax filing without selecting an advance. All terms and conditions are presented before any decision is made."
      
      parentPage={{ href: '/supersonic-fast-cash', label: 'Tax Preparation Services' }}
      
      relatedResources={[
        { href: '/resources/how-tax-filing-works', label: 'How Tax Filing Works' },
        { href: '/resources/tax-refund-timeline-explained', label: 'Tax Refund Timelines: What to Expect' },
        { href: '/resources/understanding-tax-prep-fees', label: 'Understanding Tax Preparation Fees' },
      ]}
      
      governanceLinks={[
        { href: '/governance', label: 'Governance Documents' },
        { href: '/governance/security', label: 'Security & Data Protection' },
      ]}
    />
  );
}
