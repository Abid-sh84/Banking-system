<!-- filepath: c:\Users\Shamim shaikh\Desktop\Assignment\project\frontend\src\components\DepositModal.vue -->
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
          
          <!-- Deposit Modal Header -->
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10 bg-blue-100">
              <component 
                :is="ArrowDownLeft" 
                class="h-6 w-6 text-blue-600"
              />
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Make a Deposit
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Choose a deposit type and enter the amount you wish to deposit into your account.
                </p>
              </div>
            </div>
          </div>

          <!-- Deposit Form -->
          <form class="mt-5 sm:mt-4" @submit.prevent="handleSubmit">
            <!-- Deposit Type Selector -->
            <div class="mb-4">
              <label for="depositType" class="block text-sm font-medium text-gray-700 mb-1">Deposit Type</label>
              <div class="grid grid-cols-2 gap-3">
                <div 
                  v-for="option in depositTypes" 
                  :key="option.id" 
                  @click="depositType = option.id"
                  class="flex p-3 border rounded-md cursor-pointer transition-all"
                  :class="depositType === option.id 
                    ? 'bg-blue-50 border-blue-300 ring-1 ring-blue-500' 
                    : 'bg-white border-gray-300 hover:border-gray-400'"
                >
                  <div class="flex-1">
                    <div class="flex items-center justify-between">
                      <div class="text-sm font-medium text-gray-900">{{ option.name }}</div>
                      <component 
                        :is="depositType === option.id ? CheckCircle2 : Circle" 
                        class="h-4 w-4" 
                        :class="depositType === option.id ? 'text-blue-500' : 'text-gray-400'"
                      />
                    </div>
                    <p class="mt-1 text-xs text-gray-500">{{ option.description }}</p>
                    <div class="mt-1 text-xs font-medium" :class="getInterestRateColor(option.interestRate)">
                      {{ option.interestRate }}% p.a.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Tenure (Term) Selector -->
            <div class="mb-4" v-if="depositType !== 'savings'">
              <label for="tenure" class="block text-sm font-medium text-gray-700">Tenure (Months)</label>
              <div class="mt-1">
                <select 
                  v-model="tenure" 
                  id="tenure" 
                  name="tenure"
                  class="focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  required
                >
                  <option value="" disabled>Select deposit term</option>
                  <option v-for="option in tenureOptions" :key="option.months" :value="option.months">
                    {{ option.months }} months ({{ option.years }} {{ option.years === 1 ? 'year' : 'years' }})
                  </option>
                </select>
              </div>
              <p class="mt-1 text-xs text-gray-500">
                <span v-if="depositType === 'fixed'">Early withdrawal will incur a penalty of 1% on the interest.</span>
                <span v-else-if="depositType === 'recurring'">Requires monthly contributions of the same amount.</span>
                <span v-else-if="depositType === 'tax_saving'">Locked for 5 years with tax benefits under section 80C.</span>
              </p>
            </div>
            
            <!-- Amount Input -->
            <div class="mb-4">
              <label for="amount" class="block text-sm font-medium text-gray-700">Amount (INR)</label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 sm:text-sm">₹</span>
                </div>
                <input
                  v-model="amount"
                  type="number"
                  name="amount"
                  id="amount"
                  class="focus:ring-primary focus:border-primary block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00"
                  step="0.01"
                  min="0.01"
                  max="1000000"
                  required
                  @keypress="validateNumberInput"
                />
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 sm:text-sm">INR</span>
                </div>
              </div>
            </div>
            
            <!-- Description Input -->
            <div class="mb-4">
              <label for="description" class="block text-sm font-medium text-gray-700">Description (optional)</label>
              <div class="mt-1">
                <textarea
                  v-model="description"
                  id="description"
                  name="description"
                  rows="2"
                  class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Add a description for this deposit"
                ></textarea>
              </div>
            </div>
            
            <!-- Summary Card - only shown when deposit type is selected -->
            <div v-if="depositType && depositType !== 'savings'" class="mt-4 mb-4 p-3 bg-gray-50 rounded-md border border-gray-200">
              <h4 class="text-sm font-medium text-gray-700">Deposit Summary</h4>
              
              <div class="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span class="text-gray-500">Principal:</span>
                  <span class="ml-1 font-medium">{{ formatCurrency(amount || 0) }}</span>
                </div>
                
                <div>
                  <span class="text-gray-500">Term:</span>
                  <span class="ml-1 font-medium">{{ tenure || 0 }} months</span>
                </div>
                
                <div>
                  <span class="text-gray-500">Interest Rate:</span>
                  <span class="ml-1 font-medium">{{ currentInterestRate }}% p.a.</span>
                </div>
                
                <div>
                  <span class="text-gray-500">Est. Interest:</span>
                  <span class="ml-1 font-medium text-green-600">{{ formatCurrency(estimatedInterest) }}</span>
                </div>
                
                <div class="col-span-2">
                  <span class="text-gray-500">Maturity Value:</span>
                  <span class="ml-1 font-medium text-blue-600">{{ formatCurrency(maturityValue) }}</span>
                </div>
              </div>
            </div>
            
            <!-- Error Message -->
            <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
            
            <!-- Form Actions -->
            <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              <button
                type="submit"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                :disabled="loading || !isFormValid"
              >
                <Loader2 v-if="loading" class="animate-spin h-4 w-4 mr-1" />
                <span>{{ loading ? 'Processing...' : 'Deposit' }}</span>
              </button>
              <button
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:col-start-1 sm:text-sm"
                @click="closeModal"
                :disabled="loading"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch, computed } from 'vue';
import { ArrowDownLeft, X, Circle, CheckCircle2, Loader2 } from 'lucide-vue-next';
import { useToast } from 'vue-toastification';

const props = defineProps({
  modelValue: Boolean,
  currentBalance: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['update:modelValue', 'deposit-completed']);
const toast = useToast();

// Form data
const depositType = ref('savings');
const amount = ref('');
const tenure = ref('');
const description = ref('');
const error = ref('');
const loading = ref(false);

// Deposit type options
const depositTypes = [
  { 
    id: 'savings', 
    name: 'Savings', 
    description: 'Regular savings deposit',
    interestRate: 3.5 
  },
  { 
    id: 'fixed', 
    name: 'Fixed Deposit', 
    description: 'Locked for a fixed term',
    interestRate: 7.0
  },
  { 
    id: 'recurring', 
    name: 'Recurring Deposit', 
    description: 'Regular monthly deposits',
    interestRate: 6.5
  },
  { 
    id: 'tax_saving', 
    name: 'Tax Saving FD', 
    description: '5-year lock-in with tax benefits',
    interestRate: 7.5
  }
];

// Tenure options for deposits
const tenureOptions = [
  { months: 3, years: 0.25 },
  { months: 6, years: 0.5 },
  { months: 12, years: 1 },
  { months: 24, years: 2 },
  { months: 36, years: 3 },
  { months: 60, years: 5 }
];

// Reset form when modal is closed
watch(() => props.modelValue, (newVal) => {
  if (!newVal) {
    resetForm();
  }
});

// Get current interest rate based on selected deposit type
const currentInterestRate = computed(() => {
  const selectedType = depositTypes.find(type => type.id === depositType.value);
  return selectedType ? selectedType.interestRate : 0;
});

// Calculate estimated interest (simple interest calculation)
const estimatedInterest = computed(() => {
  if (!amount.value || !tenure.value || depositType.value === 'savings') {
    return 0;
  }
  
  const principal = parseFloat(amount.value);
  const rate = currentInterestRate.value;
  const timeInYears = parseInt(tenure.value) / 12;
  
  // Simple interest formula: P × R × T ÷ 100
  return (principal * rate * timeInYears) / 100;
});

// Calculate maturity value
const maturityValue = computed(() => {
  if (!amount.value || depositType.value === 'savings') {
    return parseFloat(amount.value || 0);
  }
  
  return parseFloat(amount.value) + estimatedInterest.value;
});

// Form validation
const isFormValid = computed(() => {
  if (!depositType.value) return false;
  if (!amount.value || parseFloat(amount.value) <= 0) return false;
  if (depositType.value !== 'savings' && !tenure.value) return false;
  
  return true;
});

// Get CSS class for interest rate display
const getInterestRateColor = (rate) => {
  if (rate >= 7) return 'text-green-600';
  if (rate >= 5) return 'text-blue-600';
  return 'text-gray-600';
};

// Input validation functions
const validateNumberInput = (event) => {
  const charCode = event.which ? event.which : event.keyCode;
  if (
    (charCode > 31 && (charCode < 48 || charCode > 57)) && 
    charCode !== 46 // Allow decimal point
  ) {
    event.preventDefault();
  }
  
  // Ensure only one decimal point
  if (charCode === 46 && amount.value.includes('.')) {
    event.preventDefault();
  }
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

const closeModal = () => {
  emit('update:modelValue', false);
};

const resetForm = () => {
  depositType.value = 'savings';
  amount.value = '';
  tenure.value = '';
  description.value = '';
  error.value = '';
  loading.value = false;
};

// Form submission
const handleSubmit = async () => {
  // Clear previous errors
  error.value = '';
  
  // Basic validation
  if (!depositType.value) {
    error.value = 'Please select a deposit type.';
    return;
  }
  
  if (!amount.value || parseFloat(amount.value) <= 0) {
    error.value = 'Please enter a valid amount greater than zero.';
    return;
  }
  
  if (depositType.value !== 'savings' && !tenure.value) {
    error.value = 'Please select a tenure for your deposit.';
    return;
  }
  
  try {
    loading.value = true;
    
    // Emit event to parent component to handle the API call
    emit('deposit-completed', {
      type: depositType.value,
      amount: parseFloat(amount.value),
      tenure: depositType.value === 'savings' ? 0 : parseInt(tenure.value),
      interestRate: currentInterestRate.value,
      description: description.value
    });
    
    // Close modal
    closeModal();
  } catch (err) {
    error.value = err.message || 'An error occurred. Please try again.';
    toast.error('Deposit failed. Please try again.');
  } finally {
    loading.value = false;
  }
};
</script>
