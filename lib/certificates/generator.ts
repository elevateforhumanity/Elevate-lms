export interface CertificateData {
  studentName: string;
  courseName: string;
  completionDate: string;
  certificateNumber: string;
  programHours?: number;
}

export function generateCertificateNumber(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `EFH-${timestamp}-${random}`.toUpperCase();
}

export async function generateCertificatePDF(data: CertificateData): Promise<Blob> {
  // This would use jsPDF or Puppeteer to generate actual PDF
  // For now, return a Content
  const html = generateCertificateHTML(data);
  const blob = new Blob([html], { type: 'text/html' });
  return blob;
}

function generateCertificateHTML(data: CertificateData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Georgia', serif; text-align: center; padding: 50px; }
    .certificate { border: 10px solid #f97316; padding: 40px; max-width: 800px; margin: 0 auto; }
    h1 { color: #f97316; font-size: 48px; margin-bottom: 20px; }
    .student-name { font-size: 36px; font-weight: bold; color: #1e293b; margin: 30px 0; }
    .course-name { font-size: 24px; color: #475569; margin: 20px 0; }
    .date { font-size: 18px; color: #64748b; margin: 20px 0; }
    .cert-number { font-size: 14px; color: #94a3b8; margin-top: 40px; }
  </style>
</head>
<body>
  <div class="certificate">
    <h1>Certificate of Completion</h1>
    <p>This certifies that</p>
    <div class="student-name">${data.studentName}</div>
    <p>has successfully completed</p>
    <div class="course-name">${data.courseName}</div>
    ${data.programHours ? `<p>${data.programHours} Program Hours</p>` : ''}
    <div class="date">Completed on ${data.completionDate}</div>
    <div class="cert-number">Certificate #${data.certificateNumber}</div>
    <p style="margin-top: 40px;">
      <strong>Elevate For Humanity</strong><br>
      Career & Technical Institute
    </p>
  </div>
</body>
</html>
  `;
}
