<!-- filepath: c:\Users\Shamim shaikh\Desktop\Assignment\project\src\pages\CustomerDashboard.vue -->
<template>
  <div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">      <div v-if="loading" class="flex items-center justify-center py-12">
        <Loader2 class="h-12 w-12 text-primary animate-spin" />
      </div>
      
      <!-- Error display -->
      <div v-else-if="errorMessage" class="mb-8 bg-white shadow overflow-hidden sm:rounded-lg p-4">
        <div class="text-red-600 font-medium mb-2">Error loading data</div>
        <p class="text-gray-700">{{ errorMessage }}</p>
        <button 
          @click="fetchData" 
          class="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Retry
        </button>
      </div>
      
      <template v-else>
        <!-- Account Overview -->
        <div class="mb-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Account Overview
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Current balance and quick actions for your account.
            </p>
          </div>
          <div class="border-t border-gray-200">
            <dl>
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                  Current Balance
                </dt>
                <dd class="mt-1 text-2xl font-semibold text-primary sm:mt-0 sm:col-span-2">
                  {{ formatCurrency(balance) }}
                </dd>
              </div>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                  Quick Actions
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div class="flex flex-wrap gap-2">
                    <button 
                      @click="openTransactionModal('deposit')"
                      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <ArrowDownLeft class="h-4 w-4 mr-2" /> Deposit
                    </button>
                    <button 
                      @click="openTransactionModal('withdraw')"
                      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      :disabled="balance <= 0"
                    >
                      <ArrowUpRight class="h-4 w-4 mr-2" /> Withdraw
                    </button>
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        
        <!-- Transaction History -->
        <div class="mb-8 bg-white shadow sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Transaction History
              </h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">
                Recent activity on your account.
              </p>
            </div>
          </div>
          <div class="border-t border-gray-200">
            <TransactionList :transactions="transactions" />
          </div>
        </div>
        
        <!-- Account Stats -->
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <!-- Total Deposits -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-green-100 rounded-md p-3">
                  <DollarSign class="h-6 w-6 text-green-600" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Total Deposits
                    </dt>
                    <dd>
                      <div class="text-lg font-medium text-gray-900">
                        {{ formatCurrency(stats.totalDeposits) }}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Total Withdrawals -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-red-100 rounded-md p-3">
                  <DollarSign class="h-6 w-6 text-red-600" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Total Withdrawals
                    </dt>
                    <dd>
                      <div class="text-lg font-medium text-gray-900">
                        {{ formatCurrency(stats.totalWithdrawals) }}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Last Activity -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-blue-100 rounded-md p-3">
                  <Calendar class="h-6 w-6 text-blue-600" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Last Activity
                    </dt>
                    <dd>
                      <div class="text-lg font-medium text-gray-900">
                        {{ lastActivity ? formatDate(lastActivity) : 'No activity yet' }}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    
    <!-- Transaction Modal -->
    <TransactionModal
      v-model="modalOpen"
      :transaction-type="transactionType"
      :current-balance="balance"
      @transaction-completed="handleTransactionComplete"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '../stores/authStore';
import TransactionList from '../components/TransactionList.vue';
import TransactionModal from '../components/TransactionModal.vue';
import { ArrowDownLeft, ArrowUpRight, DollarSign, Calendar, Loader2 } from 'lucide-vue-next';
import api from '../services/api';

const authStore = useAuthStore();
const toast = useToast();

// Initialize with default values
const balance = ref(0);
const transactions = ref([]);
const loading = ref(true);
const modalOpen = ref(false);
const transactionType = ref('deposit');
const errorMessage = ref('');

// Fetch data on component mount
onMounted(async () => {
  console.log('CustomerDashboard mounted, fetching data...');
  await fetchData();
});

const fetchData = async () => {
  try {
    loading.value = true;
    errorMessage.value = '';
    
    // Check if authenticated
    if (!authStore.isAuthenticated) {
      errorMessage.value = 'You must be logged in to view this page';
      return;
    }
    
    try {
      // Fetch account balance and profile
      const profileResponse = await api.get('/customers/profile');
      console.log('Profile response:', profileResponse.data);
      balance.value = profileResponse.data.data.balance || 0;
    } catch (profileErr) {
      console.error('Error fetching profile:', profileErr);
      errorMessage.value = 'Failed to load profile data: ' + 
        (profileErr.response?.data?.message || profileErr.message || 'Unknown error');
      return;
    }
      try {
      // Fetch transactions
      const transactionsResponse = await api.get('/customers/transactions');
      console.log('Transactions response:', transactionsResponse.data);
      
      // Make sure transactions is an array
      if (transactionsResponse.data && transactionsResponse.data.data) {
        if (Array.isArray(transactionsResponse.data.data)) {
          transactions.value = transactionsResponse.data.data;
        } else {
          console.error('Transactions data is not an array:', transactionsResponse.data);
          transactions.value = [];
        }
      } else {
        console.error('Invalid transaction response structure:', transactionsResponse.data);
        transactions.value = [];
      }
    } catch (transactionErr) {
      console.error('Error fetching transactions:', transactionErr);
      errorMessage.value = 'Failed to load transaction data: ' + 
        (transactionErr.response?.data?.message || transactionErr.message || 'Unknown error');
      transactions.value = [];
    }
    
  } catch (error) {
    console.error('Error fetching data:', error);
    errorMessage.value = 'Failed to load account data: ' + 
      (error.response?.data?.message || error.message || 'Unknown error');
  } finally {
    loading.value = false;
  }
};

// Computed properties for statistics
const stats = computed(() => {
  if (!transactions.value || !Array.isArray(transactions.value)) {
    return { totalDeposits: 0, totalWithdrawals: 0 };
  }
  
  const deposits = transactions.value
    .filter(t => t && (t.type === 'deposit'))
    .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
    
  const withdrawals = transactions.value
    .filter(t => t && (t.type === 'withdraw' || t.type === 'withdrawal'))
    .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
    
  return {
    totalDeposits: deposits,
    totalWithdrawals: withdrawals
  };
});

const lastActivity = computed(() => {
  if (!transactions.value || !Array.isArray(transactions.value) || transactions.value.length === 0) {
    return null;
  }
  
  // Sort transactions by date (newest first) and get the most recent one
  const sortedTransactions = [...transactions.value]
    .filter(t => t && (t.created_at || t.date))
    .sort((a, b) => {
      const dateA = new Date(a.created_at || a.date);
      const dateB = new Date(b.created_at || b.date);
      return dateB - dateA;
    });
  
  return sortedTransactions.length > 0 ? (sortedTransactions[0].created_at || sortedTransactions[0].date) : null;
});

// Helper methods
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Modal functions
const openTransactionModal = (type) => {
  transactionType.value = type;
  modalOpen.value = true;
};

// Transaction types in the UI might not match backend expectations
const mapTransactionType = (uiType) => {
  const typeMap = {
    'withdraw': 'withdrawal',
    'deposit': 'deposit'
  };
  return typeMap[uiType] || uiType;
};

const handleTransactionComplete = async (transaction) => {
  try {
    console.log('Processing transaction:', transaction);
    
    // Map withdraw to withdrawal for backend compatibility
    const transactionType = mapTransactionType(transaction.type);
    
    // Make API call to process transaction
    const response = await api.post('/customers/transactions', {
      type: transactionType,
      amount: parseFloat(transaction.amount),
      description: `${transaction.type} transaction`
    });
    
    console.log('Transaction response:', response.data);
    
    // Update local balance 
    if (response.data.data.balance !== undefined) {
      balance.value = response.data.data.balance;
    }
    
    // Add new transaction to the list
    if (response.data.data.transaction) {
      const newTransaction = response.data.data.transaction;
      transactions.value = Array.isArray(transactions.value) 
        ? [newTransaction, ...transactions.value] 
        : [newTransaction];
    } else {
      // Refresh transactions if the server didn't return the new transaction
      await fetchData();
    }
    
    toast.success(`${transaction.type} successful!`);
    
  } catch (error) {
    console.error('Transaction error:', error);
    const errorMessage = error.response?.data?.message || 'Transaction failed. Please try again.';
    toast.error(errorMessage);
  }
};
</script>

<style scoped>
.text-primary {
  color: #3b82f6;
}
.bg-primary {
  background-color: #3b82f6;
}
.animate-spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
