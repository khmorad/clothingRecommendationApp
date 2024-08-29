import React, { useState, useEffect } from "react";
import "../stylings/Login.css";
import Signup from "./Signup.js"; // Import the Signup component

export default function Login({ loginStatus, user, setLoginStatus, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5001/customer")
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data);
        console.log("Customers:", data);
      })
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedUserType = localStorage.getItem("userType");

    if (storedUsername && storedUserType === "customer") {
      setUser(storedUsername);
      setLoginStatus(true);
    }
  }, [setUser, setLoginStatus]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignupLinkClick = (e) => {
    e.preventDefault();
    setShowSignup(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Attempting login with:");
    console.log("Username:", username);
    console.log("Password:", password);

    const userExists = customers.some(
      (customer) =>
        customer.username === username && customer.password === password
    );

    if (userExists) {
      localStorage.setItem("username", username);
      localStorage.setItem("userType", "customer");
      setUser(username);
      setLoginStatus(true);
    } else {
      console.error("Login failed: Username or Password incorrect.");
      alert("Login failed: Please check your username and password.");
    }
  };

  if (!loginStatus && !showSignup) {
    return (
      <div className="container">
        <div className="center">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="txt_field">
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                required
              />
              <span></span>
              <label>Username</label>
            </div>
            <div className="txt_field">
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <span></span>
              <label>Password</label>
            </div>
            <input type="submit" value="Login" />
            <div className="signup_link">
              Not a Member?{" "}
              <a href="#" onClick={handleSignupLinkClick}>
                Signup
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  } else if (!loginStatus && showSignup) {
    return <Signup />;
  } else {
    return null;
  }
}
