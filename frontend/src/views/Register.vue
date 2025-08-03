<!-- filepath: e:\Github-Database\go-connect\frontend\src\views\Register.vue -->
<template>
  <transition name="fade">
    <div class="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8 bg-[#1a1a1a] rounded-xl shadow-lg p-8 animate__animated animate__fadeInDown">
        <div class="flex flex-col items-center">
          <img src="/images/icons/golang_mascot.png" alt="Golang Mascot" class="h-20 w-20 mb-4">
          <h2 class="mt-2 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            Or
            <router-link to="/login" class="font-medium text-blue-600 hover:text-blue-500">
              sign in to your existing account
            </router-link>
          </p>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
          <div class="space-y-4">
            <div>
              <label for="full_name" class="block text-sm font-medium text-[#EAEAEA]">Full Name</label>
              <input 
                id="full_name" 
                name="full_name" 
                type="text" 
                required 
                v-model="form.full_name"
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                placeholder="John Doe"
              >
            </div>
            <div>
              <label for="username" class="block text-sm font-medium text-[#EAEAEA]">Username</label>
              <input 
                id="username" 
                name="username" 
                type="text" 
                required 
                v-model="form.username"
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                placeholder="johndoe"
              >
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-[#EAEAEA]">Email</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                autocomplete="email" 
                required 
                v-model="form.email"
                @blur="validateEmail"
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                placeholder="john@example.com"
              >
              <p v-if="emailError" class="text-xs text-red-500 mt-1">{{ emailError }}</p>
            </div>
            <div>
              <label for="password" class="block text-sm font-medium text-[#EAEAEA]">Password</label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                autocomplete="new-password" 
                required 
                v-model="form.password"
                @input="validatePassword"
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                placeholder="Password (min. 8 karakter, huruf besar, kecil, angka & simbol)"
              >
              <p v-if="passwordError" class="text-xs text-red-500 mt-1">{{ passwordError }}</p>
            </div>
          </div>
          <ul class="text-xs text-gray-500 mt-2 list-disc pl-5">
            <li>Password must be at least 8 characters long</li>
            <li>Passwords must contain uppercase letters, lowercase letters, numbers, and unique symbols.</li>
            <li>Email must be valid</li>
          </ul>
          <div v-if="authStore.error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {{ authStore.error }}
          </div>
          <div>
            <button 
              type="submit" 
              :disabled="authStore.loading || passwordError || emailError"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg v-if="authStore.loading" class="animate-spin h-5 w-5 text-green-300" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg v-else class="h-5 w-5 text-green-500 group-hover:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                </svg>
              </span>
              {{ authStore.loading ? 'Creating account...' : 'Create account' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  full_name: '',
  username: '',
  email: '',
  password: ''
})

const passwordError = ref('')
const emailError = ref('')

function validatePassword() {
  const value = form.value.password
  // Minimal 8 karakter, huruf besar, kecil, angka, simbol
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/
  if (!regex.test(value)) {
    passwordError.value = 'Passwords must contain uppercase letters, lowercase letters, numbers, and unique symbols.'
  } else {
    passwordError.value = ''
  }
}

function validateEmail() {
  const value = form.value.email
  // Email regex sederhana
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
  if (!regex.test(value)) {
    emailError.value = 'Invalid email format.'
  } else {
    emailError.value = ''
  }
}

const handleRegister = async () => {
  validatePassword()
  validateEmail()
  if (passwordError.value || emailError.value) return
  const result = await authStore.register(form.value)
  if (result.success) {
    router.push('/')
  }
}
</script>

<style scoped>
@import 'animate.css';
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>