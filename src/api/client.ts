/**
 * Loopit Payment Method SDK - API Client
 *
 * Handles all API communication with Loopit backend.
 * Supports Stripe card and au_becs_debit payments.
 */

import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import type {
  PaymentConfigResponse,
  PaymentMethodType,
  SetupConfigRequest,
  SetupConfigResponse,
  AddPaymentMethodRequest,
  PaymentMethod,
  ApiErrorResponse,
} from '../types';

/**
 * Read the payment_method_type from a config response.
 */
export function getPaymentMethodType(config: PaymentConfigResponse): PaymentMethodType | undefined {
  return config.payment_method_type;
}

/**
 * API Client for Loopit Payment Method SDK
 */
export class ApiClient {
  private readonly axiosInstance: AxiosInstance;

  /**
   * Create a new API client instance
   * @param baseUrl - Base URL for the Loopit API
   * @param workspace - Workspace identifier/slug
   * @param microsite - Microsite path
   */
  constructor(baseUrl: string, workspace: string, microsite: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        'Accept': 'application/json',
        'X-Workspace': workspace,
        'X-Micrositepath': microsite,
      },
    });
  }

  /**
   * Make an API request
   * @param config - Axios request config
   * @returns Promise resolving to the response data
   * @throws Error if the request fails
   */
  async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.request<T>(config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const apiError = error.response.data as ApiErrorResponse;
        throw new Error(apiError.message || apiError.error || 'Request failed');
      }
      throw error;
    }
  }

  /**
   * GET /payment/configs
   * Get all payment configurations for the workspace (card, au_becs_debit, etc.)
   * Returns an array — one entry per supported payment method type.
   * Excludes us_bank_account and other unsupported types.
   * @throws Error if no supported Stripe configs are found
   */
  async getPaymentConfigs(): Promise<PaymentConfigResponse[]> {
    const configs = await this.request<PaymentConfigResponse[]>({
      method: 'GET',
      url: '/payment/configs',
    });

    const supported = ['card', 'au_becs_debit'];

    const filtered = configs.filter(cfg => {
      const pmt = getPaymentMethodType(cfg);
      return cfg.gateway?.provider === 'stripe' && supported.includes(pmt?.type?.toLowerCase() ?? '');
    });

    if (filtered.length === 0) {
      throw new Error('No supported payment methods are configured for this workspace');
    }

    return filtered;
  }

  /**
   * POST /payment-methods/setup-config
   * Get Stripe SetupIntent client_secret
   * @param ownerId - Owner ID (person or company)
   * @param ownerType - Owner type ('person' or 'company')
   * @param configId - Payment config ID
   * @returns Promise resolving to setup config with SetupIntent
   */
  async getSetupConfig(
    ownerId: string,
    ownerType: SetupConfigRequest['owner_type'],
    configId: number
  ): Promise<SetupConfigResponse> {
    const requestBody: SetupConfigRequest = {
      owner_id: ownerId,
      owner_type: ownerType,
      config_id: configId,
    };

    return this.request<SetupConfigResponse>({
      method: 'POST',
      url: '/payment-methods/setup-config',
      data: requestBody,
    });
  }

  /**
   * POST /payment-methods/add
   * Save payment method to Loopit API after Stripe confirmation
   * @param data - Payment method data
   * @returns Promise resolving to the created payment method
   */
  async addPaymentMethod(data: AddPaymentMethodRequest): Promise<PaymentMethod> {
    return this.request<PaymentMethod>({
      method: 'POST',
      url: '/payment-methods/add',
      data,
    });
  }
}
