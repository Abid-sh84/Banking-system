<template>
  <div v-if="modelValue" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl relative">
      <button
        @click="closeModal"
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
      >
        <X class="h-5 w-5" />
      </button>
      
      <div v-if="step === 'terms'">
        <div class="flex items-center mb-4">
          <div class="bg-blue-100 p-2 rounded-full">
            <CreditCard class="h-5 w-5 text-blue-600" />
          </div>
          <h3 class="text-lg font-medium text-gray-900 ml-3">
            Apply for Virtual Debit Card
          </h3>
        </div>
        
        <p class="text-gray-600 mb-4">
          Our virtual debit card allows you to make secure online payments without exposing your physical card details.
        </p>
        
        <div class="bg-gray-50 p-4 rounded-md text-sm mb-4 max-h-48 overflow-y-auto">
          <h4 class="font-medium mb-2">Terms and Conditions</h4>
          <p class="mb-2">By applying for a virtual debit card, you agree to the following terms:</p>
          <ol class="list-decimal pl-5 space-y-1">
            <li>Your virtual card is linked to your bank account and will use funds from your available balance.</li>
            <li>The virtual card can only be used for online transactions.</li>
            <li>You must keep your card details secure and not share them with others.</li>
            <li>You are responsible for all transactions made using your virtual card.</li>
            <li>The bank reserves the right to block or deactivate your card if suspicious activity is detected.</li>
            <li>There may be daily or monthly transaction limits applied to your virtual card.</li>
            <li>Standard fees and charges may apply as per the bank's fee schedule.</li>
            <li>The bank is not responsible for declined transactions due to insufficient funds or merchant restrictions.</li>
            <li>Your virtual card will have an expiry date after which it will need to be renewed.</li>
            <li>The bank may update these terms and conditions from time to time.</li>
          </ol>
        </div>
        
        <div class="mb-5">
          <label class="flex items-start">
            <input 
              type="checkbox" 
              v-model="termsAccepted"
              class="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <span class="ml-3 text-sm text-gray-600">
              I have read and agree to the terms and conditions for using a virtual debit card.
            </span>
          </label>
        </div>
        
        <div class="flex justify-end">
          <button
            @click="closeModal"
            class="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            @click="submitApplication"
            :disabled="!termsAccepted || loading"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            :class="{ 'opacity-50 cursor-not-allowed': !termsAccepted || loading }"
          >
            <Loader2 v-if="loading" class="h-4 w-4 mr-2 animate-spin" />
            <span v-else>Apply for Card</span>
          </button>
        </div>
      </div>
      
      <div v-else-if="step === 'success'" class="text-center py-4">
        <div class="bg-green-100 p-3 rounded-full inline-flex mb-4">
          <CheckCircle class="h-8 w-8 text-green-600" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          Application Submitted!
        </h3>
        <p class="text-gray-600 mb-6">
          Your virtual debit card application has been submitted successfully. Our team will review your application and activate your card shortly.
        </p>
        <button
          @click="closeModal"
          class="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Got it
        </button>
      </div>
      
      <div v-else-if="step === 'error'" class="text-center py-4">
        <div class="bg-red-100 p-3 rounded-full inline-flex mb-4">
          <XCircle class="h-8 w-8 text-red-600" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          Application Failed
        </h3>
        <p class="text-gray-600 mb-6">
          {{ errorMessage || "We couldn't process your card application at this time. Please try again later." }}
        </p>
        <button
          @click="closeModal"
          class="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CreditCard, X, Loader2, CheckCircle, XCircle } from 'lucide-vue-next';
import { cardService } from '../services/api';
import { useToast } from 'vue-toastification';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['update:modelValue', 'card-applied']);
const toast = useToast();

const termsAccepted = ref(false);
const step = ref('terms');
const loading = ref(false);
const errorMessage = ref('');

const submitApplication = async () => {
  if (!termsAccepted.value) return;
  
  loading.value = true;
  try {
    const response = await cardService.applyForCard(termsAccepted.value);
    
    if (response.data && response.data.success) {
      step.value = 'success';
      emit('card-applied');
    } else {
      throw new Error('Unexpected response format');
    }
  } catch (error) {
    console.error('Error applying for virtual card:', error);
    step.value = 'error';
    errorMessage.value = error.response?.data?.message || 'Failed to process your application';
    toast.error('Card application failed: ' + errorMessage.value);
  } finally {
    loading.value = false;
  }
};

const closeModal = () => {
  emit('update:modelValue', false);
  
  // Reset state after modal closes
  setTimeout(() => {
    termsAccepted.value = false;
    step.value = 'terms';
    errorMessage.value = '';
  }, 300);
};
</script>
