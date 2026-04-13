<template>
  <div
    class="lp-fixed lp-inset-0 lp-bg-black/50 lp-flex lp-items-center lp-justify-center lp-z-[9999] lp-p-5"
    @click.self="$emit('close')"
  >
    <div class="lp-bg-white lp-rounded-xl lp-w-full lp-max-w-[500px] lp-max-h-[90vh] lp-overflow-auto lp-shadow-xl">
      <div class="lp-flex lp-items-center lp-justify-between lp-py-5 lp-px-6 lp-border-b lp-border-gray-200">
        <h2 class="lp-m-0 lp-text-lg lp-font-semibold lp-text-gray-900">{{ modalTitle }}</h2>
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
        <StripePaymentForm
          :api-client="apiClient"
          :owner-id="ownerId"
          :owner-type="ownerType"
          :config="config"
          @added="$emit('added', $event)"
          @error="$emit('error', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import StripePaymentForm from './StripePaymentForm.vue';
import { getPaymentMethodType } from '../api/client';
import type { ApiClient } from '../api/client';
import type { OwnerType, PaymentMethod, PaymentConfigResponse } from '../types';

export default defineComponent({
  name: 'AddPaymentMethodModal',

  components: { StripePaymentForm },

  props: {
    apiClient: {
      type: Object as PropType<ApiClient>,
      required: true,
    },
    ownerId: {
      type: String,
      required: true,
    },
    ownerType: {
      type: String as PropType<OwnerType>,
      required: true,
    },
    /** The selected payment config — determines form type and Stripe keys */
    config: {
      type: Object as PropType<PaymentConfigResponse>,
      required: true,
    },
  },

  emits: {
    close: () => true,
    added: (method: PaymentMethod) => !!method,
    error: (err: Error) => !!err,
  },

  computed: {
    modalTitle(): string {
      const type = getPaymentMethodType(this.config)?.type?.toLowerCase();
      if (type === 'au_becs_debit') return 'Set up Direct Debit';
      if (type === 'card') return 'Add Card';
      return 'Add Payment Method';
    },
  },

  mounted() {
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', this.handleKeydown);
  },

  beforeUnmount() {
    document.body.style.overflow = '';
    document.removeEventListener('keydown', this.handleKeydown);
  },

  methods: {
    handleKeydown(e: KeyboardEvent): void {
      if (e.key === 'Escape') this.$emit('close');
    },
  },
});
</script>
