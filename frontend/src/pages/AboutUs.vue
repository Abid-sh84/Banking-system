<!-- filepath: c:\Users\Shamim shaikh\Desktop\Assignment\project\frontend\src\pages\AboutUs.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
    <!-- Header with bank logo -->
    <!-- <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <router-link to="/" class="flex items-center">
          <div class="h-10 w-10 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full flex items-center justify-center shadow-md">
            <span class="text-white text-lg font-bold">MB</span>
          </div>
          <span class="ml-3 text-xl font-semibold text-gray-900">Modern Bank</span>
        </router-link>
        <div class="hidden md:block">
          <router-link to="/" class="px-3 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200">
            Home
          </router-link>
        </div>
      </div>
    </header>
     -->
    <!-- Hero Section -->
    <div class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            About Modern Bank
          </h1>
          <p class="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Building financial trust for the digital age
          </p>
        </div>
      </div>
    </div>
    
    <!-- Our Story Section -->
    <div class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div>
            <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Story
            </h2>
            <p class="mt-4 text-lg text-gray-500">
              Founded in 2010, Modern Bank started with a simple mission: make banking accessible, 
              transparent, and customer-centric. In an industry often criticized for complexity and 
              hidden fees, we set out to build a financial institution that puts customers first.
            </p>
            <p class="mt-4 text-lg text-gray-500">
              What began as a small fintech startup has grown into one of India's most trusted 
              digital banking platforms, serving millions of customers across the country.
            </p>
          </div>
          <div class="mt-10 lg:mt-0">
            <div class="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Modern office interior" 
                class="w-full h-full object-center object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Our Values Section -->
    <div class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Values
          </h2>
          <p class="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            The principles that guide every decision we make
          </p>
        </div>
        
        <div class="mt-16 grid gap-8 md:grid-cols-3">
          <!-- Trust -->
          <div class="bg-gray-50 rounded-lg p-6 shadow-md">
            <div class="h-12 w-12 bg-indigo-100 rounded-md flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900">Trust</h3>
            <p class="mt-2 text-gray-600">
              We believe that trust is the foundation of banking. Every feature, policy, 
              and interaction is designed to reinforce the trust our customers place in us.
            </p>
          </div>
          
          <!-- Innovation -->
          <div class="bg-gray-50 rounded-lg p-6 shadow-md">
            <div class="h-12 w-12 bg-indigo-100 rounded-md flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900">Innovation</h3>
            <p class="mt-2 text-gray-600">
              The financial world is constantly evolving. We embrace change and continuously 
              innovate to provide cutting-edge banking solutions while maintaining security.
            </p>
          </div>
          
          <!-- Accessibility -->
          <div class="bg-gray-50 rounded-lg p-6 shadow-md">
            <div class="h-12 w-12 bg-indigo-100 rounded-md flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900">Accessibility</h3>
            <p class="mt-2 text-gray-600">
              Banking should be for everyone. We're committed to making financial services 
              accessible to all Indians, regardless of location, background, or experience.
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Leadership Section -->
    <div class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Leadership
          </h2>
          <p class="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            Meet the team guiding Modern Bank forward
          </p>
        </div>
        
        <div class="mt-12 grid gap-8 md:grid-cols-3">
          <!-- Leader 1 -->
          <div class="bg-white rounded-lg overflow-hidden shadow-md">
            <div class="aspect-w-3 aspect-h-2">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                alt="CEO profile" 
                class="w-full h-full object-center object-cover"
              />
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900">Rajiv Patel</h3>
              <p class="text-indigo-600">Chief Executive Officer</p>
              <p class="mt-2 text-gray-600">
                Former fintech entrepreneur with 20+ years of experience in banking innovation.
              </p>
            </div>
          </div>
          
          <!-- Leader 2 -->
          <div class="bg-white rounded-lg overflow-hidden shadow-md">
            <div class="aspect-w-3 aspect-h-2">
              <img 
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80" 
                alt="CTO profile" 
                class="w-full h-full object-center object-cover"
              />
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900">Priya Sharma</h3>
              <p class="text-indigo-600">Chief Technology Officer</p>
              <p class="mt-2 text-gray-600">
                Tech leader specializing in secure financial systems and digital transformation.
              </p>
            </div>
          </div>
          
          <!-- Leader 3 -->
          <div class="bg-white rounded-lg overflow-hidden shadow-md">
            <div class="aspect-w-3 aspect-h-2">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="CFO profile" 
                class="w-full h-full object-center object-cover"
              />
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900">Arjun Mehta</h3>
              <p class="text-indigo-600">Chief Financial Officer</p>
              <p class="mt-2 text-gray-600">
                Former Reserve Bank of India advisor with expertise in regulatory compliance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <!-- Company Info -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Modern Bank</h3>
            <p class="text-gray-400 text-sm">
              Secure, reliable banking for modern India.
            </p>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2 text-sm text-gray-400">
              <li>
                <router-link to="/about-us" class="hover:text-white transition-colors duration-200">
                  About Us
                </router-link>
              </li>
              <li>
                <router-link to="/careers" class="hover:text-white transition-colors duration-200">
                  Careers
                </router-link>
              </li>
              <li>
                <router-link to="/contact" class="hover:text-white transition-colors duration-200">
                  Contact
                </router-link>
              </li>
              <li>
                <router-link to="/blog" class="hover:text-white transition-colors duration-200">
                  Blog
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Products -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Products</h3>
            <ul class="space-y-2 text-sm text-gray-400">
              <li>
                <router-link to="/products/savings-accounts" class="hover:text-white transition-colors duration-200">
                  Savings Accounts
                </router-link>
              </li>
              <li>
                <router-link to="/products/fixed-deposits" class="hover:text-white transition-colors duration-200">
                  Fixed Deposits
                </router-link>
              </li>
              <li>
                <router-link to="/products/loans" class="hover:text-white transition-colors duration-200">
                  Loans
                </router-link>
              </li>
              <li>
                <router-link to="/products/credit-cards" class="hover:text-white transition-colors duration-200">
                  Credit Cards
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Legal & Trust -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Legal</h3>
            <ul class="space-y-2 text-sm text-gray-400">
              <li>
                <router-link to="/privacy-policy" class="hover:text-white transition-colors duration-200">
                  Privacy Policy
                </router-link>
              </li>
              <li>
                <router-link to="/terms-of-service" class="hover:text-white transition-colors duration-200">
                  Terms of Service
                </router-link>
              </li>
              <li>
                <router-link to="/security" class="hover:text-white transition-colors duration-200">
                  Security
                </router-link>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-12 pt-8 border-t border-gray-800 text-center">
          <p class="text-gray-500 text-sm">
            © 2023 Modern Bank India. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// No special script logic required for this page
</script>
