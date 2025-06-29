<template>
     <!-- Header -->
    <header class="bg-[#121212] border-b border-[#333333] sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-sky-300 to-cyan-500">
              <router-link to="/">
                <img src="/images/icons/golang_mascot.png" alt="Website Icons">
              </router-link>
            </div>
            <h1 class="text-xl font-bold text-[#F5F5F5]">Go-Connect</h1>
          </div>

          <!-- Search Bar (Desktop) -->
          <div class="hidden md:block flex-1 max-w-md mx-8">
            <div class="relative">
              <input 
                type="search" 
                placeholder="Search Go-Connect"
                class="w-full bg-[#1A1A1A] border border-[#333333] rounded-full py-2 px-4 pl-10 text-[#F5F5F5] placeholder-gray-200/20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              >
              <svg class="absolute left-3 top-2.5 h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
              </svg>
            </div>
          </div>

          <!-- User Menu -->
          <div class="flex items-center space-x-4">
            <div class="hidden md:flex items-center space-x-2">
              <span class="text-gray-300 text-sm">{{ authStore.user?.full_name }}</span>
            </div>
            <div class="relative">
              <router-link to="/profile" class="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-600 hover:border-blue-500 transition-colors block">
                <img src="https://via.placeholder.com/32" alt="Profile" class="w-full h-full object-cover">
              </router-link>
            </div>
            <button 
              @click="handleLogout"
              class="text-gray-300 hover:text-[#F5F5F5] p-2 rounded-full hover:bg-[#1A1A1A] transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>