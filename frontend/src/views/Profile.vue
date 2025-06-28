<!-- filepath: e:\Github-Database\go-connect\frontend\src\views\Profile.vue -->
<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <router-link to="/" class="text-blue-600 hover:text-blue-800 mr-4">
              ← Back to Home
            </router-link>
            <h1 class="text-xl font-semibold text-gray-900">Profile</h1>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="bg-white shadow rounded-lg p-6">
        <form @submit.prevent="handleUpdateProfile" class="space-y-6">
          <div>
            <label for="full_name" class="block text-sm font-medium text-gray-700">Full Name</label>
            <input 
              id="full_name" 
              name="full_name" 
              type="text" 
              v-model="form.full_name"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
          </div>

          <div>
            <label for="bio" class="block text-sm font-medium text-gray-700">Bio</label>
            <textarea 
              id="bio" 
              name="bio" 
              rows="3"
              v-model="form.bio"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Tell us about yourself..."
            ></textarea>
          </div>

          <div>
            <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
            <input 
              id="location" 
              name="location" 
              type="text" 
              v-model="form.location"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Your location"
            >
          </div>

          <div>
            <label for="website" class="block text-sm font-medium text-gray-700">Website</label>
            <input 
              id="website" 
              name="website" 
              type="url" 
              v-model="form.website"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="https://yourwebsite.com"
            >
          </div>

          <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {{ error }}
          </div>

          <div v-if="success" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            Profile updated successfully!
          </div>

          <div>
            <button 
              type="submit" 
              :disabled="authStore.loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {{ authStore.loading ? 'Updating...' : 'Update Profile' }}
            </button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const error = ref('')
const success = ref(false)

const form = ref({
  full_name: '',
  bio: '',
  location: '',
  website: ''
})

onMounted(() => {
  // Initialize form with current user data
  if (authStore.user) {
    form.value = {
      full_name: authStore.user.full_name || '',
      bio: authStore.user.bio || '',
      location: authStore.user.location || '',
      website: authStore.user.website || ''
    }
  }
})

const handleUpdateProfile = async () => {
  error.value = ''
  success.value = false
  
  const result = await authStore.updateProfile(form.value)
  
  if (result.success) {
    success.value = true
    setTimeout(() => {
      success.value = false
    }, 3000)
  } else {
    error.value = result.error
  }
}
</script>