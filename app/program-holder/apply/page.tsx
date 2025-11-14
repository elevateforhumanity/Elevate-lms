'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

export default function ProgramHolderApply() {
  const [form, setForm] = useState({
    org_name: '',
    contact_name: '',
    contact_email: '',
    phone: '',
    site_address: '',
    training_focus: '',
    funding_sources: 'WRG, WIOA, JRI, EmployIndy',
    agree: false
  });
  const [status, setStatus] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (field: string, value: any) =>
    setForm(f => ({ ...f, [field]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Submitting your application...');
    
    try {
      const res = await fetch('/api/program-holder/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      if (res.ok) {
        setSubmitted(true);
        setStatus(null);
      } else {
        const txt = await res.text();
        setStatus('There was an issue submitting your application: ' + txt);
      }
    } catch (error) {
      setStatus('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardHeader>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
              <CardTitle>Application Submitted Successfully</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Thank you for applying to become an Elevate for Humanity Training Provider. 
              Your application has been submitted and is under review.
            </p>
            <p>
              An Elevate team member will review your application and contact you at{' '}
              <strong>{form.contact_email}</strong> within 2-3 business days.
            </p>
            <p className="text-sm text-muted-foreground">
              Once approved, you'll receive access to your Training Provider Portal where you can:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>View and track your participants</li>
              <li>Document case notes and progress</li>
              <li>Access compliance reports</li>
              <li>Review revenue share statements</li>
            </ul>
            <div className="pt-4">
              <Button asChild>
                <a href="/lms/dashboard">Return to Dashboard</a>
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
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Become an Elevate Training Provider</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Complete this form to apply as a Program Holder / Worksite Partner. Once approved, 
                you'll receive access to your delegate portal to track participants, case notes, and payouts.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Organization / Shop / School Name *
                  </label>
                  <input
                    className="border rounded px-3 py-2 w-full"
                    placeholder="e.g., ABC Barber Academy"
                    value={form.org_name}
                    onChange={e => update('org_name', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Primary Contact Name *
                  </label>
                  <input
                    className="border rounded px-3 py-2 w-full"
                    placeholder="Your full name"
                    value={form.contact_name}
                    onChange={e => update('contact_name', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Primary Contact Email *
                  </label>
                  <input
                    type="email"
                    className="border rounded px-3 py-2 w-full"
                    placeholder="your@email.com"
                    value={form.contact_email}
                    onChange={e => update('contact_email', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="border rounded px-3 py-2 w-full"
                    placeholder="(555) 123-4567"
                    value={form.phone}
                    onChange={e => update('phone', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Site Address (where training happens)
                  </label>
                  <textarea
                    className="border rounded px-3 py-2 w-full"
                    rows={3}
                    placeholder="Street address, city, state, zip"
                    value={form.site_address}
                    onChange={e => update('site_address', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Training Focus
                  </label>
                  <textarea
                    className="border rounded px-3 py-2 w-full"
                    rows={3}
                    placeholder="e.g., Barber Apprenticeship, CNA, HVAC, Construction, etc."
                    value={form.training_focus}
                    onChange={e => update('training_focus', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Funding Sources You Work With
                  </label>
                  <input
                    className="border rounded px-3 py-2 w-full"
                    placeholder="WRG, WIOA, JRI, EmployIndy, etc."
                    value={form.funding_sources}
                    onChange={e => update('funding_sources', e.target.value)}
                  />
                </div>

                <div className="border-t pt-4">
                  <label className="flex items-start gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={form.agree}
                      onChange={e => update('agree', e.target.checked)}
                      required
                      className="mt-1"
                    />
                    <span>
                      I understand Elevate for Humanity is the system of record and all payouts 
                      follow our written MOU. I agree to the terms and conditions of the Training 
                      Provider partnership.
                    </span>
                  </label>
                </div>

                {status && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm text-yellow-800">
                    {status}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={!form.agree || loading}
                  className="w-full"
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
