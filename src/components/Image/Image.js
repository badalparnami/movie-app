import React, { useState } from "react";

import "./Image.css";

const Image = ({ images, name, title }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="entertainment-show">
      {images && (
        <div className="more">
          <p>{title}</p>
          {images.length > 6 ? (
            <button className="view-pc" onClick={() => setShowMore(!showMore)}>
              {showMore ? "Hide More" : "Show More"}
            </button>
          ) : null}
        </div>
      )}
      <div className="credits">
        {images &&
          images
            .map((image) => (
              <div
                className="img-content"
                onClick={() =>
                  window.open(
                    `https://image.tmdb.org/t/p/original${image.file_path}`,
                    "_blank"
                  )
                }
                key={image.file_path}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${image.file_path}`}
                  alt={name}
                />
              </div>
            ))
            .splice(0, showMore ? images.length : 6)}
      </div>
      {images.length > 6 ? (
        <div className="view-mob">
          <button onClick={() => setShowMore(!showMore)}>
            {showMore ? "Hide More" : "Show More"}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Image;
