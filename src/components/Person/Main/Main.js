import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Main.css";
import Pagination from "../../Pagination/Pagination";
import useHttp from "../../../hooks/http";
import ErrorModal from "../../../UI/ErrorModal";
import LoadingIndicator from "../../../UI/LoadingIndicator";
import { ImageSmall } from "../../../Dumb/Small/Small";

const Main = ({ num }) => {
  const { data, error, loading, requestData, clear, totalPage } = useHttp();
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
    requestData(`${process.env.REACT_APP_BACKEND_URL}/person/popular/1`, "dt");
  }, []);

  const getNewData = ({ selected }) => {
    setPage(selected + 1);
    requestData(
      `${process.env.REACT_APP_BACKEND_URL}/person/popular/${selected + 1}`,
      "dt"
    );
  };

  return (
    <>
      {!num && error && (
        <ErrorModal onClose={() => clear()}>{error}</ErrorModal>
      )}
      {!num && loading && <LoadingIndicator />}
      {!num && data && (
        <h1 className="entertainment-heading">Popular Persons</h1>
      )}
      <div className="entertainment-main">
        {data &&
          data
            .map((data) => (
              <div className="data" key={data.id}>
                <Link className="redirect" to={`/person/${data.id}`}>
                  <ImageSmall
                    path={data.profile_path}
                    title={data.name}
                    size="w200"
                  />
                  <div className="content">
                    <h1>{data.name}</h1>
                    <p>
                      (
                      {` ${data.known_for
                        .map((res) => res.name || res.title)
                        .join(", ")} `}
                      )
                    </p>
                  </div>
                </Link>
              </div>
            ))
            .splice(0, num || data.length)}
      </div>
      {!num && data && (
        <Pagination
          page={page - 1}
          totalPages={totalPage}
          getNewData={getNewData}
        />
      )}
    </>
  );
};

export default Main;
