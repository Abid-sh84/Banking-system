import { defineStore } from 'pinia';
import { authService } from '../services/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role'),
    loading: false
  }),
  getters: {
    // Fix authentication check - the previous condition was too restrictive
    isAuthenticated: (state) => {
      console.log("Auth state check:", { token: !!state.token, user: !!state.user }); 
      return !!state.token; // We only check for token, as user might load asynchronously
    },
    userRole: (state) => state.role,
    isCustomer: (state) => state.role === 'customer',
    isBanker: (state) => state.role === 'banker' || state.role === 'admin',
    isAdmin: (state) => state.role === 'admin'
  },
  
  actions: {
    async registerCustomer(userData) {
      this.loading = true;
      
      try {
        const response = await authService.registerCustomer(userData);
        
        const { token, customer } = response.data.data;
        
        this.token = token;
        this.user = customer;
        this.role = 'customer';
        
        // Store in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('role', 'customer');
        
        return response;
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async customerLogin(email, password) {
      this.loading = true;
      
      try {
        console.log('Auth Store: Attempting customer login');
        const response = await authService.loginCustomer({ email, password });
        console.log('Auth Store: Login response received', response.data);
        
        const { token, customer } = response.data.data;
        
        this.token = token;
        this.user = customer;
        this.role = 'customer';
        
        // Store in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('role', 'customer');
        
        console.log('Auth Store: Login successful, token and role set');
        return response;
      } catch (error) {
        console.error('Auth Store: Login error:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async bankerLogin(email, password) {
      this.loading = true;
      
      try {
        console.log('Auth Store: Attempting banker login');
        const response = await authService.loginBanker({ email, password });
        console.log('Auth Store: Banker login response received', response.data);
        
        const { token, banker } = response.data.data;
        
        // Debug the banker object and role
        console.log('Banker data:', banker);
        
        // Updated to ensure admin role is preserved when present
        // If banker.role is undefined, default to 'admin' if email is admin@bank.com
        const role = banker.role || (banker.email === 'admin@bank.com' ? 'admin' : 'banker');
        
        this.token = token;
        this.user = banker;
        this.role = role;
        
        // Store in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        
        console.log('Auth Store: Banker login successful, token and role set', {
          role: role,
          token: !!token
        });
        
        return response;
      } catch (error) {
        console.error('Auth Store: Banker login error:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async logout() {
      try {
        // Call backend logout
        await authService.logout();
      } catch (error) {
        console.error('Logout error:', error);
      }
      
      // Clear user data
      this.user = null;
      this.token = null;
      this.role = null;
      
      // Remove from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    },
    
    async fetchUser() {
      // Don't try to fetch user if no token
      if (!this.token) {
        console.log('Auth Store: No token, skipping user fetch');
        return;
      }
      
      this.loading = true;
      console.log('Auth Store: Fetching user data');
      
      try {
        const response = await authService.getCurrentUser();
        console.log('Auth Store: User data fetched', response.data);
        
        // Make sure we're getting the user and role from the correct path in the response
        if (response.data && response.data.data) {
          // If user info is nested in data.data.user
          if (response.data.data.user) {
            this.user = response.data.data.user;
            
            // If the role is returned directly in data.data.role
            if (response.data.data.role) {
              this.role = response.data.data.role;
            } 
            // If the role is nested in the user object
            else if (response.data.data.user.role) {
              this.role = response.data.data.user.role;
            }
            // Default to existing role if not found
          } 
          // If user info is directly in data.data
          else {
            this.user = response.data.data;
            if (response.data.data.role) {
              this.role = response.data.data.role;
            }
          }
          
          // Ensure role is valid - if user is a banker but role is missing, set to 'banker'
          if (!this.role && this.user.is_banker) {
            this.role = 'banker';
          }
          
          // Update localStorage with the current role
          localStorage.setItem('role', this.role);
          
          console.log('Auth Store: User and role updated', {
            user: !!this.user,
            role: this.role,
            isBanker: this.role === 'banker' || this.role === 'admin'
          });
        } else {
          console.warn('Auth Store: Unexpected response format', response.data);
        }
        
        return response;
      } catch (error) {
        console.error('Auth Store: Error fetching user:', error);
        
        // If the token is invalid or expired, log the user out
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          console.log('Auth Store: Auth error, logging out');
          this.logout();
        }
        throw error;
      } finally {
        this.loading = false;
      }
    }
  }
});