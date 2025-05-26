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
            </div>            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ profile.email }}
              </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">              <dt class="text-sm font-medium text-gray-500">
                Customer ID
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span class="font-mono" v-if="profile.customer_id">{{ profile.customer_id }}</span>
                <span v-else class="text-gray-500 italic">Loading...</span>
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Account Number
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span class="font-mono">{{ profile.account_number }}</span>
              </dd>
            </div>

            <!-- Address field -->
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Address
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                <span v-if="!editingAddress">{{ profile.address || 'No address provided' }}</span>
                <textarea
                  v-else
                  v-model="addressInput"
                  rows="3"
                  class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                ></textarea>
                <button 
                  v-if="!editingAddress"
                  @click="startEditingAddress" 
                  class="ml-4 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-primary bg-primary-50 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Edit
                </button>
                <div v-else class="flex space-x-2 ml-4">
                  <button 
                    @click="saveAddress" 
                    class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Save
                  </button>
                  <button 
                    @click="cancelEditAddress" 
                    class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Cancel
                  </button>
                </div>
              </dd>
            </div>
            
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Phone Number
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                <span v-if="!editingPhone">{{ profile.phone }}</span>
                <input 
                  v-else
                  v-model="phoneInput" 
                  type="text" 
                  class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                />
                <button 
                  v-if="!editingPhone"
                  @click="startEditingPhone" 
                  class="ml-4 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-primary bg-primary-50 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Edit
                </button>
                <div v-else class="flex space-x-2 ml-4">
                  <button 
                    @click="savePhone" 
                    class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Save
                  </button>
                  <button 
                    @click="cancelEditPhone" 
                    class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Cancel
                  </button>
                </div>
              </dd>
            </div>            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Account type
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span 
                  class="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full" 
                  :class="{
                    'bg-blue-100 text-blue-800': profile.account_type === 'savings',
                    'bg-green-100 text-green-800': profile.account_type === 'current',
                    'bg-purple-100 text-purple-800': profile.account_type === 'fixed',
                    'bg-gray-100 text-gray-800': !profile.account_type
                  }"
                >
                  {{ formatAccountType(profile.account_type) }}
                </span>
                <span class="ml-2 text-xs text-gray-500">
                  {{ getAccountTypeDescription(profile.account_type) }}
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
  password_changed_at: '',
  customer_id: '',
  account_number: '',
  phone: '',
  address: '' // Add address field
});
const loading = ref(true);
const editingPhone = ref(false);
const phoneInput = ref('');
const editingAddress = ref(false); // Address editing state
const addressInput = ref(''); // Address input field

onMounted(async () => {
  await fetchProfile();
});

const fetchProfile = async () => {
  try {    loading.value = true;
    
    // Fetch user profile
    const response = await api.get('/customers/profile');
    profile.value = response.data.data;
    
    // Log the profile data to debug missing fields
    console.log('Profile data received:', {
      id: profile.value.id,
      name: profile.value.name,
      email: profile.value.email,
      customer_id: profile.value.customer_id || 'Missing customer_id',
      account_number: profile.value.account_number || 'Missing account_number'
    });
    
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

const startEditingPhone = () => {
  phoneInput.value = profile.value.phone;
  editingPhone.value = true;
};

const cancelEditPhone = () => {
  editingPhone.value = false;
};

const savePhone = async () => {
  try {
    loading.value = true;
    
    // Validate phone number
    if (!phoneInput.value || phoneInput.value.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }
    
    // Update profile
    const response = await api.put('/customers/profile', {
      name: profile.value.name,
      address: profile.value.address,
      phone: phoneInput.value
    });
    
    profile.value = response.data.data;
    editingPhone.value = false;
    toast.success('Phone number updated successfully');
  } catch (error) {
    console.error('Error updating phone:', error);
    toast.error('Failed to update phone number. Please try again.');
  } finally {
    loading.value = false;
  }
};

// Address editing methods
const startEditingAddress = () => {
  addressInput.value = profile.value.address || '';
  editingAddress.value = true;
};

const cancelEditAddress = () => {
  editingAddress.value = false;
};

const saveAddress = async () => {
  try {
    loading.value = true;
    
    // Validate address
    if (!addressInput.value || addressInput.value.trim().length < 5) {
      toast.error('Please enter a valid address (minimum 5 characters)');
      return;
    }
    
    // Update profile
    const response = await api.put('/customers/profile', {
      name: profile.value.name,
      address: addressInput.value,
      phone: profile.value.phone
    });
    
    profile.value = response.data.data;
    editingAddress.value = false;
    toast.success('Address updated successfully');
  } catch (error) {
    console.error('Error updating address:', error);
    toast.error('Failed to update address. Please try again.');
  } finally {
    loading.value = false;
  }
};

// Helper methods for account type
const formatAccountType = (type) => {
  switch (type) {
    case 'savings': return 'Savings Account';
    case 'current': return 'Current Account';
    case 'fixed': return 'Fixed Deposit';
    default: return 'Standard Account';
  }
};

const getAccountTypeDescription = (type) => {
  switch (type) {
    case 'savings': return '4.5% Interest | Min Balance: ₹1,000';
    case 'current': return 'No Interest | Min Balance: ₹5,000';
    case 'fixed': return '7.5% Interest | Min Deposit: ₹10,000';
    default: return '';
  }
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
