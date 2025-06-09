<!-- filepath: c:\Users\Shamim shaikh\Desktop\Assignment\project\frontend\src\pages\products\Loans.vue -->
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
            Loan Products
          </h1>
          <p class="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Flexible financing solutions with competitive rates for all your needs
          </p>
        </div>
      </div>
    </div>
    
    <!-- Loan Types Section -->
    <div class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Loan Offerings
          </h2>
          <p class="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
            Choose from our wide range of loan products designed to meet your specific needs,
            with attractive interest rates and flexible repayment options.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Home Loan Card -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div class="h-48 bg-gradient-to-r from-blue-600 to-indigo-800 relative">
              <div class="absolute inset-0 opacity-20">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
                  alt="Home Loan"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="absolute bottom-0 left-0 right-0 p-6">
                <h3 class="text-2xl font-bold text-white">Home Loans</h3>
                <p class="text-blue-100">Starting from 8.5% p.a.</p>
              </div>
            </div>
            <div class="p-6">
              <ul class="space-y-3 mb-6">
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-700">Loan amounts up to ₹5 crore</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-700">Tenure up to 30 years</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-700">No prepayment charges</span>
                </li>
              </ul>
              <button class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Apply Now
              </button>
            </div>
          </div>

          <!-- Personal Loan Card -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div class="h-48 bg-gradient-to-r from-emerald-600 to-teal-700 relative">
              <div class="absolute inset-0 opacity-20">
                <img
                  src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
                  alt="Personal Loan"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="absolute bottom-0 left-0 right-0 p-6">
                <h3 class="text-2xl font-bold text-white">Personal Loans</h3>
                <p class="text-emerald-100">Starting from 10.5% p.a.</p>
              </div>
            </div>
            <div class="p-6">
              <ul class="space-y-3 mb-6">
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-700">Loan amounts up to ₹25 lakhs</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-700">Approval within 24 hours</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-700">Minimal documentation</span>
                </li>
              </ul>
              <button class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                Apply Now
              </button>
            </div>
          </div>

          <!-- Business Loan Card -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div class="h-48 bg-gradient-to-r from-amber-600 to-orange-700 relative">
              <div class="absolute inset-0 opacity-20">
                <img
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                  alt="Business Loan"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="absolute bottom-0 left-0 right-0 p-6">
                <h3 class="text-2xl font-bold text-white">Business Loans</h3>
                <p class="text-amber-100">Starting from 11.0% p.a.</p>
              </div>
            </div>
            <div class="p-6">
              <ul class="space-y-3 mb-6">
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-700">Loan amounts up to ₹2 crore</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-700">Flexible collateral options</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-700">Customized repayment options</span>
                </li>
              </ul>
              <button class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Loan Calculator Section -->
    <div class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:grid lg:grid-cols-12 lg:gap-8">
          <div class="lg:col-span-5">
            <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Loan Calculator
            </h2>
            <p class="mt-4 text-lg text-gray-500">
              Calculate your monthly EMI, total interest payable, and total payment amount with our easy-to-use loan calculator.
            </p>
            <div class="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div class="space-y-4">
                <div>
                  <label for="loan-amount" class="block text-sm font-medium text-gray-700">Loan Amount (₹)</label>
                  <div class="mt-1">
                    <input type="number" name="loan-amount" id="loan-amount" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="1000000">
                  </div>
                </div>
                
                <div>
                  <label for="interest-rate" class="block text-sm font-medium text-gray-700">Interest Rate (% p.a.)</label>
                  <div class="mt-1">
                    <input type="number" step="0.1" name="interest-rate" id="interest-rate" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="10.5">
                  </div>
                </div>
                
                <div>
                  <label for="loan-tenure" class="block text-sm font-medium text-gray-700">Loan Tenure (Years)</label>
                  <div class="mt-1">
                    <input type="number" name="loan-tenure" id="loan-tenure" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="5">
                  </div>
                </div>
                
                <button class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Calculate EMI
                </button>
              </div>
            </div>
          </div>
          
          <div class="mt-10 lg:mt-0 lg:col-span-7">
            <div class="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Loan Repayment Summary</h3>
              <div class="bg-gray-50 rounded-lg p-6 mb-6">
                <div class="grid grid-cols-3 gap-4">
                  <div class="text-center">
                    <p class="text-sm text-gray-500">Monthly EMI</p>
                    <p class="text-xl font-bold text-indigo-600">₹21,247</p>
                  </div>
                  <div class="text-center">
                    <p class="text-sm text-gray-500">Total Interest</p>
                    <p class="text-xl font-bold text-indigo-600">₹2,74,840</p>
                  </div>
                  <div class="text-center">
                    <p class="text-sm text-gray-500">Total Payment</p>
                    <p class="text-xl font-bold text-indigo-600">₹12,74,840</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 class="text-lg font-medium text-gray-900 mb-3">Amortization Schedule</h4>
                <div class="bg-gray-50 rounded-lg overflow-hidden">
                  <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-indigo-50">
                        <tr>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Principal (₹)</th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest (₹)</th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance (₹)</th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹1,78,058</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹77,006</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹8,21,942</td>
                        </tr>
                        <tr>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹1,98,030</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹57,034</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹6,23,912</td>
                        </tr>
                        <tr>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹2,20,245</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹34,819</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹4,03,667</td>
                        </tr>
                        <tr>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">4</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹2,44,992</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹10,072</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹1,58,675</td>
                        </tr>
                        <tr>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹1,58,675</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹5,909</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹0</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- FAQ Section -->
    <div class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>
        
        <div class="max-w-3xl mx-auto divide-y-2 divide-gray-200">
          <div class="py-6">
            <h3 class="text-lg font-medium text-gray-900">What documents do I need to apply for a loan?</h3>
            <p class="mt-2 text-base text-gray-500">For most loans, you'll need identity proof (Aadhaar, PAN card), address proof, income proof (salary slips or IT returns), and bank statements for the last 6 months. Additional documents may be required based on the loan type.</p>
          </div>
          
          <div class="py-6">
            <h3 class="text-lg font-medium text-gray-900">How long does the loan approval process take?</h3>
            <p class="mt-2 text-base text-gray-500">Our loan approval process typically takes 1-3 business days for personal loans, and 3-7 business days for home loans and business loans, subject to all required documentation being submitted.</p>
          </div>
          
          <div class="py-6">
            <h3 class="text-lg font-medium text-gray-900">Can I prepay my loan before the tenure ends?</h3>
            <p class="mt-2 text-base text-gray-500">Yes, you can prepay your loan before the tenure ends. We offer flexible prepayment options with minimal or no prepayment charges, depending on the loan type and tenure completed.</p>
          </div>
          
          <div class="py-6">
            <h3 class="text-lg font-medium text-gray-900">How is my loan eligibility determined?</h3>
            <p class="mt-2 text-base text-gray-500">Loan eligibility is determined based on factors such as your income, existing financial commitments, credit score, employment stability, age, and the loan amount requested.</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <footer class="bg-gray-900 text-white">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <!-- Company Info -->
          <div>
            <h3 class="text-lg font-semibold mb-4">About Us</h3>
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

        <!-- Copyright -->
        <div class="mt-8 pt-8 border-t border-gray-800 text-center">
          <p class="text-gray-500 text-sm">
            © 2023 Modern Bank India. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// No specific script functionality needed for this page
</script>

<style scoped>
/* Any specific styles for this page */
</style>
