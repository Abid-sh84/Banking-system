<!-- filepath: c:\Users\Shamim shaikh\Desktop\Assignment\project\frontend\src\components\DepositsTable.vue -->
<template>
  <div class="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100">
    <div class="px-6 py-5">
      <h3 class="text-lg font-semibold text-gray-900 flex items-center">
        <component :is="Landmark" class="h-5 w-5 mr-2 text-primary" />
        My Deposits
      </h3>
      <p class="mt-1 text-sm text-gray-500">
        View and manage all your active deposits
      </p>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Interest
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Start Date
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Maturity Date
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-if="loading">
            <td colspan="6" class="px-6 py-4">
              <div class="flex justify-center items-center">
                <Loader2 class="h-5 w-5 text-primary animate-spin mr-2" />
                <span class="text-gray-500">Loading deposits...</span>
              </div>
            </td>
          </tr>
          <tr v-else-if="deposits.length === 0">
            <td colspan="6" class="px-6 py-12 text-center">
              <div class="text-center">
                <div class="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-3">
                  <component :is="Wallet" class="h-6 w-6 text-gray-400" />
                </div>
                <p class="text-sm text-gray-500 mb-2">No deposits found</p>
                <button 
                  @click="$emit('create-deposit')" 
                  class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-primary bg-primary-50 hover:bg-primary-100"
                >
                  <Plus class="h-4 w-4 mr-1" /> Create a new deposit
                </button>
              </div>
            </td>
          </tr>
          <tr v-for="deposit in deposits" :key="deposit.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full"
                  :class="getDepositTypeClass(deposit.type).bgClass">
                  <component 
                    :is="getDepositTypeClass(deposit.type).icon" 
                    class="h-4 w-4" 
                    :class="getDepositTypeClass(deposit.type).textClass"
                  />
                </div>
                <div class="ml-3">
                  <div class="text-sm font-medium text-gray-900">
                    {{ formatDepositType(deposit.type) }}
                  </div>
                  <div class="text-xs text-gray-500">
                    {{ deposit.description || 'No description' }}
                  </div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ formatCurrency(deposit.amount) }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-green-600 font-semibold">{{ deposit.interest_rate }}%</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatDate(deposit.start_date) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatDate(deposit.maturity_date) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="{
                  'bg-green-100 text-green-800': deposit.status === 'active',
                  'bg-blue-100 text-blue-800': deposit.status === 'matured',
                  'bg-yellow-100 text-yellow-800': deposit.status === 'pending',
                  'bg-red-100 text-red-800': deposit.status === 'broken'
                }">
                {{ formatStatus(deposit.status) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div v-if="deposits.length > 0" class="px-6 py-4 border-t border-gray-200">
      <button 
        @click="$emit('create-deposit')" 
        class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-primary bg-primary-50 hover:bg-primary-100"
      >
        <Plus class="h-4 w-4 mr-1" /> Create a new deposit
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { Landmark, Wallet, Plus, Loader2, Timer, Banknote, Bookmark, CreditCard } from 'lucide-vue-next';

const props = defineProps({
  deposits: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
});

defineEmits(['create-deposit']);

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2
  }).format(value);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const formatDepositType = (type) => {
  switch (type) {
    case 'fixed': return 'Fixed Deposit';
    case 'recurring': return 'Recurring Deposit';
    case 'savings': return 'Savings Deposit';
    case 'tax_saving': return 'Tax Saving FD';
    default: return type;
  }
};

const formatStatus = (status) => {
  switch (status) {
    case 'active': return 'Active';
    case 'matured': return 'Matured';
    case 'pending': return 'Pending';
    case 'broken': return 'Broken';
    default: return status;
  }
};

const getDepositTypeClass = (type) => {
  switch (type) {
    case 'fixed':
      return {
        icon: Timer,
        bgClass: 'bg-blue-100',
        textClass: 'text-blue-600'
      };
    case 'recurring':
      return {
        icon: CreditCard,
        bgClass: 'bg-green-100',
        textClass: 'text-green-600'
      };
    case 'savings':
      return {
        icon: Banknote,
        bgClass: 'bg-purple-100',
        textClass: 'text-purple-600'
      };
    case 'tax_saving':
      return {
        icon: Bookmark,
        bgClass: 'bg-yellow-100',
        textClass: 'text-yellow-600'
      };
    default:
      return {
        icon: Wallet,
        bgClass: 'bg-gray-100',
        textClass: 'text-gray-600'
      };
  }
};
</script>
