import React, { useState } from "react";
import "../stylings/PictureList.css";

const PictureList = ({ pictureData = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [picturesPerPage] = useState(24);

  const filteredPictures =
    pictureData.length > 0
      ? pictureData.sort((a, b) => b.similarity - a.similarity) // Sort by similarity score in descending order
      : [];

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
          <div key={picture.image_name} className="picture-card">
            <img src={picture.image_url} alt={picture.image_name} />
            <div className="picture-info">
              {picture.similarity > 0 && (
                <p className="picture-score">
                  Score: {picture.similarity.toFixed(2)}
                </p>
              )}
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
