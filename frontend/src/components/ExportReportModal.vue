<template>
  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="modelValue" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeModal"></div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div 
          class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
          @click.stop
        >
          <div class="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
              @click="closeModal"
            >
              <span class="sr-only">Close</span>
              <X class="h-6 w-6" />
            </button>
          </div>
          
          <div>
            <div class="text-center">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Export Transactions Report
              </h3>
              <p class="mt-1 text-sm text-gray-500">
                Select options for your export
              </p>
            </div>

            <div class="mt-5">
              <form @submit.prevent="exportReport">
                <!-- Export Format -->
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Format
                  </label>
                  <select 
                    v-model="exportOptions.format" 
                    class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-md"
                  >
                    <option value="csv">CSV</option>
                    <option value="xlsx">Excel</option>
                    <option value="pdf">PDF</option>
                  </select>
                </div>

                <!-- Date Range -->
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="text-xs text-gray-500">From</label>
                      <input 
                        type="date"
                        v-model="exportOptions.startDate"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                      />
                    </div>
                    <div>
                      <label class="text-xs text-gray-500">To</label>
                      <input 
                        type="date" 
                        v-model="exportOptions.endDate"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                      />
                    </div>
                  </div>
                </div>
                
                <!-- Transaction Type -->
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Transaction Types
                  </label>
                  <div class="mt-1 space-y-2">
                    <div class="flex items-center">
                      <input 
                        id="type-all" 
                        type="checkbox" 
                        v-model="exportOptions.allTypes"
                        class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label for="type-all" class="ml-2 block text-sm text-gray-700">
                        All Types
                      </label>
                    </div>
                    <div v-if="!exportOptions.allTypes" class="pl-6 space-y-2">
                      <div v-for="type in transactionTypes" :key="type.value" class="flex items-center">
                        <input 
                          :id="`type-${type.value}`" 
                          type="checkbox" 
                          v-model="exportOptions.selectedTypes"
                          :value="type.value"
                          class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <label :for="`type-${type.value}`" class="ml-2 block text-sm text-gray-700">
                          {{ type.label }}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Include Fields -->
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Fields to Include
                  </label>
                  <div class="grid grid-cols-2 gap-2 mt-1">
                    <div v-for="field in availableFields" :key="field.value" class="flex items-center">
                      <input 
                        :id="`field-${field.value}`" 
                        type="checkbox" 
                        v-model="exportOptions.selectedFields"
                        :value="field.value"
                        class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label :for="`field-${field.value}`" class="ml-2 block text-sm text-gray-700">
                        {{ field.label }}
                      </label>
                    </div>
                  </div>
                </div>
                
                <!-- Export Actions -->
                <div class="mt-6 flex justify-between">
                  <button
                    type="button"
                    class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    @click="closeModal"
                  >
                    Cancel
                  </button>
                  <div class="flex space-x-2">
                    <button
                      type="button"
                      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      @click="previewReport"
                      :disabled="exporting"
                    >
                      <EyeIcon v-if="!previewing" class="h-4 w-4 mr-1" />
                      <Loader2 v-else class="h-4 w-4 mr-1 animate-spin" />
                      Preview
                    </button>
                    <button
                      type="submit"
                      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      :disabled="exporting"
                    >
                      <DownloadIcon v-if="!exporting" class="h-4 w-4 mr-1" />
                      <Loader2 v-else class="h-4 w-4 mr-1 animate-spin" />
                      Export
                    </button>
                  </div>
                </div>
                
                <div v-if="exportError" class="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-md">
                  {{ exportError }}
                </div>
              </form>
            </div>
          </div>
          
          <!-- Preview Section -->
          <div v-if="previewData.length > 0" class="mt-6">
            <h4 class="text-sm font-medium text-gray-700 mb-2">Preview (First 5 records)</h4>
            <div class="bg-gray-50 p-3 rounded-md overflow-x-auto text-sm">
              <table class="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th v-for="(field, idx) in previewFields" :key="idx" class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {{ field }}
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(row, rowIdx) in previewData" :key="rowIdx">
                    <td v-for="(field, fieldIdx) in previewFields" :key="fieldIdx" class="px-3 py-2 whitespace-nowrap text-xs">
                      {{ row[field] }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';
import { X as XIcon, Eye as EyeIcon, Download as DownloadIcon, Loader2 } from 'lucide-vue-next';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  transactions: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:modelValue', 'export']);

const exporting = ref(false);
const previewing = ref(false);
const exportError = ref('');
const previewData = ref([]);
const previewFields = ref([]);

const transactionTypes = [
  { value: 'deposit', label: 'Deposits' },
  { value: 'withdrawal', label: 'Withdrawals' },
  { value: 'transfer', label: 'Transfers' }
];

const availableFields = [
  { value: 'transaction_id', label: 'Transaction ID' },
  { value: 'customer_id', label: 'Customer ID' },
  { value: 'customer_name', label: 'Customer Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'type', label: 'Type' },
  { value: 'status', label: 'Status' },
  { value: 'date', label: 'Date' },
  { value: 'description', label: 'Description' }
];

const exportOptions = reactive({
  format: 'csv',
  startDate: '',
  endDate: '',
  allTypes: true,
  selectedTypes: ['deposit', 'withdrawal', 'transfer'],
  selectedFields: availableFields.map(f => f.value)
});

const closeModal = () => {
  emit('update:modelValue', false);
  resetForm();
};

const resetForm = () => {
  exportOptions.format = 'csv';
  exportOptions.startDate = '';
  exportOptions.endDate = '';
  exportOptions.allTypes = true;
  exportOptions.selectedTypes = ['deposit', 'withdrawal', 'transfer'];
  exportOptions.selectedFields = availableFields.map(f => f.value);
  exportError.value = '';
  previewData.value = [];
};

const getFilteredTransactions = () => {
  return props.transactions.filter(transaction => {
    // Filter by date if dates are specified
    const transactionDate = new Date(transaction.transaction_date || transaction.created_at);
    let passesDateFilter = true;
    
    if (exportOptions.startDate) {
      const startDate = new Date(exportOptions.startDate);
      passesDateFilter = passesDateFilter && transactionDate >= startDate;
    }
    
    if (exportOptions.endDate) {
      const endDate = new Date(exportOptions.endDate);
      // Set time to end of day
      endDate.setHours(23, 59, 59, 999);
      passesDateFilter = passesDateFilter && transactionDate <= endDate;
    }
    
    // Filter by type
    const passesTypeFilter = exportOptions.allTypes || 
      exportOptions.selectedTypes.includes(transaction.type.toLowerCase());
    
    return passesDateFilter && passesTypeFilter;
  });
};

const formatTransactionsForExport = (transactions) => {
  return transactions.map(transaction => {
    const formattedTransaction = {};
    
    if (exportOptions.selectedFields.includes('transaction_id')) {
      formattedTransaction.transaction_id = transaction.id || transaction.transaction_id;
    }
    
    if (exportOptions.selectedFields.includes('customer_id')) {
      formattedTransaction.customer_id = transaction.customer_id;
    }
    
    if (exportOptions.selectedFields.includes('customer_name')) {
      formattedTransaction.customer_name = transaction.customer_name || 'N/A';
    }
    
    if (exportOptions.selectedFields.includes('amount')) {
      formattedTransaction.amount = transaction.amount ? 
        formatCurrency(transaction.amount) : 'N/A';
    }
    
    if (exportOptions.selectedFields.includes('type')) {
      formattedTransaction.type = transaction.type ? 
        transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1) : 'N/A';
    }
    
    if (exportOptions.selectedFields.includes('status')) {
      formattedTransaction.status = transaction.status ? 
        transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1) : 'N/A';
    }
    
    if (exportOptions.selectedFields.includes('date')) {
      const date = transaction.transaction_date || transaction.created_at;
      formattedTransaction.date = date ? new Date(date).toLocaleDateString() : 'N/A';
    }
    
    if (exportOptions.selectedFields.includes('description')) {
      formattedTransaction.description = transaction.description || 'N/A';
    }
    
    return formattedTransaction;
  });
};

const formatCurrency = (value) => {
  if (typeof value !== 'number') return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
};

const previewReport = async () => {
  try {
    previewing.value = true;
    exportError.value = '';
    
    const filteredTransactions = getFilteredTransactions();
    if (filteredTransactions.length === 0) {
      exportError.value = 'No data found for the selected criteria';
      previewing.value = false;
      return;
    }
    
    const formattedData = formatTransactionsForExport(filteredTransactions);
    previewData.value = formattedData.slice(0, 5); // Only show first 5 records
    previewFields.value = Object.keys(formattedData[0]);
  } catch (error) {
    console.error('Preview error:', error);
    exportError.value = 'Error generating preview';
  } finally {
    previewing.value = false;
  }
};

const exportReport = async () => {
  try {
    exporting.value = true;
    exportError.value = '';
    
    const filteredTransactions = getFilteredTransactions();
    if (filteredTransactions.length === 0) {
      exportError.value = 'No data found for the selected criteria';
      exporting.value = false;
      return;
    }
    
    const formattedData = formatTransactionsForExport(filteredTransactions);
    
    // Emit the export event with the formatted data and options
    emit('export', {
      data: formattedData,
      format: exportOptions.format,
      filename: `transactions-report-${new Date().toISOString().split('T')[0]}`
    });
    
    // Close modal after successful export
    setTimeout(() => {
      closeModal();
    }, 1000);
  } catch (error) {
    console.error('Export error:', error);
    exportError.value = 'Error exporting data';
  } finally {
    exporting.value = false;
  }
};

// Watch for changes in allTypes to handle the selection logic
watch(() => exportOptions.allTypes, (newValue) => {
  if (newValue) {
    exportOptions.selectedTypes = ['deposit', 'withdrawal', 'transfer'];
  }
});
</script>

<style scoped>
.animate-slideUp {
  animation: slideUp 0.5s ease-out forwards;
}

@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
