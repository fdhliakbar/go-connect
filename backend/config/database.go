package config

import (
	"go-connect/models"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
    dsn := os.Getenv("DATABASE_URL")
    if dsn == "" {
        // Default connection string for development
        dsn = "host=localhost user=postgres password=password dbname=go_connect port=5432 sslmode=disable TimeZone=Asia/Jakarta"
    }

    var err error
    DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatal("Failed to connect to database:", err)
    }

    // Auto migrate the schema
    err = DB.AutoMigrate(&models.User{})
    if err != nil {
        log.Fatal("Failed to migrate database:", err)
    }

    log.Println("Database connection established")
}