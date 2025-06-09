<!-- filepath: c:\Users\Shamim shaikh\Desktop\Assignment\project\frontend\src\pages\Security.vue -->
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
            Security
          </h1>
          <p class="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Your security and privacy are our top priorities at Modern Bank
          </p>
        </div>
      </div>
    </div>
    
    <!-- Main Security Info Section -->
    <div class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Leading Security Technology -->
        <div class="mb-16">
          <div class="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    Leading Security Technology
                  </h2>
                </div>
              </div>
              <p class="mt-4 text-lg text-gray-500">
                Modern Bank employs industry-leading security technologies to ensure your financial data and transactions remain secure. Our multi-layered security approach combines hardware security, encryption, constant monitoring, and strict access controls.
              </p>
              
              <div class="mt-8 space-y-4">
                <div class="bg-white shadow overflow-hidden rounded-lg">
                  <div class="px-4 py-5 sm:p-6">
                    <div class="flex items-start">
                      <div class="flex-shrink-0">
                        <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div class="ml-3">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">256-bit SSL Encryption</h3>
                        <p class="mt-2 text-base text-gray-500">
                          All communication between your device and our servers is secured with 256-bit SSL encryption, the same level of encryption used by military and government agencies.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="bg-white shadow overflow-hidden rounded-lg">
                  <div class="px-4 py-5 sm:p-6">
                    <div class="flex items-start">
                      <div class="flex-shrink-0">
                        <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div class="ml-3">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">Biometric Authentication</h3>
                        <p class="mt-2 text-base text-gray-500">
                          Our mobile app supports fingerprint and facial recognition for secure access to your account, providing an additional layer of security.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="bg-white shadow overflow-hidden rounded-lg">
                  <div class="px-4 py-5 sm:p-6">
                    <div class="flex items-start">
                      <div class="flex-shrink-0">
                        <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div class="ml-3">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">Two-Factor Authentication (2FA)</h3>
                        <p class="mt-2 text-base text-gray-500">
                          Protect your account with two-factor authentication, requiring both your password and a one-time verification code sent to your registered mobile device.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="mt-10 lg:mt-0">
              <img 
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                alt="Cybersecurity" 
                class="rounded-lg shadow-xl"
              />
              <div class="mt-4 flex items-center text-sm font-medium text-indigo-600">
                <svg class="flex-shrink-0 mr-2 h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Our security infrastructure is regularly audited by independent security experts
              </div>
            </div>
          </div>
        </div>
        
        <!-- Fraud Monitoring -->
        <div class="mb-16">
          <div class="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div class="mt-10 lg:mt-0 order-first lg:order-last">
              <img 
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                alt="Fraud Detection" 
                class="rounded-lg shadow-xl"
              />
              <div class="mt-4 flex items-center text-sm font-medium text-indigo-600">
                <svg class="flex-shrink-0 mr-2 h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Our fraud detection systems monitor transactions 24/7
              </div>
            </div>
            
            <div>
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    24/7 Fraud Monitoring
                  </h2>
                </div>
              </div>
              <p class="mt-4 text-lg text-gray-500">
                Our advanced fraud detection systems monitor your accounts around the clock, analyzing transaction patterns to identify suspicious activities. If we detect any unusual activity, we'll alert you immediately through your preferred communication channels.
              </p>
              
              <div class="mt-8 space-y-4">
                <div class="bg-white shadow overflow-hidden rounded-lg">
                  <div class="px-4 py-5 sm:p-6">
                    <div class="flex items-start">
                      <div class="flex-shrink-0">
                        <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div class="ml-3">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">Real-time Transaction Monitoring</h3>
                        <p class="mt-2 text-base text-gray-500">
                          Our AI-powered system analyzes every transaction in real-time to detect and prevent fraudulent activities before they impact your account.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="bg-white shadow overflow-hidden rounded-lg">
                  <div class="px-4 py-5 sm:p-6">
                    <div class="flex items-start">
                      <div class="flex-shrink-0">
                        <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div class="ml-3">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">Instant Alerts</h3>
                        <p class="mt-2 text-base text-gray-500">
                          Receive immediate notifications for all account activities through SMS, email, or push notifications, keeping you informed about your finances in real-time.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="bg-white shadow overflow-hidden rounded-lg">
                  <div class="px-4 py-5 sm:p-6">
                    <div class="flex items-start">
                      <div class="flex-shrink-0">
                        <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div class="ml-3">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">Dedicated Fraud Team</h3>
                        <p class="mt-2 text-base text-gray-500">
                          Our specialized fraud prevention team works around the clock to investigate suspicious activities and respond to security concerns.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Data Protection -->
        <div>
          <div class="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    Data Protection
                  </h2>
                </div>
              </div>
              <p class="mt-4 text-lg text-gray-500">
                Protecting your personal and financial data is at the core of our security philosophy. We implement strict data protection measures that meet and exceed industry standards and regulatory requirements.
              </p>
              
              <div class="mt-8 space-y-4">
                <div class="bg-white shadow overflow-hidden rounded-lg">
                  <div class="px-4 py-5 sm:p-6">
                    <div class="flex items-start">
                      <div class="flex-shrink-0">
                        <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div class="ml-3">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">End-to-End Encryption</h3>
                        <p class="mt-2 text-base text-gray-500">
                          All sensitive data is encrypted both in transit and at rest, ensuring your information remains secure at all times.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="bg-white shadow overflow-hidden rounded-lg">
                  <div class="px-4 py-5 sm:p-6">
                    <div class="flex items-start">
                      <div class="flex-shrink-0">
                        <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div class="ml-3">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">Secure Data Centers</h3>
                        <p class="mt-2 text-base text-gray-500">
                          Our data is stored in highly secure, geographically distributed data centers with redundant systems, ensuring both security and availability.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="bg-white shadow overflow-hidden rounded-lg">
                  <div class="px-4 py-5 sm:p-6">
                    <div class="flex items-start">
                      <div class="flex-shrink-0">
                        <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div class="ml-3">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">Regulatory Compliance</h3>
                        <p class="mt-2 text-base text-gray-500">
                          We comply with all relevant data protection regulations, including RBI guidelines, IT Act, and globally recognized security standards.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="mt-10 lg:mt-0">
              <img 
                src="https://images.unsplash.com/photo-1563968743333-044ceb9eb6d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" 
                alt="Data Protection" 
                class="rounded-lg shadow-xl"
              />
              <div class="mt-4 flex items-center text-sm font-medium text-indigo-600">
                <svg class="flex-shrink-0 mr-2 h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ISO 27001 certified for information security management
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Security Tips Section -->
    <div class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Security Best Practices
          </h2>
          <p class="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
            While we invest heavily in protecting your account, you can also take steps to enhance your security. 
            Follow these best practices to keep your banking experience safe and secure.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center mb-4">
              <div class="flex-shrink-0">
                <span class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
              </div>
              <h3 class="ml-4 text-lg font-medium text-gray-900">Strong Passwords</h3>
            </div>
            <p class="text-gray-600">
              Create strong, unique passwords for your banking accounts. Use a combination of uppercase and lowercase letters, numbers, and special characters. Avoid using easily guessable information like birthdays or names.
            </p>
          </div>
          
          <div class="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center mb-4">
              <div class="flex-shrink-0">
                <span class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </span>
              </div>
              <h3 class="ml-4 text-lg font-medium text-gray-900">Enable Two-Factor Authentication</h3>
            </div>
            <p class="text-gray-600">
              Always use two-factor authentication for your account. This adds an extra layer of security by requiring both your password and a one-time code sent to your mobile device.
            </p>
          </div>
          
          <div class="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center mb-4">
              <div class="flex-shrink-0">
                <span class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </span>
              </div>
              <h3 class="ml-4 text-lg font-medium text-gray-900">Secure Your Devices</h3>
            </div>
            <p class="text-gray-600">
              Keep your devices secure by installing updates promptly, using antivirus software, and avoiding jailbreaking or rooting your mobile devices. Only download apps from official app stores.
            </p>
          </div>
          
          <div class="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center mb-4">
              <div class="flex-shrink-0">
                <span class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                </span>
              </div>
              <h3 class="ml-4 text-lg font-medium text-gray-900">Be Wary of Public Wi-Fi</h3>
            </div>
            <p class="text-gray-600">
              Avoid accessing your bank account over public Wi-Fi networks. If you must use public Wi-Fi, use a secure VPN (Virtual Private Network) connection to encrypt your data.
            </p>
          </div>
          
          <div class="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center mb-4">
              <div class="flex-shrink-0">
                <span class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </span>
              </div>
              <h3 class="ml-4 text-lg font-medium text-gray-900">Watch Out for Phishing</h3>
            </div>
            <p class="text-gray-600">
              Be vigilant about phishing attempts. We will never ask for your full password, OTP, or PIN via email, SMS, or phone calls. Always access our website by typing the URL directly in your browser.
            </p>
          </div>
          
          <div class="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center mb-4">
              <div class="flex-shrink-0">
                <span class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </span>
              </div>
              <h3 class="ml-4 text-lg font-medium text-gray-900">Regular Monitoring</h3>
            </div>
            <p class="text-gray-600">
              Regularly review your account statements and transaction history. Report any suspicious transactions or activities to our customer service immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Report Security Incidents -->
    <div class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-indigo-700 rounded-lg shadow-xl overflow-hidden">
          <div class="px-6 py-8 sm:p-10 lg:flex lg:items-center">
            <div class="flex-1">
              <h3 class="text-xl font-semibold text-white">Report Security Incidents</h3>
              <p class="mt-2 text-indigo-200">
                If you notice any suspicious activity or believe your account security has been compromised, 
                please contact our 24/7 security helpline immediately.
              </p>
            </div>
            <div class="mt-6 lg:mt-0 lg:ml-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="tel:+911234567890" class="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white shadow-sm hover:bg-indigo-50">
                <svg class="mr-2 h-5 w-5 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 1234 567 890
              </a>
              <a href="mailto:security@modernbank.in" class="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white shadow-sm hover:bg-indigo-50">
                <svg class="mr-2 h-5 w-5 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                security@modernbank.in
              </a>
            </div>
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
