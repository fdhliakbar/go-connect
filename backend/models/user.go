package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
    ID        uint           `json:"id" gorm:"primaryKey"`
    Username  string         `json:"username" gorm:"uniqueIndex;not null"`
    Email     string         `json:"email" gorm:"uniqueIndex;not null"`
    Password  string         `json:"-" gorm:"not null"` // Hidden from JSON
    FullName  string         `json:"full_name"`
    Bio       string         `json:"bio"`
    Avatar    string         `json:"avatar"`
    Banner    string         `json:"banner"`
    Location  string         `json:"location"`
    Website   string         `json:"website"`
    IsActive  bool           `json:"is_active" gorm:"default:true"`
    CreatedAt time.Time      `json:"created_at"`
    UpdatedAt time.Time      `json:"updated_at"`
    DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`
    GoogleID  string         `json:"google_id" gorm:"unique"`
}

type LoginRequest struct {
    Email    string `json:"email" binding:"required,email"`
    Password string `json:"password" binding:"required,min=6"`
}

type RegisterRequest struct {
    Username string `json:"username" binding:"required,min=3,max=30"`
    Email    string `json:"email" binding:"required,email"`
    Password string `json:"password" binding:"required,min=6"`
    FullName string `json:"full_name" binding:"required"`
}

type UserResponse struct {
    ID       uint   `json:"id"`
    Username string `json:"username"`
    Email    string `json:"email"`
    FullName string `json:"full_name"`
    Bio      string `json:"bio"`
    Avatar   string `json:"avatar"`
    Banner   string `json:"banner"`
    Location string `json:"location"`
    Website  string `json:"website"`
}

type AuthResponse struct {
    User         UserResponse `json:"user"`
    Token        string       `json:"token"`
    RefreshToken string       `json:"refresh_token"`
}