import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import {
  faChevronCircleDown,
  faChevronCircleUp,
} from "@fortawesome/free-solid-svg-icons";

// import backdrop from "../../none.png";
import { movieGenres, tvGenres } from "../../components/Genres";
import "./Small.css";

const genre = {
  mg: movieGenres,
  tvg: tvGenres,
};

export const Trailer = ({ videos }) => {
  return (
    <div className="trailer">
      {videos.find(
        (res) => res.type === "Trailer" && res.site === "YouTube"
      ) && (
        // <a
        //   target="_blank"
        //   rel="noreferrer"
        //   href={`https://www.youtube.com/watch?v=${
        //     videos.find(
        //       (res) => res.type === "Trailer" && res.site === "YouTube"
        //     ).key
        //   }`}
        // >
        //   Watch Trailer
        // </a>
        <FontAwesomeIcon
          size="3x"
          icon={faYoutube}
          color="#FF0000"
          className="youtube"
          onClick={() =>
            window.open(
              `https://www.youtube.com/watch?v=${
                videos.find(
                  (res) => res.type === "Trailer" && res.site === "YouTube"
                ).key
              }`,
              "_blank"
            )
          }
        />
      )}
    </div>
  );
};

export const Rating = ({ rating }) => {
  return (
    <div className="rating">
      {rating !== "N/A" && <p>{`IMDB Rating: ${rating}`}</p>}
    </div>
  );
};

export const ImageSmall = ({ path, title, size, isClass }) => {
  return (
    <img
      src={
        path
          ? `https://image.tmdb.org/t/p/${size}/${path}`
          : process.env.PUBLIC_URL + "/none.png"
      }
      alt={title}
      className={isClass ? isClass : null}
    />
  );
};

export const Overview = ({
  title,
  overview,
  setShowAll,
  classHide,
  showAll,
}) => {
  let ov1 = overview.replaceAll(/\n\n/gi, `</p><p class=${classHide}>`);
  let ov = `<p class=${showAll ? "show-all" : "show"}>` + ov1 + "</p>";
  return (
    <div className="overview" onClick={() => setShowAll(!showAll)}>
      <h3>{title}</h3>
      {/* <p>{overview}</p> */}
      <div className="onlyfirst" dangerouslySetInnerHTML={{ __html: ov }}></div>
    </div>
  );
};

export const OverviewOther = ({ title, overview }) => {
  return (
    <div className="overview">
      <h3>{title}</h3>
      <p>{overview}</p>
    </div>
  );
};

export const GenreList = ({ category, list }) => {
  return genre[category]
    .filter((g) => list.some((id) => g.id === id))
    .map((res) => res.name)
    .join(", ");
};

export const Wrapper = ({ cover, children }) => {
  return <>{cover && children}</>;
};

export const MovieNav = () => {
  return (
    <div className="sub-nav-main">
      <div className="sub-nav">
        <NavLink to="/movie/popular">Popular</NavLink>
        <NavLink to="/movie/top_rated">Top Rated</NavLink>
        <NavLink to="/movie/upcoming">Upcoming</NavLink>
        <NavLink to="/movie/now_playing">Now Playing</NavLink>
      </div>
    </div>
  );
};

export const TvNav = () => {
  return (
    <div className="sub-nav-main">
      <div className="sub-nav">
        <NavLink to="/tv/popular">Popular</NavLink>
        <NavLink to="/tv/top_rated">Top Rated</NavLink>
      </div>
    </div>
  );
};

export const ProfileNav = () => {
  return (
    <div className="sub-nav-main">
      <div className="sub-nav">
        <NavLink to="/profile/favourite">Favourite</NavLink>
        <NavLink to="/profile/watchlist">Watchlist</NavLink>
        <NavLink to="/profile/watched">Watched</NavLink>
        <NavLink to="/logout">Logout</NavLink>
      </div>
    </div>
  );
};

export const ShowMoreIcon = ({ cName, click, dir }) => {
  if (dir === "down") {
    return (
      <FontAwesomeIcon
        className={cName}
        onClick={click}
        size="1x"
        icon={faChevronCircleDown}
      />
    );
  } else if (dir === "up") {
    return (
      <FontAwesomeIcon
        className={cName}
        onClick={click}
        size="1x"
        icon={faChevronCircleUp}
      />
    );
  }
};
