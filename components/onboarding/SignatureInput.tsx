"use client";

import React from 'react';

import { useState } from 'react';
import { SignatureCanvas } from '@/components/SignatureCanvas';
import { Type, Pen } from 'lucide-react';

interface SignatureInputProps {
  userName: string;
  onSignatureChange: (signature: string, type: 'TYPED' | 'DRAWN') => void;
}

export function SignatureInput({
  userName,
  onSignatureChange,
}: SignatureInputProps) {
  const [signatureType, setSignatureType] = useState<'TYPED' | 'DRAWN'>(
    'TYPED'
  );
  const [typedSignature, setTypedSignature] = useState('');
  const [drawnSignature, setDrawnSignature] = useState('');

  const handleTypedChange = (value: string) => {
    setTypedSignature(value);
    onSignatureChange(value, 'TYPED');
  };

  const handleDrawnChange = (dataUrl: string) => {
    setDrawnSignature(dataUrl);
    onSignatureChange(dataUrl, 'DRAWN');
  };

  return (
    <div className="space-y-4">
      {/* Signature Type Selector */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setSignatureType('TYPED')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-colors ${
            signatureType === 'TYPED'
              ? 'border-blue-600 bg-blue-50 text-blue-900'
              : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
          }`}
        >
          <Type className="w-5 h-5" />
          <span className="font-medium">Type Signature</span>
        </button>
        <button
          type="button"
          onClick={() => setSignatureType('DRAWN')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-colors ${
            signatureType === 'DRAWN'
              ? 'border-blue-600 bg-blue-50 text-blue-900'
              : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
          }`}
        >
          <Pen className="w-5 h-5" />
          <span className="font-medium">Draw Signature</span>
        </button>
      </div>

      {/* Typed Signature Input */}
      {signatureType === 'TYPED' && (
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Type Your Full Name
          </label>
          <input
            type="text"
            value={typedSignature}
            onChange={(e) => handleTypedChange(e.target.value)}
            Content="Type your full name"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-serif text-lg"
            style={{ fontFamily: 'Brush Script MT, cursive' }}
          />
          <p className="text-sm text-slate-600 mt-2">
            Must match: <strong>{userName}</strong>
          </p>
        </div>
      )}

      {/* Drawn Signature Canvas */}
      {signatureType === 'DRAWN' && (
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Draw Your Signature
          </label>
          <SignatureCanvas
            onSignatureChange={handleDrawnChange}
            width={500}
            height={200}
          />
          <p className="text-sm text-slate-600 mt-2">
            Draw your signature using your mouse or touchscreen
          </p>
        </div>
      )}

      {/* Legal Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <strong>Legal Notice:</strong> This digital signature has the same
          legal effect as a handwritten signature. By signing, you agree to be
          legally bound by this document.
        </p>
      </div>
    </div>
  );
}
