# Automated Enrollment & Payment Model

## Your Actual Model

**Key Insight:** When a student fills out enrollment, you've already loaded money into Stripe. The enrollment triggers automatic payment processing.

---

## The Complete Flow

```
Student Enrolls → Stripe Payment Auto-Triggered → Student Gets Email → 
Student Logs In → Takes Course → Uploads Credential → 
Repeats for All Courses → Elevate Issues Certificate
```

---

## Step-by-Step Process

### Step 1: Pre-Funded Stripe Account
**Before student enrolls:**
- You load money into Stripe (prepaid model)
- OR you have payment method on file
- OR workforce board has pre-authorized payment

### Step 2: Student Enrollment
**Student fills out enrollment form:**
- Selects program (e.g., CNA, Barber, Building Tech)
- Provides basic info
- Submits enrollment

**What happens automatically:**
```sql
-- Enrollment record created
INSERT INTO enrollments (
  user_id,
  program_id,
  status,
  enrollment_method
) VALUES (
  '[student_id]',
  '[program_id]',
  'pending_payment',
  'workforce' -- or 'purchase'
);
```

### Step 3: Automatic Stripe Payment
**Enrollment triggers Stripe checkout:**

```javascript
// app/api/enrollments/create/route.ts
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [{
    price_data: {
      currency: 'usd',
      product_data: {
        name: program.name,
      },
      unit_amount: program.cost * 100, // Convert to cents
    },
    quantity: 1,
  }],
  mode: 'payment',
  metadata: {
    enrollment_id: enrollment.id,
    payment_type: 'enrollment',
    student_id: student.id,
    program_id: program.id,
  },
  success_url: `${baseUrl}/enrollment/success`,
  cancel_url: `${baseUrl}/enrollment/cancel`,
});
```

### Step 4: Stripe Webhook Processes Payment
**When payment completes:**

```javascript
// app/api/webhooks/stripe/route.ts
case 'checkout.session.completed':
  if (session.metadata?.payment_type === 'enrollment') {
    // Call database function to complete enrollment
    await supabase.rpc('complete_enrollment_payment', {
      p_enrollment_id: session.metadata.enrollment_id,
      p_stripe_session_id: session.id,
      p_stripe_payment_intent_id: session.payment_intent,
      p_amount_cents: session.amount_total,
    });
    
    // Update enrollment status
    await supabase
      .from('enrollments')
      .update({
        status: 'active',
        payment_status: 'paid',
        enrolled_at: new Date(),
      })
      .eq('id', session.metadata.enrollment_id);
    
    // Create course access records
    await createCourseAccess(enrollment);
    
    // Send welcome email with login link
    await sendWelcomeEmail(student);
  }
```

### Step 5: Student Gets Email
**Automated email sent:**
```
Subject: Welcome to [Program Name]!

Hi [Student Name],

Your enrollment is complete! Here's how to get started:

1. Log in: https://www.elevateforhumanity.org/login
2. Access your courses
3. Complete each course
4. Upload your credentials
5. Earn your certificate

Your Login:
Email: [student@email.com]
Password: [Set your password]

Get Started: [Login Button]
```

### Step 6: Student Logs In & Takes Courses
**Student dashboard shows:**
```
📚 Your Program: CNA Certification

Courses (3 of 5 completed):
✅ Course 1: Basic Nursing Skills - Credential Uploaded
✅ Course 2: Patient Care - Credential Uploaded  
✅ Course 3: Medical Terminology - Credential Uploaded
🔄 Course 4: Clinical Practice - In Progress
⏳ Course 5: State Exam Prep - Locked

[Continue Learning]
```

### Step 7: Student Takes Course
**For each course:**

1. **Click course** → Opens partner link
   ```sql
   SELECT partner_url FROM courses WHERE id = '[course_id]';
   -- Returns: https://milady.com/courses/cna-basics
   ```

2. **Student completes course** on partner's platform

3. **Partner issues credential** (certificate, badge, completion proof)

### Step 8: Student Uploads Credential
**After completing course:**

```
Course: Basic Nursing Skills
Status: Completed on partner site

Upload Your Credential:
[Drag & Drop or Click to Upload]

Accepted formats: PDF, JPG, PNG
Max size: 10MB

[Upload Button]
```

**Database update:**
```sql
UPDATE lms_progress
SET 
  status = 'completed',
  completed_at = NOW(),
  evidence_url = '[uploaded_file_url]',
  progress_percent = 100
WHERE user_id = '[student_id]' 
  AND course_id = '[course_id]';
```

### Step 9: Repeat for All Courses
**Student repeats steps 7-8 for each course:**
- Takes course on partner site
- Uploads credential proof
- Moves to next course

**Progress tracking:**
```sql
-- Check program completion
SELECT 
  COUNT(*) as total_courses,
  COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_courses,
  COUNT(CASE WHEN evidence_url IS NOT NULL THEN 1 END) as credentials_uploaded
FROM lms_progress
WHERE user_id = '[student_id]'
  AND course_id IN (
    SELECT id FROM courses WHERE program_id = '[program_id]'
  );
```

### Step 10: Elevate Issues Certificate
**When all courses completed + all credentials uploaded:**

```javascript
// Automatic trigger when last credential uploaded
if (allCoursesCompleted && allCredentialsUploaded) {
  // Generate certificate
  const certificate = await generateCertificate({
    student_id: student.id,
    program_id: program.id,
    completion_date: new Date(),
    courses_completed: courses,
  });
  
  // Save to database
  await supabase.from('certificates').insert({
    user_id: student.id,
    program_id: program.id,
    certificate_number: generateCertificateNumber(),
    issued_at: new Date(),
    certificate_url: certificate.url,
  });
  
  // Send email with certificate
  await sendCertificateEmail(student, certificate);
  
  // Update enrollment status
  await supabase
    .from('enrollments')
    .update({
      status: 'completed',
      completed_at: new Date(),
    })
    .eq('id: enrollment.id);
}
```

---

## Database Schema

### enrollments
```sql
{
  id: uuid,
  user_id: uuid,
  program_id: uuid,
  status: 'pending_payment' | 'active' | 'completed' | 'withdrawn',
  payment_status: 'pending' | 'paid' | 'refunded',
  enrollment_method: 'workforce' | 'purchase',
  enrolled_at: timestamp,
  completed_at: timestamp,
  stripe_session_id: text,
  stripe_payment_intent_id: text,
  amount_paid: decimal
}
```

### lms_progress (tracks course completion)
```sql
{
  id: uuid,
  user_id: uuid,
  course_id: uuid,
  status: 'not_started' | 'in_progress' | 'completed',
  started_at: timestamp,
  completed_at: timestamp,
  evidence_url: text,  -- Uploaded credential
  progress_percent: integer,
  last_activity_at: timestamp
}
```

### courses (with partner links)
```sql
{
  id: uuid,
  title: text,
  program_id: uuid,
  delivery_mode: 'partner_link',
  partner_url: text,  -- Link to partner's course
  requires_credential: boolean,  -- Must upload proof
  credential_instructions: text,  -- What to upload
  is_published: boolean
}
```

### certificates
```sql
{
  id: uuid,
  user_id: uuid,
  program_id: uuid,
  certificate_number: text,
  issued_at: timestamp,
  certificate_url: text,
  is_revoked: boolean
}
```

---

## Example: CNA Program

### Program Setup
```sql
-- CNA Program
INSERT INTO programs (name, slug, cost) 
VALUES ('CNA Certification', 'cna-certification', 1500.00);

-- Course 1: Basic Nursing Skills
INSERT INTO courses (
  title,
  program_id,
  delivery_mode,
  partner_url,
  requires_credential,
  credential_instructions
) VALUES (
  'Basic Nursing Skills',
  '[cna_program_id]',
  'partner_link',
  'https://milady.com/courses/nursing-basics',
  true,
  'Upload your completion certificate from Milady'
);

-- Course 2: Patient Care
INSERT INTO courses (...) VALUES (...);

-- Course 3: Medical Terminology
INSERT INTO courses (...) VALUES (...);

-- Course 4: Clinical Practice
INSERT INTO courses (...) VALUES (...);

-- Course 5: State Exam Prep
INSERT INTO courses (...) VALUES (...);
```

### Student Journey
1. **Enrolls** → Stripe charges $1,500
2. **Gets email** → "Welcome! Login to start"
3. **Logs in** → Sees 5 courses
4. **Course 1** → Clicks → Opens Milady link
5. **Completes** → Uploads Milady certificate
6. **Course 2** → Repeats process
7. **Course 3** → Repeats process
8. **Course 4** → Repeats process
9. **Course 5** → Repeats process
10. **All done** → Elevate issues CNA Certificate

---

## Payment Models

### Model 1: Workforce Board (Pre-Authorized)
```
Workforce Board → Pre-authorizes $1,500 → 
Student Enrolls → Stripe charges board → 
Student gets access
```

### Model 2: Student Self-Pay
```
Student Enrolls → Stripe checkout → 
Student pays $1,500 → 
Student gets access
```

### Model 3: Voucher/Code
```
Student has voucher code → 
Enrolls with code → 
No payment required → 
Student gets access
```

---

## Credential Upload System

### Upload Interface
```typescript
// components/CredentialUpload.tsx
export function CredentialUpload({ courseId, userId }) {
  const handleUpload = async (file: File) => {
    // Upload to S3 or Supabase Storage
    const { data: upload } = await supabase.storage
      .from('credentials')
      .upload(`${userId}/${courseId}/${file.name}`, file);
    
    // Update progress record
    await supabase
      .from('lms_progress')
      .update({
        evidence_url: upload.path,
        status: 'completed',
        completed_at: new Date(),
      })
      .eq('user_id', userId)
      .eq('course_id', courseId);
    
    // Check if all courses completed
    await checkProgramCompletion(userId, programId);
  };
  
  return (
    <div className="upload-zone">
      <input type="file" onChange={handleUpload} />
      <p>Upload your completion certificate</p>
    </div>
  );
}
```

### Validation
```typescript
async function validateCredential(evidenceUrl: string) {
  // Check file exists
  const { data: file } = await supabase.storage
    .from('credentials')
    .download(evidenceUrl);
  
  if (!file) {
    throw new Error('Credential file not found');
  }
  
  // Optional: OCR/AI validation
  // Check if it's a valid certificate
  // Verify issuer, date, student name, etc.
  
  return true;
}
```

---

## Certificate Generation

### When to Issue
```typescript
async function checkProgramCompletion(userId: string, programId: string) {
  // Get all courses in program
  const { data: courses } = await supabase
    .from('courses')
    .select('id')
    .eq('program_id', programId);
  
  // Check if all completed with credentials
  const { data: progress } = await supabase
    .from('lms_progress')
    .select('*')
    .eq('user_id', userId)
    .in('course_id', courses.map(c => c.id));
  
  const allCompleted = progress.every(p => 
    p.status === 'completed' && p.evidence_url
  );
  
  if (allCompleted) {
    await issueCertificate(userId, programId);
  }
}
```

### Certificate Template
```typescript
async function issueCertificate(userId: string, programId: string) {
  const certificateNumber = generateCertificateNumber();
  
  // Generate PDF certificate
  const pdf = await generateCertificatePDF({
    studentName: student.full_name,
    programName: program.name,
    completionDate: new Date(),
    certificateNumber,
    courses: completedCourses,
  });
  
  // Upload to storage
  const { data: upload } = await supabase.storage
    .from('certificates')
    .upload(`${userId}/${certificateNumber}.pdf`, pdf);
  
  // Save record
  await supabase.from('certificates').insert({
    user_id: userId,
    program_id: programId,
    certificate_number: certificateNumber,
    certificate_url: upload.path,
    issued_at: new Date(),
  });
  
  // Send email
  await sendCertificateEmail(student, upload.publicUrl);
}
```

---

## Admin Dashboard Views

### Enrollment Management
```
Pending Payments (3)
├─ John Doe - CNA Program - $1,500 - Awaiting payment
├─ Jane Smith - Barber - $1,200 - Payment processing
└─ Bob Johnson - Building Tech - $1,800 - Payment failed

Active Enrollments (45)
├─ Sarah Williams - CNA - 3/5 courses completed
├─ Mike Brown - Barber - 2/4 courses completed
└─ ...

Completed (120)
├─ Tom Davis - CNA - Certificate issued
└─ ...
```

### Credential Review
```
Pending Credential Review (8)
├─ John Doe - Course: Basic Nursing - Uploaded 2 hours ago
│   [View Credential] [Approve] [Reject]
├─ Jane Smith - Course: Hair Cutting - Uploaded 1 day ago
│   [View Credential] [Approve] [Reject]
└─ ...
```

### Certificate Issuance
```
Ready for Certificate (5)
├─ Sarah Williams - CNA - All 5 courses completed
│   [Issue Certificate]
├─ Mike Brown - Barber - All 4 courses completed
│   [Issue Certificate]
└─ ...

Issued Certificates (120)
├─ Tom Davis - CNA - Cert #EFH-CNA-2026-001
│   [View] [Download] [Revoke]
└─ ...
```

---

## Configuration Checklist

### Stripe Setup
- [ ] Stripe account configured
- [ ] Webhook endpoint set up
- [ ] Webhook secret added to env vars
- [ ] Test payment flow

### Course Setup
- [ ] Programs created
- [ ] Courses added with partner links
- [ ] Credential requirements defined
- [ ] Upload instructions written

### Email Templates
- [ ] Welcome email
- [ ] Course access email
- [ ] Credential reminder email
- [ ] Certificate issued email

### Storage Setup
- [ ] S3 or Supabase Storage configured
- [ ] Credentials bucket created
- [ ] Certificates bucket created
- [ ] Public access configured for certificates

---

## Next Steps

1. **Verify Stripe webhook is working**
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

2. **Test enrollment flow**
   - Create test enrollment
   - Verify payment triggers
   - Check email sent
   - Test login access

3. **Test credential upload**
   - Upload test file
   - Verify storage
   - Check progress update

4. **Test certificate generation**
   - Complete all courses
   - Upload all credentials
   - Verify certificate issued

5. **Add course links from fix2**
   - Find course data in fix2 repo
   - Import to current database
   - Verify links work

---

**Your system is already built for this automated flow. You just need to configure the courses and partner links.**
