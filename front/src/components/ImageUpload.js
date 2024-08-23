import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import "../stylings/ImageUpload.css";
import PictureList from "./PictureList"; // Import PictureList component
import Navbar from "./Navbar";
const API_URL = "http://127.0.0.1:5000/upload"; // Adjust the URL as necessary

const UploadImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileURL, setSelectedFileURL] = useState(null); // State for storing the image URL
  const [submitting, setSubmitting] = useState(false);
  const [similarItems, setSimilarItems] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [user, setUser] = useState(null);
  const [isEmployee, setIsEmployee] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setSelectedFileURL(URL.createObjectURL(file)); // Set the image URL
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error("No file selected");
      alert("Please select a file first.");
      return;
    }

    setSubmitting(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        const errorText = await response.text();
        console.error("Error details:", errorText);
        alert("Error uploading file");
        setSubmitting(false);
        return;
      }

      const data = await response.json();
      console.log("Response data:", data);
      setSimilarItems(data);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
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
      <div className="upload-image-container">
        <h2 className="upload-image-title">Upload Images</h2>
        <div className="file-upload-container">
          <input type="file" onChange={handleFileChange} />
        </div>
        <button
          className="submit-button"
          onClick={handleUpload}
          disabled={!selectedFile || submitting}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
        <div className="uploaded-images-container">
          {selectedFileURL && (
            <div className="uploaded-image">
              <img
                src={selectedFileURL}
                alt="Selected"
                className="uploaded-image-content"
              />
            </div>
          )}
        </div>
        {similarItems.length > 0 && (
          <PictureList pictureData={similarItems} />
        )}
      </div>
    </div>
  );
};

export default UploadImage;
