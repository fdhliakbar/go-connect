package routes

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"net/http"
	"os"
	"strings"

	"go-connect/config"
	"go-connect/models"
	"go-connect/utils"

	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

var googleOauthConfig = &oauth2.Config{
	RedirectURL:  "http://localhost:3000/google-callback.html",
	ClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
	ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
	Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"},
	Endpoint:     google.Endpoint,
}

func SetupAuthRoutes(r *gin.RouterGroup) {
	r.GET("/google/url", getGoogleAuthURL)
	r.POST("/google/callback", handleGoogleCallback)
}

func getGoogleAuthURL(c *gin.Context) {
	// Generate random state
	b := make([]byte, 16)
	rand.Read(b)
	state := base64.URLEncoding.EncodeToString(b)
	
	url := googleOauthConfig.AuthCodeURL(state, oauth2.AccessTypeOffline)
	
	c.JSON(http.StatusOK, gin.H{
		"url":   url,
		"state": state,
	})
}

func handleGoogleCallback(c *gin.Context) {
	var req struct {
		Code  string `json:"code"`
		State string `json:"state"` // Tambahkan state untuk validasi
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	// Exchange code for token
	token, err := googleOauthConfig.Exchange(context.Background(), req.Code)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to exchange code for token"})
		return
	}

	// Get user info (cara alternatif tanpa google api client)
	client := googleOauthConfig.Client(context.Background(), token)
	resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user info"})
		return
	}
	defer resp.Body.Close()

	var userInfo struct {
		ID      string `json:"id"`
		Email   string `json:"email"`
		Name    string `json:"name"`
		Picture string `json:"picture"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&userInfo); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode user info"})
		return
	}

	// Check if user exists
	var user models.User
	result := config.DB.Where("email = ?", userInfo.Email).First(&user)
	
	if result.Error != nil {
		// User doesn't exist, create new user
		username := strings.Split(userInfo.Email, "@")[0]
		if len(username) < 3 {
			username = "user" + userInfo.ID[:4]
		}
		
		user = models.User{
			Username: username,
			FullName: userInfo.Name,
			Email:    userInfo.Email,
			GoogleID: userInfo.ID,
			Avatar:   userInfo.Picture,
			Password: "google_oauth", // Placeholder password for Google users
		}
		
		if err := config.DB.Create(&user).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
			return
		}
	} else {
		// Update user data if needed
		updates := make(map[string]interface{})
		if user.GoogleID == "" {
			updates["google_id"] = userInfo.ID
		}
		if user.Avatar == "" {
			updates["avatar"] = userInfo.Picture
		}
		
		if len(updates) > 0 {
			config.DB.Model(&user).Updates(updates)
		}
	}

	// Generate JWT token
	jwtToken, err := utils.GenerateToken(user.ID, user.Username, user.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token": jwtToken,
		"user": gin.H{
			"id":         user.ID,
			"username":   user.Username,
			"full_name":  user.FullName,
			"email":      user.Email,
			"avatar":     user.Avatar,
			"banner":     user.Banner,
			"created_at": user.CreatedAt,
		},
	})
}