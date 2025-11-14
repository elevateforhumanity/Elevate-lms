'use client';
import { useEffect, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type PhInfo = {
  id: string;
  name: string;
  payout_share: number;
  mou_status: string;
  mou_holder_name: string | null;
  mou_holder_signed_at: string | null;
};

export default function ProgramHolderMOUPage() {
  const [ph, setPh] = useState<PhInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const sigRef = useRef<SignatureCanvas | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/program-holder/me');
      if (res.ok) {
        const data = await res.json();
        setPh(data);
        if (data.mou_holder_name) setName(data.mou_holder_name);
      }
      setLoading(false);
    })();
  }, []);

  const submit = async () => {
    if (!ph) return;
    if (!name.trim()) {
      setMessage('Please enter your full legal name.');
      return;
    }
    if (!sigRef.current || sigRef.current.isEmpty()) {
      setMessage('Please provide a signature.');
      return;
    }
    setMessage('Submitting signature...');
    const dataUrl = sigRef.current.getTrimmedCanvas().toDataURL('image/png');

    const res = await fetch('/api/program-holder/mou/sign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, signatureDataUrl: dataUrl })
    });

    if (res.ok) {
      setMessage('Thank you. Your MOU has been signed. An Elevate representative will countersign and send a fully executed copy.');
      const updated = await res.json();
      setPh(updated);
    } else {
      const txt = await res.text();
      setMessage('There was an issue saving your signature: ' + txt);
    }
  };

  if (loading) {
    return (
      <main className="p-6 max-w-3xl mx-auto">
        <div className="text-center py-12">Loading…</div>
      </main>
    );
  }

  if (!ph) {
    return (
      <main className="p-6 max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>No Program Holder Record</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No program holder record found for your account.</p>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Program Holder Agreement (MOU)</h1>
        <p className="text-muted-foreground">
          Organization: <strong>{ph.name}</strong><br/>
          Standard revenue share: <strong>{Math.round((ph.payout_share || 0.333) * 100)}%</strong> of Net Program Revenue per enrolled, funded participant (after credential, toolkit, and direct program costs).
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Memorandum of Understanding</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-4 max-h-96 overflow-y-auto text-sm leading-relaxed space-y-3 bg-muted/30">
            <p><strong>Purpose.</strong> This Memorandum of Understanding ("MOU") outlines the partnership between Elevate for Humanity Career & Technical Institute ("Elevate") and {ph.name} ("Program Holder").</p>
            
            <p>
              Elevate serves as the training sponsor and system of record for workforce programs such as WRG, WIOA, JRI, EmployIndy, DOL apprenticeships, and related initiatives. Program Holder provides a safe training environment and hands-on instruction consistent with the curriculum and program requirements.
            </p>
            
            <p>
              <strong>Revenue Share Model.</strong> Net Program Revenue is defined as total eligible training revenue received by Elevate for a participant minus direct credentialing partner fees, required background checks and screens, approved toolkits/required equipment, and platform or compliance expenses tied to that program.
            </p>
            
            <p>
              Program Holder will receive one-third (1/3) of Net Program Revenue per enrolled, funded participant served under this MOU, after applicable costs, with Elevate retaining the remainder to cover platform, staffing, and compliance.
            </p>
            
            <p>
              <strong>Responsibilities.</strong> Program Holder agrees to:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Provide a safe, compliant training environment</li>
              <li>Deliver hands-on instruction aligned with approved curriculum</li>
              <li>Maintain required insurance and safety standards</li>
              <li>Report participant progress and completion data</li>
              <li>Comply with all applicable workforce program requirements</li>
              <li>Maintain confidentiality of participant information</li>
            </ul>
            
            <p>
              <strong>Compliance.</strong> Program Holder must adhere to all Elevate policies, applicable federal and state laws, and workforce program requirements. Elevate reserves the right to conduct site visits and audits to ensure compliance.
            </p>
            
            <p>
              <strong>Term and Termination.</strong> This agreement may be terminated by either party with 30 days' written notice. Elevate may suspend or terminate immediately in cases of safety concerns, fraud, or material noncompliance.
            </p>
            
            <p>
              <strong>Payment Terms.</strong> Revenue share payments will be processed within 30 days of Elevate receiving program funds from the funding source, subject to participant completion requirements and program compliance.
            </p>
            
            <p>
              By signing below, Program Holder agrees to abide by all terms outlined in this MOU and any additional policies provided by Elevate for Humanity.
            </p>
          </div>
        </CardContent>
      </Card>

      {ph.mou_status === 'signed_by_holder' && ph.mou_holder_signed_at && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="text-green-600 mt-1">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-green-900">MOU Signed Successfully</p>
                <p className="text-sm text-green-700 mt-1">
                  You signed this MOU on {new Date(ph.mou_holder_signed_at).toLocaleString()} as {ph.mou_holder_name}. 
                  An Elevate representative will countersign and provide a fully executed copy.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {ph.mou_status !== 'signed_by_holder' && ph.mou_status !== 'fully_executed' && (
        <Card>
          <CardHeader>
            <CardTitle>Sign Agreement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Legal Name (Program Holder Signatory)</Label>
              <Input
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Type your full name here"
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
              onClick={submit}
              className="w-full"
              size="lg"
            >
              Sign & Submit MOU
            </Button>

            {message && (
              <p className="text-sm text-center text-muted-foreground">{message}</p>
            )}
          </CardContent>
        </Card>
      )}
    </main>
  );
}
