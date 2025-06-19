<!-- filepath: c:\Users\Shamim shaikh\Desktop\Assignment\project\frontend\src\pages\products\FixedDeposits.vue -->
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
            Fixed Deposits
          </h1>
          <p class="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Secure, guaranteed returns for your long-term savings
          </p>
        </div>
      </div>
    </div>
    
    <!-- Benefits Section -->
    <div class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div>
            <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose Our Fixed Deposits?
            </h2>
            <p class="mt-4 text-lg text-gray-500">
              Our fixed deposits offer some of the highest interest rates in the market, with 
              flexible tenure options and special benefits for senior citizens. With Modern Bank's 
              fixed deposits, your money isn't just safe – it's growing faster.
            </p>
            
            <div class="mt-8 space-y-4">
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p class="ml-3 text-base text-gray-700">Higher interest rates than traditional banks</p>
              </div>
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p class="ml-3 text-base text-gray-700">Flexible tenure options from 7 days to 10 years</p>
              </div>
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p class="ml-3 text-base text-gray-700">Additional 0.50% interest for senior citizens</p>
              </div>
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p class="ml-3 text-base text-gray-700">Loan facility available against your FD</p>
              </div>
            </div>
          </div>
          
          <div class="mt-10 lg:mt-0">
            <img 
              src="https://images.unsplash.com/photo-1579621970590-9d624316781b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
              alt="Fixed Deposit Benefits" 
              class="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
    
    <!-- Interest Rate Calculator -->
    <div class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Fixed Deposit Interest Rates
          </h2>
          <p class="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            Check our competitive interest rates based on deposit amount and tenure
          </p>
        </div>
        
        <div class="mt-12">
          <table class="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tenure
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Regular Rate
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Senior Citizen Rate
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  7 - 45 days
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  4.50% p.a.
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  5.00% p.a.
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  46 - 179 days
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  5.25% p.a.
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  5.75% p.a.
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  180 - 364 days
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  6.00% p.a.
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  6.50% p.a.
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  1 - 2 years
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  6.75% p.a.
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  7.25% p.a.
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  2 - 5 years
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  7.25% p.a.
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  7.75% p.a.
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  5 - 10 years
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  7.50% p.a.
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  8.00% p.a.
                </td>
              </tr>
            </tbody>
          </table>
          
          <div class="mt-8 text-center text-sm text-gray-500">
            <p>Rates effective as of June 1, 2023. Subject to change without prior notice.</p>
          </div>
        </div>
        
        <!-- Calculator Preview -->
        <div class="mt-12 bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Fixed Deposit Calculator</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">Amount (₹)</label>
              <div class="mt-1">
                <input 
                  type="number" 
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter amount"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Tenure</label>
              <div class="mt-1 flex">
                <input 
                  type="number" 
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-l-md"
                  placeholder="Enter tenure"
                />
                <select class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-40 sm:text-sm border-gray-300 border-l-0 rounded-r-md">
                  <option>Days</option>
                  <option>Months</option>
                  <option>Years</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Rate of Interest</label>
              <div class="mt-1">
                <select class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                  <option>Regular User</option>
                  <option>Senior Citizen</option>
                </select>
              </div>
            </div>
            <div class="flex items-end">
              <button class="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Calculate
              </button>
            </div>
          </div>
          
          <div class="mt-6 p-4 border border-gray-200 rounded-md bg-white">
            <div class="text-lg font-medium text-gray-900">
              Estimated Returns: <span class="text-indigo-600">₹0</span>
            </div>
            <div class="mt-2 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="block text-gray-500">Principal Amount</span>
                <span class="font-medium">₹0</span>
              </div>
              <div>
                <span class="block text-gray-500">Interest Earned</span>
                <span class="font-medium">₹0</span>
              </div>
              <div>
                <span class="block text-gray-500">Maturity Amount</span>
                <span class="font-medium">₹0</span>
              </div>
              <div>
                <span class="block text-gray-500">Maturity Date</span>
                <span class="font-medium">-</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Types of FDs -->
    <div class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Types of Fixed Deposits
          </h2>
          <p class="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            Choose the right fixed deposit type based on your needs
          </p>
        </div>
        
        <div class="mt-12 grid gap-8 md:grid-cols-3">
          <!-- Standard FD -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="h-12 w-12 bg-indigo-100 rounded-md flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900">Standard Fixed Deposit</h3>
            <p class="mt-3 text-gray-600">
              Our regular fixed deposit with competitive interest rates. Interest is 
              compounded quarterly and paid at maturity.
            </p>
            <div class="mt-4">
              <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Min. deposit: ₹1,000
              </span>
            </div>
          </div>
          
          <!-- Tax Saver FD -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="h-12 w-12 bg-indigo-100 rounded-md flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900">Tax Saver FD</h3>
            <p class="mt-3 text-gray-600">
              Get tax benefits under Section 80C of Income Tax Act with a lock-in period 
              of 5 years. Investment up to ₹1.5 lakhs can be deducted.
            </p>
            <div class="mt-4">
              <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                Lock-in: 5 years
              </span>
            </div>
          </div>
          
          <!-- Recurring Deposit -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="h-12 w-12 bg-indigo-100 rounded-md flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900">Recurring Deposit</h3>
            <p class="mt-3 text-gray-600">
              Deposit a fixed amount monthly and earn FD-like returns. Ideal for regular 
              savers looking to build a corpus over time.
            </p>
            <div class="mt-4">
              <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                Monthly commitment
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Apply CTA -->
    <div class="py-16 bg-gradient-to-r from-indigo-600 to-blue-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
          Ready to secure your financial future?
        </h2>
        <p class="mt-4 text-xl text-indigo-100">
          Open a Fixed Deposit with Modern Bank today and start earning higher returns
        </p>
        <div class="mt-8 flex justify-center">
          <a href="#" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
            Open Fixed Deposit
          </a>
          <a href="#" class="ml-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-900 bg-opacity-60 hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
            Contact Us
          </a>
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
