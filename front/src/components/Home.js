import React, { useState, useEffect } from "react";
import "../stylings/App.css";
import Navbar from "./Navbar";
import Clotheinfo from "./Clotheinfo";

const API_URL = "http://127.0.0.1:5000/all_images"; // New API endpoint

function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [user, setUser] = useState(null);
  const [isEmployee, setIsEmployee] = useState(false);
  const [pictureData, setPictureData] = useState([]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          console.error(`HTTP error! Status: ${response.status}`);
          const errorText = await response.text();
          alert("Error fetching image URLs");
          return;
        }

        const data = await response.json();
        setPictureData(data);
      } catch (error) {
        console.error("Error fetching image URLs:", error);
        alert("Error fetching image URLs");
      }
    };

    fetchImageUrls();
  }, []);

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
        pictureData={pictureData} // Passing the fetched picture data to Clotheinfo component
      />
    </div>
  );
}

export default Home;
