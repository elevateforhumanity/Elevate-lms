import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'HVAC Technician Pathway | Elevate for Humanity',
  description: 'Launch your HVAC career with workforce-ready training, apprenticeships, and funding pathways.',
};

export default function HVACProgramPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-12 space-y-8">
        <header className="space-y-4">
          <p className="text-sm text-muted-foreground uppercase tracking-wide">
            Workforce Training Program
          </p>
          <h1 className="text-4xl font-bold">HVAC Technician Career Pathway</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Hands-on, workforce-focused HVAC training built for working adults, career changers, 
            and young people who want a skilled trade with real demand.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc list-inside">
                  <li>HVAC fundamentals: heating, cooling, ventilation, and refrigeration</li>
                  <li>Tools, safety, and field etiquette for residential and light commercial work</li>
                  <li>Basic electrical concepts related to HVAC systems</li>
                  <li>Troubleshooting, maintenance, and customer communication</li>
                  <li>Preparation for industry-recognized entry-level certifications</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Who This Program Is For</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Adults looking for a new career in a high-demand trade</li>
                  <li>Young adults who want a skilled trade instead of a 4-year degree</li>
                  <li>People already in construction who want to specialize and increase earnings</li>
                  <li>Anyone seeking stable employment with growth potential</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Program Pathway</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 list-decimal list-inside">
                  <li>Complete your Elevate intake and funding screening</li>
                  <li>Enroll in the HVAC program and attend orientation</li>
                  <li>Complete online modules and guided in-person or lab experiences</li>
                  <li>Work with our team on employer connections and apprenticeships</li>
                  <li>Transition into employment with job search support and coaching</li>
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
                  <h4 className="font-semibold mb-2">Format</h4>
                  <p className="text-sm text-muted-foreground">Blended online + hands-on</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Schedule</h4>
                  <p className="text-sm text-muted-foreground">Flexible, evenings and weekends available</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Funding</h4>
                  <p className="text-sm text-muted-foreground">Workforce grant pathways may be available</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Support</h4>
                  <p className="text-sm text-muted-foreground">1:1 case management and career coaching</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ready to Get Started?</CardTitle>
                <CardDescription>
                  Complete the interest form and our team will follow up with next steps.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full">
                  <Link href="/apply">Start HVAC Interest Form</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/contact">Talk with the Elevate Team</Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
    </main>
  );
}
