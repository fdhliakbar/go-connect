# Go-Connect 🚀

<div align="center">
  <img src="https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white" alt="Go" />
  <img src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D" alt="Vue.js" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
</div>

<div align="center">
  <h3>Modern Social Media Platform</h3>
  <p>A full-stack social media application built with Go backend and Vue.js frontend</p>
</div>

```
  ________          ______                            __
 /  _____/  ____   /      \   ____   ____   ____   _/  |_
/   \  ___ /  _ \ /   |   \ /  _ \ /    \ /    \ /  _ \   __\
\    \_\  (  <_> )    |    (  <_> )   |  \   |  \  <_> )  |
 \______  /\____/ \____|__  /\____/|___|  /___|  /\____/|__|
        \/                \/            \/     \/
```

## ✨ Features

### 🔐 Authentication & User Management
- [x] User Registration & Login
- [x] JWT-based Authentication
- [x] Profile Management
- [x] Password Reset

### 📱 Core Social Features
- [x] Create Posts with:
  - 📝 Text Content
  - 🖼️ Image Upload
  - 🎥 Video Upload
  - 🏷️ Hashtags
  - 📍 Location Tagging
  - 👥 User Mentions (@username)
- [x] Feed Timeline
- [x] Like & Comment System
- [x] Follow/Unfollow Users
- [x] Real-time Notifications

## 🏗️ Project Structure

```
go-connect/
├── backend/
│   ├── main.go
│   ├── handlers/
│   │   ├── auth.go
│   │   ├── posts.go
│   │   ├── users.go
│   │   └── media.go
│   ├── models/
│   │   ├── user.go
│   │   ├── post.go
│   │   └── comment.go
│   ├── middleware/
│   │   ├── auth.go
│   │   ├── cors.go
│   │   └── ratelimit.go
│   ├── config/
│   │   └── database.go
│   ├── utils/
│   │   ├── jwt.go
│   │   ├── upload.go
│   │   └── response.go
│   └── migrations/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── post/
│   │   │   └── user/
│   │   ├── views/
│   │   │   ├── Home.vue
│   │   │   ├── Login.vue
│   │   │   ├── Register.vue
│   │   │   └── Profile.vue
│   │   ├── router/
│   │   ├── stores/
│   │   └── utils/
│   ├── public/
│   └── package.json
├── uploads/
├── go.mod
├── go.sum
├── docker-compose.yml
└── README.md
```

## 📱 Screenshots

### Desktop View
```
┌─────────────────────────────────────────────────────────────────────┐
│ Go-Connect                                    🔍 Search   👤 Profile │
├─────────────────────────────────────────────────────────────────────┤
│ 🏠 Home    📱 Explore    🔔 Notifications    💬 Messages             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │ What's on your mind? 📝                                     │    │
│  │ ────────────────────────────────────────────────────────── │    │
│  │ 📷 Photo   🎥 Video   📍 Location   #️⃣ Hashtag             │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │ 👤 @username • 2 hours ago • 📍 Jakarta                    │    │
│  │ This is a sample post content... #golang #vue              │    │
│  │ [📷 Image]                                                  │    │
│  │ ❤️ 42    💬 12    🔄 5    📤 Share                          │    │
│  └─────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
```

### Mobile View
```
┌─────────────────────────┐
│ Go-Connect       🔍 👤  │
├─────────────────────────┤
│ What's on your mind? 📝 │
│ ─────────────────────── │
│ 📷 🎥 📍 #️⃣            │
├─────────────────────────┤
│ 👤 @username • 2h       │
│ Sample post... #golang  │
│ [📷 Image]              │
│ ❤️ 42  💬 12  🔄 5      │
├─────────────────────────┤
│ 🏠 📱 🔔 💬 👤          │
└─────────────────────────┘
```

## 🔧 Development Roadmap

### Phase 1: Core Features ✅
- [x] User Authentication
- [x] Basic Post Creation
- [x] Image Upload
- [x] Responsive Design

### Phase 2: Social Features 🚧
- [ ] Comments System
- [ ] Like/Unlike Posts
- [ ] Follow/Unfollow Users
- [ ] User Mentions (@username)

### Phase 3: Advanced Features 📋
- [ ] Real-time Chat
- [ ] Push Notifications
- [ ] Video Upload & Streaming
- [ ] Stories Feature
- [ ] Advanced Search

### Phase 4: Optimization 📈
- [ ] Performance Optimization
- [ ] Caching Strategy
- [ ] Mobile App (React Native)
- [ ] Analytics Dashboard

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 API Documentation

### Authentication Endpoints
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
```

### User Endpoints
```
GET /api/users/profile
PUT /api/users/profile
GET /api/users/:id
POST /api/users/:id/follow
DELETE /api/users/:id/unfollow
```

### Post Endpoints
```
GET /api/posts
POST /api/posts
GET /api/posts/:id
PUT /api/posts/:id
DELETE /api/posts/:id
POST /api/posts/:id/like
POST /api/posts/:id/comment
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Muhamad Fadhli Akbar**
- Website: [@fdhliakbar](https://fdhliakbar.vercel.app)
- Email: fadhliakbar125@gmail.com

## 🙏 Acknowledgments

- Inspired by modern social media platforms
- Built with ❤️ using Go and Vue.js
- Thanks to the open-source community

---

<div align="center">
  <img src="https://i.pinimg.com/736x/55/a9/ab/55a9aba97d1e214f849ab2e55f3dabff.jpg" alt="Go langugae banner" />
  <p>⭐ Star this repo if you find it helpful!</p>
</div>