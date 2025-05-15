import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // This enables cookies to be sent with requests
});

// Add a request interceptor to include the token in all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    
    if (token) {
      // Make sure we're using the correct authorization header format
      config.headers.Authorization = `Bearer ${token}`;
      
      console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`, {
        token: token.substring(0, 15) + '...',
        role: role
      });
    } else {
      console.log(`API Request: ${config.method.toUpperCase()} ${config.url} (no token)`);
    }
    return config;
  },
  (error) => {
    console.error('API Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle expired tokens
api.interceptors.response.use(
  (response) => {
    console.log(`API Response from ${response.config.url}: Status ${response.status}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.message);
    
    if (error.response) {
      console.error(`API Error Response: Status ${error.response.status} from ${error.config?.url}`);
      console.error('Error Response Data:', error.response.data);
      
      if (error.response.status === 401 || error.response.status === 403) {
        // Token expired or invalid or permission issue
        console.warn('Authentication/Authorization issue detected');
        
        // Only clear token on 401 (Unauthorized)
        if (error.response.status === 401) {
          console.warn('Token invalid or expired, clearing auth data');
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          
          // Check current page before redirecting
          const currentPath = window.location.pathname;
          if (currentPath.includes('/banker/') || currentPath.includes('/customer/')) {
            console.log('Redirecting to appropriate login from protected page');
            // Route to the proper login page based on the current path
            if (currentPath.includes('/banker/')) {
              window.location.href = '/banker/login';
            } else {
              window.location.href = '/customer/login';
            }
          }
        }
      }
    } else if (error.request) {
      console.error('API Error: No response received from server');
    }
    
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  registerCustomer: (data) => api.post('/auth/register', data),
  loginCustomer: (data) => api.post('/auth/login/customer', data),
  loginBanker: (data) => api.post('/auth/login/banker', data),
  logout: () => api.post('/auth/logout'),
  getCurrentUser: () => api.get('/auth/me')
};

// Customer services
export const customerService = {
  getProfile: () => api.get('/customers/profile'),
  updateProfile: (data) => api.put('/customers/profile', data),
  changePassword: (data) => api.post('/customers/change-password', data),
  getTransactions: (params) => api.get('/customers/transactions', { params }),
  getTransaction: (id) => api.get(`/customers/transactions/${id}`),
  createTransaction: (data) => api.post('/customers/transactions', data)
};

// Banker services - Updated paths to ensure they match the backend
export const bankerService = {
  getProfile: () => api.get('/banker/profile'),
  changePassword: (data) => api.post('/banker/change-password', data),
  getAllCustomers: (params) => api.get('/banker/customers', { params }),
  getCustomer: (id) => api.get(`/banker/customers/${id}`),
  getCustomerTransactions: (id, params) => api.get(`/banker/customers/${id}/transactions`, { params }),
  getAllTransactions: (params) => api.get('/banker/transactions', { params }),
  createBanker: (data) => api.post('/banker/create', data)
};

export default api;
