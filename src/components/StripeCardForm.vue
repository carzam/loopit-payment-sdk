<template>
  <form @submit.prevent="handleSubmit" class="lp-flex lp-flex-col lp-gap-4">
    <!-- Loading state while initializing Stripe -->
    <div v-show="isInitializing" class="lp-flex lp-items-center lp-justify-center lp-gap-2 lp-py-10 lp-text-gray-500">
      <span class="lp-w-5 lp-h-5 lp-border-2 lp-border-gray-200 lp-border-t-blue-500 lp-rounded-full lp-animate-spin"></span>
      Loading payment form...
    </div>

    <!-- Cardholder Name -->
    <div v-show="!isInitializing" class="lp-flex lp-flex-col lp-gap-1.5">
      <label class="lp-text-sm lp-font-medium lp-text-gray-700" for="loopit-cardholder-name">
        Cardholder Name
        <span class="lp-text-red-600">*</span>
      </label>
      <input
        id="loopit-cardholder-name"
        v-model="cardholderName"
        type="text"
        class="lp-w-full lp-p-3 lp-border lp-border-gray-300 lp-rounded-md lp-text-sm lp-text-gray-800 lp-bg-gray-50 lp-transition-all focus:lp-outline-none focus:lp-border-blue-500 focus:lp-ring-[3px] focus:lp-ring-blue-500/10"
        :class="{ 'lp-border-red-600 focus:lp-border-red-600 focus:lp-ring-red-600/10': nameError }"
        placeholder="Name on card"
      />
      <p v-if="nameError" class="lp-text-sm lp-text-red-600 lp-m-0">{{ nameError }}</p>
    </div>

    <!-- Stripe Payment Element - always in DOM for mounting -->
    <div v-show="!isInitializing" class="lp-flex lp-flex-col lp-gap-1.5">
      <div ref="paymentElement" class="lp-min-h-[100px]"></div>
    </div>

    <!-- Error message -->
    <p v-if="error" class="lp-text-sm lp-text-red-600 lp-m-0 lp-p-3 lp-bg-red-50 lp-rounded-md">{{ error }}</p>

    <!-- Submit button -->
    <button
      v-show="!isInitializing"
      type="submit"
      class="lp-flex lp-items-center lp-justify-center lp-gap-2 lp-w-full lp-py-3.5 lp-px-6 lp-bg-blue-500 lp-border-none lp-rounded-md lp-text-base lp-font-medium lp-text-white lp-cursor-pointer lp-transition-colors lp-mt-2 hover:lp-bg-blue-600 disabled:lp-bg-gray-400 disabled:lp-cursor-not-allowed"
      :disabled="isLoading || !stripeReady"
    >
      <svg v-if="!isLoading" class="lp-w-[18px] lp-h-[18px]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
      </svg>
      <span v-if="isLoading" class="lp-w-[18px] lp-h-[18px] lp-border-2 lp-border-white/30 lp-border-t-white lp-rounded-full lp-animate-spin"></span>
      <span>{{ isLoading ? 'Saving...' : 'Save Card' }}</span>
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { ApiClient } from '../api/client';
import type {
  OwnerType,
  PaymentMethod,
  PaymentConfigResponse,
  StripeInstance,
  StripeElements,
  StripeElement,
  StripeError,
} from '../types';

/**
 * Stripe Card Form component
 * Handles Stripe Payment Element initialization and form submission
 */
export default defineComponent({
  name: 'StripeCardForm',

  props: {
    /**
     * API client instance for making requests
     */
    apiClient: {
      type: Object as PropType<ApiClient>,
      required: true,
    },
    /**
     * Owner ID (person or company)
     */
    ownerId: {
      type: String,
      required: true,
    },
    /**
     * Owner type
     */
    ownerType: {
      type: String as PropType<OwnerType>,
      required: true,
    },
  },

  emits: {
    /**
     * Emitted when payment method is successfully added
     */
    added: (method: PaymentMethod) => !!method,
    /**
     * Emitted when an error occurs
     */
    error: (err: Error) => !!err,
  },

  data() {
    return {
      /** Cardholder name input value */
      cardholderName: '',
      /** Cardholder name validation error */
      nameError: null as string | null,
      /** General error message */
      error: null as string | null,
      /** Form submission loading state */
      isLoading: false,
      /** Stripe initialization loading state */
      isInitializing: true,
      /** Whether Stripe Payment Element is ready */
      stripeReady: false,
      /** Stripe instance */
      stripe: null as StripeInstance | null,
      /** Stripe Elements instance */
      elements: null as StripeElements | null,
      /** Stripe Payment Element instance */
      paymentElement: null as StripeElement | null,
      /** Payment configuration from API */
      config: null as PaymentConfigResponse | null,
    };
  },

  async mounted() {
    await this.initStripe();
  },

  beforeUnmount() {
    if (this.paymentElement) {
      this.paymentElement.destroy();
    }
  },

  methods: {
    /**
     * Initialize Stripe and mount Payment Element
     */
    async initStripe(): Promise<void> {
      try {
        // Get payment config from API
        this.config = await this.apiClient.getPaymentConfig();

        // Check if Stripe.js is loaded
        if (typeof window.Stripe === 'undefined') {
          throw new Error('Stripe.js is not loaded. Please include the Stripe.js script (https://js.stripe.com/v3/) in your page.');
        }

        // Initialize Stripe with the publishable key and connected account
        this.stripe = window.Stripe(this.config.gateway.api_key, {
          stripeAccount: this.config.gateway.external_gateway_id,
        });

        // Create Elements instance (matching loopit-frontend configuration)
        this.elements = this.stripe.elements({
          mode: 'setup',
          currency: this.config.currency.code.toLowerCase(),
          paymentMethodTypes: [this.config.payment_method_type.type.toLowerCase()],
          setupFutureUsage: 'off_session',
          appearance: {
            theme: 'flat',
            labels: 'floating',
            variables: {
              fontSizeBase: '14px',
              fontLineHeight: '1',
              colorBackground: '#F6F8FA',
            },
            rules: {
              '.Block': {
                backgroundColor: 'var(--colorBackground)',
                boxShadow: 'none',
                padding: '9px',
              },
              '.Input': {
                padding: '9px',
              },
            },
          },
        });

        // Create and mount Payment Element (card only)
        this.paymentElement = this.elements.create('payment', {
          layout: 'tabs',
          paymentMethodOrder: ['card'],
        });

        // Wait for next tick so ref is available
        await this.$nextTick();

        // Mount the Payment Element
        const paymentElementRef = this.$refs.paymentElement as HTMLElement;
        this.paymentElement.mount(paymentElementRef);

        // Listen for ready event
        this.paymentElement.on('ready', () => {
          this.stripeReady = true;
        });

        this.isInitializing = false;
      } catch (err) {
        this.isInitializing = false;
        this.error = (err as Error).message;
        this.$emit('error', err as Error);
      }
    },

    /**
     * Handle form submission
     */
    async handleSubmit(): Promise<void> {
      this.error = null;
      this.nameError = null;

      // Validate cardholder name
      if (!this.cardholderName.trim()) {
        this.nameError = 'Cardholder name is required';
        return;
      }

      // Ensure elements is available
      if (!this.elements || !this.stripe || !this.config) {
        this.error = 'Payment form not initialized';
        return;
      }

      // Validate Stripe element
      const { error: elementsError } = await this.elements.submit();
      if (elementsError) {
        this.error = (elementsError as StripeError).message;
        return;
      }

      this.isLoading = true;

      try {
        // Get SetupIntent client secret from API
        const setupConfig = await this.apiClient.getSetupConfig(
          this.ownerId,
          this.ownerType,
          this.config.id
        );

        // Confirm setup with Stripe
        const { error, setupIntent } = await this.stripe.confirmSetup({
          elements: this.elements,
          clientSecret: setupConfig.config.setup_intent.client_secret,
          confirmParams: {
            payment_method_data: {
              billing_details: {
                name: this.cardholderName,
              },
            },
          },
          redirect: 'if_required',
        });

        if (error) {
          throw new Error(error.message);
        }

        if (!setupIntent) {
          throw new Error('Setup failed - no setup intent returned');
        }

        // Save payment method to Loopit API
        const paymentMethod = await this.apiClient.addPaymentMethod({
          owner_id: this.ownerId,
          owner_type: this.ownerType,
          config_id: this.config.id,
          external_payment_method_id: setupIntent.payment_method,
          data: {
            cardholder_name: this.cardholderName,
          },
        });

        this.$emit('added', paymentMethod);
      } catch (err) {
        this.error = (err as Error).message;
        this.$emit('error', err as Error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
</script>

<style>
/* Animation for spinner */
.lp-animate-spin {
  animation: lp-spin 0.8s linear infinite;
}

@keyframes lp-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
