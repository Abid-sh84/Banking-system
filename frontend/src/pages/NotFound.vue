<!-- filepath: c:\Users\Shamim shaikh\Desktop\Assignment\project\src\pages\NotFound.vue -->
<template>
  <div class="min-h-screen bg-gray-50 px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8 full-width-bg">
    <div class="max-w-max mx-auto">
      <main class="sm:flex">
        <p class="text-4xl font-extrabold text-primary sm:text-5xl">404</p>
        <div class="sm:ml-6">
          <div class="sm:border-l sm:border-gray-200 sm:pl-6">
            <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Page not found</h1>
            <p class="mt-1 text-base text-gray-500">Please check the URL in the address bar and try again.</p>
          </div>
          <div class="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
            <router-link
              to="/"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Go back home
            </router-link>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
// No additional logic needed
</script>

<style scoped>
.text-primary {
  color: #3b82f6;
}
.bg-primary {
  background-color: #3b82f6;
}
.hover\:bg-primary-dark:hover {
  background-color: #2563eb;
}
.focus\:ring-primary:focus {
  --tw-ring-color: #3b82f6;
}
</style>
