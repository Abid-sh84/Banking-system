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
    isAuthenticated: (state) => !!state.token && !!state.user,
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
        const response = await authService.loginCustomer({ email, password });
        
        const { token, customer } = response.data.data;
        
        this.token = token;
        this.user = customer;
        this.role = 'customer';
        
        // Store in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('role', 'customer');
        
        return response;
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async bankerLogin(email, password) {
      this.loading = true;
      
      try {
        const response = await authService.loginBanker({ email, password });
        
        const { token, banker } = response.data.data;
        
        this.token = token;
        this.user = banker;
        this.role = banker.role; // banker or admin
        
        // Store in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('role', banker.role);
        
        return response;
      } catch (error) {
        console.error('Login error:', error);
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
      if (!this.token) return;
      
      this.loading = true;
      
      try {
        const response = await authService.getCurrentUser();
        this.user = response.data.data.user;
        this.role = response.data.data.role;
        
        // Update localStorage
        localStorage.setItem('role', this.role);
        
        return response;
      } catch (error) {
        console.error('Error fetching user:', error);
        
        // If the token is invalid or expired, log the user out
        if (error.response && error.response.status === 401) {
          this.logout();
        }
      } finally {
        this.loading = false;
      }
    }
  }
});
