<!-- TransactionFiltersModal component -->
<template>
  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
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
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
              <Filter class="h-6 w-6 text-blue-600" />
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Filter Transactions
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Filter your transaction history by applying one or more filters below.
                </p>
                
                <form @submit.prevent="applyFilters" class="mt-4">
                  <!-- Transaction Type Filter -->
                  <div class="mb-4">
                    <label for="type" class="block text-sm font-medium text-gray-700 mb-1">Transaction Type</label>
                    <select
                      id="type"
                      v-model="filterOptions.type"
                      class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    >
                      <option value="">All Types</option>
                      <option value="deposit">Deposit</option>
                      <option value="withdrawal">Withdrawal</option>
                      <option value="transfer">Transfer</option>
                      <option value="transfer_in">Money Received</option>
                      <option value="transfer_out">Money Sent</option>
                    </select>
                  </div>
                  
                  <!-- Date Range Filter -->
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                    <div class="grid grid-cols-2 gap-2">
                      <div>
                        <label for="startDate" class="text-xs text-gray-500">From</label>
                        <input 
                          id="startDate"
                          type="date"
                          v-model="filterOptions.startDate"
                          class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                      </div>
                      <div>
                        <label for="endDate" class="text-xs text-gray-500">To</label>
                        <input 
                          id="endDate"
                          type="date" 
                          v-model="filterOptions.endDate"
                          class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <!-- Amount Range Filter -->
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Amount Range (₹)</label>
                    <div class="grid grid-cols-2 gap-2">
                      <div>
                        <label for="minAmount" class="text-xs text-gray-500">Min</label>
                        <input 
                          id="minAmount"
                          type="number" 
                          v-model="filterOptions.minAmount"
                          placeholder="0"
                          min="0"
                          class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                      </div>
                      <div>
                        <label for="maxAmount" class="text-xs text-gray-500">Max</label>
                        <input 
                          id="maxAmount"
                          type="number" 
                          v-model="filterOptions.maxAmount"
                          placeholder="99999"
                          min="0"
                          class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <!-- Filter Actions -->
                  <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                      type="submit"
                      class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                    >
                      Apply Filters
                    </button>
                    <button
                      type="button"
                      class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                      @click="resetFilters"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import { X, Filter } from 'lucide-vue-next';

const props = defineProps({
  modelValue: Boolean,
  initialFilters: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['update:modelValue', 'apply-filters']);

const filterOptions = ref({
  type: '',
  startDate: '',
  endDate: '',
  minAmount: '',
  maxAmount: ''
});

// Initialize filterOptions with any provided initial values
watch(() => props.initialFilters, (newFilters) => {
  if (newFilters) {
    filterOptions.value = { ...filterOptions.value, ...newFilters };
  }
}, { immediate: true });

// Reset filter values when modal closes
watch(() => props.modelValue, (isOpen) => {
  if (!isOpen) {
    // Don't reset immediately, in case we need to use the values
  }
});

const closeModal = () => {
  emit('update:modelValue', false);
};

const applyFilters = () => {
  // Validate date range
  if (filterOptions.value.startDate && filterOptions.value.endDate) {
    const start = new Date(filterOptions.value.startDate);
    const end = new Date(filterOptions.value.endDate);
    
    if (start > end) {
      alert('Start date cannot be after end date');
      return;
    }
  }
  
  // Apply filters and close modal
  emit('apply-filters', { ...filterOptions.value });
  closeModal();
};

const resetFilters = () => {
  filterOptions.value = {
    type: '',
    startDate: '',
    endDate: '',
    minAmount: '',
    maxAmount: ''
  };
};
</script>
