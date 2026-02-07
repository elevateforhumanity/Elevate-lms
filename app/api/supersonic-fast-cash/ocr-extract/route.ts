import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';

// Dynamic import to avoid bundling tesseract.js into the main handler
async function getOCRFunctions() {
  const ocr = await import('@/lib/ocr/tesseract-ocr');
  return {
    extractTextFromImage: ocr.extractTextFromImage,
    autoExtract: ocr.autoExtract,
    extractW2Data: ocr.extractW2Data,
    extract1099Data: ocr.extract1099Data,
    extractIDData: ocr.extractIDData,
  };
}

// Helper to check if file is PDF
function isPDF(file: File | Blob): boolean {
  return file.type === 'application/pdf';
}

// Extract text from PDF using pdf-parse (dynamic import for ESM compatibility)
async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    // Dynamic import to handle ESM/CJS compatibility
    const pdfParse = (await import('pdf-parse')).default;
    const data = await pdfParse(buffer);
    return data.text || '';
  } catch (error) {
    logger.error('PDF extraction error:', error);
    throw new Error('Failed to extract text from PDF');
  }
}

// Parse W-2 data from extracted text
function parseW2FromText(text: string): Record<string, unknown> {
  const data: Record<string, unknown> = {};
  
  // Extract employer EIN (XX-XXXXXXX pattern)
  const einMatch = text.match(/\b(\d{2}-\d{7})\b/);
  if (einMatch) data.employerEIN = einMatch[1];
  
  // Extract SSN (XXX-XX-XXXX pattern)
  const ssnMatch = text.match(/\b(\d{3}-\d{2}-\d{4})\b/);
  if (ssnMatch) data.employeeSSN = ssnMatch[1];
  
  // Extract wages (Box 1)
  const wagesMatch = text.match(/wages[,\s]*tips[,\s]*other\s*comp[^\d]*(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/i);
  if (wagesMatch) data.wages = wagesMatch[1];
  
  // Extract federal tax withheld (Box 2)
  const fedTaxMatch = text.match(/federal\s*income\s*tax\s*withheld[^\d]*(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/i);
  if (fedTaxMatch) data.federalTaxWithheld = fedTaxMatch[1];
  
  // Extract social security wages (Box 3)
  const ssWagesMatch = text.match(/social\s*security\s*wages[^\d]*(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/i);
  if (ssWagesMatch) data.socialSecurityWages = ssWagesMatch[1];
  
  return data;
}

// Parse 1099 data from extracted text
function parse1099FromText(text: string): Record<string, unknown> {
  const data: Record<string, unknown> = {};
  
  // Extract payer TIN
  const payerTinMatch = text.match(/payer['']?s?\s*(?:tin|federal\s*identification)[^\d]*(\d{2}-\d{7})/i);
  if (payerTinMatch) data.payerTIN = payerTinMatch[1];
  
  // Extract recipient TIN/SSN
  const recipientTinMatch = text.match(/recipient['']?s?\s*(?:tin|identification)[^\d]*(\d{2}-\d{7}|\d{3}-\d{2}-\d{4})/i);
  if (recipientTinMatch) data.recipientTIN = recipientTinMatch[1];
  
  // Extract nonemployee compensation
  const compensationMatch = text.match(/nonemployee\s*compensation[^\d]*(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/i);
  if (compensationMatch) data.nonemployeeCompensation = compensationMatch[1];
  
  // Extract federal tax withheld
  const fedTaxMatch = text.match(/federal\s*income\s*tax\s*withheld[^\d]*(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/i);
  if (fedTaxMatch) data.federalTaxWithheld = fedTaxMatch[1];
  
  return data;
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 120; // OCR can take time

interface ExtractedData {
  documentType: string;
  raw: string;
  confidence: number;
  data: Record<string, unknown>;
  processingTime?: number;
}

/**
 * POST /api/supersonic-fast-cash/ocr-extract
 * 
 * Extract text and structured data from uploaded documents using OCR.
 * Supports images (JPG, PNG, WEBP, TIFF) and PDFs.
 * 
 * Request body (multipart/form-data):
 * - file: The document file to process
 * - documentType: Optional hint for document type (w2, 1099, id, auto)
 * - clientId: Optional client ID for tracking
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const documentType = (formData.get('documentType') as string) || 'auto';
    const clientId = formData.get('clientId') as string | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/tiff',
      'application/pdf',
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { 
          error: 'Invalid file type',
          message: `Supported types: ${allowedTypes.join(', ')}`,
          received: file.type,
        },
        { status: 400 }
      );
    }

    // Validate file size (max 20MB)
    const maxSize = 20 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { 
          error: 'File too large',
          message: 'Maximum file size is 20MB',
          received: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
        },
        { status: 400 }
      );
    }

    logger.info('OCR extraction started', {
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      documentType,
      clientId,
    });

    let result: ExtractedData;

    // Handle PDF files
    if (isPDF(file)) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const extractedText = await extractTextFromPDF(buffer);
      
      // Try to detect document type from content
      let detectedType = 'unknown';
      let extractedData: Record<string, unknown> = {};
      
      const textLower = extractedText.toLowerCase();
      if (textLower.includes('w-2') || textLower.includes('wage and tax statement')) {
        detectedType = 'w2';
        // Parse W-2 fields from text
        extractedData = parseW2FromText(extractedText);
      } else if (textLower.includes('1099') || textLower.includes('miscellaneous income')) {
        detectedType = '1099';
        extractedData = parse1099FromText(extractedText);
      }
      
      result = {
        documentType: detectedType,
        raw: extractedText,
        confidence: extractedText.length > 100 ? 0.8 : 0.5,
        data: extractedData,
        processingTime: Date.now() - startTime,
      };
    } else {
      // Handle image files with OCR (dynamic import)
      const buffer = Buffer.from(await file.arrayBuffer());
      const { extractW2Data, extract1099Data, extractIDData, autoExtract } = await getOCRFunctions();

      switch (documentType.toLowerCase()) {
        case 'w2':
          result = await extractW2Data(buffer);
          break;
        case '1099':
          result = await extract1099Data(buffer);
          break;
        case 'id':
          result = await extractIDData(buffer);
          break;
        case 'auto':
        default:
          result = await autoExtract(buffer);
          break;
      }

      result.processingTime = Date.now() - startTime;
    }

    // Log extraction to database if client ID provided
    if (clientId) {
      try {
        const supabase = await createClient();
        await supabase.from('ocr_extractions').insert({
          client_id: clientId,
          file_name: file.name,
          file_type: file.type,
          document_type: result.documentType,
          confidence: result.confidence,
          processing_time_ms: result.processingTime,
          created_at: new Date().toISOString(),
        });
      } catch (dbError) {
        // Don't fail the request if logging fails
        logger.warn('Failed to log OCR extraction', { error: dbError });
      }
    }

    logger.info('OCR extraction completed', {
      documentType: result.documentType,
      confidence: result.confidence,
      processingTime: result.processingTime,
      textLength: result.raw.length,
    });

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    logger.error('OCR extraction failed', error instanceof Error ? error : new Error(String(error)));

    return NextResponse.json(
      {
        error: 'OCR extraction failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/supersonic-fast-cash/ocr-extract
 * 
 * Returns API documentation and supported features.
 */
export async function GET() {
  return NextResponse.json({
    name: 'OCR Extract API',
    version: '2.0',
    description: 'Extract text and structured data from documents using OCR',
    supportedFormats: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/tiff',
      'application/pdf',
    ],
    documentTypes: [
      { type: 'auto', description: 'Auto-detect document type' },
      { type: 'w2', description: 'W-2 Wage and Tax Statement' },
      { type: '1099', description: '1099 Forms (NEC, MISC, etc.)' },
      { type: 'id', description: 'ID Documents (Driver License, State ID)' },
    ],
    maxFileSize: '20MB',
    usage: {
      method: 'POST',
      contentType: 'multipart/form-data',
      fields: {
        file: 'Required - The document file',
        documentType: 'Optional - Hint for document type (auto, w2, 1099, id)',
        clientId: 'Optional - Client ID for tracking',
      },
    },
    response: {
      success: 'boolean',
      documentType: 'string - Detected or specified document type',
      raw: 'string - Raw extracted text',
      confidence: 'number - Confidence score (0-1)',
      data: 'object - Structured extracted data',
      processingTime: 'number - Processing time in milliseconds',
    },
  });
}
