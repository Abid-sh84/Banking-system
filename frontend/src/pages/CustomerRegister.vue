<!-- filepath: c:\Users\Shamim shaikh\Desktop\Assignment\project\src\pages\CustomerRegister.vue -->
<template>
  <!-- Fixed background that fills the entire viewport -->
  <div class="full-width-bg bg-gradient-to-br from-blue-50 to-indigo-100 animate-fadeIn"></div>
  
  <!-- Content container with proper spacing -->
  <div class="min-h-screen flex flex-col pt-28 pb-12 sm:px-6 lg:px-8 navbar-spacing relative z-10">
    <!-- Abstract banking illustrations -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      <div class="absolute top-28 left-10 w-24 h-24 bg-primary opacity-10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-10 right-10 w-32 h-32 bg-indigo-600 opacity-10 rounded-full blur-3xl"></div>
      <div class="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-500 opacity-10 rounded-full blur-2xl"></div>
      <div class="absolute top-1/3 right-1/3 w-20 h-20 bg-indigo-400 opacity-10 rounded-full blur-2xl"></div>
      
      <!-- Security pattern -->
      <div class="absolute bottom-0 left-0 w-full h-32 opacity-20">
        <div class="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
        <div class="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent mt-3"></div>
        <div class="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent mt-6"></div>
        <div class="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent mt-9"></div>
      </div>
      
      <!-- Banking pattern dots -->
      <div class="grid grid-cols-12 grid-rows-12 gap-10 absolute inset-0">
        <div v-for="i in 12" :key="i" class="w-1 h-1 bg-gray-600 opacity-10 rounded-full"></div>
      </div>
    </div>    <div class="sm:mx-auto sm:w-full sm:max-w-md relative z-20 mt-8">
      <div class="flex justify-center">
        <div class="h-16 w-16 bg-gradient-to-r from-primary to-indigo-600 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden border-2 border-white">
          <span class="text-white text-2xl font-bold relative z-10">MB</span>
          <div class="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
        </div>
      </div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Create a Customer Account
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600 flex items-center justify-center gap-1">
        <span>Already have an account?</span>
        <router-link to="/customer/login" class="font-medium text-primary hover:text-primary-dark transition-colors duration-200 flex items-center">
          Sign in
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </router-link>
      </p>
      
      <!-- Security badge -->
      <div class="flex items-center justify-center mt-4">
        <div class="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Secure 256-bit Encrypted Connection
        </div>
      </div>
    </div>    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-20 form-container animate-slideInUp">
      <div class="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10 transition-all duration-300 hover:shadow-xl border border-gray-100">        <!-- Progress steps -->
        <div class="flex justify-between items-center mb-8">          <div class="flex flex-col items-center">
            <div class="h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium" :class="!showOtpVerification ? 'bg-primary text-white' : 'bg-green-500 text-white'">
              <span v-if="!showOtpVerification">1</span>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <span class="mt-1 text-xs" :class="!showOtpVerification ? 'text-primary font-medium' : 'text-green-500'">Details</span>
          </div>          <div class="flex-1 mx-2 h-1 bg-gray-200">
            <div class="h-1" :class="showOtpVerification ? 'bg-green-500 w-full' : 'bg-primary w-0'"></div>
          </div>
          <div class="flex flex-col items-center">
            <div class="h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium" :class="!showOtpVerification ? 'bg-gray-200 text-gray-500' : 'bg-primary text-white'">2</div>
            <span class="mt-1 text-xs" :class="!showOtpVerification ? 'text-gray-500' : 'text-primary font-medium'">Verification</span>
          </div>          <div class="flex-1 mx-2 h-1 bg-gray-200"></div>
          <div class="flex flex-col items-center">
            <div class="h-8 w-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-medium">3</div>
            <span class="mt-1 text-xs text-gray-500">Done</span>
          </div>
        </div>
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <!-- Registration Form Fields - Only show when not showing OTP verification -->
          <div v-if="!showOtpVerification">
            <!-- Name -->
            <div>
              <label for="name" class="text-sm font-medium text-gray-700 mb-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                </svg>
                Full Name
              </label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 sm:text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                </div>
                <input
                  id="name"
                  v-model="formData.name"
                  name="name"
                  type="text"
                  autocomplete="name"
                  required
                  placeholder="Enter your full legal name"
                  class="appearance-none block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all duration-200"
                  :class="{ 'border-red-500': errors.name }"
                />
                <transition name="fade">
                  <div v-if="formData.name && formData.name.length >= 2" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </transition>
              </div>
              <transition name="fade">
                <div v-if="errors.name" class="mt-2 text-sm text-red-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {{ errors.name }}
                </div>
              </transition>
              <p class="mt-1 text-xs text-gray-500">Please enter the name as it appears on your ID documents</p>
            </div>

          <!-- Email -->
          <div>
            <label for="email" class="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Email Address
            </label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
              </div>
              <input
                id="email"
                v-model="formData.email"
                name="email"
                type="email"
                autocomplete="email"
                required
                placeholder="Enter your email address"
                class="appearance-none block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all duration-200"
                :class="{ 'border-red-500': errors.email }"
              />
              <transition name="fade">
                <div v-if="formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </transition>
            </div>
            <transition name="fade">
              <div v-if="errors.email" class="mt-2 text-sm text-red-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {{ errors.email }}
              </div>
            </transition>
            <p class="mt-1 text-xs text-gray-500">We'll send account statements and notifications to this email</p>
          </div>          <!-- Password -->
          <div>
            <label for="password" class="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
              Password
            </label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
              </div>
              <input
                id="password"
                v-model="formData.password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="new-password"
                required
                placeholder="Create a strong password"
                class="appearance-none block w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all duration-200"
                :class="{ 'border-red-500': errors.password }"
              />
              <button 
                type="button" 
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <Eye v-if="!showPassword" class="h-5 w-5" />
                <EyeOff v-else class="h-5 w-5" />
              </button>
            </div>
            <transition name="fade">
              <div v-if="errors.password" class="mt-2 text-sm text-red-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {{ errors.password }}
              </div>
            </transition>
            
            <!-- Password strength indicator -->
            <div class="mt-2">
              <div class="flex items-center mb-1">
                <p class="text-xs text-gray-500 mr-1">Password strength:</p>
                <div class="flex-grow flex space-x-1">
                  <div class="h-1 flex-grow rounded-full" 
                    :class="[
                      formData.password.length === 0 ? 'bg-gray-200' : 
                      formData.password.length < 6 ? 'bg-red-400' : 
                      formData.password.length < 8 ? 'bg-yellow-400' : 'bg-green-400'
                    ]"></div>
                  <div class="h-1 flex-grow rounded-full" 
                    :class="[
                      formData.password.length === 0 ? 'bg-gray-200' : 
                      formData.password.length < 8 ? 'bg-gray-200' : 
                      !/[A-Z]/.test(formData.password) ? 'bg-yellow-400' : 'bg-green-400'
                    ]"></div>
                  <div class="h-1 flex-grow rounded-full" 
                    :class="[
                      formData.password.length === 0 ? 'bg-gray-200' : 
                      formData.password.length < 8 || !/[A-Z]/.test(formData.password) ? 'bg-gray-200' :
                      !/[0-9]/.test(formData.password) ? 'bg-yellow-400' : 'bg-green-400'
                    ]"></div>
                </div>
                <span class="ml-2 text-xs" 
                  :class="[
                    formData.password.length === 0 ? 'text-gray-400' : 
                    formData.password.length < 6 ? 'text-red-500' : 
                    formData.password.length < 8 || !/[A-Z]/.test(formData.password) || !/[0-9]/.test(formData.password) ? 'text-yellow-500' : 'text-green-500'
                  ]">
                  {{ 
                    formData.password.length === 0 ? '' : 
                    formData.password.length < 6 ? 'Weak' : 
                    formData.password.length < 8 || !/[A-Z]/.test(formData.password) || !/[0-9]/.test(formData.password) ? 'Moderate' : 'Strong'
                  }}
                </span>
              </div>
              <ul class="text-xs text-gray-500 list-disc ml-4 mt-1">
                <li :class="{ 'text-green-500': formData.password.length >= 6 }">Minimum 6 characters</li>
                <li :class="{ 'text-green-500': /[A-Z]/.test(formData.password) }">Include at least one uppercase letter</li>
                <li :class="{ 'text-green-500': /[0-9]/.test(formData.password) }">Include at least one number</li>
              </ul>
              <div class="flex items-center mt-2 bg-blue-50 p-2 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-xs text-blue-700">A strong password helps protect your financial information</p>
              </div>
            </div>
          </div>          <!-- Address -->
          <div>
            <label for="address" class="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
              Residential Address
            </label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                <span class="text-gray-500 sm:text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </span>
              </div>
              <textarea
                id="address"
                v-model="formData.address"
                name="address"
                rows="3"
                required
                placeholder="Enter your complete residential address"
                class="appearance-none block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all duration-200"
                :class="{ 'border-red-500': errors.address }"
              ></textarea>
              <transition name="fade">
                <div v-if="formData.address && formData.address.length >= 5" class="absolute top-3 right-0 pr-3 flex items-center pointer-events-none text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </transition>
            </div>
            <transition name="fade">
              <div v-if="errors.address" class="mt-2 text-sm text-red-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {{ errors.address }}
              </div>
            </transition>
            <p class="mt-1 text-xs text-gray-500">Enter your permanent residential address as per official records</p>
          </div>
          
          <!-- Phone -->
          <div>
            <label for="phone" class="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Mobile Number
            </label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </span>
              </div>
              <input
                id="phone"
                v-model="formData.phone"
                name="phone"
                type="tel"
                autocomplete="tel"
                required
                placeholder="Enter your 10-digit mobile number"
                class="appearance-none block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all duration-200"
                :class="{ 'border-red-500': errors.phone }"
              />
              <transition name="fade">
                <div v-if="formData.phone && formData.phone.length >= 10" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </transition>
            </div>
            <transition name="fade">
              <div v-if="errors.phone" class="mt-2 text-sm text-red-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {{ errors.phone }}
              </div>
            </transition>
            <div class="flex items-center mt-2 space-x-1">
              <div class="flex items-center bg-blue-50 p-1.5 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p class="text-xs text-blue-700">Used for OTP verification</p>
              </div>
              <div class="flex items-center bg-green-50 p-1.5 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p class="text-xs text-green-700">Secure & confidential</p>
              </div>
            </div>          </div>          <!-- Account Type -->
          <div>
            <label class="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
              </svg>
              Account Type
            </label>
            <div class="mt-1 p-4 bg-white border border-gray-200 rounded-md shadow-sm">
              <div class="flex items-center relative">
                <div class="flex-shrink-0">
                  <div v-if="formData.accountType === 'savings'" class="h-12 w-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shadow-inner relative overflow-hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <div class="absolute inset-0 bg-blue-400 opacity-10 animate-pulse"></div>
                  </div>
                  <div v-if="formData.accountType === 'current'" class="h-12 w-12 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center shadow-inner relative overflow-hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div class="absolute inset-0 bg-green-400 opacity-10 animate-pulse"></div>
                  </div>
                  <div v-if="formData.accountType === 'fixed'" class="h-12 w-12 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center shadow-inner relative overflow-hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div class="absolute inset-0 bg-purple-400 opacity-10 animate-pulse"></div>
                  </div>
                </div>
                
                <div class="ml-4 flex-1">
                  <div class="flex items-center justify-between">
                    <h3 class="text-sm font-medium text-gray-900">
                      {{ formData.accountType === 'savings' ? 'Savings Account' : 
                         formData.accountType === 'current' ? 'Current Account' : 'Fixed Deposit' }}
                    </h3>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" 
                      :class="{
                        'bg-blue-100 text-blue-800': formData.accountType === 'savings',
                        'bg-green-100 text-green-800': formData.accountType === 'current',
                        'bg-purple-100 text-purple-800': formData.accountType === 'fixed'
                      }">
                      {{ formData.accountType === 'savings' ? 'Personal' : 
                         formData.accountType === 'current' ? 'Business' : 'Investment' }}
                    </span>
                  </div>
                  
                  <div class="mt-1 grid grid-cols-2 gap-2">
                    <div v-if="formData.accountType === 'savings'" class="flex items-center text-xs text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      4.5% Interest Rate
                    </div>
                    <div v-if="formData.accountType === 'savings'" class="flex items-center text-xs text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Min Balance: ₹1,000
                    </div>
                    
                    <div v-if="formData.accountType === 'current'" class="flex items-center text-xs text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Overdraft Available
                    </div>
                    <div v-if="formData.accountType === 'current'" class="flex items-center text-xs text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Min Balance: ₹5,000
                    </div>
                    
                    <div v-if="formData.accountType === 'fixed'" class="flex items-center text-xs text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      7.5% Interest Rate
                    </div>
                    <div v-if="formData.accountType === 'fixed'" class="flex items-center text-xs text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Min Deposit: ₹10,000
                    </div>
                  </div>
                  
                  <div class="mt-2 flex items-center justify-between">
                    <div class="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span class="text-xs text-gray-500">FDIC insured up to $250,000</span>
                    </div>
                    <button
                      type="button"
                      @click="() => router.push('/account-selection')"
                      class="text-sm font-medium text-primary hover:text-primary-dark flex items-center"
                    >
                      Change
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              <div class="mt-3 pt-3 border-t border-gray-200">
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                  </svg>
                  <p class="text-xs text-gray-600">
                    {{ formData.accountType === 'savings' ? 'Perfect for personal savings with competitive interest rates and low minimum balance requirement.' : 
                       formData.accountType === 'current' ? 'Ideal for businesses with high transaction volume and check writing needs.' : 
                       'Best for long-term savings with higher interest rates and fixed maturity dates.' }}
                  </p>
                </div>              </div>
            </div>
          </div>
          </div>          <!-- OTP Verification Section - Show when OTP verification is active -->
          <div v-if="showOtpVerification" class="space-y-6">
            <div class="bg-blue-50 p-4 rounded-md">
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-blue-800">Verification Required</h3>
                  <div class="mt-2 text-sm text-blue-700">
                    <p>We've sent a verification code to <strong>{{ registeredEmail }}</strong>. Please check your inbox and enter the 6-digit code below to verify your email address.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- OTP Input -->
            <div>
              <label for="otp" class="text-sm font-medium text-gray-700 mb-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                </svg>
                Verification Code
              </label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 sm:text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                </div>
                <input
                  id="otp"
                  v-model="otp"
                  name="otp"
                  type="text"
                  autocomplete="one-time-code"
                  required
                  inputmode="numeric"
                  pattern="[0-9]*"
                  maxlength="6"
                  placeholder="Enter 6-digit verification code"
                  class="appearance-none block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all duration-200 text-center tracking-widest font-mono"
                />
              </div>
              <p class="mt-2 text-xs text-gray-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Code expires in 15 minutes
              </p>
            </div>
            
            <!-- Resend OTP Link -->
            <div class="text-sm text-center">
              <p class="text-gray-600">
                Didn't receive the code?
                <button 
                  type="button" 
                  @click="resendOtp"
                  class="text-primary hover:text-primary-dark transition-colors duration-200 font-medium focus:outline-none"
                  :disabled="loading"
                >
                  Resend code
                </button>
              </p>
            </div>
            
            <!-- Back Button -->
            <div class="text-center mt-4">
              <button
                type="button"
                @click="showOtpVerification = false; otpError = ''"
                class="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center mx-auto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to registration form
              </button>
            </div>
          </div>

          <!-- Terms and Conditions -->
          <div v-if="!showOtpVerification" class="relative flex items-start">
            <div class="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                v-model="acceptedTerms"
                class="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded transition-all duration-200"
                required
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="terms" class="font-medium text-gray-700">I accept the terms and conditions</label>
              <p class="text-gray-500">
                By creating an account, you agree to our 
                <a href="#" class="text-primary hover:text-primary-dark transition-colors duration-200">Terms of Service</a>, 
                <a href="#" class="text-primary hover:text-primary-dark transition-colors duration-200">Privacy Policy</a>, and 
                <a href="#" class="text-primary hover:text-primary-dark transition-colors duration-200">Electronic Communications Policy</a>.
              </p>
            </div>
          </div>

          <!-- Submit Button -->
          <div>            <button
              type="submit"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-primary to-indigo-600 hover:from-primary-light hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transform transition-all duration-200 hover:scale-105 relative overflow-hidden"
              :disabled="loading || (!showOtpVerification && !acceptedTerms) || (showOtpVerification && otp.length !== 6)"
              :class="{ 'opacity-70 cursor-not-allowed': loading || (!showOtpVerification && !acceptedTerms) || (showOtpVerification && otp.length !== 6) }"
            >
              <span class="relative z-10 flex items-center">
                <Loader2 v-if="loading" class="h-5 w-5 animate-spin mr-2" />
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ loading ? (showOtpVerification ? 'Verifying OTP...' : 'Sending OTP...') : (showOtpVerification ? 'Verify & Create Account' : 'Continue to Verification') }}
              </span>
              <div class="absolute top-0 right-full w-full h-full bg-white opacity-30 transform skew-x-12 transition-transform duration-700 ease-out group-hover:translate-x-full"></div>
            </button>
            <p class="mt-2 text-xs text-center text-gray-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secured with bank-level encryption and protection
            </p>
          </div>
            <!-- Error Messages -->
          <div v-if="error && !showOtpVerification" class="bg-red-50 p-4 rounded-md">
            <div class="flex">
              <div class="flex-shrink-0">
                <AlertTriangle class="h-5 w-5 text-red-400" />
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-700">
                  {{ error }}
                </p>
              </div>
            </div>
          </div>
          
          <!-- OTP Error Message -->
          <div v-if="otpError && showOtpVerification" class="bg-red-50 p-4 rounded-md">
            <div class="flex">
              <div class="flex-shrink-0">
                <AlertTriangle class="h-5 w-5 text-red-400" />
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-700">
                  {{ otpError }}
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '../stores/authStore';
import { Loader2, AlertTriangle, Eye, EyeOff } from 'lucide-vue-next';

const router = useRouter();
const route = useRoute();
const toast = useToast();
const authStore = useAuthStore();

const formData = reactive({
  name: '',
  email: '',
  password: '',
  address: '',
  phone: '',
  accountType: ''
});

// Get account type from query parameter
onMounted(() => {
  if (route.query.accountType) {
    formData.accountType = route.query.accountType;
  } else {
    // Default to savings account if not specified
    formData.accountType = 'savings';
  }
});

const loading = ref(false);
const error = ref('');
const showPassword = ref(false);
const acceptedTerms = ref(false);
const errors = reactive({
  name: '',
  email: '',
  password: '',
  address: '',
  phone: '',
  accountType: ''
});

const validateForm = () => {
  let isValid = true;
  
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key] = '';
  });
  
  // Name validation
  if (!formData.name) {
    errors.name = 'Full name is required';
    isValid = false;
  } else if (formData.name.length < 2) {
    errors.name = 'Name must be at least 2 characters long';
    isValid = false;
  }
  
  // Email validation
  if (!formData.email) {
    errors.email = 'Email is required';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
    isValid = false;
  }
  
  // Account type validation
  if (!formData.accountType) {
    formData.accountType = 'savings'; // Default to savings if not selected
  } else if (!['savings', 'current', 'fixed'].includes(formData.accountType)) {
    errors.accountType = 'Please select a valid account type';
    isValid = false;
  }
  
  // Password validation
  if (!formData.password) {
    errors.password = 'Password is required';
    isValid = false;
  } else if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters long';
    isValid = false;
  }
  
  // Address validation
  if (!formData.address) {
    errors.address = 'Address is required';
    isValid = false;
  } else if (formData.address.length < 5) {
    errors.address = 'Address must be at least 5 characters long';
    isValid = false;
  }
  
  // Phone validation
  if (!formData.phone) {
    errors.phone = 'Phone number is required';
    isValid = false;
  } else if (formData.phone.length < 10) {
    errors.phone = 'Phone number must be at least 10 digits';
    isValid = false;
  }
  
  return isValid;
};

// State for OTP verification
const showOtpVerification = ref(false);
const otp = ref('');
const otpError = ref('');
const registeredEmail = ref('');

const handleSubmit = async () => {
  if (!validateForm()) return;
  
  try {
    loading.value = true;
    error.value = '';
    
    if (!showOtpVerification.value) {
      // Step 1: Register and get OTP
      const response = await authStore.registerCustomer(formData);
      toast.success('OTP sent to your email.');
      showOtpVerification.value = true;
      registeredEmail.value = formData.email;
    } else {
      // Step 2: Verify OTP
      await authStore.verifyRegistrationOTP(registeredEmail.value, otp.value);
      toast.success('Registration successful! You are now logged in.');
      router.push('/customer/dashboard');
    }
  } catch (err) {
    console.error('Registration error:', err);
    if (showOtpVerification.value) {
      otpError.value = err.response?.data?.message || 'Failed to verify OTP. Please try again.';
      toast.error('OTP verification failed');
    } else {
      error.value = err.response?.data?.message || 'Registration failed. Please try again.';
      toast.error('Registration failed');
    }
  } finally {
    loading.value = false;
  }
};

const resendOtp = async () => {
  if (!registeredEmail.value) return;
  
  try {
    loading.value = true;
    otpError.value = '';
    
    await authStore.resendOTP(registeredEmail.value);
    toast.success('OTP resent to your email.');
  } catch (err) {
    console.error('Resend OTP error:', err);
    otpError.value = err.response?.data?.message || 'Failed to resend OTP. Please try again.';
    toast.error('OTP resend failed');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.bg-primary {
  background-color: #3b82f6;
}
.from-primary {
  --tw-gradient-from: #3b82f6;
}
.from-primary-light {
  --tw-gradient-from: #60a5fa;
}
.to-indigo-600 {
  --tw-gradient-to: #4f46e5;
}
.text-primary {
  color: #3b82f6;
}
.focus\:ring-primary:focus {
  --tw-ring-color: #3b82f6;
}
.focus\:border-primary:focus {
  border-color: #3b82f6;
}
.hover\:text-primary-dark:hover {
  color: #2563eb;
}
.full-width-bg {
  position: fixed;
  top: 0; /* Start from the very top */
  left: 0;
  width: 100%;
  min-width: 100%;
  max-width: 100vw;
  height: 100vh;
  margin: 0;
  padding-left: 0;
  padding-right: 0;
  overflow-x: hidden;
  z-index: 0; /* Lower z-index to stay below content */
}

/* Animations and transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.9;
  }
}

@keyframes slideRight {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

input:focus, textarea:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
  transition: all 0.2s ease;
}

/* Custom Banking Styling */
input::placeholder, textarea::placeholder {
  color: #94a3b8;
}

input, textarea {
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

input:focus, textarea:focus {
  transform: translateY(-1px);
}

button {
  position: relative;
  overflow: hidden;
}

button::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.7s ease;
}

button:hover::after {
  left: 100%;
}

/* Media queries for better navbar spacing */
@media (max-width: 640px) {
  .navbar-spacing {
    padding-top: 100px; /* More padding on mobile devices */
  }
}

/* Form container specific styling */
.form-container {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

/* Ensure proper spacing below the navbar */
.navbar-spacing {
  padding-top: 80px; /* Fixed space to ensure content is below navbar */
  position: relative;
}

/* Adjust the main container */
.min-h-screen {
  margin-top: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

/* Animations */
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.animate-fadeIn {
  animation: fadeIn 0.6s ease-in-out;
}

@keyframes slideInUp {
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

.animate-slideInUp {
  animation: slideInUp 0.5s ease-out;
}
</style>
