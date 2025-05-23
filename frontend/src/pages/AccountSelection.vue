<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 full-width-bg">
    <div class="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
      <div class="flex justify-center">
        <div class="h-16 w-16 bg-gradient-to-r from-primary to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
          <span class="text-white text-2xl font-bold">MB</span>
        </div>
      </div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Choose Account Type
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Select an account type to start your application
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
      <div class="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10 transition-all duration-300 hover:shadow-xl">
        <div class="space-y-6">
          <!-- Account Type Selection Cards -->
          <div class="grid grid-cols-1 gap-4">
            <!-- Savings Account Card -->
            <div 
              @click="selectAccountType('savings')" 
              class="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-all duration-200 hover:bg-blue-50"
              :class="{ 'border-blue-500 bg-blue-50': selectedType === 'savings' }"
            >
              <div class="flex items-start">
                <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-medium text-gray-900">Savings Account</h3>
                  <p class="text-sm text-gray-500">Earn interest on your deposits and save for the future. Perfect for building financial security.</p>
                  <div class="mt-2 flex items-center">
                    <span class="text-blue-600 font-medium">4.5% Interest</span>
                    <span class="mx-2 text-gray-400">|</span>
                    <span class="text-gray-600">Min Balance: ₹1,000</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Current Account Card -->
            <div 
              @click="selectAccountType('current')" 
              class="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-all duration-200 hover:bg-blue-50"
              :class="{ 'border-blue-500 bg-blue-50': selectedType === 'current' }"
            >
              <div class="flex items-start">
                <div class="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-medium text-gray-900">Current Account</h3>
                  <p class="text-sm text-gray-500">Ideal for business transactions with no limits on withdrawals and deposits.</p>
                  <div class="mt-2 flex items-center">
                    <span class="text-green-600 font-medium">No Interest</span>
                    <span class="mx-2 text-gray-400">|</span>
                    <span class="text-gray-600">Min Balance: ₹5,000</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Fixed Deposit Account Card -->
            <div 
              @click="selectAccountType('fixed')" 
              class="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-all duration-200 hover:bg-blue-50"
              :class="{ 'border-blue-500 bg-blue-50': selectedType === 'fixed' }"
            >
              <div class="flex items-start">
                <div class="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-medium text-gray-900">Fixed Deposit</h3>
                  <p class="text-sm text-gray-500">Lock your money for a fixed period and earn higher interest rates.</p>
                  <div class="mt-2 flex items-center">
                    <span class="text-purple-600 font-medium">7.5% Interest</span>
                    <span class="mx-2 text-gray-400">|</span>
                    <span class="text-gray-600">Min Deposit: ₹10,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Continue Button -->
          <div>
            <button
              @click="proceedToRegistration"
              :disabled="!selectedType"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary to-indigo-600 hover:from-primary-light hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transform transition-all duration-200 hover:scale-105"
              :class="{ 'opacity-50 cursor-not-allowed': !selectedType, 'hover:scale-105': selectedType }"
            >
              Continue to Registration
            </button>
          </div>

          <div class="text-center mt-6">
            <router-link to="/" class="text-sm font-medium text-primary hover:text-primary-dark">
              ← Back to home
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const selectedType = ref('');

const selectAccountType = (type) => {
  selectedType.value = type;
};

const proceedToRegistration = () => {
  if (selectedType.value) {
    router.push({ 
      path: '/customer/register',
      query: { accountType: selectedType.value }
    });
  }
};
</script>

<style scoped>
.bg-primary {
  background-color: #3b82f6;
}
.from-primary {
  --tw-gradient-from: #3b82f6;
}
.from-primary-light {
  --tw-gradient-from: #60a5fa;
}
.to-indigo-600 {
  --tw-gradient-to: #4f46e5;
}
.text-primary {
  color: #3b82f6;
}
.focus\:ring-primary:focus {
  --tw-ring-color: #3b82f6;
}
.focus\:border-primary:focus {
  border-color: #3b82f6;
}
.hover\:text-primary-dark:hover {
  color: #2563eb;
}
.full-width-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 100%;
  max-width: 100vw;
  height: 100vh;
  margin: 0;
  padding-left: 0;
  padding-right: 0;
  overflow-x: hidden;
  z-index: 0;
}
</style>
