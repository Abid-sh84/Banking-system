<!-- filepath: c:\Users\Shamim shaikh\Desktop\Assignment\project\src\pages\CustomerProfile.vue -->
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Breadcrumb Navigation -->
    <nav class="flex mb-6" aria-label="Breadcrumb">
      <ol class="flex items-center space-x-4">
        <li>
          <div>            <a href="#" class="text-gray-400 hover:text-gray-500" @click.prevent="navigateToHome">
              <svg class="flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span class="sr-only">Home</span>
            </a>
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <svg class="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
            </svg>
            <span class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Account</span>
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <svg class="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
            </svg>
            <span class="ml-4 text-sm font-medium text-primary" aria-current="page">Profile</span>
          </div>
        </li>      </ol>
    </nav>
    
    <div v-if="loading" class="flex items-center justify-center py-12">
      <Loader2 class="h-12 w-12 text-primary animate-spin" />
    </div>
    
    <template v-else>
      <!-- Account Summary Card -->
      <div class="mb-8 bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-5 sm:px-6">
          <div class="flex flex-wrap items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-16 h-16 rounded-full overflow-hidden border-4 border-white bg-white flex items-center justify-center">
                <img v-if="profile.profile_image" :src="profile.profile_image" alt="Profile Photo" class="w-full h-full object-cover" />
                <User v-else class="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <h2 class="text-xl font-bold text-white">{{ profile.name }}</h2>
                <p class="text-blue-100">{{ profile.email }}</p>
              </div>
            </div>
            
            <div class="mt-3 sm:mt-0 grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
              <div class="bg-white bg-opacity-20 rounded-lg px-3 py-2">
                <p class="text-xs text-blue-100">Account Type</p>
                <p class="font-medium text-white">{{ formatAccountType(profile.account_type) }}</p>
              </div>
              <div class="bg-white bg-opacity-20 rounded-lg px-3 py-2">
                <p class="text-xs text-blue-100">Customer Since</p>
                <p class="font-medium text-white">{{ formatShortDate(profile.created_at) }}</p>
              </div>
              <div class="bg-white bg-opacity-20 rounded-lg px-3 py-2">
                <p class="text-xs text-blue-100">Status</p>
                <p class="font-medium text-white flex items-center justify-center">
                  <span class="inline-block w-2 h-2 rounded-full bg-green-400 mr-1.5"></span>
                  Active
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Mobile Section Tabs - Only visible on small screens -->
      <div class="sm:hidden mb-6">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-4 overflow-x-auto" aria-label="Tabs">
            <button 
              @click="activeTab = 'profile'" 
              :class=" [
                activeTab === 'profile' 
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm flex-shrink-0'
              ]"
            >
              Profile
            </button>
            <button
              @click="activeTab = 'activity'"
              :class=" [
                activeTab === 'activity' 
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm flex-shrink-0'
              ]"
            >
              Activity
            </button>
            <button
              @click="activeTab = 'security'" 
              :class=" [
                activeTab === 'security' 
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm flex-shrink-0'
              ]"
            >
              Security
            </button>
            <button
              @click="activeTab = 'notifications'"
              :class=" [
                activeTab === 'notifications' 
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm flex-shrink-0'
              ]"
            >
              Notifications
            </button>
            <button
              @click="activeTab = 'data'"
              :class=" [
                activeTab === 'data' 
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm flex-shrink-0'
              ]"
            >
              Data
            </button>
          </nav>
        </div>
      </div>

      <!-- Profile Information Section -->
      <div v-if="activeTab === 'profile' || !isMobile" class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Profile Information
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Personal details and application settings.
            </p>
          </div>
          <div class="relative group">
            <div class="w-20 h-20 rounded-full overflow-hidden border-4 border-primary-50 bg-gray-100 flex items-center justify-center">
              <img v-if="profile.profile_image" :src="profile.profile_image" alt="Profile Photo" class="w-full h-full object-cover" />
              <User v-else class="h-10 w-10 text-gray-400" />
            </div>            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 rounded-full transition-opacity cursor-pointer" @click="triggerPhotoUpload">
              <Camera class="h-6 w-6 text-white" />
            </div>
            <input 
              id="photoInput"
              ref="photoInput" 
              type="file" 
              class="hidden" 
              accept="image/*"
              @change="handleProfilePhotoChange"
            />
          </div>
        </div>
        <div class="border-t border-gray-200">
          <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Full name
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                <span v-if="!editingName">{{ profile.name }}</span>
                <input 
                  v-else
                  v-model="nameInput" 
                  type="text" 
                  class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                />
                <button 
                  v-if="!editingName"
                  @click="startEditingName" 
                  class="ml-4 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-primary bg-primary-50 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Edit
                </button>
                <div v-else class="flex space-x-2 ml-4">
                  <button 
                    @click="saveName" 
                    class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Save
                  </button>
                  <button 
                    @click="cancelEditName" 
                    class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Cancel
                  </button>
                </div>
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
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                <span class="font-mono" v-if="profile.customer_id">{{ profile.customer_id }}</span>
                <span v-else class="text-gray-500 italic">Loading...</span>
                <button 
                  v-if="profile.customer_id"
                  @click="copyToClipboard(profile.customer_id, 'Customer ID')" 
                  class="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </button>
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Account Number
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                <span class="font-mono">{{ profile.account_number }}</span>
                <button 
                  v-if="profile.account_number"
                  @click="copyToClipboard(profile.account_number, 'Account Number')" 
                  class="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </button>
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
      <div class="mt-8 bg-white shadow sm:rounded-lg" v-show="activeTab === 'security' || !isMobile">
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
                  @click="openPasswordModal"
                  class="ml-4 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-primary bg-primary-50 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <Lock class="h-3.5 w-3.5 mr-1" />
                  Change Password
                </button>
              </div>
            </div>
              <div>
              <h4 class="text-sm font-medium text-gray-900">Sessions</h4>
              <div class="mt-2">
                <button 
                  @click="handleSignOutAllSessions"
                  class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Sign out from all devices
                </button>
              </div>
            </div>
            
            <div>
              <h4 class="text-sm font-medium text-gray-900">Two-factor authentication</h4>
              <div class="mt-2 flex items-center justify-between">
                <div class="flex items-center">
                  <span 
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" 
                    :class="profile.twoFactorEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                  >
                    {{ profile.twoFactorEnabled ? 'Enabled' : 'Not enabled' }}
                  </span>
                  <span class="ml-2 text-sm text-gray-500">
                    {{ profile.twoFactorEnabled ? 'Last verified: ' + formatDate(profile.twoFactorVerifiedAt || profile.created_at) : 'Enhance your account security' }}
                  </span>
                </div>
                <button 
                  @click="toggleTwoFactor"
                  class="ml-4 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-primary bg-primary-50 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <Shield class="h-3.5 w-3.5 mr-1" />
                  {{ profile.twoFactorEnabled ? 'Disable' : 'Set Up' }}
                </button>
              </div>
              <div v-if="showTwoFactorSetup" class="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                <h5 class="text-sm font-medium text-gray-900">Set up two-factor authentication</h5>
                <div class="mt-3">
                  <div class="space-y-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-shrink-0 w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">1</div>
                      <p class="text-sm text-gray-500">Download an authenticator app like Google Authenticator or Authy</p>
                    </div>
                    <div class="flex items-center space-x-4">
                      <div class="flex-shrink-0 w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">2</div>
                      <div>
                        <p class="text-sm text-gray-500">Scan this QR code with your authenticator app</p>
                        <div class="mt-2 bg-white p-2 inline-block rounded">
                          <!-- Placeholder for QR code -->
                          <div class="h-32 w-32 bg-gray-200 flex items-center justify-center">
                            <span class="text-xs text-gray-500">QR Code</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="flex items-center space-x-4">
                      <div class="flex-shrink-0 w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">3</div>
                      <div>
                        <p class="text-sm text-gray-500">Enter the verification code from your app</p>
                        <input 
                          type="text" 
                          v-model="twoFactorCode" 
                          placeholder="Enter 6-digit code" 
                          class="mt-1 block w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mt-4 flex space-x-2">
                    <button 
                      @click="verifyTwoFactorCode" 
                      class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Verify
                    </button>
                    <button 
                      @click="cancelTwoFactorSetup" 
                      class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Account Activity -->
      <div class="mt-8 bg-white shadow sm:rounded-lg" v-show="activeTab === 'activity' || !isMobile">
        <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Account Activity
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Recent activity on your account.
            </p>
          </div>
          <button
            @click="refreshAccountActivity"
            class="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Refresh
          </button>
        </div>
        <div class="border-t border-gray-200 px-4 py-5">
          <div v-if="loadingActivity" class="flex justify-center py-6">
            <Loader2 class="h-6 w-6 text-primary animate-spin" />
          </div>
          <div v-else-if="accountActivity.length === 0" class="text-center py-6 text-gray-500">
            No recent activity found
          </div>
          <div v-else>
            <ul class="space-y-4">
              <li v-for="(activity, index) in accountActivity" :key="index" class="bg-gray-50 p-4 rounded-md">
                <div class="flex items-start">
                  <div class="flex-shrink-0">
                    <span 
                      class="inline-flex items-center justify-center h-10 w-10 rounded-md" 
                      :class="{
                        'bg-green-100': activity.type === 'deposit',
                        'bg-red-100': activity.type === 'withdrawal',
                        'bg-blue-100': activity.type === 'transfer',
                        'bg-yellow-100': activity.type === 'login',
                        'bg-purple-100': activity.type === 'profile_update'
                      }"
                    >
                      <Calendar v-if="activity.type === 'login'" class="h-5 w-5 text-yellow-600" />
                      <Download v-else-if="activity.type === 'deposit'" class="h-5 w-5 text-green-600" />
                      <User v-else-if="activity.type === 'profile_update'" class="h-5 w-5 text-purple-600" />
                      <Loader2 v-else class="h-5 w-5 text-blue-600" />
                    </span>
                  </div>
                  <div class="ml-4 flex-1">
                    <div class="flex justify-between">
                      <h4 class="text-sm font-medium text-gray-900">{{ activity.description }}</h4>
                      <p class="text-sm text-gray-500">{{ formatDateWithTime(activity.timestamp) }}</p>
                    </div>
                    <div class="mt-1">
                      <p class="text-sm text-gray-500">{{ activity.details }}</p>
                    </div>
                    <div v-if="activity.amount" class="mt-1 font-medium" :class="{'text-green-600': activity.type === 'deposit', 'text-red-600': activity.type === 'withdrawal'}">
                      {{ formatCurrency(activity.amount) }}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div class="flex justify-center mt-6">
              <button
                @click="viewAllActivity"
                class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                View all activity
              </button>
            </div>
          </div>
        </div>
      </div>      <!-- Notification Preferences -->
      <div v-show="activeTab === 'notifications' || !isMobile" class="mt-8 bg-white shadow sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Notification Preferences
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Manage how and when you receive notifications.
          </p>
        </div>
        <div class="border-t border-gray-200 px-4 py-5">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Email Notifications</h4>
                <p class="text-xs text-gray-500">Receive important updates via email</p>
              </div>
              <label class="flex items-center cursor-pointer">
                <div class="relative">
                  <input type="checkbox" v-model="notificationPreferences.email" class="sr-only" @change="saveNotificationPreferences" />
                  <div class="block w-10 h-6 bg-gray-200 rounded-full"></div>
                  <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition" 
                    :class="{'transform translate-x-4 bg-primary': notificationPreferences.email}"></div>
                </div>
              </label>
            </div>
            
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">SMS Alerts</h4>
                <p class="text-xs text-gray-500">Receive SMS alerts for account activity</p>
              </div>
              <label class="flex items-center cursor-pointer">
                <div class="relative">
                  <input type="checkbox" v-model="notificationPreferences.sms" class="sr-only" @change="saveNotificationPreferences" />
                  <div class="block w-10 h-6 bg-gray-200 rounded-full"></div>
                  <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition" 
                    :class="{'transform translate-x-4 bg-primary': notificationPreferences.sms}"></div>
                </div>
              </label>
            </div>
            
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Security Alerts</h4>
                <p class="text-xs text-gray-500">Receive alerts about security events</p>
              </div>
              <label class="flex items-center cursor-pointer">
                <div class="relative">
                  <input type="checkbox" v-model="notificationPreferences.securityAlerts" class="sr-only" @change="saveNotificationPreferences" />
                  <div class="block w-10 h-6 bg-gray-200 rounded-full"></div>
                  <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition" 
                    :class="{'transform translate-x-4 bg-primary': notificationPreferences.securityAlerts}"></div>
                </div>
              </label>
            </div>
            
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Transaction Alerts</h4>
                <p class="text-xs text-gray-500">Receive alerts for transactions</p>
              </div>
              <label class="flex items-center cursor-pointer">
                <div class="relative">
                  <input type="checkbox" v-model="notificationPreferences.transactionAlerts" class="sr-only" @change="saveNotificationPreferences" />
                  <div class="block w-10 h-6 bg-gray-200 rounded-full"></div>
                  <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition" 
                    :class="{'transform translate-x-4 bg-primary': notificationPreferences.transactionAlerts}"></div>
                </div>
              </label>
            </div>
            
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Marketing Emails</h4>
                <p class="text-xs text-gray-500">Receive marketing emails about offers</p>
              </div>
              <label class="flex items-center cursor-pointer">
                <div class="relative">
                  <input type="checkbox" v-model="notificationPreferences.marketingEmails" class="sr-only" @change="saveNotificationPreferences" />
                  <div class="block w-10 h-6 bg-gray-200 rounded-full"></div>
                  <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition" 
                    :class="{'transform translate-x-4 bg-primary': notificationPreferences.marketingEmails}"></div>
                </div>
              </label>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">New Features</h4>
                <p class="text-xs text-gray-500">Be notified about new features</p>
              </div>
              <label class="flex items-center cursor-pointer">
                <div class="relative">
                  <input type="checkbox" v-model="notificationPreferences.newFeatures" class="sr-only" @change="saveNotificationPreferences" />
                  <div class="block w-10 h-6 bg-gray-200 rounded-full"></div>
                  <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition" 
                    :class="{'transform translate-x-4 bg-primary': notificationPreferences.newFeatures}"></div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>      <!-- Data Export -->
      <div v-show="activeTab === 'data' || !isMobile" class="mt-8 bg-white shadow sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Data Export
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Download your account data for personal records.
          </p>
        </div>
        <div class="border-t border-gray-200 px-4 py-5">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Account Statements</h4>
                <p class="text-xs text-gray-500">Download your monthly account statements</p>
              </div>
              <button
                @click="exportAccountStatements"
                class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <Download class="h-4 w-4 mr-2" />
                Download
              </button>
            </div>
            
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Transaction History</h4>
                <p class="text-xs text-gray-500">All transaction data in CSV format</p>
              </div>
              <button
                @click="exportTransactionHistory"
                class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <Download class="h-4 w-4 mr-2" />
                Download
              </button>
            </div>
            
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Personal Data</h4>
                <p class="text-xs text-gray-500">Export all your personal data</p>
              </div>
              <button
                @click="exportPersonalData"
                class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <Download class="h-4 w-4 mr-2" />
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>

  <!-- Password Change Modal -->
  <div v-if="showPasswordModal" class="fixed inset-0 z-10 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      
      <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        <div class="absolute top-0 right-0 pt-4 pr-4">
          <button 
            @click="closePasswordModal" 
            type="button" 
            class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <span class="sr-only">Close</span>
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="sm:flex sm:items-start">
          <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
            <Lock class="h-6 w-6 text-primary" />
          </div>
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Change Password</h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500">Update your password to maintain account security.</p>
            </div>
          </div>
        </div>
        
        <div class="mt-5">
          <div class="space-y-4">
            <!-- Current Password -->
            <div>
              <label for="current-password" class="block text-sm font-medium text-gray-700">Current Password</label>
              <div class="relative mt-1 rounded-md shadow-sm">
                <input
                  :type="showPassword.current ? 'text' : 'password'"
                  v-model="passwordData.currentPassword"
                  id="current-password"
                  class="block w-full pr-10 border-gray-300 rounded-md focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Enter your current password"
                />
                <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button type="button" @click="togglePasswordVisibility('current')" class="text-gray-400 hover:text-gray-500">
                    <Eye v-if="!showPassword.current" class="h-4 w-4" />
                    <EyeOff v-else class="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <!-- New Password -->
            <div>
              <label for="new-password" class="block text-sm font-medium text-gray-700">New Password</label>
              <div class="relative mt-1 rounded-md shadow-sm">
                <input
                  :type="showPassword.new ? 'text' : 'password'"
                  v-model="passwordData.newPassword"
                  id="new-password"
                  class="block w-full pr-10 border-gray-300 rounded-md focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Enter new password"
                />
                <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button type="button" @click="togglePasswordVisibility('new')" class="text-gray-400 hover:text-gray-500">
                    <Eye v-if="!showPassword.new" class="h-4 w-4" />
                    <EyeOff v-else class="h-4 w-4" />
                  </button>
                </div>
              </div>
              <!-- Password Strength indicator -->
              <div class="mt-1">
                <div class="flex items-center">
                  <div class="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      class="h-1.5 rounded-full" 
                      :class="passwordStrengthClass"
                      :style="{ width: passwordStrengthPercent + '%' }"
                    ></div>
                  </div>
                  <span class="ml-2 text-xs" :class="passwordStrengthTextClass">{{ passwordStrengthText }}</span>
                </div>
              </div>
            </div>
            
            <!-- Confirm New Password -->
            <div>
              <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <div class="relative mt-1 rounded-md shadow-sm">
                <input
                  :type="showPassword.confirm ? 'text' : 'password'"
                  v-model="passwordData.confirmPassword"
                  id="confirm-password"
                  class="block w-full pr-10 border-gray-300 rounded-md focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Confirm new password"
                />
                <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button type="button" @click="togglePasswordVisibility('confirm')" class="text-gray-400 hover:text-gray-500">
                    <Eye v-if="!showPassword.confirm" class="h-4 w-4" />
                    <EyeOff v-else class="h-4 w-4" />
                  </button>
                </div>
              </div>
              <!-- Show password match status -->
              <div v-if="passwordData.newPassword && passwordData.confirmPassword" class="mt-1">
                <p v-if="passwordData.newPassword === passwordData.confirmPassword" class="text-xs text-green-600">Passwords match</p>
                <p v-else class="text-xs text-red-600">Passwords do not match</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
          <button
            @click="changePassword"
            type="button"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:col-start-2 sm:text-sm"
            :disabled="!canChangePassword"
          >
            Update Password
          </button>
          <button
            @click="closePasswordModal"
            type="button"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:col-start-1 sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';
import { Loader2, Camera, User, Lock, Bell, Download, Shield, Calendar, Eye, EyeOff } from 'lucide-vue-next';
import api from '../services/api';

const authStore = useAuthStore();
const toast = useToast();
const router = useRouter();

const profile = ref({
  name: '',
  email: '',
  created_at: '',
  password_changed_at: '',
  customer_id: '',
  account_number: '',
  phone: '',
  address: '',
  profile_image: null,
  twoFactorEnabled: false,
  twoFactorVerifiedAt: null
});
const loading = ref(true);
const editingPhone = ref(false);
const phoneInput = ref('');
const editingAddress = ref(false); // Address editing state
const addressInput = ref(''); // Address input field
const editingName = ref(false); // Name editing state
const nameInput = ref(''); // Name input field
const profilePhotoFile = ref(null); // For profile photo upload
const showPasswordModal = ref(false); // For password change modal
const accountActivity = ref([]); // For account activity
const loadingActivity = ref(false); // Loading state for activity
const changingPassword = ref(false); // Loading state for password change
const passwordData = ref({ // Password change data
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});
const showPassword = ref({
  current: false,
  new: false,
  confirm: false
}); // Toggle password visibility
const notificationPreferences = ref({
  email: true,
  sms: false,
  securityAlerts: true,
  marketingEmails: false,
  transactionAlerts: true,
  newFeatures: true
});
const twoFactorCode = ref(''); // For two-factor authentication code
const showTwoFactorSetup = ref(false); // For showing two-factor setup instructions
const activeTab = ref('profile'); // Active tab for mobile view

onMounted(async () => {
  await fetchProfile();
  await fetchAccountActivity();
  await fetchNotificationPreferences();
});

const fetchProfile = async () => {
  try {    
    loading.value = true;
    
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

// Fetch account activity
const fetchAccountActivity = async () => {
  try {
    loadingActivity.value = true;
    
    // Fetch real transaction data from the API
    const response = await api.get('/customers/transactions', {
      params: {
        limit: 5, // Only get the 5 most recent transactions
        offset: 0
      }
    });
    
    if (response.data && response.data.data) {
      // Transform the transaction data into activity format
      accountActivity.value = response.data.data.map(transaction => {
        let activityType, description, details;
        
        switch(transaction.type) {
          case 'deposit':
            activityType = 'deposit';
            description = 'Deposit';
            details = transaction.description || 'Money deposited to account';
            break;
          case 'withdrawal':
            activityType = 'withdrawal';
            description = 'Withdrawal';
            details = transaction.description || 'Money withdrawn from account';
            break;
          case 'transfer':
            // Check if user is sender or receiver
            if (transaction.receiver_id) {
              activityType = 'transfer_out';
              description = 'Money Sent';
              details = `Transfer to ${transaction.receiver_name || 'Account'} (${transaction.receiver_account_number || 'Unknown'})`;
            } else {
              activityType = 'transfer_in';
              description = 'Money Received';
              details = `Transfer from ${transaction.sender_name || 'Account'} (${transaction.sender_account_number || 'Unknown'})`;
            }
            break;
          default:
            activityType = 'account_update';
            description = transaction.description || 'Account Activity';
            details = 'Account transaction';
        }
        
        return {
          type: activityType,
          description: description,
          details: details,
          amount: transaction.amount,
          timestamp: new Date(transaction.created_at)
        };
      });
    }
  } catch (error) {
    console.error('Error fetching account activity:', error);
    toast.error('Failed to load account activity. Please try again.');
  } finally {
    loadingActivity.value = false;
  }
};

// Fetch notification preferences
const fetchNotificationPreferences = async () => {
  try {
    // In a real app, you would fetch from an API endpoint
    // Mock implementation for demo purposes
    // notificationPreferences is already initialized with defaults
  } catch (error) {
    console.error('Error fetching notification preferences:', error);
  }
};

// Name editing methods
const startEditingName = () => {
  nameInput.value = profile.value.name;
  editingName.value = true;
};

const cancelEditName = () => {
  editingName.value = false;
};

const saveName = async () => {
  try {
    loading.value = true;
    
    // Validate name
    if (!nameInput.value || nameInput.value.trim().length < 3) {
      toast.error('Please enter a valid name (minimum 3 characters)');
      return;
    }
    
    // Update profile
    const response = await api.put('/customers/profile', {
      name: nameInput.value,
      address: profile.value.address,
      phone: profile.value.phone
    });
    
    profile.value = response.data.data;
    editingName.value = false;
    toast.success('Name updated successfully');
  } catch (error) {
    console.error('Error updating name:', error);
    toast.error('Failed to update name. Please try again.');
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

// Format date with time
const formatDateWithTime = (dateString) => {
  if (!dateString) return 'Not available';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2
  }).format(amount);
};

// Format date in short format (Month Year)
const formatShortDate = (dateString) => {
  if (!dateString) return 'Not available';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short'
  }).format(date);
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

// Profile photo methods
const triggerPhotoUpload = () => {
  const photoInput = document.getElementById('photoInput');
  if (photoInput) {
    photoInput.click();
  }
};

const handleProfilePhotoChange = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  // Check file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    toast.error('Image size should not exceed 5MB');
    return;
  }
  
  try {
    loading.value = true;
    
    // In a real app, you would upload to the server
    // For demo, we'll just use FileReader to display locally
    const reader = new FileReader();
    reader.onload = (e) => {
      profile.value.profile_image = e.target.result;
      toast.success('Profile photo updated');
      
      // In a real app, you would call the API to update the profile picture
      // const formData = new FormData();
      // formData.append('profile_image', file);
      // await api.post('/customers/profile/image', formData);
    };
    reader.readAsDataURL(file);
  } catch (error) {
    console.error('Error updating profile photo:', error);
    toast.error('Failed to update profile photo');
  } finally {
    loading.value = false;
  }
};

// Password management methods
const openPasswordModal = () => {
  passwordData.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  showPassword.value = {
    current: false,
    new: false,
    confirm: false
  };
  showPasswordModal.value = true;
};

const closePasswordModal = () => {
  showPasswordModal.value = false;
};

const togglePasswordVisibility = (field) => {
  showPassword.value[field] = !showPassword.value[field];
};

// Password strength calculation
const passwordStrengthPercent = computed(() => {
  const password = passwordData.value.newPassword;
  if (!password) return 0;
  
  let strength = 0;
  
  // Length check
  if (password.length >= 8) strength += 25;
  
  // Contains lowercase
  if (/[a-z]/.test(password)) strength += 25;
  
  // Contains uppercase
  if (/[A-Z]/.test(password)) strength += 25;
  
  // Contains number or special char
  if (/[0-9!@#$%^&*]/.test(password)) strength += 25;
  
  return strength;
});

const passwordStrengthText = computed(() => {
  const strength = passwordStrengthPercent.value;
  if (strength === 0) return '';
  if (strength <= 25) return 'Weak';
  if (strength <= 50) return 'Fair';
  if (strength <= 75) return 'Good';
  return 'Strong';
});

const passwordStrengthClass = computed(() => {
  const strength = passwordStrengthPercent.value;
  if (strength <= 25) return 'bg-red-500';
  if (strength <= 50) return 'bg-yellow-500';
  if (strength <= 75) return 'bg-blue-500';
  return 'bg-green-500';
});

const passwordStrengthTextClass = computed(() => {
  const strength = passwordStrengthPercent.value;
  if (strength <= 25) return 'text-red-500';
  if (strength <= 50) return 'text-yellow-500';
  if (strength <= 75) return 'text-blue-500';
  return 'text-green-500';
});

const canChangePassword = computed(() => {
  return (
    passwordData.value.currentPassword &&
    passwordData.value.newPassword &&
    passwordData.value.confirmPassword &&
    passwordData.value.newPassword === passwordData.value.confirmPassword &&
    passwordStrengthPercent.value >= 50 // Require at least "Fair" password strength
  );
});

const changePassword = async () => {
  try {
    // Validate password
    if (!canChangePassword.value) {
      return;
    }
    
    changingPassword.value = true;
    
    // Call the real API to change password
    await api.post('/customers/change-password', {
      currentPassword: passwordData.value.currentPassword,
      newPassword: passwordData.value.newPassword
    });
    
    toast.success('Password updated successfully');
    closePasswordModal();
    
    // Reset password form
    passwordData.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
  } catch (error) {
    console.error('Error changing password:', error);
    // Show appropriate error message based on the error
    if (error.response && error.response.status === 401) {
      toast.error('Current password is incorrect');
    } else {
      toast.error('Failed to update password. Please try again.');
    }
  } finally {
    changingPassword.value = false;
  }
};

// Activity refresh
const refreshAccountActivity = async () => {
  await fetchAccountActivity();
  toast.success('Activity log refreshed');
};

// View all activity
const viewAllActivity = () => {
  // In a real app, navigate to a detailed activity page
  toast.info('Viewing all account activity');
};

// Save notification preferences
const saveNotificationPreferences = async () => {
  try {
    // In a real app, you would call the API to update preferences
    await new Promise(resolve => setTimeout(resolve, 500));
    
    toast.success('Notification preferences updated');
  } catch (error) {
    console.error('Error updating notification preferences:', error);
    toast.error('Failed to update notification preferences');
  }
};

// Data export functions
const exportAccountStatements = async () => {
  try {
    toast.info('Preparing your account statement...');
    const response = await api.post('/customers/account-statement', {
      statementType: 'account_statement'
    });
    toast.success(response.data.message || 'Account statement has been sent to your registered email address');
  } catch (error) {
    console.error('Error exporting account statements:', error);
    toast.error('Failed to send account statement. Please try again later.');
  }
};

const exportTransactionHistory = async () => {
  try {
    toast.info('Preparing your transaction history...');
    const response = await api.post('/customers/account-statement', {
      statementType: 'transaction_history'
    });
    toast.success(response.data.message || 'Transaction history has been sent to your registered email address');
  } catch (error) {
    console.error('Error exporting transaction history:', error);
    toast.error('Failed to send transaction history. Please try again later.');
  }
};

const exportPersonalData = async () => {
  try {
    toast.info('Preparing your personal data...');
    const response = await api.post('/customers/account-statement', {
      statementType: 'personal_data'
    });
    toast.success(response.data.message || 'Personal data has been sent to your registered email address');
  } catch (error) {
    console.error('Error exporting personal data:', error);
    toast.error('Failed to send personal data. Please try again later.');
  }
};

const handleSignOutAllSessions = async () => {
  try {
    // Call the real API endpoint
    const response = await api.post('/customers/signout-all-sessions');
    
    // If successful, update the token in localStorage and auth store
    if (response.data && response.data.token) {
      // Update token in localStorage
      localStorage.setItem('token', response.data.token);
      
      // Update token in auth store
      const authStore = useAuthStore();
      authStore.token = response.data.token;
    }
    
    toast.success('Signed out from all other devices');
  } catch (error) {
    console.error('Error signing out sessions:', error);
    toast.error('Failed to sign out from all devices');
  }
};

// Navigation method
const navigateToHome = () => {
  router.push('/');
};

// Two-factor authentication methods
const toggleTwoFactor = () => {
  if (profile.value.twoFactorEnabled) {
    // Show confirmation dialog to disable 2FA
    if (confirm('Are you sure you want to disable two-factor authentication? This will make your account less secure.')) {
      disableTwoFactor();
    }
  } else {
    // Show setup UI
    showTwoFactorSetup.value = true;
  }
};

// Disable two-factor authentication
const disableTwoFactor = async () => {
  try {
    // In a real app, you would call API to disable 2FA
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    profile.value.twoFactorEnabled = false;
    profile.value.twoFactorVerifiedAt = null;
    toast.success('Two-factor authentication has been disabled');
    
  } catch (error) {
    console.error('Error disabling two-factor authentication:', error);
    toast.error('Failed to disable two-factor authentication');
  }
};

// Verify two-factor code
const verifyTwoFactorCode = async () => {
  try {
    // Validate code format (6 digits)
    if (!/^\d{6}$/.test(twoFactorCode.value)) {
      toast.error('Please enter a valid 6-digit code');
      return;
    }
    
    // In a real app, you would call API to verify the code
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Success
    profile.value.twoFactorEnabled = true;
    profile.value.twoFactorVerifiedAt = new Date().toISOString();
    showTwoFactorSetup.value = false;
    twoFactorCode.value = '';
    
    toast.success('Two-factor authentication has been enabled');
    
  } catch (error) {
    console.error('Error verifying two-factor code:', error);
    toast.error('Failed to verify code. Please try again.');
  }
};

const cancelTwoFactorSetup = () => {
  showTwoFactorSetup.value = false;
  twoFactorCode.value = '';
};

// Copy to clipboard helper
const copyToClipboard = (text, label) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success(`${label} copied to clipboard`);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        toast.error('Failed to copy to clipboard');
      });
  } else {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        toast.success(`${label} copied to clipboard`);
      } else {
        toast.error('Failed to copy to clipboard');
      }
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('Failed to copy to clipboard');
    }
    
    document.body.removeChild(textArea);
  }
};

// Check if we're on mobile
const isMobile = computed(() => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 640; // sm breakpoint in Tailwind
});

// Handle window resize
const handleResize = () => {
  // The computed property will update automatically
  // This is just to force a re-render when window size changes
};

// Add resize listener
onMounted(() => {
  window.addEventListener('resize', handleResize);
  fetchProfile();
  fetchAccountActivity();
  fetchNotificationPreferences();
});

// Clean up
const onUnmounted = () => {
  window.removeEventListener('resize', handleResize);
};
</script>

<style scoped>
.text-primary {
  color: #3b82f6;
}
.bg-primary {
  background-color: #3b82f6;
}
.bg-primary-dark {
  background-color: #2563eb;
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
.hover\:bg-primary-dark:hover {
  background-color: #2563eb;
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

/* Toggle switch styles */
.dot {
  transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;
}

/* Profile image hover effect */
.group:hover .opacity-0 {
  opacity: 1;
}

/* Password strength meter */
.transition {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>
