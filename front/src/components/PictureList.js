import React, { useState, useEffect } from "react";
import "../stylings/PictureList.css";

// Function to import images from the specified directory
function importAll(r) {
  let images = {};
  r.keys().map((item) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

// Adjust the path to the new assets directory
const images = importAll(
  require.context("../../public/assets/cloth/", false, /\.(png|jpe?g|svg)$/)
);

const PictureList = ({ pictureData = [] }) => {
  const [pictures, setPictures] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [picturesPerPage] = useState(24); // Number of images per page

  useEffect(() => {
    // Log the imported images and pictureData for debugging
    console.log("Imported Images:", images);
    console.log("Picture Data:", pictureData);

    setPictures(
      Object.keys(images).map((key) => ({
        id: key,
        src: images[key],
      }))
    );
  }, []);

  // Filter pictures based on pictureData prop
  const filteredPictures =
    pictureData.length > 0
      ? pictures.filter((picture) =>
          pictureData.some(
            (data) => data.image === picture.id.replace(/\.[^/.]+$/, "")
          )
        )
      : pictures;

  // Log filtered pictures for debugging
  console.log("Filtered Pictures:", filteredPictures);

  const indexOfLastPicture = currentPage * picturesPerPage;
  const indexOfFirstPicture = indexOfLastPicture - picturesPerPage;
  const currentPictures = filteredPictures.slice(
    indexOfFirstPicture,
    indexOfLastPicture
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="picture-list-container">
      <div className="picture-list">
        {currentPictures.map((picture) => {
          const pictureInfo = pictureData.find(
            (data) => data.item_id === picture.id
          );
          return (
            <div key={picture.id} className="picture-card">
              <img src={picture.src} alt={picture.id} />
              <div className="picture-info">
                {pictureInfo && (
                  <p className="picture-score">Score: {pictureInfo.score}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: "20px" }}>
        <Pagination
          currentPage={currentPage}
          picturesPerPage={picturesPerPage}
          totalPictures={filteredPictures.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

// Pagination component
const Pagination = ({
  currentPage,
  picturesPerPage,
  totalPictures,
  paginate,
}) => {
  const pageNumbers = [];
  const maxPageNumbersToShow = 5;
  const totalPageCount = Math.ceil(totalPictures / picturesPerPage);

  let startPage = Math.max(
    1,
    currentPage - Math.floor(maxPageNumbersToShow / 2)
  );
  let endPage = Math.min(totalPageCount, startPage + maxPageNumbersToShow - 1);

  if (endPage - startPage + 1 < maxPageNumbersToShow) {
    startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <button onClick={() => paginate(1)} className="page-link">
            &laquo;
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${number === currentPage ? "active" : ""}`}
          >
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button
            onClick={() => paginate(totalPageCount)}
            className="page-link"
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PictureList;
