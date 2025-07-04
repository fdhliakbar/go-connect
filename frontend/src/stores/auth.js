import { defineStore } from 'pinia'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.user
  },

  actions: {
    async register(email, password, username, fullName) {
      this.loading = true
      this.error = null

      try {
        // 1. Register user dengan Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password
        })

        if (authError) throw authError

        // 2. Buat record di tabel users
        if (authData.user) {
          const { error: profileError } = await supabase
            .from('users')
            .insert({
              id: authData.user.id,
              email: authData.user.email,
              username,
              full_name: fullName,
              created_at: new Date().toISOString()
            })

          if (profileError) throw profileError
        }

        return { success: true, data: authData }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    async login(email, password) {
      this.loading = true
      this.error = null

      try {
        // 1. Login dengan Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password
        })

        if (authError) throw authError

        // 2. Ambil data profile dari tabel users
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', authData.user.id)
          .single()

        if (userError) {
          console.error('User data error:', userError)
          // Jika belum ada data di tabel users, buat record baru
          const { error: insertError } = await supabase
            .from('users')
            .insert({
              id: authData.user.id,
              email: authData.user.email,
              username: authData.user.email.split('@')[0],
              full_name: '',
              created_at: new Date().toISOString()
            })
          
          if (!insertError) {
            const { data: newUserData } = await supabase
              .from('users')
              .select('*')
              .eq('id', authData.user.id)
              .single()
            this.user = newUserData
          }
        } else {
          this.user = userData
        }

        return { success: true, data: authData }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.loading = true
      try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        this.user = null
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async initAuth() {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          const { data: userData } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single()
          
          this.user = userData
        }

        // Listen untuk perubahan auth state
        supabase.auth.onAuthStateChange(async (event, session) => {
          if (event === 'SIGNED_IN' && session?.user) {
            const { data: userData } = await supabase
              .from('users')
              .select('*')
              .eq('id', session.user.id)
              .single()
            
            this.user = userData
          } else if (event === 'SIGNED_OUT') {
            this.user = null
          }
        })
      } catch (error) {
        console.error('Init auth error:', error)
      }
    }
  }
})