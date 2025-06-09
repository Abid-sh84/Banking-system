<template>
  <div v-if="modelValue" class="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="disclaimer-dialog" role="dialog" aria-modal="true">
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
      <!-- Background overlay -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div 
        class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6"
      >
        <div class="sm:flex sm:items-start">
          <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
            <InfoIcon class="h-6 w-6 text-blue-600" aria-hidden="true" />
          </div>
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 class="text-lg leading-6 font-medium text-gray-900" id="disclaimer-title">
              Important Disclaimer
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                This banking application is <strong>not a real bank</strong> and is created solely for educational purposes. Any features, transactions, or personal data within this application are simulated and not connected to any real financial institutions.
              </p>
              <div class="mt-3 space-y-2">
                <p class="text-sm text-gray-500">
                  <strong>Please be aware:</strong>
                </p>
                <ul class="list-disc ml-5 text-sm text-gray-500">
                  <li>No real money transactions occur</li>
                  <li>All data is for demonstration purposes only</li>
                  <li>This project is part of an educational assignment</li>
                  <li>No actual banking services are provided</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-5 sm:mt-4 sm:flex">
          <div class="flex items-center mr-4">
            <input 
              id="dont-show-again" 
              v-model="dontShowAgain"
              type="checkbox" 
              class="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <label for="dont-show-again" class="ml-2 block text-sm text-gray-900">
              Don't show this message again
            </label>
          </div>
          <button
            type="button"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:text-sm"
            @click="acceptDisclaimer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { InfoIcon } from 'lucide-vue-next';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue', 'accepted']);

const dontShowAgain = ref(false);

const acceptDisclaimer = () => {
  if (dontShowAgain.value) {
    localStorage.setItem('dismissedDisclaimer', 'true');
  }
  
  emit('accepted', dontShowAgain.value);
  emit('update:modelValue', false);
};
</script>
