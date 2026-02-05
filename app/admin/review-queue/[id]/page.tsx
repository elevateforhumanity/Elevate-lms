'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  AlertTriangle,
  FileText,
  Clock,
  User,
  Building2
} from 'lucide-react';
import Link from 'next/link';

interface ReviewItem {
  id: string;
  entity_type: string;
  entity_id: string;
  review_type: string;
  priority: number;
  status: string;
  extracted_data: Record<string, unknown>;
  confidence_score: number | null;
  failed_rules: string[];
  system_recommendation: string | null;
  context: Record<string, unknown>;
  created_at: string;
}

interface Document {
  id: string;
  document_type: string;
  file_name: string;
  file_url: string;
  status: string;
  extracted_data: Record<string, unknown>;
  ocr_confidence: number | null;
}

export default function ReviewItemPage() {
  const params = useParams();
  const router = useRouter();
  const [item, setItem] = useState<ReviewItem | null>(null);
  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [reason, setReason] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadItem();
  }, [params.id]);

  async function loadItem() {
    const supabase = createClient();
    
    const { data: reviewItem, error: itemError } = await supabase
      .from('review_queue')
      .select('*')
      .eq('id', params.id)
      .single();

    if (itemError || !reviewItem) {
      setError('Review item not found');
      setLoading(false);
      return;
    }

    setItem(reviewItem);

    // Load related entity
    if (reviewItem.entity_type === 'document') {
      const { data: doc } = await supabase
        .from('documents')
        .select('*')
        .eq('id', reviewItem.entity_id)
        .single();
      setDocument(doc);
    }

    // Mark as in progress
    if (reviewItem.status === 'pending') {
      const { data: { user } } = await supabase.auth.getUser();
      await supabase
        .from('review_queue')
        .update({
          status: 'in_progress',
          assigned_to: user?.id,
          assigned_at: new Date().toISOString(),
        })
        .eq('id', params.id);
    }

    setLoading(false);
  }

  async function handleDecision(decision: 'approved' | 'rejected' | 'reupload_requested') {
    if (!item) return;
    
    setSubmitting(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      // Update review queue item
      await supabase
        .from('review_queue')
        .update({
          status: 'completed',
          resolution: decision,
          resolution_reason: reason || null,
          resolved_by: user?.id,
          resolved_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', item.id);

      // Update the underlying entity
      if (item.entity_type === 'document') {
        const newStatus = decision === 'approved' ? 'approved' : 
                         decision === 'rejected' ? 'rejected' : 'pending';
        
        await supabase
          .from('documents')
          .update({
            status: newStatus,
            verified_at: decision === 'approved' ? new Date().toISOString() : null,
            verified_by: decision === 'approved' ? user?.id : null,
            updated_at: new Date().toISOString(),
          })
          .eq('id', item.entity_id);
      } else if (item.entity_type === 'partner') {
        if (decision === 'approved') {
          await supabase
            .from('partners')
            .update({
              status: 'active',
              account_status: 'active',
              approved_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq('id', item.entity_id);
        } else if (decision === 'rejected') {
          await supabase
            .from('partners')
            .update({
              status: 'denied',
              updated_at: new Date().toISOString(),
            })
            .eq('id', item.entity_id);
        }
      }

      // Record the human decision
      await supabase.from('automated_decisions').insert({
        entity_type: item.entity_type,
        entity_id: item.entity_id,
        decision_type: `${item.review_type}_human_review`,
        outcome: decision,
        actor: user?.id || 'unknown',
        ruleset_version: '1.0.0',
        reason_codes: reason ? [reason] : ['human_override'],
        input_snapshot: {
          review_queue_id: item.id,
          original_failed_rules: item.failed_rules,
          original_confidence: item.confidence_score,
        },
        created_at: new Date().toISOString(),
      });

      // Write audit log
      await supabase.from('audit_logs').insert({
        action: `${item.entity_type}_human_${decision}`,
        target_type: item.entity_type,
        target_id: item.entity_id,
        actor_id: user?.id,
        metadata: {
          review_queue_id: item.id,
          decision,
          reason: reason || null,
        },
        created_at: new Date().toISOString(),
      });

      router.push('/admin/review-queue');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit decision');
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error || 'Item not found'}</AlertDescription>
        </Alert>
        <Link href="/admin/review-queue" className="mt-4 inline-block">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Queue
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/review-queue">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Review Item</h1>
          <p className="text-muted-foreground">
            {item.review_type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Document/Entity Preview */}
        <div className="space-y-6">
          {/* Document Preview */}
          {document && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Document Preview
                </CardTitle>
                <CardDescription>{document.file_name}</CardDescription>
              </CardHeader>
              <CardContent>
                {document.file_url && (
                  <div className="border rounded-lg overflow-hidden bg-gray-50">
                    {document.file_url.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                      <img 
                        src={document.file_url} 
                        alt="Document" 
                        className="w-full h-auto max-h-[500px] object-contain"
                      />
                    ) : document.file_url.match(/\.pdf$/i) ? (
                      <iframe 
                        src={document.file_url} 
                        className="w-full h-[500px]"
                        title="Document Preview"
                      />
                    ) : (
                      <div className="p-8 text-center">
                        <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                        <a 
                          href={document.file_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Open Document
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Extracted Data */}
          <Card>
            <CardHeader>
              <CardTitle>Extracted Data</CardTitle>
              <CardDescription>
                Data extracted by OCR/automation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(item.extracted_data || document?.extracted_data || {}).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b last:border-0">
                    <span className="text-muted-foreground capitalize">
                      {key.replace(/_/g, ' ')}
                    </span>
                    <span className="font-medium">
                      {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                    </span>
                  </div>
                ))}
                {Object.keys(item.extracted_data || document?.extracted_data || {}).length === 0 && (
                  <p className="text-muted-foreground text-center py-4">
                    No data extracted
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Review Details & Actions */}
        <div className="space-y-6">
          {/* Status & Confidence */}
          <Card>
            <CardHeader>
              <CardTitle>Review Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Priority</span>
                <Badge variant={item.priority <= 2 ? 'destructive' : 'secondary'}>
                  P{item.priority}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Confidence</span>
                <span className={
                  item.confidence_score !== null 
                    ? item.confidence_score >= 0.7 ? 'text-green-600 font-medium' : 'text-amber-600 font-medium'
                    : ''
                }>
                  {item.confidence_score !== null 
                    ? `${(item.confidence_score * 100).toFixed(1)}%` 
                    : '—'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Created</span>
                <span>{new Date(item.created_at).toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Failed Rules */}
          {item.failed_rules.length > 0 && (
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-800">
                  <AlertTriangle className="h-5 w-5" />
                  Issues Detected
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {item.failed_rules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-2 text-amber-800">
                      <XCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* System Recommendation */}
          {item.system_recommendation && (
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-800">System Recommendation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-800">{item.system_recommendation}</p>
              </CardContent>
            </Card>
          )}

          {/* Decision Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Your Decision</CardTitle>
              <CardDescription>
                Review the document and extracted data, then make a decision.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Reason (optional)
                </label>
                <Textarea
                  placeholder="Add a note explaining your decision..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                />
              </div>

              <Separator />

              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => handleDecision('approved')}
                  disabled={submitting}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                
                <Button
                  onClick={() => handleDecision('rejected')}
                  disabled={submitting}
                  variant="destructive"
                  className="w-full"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>

                {item.entity_type === 'document' && (
                  <Button
                    onClick={() => handleDecision('reupload_requested')}
                    disabled={submitting}
                    variant="outline"
                    className="w-full"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Request Reupload
                  </Button>
                )}
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
