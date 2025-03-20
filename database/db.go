package db

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var (
	bigBoysDB *gorm.DB
	boysOneDB *gorm.DB
)
var err error

func InitDB() {

	// Big Boys Database
	bigBoysDBUser := os.Getenv("DB_BIG_BOYS_USER")
	bigBoysDBPassword := os.Getenv("DB_BIG_BOYS_PASSWORD")
	bigBoysDBHost := os.Getenv("DB_BIG_BOYS_HOST")
	bigBoysDBPort := os.Getenv("DB_BIG_BOYS_PORT")
	bigBoysDBName := os.Getenv("DB_BIG_BOYS_NAME")

	// Boys One Database
	boysOneDBUser := os.Getenv("DB_BOYS_ONE_USER")
	boysOneDBPassword := os.Getenv("DB_BOYS_ONE_PASSWORD")
	boysOneDBHost := os.Getenv("DB_BOYS_ONE_HOST")
	boysOneDBPort := os.Getenv("DB_BOYS_ONE_PORT")
	boysOneDBName := os.Getenv("DB_BOYS_ONE_NAME")

	// Data Source Names (DSNs)
	bigBoysDSN := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable", bigBoysDBHost, bigBoysDBUser, bigBoysDBPassword, bigBoysDBName, bigBoysDBPort)
	boysOneDSN := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable", boysOneDBHost, boysOneDBUser, boysOneDBPassword, boysOneDBName, boysOneDBPort)

	// Connecting to Big Boys Database
	bigBoysDB, err = gorm.Open(postgres.Open(bigBoysDSN), &gorm.Config{})
	if err != nil {
		log.Fatalf("Error connecting to the Big Boys database: %v", err)
	}

	// Connecting to Boys One Database
	boysOneDB, err = gorm.Open(postgres.Open(boysOneDSN), &gorm.Config{})
	if err != nil {
		log.Fatalf("Error connecting to the Boys One database: %v", err)
	}

	// Ensure the connections are established
	sqlBigBoysDB, err := bigBoysDB.DB()
	if err != nil {
		log.Fatalf("Error getting the Big Boys database object: %v", err)
	}
	err = sqlBigBoysDB.Ping()
	if err != nil {
		log.Fatalf("Error pinging the Big Boys database: %v", err)
	}

	sqlBoysOneDB, err := boysOneDB.DB()
	if err != nil {
		log.Fatalf("Error getting the Boys One database object: %v", err)
	}
	err = sqlBoysOneDB.Ping()
	if err != nil {
		log.Fatalf("Error pinging the Boys One database: %v", err)
	}

	fmt.Println("Big Boys and Boys One Database connections successful")
}
