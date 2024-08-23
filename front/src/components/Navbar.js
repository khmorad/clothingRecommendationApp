import React, { useState } from "react";
import "../stylings/Navbar.css";
import Login from "./Login";


export default function Navbar({
  showLogin,
  setShowLogin,
  loginStatus,
  setLoginStatus,
  user,
  setUser,
  isEmployee,
  setIsEmployee
}) {
  const handleGoogleAuthClick = () => {
    setShowLogin(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userType');
    setLoginStatus(false);
    setUser(null);
    setIsEmployee(false);
    setShowLogin(false);
    console.log('User logged out and local storage cleared');
  };

  return (
    <nav className="navbar">
      <h3 className="logo" style={{ display: "flex", alignItems: "center" }}>
        ClothePlus
      </h3>
      <ul className="nav-menu">
        <li className="nav-item">
          <a className="bruh" href="\">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a href="\upload">Upload Image</a>
        </li>
      </ul>
      <div className="auth-section">
        {loginStatus ? (
          <>
            <p className="welcome-message">Welcome {user}</p>
            <button className="button-55" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : showLogin ? (
          <Login
            loginStatus={loginStatus}
            user={user}
            setLoginStatus={setLoginStatus}
            setUser={setUser}
            isEmployee={isEmployee}
            setIsEmployee={setIsEmployee}
          />
        ) : (
          <button className="button-55" onClick={handleGoogleAuthClick}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
