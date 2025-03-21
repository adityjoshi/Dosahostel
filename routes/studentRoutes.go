package routes

import (
	"github.com/adityjoshi/Dosahostel/controllers"
	"github.com/adityjoshi/Dosahostel/middleware"

	"github.com/gin-gonic/gin"
)

func StudentRoutes(incomingRoutes *gin.Engine) {
	incomingRoutes.POST("/student/register", controllers.StudentRegistration)
	incomingRoutes.GET("/student/login", controllers.StudentLogin)
	incomingRoutes.POST("/student/complaint", middleware.AuthorizeStudent(), controllers.PostComplaint)
}
