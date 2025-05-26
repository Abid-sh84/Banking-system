<template>
  <div class="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 mb-8">
    <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
      <div>
        <h2 class="text-lg leading-6 font-medium text-gray-900">Virtual Cards</h2>
        <p class="mt-1 text-sm text-gray-500">
          Manage customer virtual debit cards
        </p>
      </div>
      <div>
        <button
          @click="fetchCards"
          class="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200"
        >
          <RefreshCw class="h-4 w-4 mr-1.5" />
          Refresh
        </button>
      </div>
    </div>
    
    <div v-if="loading" class="flex justify-center py-6">
      <Loader2 class="h-10 w-10 text-primary animate-spin" />
    </div>
    
    <div v-else-if="error" class="p-6 text-center">
      <AlertTriangle class="h-8 w-8 text-amber-500 mx-auto mb-2" />
      <p class="text-gray-700">{{ error }}</p>
      <button 
        @click="fetchCards" 
        class="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Try Again
      </button>
    </div>
    
    <div v-else-if="cards.length === 0" class="p-6 text-center">
      <CreditCard class="h-10 w-10 text-gray-400 mx-auto mb-2" />
      <p class="text-gray-500">No virtual cards have been issued yet</p>
      <p class="text-sm text-gray-400 mt-1">Cards will appear here when customers apply for them</p>
    </div>
    
    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Card Number
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Expiry
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created
            </th>
            <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="card in cards" :key="card.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ card.cardholder_name }}</div>
              <div class="text-xs text-gray-500">ID: {{ card.customer_id }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900 font-mono">{{ card.card_number }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ card.expiry_date }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span 
                class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="{
                  'bg-green-100 text-green-800': card.status === 'active',
                  'bg-yellow-100 text-yellow-800': card.status === 'inactive',
                  'bg-red-100 text-red-800': card.status === 'blocked'
                }"
              >
                {{ formatCardStatus(card.status) }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ formatDate(card.created_at) }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button 
                v-if="card.status === 'inactive'"
                @click="updateCardStatus(card.id, 'active')"
                class="text-green-600 hover:text-green-900 mr-3"
              >
                Activate
              </button>
              <button 
                v-if="card.status === 'active'"
                @click="updateCardStatus(card.id, 'inactive')"
                class="text-yellow-600 hover:text-yellow-900 mr-3"
              >
                Deactivate
              </button>
              <button 
                v-if="card.status !== 'blocked'"
                @click="updateCardStatus(card.id, 'blocked')"
                class="text-red-600 hover:text-red-900"
              >
                Block
              </button>
              <button 
                v-if="card.status === 'blocked'"
                @click="updateCardStatus(card.id, 'inactive')"
                class="text-blue-600 hover:text-blue-900"
              >
                Unblock
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Loader2, AlertTriangle, CreditCard, RefreshCw } from 'lucide-vue-next';
import { useToast } from 'vue-toastification';
import { cardService } from '../services/api';

const toast = useToast();

const cards = ref([]);
const loading = ref(true);
const error = ref('');

const fetchCards = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    const response = await cardService.getAllCards();
    
    if (response.data && response.data.success) {
      cards.value = response.data.data.cards || [];
    } else {
      throw new Error('Unexpected response format');
    }
  } catch (err) {
    console.error('Error fetching virtual cards:', err);
    error.value = err.response?.data?.message || 'Failed to load virtual cards';
    toast.error('Could not load virtual cards');
  } finally {
    loading.value = false;
  }
};

const updateCardStatus = async (cardId, status) => {
  try {
    const response = await cardService.updateCardStatus(cardId, status);
    
    if (response.data && response.data.success) {
      // Update the card status in the local array
      const cardIndex = cards.value.findIndex(card => card.id === cardId);
      if (cardIndex !== -1) {
        cards.value[cardIndex].status = status;
      }
      
      // Show success message
      let message = '';
      if (status === 'active') message = 'Card activated successfully';
      else if (status === 'inactive') message = 'Card deactivated successfully';
      else if (status === 'blocked') message = 'Card blocked successfully';
      
      toast.success(message);
    } else {
      throw new Error('Unexpected response format');
    }
  } catch (err) {
    console.error('Error updating card status:', err);
    toast.error(err.response?.data?.message || 'Failed to update card status');
  }
};

const formatCardStatus = (status) => {
  switch (status) {
    case 'active': return 'Active';
    case 'inactive': return 'Inactive';
    case 'blocked': return 'Blocked';
    default: return status;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

onMounted(() => {
  fetchCards();
});
</script>
