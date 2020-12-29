import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// import backdrop from "../../none.png";
import "./Credits.css";

import { GenreList } from "../../Dumb/Small/Small";

export const PersonCredit = ({ credits, title }) => {
  const history = useHistory();
  const redirectToPerson = (id) => {
    history.push(`/person/${id}`);
  };

  return (
    <Credits
      img="profile_path"
      name="name"
      redirect={redirectToPerson}
      credits={credits}
      title={title}
    />
  );
};

export const MovieCredit = ({ credits, title }) => {
  const history = useHistory();
  const redirectToMovie = (id) => {
    history.push(`/movie/${id}`);
  };

  return (
    <Credits
      img="poster_path"
      name="title"
      redirect={redirectToMovie}
      credits={credits}
      title={title}
      rec="movie"
    />
  );
};

export const TvCredit = ({ title, credits }) => {
  const history = useHistory();
  const redirectToTv = (id) => {
    history.push(`/tv/${id}`);
  };

  return (
    <Credits
      img="poster_path"
      name="name"
      redirect={redirectToTv}
      credits={credits}
      title={title}
      rec="tv"
    />
  );
};

export const TypeCredit = ({ title, credits }) => {
  const history = useHistory();
  const redirectToType = (id, type) => {
    history.push(`/${type}/${id}`);
  };

  return (
    <Credits
      img="poster_path"
      name="title"
      redirect={redirectToType}
      credits={credits}
      title={title}
    />
  );
};

const Credits = ({ credits, img, name, redirect, title, rec }) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="entertainment-show">
      {credits && (
        <div className="more">
          <p>{title}</p>
          {credits.length > 6 ? (
            <button className="view-pc" onClick={() => setShowMore(!showMore)}>
              {showMore ? "Hide More" : "Show More"}
            </button>
          ) : null}
        </div>
      )}
      <div className="credits">
        {credits &&
          credits
            .map((credit) => (
              <div
                className="content"
                key={credit.id}
                onClick={() =>
                  redirect(
                    credit.id,
                    credit.media_type ||
                      credit.episode_number ||
                      credit.season_number
                  )
                }
              >
                <img
                  src={
                    credit[img]
                      ? `https://image.tmdb.org/t/p/w200${credit[img]}`
                      : process.env.PUBLIC_URL + "/none.png"
                  }
                  alt={credit[name] || credit.name}
                />
                <p>{credit[name] || credit.name}</p>
                {credit.character && (
                  <p className="character">({credit.character})</p>
                )}
                {rec === "movie" ? (
                  <p className="character">
                    (
                    <GenreList list={credit.genre_ids} category="mg" />)
                  </p>
                ) : null}
                {rec === "tv" ? (
                  <p className="character">
                    (
                    <GenreList list={credit.genre_ids} category="tvg" />)
                  </p>
                ) : null}
              </div>
            ))
            .splice(0, showMore ? credits.length : 6)}
      </div>

      {credits.length > 6 ? (
        <div className="view-mob">
          <button onClick={() => setShowMore(!showMore)}>
            {showMore ? "Hide More" : "Show More"}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Credits;
