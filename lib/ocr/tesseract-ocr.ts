/**
 * Tesseract.js OCR Utility
 * Server-side OCR with image preprocessing using Sharp
 * 
 * Uses dynamic imports to avoid bundling heavy dependencies into the main handler
 */

// Dynamic import to avoid bundling tesseract.js into the main Next.js handler
async function getTesseract() {
  const Tesseract = await import('tesseract.js');
  return Tesseract.default || Tesseract;
}

async function getSharp() {
  const sharp = await import('sharp');
  return sharp.default || sharp;
}

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
  processingTime?: number;
}

export interface OCROptions {
  language?: string;
  preprocess?: boolean;
  deskew?: boolean;
  enhanceContrast?: boolean;
}

const DEFAULT_OPTIONS: OCROptions = {
  language: 'eng',
  preprocess: true,
  deskew: false,
  enhanceContrast: true,
};

/**
 * Preprocess image for better OCR accuracy
 * - Convert to grayscale
 * - Enhance contrast
 * - Normalize brightness
 * - Sharpen text
 */
async function preprocessImage(imageBuffer: Buffer): Promise<Buffer> {
  try {
    const sharp = await getSharp();
    const processed = await sharp(imageBuffer)
      .grayscale()
      .normalize()
      .sharpen({ sigma: 1.5 })
      .modulate({ brightness: 1.1 })
      .png()
      .toBuffer();
    
    return processed;
  } catch (error) {
    console.warn('Image preprocessing failed, using original:', error);
    return imageBuffer;
  }
}

/**
 * Convert File/Blob to Buffer
 */
async function fileToBuffer(file: File | Blob): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

/**
 * Extract text from an image using Tesseract.js
 * @param input - Image as File, Blob, Buffer, or base64 string
 * @param options - OCR options
 * @returns OCR result with text and confidence
 */
export async function extractTextFromImage(
  input: File | Blob | Buffer | string,
  options: OCROptions = {}
): Promise<OCRResult> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const startTime = Date.now();

  try {
    // Convert input to Buffer
    let imageBuffer: Buffer;
    
    if (input instanceof Buffer) {
      imageBuffer = input;
    } else if (input instanceof File || input instanceof Blob) {
      imageBuffer = await fileToBuffer(input);
    } else if (typeof input === 'string') {
      // Assume base64 or file path
      if (input.startsWith('data:')) {
        // Base64 data URL
        const base64Data = input.split(',')[1];
        imageBuffer = Buffer.from(base64Data, 'base64');
      } else {
        // File path - read file
        const fs = await import('fs/promises');
        imageBuffer = await fs.readFile(input);
      }
    } else {
      throw new Error('Invalid input type');
    }

    // Preprocess image if enabled
    if (opts.preprocess) {
      imageBuffer = await preprocessImage(imageBuffer);
    }

    // Run Tesseract OCR (dynamic import)
    const Tesseract = await getTesseract();
    const result = await Tesseract.recognize(imageBuffer, opts.language || 'eng', {
      logger: (m: { status: string; progress: number }) => {
        // Silent logging - can enable for debugging
        // if (m.status === 'recognizing text') console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`);
      },
    });

    const processingTime = Date.now() - startTime;

    return {
      text: result.data.text.trim(),
      confidence: result.data.confidence / 100,
      words: result.data.words?.map((word) => ({
        text: word.text,
        confidence: word.confidence / 100,
        bbox: word.bbox,
      })),
      processingTime,
    };
  } catch (error) {
    console.error('OCR Error:', error);
    throw new Error(`Failed to extract text: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Extract text from multiple images
 */
export async function extractTextFromMultipleImages(
  files: (File | Blob | Buffer)[],
  options: OCROptions = {}
): Promise<OCRResult[]> {
  const results: OCRResult[] = [];

  for (const file of files) {
    try {
      const result = await extractTextFromImage(file, options);
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
 * Extract structured data using regex patterns
 */
export async function extractStructuredData(
  input: File | Blob | Buffer | string,
  patterns: Record<string, RegExp>,
  options: OCROptions = {}
): Promise<{ raw: string; extracted: Record<string, string | null>; confidence: number }> {
  const { text, confidence } = await extractTextFromImage(input, options);
  const extracted: Record<string, string | null> = {};

  for (const [key, pattern] of Object.entries(patterns)) {
    const match = text.match(pattern);
    extracted[key] = match ? (match[1] || match[0]).trim() : null;
  }

  return { raw: text, extracted, confidence };
}

/**
 * Common regex patterns for document extraction
 */
export const DOCUMENT_PATTERNS = {
  // Personal Info
  ssn: /\b(\d{3}[-\s]?\d{2}[-\s]?\d{4})\b/,
  ein: /\b(\d{2}[-\s]?\d{7})\b/,
  phone: /\b(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})\b/,
  email: /\b([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\b/i,
  
  // Dates
  dateMMDDYYYY: /\b(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})\b/,
  dateYYYYMMDD: /\b(\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2})\b/,
  
  // Money
  currency: /\$\s?([\d,]+\.?\d{0,2})/,
  amount: /\b([\d,]+\.\d{2})\b/,
  
  // Address
  zipCode: /\b(\d{5}(?:-\d{4})?)\b/,
  state: /\b([A-Z]{2})\s+\d{5}/,
  
  // W-2 Specific
  w2Employer: /(?:employer|company).*?name[:\s]*([^\n]+)/i,
  w2Wages: /(?:wages|box\s*1)[:\s]*\$?([\d,]+\.?\d*)/i,
  w2FederalTax: /(?:federal.*?withheld|box\s*2)[:\s]*\$?([\d,]+\.?\d*)/i,
  w2SocialSecurityWages: /(?:social\s*security\s*wages|box\s*3)[:\s]*\$?([\d,]+\.?\d*)/i,
  w2MedicareWages: /(?:medicare\s*wages|box\s*5)[:\s]*\$?([\d,]+\.?\d*)/i,
  w2StateTax: /(?:state.*?tax|box\s*17)[:\s]*\$?([\d,]+\.?\d*)/i,
  
  // 1099 Specific
  payer: /(?:payer|from)[:\s]*([^\n]+)/i,
  nonemployeeComp: /(?:nonemployee\s*compensation|box\s*1)[:\s]*\$?([\d,]+\.?\d*)/i,
  
  // ID Documents
  dlNumber: /(?:dl|license|lic)[#:\s]*([A-Z0-9-]+)/i,
  expirationDate: /(?:exp|expires?)[:\s]*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i,
  dob: /(?:dob|birth|born)[:\s]*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i,
};

/**
 * Extract W-2 data from image
 */
export async function extractW2Data(input: File | Blob | Buffer | string, options: OCROptions = {}) {
  const patterns = {
    employer: DOCUMENT_PATTERNS.w2Employer,
    ein: DOCUMENT_PATTERNS.ein,
    ssn: DOCUMENT_PATTERNS.ssn,
    wages: DOCUMENT_PATTERNS.w2Wages,
    federalWithholding: DOCUMENT_PATTERNS.w2FederalTax,
    socialSecurityWages: DOCUMENT_PATTERNS.w2SocialSecurityWages,
    medicareWages: DOCUMENT_PATTERNS.w2MedicareWages,
    stateWithholding: DOCUMENT_PATTERNS.w2StateTax,
  };

  const result = await extractStructuredData(input, patterns, options);
  
  // Parse numeric values
  const parseAmount = (val: string | null) => {
    if (!val) return null;
    const cleaned = val.replace(/[,$]/g, '');
    const num = parseFloat(cleaned);
    return isNaN(num) ? null : num;
  };

  return {
    documentType: 'w2' as const,
    raw: result.raw,
    confidence: result.confidence,
    data: {
      employer: result.extracted.employer,
      ein: result.extracted.ein,
      ssn: result.extracted.ssn,
      wages: parseAmount(result.extracted.wages),
      federalWithholding: parseAmount(result.extracted.federalWithholding),
      socialSecurityWages: parseAmount(result.extracted.socialSecurityWages),
      medicareWages: parseAmount(result.extracted.medicareWages),
      stateWithholding: parseAmount(result.extracted.stateWithholding),
    },
  };
}

/**
 * Extract 1099 data from image
 */
export async function extract1099Data(input: File | Blob | Buffer | string, options: OCROptions = {}) {
  const patterns = {
    payer: DOCUMENT_PATTERNS.payer,
    payerEIN: DOCUMENT_PATTERNS.ein,
    recipientSSN: DOCUMENT_PATTERNS.ssn,
    amount: DOCUMENT_PATTERNS.nonemployeeComp,
  };

  const result = await extractStructuredData(input, patterns, options);
  
  const parseAmount = (val: string | null) => {
    if (!val) return null;
    const cleaned = val.replace(/[,$]/g, '');
    const num = parseFloat(cleaned);
    return isNaN(num) ? null : num;
  };

  return {
    documentType: '1099' as const,
    raw: result.raw,
    confidence: result.confidence,
    data: {
      payer: result.extracted.payer,
      payerEIN: result.extracted.payerEIN,
      recipientSSN: result.extracted.recipientSSN,
      amount: parseAmount(result.extracted.amount),
    },
  };
}

/**
 * Extract ID document data
 */
export async function extractIDData(input: File | Blob | Buffer | string, options: OCROptions = {}) {
  const patterns = {
    name: /(?:name|nm)[:\s]*([A-Z][A-Za-z]+\s+[A-Z][A-Za-z]+)/i,
    dlNumber: DOCUMENT_PATTERNS.dlNumber,
    dob: DOCUMENT_PATTERNS.dob,
    expiration: DOCUMENT_PATTERNS.expirationDate,
    address: /(?:address|addr)[:\s]*([^\n]+)/i,
  };

  const result = await extractStructuredData(input, patterns, options);

  return {
    documentType: 'id' as const,
    raw: result.raw,
    confidence: result.confidence,
    data: result.extracted,
  };
}

/**
 * Auto-detect document type and extract data
 */
export async function autoExtract(input: File | Blob | Buffer | string, options: OCROptions = {}) {
  const { text, confidence } = await extractTextFromImage(input, options);
  const textLower = text.toLowerCase();

  // Detect document type based on content
  let documentType: string;
  
  if (textLower.includes('w-2') || textLower.includes('wage and tax statement')) {
    documentType = 'w2';
    return extractW2Data(input, options);
  } else if (textLower.includes('1099') || textLower.includes('nonemployee compensation')) {
    documentType = '1099';
    return extract1099Data(input, options);
  } else if (textLower.includes('driver') || textLower.includes('license') || textLower.includes('identification')) {
    documentType = 'id';
    return extractIDData(input, options);
  } else {
    documentType = 'unknown';
    return {
      documentType,
      raw: text,
      confidence,
      data: {},
    };
  }
}
