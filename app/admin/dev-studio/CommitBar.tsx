"use client";

export default function CommitBar({ repo, branch, path, content, sha }) {
  async function save() {
    await fetch('/api/github/commit', {
      method: 'POST',
      body: JSON.stringify({ repo, branch, path, content, sha }),
    });
    alert('Saved to GitHub!');
  }

  return (
    <div className="flex justify-between items-center text-xs mb-2">
      <span className="text-slate-400">{path || 'No file selected'}</span>

      <button
        onClick={save}
        className="px-3 py-1 bg-brand-blue-600 rounded hover:bg-brand-blue-700"
      >
        Save
      </button>
    </div>
  );
}
