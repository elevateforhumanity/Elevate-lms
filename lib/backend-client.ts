/**
 * Python Backend Client
 * Seamless integration with automation backend
 */

export interface FillPDFRequest {
  templatePath: string;
  data: Record<string, string>;
  outputPath?: string;
}

export interface PortalSubmitRequest {
  portalUrl: string;
  formData: Record<string, unknown>;
  action?: 'submit' | 'save_draft' | 'preview';
}

export interface BackendResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Fill existing PDF form (government forms with fillable fields)
 * Uses Python backend PyPDF2 for form field filling
 */
export async function fillPDFForm(
  request: FillPDFRequest
): Promise<BackendResponse<{ outputPath: string; url: string }>> {
  try {
    const response = await fetch('/api/automation/fill-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.error || 'PDF fill failed' };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Automate government portal submission
 * Uses Python backend Playwright for browser automation
 */
export async function submitToPortal(
  request: PortalSubmitRequest
): Promise<BackendResponse<{ status: string; confirmation?: string }>> {
  try {
    const response = await fetch('/api/automation/portal-submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        error: error.error || 'Portal automation failed',
      };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Check if backend is available
 */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL;
    if (!backendUrl) return false;

    const response = await fetch(`${backendUrl}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000),
    });

    return response.ok;
  } catch {
    return false;
  }
}
