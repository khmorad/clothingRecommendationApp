import React, { useState } from "react";
import "../stylings/App.css";
import Navbar from "./Navbar";
import Clotheinfo from "./Clotheinfo";

function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [user, setUser] = useState(null);
  const [isEmployee, setIsEmployee] = useState(false);
  return (
    <div className="App">
      <Navbar
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
        user={user}
        setUser={setUser}
        isEmployee={isEmployee}
        setIsEmployee={setIsEmployee}
      />
      <Clotheinfo
        showLogin={showLogin}
        loginStatus={loginStatus}
        user={user}
        isEmployee={isEmployee}
      />
    </div>
  );
}

export default Home;
