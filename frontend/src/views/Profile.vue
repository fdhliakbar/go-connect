<template>
  <!-- Header from Components -->
  <MainHeader />

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8 bg-[#121212]">
      <!-- Profile Header Card -->
      <div class="bg-[#1c1c1c] shadow rounded-lg overflow-hidden mb-6">
        <!-- Banner Section -->
        <div class="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
          <img 
            v-if="form.banner" 
            :src="form.banner" 
            alt="Banner" 
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-black bg-opacity-30"></div>
          
          <!-- Banner Upload Button -->
          <div class="absolute top-4 right-4">
            <label for="banner-upload" @click="console.log('Banner label clicked')" class="bg-black bg-opacity-50 hover:bg-opacity-70 text-white px-3 py-2 rounded-lg cursor-pointer transition-all">
              <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              Edit Banner
            </label>
            <input 
              id="banner-upload" 
              type="file" 
              accept="image/*" 
              @change="handleBannerUpload"
              @click="console.log('Banner input clicked')"
              class="hidden"
            />
          </div>
        </div>

        <!-- Profile Info Section -->
        <div class="relative px-6 pb-6">
          <!-- Avatar -->
          <div class="flex items-end -mt-16 mb-4">
            <div class="relative">
              <div class="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200">
                <img 
                  v-if="form.avatar || authStore.user?.avatar" 
                  :src="form.avatar || authStore.user?.avatar" 
                  :alt="form.full_name || 'Profile'"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full flex items-center justify-center text-[#F5F5F5]">
                  <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              
              <!-- Avatar Upload Button -->
              <label for="avatar-upload" @click="console.log('Avatar label clicked')" class="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer shadow-lg transition-all">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0118.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </label>
              <input 
                id="avatar-upload" 
                type="file" 
                accept="image/*" 
                @change="handleAvatarUpload"
                @click="console.log('Avatar input clicked')"
                class="hidden"
              />
            </div>
            
            <div class="ml-6 pb-2">
              <h1 class="text-2xl font-bold text-[#F5F5F5]">
                {{ form.full_name || authStore.user?.full_name || 'Your Name' }}
              </h1>
              <p class="text-[#F5F5F5]">@{{ authStore.user?.username || 'username' }}</p>
              <p v-if="form.bio" class="text-[#F5F5F5] mt-2">{{ form.bio }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Edit Profile Form Card -->
      <div class="bg-[#1c1c1c] shadow rounded-lg p-6">
        <div class="flex items-center mb-6">
          <svg class="w-6 h-6 text-[#F5F5F5] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
          <h2 class="text-xl font-semibold text-[#F5F5F5]">Edit Profile</h2>
        </div>
        
        <form @submit.prevent="handleUpdateProfile" class="space-y-6">
          <div>
            <label for="full_name" class="block text-sm font-medium text-[#F5F5F5]">Full Name</label>
            <input 
              id="full_name" 
              name="full_name" 
              type="text" 
              v-model="form.full_name"
              class="mt-1 block w-full px-3 py-2 border text-[#8A8A8A] border-[#333333] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
          </div>

          <div>
            <label for="bio" class="block text-sm font-medium text-[#F5F5F5]">Bio</label>
            <textarea 
              id="bio" 
              name="bio" 
              rows="3"
              v-model="form.bio"
              class="mt-1 block w-full px-3 py-2 border text-white border-[#333333] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Tell us about yourself..."
            ></textarea>
          </div>

          <div>
            <label for="location" class="block text-sm font-medium text-[#F5F5F5]">Location</label>
            <input 
              id="location" 
              name="location" 
              type="text" 
              v-model="form.location"
              class="mt-1 block w-full px-3 py-2 border text-[#8A8A8A] border-[#333333] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Your location"
            >
          </div>

          <div>
            <label for="website" class="block text-sm font-medium text-[#F5F5F5]">Website</label>
            <input 
              id="website" 
              name="website" 
              type="url" 
              v-model="form.website"
              class="mt-1 block w-full px-3 py-2 border text-[#8A8A8A] border-[#333333] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
</template>

<script setup>
import MainHeader from '@/components/MainHeader.vue'
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth_supabase'
import { createClient } from '@supabase/supabase-js'

const authStore = useAuthStore()
const error = ref('')
const success = ref(false)

const form = ref({
  full_name: '',
  bio: '',
  location: '',
  website: '',
  avatar: '',
  banner: ''
})

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

// Debug: cek apakah env variables terbaca
console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key:', supabaseKey ? 'Key loaded' : 'Key not found')
console.log('Full Supabase Key:', supabaseKey)

// Pastikan env variables ada sebelum membuat client
if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials!')
}

const supabase = createClient(supabaseUrl, supabaseKey)


onMounted(() => {
  // Initialize form with current user data
  if (authStore.user) {
    form.value = {
      full_name: authStore.user.full_name || '',
      bio: authStore.user.bio || '',
      location: authStore.user.location || '',
      website: authStore.user.website || '',
      avatar: authStore.user.avatar || '',
      banner: authStore.user.banner || ''
    }
  }
})

const handleAvatarUpload = async (event) => {
  console.log('Avatar upload function called')
  const file = event.target.files[0]
  console.log('Selected file:', file)
  
  if (!file) {
    console.log('No file selected')
    return
  }
  
  if (!authStore.user) {
    console.log('No user found in authStore')
    return
  }
  
  console.log('Uploading avatar:', file.name, 'User ID:', authStore.user.id)
  console.log('File size:', file.size, 'bytes')
  console.log('File type:', file.type)
  
  try {
    // Upload file ke Supabase Storage bucket 'avatars'
    const fileName = `profile-${authStore.user.id}-${Date.now()}.${file.name.split('.').pop()}`
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, { upsert: true })
    
    console.log('Upload response data:', data)
    console.log('Upload response error:', error)
    
    if (!error && data) {
      // Dapatkan public URL dari file yang diupload
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(data.path)
      
      console.log('Avatar uploaded successfully, URL:', publicUrl)
      
      // Update form dengan URL baru
      form.value.avatar = publicUrl
      
      // Langsung update ke database juga
      const { error: updateError } = await supabase
        .from('users')
        .update({ avatar: publicUrl })
        .eq('id', authStore.user.id)
        
      if (!updateError) {
        console.log('Avatar URL updated in database')
        // Update local user data
        if (authStore.user) {
          authStore.user.avatar = publicUrl
        }
      } else {
        console.error('Failed to update avatar URL in database:', updateError)
      }
      
    } else {
      console.error('Avatar upload error:', error)
      error.value = 'Failed to upload avatar: ' + (error?.message || 'Unknown error')
    }
  } catch (err) {
    console.error('Exception during upload:', err)
    error.value = 'Upload failed: ' + err.message
  }
}

const handleBannerUpload = async (event) => {
  console.log('Banner upload function called')
  const file = event.target.files[0]
  console.log('Selected file:', file)
  
  if (!file) {
    console.log('No file selected')
    return
  }
  
  if (!authStore.user) {
    console.log('No user found in authStore')
    return
  }
  
  console.log('Uploading banner:', file.name, 'User ID:', authStore.user.id)
  console.log('File size:', file.size, 'bytes')
  console.log('File type:', file.type)
  
  try {
    // Upload file ke Supabase Storage bucket 'banners'
    const fileName = `banner-${authStore.user.id}-${Date.now()}.${file.name.split('.').pop()}`
    const { data, error } = await supabase.storage
      .from('banners')
      .upload(fileName, file, { upsert: true })
    
    console.log('Upload response data:', data)
    console.log('Upload response error:', error)
    
    if (!error && data) {
      // Dapatkan public URL dari file yang diupload
      const { data: { publicUrl } } = supabase.storage
        .from('banners')
        .getPublicUrl(data.path)
      
      console.log('Banner uploaded successfully, URL:', publicUrl)
      
      // Update form dengan URL baru
      form.value.banner = publicUrl
      
      // Langsung update ke database juga
      const { error: updateError } = await supabase
        .from('users')
        .update({ banner: publicUrl })
        .eq('id', authStore.user.id)
        
      if (!updateError) {
        console.log('Banner URL updated in database')
        // Update local user data
        if (authStore.user) {
          authStore.user.banner = publicUrl
        }
      } else {
        console.error('Failed to update banner URL in database:', updateError)
      }
      
    } else {
      console.error('Banner upload error:', error)
      error.value = 'Failed to upload banner: ' + (error?.message || 'Unknown error')
    }
  } catch (err) {
    console.error('Exception during upload:', err)
    error.value = 'Upload failed: ' + err.message
  }
}

const handleUpdateProfile = async () => {
  error.value = ''
  success.value = false

  try {
    // Update langsung ke tabel 'users' di Supabase PostgreSQL
    const { error: updateError } = await supabase
      .from('users')
      .update({
        full_name: form.value.full_name,
        bio: form.value.bio,
        location: form.value.location,
        website: form.value.website,
        avatar: form.value.avatar,
        banner: form.value.banner
      })
      .eq('id', authStore.user.id)

    if (!updateError) {
      success.value = true
      setTimeout(() => {
        success.value = false
      }, 3000)
      // Update local user data
      Object.assign(authStore.user, form.value)
      console.log('Profile updated successfully in Supabase')
    } else {
      console.error('Update error:', updateError)
      error.value = 'Failed to update profile: ' + updateError.message
    }
  } catch (err) {
    console.error('Exception during profile update:', err)
    error.value = 'Update failed: ' + err.message
  }
}
</script>