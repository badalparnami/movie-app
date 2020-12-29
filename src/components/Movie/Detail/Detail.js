import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./Detail.css";
import useHttp from "../../../hooks/http";
import useFww from "../../../hooks/fww";
import ErrorModal from "../../../UI/ErrorModal";
import LoadingIndicator from "../../../UI/LoadingIndicator";
import { PersonCredit, MovieCredit } from "../../Credits/Credits";
import Provider from "../../Provider/Provider";
import Collection from "../../Collection/Collection";
import { addToFww, clearError } from "../../../store/actions/fww";
import IconGrid from "../../../UI/Icon";

import {
  Trailer,
  Rating,
  ImageSmall,
  OverviewOther as Overview,
  Wrapper,
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

  const dispatch = useDispatch();

  const { token } = useSelector((store) => store.auth);

  const { loadingR, errorR } = useSelector((store) => store.fww);

  const id = useParams().id || props.id;

  const { isFav, isWd, isWl, remove } = useFww(id);

  useEffect(() => {
    requestData(
      `${process.env.REACT_APP_BACKEND_URL}/movie/detail/${id}`,
      "dpr"
    );
  }, [id]);

  //   setProvider(response.data.providers.results["IN"]["flatrate"]);
  const convertTime = (time) => {
    if (!time) {
      return "";
    }
    var hours = Math.floor(time / 60);
    var minutes = time % 60;
    return ` ${hours}hr ${minutes}m`;
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
        addToFww(data.title, data.poster_path, data.id, "movie", token, name)
      );
    }
  };

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
                title={data.title}
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
                {data.title} (
                {data.release_date && new Date(data.release_date).getFullYear()}
                )
              </h1>
              <h4>
                <span>{data.release_date} </span>
                <span>
                  {data.genres.map((genre) => genre.name).join(", ")}{" "}
                </span>
                <span>{convertTime(data.runtime)} </span>
                <span>{data.status}</span>
              </h4>
              <Wrapper cover={provider}>
                <Provider provider={provider} />
              </Wrapper>
              <Wrapper cover={data.tagline}>
                <h5>{data.tagline}</h5>
              </Wrapper>
              <Wrapper cover={rating}>
                <Rating rating={rating} />
              </Wrapper>
              <Wrapper cover={data.overview}>
                <Overview title="Overview" overview={data.overview} />
              </Wrapper>
              <Wrapper cover={data.videos.results.length > 0}>
                <Trailer videos={data.videos.results} />
              </Wrapper>
            </div>
          </>
        )}
      </div>
      {data && data.belongs_to_collection && (
        <Collection id={data.belongs_to_collection.id} />
      )}
      {data && data.credits.cast.length > 0 && (
        <PersonCredit credits={data.credits.cast} title="Cast" />
      )}
      {data && data.recommendations.results.length > 0 && (
        <MovieCredit
          credits={data.recommendations.results}
          title="Recommendations"
        />
      )}
      {data && data.similar.results.length > 0 && (
        <MovieCredit credits={data.similar.results} title="Similar Movies" />
      )}
    </>
  );
};

export default Detail;
