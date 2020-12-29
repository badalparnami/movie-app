import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./Detail.css";
import useHttp from "../../../hooks/http";
import useFww from "../../../hooks/fww";
import ErrorModal from "../../../UI/ErrorModal";
import LoadingIndicator from "../../../UI/LoadingIndicator";
import Credits, { PersonCredit, TvCredit } from "../../Credits/Credits";
import Provider from "../../Provider/Provider";
import { addToFww, clearError } from "../../../store/actions/fww";
import IconGrid from "../../../UI/Icon";

import {
  Trailer,
  Rating,
  ImageSmall,
  OverviewOther as Overview,
} from "../../../Dumb/Small/Small";

const Detail = (props) => {
  const {
    data,
    error,
    loading,
    requestData,
    clear,
    provider,
    rating,
  } = useHttp();

  const history = useHistory();

  const dispatch = useDispatch();

  const { token } = useSelector((store) => store.auth);

  const { loadingR, errorR } = useSelector((store) => store.fww);

  const id = useParams().id || props.id;

  const { isFav, isWd, isWl, remove } = useFww(id);

  useEffect(() => {
    requestData(`${process.env.REACT_APP_BACKEND_URL}/tv/detail/${id}`, "dpr");
  }, [id]);

  const redirectToSeason = (id, sid) => {
    history.push(`/tv/${data.id}/season/${sid}`);
  };

  const addRHelper = {
    f: isFav,
    wl: isWl,
    wd: isWd,
  };

  const addRemove = (name) => {
    if (addRHelper[name]) {
      remove(name);
    } else {
      dispatch(
        addToFww(data.name, data.poster_path, data.id, "tv", token, name)
      );
    }
  };
  // name, image, id, type, token, name

  const clearErr = () => {
    dispatch(clearError());
  };

  return (
    <>
      {error && <ErrorModal onClose={() => clear()}>{error}</ErrorModal>}
      {loading && <LoadingIndicator />}
      {errorR && <ErrorModal onClose={clearErr}>{errorR}</ErrorModal>}
      <div className="entertainment-detail">
        {data && (
          <>
            <div className="img-icon">
              <ImageSmall
                path={data.poster_path}
                title={data.name}
                size="w300"
              />
              {loadingR ? (
                <LoadingIndicator />
              ) : (
                <>
                  {token && (
                    <IconGrid
                      isFav={isFav}
                      isWd={isWd}
                      isWl={isWl}
                      addRemove={addRemove}
                    />
                  )}
                </>
              )}
            </div>
            <div className="content">
              <h1>
                {data.name} ({new Date(data.first_air_date).getFullYear()})
              </h1>
              <h4>
                <span>{data.genres.map((genre) => genre.name).join(", ")}</span>{" "}
                <span>{`Status: ${data.status}`}</span>
              </h4>
              {provider && <Provider provider={provider} />}
              <h5>{data.tagline}</h5>
              {rating && <Rating rating={rating} />}
              {data.overview && (
                <Overview title="Overview" overview={data.overview} />
              )}
              {data.videos.results.length > 0 && (
                <Trailer videos={data.videos.results} />
              )}
              {data.created_by.length > 0 && (
                <div className="createdby">
                  <p>
                    {`Created By `}
                    {data.created_by.map((by) => by.name).join(", ")}
                  </p>
                </div>
              )}
              <div className="released">
                <p>{`Released on ${data.first_air_date}`}</p>
              </div>
              <div className="seasons">
                <p>{`Total Season(s): ${data.number_of_seasons} & Episode(s): ${data.number_of_episodes}`}</p>
              </div>
            </div>
          </>
        )}
      </div>
      {data && data.seasons.length > 0 && (
        <Credits
          img="poster_path"
          name="name"
          redirect={redirectToSeason}
          credits={data.seasons.filter((season) => season.season_number !== 0)}
          title="Seasons"
        />
      )}
      {data && data.credits.cast.length > 0 && (
        <PersonCredit credits={data.credits.cast} title="Cast" />
      )}
      {data && data.recommendations.results.length > 0 && (
        <TvCredit
          credits={data.recommendations.results}
          title="Recommendations"
        />
      )}
      {data && data.similar.results.length > 0 && (
        <TvCredit credits={data.similar.results} title="Similar Tv Shows" />
      )}
    </>
  );
};

export default Detail;
