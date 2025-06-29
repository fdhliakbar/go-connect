# Profile Update Documentation

## 🎨 Profile Page Enhancement

### ✨ Frontend Changes (Vue.js + Tailwind CSS)

#### Enhanced Profile.vue Features:
1. **Beautiful Profile Header**
   - Gradient banner with upload functionality
   - Large circular avatar with upload button
   - User info display (name, username, bio)

2. **Interactive Upload System**
   - Click-to-upload for both avatar and banner
   - Real-time image preview
   - Camera icons for better UX

3. **Modern Card Layout**
   - Clean white cards with shadows
   - Proper spacing and typography
   - Responsive design

### 🔧 Backend Changes (Go + GORM)

#### Database Schema Update:
```go
type User struct {
    // ... existing fields ...
    Banner   string `json:"banner"`  // NEW FIELD
    // ... other fields ...
}
```

#### API Updates:
- **GET** `/api/profile` - Now returns banner field
- **PUT** `/api/profile` - Now accepts banner field
- **POST** `/api/auth/google/callback` - Now returns banner field

### 🗄️ Database Migration

The `banner` field will be automatically added to your `users` table when you restart the backend thanks to GORM's AutoMigrate feature.

### 🚀 How to Use

1. **Start Backend:**
   ```bash
   cd backend
   go run main.go
   ```

2. **Start Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access Profile:**
   - Navigate to `/profile` 
   - Click camera icons to upload avatar/banner
   - Fill in profile information
   - Click "Update Profile"

### 🔐 Google OAuth Setup

1. **Google Cloud Console:**
   - Create project and enable Google+ API
   - Create OAuth 2.0 credentials
   - Set redirect URI: `http://localhost:3000/google-callback.html`

2. **Environment Variables:**
   ```bash
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

### 📱 UI/UX Features

- **Profile Header**: Beautiful gradient banner with overlay
- **Avatar Upload**: Circular avatar with camera icon
- **Form Layout**: Clean, accessible form design
- **Loading States**: Proper loading indicators
- **Error Handling**: User-friendly error messages
- **Success Feedback**: Confirmation messages

### 🎯 API Endpoints

- `GET /api/auth/google/url` - Get Google OAuth URL
- `POST /api/auth/google/callback` - Handle Google OAuth callback
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile

### 🏗️ Project Structure

```
backend/
├── models/user.go          # Updated with banner field
├── handlers/auth.go        # Updated profile handlers
├── routes/auth.go          # Google OAuth routes
└── main.go                 # Added Google OAuth routes

frontend/
├── views/Profile.vue       # Enhanced profile page
├── stores/auth.js          # Auth state management
└── components/
    ├── LeftSection.vue     # Navigation sidebar
    └── MainHeader.vue      # App header
```

### 🔄 Profile Update Flow

1. User uploads avatar/banner → Preview shows immediately
2. User fills profile form → Real-time form validation
3. User clicks "Update Profile" → Loading state shown
4. Backend processes request → Database updated
5. Success message shown → UI refreshed with new data

### 📝 Notes

- Images are currently handled as base64 for preview
- TODO: Implement proper file upload to cloud storage
- Database migration is automatic with GORM
- Google OAuth requires proper environment setup
