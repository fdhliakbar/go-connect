import { defineStore } from 'pinia'
import api from '@/utils/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    loading: false,
    error: null
  }),

  getters: {
    isLoggedIn: (state) => state.isAuthenticated && state.token,
    currentUser: (state) => state.user
  },

  actions: {
    // Initialize auth state from localStorage
    initAuth() {
      const token = localStorage.getItem('token')
      const refreshToken = localStorage.getItem('refreshToken')
      const user = localStorage.getItem('user')

      if (token && user) {
        this.token = token
        this.refreshToken = refreshToken
        this.user = JSON.parse(user)
        this.isAuthenticated = true
      }
    },

    // Register new user
    async register(userData) {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.post('/auth/register', userData)
        const { data } = response.data
        
        this.user = data.user
        this.token = data.token
        this.refreshToken = data.refresh_token
        this.isAuthenticated = true
        
        // Save to localStorage
        localStorage.setItem('token', data.token)
        localStorage.setItem('refreshToken', data.refresh_token)
        localStorage.setItem('user', JSON.stringify(data.user))
        
        return { success: true, data: response.data }
      } catch (error) {
        this.error = error.response?.data?.error || 'Registration failed'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    // Login user
    async login(credentials) {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.post('/auth/login', credentials)
        const { data } = response.data
        
        this.user = data.user
        this.token = data.token
        this.refreshToken = data.refresh_token
        this.isAuthenticated = true
        
        // Save to localStorage
        localStorage.setItem('token', data.token)
        localStorage.setItem('refreshToken', data.refresh_token)
        localStorage.setItem('user', JSON.stringify(data.user))
        
        return { success: true, data: response.data }
      } catch (error) {
        this.error = error.response?.data?.error || 'Login failed'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    // Logout user
    async logout() {
      try {
        await api.post('/logout')
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        this.user = null
        this.token = null
        this.refreshToken = null
        this.isAuthenticated = false
        
        // Clear localStorage
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
      }
    },

    // Get user profile
    async getProfile() {
      try {
        const response = await api.get('/profile')
        this.user = response.data.data
        localStorage.setItem('user', JSON.stringify(this.user))
        return { success: true, data: response.data.data }
      } catch (error) {
        return { success: false, error: error.response?.data?.error }
      }
    },

    // Update user profile
    async updateProfile(profileData) {
      this.loading = true
      try {
        const response = await api.put('/profile', profileData)
        this.user = response.data.data
        localStorage.setItem('user', JSON.stringify(this.user))
        return { success: true, data: response.data }
      } catch (error) {
        return { success: false, error: error.response?.data?.error }
      } finally {
        this.loading = false
      }
    }
  }
})