<!-- filepath: e:\Github-Database\go-connect\frontend\src\views\Home.vue -->
<template>
  <div class="min-h-screen bg-[#121212] text-[#F5F5F5]">
    <!-- Header -->
    <header class="bg-[#121212] border-b border-[#333333] sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-sky-300 to-cyan-500">
              <img src="/images/icons/golang_mascot.png" alt="Website Icons">
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

    <div class="max-w-7xl mx-auto flex">
      <!-- Left Sidebar -->
      <aside class="hidden lg:block w-64 p-4 sticky top-16 h-screen overflow-y-auto">
        <nav class="space-y-2">
          <!-- User Profile -->
          <router-link to="/profile" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#1A1A1A] transition-colors cursor-pointer">
            <img src="https://via.placeholder.com/40" alt="Profile" class="w-10 h-10 rounded-full">
            <span class="font-medium">Muhamad Fadhli Akbar</span>
          </router-link>

          <!-- Navigation Items -->
          <div class="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#1A1A1A] transition-colors cursor-pointer">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
            </svg>
            <span>Feed</span>
          </div>

          <div class="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#1A1A1A] transition-colors cursor-pointer">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"/>
            </svg>
            <span>Friends</span>
          </div>

          <div class="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#1A1A1A] transition-colors cursor-pointer">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"/>
            </svg>
            <span>Community</span>
          </div>

          <div class="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#1A1A1A] transition-colors cursor-pointer">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"/>
            </svg>
            <span>Watch Videos</span>
          </div>

          <div class="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#1A1A1A] transition-colors cursor-pointer">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/>
            </svg>
            <span>Photos</span>
          </div>

          <div class="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#1A1A1A] transition-colors cursor-pointer">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"/>
            </svg>
            <span>Notifications</span>
          </div>

          <div class="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#1A1A1A] transition-colors cursor-pointer">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.016A3.001 3.001 0 0 0 20.25 8.734V8.25m0 0V7.5c0-.66-.52-1.2-1.16-1.2-.87 0-1.6.72-1.6 1.6v1.8m0 0v.3c0 .88-.72 1.6-1.6 1.6-.88 0-1.6-.72-1.6-1.6V8.25M5.25 7.5c0-.66-.52-1.2-1.16-1.2-.87 0-1.6.72-1.6 1.6v1.8m0 0v.3c0 .88-.72 1.6-1.6 1.6-.88 0-1.6-.72-1.6-1.6V8.25"/>
            </svg>
            <span>Marketplace</span>
          </div>
        </nav>

        <!-- Pages You Like Section -->
        <div class="mt-8">
          <h3 class="text-gray-400 font-medium mb-4 px-3">Pages You Like</h3>
          <div class="space-y-2">
            <div class="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#1A1A1A] transition-colors cursor-pointer">
              <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <img src="/images/icons/capybara-icons.png" alt="Icons">
              </div>
              <span class="text-sm">Capybara Community</span>
              <span class="ml-auto text-xs bg-cyan-500 text-[#F5F5F5] px-2 py-1 font-bold rounded-full">120</span>
            </div>
            <div class="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#1A1A1A] transition-colors cursor-pointer">
              <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <img src="/images/icons/yui1.jpeg" alt="Icons">
              </div>
              <span class="text-sm">Otaku Tech</span>
            </div>
            <div class="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#1A1A1A] transition-colors cursor-pointer">
              <div class="w-8 h-8 bg-sky-300 rounded-full flex items-center justify-center">
                <img src="/images/icons/golang_mascot.png" alt="">
              </div>
              <span class="text-sm">Golang Dev</span>
            </div>
            
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 min-h-screen">
        <div class="max-w-2xl mx-auto p-4">
        </div>
      </main>

      <!-- Right Sidebar -->
      <aside class="hidden xl:block w-80 p-4 sticky top-16 h-screen overflow-y-auto">
        <!-- Sponsored Stories -->
        <div class="mb-6">
          <h3 class="text-gray-400 font-medium mb-4">Sponsored Stories</h3>
          <div class="space-y-3">
            <div class="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#1A1A1A] transition-colors cursor-pointer">
              <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.5v15m7.5-7.5h-15"/>
                </svg>
              </div>
              <div>
                <div class="text-sm font-medium text-[#F5F5F5]">Create Your Story</div>
                <div class="text-xs text-gray-400">Click action button to create yours</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Events -->
        <div class="mb-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-gray-400 font-medium">Events</h3>
            
          </div>
          <div class="space-y-3">
            <div class="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#1A1A1A] transition-colors cursor-pointer">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"/>
              </svg>
              <div>
                <div class="text-sm font-medium text-[#F5F5F5]">10 Events Invites</div>
              </div>
            </div>
            <div class="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#1A1A1A] transition-colors cursor-pointer">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
              </svg>
              <div>
                <div class="text-sm font-medium text-[#F5F5F5]">Prodot's Invitation Birthday</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Suggested Pages -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-gray-400 font-medium">Suggested Pages</h3>
            
          </div>
          <div class="space-y-3">
            <div class="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#1A1A1A] transition-colors cursor-pointer">
              <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span class="text-sm font-bold text-[#F5F5F5]">SS</span>
              </div>
              <div class="flex-1">
                <div class="text-sm font-medium text-[#F5F5F5]">Sebo Studio</div>
                <div class="text-xs text-gray-400">Design Agency</div>
              </div>
              <button class="text-[#F5F5F5] text-sm hover:underline">Like</button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
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

<style scoped>
/* Custom scrollbar for sidebar */
aside::-webkit-scrollbar {
  width: 6px;
}

aside::-webkit-scrollbar-track {
  background: #374151;
}

aside::-webkit-scrollbar-thumb {
  background: #6B7280;
  border-radius: 3px;
}

aside::-webkit-scrollbar-thumb:hover {
  background: #9CA3AF;
}
</style>