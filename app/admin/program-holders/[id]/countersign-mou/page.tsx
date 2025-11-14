'use client';
import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import SignatureCanvas from 'react-signature-canvas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Download } from 'lucide-react';

type ProgramHolder = {
  id: string;
  name: string;
  payout_share: number;
  mou_status: string;
  mou_holder_name: string | null;
  mou_holder_signed_at: string | null;
  mou_holder_sig_url: string | null;
  mou_admin_name: string | null;
  mou_admin_signed_at: string | null;
  mou_final_pdf_url: string | null;
};

export default function CountersignMOUPage() {
  const params = useParams();
  const router = useRouter();
  const [ph, setPh] = useState<ProgramHolder | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [holderSigUrl, setHolderSigUrl] = useState<string | null>(null);
  const sigRef = useRef<SignatureCanvas | null>(null);

  useEffect(() => {
    loadProgramHolder();
  }, []);

  const loadProgramHolder = async () => {
    try {
      if (!params?.id) {
        setMessage('Invalid program holder ID');
        setLoading(false);
        return;
      }
      const res = await fetch(`/api/admin/program-holders/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setPh(data);
        
        // Load holder signature image if available
        if (data.mou_holder_sig_url) {
          const sigRes = await fetch(`/api/admin/storage/signature?path=${data.mou_holder_sig_url}`);
          if (sigRes.ok) {
            const blob = await sigRes.blob();
            setHolderSigUrl(URL.createObjectURL(blob));
          }
        }
      }
    } catch (error) {
      console.error('Failed to load program holder:', error);
    } finally {
      setLoading(false);
    }
  };

  const countersign = async () => {
    if (!ph) return;
    if (!name.trim()) {
      setMessage('Please enter your full name.');
      return;
    }
    if (!sigRef.current || sigRef.current.isEmpty()) {
      setMessage('Please provide a signature.');
      return;
    }

    setMessage('Saving signature and generating PDF...');
    const dataUrl = sigRef.current.getTrimmedCanvas().toDataURL('image/png');

    const res = await fetch('/api/admin/program-holders/mou/countersign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        programHolderId: ph.id,
        name, 
        signatureDataUrl: dataUrl 
      })
    });

    if (res.ok) {
      setMessage('MOU countersigned successfully! Generating final PDF...');
      const updated = await res.json();
      setPh(updated);
      
      // Generate final PDF
      const pdfRes = await fetch('/api/admin/program-holders/mou/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ programHolderId: ph.id })
      });

      if (pdfRes.ok) {
        setMessage('MOU fully executed! PDF generated successfully.');
        setTimeout(() => router.push('/admin/program-holders'), 2000);
      } else {
        setMessage('Signature saved but PDF generation failed. Please try generating PDF manually.');
      }
    } else {
      const txt = await res.text();
      setMessage('Error: ' + txt);
    }
  };

  if (loading) {
    return (
      <main className="p-6 max-w-4xl mx-auto">
        <div className="text-center py-12">Loading...</div>
      </main>
    );
  }

  if (!ph) {
    return (
      <main className="p-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Program Holder Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/admin/program-holders')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Program Holders
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (ph.mou_status !== 'signed_by_holder') {
    return (
      <main className="p-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>MOU Not Ready for Countersigning</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              This MOU has not been signed by the program holder yet. Current status: <strong>{ph.mou_status}</strong>
            </p>
            <Button onClick={() => router.push('/admin/program-holders')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Program Holders
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => router.push('/admin/program-holders')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Countersign MOU</h1>
          <p className="text-muted-foreground">Program Holder: {ph.name}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Program Holder Signature</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Signed By</p>
              <p className="font-medium">{ph.mou_holder_name}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Signed On</p>
              <p className="font-medium">
                {ph.mou_holder_signed_at ? new Date(ph.mou_holder_signed_at).toLocaleString() : 'N/A'}
              </p>
            </div>
          </div>

          {holderSigUrl && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Signature</p>
              <div className="border rounded-lg p-4 bg-white inline-block">
                <img src={holderSigUrl} alt="Program Holder Signature" className="max-h-32" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>MOU Agreement Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground">Organization</p>
                <p className="font-medium">{ph.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Revenue Share</p>
                <p className="font-medium">{Math.round((ph.payout_share || 0.333) * 100)}%</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              This MOU establishes a partnership for workforce training programs with a standard 1/3 revenue share model.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Elevate for Humanity Countersignature</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="admin-name">Your Full Name (Elevate Representative)</Label>
            <Input
              id="admin-name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Type your full name"
              className="mt-1"
            />
          </div>

          <div>
            <Label>Draw Your Signature Below</Label>
            <div className="border rounded-lg bg-white mt-1">
              <SignatureCanvas
                ref={sigRef}
                penColor="black"
                canvasProps={{ 
                  width: 600, 
                  height: 200, 
                  className: 'w-full h-[200px]'
                }}
              />
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => sigRef.current?.clear()}
              className="mt-2"
            >
              Clear Signature
            </Button>
          </div>

          <Button
            type="button"
            onClick={countersign}
            className="w-full"
            size="lg"
          >
            Countersign & Generate Final PDF
          </Button>

          {message && (
            <p className="text-sm text-center text-muted-foreground">{message}</p>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
