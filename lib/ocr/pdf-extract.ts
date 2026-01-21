/**
 * PDF Text Extraction Utility
 * Extract text from PDF documents using pdf-parse
 */

import pdf from 'pdf-parse';

export interface PDFExtractResult {
  text: string;
  pageCount: number;
  info?: {
    title?: string;
    author?: string;
    subject?: string;
    creator?: string;
    producer?: string;
    creationDate?: string;
    modificationDate?: string;
  };
  metadata?: Record<string, unknown>;
  version?: string;
}

/**
 * Check if a file is a PDF
 */
export function isPDF(file: File | Blob): boolean {
  return file.type === 'application/pdf';
}

/**
 * Convert File/Blob to Buffer
 */
async function fileToBuffer(file: File | Blob): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

/**
 * Extract text from a PDF file
 * @param input - PDF as File, Blob, Buffer, or file path
 * @returns Extracted text and metadata
 */
export async function extractTextFromPDF(
  input: File | Blob | Buffer | string
): Promise<PDFExtractResult> {
  try {
    let pdfBuffer: Buffer;

    if (input instanceof Buffer) {
      pdfBuffer = input;
    } else if (input instanceof File || input instanceof Blob) {
      pdfBuffer = await fileToBuffer(input);
    } else if (typeof input === 'string') {
      // File path
      const fs = await import('fs/promises');
      pdfBuffer = await fs.readFile(input);
    } else {
      throw new Error('Invalid input type');
    }

    const data = await pdf(pdfBuffer);

    return {
      text: data.text || '',
      pageCount: data.numpages || 0,
      info: data.info ? {
        title: data.info.Title,
        author: data.info.Author,
        subject: data.info.Subject,
        creator: data.info.Creator,
        producer: data.info.Producer,
        creationDate: data.info.CreationDate,
        modificationDate: data.info.ModDate,
      } : undefined,
      metadata: data.metadata,
      version: data.version,
    };
  } catch (error) {
    console.error('PDF extraction error:', error);
    throw new Error(`Failed to extract text from PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Extract text from multiple PDF files
 */
export async function extractTextFromMultiplePDFs(
  files: (File | Blob | Buffer)[]
): Promise<PDFExtractResult[]> {
  const results: PDFExtractResult[] = [];

  for (const file of files) {
    try {
      const result = await extractTextFromPDF(file);
      results.push(result);
    } catch (error) {
      console.error('Failed to process PDF:', error);
      results.push({
        text: '',
        pageCount: 0,
      });
    }
  }

  return results;
}

/**
 * Check if PDF contains extractable text (not scanned)
 * @param input - PDF file
 * @returns true if PDF has extractable text, false if likely scanned
 */
export async function hasExtractableText(
  input: File | Blob | Buffer | string
): Promise<boolean> {
  try {
    const result = await extractTextFromPDF(input);
    // If text is very short relative to page count, likely scanned
    const avgCharsPerPage = result.text.length / Math.max(result.pageCount, 1);
    return avgCharsPerPage > 100; // Threshold for "real" text
  } catch {
    return false;
  }
}

/**
 * Extract structured data from PDF using regex patterns
 */
export async function extractStructuredDataFromPDF(
  input: File | Blob | Buffer | string,
  patterns: Record<string, RegExp>
): Promise<{ raw: string; extracted: Record<string, string | null>; pageCount: number }> {
  const { text, pageCount } = await extractTextFromPDF(input);
  const extracted: Record<string, string | null> = {};

  for (const [key, pattern] of Object.entries(patterns)) {
    const match = text.match(pattern);
    extracted[key] = match ? (match[1] || match[0]).trim() : null;
  }

  return { raw: text, extracted, pageCount };
}

/**
 * Extract text from specific pages of a PDF
 * Note: pdf-parse doesn't support page-specific extraction directly,
 * so this returns the full text with page markers
 */
export async function extractTextByPage(
  input: File | Blob | Buffer | string
): Promise<{ pages: string[]; totalPages: number }> {
  const result = await extractTextFromPDF(input);
  
  // Split by common page break patterns
  // This is a heuristic and may not work for all PDFs
  const pageBreakPatterns = [
    /\f/g, // Form feed character
    /\n{3,}/g, // Multiple newlines
  ];

  let pages = [result.text];
  
  for (const pattern of pageBreakPatterns) {
    if (pages.length < result.pageCount) {
      pages = result.text.split(pattern).filter(p => p.trim().length > 0);
    }
    if (pages.length >= result.pageCount) break;
  }

  return {
    pages,
    totalPages: result.pageCount,
  };
}
