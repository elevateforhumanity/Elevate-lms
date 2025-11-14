'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock } from 'lucide-react';
import Link from 'next/link';

type NoteRow = {
  course_title: string;
  program_holder: string;
  status: string | null;
  note: string | null;
  created_at: string;
  created_by_email: string;
};

export default function LearnerTimeline({ params }: { params: { id: string } }) {
  const [learnerEmail, setLearnerEmail] = useState('');
  const [notes, setNotes] = useState<NoteRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        // Get learner info
        const userRes = await fetch(`/api/admin/learner/info?user_id=${params.id}`);
        if (userRes.ok) {
          const userData = await userRes.json();
          setLearnerEmail(userData.email || 'Unknown');
        }

        // Get notes timeline
        const notesRes = await fetch(`/api/admin/learner/notes?user_id=${params.id}`);
        if (notesRes.ok) {
          const notesData = await notesRes.json();
          setNotes(notesData || []);
        }
      } catch (error) {
        console.error('Failed to load:', error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [params.id]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/admin/reports">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Reports
            </Link>
          </Button>
          <h1 className="text-3xl font-bold mb-2">Participant Case History</h1>
          <p className="text-muted-foreground">
            {learnerEmail || 'Loading...'}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Case Management History</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-12 text-center text-muted-foreground">
                Loading case history...
              </div>
            ) : notes.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                No case notes yet for this participant.
              </div>
            ) : (
              <div className="space-y-6">
                {notes.map((n, i) => (
                  <div key={i} className="relative pl-8 pb-6 border-l-2 border-gray-200 last:border-l-0 last:pb-0">
                    <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-2 border-background" />
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{new Date(n.created_at).toLocaleString()}</span>
                        <span>•</span>
                        <span>{n.program_holder}</span>
                        <span>•</span>
                        <span>{n.created_by_email}</span>
                      </div>

                      <div className="font-semibold">{n.course_title}</div>

                      {n.status && (
                        <div>
                          <span className={`inline-block px-2 py-1 rounded text-xs ${
                            n.status === 'On Track' ? 'bg-green-100 text-green-800' :
                            n.status === 'Behind' ? 'bg-yellow-100 text-yellow-800' :
                            n.status === 'Dropped' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            Status: {n.status}
                          </span>
                        </div>
                      )}

                      {n.note && (
                        <div className="text-sm bg-secondary/50 rounded p-3">
                          {n.note}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
