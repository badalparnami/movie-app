import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../../store/actions/fww";
import { NavLink, useHistory, Redirect } from "react-router-dom";

import ErrorModal from "../../../UI/ErrorModal";
import LoadingIndicator from "../../../UI/LoadingIndicator";
import "./Profile.css";
// import backdrop from "../../../none.png";
import { ProfileNav } from "../../../Dumb/Small/Small";

const Credits = ({ credits, img, name, redirect }) => {
  return (
    <div className="credits-main">
      <div className="credits">
        {credits &&
          credits
            .map((credit) => (
              <div
                className="content"
                key={credit.uid}
                onClick={() => redirect(credit.uid, credit.type)}
              >
                <img
                  src={
                    credit[img]
                      ? `https://image.tmdb.org/t/p/w200${credit[img]}`
                      : process.env.PUBLIC_URL + "/none.png"
                  }
                  alt={credit[name] || credit.name}
                />
                <h3>{credit[name] || credit.name}</h3>
              </div>
            ))
            .splice(0, 6)}
      </div>
    </div>
  );
};

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { error, loading, name, favourite, watched, watchlist } = useSelector(
    (state) => state.fww
  );
  const { token } = useSelector((state) => state.auth);

  let isAuth = null;

  if (!token) {
    isAuth = <Redirect to="/auth" />;
  }

  const clear = () => {
    dispatch(clearError());
  };

  const redirectToType = (id, type) => {
    history.push(`/${type}/${id}`);
  };

  return (
    <div>
      {isAuth}
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <ProfileNav />
      {loading && <LoadingIndicator />}
      {name && (
        <div className="profile-main">
          <h3>
            {`Welcome ${name.toUpperCase()}`}
            <span>{`You have total ${
              favourite.length + watchlist.length + watched.length
            } Entertainer(s) in your list.`}</span>
          </h3>
          <p>{`${favourite.length} in your Favourite list, ${watchlist.length} in Watchlist and ${watched.length} in Watched list. `}</p>
        </div>
      )}
      <div className="profile-sub">
        {favourite.length > 0 && (
          <div className="entertainment-show fav">
            <div className="more">
              <p>Favourite</p>
              {favourite.length > 6 ? (
                <NavLink className="view-pc" to="/profile/favourite">
                  View More
                </NavLink>
              ) : null}
            </div>
            <Credits
              credits={favourite}
              img="image"
              name="name"
              redirect={redirectToType}
            />
            {favourite.length > 6 ? (
              <div className="view-mob">
                <NavLink to="/profile/favourite">View More</NavLink>
              </div>
            ) : null}
          </div>
        )}
        {watchlist.length > 0 && (
          <div className="entertainment-show watchlist">
            <div className="more">
              <p>Watchlist</p>
              {watchlist.length > 6 ? (
                <NavLink className="view-pc" to="/profile/watchlist">
                  View More
                </NavLink>
              ) : null}
            </div>
            <Credits
              credits={watchlist}
              img="image"
              name="name"
              redirect={redirectToType}
            />
            {watchlist.length > 6 ? (
              <div className="view-mob">
                <NavLink to="/profile/watchlist">View More</NavLink>
              </div>
            ) : null}
          </div>
        )}
        {watched.length > 0 && (
          <div className="entertainment-show watched">
            <div className="more">
              <p>Watched</p>
              {watched.length > 6 ? (
                <NavLink className="view-pc" to="/profile/watchlist">
                  View More
                </NavLink>
              ) : null}
            </div>
            <Credits
              credits={watched}
              img="image"
              name="name"
              redirect={redirectToType}
            />
            {watchlist.length > 6 ? (
              <div className="view-mob">
                <NavLink to="/profile/watchlist">View More</NavLink>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
