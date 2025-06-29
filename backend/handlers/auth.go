// filepath: e:\Github-Database\go-connect\backend\handlers\auth.go
package handlers

import (
	"go-connect/config"
	"go-connect/models"
	"go-connect/utils"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func Register(c *gin.Context) {
    var req models.RegisterRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // Check if user already exists
    var existingUser models.User
    if err := config.DB.Where("email = ? OR username = ?", req.Email, req.Username).First(&existingUser).Error; err == nil {
        if existingUser.Email == req.Email {
            c.JSON(http.StatusConflict, gin.H{"error": "Email already registered"})
            return
        }
        if existingUser.Username == req.Username {
            c.JSON(http.StatusConflict, gin.H{"error": "Username already taken"})
            return
        }
    }

    // Hash password
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
        return
    }

    // Create user
    user := models.User{
        Username: req.Username,
        Email:    req.Email,
        Password: string(hashedPassword),
        FullName: req.FullName,
        IsActive: true,
    }

    if err := config.DB.Create(&user).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
        return
    }

    // Generate tokens
    token, err := utils.GenerateToken(user.ID, user.Username, user.Email)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
        return
    }

    refreshToken, err := utils.GenerateRefreshToken(user.ID, user.Username, user.Email)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate refresh token"})
        return
    }

    // Return response
    userResponse := models.UserResponse{
        ID:       user.ID,
        Username: user.Username,
        Email:    user.Email,
        FullName: user.FullName,
        Bio:      user.Bio,
        Avatar:   user.Avatar,
        Banner:   user.Banner,
        Location: user.Location,
        Website:  user.Website,
    }

    response := models.AuthResponse{
        User:         userResponse,
        Token:        token,
        RefreshToken: refreshToken,
    }

    c.JSON(http.StatusCreated, gin.H{
        "message": "User registered successfully",
        "data":    response,
    })
}

func Login(c *gin.Context) {
    var req models.LoginRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // Find user
    var user models.User
    if err := config.DB.Where("email = ?", req.Email).First(&user).Error; err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
        return
    }

    // Check password
    if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
        return
    }

    // Check if user is active
    if !user.IsActive {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Account is deactivated"})
        return
    }

    // Generate tokens
    token, err := utils.GenerateToken(user.ID, user.Username, user.Email)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
        return
    }

    refreshToken, err := utils.GenerateRefreshToken(user.ID, user.Username, user.Email)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate refresh token"})
        return
    }

    // Return response
    userResponse := models.UserResponse{
        ID:       user.ID,
        Username: user.Username,
        Email:    user.Email,
        FullName: user.FullName,
        Bio:      user.Bio,
        Avatar:   user.Avatar,
        Location: user.Location,
        Website:  user.Website,
    }

    response := models.AuthResponse{
        User:         userResponse,
        Token:        token,
        RefreshToken: refreshToken,
    }

    c.JSON(http.StatusOK, gin.H{
        "message": "Login successful",
        "data":    response,
    })
}

func RefreshToken(c *gin.Context) {
    authHeader := c.GetHeader("Authorization")
    if authHeader == "" {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header required"})
        return
    }

    tokenString := strings.Replace(authHeader, "Bearer ", "", 1)
    claims, err := utils.ValidateToken(tokenString)
    if err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
        return
    }

    // Generate new tokens
    newToken, err := utils.GenerateToken(claims.UserID, claims.Username, claims.Email)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
        return
    }

    newRefreshToken, err := utils.GenerateRefreshToken(claims.UserID, claims.Username, claims.Email)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate refresh token"})
        return
    }

    c.JSON(http.StatusOK, gin.H{
        "token":         newToken,
        "refresh_token": newRefreshToken,
    })
}

func GetProfile(c *gin.Context) {
    userID, exists := c.Get("userID")
    if !exists {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
        return
    }

    var user models.User
    if err := config.DB.First(&user, userID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
        return
    }

    userResponse := models.UserResponse{
        ID:       user.ID,
        Username: user.Username,
        Email:    user.Email,
        FullName: user.FullName,
        Bio:      user.Bio,
        Avatar:   user.Avatar,
        Banner:   user.Banner,
        Location: user.Location,
        Website:  user.Website,
    }

    c.JSON(http.StatusOK, gin.H{"data": userResponse})
}

func UpdateProfile(c *gin.Context) {
    userID, exists := c.Get("userID")
    if !exists {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
        return
    }

    var user models.User
    if err := config.DB.First(&user, userID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
        return
    }

    var updateData struct {
        FullName string `json:"full_name"`
        Bio      string `json:"bio"`
        Avatar   string `json:"avatar"`
        Banner   string `json:"banner"`
        Location string `json:"location"`
        Website  string `json:"website"`
    }

    if err := c.ShouldBindJSON(&updateData); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // Update user
    updates := map[string]interface{}{
        "full_name": updateData.FullName,
        "bio":       updateData.Bio,
        "avatar":    updateData.Avatar,
        "banner":    updateData.Banner,
        "location":  updateData.Location,
        "website":   updateData.Website,
    }

    if err := config.DB.Model(&user).Updates(updates).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update profile"})
        return
    }

    // Reload user data
    config.DB.First(&user, userID)

    userResponse := models.UserResponse{
        ID:       user.ID,
        Username: user.Username,
        Email:    user.Email,
        FullName: user.FullName,
        Bio:      user.Bio,
        Avatar:   user.Avatar,
        Banner:   user.Banner,
        Location: user.Location,
        Website:  user.Website,
    }

    c.JSON(http.StatusOK, gin.H{
        "message": "Profile updated successfully",
        "data":    userResponse,
    })
}

func Logout(c *gin.Context) {
    // In a more sophisticated setup, you might want to blacklist the token
    c.JSON(http.StatusOK, gin.H{"message": "Logged out successfully"})
}