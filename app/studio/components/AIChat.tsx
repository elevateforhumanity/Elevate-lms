'use client';

import { useState, useRef, useEffect } from 'react';
import type { Message, OpenFile } from '../types';

interface AIChatProps {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  currentFile?: OpenFile;
  repoId?: string;
  userId?: string;
  onApplyCode: (code: string) => void;
}

export function AIChat({ messages, setMessages, currentFile, repoId, userId, onApplyCode }: AIChatProps) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages([...messages, { role: 'user', content: userMessage }]);
    setLoading(true);
    setStreamingContent('');

    const fileContext = currentFile 
      ? `File: ${currentFile.path}\n\n${currentFile.content.slice(0, 4000)}`
      : '';

    try {
      const res = await fetch('/api/studio/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-user-id': userId || '',
        },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }],
          fileContext,
          repo_id: repoId,
          stream: true,
        }),
      });

      if (!res.ok) throw new Error('Failed to get response');

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                fullContent += parsed.content;
                setStreamingContent(fullContent);
              }
            } catch {}
          }
        }
      }

      setMessages([...messages, { role: 'user', content: userMessage }, { role: 'assistant', content: fullContent }]);
      setStreamingContent('');
    } catch (e) {
      setMessages([...messages, { role: 'user', content: userMessage }, { role: 'assistant', content: `Error: ${e}` }]);
    }
    
    setLoading(false);
  };

  const extractCode = (content: string): string | null => {
    const match = content.match(/```[\w.]*\n([\s\S]*?)```/);
    return match ? match[1] : null;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: 8, borderBottom: '1px solid #3c3c3c', fontWeight: 500, fontSize: 13 }}>
        AI Assistant
        {currentFile && (
          <span style={{ fontWeight: 400, color: '#888', marginLeft: 8 }}>
            • {currentFile.path.split('/').pop()}
          </span>
        )}
      </div>
      
      <div style={{ flex: 1, overflow: 'auto', padding: 8 }}>
        {messages.length === 0 && !streamingContent && (
          <div style={{ color: '#888', fontSize: 13, padding: 12 }}>
            <p style={{ margin: '0 0 8px' }}>Ask me to:</p>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              <li>Explain code</li>
              <li>Fix bugs</li>
              <li>Refactor</li>
              <li>Write tests</li>
              <li>Add features</li>
            </ul>
          </div>
        )}
        
        {messages.map((m, i) => (
          <ChatMessage key={i} message={m} onApply={onApplyCode} />
        ))}
        
        {streamingContent && (
          <ChatMessage message={{ role: 'assistant', content: streamingContent }} onApply={onApplyCode} />
        )}
        
        {loading && !streamingContent && (
          <div style={{ color: '#888', fontSize: 13, padding: 8 }}>Thinking...</div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div style={{ padding: 8, borderTop: '1px solid #3c3c3c', display: 'flex', gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
          placeholder="Ask AI..."
          disabled={loading}
          style={{ 
            flex: 1, 
            padding: 10, 
            background: '#3c3c3c', 
            border: 'none', 
            borderRadius: 6, 
            color: '#fff',
            fontSize: 13,
          }}
        />
        <button 
          onClick={sendMessage} 
          disabled={loading || !input.trim()}
          style={{ 
            padding: '10px 16px', 
            background: loading ? '#3c3c3c' : '#0e639c', 
            border: 'none', 
            borderRadius: 6, 
            color: '#fff', 
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: 13,
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

function ChatMessage({ message, onApply }: { message: Message; onApply: (code: string) => void }) {
  const code = message.role === 'assistant' ? extractCode(message.content) : null;
  
  return (
    <div style={{ 
      marginBottom: 12, 
      padding: 12, 
      background: message.role === 'user' ? '#0e639c' : '#2d2d2d', 
      borderRadius: 8, 
      fontSize: 13,
    }}>
      <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {message.content}
      </div>
      {code && (
        <button 
          onClick={() => onApply(code)} 
          style={{ 
            marginTop: 8, 
            padding: '6px 12px', 
            background: '#238636', 
            border: 'none', 
            borderRadius: 4, 
            color: '#fff', 
            cursor: 'pointer', 
            fontSize: 12,
          }}
        >
          Apply Code
        </button>
      )}
    </div>
  );
}

function extractCode(content: string): string | null {
  const match = content.match(/```[\w.]*\n([\s\S]*?)```/);
  return match ? match[1] : null;
}
