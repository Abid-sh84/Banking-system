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
        <div class="mb-8 bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
          <div class="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-5 sm:px-6 text-white">
            <div class="flex justify-between items-center">
              <div>
                <h3 class="text-xl font-bold">
                  Account Overview
                </h3>
                <p class="mt-1 max-w-2xl text-sm text-blue-100">
                  Current balance and quick actions for your account.
                </p>
              </div>
              <div class="h-12 w-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                <CreditCard class="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
          
          <div class="p-6">
            <div class="mb-8">
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium text-gray-500">Available Balance</span>
                <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Updated Just Now</span>
              </div>
              <div class="text-3xl font-bold text-gray-900">
                {{ formatCurrency(balance) }}
              </div>
              <div class="mt-1 text-sm text-gray-500 flex items-center">
                <span class="inline-block h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                <span>Active Account</span>
              </div>
              
              <div class="mt-4">
                <button 
                  @click="showCardViewModal = true"
                  class="inline-flex items-center px-3 py-2 border border-indigo-500 text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  <CreditCard class="h-4 w-4 mr-2" />
                  View your debit card
                </button>
              </div>
            </div>
            
            <div class="flex flex-col md:flex-row gap-4 mb-6">
              <div class="flex-1 bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div class="flex items-center">
                  <div class="h-10 w-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-500">Account Type</div>
                    <div class="flex items-center">
                      <span
                        class="px-3 py-1 rounded-full text-sm font-medium" 
                        :class="{
                          'bg-blue-100 text-blue-800': customerData?.account_type === 'savings',
                          'bg-green-100 text-green-800': customerData?.account_type === 'current',
                          'bg-purple-100 text-purple-800': customerData?.account_type === 'fixed'
                        }"
                      >
                        {{ accountTypeFormatted }}
                      </span>
                    </div>
                    <div class="text-xs text-gray-500 mt-1">{{ accountTypeDescription }}</div>
                  </div>
                </div>
              </div>
              
              <div class="flex-1 bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div class="text-sm font-medium text-gray-500 mb-3">Quick Actions</div>
                <div class="flex flex-wrap gap-2">
                  <button 
                    @click="openTransactionModal('deposit')"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
                  >
                    <ArrowDownLeft class="h-4 w-4 mr-2" /> Deposit
                  </button>
                  <button 
                    @click="openTransactionModal('withdraw')"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                    :disabled="balance <= 0"
                  >
                    <ArrowUpRight class="h-4 w-4 mr-2" /> Withdraw
                  </button>
                  <button 
                    @click="openTransferModal"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    :disabled="balance <= 0"
                  >
                    <Send class="h-4 w-4 mr-2" /> Transfer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Transaction History -->
        <div class="mb-8 bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
          <div class="px-6 py-5 flex justify-between items-center">
            <div>
              <h3 class="text-xl font-bold text-gray-900 flex items-center">
                <ClipboardList class="h-5 w-5 mr-2 text-blue-500" /> 
                Transaction History
              </h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">
                Recent activity on your account.
              </p>
            </div>
            <div>
              <div class="inline-flex rounded-md shadow-sm">
                <button type="button" class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <Filter class="h-4 w-4 mr-1" />
                  Filter
                </button>
                <button type="button" class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ml-2">
                  <Download class="h-4 w-4 mr-1" />
                  Export
                </button>
              </div>
            </div>
          </div>
          <div class="border-t border-gray-100">
            <TransactionList :transactions="transactions" />
          </div>
          <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
            <span class="text-sm text-gray-500">Showing recent transactions</span>
            <button class="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center">
              View All Transactions
              <ChevronRight class="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
          <!-- Account Stats -->
        <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <BarChart3 class="h-5 w-5 mr-2 text-blue-500" /> 
          Financial Overview
        </h3>
        
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <!-- Total Deposits -->
          <div class="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-gradient-to-br from-green-400 to-green-500 rounded-lg p-3 shadow-md">
                  <ArrowDownLeft class="h-6 w-6 text-white" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Total Deposits
                    </dt>
                    <dd>
                      <div class="text-lg font-bold text-gray-900">
                        {{ formatCurrency(stats.totalDeposits) }}
                      </div>
                      <div class="text-xs text-green-600 font-medium flex items-center">
                        <TrendingUp class="h-3 w-3 mr-1" />
                        <span>+4.5% this month</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Total Withdrawals -->
          <div class="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-gradient-to-br from-red-400 to-red-500 rounded-lg p-3 shadow-md">
                  <ArrowUpRight class="h-6 w-6 text-white" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Total Withdrawals
                    </dt>
                    <dd>
                      <div class="text-lg font-bold text-gray-900">
                        {{ formatCurrency(stats.totalWithdrawals) }}
                      </div>
                      <div class="text-xs text-red-600 font-medium flex items-center">
                        <TrendingDown class="h-3 w-3 mr-1" />
                        <span>-2.3% this month</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Net Balance -->
          <div class="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg p-3 shadow-md">
                  <Wallet class="h-6 w-6 text-white" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Net Balance
                    </dt>
                    <dd>
                      <div class="text-lg font-bold text-gray-900">
                        {{ formatCurrency(stats.totalDeposits - stats.totalWithdrawals) }}
                      </div>
                      <div class="text-xs text-blue-600 font-medium flex items-center">
                        <Activity class="h-3 w-3 mr-1" />
                        <span>Current status</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Last Activity -->
          <div class="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
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
    
    <!-- Financial Health Card -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div class="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100 mb-8">
        <div class="px-6 py-5 flex justify-between items-center border-b border-gray-100">
          <div>
            <h3 class="text-xl font-bold text-gray-900 flex items-center">
              <Activity class="h-5 w-5 mr-2 text-blue-500" /> 
              Financial Health
            </h3>
          </div>
          <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Updated Today</span>
        </div>
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <div class="h-10 w-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                <Smile class="h-6 w-6" />
              </div>
              <div>
                <div class="text-sm font-medium text-gray-900">Your account is in good standing</div>
                <div class="text-xs text-gray-500">Regular deposits help maintain financial stability</div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-sm font-medium text-gray-500">Health Score</div>
              <div class="text-lg font-bold text-green-600">87/100</div>
            </div>
          </div>
          
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div class="bg-green-600 h-2.5 rounded-full" style="width: 87%"></div>
          </div>
          
          <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div class="text-xs font-medium text-gray-500 mb-1">Saving Rate</div>
              <div class="text-lg font-bold text-blue-600">23%</div>
              <div class="text-xs text-gray-500">of monthly income</div>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div class="text-xs font-medium text-gray-500 mb-1">Monthly Spending</div>
              <div class="text-lg font-bold text-red-600">₹24,500</div>
              <div class="text-xs text-gray-500">average last 3 months</div>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div class="text-xs font-medium text-gray-500 mb-1">Next Goal</div>
              <div class="text-lg font-bold text-purple-600">₹1,00,000</div>
              <div class="text-xs text-gray-500">emergency fund</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Virtual Debit Card Section -->
    <VirtualCardSection />
    
    <!-- Transaction Modal -->
    <TransactionModal 
      v-model="modalOpen"
      :transaction-type="transactionType" 
      @transaction-complete="handleTransactionComplete"
    />

    <!-- Transfer Modal -->
    <TransferModal
      v-model="transferModalOpen"
      :available-balance="balance"
      @transfer-complete="handleTransferComplete"
    />
    
    <!-- Card View Modal -->
    <CardViewModal 
      v-model="showCardViewModal"
      :card-data="virtualCard"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '../stores/authStore';
import TransactionList from '../components/TransactionList.vue';
import TransactionModal from '../components/TransactionModal.vue';
import VirtualCardSection from '../components/VirtualCardSection.vue';
import CardViewModal from '../components/CardViewModal.vue';
import TransferModal from '../components/TransferModal.vue';
import { 
  ArrowDownLeft, 
  ArrowUpRight, 
  Send,
  Loader2, 
  CreditCard, 
  ClipboardList, 
  Filter, 
  Download, 
  ChevronRight,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Wallet,
  Activity,
  Smile
} from 'lucide-vue-next';
import api from '../services/api';
import { cardService } from '../services/api';

const authStore = useAuthStore();
const toast = useToast();

// Initialize with default values
const balance = ref(0);
const transactions = ref([]);
const loading = ref(true);
const modalOpen = ref(false);
const transactionType = ref('deposit');
const errorMessage = ref('');
const customerData = ref(null);
const showCardViewModal = ref(false);
const virtualCard = ref(null);
const transferModalOpen = ref(false); // New state for transfer modal

// Fetch data on component mount
onMounted(async () => {
  console.log('CustomerDashboard mounted, fetching data...');
  await fetchData();
  await fetchCardData();
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
      
      // Extract and save the full customer data
      if (profileResponse.data && profileResponse.data.data) {
        customerData.value = profileResponse.data.data;
        balance.value = profileResponse.data.data.balance || 0;
      } else {
        console.error('Invalid profile response structure:', profileResponse.data);
        errorMessage.value = 'Failed to parse profile data.';
        return;
      }
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

// Fetch virtual card data
const fetchCardData = async () => {
  try {
    const response = await cardService.getMyCard();
    if (response.data && response.data.success) {
      virtualCard.value = response.data.data.card;
    }
  } catch (err) {
    // 404 is expected if user hasn't applied for a card yet
    if (err.response && err.response.status === 404) {
      virtualCard.value = null;
    } else {
      console.error('Error fetching virtual card data:', err);
    }
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
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2
  }).format(amount);
};

// Account Type computed properties
const accountTypeFormatted = computed(() => {
  if (!customerData.value) return 'Standard Account';
  
  switch (customerData.value.account_type) {
    case 'savings': return 'Savings Account';
    case 'current': return 'Current Account';
    case 'fixed': return 'Fixed Deposit';
    default: return 'Standard Account';
  }
});

const accountTypeDescription = computed(() => {
  if (!customerData.value) return 'Basic banking account';
  
  switch (customerData.value.account_type) {
    case 'savings': 
      return '4.5% Interest | Min Balance: ₹1,000';
    case 'current': 
      return 'No Interest | Min Balance: ₹5,000';
    case 'fixed': 
      return '7.5% Interest | Min Deposit: ₹10,000';
    default:
      return '';
  }
});

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

// Open transfer modal
const openTransferModal = () => {
  transferModalOpen.value = true;
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
    toast.error(error.response?.data?.message || 'Failed to process transaction');
  }
};

// Handle successful money transfer
const handleTransferComplete = async (transferData) => {
  try {
    console.log('Transfer completed:', transferData);
    
    // Update balance from the transfer response
    if (transferData.balance !== undefined) {
      balance.value = transferData.balance;
    }
    
    // Create a transaction object to add to the list
    const newTransaction = {
      id: Date.now(), // Temporary ID until we refresh
      type: 'transfer_out',
      amount: transferData.amount,
      description: transferData.description || `Transfer to ${transferData.recipientName}`,
      created_at: new Date().toISOString(),
      status: 'completed',
      recipient_name: transferData.recipientName,
      recipient_account: transferData.recipientAccount
    };
    
    // Add to transactions list
    transactions.value = Array.isArray(transactions.value) 
      ? [newTransaction, ...transactions.value] 
      : [newTransaction];
    
    // Show success message
    toast.success(`₹${transferData.amount.toLocaleString('en-IN')} successfully transferred to ${transferData.recipientName}`);
    
    // Refresh data to get latest transactions
    setTimeout(() => fetchData(), 1000);
    
  } catch (error) {
    console.error('Error handling transfer completion:', error);
    toast.error('There was an issue updating your dashboard after the transfer');
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
