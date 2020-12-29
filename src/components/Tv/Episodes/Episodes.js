import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import "./Episodes.css";
import { PersonCredit } from "../../Credits/Credits";
import Images from "../../Image/Image";
import useHttp from "../../../hooks/http";
import ErrorModal from "../../../UI/ErrorModal";
import LoadingIndicator from "../../../UI/LoadingIndicator";
import {
  Trailer,
  ImageSmall,
  OverviewOther as Overview,
} from "../../../Dumb/Small/Small";

const Episodes = (props) => {
  // const [data, setData] = useState("");
  const { data, error, loading, requestData, clear } = useHttp();

  const id = useParams().id || props.id;
  const seasonId = useParams().sid;
  const episodeId = useParams().epid;

  useEffect(() => {
    requestData(
      `${process.env.REACT_APP_BACKEND_URL}/tv/season/eps/detail/${id}/${seasonId}/${episodeId}`,
      "d"
    );
  }, [id, seasonId, episodeId]);

  return (
    <>
      {error && <ErrorModal onClose={() => clear()}>{error}</ErrorModal>}
      {loading && <LoadingIndicator />}
      <div className="entertainment-detail">
        {data && (
          <>
            <ImageSmall
              path={data.still_path}
              title={data.name}
              size="w400"
              isClass="isEp"
            />
            <div className="content">
              <h1>{data.name}</h1>
              <h4>{`Release Date - ${data.air_date}`}</h4>
              <h4>{`Season - ${data.season_number} | Episode - ${data.episode_number}`}</h4>
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
      {data && data.credits.cast.length > 0 && (
        <PersonCredit credits={data.credits.cast} title="Cast" />
      )}
      {data && data.credits.guest_stars.length > 0 && (
        <PersonCredit credits={data.credits.guest_stars} title="Guest Stars" />
      )}
      {data && data.images.stills.length > 1 && (
        <Images images={data.images.stills} name={data.name} title="Stills" />
      )}
    </>
  );
};

export default Episodes;
