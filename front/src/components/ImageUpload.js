import React, { useState } from "react";
import "../stylings/ImageUpload.css"; // Ensure you have styling for your component
import PictureList from "./PictureList"; // Component to display similar images
import Navbar from "./Navbar";

const API_URL = "http://127.0.0.1:5000/upload"; // Update this URL if needed

const UploadImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileURL, setSelectedFileURL] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [similarItems, setSimilarItems] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setSelectedFileURL(URL.createObjectURL(file)); // Preview the selected image
  };

  const handleUpload = async () => {
    if (!selectedFile) {
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
        alert("Error uploading file");
        setSubmitting(false);
        return;
      }

      const data = await response.json();
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
      <Navbar />
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
        {similarItems.length > 0 && <PictureList pictureData={similarItems} />}
      </div>
    </div>
  );
};

export default UploadImage;

// import React, { useState } from "react";
// import "../stylings/ImageUpload.css"; // Ensure you have styling for your component
// import PictureList from "./PictureList"; // Component to display similar images
// import Navbar from "./Navbar";

// const API_URL = "http://127.0.0.1:5000/upload"; // Update this URL if needed

// const UploadImage = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [selectedFileURL, setSelectedFileURL] = useState(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [similarItems, setSimilarItems] = useState([]);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile(file);
//     setSelectedFileURL(URL.createObjectURL(file)); // Preview the selected image
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       alert("Please select a file first.");
//       return;
//     }

//     setSubmitting(true);

//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     try {
//       const response = await fetch(API_URL, {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         console.error(`HTTP error! Status: ${response.status}`);
//         const errorText = await response.text();
//         alert("Error uploading file");
//         setSubmitting(false);
//         return;
//       }

//       const data = await response.json();
//       setSimilarItems(data);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       alert("Error uploading file");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="upload-image-container">
//         <h2 className="upload-image-title">Upload Images</h2>
//         <div className="file-upload-container">
//           <input type="file" onChange={handleFileChange} />
//         </div>
//         <button
//           className="submit-button"
//           onClick={handleUpload}
//           disabled={!selectedFile || submitting}
//         >
//           {submitting ? "Submitting..." : "Submit"}
//         </button>
//         <div className="uploaded-images-container">
//           {selectedFileURL && (
//             <div className="uploaded-image">
//               <img
//                 src={selectedFileURL}
//                 alt="Selected"
//                 className="uploaded-image-content"
//               />
//             </div>
//           )}
//         </div>
//         {similarItems.length > 0 && <PictureList pictureData={similarItems} />}
//       </div>
//     </div>
//   );
// };

// export default UploadImage;
