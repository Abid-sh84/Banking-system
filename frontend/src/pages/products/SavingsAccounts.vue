<!-- filepath: c:\Users\Shamim shaikh\Desktop\Assignment\project\frontend\src\pages\products\SavingsAccounts.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
    <!-- Header with bank logo -->
    <header class="bg-white shadow">
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
    
    <!-- Hero Section -->
    <div class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Savings Accounts
          </h1>
          <p class="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Grow your money while keeping it easily accessible
          </p>
        </div>
      </div>
    </div>
    
    <!-- Features Section -->
    <div class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Why Choose Our Savings Account?
          </h2>
          <p class="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            Designed to make your money work harder for you
          </p>
        </div>
        
        <div class="mt-16 grid gap-8 md:grid-cols-3">
          <!-- Feature 1 -->
          <div class="bg-white rounded-lg p-6 shadow-md">
            <div class="h-12 w-12 bg-indigo-100 rounded-md flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900">High Interest Rates</h3>
            <p class="mt-2 text-gray-600">
              Enjoy interest rates up to 7% p.a., significantly higher than traditional banks, 
              helping your money grow faster.
            </p>
          </div>
          
          <!-- Feature 2 -->
          <div class="bg-white rounded-lg p-6 shadow-md">
            <div class="h-12 w-12 bg-indigo-100 rounded-md flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900">Instant Access</h3>
            <p class="mt-2 text-gray-600">
              Access your money anytime, anywhere with no restrictions or penalties through 
              our award-winning mobile and web banking platforms.
            </p>
          </div>
          
          <!-- Feature 3 -->
          <div class="bg-white rounded-lg p-6 shadow-md">
            <div class="h-12 w-12 bg-indigo-100 rounded-md flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900">Secure & Insured</h3>
            <p class="mt-2 text-gray-600">
              Your deposits are protected by DICGC insurance up to ₹5 lakhs, 
              with state-of-the-art security to protect your financial information.
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Account Types -->
    <div class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose The Right Account For You
          </h2>
          <p class="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            Tailored savings solutions for every need
          </p>
        </div>
        
        <div class="mt-12 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
          <!-- Basic Account -->
          <div class="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
            <div class="flex-1">
              <h3 class="text-xl font-semibold text-gray-900">Basic Savings</h3>
              <p class="mt-4 flex items-baseline text-gray-900">
                <span class="text-5xl font-extrabold tracking-tight">4%</span>
                <span class="ml-1 text-xl font-semibold">p.a.</span>
              </p>
              <p class="mt-2 text-sm text-gray-500">Interest paid quarterly</p>
              
              <ul class="mt-6 space-y-4">
                <li class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p class="ml-3 text-sm text-gray-700">₹0 minimum balance</p>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p class="ml-3 text-sm text-gray-700">Free virtual debit card</p>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p class="ml-3 text-sm text-gray-700">5 free ATM withdrawals/month</p>
                </li>
              </ul>
            </div>
            
            <a href="#" class="mt-8 block w-full bg-indigo-600 border border-transparent rounded-md py-3 px-6 text-center font-medium text-white hover:bg-indigo-700">
              Apply Now
            </a>
          </div>
          
          <!-- Premium Account -->
          <div class="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
            <div class="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4">
              <span class="inline-flex rounded-full bg-indigo-600 px-4 py-1 text-sm font-semibold text-white">Popular</span>
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-semibold text-gray-900">Premium Savings</h3>
              <p class="mt-4 flex items-baseline text-gray-900">
                <span class="text-5xl font-extrabold tracking-tight">6%</span>
                <span class="ml-1 text-xl font-semibold">p.a.</span>
              </p>
              <p class="mt-2 text-sm text-gray-500">Interest paid monthly</p>
              
              <ul class="mt-6 space-y-4">
                <li class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p class="ml-3 text-sm text-gray-700">₹10,000 minimum balance</p>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p class="ml-3 text-sm text-gray-700">Physical + virtual debit cards</p>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p class="ml-3 text-sm text-gray-700">Unlimited ATM withdrawals</p>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p class="ml-3 text-sm text-gray-700">Priority customer service</p>
                </li>
              </ul>
            </div>
            
            <a href="#" class="mt-8 block w-full bg-indigo-600 border border-transparent rounded-md py-3 px-6 text-center font-medium text-white hover:bg-indigo-700">
              Apply Now
            </a>
          </div>
          
          <!-- Senior Citizen Account -->
          <div class="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
            <div class="flex-1">
              <h3 class="text-xl font-semibold text-gray-900">Senior Advantage</h3>
              <p class="mt-4 flex items-baseline text-gray-900">
                <span class="text-5xl font-extrabold tracking-tight">7%</span>
                <span class="ml-1 text-xl font-semibold">p.a.</span>
              </p>
              <p class="mt-2 text-sm text-gray-500">For citizens aged 60+</p>
              
              <ul class="mt-6 space-y-4">
                <li class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p class="ml-3 text-sm text-gray-700">₹5,000 minimum balance</p>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p class="ml-3 text-sm text-gray-700">Doorstep banking available</p>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p class="ml-3 text-sm text-gray-700">Free health insurance cover</p>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p class="ml-3 text-sm text-gray-700">Dedicated relationship manager</p>
                </li>
              </ul>
            </div>
            
            <a href="#" class="mt-8 block w-full bg-indigo-600 border border-transparent rounded-md py-3 px-6 text-center font-medium text-white hover:bg-indigo-700">
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </div>
    
    <!-- How to Apply Section -->
    <div class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How to Apply
          </h2>
          <p class="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            Open your account in minutes, not hours
          </p>
        </div>
        
        <div class="mt-12">
          <div class="lg:grid lg:grid-cols-3 lg:gap-8">
            <!-- Step 1 -->
            <div class="text-center">
              <div class="mx-auto h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 class="mt-6 text-xl font-semibold text-gray-900">Complete Application</h3>
              <p class="mt-2 text-base text-gray-500">
                Fill out our simple online application form with your personal information and KYC documents.
              </p>
            </div>
            
            <!-- Step 2 -->
            <div class="mt-10 lg:mt-0 text-center">
              <div class="mx-auto h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="mt-6 text-xl font-semibold text-gray-900">Video Verification</h3>
              <p class="mt-2 text-base text-gray-500">
                Complete a quick video KYC process from the comfort of your home, at your convenience.
              </p>
            </div>
            
            <!-- Step 3 -->
            <div class="mt-10 lg:mt-0 text-center">
              <div class="mx-auto h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="mt-6 text-xl font-semibold text-gray-900">Start Banking</h3>
              <p class="mt-2 text-base text-gray-500">
                Your account will be active within 24 hours, and you can immediately start making deposits.
              </p>
            </div>
          </div>
          
          <div class="mt-12 text-center">
            <a href="#" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Apply for an Account
              <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 -mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
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
