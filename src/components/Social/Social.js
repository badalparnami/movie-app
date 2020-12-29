import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagramSquare,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";
import "./Social.css";

const Social = ({ ids }) => {
  // return (
  //   <>
  //     {(ids.facebook_id || ids.instagram_id || ids.twitter_id) && (
  //       <div className="social">
  //         <p>
  //           Social handles:
  //           {ids.facebook_id && (
  //             <a
  //               target="_blank"
  //               rel="noreferrer"
  //               href={`https://www.facebook.com/${ids.facebook_id}`}
  //             >
  //               Facebook
  //             </a>
  //           )}
  //           {ids.instagram_id && (
  //             <a
  //               target="_blank"
  //               rel="noreferrer"
  //               href={`https://www.instagram.com/${ids.instagram_id}`}
  //             >
  //               Instagram
  //             </a>
  //           )}
  //           {ids.twitter_id && (
  //             <a
  //               target="_blank"
  //               rel="noreferrer"
  //               href={`https://twitter.com/${ids.twitter_id}`}
  //             >
  //               Twitter
  //             </a>
  //           )}
  //         </p>
  //       </div>
  //     )}
  //   </>
  // );

  return (
    <>
      {(ids.facebook_id || ids.instagram_id || ids.twitter_id) && (
        <div className="social">
          <p>Social handles:</p>
          <div className="social-icons">
            {ids.facebook_id && (
              <FontAwesomeIcon
                size="3x"
                icon={faFacebookSquare}
                className="fb"
                onClick={() =>
                  window.open(
                    `https://www.facebook.com/${ids.facebook_id}`,
                    "_blank"
                  )
                }
              />
            )}
            {ids.instagram_id && (
              <FontAwesomeIcon
                size="3x"
                icon={faInstagramSquare}
                className="insta"
                onClick={() =>
                  window.open(
                    `https://www.instagram.com/${ids.instagram_id}`,
                    "_blank"
                  )
                }
              />
            )}
            {ids.twitter_id && (
              <FontAwesomeIcon
                size="3x"
                icon={faTwitterSquare}
                className="twitter"
                onClick={() =>
                  window.open(`https://twitter.com/${ids.twitter_id}`, "_blank")
                }
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Social;
