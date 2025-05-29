<!-- TransactionList component -->
<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-md">
    <ul class="divide-y divide-gray-200">
      <li v-if="!transactions || transactions.length === 0" class="px-6 py-4 text-center text-gray-500">
        No transactions to display
      </li>      <li 
        v-for="transaction in safeTransactions" 
        :key="transaction.id" 
        class="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
        @click="$emit('view-transaction', transaction)"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="rounded-full p-2" :class="getTransactionTypeClass(transaction.type).bgClass">
              <component 
                :is="getTransactionTypeClass(transaction.type).icon" 
                class="h-5 w-5" 
                :class="getTransactionTypeClass(transaction.type).iconClass" 
              />
            </div>
            <div>              
              <p class="text-sm font-medium text-gray-900 capitalize">
                {{ getFormattedTransactionType(transaction.type) }}
              </p>
              <p class="text-sm text-gray-500">
                {{ formatDate(transaction.created_at || transaction.date) }}
              </p>
              <!-- Show recipient for transfers -->
              <p v-if="isTransferTransaction(transaction) && transaction.recipient_name" class="text-xs text-gray-500 mt-1">
                To: {{ transaction.recipient_name }}
              </p>
            </div>
          </div>
          <div class="text-right">
            <p class="text-sm font-semibold" :class="getTransactionTypeClass(transaction.type).amountClass">
              {{ getAmountPrefix(transaction.type) }}{{ formatCurrency(transaction.amount) }}
            </p>
            <p class="text-sm text-gray-500">
              Balance: {{ formatCurrency(transaction.balance_after || 0) }}
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed } from 'vue';
import { ArrowUpRight, ArrowDownLeft, Send, ArrowDownRight } from 'lucide-vue-next';

const props = defineProps({
  transactions: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['view-transaction']);

// Filter out any invalid transactions to prevent errors
const safeTransactions = computed(() => {
  if (!props.transactions || !Array.isArray(props.transactions)) {
    return [];
  }
  return props.transactions.filter(t => t && typeof t === 'object' && t.id);
});

const getTransactionTypeClass = (type) => {
  switch (type) {
    case 'deposit':
      return {
        bgClass: 'bg-green-50',
        iconClass: 'text-green-500',
        amountClass: 'text-green-600',
        icon: ArrowDownLeft
      };
    case 'withdraw':
    case 'withdrawal':
      return {
        bgClass: 'bg-red-50',
        iconClass: 'text-red-500',
        amountClass: 'text-red-600',
        icon: ArrowUpRight
      };
    case 'transfer':
    case 'transfer_out':
      return {
        bgClass: 'bg-blue-50',
        iconClass: 'text-blue-500',
        amountClass: 'text-blue-600',
        icon: Send
      };
    case 'transfer_in':
      return {
        bgClass: 'bg-green-50',
        iconClass: 'text-green-500',
        amountClass: 'text-green-600',
        icon: ArrowDownRight
      };
    default:
      return {
        bgClass: 'bg-gray-50',
        iconClass: 'text-gray-500',
        amountClass: 'text-gray-600',
        icon: ArrowDownLeft
      };
  }
};

const getAmountPrefix = (type) => {
  if (type === 'deposit' || type === 'transfer_in') {
    return '+ ';
  } else if (type === 'withdrawal' || type === 'withdraw' || type === 'transfer_out' || type === 'transfer') {
    return '- ';
  }
  return '';
};

// Custom rupee icon component if needed
const RupeeIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-indian-rupee">
      <path d="M6 3h12"></path>
      <path d="M6 8h12"></path>
      <path d="m6 13 8.5 8"></path>
      <path d="M6 13h3"></path>
      <path d="M9 13c6.667 0 6.667-10 0-10"></path>
    </svg>
  `
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2
  }).format(amount);
};

const formatDate = (dateString) => {
  if (!dateString) return 'Unknown date';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Helper function to check if transaction is a transfer
const isTransferTransaction = (transaction) => {
  return transaction.type === 'transfer' || 
         transaction.type === 'transfer_out' || 
         transaction.type === 'transfer_in';
};

// Get formatted transaction type for display
const getFormattedTransactionType = (type) => {
  const typeMap = {
    'deposit': 'Deposit',
    'withdrawal': 'Withdrawal',
    'withdraw': 'Withdrawal',
    'transfer': 'Transfer',
    'transfer_out': 'Money Sent',
    'transfer_in': 'Money Received'
  };
  return typeMap[type] || type;
};
</script>
