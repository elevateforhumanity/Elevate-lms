/**
 * Sezzle BNPL Integration
 * 
 * Sezzle allows customers to split purchases into 4 interest-free payments.
 * API Documentation: https://docs.sezzle.com/
 */

const SEZZLE_SANDBOX_URL = 'https://sandbox.gateway.sezzle.com/v2';
const SEZZLE_PRODUCTION_URL = 'https://gateway.sezzle.com/v2';

export interface SezzleConfig {
  publicKey: string;
  privateKey: string;
  environment: 'sandbox' | 'production';
}

export interface SezzleCustomer {
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  billing_address?: {
    street: string;
    street2?: string;
    city: string;
    state: string;
    postal_code: string;
    country_code: string;
  };
}

export interface SezzleOrderItem {
  name: string;
  sku?: string;
  quantity: number;
  price: {
    amount_in_cents: number;
    currency: string;
  };
}

export interface SezzleOrder {
  intent: 'AUTH' | 'CAPTURE';
  reference_id: string;
  description?: string;
  order_amount: {
    amount_in_cents: number;
    currency: string;
  };
  customer: SezzleCustomer;
  items?: SezzleOrderItem[];
  merchant_completes: boolean;
  complete_url: string;
  cancel_url: string;
}

export interface SezzleSession {
  uuid: string;
  checkout_url: string;
  order: {
    uuid: string;
    reference_id: string;
  };
}

export interface SezzleAuthResponse {
  token: string;
  expiration_date: string;
  merchant_uuid: string;
}

class SezzleClient {
  private config: SezzleConfig | null = null;
  private authToken: string | null = null;
  private tokenExpiration: Date | null = null;

  private getBaseUrl(): string {
    if (!this.config) throw new Error('Sezzle not configured');
    return this.config.environment === 'production' 
      ? SEZZLE_PRODUCTION_URL 
      : SEZZLE_SANDBOX_URL;
  }

  configure(config: SezzleConfig) {
    this.config = config;
  }

  isConfigured(): boolean {
    return !!(this.config?.publicKey && this.config?.privateKey);
  }

  private async authenticate(): Promise<string> {
    if (!this.config) {
      throw new Error('Sezzle not configured. Set SEZZLE_PUBLIC_KEY and SEZZLE_PRIVATE_KEY.');
    }

    // Return cached token if still valid
    if (this.authToken && this.tokenExpiration && new Date() < this.tokenExpiration) {
      return this.authToken;
    }

    const response = await fetch(`${this.getBaseUrl()}/authentication`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        public_key: this.config.publicKey,
        private_key: this.config.privateKey,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(`Sezzle authentication failed: ${error.message || response.statusText}`);
    }

    const data: SezzleAuthResponse = await response.json();
    this.authToken = data.token;
    this.tokenExpiration = new Date(data.expiration_date);

    return this.authToken;
  }

  /**
   * Create a Sezzle checkout session
   */
  async createSession(order: SezzleOrder): Promise<SezzleSession> {
    const token = await this.authenticate();

    const response = await fetch(`${this.getBaseUrl()}/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(`Sezzle session creation failed: ${error.message || response.statusText}`);
    }

    return response.json();
  }

  /**
   * Capture a previously authorized order
   */
  async captureOrder(orderUuid: string, amountInCents?: number): Promise<any> {
    const token = await this.authenticate();

    const body: any = {};
    if (amountInCents !== undefined) {
      body.capture_amount = {
        amount_in_cents: amountInCents,
        currency: 'USD',
      };
    }

    const response = await fetch(`${this.getBaseUrl()}/order/${orderUuid}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(`Sezzle capture failed: ${error.message || response.statusText}`);
    }

    return response.json();
  }

  /**
   * Refund an order
   */
  async refundOrder(orderUuid: string, amountInCents: number): Promise<any> {
    const token = await this.authenticate();

    const response = await fetch(`${this.getBaseUrl()}/order/${orderUuid}/refund`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount: {
          amount_in_cents: amountInCents,
          currency: 'USD',
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(`Sezzle refund failed: ${error.message || response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get order details
   */
  async getOrder(orderUuid: string): Promise<any> {
    const token = await this.authenticate();

    const response = await fetch(`${this.getBaseUrl()}/order/${orderUuid}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(`Sezzle get order failed: ${error.message || response.statusText}`);
    }

    return response.json();
  }
}

// Singleton instance
export const sezzle = new SezzleClient();

// Auto-configure if environment variables are set
if (process.env.SEZZLE_PUBLIC_KEY && process.env.SEZZLE_PRIVATE_KEY) {
  sezzle.configure({
    publicKey: process.env.SEZZLE_PUBLIC_KEY,
    privateKey: process.env.SEZZLE_PRIVATE_KEY,
    environment: (process.env.SEZZLE_ENVIRONMENT as 'sandbox' | 'production') || 'sandbox',
  });
}
