import React, { useState, useEffect } from "react";
import "../stylings/PictureList.css";

function importAll(r) {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

// Change path to where your images directory is located
const images = importAll(
  require.context("../../public/assets/cloth/", false, /\.(png|jpe?g|svg)$/)
);

const PictureList = ({ pictureData = [] }) => {
  const [pictures, setPictures] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [picturesPerPage] = useState(24);

  useEffect(() => {
    setPictures(
      Object.keys(images).map((key) => ({
        id: key.replace(/\.[^/.]+$/, ""), // remove file extension
        src: images[key],
      }))
    );
  }, []);

  const filteredPictures =
    pictureData.length > 0
      ? pictures
          .map((picture) => {
            const pictureInfo = pictureData.find(
              (data) => data.image === picture.id.replace(/\.[^/.]+$/, "")
            );
            return pictureInfo
              ? { ...picture, score: pictureInfo.similarity } // Assuming `similarity` is the score from the backend
              : null;
          })
          .filter((picture) => picture !== null)
          .sort((a, b) => b.score - a.score) // Sort by similarity score in descending order
      : pictures;

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
        {currentPictures.map((picture) => (
          <div key={picture.id} className="picture-card">
            <img src={picture.src} alt={picture.id} />
            <div className="picture-info">
              <p className="picture-score">Score: {picture.score}</p>
            </div>
          </div>
        ))}
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
