<!-- filepath: c:\Users\Shamim shaikh\Desktop\Assignment\project\frontend\src\components\DepositsOverview.vue -->
<template>
  <div class="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100">
    <div class="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 flex items-center">
          <component :is="Landmark" class="h-5 w-5 mr-2 text-primary" />
          Customer Deposits
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          Overview of all deposits in the bank
        </p>
      </div>
      <div class="flex space-x-2">
        <button 
          @click="$emit('refresh')" 
          class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <RefreshCw class="h-4 w-4 mr-1" />
          Refresh
        </button>
        <button 
          @click="$emit('export')" 
          class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <Download class="h-4 w-4 mr-1" />
          Export
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 p-6 border-b border-gray-200">
      <div class="bg-green-50 p-4 rounded-lg border border-green-100">
        <div class="text-sm font-medium text-gray-500 mb-1">Total Deposits</div>
        <div class="text-2xl font-bold text-gray-900">{{ formatCurrency(depositMetrics.totalAmount) }}</div>
        <div class="mt-1 text-xs text-green-600 flex items-center">
          <TrendingUp class="h-3 w-3 mr-1" />
          <span>{{ depositMetrics.totalCount }} accounts</span>
        </div>
      </div>
      
      <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <div class="text-sm font-medium text-gray-500 mb-1">Fixed Deposits</div>
        <div class="text-2xl font-bold text-gray-900">{{ formatCurrency(depositMetrics.fixedAmount) }}</div>
        <div class="mt-1 text-xs text-blue-600 flex items-center">
          <TrendingUp class="h-3 w-3 mr-1" />
          <span>{{ depositMetrics.fixedCount }} accounts</span>
        </div>
      </div>
      
      <div class="bg-purple-50 p-4 rounded-lg border border-purple-100">
        <div class="text-sm font-medium text-gray-500 mb-1">Recurring Deposits</div>
        <div class="text-2xl font-bold text-gray-900">{{ formatCurrency(depositMetrics.recurringAmount) }}</div>
        <div class="mt-1 text-xs text-purple-600 flex items-center">
          <TrendingUp class="h-3 w-3 mr-1" />
          <span>{{ depositMetrics.recurringCount }} accounts</span>
        </div>
      </div>
      
      <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
        <div class="text-sm font-medium text-gray-500 mb-1">Tax Saving Deposits</div>
        <div class="text-2xl font-bold text-gray-900">{{ formatCurrency(depositMetrics.taxSavingAmount) }}</div>
        <div class="mt-1 text-xs text-yellow-600 flex items-center">
          <TrendingUp class="h-3 w-3 mr-1" />
          <span>{{ depositMetrics.taxSavingCount }} accounts</span>
        </div>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Interest Rate
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
            <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-if="loading">
            <td colspan="8" class="px-6 py-4">
              <div class="flex justify-center items-center">
                <Loader2 class="h-5 w-5 text-primary animate-spin mr-2" />
                <span class="text-gray-500">Loading deposits...</span>
              </div>
            </td>
          </tr>
          <tr v-else-if="deposits.length === 0">
            <td colspan="8" class="px-6 py-12 text-center">
              <div class="text-center">
                <div class="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-3">
                  <component :is="Wallet" class="h-6 w-6 text-gray-400" />
                </div>
                <p class="text-sm text-gray-500 mb-2">No deposits found</p>
              </div>
            </td>
          </tr>
          <tr v-for="deposit in deposits" :key="deposit.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <User class="h-4 w-4" />
                </div>
                <div class="ml-3">
                  <div class="text-sm font-medium text-gray-900">{{ deposit.customer_name || 'Unknown' }}</div>
                  <div class="text-xs text-gray-500">{{ deposit.account_number || 'N/A' }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="h-6 w-6 rounded-full"
                  :class="getDepositTypeClass(deposit.type).bgClass">
                  <component 
                    :is="getDepositTypeClass(deposit.type).icon" 
                    class="h-4 w-4" 
                    :class="getDepositTypeClass(deposit.type).textClass"
                  />
                </div>
                <div class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatDepositType(deposit.type) }}
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
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button @click="$emit('view-deposit', deposit)" class="text-indigo-600 hover:text-indigo-900 mr-3">
                View
              </button>
              <button @click="$emit('edit-deposit', deposit)" class="text-blue-600 hover:text-blue-900">
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="px-6 py-3 flex justify-between items-center bg-gray-50 border-t border-gray-200">
      <div class="text-sm text-gray-500">
        Showing {{ deposits.length }} of {{ totalDeposits }} deposits
      </div>
      <div class="flex space-x-2">
        <button 
          class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          :disabled="currentPage <= 1"
          @click="$emit('page-change', currentPage - 1)"
        >
          Previous
        </button>
        <button 
          class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          :disabled="currentPage >= totalPages"
          @click="$emit('page-change', currentPage + 1)"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { 
  Landmark, Wallet, RefreshCw, Download, TrendingUp, 
  User, Timer, Banknote, Bookmark, CreditCard, Loader2 
} from 'lucide-vue-next';

const props = defineProps({
  deposits: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  totalDeposits: {
    type: Number,
    default: 0
  },
  currentPage: {
    type: Number,
    default: 1
  },
  totalPages: {
    type: Number,
    default: 1
  },
  depositMetrics: {
    type: Object,
    default: () => ({
      totalAmount: 0,
      totalCount: 0,
      fixedAmount: 0,
      fixedCount: 0,
      recurringAmount: 0,
      recurringCount: 0,
      taxSavingAmount: 0,
      taxSavingCount: 0
    })
  }
});

defineEmits([
  'refresh', 
  'export', 
  'view-deposit', 
  'edit-deposit', 
  'page-change'
]);

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
