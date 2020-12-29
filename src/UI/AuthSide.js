import React from "react";

import "./AuthSide.css";

const AuthSide = ({ show }) => {
  return (
    <div className="auth-side">
      <p>• Log the movies and tv shows you have watched.</p>
      <p>• Keep track of your favourite movies and tv shows.</p>
      <p>• Build and maintain a personal watchlist.</p>
      <p>
        • Build custom mixed lists (movies and tv) <span>(Coming Soon)</span>
      </p>
    </div>
  );
};

export default AuthSide;
