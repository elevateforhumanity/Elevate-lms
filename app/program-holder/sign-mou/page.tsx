'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SignaturePad from '@/components/SignaturePad';
import { CheckCircle2, Download, FileText } from 'lucide-react';

export default function SignMOUPage() {
  const [mouData, setMouData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [signature, setSignature] = useState<string | null>(null);
  const [agreeName, setAgreeName] = useState('');
  const [agreeTitle, setAgreeTitle] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    loadMOUData();
  }, []);

  const loadMOUData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/program-holder/mou-data');
      if (res.ok) {
        const data = await res.json();
        setMouData(data);
        if (data.mou_status === 'signed') {
          setSigned(true);
        }
      }
    } catch (error) {
      console.error('Failed to load MOU data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignatureSave = (dataUrl: string) => {
    setSignature(dataUrl);
  };

  const handleSubmit = async () => {
    if (!signature || !agreeName || !agreeTerms) {
      alert('Please complete all required fields and sign the document.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/program-holder/sign-mou', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          signature,
          signer_name: agreeName,
          signer_title: agreeTitle
        })
      });

      if (res.ok) {
        setSigned(true);
        alert('MOU signed successfully! You will receive a confirmation email shortly.');
      } else {
        const text = await res.text();
        alert('Failed to sign MOU: ' + text);
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const downloadPDF = async () => {
    try {
      const res = await fetch('/api/program-holder/mou-pdf');
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `EFH_MOU_${mouData?.program_holder_name || 'Document'}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      alert('Failed to download PDF');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading MOU...</p>
        </div>
      </div>
    );
  }

  if (!mouData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>No MOU Available</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              You don't have a pending MOU to sign. Please contact the Elevate admin team if you believe this is an error.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (signed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardHeader>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
              <CardTitle>MOU Signed Successfully</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Your Memorandum of Understanding has been signed and submitted. 
              A copy has been sent to your email address.
            </p>
            <p className="text-sm text-muted-foreground">
              You now have full access to the Training Provider Portal where you can:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>View and track your participants</li>
              <li>Document case notes and progress</li>
              <li>Access compliance reports</li>
              <li>Review revenue share statements</li>
            </ul>
            <div className="flex gap-3 pt-4">
              <Button onClick={downloadPDF}>
                <Download className="h-4 w-4 mr-2" />
                Download Signed MOU
              </Button>
              <Button variant="outline" asChild>
                <a href="/delegate/reports">Go to Portal</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Sign Your Training Provider MOU</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Review and sign your Memorandum of Understanding with Elevate for Humanity
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* MOU Summary */}
              <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
                <h3 className="font-semibold">Agreement Summary</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Organization:</span>
                    <p className="font-medium">{mouData.program_holder_name}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Revenue Share:</span>
                    <p className="font-medium">{(mouData.payout_share * 100).toFixed(1)}%</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Contact:</span>
                    <p className="font-medium">{mouData.contact_name}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email:</span>
                    <p className="font-medium">{mouData.contact_email}</p>
                  </div>
                </div>
              </div>

              {/* Download PDF Button */}
              <div>
                <Button onClick={downloadPDF} variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Download Full MOU Document (PDF)
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Review the complete MOU before signing
                </p>
              </div>

              {/* Signer Information */}
              <div className="space-y-4">
                <h3 className="font-semibold">Signer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      className="border rounded px-3 py-2 w-full"
                      placeholder="Your full legal name"
                      value={agreeName}
                      onChange={e => setAgreeName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Title/Position
                    </label>
                    <input
                      type="text"
                      className="border rounded px-3 py-2 w-full"
                      placeholder="e.g., Owner, Director"
                      value={agreeTitle}
                      onChange={e => setAgreeTitle(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Signature Pad */}
              <div className="space-y-2">
                <h3 className="font-semibold">Electronic Signature *</h3>
                <p className="text-sm text-muted-foreground">
                  By signing below, you agree to the terms and conditions outlined in the MOU
                </p>
                <SignaturePad onSave={handleSignatureSave} height={150} />
                {signature && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
                    <p className="text-sm text-green-800 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Signature captured successfully
                    </p>
                  </div>
                )}
              </div>

              {/* Agreement Checkbox */}
              <div className="border-t pt-4">
                <label className="flex items-start gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={e => setAgreeTerms(e.target.checked)}
                    required
                    className="mt-1"
                  />
                  <span>
                    I have read and understood the complete Memorandum of Understanding. 
                    I agree to all terms and conditions outlined in this agreement, including 
                    the revenue share model, responsibilities, and compliance requirements. 
                    I understand this is a legally binding electronic signature.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                disabled={!signature || !agreeName || !agreeTerms || submitting}
                className="w-full"
                size="lg"
              >
                {submitting ? 'Submitting...' : 'Sign and Submit MOU'}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By clicking "Sign and Submit MOU", you acknowledge that your electronic signature 
                is legally binding and equivalent to a handwritten signature.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
