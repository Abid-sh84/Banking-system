<!-- filepath: c:\Users\Shamim shaikh\Desktop\Assignment\project\frontend\src\pages\BankerDashboard.vue -->
<template>
  <div class="w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
    <div v-if="loading" class="flex items-center justify-center py-12">
      <Loader2 class="h-12 w-12 text-primary animate-spin" />
    </div>
    
    <div v-else-if="error" class="bg-white shadow overflow-hidden sm:rounded-lg p-6 max-w-3xl mx-auto">
      <div class="text-red-600 font-medium mb-2">Error loading data</div>
      <p class="text-gray-700">{{ error }}</p>
      <button 
        @click="fetchData" 
        class="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-200"
      >
        Retry
      </button>
    </div>
    
    <template v-else>
      <!-- Enhanced Banker Dashboard Header with welcome message -->
      <div class="mb-8 animate-slideUp">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="text-2xl font-semibold text-gray-900 sm:text-3xl">Banker Dashboard</h1>
            <p class="mt-1 text-sm text-gray-500 sm:text-base">
              Welcome back! Manage customers and banking activities efficiently.
            </p>
          </div>
          <div class="mt-4 sm:mt-0">
            <div class="flex items-center bg-blue-50 text-blue-700 py-2 px-4 rounded-lg">
              <Calendar class="h-5 w-5 mr-2" />
              <span class="text-sm font-medium">{{ todayDate }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Enhanced Overview Cards with hover effects and dynamic stats -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <!-- Total Customers -->
        <div class="bg-white overflow-hidden shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 transform hover:scale-[1.02]">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                <Users class="h-6 w-6 text-primary" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Total Customers
                  </dt>
                  <dd>
                    <div class="flex items-center">
                      <div class="text-lg font-medium text-gray-900">                          {{ calculatedCustomerStats.total }}
                      </div>
                      <div class="ml-2 flex items-center text-xs text-green-600">
                        <TrendingUp class="h-3 w-3 mr-0.5" />
                        <span>+4%</span>
                      </div>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="bg-indigo-50 px-4 py-2">
            <div class="text-xs text-indigo-700">All account holders</div>
          </div>
        </div>
        
        <!-- Total Deposits -->
        <div class="bg-white overflow-hidden shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 transform hover:scale-[1.02]">
          <div class="px-4 py-5 sm:p-6">
      <div class="flex items-center">
              <div class="flex-shrink-0 bg-green-100 rounded-md p-3">
                <InrIcon class="h-6 w-6 text-green-600" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>                  
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Total Deposits (30 Days)
                  </dt>
                  <dd>
                    <div class="flex items-center">
                      <div class="text-lg font-medium text-gray-900">
                        {{ formatCurrency(calculatedCustomerStats.totalDepositsToday) }}
                      </div>
                      <div class="ml-2 flex items-center text-xs text-green-600">
                        <TrendingUp class="h-3 w-3 mr-0.5" />
                        <span>+12%</span>
                      </div>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="bg-green-50 px-4 py-2">
            <div class="text-xs text-green-700">Cash inflow is positive</div>
          </div>
        </div>
        
        <!-- Total Withdrawals -->
        <div class="bg-white overflow-hidden shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 transform hover:scale-[1.02]">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center">              <div class="flex-shrink-0 bg-red-100 rounded-md p-3">
                <InrIcon class="h-6 w-6 text-red-600" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>                  
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Total Withdrawals (30 Days)
                  </dt>
                  <dd>
                    <div class="flex items-center">
                      <div class="text-lg font-medium text-gray-900">
                        {{ formatCurrency(calculatedCustomerStats.totalWithdrawalsToday) }}
                      </div>
                      <div class="ml-2 flex items-center text-xs text-amber-600">
                        <TrendingDown class="h-3 w-3 mr-0.5" />
                        <span>-5%</span>
                      </div>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="bg-red-50 px-4 py-2">
            <div class="text-xs text-red-700">Cash outflow is stable</div>
          </div>
        </div>
        
        <!-- Net Change -->
        <div class="bg-white overflow-hidden shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 transform hover:scale-[1.02]">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-purple-100 rounded-md p-3">
                <LineChart class="h-6 w-6 text-purple-600" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>                  
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Net Change (30 Days)
                  </dt>
                  <dd>
                    <div class="flex items-center">
                      <div class="text-lg font-medium text-gray-900">
                        {{ formatCurrency(calculatedCustomerStats.totalDepositsToday - calculatedCustomerStats.totalWithdrawalsToday) }}
                      </div>                      <div class="ml-2 flex items-center text-xs" :class="(calculatedCustomerStats.totalDepositsToday - calculatedCustomerStats.totalWithdrawalsToday) > 0 ? 'text-green-600' : 'text-red-600'">
                        <component :is="(calculatedCustomerStats.totalDepositsToday - calculatedCustomerStats.totalWithdrawalsToday) > 0 ? TrendingUp : TrendingDown" class="h-3 w-3 mr-0.5" />
                        <span>{{ (calculatedCustomerStats.totalDepositsToday - calculatedCustomerStats.totalWithdrawalsToday) > 0 ? '+' : '' }}{{ ((calculatedCustomerStats.totalDepositsToday - calculatedCustomerStats.totalWithdrawalsToday) / Math.max(1, calculatedCustomerStats.totalWithdrawalsToday) * 100).toFixed(1) }}%</span>
                      </div>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="bg-purple-50 px-4 py-2">
            <div class="text-xs text-purple-700">Net balance change</div>
          </div>
        </div>
      </div>

      <!-- Quick Actions Section -->
      <div class="mb-8">
        <QuickActions @action="handleQuickAction" />
      </div>
      
      <!-- Transaction Analysis and Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <!-- Transaction Chart - Takes 2/3 of space on larger screens -->
        <div class="lg:col-span-2 bg-white shadow-md rounded-lg overflow-hidden p-6 hover:shadow-lg transition-shadow duration-300">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Transaction Analysis</h3>
          <TransactionChart :transactions="transactions" :loading="loading" />
        </div>
        
        <!-- Activity Timeline - Takes 1/3 of space on larger screens -->
        <div class="bg-white shadow-md rounded-lg overflow-hidden p-6 hover:shadow-lg transition-shadow duration-300">
          <ActivityTimeline :transactions="transactions" :loading="loading" />
        </div>
      </div>
      
      <!-- Banking Performance Metrics -->
      <div class="mb-8">
        <PerformanceMetrics 
          :customers="customers" 
          :transactions="transactions"
          :loading="loading" 
        />
      </div>
        <!-- Deposits Overview Section -->
      <div class="mb-8">
        <h2 class="text-xl font-bold mb-4 flex items-center">
          <Landmark class="h-5 w-5 mr-2 text-blue-500" />
          Deposits Overview
          <button 
            @click="fetchDeposits()" 
            class="ml-2 inline-flex items-center p-1 text-sm text-gray-500 rounded-full hover:bg-gray-100"
            title="Refresh deposits data"
          >
            <RefreshCw class="h-4 w-4" />
          </button>
        </h2>
        <DepositsOverview
          :deposits="deposits || []"
          :loading="depositsLoading"
          :total-deposits="totalDeposits"
          :current-page="currentPage"
          :total-pages="totalPages || 1"
          :deposit-metrics="depositMetrics || {
            totalAmount: 0,
            totalCount: 0,
            fixedAmount: 0,
            fixedCount: 0,
            recurringAmount: 0,
            recurringCount: 0,
            taxSavingAmount: 0,
            taxSavingCount: 0
          }"
          @refresh="fetchDeposits()"
          @export="exportDeposits"
          @view-deposit="viewDeposit"
          @edit-deposit="editDeposit"
          @page-change="handlePageChange"
        />
      </div>
      
      <!-- Transaction Filters -->
      <div class="mb-8" v-if="transactions.length > 0">
        <TransactionFilters 
          :customers="customers"
          :initialFilters="transactionFilters"
          @filter="handleFilterChange"
        />
      </div>

      <!-- Customers List with enhanced responsive design -->
      <div class="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 mb-8">
        <div class="px-4 py-5 sm:px-6 flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-3 lg:space-y-0">
          <div>
            <h2 class="text-lg leading-6 font-medium text-gray-900">Customers</h2>
            <p class="mt-1 text-sm text-gray-500">
              View and manage customer accounts.
            </p>
          </div>
          <div>
            <div class="relative max-w-xs w-full lg:max-w-md">
              <input
                v-model="searchTerm"
                type="text"
                placeholder="Search customers..."
                class="shadow-sm focus:ring-primary focus:border-primary block w-full pr-10 sm:text-sm border-gray-300 rounded-md transition-all duration-200"
              />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Search class="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div class="flex mt-2 space-x-2">
              <select
                v-model="accountTypeFilter"
                class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
              >
                <option value="">All Account Types</option>
                <option value="savings">Savings</option>
                <option value="current">Current</option>
                <option value="fixed">Fixed Deposit</option>
              </select>
            </div>
          </div>
        </div>
        <ul class="divide-y divide-gray-200">
          <li v-if="filteredCustomers.length === 0" class="px-6 py-8 text-center text-gray-500">
            <div class="inline-flex items-center justify-center p-2 bg-gray-100 rounded-full mb-2">
              <Search class="h-6 w-6 text-gray-400" />
            </div>
            <p class="text-sm">No customers found matching your search</p>
          </li>
          <li 
            v-for="customer in filteredCustomers" 
            :key="customer.id" 
            class="block hover:bg-gray-50 transition-colors duration-200"
          >
            <div class="px-4 py-4 sm:px-6">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <User class="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-primary">
                      {{ customer.name }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ customer.email }}
                    </div>
                  </div>
                </div>                
                <div class="flex flex-col sm:flex-row mt-3 sm:mt-0 items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <div class="text-sm text-gray-900">
                    <div class="font-semibold">Balance</div>
                    <div>{{ formatCurrency(customer.balance) }}</div>
                  </div>
                  <div class="text-sm">
                    <span 
                      class="px-2 py-1 text-xs rounded-full" 
                      :class="{
                        'bg-blue-100 text-blue-800': customer.account_type === 'savings',
                        'bg-green-100 text-green-800': customer.account_type === 'current',
                        'bg-purple-100 text-purple-800': customer.account_type === 'fixed',
                        'bg-gray-100 text-gray-800': !customer.account_type
                      }"
                    >
                      {{ formatAccountType(customer.account_type) }}
                    </span>
                  </div>
                  <div class="flex space-x-2">                    <router-link
                      :to="`/banker/customer/${customer.id}`"
                      class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 transform hover:scale-105"
                    >
                      View Details
                    </router-link>
                    <button
                      @click="openEditModal(customer)"
                      class="inline-flex items-center px-3 py-2 border border-blue-600 text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    >
                      <Edit class="h-4 w-4 mr-1" />
                      Edit
                    </button><button
                      @click="openDepositModal(customer)"
                      class="inline-flex items-center px-3 py-2 border border-green-600 text-sm leading-4 font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
                    >
                      <InrIcon class="h-4 w-4 mr-1" />
                      Deposit
                    </button>
                    <button
                      @click="openActionModal(customer)"
                      class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200"
                    >
                      <MoreVertical class="h-4 w-4 mr-1" />
                      Actions
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      
      <!-- Virtual Card Management -->
      <VirtualCardManagement />
      
      <!-- Recent Transactions - responsive table with enhanced features -->
      <div class="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h2 class="text-lg leading-6 font-medium text-gray-900">Recent Transactions</h2>
            <p class="mt-1 text-sm text-gray-500">
              View the most recent transactions across all accounts.
            </p>
          </div>          <div>
            <button
              @click="showExportModal = true"
              class="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200"
            >
              <Download class="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>
        <div class="responsive-table">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
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
                  Status
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">              <tr v-for="(transaction, index) in filteredTransactions.slice(0, transactionsToShow)" :key="index"
                class="hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                @click="openApprovalModal(transaction)">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ new Date(transaction.transaction_date || transaction.created_at).toLocaleDateString() }}
                  <div class="text-xs text-gray-400">
                    {{ new Date(transaction.transaction_date || transaction.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ transaction.customer_name || 'Customer' }}</div>
                  <div class="text-xs text-gray-500">ID: {{ transaction.customer_id || '-' }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                    :class="{
                      'bg-green-100 text-green-800': transaction.type === 'deposit',
                      'bg-red-100 text-red-800': transaction.type === 'withdrawal' || transaction.type === 'withdraw',
                      'bg-blue-100 text-blue-800': transaction.type === 'transfer'
                    }"
                  >
                    {{ transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm" :class="{
                    'text-green-600': transaction.type === 'deposit',
                    'text-red-600': transaction.type === 'withdrawal' || transaction.type === 'withdraw',
                    'text-blue-600': transaction.type === 'transfer'
                  }">
                    {{ formatCurrency(transaction.amount) }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    class="px-2 py-1 text-xs rounded-full" 
                    :class="{
                      'bg-green-100 text-green-800': transaction.status === 'completed' || transaction.status === 'success' || !transaction.status,
                      'bg-yellow-100 text-yellow-800': transaction.status === 'pending',
                      'bg-red-100 text-red-800': transaction.status === 'failed'
                    }"
                  >
                    {{ formatStatus(transaction.status || 'completed') }}
                  </span>
                </td>
              </tr>
              <tr v-if="filteredTransactions.length === 0">
                <td colspan="5" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  No recent transactions found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="px-6 py-4 flex justify-between items-center bg-gray-50">
          <div class="text-sm text-gray-700">
            Showing <span class="font-medium">{{ Math.min(transactionsToShow, filteredTransactions.length) }}</span> of 
            <span class="font-medium">{{ filteredTransactions.length }}</span> transactions
          </div>
          <div>
            <button 
              v-if="transactionsToShow < filteredTransactions.length"
              @click="loadMoreTransactions" 
              class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Load More
            </button>
          </div>
        </div>
      </div>
      
      <!-- Deposit Modal -->
      <div v-if="showDepositModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-900">Make Deposit</h3>
            <button 
              @click="showDepositModal = false" 
              class="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <X class="h-6 w-6" />
            </button>
          </div>
          
          <div class="space-y-4">
            <div class="bg-gray-50 rounded-md p-3">
              <h4 class="font-medium text-gray-900">{{ selectedCustomer?.name }}</h4>
              <p class="text-sm text-gray-500">Current Balance: {{ formatCurrency(selectedCustomer?.balance) }}</p>
            </div>
            
            <div>
              <label for="amount" class="block text-sm font-medium text-gray-700">Amount (₹)</label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 sm:text-sm">₹</span>
                </div>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  v-model="depositAmount"
                  class="focus:ring-primary focus:border-primary block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                name="description"
                rows="3"
                v-model="depositDescription"
                class="mt-1 shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border border-gray-300 rounded-md"
                placeholder="Add a description for this transaction..."
              ></textarea>
            </div>
          </div>
          
          <div class="mt-5 sm:mt-6 flex space-x-3">
            <button
              type="button"
              @click="showDepositModal = false"
              class="flex-1 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:text-sm"
              :disabled="depositLoading"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="makeDeposit"
              class="flex-1 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:text-sm"
              :disabled="depositLoading"
            >
              <Loader2 v-if="depositLoading" class="h-4 w-4 animate-spin mr-2" />
              Make Deposit
            </button>
          </div>
        </div>
      </div>
      
      <!-- Export Report Modal -->
      <ExportReportModal
        :show="showExportModal"
        @close="showExportModal = false"
        @export="handleExportReport"
      />
      
      <!-- Transaction Approval Modal -->
      <TransactionApprovalModal
        :show="showApprovalModal"
        :transaction="selectedTransaction"
        @close="showApprovalModal = false"
        @transactionUpdated="handleTransactionUpdate"
      />
      
      <!-- Customer Action Modal -->
      <CustomerActionModal
        :show="showActionModal"
        :customer="selectedCustomer"
        @close="showActionModal = false"
        @customer-updated="handleCustomerUpdate"
      />
      
      <!-- Customer Edit Modal -->
      <CustomerEditModal
        :show="showEditModal"
        :customer="selectedCustomer"
        @close="showEditModal = false"
        @customer-updated="handleCustomerUpdate"
      />
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '../stores/authStore';
import { 
  Users, 
  User, 
  DollarSign, 
  Search, 
  Loader2, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  LineChart,
  Download,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  FileDown,
  Filter,
  RefreshCw,
  ArrowDownLeft,
  Lock,
  Ban,
  MoreVertical,
  Edit
} from 'lucide-vue-next';
import InrIcon from '../components/InrIcon.vue';
import api, { bankerService } from '../services/api';
import { useRouter } from 'vue-router';
import TransactionChart from '../components/TransactionChart.vue';
import ActivityTimeline from '../components/ActivityTimeline.vue';
import QuickActions from '../components/QuickActions.vue';
import PerformanceMetrics from '../components/PerformanceMetrics.vue';
import TransactionFilters from '../components/TransactionFilters.vue';
import ExportReportModal from '../components/ExportReportModal.vue';
import TransactionApprovalModal from '../components/TransactionApprovalModal.vue';
import VirtualCardManagement from '../components/VirtualCardManagement.vue';
import CustomerActionModal from '../components/CustomerActionModal.vue';
import CustomerEditModal from '../components/CustomerEditModal.vue';
import DepositsOverview from '../components/DepositsOverview.vue';

const authStore = useAuthStore();
const toast = useToast();
const router = useRouter();

// Data refs
const customers = ref([]);
const loading = ref(true);
const searchTerm = ref('');
const accountTypeFilter = ref('');
const error = ref('');
const transactions = ref([]);
const transactionsToShow = ref(5);

// Today's date formatted nicely
const todayDate = computed(() => {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Transaction filters
const transactionFilters = ref({
  startDate: '',
  endDate: '',
  type: '',
  minAmount: '',
  maxAmount: '',
  customerId: '',
  sortBy: 'date',
  sortDirection: 'desc'
});

// Modal states
const showDepositModal = ref(false);
const showExportModal = ref(false);
const showApprovalModal = ref(false);
const showActionModal = ref(false);
const showEditModal = ref(false);
const selectedTransaction = ref(null);

// Deposit modal state
const selectedCustomer = ref(null);
const depositAmount = ref('');
const depositDescription = ref('');
const depositLoading = ref(false);

// Component state
// Using the existing error ref from above instead of declaring a second one
const customerStats = ref({
  total: 0,
  active: 0,
  inactive: 0,
  totalDepositsToday: 0,
  totalWithdrawalsToday: 0
});

// Deposits data
const deposits = ref([]);
const depositsLoading = ref(false);
const totalDeposits = ref(0);
const currentPage = ref(1);
const totalPages = ref(1);
const depositMetrics = ref({
  totalAmount: 0,
  totalCount: 0,
  fixedAmount: 0,
  fixedCount: 0,
  recurringAmount: 0,
  recurringCount: 0,
  taxSavingAmount: 0,
  taxSavingCount: 0
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
      loading.value = false;
      return;
    }
    
    // If role is neither banker nor admin, show error
    if (role !== 'admin' && role !== 'banker') {
      error.value = 'You do not have permission to access this page. Banker or Admin privileges are required.';
      toast.error('Permission denied');
      
      // For demonstration, show mock data
      console.log('Using mock data for demonstration due to invalid role');
      useMockData();
      loading.value = false;
      return;
    }
    
    try {
      console.log('Fetching customer data from API...');
      
      // Set up a timeout for the API request
      let fetchTimeout;
      const timeoutPromise = new Promise((_, reject) => {
        fetchTimeout = setTimeout(() => {
          reject(new Error('API request timed out after 10 seconds'));
        }, 10000);
      });
      
      // Try using the banker service first with timeout
      try {
        console.log('Attempting to fetch customers using bankerService...');
        const response = await Promise.race([
          bankerService.getAllCustomers(),
          timeoutPromise
        ]);
        clearTimeout(fetchTimeout);
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
          // Get a broader range of transactions to ensure we have data to display
          // Start from 30 days ago to ensure we have enough transaction history
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          const startDate = thirtyDaysAgo.toISOString().split('T')[0];
          
          // Include tomorrow to catch all of today's transactions 
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          const endDate = tomorrow.toISOString().split('T')[0];
          
          console.log('Fetching transactions with dates:', { startDate, endDate });
          
          // Make the API call with the date range
          const txResponse = await api.get('/banker/transactions', {
            params: {
              startDate,
              endDate,
              limit: 100 // Get more transactions for better statistics
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
              { id: 1, type: 'deposit', amount: 1000, created_at: new Date().toISOString(), customer_id: 1, customer_name: 'John Doe' },
              { id: 2, type: 'deposit', amount: 2500, created_at: new Date().toISOString(), customer_id: 2, customer_name: 'Jane Smith' },
              { id: 3, type: 'withdrawal', amount: 500, created_at: new Date().toISOString(), customer_id: 3, customer_name: 'Alice Johnson' },
              { id: 4, type: 'withdrawal', amount: 750, created_at: new Date().toISOString(), customer_id: 4, customer_name: 'Bob Williams' },
              { id: 5, type: 'transfer', amount: 1200, created_at: new Date().toISOString(), customer_id: 1, customer_name: 'John Doe' }
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
    }  } catch (err) {
    console.error('Unhandled error:', err);
    error.value = 'An unexpected error occurred: ' + err.message;
    toast.error('Error loading dashboard');
    
    // Fallback to mock data to ensure the user sees something
    useMockData();
  } finally {
    // Ensure this code always runs to prevent eternal loading state
    console.log('Finally block executed, setting loading to false');
      // If after all attempts we still have no data, use mock data as a last resort
    if (customers.value.length === 0) {
      console.log('No customers were loaded, using mock data as fallback');
      useMockData();
    }
    
    // Fetch deposits data
    fetchDeposits().catch(err => {
      console.error('Error fetching deposits data during initialization:', err);
    });
    
    loading.value = false;
  }
};

// Fetch deposits data
const fetchDeposits = async (page = 1, limit = 10) => {
  try {
    depositsLoading.value = true;
    console.log('Fetching deposits data for banker dashboard...');
    
    // Initialize with default values in case API calls fail
    if (!deposits.value || deposits.value.length === 0) {
      deposits.value = [];
    }
    
    // Setup default metrics in case API call fails
    depositMetrics.value = depositMetrics.value || {
      totalAmount: 0,
      totalCount: 0,
      fixedAmount: 0,
      fixedCount: 0,
      recurringAmount: 0,
      recurringCount: 0,
      taxSavingAmount: 0,
      taxSavingCount: 0
    };
    
    // Fetch deposits
    const response = await api.get(`/deposits?page=${page}&limit=${limit}`);
    
    console.log('Deposits response:', response.data);
    
    if (response.data && response.data.success) {
      deposits.value = response.data.data || [];
      totalDeposits.value = response.data.meta?.total || deposits.value.length;
      totalPages.value = response.data.meta?.totalPages || 1;
      currentPage.value = page;
    } else {
      console.error('Invalid response format from deposits API:', response.data);
    }
    
    // Fetch metrics
    const metricsResponse = await api.get('/deposits/summary');
    
    console.log('Deposit metrics response:', metricsResponse.data);
    
    if (metricsResponse.data && metricsResponse.data.success) {
      const data = metricsResponse.data.data || {};
      
      depositMetrics.value = {
        totalAmount: data.total_amount || 0,
        totalCount: data.total_count || 0,
        fixedAmount: data.fixed_amount || 0,
        fixedCount: data.fixed_count || 0,
        recurringAmount: data.recurring_amount || 0,
        recurringCount: data.recurring_count || 0,
        taxSavingAmount: data.tax_saving_amount || 0,
        taxSavingCount: data.tax_saving_count || 0
      };
    } else {
      console.error('Invalid response format from deposit metrics API:', metricsResponse.data);
    }
  } catch (err) {
    console.error('Error fetching deposits:', err);
    toast.error('Failed to load deposits data');
  } finally {
    depositsLoading.value = false;
  }
};


// Handle quick action
const handleQuickAction = (actionId) => {
  console.log('Quick action clicked:', actionId);
  
  switch (actionId) {
    case 'check-account':
      router.push('/banker/customers');
      break;
    case 'make-deposit':
      toast.info("Please select a customer from the list below to make a deposit");
      break;
    // Add more action handlers as needed
  }
};

// Handle transaction filters
const handleFilterChange = (filters) => {
  console.log('Applying filters:', filters);
  Object.assign(transactionFilters.value, filters);
};

// Open deposit modal for a customer
const openDepositModal = (customer) => {
  selectedCustomer.value = customer;
  depositAmount.value = '';
  depositDescription.value = '';
  showDepositModal.value = true;
};

// Open action modal for a customer
const openActionModal = (customer) => {
  selectedCustomer.value = customer;
  showActionModal.value = true;
};

// Open edit modal for a customer
const openEditModal = (customer) => {
  selectedCustomer.value = customer;
  showEditModal.value = true;
};

// Make deposit for a customer
const makeDeposit = async () => {
  if (!selectedCustomer.value || !depositAmount.value || depositAmount.value <= 0) {
    toast.error('Please enter a valid deposit amount');
    return;
  }
  
  depositLoading.value = true;
  
  try {
    const customerId = selectedCustomer.value.id;
    const amount = parseFloat(depositAmount.value);
    
    const response = await api.post(`/banker/customers/${customerId}/deposit`, {
      amount,
      description: depositDescription.value || 'Deposit made by banker'
    });
    
    if (response.data && response.data.success) {
      toast.success(`Successfully deposited ${formatCurrency(amount)} to ${selectedCustomer.value.name}'s account`);
      
      // Update the customer's balance in our local state
      const customerIndex = customers.value.findIndex(c => c.id === customerId);
      if (customerIndex !== -1) {
        customers.value[customerIndex].balance += amount;
      }
      
      // Add the transaction to our local transactions array
      transactions.value.unshift({
        id: Date.now(), // Temporary ID
        type: 'deposit',
        amount: amount,
        created_at: new Date().toISOString(),
        customer_id: customerId,
        customer_name: selectedCustomer.value.name,
        status: 'completed',
        description: depositDescription.value || 'Deposit made by banker'
      });
      
      // Close modal
      showDepositModal.value = false;
    } else {
      throw new Error('Failed to process deposit');
    }
  } catch (error) {
    console.error('Error making deposit:', error);
    toast.error(error.response?.data?.message || 'Failed to process deposit. Please try again.');
  } finally {
    depositLoading.value = false;
  }
};

// Load more transactions
const loadMoreTransactions = () => {
  transactionsToShow.value += 5;
};

// Call fetchData on component mount
onMounted(() => {
  console.log('BankerDashboard component mounted, fetching data...');
  
  // Initialize default values for deposits and metrics
  deposits.value = deposits.value || [];
  depositMetrics.value = depositMetrics.value || {
    totalAmount: 0,
    totalCount: 0,
    fixedAmount: 0,
    fixedCount: 0,
    recurringAmount: 0,
    recurringCount: 0,
    taxSavingAmount: 0,
    taxSavingCount: 0
  };
  
  // Fetch customer data
  fetchData();
  
  // Separately fetch deposits data to ensure it loads even if fetchData fails
  fetchDeposits().catch(err => {
    console.error('Error fetching deposits during initialization:', err);
  });
});

// Export transactions as CSV
const downloadTransactions = () => {
  try {
    // Format transactions data for CSV
    const header = ['Date', 'Customer', 'Type', 'Amount', 'Status', 'Description'];
    const rows = filteredTransactions.value.map(tx => [
      new Date(tx.transaction_date || tx.created_at).toLocaleString(),
      tx.customer_name || `Customer ID: ${tx.customer_id}`,
      tx.type.charAt(0).toUpperCase() + tx.type.slice(1),
      tx.amount.toString(),
      formatStatus(tx.status || 'completed'),
      tx.description || '-'
    ]);
    
    // Create CSV content
    const csvContent = [
      header.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `banking-transactions-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Transactions exported successfully');
  } catch (error) {
    console.error('Error exporting transactions:', error);
    toast.error('Failed to export transactions');
  }
};

// Export transactions using the backend API
const handleExportReport = async (exportOptions) => {
  try {
    const { data, format, filename } = exportOptions;
    
    if (format === 'csv') {
      // Create CSV content
      const header = Object.keys(data[0]).join(',');
      const rows = data.map(row => {
        return Object.values(row).map(value => {
          // Handle values with commas by wrapping in quotes
          if (typeof value === 'string' && value.includes(',')) {
            return `"${value}"`;
          }
          return value;
        }).join(',');
      });
      
      const csvContent = [header, ...rows].join('\n');
      
      // Create and download the file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Export completed successfully');
    } else {
      // For Excel or PDF, use the API endpoint
      const params = new URLSearchParams({
        format,
        startDate: transactionFilters.value.startDate || '',
        endDate: transactionFilters.value.endDate || '',
        type: transactionFilters.value.type || ''
      });
      
      const response = await fetch(`/api/banker/transactions/export?${params}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to export data');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${filename}.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast.success('Export completed successfully');
    }
  } catch (error) {
    console.error('Export error:', error);
    toast.error('Failed to export data');
  }
};

// Open transaction approval modal
const openApprovalModal = (transaction) => {
  selectedTransaction.value = { ...transaction };
  showApprovalModal.value = true;
};

// Handle transaction status update (approve/reject)
const handleTransactionUpdate = (updatedTransaction) => {
  const index = transactions.value.findIndex(t => t.id === updatedTransaction.id);
  if (index !== -1) {
    // Update the transaction in the list
    transactions.value[index] = { ...transactions.value[index], ...updatedTransaction };
    toast.success(`Transaction ${updatedTransaction.status} successfully`);
  }
};


// Format transaction status
const formatStatus = (status) => {
  switch (status) {
    case 'completed':
    case 'success': return 'Completed';
    case 'pending': return 'Pending';
    case 'failed': return 'Failed';
    default: return 'Completed';
  }
};

// Handle customer update from action or edit modal
const handleCustomerUpdate = async (updatedCustomer) => {
  try {
    const index = customers.value.findIndex(c => c.id === updatedCustomer.id);
    if (index !== -1) {
      // Update the customer in the local state
      customers.value[index] = { ...customers.value[index], ...updatedCustomer };
      
      // Display appropriate message based on the action
      if (updatedCustomer.status === 'frozen') {
        toast.success(`${updatedCustomer.name}'s account has been frozen`);
      } else if (updatedCustomer.status === 'active') {
        toast.success(`${updatedCustomer.name}'s account has been unfrozen/activated`);
      } else if (updatedCustomer.status === 'inactive') {
        toast.success(`${updatedCustomer.name}'s account has been deactivated`);
      } else {
        toast.success(`${updatedCustomer.name}'s information has been updated`);
      }
    } else if (updatedCustomer.deleted) {
      // Remove customer from the list if deleted
      customers.value = customers.value.filter(c => c.id !== updatedCustomer.id);
      toast.success(`${updatedCustomer.name}'s account has been deleted`);
    }
  } catch (error) {
    console.error('Error updating customer information:', error);
    toast.error('Failed to update customer information');
  }
};

// Handle deposit viewing
const viewDeposit = (deposit) => {
  // Implementation to view deposit details
  console.log('View deposit:', deposit);
};

// Handle deposit editing
const editDeposit = (deposit) => {
  // Implementation to edit deposit
  console.log('Edit deposit:', deposit);
};

// Handle page change for deposits pagination
const handlePageChange = (page) => {
  fetchDeposits(page);
};

// Computed properties
const filteredCustomers = computed(() => {
  let filtered = customers.value;
  
  // Filter by search term
  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase();
    filtered = filtered.filter(customer => 
      customer.name.toLowerCase().includes(term) || 
      customer.email.toLowerCase().includes(term)
    );
  }
  
  // Filter by account type
  if (accountTypeFilter.value) {
    filtered = filtered.filter(customer => customer.account_type === accountTypeFilter.value);
  }
  
  return filtered;
});

// Filtered transactions based on applied filters
const filteredTransactions = computed(() => {
  let filtered = transactions.value;
  const filters = transactionFilters.value;
  
  // Apply type filter
  if (filters.type) {
    filtered = filtered.filter(tx => tx.type === filters.type);
  }
  
  // Apply customer filter
  if (filters.customerId) {
    filtered = filtered.filter(tx => tx.customer_id == filters.customerId);
  }
  
  // Apply date range filter
  if (filters.startDate) {
    const startDate = new Date(filters.startDate);
    filtered = filtered.filter(tx => {
      const txDate = new Date(tx.transaction_date || tx.created_at);
      return txDate >= startDate;
    });
  }
  
  if (filters.endDate) {
    const endDate = new Date(filters.endDate);
    endDate.setHours(23, 59, 59, 999); // End of day
    filtered = filtered.filter(tx => {
      const txDate = new Date(tx.transaction_date || tx.created_at);
      return txDate <= endDate;
    });
  }
  
  // Apply amount range filter
  if (filters.minAmount) {
    filtered = filtered.filter(tx => parseFloat(tx.amount) >= parseFloat(filters.minAmount));
  }
  
  if (filters.maxAmount) {
    filtered = filtered.filter(tx => parseFloat(tx.amount) <= parseFloat(filters.maxAmount));
  }
  
  // Apply sorting
  filtered = [...filtered].sort((a, b) => {
    const aValue = a[filters.sortBy === 'date' ? 'created_at' : filters.sortBy === 'customer' ? 'customer_name' : filters.sortBy] || '';
    const bValue = b[filters.sortBy === 'date' ? 'created_at' : filters.sortBy === 'customer' ? 'customer_name' : filters.sortBy] || '';
    
    // Handle different data types
    if (filters.sortBy === 'amount') {
      return filters.sortDirection === 'asc' 
        ? parseFloat(aValue) - parseFloat(bValue)
        : parseFloat(bValue) - parseFloat(aValue);
    } else if (filters.sortBy === 'date') {
      return filters.sortDirection === 'asc' 
        ? new Date(aValue) - new Date(bValue)
        : new Date(bValue) - new Date(aValue);
    } else {
      // String comparison for other fields
      return filters.sortDirection === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    }
  });
  
  return filtered;
});

const calculatedCustomerStats = computed(() => {
  // Calculate today's deposits and withdrawals from actual transactions
  let totalDepositsToday = 0;
  let totalWithdrawalsToday = 0;
  
  if (Array.isArray(transactions.value)) {
    transactions.value.forEach(transaction => {
      // Make sure to parse the amount as a number and handle any potential NaN values
      const transactionAmount = parseFloat(transaction.amount || 0);
      if (!isNaN(transactionAmount)) {
        if (transaction.type === 'deposit') {
          totalDepositsToday += transactionAmount;
        } else if (transaction.type === 'withdrawal' || transaction.type === 'withdraw') {
          totalWithdrawalsToday += transactionAmount;
        }
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
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2
  }).format(amount || 0);
};

const formatAccountType = (type) => {
  switch (type) {
    case 'savings': return 'Savings';
    case 'current': return 'Current';
    case 'fixed': return 'Fixed Deposit';
    default: return 'Standard';
  }
};

// Export deposits data to CSV
const exportDeposits = () => {
  try {
    if (!deposits.value.length) {
      toast.warning('No deposits data to export');
      return;
    }

    // Convert deposits data to CSV format
    const headers = ['Customer Name', 'Account Number', 'Type', 'Amount', 'Interest Rate', 'Start Date', 'Maturity Date', 'Status'];
    
    const csvContent = [
      headers.join(','),
      ...deposits.value.map(deposit => {
        return [
          deposit.customer_name || 'Unknown',
          deposit.account_number || 'N/A',
          formatDepositType(deposit.type),
          deposit.amount,
          deposit.interest_rate + '%',
          new Date(deposit.start_date).toLocaleDateString(),
          new Date(deposit.maturity_date).toLocaleDateString(),
          deposit.status
        ].join(',');
      })
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `deposits-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Deposits data exported successfully');
  } catch (err) {
    console.error('Error exporting deposits:', err);
    toast.error('Failed to export deposits data');
  }
};

// Format deposit type for display
const formatDepositType = (type) => {
  switch (type) {
    case 'fixed': return 'Fixed Deposit';
    case 'recurring': return 'Recurring Deposit';
    case 'savings': return 'Savings Deposit';
    case 'tax_saving': return 'Tax Saving FD';
    default: return type;
  }
};
</script>

<style scoped>
/* Custom scroll for mobile */
@media (max-width: 640px) {
  .overflow-x-auto {
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
  }
  .overflow-x-auto::-webkit-scrollbar {
    height: 6px;
  }
  .overflow-x-auto::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  .overflow-x-auto::-webkit-scrollbar-thumb {
    background: #cccccc;
    border-radius: 10px;
  }
  
  /* Responsive tables on small screens */
  .responsive-table {
    overflow-x: auto;
  }
}

/* Animation keyframes */
@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

@keyframes slideInRight {
  from { transform: translateX(20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

/* Animation classes */
.animate-slideUp {
  animation: slideUp 0.5s ease-out forwards;
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
}

.animate-pulse {
  animation: pulse 2s ease-in-out infinite;
}

.animate-slideInRight {
  animation: slideInRight 0.5s ease-out forwards;
}

/* Transform utilities */
.transform {
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  transform: scale(var(--tw-scale-x), var(--tw-scale-y));
}

.hover\:scale-\[1\.02\]:hover {
  --tw-scale-x: 1.02;
  --tw-scale-y: 1.02;
}

.hover\:scale-105:hover {
  --tw-scale-x: 1.05;
  --tw-scale-y: 1.05;
}

/* Dashboard specific styles */
.responsive-table {
  overflow-x: auto;
  border-radius: 0.5rem;
  width: 100%;
}

.responsive-table table {
  width: 100%;
  border-collapse: collapse;
}

.status-badge {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
}

.status-badge svg {
  margin-right: 0.25rem;
}
</style>
