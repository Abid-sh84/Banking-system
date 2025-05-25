<template>
  <div class="bg-white shadow-md rounded-lg p-5">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
      <h3 class="text-lg font-semibold mb-2 sm:mb-0">
        Transaction Filters
        <span class="text-sm font-normal text-gray-500 ml-2" v-if="activeFiltersCount > 0">
          ({{ activeFiltersCount }} active)
        </span>
      </h3>
      
      <div class="flex space-x-2">
        <button
          @click="applyFilters"
          class="px-4 py-2 bg-primary text-white rounded-md text-sm hover:bg-primary-light transition-colors duration-200"
        >
          Apply
        </button>
        <button
          @click="resetFilters"
          class="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
        >
          Reset
        </button>
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Date Range Filter -->
      <div class="filter-group">
        <label class="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="text-xs text-gray-500">From</label>
            <input 
              type="date"
              v-model="filters.startDate"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
          </div>
          <div>
            <label class="text-xs text-gray-500">To</label>
            <input 
              type="date" 
              v-model="filters.endDate"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
          </div>
        </div>
      </div>
      
      <!-- Transaction Type Filter -->
      <div class="filter-group">
        <label class="block text-sm font-medium text-gray-700 mb-1">Transaction Type</label>
        <select
          v-model="filters.type"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
        >
          <option value="">All Types</option>
          <option value="deposit">Deposit</option>
          <option value="withdrawal">Withdrawal</option>
          <option value="transfer">Transfer</option>
        </select>
      </div>
      
      <!-- Amount Range Filter -->
      <div class="filter-group">
        <label class="block text-sm font-medium text-gray-700 mb-1">Amount Range</label>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="text-xs text-gray-500">Min (₹)</label>
            <input 
              type="number" 
              v-model="filters.minAmount"
              placeholder="0"
              min="0"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
          </div>
          <div>
            <label class="text-xs text-gray-500">Max (₹)</label>
            <input 
              type="number" 
              v-model="filters.maxAmount"
              placeholder="99999"
              min="0"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
          </div>
        </div>
      </div>
      
      <!-- Customer Filter -->
      <div class="filter-group">
        <label class="block text-sm font-medium text-gray-700 mb-1">Customer</label>
        <select
          v-model="filters.customerId"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
        >
          <option value="">All Customers</option>
          <option v-for="customer in customers" :key="customer.id" :value="customer.id">
            {{ customer.name }}
          </option>
        </select>
      </div>
    </div>
    
    <!-- Sort Options -->
    <div class="mt-4 pt-4 border-t border-gray-200">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <span class="text-sm font-medium text-gray-700 mb-2 sm:mb-0">Sort By:</span>
        
        <div class="flex flex-wrap gap-2">
          <button
            v-for="option in sortOptions"
            :key="option.value"
            @click="setSort(option.value)"
            class="px-3 py-1 text-xs rounded-full border transition-colors duration-200"
            :class="filters.sortBy === option.value ? 
              'bg-primary text-white border-primary' : 
              'border-gray-300 hover:border-primary hover:text-primary'"
          >
            {{ option.label }}
            <component 
              :is="filters.sortDirection === 'asc' && filters.sortBy === option.value ? 
                ChevronUp : ChevronDown" 
              v-if="filters.sortBy === option.value"
              class="h-3 w-3 inline-block ml-1"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { ChevronUp, ChevronDown } from 'lucide-vue-next';

const emit = defineEmits(['filter']);

const props = defineProps({
  customers: {
    type: Array,
    default: () => []
  },
  initialFilters: {
    type: Object,
    default: () => ({})
  }
});

// Default filter state
const defaultFilters = {
  startDate: '',
  endDate: '',
  type: '',
  minAmount: '',
  maxAmount: '',
  customerId: '',
  sortBy: 'date',
  sortDirection: 'desc'
};

// Initialize filters with defaults and any initial values
const filters = ref({
  ...defaultFilters,
  ...props.initialFilters
});

// Sort options
const sortOptions = [
  { label: 'Date', value: 'date' },
  { label: 'Amount', value: 'amount' },
  { label: 'Type', value: 'type' },
  { label: 'Customer', value: 'customer' }
];

// Count of active filters for UI display
const activeFiltersCount = computed(() => {
  let count = 0;
  
  if (filters.value.startDate) count++;
  if (filters.value.endDate) count++;
  if (filters.value.type) count++;
  if (filters.value.minAmount) count++;
  if (filters.value.maxAmount) count++;
  if (filters.value.customerId) count++;
  
  return count;
});

// Function to toggle sort direction when clicking the same sort option
const setSort = (sortBy) => {
  if (filters.value.sortBy === sortBy) {
    // Toggle direction if same field
    filters.value.sortDirection = filters.value.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    // Set new field with default direction
    filters.value.sortBy = sortBy;
    filters.value.sortDirection = 'desc';
  }
};

// Apply filters
const applyFilters = () => {
  emit('filter', { ...filters.value });
};

// Reset filters
const resetFilters = () => {
  Object.assign(filters.value, defaultFilters);
  emit('filter', { ...filters.value });
};

// Apply filters on mount to ensure parent gets initial values
watch(
  () => props.initialFilters,
  (newVal) => {
    if (newVal && Object.keys(newVal).length > 0) {
      Object.assign(filters.value, { ...defaultFilters, ...newVal });
    }
  },
  { immediate: true, deep: true }
);
</script>

<style scoped>
.filter-group {
  margin-bottom: 0.5rem;
}
</style>
