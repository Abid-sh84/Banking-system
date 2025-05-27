<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-medium text-gray-900">Edit Customer Details</h3>
        <button 
          @click="close" 
          class="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <X class="h-6 w-6" />
        </button>
      </div>
      
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
            <input 
              id="name" 
              v-model="formData.name" 
              type="text" 
              class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
            <input 
              id="email" 
              v-model="formData.email" 
              type="email" 
              class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
            <input 
              id="phone" 
              v-model="formData.phone" 
              type="text" 
              class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
            <input 
              id="address" 
              v-model="formData.address" 
              type="text" 
              class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label for="city" class="block text-sm font-medium text-gray-700">City</label>
            <input 
              id="city" 
              v-model="formData.city" 
              type="text" 
              class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label for="state" class="block text-sm font-medium text-gray-700">State</label>
            <input 
              id="state" 
              v-model="formData.state" 
              type="text" 
              class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label for="zip" class="block text-sm font-medium text-gray-700">ZIP/Postal Code</label>
            <input 
              id="zip" 
              v-model="formData.zip" 
              type="text" 
              class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
      
      <div v-if="error" class="mt-4 text-sm text-red-600 bg-red-50 p-3 rounded">
        {{ error }}
      </div>
      
      <div class="mt-6 flex justify-end space-x-3">
        <button 
          @click="close" 
          class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          :disabled="loading"
        >
          Cancel
        </button>
        <button 
          @click="saveChanges" 
          class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          :disabled="loading"
        >
          <span v-if="!loading">Save Changes</span>
          <Loader2 v-else class="h-5 w-5 animate-spin" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useToast } from 'vue-toastification';
import { X, Loader2 } from 'lucide-vue-next';
import api from '../services/api';

const props = defineProps({
  show: Boolean,
  customer: Object
});

const emit = defineEmits(['close', 'customer-updated']);

const toast = useToast();
const loading = ref(false);
const error = ref('');

const formData = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: ''
});

const close = () => {
  if (loading.value) return;
  error.value = '';
  emit('close');
};

const saveChanges = async () => {
  if (!props.customer?.id) return;
  
  loading.value = true;
  error.value = '';
  
  try {
    const response = await api.put(`/banker/customers/${props.customer.id}`, formData.value);
    
    if (response.data?.success) {
      toast.success('Customer details updated successfully');
      emit('customer-updated', { ...props.customer, ...formData.value });
      close();
    } else {
      throw new Error(response.data?.message || 'Failed to update customer details');
    }
  } catch (err) {
    console.error('Error updating customer:', err);
    error.value = err.response?.data?.message || err.message || 'Failed to update customer details';
    toast.error(error.value);
  } finally {
    loading.value = false;
  }
};

watch(() => props.customer, (newCustomer) => {
  if (newCustomer) {
    // Initialize form with customer data
    formData.value = {
      name: newCustomer.name || '',
      email: newCustomer.email || '',
      phone: newCustomer.phone || '',
      address: newCustomer.address || '',
      city: newCustomer.city || '',
      state: newCustomer.state || '',
      zip: newCustomer.zip || ''
    };
  }
}, { immediate: true });
</script>
