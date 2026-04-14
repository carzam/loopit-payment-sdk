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

      <!-- Show payment method type tabs + add button when no payment method -->
      <template v-else>
        <!-- Tab selector — only shown when more than one config is available -->
        <div
          v-if="configs.length > 1"
          class="lp-flex lp-gap-2 lp-mb-3"
        >
          <button
            v-for="cfg in configs"
            :key="cfg.id"
            type="button"
            class="lp-flex-1 lp-py-2.5 lp-px-4 lp-rounded-lg lp-text-sm lp-font-semibold lp-border-2 lp-cursor-pointer lp-transition-all"
            :class="selectedConfig && selectedConfig.id === cfg.id
              ? 'lp-border-blue-500 lp-bg-blue-50 lp-text-blue-700'
              : 'lp-border-gray-200 lp-bg-gray-50 lp-text-gray-600 hover:lp-border-gray-300 hover:lp-bg-gray-100'"
            @click="selectedConfig = cfg"
          >
            {{ configLabel(cfg) }}
          </button>
        </div>

        <!-- Add payment method button -->
        <button
          v-if="selectedConfig"
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
      </template>

      <!-- Add payment method modal -->
      <AddPaymentMethodModal
        v-if="showModal && selectedConfig"
        :api-client="apiClient"
        :owner-id="options.ownerId"
        :owner-type="options.ownerType"
        :config="selectedConfig"
        @close="showModal = false"
        @added="handleAdded"
        @error="handleModalError"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { ApiClient, getPaymentMethodType } from './api/client';
import PaymentMethodDisplay from './components/PaymentMethodDisplay.vue';
import AddPaymentMethodModal from './components/AddPaymentMethodModal.vue';
import type { LoopitPaymentMethodOptions, PaymentMethod, PaymentConfigResponse } from './types';

const CONFIG_LABELS: Record<string, string> = {
  card: '💳 Card',
  au_becs_debit: '🏦 Direct Debit',
};

export default defineComponent({
  name: 'LoopitPaymentMethod',

  components: {
    PaymentMethodDisplay,
    AddPaymentMethodModal,
  },

  props: {
    options: {
      type: Object as PropType<LoopitPaymentMethodOptions>,
      required: true,
    },
  },

  data() {
    return {
      paymentMethod: null as PaymentMethod | null,
      showModal: false,
      isLoading: true,
      error: null as string | null,
      apiClient: null as ApiClient | null,
      /** All available payment configs for this workspace */
      configs: [] as PaymentConfigResponse[],
      /** Currently selected config (drives which form opens) */
      selectedConfig: null as PaymentConfigResponse | null,
    };
  },

  async created() {
    this.apiClient = new ApiClient(
      this.options.apiBaseUrl,
      this.options.workspace,
      this.options.microsite
    );

    try {
      const allConfigs = await this.apiClient.getPaymentConfigs();

      // Filter to only the types the integrator wants, if specified
      const allowedTypes = this.options.paymentMethodTypes;
      this.configs = allowedTypes && allowedTypes.length > 0
        ? allConfigs.filter(cfg => {
            const type = getPaymentMethodType(cfg)?.type?.toLowerCase() ?? '';
            return allowedTypes.includes(type as 'card' | 'au_becs_debit');
          })
        : allConfigs;

      if (this.configs.length === 0) {
        throw new Error('No matching payment methods found for the configured types');
      }

      this.selectedConfig = this.configs[0] ?? null;

      // Fire onConfigLoaded with all configs so the integrator knows what's available
      if (typeof this.options.onConfigLoaded === 'function' && this.selectedConfig) {
        this.options.onConfigLoaded(this.selectedConfig);
      }
    } catch (err) {
      this.error = (err as Error).message;
    } finally {
      this.isLoading = false;
    }
  },

  methods: {
    /** Human-readable label for a config tab */
    configLabel(cfg: PaymentConfigResponse): string {
      const type = getPaymentMethodType(cfg)?.type?.toLowerCase() ?? '';
      return CONFIG_LABELS[type] ?? getPaymentMethodType(cfg)?.name ?? 'Payment Method';
    },

    handleAdded(method: PaymentMethod): void {
      this.paymentMethod = method;
      this.showModal = false;

      if (typeof this.options.onPaymentMethodAdded === 'function') {
        this.options.onPaymentMethodAdded(method);
      }
    },

    handleRemove(): void {
      this.paymentMethod = null;

      if (typeof this.options.onPaymentMethodRemoved === 'function') {
        this.options.onPaymentMethodRemoved();
      }
    },

    handleModalError(err: Error): void {
      if (typeof this.options.onError === 'function') {
        this.options.onError(err);
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
