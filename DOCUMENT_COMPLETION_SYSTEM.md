# Document-Based Completion System

**Date:** January 4, 2026  
**Concept:** Upload partner certificates → Auto-generate Elevate certificate  
**Status:** Ready to implement  
**Timeline:** 3-4 days

---

## The Concept

### Student Journey:

```
1. Student enrolls in "CNA Training"
   Required certificates:
   - CNA State Certification (from Certiport/Milady)
   - CPR Certification (from Red Cross)
   - Background Check (from state)

2. Student completes courses on partner platforms
   ✅ Gets CNA cert from Certiport
   ✅ Gets CPR cert from Red Cross
   ✅ Gets background check clearance

3. Student uploads all 3 certificates to Elevate
   📄 Upload CNA cert → ✅ Verified
   📄 Upload CPR cert → ✅ Verified
   📄 Upload background check → ✅ Verified

4. System detects all required docs uploaded
   🎉 Auto-generate Elevate completion certificate
   ✅ Mark enrollment complete
   📧 Send completion email
   📊 Trigger WIOA reporting
```

---

## Course Progression System

### The Flow:

```
Student uploads certificate for Course 1
    ↓
System detects all Course 1 certificates uploaded
    ↓
Mark Course 1 complete
    ↓
Generate Elevate certificate for Course 1
    ↓
Check if there's a Course 2 in sequence
    ↓
Send email: "Ready to start Course 2?"
    ↓
Student clicks link → Enrolls in Course 2
    ↓
Repeat process
```

### Example: CNA Training Program

**Course Sequence:**
1. **CNA Fundamentals** (Certiport)
   - Required: CNA Theory Certificate
   - Duration: 4 weeks
   
2. **CPR Certification** (Red Cross)
   - Required: CPR Certificate
   - Duration: 1 day
   
3. **Clinical Skills** (Local Hospital)
   - Required: Clinical Hours Certificate
   - Duration: 2 weeks
   
4. **State Exam Prep** (Milady)
   - Required: Exam Pass Certificate
   - Duration: 1 week

**Student Journey:**
```
Week 1-4: Complete CNA Fundamentals
    ↓ Upload certificate
    📧 Email: "Ready for CPR Certification?"
    
Week 5: Complete CPR
    ↓ Upload certificate
    📧 Email: "Ready for Clinical Skills?"
    
Week 6-7: Complete Clinical Skills
    ↓ Upload certificate
    📧 Email: "Ready for State Exam Prep?"
    
Week 8: Complete State Exam Prep
    ↓ Upload certificate
    🎉 Program Complete!
    📜 Elevate Certificate Generated
```

---

## Database Schema

### Update `programs` table for course sequences:

```sql
ALTER TABLE programs 
ADD COLUMN IF NOT EXISTS course_sequence JSONB DEFAULT '[]'::jsonb;

-- Example: CNA Training with 4-course sequence
UPDATE programs 
SET course_sequence = '[
  "course-id-1-cna-fundamentals",
  "course-id-2-cpr-certification",
  "course-id-3-clinical-skills",
  "course-id-4-state-exam-prep"
]'::jsonb
WHERE slug = 'cna-training';
```

### New Table: `enrollment_documents`

```sql
CREATE TABLE enrollment_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID NOT NULL REFERENCES partner_lms_enrollments(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Document info
  document_type TEXT NOT NULL, -- 'partner_certificate', 'cpr_cert', 'background_check', etc.
  required BOOLEAN NOT NULL DEFAULT true,
  
  -- Upload info
  file_url TEXT,
  file_name TEXT,
  file_size INTEGER,
  mime_type TEXT,
  uploaded_at TIMESTAMPTZ,
  
  -- Verification
  verified BOOLEAN DEFAULT false,
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES profiles(id),
  verification_notes TEXT,
  
  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_enrollment_documents_enrollment ON enrollment_documents(enrollment_id);
CREATE INDEX idx_enrollment_documents_student ON enrollment_documents(student_id);
CREATE INDEX idx_enrollment_documents_type ON enrollment_documents(document_type);
CREATE INDEX idx_enrollment_documents_verified ON enrollment_documents(verified);
```

---

### Update `programs` table to define required documents:

```sql
ALTER TABLE programs 
ADD COLUMN IF NOT EXISTS required_documents JSONB DEFAULT '[]'::jsonb;

-- Example data:
UPDATE programs 
SET required_documents = '[
  {
    "type": "partner_certificate",
    "name": "CNA State Certification",
    "description": "Certificate from Certiport or Milady showing CNA completion",
    "required": true
  },
  {
    "type": "cpr_certification",
    "name": "CPR Certification",
    "description": "Current CPR certification from Red Cross or AHA",
    "required": true
  },
  {
    "type": "background_check",
    "name": "Background Check",
    "description": "State background check clearance",
    "required": true
  }
]'::jsonb
WHERE slug = 'cna-training';
```

---

## Implementation

### Step 1: Document Upload Page

**File:** `app/lms/enrollments/[enrollmentId]/documents/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { Upload, CheckCircle, Clock, FileText } from 'lucide-react';

export default function EnrollmentDocumentsPage({ params }: { params: { enrollmentId: string } }) {
  const [enrollment, setEnrollment] = useState(null);
  const [requiredDocs, setRequiredDocs] = useState([]);
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadEnrollmentData();
  }, []);

  async function loadEnrollmentData() {
    // Get enrollment with program requirements
    const response = await fetch(`/api/enrollments/${params.enrollmentId}/documents`);
    const data = await response.json();
    
    setEnrollment(data.enrollment);
    setRequiredDocs(data.requiredDocuments);
    setUploadedDocs(data.uploadedDocuments);
  }

  async function handleUpload(documentType: string, file: File) {
    setUploading(true);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);
    formData.append('enrollmentId', params.enrollmentId);

    try {
      const response = await fetch('/api/enrollments/documents/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        await loadEnrollmentData(); // Refresh
        
        // Check if all docs uploaded
        const { allUploaded } = await response.json();
        if (allUploaded) {
          // Show success message
          alert('🎉 All documents uploaded! Your Elevate certificate is being generated...');
        }
      }
    } finally {
      setUploading(false);
    }
  }

  const allDocsUploaded = requiredDocs.every(doc => 
    uploadedDocs.some(uploaded => uploaded.document_type === doc.type && uploaded.verified)
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Upload Your Certificates</h1>
      <p className="text-gray-600 mb-8">
        Upload all required certificates to receive your Elevate for Humanity completion certificate.
      </p>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span>Progress</span>
          <span>{uploadedDocs.filter(d => d.verified).length} of {requiredDocs.length} uploaded</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-green-600 h-3 rounded-full transition-all"
            style={{ 
              width: `${(uploadedDocs.filter(d => d.verified).length / requiredDocs.length) * 100}%` 
            }}
          />
        </div>
      </div>

      {/* Document List */}
      <div className="space-y-4">
        {requiredDocs.map((doc) => {
          const uploaded = uploadedDocs.find(u => u.document_type === doc.type);
          
          return (
            <div key={doc.type} className="border rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-lg">{doc.name}</h3>
                    {uploaded?.verified && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                    {uploaded && !uploaded.verified && (
                      <Clock className="w-5 h-5 text-yellow-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{doc.description}</p>
                  
                  {uploaded && (
                    <div className="bg-gray-50 rounded p-3 text-sm">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span>{uploaded.file_name}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Uploaded {new Date(uploaded.uploaded_at).toLocaleDateString()}
                        {uploaded.verified && ' • Verified ✓'}
                        {!uploaded.verified && ' • Pending verification'}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  {!uploaded && (
                    <label className="btn-primary cursor-pointer">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleUpload(doc.type, file);
                        }}
                      />
                    </label>
                  )}
                  
                  {uploaded && !uploaded.verified && (
                    <button 
                      className="btn-secondary"
                      onClick={() => handleUpload(doc.type, null)} // Re-upload
                    >
                      Replace
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Status */}
      {allDocsUploaded && (
        <div className="mt-8 bg-green-50 border-2 border-green-500 rounded-lg p-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-900 mb-2">
            🎉 Congratulations!
          </h2>
          <p className="text-green-800 mb-4">
            All required documents have been uploaded and verified.
          </p>
          <a 
            href={`/certificates/${enrollment.id}`}
            className="btn-primary inline-block"
          >
            Download Your Elevate Certificate
          </a>
        </div>
      )}
    </div>
  );
}
```

---

### Step 2: Upload API Endpoint

**File:** `app/api/enrollments/documents/upload/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getCurrentUser } from '@/lib/auth';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const documentType = formData.get('documentType') as string;
    const enrollmentId = formData.get('enrollmentId') as string;

    if (!file || !documentType || !enrollmentId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = await createClient();

    // Verify enrollment belongs to user
    const { data: enrollment } = await supabase
      .from('partner_lms_enrollments')
      .select('*, program:programs(required_documents)')
      .eq('id', enrollmentId)
      .eq('student_id', user.id)
      .single();

    if (!enrollment) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
    }

    // Upload file to Supabase Storage
    const fileName = `${enrollmentId}/${documentType}/${Date.now()}_${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('enrollment-documents')
      .upload(fileName, file);

    if (uploadError) {
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('enrollment-documents')
      .getPublicUrl(fileName);

    // Save document record
    const { data: document } = await supabase
      .from('enrollment_documents')
      .insert({
        enrollment_id: enrollmentId,
        student_id: user.id,
        document_type: documentType,
        file_url: publicUrl,
        file_name: file.name,
        file_size: file.size,
        mime_type: file.type,
        uploaded_at: new Date().toISOString(),
        verified: true, // Auto-verify (or set to false for manual review)
        verified_at: new Date().toISOString()
      })
      .select()
      .single();

    // Check if all required documents are uploaded
    const requiredDocs = enrollment.program.required_documents || [];
    const { data: uploadedDocs } = await supabase
      .from('enrollment_documents')
      .select('document_type, verified')
      .eq('enrollment_id', enrollmentId)
      .eq('verified', true);

    const allUploaded = requiredDocs.every((req: any) =>
      uploadedDocs?.some(doc => doc.document_type === req.type)
    );

    // If all documents uploaded, mark enrollment complete
    if (allUploaded) {
      await completeEnrollment(enrollmentId);
    }

    return NextResponse.json({
      document,
      allUploaded,
      message: allUploaded 
        ? 'All documents uploaded! Enrollment marked complete.' 
        : 'Document uploaded successfully.'
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

async function completeEnrollment(enrollmentId: string) {
  const supabase = await createClient();

  // Update enrollment status
  await supabase
    .from('partner_lms_enrollments')
    .update({
      status: 'completed',
      completed_at: new Date().toISOString(),
      progress_percentage: 100
    })
    .eq('id', enrollmentId);

  // Generate Elevate certificate
  await generateElevateCertificate(enrollmentId);

  // Send completion email
  await sendCompletionEmail(enrollmentId);

  // Trigger WIOA reporting
  await triggerWIOAReporting(enrollmentId);

  // Check for next course in sequence
  await checkAndEnrollNextCourse(enrollmentId);
}

async function generateElevateCertificate(enrollmentId: string) {
  // Call certificate generation API
  await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/certificates/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ enrollmentId })
  });
}

async function sendCompletionEmail(enrollmentId: string) {
  // Send email notification
  await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/email/completion`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ enrollmentId })
  });
}

async function triggerWIOAReporting(enrollmentId: string) {
  // Update WIOA compliance data
  await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/compliance/wioa/update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ enrollmentId, status: 'completed' })
  });
}

async function checkAndEnrollNextCourse(enrollmentId: string) {
  const supabase = await createClient();

  // Get current enrollment with program info
  const { data: enrollment } = await supabase
    .from('partner_lms_enrollments')
    .select(`
      *,
      program:programs(
        id,
        course_sequence
      ),
      student:profiles(
        id,
        email,
        full_name
      )
    `)
    .eq('id', enrollmentId)
    .single();

  if (!enrollment?.program?.course_sequence) return;

  // Find current course position in sequence
  const sequence = enrollment.program.course_sequence; // Array of course IDs
  const currentIndex = sequence.findIndex((id: string) => id === enrollment.course_id);
  
  if (currentIndex === -1 || currentIndex === sequence.length - 1) {
    // Last course or not in sequence - program complete
    return;
  }

  // Get next course
  const nextCourseId = sequence[currentIndex + 1];
  const { data: nextCourse } = await supabase
    .from('partner_courses')
    .select(`
      *,
      provider:partner_lms_providers(*)
    `)
    .eq('id', nextCourseId)
    .single();

  if (!nextCourse) return;

  // Send email to start next course
  await sendNextCourseEmail({
    studentEmail: enrollment.student.email,
    studentName: enrollment.student.full_name,
    completedCourse: enrollment.course.course_name,
    nextCourse: nextCourse.course_name,
    nextCourseProvider: nextCourse.provider.provider_name,
    enrollmentUrl: `${process.env.NEXT_PUBLIC_APP_URL}/enroll/${nextCourseId}`
  });
}

async function sendNextCourseEmail(data: {
  studentEmail: string;
  studentName: string;
  completedCourse: string;
  nextCourse: string;
  nextCourseProvider: string;
  enrollmentUrl: string;
}) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Ready for Your Next Course!</title>
    </head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #E63946 0%, #F77F00 50%, #06A77D 100%); padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 32px;">🎉 Congratulations!</h1>
      </div>
      
      <div style="background: white; padding: 40px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <h2 style="color: #111827; margin-top: 0;">Hi ${data.studentName},</h2>
        
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
          Great job completing <strong>${data.completedCourse}</strong>! 🎓
        </p>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 30px 0;">
          <h3 style="color: #111827; margin-top: 0;">📚 Ready for Your Next Course?</h3>
          <p style="color: #4b5563; margin-bottom: 0;">
            <strong>${data.nextCourse}</strong><br>
            <span style="color: #6b7280; font-size: 14px;">via ${data.nextCourseProvider}</span>
          </p>
        </div>
        
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
          You're making excellent progress! Click below to start your next course:
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${data.enrollmentUrl}" 
             style="background: #E63946; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
            Start Next Course →
          </a>
        </div>
        
        <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
          Questions? Reply to this email or contact us at support@elevateforhumanity.org
        </p>
      </div>
      
      <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
        <p>Elevate for Humanity<br>
        Empowering careers through education</p>
      </div>
    </body>
    </html>
  `;

  // Send via Resend
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'Elevate for Humanity <noreply@elevateforhumanity.org>',
      to: data.studentEmail,
      subject: `🎉 Ready for ${data.nextCourse}?`,
      html
    })
  });
}
```

---

### Step 3: Certificate Generation

**File:** `app/api/certificates/generate/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import PDFDocument from 'pdfkit';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const { enrollmentId } = await request.json();
    const supabase = await createClient();

    // Get enrollment data
    const { data: enrollment } = await supabase
      .from('partner_lms_enrollments')
      .select(`
        *,
        student:profiles(full_name, email),
        program:programs(title),
        course:partner_courses(course_name)
      `)
      .eq('id', enrollmentId)
      .single();

    if (!enrollment) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
    }

    // Generate PDF certificate
    const pdfBuffer = await generateCertificatePDF({
      studentName: enrollment.student.full_name,
      programName: enrollment.program.title,
      completionDate: enrollment.completed_at,
      certificateId: enrollmentId
    });

    // Upload to storage
    const fileName = `certificates/${enrollmentId}.pdf`;
    const { data: uploadData } = await supabase.storage
      .from('certificates')
      .upload(fileName, pdfBuffer, {
        contentType: 'application/pdf',
        upsert: true
      });

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('certificates')
      .getPublicUrl(fileName);

    // Save certificate record
    const { data: certificate } = await supabase
      .from('certificates')
      .insert({
        enrollment_id: enrollmentId,
        student_id: enrollment.student_id,
        certificate_url: publicUrl,
        issued_at: new Date().toISOString(),
        certificate_type: 'completion',
        metadata: {
          program: enrollment.program.title,
          completionDate: enrollment.completed_at
        }
      })
      .select()
      .single();

    return NextResponse.json({ certificate, url: publicUrl });

  } catch (error) {
    console.error('Certificate generation error:', error);
    return NextResponse.json({ error: 'Failed to generate certificate' }, { status: 500 });
  }
}

async function generateCertificatePDF(data: {
  studentName: string;
  programName: string;
  completionDate: string;
  certificateId: string;
}): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'LETTER', layout: 'landscape' });
    const chunks: Buffer[] = [];

    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    // Certificate design
    doc.fontSize(48)
       .font('Helvetica-Bold')
       .text('Certificate of Completion', 100, 100, { align: 'center' });

    doc.fontSize(24)
       .font('Helvetica')
       .text('This certifies that', 100, 200, { align: 'center' });

    doc.fontSize(36)
       .font('Helvetica-Bold')
       .text(data.studentName, 100, 250, { align: 'center' });

    doc.fontSize(24)
       .font('Helvetica')
       .text('has successfully completed', 100, 320, { align: 'center' });

    doc.fontSize(32)
       .font('Helvetica-Bold')
       .text(data.programName, 100, 370, { align: 'center' });

    doc.fontSize(18)
       .font('Helvetica')
       .text(`Completion Date: ${new Date(data.completionDate).toLocaleDateString()}`, 100, 450, { align: 'center' });

    doc.fontSize(12)
       .text(`Certificate ID: ${data.certificateId}`, 100, 500, { align: 'center' });

    // Add logo
    // doc.image('path/to/logo.png', 350, 50, { width: 100 });

    doc.end();
  });
}
```

---

## Student Dashboard Integration

**Add to:** `app/lms/(app)/dashboard/page.tsx`

```typescript
// Show document upload prompt for active enrollments
{enrollments.map(enrollment => {
  const docsComplete = enrollment.documents_uploaded === enrollment.documents_required;
  
  return (
    <div key={enrollment.id} className="card">
      <h3>{enrollment.course.course_name}</h3>
      
      {!docsComplete && (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mt-4">
          <p className="text-sm font-medium text-yellow-900">
            📄 Upload your certificates to complete this program
          </p>
          <Link 
            href={`/lms/enrollments/${enrollment.id}/documents`}
            className="btn-sm btn-primary mt-2"
          >
            Upload Documents ({enrollment.documents_uploaded}/{enrollment.documents_required})
          </Link>
        </div>
      )}
      
      {docsComplete && (
        <div className="bg-green-50 border border-green-200 rounded p-4 mt-4">
          <p className="text-sm font-medium text-green-900">
            ✅ All documents uploaded!
          </p>
          <Link 
            href={`/certificates/${enrollment.id}`}
            className="btn-sm btn-primary mt-2"
          >
            Download Certificate
          </Link>
        </div>
      )}
    </div>
  );
})}
```

---

## Benefits

### For Students:
✅ Clear checklist of what to upload
✅ Motivated to complete (need Elevate cert)
✅ Instant completion when done
✅ Professional certificate from Elevate

### For Platform:
✅ Automatic completion detection
✅ Paper trail for compliance
✅ No manual verification needed
✅ Works with any partner
✅ WIOA reporting automated

### For Compliance:
✅ All certificates stored
✅ Audit trail complete
✅ Verification timestamps
✅ Easy to generate reports

---

## Timeline

### Day 1: Database & Storage
- [ ] Create `enrollment_documents` table
- [ ] Set up Supabase storage bucket
- [ ] Add `required_documents` to programs

### Day 2: Upload System
- [ ] Build upload page UI
- [ ] Create upload API endpoint
- [ ] Test file uploads

### Day 3: Completion Logic
- [ ] Add completion detection
- [ ] Build certificate generation
- [ ] Test full flow

### Day 4: Integration & Polish
- [ ] Add to dashboard
- [ ] Email notifications
- [ ] WIOA reporting trigger
- [ ] Test end-to-end

---

## Example: CNA Training

### Required Documents:
```json
{
  "required_documents": [
    {
      "type": "partner_certificate",
      "name": "CNA State Certification",
      "description": "Certificate from Certiport or Milady",
      "required": true
    },
    {
      "type": "cpr_certification",
      "name": "CPR Certification",
      "description": "Current CPR cert from Red Cross or AHA",
      "required": true
    },
    {
      "type": "background_check",
      "name": "Background Check Clearance",
      "description": "State background check clearance letter",
      "required": true
    }
  ]
}
```

### Student uploads all 3 → Auto-complete → Generate Elevate certificate

---

## Bottom Line

**This is the PERFECT solution for completion tracking:**

✅ **Automatic** - No manual marking needed
✅ **Compliant** - Creates paper trail
✅ **Motivating** - Students want Elevate certificate
✅ **Universal** - Works with any partner
✅ **Scalable** - No API integrations needed

**Implementation: 3-4 days**

**This solves your completion tracking problem completely.** 🎉

---

---

## Automated Course Progression

### Email Triggers

**After each certificate upload:**

1. **Single Course Upload:**
   ```
   Student uploads CNA certificate
       ↓
   Email: "Certificate received! Upload CPR cert to continue"
   ```

2. **All Certificates for Course Uploaded:**
   ```
   Student uploads last required certificate
       ↓
   Email: "Course complete! Ready to start [Next Course]?"
   ```

3. **Program Complete:**
   ```
   Student uploads last certificate of final course
       ↓
   Email: "Congratulations! Download your Elevate certificate"
   ```

---

### Email Templates

#### Template 1: Certificate Received (Individual)

```
Subject: ✅ Certificate Received - [Certificate Name]

Hi [Student Name],

Great! We've received your [Certificate Name].

Next Steps:
- Upload [Remaining Certificate Name]
- Upload [Remaining Certificate Name]

Once all certificates are uploaded, you'll receive your Elevate completion certificate.

[Upload Documents →]
```

#### Template 2: Course Complete - Next Course Available

```
Subject: 🎉 [Course Name] Complete! Ready for [Next Course]?

Hi [Student Name],

Congratulations on completing [Course Name]! 🎓

Your next course is ready:
📚 [Next Course Name]
🏢 via [Partner Name]
⏱️ Estimated time: [Duration]

[Start Next Course →]

Keep up the great work!
```

#### Template 3: Program Complete

```
Subject: 🎉 Program Complete! Download Your Certificate

Hi [Student Name],

Congratulations! You've completed the entire [Program Name] program! 🎓

You've successfully finished:
✅ [Course 1]
✅ [Course 2]
✅ [Course 3]
✅ [Course 4]

[Download Your Elevate Certificate →]

Next Steps:
- Download your certificate
- Update your resume
- Apply for jobs
- Share on LinkedIn

We're proud of your achievement!
```

---

### Implementation: Email Triggers

**File:** `app/api/enrollments/documents/upload/route.ts`

Add after document upload:

```typescript
// After saving document
const { data: document } = await supabase
  .from('enrollment_documents')
  .insert({...})
  .select()
  .single();

// Send individual certificate received email
await sendCertificateReceivedEmail({
  studentEmail: user.email,
  studentName: user.full_name,
  certificateName: getDocumentName(documentType),
  remainingCertificates: getRemainingCertificates(enrollmentId)
});

// Check if all documents uploaded
const allUploaded = requiredDocs.every((req: any) =>
  uploadedDocs?.some(doc => doc.document_type === req.type)
);

if (allUploaded) {
  // All certificates for this course uploaded
  await completeEnrollment(enrollmentId);
}
```

---

### Student Dashboard Updates

**Show progression clearly:**

```typescript
// app/lms/(app)/dashboard/page.tsx

<div className="space-y-6">
  {/* Current Course */}
  <div className="card">
    <h3>Current Course: CNA Fundamentals</h3>
    <div className="mt-4">
      <h4 className="font-semibold mb-2">Required Certificates:</h4>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span>CNA Theory Certificate</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-yellow-600" />
          <span>CPR Certificate (pending)</span>
        </div>
      </div>
      <button className="btn-primary mt-4">
        Upload Remaining Certificates
      </button>
    </div>
  </div>

  {/* Next Courses */}
  <div className="card bg-gray-50">
    <h3 className="text-gray-600">Coming Up Next:</h3>
    <div className="mt-4 space-y-2">
      <div className="flex items-center gap-2 text-gray-500">
        <Lock className="w-4 h-4" />
        <span>CPR Certification</span>
      </div>
      <div className="flex items-center gap-2 text-gray-500">
        <Lock className="w-4 h-4" />
        <span>Clinical Skills</span>
      </div>
      <div className="flex items-center gap-2 text-gray-500">
        <Lock className="w-4 h-4" />
        <span>State Exam Prep</span>
      </div>
    </div>
  </div>

  {/* Progress Overview */}
  <div className="card">
    <h3>Program Progress</h3>
    <div className="mt-4">
      <div className="flex justify-between text-sm mb-2">
        <span>1 of 4 courses complete</span>
        <span>25%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div className="bg-green-600 h-3 rounded-full" style={{ width: '25%' }} />
      </div>
    </div>
  </div>
</div>
```

---

## Benefits of This System

### For Students:
✅ **Clear path forward** - Always know what's next
✅ **Motivated to continue** - Email prompts keep momentum
✅ **Sense of progress** - See completion building up
✅ **Automatic enrollment** - No manual steps between courses

### For Platform:
✅ **Higher completion rates** - Automated nudges reduce dropoff
✅ **Better engagement** - Students stay active
✅ **Compliance tracking** - Full audit trail
✅ **Revenue optimization** - More courses completed = more funding

### For Program Owners:
✅ **Student retention** - Fewer dropouts
✅ **Clear reporting** - See progression metrics
✅ **Quality assurance** - Certificate verification
✅ **Revenue tracking** - Per-course completion data

---

## Metrics to Track

### Student Progression:
- Average time between courses
- Dropout rate per course
- Certificate upload time
- Email open rates
- Click-through rates on "Start Next Course"

### Program Performance:
- Course 1 → Course 2 conversion rate
- Course 2 → Course 3 conversion rate
- Overall program completion rate
- Average program completion time

### Dashboard Example:
```
CNA Training Program Metrics:

Course 1 (CNA Fundamentals):
- Enrolled: 100 students
- Completed: 85 students (85%)
- Avg completion time: 4.2 weeks

Course 2 (CPR Certification):
- Started: 82 students (96% of Course 1 completers)
- Completed: 78 students (95%)
- Avg completion time: 1.1 weeks

Course 3 (Clinical Skills):
- Started: 75 students (96% of Course 2 completers)
- Completed: 70 students (93%)
- Avg completion time: 2.3 weeks

Course 4 (State Exam Prep):
- Started: 68 students (97% of Course 3 completers)
- Completed: 65 students (96%)
- Avg completion time: 1.2 weeks

Overall Program Completion: 65% (65/100)
Average Total Time: 8.8 weeks
```

---

## Implementation Checklist

### Phase 1: Document Upload System (Day 1-3)
- [ ] Create `enrollment_documents` table
- [ ] Build upload page UI
- [ ] Create upload API endpoint
- [ ] Test file uploads
- [ ] Add to student dashboard

### Phase 2: Completion Detection (Day 3-4)
- [ ] Add completion logic
- [ ] Generate Elevate certificate
- [ ] Send completion email
- [ ] Trigger WIOA reporting

### Phase 3: Course Progression (Day 4-5)
- [ ] Add `course_sequence` to programs
- [ ] Build next course detection
- [ ] Create email templates
- [ ] Send "start next course" emails
- [ ] Test full sequence

### Phase 4: Polish & Testing (Day 5-6)
- [ ] Add progress indicators
- [ ] Show upcoming courses
- [ ] Test with real data
- [ ] Fix any bugs
- [ ] Deploy to production

---

## Timeline Summary

**Total Implementation: 5-6 days**

- **Day 1-2:** Document upload system
- **Day 3:** Completion detection
- **Day 4:** Course progression emails
- **Day 5:** Dashboard integration
- **Day 6:** Testing and polish

**Result:** Fully automated course progression system with document-based completion tracking.

---

**Last Updated:** January 4, 2026  
**Status:** Ready to implement  
**Priority:** Critical (solves completion gap + adds progression)
