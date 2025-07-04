import { defineStore } from 'pinia'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    session: null,
    isAuthenticated: false,
    loading: false,
    error: null
  }),

  getters: {
    isLoggedIn: (state) => state.isAuthenticated && state.session,
    currentUser: (state) => state.user,
    isLoading: (state) => state.loading
  },

  actions: {
    // Initialize auth state from Supabase session
    async initAuth() {
      this.loading = true
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          this.session = session
          this.isAuthenticated = true
          await this.fetchUserProfile(session.user.id)
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
      } finally {
        this.loading = false
      }
    },

    // Fetch user profile from users table
    async fetchUserProfile(userId) {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .single()
        
        if (!error && data) {
          this.user = data
        } else if (error?.code === 'PGRST116') {
          // User doesn't exist in users table, create one
          const { data: { user: authUser } } = await supabase.auth.getUser()
          await this.createUserProfile(authUser)
        }
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    },

    // Create user profile in users table
    async createUserProfile(authUser) {
      try {
        const userData = {
          id: authUser.id,
          email: authUser.email,
          username: authUser.email.split('@')[0], // Generate username from email
          full_name: authUser.user_metadata?.full_name || '',
          created_at: new Date().toISOString()
        }
        
        const { data, error } = await supabase
          .from('users')
          .insert([userData])
          .select()
          .single()
          
        if (!error && data) {
          this.user = data
        }
      } catch (error) {
        console.error('Error creating user profile:', error)
      }
    },

    // Register new user with Supabase Auth
    async register(userData) {
      this.loading = true
      this.error = null
      
      try {
        const { data, error } = await supabase.auth.signUp({
          email: userData.email,
          password: userData.password,
          options: {
            data: {
              full_name: userData.full_name,
              username: userData.username
            }
          }
        })
        
        if (error) {
          this.error = error.message
          return { success: false, error: error.message }
        }
        
        if (data.user) {
          // User will be automatically logged in after email confirmation
          return { success: true, message: 'Please check your email to confirm your account' }
        }
        
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    // Login user with Supabase Auth
    async login(credentials) {
      this.loading = true
      this.error = null
      
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password
        })
        
        if (error) {
          this.error = error.message
          return { success: false, error: error.message }
        }
        
        if (data.session) {
          this.session = data.session
          this.isAuthenticated = true
          await this.fetchUserProfile(data.user.id)
          return { success: true }
        }
        
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    // Logout user
    async logout() {
      this.loading = true
      try {
        await supabase.auth.signOut()
        this.user = null
        this.session = null
        this.isAuthenticated = false
        this.error = null
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        this.loading = false
      }
    },

    // Update user profile
    async updateProfile(profileData) {
      this.loading = true
      this.error = null
      
      try {
        const { data, error } = await supabase
          .from('users')
          .update(profileData)
          .eq('id', this.user.id)
          .select()
          .single()
        
        if (error) {
          this.error = error.message
          return { success: false, error: error.message }
        }
        
        if (data) {
          this.user = { ...this.user, ...data }
          return { success: true }
        }
        
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    // Setup auth state listener
    setupAuthListener() {
      supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          this.session = session
          this.isAuthenticated = true
          await this.fetchUserProfile(session.user.id)
        } else if (event === 'SIGNED_OUT') {
          this.user = null
          this.session = null
          this.isAuthenticated = false
        }
      })
    }
  }
})
