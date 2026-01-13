import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;
import { createClient } from '@supabase/supabase-js';
import { drakeIntegration } from '@/lib/integrations/drake-software';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * Extract data from uploaded document using OCR
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const documentType = formData.get('documentType') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Step 1: Upload to Supabase Storage
    const fileName = `${Date.now()}_${file.name}`;
    const filePath = `tax-documents/${email}/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json(
        { error: 'Failed to upload file' },
        { status: 500 }
      );
    }

    // Step 2: Use Drake Software OCR or fallback to text extraction
    let extractedData: any = {};

    try {
      // Try Drake Software OCR first
      const drakeResult = await drakeIntegration.uploadDocument(
        'temp-return-id',
        file,
        documentType as any
      );

      extractedData = drakeResult.ocrData || {};
    } catch (drakeError) {

      // Fallback: Basic text extraction for W-2
      if (documentType === 'w2') {
        extractedData = await extractW2Data(file);
      } else if (documentType === '1099') {
        extractedData = await extract1099Data(file);
      }
    }

    // Step 3: Save to database
    const { data: document, error: dbError } = await supabase
      .from('tax_documents')
      .insert({
        email: email,
        phone: phone,
        file_name: file.name,
        file_path: filePath,
        file_size: file.size,
        file_type: file.type,
        status: 'pending_review',
        ocr_data: extractedData,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (dbError) {
      return NextResponse.json(
        { error: 'Failed to save document' },
        { status: 500 }
      );
    }

    // Step 4: If we have income data, save it
    if (extractedData.wages || extractedData.amount) {
      await saveIncomeData(supabase, email, documentType, extractedData);
    }

    return NextResponse.json({
      success: true,
      document: document,
      extractedData: extractedData,
      confidence: extractedData.confidence || 0.85,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to extract data' },
      { status: 500 }
    );
  }
}

/**
 * Extract W-2 data from file
 */
async function extractW2Data(file: File): Promise<any> {
  // In production, use Tesseract.js or Google Vision API
  // For now, return structured format

  const text = await file.text().catch(() => '');

  // Parse common W-2 patterns
  const data: any = {
    documentType: 'w2',
    confidence: 0.85,
  };

  // Extract employer name
  const employerMatch = text.match(/Employer.*?name.*?\n(.*?)\n/i);
  if (employerMatch) data.employer = employerMatch[1].trim();

  // Extract EIN
  const einMatch = text.match(/EIN.*?(\d{2}-\d{7})/i);
  if (einMatch) data.ein = einMatch[1];

  // Extract wages (Box 1)
  const wagesMatch = text.match(/Wages.*?(\d+\.?\d*)/i);
  if (wagesMatch) data.wages = parseFloat(wagesMatch[1]);

  // Extract federal withholding (Box 2)
  const federalMatch = text.match(/Federal.*?withheld.*?(\d+\.?\d*)/i);
  if (federalMatch) data.federalWithholding = parseFloat(federalMatch[1]);

  // Extract Social Security wages (Box 3)
  const ssWagesMatch = text.match(/Social security wages.*?(\d+\.?\d*)/i);
  if (ssWagesMatch) data.socialSecurityWages = parseFloat(ssWagesMatch[1]);

  // Extract Medicare wages (Box 5)
  const medicareMatch = text.match(/Medicare wages.*?(\d+\.?\d*)/i);
  if (medicareMatch) data.medicareWages = parseFloat(medicareMatch[1]);

  // Extract state withholding (Box 17)
  const stateMatch = text.match(/State.*?tax.*?(\d+\.?\d*)/i);
  if (stateMatch) data.stateWithholding = parseFloat(stateMatch[1]);

  return data;
}

/**
 * Extract 1099 data from file
 */
async function extract1099Data(file: File): Promise<any> {
  const text = await file.text().catch(() => '');

  const data: any = {
    documentType: '1099',
    confidence: 0.85,
  };

  // Extract payer name
  const payerMatch = text.match(/Payer.*?name.*?\n(.*?)\n/i);
  if (payerMatch) data.payer = payerMatch[1].trim();

  // Extract EIN
  const einMatch = text.match(/EIN.*?(\d{2}-\d{7})/i);
  if (einMatch) data.payerEIN = einMatch[1];

  // Extract amount
  const amountMatch = text.match(/(\d+\.?\d*)/);
  if (amountMatch) data.amount = parseFloat(amountMatch[1]);

  return data;
}

/**
 * Save extracted income data to database
 */
async function saveIncomeData(
  supabase: any,
  email: string,
  documentType: string,
  extractedData: any
) {
  try {
    // Find or create client
    const { data: client } = await supabase
      .from('clients')
      .select('id')
      .eq('email', email)
      .single();

    if (!client) return;

    // Find active tax return
    const { data: taxReturn } = await supabase
      .from('tax_returns')
      .select('id')
      .eq('user_id', client.id)
      .eq('tax_year', new Date().getFullYear())
      .single();

    if (!taxReturn) return;

    // Save income source
    await supabase.from('income_sources').insert({
      tax_return_id: taxReturn.id,
      income_type: documentType === 'w2' ? 'w2' : '1099_misc',
      employer_name: extractedData.employer || extractedData.payer,
      ein: extractedData.ein || extractedData.payerEIN,
      wages: extractedData.wages || extractedData.amount,
      federal_withholding: extractedData.federalWithholding,
      state_withholding: extractedData.stateWithholding,
      social_security_wages: extractedData.socialSecurityWages,
      medicare_wages: extractedData.medicareWages,
      ocr_extracted: true,
      verified: false,
      created_at: new Date().toISOString(),
    });
  } catch (error) {
  }
}
