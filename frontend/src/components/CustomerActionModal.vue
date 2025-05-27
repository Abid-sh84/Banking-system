<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-medium text-gray-900">Customer Actions</h3>
        <button 
          @click="close" 
          class="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <X class="h-6 w-6" />
        </button>
      </div>
      
      <div class="space-y-4">
        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-md">
          <div>
            <h4 class="font-medium text-gray-900">{{ customer?.name }}</h4>
            <p class="text-sm text-gray-500">{{ customer?.email }}</p>
          </div>          <div class="flex space-x-2">
            <span 
              class="px-2 py-1 text-xs rounded-full flex items-center" 
              :class="{
                'bg-green-100 text-green-800': customer?.status?.toLowerCase() === 'active',
                'bg-red-100 text-red-800': customer?.status?.toLowerCase() === 'inactive',
                'bg-yellow-100 text-yellow-800': customer?.status?.toLowerCase() === 'pending',
                'bg-gray-100 text-gray-800': !customer?.status || ['frozen', 'suspended'].includes(customer?.status?.toLowerCase())
              }"
              :title="getStatusDescription(customer?.status)"
            >
              {{ formatStatus(customer?.status || 'active') }}
              <span v-if="customer?.status === 'frozen' || customer?.status === 'inactive'" 
                    class="ml-1 cursor-help text-xs">
                ⓘ
              </span>
            </span>
          </div>
        </div>

        <div class="space-y-2">          <button 
            v-if="!['frozen', 'suspended'].includes(customer?.status?.toLowerCase())"
            @click="updateCustomerStatus('frozen')" 
            class="w-full flex items-center p-3 rounded-md hover:bg-blue-50 transition-colors"
            :disabled="loading"
          >
            <Lock class="h-5 w-5 mr-3 text-blue-600" />
            <span>Freeze Account</span>
          </button>
          
          <button 
            v-if="['frozen', 'suspended'].includes(customer?.status?.toLowerCase())"
            @click="updateCustomerStatus('active')" 
            class="w-full flex items-center p-3 rounded-md hover:bg-blue-50 transition-colors"
            :disabled="loading"
          >
            <RefreshCw class="h-5 w-5 mr-3 text-blue-600" />
            <span>Unfreeze Account</span>
          </button>
          
          <button 
            v-if="customer?.status?.toLowerCase() !== 'inactive'"
            @click="updateCustomerStatus('inactive')" 
            class="w-full flex items-center p-3 rounded-md hover:bg-red-50 transition-colors"
            :disabled="loading"
          >
            <Ban class="h-5 w-5 mr-3 text-red-600" />
            <span>Deactivate Account</span>
          </button>
          
          <button 
            v-if="customer?.status?.toLowerCase() === 'inactive'"
            @click="updateCustomerStatus('active')" 
            class="w-full flex items-center p-3 rounded-md hover:bg-green-50 transition-colors"
            :disabled="loading"
          >
            <CheckCircle class="h-5 w-5 mr-3 text-green-600" />
            <span>Activate Account</span>
          </button>
          
          <button 
            @click="confirmDelete" 
            class="w-full flex items-center p-3 rounded-md hover:bg-red-50 transition-colors"
            :disabled="loading || showDeleteConfirmation"
          >
            <X class="h-5 w-5 mr-3 text-red-600" />
            <span>Delete Account</span>
          </button>
          
          <div v-if="showDeleteConfirmation" class="bg-red-50 p-4 rounded-md mt-3">
            <p class="text-sm text-red-800 mb-3">Are you sure you want to delete this customer account? This action cannot be undone.</p>
            <div class="flex space-x-3">
              <button 
                @click="deleteCustomer" 
                class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                :disabled="loading"
              >
                Delete Account
              </button>
              <button 
                @click="showDeleteConfirmation = false" 
                class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                :disabled="loading"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="error" class="mt-3 text-sm text-red-600 bg-red-50 p-2 rounded">
        {{ error }}
      </div>
      
      <div v-if="loading" class="flex justify-center py-4">
        <Loader2 class="h-6 w-6 text-primary animate-spin" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useToast } from 'vue-toastification';
import { Lock, RefreshCw, Ban, X, CheckCircle, Loader2 } from 'lucide-vue-next';
import api from '../services/api';

const props = defineProps({
  show: Boolean,
  customer: Object
});

const emit = defineEmits(['close', 'customer-updated']);

const toast = useToast();
const loading = ref(false);
const error = ref('');
const showDeleteConfirmation = ref(false);

const close = () => {
  if (loading.value) return;
  showDeleteConfirmation.value = false;
  error.value = '';
  emit('close');
};

const confirmDelete = () => {
  showDeleteConfirmation.value = true;
};

const updateCustomerStatus = async (status) => {
  if (!props.customer?.id) return;
  
  loading.value = true;
  error.value = '';
  
  try {
    const response = await api.patch(`/banker/customers/${props.customer.id}/status`, {
      status
    });
    
    if (response.data?.success) {
      toast.success(`Customer status updated to ${formatStatus(status)}`);
      emit('customer-updated', { ...props.customer, status });
      close();
    } else {
      throw new Error(response.data?.message || 'Failed to update customer status');
    }
  } catch (err) {
    console.error('Error updating customer status:', err);
    error.value = err.response?.data?.message || err.message || 'Failed to update customer status';
    toast.error(error.value);
  } finally {
    loading.value = false;
  }
};

const deleteCustomer = async () => {
  if (!props.customer?.id) return;
  
  loading.value = true;
  error.value = '';
  
  try {
    const response = await api.delete(`/banker/customers/${props.customer.id}`);
    
    if (response.data?.success) {
      toast.success('Customer account deleted successfully');
      emit('customer-updated', { ...props.customer, deleted: true });
      close();
    } else {
      throw new Error(response.data?.message || 'Failed to delete customer account');
    }
  } catch (err) {
    console.error('Error deleting customer:', err);
    error.value = err.response?.data?.message || err.message || 'Failed to delete customer account';
    toast.error(error.value);
  } finally {
    loading.value = false;
  }
};

const formatStatus = (status) => {
  if (!status) return 'Unknown';
  
  // Normalize the status to handle any case variations from the database
  const normalizedStatus = status.toLowerCase();
  
  switch (normalizedStatus) {
    case 'active': return 'Active';
    case 'inactive': return 'Inactive';
    case 'pending': return 'Pending';
    case 'frozen': return 'Frozen';
    case 'suspended': return 'Frozen'; // Map 'suspended' from DB to 'Frozen' in UI
    default: return 'Unknown';
  }
};

const getStatusDescription = (status) => {
  if (!status) return 'Unknown status';
  
  const normalizedStatus = status.toLowerCase();
  
  switch (normalizedStatus) {
    case 'active': 
      return 'Account is fully functional';
    case 'inactive': 
      return 'Account is deactivated. Customer cannot login or perform any transactions.';
    case 'frozen': 
    case 'suspended': // Map 'suspended' from DB to 'frozen' description in UI
      return 'Account is frozen. Customer can view their account but cannot perform any transactions.';
    case 'pending': 
      return 'Account is pending activation';
    default: 
      return 'Unknown status';
  }
};

watch(() => props.show, (newVal) => {
  if (newVal === false) {
    showDeleteConfirmation.value = false;
    error.value = '';
  }
});
</script>
