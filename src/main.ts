/**
 * Loopit Payment Method SDK
 *
 * Vue.js SDK for managing payment methods in Laravel Blade templates.
 * Only supports Stripe card payments.
 */

import { createApp, type App } from 'vue';
import LoopitPaymentMethod from './LoopitPaymentMethod.vue';
import './styles/main.css';

import type {
  LoopitPaymentMethodOptions,
  LoopitPaymentMethodInstance,
} from './types';

// Re-export types for consumers
export type {
  LoopitPaymentMethodOptions,
  LoopitPaymentMethodInstance,
  PaymentMethod,
  PaymentConfigResponse,
  OwnerType,
  CardBrand,
} from './types';

/**
 * Loopit Payment Method SDK
 */
const LoopitPaymentMethodSDK = {
  /**
   * Mount the SDK to a DOM element
   *
   * @param selector - CSS selector or DOM element
   * @param options - SDK configuration options
   * @returns SDK instance with app and unmount method
   *
   * @example
   * ```javascript
   * const sdk = LoopitPaymentMethod.mount('#payment-container', {
   *   apiBaseUrl: 'https://platform.api.loopit.co/api/portal',
   *   workspace: 'my-workspace',
   *   ownerId: '123',
   *   ownerType: 'person',
   *   onPaymentMethodAdded: (pm) => console.log('Added:', pm),
   *   onPaymentMethodRemoved: () => console.log('Removed'),
   *   onError: (err) => console.error('Error:', err),
   * });
   *
   * // Later, to unmount:
   * sdk.unmount();
   * ```
   */
  mount(
    selector: string | HTMLElement,
    options: LoopitPaymentMethodOptions
  ): LoopitPaymentMethodInstance {
    const container: Element | null =
      typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;

    if (!container) {
      throw new Error(`Container element not found: ${selector}`);
    }

    const app: App = createApp(LoopitPaymentMethod, { options });
    app.mount(container);

    return {
      app,
      unmount: (): void => app.unmount(),
    };
  },
};

// UMD export for browser use
if (typeof window !== 'undefined') {
  window.LoopitPaymentMethod = LoopitPaymentMethodSDK;
}

export default LoopitPaymentMethodSDK;
