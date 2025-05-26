<!-- filepath: c:\Users\Shamim shaikh\Desktop\Assignment\project\src\pages\CustomerDetails.vue -->
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div v-if="loading" class="flex items-center justify-center py-12">
      <Loader2 class="h-12 w-12 text-indigo-600 animate-spin" />
    </div>
    
    <template v-else>
      <!-- Back button -->
      <div class="mb-6">
        <router-link 
          to="/banker/dashboard" 
          class="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          <ArrowLeft class="h-4 w-4 mr-1" />
          Back to Dashboard
        </router-link>
      </div>
      
      <!-- Customer Profile -->
      <div class="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Customer Information
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Personal details and account information.
            </p>
          </div>
          <span 
            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
          >
            Active
          </span>
        </div>
        <div class="border-t border-gray-200">
          <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Full name</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ customer.name }}</dd>
            </div>            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Email address</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ customer.email }}</dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Customer ID</dt>
              <dd class="mt-1 text-sm font-medium text-gray-900 sm:mt-0 sm:col-span-2 font-mono">
                {{ customer.customer_id || 'Not available' }}
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Account Number</dt>
              <dd class="mt-1 text-sm font-medium text-gray-900 sm:mt-0 sm:col-span-2 font-mono">
                {{ customer.account_number }}
              </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Account Type</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span 
                  class="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full" 
                  :class="{
                    'bg-blue-100 text-blue-800': customer.account_type === 'savings',
                    'bg-green-100 text-green-800': customer.account_type === 'current',
                    'bg-purple-100 text-purple-800': customer.account_type === 'fixed',
                    'bg-gray-100 text-gray-800': !customer.account_type
                  }"
                >
                  {{ formatAccountType(customer.account_type) }}
                </span>
                <span class="ml-2 text-xs text-gray-500">
                  {{ getAccountTypeDescription(customer.account_type) }}
                </span>
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Phone Number</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ customer.phone || 'Not provided' }}
              </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Address</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ customer.address || 'Address not provided' }}
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Account Balance</dt>
              <dd class="mt-1 text-sm font-medium text-gray-900 sm:mt-0 sm:col-span-2">
                {{ formatCurrency(customer.balance) }}
              </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Account created</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ formatDate(customer.created_at) }}
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Last activity</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ lastActivity ? formatDate(lastActivity) : 'No activity yet' }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      
      <!-- Quick Actions -->
      <div class="mb-8">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
          Account Management
        </h3>
        <div class="flex flex-wrap gap-3">
          <button 
            @click="showDepositForm = true"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <ArrowDownLeft class="h-4 w-4 mr-2" /> 
            Add Deposit
          </button>
          <button 
            @click="handleResetPassword"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Lock class="h-4 w-4 mr-2" /> 
            Reset Password
          </button>
          <button 
            @click="customer.is_active ? handleDeactivateAccount() : handleActivateAccount()"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
            :class="customer.is_active ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'"
          >
            <component :is="customer.is_active ? Ban : CheckCircle" class="h-4 w-4 mr-2" /> 
            {{ customer.is_active ? 'Deactivate Account' : 'Activate Account' }}
          </button>
        </div>
      </div>
      
      <!-- Transaction History -->
      <div class="bg-white shadow sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Transaction History
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Recent account activity.
          </p>
        </div>
        <div class="border-t border-gray-200">
          <TransactionList :transactions="transactions" />
        </div>
      </div>
    </template>
    
    <!-- Deposit Form Modal -->
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="showDepositForm" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <!-- Background overlay -->
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="showDepositForm = false"></div>

          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div 
            class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
            @click.stop
          >
            <div class="absolute top-0 right-0 pt-4 pr-4">
              <button
                type="button"
                class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                @click="showDepositForm = false"
              >
                <span class="sr-only">Close</span>
                <X class="h-6 w-6" />
              </button>
            </div>
            
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                <ArrowDownLeft class="h-6 w-6 text-green-600" />
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Add Deposit
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Enter the amount to deposit into the customer's account.
                  </p>
                </div>
              </div>
            </div>

            <form class="mt-5 sm:mt-4" @submit.prevent="handleDeposit">
              <div>
                <label for="amount" class="block text-sm font-medium text-gray-700">Amount (USD)</label>
                <div class="mt-1 relative rounded-md shadow-sm">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span class="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    v-model="depositAmount"
                    type="number"
                    name="amount"
                    id="amount"
                    class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                    step="0.01"
                    min="0.01"
                    max="1000000"
                    required
                  />
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span class="text-gray-500 sm:text-sm">USD</span>
                  </div>
                </div>
                <p v-if="depositError" class="mt-2 text-sm text-red-600">{{ depositError }}</p>
              </div>
              
              <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="submit"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:col-start-2 sm:text-sm"
                  :disabled="depositLoading"
                >
                  {{ depositLoading ? 'Processing...' : 'Add Deposit' }}
                </button>
                <button
                  type="button"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  @click="showDepositForm = false"
                  :disabled="depositLoading"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import TransactionList from '../components/TransactionList.vue';
import { ArrowLeft, ArrowDownLeft, Lock, Ban, CheckCircle, X, Loader2 } from 'lucide-vue-next';
import api from '../services/api';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const customer = ref({
  id: 0,
  name: '',
  email: '',
  balance: 0,
  is_active: true,
  created_at: ''
});
const transactions = ref([]);
const loading = ref(true);

// Deposit modal state
const showDepositForm = ref(false);
const depositAmount = ref('');
const depositError = ref('');
const depositLoading = ref(false);

onMounted(async () => {
  const customerId = route.params.id;
  await fetchCustomerData(customerId);
});

const fetchCustomerData = async (customerId) => {
  try {
    loading.value = true;
      // Fetch customer details
    const customerResponse = await api.get(`/banker/customers/${customerId}`);
    customer.value = customerResponse.data.data || customerResponse.data;
    
    // Fetch customer transactions
    const transactionsResponse = await api.get(`/banker/customers/${customerId}/transactions`);
    transactions.value = Array.isArray(transactionsResponse.data) ? 
      transactionsResponse.data : 
      (transactionsResponse.data?.data?.transactions || 
       transactionsResponse.data?.transactions || 
       transactionsResponse.data?.data || 
       []);
    
  } catch (error) {
    console.error('Error fetching customer data:', error);
    toast.error('Failed to load customer data. Please try again.');
    router.push('/banker/dashboard');
  } finally {
    loading.value = false;
  }
};

const lastActivity = computed(() => {
  if (!transactions.value || !Array.isArray(transactions.value) || transactions.value.length === 0) return null;
  
  // Sort transactions by date (newest first) and get the most recent one
  const sortedTransactions = [...transactions.value].sort((a, b) => {
    const dateA = a.created_at || a.date;
    const dateB = b.created_at || b.date;
    return new Date(dateB) - new Date(dateA);
  });
  
  return sortedTransactions[0].created_at || sortedTransactions[0].date;
});

// Helper methods
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2
  }).format(amount);
};

const formatDate = (dateString) => {
  if (!dateString) return 'Not available';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Account type formatting helpers
const formatAccountType = (type) => {
  switch (type) {
    case 'savings': return 'Savings Account';
    case 'current': return 'Current Account';
    case 'fixed': return 'Fixed Deposit';
    default: return 'Standard Account';
  }
};

const getAccountTypeDescription = (type) => {
  switch (type) {
    case 'savings': return '4.5% Interest | Min Balance: ₹1,000';
    case 'current': return 'No Interest | Min Balance: ₹5,000';
    case 'fixed': return '7.5% Interest | Min Deposit: ₹10,000';
    default: return '';
  }
};

const handleDeposit = async () => {
  try {
    depositError.value = '';
    depositLoading.value = true;
    
    if (!depositAmount.value || parseFloat(depositAmount.value) <= 0) {
      depositError.value = 'Please enter a valid amount greater than zero.';
      return;
    }    // Make API call to add deposit
    const response = await api.post(`/banker/customers/${customer.value.id}/deposit`, {
      amount: parseFloat(depositAmount.value)
    });
    
    // Update customer balance
    customer.value.balance = response.data.data.balance_after;
    
    // Add new transaction to the list
    transactions.value = [response.data.data.transaction, ...transactions.value];
    
    // Close modal and show success message
    showDepositForm.value = false;
    depositAmount.value = '';
    toast.success('Deposit added successfully');
    
  } catch (error) {
    console.error('Deposit error:', error);
    depositError.value = error.response?.data?.message || 'Failed to process deposit. Please try again.';
  } finally {
    depositLoading.value = false;
  }
};

const handleResetPassword = async () => {
  try {
    // In a real app, this would call an API endpoint
    await new Promise(resolve => setTimeout(resolve, 500));
    
    toast.success(`Password reset email sent to ${customer.value.email}`);
  } catch (error) {
    console.error('Password reset error:', error);
    toast.error('Failed to send password reset email. Please try again.');
  }
};

const handleDeactivateAccount = async () => {
  try {
    // In a real app, this would call an API endpoint
    await new Promise(resolve => setTimeout(resolve, 500));
    
    customer.value.is_active = false;
    toast.success('Account deactivated successfully');
  } catch (error) {
    console.error('Deactivate account error:', error);
    toast.error('Failed to deactivate account. Please try again.');
  }
};

const handleActivateAccount = async () => {
  try {
    // In a real app, this would call an API endpoint
    await new Promise(resolve => setTimeout(resolve, 500));
    
    customer.value.is_active = true;
    toast.success('Account activated successfully');
  } catch (error) {
    console.error('Activate account error:', error);
    toast.error('Failed to activate account. Please try again.');
  }
};
</script>

<style scoped>
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
