import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as faStarSolid,
  faCheckCircle as faCheckCircleSolid,
} from "@fortawesome/free-solid-svg-icons";
import {
  faStar,
  faCheckCircle,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-regular-svg-icons";

import "./Icon.css";

const IconGrid = ({ isFav, isWl, isWd, addRemove }) => {
  return (
    <>
      {isWd === false && isWl === false && (
        <div className="icons-three icons">
          <FontAwesomeIcon
            onClick={() => addRemove("f")}
            size="3x"
            icon={isFav ? faStarSolid : faStar}
            color={isFav ? "crimson" : ""}
          />
          <FontAwesomeIcon
            onClick={() => addRemove("wl")}
            size="3x"
            icon={isWl ? faEyeSlash : faEye}
            color={isWl ? "crimson" : ""}
          />
          <FontAwesomeIcon
            onClick={() => addRemove("wd")}
            size="3x"
            icon={isWd ? faCheckCircleSolid : faCheckCircle}
            color={isWd ? "crimson" : ""}
          />
          <p>Favourite</p>
          <p>Watchlist</p>
          <p>Watched</p>
        </div>
      )}
      {isWd && (
        <div className="icons-two icons">
          <FontAwesomeIcon
            onClick={() => addRemove("f")}
            size="3x"
            icon={isFav ? faStarSolid : faStar}
            color={isFav ? "crimson" : ""}
          />
          <FontAwesomeIcon
            onClick={() => addRemove("wd")}
            size="3x"
            icon={isWd ? faCheckCircleSolid : faCheckCircle}
            color={isWd ? "crimson" : ""}
          />
          <p>Favourite</p>
          <p>Watched</p>
        </div>
      )}
      {isWl && (
        <div className="icons-two icons">
          <FontAwesomeIcon
            onClick={() => addRemove("f")}
            size="3x"
            icon={isFav ? faStarSolid : faStar}
            color={isFav ? "crimson" : ""}
          />
          <FontAwesomeIcon
            onClick={() => addRemove("wl")}
            size="3x"
            icon={isWl ? faEyeSlash : faEye}
            color={isWl ? "crimson" : ""}
          />
          <p>Favourite</p>
          <p>Watchlist</p>
        </div>
      )}
    </>
  );
};

export default IconGrid;
