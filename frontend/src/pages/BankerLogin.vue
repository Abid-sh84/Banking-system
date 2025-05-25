<!-- filepath: c:\Users\Shamim shaikh\Desktop\Assignment\project\src\pages\BankerLogin.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 full-width-bg">
    <div class="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
      <div class="flex justify-center">
        <div class="h-16 w-16 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
          <span class="text-white text-2xl font-bold">MB</span>
        </div>
      </div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Banker Login
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        <router-link to="/" class="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200">
          Back to home
        </router-link>
      </p>
    </div>    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
      <div class="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10 transition-all duration-300 hover:shadow-xl">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                placeholder="Enter your email"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                :class="{ 'border-red-500': errors.email }"
              />
              <p v-if="errors.email" class="mt-2 text-sm text-red-600">{{ errors.email }}</p>
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="mt-1 relative">
              <input
                id="password"
                v-model="password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                required
                placeholder="Enter your password"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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

          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-200 hover:scale-105"
              :disabled="loading"
            >
              <Loader2 v-if="loading" class="h-5 w-5 animate-spin mr-2" />
              {{ loading ? 'Signing in...' : 'Sign in' }}
            </button>
          </div>
          
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '../stores/authStore';
import { Loader2, AlertTriangle, Eye, EyeOff } from 'lucide-vue-next';

const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');
const showPassword = ref(false);
const errors = ref({
  email: '',
  password: ''
});

const validateForm = () => {
  let isValid = true;
  errors.value = {
    email: '',
    password: ''
  };
  
  // Email validation
  if (!email.value) {
    errors.value.email = 'Email is required';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = 'Please enter a valid email address';
    isValid = false;
  }
  
  // Password validation
  if (!password.value) {
    errors.value.password = 'Password is required';
    isValid = false;
  } else if (password.value.length < 6) {
    errors.value.password = 'Password must be at least 6 characters long';
    isValid = false;
  }
  
  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;
  
  try {
    loading.value = true;
    error.value = '';
    
    console.log('BankerLogin: Attempting login with', email.value);
    
    try {
      // Import the test module for debugging
      if (process.env.NODE_ENV !== 'production') {
        const { testBankerLogin } = await import('../debug-auth');
        console.log('Running test login to diagnose potential issues...');
        const testResult = await testBankerLogin(email.value, password.value);
        console.log('Test login result:', testResult);
      }
    } catch (testError) {
      console.log('Debug test skipped:', testError);
    }
    
    const response = await authStore.bankerLogin(email.value, password.value);
    console.log('BankerLogin: Login response received');
    
    // More careful handling to avoid errors if response structure is unexpected
    if (response?.data?.data?.banker) {
      console.log('BankerLogin: Login response details:', {
        role: response.data.data.banker.role,
        id: response.data.data.banker.id,
        token: response.data.data.token ? response.data.data.token.substring(0, 15) + '...' : null
      });
    }
    
    // Force the role to 'admin' if email is admin@bank.com
    if (email.value.toLowerCase() === 'admin@bank.com' && authStore.role !== 'admin') {
      console.log('Fixing role for admin user');
      authStore.role = 'admin';
      localStorage.setItem('role', 'admin');
    }
    
    toast.success('Login successful');
    
    // Add a small delay to ensure store is updated before navigation
    setTimeout(() => {
      router.push('/banker/dashboard');
    }, 500);
  } catch (err) {
    console.error('BankerLogin: Error during login:', err);
    
    if (err.response) {
      console.error('Server error response:', {
        status: err.response.status,
        data: err.response.data
      });
      
      if (err.response.status === 500) {
        error.value = 'Server error. Please try again later or contact support.';
      } else {
        error.value = err.response.data?.message || 'Invalid email or password. Please try again.';
      }
    } else if (err.request) {
      error.value = 'No response from server. Please check your connection and try again.';
    } else {
      error.value = err.message || 'Unable to connect to the server. Please try again later.';
    }
    
    toast.error('Login failed');  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
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
