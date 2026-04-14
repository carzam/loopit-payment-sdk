<template>
  <div class="lp-flex lp-items-center lp-gap-4 lp-w-full">
    <div class="lp-flex lp-items-center lp-gap-3 lp-flex-1 lp-py-4 lp-px-5 lp-bg-gray-100 lp-rounded-md">
      <img
        v-if="brandImage"
        :src="brandImage"
        :alt="displayLabel"
        class="lp-w-12 lp-h-8 lp-object-contain lp-rounded"
      />
      <!-- BECS direct debit display -->
      <span v-if="isBecsDebit" class="lp-text-base lp-text-gray-800">
        Direct Debit ••••
        <span class="lp-font-semibold">{{ paymentMethod.last_4 }}</span>
      </span>
      <!-- Card display -->
      <span v-else class="lp-text-base lp-text-gray-800">
        <span class="lp-capitalize">{{ capitalizedBrand }}</span>
        ending in
        <span class="lp-font-semibold">{{ paymentMethod.last_4 }}</span>
      </span>
    </div>
    <button
      type="button"
      class="lp-py-4 lp-px-6 lp-bg-gray-100 lp-border-none lp-rounded-md lp-text-base lp-text-gray-800 lp-cursor-pointer lp-transition-colors lp-whitespace-nowrap hover:lp-bg-gray-200"
      @click="$emit('remove')"
    >
      Remove
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { getBrandImage } from '../utils/brandImages';
import type { PaymentMethod } from '../types';

/**
 * Payment Method Display component
 * Shows the selected payment method with brand image and last 4 digits.
 * Handles both card and au_becs_debit display formats.
 */
export default defineComponent({
  name: 'PaymentMethodDisplay',

  props: {
    /** The payment method to display */
    paymentMethod: {
      type: Object as PropType<PaymentMethod>,
      required: true,
    },
  },

  emits: {
    /** Emitted when user clicks remove button */
    remove: () => true,
  },

  computed: {
    /** True when the payment method is BECS direct debit */
    isBecsDebit(): boolean {
      return this.paymentMethod.type === 'au_becs_debit';
    },

    /** Brand key to look up image — use type for BECS, brand for cards */
    brandKey(): string {
      if (this.isBecsDebit) return 'au_becs_debit';
      return this.paymentMethod.brand || '';
    },

    /** Get the brand image URL for the payment method */
    brandImage(): string | null {
      return getBrandImage(this.brandKey);
    },

    /** Accessible label for the brand image */
    displayLabel(): string {
      if (this.isBecsDebit) return 'Direct Debit';
      return this.paymentMethod.brand || 'Card';
    },

    /** Capitalized brand name for card display */
    capitalizedBrand(): string {
      const brand = this.paymentMethod.brand || 'Card';
      return brand.charAt(0).toUpperCase() + brand.slice(1);
    },
  },
});
</script>
