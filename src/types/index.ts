/**
 * Loopit Payment Method SDK - Type Definitions
 */

// ============================================================================
// SDK Options & Configuration
// ============================================================================

/**
 * Options for mounting the SDK
 */
export interface LoopitPaymentMethodOptions {
  /** Base URL for the Loopit API (e.g., 'https://platform.api.loopit.co/api/portal') */
  apiBaseUrl: string;
  /** Workspace identifier/slug */
  workspace: string;
  /** Microsite path (usually same as workspace) */
  microsite: string;
  /** Owner ID (person or company ID) */
  ownerId: string;
  /** Owner type */
  ownerType: OwnerType;
  /** Optional currency code (default: 'aud') */
  currencyCode?: string;
  /** Optional custom labels for UI text */
  labels?: LoopitLabels;
  /** Callback when payment method is successfully added */
  onPaymentMethodAdded?: (paymentMethod: PaymentMethod) => void;
  /** Callback when payment method is removed */
  onPaymentMethodRemoved?: () => void;
  /** Callback when an error occurs */
  onError?: (error: Error) => void;
}

/**
 * Owner type - person or company
 */
export type OwnerType = 'person' | 'company';

/**
 * Custom labels for SDK UI text
 */
export interface LoopitLabels {
  addPaymentMethod?: string;
  remove?: string;
  cardholderName?: string;
  saveCard?: string;
  loading?: string;
  saving?: string;
}

// ============================================================================
// API Request Types
// ============================================================================

/**
 * Request body for POST /payment-methods/setup-config
 */
export interface SetupConfigRequest {
  owner_id: string;
  owner_type: OwnerType;
  config_id: number;
}

/**
 * Request body for POST /payment-methods/add
 */
export interface AddPaymentMethodRequest {
  owner_id: string;
  owner_type: OwnerType;
  config_id: number;
  external_payment_method_id: string;
  data: {
    cardholder_name: string;
  };
}

// ============================================================================
// API Response Types
// ============================================================================

/**
 * Response from GET /payment/config
 */
export interface PaymentConfigResponse {
  id: number;
  gateway: Gateway;
  currency: Currency;
  payment_method_type: PaymentMethodType;
}

/**
 * Gateway configuration (Stripe)
 */
export interface Gateway {
  /** Gateway provider (only 'stripe' supported) */
  provider: 'stripe';
  /** Stripe publishable API key */
  api_key: string;
  /** Stripe Connect account ID */
  external_gateway_id: string;
}

/**
 * Currency configuration
 */
export interface Currency {
  id: number;
  code: string;
  name: string;
  symbol: string;
  decimal_places: number;
}

/**
 * Payment method type configuration
 */
export interface PaymentMethodType {
  id: number;
  /** Payment method type (only 'card' supported) */
  type: 'card' | string;
  name: string;
}

/**
 * Response from POST /payment-methods/setup-config
 */
export interface SetupConfigResponse {
  config: {
    setup_intent: StripeSetupIntent;
  };
}

/**
 * Stripe SetupIntent object
 */
export interface StripeSetupIntent {
  id: string;
  client_secret: string;
  status: string;
}

/**
 * Response from POST /payment-methods/add
 * Also used as the internal PaymentMethod representation
 */
export interface PaymentMethod {
  id: string | number;
  brand: CardBrand;
  last_4: string;
  cardholder_name?: string;
  exp_month?: number;
  exp_year?: number;
  created_at?: string;
  updated_at?: string;
}

/**
 * Supported card brands
 */
export type CardBrand =
  | 'visa'
  | 'mastercard'
  | 'amex'
  | 'discover'
  | 'diners'
  | 'jcb'
  | 'unionpay'
  | string;

// ============================================================================
// API Client Types
// ============================================================================

/**
 * Options for API requests
 */
export interface RequestOptions extends Omit<RequestInit, 'headers'> {
  headers?: Record<string, string>;
}

/**
 * API Error response
 */
export interface ApiErrorResponse {
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

// ============================================================================
// Stripe Types (minimal - for reference)
// ============================================================================

/**
 * Stripe instance (from Stripe.js)
 */
export interface StripeInstance {
  elements: (options: StripeElementsOptions) => StripeElements;
  confirmSetup: (options: ConfirmSetupOptions) => Promise<ConfirmSetupResult>;
}

/**
 * Stripe Elements options
 */
export interface StripeElementsOptions {
  mode: 'setup' | 'payment';
  currency: string;
  paymentMethodTypes: string[];
  setupFutureUsage?: 'off_session' | 'on_session';
  appearance?: StripeAppearance;
}

/**
 * Stripe Elements instance
 */
export interface StripeElements {
  create: (type: string, options?: Record<string, unknown>) => StripeElement;
  submit: () => Promise<{ error?: StripeError }>;
}

/**
 * Stripe Element instance
 */
export interface StripeElement {
  mount: (selector: string | HTMLElement) => void;
  destroy: () => void;
  on: (event: string, handler: () => void) => void;
}

/**
 * Stripe appearance options
 */
export interface StripeAppearance {
  theme?: 'stripe' | 'flat' | 'night';
  labels?: 'above' | 'floating';
  variables?: Record<string, string>;
  rules?: Record<string, Record<string, string>>;
}

/**
 * Stripe confirmSetup options
 */
export interface ConfirmSetupOptions {
  elements: StripeElements;
  clientSecret: string;
  confirmParams: {
    payment_method_data?: {
      billing_details?: {
        name?: string;
        email?: string;
        phone?: string;
        address?: {
          city?: string;
          country?: string;
          line1?: string;
          line2?: string;
          postal_code?: string;
          state?: string;
        };
      };
    };
  };
  redirect: 'if_required' | 'always';
}

/**
 * Stripe confirmSetup result
 */
export interface ConfirmSetupResult {
  error?: StripeError;
  setupIntent?: {
    id: string;
    status: string;
    payment_method: string;
  };
}

/**
 * Stripe error object
 */
export interface StripeError {
  type: string;
  code?: string;
  message: string;
  param?: string;
}

// ============================================================================
// SDK Return Types
// ============================================================================

/**
 * Return value from LoopitPaymentMethod.mount()
 */
export interface LoopitPaymentMethodInstance {
  /** The Vue app instance */
  app: unknown;
  /** Unmount and cleanup the SDK */
  unmount: () => void;
}

// ============================================================================
// Global Window Extension
// ============================================================================

declare global {
  interface Window {
    LoopitPaymentMethod: {
      mount: (
        selector: string | HTMLElement,
        options: LoopitPaymentMethodOptions
      ) => LoopitPaymentMethodInstance;
    };
    Stripe: (
      publishableKey: string,
      options?: { stripeAccount?: string }
    ) => StripeInstance;
  }
}
