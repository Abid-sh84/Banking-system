<!-- filepath: c:\Users\Shamim shaikh\Desktop\Assignment\project\frontend\src\App.vue -->
<template>
  <div class="app min-h-screen w-full overflow-x-hidden">
    <Header />
    <main class="w-full">
      <!-- Main content wrapper -->
      <div class="w-full">
        <router-view />
      </div>
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
/* Global styles for handling fixed navbar spacing */
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
}

/* Smooth scrolling for the entire site */
html {
  scroll-behavior: smooth;
  overflow-x: hidden;
  width: 100%;
  max-width: 100%;
}

/* Ensure the page content fills the viewport */
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
}

main {
  flex: 1;
  width: 100%;
  max-width: 100%;
}

/* Apply consistent container styles */
@media (max-width: 640px) {
  .max-w-7xl {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
