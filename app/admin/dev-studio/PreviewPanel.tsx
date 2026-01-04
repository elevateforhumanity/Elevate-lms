"use client";

interface PreviewPanelProps {
  repo: string | null;
  branch: string;
  path?: string | null;
}

export default function PreviewPanel({ repo, branch, path }: PreviewPanelProps) {
  if (!repo) {
    return (
      <div className="flex items-center justify-center h-full text-slate-400">
        <div className="text-center">
          <p className="text-lg mb-2">No repository selected</p>
          <p className="text-sm">Select a repo to see preview</p>
        </div>
      </div>
    );
  }

  // Build preview URL
  let previewUrl = `/api/preview/render?repo=${encodeURIComponent(repo)}&ref=${encodeURIComponent(branch)}`;

  if (path) {
    previewUrl += `&path=${encodeURIComponent(path)}`;
  }

  return (
    <iframe
      key={previewUrl} // Force reload when URL changes
      src={previewUrl}
      className="w-full h-full bg-white rounded border-0"
      title="File Preview"
    />
  );
}
