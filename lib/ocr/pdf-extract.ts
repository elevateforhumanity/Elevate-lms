/**
 * PDF Text Extraction Utility
 * 
 * Extracts text content from PDF files for document processing.
 * Uses dynamic imports to avoid bundling heavy dependencies.
 */

// Dynamic import to avoid bundling tesseract.js into the main Next.js handler
async function createTesseractWorker(lang: string) {
  const tesseract = await import('tesseract.js');
  const createWorker = tesseract.createWorker;
  return createWorker(lang);
}

interface ExtractedPage {
  pageNumber: number;
  text: string;
  confidence: number;
}

interface ExtractionResult {
  success: boolean;
  pages: ExtractedPage[];
  fullText: string;
  pageCount: number;
  error?: string;
}

/**
 * Extract text from a PDF buffer using OCR
 */
export async function extractTextFromPDF(pdfBuffer: Buffer): Promise<ExtractionResult> {
  try {
    // For now, use a simple approach - convert PDF pages to images and OCR them
    // In production, you might want to use pdf-parse for text-based PDFs first
    
    const worker = await createTesseractWorker('eng');
    
    // Convert buffer to base64 for processing
    const base64 = pdfBuffer.toString('base64');
    const dataUrl = `data:application/pdf;base64,${base64}`;
    
    const { data } = await worker.recognize(dataUrl);
    
    await worker.terminate();
    
    return {
      success: true,
      pages: [{
        pageNumber: 1,
        text: data.text,
        confidence: data.confidence
      }],
      fullText: data.text,
      pageCount: 1
    };
  } catch (error) {
    console.error('PDF extraction error:', error);
    return {
      success: false,
      pages: [],
      fullText: '',
      pageCount: 0,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Extract text from an image buffer using OCR
 */
export async function extractTextFromImage(imageBuffer: Buffer, mimeType: string): Promise<ExtractionResult> {
  try {
    const worker = await createTesseractWorker('eng');
    
    const base64 = imageBuffer.toString('base64');
    const dataUrl = `data:${mimeType};base64,${base64}`;
    
    const { data } = await worker.recognize(dataUrl);
    
    await worker.terminate();
    
    return {
      success: true,
      pages: [{
        pageNumber: 1,
        text: data.text,
        confidence: data.confidence
      }],
      fullText: data.text,
      pageCount: 1
    };
  } catch (error) {
    console.error('Image extraction error:', error);
    return {
      success: false,
      pages: [],
      fullText: '',
      pageCount: 0,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Extract specific fields from tax documents
 */
export async function extractTaxDocumentFields(buffer: Buffer, documentType: 'W2' | '1099' | '1040'): Promise<Record<string, string>> {
  const result = await extractTextFromImage(buffer, 'image/png');
  
  if (!result.success) {
    return {};
  }
  
  const text = result.fullText;
  const fields: Record<string, string> = {};
  
  // Common patterns for tax documents
  const patterns: Record<string, RegExp> = {
    ssn: /\b\d{3}[-\s]?\d{2}[-\s]?\d{4}\b/,
    ein: /\b\d{2}[-\s]?\d{7}\b/,
    wages: /wages.*?[\$]?([\d,]+\.?\d*)/i,
    federalTax: /federal.*?tax.*?[\$]?([\d,]+\.?\d*)/i,
    stateTax: /state.*?tax.*?[\$]?([\d,]+\.?\d*)/i,
    employerName: /employer.*?name[:\s]+([A-Za-z\s]+)/i,
    employeeAddress: /employee.*?address[:\s]+(.+)/i,
  };
  
  for (const [key, pattern] of Object.entries(patterns)) {
    const match = text.match(pattern);
    if (match) {
      fields[key] = match[1] || match[0];
    }
  }
  
  return fields;
}
