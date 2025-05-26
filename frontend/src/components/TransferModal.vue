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

          <!-- Transfer Form -->
          <div>
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
              <SendHorizonal class="h-6 w-6 text-blue-600" aria-hidden="true" />
            </div>
            <div class="mt-3 text-center sm:mt-5">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Transfer Money
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Send money to another bank account using phone number or account number
                </p>
              </div>
            </div>

            <div class="mt-5">
              <form @submit.prevent="verifyRecipient">
                <!-- Recipient Lookup Method Selection -->
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Search by</label>
                  <div class="flex">
                    <button 
                      type="button" 
                      @click="lookupMethod = 'phone'"
                      class="flex-1 py-2 px-3 border rounded-l-md text-sm"
                      :class="lookupMethod === 'phone' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white text-gray-700 border-gray-300'"
                    >
                      Phone Number
                    </button>
                    <button 
                      type="button" 
                      @click="lookupMethod = 'account'"
                      class="flex-1 py-2 px-3 border-t border-b border-r rounded-r-md text-sm"
                      :class="lookupMethod === 'account' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white text-gray-700 border-gray-300'"
                    >
                      Account Number
                    </button>
                  </div>
                </div>

                <!-- Phone/Account Input -->
                <div class="mb-4">
                  <label :for="lookupMethod === 'phone' ? 'phone' : 'account'" class="block text-sm font-medium text-gray-700 mb-1">
                    {{ lookupMethod === 'phone' ? 'Phone Number' : 'Account Number' }}
                  </label>
                  <input
                    :id="lookupMethod === 'phone' ? 'phone' : 'account'"
                    v-model="recipientIdentifier"
                    type="text"
                    :placeholder="lookupMethod === 'phone' ? 'Enter 10-digit phone number' : 'Enter account number'"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>

                <!-- Display found recipient -->
                <div v-if="recipientFound" class="mb-4 p-3 border border-green-200 bg-green-50 rounded-md">
                  <div class="flex items-start">
                    <div class="flex-shrink-0">
                      <CheckCircle class="h-5 w-5 text-green-400" />
                    </div>
                    <div class="ml-3">
                      <h3 class="text-sm font-medium text-green-800">Recipient Found</h3>
                      <div class="mt-2 text-sm text-green-700">
                        <p>Name: <span class="font-medium">{{ recipientData.name }}</span></p>
                        <p>Account: <span class="font-mono">{{ maskAccountNumber(recipientData.account_number) }}</span></p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Amount Input -->
                <div v-if="recipientFound" class="mb-4">
                  <label for="amount" class="block text-sm font-medium text-gray-700 mb-1">
                    Amount (₹)
                  </label>
                  <div class="relative rounded-md shadow-sm">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span class="text-gray-500 sm:text-sm">₹</span>
                    </div>
                    <input
                      id="amount"
                      v-model.number="amount"
                      type="number"
                      min="100"
                      step="100"
                      placeholder="0.00"
                      class="w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                    <div class="absolute inset-y-0 right-0 flex items-center">
                      <label for="currency" class="sr-only">Currency</label>
                      <span class="px-3 text-gray-500 sm:text-sm" id="currency">
                        INR
                      </span>
                    </div>
                  </div>
                  <p v-if="amount > availableBalance" class="mt-1 text-sm text-red-600">
                    Insufficient balance
                  </p>
                </div>

                <!-- Description -->
                <div v-if="recipientFound" class="mb-4">
                  <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
                    Description (optional)
                  </label>
                  <input
                    id="description"
                    v-model="description"
                    type="text"
                    placeholder="Add a note for this transfer"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <!-- Error Message -->
                <div v-if="errorMessage" class="mb-4 p-3 border border-red-200 bg-red-50 rounded-md">
                  <div class="flex items-start">
                    <div class="flex-shrink-0">
                      <AlertCircle class="h-5 w-5 text-red-400" />
                    </div>
                    <div class="ml-3">
                      <h3 class="text-sm font-medium text-red-800">Error</h3>
                      <div class="mt-2 text-sm text-red-700">
                        <p>{{ errorMessage }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Buttons -->
                <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    v-if="!recipientFound"
                    type="submit"
                    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                  >
                    <Loader2 v-if="loading" class="h-5 w-5 mr-2 animate-spin" />
                    Find Recipient
                  </button>
                  <button
                    v-else
                    type="button"
                    @click="submitTransfer"
                    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                    :disabled="amount <= 0 || amount > availableBalance || transferLoading"
                  >
                    <Loader2 v-if="transferLoading" class="h-5 w-5 mr-2 animate-spin" />
                    Transfer Money
                  </button>
                  <button
                    type="button"
                    @click="resetForm"
                    class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  >
                    {{ recipientFound ? 'Change Recipient' : 'Cancel' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { X, SendHorizonal, CheckCircle, AlertCircle, Loader2 } from 'lucide-vue-next';
import api from '../services/api';

const props = defineProps({
  modelValue: Boolean,
  availableBalance: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['update:modelValue', 'transfer-complete']);

const lookupMethod = ref('phone');
const recipientIdentifier = ref('');
const recipientFound = ref(false);
const recipientData = ref(null);
const amount = ref(0);
const description = ref('');
const loading = ref(false);
const transferLoading = ref(false);
const errorMessage = ref('');

// Reset form when modal is opened
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    resetForm();
  }
});

const closeModal = () => {
  emit('update:modelValue', false);
};

const resetForm = () => {
  recipientIdentifier.value = '';
  recipientFound.value = false;
  recipientData.value = null;
  amount.value = 0;
  description.value = '';
  errorMessage.value = '';
};

const verifyRecipient = async () => {
  try {
    loading.value = true;
    errorMessage.value = '';
    
    // Validate identifier
    if (lookupMethod.value === 'phone' && !isValidPhoneNumber(recipientIdentifier.value)) {
      errorMessage.value = 'Please enter a valid 10-digit phone number';
      return;
    }
    
    if (lookupMethod.value === 'account' && !recipientIdentifier.value.trim()) {
      errorMessage.value = 'Please enter an account number';
      return;
    }
    
    // Make API call to check recipient
    const response = await api.get('/customers/find-recipient', {
      params: {
        [lookupMethod.value]: recipientIdentifier.value
      }
    });
    
    if (response.data.success && response.data.data) {
      recipientData.value = response.data.data;
      recipientFound.value = true;
      errorMessage.value = '';
    } else {
      errorMessage.value = 'Recipient not found';
      recipientFound.value = false;
    }
  } catch (error) {
    console.error('Error finding recipient:', error);
    errorMessage.value = error.response?.data?.message || 'Failed to find recipient. Please try again.';
    recipientFound.value = false;
  } finally {
    loading.value = false;
  }
};

const submitTransfer = async () => {
  try {
    transferLoading.value = true;
    errorMessage.value = '';
    
    // Validate amount
    if (amount.value <= 0) {
      errorMessage.value = 'Amount must be greater than 0';
      return;
    }
    
    if (amount.value > props.availableBalance) {
      errorMessage.value = 'Insufficient balance for this transfer';
      return;
    }
    
    // Make API call to transfer money
    const response = await api.post('/customers/transfer', {
      recipientId: recipientData.value.id,
      amount: amount.value,
      description: description.value || `Transfer to ${recipientData.value.name}`
    });
    
    if (response.data.success) {
      emit('transfer-complete', {
        amount: amount.value,
        recipientName: recipientData.value.name,
        recipientAccount: recipientData.value.account_number,
        description: description.value,
        balance: response.data.data.balance
      });
      closeModal();
    } else {
      errorMessage.value = response.data.message || 'Transfer failed';
    }
  } catch (error) {
    console.error('Error transferring money:', error);
    errorMessage.value = error.response?.data?.message || 'Failed to complete transfer. Please try again.';
  } finally {
    transferLoading.value = false;
  }
};

// Helper functions
const isValidPhoneNumber = (phone) => {
  return /^\d{10}$/.test(phone);
};

const maskAccountNumber = (accountNumber) => {
  if (!accountNumber) return '';
  const len = accountNumber.length;
  if (len <= 4) return accountNumber;
  return '*'.repeat(len - 4) + accountNumber.slice(len - 4);
};
</script>
