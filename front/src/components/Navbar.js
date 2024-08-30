import React, { useState } from "react";
import "../stylings/Navbar.css";
import Login from "./Login";

export default function Navbar({ loginStatus, setLoginStatus, user, setUser }) {
  const [showLogin, setShowLogin] = useState(false);

  const handleGoogleAuthClick = () => {
    setShowLogin(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userType");
    setLoginStatus(false);
    setUser(null);
    setShowLogin(false);
    console.log("User logged out and local storage cleared");
  };
//   console.log("Login status: ", loginStatus);
  return (
    <nav className="navbar">
      <h3 className="logo" style={{ display: "flex", alignItems: "center", borderRadius: "20px" }}>
        <img
          src="https://media.discordapp.net/attachments/1071334736787673188/1277778362319765544/DALLE_2024-08-26_16.54.14_-_A_logo_for_a_clothing_store_without_any_text_featuring_a_magnifying_glass_hovering_over_a_piece_of_womens_clothing._The_clothing_should_be_stylish_a.webp?ex=66d06195&is=66cf1015&hm=1df9c991b0c1436ab7ade847b94da952e25fad48b985a53c01cc70cbaac30a43&=&format=webp&width=993&height=993"
          alt="Logo"
          width="40"
          style={{ marginRight: "10px" , borderRadius: "2px"}}
        />
        ClothePlus
      </h3>
      <ul className="nav-menu">
        <li className="nav-item">
          <a className="bruh" href="/">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a href="/upload">Upload Image</a>
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
        ) : (
          <>
            <button className="button-55" onClick={handleGoogleAuthClick}>
              Login
            </button>
            {showLogin && (
              <Login
                loginStatus={loginStatus}
                user={user}
                setLoginStatus={setLoginStatus}
                setUser={setUser}
                showLogin={showLogin}
                setShowLogin={setShowLogin}
              />
            )}
          </>
        )}
      </div>
    </nav>
  );
}
