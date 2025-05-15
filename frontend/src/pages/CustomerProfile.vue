<!-- filepath: c:\Users\Shamim shaikh\Desktop\Assignment\project\src\pages\CustomerProfile.vue -->
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div v-if="loading" class="flex items-center justify-center py-12">
      <Loader2 class="h-12 w-12 text-primary animate-spin" />
    </div>
    
    <template v-else>
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Profile Information
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Personal details and application settings.
          </p>
        </div>
        <div class="border-t border-gray-200">
          <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Full name
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ profile.name }}
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ profile.email }}
              </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Account type
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Customer
                </span>
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Account created
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ formatDate(profile.created_at) }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      
      <!-- Security Settings -->
      <div class="mt-8 bg-white shadow sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Security Settings
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Manage your password and security preferences.
          </p>
        </div>
        <div class="border-t border-gray-200 px-4 py-5">
          <div class="space-y-6">
            <div>
              <h4 class="text-sm font-medium text-gray-900">Password</h4>
              <div class="mt-2 flex items-center">
                <span class="text-sm text-gray-500">Last changed: {{ formatDate(profile.password_changed_at || profile.created_at) }}</span>
                <button 
                  class="ml-4 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-primary bg-primary-50 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Change Password
                </button>
              </div>
            </div>
            
            <div>
              <h4 class="text-sm font-medium text-gray-900">Two-factor authentication</h4>
              <div class="mt-2 flex items-center">
                <span class="text-sm text-gray-500">Status: Not enabled</span>
                <button 
                  class="ml-4 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-primary bg-primary-50 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Set Up
                </button>
              </div>
            </div>
            
            <div>
              <h4 class="text-sm font-medium text-gray-900">Sessions</h4>
              <div class="mt-2">
                <button 
                  class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  @click="handleSignOutAllSessions"
                >
                  Sign out from all devices
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '../stores/authStore';
import { Loader2 } from 'lucide-vue-next';
import api from '../services/api';

const authStore = useAuthStore();
const toast = useToast();

const profile = ref({
  name: '',
  email: '',
  created_at: '',
  password_changed_at: ''
});
const loading = ref(true);

onMounted(async () => {
  await fetchProfile();
});

const fetchProfile = async () => {
  try {
    loading.value = true;
    
    // Fetch user profile
    const response = await api.get('/customers/profile');
    profile.value = response.data.data;
    
  } catch (error) {
    console.error('Error fetching profile:', error);
    toast.error('Failed to load profile data. Please try again.');
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return 'Not available';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

const handleSignOutAllSessions = async () => {
  try {
    // API call would go here
    await new Promise(resolve => setTimeout(resolve, 500));
    
    toast.success('Signed out from all other devices');
    
    // In a real app, you might want to get a new token
    // and update the auth store
  } catch (error) {
    console.error('Error signing out sessions:', error);
    toast.error('Failed to sign out from all devices');
  }
};
</script>

<style scoped>
.text-primary {
  color: #3b82f6;
}
.bg-primary {
  background-color: #3b82f6;
}
.bg-primary-50 {
  background-color: #eff6ff;
}
.bg-primary-100 {
  background-color: #dbeafe;
}
.focus\:ring-primary:focus {
  --tw-ring-color: #3b82f6;
}
.animate-spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
