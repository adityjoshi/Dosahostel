import React, { useState } from "react";
import { Bell, User } from "lucide-react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import "./header.css"; // Import CSS file

export default function Header() {
  const { user } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken"); // Clear JWT token
    navigate("/login"); // Redirect to login page
  };

  const handleProfile = () => {
    navigate("/profile"); // Navigate to profile page (you can change the route if needed)
  };

  return (
    <header className="header">
      <div className="header-content">
        <button className="icon-btn">
          <Bell className="icon" />
        </button>
        <div className="profile-menu">
          <button className="icon-btn" onClick={() => setShowDropdown((prev) => !prev)}>
            <User className="icon" />
          </button>

          {showDropdown && (
            <div className="dropdown">
              {user && (
                <div className="dropdown-header">
                  <p className="user-name">{user.name}</p>
                  <p className="user-email">{user.email}</p>
                </div>
              )}
              <div className="dropdown-options">
                <button onClick={handleProfile} className="dropdown-btn">Profile</button>
                <button onClick={handleLogout} className="dropdown-btn">Logout</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
