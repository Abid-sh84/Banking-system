<!-- filepath: c:\Users\Shamim shaikh\Desktop\Assignment\project\frontend\src\pages\Contact.vue -->
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
            Contact Us
          </h1>
          <p class="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            We're here to help with all your banking needs
          </p>
        </div>
      </div>
    </div>
    
    <!-- Contact Details Section -->
    <div class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            <form class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700">Subject</label>
                <select 
                  id="subject" 
                  name="subject" 
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Please select</option>
                  <option value="account">Account Inquiry</option>
                  <option value="loan">Loan Information</option>
                  <option value="card">Credit Card Support</option>
                  <option value="complaint">File a Complaint</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="4" 
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              
              <div>
                <button 
                  type="submit" 
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
          
          <!-- Contact Info -->
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            
            <!-- Customer Support -->
            <div class="mb-8">
              <h3 class="text-lg font-semibold text-indigo-600 mb-2">Customer Support</h3>
              <div class="space-y-3">
                <div class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div class="ml-3 text-gray-700">
                    <p>1800-123-4567 (Toll Free)</p>
                    <p class="text-sm text-gray-500">Mon-Sat: 8AM - 8PM</p>
                  </div>
                </div>
                
                <div class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div class="ml-3 text-gray-700">
                    <p>support@modernbank.com</p>
                    <p class="text-sm text-gray-500">24/7 Email Support</p>
                  </div>
                </div>
                
                <div class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div class="ml-3 text-gray-700">
                    <p>Live Chat</p>
                    <p class="text-sm text-gray-500">Available on our website & app</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Headquarters -->
            <div class="mb-8">
              <h3 class="text-lg font-semibold text-indigo-600 mb-2">Headquarters</h3>
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div class="ml-3 text-gray-700">
                  <p>Modern Bank Tower</p>
                  <p>123 Financial Street, Bandra Kurla Complex</p>
                  <p>Mumbai, Maharashtra 400051</p>
                  <p>India</p>
                </div>
              </div>
            </div>
            
            <!-- Social Media -->
            <div>
              <h3 class="text-lg font-semibold text-indigo-600 mb-2">Follow Us</h3>
              <div class="flex space-x-4">
                <a href="#" class="text-gray-400 hover:text-gray-500">
                  <span class="sr-only">Facebook</span>
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
                  </svg>
                </a>
                
                <a href="#" class="text-gray-400 hover:text-gray-500">
                  <span class="sr-only">Instagram</span>
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
                  </svg>
                </a>
                
                <a href="#" class="text-gray-400 hover:text-gray-500">
                  <span class="sr-only">Twitter</span>
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                
                <a href="#" class="text-gray-400 hover:text-gray-500">
                  <span class="sr-only">LinkedIn</span>
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Branch Locations Map -->
    <div class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Branch Locations
          </h2>
          <p class="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            Find a Modern Bank branch near you
          </p>
        </div>
        
        <div class="mt-12">
          <div class="bg-gray-200 rounded-lg h-96 w-full overflow-hidden shadow-md">
            <!-- This is a placeholder for a map. In a real implementation, you would integrate 
                 with Google Maps or a similar service -->
            <div class="h-full w-full flex items-center justify-center">
              <p class="text-gray-600 text-lg">Interactive Branch Map</p>
            </div>
          </div>
          
          <div class="mt-8 text-center">
            <button class="px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Find Nearest Branch
            </button>
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
