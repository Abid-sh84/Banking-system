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
          
          <div>
            <div class="flex justify-center">
              <div class="h-12 w-12 rounded-full flex items-center justify-center"
                :class="statusBgClass">
                <component :is="statusIcon" class="h-6 w-6 text-white" />
              </div>
            </div>
            <div class="mt-3 text-center sm:mt-5">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                {{ title }}
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  {{ description }}
                </p>
              </div>
            </div>
          </div>
          
          <!-- Transaction Details -->
          <div class="mt-5 border-t border-gray-200 pt-4">
            <dl class="grid grid-cols-2 gap-x-4 gap-y-3">
              <div class="col-span-1">
                <dt class="text-sm font-medium text-gray-500">Transaction ID</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ transaction.id }}</dd>
              </div>
              <div class="col-span-1">
                <dt class="text-sm font-medium text-gray-500">Customer</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ transaction.customer_name }}</dd>
              </div>
              <div class="col-span-1">
                <dt class="text-sm font-medium text-gray-500">Type</dt>
                <dd class="mt-1 text-sm" :class="getTypeTextClass">
                  {{ formatTransactionType(transaction.type) }}
                </dd>
              </div>
              <div class="col-span-1">
                <dt class="text-sm font-medium text-gray-500">Amount</dt>
                <dd class="mt-1 text-sm font-medium" :class="getAmountTextClass">
                  {{ formatCurrency(transaction.amount) }}
                </dd>
              </div>
              <div class="col-span-2">
                <dt class="text-sm font-medium text-gray-500">Date</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ formatDate(transaction.transaction_date || transaction.created_at) }}</dd>
              </div>
              <div class="col-span-2">
                <dt class="text-sm font-medium text-gray-500">Description</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ transaction.description || 'No description provided' }}</dd>
              </div>
            </dl>
          </div>

          <!-- Reason field for rejection -->
          <div v-if="showReasonInput" class="mt-5">
            <label for="rejection-reason" class="block text-sm font-medium text-gray-700">
              Reason for Rejection
            </label>
            <textarea
              id="rejection-reason"
              v-model="reason"
              rows="3"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Provide a reason for rejection..."
            ></textarea>
          </div>
          
          <!-- Action Buttons -->
          <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <button
              v-if="transaction.status === 'pending'"
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:col-start-2 sm:text-sm"
              @click="approveTransaction"
              :disabled="processing"
            >
              <CheckIcon v-if="!processing" class="h-5 w-5 mr-1" />
              <Loader2 v-else class="h-5 w-5 mr-1 animate-spin" />
              Approve
            </button>
            <button
              v-else
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:col-start-2 sm:text-sm"
              @click="closeModal"
            >
              Done
            </button>
            <button
              v-if="transaction.status === 'pending'"
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:col-start-1 sm:text-sm"
              @click="showRejectConfirmation"
              :disabled="processing"
            >
              <XCircle v-if="!processing" class="h-5 w-5 mr-1" />
              <Loader2 v-else class="h-5 w-5 mr-1 animate-spin" />
              Reject
            </button>
            <button
              v-else
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:col-start-1 sm:text-sm"
              @click="closeModal"
            >
              Close
            </button>
          </div>
          
          <div v-if="error" class="mt-4 p-3 text-sm bg-red-50 text-red-700 rounded-md">
            {{ error }}
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { X, Loader2, Check as CheckIcon, XCircle, AlertCircle, CheckCircle } from 'lucide-vue-next';
import { bankerService } from '../services/api';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  transaction: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['update:modelValue', 'transactionUpdated']);

const processing = ref(false);
const error = ref('');
const showReasonInput = ref(false);
const reason = ref('');

const title = computed(() => {
  switch(props.transaction.status) {
    case 'pending': 
      return 'Review Transaction';
    case 'approved': 
      return 'Transaction Approved';
    case 'rejected': 
      return 'Transaction Rejected';
    default: 
      return 'Transaction Details';
  }
});

const description = computed(() => {
  switch(props.transaction.status) {
    case 'pending': 
      return 'Please review this transaction and decide whether to approve or reject it.';
    case 'approved': 
      return 'This transaction has been approved and processed successfully.';
    case 'rejected': 
      return `This transaction has been rejected. ${props.transaction.rejection_reason || ''}`;
    default: 
      return 'View the details of this transaction.';
  }
});

const statusIcon = computed(() => {
  switch(props.transaction.status) {
    case 'approved': return CheckCircle;
    case 'rejected': return XCircle;
    default: return AlertCircle;
  }
});

const statusBgClass = computed(() => {
  switch(props.transaction.status) {
    case 'pending': return 'bg-blue-500';
    case 'approved': return 'bg-green-500';
    case 'rejected': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
});

const getTypeTextClass = computed(() => {
  switch(props.transaction.type) {
    case 'deposit': return 'text-green-600';
    case 'withdrawal': return 'text-red-600';
    case 'transfer': return 'text-blue-600';
    default: return 'text-gray-600';
  }
});

const getAmountTextClass = computed(() => {
  switch(props.transaction.type) {
    case 'deposit': return 'text-green-600';
    case 'withdrawal': return 'text-red-600';
    default: return 'text-gray-900';
  }
});

const closeModal = () => {
  emit('update:modelValue', false);
  // Reset state
  error.value = '';
  showReasonInput.value = false;
  reason.value = '';
};

const formatCurrency = (value) => {
  if (typeof value !== 'number') return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
};

const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const formatTransactionType = (type) => {
  if (!type) return 'N/A';
  return type.charAt(0).toUpperCase() + type.slice(1);
};

const approveTransaction = async () => {
  if (!props.transaction.id) {
    error.value = 'Transaction ID is missing';
    return;
  }
  
  processing.value = true;
  error.value = '';
  
  try {
    // Call your API to approve the transaction
    const response = await bankerService.approveTransaction(props.transaction.id);
    
    if (response.data.success) {
      // Emit event to notify parent component of the update
      emit('transactionUpdated', {
        ...props.transaction,
        status: 'approved'
      });
      
      // Close the modal after a short delay to show success state
      setTimeout(() => {
        closeModal();
      }, 1500);
    } else {
      error.value = response.data.message || 'Failed to approve transaction';
    }
  } catch (err) {
    console.error('Error approving transaction:', err);
    error.value = err.response?.data?.message || 'An error occurred while approving the transaction';
  } finally {
    processing.value = false;
  }
};

const showRejectConfirmation = () => {
  showReasonInput.value = true;
};

const rejectTransaction = async () => {
  if (!props.transaction.id) {
    error.value = 'Transaction ID is missing';
    return;
  }
  
  if (!reason.value.trim()) {
    error.value = 'Please provide a reason for rejection';
    return;
  }
  
  processing.value = true;
  error.value = '';
  
  try {
    // Call your API to reject the transaction with reason
    const response = await bankerService.rejectTransaction(props.transaction.id, {
      reason: reason.value.trim()
    });
    
    if (response.data.success) {
      // Emit event to notify parent component of the update
      emit('transactionUpdated', {
        ...props.transaction,
        status: 'rejected',
        rejection_reason: reason.value.trim()
      });
      
      // Close the modal after a short delay to show success state
      setTimeout(() => {
        closeModal();
      }, 1500);
    } else {
      error.value = response.data.message || 'Failed to reject transaction';
    }
  } catch (err) {
    console.error('Error rejecting transaction:', err);
    error.value = err.response?.data?.message || 'An error occurred while rejecting the transaction';
  } finally {
    processing.value = false;
  }
};

// Watch for changes in the reason input when in rejection mode
watch(reason, () => {
  if (showReasonInput.value && reason.value.trim()) {
    error.value = '';
  }
});

watch(showReasonInput, (isVisible) => {
  if (isVisible) {
    // Reset error when showing the reason input
    error.value = '';
  }
});
</script>

<style scoped>
/* Additional styling if needed */
</style>
