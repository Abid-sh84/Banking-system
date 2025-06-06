<!-- Enhanced TransactionModal with transaction details view support -->
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
          
          <!-- Transaction Details View -->
          <div v-if="mode === 'view' && transactionData">
            <div class="mb-6">
              <!-- Transaction Header with Status -->
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center">
                  <div class="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full"
                    :class="getTransactionTypeClass(transactionData.type).bgClass">
                    <component 
                      :is="getTransactionTypeIcon(transactionData.type)" 
                      class="h-6 w-6"
                      :class="getTransactionTypeClass(transactionData.type).textClass"
                    />
                  </div>
                  <div class="ml-3">
                    <p class="text-lg font-bold" :class="getTransactionTypeClass(transactionData.type).textClass">
                      {{ formatCurrency(transactionData.amount) }}
                    </p>
                    <p class="text-sm text-gray-600">
                      {{ formatTransactionType(transactionData.type) }}
                    </p>
                  </div>
                </div>
                <span 
                  class="px-3 py-1 text-sm rounded-full" 
                  :class="{
                    'bg-green-100 text-green-800': transactionData.status === 'completed' || transactionData.status === 'success' || !transactionData.status,
                    'bg-yellow-100 text-yellow-800': transactionData.status === 'pending',
                    'bg-red-100 text-red-800': transactionData.status === 'failed'
                  }"
                >
                  {{ formatStatus(transactionData.status || 'completed') }}
                </span>
              </div>
              
              <!-- Transaction Details -->
              <div class="space-y-3">
                <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div class="bg-gray-50 p-3 rounded">
                    <p class="text-xs text-gray-500">Transaction ID</p>
                    <p class="text-sm font-medium">{{ transactionData.id || 'N/A' }}</p>
                  </div>
                  
                  <div class="bg-gray-50 p-3 rounded">
                    <p class="text-xs text-gray-500">Date & Time</p>
                    <p class="text-sm font-medium">
                      {{ formatDateTime(transactionData.transaction_date || transactionData.created_at) }}
                    </p>
                  </div>
                </div>
                
                <div class="bg-gray-50 p-3 rounded">
                  <p class="text-xs text-gray-500">Customer</p>
                  <div class="flex items-center mt-1">
                    <div class="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                      <User class="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p class="text-sm font-medium">
                        {{ transactionData.customer_name || 'Customer' }}
                      </p>
                      <p class="text-xs text-gray-500">
                        ID: {{ transactionData.customer_id || 'N/A' }}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div v-if="transactionData.description" class="bg-gray-50 p-3 rounded">
                  <p class="text-xs text-gray-500">Description</p>
                  <p class="text-sm mt-1">{{ transactionData.description }}</p>
                </div>
                
                <div v-if="transactionData.receiver_id || transactionData.receiver_account" class="bg-gray-50 p-3 rounded">
                  <p class="text-xs text-gray-500">Recipient</p>
                  <div class="flex items-center mt-1">
                    <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                      <User class="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p class="text-sm font-medium">
                        {{ transactionData.receiver_name || 'Recipient' }}
                      </p>
                      <p class="text-xs text-gray-500">
                        ID: {{ transactionData.receiver_id || transactionData.receiver_account || 'N/A' }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
                @click="closeModal"
              >
                Close
              </button>
              <button
                v-if="transactionData.status === 'pending'"
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                @click="approveTransaction"
              >
                <Check class="h-4 w-4 mr-1" /> Approve
              </button>
            </div>
          </div>
          
          <!-- Transaction Create View (Deposit/Withdraw) -->
          <div v-else>
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10"
                  :class="[transactionType === 'deposit' ? 'bg-green-100' : 'bg-red-100']">
                <component 
                  :is="transactionType === 'deposit' ? ArrowDownLeft : ArrowUpRight" 
                  class="h-6 w-6"
                  :class="[transactionType === 'deposit' ? 'text-green-600' : 'text-red-600']"
                />
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  {{ transactionType === 'deposit' ? 'Make a Deposit' : 'Make a Withdrawal' }}
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Please enter the amount you wish to {{ transactionType === 'deposit' ? 'deposit into' : 'withdraw from' }} your account.
                  </p>
                </div>
              </div>
            </div>

            <form class="mt-5 sm:mt-4" @submit.prevent="handleSubmit">
              <div>
                <label for="amount" class="block text-sm font-medium text-gray-700">Amount (INR)</label>
                <div class="mt-1 relative rounded-md shadow-sm">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span class="text-gray-500 sm:text-sm">₹</span>
                  </div>
                  <input
                    v-model="amount"
                    type="number"
                    name="amount"
                    id="amount"
                    class="focus:ring-primary focus:border-primary block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                    step="0.01"
                    min="0.01"
                    max="1000000"
                    required
                    @keypress="validateNumberInput"
                  />
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span class="text-gray-500 sm:text-sm">INR</span>
                  </div>
                </div>
                
                <div class="mt-3">
                  <label for="description" class="block text-sm font-medium text-gray-700">Description (optional)</label>
                  <div class="mt-1">
                    <textarea
                      v-model="description"
                      id="description"
                      name="description"
                      rows="2"
                      class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Add a description for this transaction"
                    ></textarea>
                  </div>
                </div>
                
                <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
              </div>
              
              <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="submit"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                  :class="[transactionType === 'deposit' ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' : 'bg-red-600 hover:bg-red-700 focus:ring-red-500']"
                  :disabled="loading"
                >
                  <Loader2 v-if="loading" class="animate-spin h-4 w-4 mr-1" />
                  <span>{{ loading ? 'Processing...' : (transactionType === 'deposit' ? 'Deposit' : 'Withdraw') }}</span>
                </button>
                <button
                  type="button"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:col-start-1 sm:text-sm"
                  @click="closeModal"
                  :disabled="loading"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import { ArrowUpRight, ArrowDownLeft, X } from 'lucide-vue-next';
import { useToast } from 'vue-toastification';

const props = defineProps({
  modelValue: Boolean,
  transactionType: {
    type: String,
    default: 'deposit',
    validator: (value) => ['deposit', 'withdraw'].includes(value)
  },
  currentBalance: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['update:modelValue', 'transaction-completed']);
const toast = useToast();

const amount = ref('');
const error = ref('');
const loading = ref(false);

watch(() => props.modelValue, (newVal) => {
  if (!newVal) {
    resetForm();
  }
});

const validateNumberInput = (event) => {
  const charCode = event.which ? event.which : event.keyCode;
  if (
    (charCode > 31 && (charCode < 48 || charCode > 57)) && 
    charCode !== 46 // Allow decimal point
  ) {
    event.preventDefault();
  }
  
  // Ensure only one decimal point
  if (charCode === 46 && amount.value.includes('.')) {
    event.preventDefault();
  }
};

const closeModal = () => {
  emit('update:modelValue', false);
};

const resetForm = () => {
  amount.value = '';
  error.value = '';
  loading.value = false;
};

const handleSubmit = async () => {
  // Clear previous errors
  error.value = '';
  
  // Basic validation
  if (!amount.value || parseFloat(amount.value) <= 0) {
    error.value = 'Please enter a valid amount greater than zero.';
    return;
  }
  
  const amountValue = parseFloat(amount.value);
  
  // Additional validation for withdrawals
  if (props.transactionType === 'withdraw' && amountValue > props.currentBalance) {
    error.value = 'Insufficient funds. You cannot withdraw more than your current balance.';
    return;
  }
    try {
    loading.value = true;
    
    // Emit event to parent component to handle the API call
    emit('transaction-completed', {
      type: props.transactionType,
      amount: amountValue
    });
    
    // Close modal
    closeModal();
  } catch (err) {
    error.value = err.message || 'An error occurred. Please try again.';
    toast.error('Transaction failed. Please try again.');
  } finally {
    loading.value = false;
  }
};
</script>
