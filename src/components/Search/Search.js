import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import backdrop from "../../none.png";
import "./Search.css";
import Pagination from "../Pagination/Pagination";
import useHttp from "../../hooks/http";
import ErrorModal from "../../UI/ErrorModal";
import LoadingIndicator from "../../UI/LoadingIndicator";

import { GenreList } from "../../Dumb/Small/Small";

const Search = () => {
  const { data, error, loading, requestData, clear, totalPage } = useHttp();
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (value.length > 1) {
        requestData(
          `${process.env.REACT_APP_BACKEND_URL}/main/search/${value}/1`,
          "dt"
        );
        setPage(1);
      }
    }, 1000);

    return () => clearTimeout(delaySearch);
  }, [value]);

  const getNewData = ({ selected }) => {
    setPage(selected + 1);
    requestData(
      `${process.env.REACT_APP_BACKEND_URL}/main/search/${value}/${
        selected + 1
      }`,
      "dt"
    );
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search movie, tv or person"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {error && <ErrorModal onClose={() => clear()}>{error}</ErrorModal>}
      {loading && <LoadingIndicator />}
      <div className="entertainment-main">
        {data &&
          data.map((data) => (
            <div className="data" key={data.id}>
              <Link className="redirect" to={`/${data.media_type}/${data.id}`}>
                <img
                  src={
                    data.poster_path || data.profile_path
                      ? `https://image.tmdb.org/t/p/w200/${
                          data.poster_path || data.profile_path
                        }`
                      : process.env.PUBLIC_URL + "/none.png"
                  }
                  alt={data.title || data.name}
                />
                <div className="content">
                  <h1>{data.title || data.name}</h1>
                  {data.media_type === "person" ? (
                    <p>
                      {data.known_for
                        .map((res) => res.name || res.title)
                        .join(", ")}
                    </p>
                  ) : null}
                  {data.media_type === "tv" ? (
                    <p>
                      <GenreList list={data.genre_ids} category="tvg" />
                    </p>
                  ) : null}

                  {data.media_type === "movie" ? (
                    <p>
                      <GenreList list={data.genre_ids} category="mg" />
                    </p>
                  ) : null}
                </div>
              </Link>
            </div>
          ))}
      </div>
      {totalPage > 1 && data && (
        <Pagination
          page={page - 1}
          totalPages={totalPage}
          getNewData={getNewData}
        />
      )}
    </div>
  );
};

export default Search;
