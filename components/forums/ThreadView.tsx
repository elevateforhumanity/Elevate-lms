"use client";

import React from 'react';

import { useState } from "react";
import { ThumbsUp, MessageSquare, Circle } from "lucide-react";

interface Reply {
  id: string;
  user_id: string;
  author_name: string;
  content: string;
  upvotes: number;
  is_solution: boolean;
  created_at: string;
}

interface ThreadViewProps {
  threadId: string;
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
  replies: Reply[];
  onReply: (content: string) => Promise<void>;
  onUpvote: (replyId: string) => Promise<void>;
}

export function ThreadView({
  threadId,
  title,
  content,
  authorName,
  createdAt,
  replies,
  onReply,
  onUpvote,
}: ThreadViewProps) {
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    setIsSubmitting(true);
    try {
      await onReply(replyContent);
      setReplyContent("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Original Post */}
      <div className="bg-slate-800 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-white mb-4">{title}</h1>
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
          <span>{authorName}</span>
          <span>•</span>
          <span>{new Date(createdAt).toLocaleDateString()}</span>
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="text-slate-300">{content}</p>
        </div>
      </div>

      {/* Replies */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          {replies.length} Replies
        </h2>

        {replies.map((reply) => (
          <div
            key={reply.id}
            className={`bg-slate-800 rounded-lg p-4 ${
              reply.is_solution ? "border-2 border-green-500" : ""
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-white">{reply.author_name}</span>
                  {reply.is_solution && (
                    <span className="flex items-center gap-1 text-xs bg-green-500/20 text-green-400 px-2 py-2 rounded">
                      <Circle className="w-3 h-3" />
                      Solution
                    </span>
                  )}
                  <span className="text-xs text-slate-500">
                    {new Date(reply.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-slate-300 mb-3">{reply.content}</p>
                <button
                  onClick={() => onUpvote(reply.id)}
                  className="flex items-center gap-1 text-sm text-slate-400 hover:text-orange-400 transition-colors"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{reply.upvotes}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reply Form */}
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Add Your Reply</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={replyContent}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setReplyContent(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full bg-slate-900 text-white rounded-lg p-4 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-orange-500"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting || !replyContent.trim()}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? "Posting..." : "Post Reply"}
          </button>
        </form>
      </div>
    </div>
  );
}
