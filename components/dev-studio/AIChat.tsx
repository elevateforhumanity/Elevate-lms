'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Copy, Check, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatProps {
  fileContext?: string;
  onApplyCode?: (filename: string, code: string) => void;
}

export default function AIChat({ fileContext, onApplyCode }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/devstudio/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }],
          fileContext,
        }),
      });

      const data = await res.json();
      
      if (data.error) {
        setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${data.error}` }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Failed to connect to AI service.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const copyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const extractCodeBlocks = (content: string) => {
    const codeBlockRegex = /```(\S+)?\n([\s\S]*?)```/g;
    const parts: { type: 'text' | 'code'; content: string; language?: string; filename?: string }[] = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: content.slice(lastIndex, match.index) });
      }
      
      const langOrFile = match[1] || '';
      const isFilename = langOrFile.includes('.') || langOrFile.includes('/');
      
      parts.push({
        type: 'code',
        content: match[2],
        language: isFilename ? langOrFile.split('.').pop() : langOrFile,
        filename: isFilename ? langOrFile : undefined,
      });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push({ type: 'text', content: content.slice(lastIndex) });
    }

    return parts.length > 0 ? parts : [{ type: 'text' as const, content }];
  };

  const applyCode = (filename: string, code: string) => {
    if (onApplyCode) {
      onApplyCode(filename, code);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#0d1117]">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-[#30363d] bg-[#161b22]">
        <Sparkles className="w-4 h-4 text-[#a371f7]" />
        <span className="text-sm font-medium text-[#c9d1d9]">AI Assistant</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <Bot className="w-12 h-12 text-[#30363d] mx-auto mb-3" />
            <p className="text-[#8b949e] text-sm mb-2">AI Assistant ready</p>
            <p className="text-[#6e7681] text-xs">Ask me to write code, explain something, or help debug</p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-[#a371f7] flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div className={`max-w-[85%] ${msg.role === 'user' ? 'bg-[#238636]' : 'bg-[#21262d]'} rounded-lg p-3`}>
                {msg.role === 'assistant' ? (
                  <div className="space-y-2">
                    {extractCodeBlocks(msg.content).map((part, j) => (
                      part.type === 'code' ? (
                        <div key={j} className="relative">
                          <div className="flex items-center justify-between bg-[#161b22] px-3 py-1 rounded-t border border-[#30363d] border-b-0">
                            <span className="text-xs text-[#8b949e]">{part.filename || part.language || 'code'}</span>
                            <div className="flex gap-1">
                              {part.filename && onApplyCode && (
                                <button
                                  onClick={() => applyCode(part.filename!, part.content)}
                                  className="text-xs text-[#58a6ff] hover:underline"
                                >
                                  Apply
                                </button>
                              )}
                              <button
                                onClick={() => copyCode(part.content, i * 100 + j)}
                                className="p-1 text-[#8b949e] hover:text-[#c9d1d9]"
                              >
                                {copiedIndex === i * 100 + j ? (
                                  <Check className="w-3 h-3 text-[#3fb950]" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </div>
                          <pre className="bg-[#0d1117] p-3 rounded-b border border-[#30363d] border-t-0 overflow-x-auto">
                            <code className="text-xs text-[#c9d1d9]">{part.content}</code>
                          </pre>
                        </div>
                      ) : (
                        <p key={j} className="text-sm text-[#c9d1d9] whitespace-pre-wrap">{part.content}</p>
                      )
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-white whitespace-pre-wrap">{msg.content}</p>
                )}
              </div>
              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-full bg-[#30363d] flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-[#c9d1d9]" />
                </div>
              )}
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-[#a371f7] flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-[#21262d] rounded-lg p-3">
              <Loader2 className="w-4 h-4 text-[#8b949e] animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-[#30363d]">
        <div className="flex gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask AI to help with code..."
            rows={2}
            className="flex-1 px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-lg text-[#c9d1d9] text-sm resize-none focus:border-[#388bfd] focus:outline-none"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="px-3 bg-[#238636] hover:bg-[#2ea043] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
