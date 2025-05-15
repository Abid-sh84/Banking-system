<!-- filepath: c:\Users\Shamim shaikh\Desktop\Assignment\project\src\components\Header.vue -->
<template>
  <header class="bg-white shadow-sm relative z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <router-link to="/" class="flex-shrink-0 flex items-center">
            <div class="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
              <span class="text-white font-bold">MB</span>
            </div>
            <span class="ml-2 text-lg font-semibold text-primary hidden sm:block">Modern Bank</span>
          </router-link>          <div v-if="authStore.isAuthenticated" class="hidden md:ml-6 md:flex md:space-x-4">
            <!-- Customer Navigation -->
            <template v-if="authStore.isCustomer">
              <router-link 
                v-for="link in customerLinks" 
                :key="link.path" 
                :to="link.path"
                class="inline-flex items-center px-1 pt-1 border-b-2" 
                :class="[
                  $route.path === link.path 
                    ? 'border-primary text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                ]"
              >
                {{ link.label }}
              </router-link>
            </template>

            <!-- Banker Navigation -->
            <template v-if="authStore.isBanker">
              <router-link 
                v-for="link in bankerLinks" 
                :key="link.path" 
                :to="link.path"
                class="inline-flex items-center px-1 pt-1 border-b-2" 
                :class="[
                  $route.path === link.path 
                    ? 'border-primary text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                ]"
              >
                {{ link.label }}
              </router-link>
            </template>
          </div>
        </div>

        <div class="flex items-center">          
          <div v-if="authStore.isAuthenticated" class="ml-4 flex items-center md:ml-6">
            <div class="ml-3 relative">
              <div class="flex items-center space-x-3">
                <div class="flex flex-col items-end">
                  <span class="text-sm font-medium text-gray-700">{{ authStore.user?.name || 'User' }}</span>
                  <span class="text-xs text-gray-500 capitalize">{{ authStore.role }}</span>
                </div>
                <button 
                  @click="handleLogout"
                  class="p-1 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  <LogOut class="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          <div v-else class="ml-4 flex items-center space-x-2">
            <router-link
              to="/customer/login"
              class="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Customer Login
            </router-link>
            <span class="text-gray-300">|</span>
            <router-link
              to="/banker/login"
              class="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Banker Login
            </router-link>
          </div>
          
          <!-- Mobile menu button -->
          <div class="flex items-center md:hidden">
            <button 
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <Menu v-if="!mobileMenuOpen" class="h-6 w-6" />
              <X v-else class="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition
      enter-active-class="transition ease-out duration-100 transform"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75 transform"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="mobileMenuOpen" class="md:hidden bg-white shadow-lg absolute w-full z-50">
        <div class="pt-2 pb-3 space-y-1">            <!-- Customer Navigation Mobile -->
          <template v-if="authStore.isCustomer">
            <router-link 
              v-for="link in customerLinks" 
              :key="'mob-' + link.path" 
              :to="link.path"
              class="block pl-3 pr-4 py-2 border-l-4"
              :class="[
                $route.path === link.path 
                  ? 'border-primary text-primary bg-primary-50' 
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
              ]"
              @click="mobileMenuOpen = false"
            >
              {{ link.label }}
            </router-link>
          </template>          <!-- Banker Navigation Mobile -->
          <template v-if="authStore.isBanker">
            <router-link 
              v-for="link in bankerLinks" 
              :key="'mob-' + link.path" 
              :to="link.path"
              class="block pl-3 pr-4 py-2 border-l-4"
              :class="[
                $route.path === link.path 
                  ? 'border-primary text-primary bg-primary-50' 
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
              ]"
              @click="mobileMenuOpen = false"
            >
              {{ link.label }}
            </router-link>
          </template>          <div v-if="authStore.isAuthenticated" class="border-t border-gray-200 pt-4 pb-3">
            <div class="flex items-center px-4">
              <div class="flex-shrink-0">
                <div class="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <User class="h-5 w-5 text-white" />
                </div>
              </div>
              <div class="ml-3">
                <div class="text-base font-medium text-gray-800">{{ authStore.user?.name || 'User' }}</div>
                <div class="text-sm font-medium text-gray-500">{{ authStore.user?.email || 'Loading...' }}</div>
              </div>
            </div>
            <div class="mt-3 space-y-1">
              <button 
                @click="handleLogout"
                class="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import { LogOut, User, Menu, X } from 'lucide-vue-next';

const authStore = useAuthStore();
const router = useRouter();
const mobileMenuOpen = ref(false);

const customerLinks = [
  { path: '/customer/dashboard', label: 'Dashboard' },
  { path: '/customer/profile', label: 'Profile' }
];

const bankerLinks = [
  { path: '/banker/dashboard', label: 'Dashboard' }
];

const handleLogout = () => {
  authStore.logout();
  router.push('/');
  mobileMenuOpen.value = false;
};
</script>
