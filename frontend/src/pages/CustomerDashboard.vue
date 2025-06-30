<!-- CustomerDashboard.vue -->
<template>
  <div>
    <!-- Integrate ChatBot -->
    <!-- Chatbot and VoiceBot -->
    <ChatBot :customerData="customerData" />
    <VoiceBot :customerData="customerData" />
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div v-if="loading" class="flex items-center justify-center py-12">
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
              </div>              <div class="mt-1 text-sm flex items-center" 
                :class="{
                  'text-green-600': normalizedStatus === 'active',
                  'text-red-600': normalizedStatus === 'inactive',
                  'text-yellow-600': ['frozen', 'suspended'].includes(normalizedStatus)
                }"
              >
                <span class="inline-block h-2 w-2 rounded-full mr-2"
                  :class="{
                    'bg-green-500': normalizedStatus === 'active',
                    'bg-red-500': normalizedStatus === 'inactive',
                    'bg-yellow-500': ['frozen', 'suspended'].includes(normalizedStatus)
                  }"
                ></span>
                <span>
                  {{ 
                    normalizedStatus === 'active' ? 'Active Account' : 
                    ['frozen', 'suspended'].includes(normalizedStatus) ? 'Account Frozen - No Transactions Allowed' : 
                    normalizedStatus === 'inactive' ? 'Account Inactive' : 'Unknown Status'
                  }}
                </span>
              </div>
              
              <!-- Warning banner for frozen or inactive accounts -->
              <div v-if="normalizedStatus !== 'active'" 
                class="mt-4 p-4 rounded-md"
                :class="{
                  'bg-yellow-50 border border-yellow-200': ['frozen', 'suspended'].includes(normalizedStatus),
                  'bg-red-50 border border-red-200': normalizedStatus === 'inactive'
                }"
              >
                <div class="flex">
                  <div class="flex-shrink-0">
                    <AlertTriangle v-if="accountStatus === 'frozen'"
                      class="h-5 w-5 text-yellow-600" />
                    <Ban v-else-if="accountStatus === 'inactive'"
                      class="h-5 w-5 text-red-600" />
                  </div>
                  <div class="ml-3">
                    <h3 class="text-sm font-medium"
                      :class="{
                        'text-yellow-800': accountStatus === 'frozen',
                        'text-red-800': accountStatus === 'inactive'
                      }"
                    >
                      {{ 
                        accountStatus === 'frozen' ? 'Account Frozen' : 
                        accountStatus === 'inactive' ? 'Account Inactive' : 'Account Restricted'
                      }}
                    </h3>
                    <div class="mt-2 text-sm"
                      :class="{
                        'text-yellow-700': accountStatus === 'frozen',
                        'text-red-700': accountStatus === 'inactive'
                      }"
                    >
                      <p>
                        {{ 
                          accountStatus === 'frozen' ? 'Your account is currently frozen. You can view your account details, but transactions are disabled. Please contact bank support for assistance.' : 
                          accountStatus === 'inactive' ? 'Your account is inactive. Please contact bank support to reactivate your account.' : 'Please contact bank support.'
                        }}
                      </p>
                    </div>
                  </div>
                </div>
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
                <div class="flex flex-wrap gap-2">                  <button 
                    @click="openDepositModal"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
                    :disabled="accountStatus !== 'active'"
                    :class="{ 'opacity-50 cursor-not-allowed': accountStatus !== 'active' }"
                    :title="accountStatus !== 'active' ? 'Transactions disabled due to account status' : ''"
                  >
                    <ArrowDownLeft class="h-4 w-4 mr-2" /> Deposit
                  </button>
                  <button 
                    @click="openTransferModal"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    :disabled="balance <= 0 || accountStatus !== 'active'"
                    :class="{ 'opacity-50 cursor-not-allowed': balance <= 0 || accountStatus !== 'active' }"
                    :title="accountStatus !== 'active' ? 'Transactions disabled due to account status' : (balance <= 0 ? 'Insufficient balance' : '')"
                  >
                    <Send class="h-4 w-4 mr-2" /> Transfer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Add CIBIL Score Gauge Component -->
        <CibilScoreGauge 
          :score="cibilScore" 
          :lastUpdated="cibilScoreLastUpdated"
          @refresh="refreshCibilScore"
          class="mb-8" 
        />
        
        <!-- Deposits Table Component -->
        <DepositsTable
          :deposits="deposits"
          :loading="depositsLoading"
          @create-deposit="openDepositModal"
          class="mb-8"
        />
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
                <button 
                  @click="showFilterModal = true" 
                  type="button" 
                  class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Filter class="h-4 w-4 mr-1" />
                  Filter
                </button>
                <button 
                  @click="showExportModal = true" 
                  type="button" 
                  class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ml-2"
                >
                  <Download class="h-4 w-4 mr-1" />
                  Export
                </button>
              </div>
            </div>
          </div>
          
          <div v-if="appliedFilters.active" class="px-6 py-3 bg-blue-50 border-t border-b border-blue-100 flex items-center justify-between">
            <div class="flex items-center">
              <span class="text-sm font-medium text-blue-700 mr-2">Filters applied:</span>
              <div class="flex flex-wrap gap-2">
                <div v-if="appliedFilters.type" class="bg-white px-2 py-1 rounded text-xs text-blue-700 border border-blue-200">
                  Type: {{ appliedFilters.type }}
                </div>
                <div v-if="appliedFilters.dateRange" class="bg-white px-2 py-1 rounded text-xs text-blue-700 border border-blue-200">
                  Date: {{ appliedFilters.dateRange }}
                </div>
                <div v-if="appliedFilters.minAmount > 0" class="bg-white px-2 py-1 rounded text-xs text-blue-700 border border-blue-200">
                  Min: ₹{{ appliedFilters.minAmount }}
                </div>
                <div v-if="appliedFilters.maxAmount > 0" class="bg-white px-2 py-1 rounded text-xs text-blue-700 border border-blue-200">
                  Max: ₹{{ appliedFilters.maxAmount }}
                </div>
              </div>
            </div>
            <button
              @click="resetFilters"
              class="text-xs text-blue-700 hover:text-blue-900 font-medium"
            >
              Clear all
            </button>
          </div>
        <div class="border-t border-gray-100">
            <TransactionList 
              :transactions="filteredTransactions" 
              @view-transaction="(transaction) => {
                setTimeout(() => openTransactionDetails(transaction), 0);
              }"
            />
          </div>
          
          <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
            <span class="text-sm text-gray-500">
              Showing {{ filteredTransactions.length }} of {{ transactions.length }} transactions
            </span>
            <button 
              @click="viewAllTransactions" 
              class="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
            >
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
      v-model="showTransactionModal"
      :transaction-type="transactionType" 
      :current-balance="balance"
      @transaction-completed="handleTransactionComplete"
    />
    
    <!-- Deposit Modal -->
    <DepositModal
      v-model="showDepositModal"
      :current-balance="balance"
      @deposit-completed="handleDepositComplete"
    />    <!-- Transfer Modal -->
    <TransferModal
      v-model="showTransferModal"
      :available-balance="balance"
      @transfer-complete="handleTransferComplete"
    />    <!-- Card View Modal -->
    <CardViewModal 
      v-model="showCardViewModal"
      :card="virtualCard"
    />
      <!-- Export Modal -->
    <ExportReportModal
      v-model="showExportModal"
      :transactions="transactions"
      @export="exportTransactions"
    />
    
    <!-- Transaction Filters Modal -->
    <TransactionFiltersModal
      v-model="showFilterModal"
      :initial-filters="filters"
      @apply-filters="applyFilters"
    />
      <!-- Transaction Details Modal -->
    <TransactionModal
      v-if="selectedTransaction"
      v-model="showTransactionDetailsModal"
      :transaction-data="selectedTransaction"
      :key="`transaction-details-${selectedTransaction.id}`"
      mode="view"
      class="z-[60]"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard, 
  ClipboardList, 
  AlertTriangle, 
  Ban, 
  Send, 
  Download, 
  Filter, 
  ChevronRight,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Wallet,
  Activity,
  Calendar
} from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import api, { cardService } from '../services/api';
import TransactionModal from '../components/TransactionModal.vue';
import DepositModal from '../components/DepositModal.vue'; // Add new deposit modal
import CardViewModal from '../components/CardViewModal.vue';
import TransferModal from '../components/TransferModal.vue';
import CibilScoreGauge from '../components/CibilScoreGauge.vue'; // Add CIBIL gauge component
import DepositsTable from '../components/DepositsTable.vue'; // Add deposits table component
import TransactionList from '../components/TransactionList.vue'; // Add TransactionList component
import ExportReportModal from '../components/ExportReportModal.vue'; // Add ExportReportModal
import TransactionFiltersModal from '../components/TransactionFiltersModal.vue'; // Add TransactionFiltersModal
import VirtualCardSection from '../components/VirtualCardSection.vue'; // Import missing component
import ChatBot from '../components/ChatBot.vue'; // Import ChatBot component
import VoiceBot from '../components/VoiceBot.vue'; // Import VoiceBot component
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();
const toast = useToast();

// Component state
const loading = ref(true);
const errorMessage = ref('');
const customerData = ref(null);
const balance = ref(0);
const transactions = ref([]);
const router = useRouter();
const accountStatus = ref('active');

// Transaction modal state
const showTransactionModal = ref(false);
const transactionType = ref('deposit');

// Transaction filtering and export
const showFilterModal = ref(false);
const showExportModal = ref(false);
const selectedTransaction = ref(null);
const showTransactionDetailsModal = ref(false);
const filters = ref({
  type: '',
  startDate: '',
  endDate: '',
  minAmount: '',
  maxAmount: ''
});
const appliedFilters = ref({
  active: false,
  type: '',
  dateRange: '',
  minAmount: 0,
  maxAmount: 0
});

// Card view modal state
const showCardViewModal = ref(false);
const hasVirtualCard = ref(false);
const cardData = ref(null);
const virtualCard = ref(null);

// New state for deposits
const deposits = ref([]);
const depositsLoading = ref(false);
const showDepositModal = ref(false);

// CIBIL Score state
const cibilScore = ref(750); // Default score
const cibilScoreLastUpdated = ref(new Date());

// Transfer modal state
const showTransferModal = ref(false);

// Fetch data on component mount
onMounted(async () => {
  console.log('CustomerDashboard mounted, fetching data...');
  
  try {
    // Fetch essential data first
    await fetchData();
    
    // Non-critical data fetch in parallel with error handling
    const promises = [
      fetchCardData().catch(err => console.error('Card data fetch error in onMounted:', err)),
      fetchCibilScore().catch(err => console.error('CIBIL score fetch error in onMounted:', err)),
      fetchDeposits().catch(err => console.error('Deposits fetch error in onMounted:', err))
    ];
    
    await Promise.allSettled(promises);
    console.log('All data fetch operations completed');
  } catch (error) {
    console.error('Error in dashboard initialization:', error);
  }
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
      // Use our fetchCustomerData function to get profile information
      await fetchCustomerData();
      
      // Show notification based on account status
      if (accountStatus.value === 'frozen') {
        toast.warning('Your account is frozen. You can view your account details, but transactions are disabled.');
      } else if (accountStatus.value === 'inactive') {
        toast.error('Your account is inactive. Please contact bank support.');
      }
      
      if (!customerData.value) {
        errorMessage.value = 'Failed to parse profile data.';
        return;
      }
    } catch (profileErr) {
      console.error('Error fetching profile:', profileErr);
      errorMessage.value = 'Failed to load profile data: ' + 
        (profileErr.response?.data?.message || profileErr.message || 'Unknown error');
      return;
    }    try {
      // Use our fetchTransactions function to load transaction data
      await fetchTransactions();
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

// Fetch CIBIL score data
const fetchCibilScore = async () => {  try {
    const response = await api.get('/customers/cibil-score');
    if (response.data && response.data.success) {
      cibilScore.value = response.data.data.score;
      
      // Safely parse the lastUpdated date or use current date as fallback
      const dateValue = response.data.data.lastUpdated || response.data.data.last_updated;
      if (dateValue) {
        try {
          // Try to parse the date, fall back to string if it fails
          const parsedDate = new Date(dateValue);
          cibilScoreLastUpdated.value = !isNaN(parsedDate.getTime()) ? parsedDate : dateValue;
        } catch (e) {
          // If parsing fails, just use the string value directly
          cibilScoreLastUpdated.value = dateValue; 
        }
      } else {
        // No date provided, use current date
        cibilScoreLastUpdated.value = new Date();
      }
    }
  } catch (err) {
    console.error('Error fetching CIBIL score:', err);
    
    // For server 500 errors, backend might be failing to calculate the score
    // This can happen if customer doesn't have enough transaction history
    // Use a default "good" credit score instead
    cibilScore.value = 750; // Default "good" score
    cibilScoreLastUpdated.value = new Date();
    
    // Log detailed error for debugging but don't show to user
    if (err.response && err.response.status === 500) {
      console.error('Backend error calculating CIBIL score:', err.response.data);
    }
    
    // Don't show error toast to user since this is not critical functionality
    // We'll just use the default score instead
  }
};

// Fetch customer profile/account data
const fetchCustomerData = async () => {
  try {
    // Check if authenticated
    if (!authStore.isAuthenticated) {
      errorMessage.value = 'You must be logged in to view this page';
      return;
    }
    
    // Fetch account balance and profile
    const profileResponse = await api.get('/customers/profile');
    console.log('Profile response:', profileResponse.data);
    
    // Extract and save the full customer data
    if (profileResponse.data && profileResponse.data.data) {
      customerData.value = profileResponse.data.data;
      balance.value = profileResponse.data.data.balance || 0;
      
      // Set account status
      accountStatus.value = profileResponse.data.data.status || 'active';
      console.log('Account status set to:', accountStatus.value);
    } else {
      console.error('Invalid profile response structure:', profileResponse.data);
    }
  } catch (error) {
    console.error('Error fetching customer data:', error);
    toast.error('Failed to refresh account data');
  }
};

// Fetch transactions data
const fetchTransactions = async () => {
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
  } catch (err) {
    console.error('Error fetching transactions:', err);
    // Don't show error toast to avoid overwhelming user
    transactions.value = [];
  }
};

// Fetch deposits data
const fetchDeposits = async () => {
  try {
    depositsLoading.value = true;
    // Use correct endpoint path based on backend structure
    // The deposits API has customer-specific endpoint at /deposits/customer/:customerId
    if (!authStore.user || !authStore.user.id) {
      console.error('User ID not available for fetching deposits');
      return;
    }
    
    const customerId = authStore.user.id;
    const response = await api.get(`/deposits/customer/${customerId}`);
    
    if (response.data && response.data.success) {
      deposits.value = Array.isArray(response.data.data) 
        ? response.data.data 
        : response.data.data?.deposits || [];
    }
  } catch (err) {
    console.error('Error fetching deposits:', err);
    // Don't show error to user as this is not critical functionality
    deposits.value = [];
  } finally {
    depositsLoading.value = false;
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

// Computed properties for filtered transactions
const filteredTransactions = computed(() => {
  if (!transactions.value || !Array.isArray(transactions.value)) {
    return [];
  }
  
  // If no filters are applied, return all transactions
  if (!appliedFilters.value.active) {
    // Return all transactions, no slicing
    return transactions.value; 
  }
  
  // Apply filters
  return transactions.value.filter(transaction => {
    // Type filter
    if (appliedFilters.value.type && transaction.type !== appliedFilters.value.type) {
      return false;
    }
    
    // Amount range filter
    const amount = parseFloat(transaction.amount);
    if (appliedFilters.value.minAmount > 0 && amount < appliedFilters.value.minAmount) {
      return false;
    }
    if (appliedFilters.value.maxAmount > 0 && amount > appliedFilters.value.maxAmount) {
      return false;
    }
      // Date range filter
    if (appliedFilters.value.dateRange) {
      const transactionDate = new Date(transaction.created_at || transaction.date);
      
      try {
        // Parse date strings and set time to start/end of day for accurate comparison
        const dateStrings = appliedFilters.value.dateRange.split(' - ');
        
        if (dateStrings.length === 2) {
          const startDate = new Date(dateStrings[0]);
          startDate.setHours(0, 0, 0, 0);
          
          const endDate = new Date(dateStrings[1]);
          endDate.setHours(23, 59, 59, 999);
          
          if (transactionDate < startDate || transactionDate > endDate) {
            return false;
          }
        }
      } catch (err) {
        console.error("Error parsing date range:", err);
      }
    }
    
    return true;
  });
});

// Helper methods
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2
  }).format(amount);
};

// Normalized status for case-insensitive comparisons
const normalizedStatus = computed(() => {
  if (!accountStatus.value) return 'unknown';
  return accountStatus.value.toLowerCase();
});

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
  showTransferModal.value = true;
};

// Open deposit modal
const openDepositModal = () => {
  // Close all other modals first
  showTransactionDetailsModal.value = false;
  showTransferModal.value = false;
  showTransactionModal.value = false;
  showExportModal.value = false;
  showFilterModal.value = false;
  showCardViewModal.value = false;
  
  selectedTransaction.value = null;
  showDepositModal.value = true;
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

// Handle deposit completion
const handleDepositComplete = async (depositData) => {
  try {
    console.log('Processing deposit:', depositData);
    
    // Make API call to process deposit
    const response = await api.post('/deposits', {
      customerId: customerData.value.id,
      amount: parseFloat(depositData.amount),
      depositType: depositData.type, // This should be 'fixed', 'recurring', 'savings' or 'tax_saving'
      interestRate: depositData.interestRate,
      tenure: depositData.tenure,
      description: depositData.description || `${depositData.type.toUpperCase()} Deposit`
    });
      console.log('Deposit response:', response.data);
    
    // Log the deposit type from the response
    if (response.data.data && response.data.data.deposit) {
      console.log('Deposit type from server:', response.data.data.deposit.type);
    }
    
    // Update local balance
    if (response.data.data.transaction && response.data.data.transaction.balance !== undefined) {
      balance.value = response.data.data.transaction.balance;
    } else {
      // Refresh customer data to get updated balance
      await fetchCustomerData();
    }
    
    // Add new deposit to the list
    if (response.data.data.deposit) {
      const newDeposit = response.data.data.deposit;
      // Make sure the deposit type is preserved
      if (newDeposit.type !== depositData.type) {
        console.warn(`Deposit type mismatch: sent ${depositData.type} but received ${newDeposit.type}`);
        newDeposit.type = depositData.type;
      }
      deposits.value = Array.isArray(deposits.value) 
        ? [newDeposit, ...deposits.value] 
        : [newDeposit];
    }
    
    // Add new transaction to the list if returned
    if (response.data.data.transaction) {
      const newTransaction = response.data.data.transaction;
      transactions.value = Array.isArray(transactions.value) 
        ? [newTransaction, ...transactions.value] 
        : [newTransaction];
    }
    
    // Refresh data
    await fetchDeposits();
    await fetchTransactions();
    
    toast.success('Deposit created successfully!');
    
  } catch (error) {
    console.error('Deposit error:', error);
    toast.error(error.response?.data?.message || 'Failed to create deposit');
  }
};

// Refresh CIBIL score data
const refreshCibilScore = async () => {
  toast.info('Refreshing CIBIL score...');
  await fetchCibilScore();
  toast.success('CIBIL score updated');
};

// View all transactions
const viewAllTransactions = () => {
  router.push('/transactions');
};

// Apply filters to transactions
const applyFilters = (newFilters) => {
  // Format the applied filters for display
  appliedFilters.value = {
    active: true,
    type: newFilters.type || '',
    dateRange: newFilters.startDate && newFilters.endDate 
      ? `${new Date(newFilters.startDate).toLocaleDateString()} - ${new Date(newFilters.endDate).toLocaleDateString()}` 
      : '',
    minAmount: parseFloat(newFilters.minAmount) || 0,
    maxAmount: parseFloat(newFilters.maxAmount) || 0
  };
  
  // Save filters for potential reuse
  filters.value = {
    type: newFilters.type || '',
    startDate: newFilters.startDate || '',
    endDate: newFilters.endDate || '',
    minAmount: newFilters.minAmount || '',
    maxAmount: newFilters.maxAmount || ''
  };
  
  // Close filter modal
  showFilterModal.value = false;
};

// Reset filters
const resetFilters = () => {
  appliedFilters.value = {
    active: false,
    type: '',
    dateRange: '',
    minAmount: 0,
    maxAmount: 0
  };
  filters.value = {
    type: '',
    startDate: '',
    endDate: '',
    minAmount: '',
    maxAmount: ''
  };
};

// Export transactions
const exportTransactions = async (exportOptions) => {
  try {
    // Determine which transactions to export
    const transactionsToExport = appliedFilters.value.active 
      ? filteredTransactions.value 
      : transactions.value;
    
    // Format transactions according to selected fields
    const formattedData = transactionsToExport.map(transaction => {
      const data = {};
      
      if (exportOptions.selectedFields.includes('transaction_id')) {
        data.transaction_id = transaction.id;
      }
      
      if (exportOptions.selectedFields.includes('date')) {
        data.date = formatDate(transaction.created_at || transaction.date);
      }
      
      if (exportOptions.selectedFields.includes('type')) {
        data.type = transaction.type;
      }
      
      if (exportOptions.selectedFields.includes('amount')) {
        data.amount = transaction.amount;
      }
      
      if (exportOptions.selectedFields.includes('description')) {
        data.description = transaction.description || '';
      }
      
      if (exportOptions.selectedFields.includes('status')) {
        data.status = transaction.status || 'completed';
      }
      
      return data;
    });
    
    // Generate a CSV or download file
    const format = exportOptions.format;
    
    if (format === 'csv') {
      // Create CSV content
      const headers = exportOptions.selectedFields;
      let csvContent = headers.join(',') + '\n';
      
      formattedData.forEach(item => {
        const row = headers.map(header => {
          // Handle special characters and quotes in CSV
          const value = String(item[header] || '');
          return `"${value.replace(/"/g, '""')}"`;
        });
        csvContent += row.join(',') + '\n';
      });
      
      // Create a download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Transactions exported successfully');
    } else if (format === 'xlsx' || format === 'pdf') {
      toast.info(`${format.toUpperCase()} export initiated, check your downloads folder`);
      
      // Request server-side export
      await api.post('/customers/export-transactions', {
        format,
        data: formattedData,
        filename: `transactions_${new Date().toISOString().split('T')[0]}`
      }, { responseType: 'blob' });
      
      toast.success(`Transactions exported to ${format.toUpperCase()} successfully`);
    }
    
    // Close export modal
    showExportModal.value = false;
    
  } catch (error) {
    console.error('Export error:', error);
    toast.error('Failed to export transactions');
  }
};

// Open transaction details modal
const openTransactionDetails = (transaction) => {
  console.log('Transaction selected:', transaction);
  // Make sure we have a valid transaction object
  if (transaction && transaction.id) {
    // Close all other modals first
    showDepositModal.value = false;
    showTransferModal.value = false;
    showTransactionModal.value = false;
    showExportModal.value = false;
    showFilterModal.value = false;
    showCardViewModal.value = false;
    
    // Then set the selected transaction and open the details modal
    selectedTransaction.value = transaction;
    showTransactionDetailsModal.value = true;
    
    console.log('Opening modal with transaction:', transaction);
    console.log('Modal state:', showTransactionDetailsModal.value);
  } else {
    console.error('Invalid transaction selected:', transaction);
    toast.error('Could not view transaction details');
  }
};

// Watchers
watch(() => authStore.isAuthenticated, (newVal) => {
  if (newVal) {
    // Fetch data again if the authentication state changes to logged in
    fetchData();
    fetchCardData();
    fetchCibilScore();
    fetchDeposits();
  }
});

// Watch transaction details modal state
watch(() => showTransactionDetailsModal.value, (isOpen) => {
  if (isOpen) {
    // Ensure all other modals are closed when transaction details modal is shown
    showDepositModal.value = false;
    showTransferModal.value = false;
    showTransactionModal.value = false;
    showExportModal.value = false;
    showFilterModal.value = false;
    showCardViewModal.value = false;
    console.log('Transaction details modal opened, closing other modals');
  }
});
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
