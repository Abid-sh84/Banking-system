<!-- filepath: c:\Users\Shamim shaikh\Desktop\Assignment\project\src\pages\CustomerRegister.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 full-width-bg">
    <div class="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
      <div class="flex justify-center">
        <div class="h-16 w-16 bg-gradient-to-r from-primary to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
          <span class="text-white text-2xl font-bold">MB</span>
        </div>
      </div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Create a Customer Account
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <router-link to="/customer/login" class="font-medium text-primary hover:text-primary-dark transition-colors duration-200">
          sign in to your account
        </router-link>
      </p>
    </div>    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
      <div class="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10 transition-all duration-300 hover:shadow-xl">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <!-- Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div class="mt-1">
              <input
                id="name"
                v-model="formData.name"
                name="name"
                type="text"
                autocomplete="name"
                required
                placeholder="Enter your full name"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                :class="{ 'border-red-500': errors.name }"
              />
              <p v-if="errors.name" class="mt-2 text-sm text-red-600">{{ errors.name }}</p>
            </div>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="formData.email"
                name="email"
                type="email"
                autocomplete="email"
                required
                placeholder="Enter your email address"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                :class="{ 'border-red-500': errors.email }"
              />
              <p v-if="errors.email" class="mt-2 text-sm text-red-600">{{ errors.email }}</p>
            </div>
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="mt-1 relative">
              <input
                id="password"
                v-model="formData.password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="new-password"
                required
                placeholder="Create a password (min. 6 characters)"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                :class="{ 'border-red-500': errors.password }"
              />
              <button 
                type="button" 
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                <Eye v-if="!showPassword" class="h-5 w-5 text-gray-400" />
                <EyeOff v-else class="h-5 w-5 text-gray-400" />
              </button>
              <p v-if="errors.password" class="mt-2 text-sm text-red-600">{{ errors.password }}</p>
            </div>
          </div>

          <!-- Address -->
          <div>
            <label for="address" class="block text-sm font-medium text-gray-700">
              Address
            </label>
            <div class="mt-1">
              <textarea
                id="address"
                v-model="formData.address"
                name="address"
                rows="3"
                required
                placeholder="Enter your full address"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                :class="{ 'border-red-500': errors.address }"
              ></textarea>
              <p v-if="errors.address" class="mt-2 text-sm text-red-600">{{ errors.address }}</p>
            </div>
          </div>          <!-- Phone -->
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div class="mt-1">
              <input
                id="phone"
                v-model="formData.phone"
                name="phone"
                type="tel"
                autocomplete="tel"
                required
                placeholder="Enter your 10-digit phone number"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                :class="{ 'border-red-500': errors.phone }"
              />
              <p v-if="errors.phone" class="mt-2 text-sm text-red-600">{{ errors.phone }}</p>
            </div>
          </div>

          <!-- Account Type -->
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Account Type
            </label>
            <div class="mt-1 p-3 bg-gray-50 rounded-md">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div v-if="formData.accountType === 'savings'" class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div v-if="formData.accountType === 'current'" class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div v-if="formData.accountType === 'fixed'" class="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h3 class="text-sm font-medium text-gray-900">
                    {{ formData.accountType === 'savings' ? 'Savings Account' : 
                       formData.accountType === 'current' ? 'Current Account' : 'Fixed Deposit' }}
                  </h3>
                  <p class="text-xs text-gray-500">
                    {{ formData.accountType === 'savings' ? '4.5% Interest | Min Balance: ₹1,000' : 
                       formData.accountType === 'current' ? 'No Interest | Min Balance: ₹5,000' : 
                       '7.5% Interest | Min Deposit: ₹10,000' }}
                  </p>
                </div>
                <div class="ml-auto">
                  <button
                    type="button"
                    @click="() => router.push('/account-selection')"
                    class="text-sm text-primary hover:text-primary-dark"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary to-indigo-600 hover:from-primary-light hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transform transition-all duration-200 hover:scale-105"
              :disabled="loading"
            >
              <Loader2 v-if="loading" class="h-5 w-5 animate-spin mr-2" />
              {{ loading ? 'Creating Account...' : 'Create Account' }}
            </button>
          </div>
          
          <!-- Error Message -->
          <div v-if="error" class="bg-red-50 p-4 rounded-md">
            <div class="flex">
              <div class="flex-shrink-0">
                <AlertTriangle class="h-5 w-5 text-red-400" />
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-700">
                  {{ error }}
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '../stores/authStore';
import { Loader2, AlertTriangle, Eye, EyeOff } from 'lucide-vue-next';

const router = useRouter();
const route = useRoute();
const toast = useToast();
const authStore = useAuthStore();

const formData = reactive({
  name: '',
  email: '',
  password: '',
  address: '',
  phone: '',
  accountType: ''
});

// Get account type from query parameter
onMounted(() => {
  if (route.query.accountType) {
    formData.accountType = route.query.accountType;
  } else {
    // Default to savings account if not specified
    formData.accountType = 'savings';
  }
});

const loading = ref(false);
const error = ref('');
const showPassword = ref(false);
const errors = reactive({
  name: '',
  email: '',
  password: '',
  address: '',
  phone: '',
  accountType: ''
});

const validateForm = () => {
  let isValid = true;
  
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key] = '';
  });
  
  // Name validation
  if (!formData.name) {
    errors.name = 'Full name is required';
    isValid = false;
  } else if (formData.name.length < 2) {
    errors.name = 'Name must be at least 2 characters long';
    isValid = false;
  }
  
  // Email validation
  if (!formData.email) {
    errors.email = 'Email is required';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
    isValid = false;
  }
  
  // Account type validation
  if (!formData.accountType) {
    formData.accountType = 'savings'; // Default to savings if not selected
  } else if (!['savings', 'current', 'fixed'].includes(formData.accountType)) {
    errors.accountType = 'Please select a valid account type';
    isValid = false;
  }
  
  // Password validation
  if (!formData.password) {
    errors.password = 'Password is required';
    isValid = false;
  } else if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters long';
    isValid = false;
  }
  
  // Address validation
  if (!formData.address) {
    errors.address = 'Address is required';
    isValid = false;
  } else if (formData.address.length < 5) {
    errors.address = 'Address must be at least 5 characters long';
    isValid = false;
  }
  
  // Phone validation
  if (!formData.phone) {
    errors.phone = 'Phone number is required';
    isValid = false;
  } else if (formData.phone.length < 10) {
    errors.phone = 'Phone number must be at least 10 digits';
    isValid = false;
  }
  
  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;
  
  try {
    loading.value = true;
    error.value = '';
    
    await authStore.registerCustomer(formData);
    
    toast.success('Registration successful! You are now logged in.');
    router.push('/customer/dashboard');
  } catch (err) {
    console.error('Registration error:', err);
    error.value = err.response?.data?.message || 'Registration failed. Please try again.';
    toast.error('Registration failed');
  } finally {
    loading.value = false;
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
