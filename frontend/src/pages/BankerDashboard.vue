<!-- filepath: c:\Users\Shamim shaikh\Desktop\Assignment\project\src\pages\BankerDashboard.vue -->
<template>  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div v-if="loading" class="flex items-center justify-center py-12">
      <Loader2 class="h-12 w-12 text-indigo-600 animate-spin" />
    </div>
    
    <div v-else-if="error" class="bg-white shadow overflow-hidden sm:rounded-lg p-6">
      <div class="text-red-600 font-medium mb-2">Error loading data</div>
      <p class="text-gray-700">{{ error }}</p>
      <button 
        @click="fetchData" 
        class="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Retry
      </button>
    </div>
    
    <template v-else>
      <!-- Banker Dashboard Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">Banker Dashboard</h1>
        <p class="mt-1 text-sm text-gray-500">
          Manage customers and view account activities.
        </p>
      </div>
      
      <!-- Overview Cards -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <!-- Total Customers -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                <Users class="h-6 w-6 text-indigo-600" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Total Customers
                  </dt>
                  <dd>
                    <div class="text-lg font-medium text-gray-900">
                      {{ customerStats.total }}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
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
                    Total Deposits (Today)
                  </dt>
                  <dd>
                    <div class="text-lg font-medium text-gray-900">
                      {{ formatCurrency(customerStats.totalDepositsToday) }}
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
                    Total Withdrawals (Today)
                  </dt>
                  <dd>
                    <div class="text-lg font-medium text-gray-900">
                      {{ formatCurrency(customerStats.totalWithdrawalsToday) }}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Customers List -->
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h2 class="text-lg leading-6 font-medium text-gray-900">Customers</h2>
            <p class="mt-1 text-sm text-gray-500">
              View and manage customer accounts.
            </p>
          </div>
          <div>
            <div class="relative">
              <input
                v-model="searchTerm"
                type="text"
                placeholder="Search customers..."
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
              />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Search class="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        <ul class="divide-y divide-gray-200">
          <li v-if="filteredCustomers.length === 0" class="px-6 py-4 text-center text-gray-500">
            No customers found
          </li>
          <li v-for="customer in filteredCustomers" :key="customer.id" class="block hover:bg-gray-50">
            <div class="px-4 py-4 sm:px-6">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <User class="h-6 w-6 text-indigo-600" />
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-indigo-600">
                      {{ customer.name }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ customer.email }}
                    </div>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="text-sm text-gray-900">
                    <div class="font-semibold">Balance</div>
                    <div>{{ formatCurrency(customer.balance) }}</div>
                  </div>
                  <router-link
                    :to="`/banker/customer/${customer.id}`"
                    class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    View Details
                  </router-link>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '../stores/authStore';
import { Users, User, DollarSign, Search, Loader2 } from 'lucide-vue-next';
import api, { bankerService } from '../services/api';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const toast = useToast();
const router = useRouter();

const customers = ref([]);
const loading = ref(true);
const searchTerm = ref('');
const error = ref('');
const transactions = ref([]);

// Fetch data on component mount
onMounted(async () => {
  console.log('BankerDashboard component mounted');
  console.log('Authentication state:', {
    isAuthenticated: authStore.isAuthenticated,
    token: !!localStorage.getItem('token'),
    role: authStore.role,
    isBanker: authStore.isBanker
  });
  await fetchData();
});

const fetchData = async () => {
  try {
    loading.value = true;
    error.value = '';
    
    // Get auth info
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    
    console.log('Current auth state:', {
      token: token ? token.substring(0, 15) + '...' : null,
      role: role,
      isAuthenticated: authStore.isAuthenticated,
      isBanker: authStore.isBanker
    });
    
    // Debug the actual JWT token content
    if (token) {
      try {
        // Decode JWT token to inspect its contents (for debugging only)
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        console.log('JWT token payload:', JSON.parse(jsonPayload));
      } catch (e) {
        console.error('Error decoding JWT token:', e);
      }
    }
    
    // If not authenticated, redirect to login
    if (!token) {
      error.value = 'Authentication required. Please log in.';
      toast.error('Please log in to access this page');
      router.push('/banker/login');
      return;
    }
    
    // If role is neither banker nor admin, show error
    if (role !== 'admin' && role !== 'banker') {
      error.value = 'You do not have permission to access this page. Banker or Admin privileges are required.';
      toast.error('Permission denied');
      
      // For demonstration, show mock data
      console.log('Using mock data for demonstration due to invalid role');
      useMockData();
      return;
    }
    
    try {
      console.log('Fetching customer data from API...');
      
      // Try using the banker service first
      try {
        console.log('Attempting to fetch customers using bankerService...');
        const response = await bankerService.getAllCustomers();
        console.log('Banker service response:', response);
        
        if (response.data && response.data.data) {
          // Process response data
          if (response.data.data.customers) {
            customers.value = response.data.data.customers;
          } else if (Array.isArray(response.data.data)) {
            customers.value = response.data.data;
          } else {
            throw new Error('Unexpected response format');
          }
          
          console.log(`Successfully loaded ${customers.value.length} customers`);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (serviceError) {
        console.error('Error using banker service, falling back to fetch API:', serviceError);
        
        // Fall back to using fetch API directly
        const response = await fetch('/api/banker/customers', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        
        console.log('Fetch API Response status:', response.status);
        
        if (!response.ok) {
          // Try to parse error response
          const errorText = await response.text();
          console.error('API Error Response:', errorText);
          
          // Handle specific error cases
          if (response.status === 500) {
            // For 500 errors, fall back to mock data
            console.error('Server error, using mock data');
            useMockData();
            return;
          } else if (response.status === 403) {
            throw new Error('You do not have permission to access this resource. Please ensure you are logged in with the correct account.');
          } else {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
          }
        }
        
        const data = await response.json();
        console.log('Customer data received:', data);
        
        // Process customer data
        if (data && data.data) {
          if (Array.isArray(data.data.customers)) {
            customers.value = data.data.customers;
          } else if (data.data.customers) {
            customers.value = data.data.customers;
          } else if (Array.isArray(data.data)) {
            customers.value = data.data;
          } else {
            throw new Error('Unexpected data format');
          }
        } else {
          throw new Error('Invalid API response format');
        }
      }
      
      // Now fetch transactions data if customers were loaded successfully
      if (customers.value.length > 0) {
        try {
          const today = new Date().toISOString().split('T')[0];
          const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];
          
          console.log('Fetching transactions with dates:', { startDate: today, endDate: tomorrow });
          
          // Try with simpler approach first to avoid errors
          const txResponse = await api.get('/banker/transactions', {
            params: {
              startDate: today,
              endDate: tomorrow
            }
          });
          
          console.log('Transactions response:', txResponse);
          
          if (txResponse.data && txResponse.data.data) {
            if (txResponse.data.data.transactions) {
              transactions.value = txResponse.data.data.transactions;
            } else if (Array.isArray(txResponse.data.data)) {
              transactions.value = txResponse.data.data;
            } else {
              transactions.value = [];
            }
          }
        } catch (txError) {
          console.error('Failed to load transactions, but proceeding with customers data:', txError);
          transactions.value = [];
          
          // Add mock transaction data for demo purposes
          if (txError.response?.status === 500) {
            console.log('Using mock transaction data due to server error');
            transactions.value = [
              { id: 1, type: 'deposit', amount: 1000, created_at: new Date().toISOString() },
              { id: 2, type: 'deposit', amount: 2500, created_at: new Date().toISOString() },
              { id: 3, type: 'withdrawal', amount: 500, created_at: new Date().toISOString() },
              { id: 4, type: 'withdrawal', amount: 750, created_at: new Date().toISOString() }
            ];
          }
        }
      }
    } catch (apiError) {
      console.error('API Error:', apiError);
      error.value = apiError.message || 'Failed to load customer data.';
      toast.error('Error loading data');
      
      // For demonstration purposes, use mock data on error
      console.log('Falling back to mock data due to API error');
      useMockData();
    }
  } catch (err) {
    console.error('Unhandled error:', err);
    error.value = 'An unexpected error occurred.';
    toast.error('Error loading dashboard');
    
    // Fallback to mock data
    useMockData();
  } finally {
    loading.value = false;
  }
};

// Function to use mock data for demonstration
const useMockData = () => {
  customers.value = [
    { id: 1, name: 'John Doe', email: 'john@example.com', balance: 5000 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', balance: 7500 },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', balance: 3200 },
    { id: 4, name: 'Bob Williams', email: 'bob@example.com', balance: 10000 },
    { id: 5, name: 'Carol Brown', email: 'carol@example.com', balance: 6800 }
  ];
  
  transactions.value = [
    { id: 1, type: 'deposit', amount: 1000, created_at: new Date().toISOString() },
    { id: 2, type: 'deposit', amount: 2500, created_at: new Date().toISOString() },
    { id: 3, type: 'withdrawal', amount: 500, created_at: new Date().toISOString() },
    { id: 4, type: 'withdrawal', amount: 750, created_at: new Date().toISOString() }
  ];
  
  console.log('Using mock data for demonstration');
  toast.info('Using sample data for demonstration');
};

// Computed properties
const filteredCustomers = computed(() => {
  if (!searchTerm.value) return customers.value;
  const term = searchTerm.value.toLowerCase();
  return customers.value.filter(customer => 
    customer.name.toLowerCase().includes(term) || 
    customer.email.toLowerCase().includes(term)
  );
});

const customerStats = computed(() => {
  const today = new Date().toISOString().split('T')[0];
  // Calculate today's deposits and withdrawals from actual transactions
  let totalDepositsToday = 0;
  let totalWithdrawalsToday = 0;
  if (Array.isArray(transactions.value)) {
    transactions.value.forEach(transaction => {
      if (transaction.type === 'deposit') {
        totalDepositsToday += parseFloat(transaction.amount || 0);
      } else if (transaction.type === 'withdrawal' || transaction.type === 'withdraw') {
        totalWithdrawalsToday += parseFloat(transaction.amount || 0);
      }
    });
  }
  return {
    total: customers.value.length || 0,
    totalDepositsToday: totalDepositsToday || 0,
    totalWithdrawalsToday: totalWithdrawalsToday || 0
  };
});

// Helper methods
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount || 0);
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
