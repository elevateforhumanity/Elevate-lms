import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, AlertTriangle, CheckCircle, FileText, Building2, Users } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface ReviewQueueItem {
  id: string;
  entity_type: string;
  entity_id: string;
  review_type: string;
  priority: number;
  status: string;
  confidence_score: number | null;
  failed_rules: string[];
  system_recommendation: string | null;
  assigned_to: string | null;
  created_at: string;
}

export default async function ReviewQueuePage() {
  const supabase = await createClient();

  // Check auth and role
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile || !['admin', 'super_admin', 'staff'].includes(profile.role)) {
    redirect('/');
  }

  // Get review queue items
  const { data: items } = await supabase
    .from('review_queue')
    .select('*')
    .in('status', ['pending', 'in_progress'])
    .order('priority', { ascending: true })
    .order('created_at', { ascending: true })
    .limit(50);

  // Get counts by type
  const { data: counts } = await supabase
    .from('review_queue')
    .select('review_type, status')
    .in('status', ['pending', 'in_progress']);

  const countsByType = (counts || []).reduce((acc, item) => {
    acc[item.review_type] = (acc[item.review_type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalPending = items?.length || 0;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Review Queue</h1>
        <p className="text-muted-foreground mt-2">
          Items requiring human review. System recommendations provided where available.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{countsByType['document_verification'] || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Partners
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{countsByType['partner_approval'] || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="h-4 w-4" />
              Placements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{countsByType['shop_assignment'] || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Queue Table */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Reviews</CardTitle>
          <CardDescription>
            Click on an item to review. Items are sorted by priority and age.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {items && items.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Priority</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>Issues</TableHead>
                  <TableHead>Recommendation</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item: ReviewQueueItem) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <PriorityBadge priority={item.priority} />
                    </TableCell>
                    <TableCell>
                      <TypeBadge type={item.review_type} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={item.status} />
                    </TableCell>
                    <TableCell>
                      {item.confidence_score !== null ? (
                        <span className={item.confidence_score >= 0.7 ? 'text-green-600' : 'text-amber-600'}>
                          {(item.confidence_score * 100).toFixed(0)}%
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {item.failed_rules.length > 0 ? (
                        <span className="text-sm text-red-600">
                          {item.failed_rules.length} issue{item.failed_rules.length > 1 ? 's' : ''}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {item.system_recommendation || '—'}
                    </TableCell>
                    <TableCell>
                      <AgeDisplay createdAt={item.created_at} />
                    </TableCell>
                    <TableCell>
                      <Link href={`/admin/review-queue/${item.id}`}>
                        <Button size="sm">Review</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium">All caught up!</h3>
              <p className="text-muted-foreground">No items pending review.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function PriorityBadge({ priority }: { priority: number }) {
  if (priority <= 2) {
    return <Badge variant="destructive">P{priority}</Badge>;
  }
  if (priority <= 4) {
    return <Badge variant="default">P{priority}</Badge>;
  }
  return <Badge variant="secondary">P{priority}</Badge>;
}

function TypeBadge({ type }: { type: string }) {
  const labels: Record<string, string> = {
    document_verification: 'Document',
    partner_approval: 'Partner',
    shop_assignment: 'Placement',
  };
  return <Badge variant="outline">{labels[type] || type}</Badge>;
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'in_progress') {
    return <Badge variant="default">In Progress</Badge>;
  }
  return <Badge variant="secondary">Pending</Badge>;
}

function AgeDisplay({ createdAt }: { createdAt: string }) {
  const created = new Date(createdAt);
  const now = new Date();
  const diffMs = now.getTime() - created.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return (
      <span className={diffDays > 2 ? 'text-red-600 font-medium' : ''}>
        {diffDays}d ago
      </span>
    );
  }
  if (diffHours > 0) {
    return <span>{diffHours}h ago</span>;
  }
  return <span className="text-muted-foreground">Just now</span>;
}
