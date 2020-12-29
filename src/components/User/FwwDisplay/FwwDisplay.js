import React from "react";
import { Redirect, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./FwwDisplay.css";
import ErrorModal from "../../../UI/ErrorModal";
import LoadingIndicator from "../../../UI/LoadingIndicator";
import { ImageSmall } from "../../../Dumb/Small/Small";

import { clearError } from "../../../store/actions/fww";

const FwwDisplay = ({ eff }) => {
  const dispatch = useDispatch();
  const { error, loading, favourite, watched, watchlist } = useSelector(
    (state) => state.fww
  );
  const { token } = useSelector((state) => state.auth);
  let isAuth = null;

  if (!token) {
    isAuth = <Redirect to="/auth" />;
  }

  const dataToDisplay = {
    f: favourite,
    wl: watchlist,
    wd: watched,
  };

  const headingToDisplay = {
    f: "Favourite",
    wl: "Watchlist",
    wd: "Watched",
  };

  const clear = () => {
    dispatch(clearError());
  };

  return (
    <>
      {isAuth}
      {error && <ErrorModal onClose={() => clear()}>{error}</ErrorModal>}
      {/* <ProfileNav /> */}
      {loading && <LoadingIndicator />}
      {dataToDisplay[eff] && (
        <h1 style={{ marginBottom: "1rem", textAlign: "center" }}>
          {headingToDisplay[eff]}
        </h1>
      )}
      {dataToDisplay[eff].length < 1 && (
        <p>Nothing to show here. Try adding some of the entertainers.</p>
      )}
      <div className="entertainment-main">
        {dataToDisplay[eff] &&
          dataToDisplay[eff].map((data) => (
            <div className="data" key={data.uid}>
              <Link className="redirect" to={`/${data.type}/${data.uid}`}>
                <ImageSmall path={data.image} title={data.name} size="w200" />
                <div className="content">
                  <h2>{data.name}</h2>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
};

export default FwwDisplay;
