import React from "react";

const Provider = ({ provider }) => {
  return (
    <div>
      {provider &&
      provider.hasOwnProperty("IN") &&
      provider["IN"]["flatrate"] ? (
        <p className="provider">
          {`Streaming on `}
          {provider["IN"]["flatrate"].map((p) => p.provider_name).join(" | ")}
        </p>
      ) : null}
      {provider && provider.hasOwnProperty("IN") && provider["IN"]["free"] ? (
        <p className="provider">
          {`Free on `}
          {provider["IN"]["free"].map((p) => p.provider_name).join(" | ")}
        </p>
      ) : null}
    </div>
  );
};

export default Provider;
