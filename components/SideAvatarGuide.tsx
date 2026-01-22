'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, ChevronLeft, ChevronRight, MessageCircle, X } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface SideAvatarGuideProps {
  avatarVideoUrl: string;
  avatarName: string;
  avatarRole: string;
  welcomeMessage: string;
  context: string;
  side?: 'left' | 'right';
}

export default function SideAvatarGuide({
  avatarVideoUrl,
  avatarName,
  avatarRole,
  welcomeMessage,
  context,
  side = 'right',
}: SideAvatarGuideProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: welcomeMessage },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Delay showing to let page load first
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-play video with sound when visible
  useEffect(() => {
    if (isVisible && videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {
        // If autoplay with sound fails (browser policy), try muted
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        }
      });
    }
  }, [isVisible]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Play video when assistant responds
  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  if (!isVisible) return null;

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Pass route context for deterministic routing
      const currentRoute = typeof window !== 'undefined' ? window.location.pathname : '/';
      
      const response = await fetch('/api/chat/avatar-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          route: currentRoute,
          context,
          history: messages.slice(-10),
        }),
      });

      const data = await response.json();

      if (data.error) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "I'm sorry, I encountered an issue. Please try again or call (317) 314-3757.",
        }]);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.message,
        }]);
        playVideo();
      }
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Connection issue. Please try again.",
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const sideClasses = side === 'right' 
    ? 'right-0 rounded-l-2xl' 
    : 'left-0 rounded-r-2xl';

  const toggleClasses = side === 'right'
    ? '-left-10 rounded-l-lg'
    : '-right-10 rounded-r-lg';

  return (
    <div 
      className={`fixed top-1/4 ${sideClasses} z-40 transition-all duration-300 ${
        isExpanded ? 'w-80' : 'w-0'
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`absolute ${toggleClasses} top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 shadow-lg transition-colors`}
        title={isExpanded ? 'Hide Guide' : 'Show Guide'}
      >
        {isExpanded ? (
          side === 'right' ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />
        ) : (
          <>
            {side === 'right' ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </>
        )}
      </button>

      {/* Collapsed indicator */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className={`absolute ${side === 'right' ? '-left-16' : '-right-16'} top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 transition-colors`}
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium whitespace-nowrap">Ask {avatarName}</span>
        </button>
      )}

      {/* Main Panel */}
      {isExpanded && (
        <div className="bg-white shadow-2xl border border-gray-200 h-[500px] flex flex-col overflow-hidden rounded-l-2xl">
          {/* Avatar Video Section */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-800 p-3">
            <div className="relative">
              <video
                ref={videoRef}
                src={avatarVideoUrl}
                muted={isMuted}
                loop
                playsInline
                autoPlay
                className="w-full h-40 object-contain rounded-lg bg-slate-900"
              />
              
              {/* Unmute hint overlay */}
              {isMuted && showUnmuteHint && (
                <button
                  onClick={handleUnmute}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg transition-opacity hover:bg-black/50"
                >
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center gap-2 animate-pulse">
                    <Volume2 className="w-5 h-5" />
                    <span className="text-sm font-medium">Click to hear me</span>
                  </div>
                </button>
              )}
              
              {/* Mute/unmute button */}
              <button
                onClick={() => {
                  if (isMuted) {
                    handleUnmute();
                  } else {
                    setIsMuted(true);
                    if (videoRef.current) videoRef.current.muted = true;
                  }
                }}
                className="absolute bottom-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
            <div className="mt-2 text-center">
              <div className="text-white font-semibold">{avatarName}</div>
              <div className="text-blue-300 text-sm">{avatarRole}</div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[90%] px-3 py-2 rounded-xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-2 rounded-xl border border-gray-200">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
