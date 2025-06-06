package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"github.com/josevitorrodriguess/any-song/backend/internal/api"
	"github.com/josevitorrodriguess/any-song/backend/internal/storage/postgres"
)

func main() {
	godotenv.Load()
	app := fiber.New()

	db := postgres.ConnectDatabase()

	api := api.InitApi(db, app)
	api.Router = app

	api.SetupRoutes()

	if err := app.Listen(":8000"); err != nil {
		panic("Failed to start server: " + err.Error())
	}

}
