import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./Detail.css";

import { TypeCredit } from "../../Credits/Credits";
import Social from "../../Social/Social";
import Images from "../../Image/Image";
import useHttp from "../../../hooks/http";
import ErrorModal from "../../../UI/ErrorModal";
import LoadingIndicator from "../../../UI/LoadingIndicator";
import { ImageSmall, Overview } from "../../../Dumb/Small/Small";

const Detail = (props) => {
  const { data, error, loading, requestData, clear, gender } = useHttp();
  const [showAll, setShowAll] = useState(false);

  const id = useParams().id || props.id;
  useEffect(() => {
    requestData(
      `${process.env.REACT_APP_BACKEND_URL}/person/detail/${id}`,
      "dg"
    );
  }, [id]);

  return (
    <>
      {error && <ErrorModal onClose={() => clear()}>{error}</ErrorModal>}
      {loading && <LoadingIndicator />}
      <div className="entertainment-detail">
        {data && (
          <>
            <ImageSmall
              path={data.profile_path}
              title={data.name}
              size="w300"
            />
            <div className="content">
              <h1>{data.name}</h1>
              {data.biography && (
                <Overview
                  title="Biography"
                  overview={data.biography}
                  classHide={showAll ? "show-all" : "hide"}
                  setShowAll={setShowAll}
                  showAll={showAll}
                />
              )}
              <Social ids={data.external_ids} />
            </div>
          </>
        )}
      </div>
      {data && data.combined_credits.cast.length > 0 && (
        <TypeCredit
          credits={data.combined_credits.cast
            .filter((cast) => cast.character !== gender)
            .sort((a, b) => b.popularity - a.popularity)}
          title={"Known For"}
        />
      )}
      {data &&
        data.known_for_department !== "Acting" &&
        data.combined_credits.crew.length > 0 && (
          <TypeCredit
            credits={data.combined_credits.crew}
            title={"Known For (Crew)"}
          />
        )}
      {data && data.images.profiles.length > 0 && (
        <Images
          images={data.images.profiles}
          name={data.name}
          title="Profiles"
        />
      )}
    </>
  );
};

export default Detail;
