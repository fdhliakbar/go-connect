<template>
  <div class="min-h-screen bg-black flex">
    <!-- Left side - Branding -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
      <div class="relative z-10 flex items-center justify-center w-full">
        <div class="text-center animate-fade-in">
          <!-- Go-Connect Logo -->
          <div class="mb-8 transform hover:scale-105 transition-transform duration-300">
            <div class="mx-auto w-32 h-32 flex items-center justify-center rounded-full bg-gradient-to-r from-sky-300 to-cyan-500 shadow-2xl">
              <!-- <span class="text-5xl font-bold text-white">GC</span> -->
               <img src="/images/icons/golang_mascot.png" alt="">
            </div>
          </div>
          <h1 class="text-6xl font-extrabold text-white mb-4 tracking-tight">
            Go-Connect
          </h1>
          <p class="text-xl text-gray-300 max-w-md mx-auto leading-relaxed">
            Connect, collaborate, and create amazing things together
          </p>
        </div>
      </div>
      <!-- Animated background elements -->
      <div class="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
      <div class="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
      <div class="absolute bottom-32 left-16 w-3 h-3 bg-blue-300 rounded-full animate-bounce"></div>
    </div>

    <!-- Right side - Login Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-black">
      <div class="w-full max-w-md animate-slide-up">
        <!-- Mobile Logo -->
        <div class="lg:hidden text-center mb-8">
          <div class="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-sky-300 to-cyan-500 mb-4">
            <img src="/images/icons/golang_mascot.png" alt="Website icons">
          </div>
          <h1 class="text-3xl font-bold text-white">Go-Connect</h1>
        </div>

        <div class="space-y-8">
          <!-- Header -->
          <div class="text-center lg:text-left">
            <h2 class="text-4xl font-bold text-white mb-2 animate-fade-in-delay-1">
              Happening now
            </h2>
            <h3 class="text-2xl font-semibold text-white mb-8 animate-fade-in-delay-2">
              Join today.
            </h3>
          </div>

          <!-- Social Login Buttons -->
          <div class="space-y-4 animate-fade-in-delay-3">
            <button 
              @click="handleGoogleSignUp"
              :disabled="authStore.loading"
              class="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-full text-white font-medium hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg v-if="authStore.loading" class="animate-spin w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {{ authStore.loading ? 'Signing up...' : 'Sign up with Google' }}
            </button>

            <button class="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-full text-white font-medium hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105">
              <img src="/images/icons/x-logo.png" alt="X Sosial Media Logo" class="w-6 h-6 mr-4">
              Sign up with X
            </button>

            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-600"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-black text-gray-400">OR</span>
              </div>
            </div>
            <router-link to="/register">
              <button class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-full transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black">
                Create account
              </button>
            </router-link>
          </div>

          <!-- Terms -->
          <p class="text-xs text-gray-400 animate-fade-in-delay-4">
            By signing up, you agree to the 
            <a href="#" class="text-blue-400 hover:underline">Terms of Service</a> and 
            <a href="#" class="text-blue-400 hover:underline">Privacy Policy</a>, including 
            <a href="#" class="text-blue-400 hover:underline">Cookie Use</a>.
          </p>

          <!-- Sign In Section -->
          <div class="pt-8 animate-fade-in-delay-5">
            <h4 class="text-xl font-bold text-white mb-6">Already have an account?</h4>
            
            <form @submit.prevent="handleLogin" class="space-y-4">
              <div class="space-y-4">
                <div class="relative">
                  <input 
                    id="email" 
                    name="email" 
                    type="email" 
                    autocomplete="email" 
                    required 
                    v-model="form.email"
                    class="w-full px-4 py-3 bg-black border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                    placeholder="Email"
                  >
                </div>
                <div class="relative">
                  <input 
                    id="password" 
                    name="password" 
                    type="password" 
                    autocomplete="current-password" 
                    required 
                    v-model="form.password"
                    class="w-full px-4 py-3 bg-black border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                    placeholder="Password"
                  >
                </div>
              </div>

              <div v-if="authStore.error" class="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md animate-shake">
                <!-- {{ authStore.error }} -->
                <p class="text-sm">Incorrect email or password. Try again.</p>
              </div>

              <button 
                type="submit" 
                :disabled="authStore.loading"
                class="w-full border border-gray-600 text-white font-bold py-3 px-4 rounded-full hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
              >
                <svg v-if="authStore.loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ authStore.loading ? 'Signing in...' : 'Sign in' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: ''
})

const handleLogin = async () => {
  const result = await authStore.login(form.value)
  
  if (result.success) {
    router.push('/')
  }
}

const handleGoogleSignUp = async () => {
  const result = await authStore.googleSignUp()
  
  if (result.success) {
    router.push('/')
  }
}
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}

.animate-fade-in-delay-1 {
  animation: fade-in 0.8s ease-out 0.2s both;
}

.animate-fade-in-delay-2 {
  animation: fade-in 0.8s ease-out 0.4s both;
}

.animate-fade-in-delay-3 {
  animation: fade-in 0.8s ease-out 0.6s both;
}

.animate-fade-in-delay-4 {
  animation: fade-in 0.8s ease-out 0.8s both;
}

.animate-fade-in-delay-5 {
  animation: fade-in 0.8s ease-out 1s both;
}

.animate-slide-up {
  animation: slide-up 0.8s ease-out;
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}
</style>