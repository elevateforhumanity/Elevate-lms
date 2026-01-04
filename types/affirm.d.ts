// Affirm TypeScript Definitions

declare global {
  interface Window {
    affirm: {
      checkout: (options: { checkout_token: string }) => void;
      ui: {
        ready: (callback: () => void) => void;
        refresh: () => void;
        error: {
          on: (event: string, callback: (error: any) => void) => void;
        };
      };
    };
    _affirm_config: {
      public_api_key: string;
      script: string;
    };
  }
}

export {};
