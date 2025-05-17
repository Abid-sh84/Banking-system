<!-- filepath: c:\Users\Shamim shaikh\Desktop\Assignment\project\frontend\src\pages\Home.vue -->
<template>
  <div class="bg-white overflow-hidden">
    <!-- Hero section with improved responsive design -->
    <div class="relative">
      <div class="max-w-7xl mx-auto">
        <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div class="sm:text-center lg:text-left">
              <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span class="block xl:inline">Modern Banking for</span>
                <span class="block text-primary xl:inline animate-fadeIn"> Modern People</span>
              </h1>
              <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Experience the future of banking with our digital platform. Manage your finances, make transactions, and track your spending - all in one place.
              </p>
              <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div class="rounded-md shadow">
                  <router-link
                    to="/customer/login"
                    class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-light md:py-4 md:text-lg md:px-10 transform transition duration-300 hover:scale-105"
                  >
                    Customer Login
                  </router-link>
                </div>
                <div class="mt-3 sm:mt-0 sm:ml-3">
                  <router-link
                    to="/customer/register"
                    class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10 transform transition duration-300 hover:scale-105"
                  >
                    Create Account
                  </router-link>
                </div>
                <div class="mt-3 sm:mt-0 sm:ml-3">
                  <router-link
                    to="/banker/login"
                    class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-primary-50 hover:bg-primary-100 md:py-4 md:text-lg md:px-10 transform transition duration-300 hover:scale-105"
                  >
                    Banker Login
                  </router-link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full shadow-xl transform transition-transform duration-500 hover:scale-105"
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
          alt="Digital banking on mobile device"
        />
      </div>
    </div>

    <!-- Features section with animations and improved cards -->
    <div class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A better way to bank
          </p>
          <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our modern banking system provides all the tools you need to manage your finances effectively.
          </p>
        </div>

        <div class="mt-10">
          <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-x-6 md:gap-y-10">
            <div class="relative bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <dt>
                <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white transform transition duration-300 hover:scale-110">
                  <CreditCard class="h-6 w-6" />
                </div>
                <p class="ml-16 text-lg leading-6 font-medium text-gray-900">Secure Transactions</p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-500">
                All your transactions are encrypted and secure. We use the latest security measures to protect your data.
              </dd>
            </div>

            <div class="relative bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <dt>
                <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white transform transition duration-300 hover:scale-110">
                  <BarChart3 class="h-6 w-6" />
                </div>
                <p class="ml-16 text-lg leading-6 font-medium text-gray-900">Financial Analytics</p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-500">
                Track your spending patterns and get insights into your financial habits with our powerful analytics tools.
              </dd>
            </div>

            <div class="relative bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <dt>
                <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white transform transition duration-300 hover:scale-110">
                  <Clock class="h-6 w-6" />
                </div>
                <p class="ml-16 text-lg leading-6 font-medium text-gray-900">24/7 Banking</p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-500">
                Access your account anytime, anywhere. Our platform is available 24/7 to serve all your banking needs.
              </dd>
            </div>

            <div class="relative bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <dt>
                <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white transform transition duration-300 hover:scale-110">
                  <HeartHandshake class="h-6 w-6" />
                </div>
                <p class="ml-16 text-lg leading-6 font-medium text-gray-900">Personalized Support</p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-500">
                Get personalized assistance from our team of expert bankers who are ready to help you with all your financial needs.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <!-- Testimonial section -->
    <div class="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="lg:grid lg:grid-cols-2 lg:gap-8">
          <div>
            <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What our customers say
            </h2>
            <div class="mt-6 max-w-prose text-xl text-gray-500">
              <p>Join thousands of satisfied customers who have already made the switch to Modern Bank. Experience banking reimagined for the digital age.</p>
            </div>
          </div>
          <div class="mt-12 lg:mt-0">
            <div class="space-y-8">
              <div class="bg-white rounded-lg shadow-lg overflow-hidden p-6 transform transition-transform duration-300 hover:scale-105">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span class="text-indigo-800 font-semibold">JD</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium text-gray-900">
                      Jane Doe
                    </h3>
                    <p class="text-sm text-gray-500">
                      Small Business Owner
                    </p>
                  </div>
                </div>
                <p class="mt-4 text-gray-600 italic">
                  "Modern Bank has transformed how I manage my business finances. The mobile app is intuitive, and the customer service is exceptional."
                </p>
              </div>

              <div class="bg-white rounded-lg shadow-lg overflow-hidden p-6 transform transition-transform duration-300 hover:scale-105">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <span class="text-green-800 font-semibold">JS</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium text-gray-900">
                      John Smith
                    </h3>
                    <p class="text-sm text-gray-500">
                      Young Professional
                    </p>
                  </div>
                </div>
                <p class="mt-4 text-gray-600 italic">
                  "The financial analytics tools have helped me save more efficiently than ever before. I love how Modern Bank makes money management so simple."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-primary">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          <span class="block">Ready to get started?</span>
          <span class="block text-accent-light">Open an account today.</span>
        </h2>
        <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div class="inline-flex rounded-md shadow">
            <router-link
              to="/customer/register"
              class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 transform transition duration-300 hover:scale-105"
            >
              Create Account
            </router-link>
          </div>
          <div class="ml-3 inline-flex rounded-md shadow">
            <router-link
              to="/customer/login"
              class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-light hover:bg-blue-700 transform transition duration-300 hover:scale-105"
            >
              Sign In
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CreditCard, BarChart3, Clock, HeartHandshake } from 'lucide-vue-next';
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fadeIn {
  animation: fadeIn 2s ease-in;
}
</style>
