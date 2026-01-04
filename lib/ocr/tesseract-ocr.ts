/**
 * Tesseract.js OCR Utility
 * Client-side and server-side OCR using Tesseract.js
 */

import Tesseract from 'tesseract.js';

export interface OCRResult {
  text: string;
  confidence: number;
  words?: Array<{
    text: string;
    confidence: number;
    bbox: {
      x0: number;
      y0: number;
      x1: number;
      y1: number;
    };
  }>;
}

/**
 * Extract text from an image file
 * @param file - Image file (File, Blob, or path)
 * @param language - Language code (default: 'eng')
 * @returns OCR result with text and confidence
 */
export async function extractTextFromImage(
  file: File | Blob | string,
  language: string = 'eng'
): Promise<OCRResult> {
  try {
    const result = await Tesseract.recognize(file, language, {
      logger: (m) => {
        if (m.status === 'recognizing text') {
        }
      },
    });

    return {
      text: result.data.text,
      confidence: result.data.confidence / 100,
      words: result.data.words.map((word) => ({
        text: word.text,
        confidence: word.confidence / 100,
        bbox: word.bbox,
      })),
    };
  } catch (error) {
    console.error('OCR Error:', error);
    throw new Error(`Failed to extract text: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Extract text from multiple images
 * @param files - Array of image files
 * @param language - Language code (default: 'eng')
 * @returns Array of OCR results
 */
export async function extractTextFromMultipleImages(
  files: (File | Blob | string)[],
  language: string = 'eng'
): Promise<OCRResult[]> {
  const results: OCRResult[] = [];

  for (const file of files) {
    try {
      const result = await extractTextFromImage(file, language);
      results.push(result);
    } catch (error) {
      console.error('Failed to process file:', error);
      results.push({
        text: '',
        confidence: 0,
        words: [],
      });
    }
  }

  return results;
}

/**
 * Extract structured data from a document
 * Useful for forms, receipts, etc.
 * @param file - Image file
 * @param patterns - Regex patterns to extract specific data
 * @returns Extracted structured data
 */
export async function extractStructuredData(
  file: File | Blob | string,
  patterns: Record<string, RegExp>
): Promise<Record<string, string | null>> {
  const { text } = await extractTextFromImage(file);
  const extracted: Record<string, string | null> = {};

  for (const [key, pattern] of Object.entries(patterns)) {
    const match = text.match(pattern);
    extracted[key] = match ? match[1] || match[0] : null;
  }

  return extracted;
}

/**
 * Common patterns for document extraction
 */
export const commonPatterns = {
  // Email
  email: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/,

  // Phone (US format)
  phone: /(\d{3}[-.\s]?\d{3}[-.\s]?\d{4})/,

  // SSN
  ssn: /(\d{3}-\d{2}-\d{4})/,

  // Date (MM/DD/YYYY)
  date: /(\d{1,2}\/\d{1,2}\/\d{4})/,

  // Currency
  currency: /\$\s?(\d+(?:,\d{3})*(?:\.\d{2})?)/,

  // ZIP code
  zip: /\b(\d{5}(?:-\d{4})?)\b/,
};

/**
 * Example: Extract W-2 data
 */
export async function extractW2Data(file: File | Blob | string) {
  return extractStructuredData(file, {
    employer: /Employer.*?name.*?\n(.*?)\n/i,
    ein: /EIN.*?(\d{2}-\d{7})/i,
    wages: /Wages.*?(\d+\.?\d*)/i,
    federalWithholding: /Federal.*?withheld.*?(\d+\.?\d*)/i,
    ssn: commonPatterns.ssn,
  });
}

/**
 * Example: Extract receipt data
 */
export async function extractReceiptData(file: File | Blob | string) {
  return extractStructuredData(file, {
    vendor: /^(.*?)\n/,
    date: commonPatterns.date,
    total: /Total.*?(\d+\.\d{2})/i,
    tax: /Tax.*?(\d+\.\d{2})/i,
  });
}
