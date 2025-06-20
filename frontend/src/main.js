import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import './index.css'; // Import Tailwind CSS
import './styles.css'; // Import custom styles

import App from './App.vue';
import Home from './pages/Home.vue';
import CustomerLogin from './pages/CustomerLogin.vue';
import CustomerRegister from './pages/CustomerRegister.vue';
import AccountSelection from './pages/AccountSelection.vue';
import BankerLogin from './pages/BankerLogin.vue';
import CustomerDashboard from './pages/CustomerDashboard.vue';
import CustomerProfile from './pages/CustomerProfile.vue';
import BankerDashboard from './pages/BankerDashboard.vue';
import CustomerDetails from './pages/CustomerDetails.vue';
import NotFound from './pages/NotFound.vue';
import { useAuthStore, setupGlobalAuthStore } from './stores/authStore';

// Create pinia (state management)
const pinia = createPinia();

// Create router
const router = createRouter({
  history: createWebHistory(),  routes: [
    { path: '/', component: Home },
    { path: '/customer/login', component: CustomerLogin },
    { path: '/account-selection', component: AccountSelection },
    { path: '/customer/register', component: CustomerRegister },
    { path: '/banker/login', component: BankerLogin },
    { 
      path: '/customer/dashboard', 
      component: CustomerDashboard,
      meta: { requiresAuth: true, role: 'customer' }
    },
    { 
      path: '/customer/profile', 
      component: CustomerProfile,
      meta: { requiresAuth: true, role: 'customer' }
    },
    { 
      path: '/banker/dashboard', 
      component: BankerDashboard,
      meta: { requiresAuth: true, role: 'banker' }
    },
    { 
      path: '/banker/customer/:id', 
      component: CustomerDetails,
      meta: { requiresAuth: true, role: 'banker' }
    },
    // Footer Pages - About & Company
    { path: '/about-us', component: () => import('./pages/AboutUs.vue') },
    { path: '/careers', component: () => import('./pages/Careers.vue') },
    { path: '/contact', component: () => import('./pages/Contact.vue') },
    { path: '/blog', component: () => import('./pages/Blog.vue') },
    
    // Product Pages
    { path: '/products/savings-accounts', component: () => import('./pages/products/SavingsAccounts.vue') },
    { path: '/products/fixed-deposits', component: () => import('./pages/products/FixedDeposits.vue') },
    { path: '/products/loans', component: () => import('./pages/products/Loans.vue') },
    { path: '/products/credit-cards', component: () => import('./pages/products/CreditCards.vue') },
    
    // Legal Pages
    { path: '/privacy-policy', component: () => import('./pages/PrivacyPolicy.vue') },
    { path: '/terms-of-service', component: () => import('./pages/TermsOfService.vue') },
    { path: '/security', component: () => import('./pages/Security.vue') },
    
    { path: '/:pathMatch(.*)*', component: NotFound }
  ]
});

// Navigation guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore(pinia);
  
  console.log('Navigation guard: Route change to', to.path, {
    auth: authStore.isAuthenticated,
    role: authStore.role,
    token: !!localStorage.getItem('token')
  });
  
  // If we have a token but no user data, try to fetch it
  if (authStore.token && !authStore.user) {
    console.log("Token exists but no user data, attempting to fetch user...");
    try {
      await authStore.fetchUser();
      console.log("User data fetched successfully:", { 
        user: !!authStore.user, 
        role: authStore.role 
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle token validation failure
      if (error.response?.status === 401 || error.response?.status === 403) {
        console.warn("Invalid token detected, clearing authentication data");
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        authStore.token = null;
        authStore.user = null;
        authStore.role = null;
      }
    }
  }
  
  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.token) {
    console.log("Navigation blocked: Authentication required");
    if (to.path.includes('/banker')) {
      next('/banker/login');
    } else {
      next('/customer/login');
    }
    return;
  }
  
  // Special handling for banker routes
  if (to.meta.role === 'banker') {
    if (authStore.role === 'banker' || authStore.role === 'admin') {
      console.log("Banker/admin access granted to banker route");
      next();
    } else {
      console.log("Navigation blocked: Banker permission required");
      next('/banker/login');
    }
    return;
  }
  
  // For other role-specific routes
  if (to.meta.role && to.meta.role !== authStore.role) {
    console.log("Navigation blocked: Role mismatch");
    if (authStore.role === 'customer') {
      next('/customer/dashboard');
    } else if (authStore.role === 'banker' || authStore.role === 'admin') {
      next('/banker/dashboard');
    } else {
      next('/');
    }
    return;
  }
  
  next();
});

// Toast configuration
const toastOptions = {
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false
};

// Create and mount app
const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(Toast, toastOptions);

// Setup global auth store reference for use in API interceptors
const authStore = useAuthStore(pinia);
setupGlobalAuthStore(authStore);
console.log('Global auth store setup complete');

app.mount('#app');

// Backend connectivity test has been removed
