import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import "./Seasons.css";
import Credits, { PersonCredit } from "../../Credits/Credits";
import useHttp from "../../../hooks/http";
import ErrorModal from "../../../UI/ErrorModal";
import LoadingIndicator from "../../../UI/LoadingIndicator";

import {
  Trailer,
  ImageSmall,
  OverviewOther as Overview,
} from "../../../Dumb/Small/Small";

const Seasons = (props) => {
  const { error, loading, requestData, clear, data } = useHttp();
  const history = useHistory();

  const id = useParams().id || props.id;
  const seasonId = useParams().sid;

  useEffect(() => {
    requestData(
      `${process.env.REACT_APP_BACKEND_URL}/tv/season/detail/${id}/${seasonId}`,
      "d"
    );
  }, [id, seasonId]);

  const redirectToEp = (idNN, epid) => {
    history.push(`/tv/${id}/season/${seasonId}/episode/${epid}`);
  };

  return (
    <>
      {error && <ErrorModal onClose={() => clear()}>{error}</ErrorModal>}
      {loading && <LoadingIndicator />}
      <div className="entertainment-detail">
        {data && (
          <>
            <ImageSmall path={data.poster_path} title={data.name} size="w300" />
            <div className="content">
              <h1>{data.name}</h1>
              <h4>{`Release Date - ${data.air_date}`}</h4>
              {data.overview && (
                <Overview title="Overview" overview={data.overview} />
              )}
              {data.videos.results.length > 0 && (
                <Trailer videos={data.videos.results} />
              )}
            </div>
          </>
        )}
      </div>
      {data && data.episodes.length > 0 && (
        <Credits
          img="still_path"
          name="name"
          redirect={redirectToEp}
          credits={data.episodes}
          title="Episodes"
        />
      )}
      {data && data.credits.cast.length > 0 && (
        <PersonCredit credits={data.credits.cast} title="Cast" />
      )}
    </>
  );
};

export default Seasons;
