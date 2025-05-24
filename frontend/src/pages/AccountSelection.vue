<template>  
  <!-- Fixed background that fills the entire viewport -->
  <div class="full-width-bg bg-gradient-to-br from-blue-50 to-indigo-100 animate-fadeIn"></div>
  
  <!-- Content container with proper spacing -->
  <div class="min-h-screen flex flex-col pt-28 pb-12 sm:px-6 lg:px-8 navbar-spacing relative z-10">
    <!-- Abstract banking illustrations -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      <div class="absolute top-28 left-10 w-24 h-24 bg-primary opacity-10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-10 right-10 w-32 h-32 bg-indigo-600 opacity-10 rounded-full blur-3xl"></div>
      <div class="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-500 opacity-10 rounded-full blur-2xl"></div>
      <div class="absolute top-1/3 right-1/3 w-20 h-20 bg-indigo-400 opacity-10 rounded-full blur-2xl"></div>
      
      <!-- Security pattern -->
      <div class="absolute bottom-0 left-0 w-full h-32 opacity-20">
        <div class="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
        <div class="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent mt-3"></div>
        <div class="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent mt-6"></div>
        <div class="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent mt-9"></div>
      </div>
      
      <!-- Banking pattern dots -->
      <div class="grid grid-cols-12 grid-rows-12 gap-10 absolute inset-0">
        <div v-for="i in 12" :key="i" class="w-1 h-1 bg-gray-600 opacity-10 rounded-full"></div>
      </div>
    </div>
    <div class="sm:mx-auto sm:w-full sm:max-w-md relative z-20">      <div class="flex justify-center">
        <div class="h-20 w-20 bg-gradient-to-r from-primary to-indigo-600 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden border-2 border-white transform transition-all duration-500 hover:scale-105">
          <span class="text-white text-2xl font-bold relative z-10">MB</span>
          <div class="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
          <div class="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full blur opacity-30 animate-pulse"></div>
          <div class="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white to-transparent opacity-30 rotate-45"></div>
        </div>
      </div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Choose Account Type
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Select an account type to start your application
      </p>
      <div class="flex justify-center mt-4 space-x-2">
        <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          Secure Selection
        </span>
        <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
          </svg>
          Step 1 of 2
        </span>
      </div>
    </div>    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 animate-slideInUp">
      <div class="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10 transition-all duration-300 hover:shadow-xl border border-gray-100">
        <div class="space-y-6">
          <!-- Account Type Selection Cards -->
          <div class="grid grid-cols-1 gap-4">            <!-- Savings Account Card -->
            <div 
              @click="selectAccountType('savings')" 
              class="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all duration-300 hover:bg-blue-50 transform hover:-translate-y-1"
              :class="{ 'border-blue-500 bg-blue-50 shadow-md': selectedType === 'savings' }"
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
            </div>            <!-- Current Account Card -->
            <div 
              @click="selectAccountType('current')" 
              class="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all duration-300 hover:bg-blue-50 transform hover:-translate-y-1"
              :class="{ 'border-blue-500 bg-blue-50 shadow-md': selectedType === 'current' }"
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
            </div>            <!-- Fixed Deposit Account Card -->
            <div 
              @click="selectAccountType('fixed')" 
              class="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all duration-300 hover:bg-blue-50 transform hover:-translate-y-1"
              :class="{ 'border-blue-500 bg-blue-50 shadow-md': selectedType === 'fixed' }"
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
          <div>            <button
              @click="proceedToRegistration"
              :disabled="!selectedType"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary to-indigo-600 hover:from-primary-light hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transform transition-all duration-300 hover:scale-105 relative overflow-hidden group"
              :class="{ 'opacity-50 cursor-not-allowed': !selectedType, 'hover:shadow-lg': selectedType }"
            >
              <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span class="relative">Continue to Registration</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>

          <div class="text-center mt-6">
            <router-link to="/" class="text-sm font-medium text-primary hover:text-primary-dark">
              ← Back to home
            </router-link>
          </div>        </div>

        <!-- Security badges -->
        <div class="mt-6 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <p class="text-xs text-center text-gray-600 mb-2">Your security is our priority</p>
          <div class="flex flex-wrap items-center justify-center gap-3">
            <div class="flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Bank-Grade Security
            </div>
            <div class="flex items-center px-3 py-1 bg-green-50 text-green-700 text-xs rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              FDIC Insured
            </div>
            <div class="flex items-center px-3 py-1 bg-purple-50 text-purple-700 text-xs rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              256-bit Encryption
            </div>
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
  top: 0; /* Start from the very top */
  left: 0;
  width: 100%;
  min-width: 100%;
  max-width: 100vw;
  height: 100vh;
  margin: 0;
  padding-left: 0;
  padding-right: 0;
  overflow-x: hidden;
  z-index: 0; /* Lower z-index to ensure content appears above */
}

/* Media queries for better navbar spacing */
@media (max-width: 640px) {
  .navbar-spacing {
    padding-top: 100px; /* More padding on mobile devices */
  }
}

/* Ensure proper spacing below the navbar */
.navbar-spacing {
  padding-top: 80px; /* Fixed space to ensure content is below navbar */
  position: relative;
}

/* Adjust the main container */
.min-h-screen {
  margin-top: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

/* Animations */
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.animate-fadeIn {
  animation: fadeIn 0.6s ease-in-out;
}

@keyframes slideInUp {
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

.animate-slideInUp {
  animation: slideInUp 0.5s ease-out;
}
</style>
