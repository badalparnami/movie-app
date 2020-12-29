import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "./Collection.css";

import useHttp from "../../hooks/http";
import ErrorModal from "../../UI/ErrorModal";
import LoadingIndicator from "../../UI/LoadingIndicator";
import { ImageSmall, GenreList } from "../../Dumb/Small/Small";

const Collection = ({ id }) => {
  const { data, error, loading, requestData, clear } = useHttp();
  const [showMore, setShowMore] = useState(false);
  const history = useHistory();

  useEffect(() => {
    requestData(
      `${process.env.REACT_APP_BACKEND_URL}/movie/collection/${id}`,
      "d"
    );
  }, [id]);

  const redirectToMovie = (id) => {
    history.push(`/movie/${id}`);
  };

  return (
    <>
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      {loading && <LoadingIndicator />}
      <div className="entertainment-show">
        {data && (
          <div className="more">
            <p>{data.name}</p>
            {data.parts.length > 6 ? (
              <button
                className="view-pc"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "Hide More" : "Show More"}
              </button>
            ) : null}
          </div>
        )}
        <div className="credits">
          {data.parts &&
            data.parts
              .map((collection) => (
                <div
                  className="content"
                  key={collection.id}
                  onClick={() => redirectToMovie(collection.id)}
                >
                  <ImageSmall
                    path={collection.poster_path}
                    title={collection.title}
                    size="w200"
                  />
                  <p>{collection.title}</p>
                  <p className="character">
                    (<GenreList list={collection.genre_ids} category="mg" />)
                  </p>
                </div>
              ))
              .splice(0, showMore ? data.parts.length : 6)}
        </div>
        {data && data.parts.length > 6 ? (
          <div className="view-mob">
            <button onClick={() => setShowMore(!showMore)}>
              {showMore ? "Hide More" : "Show More"}
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Collection;
