package api

import (
	"context"

	firebase "firebase.google.com/go/v4"
	"firebase.google.com/go/v4/auth"
	"github.com/gofiber/fiber/v2"
	"github.com/josevitorrodriguess/any-song/backend/internal/config"
	"github.com/josevitorrodriguess/any-song/backend/internal/service"
	"github.com/josevitorrodriguess/any-song/backend/internal/storage/gcs"
	"gorm.io/gorm"
)

type API struct {
	Firebase      *firebase.App
	Auth          *auth.Client
	UserService   *service.UserService
	ArtistService *service.ArtistService
	GCSService    *service.GoogleCloudStorageService
	Router        *fiber.App
}

func InitApi(db *gorm.DB, router *fiber.App) *API {
	app, err := config.GetFireBaseApp()
	if err != nil {
		panic("Failed to initialize Firebase app: " + err.Error())
	}

	authClient, err := app.Auth(context.Background())
	if err != nil {
		panic("Failed to initialize Firebase Auth client: " + err.Error())
	}
	gcsClient, err := gcs.ConnectGoogleCloudStorage()
	if err != nil {
		panic("Failed to connect to Google Cloud Storage: " + err.Error())

	}

	userService := service.NewUserService(db)
	artistService := service.NewArtistService(db)
	gcsService := service.NewGoogleCloudStorageService(gcsClient)

	return &API{
		Firebase:      app,
		Auth:          authClient,
		UserService:   userService,
		ArtistService: artistService,
		GCSService:    gcsService,
		Router:        router,
	}
}
