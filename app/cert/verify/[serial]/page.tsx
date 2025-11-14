import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

export default async function VerifyCertificate({ params }: { params: { serial: string } }) {
  const supabase = createServerComponentClient({ cookies });
  
  const { data: cert } = await supabase
    .from('certificates')
    .select(`
      *,
      user:user_id(email),
      course:course_id(title, slug)
    `)
    .eq('serial', params.serial)
    .maybeSingle();

  if (!cert) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <div className="flex items-center gap-2">
              <XCircle className="h-6 w-6 text-destructive" />
              <CardTitle>Certificate Not Found</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              No certificate found with serial: <code className="font-mono">{params.serial}</code>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isRevoked = !!cert.revoked_at;
  const isExpired = cert.expires_at && new Date(cert.expires_at) < new Date();
  const isValid = !isRevoked && !isExpired;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <div className="flex items-center gap-2">
            {isValid && <CheckCircle2 className="h-6 w-6 text-green-600" />}
            {isRevoked && <XCircle className="h-6 w-6 text-destructive" />}
            {isExpired && !isRevoked && <AlertTriangle className="h-6 w-6 text-yellow-600" />}
            <CardTitle>Certificate Verification</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Status Badge */}
          <div className="flex gap-2">
            {isValid && <Badge className="bg-green-600">Valid</Badge>}
            {isRevoked && <Badge variant="destructive">Revoked</Badge>}
            {isExpired && !isRevoked && <Badge className="bg-yellow-600">Expired</Badge>}
          </div>

          {/* Revocation Notice */}
          {isRevoked && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <h3 className="font-semibold text-destructive mb-2">This certificate has been revoked</h3>
              <p className="text-sm text-muted-foreground">
                Revoked on: {new Date(cert.revoked_at).toLocaleDateString()}
              </p>
              {cert.revoked_reason && (
                <p className="text-sm text-muted-foreground mt-1">
                  Reason: {cert.revoked_reason}
                </p>
              )}
            </div>
          )}

          {/* Expiry Notice */}
          {isExpired && !isRevoked && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">This certificate has expired</h3>
              <p className="text-sm text-yellow-700">
                Expired on: {new Date(cert.expires_at).toLocaleDateString()}
              </p>
            </div>
          )}

          {/* Certificate Details */}
          <div className="space-y-3 pt-4 border-t">
            <div>
              <p className="text-sm text-muted-foreground">Serial Number</p>
              <p className="font-mono font-semibold">{cert.serial}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Learner</p>
              <p className="font-semibold">{cert.student_name}</p>
              <p className="text-sm text-muted-foreground">{cert.user?.email}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Course</p>
              <p className="font-semibold">{cert.course_name}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Completion Date</p>
                <p className="font-semibold">{new Date(cert.completion_date).toLocaleDateString()}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Issue Date</p>
                <p className="font-semibold">{new Date(cert.issued_at).toLocaleDateString()}</p>
              </div>
            </div>

            {cert.expires_at && (
              <div>
                <p className="text-sm text-muted-foreground">Expiry Date</p>
                <p className="font-semibold">{new Date(cert.expires_at).toLocaleDateString()}</p>
              </div>
            )}
          </div>

          {/* Download PDF Button */}
          {isValid && (
            <div className="pt-4 border-t">
              <a
                href={`/api/cert/pdf?serial=${cert.serial}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                Download PDF Certificate
              </a>
            </div>
          )}

          {/* Footer */}
          <div className="pt-4 border-t text-center">
            <p className="text-xs text-muted-foreground">
              Issued by Elevate for Humanity Career & Technical Institute
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
