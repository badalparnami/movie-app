import React from "react";
import { NavLink } from "react-router-dom";
import "./ProfileCard.css";

const ProfileCard = ({ name, fcount, wlcount, wdcount, id }) => {
  const capital = (str) => {
    str = str.split(" ");

    for (var i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
  };

  return (
    <div className="profile-card">
      <div className="container">
        <div className="box1 wxaxis"></div>
        <div className="box2 wxaxis">
          <div className="box2-img">
            {/* <img src={process.env.PUBLIC_URL + "/image-victor.jpg"} alt="" /> */}
            <img
              src={id ? "./sc.jpg" : "./ab.jpg"}
              alt=""
              height={96}
              width={96}
            />
          </div>
          <div className="box2-name">
            <h2 className="f700">
              {id ? (
                <NavLink to={id ? "/person/1245" : "/profile"}>
                  {capital(name)}
                </NavLink>
              ) : (
                capital(name)
              )}
            </h2>
          </div>
          <div className="box2-country dark-grey">(India)</div>
        </div>
        <div className="footer wxaxis">
          <div className="f700 footer-followers-count">{fcount}</div>
          <div className="f700 footer-likes-count">{wlcount}</div>
          <div className="f700 footer-photos-count">{wdcount}</div>
          <div className="footer-followers dark-grey">Favourite</div>
          <div className="footer-likes dark-grey">Watchlist</div>
          <div className="footer-photos dark-grey">Watched</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
