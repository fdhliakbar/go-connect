import { defineStore } from 'pinia'
import api from '@/utils/api'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token'),
    refreshToken: null,
    isAuthenticated: false,
    loading: false,
    error: null
  }),

  getters: {
    isLoggedIn: (state) => state.isAuthenticated && state.token,
    currentUser: (state) => state.user,
    isLoading: (state) => state.loading
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
    },

    // Google Sign Up
    async googleSignUp() {
      this.loading = true
      this.error = null

      try {
        // Get Google OAuth URL from backend - fix the URL
        const response = await axios.get('/api/auth/google/url')
        const { url } = response.data

        // Open Google OAuth in popup
        const popup = window.open(
          url,
          'google-oauth',
          'width=500,height=600,scrollbars=yes,resizable=yes'
        )

        // Return promise that resolves when popup closes or auth completes
        return new Promise((resolve) => {
          // Check if popup was blocked
          if (!popup) {
            this.error = 'Popup blocked. Please allow popups for this site.'
            this.loading = false
            resolve({ success: false, error: this.error })
            return
          }

          // Listen for messages from popup
          const messageHandler = async (event) => {
            if (event.origin !== window.location.origin) return

            if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
              try {
                // Send authorization code to backend - fix the URL
                const authResponse = await axios.post('/api/auth/google/callback', {
                  code: event.data.code
                })

                const { token, user } = authResponse.data

                this.token = token
                this.user = user
                localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

                this.loading = false
                window.removeEventListener('message', messageHandler)
                popup.close()
                resolve({ success: true })
              } catch (error) {
                this.error = error.response?.data?.error || 'Google authentication failed'
                this.loading = false
                window.removeEventListener('message', messageHandler)
                popup.close()
                resolve({ success: false, error: this.error })
              }
            }

            if (event.data.type === 'GOOGLE_AUTH_ERROR') {
              this.error = event.data.error || 'Google authentication failed'
              this.loading = false
              window.removeEventListener('message', messageHandler)
              popup.close()
              resolve({ success: false, error: this.error })
            }
          }

          // Add event listener
          window.addEventListener('message', messageHandler)

          // Check if popup is closed manually
          const checkClosed = setInterval(() => {
            if (popup.closed) {
              clearInterval(checkClosed)
              window.removeEventListener('message', messageHandler)
              this.loading = false
              resolve({ success: false, error: 'Authentication cancelled' })
            }
          }, 1000)
        })

      } catch (error) {
        console.error('Google auth error:', error)
        this.error = error.response?.data?.error || 'Failed to initialize Google authentication'
        this.loading = false
        return { success: false, error: this.error }
      }
    }
  }
})