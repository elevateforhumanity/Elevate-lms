
'use client';

import React from 'react';

import { useState, useRef, useEffect } from 'react';

interface TerminalProps {
  onCommand?: (command: string) => Promise<string>;
}

export default function Terminal({ onCommand }: TerminalProps) {
  const [history, setHistory] = useState<
    Array<{ type: 'input' | 'output'; text: string }>
  >([
    {
      type: 'output',
      text: 'Welcome to EFH Terminal. Type "help" for available commands.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || isProcessing) return;

    const command = input.trim();
    setHistory((prev) => [...prev, { type: 'input', text: `$ ${command}` }]);
    setInput('');
    setIsProcessing(true);

    try {
      let output = '';

      if (onCommand) {
        output = await onCommand(command);
      } else {
        // Default commands
        if (command === 'help') {
          output =
            'Available commands:\n  help - Show this help\n  clear - Clear terminal\n  ls - List files\n  pwd - Print working directory';
        } else if (command === 'clear') {
          setHistory([]);
          setIsProcessing(false);
          return;
        } else if (command === 'pwd') {
          output = '/workspace';
        } else if (command === 'ls') {
          output = 'app/  components/  lib/  public/  package.json  README.md';
        } else {
          output = `Command not found: ${command}`;
        }
      }

      setHistory((prev) => [...prev, { type: 'output', text: output }]);
    } catch (error) { /* Error handled silently */ 
      setHistory((prev) => [
        ...prev,
        {
          type: 'output',
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="h-full bg-black text-green-400 font-mono text-sm flex flex-col">
      <div className="p-2 border-b border-gray-700 bg-gray-900">
        <h3 className="font-semibold text-xs text-gray-400">Terminal</h3>
      </div>

      <div ref={terminalRef} className="flex-1 overflow-y-auto p-4 space-y-1">
        {history.map((entry, index) => (
          <div
            key={index}
            className={entry.type === 'input' ? 'text-white' : 'text-green-400'}
          >
            {entry.text.split('\n').map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        ))}

        {isProcessing && <div className="text-yellow-400">Processing...</div>}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-white">$</span>
          <input
            type="text"
            value={input}
            onChange={(
              e: React.ChangeEvent<
                HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
              >
            ) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-white"
            placeholder="Type a command..."
            disabled={isProcessing}
            autoFocus
          />
        </div>
      </form>
    </div>
  );
}
