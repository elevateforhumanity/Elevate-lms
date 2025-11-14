import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'CNA Certification | Elevate for Humanity',
  description: 'Certified Nursing Assistant training program with clinical experience and state certification.',
};

export default function CNAProgramPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-12 space-y-8">
        <header className="space-y-4">
          <p className="text-sm text-muted-foreground uppercase tracking-wide">
            Healthcare Career Training
          </p>
          <h1 className="text-4xl font-bold">Certified Nursing Assistant (CNA)</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Start your healthcare career with CNA certification. Gain the skills and credentials 
            needed to provide essential patient care in hospitals, nursing homes, and home health settings.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Program Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc list-inside">
                  <li>State-approved CNA training program</li>
                  <li>75+ hours of classroom instruction and clinical practice</li>
                  <li>Hands-on experience in real healthcare settings</li>
                  <li>Preparation for state certification exam</li>
                  <li>Job placement assistance upon completion</li>
                  <li>Fast-track to employment in growing healthcare field</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills You'll Develop</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Clinical Skills</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Vital signs monitoring</li>
                      <li>Patient hygiene and comfort</li>
                      <li>Mobility assistance</li>
                      <li>Nutrition and feeding</li>
                      <li>Infection control</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Professional Skills</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Patient communication</li>
                      <li>Medical documentation</li>
                      <li>Team collaboration</li>
                      <li>Ethics and professionalism</li>
                      <li>Emergency response</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Training Pathway</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 list-decimal list-inside">
                  <li>Complete application and background check</li>
                  <li>Attend classroom instruction (theory and skills lab)</li>
                  <li>Complete clinical rotation in healthcare facility</li>
                  <li>Pass state certification exam (written and skills)</li>
                  <li>Receive CNA certification and begin employment</li>
                </ol>
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Program Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Duration</h4>
                  <p className="text-sm text-muted-foreground">4-6 weeks (75+ hours)</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Schedule</h4>
                  <p className="text-sm text-muted-foreground">Day and evening classes available</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Requirements</h4>
                  <p className="text-sm text-muted-foreground">High school diploma/GED, background check</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Funding</h4>
                  <p className="text-sm text-muted-foreground">Workforce grants and payment plans available</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Begin Your Healthcare Career</CardTitle>
                <CardDescription>
                  High demand, stable employment, and opportunities for advancement.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full">
                  <Link href="/apply">Apply for CNA Training</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/contact">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
    </main>
  );
}
