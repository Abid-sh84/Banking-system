import axios from 'axios';

// Setting baseURL to match our Vite proxy configuration
const baseURL = '/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // This enables cookies to be sent with requests
});

console.log(`API configured with baseURL: ${baseURL}`);

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

// Add a response interceptor to handle expired tokens with automatic token refresh
api.interceptors.response.use(
  (response) => {
    console.log(`API Response from ${response.config.url}: Status ${response.status}`);
    return response;
  },
  async (error) => {
    console.error('API Response Error:', error.message);
    
    if (error.response) {
      console.error(`API Error Response: Status ${error.response.status} from ${error.config?.url}`);
      console.error('Error Response Data:', error.response.data);
      
      // Check if this is a token issue that can be fixed by refreshing
      if (error.response.status === 401 && 
          localStorage.getItem('token') && 
          !error.config._retry && 
          !error.config.url.includes('refresh-token') &&
          !error.config.url.includes('login')) {
        
        console.warn('Unauthorized error detected, attempting token refresh');
        error.config._retry = true;
        
        try {
          // Try refreshing the token directly with the auth service
          console.log('Attempting direct token refresh');
          const refreshResponse = await authService.refreshToken();
          
          if (refreshResponse && refreshResponse.data && refreshResponse.data.data && refreshResponse.data.data.token) {
            const { token } = refreshResponse.data.data;
            
            // Update token in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('tokenLastRefreshed', Date.now().toString());
            
            console.log('Token refreshed successfully, retrying request');
            // Update the token in the original request config
            error.config.headers.Authorization = `Bearer ${token}`;
            
            // Retry the original request with the new token
            return api(error.config);
          } else {
            console.warn('Token refresh did not return a valid token');
            throw new Error('Failed to get new token from refresh');
          }
        } catch (refreshError) {
          console.error('Error during token refresh:', refreshError);
          
          console.warn('Token refresh failed, clearing auth data');
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          localStorage.removeItem('tokenLastRefreshed');
          
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
          
          return Promise.reject(error);
        }
      } else if ((error.response.status === 401 || error.response.status === 403) &&
                !error.config.url.includes('/auth/refresh-token')) {
        // Token expired or invalid or permission issue that couldn't be fixed with a refresh
        console.warn('Authentication/Authorization issue detected');
        
        // Only clear token on 401 (Unauthorized) that wasn't fixed by refresh
        if (error.response.status === 401) {
          console.warn('Token invalid or expired, clearing auth data');
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          localStorage.removeItem('tokenLastRefreshed');
          
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

// Auth services - using consistent paths with the Vite proxy configuration
export const authService = {
  registerCustomer: (data) => api.post('/auth/register', data),
  
  loginCustomer: (data) => {
    console.log('Attempting customer login with data:', { email: data.email });
    return api.post('/auth/login/customer', data)
      .catch(error => {
        console.error('Customer login failed:', error.message);
        // Try alternate path if the first one fails
        if (error.response && error.response.status === 404) {
          console.log('Trying alternate path for customer login');
          return api.post('/auth/login-customer', data);
        }
        throw error;
      });
  },
  
  loginBanker: (data) => {
    console.log('Attempting banker login with data:', { email: data.email });
    return api.post('/auth/login/banker', data)
      .catch(error => {
        console.error('Banker login failed:', error.message);
        // Try alternate path if the first one fails
        if (error.response && error.response.status === 404) {
          console.log('Trying alternate path for banker login');
          return api.post('/auth/login-banker', data); // Try the alternate route format
        }
        throw error;
      });
  },
  
  logout: () => api.post('/auth/logout'),
  
  // This endpoint is critical for token verification and user data
  getCurrentUser: () => {
    console.log('Fetching current user data');
    return api.get('/auth/me')
      .catch(error => {
        console.error('Failed to get current user:', error.message);
        // Try alternate path if the first one fails
        if (error.response && error.response.status === 404) {
          console.log('Trying alternate path for current user');
          return api.get('/auth/user');
        }
        throw error;
      });
  },
  
  // Add token refresh functionality
  refreshToken: () => {
    console.log('Attempting to refresh token');
    return api.post('/auth/refresh-token')
      .catch(error => {
        console.error('Failed to refresh token:', error.message);
        // Try alternate path if the first one fails
        if (error.response && error.response.status === 404) {
          console.log('Trying alternate path for token refresh');
          return api.post('/auth/token-refresh');
        }
        throw error;
      });
  }
};

// Customer services - using consistent paths
export const customerService = {
  getProfile: () => {
    console.log('Getting customer profile');
    return api.get('/customers/profile')
      .catch(error => {
        console.error('Failed to get customer profile:', error.message);
        // Try alternate path if the first one fails
        if (error.response && error.response.status === 404) {
          console.log('Trying alternate path for customer profile');
          return api.get('/customer/profile');
        }
        throw error;
      });
  },
  updateProfile: (data) => api.put('/customers/profile', data),
  changePassword: (data) => api.post('/customers/change-password', data),
  getTransactions: (params) => api.get('/customers/transactions', { params }),
  getTransaction: (id) => api.get(`/customers/transactions/${id}`),
  createTransaction: (data) => api.post('/customers/transactions', data)
};

// Banker services - consistent paths based on our baseURL
export const bankerService = {
  getProfile: () => api.get('/banker/profile'),
  changePassword: (data) => api.post('/banker/change-password', data),
  getAllCustomers: (params) => api.get('/banker/customers', { params }),
  getCustomer: (id) => api.get(`/banker/customers/${id}`),
  getCustomerTransactions: (id, params) => api.get(`/banker/customers/${id}/transactions`, { params }),
  getAllTransactions: (params) => api.get('/banker/transactions', { params }),
  createBanker: (data) => api.post('/banker/create', data),
  approveTransaction: (id) => api.post(`/banker/transactions/${id}/approve`),
  rejectTransaction: (id, data) => api.post(`/banker/transactions/${id}/reject`, data),
  createCustomerDeposit: (customerId, data) => api.post(`/banker/customers/${customerId}/deposit`, data),
  exportTransactions: (params) => api.get('/banker/transactions/export', { 
    params,
    responseType: 'blob' 
  })
};

// Card services
export const cardService = {
  // Apply for a virtual debit card
  applyForCard: (termsAccepted) => {
    return api.post('/cards/apply', { termsAccepted });
  },
  
  // Get current customer's card
  getMyCard: () => {
    return api.get('/cards/my-card');
  },
  
  // Get full card details (including sensitive data)
  getFullCardDetails: () => {
    return api.get('/cards/my-card/full-details');
  },
  
  // Get all cards (banker only)
  getAllCards: () => {
    return api.get('/cards/all');
  },
  
  // Update card status (banker only)
  updateCardStatus: (cardId, status) => {
    return api.patch(`/cards/${cardId}/status`, { status });
  }
};

export default api;
