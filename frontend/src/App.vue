<!-- filepath: c:\Users\Shamim shaikh\Desktop\Assignment\project\frontend\src\App.vue -->
<template>
  <div class="app min-h-screen bg-gray-50">
    <Header />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { useAuthStore } from './stores/authStore';
import Header from './components/Header.vue';
import { useRoute } from 'vue-router';

const authStore = useAuthStore();
const route = useRoute();

// Log authentication state changes
watch(() => authStore.isAuthenticated, (newValue) => {
  console.log('Authentication state changed:', newValue);
  console.log('User:', authStore.user);
  console.log('Role:', authStore.role);
});

onMounted(async () => {
  try {
    // Try to fetch user data if token exists
    if (localStorage.getItem('token')) {
      console.log('Token found in App.vue, fetching user data');
      await authStore.fetchUser();
      console.log('User data fetched in App.vue:', authStore.user);
      
      // Log detailed auth info
      console.log('Auth detailed state:', {
        isAuthenticated: authStore.isAuthenticated,
        isBanker: authStore.isBanker,
        role: authStore.role,
        token: !!authStore.token,
        user: !!authStore.user
      });
    } else {
      console.log('No token found in App.vue, user not authenticated');
    }
  } catch (error) {
    console.error('Error fetching user data in App.vue:', error);
  }
});
</script>

<style>
/* These styles will be global */
body {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
