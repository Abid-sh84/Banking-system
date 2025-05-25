<template>
  <div class="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
    <h3 class="text-lg font-semibold mb-4">Banking Statistics</h3>
    
    <div v-if="loading" class="flex items-center justify-center py-6">
      <Loader2 class="h-6 w-6 text-primary animate-spin" />
    </div>
    
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- Transaction Volume Card -->
      <div class="stat-card p-4 border rounded-lg">
        <div class="flex items-center">
          <Activity class="h-5 w-5 text-blue-600 mr-2" />
          <h4 class="font-medium">Transaction Volume</h4>
        </div>
        
        <div class="mt-2">
          <div class="flex justify-between mb-1">
            <span class="text-xs text-gray-500">Total transactions</span>
            <span class="text-xs font-bold">{{ metrics.totalTransactions }}</span>
          </div>
          
          <div class="h-2 bg-gray-200 rounded-full">
            <div class="h-full bg-blue-600 rounded-full" :style="{ width: `${metrics.transactionProgress}%` }"></div>
          </div>
          
          <div class="flex justify-between mt-1">
            <span class="text-xs text-gray-600">{{ metrics.transactionTrend }}</span>
            <span 
              class="text-xs font-medium"
              :class="metrics.transactionChange >= 0 ? 'text-green-600' : 'text-red-600'"
            >
              {{ metrics.transactionChange >= 0 ? '+' : '' }}{{ metrics.transactionChange }}%
            </span>
          </div>
        </div>
      </div>
      
      <!-- Customer Growth Card -->
      <div class="stat-card p-4 border rounded-lg">
        <div class="flex items-center">
          <Users class="h-5 w-5 text-green-600 mr-2" />
          <h4 class="font-medium">Customer Growth</h4>
        </div>
        
        <div class="mt-2">
          <div class="flex justify-between mb-1">
            <span class="text-xs text-gray-500">Active customers</span>
            <span class="text-xs font-bold">{{ metrics.activeCustomers }}</span>
          </div>
          
          <div class="h-2 bg-gray-200 rounded-full">
            <div class="h-full bg-green-600 rounded-full" :style="{ width: `${metrics.customerProgress}%` }"></div>
          </div>
          
          <div class="flex justify-between mt-1">
            <span class="text-xs text-gray-600">{{ metrics.customerTrend }}</span>
            <span 
              class="text-xs font-medium"
              :class="metrics.customerChange >= 0 ? 'text-green-600' : 'text-red-600'"
            >
              {{ metrics.customerChange >= 0 ? '+' : '' }}{{ metrics.customerChange }}%
            </span>
          </div>
        </div>
      </div>
      
      <!-- Deposit-Withdrawal Ratio Card -->
      <div class="stat-card p-4 border rounded-lg">
        <div class="flex items-center">
          <LineChart class="h-5 w-5 text-purple-600 mr-2" />
          <h4 class="font-medium">Deposit-Withdrawal Ratio</h4>
        </div>
        
        <div class="flex items-center mt-2">
          <div class="relative flex-1 h-4 bg-gray-200 rounded-full mr-2">
            <div class="absolute left-0 top-0 h-full bg-green-500 rounded-l-full" :style="{ width: `${metrics.depositRatio}%` }"></div>
            <div class="absolute right-0 top-0 h-full bg-red-500 rounded-r-full" :style="{ width: `${100 - metrics.depositRatio}%` }"></div>
            <div class="absolute h-full w-[2px] bg-white left-1/2 transform -translate-x-1/2"></div>
          </div>
          <div class="flex-shrink-0 w-14">
            <span class="text-xs font-medium">
              {{ metrics.depositRatio }}:{{ 100 - metrics.depositRatio }}
            </span>
          </div>
        </div>
        
        <div class="flex justify-between text-xs mt-1">
          <span class="text-green-600">Deposits</span>
          <span class="text-red-600">Withdrawals</span>
        </div>
      </div>
      
      <!-- Transaction Success Rate -->
      <div class="stat-card p-4 border rounded-lg">
        <div class="flex items-center">
          <CheckCircle class="h-5 w-5 text-teal-600 mr-2" />
          <h4 class="font-medium">Transaction Success Rate</h4>
        </div>
        
        <div class="mt-2">
          <div class="flex justify-between items-center">
            <div class="relative w-14 h-14">
              <svg class="w-full h-full" viewBox="0 0 36 36">
                <path
                  class="stroke-current text-gray-200"
                  fill="none"
                  stroke-width="3"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  class="stroke-current text-teal-600"
                  fill="none"
                  stroke-width="3"
                  stroke-dasharray="100"
                  :stroke-dashoffset="100 - metrics.successRate"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  stroke-linecap="round"
                />
                <text x="18" y="20.35" class="text-xs font-medium" text-anchor="middle" fill="currentColor">
                  {{ metrics.successRate }}%
                </text>
              </svg>
            </div>
            
            <div class="flex-1 ml-4">
              <div class="text-xs text-gray-600 mb-1">Transaction Success</div>
              <div class="text-sm font-medium">
                {{ metrics.successfulTransactions }} successful transactions
              </div>
              <div class="text-xs text-gray-500 mt-1">
                {{ metrics.failedTransactions }} failed transactions
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Activity, Users, LineChart, CheckCircle, Loader2 } from 'lucide-vue-next';

const props = defineProps({
  customers: {
    type: Array,
    default: () => []
  },
  transactions: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
});

// Calculate metrics
const metrics = computed(() => {
  // Calculate total transactions
  const totalTransactions = props.transactions.length;
  
  // Calculate deposit/withdrawal ratio
  let deposits = 0;
  let withdrawals = 0;
  let successfulTransactions = 0;
  
  props.transactions.forEach(tx => {
    if (tx.type === 'deposit') {
      deposits++;
    } else if (tx.type === 'withdrawal' || tx.type === 'withdraw') {
      withdrawals++;
    }
    
    // Count successful transactions
    if (tx.status === 'completed' || tx.status === 'success' || !tx.status) {
      successfulTransactions++;
    }
  });
  
  const depositRatio = totalTransactions > 0 
    ? Math.round((deposits / totalTransactions) * 100) 
    : 50;
  
  // Calculate success rate
  const successRate = totalTransactions > 0 
    ? Math.round((successfulTransactions / totalTransactions) * 100)
    : 100;
  
  const failedTransactions = totalTransactions - successfulTransactions;
  
  // Calculate active customers (for demo purposes)
  const activeCustomers = props.customers.length;
  
  // Simulate trends and changes for demo purposes
  const transactionTrend = "vs. last month";
  const customerTrend = "vs. last month";
  const transactionChange = 12;
  const customerChange = 8;
  
  return {
    totalTransactions,
    transactionProgress: Math.min(100, totalTransactions > 0 ? 100 : 0),
    transactionTrend,
    transactionChange,
    activeCustomers,
    customerProgress: Math.min(100, activeCustomers > 0 ? 80 : 0),
    customerTrend,
    customerChange,
    depositRatio,
    successRate,
    successfulTransactions,
    failedTransactions
  };
});
</script>

<style scoped>
.stat-card {
  transition: all 0.2s ease;
}

.stat-card:hover {
  border-color: #6366f1;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.1);
}
</style>
