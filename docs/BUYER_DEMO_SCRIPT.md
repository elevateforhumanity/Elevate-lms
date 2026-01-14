# Buyer Demo Script (10-12 Minutes)

## Pre-Demo Setup
- Browser open to production or staging URL
- Logged in as admin user
- Sample case data seeded (pending_signatures, active, completed)

---

## Minute 0-1: Opening
**Route: Homepage**

"Thank you for joining. Today I'll show you how our platform automates workforce program management from enrollment through completion.

The key differentiator: this is a system of record with signature-driven activation. Once required parties sign, the system takes over—creating tasks, logging events, and generating compliance reports automatically."

---

## Minute 1-2: Platform Overview
**Route: /store**

"This is our platform licensing page. We provide the complete automation infrastructure:
- Automated case enrollment
- Multi-party signature workflows
- Event-based task automation
- Audit-ready reporting

Pricing is scope-based depending on your region and requirements."

**Click: View Licensing Options**

---

## Minute 2-3: Licensing Details
**Route: /license (redirects to /pricing/sponsor-licensing)**

"The platform serves as the system of record for your programs. 

Key points:
- Program activation is driven by required signatures
- Tasks and milestones initialize automatically
- All actions are logged for audit and reimbursement

Credentials and instructional content can be provided by you or your partners. We provide the infrastructure."

---

## Minute 3-5: Admin Dashboard Demo
**Route: /demo/admin**

"Let me show you the admin view. This is where program staff manage cases.

[Point to case list]
Here you see all enrollment cases with their current status:
- Draft: Application received
- Pending Signatures: Waiting for required parties
- Active: All signatures complete, tasks initialized
- Completed: Program finished

[Click into a case]
Each case shows:
- The three-party signature status (student, employer, program holder)
- Auto-generated tasks with due dates
- Complete event timeline for audit

Notice the tasks were created automatically when signatures completed. No manual setup required."

---

## Minute 5-7: Signature Flow Demo
**Route: /demo/admin → Case Detail**

"Let me show you the signature-driven activation.

[Show a pending_signatures case]
This case is waiting for the employer signature. Watch what happens when it's added.

[Simulate or show completed case]
Once all three signatures are in:
1. System validates completeness
2. Case status changes to 'active'
3. Tasks are auto-created from templates
4. Audit events are logged

This is the core automation. No staff intervention needed."

---

## Minute 7-8: Learner View
**Route: /demo/learner**

"From the student's perspective, they see:
- Their case status
- Required tasks with due dates
- Document upload interface
- Progress toward completion

Everything is role-based. Students only see their own data."

---

## Minute 8-9: Employer/Partner View
**Route: /demo/employer (if exists) or describe**

"Employers and partners have their own portal:
- Cases assigned to them
- Signature requests
- Hours verification workflow
- Compliance documentation

Each party sees only what's relevant to their role."

---

## Minute 9-10: Audit & Reporting
**Route: /demo/admin → Case Events or Reports**

"Every action creates an audit record:
- Case created
- Signature added
- Status changed
- Task completed
- Document uploaded

This is append-only—nothing can be deleted or modified. 

For WIOA, RAPIDS, or agency reporting, you can export:
- Case timelines
- Completion reports
- Compliance summaries

All data is already structured for your reporting requirements."

---

## Minute 10-11: Implementation Overview
**Route: Stay on admin or return to /license**

"Implementation typically takes 6-8 weeks:
- Weeks 1-2: Environment setup
- Weeks 3-4: Data migration and integration
- Weeks 5-6: Training and pilot
- Week 7+: Production launch

We handle the technical deployment. Your team focuses on program operations."

---

## Minute 11-12: Next Steps
**Route: /schedule**

"To move forward:
1. We'll have a scoping call to understand your specific requirements
2. I'll prepare a licensing proposal based on your region and volume
3. We'll plan the implementation timeline

You can schedule directly here, or I can send you a calendar link.

Questions?"

---

## Handling Common Questions

**Q: Can we customize the task templates?**
"Yes. Task templates are data-driven. We configure them during implementation based on your program requirements."

**Q: How does this integrate with our existing systems?**
"Integrations are supported via API and workflow configuration. Scope depends on your partner environment. We'll discuss specifics during the scoping call."

**Q: What about data security?**
"Row-level security is enforced at the database level. Each user only sees data they're authorized to access. Audit logs are append-only and tamper-evident."

**Q: Is this WIOA/RAPIDS compliant?**
"The platform is designed for compliance. Audit logging, signature tracking, and reporting are built for WIOA and RAPIDS requirements. We can walk through specific compliance needs during scoping."

---

## Post-Demo Follow-Up

Within 24 hours:
1. Send thank-you email with deck attached
2. Include link to /schedule for follow-up
3. Note any specific requirements discussed
4. Prepare scoping questions for next call
