-- =============================================
-- IRS VITA Tax Preparation Program
-- All content links to official IRS resources
-- =============================================

-- Insert Program
INSERT INTO programs (slug, title, track, blurb, hours, cover_url)
VALUES (
  'irs-vita-tax-preparation',
  'IRS VITA Tax Preparation Training',
  'Finance',
  'Become an IRS-certified volunteer tax preparer. Free training provided by the IRS to help low-to-moderate income families prepare their tax returns.',
  '40 hours',
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800'
) ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  track = EXCLUDED.track,
  blurb = EXCLUDED.blurb,
  hours = EXCLUDED.hours,
  cover_url = EXCLUDED.cover_url;

-- Insert Course
INSERT INTO courses (program_id, code, title, summary, cover_url)
VALUES (
  (SELECT id FROM programs WHERE slug = 'irs-vita-tax-preparation'),
  'VITA101',
  'VITA Volunteer Tax Preparer Certification',
  'Complete IRS-certified training to become a volunteer tax preparer. Learn to prepare basic tax returns for individuals and families earning $64,000 or less per year.',
  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800'
) ON CONFLICT DO NOTHING;

-- Get the course ID for lessons
DO $$
DECLARE
  v_course_id uuid;
BEGIN
  SELECT id INTO v_course_id FROM courses WHERE code = 'VITA101';
  
  -- Lesson 1: Introduction to VITA Program
  INSERT INTO lessons (course_id, idx, title, video_url, html)
  VALUES (
    v_course_id,
    1,
    'Welcome to VITA Volunteer Training',
    NULL,
    '<h2>Welcome to VITA Volunteer Training</h2>
    
    <p>The <strong>Volunteer Income Tax Assistance (VITA)</strong> program offers free tax help to people who generally make $64,000 or less, persons with disabilities, and limited English-speaking taxpayers who need assistance in preparing their own tax returns.</p>
    
    <h3>What You''ll Learn</h3>
    <ul>
      <li>How to prepare basic tax returns</li>
      <li>IRS tax law and regulations</li>
      <li>Ethics and standards of conduct</li>
      <li>Quality review procedures</li>
      <li>Taxpayer rights and responsibilities</li>
    </ul>
    
    <h3>Official IRS Resources</h3>
    <p><strong>📋 Sign Up to Volunteer:</strong><br>
    <a href="https://freetaxassistance.for.irs.gov/s/sign-up-form" target="_blank">IRS VITA/TCE Volunteer Sign Up Form</a></p>
    
    <p><strong>📚 Program Overview:</strong><br>
    <a href="https://www.irs.gov/individuals/irs-tax-volunteers" target="_blank">IRS Tax Volunteers Information</a></p>
    
    <p><strong>🎓 Training Resources:</strong><br>
    <a href="https://www.irs.gov/individuals/volunteer-training-resources" target="_blank">IRS Volunteer Training Resources</a></p>
    
    <h3>Course Outline</h3>
    <ol>
      <li><strong>Lesson 1:</strong> Welcome to VITA (you are here)</li>
      <li><strong>Lesson 2:</strong> Understanding the IRS VITA Program</li>
      <li><strong>Lesson 3:</strong> Volunteer Roles and Requirements</li>
      <li><strong>Lesson 4:</strong> IRS Link & Learn Taxes Online Training</li>
      <li><strong>Lesson 5:</strong> Tax Software Practice Lab</li>
      <li><strong>Lesson 6:</strong> Ethics and Standards of Conduct</li>
      <li><strong>Lesson 7:</strong> Quality Review and Accuracy</li>
      <li><strong>Lesson 8:</strong> Getting Started - Next Steps</li>
    </ol>
    
    <h3>Next Steps</h3>
    <ol>
      <li>Complete this online orientation course</li>
      <li>Sign up as a volunteer using the IRS form above</li>
      <li>Complete IRS Link & Learn Taxes training</li>
      <li>Pass the IRS certification test</li>
      <li>Start volunteering at a local VITA site</li>
    </ol>
    
    <p style="margin-top: 30px;"><strong>Ready to begin?</strong> Click "Next Lesson" to continue!</p>'
  ) ON CONFLICT DO NOTHING;
  
  -- Lesson 2: Introduction to VITA Program
  INSERT INTO lessons (course_id, idx, title, video_url, html)
  VALUES (
    v_course_id,
    2,
    'Understanding the IRS VITA Program',
    NULL,
    '<h2>Welcome to IRS VITA Volunteer Training</h2>
    
    <p>The <strong>Volunteer Income Tax Assistance (VITA)</strong> program offers free tax help to people who generally make $64,000 or less, persons with disabilities, and limited English-speaking taxpayers who need assistance in preparing their own tax returns.</p>
    
    <h3>What You''ll Learn</h3>
    <ul>
      <li>How to prepare basic tax returns</li>
      <li>IRS tax law and regulations</li>
      <li>Ethics and standards of conduct</li>
      <li>Quality review procedures</li>
      <li>Taxpayer rights and responsibilities</li>
    </ul>
    
    <h3>Official IRS Resources</h3>
    <p><strong>📋 Sign Up to Volunteer:</strong><br>
    <a href="https://freetaxassistance.for.irs.gov/s/sign-up-form" target="_blank">IRS VITA/TCE Volunteer Sign Up Form</a></p>
    
    <p><strong>📚 Program Overview:</strong><br>
    <a href="https://www.irs.gov/individuals/irs-tax-volunteers" target="_blank">IRS Tax Volunteers Information</a></p>
    
    <p><strong>🎓 Training Resources:</strong><br>
    <a href="https://www.irs.gov/individuals/volunteer-training-resources" target="_blank">IRS Volunteer Training Resources</a></p>
    
    <h3>Next Steps</h3>
    <ol>
      <li>Complete this online orientation course</li>
      <li>Sign up as a volunteer using the IRS form above</li>
      <li>Complete IRS Link & Learn Taxes training</li>
      <li>Pass the IRS certification test</li>
      <li>Start volunteering at a local VITA site</li>
    </ol>'
  ) ON CONFLICT DO NOTHING;
  
  -- Lesson 3: Volunteer Roles and Requirements
  INSERT INTO lessons (course_id, idx, title, video_url, html)
  VALUES (
    v_course_id,
    3,
    'Volunteer Roles and Requirements',
    NULL,
    '<h2>Choose Your Volunteer Role</h2>
    
    <p>VITA offers several volunteer positions to match your skills and interests:</p>
    
    <h3>Available Roles</h3>
    
    <h4>1. Tax Preparer</h4>
    <ul>
      <li>Prepare tax returns for taxpayers</li>
      <li>Interview taxpayers to gather information</li>
      <li>Use tax software to complete returns</li>
      <li><strong>Training Required:</strong> Basic or Advanced certification</li>
    </ul>
    
    <h4>2. Quality Reviewer</h4>
    <ul>
      <li>Review completed returns for accuracy</li>
      <li>Ensure all required documentation is present</li>
      <li>Verify calculations and tax law application</li>
      <li><strong>Training Required:</strong> Quality Review certification</li>
    </ul>
    
    <h4>3. Greeter/Intake Specialist</h4>
    <ul>
      <li>Welcome taxpayers to the site</li>
      <li>Help complete intake forms</li>
      <li>Organize taxpayer documents</li>
      <li><strong>Training Required:</strong> Intake/Interview training</li>
    </ul>
    
    <h4>4. Site Coordinator</h4>
    <ul>
      <li>Manage VITA site operations</li>
      <li>Schedule volunteers</li>
      <li>Ensure quality standards</li>
      <li><strong>Training Required:</strong> All certifications plus coordinator training</li>
    </ul>
    
    <h3>Official IRS Information</h3>
    <p><strong>📋 Volunteer Roles:</strong><br>
    <a href="https://www.irs.gov/individuals/choose-your-tax-volunteer-role" target="_blank">IRS - Choose Your Tax Volunteer Role</a></p>
    
    <p><strong>📝 Sign Up Form:</strong><br>
    <a href="https://freetaxassistance.for.irs.gov/s/sign-up-form" target="_blank">VITA/TCE Volunteer and Partner Sign Up</a></p>
    
    <h3>Time Commitment</h3>
    <ul>
      <li><strong>Training:</strong> 20-40 hours (online and in-person)</li>
      <li><strong>Volunteering:</strong> 4-8 hours per week during tax season (January-April)</li>
      <li><strong>Flexible scheduling:</strong> Sites open evenings and weekends</li>
    </ul>'
  ) ON CONFLICT DO NOTHING;
  
  -- Lesson 4: IRS Link & Learn Taxes Training
  INSERT INTO lessons (course_id, idx, title, video_url, html)
  VALUES (
    v_course_id,
    4,
    'IRS Link & Learn Taxes Online Training',
    NULL,
    '<h2>Link & Learn Taxes (L&LT)</h2>
    
    <p>Link & Learn Taxes is the <strong>official IRS online training platform</strong> for VITA/TCE volunteers. All training and certification is done through this system.</p>
    
    <h3>Training Courses Available</h3>
    
    <h4>Basic Certification</h4>
    <ul>
      <li>Filing status and exemptions</li>
      <li>Standard deduction</li>
      <li>Earned Income Tax Credit (EITC)</li>
      <li>Child Tax Credit</li>
      <li>Education credits</li>
      <li>Retirement income</li>
    </ul>
    
    <h4>Advanced Certification</h4>
    <ul>
      <li>Itemized deductions</li>
      <li>Self-employment income</li>
      <li>Rental property income</li>
      <li>Capital gains and losses</li>
      <li>Business expenses</li>
    </ul>
    
    <h4>Specialty Certifications</h4>
    <ul>
      <li><strong>Military:</strong> Military-specific tax issues</li>
      <li><strong>International:</strong> Foreign students and scholars</li>
      <li><strong>Puerto Rico:</strong> Puerto Rico residents</li>
    </ul>
    
    <h3>🎓 Access IRS Training</h3>
    <p><strong>Link & Learn Taxes Portal:</strong><br>
    <a href="https://apps.irs.gov/app/vita/" target="_blank">IRS Link & Learn Taxes</a></p>
    
    <p><strong>Training Introduction:</strong><br>
    <a href="https://www.irs.gov/individuals/link-and-learn-taxes" target="_blank">IRS - Link and Learn Taxes Information</a></p>
    
    <h3>Certification Process</h3>
    <ol>
      <li><strong>Create Account:</strong> Register on Link & Learn Taxes</li>
      <li><strong>Complete Training:</strong> Study the online modules</li>
      <li><strong>Take Practice Tests:</strong> Use the practice lab</li>
      <li><strong>Pass Certification Test:</strong> Score 80% or higher</li>
      <li><strong>Receive Certificate:</strong> Print your certification</li>
    </ol>
    
    <h3>📚 Additional Resources</h3>
    <p><strong>Publication 4012 - Volunteer Resource Guide:</strong><br>
    <a href="https://www.irs.gov/pub/irs-pdf/p4012.pdf" target="_blank">Download PDF</a></p>
    
    <p><strong>Publication 4491 - Student Training Guide:</strong><br>
    Available through Link & Learn Taxes</p>'
  ) ON CONFLICT DO NOTHING;
  
  -- Lesson 5: Tax Software Practice Lab
  INSERT INTO lessons (course_id, idx, title, video_url, html)
  VALUES (
    v_course_id,
    5,
    'Tax Software Practice Lab',
    NULL,
    '<h2>Practice with Real Tax Software</h2>
    
    <p>The IRS provides a <strong>free practice lab</strong> where you can practice preparing tax returns using the same software used at VITA sites.</p>
    
    <h3>🖥️ Access Practice Lab</h3>
    <p><strong>TaxSlayer Pro Practice Lab:</strong><br>
    <a href="https://vita.taxslayerpro.com/IRSTraining/en/Account/Access" target="_blank">IRS Tax Software Practice Lab</a></p>
    
    <h3>What You''ll Practice</h3>
    <ul>
      <li>Entering taxpayer information</li>
      <li>Completing Form 1040</li>
      <li>Calculating credits and deductions</li>
      <li>Reviewing returns for accuracy</li>
      <li>E-filing procedures</li>
    </ul>
    
    <h3>Practice Scenarios</h3>
    <p>The practice lab includes realistic tax scenarios:</p>
    <ul>
      <li>Single filer with W-2 income</li>
      <li>Married filing jointly with dependents</li>
      <li>Self-employed individual</li>
      <li>Retiree with Social Security and pension</li>
      <li>Student with education expenses</li>
    </ul>
    
    <h3>📖 Practice Lab Resources</h3>
    <p><strong>Practice Lab Fact Sheet:</strong><br>
    <a href="https://www.irs.gov/pub/irs-pdf/p5377.pdf" target="_blank">Publication 5377 (PDF)</a></p>
    
    <p><strong>Getting Started Guide:</strong><br>
    <a href="https://www.irs.gov/pub/irs-pdf/p5378.pdf" target="_blank">Publication 5378 (PDF)</a></p>
    
    <h3>Tips for Success</h3>
    <ul>
      <li>Complete at least 5 practice returns before certification</li>
      <li>Review your work carefully</li>
      <li>Use Publication 4012 as a reference</li>
      <li>Ask questions in the volunteer forums</li>
      <li>Practice different types of returns</li>
    </ul>'
  ) ON CONFLICT DO NOTHING;
  
  -- Lesson 6: Ethics and Standards of Conduct
  INSERT INTO lessons (course_id, idx, title, video_url, html)
  VALUES (
    v_course_id,
    6,
    'Ethics and Standards of Conduct',
    NULL,
    '<h2>Volunteer Standards of Conduct</h2>
    
    <p>As an IRS-certified volunteer, you must follow strict <strong>ethical standards</strong> to protect taxpayer information and maintain program integrity.</p>
    
    <h3>Core Ethical Principles</h3>
    
    <h4>1. Confidentiality</h4>
    <ul>
      <li>Never share taxpayer information</li>
      <li>Secure all documents and data</li>
      <li>Shred documents after use</li>
      <li>No photos of tax returns</li>
    </ul>
    
    <h4>2. Accuracy</h4>
    <ul>
      <li>Prepare returns carefully</li>
      <li>Double-check all entries</li>
      <li>Use quality review process</li>
      <li>Never guess or estimate</li>
    </ul>
    
    <h4>3. Professionalism</h4>
    <ul>
      <li>Treat all taxpayers with respect</li>
      <li>Maintain professional appearance</li>
      <li>Be punctual and reliable</li>
      <li>Follow site procedures</li>
    </ul>
    
    <h4>4. Integrity</h4>
    <ul>
      <li>Never accept payment or tips</li>
      <li>No solicitation of business</li>
      <li>Report suspected fraud</li>
      <li>Follow IRS guidelines</li>
    </ul>
    
    <h3>📋 Required Training</h3>
    <p><strong>Publication 4961 - Ethics Training:</strong><br>
    Available through Link & Learn Taxes</p>
    
    <p><strong>Volunteer Standards of Conduct:</strong><br>
    <a href="https://www.irs.gov/individuals/volunteer-training-resources" target="_blank">IRS Training Resources</a></p>
    
    <h3>Taxpayer Rights</h3>
    <p>All taxpayers have rights, including:</p>
    <ul>
      <li>Right to quality service</li>
      <li>Right to privacy and confidentiality</li>
      <li>Right to be informed</li>
      <li>Right to challenge IRS decisions</li>
      <li>Right to a fair and just tax system</li>
    </ul>
    
    <p><strong>Taxpayer Bill of Rights:</strong><br>
    <a href="https://www.irs.gov/taxpayer-bill-of-rights" target="_blank">IRS Taxpayer Bill of Rights</a></p>
    
    <h3>Consequences of Violations</h3>
    <ul>
      <li>Immediate removal from program</li>
      <li>Loss of certification</li>
      <li>Possible legal action</li>
      <li>Site closure</li>
    </ul>'
  ) ON CONFLICT DO NOTHING;
  
  -- Lesson 7: Quality Review Process
  INSERT INTO lessons (course_id, idx, title, video_url, html)
  VALUES (
    v_course_id,
    7,
    'Quality Review and Accuracy',
    NULL,
    '<h2>Ensuring Return Accuracy</h2>
    
    <p>Every tax return prepared at a VITA site must go through a <strong>quality review process</strong> before being filed.</p>
    
    <h3>Quality Review Steps</h3>
    
    <h4>1. Document Review</h4>
    <ul>
      <li>Verify all required documents present</li>
      <li>Check W-2s, 1099s, and other forms</li>
      <li>Confirm Social Security numbers</li>
      <li>Review intake form completeness</li>
    </ul>
    
    <h4>2. Return Review</h4>
    <ul>
      <li>Verify filing status</li>
      <li>Check dependent information</li>
      <li>Review income entries</li>
      <li>Verify deductions and credits</li>
      <li>Check calculations</li>
    </ul>
    
    <h4>3. Taxpayer Interview</h4>
    <ul>
      <li>Review return with taxpayer</li>
      <li>Explain refund or balance due</li>
      <li>Answer questions</li>
      <li>Obtain signature</li>
    </ul>
    
    <h4>4. Final Check</h4>
    <ul>
      <li>Verify bank account information</li>
      <li>Confirm e-file authorization</li>
      <li>Provide copy to taxpayer</li>
      <li>Submit return electronically</li>
    </ul>
    
    <h3>📚 Quality Review Training</h3>
    <p><strong>Publication 5101 - Quality Review Training:</strong><br>
    <a href="https://www.irs.gov/pub/irs-pdf/p5101.pdf" target="_blank">Download PDF</a></p>
    
    <h3>Common Errors to Avoid</h3>
    <ul>
      <li>Incorrect filing status</li>
      <li>Missing or incorrect SSNs</li>
      <li>Math errors</li>
      <li>Incorrect bank account numbers</li>
      <li>Missing signatures</li>
      <li>Incorrect credit calculations</li>
    </ul>
    
    <h3>Quality Assurance Goals</h3>
    <ul>
      <li><strong>Target:</strong> 90% accuracy rate</li>
      <li><strong>Review:</strong> 100% of returns reviewed</li>
      <li><strong>Feedback:</strong> Continuous improvement</li>
    </ul>'
  ) ON CONFLICT DO NOTHING;
  
  -- Lesson 8: Getting Started as a Volunteer
  INSERT INTO lessons (course_id, idx, title, video_url, html)
  VALUES (
    v_course_id,
    8,
    'Getting Started - Next Steps',
    NULL,
    '<h2>Ready to Volunteer?</h2>
    
    <p>You''ve completed the orientation! Here''s how to become an official IRS VITA volunteer.</p>
    
    <h3>🚀 Step-by-Step Process</h3>
    
    <h4>Step 1: Sign Up</h4>
    <p><strong>Complete the official IRS volunteer sign-up form:</strong><br>
    <a href="https://freetaxassistance.for.irs.gov/s/sign-up-form" target="_blank" class="btn btn-primary">Sign Up as VITA Volunteer</a></p>
    
    <h4>Step 2: Complete Training</h4>
    <p><strong>Access Link & Learn Taxes:</strong><br>
    <a href="https://apps.irs.gov/app/vita/" target="_blank">IRS Link & Learn Taxes Portal</a></p>
    
    <ul>
      <li>Register for an account</li>
      <li>Complete Basic certification course</li>
      <li>Study Publication 4012</li>
      <li>Practice in the software lab</li>
    </ul>
    
    <h4>Step 3: Pass Certification Test</h4>
    <ul>
      <li>Take the online certification test</li>
      <li>Score 80% or higher to pass</li>
      <li>Retake if needed (no limit)</li>
      <li>Print your certificate</li>
    </ul>
    
    <h4>Step 4: Find a VITA Site</h4>
    <p><strong>Locate VITA sites near you:</strong><br>
    <a href="https://www.irs.gov/individuals/find-a-location-for-free-tax-prep" target="_blank">IRS - Find a VITA Location</a></p>
    
    <h4>Step 5: Start Volunteering</h4>
    <ul>
      <li>Contact your local site coordinator</li>
      <li>Complete any additional site training</li>
      <li>Schedule your volunteer shifts</li>
      <li>Begin helping taxpayers!</li>
    </ul>
    
    <h3>📞 Need Help?</h3>
    
    <p><strong>IRS Volunteer Resources:</strong><br>
    <a href="https://www.irs.gov/individuals/volunteer-training-resources" target="_blank">Training Resources</a></p>
    
    <p><strong>Partner and Volunteer Resource Center:</strong><br>
    <a href="https://www.irs.gov/individuals/partner-and-volunteer-resource-center" target="_blank">Resource Center</a></p>
    
    <p><strong>Volunteer Hotline:</strong><br>
    Available January through April during tax season</p>
    
    <h3>📅 Important Dates</h3>
    <ul>
      <li><strong>November-December:</strong> Training and certification</li>
      <li><strong>January-April:</strong> Tax season (volunteer period)</li>
      <li><strong>Year-round:</strong> Site coordinator planning</li>
    </ul>
    
    <h3>🎉 Thank You for Volunteering!</h3>
    <p>By becoming a VITA volunteer, you''re making a real difference in your community. Last year, VITA volunteers:</p>
    <ul>
      <li>Prepared over 2.5 million tax returns</li>
      <li>Helped taxpayers receive $2.8 billion in refunds</li>
      <li>Saved taxpayers $400+ million in preparation fees</li>
      <li>Served communities in all 50 states</li>
    </ul>
    
    <p><strong>Ready to get started?</strong><br>
    <a href="https://freetaxassistance.for.irs.gov/s/sign-up-form" target="_blank" class="btn btn-primary btn-lg">Sign Up Now</a></p>'
  ) ON CONFLICT DO NOTHING;
  
END$$;

-- Verify the course was created
SELECT 
  p.title as program,
  c.code,
  c.title as course,
  COUNT(l.id) as lesson_count
FROM programs p
JOIN courses c ON c.program_id = p.id
LEFT JOIN lessons l ON l.course_id = c.id
WHERE p.slug = 'irs-vita-tax-preparation'
GROUP BY p.title, c.code, c.title;
