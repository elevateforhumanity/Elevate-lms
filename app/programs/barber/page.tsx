import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Barber Apprenticeship | Elevate for Humanity',
  description: 'State-approved barber apprenticeship program leading to Indiana barber license.',
};

export default function BarberProgramPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-12 space-y-8">
        <header className="space-y-4">
          <p className="text-sm text-muted-foreground uppercase tracking-wide">
            State-Approved Apprenticeship
          </p>
          <h1 className="text-4xl font-bold">Barber Apprenticeship Program</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Master the craft of barbering through a state-approved apprenticeship. 
            Learn cutting, styling, and business skills in a real barbershop environment.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Program Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc list-inside">
                  <li>State-approved curriculum aligned with Indiana licensing requirements</li>
                  <li>1,500 hours of hands-on training in a working barbershop</li>
                  <li>Learn classic and modern cutting techniques</li>
                  <li>Business management and customer service skills</li>
                  <li>Preparation for state licensing exam</li>
                  <li>Earn while you learn through apprenticeship model</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What You'll Master</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Technical Skills</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Clipper techniques</li>
                      <li>Scissor work</li>
                      <li>Straight razor shaving</li>
                      <li>Fades and tapers</li>
                      <li>Beard grooming</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Professional Skills</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Client consultation</li>
                      <li>Sanitation and safety</li>
                      <li>Shop management</li>
                      <li>Retail and upselling</li>
                      <li>Building clientele</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Apprenticeship Pathway</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 list-decimal list-inside">
                  <li>Apply and complete intake process</li>
                  <li>Match with a licensed master barber and approved shop</li>
                  <li>Begin apprenticeship with structured training plan</li>
                  <li>Complete 1,500 hours of documented training</li>
                  <li>Pass state licensing exam</li>
                  <li>Launch your career as a licensed barber</li>
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
                  <p className="text-sm text-muted-foreground">12-18 months (1,500 hours)</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Format</h4>
                  <p className="text-sm text-muted-foreground">In-shop apprenticeship with online coursework</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Funding</h4>
                  <p className="text-sm text-muted-foreground">WIOA and apprenticeship funding available</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Outcome</h4>
                  <p className="text-sm text-muted-foreground">Indiana State Barber License</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Start Your Journey</CardTitle>
                <CardDescription>
                  Join the next generation of professional barbers.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full">
                  <Link href="/apply">Apply for Barber Apprenticeship</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/contact">Schedule a Visit</Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
    </main>
  );
}
