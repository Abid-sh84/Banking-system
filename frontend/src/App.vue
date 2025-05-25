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
import { useRoute, useRouter } from 'vue-router';

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

// Log authentication state changes
watch(() => authStore.isAuthenticated, (newValue) => {
  console.log('Authentication state changed:', newValue);
  console.log('User:', authStore.user);
  console.log('Role:', authStore.role);
});

onMounted(async () => {
  try {
    // Try to fetch user data if token exists
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Token found in App.vue, fetching user data');
      
      // Check if the token looks valid (at least in format)
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) {
        console.warn('Token appears malformed, clearing auth data');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        return;
      }
      
      try {
        // Try to parse the token payload (middle part) to check expiration
        const payload = JSON.parse(atob(tokenParts[1]));
        const expirationTime = payload.exp * 1000; // Convert to milliseconds
        
        if (Date.now() >= expirationTime) {
          console.warn('Token has expired, clearing auth data');
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          return;
        }
        
        console.log('Token appears valid, fetching user data');
      } catch (tokenError) {
        console.error('Error parsing token:', tokenError);
      }
      
      // Fetch user data using the auth store
      try {
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
      } catch (fetchError) {
        console.error('Error fetching user data:', fetchError);
        
        // If we got a 401/403 error, clear the invalid token
        if (fetchError.response && (fetchError.response.status === 401 || fetchError.response.status === 403)) {
          console.warn('Auth error when fetching user data, clearing auth data');
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          
          // Redirect to home or login page based on current path
          const currentPath = route.path;
          if (currentPath.includes('/banker/') || currentPath.includes('/customer/')) {
            if (currentPath.includes('/banker/')) {
              router.push('/banker/login');
            } else {
              router.push('/customer/login');
            }
          }
        }
      }
    } else {
      console.log('No token found in App.vue, user not authenticated');
    }
  } catch (error) {
    console.error('Error in App.vue auth initialization:', error);
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
