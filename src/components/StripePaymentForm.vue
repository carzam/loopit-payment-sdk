<template>
  <form @submit.prevent="handleSubmit" class="lp-flex lp-flex-col lp-gap-4">
    <!-- Loading state while initializing Stripe -->
    <div v-show="isInitializing" class="lp-flex lp-items-center lp-justify-center lp-gap-2 lp-py-10 lp-text-gray-500">
      <span class="lp-w-5 lp-h-5 lp-border-2 lp-border-gray-200 lp-border-t-blue-500 lp-rounded-full lp-animate-spin"></span>
      Loading payment form...
    </div>

    <!-- Cardholder Name — card payments only -->
    <div v-if="isCardPayment" v-show="!isInitializing" class="lp-flex lp-flex-col lp-gap-1.5">
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

    <!-- Stripe Payment Element -->
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
      <span>{{ submitLabel }}</span>
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { getPaymentMethodType } from '../api/client';
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
 * Stripe Payment Form component.
 * Accepts a resolved PaymentConfigResponse as a prop — the parent is responsible
 * for fetching all configs and passing the selected one here.
 * Supports 'card' and 'au_becs_debit' payment method types.
 */
export default defineComponent({
  name: 'StripePaymentForm',

  props: {
    /** API client instance for making requests */
    apiClient: {
      type: Object as PropType<ApiClient>,
      required: true,
    },
    /** Owner ID (person or company) */
    ownerId: {
      type: String,
      required: true,
    },
    /** Owner type */
    ownerType: {
      type: String as PropType<OwnerType>,
      required: true,
    },
    /** The payment config to use — provided by the parent */
    config: {
      type: Object as PropType<PaymentConfigResponse>,
      required: true,
    },
  },

  emits: {
    added: (method: PaymentMethod) => !!method,
    error: (err: Error) => !!err,
  },

  data() {
    return {
      cardholderName: '',
      nameError: null as string | null,
      error: null as string | null,
      isLoading: false,
      isInitializing: true,
      stripeReady: false,
      stripe: null as StripeInstance | null,
      elements: null as StripeElements | null,
      paymentElement: null as StripeElement | null,
    };
  },

  computed: {
    paymentMethodType(): string {
      return getPaymentMethodType(this.config)?.type?.toLowerCase() ?? 'card';
    },
    isCardPayment(): boolean {
      return this.paymentMethodType === 'card';
    },
    submitLabel(): string {
      if (this.isLoading) return this.isCardPayment ? 'Saving...' : 'Setting up...';
      return this.isCardPayment ? 'Save Card' : 'Set up Direct Debit';
    },
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
    async initStripe(): Promise<void> {
      try {
        if (typeof window.Stripe === 'undefined') {
          throw new Error('Stripe.js is not loaded. Please include https://js.stripe.com/v3/ in your page.');
        }

        this.stripe = window.Stripe(this.config.gateway.api_key, {
          stripeAccount: this.config.gateway.external_gateway_id,
        });

        this.elements = this.stripe.elements({
          mode: 'setup',
          currency: this.config.currency.code.toLowerCase(),
          paymentMethodTypes: [this.paymentMethodType],
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

        this.paymentElement = this.elements.create('payment', {
          layout: 'tabs',
          paymentMethodOrder: [this.paymentMethodType],
        });

        await this.$nextTick();

        const paymentElementRef = this.$refs.paymentElement as HTMLElement;
        this.paymentElement.mount(paymentElementRef);

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

    async handleSubmit(): Promise<void> {
      this.error = null;
      this.nameError = null;

      if (this.isCardPayment && !this.cardholderName.trim()) {
        this.nameError = 'Cardholder name is required';
        return;
      }

      if (!this.elements || !this.stripe) {
        this.error = 'Payment form not initialized';
        return;
      }

      const { error: elementsError } = await this.elements.submit();
      if (elementsError) {
        this.error = (elementsError as StripeError).message;
        return;
      }

      this.isLoading = true;

      try {
        const setupConfig = await this.apiClient.getSetupConfig(
          this.ownerId,
          this.ownerType,
          this.config.id
        );

        const confirmParams = this.isCardPayment
          ? { payment_method_data: { billing_details: { name: this.cardholderName } } }
          : {};

        const { error, setupIntent } = await this.stripe.confirmSetup({
          elements: this.elements,
          clientSecret: setupConfig.config.setup_intent.client_secret,
          confirmParams,
          redirect: 'if_required',
        });

        if (error) throw new Error(error.message);
        if (!setupIntent) throw new Error('Setup failed - no setup intent returned');

        const paymentMethod = await this.apiClient.addPaymentMethod({
          owner_id: this.ownerId,
          owner_type: this.ownerType,
          config_id: this.config.id,
          external_payment_method_id: setupIntent.payment_method,
          data: this.isCardPayment ? { cardholder_name: this.cardholderName } : null,
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
.lp-animate-spin {
  animation: lp-spin 0.8s linear infinite;
}
@keyframes lp-spin {
  to { transform: rotate(360deg); }
}
</style>
