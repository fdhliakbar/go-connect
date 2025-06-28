<template>
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
</template>