'use client';

import React, { useState } from 'react';
import { RefreshCw, ExternalLink, Monitor, Smartphone, Tablet, Loader2 } from 'lucide-react';

interface WebContainerPreviewProps {
  url: string | null;
  isLoading?: boolean;
}

type DeviceType = 'desktop' | 'tablet' | 'mobile';

export default function WebContainerPreview({ url, isLoading }: WebContainerPreviewProps) {
  const [device, setDevice] = useState<DeviceType>('desktop');
  const [key, setKey] = useState(0);

  const refresh = () => {
    setKey(prev => prev + 1);
  };

  const openInNewTab = () => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const deviceSizes = {
    desktop: 'w-full h-full',
    tablet: 'w-[768px] h-full mx-auto',
    mobile: 'w-[375px] h-full mx-auto'
  };

  return (
    <div className="h-full flex flex-col bg-[#0d1117]">
      {/* Preview Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#30363d]">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#c9d1d9]">Preview</span>
          {url && (
            <span className="text-xs text-[#8b949e] truncate max-w-[150px]">
              {url}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Device Selector */}
          <div className="flex gap-1 bg-[#21262d] border border-[#30363d] rounded p-0.5">
            <button
              onClick={() => setDevice('desktop')}
              className={`p-1.5 rounded ${device === 'desktop' ? 'bg-[#388bfd] text-white' : 'text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#30363d]'}`}
              title="Desktop view"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDevice('tablet')}
              className={`p-1.5 rounded ${device === 'tablet' ? 'bg-[#388bfd] text-white' : 'text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#30363d]'}`}
              title="Tablet view"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`p-1.5 rounded ${device === 'mobile' ? 'bg-[#388bfd] text-white' : 'text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#30363d]'}`}
              title="Mobile view"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Refresh Button */}
          <button
            onClick={refresh}
            disabled={!url}
            className="p-1.5 text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#30363d] rounded transition-colors disabled:opacity-50"
            title="Refresh preview"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Open in New Tab */}
          <button
            onClick={openInNewTab}
            disabled={!url}
            className="p-1.5 text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#30363d] rounded transition-colors disabled:opacity-50"
            title="Open in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-hidden bg-[#010409] p-2">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-8 h-8 text-[#388bfd] animate-spin mx-auto mb-3" />
              <p className="text-[#8b949e] text-sm">Starting dev server...</p>
            </div>
          </div>
        ) : url ? (
          <div className={`${deviceSizes[device]} bg-white rounded overflow-hidden shadow-2xl`}>
            <iframe
              key={key}
              src={url}
              className="w-full h-full border-0"
              title="Preview"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <Monitor className="w-12 h-12 text-[#30363d] mx-auto mb-3" />
              <p className="text-[#8b949e] text-sm mb-1">No preview available</p>
              <p className="text-[#6e7681] text-xs">Click "Run" to start the dev server</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
