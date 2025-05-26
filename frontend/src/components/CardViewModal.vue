<template>
  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    enter-to-class="opacity-100 translate-y-0 sm:scale-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100 translate-y-0 sm:scale-100"
    leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  >
    <div v-if="modelValue" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeModal"></div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div 
          class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
          @click.stop
        >
          <div class="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
              @click="closeModal"
            >
              <span class="sr-only">Close</span>
              <X class="h-6 w-6" />
            </button>
          </div>
          
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-title">
                Your Virtual Debit Card
              </h3>
                <div v-if="card" class="flex justify-center mb-4">
                <VirtualCard :card="card" :override-flip="isFlipped" />
              </div>
              <div v-else class="flex justify-center mb-4 p-6 border border-dashed border-gray-300 rounded-lg">
                <div class="text-center">
                  <div class="h-16 w-16 mx-auto bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                    <CreditCard class="h-8 w-8" />
                  </div>
                  <h3 class="text-lg font-medium text-gray-900 mb-2">No Virtual Card Yet</h3>
                  <p class="text-gray-600 mb-4">
                    You don't have a virtual card yet. Visit the Virtual Debit Card section to apply for one.
                  </p>
                </div>
              </div>
                <div v-if="card" class="flex justify-center space-x-4 mt-2">
                <button 
                  @click="isFlipped = false"
                  class="px-4 py-2 text-sm font-medium rounded-md"
                  :class="!isFlipped ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'"
                >
                  Front View
                </button>
                <button 
                  @click="isFlipped = true"
                  class="px-4 py-2 text-sm font-medium rounded-md"
                  :class="isFlipped ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'"
                >
                  Back View
                </button>
              </div>
                <div v-if="card" class="mt-6 bg-blue-50 p-3 rounded-md text-sm text-blue-700">
                <p class="flex items-center">
                  <LockIcon class="h-4 w-4 mr-2" />
                  This card is for online transactions only. Keep your card details secure.
                </p>
              </div>
            </div>
          </div>
          
          <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
              @click="closeModal"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { X as XIcon, Lock as LockIcon, CreditCard } from 'lucide-vue-next';
import VirtualCard from './VirtualCard.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  card: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['update:modelValue']);

// State
const isFlipped = ref(false);

const closeModal = () => {
  emit('update:modelValue', false);
  // Reset the view to front when modal is closed
  setTimeout(() => {
    isFlipped.value = false;
  }, 300);
};
</script>
