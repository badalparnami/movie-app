import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Nav.css";

const Nav = () => {
  const { userId } = useSelector((state) => state.auth);
  // return (
  //   <div className="nav-main">
  //     <div className="nav">
  //       <div className="home">
  //         <p>HOME</p>
  //         <NavLink exact to="/">
  //           HOME
  //         </NavLink>
  //         <NavLink to="/search">SEARCH</NavLink>
  //         {!userId ? (
  //           <NavLink to="/auth">AUTH</NavLink>
  //         ) : (
  //           <NavLink to="/logout">LOGOUT</NavLink>
  //         )}
  //       </div>
  //       <div className="movie">
  //         <p>MOVIES</p>
  //         <NavLink to="/movie/popular">POPULAR</NavLink>
  //         <NavLink to="/movie/top_rated">Top Rated</NavLink>
  //         <NavLink to="/movie/upcoming">Upcoming</NavLink>
  //         <NavLink to="/movie/now_playing">Now Playing</NavLink>
  //       </div>
  //       <div className="tv">
  //         <p>TV SHOWS</p>
  //         <NavLink to="/tv/popular">Popular</NavLink>
  //         <NavLink to="/tv/top_rated">Top Rated</NavLink>
  //       </div>
  //       <div className="person">
  //         <p>PERSON</p>
  //         <NavLink to="/person/popular">Popular</NavLink>
  //       </div>
  //       {userId && (
  //         <div className="user">
  //           <p>USER</p>
  //           <NavLink exact to="/profile">
  //             Profile
  //           </NavLink>
  //           <NavLink to="/profile/favourite">Favourite</NavLink>
  //           <NavLink to="/profile/watchlist">Watchlist</NavLink>
  //           <NavLink to="/profile/watched">Watched</NavLink>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );

  return (
    <div className="nav-main">
      <div className="nav">
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink to="/movie">Movies</NavLink>
        <NavLink to="/tv">Tv Shows</NavLink>
        <NavLink to="/person/popular">Person</NavLink>
        <NavLink to="/search">Search</NavLink>
        {!userId ? (
          <NavLink to="/auth">AUTH</NavLink>
        ) : (
          <NavLink to="/profile">Profile</NavLink>
        )}
      </div>
    </div>
  );
};

export default Nav;
