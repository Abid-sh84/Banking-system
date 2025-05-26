<template>  <div class="mb-8 bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100 w-full max-w-7xl mx-auto">
    <div class="bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-5 sm:px-6 text-white">
      <div class="flex justify-between items-center">
        <div>
          <h3 class="text-xl font-bold">
            Virtual Debit Card
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-blue-100">
            Secure online payments without exposing your physical card details
          </p>
        </div>
        <div class="h-12 w-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
          <CreditCard class="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
    
    <div class="p-6">
      <div v-if="loading" class="flex justify-center py-6">
        <Loader2 class="h-8 w-8 text-primary animate-spin" />
      </div>
      
      <div v-else-if="error" class="text-red-600 py-4">
        <p>{{ error }}</p>
        <button 
          @click="fetchCardData" 
          class="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Retry
        </button>
      </div>
        <div v-else-if="card" class="flex flex-col items-center w-full">
        <VirtualCard :card="card" />
        <div class="w-full mt-6 max-w-md text-center" v-if="card.status === 'inactive'">
          <p class="text-amber-700 bg-amber-50 p-3 rounded text-sm mb-3">
            Your card is awaiting activation by a banker. This usually takes 1-2 business days.
          </p>
        </div>
      </div>
        <div v-else class="flex flex-col items-center py-4">
        <div class="w-full max-w-md text-center mb-6">
          <div class="p-6 border border-dashed border-gray-300 rounded-lg">
            <div class="h-16 w-16 mx-auto bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
              <CreditCard class="h-8 w-8" />
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No Virtual Card Yet</h3>
            <p class="text-gray-600 mb-4">
              Apply for a virtual debit card to make secure online transactions without exposing your physical card details.
            </p>
            <button 
              @click="showCardApplicationModal = true"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Apply for Virtual Card
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Card Application Modal -->
    <CardApplicationModal 
      v-model="showCardApplicationModal"
      @card-applied="handleCardApplied"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { CreditCard, Loader2 } from 'lucide-vue-next';
import { useToast } from 'vue-toastification';
import { cardService } from '../services/api';
import VirtualCard from './VirtualCard.vue';
import CardApplicationModal from './CardApplicationModal.vue';

const toast = useToast();

const card = ref(null);
const loading = ref(true);
const error = ref('');
const showCardApplicationModal = ref(false);

const fetchCardData = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    const response = await cardService.getMyCard();
    
    if (response.data && response.data.success) {
      card.value = response.data.data.card;
    } else {
      // User doesn't have a card yet (this is not an error)
      card.value = null;
    }
  } catch (err) {
    // 404 is expected if user hasn't applied for a card yet
    if (err.response && err.response.status === 404) {
      card.value = null;
    } else {
      console.error('Error fetching virtual card data:', err);
      error.value = err.response?.data?.message || 'Failed to load card data';
      toast.error('Could not load card information');
    }
  } finally {
    loading.value = false;
  }
};

const handleCardApplied = () => {
  toast.success('Card application submitted successfully');
  fetchCardData(); // Refresh card data
};

onMounted(() => {
  fetchCardData();
});
</script>
