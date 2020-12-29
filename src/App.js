import { Route, Switch, Redirect } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Movie from "./components/Movie/Movie";
import MovieMain from "./components/Movie/Main/Main";
import MovieDetail from "./components/Movie/Detail/Detail";
import PersonMain from "./components/Person/Main/Main";
import PersonDetail from "./components/Person/Detail/Detail";
import Tv from "./components/Tv/Tv";
import TvMain from "./components/Tv/Main/Main";
import TvDetail from "./components/Tv/Detail/Detail";
import TvSeasons from "./components/Tv/Seasons/Seasons";
import TvEpisodes from "./components/Tv/Episodes/Episodes";
import Search from "./components/Search/Search";
// import Auth from "./components/Auth/Auth";
import Logout from "./components/Auth/Logout/Logout";
import Profile from "./components/User/Profile/Profile";
import FwwDisplay from "./components/User/FwwDisplay/FwwDisplay";
import { authCheckState } from "./store/actions/auth";
import { getUserData } from "./store/actions/fww";
import AuthNew from "./components/Nav/New/AuthNew";
import NotFound from "./Dumb/NotFound/NotFound";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(authCheckState());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(getUserData(token));
    }
  }, [token]);

  return (
    <div>
      <Nav />
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={AuthNew} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/profile" exact component={Profile} />

          <Route
            path="/profile/favourite"
            exact
            render={(props) => <FwwDisplay {...props} eff="f" />}
          />

          <Route
            path="/profile/watched"
            exact
            render={(props) => <FwwDisplay {...props} eff="wd" />}
          />

          <Route
            path="/profile/watchlist"
            exact
            render={(props) => <FwwDisplay {...props} eff="wl" />}
          />

          <Route path="/movie" exact component={Movie} />

          <Route
            path="/movie/popular"
            exact
            render={(props) => <MovieMain {...props} eff="p" />}
          />
          <Route
            path="/movie/top_rated"
            exact
            render={(props) => <MovieMain {...props} eff="tr" />}
          />
          <Route
            path="/movie/upcoming"
            exact
            render={(props) => <MovieMain {...props} eff="u" />}
          />
          <Route
            path="/movie/now_playing"
            exact
            render={(props) => <MovieMain {...props} eff="np" />}
          />
          <Route path="/movie/:id" exact component={MovieDetail} />
          <Route path="/person/popular" exact component={PersonMain} />
          <Route path="/person/:id" exact component={PersonDetail} />

          <Route path="/tv" exact component={Tv} />
          <Route
            path="/tv/popular"
            exact
            render={(props) => <TvMain {...props} eff="p" />}
          />
          <Route
            path="/tv/top_rated"
            exact
            render={(props) => <TvMain {...props} eff="tr" />}
          />
          <Route path="/tv/:id" exact component={TvDetail} />
          <Route path="/tv/:id/season/:sid" exact component={TvSeasons} />
          <Route
            path="/tv/:id/season/:sid/episode/:epid"
            exact
            component={TvEpisodes}
          />
          <Route path="/search" exact component={Search} />
          <Route path="/404" component={NotFound} />
          <Redirect to="/404" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
