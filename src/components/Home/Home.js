import React from "react";
import { NavLink } from "react-router-dom";

import "./Home.css";
import MovieMain from "../Movie/Main/Main";
import TvMain from "../Tv/Main/Main";
import PersonMain from "../Person/Main/Main";

const Home = () => {
  return (
    <div className="home">
      <div className="movie entertainment-show">
        <div className="more">
          <p>Popular Movies</p>
          <NavLink className="view-pc" to="/movie/popular">
            View More
          </NavLink>
        </div>
        <MovieMain eff="p" num={5} />
        <div className="view-mob">
          <NavLink to="/movie/popular">View More</NavLink>
        </div>
      </div>
      <div className="tv entertainment-show">
        <div className="more">
          <p>Popular Tv Shows</p>
          <NavLink className="view-pc" to="/tv/popular">
            View More
          </NavLink>
        </div>
        <TvMain eff="p" num={5} />
        <div className="view-mob">
          <NavLink to="/tv/popular">View More</NavLink>
        </div>
      </div>
      <div className="person entertainment-show">
        <div className="more">
          <p>Popular Persons</p>
          <NavLink className="view-pc" to="/person/popular">
            View More
          </NavLink>
        </div>
        <PersonMain num={5} />
        <div className="view-mob">
          <NavLink to="/person/popular">View More</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Home;
