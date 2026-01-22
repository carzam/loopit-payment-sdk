<template>
  <div
    class="lp-fixed lp-inset-0 lp-bg-black/50 lp-flex lp-items-center lp-justify-center lp-z-[9999] lp-p-5"
    @click.self="$emit('close')"
  >
    <div class="lp-bg-white lp-rounded-xl lp-w-full lp-max-w-[500px] lp-max-h-[90vh] lp-overflow-auto lp-shadow-xl">
      <div class="lp-flex lp-items-center lp-justify-between lp-py-5 lp-px-6 lp-border-b lp-border-gray-200">
        <h2 class="lp-m-0 lp-text-lg lp-font-semibold lp-text-gray-900">Add Payment Method</h2>
        <button
          type="button"
          class="lp-flex lp-items-center lp-justify-center lp-w-8 lp-h-8 lp-p-0 lp-bg-transparent lp-border-none lp-rounded-md lp-cursor-pointer lp-text-gray-500 lp-transition-colors hover:lp-bg-gray-100 hover:lp-text-gray-900"
          @click="$emit('close')"
          aria-label="Close"
        >
          <svg class="lp-w-5 lp-h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="lp-p-6">
        <StripeCardForm
          :api-client="apiClient"
          :owner-id="ownerId"
          :owner-type="ownerType"
          @added="handleAdded"
          @error="handleError"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import StripeCardForm from './StripeCardForm.vue';
import type { ApiClient } from '../api/client';
import type { OwnerType, PaymentMethod } from '../types';

/**
 * Add Payment Method Modal component
 * Displays a modal with the Stripe card form
 */
export default defineComponent({
  name: 'AddPaymentMethodModal',

  components: {
    StripeCardForm,
  },

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
     * Emitted when modal should close
     */
    close: () => true,
    /**
     * Emitted when payment method is successfully added
     */
    added: (method: PaymentMethod) => !!method,
    /**
     * Emitted when an error occurs
     */
    error: (err: Error) => !!err,
  },

  mounted() {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    // Close on escape key
    document.addEventListener('keydown', this.handleKeydown);
  },

  beforeUnmount() {
    // Restore body scroll
    document.body.style.overflow = '';

    // Remove escape key listener
    document.removeEventListener('keydown', this.handleKeydown);
  },

  methods: {
    /**
     * Handle keyboard events
     * @param e - Keyboard event
     */
    handleKeydown(e: KeyboardEvent): void {
      if (e.key === 'Escape') {
        this.$emit('close');
      }
    },

    /**
     * Handle payment method added
     * @param method - The newly added payment method
     */
    handleAdded(method: PaymentMethod): void {
      this.$emit('added', method);
    },

    /**
     * Handle error
     * @param err - The error that occurred
     */
    handleError(err: Error): void {
      this.$emit('error', err);
    },
  },
});
</script>
