// package models

// type User struct {
// 	UserID    uint   `gorm:"primaryKey" json:"user_id"`
// 	FullName  string `gorm:"not null" json:"full_name"`
// 	Email     string `gorm:"not null;unique" json:"email"`
// 	Phone     string `gorm:"not null" json:"phone"`
// 	Password  string `gorm:"not null" json:"password"`
// 	Type      string `gorm:"not null" json:"type"`
// 	BlockID   string `gorm:"foreignKey:BlockID;references:BlockID;onDelete:SET NULL" json:"block_id"`
// 	BlockName string `gorm:"foreignKey:BlockName;references:BlockName;onDelete:CASCADE" json:"block_name"`
// 	USN       string `gorm:"unique" json:"usn"`
// 	Room      string `json:"room"`
// }

// type Block struct {
// 	BlockID   string `gorm:"primaryKey" json:"block_id"`
// 	BlockName string `gorm:"not null" json:"block_name"`
// }

// type Student struct {
// 	StudentID uint   `gorm:"primaryKey" json:"student_id"`
// 	UserID    uint   `gorm:"not null;unique" json:"user_id"` // Foreign key to User
// 	FullName  string `gorm:"not null" json:"full_name"`
// 	Email     string `gorm:"not null;unique" json:"email"`
// 	Phone     string `gorm:"not null" json:"phone"`
// 	USN       string `gorm:"not null;unique" json:"usn"`
// 	BlockID   string `gorm:"foreignKey:BlockID;references:BlockID;onDelete:CASCADE" json:"block_id"`
// 	BlockName string `gorm:"foreignKey:BlockName;references:BlockName;onDelete:CASCADE" json:"block_name"`
// 	Room      string `json:"room"`
// 	User      User   `gorm:"foreignKey:UserID" json:"user"`
// 	Block     Block  `gorm:"foreignKey:BlockID" json:"block"`
// }

// type Warden struct {
// 	WardenID uint   `gorm:"primaryKey" json:"warden_id"`
// 	UserID   uint   `gorm:"not null;unique" json:"user_id"` // Foreign key to User
// 	BlockID  string `gorm:"foreignKey:BlockID;references:BlockID;onDelete:CASCADE" json:"block_id"`
// 	User     User   `gorm:"foreignKey:UserID" json:"user"`
// 	Block    Block  `gorm:"foreignKey:BlockID" json:"block"`
// }

package models

import "time"

// Student struct for representing a student in the hostel
type Student struct {
	StudentID      uint   `gorm:"primaryKey" json:"student_id"`
	FullName       string `gorm:"not null" json:"full_name"`
	RegNo          string `gorm:"not null;unique" json:"reg_no"`
	Email          string `gorm:"not null;unique" json:"email"`
	Password       string `gorm:"not null" json:"password"`
	HostelName     string `gorm:"not null" json:"hostel_name"`
	Room           string `gorm:"not null" json:"room"`
	ContactDetails string `gorm:"not null" json:"contact_details"`
	UserType       string
}

// Warden struct for representing a warden in the hostel
type Warden struct {
	WardenID       uint   `gorm:"primaryKey" json:"warden_id"`
	FullName       string `gorm:"not null" json:"full_name"`
	Email          string `gorm:"not null;unique" json:"email"`
	Password       string `gorm:"not null" json:"password"`
	HostelName     string `gorm:"not null" json:"hostel_name"`
	ContactDetails string `gorm:"not null" json:"contact_details"`
	UserType       string
}

type ComplaintType string

const (
	Electricity ComplaintType = "electricity"
	WiFi        ComplaintType = "wifi"
	Hardware    ComplaintType = "hardware"
	Others      ComplaintType = "others"
)

type Complaint struct {
	ComplaintID    uint          `gorm:"primaryKey" json:"complaint_id"`
	StudentID      uint          `gorm:"" json:"student_id"`
	RegNo          string        `gorm:"not null" json:"reg_no"` // Foreign key to Student
	ComplaintType  ComplaintType `gorm:"type:varchar(20);not null" json:"complaint_type"`
	Description    string        `gorm:"not null" json:"description"`
	Status         bool          `gorm:"not null;default:false" json:"status"` // false = pending, true = resolved
	Room           string        `gorm:"not null" json:"room"`
	HostelName     string        `gorm:"not null" json:"hostel_name"`
	ContactDetails string        `gorm:"not null" json:"contact_details"`
}
type Inventory struct {
	ProductID    uint   `gorm:"primaryKey" json:"product_id"`
	AdminID      uint   `gorm:"not null" json:"admin_id"`
	BusinessName string `gorm:"not null" json:"business_name"`
	GSTNumber    string `gorm:"unique;not null" json:"gst_number"`
	ProductName  string `gorm:"not null" json:"product_name"`
	Quantity     int    `gorm:"not null" json:"quantity"`
}

// Invoice struct
type Invoice struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	Name        string    `gorm:"not null" json:"name"`
	Time        time.Time `gorm:"autoCreateTime" json:"time"` // Auto-generates timestamp
	ProductName string    `gorm:"not null" json:"product_name"`
	BuyerEmail  string    `gorm:"not null" json:"buyer_email"`
	PDFPath     string    `gorm:"not null" json:"pdf_path"` // Path to the stored PDF file
}
