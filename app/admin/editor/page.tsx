"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Code, FolderOpen, FileText, AlertTriangle, Loader2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface EditorFile {
  id: string;
  name: string;
  path: string;
  content: string | null;
  file_type: string;
  created_at: string;
  updated_at: string;
}

export default function EditorPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [files, setFiles] = useState<EditorFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<EditorFile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkAdminAndFetchFiles() {
      const supabase = createClient();
      
      // Check if user is authenticated and is admin
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/auth/login?redirect=/admin/editor');
        return;
      }

      // Check admin role
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (!profile || !['admin', 'super_admin'].includes(profile.role)) {
        setError('Access denied. Admin privileges required.');
        setIsLoading(false);
        return;
      }

      setIsAdmin(true);

      // Fetch editor files from database (if table exists)
      const { data: editorFiles, error: filesError } = await supabase
        .from('editor_files')
        .select('*')
        .order('path', { ascending: true });

      if (filesError) {
        // Table might not exist yet
        if (filesError.code === '42P01') {
          setFiles([]);
        } else {
          console.error('Error fetching files:', filesError);
        }
      } else {
        setFiles(editorFiles || []);
      }

      setIsLoading(false);
    }

    checkAdminAndFetchFiles();
  }, [router]);

  const handleFileSelect = (file: EditorFile) => {
    setSelectedFile(file);
  };

  const handleSave = async () => {
    if (!selectedFile) return;

    const supabase = createClient();
    const { error: saveError } = await supabase
      .from('editor_files')
      .update({ 
        content: selectedFile.content,
        updated_at: new Date().toISOString()
      })
      .eq('id', selectedFile.id);

    if (saveError) {
      alert('Failed to save file');
      console.error(saveError);
    } else {
      alert('File saved successfully');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 rounded-lg p-8 text-center max-w-md">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-gray-400 mb-6">{error}</p>
          <Link href="/admin" className="text-blue-400 hover:underline">
            Return to Admin Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  // No files in database yet
  if (files.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="h-12 bg-slate-800 text-white flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Code className="w-5 h-5" />
            <h1 className="font-semibold">EFH Code Editor</h1>
          </div>
          <Link href="/admin" className="text-sm text-gray-400 hover:text-white">
            ← Back to Admin
          </Link>
        </div>
        
        <div className="flex items-center justify-center" style={{ height: 'calc(100vh - 48px)' }}>
          <div className="text-center max-w-lg px-4">
            <FolderOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">No Files Available</h2>
            <p className="text-gray-400 mb-6">
              The code editor requires the editor_files table to be set up in your database. 
              This feature allows admins to edit configuration files and templates directly.
            </p>
            <div className="bg-gray-800 rounded-lg p-4 text-left text-sm">
              <p className="text-gray-300 mb-2">To enable this feature, create the editor_files table:</p>
              <pre className="text-green-400 overflow-x-auto">
{`CREATE TABLE editor_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  path TEXT NOT NULL UNIQUE,
  content TEXT,
  file_type TEXT DEFAULT 'text',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);`}
              </pre>
            </div>
            <div className="mt-6">
              <Link 
                href="/admin" 
                className="inline-flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Return to Admin Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Header */}
      <div className="h-12 bg-slate-800 text-white flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Code className="w-5 h-5" />
          <h1 className="font-semibold">EFH Code Editor</h1>
          {selectedFile && (
            <span className="text-sm text-gray-400">{selectedFile.path}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            disabled={!selectedFile}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-4 py-1 rounded text-sm"
          >
            Save
          </button>
          <Link href="/admin" className="text-sm text-gray-400 hover:text-white ml-4">
            ← Back to Admin
          </Link>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* File List */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 overflow-y-auto">
          <div className="p-3 border-b border-gray-700">
            <h2 className="text-sm font-medium text-gray-300">Files</h2>
          </div>
          <div className="p-2">
            {files.map((file) => (
              <button
                key={file.id}
                onClick={() => handleFileSelect(file)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm text-left ${
                  selectedFile?.id === file.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span className="truncate">{file.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 overflow-hidden">
          {selectedFile ? (
            <textarea
              value={selectedFile.content || ''}
              onChange={(e) => setSelectedFile({ ...selectedFile, content: e.target.value })}
              className="w-full h-full bg-gray-900 text-gray-100 font-mono text-sm p-4 resize-none focus:outline-none"
              spellCheck={false}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Select a file to edit</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
