<!-- filepath: c:\Users\Shamim shaikh\Desktop\Assignment\project\frontend\src\pages\products\CreditCards.vue -->
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
    </header> -->
    
    <!-- Hero Section -->
    <div class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Credit Cards
          </h1>
          <p class="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Unlock a world of benefits, rewards, and privileges with our premium credit cards
          </p>
        </div>
      </div>
    </div>
    
    <!-- Card Comparison Section -->
    <div class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Find Your Perfect Card
          </h2>
          <p class="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
            Compare our range of credit cards designed to match your lifestyle and financial needs.
            From travel benefits to cashback rewards, we have the right card for you.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Platinum Card -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div class="h-64 bg-gradient-to-r from-gray-800 to-gray-900 relative flex items-center justify-center p-6">
              <div class="absolute inset-0 opacity-20">
                <img
                  src="https://images.unsplash.com/photo-1542222378-a7d23c38e956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                  alt="Platinum Card"
                  class="w-full h-full object-cover"
                />
              </div>
              
              <!-- Card Design -->
              <div class="relative w-full max-w-xs h-48 bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl shadow-2xl p-6 transform rotate-6 hover:rotate-0 transition-transform duration-500">
                <div class="absolute top-0 left-0 w-full h-full opacity-20 rounded-xl overflow-hidden">
                  <div class="w-full h-full bg-white opacity-20" style="background-image: radial-gradient(circle at 50% 0%, rgba(255,255,255,0.3) 0%, rgba(0,0,0,0) 75%)"></div>
                </div>
                
                <div class="flex justify-between items-center mb-8">
                  <div class="text-white text-xs font-medium">Modern Bank</div>
                  <div class="text-white text-xs font-medium">PLATINUM</div>
                </div>
                
                <div class="w-12 h-8 mb-6">
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="24" fill="#CAA21E"/>
                    <circle cx="24" cy="24" r="22" fill="none" stroke="#E5E5E5" stroke-width="0.5"/>
                  </svg>
                </div>
                
                <div class="font-mono text-white text-lg tracking-wider mb-4">**** **** **** 7890</div>
                
                <div class="flex justify-between items-end">
                  <div>
                    <div class="text-gray-300 text-xs mb-1">Card Holder</div>
                    <div class="text-white text-sm">VIKRAM MEHTA</div>
                  </div>
                  <div>
                    <div class="text-gray-300 text-xs mb-1">Expires</div>
                    <div class="text-white text-sm">09/28</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Platinum Card</h3>
              <p class="text-gray-600 mb-4">Premium card with exclusive benefits and rewards.</p>
              
              <div class="mb-6 flex justify-between">
                <div>
                  <div class="text-sm text-gray-500">Annual Fee</div>
                  <div class="text-gray-900 font-medium">₹3,000</div>
                </div>
                <div>
                  <div class="text-sm text-gray-500">Interest Rate</div>
                  <div class="text-gray-900 font-medium">2.5% PM</div>
                </div>
                <div>
                  <div class="text-sm text-gray-500">Rewards</div>
                  <div class="text-gray-900 font-medium">5X Points</div>
                </div>
              </div>
              
              <h4 class="text-lg font-semibold text-gray-900 mb-2">Key Benefits</h4>
              <ul class="space-y-2 mb-6">
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-700">5X reward points on dining and travel</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-700">Complimentary airport lounge access</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-700">Golf privileges at top courses</span>
                </li>
              </ul>
              
              <button class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                Apply Now
              </button>
            </div>
          </div>

          <!-- Rewards Card -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div class="h-64 bg-gradient-to-r from-blue-700 to-indigo-800 relative flex items-center justify-center p-6">
              <div class="absolute inset-0 opacity-20">
                <img
                  src="https://images.unsplash.com/photo-1642050923713-c47f7e487e75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="Rewards Card"
                  class="w-full h-full object-cover"
                />
              </div>
              
              <!-- Card Design -->
              <div class="relative w-full max-w-xs h-48 bg-gradient-to-r from-blue-700 to-indigo-800 rounded-xl shadow-2xl p-6 transform rotate-6 hover:rotate-0 transition-transform duration-500">
                <div class="absolute top-0 left-0 w-full h-full opacity-20 rounded-xl overflow-hidden">
                  <div class="w-full h-full bg-white opacity-20" style="background-image: radial-gradient(circle at 50% 0%, rgba(255,255,255,0.3) 0%, rgba(0,0,0,0) 75%)"></div>
                </div>
                
                <div class="flex justify-between items-center mb-8">
                  <div class="text-white text-xs font-medium">Modern Bank</div>
                  <div class="text-white text-xs font-medium">REWARDS</div>
                </div>
                
                <div class="w-12 h-8 mb-6">
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="24" fill="#3949AB"/>
                    <circle cx="24" cy="24" r="22" fill="none" stroke="#E5E5E5" stroke-width="0.5"/>
                  </svg>
                </div>
                
                <div class="font-mono text-white text-lg tracking-wider mb-4">**** **** **** 4567</div>
                
                <div class="flex justify-between items-end">
                  <div>
                    <div class="text-gray-300 text-xs mb-1">Card Holder</div>
                    <div class="text-white text-sm">PRIYA SHARMA</div>
                  </div>
                  <div>
                    <div class="text-gray-300 text-xs mb-1">Expires</div>
                    <div class="text-white text-sm">11/26</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Rewards Card</h3>
              <p class="text-gray-600 mb-4">Earn rewards on everyday spending.</p>
              
              <div class="mb-6 flex justify-between">
                <div>
                  <div class="text-sm text-gray-500">Annual Fee</div>
                  <div class="text-gray-900 font-medium">₹1,000</div>
                </div>
                <div>
                  <div class="text-sm text-gray-500">Interest Rate</div>
                  <div class="text-gray-900 font-medium">3.0% PM</div>
                </div>
                <div>
                  <div class="text-sm text-gray-500">Cashback</div>
                  <div class="text-gray-900 font-medium">Up to 5%</div>
                </div>
              </div>
              
              <h4 class="text-lg font-semibold text-gray-900 mb-2">Key Benefits</h4>
              <ul class="space-y-2 mb-6">
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-700">5% cashback on groceries and utility bills</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-700">2% cashback on all other purchases</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-700">Movie ticket buy-one-get-one offers</span>
                </li>
              </ul>
              
              <button class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Apply Now
              </button>
            </div>
          </div>

          <!-- Travel Card -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div class="h-64 bg-gradient-to-r from-emerald-600 to-teal-700 relative flex items-center justify-center p-6">
              <div class="absolute inset-0 opacity-20">
                <img
                  src="https://images.unsplash.com/photo-1542296332-2e4473faf563?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="Travel Card"
                  class="w-full h-full object-cover"
                />
              </div>
              
              <!-- Card Design -->
              <div class="relative w-full max-w-xs h-48 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-xl shadow-2xl p-6 transform rotate-6 hover:rotate-0 transition-transform duration-500">
                <div class="absolute top-0 left-0 w-full h-full opacity-20 rounded-xl overflow-hidden">
                  <div class="w-full h-full bg-white opacity-20" style="background-image: radial-gradient(circle at 50% 0%, rgba(255,255,255,0.3) 0%, rgba(0,0,0,0) 75%)"></div>
                </div>
                
                <div class="flex justify-between items-center mb-8">
                  <div class="text-white text-xs font-medium">Modern Bank</div>
                  <div class="text-white text-xs font-medium">TRAVEL</div>
                </div>
                
                <div class="w-12 h-8 mb-6">
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="24" fill="#10B981"/>
                    <circle cx="24" cy="24" r="22" fill="none" stroke="#E5E5E5" stroke-width="0.5"/>
                  </svg>
                </div>
                
                <div class="font-mono text-white text-lg tracking-wider mb-4">**** **** **** 2345</div>
                
                <div class="flex justify-between items-end">
                  <div>
                    <div class="text-gray-300 text-xs mb-1">Card Holder</div>
                    <div class="text-white text-sm">RAHUL PATEL</div>
                  </div>
                  <div>
                    <div class="text-gray-300 text-xs mb-1">Expires</div>
                    <div class="text-white text-sm">04/27</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Travel Card</h3>
              <p class="text-gray-600 mb-4">Maximize your travel experiences and rewards.</p>
              
              <div class="mb-6 flex justify-between">
                <div>
                  <div class="text-sm text-gray-500">Annual Fee</div>
                  <div class="text-gray-900 font-medium">₹2,500</div>
                </div>
                <div>
                  <div class="text-sm text-gray-500">Interest Rate</div>
                  <div class="text-gray-900 font-medium">2.75% PM</div>
                </div>
                <div>
                  <div class="text-sm text-gray-500">Travel Points</div>
                  <div class="text-gray-900 font-medium">10X Points</div>
                </div>
              </div>
              
              <h4 class="text-lg font-semibold text-gray-900 mb-2">Key Benefits</h4>
              <ul class="space-y-2 mb-6">
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-700">10X reward points on flight bookings</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-700">Complimentary travel insurance</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-700">No foreign transaction fees</span>
                </li>
              </ul>
              
              <button class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Features Section -->
    <div class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Credit Card Features
          </h2>
          <p class="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
            Our credit cards come with a variety of features designed to enhance your financial experience.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Cashback Rewards</h3>
            <p class="text-gray-500">Earn cashback on your everyday purchases, with higher rates for specific categories like dining, groceries, and fuel.</p>
          </div>

          <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Security Features</h3>
            <p class="text-gray-500">Advanced security with EMV chip technology, real-time fraud monitoring, and instant transaction alerts to your mobile.</p>
          </div>

          <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Contactless Payments</h3>
            <p class="text-gray-500">Make quick and secure payments using tap-to-pay technology at millions of merchants worldwide.</p>
          </div>

          <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Exclusive Benefits</h3>
            <p class="text-gray-500">Access to exclusive dining offers, movie tickets, and shopping deals available only to our cardholders.</p>
          </div>

          <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Global Acceptance</h3>
            <p class="text-gray-500">Enjoy worldwide acceptance at millions of merchants and ATMs globally, with competitive foreign exchange rates.</p>
          </div>

          <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Digital Experience</h3>
            <p class="text-gray-500">Full control over your card with our digital banking app, allowing you to track expenses, set spending limits, and block/unblock your card.</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Application Process Section -->
    <div class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How to Apply
          </h2>
          <p class="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
            Our quick and easy application process gets you approved in minutes.
          </p>
        </div>
        
        <div class="max-w-4xl mx-auto">
          <div class="relative">
            <!-- Timeline Line -->
            <div class="absolute top-0 left-1/2 h-full w-px bg-gray-300 transform -translate-x-1/2"></div>
            
            <!-- Step 1 -->
            <div class="relative mb-12">
              <div class="flex items-center mb-4">
                <div class="bg-indigo-600 h-8 w-8 rounded-full flex items-center justify-center text-white font-semibold z-10 mx-auto">1</div>
              </div>
              <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-lg font-medium text-gray-900 mb-2">Choose Your Card</h3>
                <p class="text-gray-500">Select the credit card that best matches your lifestyle and financial needs from our range of options.</p>
              </div>
            </div>
            
            <!-- Step 2 -->
            <div class="relative mb-12">
              <div class="flex items-center mb-4">
                <div class="bg-indigo-600 h-8 w-8 rounded-full flex items-center justify-center text-white font-semibold z-10 mx-auto">2</div>
              </div>
              <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-lg font-medium text-gray-900 mb-2">Complete Application</h3>
                <p class="text-gray-500">Fill out the online application form with your personal and financial details. It takes just 5 minutes.</p>
              </div>
            </div>
            
            <!-- Step 3 -->
            <div class="relative mb-12">
              <div class="flex items-center mb-4">
                <div class="bg-indigo-600 h-8 w-8 rounded-full flex items-center justify-center text-white font-semibold z-10 mx-auto">3</div>
              </div>
              <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-lg font-medium text-gray-900 mb-2">Quick Verification</h3>
                <p class="text-gray-500">We'll verify your identity and credit history. This process is fast and secure.</p>
              </div>
            </div>
            
            <!-- Step 4 -->
            <div class="relative">
              <div class="flex items-center mb-4">
                <div class="bg-indigo-600 h-8 w-8 rounded-full flex items-center justify-center text-white font-semibold z-10 mx-auto">4</div>
              </div>
              <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-lg font-medium text-gray-900 mb-2">Card Delivery</h3>
                <p class="text-gray-500">Upon approval, your card will be delivered to your doorstep within 3-5 business days.</p>
              </div>
            </div>
          </div>
          
          <div class="mt-12 text-center">
            <button class="py-3 px-6 border border-transparent rounded-md shadow-lg text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Apply for a Credit Card Now
            </button>
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
