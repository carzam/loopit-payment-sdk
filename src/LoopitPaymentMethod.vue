<template>
  <div class="lp-font-sans">
    <!-- Loading state -->
    <div v-if="isLoading" class="lp-flex lp-items-center lp-gap-2 lp-text-gray-500 lp-p-4">
      <span class="lp-w-5 lp-h-5 lp-border-2 lp-border-gray-200 lp-border-t-blue-500 lp-rounded-full lp-animate-spin"></span>
      Loading...
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="lp-text-red-600 lp-p-3 lp-bg-red-50 lp-rounded-md lp-text-sm">
      {{ error }}
    </div>

    <!-- Main content -->
    <template v-else>
      <!-- Show selected payment method -->
      <PaymentMethodDisplay
        v-if="paymentMethod"
        :payment-method="paymentMethod"
        @remove="handleRemove"
      />

      <!-- Show add button when no payment method -->
      <button
        v-else
        type="button"
        class="lp-flex lp-items-center lp-justify-center lp-gap-2 lp-w-full lp-py-4 lp-px-6 lp-bg-gray-100 lp-border-none lp-rounded-md lp-text-base lp-font-medium lp-text-gray-800 lp-cursor-pointer lp-transition-colors hover:lp-bg-gray-200"
        @click="showModal = true"
      >
        <svg class="lp-w-5 lp-h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Add Payment Method
      </button>

      <!-- Add payment method modal -->
      <AddPaymentMethodModal
        v-if="showModal"
        :api-client="apiClient"
        :owner-id="options.ownerId"
        :owner-type="options.ownerType"
        @close="showModal = false"
        @added="handleAdded"
        @error="handleModalError"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { ApiClient } from './api/client';
import PaymentMethodDisplay from './components/PaymentMethodDisplay.vue';
import AddPaymentMethodModal from './components/AddPaymentMethodModal.vue';
import type { LoopitPaymentMethodOptions, PaymentMethod } from './types';

/**
 * Main Loopit Payment Method component
 * Manages payment method state and renders appropriate UI
 */
export default defineComponent({
  name: 'LoopitPaymentMethod',

  components: {
    PaymentMethodDisplay,
    AddPaymentMethodModal,
  },

  props: {
    /**
     * SDK configuration options
     */
    options: {
      type: Object as PropType<LoopitPaymentMethodOptions>,
      required: true,
    },
  },

  data() {
    return {
      /** Currently selected payment method */
      paymentMethod: null as PaymentMethod | null,
      /** Whether to show the add payment method modal */
      showModal: false,
      /** Loading state */
      isLoading: false,
      /** Error message */
      error: null as string | null,
      /** API client instance */
      apiClient: null as ApiClient | null,
    };
  },

  created() {
    this.apiClient = new ApiClient(
      this.options.apiBaseUrl,
      this.options.workspace,
      this.options.microsite
    );
  },

  methods: {
    /**
     * Handle payment method added event
     * @param method - The newly added payment method
     */
    handleAdded(method: PaymentMethod): void {
      this.paymentMethod = method;
      this.showModal = false;

      // Call external callback
      if (typeof this.options.onPaymentMethodAdded === 'function') {
        this.options.onPaymentMethodAdded(method);
      }
    },

    /**
     * Handle payment method removal
     */
    handleRemove(): void {
      this.paymentMethod = null;

      // Call external callback
      if (typeof this.options.onPaymentMethodRemoved === 'function') {
        this.options.onPaymentMethodRemoved();
      }
    },

    /**
     * Handle modal error
     * @param err - The error that occurred
     */
    handleModalError(err: Error): void {
      // Call external callback
      if (typeof this.options.onError === 'function') {
        this.options.onError(err);
      }
    },
  },
});
</script>

<style>
/* Animation for spinner - Tailwind's animate-spin needs the keyframe */
.lp-animate-spin {
  animation: lp-spin 0.8s linear infinite;
}

@keyframes lp-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
