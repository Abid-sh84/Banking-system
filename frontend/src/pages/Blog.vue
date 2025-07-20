<!-- filepath: c:\Users\Shamim shaikh\Desktop\Assignment\project\frontend\src\pages\Blog.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
   
    <!-- Hero Section -->
    <div class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Modern Bank Blog
          </h1>
          <p class="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Financial insights and banking tips for the modern Indian
          </p>
        </div>
      </div>
    </div>
    
    <!-- Featured Article Section -->
    <div class="py-12 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-extrabold text-gray-900 mb-8">Featured Article</h2>
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <div class="lg:flex">
            <div class="lg:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Featured article" 
                class="w-full h-64 lg:h-full object-cover object-center"
              />
            </div>
            <div class="p-8 lg:w-1/2">
              <div class="flex items-center mb-4">
                <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Finance</span>
                <span class="text-gray-500 text-sm ml-4">June 2, 2023</span>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">
                Digital Banking Revolution: How Technology is Changing India's Financial Landscape
              </h3>
              <p class="text-gray-600 mb-6">
                With the rapid adoption of smartphones and increasing internet penetration, 
                India is witnessing a digital banking revolution. From UPI to neobanks, 
                discover how technology is transforming how Indians manage their money and what 
                this means for traditional banking institutions.
              </p>
              <a 
                href="#" 
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Read Article
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Latest Articles Section -->
    <div class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-3xl font-extrabold text-gray-900">Latest Articles</h2>
          <div class="flex space-x-2">
            <button class="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              All
            </button>
            <button class="px-3 py-2 border border-transparent rounded-md text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Savings
            </button>
            <button class="px-3 py-2 border border-transparent rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Investments
            </button>
            <button class="px-3 py-2 border border-transparent rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Loans
            </button>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Article 1 -->
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
              alt="Savings Article" 
              class="w-full h-48 object-cover"
            />
            <div class="p-6">
              <div class="flex items-center mb-3">
                <span class="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">Savings</span>
                <span class="text-gray-500 text-sm ml-4">May 28, 2023</span>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">
                5 Smart Savings Strategies for Young Professionals
              </h3>
              <p class="text-gray-600 mb-4">
                Starting early with savings can set you up for financial success. 
                Learn practical strategies tailored for young professionals in India.
              </p>
              <a href="#" class="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center">
                Read More
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
          
          <!-- Article 2 -->
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1607863680198-23d4b2565df0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
              alt="Investment Article" 
              class="w-full h-48 object-cover"
            />
            <div class="p-6">
              <div class="flex items-center mb-3">
                <span class="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">Investments</span>
                <span class="text-gray-500 text-sm ml-4">May 20, 2023</span>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">
                Understanding Mutual Funds: A Beginner's Guide
              </h3>
              <p class="text-gray-600 mb-4">
                Mutual funds can be an excellent entry point into investing. 
                This guide breaks down the basics in simple, easy-to-understand terms.
              </p>
              <a href="#" class="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center">
                Read More
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
          
          <!-- Article 3 -->
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1571867424488-4565932edb41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" 
              alt="Home Loan Article" 
              class="w-full h-48 object-cover"
            />
            <div class="p-6">
              <div class="flex items-center mb-3">
                <span class="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">Loans</span>
                <span class="text-gray-500 text-sm ml-4">May 15, 2023</span>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">
                Home Loan Interest Rates: What to Expect in 2023
              </h3>
              <p class="text-gray-600 mb-4">
                Planning to buy a home? Learn about the current trends in home loan 
                interest rates and expert predictions for the coming months.
              </p>
              <a href="#" class="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center">
                Read More
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div class="mt-12 text-center">
          <button class="px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Load More Articles
          </button>
        </div>
      </div>
    </div>
    
    <!-- Newsletter Section -->
    <div class="py-12 bg-gradient-to-r from-indigo-600 to-blue-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
            Stay Updated with Financial Insights
          </h2>
          <p class="mt-4 text-xl text-indigo-100">
            Subscribe to our newsletter for the latest articles and financial tips
          </p>
        </div>
        <div class="mt-8 sm:flex justify-center">
          <div class="sm:flex-1 max-w-lg mx-auto">
            <div class="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                class="min-w-0 flex-1 px-4 py-3 rounded-l-md border-0 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:text-sm"
              />
              <button class="flex-shrink-0 px-6 py-3 border border-transparent rounded-r-md font-medium text-white bg-indigo-900 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:text-sm">
                Subscribe
              </button>
            </div>
            <p class="mt-3 text-sm text-indigo-100">
              We respect your privacy. Unsubscribe anytime.
            </p>
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
