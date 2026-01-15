

'use client';

import { logger } from '@/lib/logger';
import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'success' | 'error';
  url?: string;
  error?: string;
}

export default function UploadDocumentsPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    setUploading(true);

    for (const file of selectedFiles) {
      // Add file to list with uploading status
      const newFile: UploadedFile = {
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading',
      };
      setFiles((prev) => [...prev, newFile]);

      try {
        const supabase = createClient();

        // Upload to Supabase Storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `tax-documents/${fileName}`;

        const { data, error }: any = await supabase.storage
          .from('documents')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (error) throw error;

        // Get public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from('documents').getPublicUrl(filePath);

        // Save to database
        await supabase.from('tax_documents').insert({
          file_name: file.name,
          file_path: filePath,
          file_size: file.size,
          file_type: file.type,
          email: email,
          phone: phone,
          status: 'pending_review',
        });

        // Update file status to success
        setFiles((prev) =>
          prev.map((f) =>
            f.name === file.name
              ? { ...f, status: 'success', url: publicUrl }
              : f
          )
        );
      } catch (error) {
        logger.error('Upload error:', error);
        setFiles((prev) =>
          prev.map((f) =>
            f.name === file.name
              ? {
                  ...f,
                  status: 'error',
                  error:
                    error instanceof Error ? error.message : 'Upload failed',
                }
              : f
          )
        );
      }
    }

    setUploading(false);
  };

  const removeFile = (fileName: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== fileName));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">
            Upload Your Tax Documents
          </h1>
          <p className="text-xl text-black">
            Securely upload your W-2s, 1099s, receipts, and other tax documents
          </p>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-black mb-6">
            Your Information
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="(317) 555-0123"
                required
              />
            </div>
          </div>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-black mb-6">
            Upload Documents
          </h2>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors">
            <Upload className="w-16 h-16 text-black mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-black mb-2">
              Drop files here or click to browse
            </h3>
            <p className="text-black mb-6">
              Accepted: PDF, JPG, PNG, DOC, DOCX (Max 10MB per file)
            </p>
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
              disabled={!email || !phone || uploading}
            />
            <label
              htmlFor="file-upload"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer ${
                !email || !phone || uploading
                  ? 'bg-gray-300 text-black cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <Upload className="w-5 h-5" />
              Select Files
            </label>
          </div>

          {!email ||
            (!phone && (
              <p className="text-sm text-amber-600 mt-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Please enter your email and phone number before uploading
              </p>
            ))}
        </div>

        {/* Uploaded Files List */}
        {files.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-black mb-6">
              Uploaded Files
            </h2>
            <div className="space-y-4">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <FileText className="w-8 h-8 text-blue-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-black truncate">
                        {file.name}
                      </p>
                      <p className="text-sm text-black">
                        {formatFileSize(file.size)}
                      </p>
                      {file.error && (
                        <p className="text-sm text-red-600 mt-1">
                          {file.error}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {file.status === 'uploading' && (
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
                    )}
                    {file.status === 'success' && (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    )}
                    {file.status === 'error' && (
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    )}
                    <button
                      onClick={() => removeFile(file.name)}
                      className="p-1 hover:bg-gray-100 rounded"
                      disabled={file.status === 'uploading'}
                    >
                      <X className="w-5 h-5 text-black" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* What to Upload */}
        <div className="bg-blue-50 rounded-xl p-8 mt-8">
          <h3 className="text-xl font-bold text-black mb-4">
            What Documents to Upload
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-black mb-2">
                Income Documents:
              </h4>
              <ul className="space-y-1 text-black">
                <li>• W-2 forms from all employers</li>
                <li>• 1099 forms (all types)</li>
                <li>• Business income records</li>
                <li>• Rental income statements</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-black mb-2">
                Deduction Documents:
              </h4>
              <ul className="space-y-1 text-black">
                <li>• Mortgage interest statements</li>
                <li>• Property tax receipts</li>
                <li>• Charitable donation receipts</li>
                <li>• Medical expense receipts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
