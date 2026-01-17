// @ts-nocheck
"use client";

import React from 'react';

import { useState, useEffect, useRef } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  Bot,
  User,
  Minimize2,
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot' | 'agent';
  timestamp: Date;
  isTyping?: boolean;
}

interface AILiveChatProps {
  userId?: string;
  userName?: string;
  userEmail?: string;
}

export default function AILiveChat({
  userId,
  userName,
  userEmail,
}: AILiveChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [agentConnected, setAgentConnected] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-popup disabled
  useEffect(() => {
    // Popup disabled to avoid duplicate chat bubbles
    return;
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Send welcome message
      setMessages([
        {
          id: '1',
          content: `Hi${userName ? ` ${userName}` : ''}! 👋 I'm your AI assistant. How can I help you today?`,
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, userName]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Show typing indicator
    const typingMessage: Message = {
      id: 'typing',
      content: '',
      sender: 'bot',
      timestamp: new Date(),
      isTyping: true,
    };
    setMessages((prev) => [...prev, typingMessage]);

    try {
      const response = await fetch('/api/chat/ai-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: inputValue,
          conversationId,
          userId,
          userEmail,
          context: {
            previousMessages: messages.slice(-5),
          },
        }),
      });

      const data = await response.json();

      // Remove typing indicator
      setMessages((prev) => prev.filter((m) => m.id !== 'typing'));

      if (data.response) {
        const botMessage: Message = {
          id: Date.now().toString(),
          content: data.response,
          sender: data.isAgent ? 'agent' : 'bot',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);

        if (data.conversationId) {
          setConversationId(data.conversationId);
        }

        if (data.agentConnected) {
          setAgentConnected(true);
        }
      }
    } catch (error) { /* Error handled silently */ 
      // Error: $1
      setMessages((prev) => prev.filter((m) => m.id !== 'typing'));
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content:
            'Sorry, I encountered an error. Please try again or contact support at 317-314-3757.',
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const requestHumanAgent = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat/request-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId, userId }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            content: 'Connecting you with a live agent. Please wait...',
            sender: 'bot',
            timestamp: new Date(),
          },
        ]);
      }
    } catch (error) { /* Error handled silently */ 
      // Error: $1
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <>
        {/* Chat Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-white text-white rounded-full shadow-2xl hover: hover: transition-all hover:scale-110 flex items-center justify-center z-50 animate-bounce"
          aria-label="Open chat"
        >
          <MessageCircle className="w-8 h-8" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-orange-500 rounded-full animate-pulse border-2 border-white" />
        </button>

        {/* Popup Message */}
        {showPopup && (
          <div className="fixed bottom-24 right-6 bg-white rounded-xl shadow-2xl p-4 z-50 max-w-xs animate-slide-up border-2 border-orange-500">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-brand-orange-500 text-white rounded-full flex items-center justify-center hover:bg-brand-orange-600 transition"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-black mb-1">Need Help?</p>
                <p className="text-sm text-black mb-3">
                  Hi! I'm here to answer questions about our programs. Click to
                  chat!
                </p>
                <button
                  onClick={() => {
                    setIsOpen(true);
                    setShowPopup(false);
                  }}
                  className="w-full bg-white text-white px-4 py-2 rounded-lg font-semibold hover: hover: transition"
                >
                  Start Chat
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl z-50 flex flex-col transition-all ${
        isMinimized ? 'h-16' : 'h-[600px]'
      }`}
    >
      {/* Header */}
      <div className="bg-white text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bot className="w-8 h-8" />
            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
          </div>
          <div>
            <h3 className="font-bold">AI Assistant</h3>
            <p className="text-xs text-blue-100">
              {agentConnected ? 'Connected to agent' : 'Always here to help'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="hover:bg-gray-500 p-2 rounded-lg transition"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-gray-500 p-2 rounded-lg transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex items-start gap-2 max-w-[80%] ${
                    message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user'
                        ? 'bg-blue-600'
                        : message.sender === 'agent'
                          ? 'bg-green-600'
                          : 'bg-gray-600'
                    }`}
                  >
                    {message.sender === 'user' ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div>
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-black shadow-sm'
                      }`}
                    >
                      {message.isTyping ? (
                        <div className="flex gap-1">
                          <span
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: '0ms' }}
                          />
                          <span
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: '150ms' }}
                          />
                          <span
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: '300ms' }}
                          />
                        </div>
                      ) : (
                        <p className="text-sm whitespace-pre-wrap">
                          {message.content}
                        </p>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1 px-2">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {!agentConnected && messages.length > 2 && (
            <div className="px-4 py-2 bg-white border-t border-gray-200">
              <button
                onClick={requestHumanAgent}
                disabled={isLoading}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
              >
                Talk to a human agent →
              </button>
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200 rounded-b-2xl">
            <div className="flex items-end gap-2">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                rows={1}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Powered by AI • Available 24/7
            </p>
          </div>
        </>
      )}
    </div>
  );
}
