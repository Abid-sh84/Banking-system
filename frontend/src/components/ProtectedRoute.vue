<!-- filepath: c:\Users\Shamim shaikh\Desktop\Assignment\project\src\components\ProtectedRoute.vue -->
<template>
  <div v-if="loading">Loading...</div>
  <slot v-else-if="authorized"></slot>
  <div v-else>
    <p>You are not authorized to view this page.</p>
    <router-link to="/" class="text-primary hover:underline">Go Home</router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '../stores/authStore';

const props = defineProps({
  requiredRole: {
    type: String,
    default: null
  }
});

const authStore = useAuthStore();

const loading = computed(() => authStore.loading);

const authorized = computed(() => {
  if (!authStore.isAuthenticated) return false;
  if (props.requiredRole && authStore.user.role !== props.requiredRole) return false;
  return true;
});
</script>
