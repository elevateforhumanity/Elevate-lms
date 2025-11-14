'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, Upload, AlertCircle } from 'lucide-react';

const programTitles: Record<string, string> = {
  wrg: 'Workforce Ready Grant (WRG)',
  wioa: 'WorkOne / WIOA',
  jri: 'Justice Reinvestment Initiative (JRI)',
  employindy: 'EmployIndy',
  dol: 'DOL Apprenticeship',
};

const programDescriptions: Record<string, string> = {
  wrg: 'Free training for Indiana residents in high-demand careers',
  wioa: 'Workforce Innovation and Opportunity Act funding for eligible adults',
  jri: 'Training for justice-involved individuals reentering the workforce',
  employindy: 'Marion County workforce development programs',
  dol: 'Department of Labor Registered Apprenticeship programs',
};

const workoneRegions = [
  'Region 1 - Northwest Indiana',
  'Region 2 - North Central Indiana',
  'Region 3 - Northeast Indiana',
  'Region 4 - West Central Indiana',
  'Region 5 - Central Indiana (EmployIndy)',
  'Region 6 - East Central Indiana',
  'Region 7 - Southwest Indiana',
  'Region 8 - South Central Indiana',
  'Region 9 - Southeast Indiana',
  'Region 10 - Wabash Valley',
  'Region 11 - Region 11',
  'Region 12 - Region 12',
];

const courses = [
  { id: 'cna', name: 'Certified Nursing Assistant (CNA)' },
  { id: 'hvac', name: 'HVAC Technician Training' },
  { id: 'barber', name: 'Barber Apprenticeship' },
  { id: 'cdl', name: 'Commercial Driver License (CDL)' },
  { id: 'welding', name: 'Welding Certification' },
  { id: 'life-skills', name: 'Life Skills & Job Readiness' },
];

export default function EnrollProgramPage({ params }: { params: { program: string } }) {
  const router = useRouter();
  const program = params.program.toLowerCase();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    dob: '',
    ssn4: '',
    course_id: '',
    // WRG specific
    county: '',
    workone: '',
    residency_doc: '',
    // WIOA specific
    region: '',
    cm_name: '',
    cm_email: '',
    stream: 'Adult',
    // JRI specific
    po_name: '',
    po_email: '',
    referral_doc: '',
    // EmployIndy specific
    address: '',
    track: '',
    voucher: '',
    // DOL specific
    sponsor: '',
    occupation: '',
    rapids_id: '',
    appendix_a: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/funding/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          program_code: program.toUpperCase(),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit application');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!programTitles[program]) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Program Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The enrollment program you're looking for doesn't exist.
            </p>
            <Button onClick={() => router.push('/')}>Return Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Application Submitted!</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Thank you for applying to {programTitles[program]}. We'll review your application and contact you within 2-3 business days.
            </p>
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-6 max-w-md mx-auto mb-6">
              <h3 className="font-semibold mb-3">What happens next?</h3>
              <ol className="text-sm text-left space-y-2 list-decimal list-inside">
                <li>We verify your eligibility</li>
                <li>You'll receive an email with login credentials</li>
                <li>Complete orientation and start your training</li>
              </ol>
            </div>
            <Button onClick={() => router.push('/')}>Return to Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-primary font-bold text-3xl mx-auto mb-4">
            E
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            {programTitles[program]}
          </h1>
          <p className="text-blue-100">{programDescriptions[program]}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Application Form</CardTitle>
            <CardDescription>
              All fields marked with * are required
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Common Fields */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name *</Label>
                  <Input
                    id="first_name"
                    required
                    value={formData.first_name}
                    onChange={(e) => handleChange('first_name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name *</Label>
                  <Input
                    id="last_name"
                    required
                    value={formData.last_name}
                    onChange={(e) => handleChange('last_name', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth *</Label>
                  <Input
                    id="dob"
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => handleChange('dob', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ssn4">Last 4 of SSN *</Label>
                  <Input
                    id="ssn4"
                    required
                    maxLength={4}
                    value={formData.ssn4}
                    onChange={(e) => handleChange('ssn4', e.target.value.replace(/\D/g, ''))}
                    placeholder="1234"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="course_id">Choose Training Program *</Label>
                <Select value={formData.course_id} onValueChange={(v) => handleChange('course_id', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a program" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Program-Specific Fields */}
              {program === 'wrg' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="county">County *</Label>
                    <Input
                      id="county"
                      required
                      value={formData.county}
                      onChange={(e) => handleChange('county', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="workone">WorkOne Office</Label>
                    <Select value={formData.workone} onValueChange={(v) => handleChange('workone', v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your region" />
                      </SelectTrigger>
                      <SelectContent>
                        {workoneRegions.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {program === 'wioa' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="region">WorkOne Region *</Label>
                    <Select value={formData.region} onValueChange={(v) => handleChange('region', v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your region" />
                      </SelectTrigger>
                      <SelectContent>
                        {workoneRegions.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="cm_name">Case Manager Name *</Label>
                      <Input
                        id="cm_name"
                        required
                        value={formData.cm_name}
                        onChange={(e) => handleChange('cm_name', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cm_email">Case Manager Email *</Label>
                      <Input
                        id="cm_email"
                        type="email"
                        required
                        value={formData.cm_email}
                        onChange={(e) => handleChange('cm_email', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stream">Funding Stream *</Label>
                    <Select value={formData.stream} onValueChange={(v) => handleChange('stream', v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Adult">Adult</SelectItem>
                        <SelectItem value="Dislocated">Dislocated Worker</SelectItem>
                        <SelectItem value="Youth">Youth</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {program === 'jri' && (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="po_name">PO/Parole Officer Name *</Label>
                      <Input
                        id="po_name"
                        required
                        value={formData.po_name}
                        onChange={(e) => handleChange('po_name', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="po_email">PO Email *</Label>
                      <Input
                        id="po_email"
                        type="email"
                        required
                        value={formData.po_email}
                        onChange={(e) => handleChange('po_email', e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}

              {program === 'employindy' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="address">Marion County Address *</Label>
                    <Input
                      id="address"
                      required
                      value={formData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="track">Program Track</Label>
                    <Select value={formData.track} onValueChange={(v) => handleChange('track', v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a track" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="YES">YES (Youth Employment Services)</SelectItem>
                        <SelectItem value="Project Indy">Project Indy</SelectItem>
                        <SelectItem value="ApprenticeTrack">ApprenticeTrack</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="voucher">Voucher Code (Optional)</Label>
                    <Input
                      id="voucher"
                      value={formData.voucher}
                      onChange={(e) => handleChange('voucher', e.target.value)}
                      placeholder="Enter voucher code if provided"
                    />
                  </div>
                </>
              )}

              {program === 'dol' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="sponsor">Sponsor/Employer *</Label>
                    <Input
                      id="sponsor"
                      required
                      value={formData.sponsor}
                      onChange={(e) => handleChange('sponsor', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation *</Label>
                    <Select value={formData.occupation} onValueChange={(v) => handleChange('occupation', v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select occupation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Barber">Barber</SelectItem>
                        <SelectItem value="HVAC">HVAC Technician</SelectItem>
                        <SelectItem value="Building Tech">Building Maintenance Technician</SelectItem>
                        <SelectItem value="Electrician">Electrician</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rapids_id">RAPIDS ID (if assigned)</Label>
                    <Input
                      id="rapids_id"
                      value={formData.rapids_id}
                      onChange={(e) => handleChange('rapids_id', e.target.value)}
                    />
                  </div>
                </>
              )}

              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              <Button type="submit" disabled={loading} className="w-full" size="lg">
                {loading ? 'Submitting...' : 'Submit Application'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
