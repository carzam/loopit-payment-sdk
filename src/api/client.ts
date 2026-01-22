/**
 * Loopit Payment Method SDK - API Client
 *
 * Handles all API communication with Loopit backend.
 * Only supports Stripe card payments.
 */

import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import type {
  PaymentConfigResponse,
  SetupConfigRequest,
  SetupConfigResponse,
  AddPaymentMethodRequest,
  PaymentMethod,
  ApiErrorResponse,
} from '../types';

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
   * GET /payment/config
   * Get payment configuration (Stripe keys)
   * @returns Promise resolving to payment config
   * @throws Error if provider is not Stripe or payment type is not card
   */
  async getPaymentConfig(): Promise<PaymentConfigResponse> {
    const config = await this.request<PaymentConfigResponse>({
      method: 'GET',
      url: '/payment/config',
    });

    // Validate: Only Stripe is supported
    if (config.gateway?.provider !== 'stripe') {
      throw new Error('Only Stripe payment provider is supported');
    }

    // Validate: Only card payments are supported
    if (config.payment_method_type?.type?.toLowerCase() !== 'card') {
      throw new Error('Only card payments are supported');
    }

    return config;
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
