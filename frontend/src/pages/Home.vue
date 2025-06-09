<!-- filepath: c:\Users\Shamim shaikh\Desktop\Assignment\project\frontend\src\pages\Home.vue -->
<template>  <div class="overflow-hidden w-full">    <!-- Hero section with enhanced banking design - full width -->    <div class="relative bg-gradient-to-r from-blue-900 to-indigo-800 text-white overflow-hidden w-full">
      <div class="absolute inset-0 opacity-20">
        <img
          src="https://www.gkslegal.com/wp-content/uploads/2022/02/digital-banking.jpg"
          class="h-full w-full object-cover"
          alt="Banking background pattern"
        />
      </div>
      <!-- Floating security badge icon -->
      <div class="hidden lg:block absolute top-10 right-10 bg-white/90 text-gray-900 p-3 rounded-lg shadow-xl backdrop-blur-sm z-20 animate-pulse">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span class="font-semibold">256-bit Encryption Secured</span>
        </div>
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">        <div class="py-16 md:py-24 lg:py-32">
          <div class="flex flex-col lg:flex-row items-center justify-between hero-section max-w-full">
            <div class="animate-fadeIn lg:max-w-xl mb-12 lg:mb-0">
              <div class="flex items-center mb-8">
                <span class="bg-white/20 text-xs text-white px-3 py-1 rounded-full backdrop-blur-sm">Bank Securely • Anytime • Anywhere</span>
              </div>
              <h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                <span class="block">Modern Banking</span>
                <span class="block text-blue-200">For Modern India</span>
              </h1>
              <p class="mt-6 text-xl leading-7 text-blue-100 max-w-lg">
                Experience the future of banking with our secure digital platform.
                Manage accounts, make transactions, and track spending—all in one
                place, with ₹ INR support.
              </p>              <div class="mt-10 flex flex-col sm:flex-row gap-4" v-if="!authStore.isAuthenticated">
                <router-link
                  to="/customer/login"
                  class="px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-lg bg-blue-500 text-white hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 text-center"
                >
                  Log In
                </router-link>
                <router-link
                  to="/account-selection"
                  class="px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-lg bg-white text-blue-800 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 text-center"
                >
                  Open an Account
                </router-link>
              </div>
              <div class="mt-10 flex flex-col sm:flex-row gap-4" v-else>
                <router-link
                  :to="authStore.role === 'customer' ? '/customer/dashboard' : '/banker/dashboard'"
                  class="px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-lg bg-blue-500 text-white hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 text-center"
                >
                  Go to Dashboard
                </router-link>
              </div></div>
              <div class="block w-full lg:w-auto transaction-card">              <div class="relative max-w-md mx-auto animate-fadeIn">
                <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg transform skew-y-0 sm:rotate-3 rounded-3xl"></div>
                <div class="relative bg-white p-6 rounded-3xl shadow-lg">
                  <!-- Bank card design at the top -->
                  <div class="mb-8 bg-gradient-to-r from-blue-700 to-indigo-900 p-4 rounded-xl shadow-md overflow-hidden relative">
                    <div class="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full transform translate-x-20 -translate-y-20"></div>
                    <div class="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full transform -translate-x-10 translate-y-10"></div>
                    
                    <div class="flex justify-between items-center mb-8">
                      <div class="text-white text-xs font-medium">Modern Bank</div>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h10a2 2 0 012 2v12a4 4 0 01-4 4H7zm0 0h10" />
                      </svg>
                    </div>
                    
                    <div class="font-mono text-white text-lg tracking-wider mb-4">**** **** **** 4832</div>
                    
                    <div class="flex justify-between items-end">
                      <div>
                        <div class="text-gray-300 text-xs mb-1">Card Holder</div>
                        <div class="text-white text-sm">RAJESH SHARMA</div>
                      </div>
                      <div>
                        <div class="text-gray-300 text-xs mb-1">Expires</div>
                        <div class="text-white text-sm">05/27</div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between mb-6">
                    <div>
                      <h3 class="text-lg font-bold text-gray-900">Modern Bank App</h3>
                      <p class="text-sm text-gray-500">Your finances, simplified</p>
                    </div>
                    <div class="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span class="text-white font-bold">MB</span>
                    </div>
                  </div>

                  <!-- <div class="mb-6">
                    <div class="flex justify-between items-center mb-2">
                      <span class="text-sm font-medium text-gray-500">Balance</span>
                      <span class="text-sm font-medium text-green-500">+2.5%</span>
                    </div>
                    <div class="text-2xl font-bold text-gray-900">₹1,42,350.75</div>
                    <div class="text-xs text-gray-500 mt-1">Current Account **** 4832</div>
                  </div> -->

                  <div class="space-y-4">
                    <div class="bg-gray-50 p-3 rounded-lg flex items-center hover:bg-gray-100 transition-colors duration-200">
                      <div class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                          />
                        </svg>
                      </div>
                      <div class="flex-1">
                        <div class="text-sm font-medium text-gray-900">Salary Deposit</div>
                        <div class="text-xs text-gray-500">15 May, 2025</div>
                      </div>
                      <div class="text-sm font-medium text-green-500">+₹45,000</div>
                    </div>

                    <div class="bg-gray-50 p-3 rounded-lg flex items-center hover:bg-gray-100 transition-colors duration-200">
                      <div class="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 text-red-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          />
                        </svg>
                      </div>
                      <div class="flex-1">
                        <div class="text-sm font-medium text-gray-900">Electricity Bill</div>
                        <div class="text-xs text-gray-500">12 May, 2025</div>
                      </div>
                      <div class="text-sm font-medium text-red-500">-₹2,450</div>
                    </div>
                  </div>
                  
                  <!-- Live update indicator -->
                  <div class="flex items-center mt-4 pt-4 border-t border-gray-100">
                    <div class="h-2 w-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                    <span class="text-xs text-gray-500">Live updates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Curved divider -->
      <div
        class="absolute bottom-0 left-0 right-0 h-16 bg-white"
        style="clip-path: ellipse(55% 100% at 50% 100%);"
      ></div>
    </div>    <!-- Features section with enhanced cards -->
    <div class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
          <p class="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
            Banking made simple
          </p>
          <p class="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Our modern banking system is designed to provide you with the best experience.
          </p>
        </div>

        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <!-- Secure Transactions -->
          <div class="relative bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
            <div class="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
            <div class="p-8">
              <div class="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-5 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-medium text-gray-900">Secure Banking</h3>
              <p class="mt-3 text-base text-gray-500">
                Bank with confidence knowing your accounts are protected with
                state-of-the-art security measures and encryption.
              </p>
              <ul class="mt-4 space-y-2">
                <li class="flex items-center text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  End-to-end encryption
                </li>
                <li class="flex items-center text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Two-factor authentication
                </li>
              </ul>
            </div>
          </div>

          <!-- Mobile Banking -->
          <div class="relative bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
            <div class="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
            <div class="p-8">
              <div class="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-5 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-medium text-gray-900">Mobile Banking</h3>
              <p class="mt-3 text-base text-gray-500">
                Access your accounts, transfer money, and pay bills anytime,
                anywhere with our easy-to-use mobile platform.
              </p>
              <ul class="mt-4 space-y-2">
                <li class="flex items-center text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  24/7 account access
                </li>
                <li class="flex items-center text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Quick mobile transfers
                </li>
              </ul>
            </div>
          </div>

          <!-- Financial Insights -->
          <div class="relative bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
            <div class="absolute top-0 left-0 w-full h-1 bg-purple-500"></div>
            <div class="p-8">
              <div class="flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 text-purple-600 mb-5 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-medium text-gray-900">Financial Insights</h3>
              <p class="mt-3 text-base text-gray-500">
                Get personalized insights and visualizations to help you track
                spending, save more, and reach your financial goals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>    <!-- How It Works Section with enhanced design -->
    <div class="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <div class="inline-block">
            <h2 class="text-base text-blue-600 font-semibold tracking-wide uppercase bg-blue-50 py-1 px-3 rounded-full inline-block mb-2">
              Getting Started
            </h2>
          </div>
          <p class="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
            How It Works
          </p>
          <p class="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Start your journey with Modern Bank in three simple steps.
          </p>
        </div>

        <div class="relative">
          <!-- Connector line with animation -->
          <div class="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-indigo-500 transform -translate-y-1/2 z-0 rounded-full"></div>

          <div class="grid grid-cols-1 gap-12 md:grid-cols-3 relative z-10">
            <!-- Step 1 -->
            <div class="bg-white rounded-xl shadow-xl p-8 text-center transform transition duration-500 hover:scale-105 hover:shadow-2xl border border-gray-100">
              <div class="inline-flex items-center justify-center h-20 w-20 rounded-full bg-blue-100 text-blue-600 text-2xl font-bold mb-5 shadow-inner border-4 border-white">
                1
              </div>
              <h3 class="text-xl font-medium text-gray-900">Create Account</h3>
              <p class="mt-3 text-base text-gray-500">
                Sign up online in just minutes with your email and basic
                information.
              </p>              <div class="mt-6" v-if="!authStore.isAuthenticated">
                <router-link 
                  to="/account-selection"
                  class="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                >
                  Get Started
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </router-link>
              </div>
              <div class="mt-6" v-else>
                <router-link 
                  :to="authStore.role === 'customer' ? '/customer/dashboard' : '/banker/dashboard'"
                  class="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                >
                  Go to Dashboard
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </router-link>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="bg-white rounded-xl shadow-xl p-8 text-center transform transition duration-500 hover:scale-105 hover:shadow-2xl border border-gray-100 md:translate-y-4">
              <div class="inline-flex items-center justify-center h-20 w-20 rounded-full bg-green-100 text-green-600 text-2xl font-bold mb-5 shadow-inner border-4 border-white">
                2
              </div>
              <h3 class="text-xl font-medium text-gray-900">Set Up Profile</h3>
              <p class="mt-3 text-base text-gray-500">
                Complete your profile and connect your banking preferences
                securely.
              </p>
              <div class="mt-6">
                <span class="text-green-600 inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  100% Secure
                </span>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="bg-white rounded-xl shadow-xl p-8 text-center transform transition duration-500 hover:scale-105 hover:shadow-2xl border border-gray-100">
              <div class="inline-flex items-center justify-center h-20 w-20 rounded-full bg-indigo-100 text-indigo-600 text-2xl font-bold mb-5 shadow-inner border-4 border-white">
                3
              </div>
              <h3 class="text-xl font-medium text-gray-900">Start Banking</h3>
              <p class="mt-3 text-base text-gray-500">
                Make deposits, track spending, and manage your finances with ease.
              </p>
              <div class="flex justify-center mt-6 space-x-2">
                <div class="w-2 h-2 rounded-full bg-indigo-500"></div>
                <div class="w-2 h-2 rounded-full bg-indigo-400"></div>
                <div class="w-2 h-2 rounded-full bg-indigo-300"></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- App Screenshots Preview -->
        <div class="mt-16 flex justify-center">
          <div class="relative">
            <div class="absolute -top-6 -left-6 w-64 h-32 bg-indigo-100 rounded-lg transform -rotate-6 z-0"></div>
            <div class="absolute -bottom-6 -right-6 w-64 h-32 bg-blue-100 rounded-lg transform rotate-6 z-0"></div>
            <div class="relative bg-white p-4 shadow-xl rounded-xl z-10 max-w-2xl border border-gray-200">
              <p class="text-center text-gray-800 font-medium mb-2">Modern Banking at Your Fingertips</p>
              <div class="flex justify-center space-x-4">
                <div class="w-24 h-40 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <div class="h-1/2 bg-gradient-to-br from-blue-400 to-indigo-600"></div>
                  <div class="h-1/2 bg-white p-1">
                    <div class="bg-gray-200 w-full h-2 mb-1 rounded-sm"></div>
                    <div class="bg-gray-200 w-3/4 h-2 mb-1 rounded-sm"></div>
                    <div class="bg-blue-200 w-1/2 h-4 mt-2 rounded-sm"></div>
                  </div>
                </div>
                <div class="w-24 h-40 bg-gray-800 rounded-lg overflow-hidden shadow-lg transform translate-y-3">
                  <div class="h-1/4 bg-gradient-to-r from-green-400 to-blue-500"></div>
                  <div class="h-3/4 bg-white p-1">
                    <div class="bg-gray-200 w-full h-2 mb-1 rounded-sm"></div>
                    <div class="bg-gray-200 w-1/2 h-2 mb-1 rounded-sm"></div>
                    <div class="bg-gray-200 w-3/4 h-2 mb-1 rounded-sm"></div>
                    <div class="bg-green-200 w-1/2 h-4 mt-2 rounded-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Testimonials -->
    <div class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-base text-blue-600 font-semibold tracking-wide uppercase">
            Testimonials
          </h2>
          <p class="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
            What our customers say
          </p>
        </div>

        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <!-- Testimonial 1 -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 p-8">
            <div class="flex items-center mb-6">
              <div class="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-medium text-gray-900">Priya Sharma</h3>
                <p class="text-sm text-gray-500">Business Owner</p>
              </div>
            </div>
            <div class="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p class="text-base text-gray-600 italic">
              "Modern Bank has completely transformed how I manage my business
              finances. The platform is intuitive, and the customer service is
              exceptional."
            </p>
          </div>

          <!-- Testimonial 2 -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 p-8">
            <div class="flex items-center mb-6">
              <div class="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-medium text-gray-900">Rajesh Kumar</h3>
                <p class="text-sm text-gray-500">Software Engineer</p>
              </div>
            </div>
            <div class="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p class="text-base text-gray-600 italic">
              "The financial insights have helped me save more money than I ever
              thought possible. The mobile app is fast and secure."
            </p>
          </div>

          <!-- Testimonial 3 -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 p-8">
            <div class="flex items-center mb-6">
              <div class="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-medium text-gray-900">Neha Patel</h3>
                <p class="text-sm text-gray-500">Student</p>
              </div>
            </div>
            <div class="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p class="text-base text-gray-600 italic">
              "As a student, I needed something simple to manage my limited funds.
              Modern Bank makes tracking expenses so easy, and the zero fees are
              perfect for me."
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section - full width -->
    <div class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white w-full">
      <div class="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-20 text-center">
        <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Ready to experience modern banking?
        </h2>
        <p class="mt-4 text-lg">
          Join thousands of satisfied customers and take control of your finances
          today.
        </p>        <div class="mt-10" v-if="!authStore.isAuthenticated">
          <router-link
            to="/account-selection"
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white transition-all duration-300"
          >
            Open an Account Now
          </router-link>
        </div>
        <div class="mt-10" v-else>
          <router-link
            :to="authStore.role === 'customer' ? '/customer/dashboard' : '/banker/dashboard'"
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white transition-all duration-300"
          >
            Go to Dashboard
          </router-link>
        </div>
      </div>
    </div>

    <!-- Footer with Trust Indicators - full width -->
    <footer class="bg-gray-900 text-white py-12 w-full">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <!-- Company Info -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Modern Bank</h3>
            <p class="text-gray-400 text-sm">
              Secure, reliable banking for modern India.
            </p>
          </div>          <!-- Quick Links -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2 text-sm text-gray-400">
              <li>
                <router-link
                  to="/about-us"
                  class="hover:text-white transition-colors duration-200"
                >
                  About Us
                </router-link>
              </li>
              <li>
                <router-link
                  to="/careers"
                  class="hover:text-white transition-colors duration-200"
                >
                  Careers
                </router-link>
              </li>
              <li>
                <router-link
                  to="/contact"
                  class="hover:text-white transition-colors duration-200"
                >
                  Contact
                </router-link>
              </li>
              <li>
                <router-link
                  to="/blog"
                  class="hover:text-white transition-colors duration-200"
                >
                  Blog
                </router-link>
              </li>
            </ul>
          </div>          <!-- Products -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Products</h3>
            <ul class="space-y-2 text-sm text-gray-400">
              <li>
                <router-link
                  to="/products/savings-accounts"
                  class="hover:text-white transition-colors duration-200"
                >
                  Savings Accounts
                </router-link>
              </li>
              <li>
                <router-link
                  to="/products/fixed-deposits"
                  class="hover:text-white transition-colors duration-200"
                >
                  Fixed Deposits
                </router-link>
              </li>
              <li>
                <router-link
                  to="/products/loans"
                  class="hover:text-white transition-colors duration-200"
                >
                  Loans
                </router-link>
              </li>
              <li>
                <router-link
                  to="/products/credit-cards"
                  class="hover:text-white transition-colors duration-200"
                >
                  Credit Cards
                </router-link>
              </li>
            </ul>
          </div>          <!-- Legal & Trust -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Legal</h3>
            <ul class="space-y-2 text-sm text-gray-400">
              <li>
                <router-link
                  to="/privacy-policy"
                  class="hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </router-link>
              </li>
              <li>
                <router-link
                  to="/terms-of-service"
                  class="hover:text-white transition-colors duration-200"
                >
                  Terms of Service
                </router-link>
              </li>
              <li>
                <router-link
                  to="/security"
                  class="hover:text-white transition-colors duration-200"
                >
                  Security
                </router-link>
              </li>
            </ul>
          </div>
        </div>

        <!-- Trust Badges -->
        <div class="mt-12 pt-8 border-t border-gray-800 text-center">
          <div class="flex flex-wrap justify-center gap-8 mb-6">
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-green-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span class="text-sm">256-bit SSL Security</span>
            </div>
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-blue-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
              <span class="text-sm">Verified & Trusted</span>
            </div>
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-yellow-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span class="text-sm">RBI Approved</span>
            </div>
          </div>

          <p class="text-gray-500 text-sm">
            © 2023 Modern Bank India. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/authStore';

// Access the auth store to check login status
const authStore = useAuthStore();
</script>

<style scoped>
/* Custom animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fadeIn {
  animation: fadeIn 1s ease-out forwards;
}

/* Custom gradient */
.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

.from-blue-900 {
  --tw-gradient-from: #1e3a8a;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(30, 58, 138, 0));
}

.to-indigo-800 {
  --tw-gradient-to: #3730a3;
}

/* Make sure full width works correctly */
.w-full {
  width: 100vw;
  max-width: 100%;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
}

/* Responsive hero section */
@media (min-width: 1024px) {
  .hero-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .transaction-card {
    width: 350px;
    flex-shrink: 0;
    margin-left: 2rem;
    margin-right: 2rem;
  }
}

/* Card animation for visual appeal */
.transaction-card {
  transition: transform 0.3s ease-in-out;
}

.transaction-card:hover {
  transform: translateY(-5px);
}
</style>
