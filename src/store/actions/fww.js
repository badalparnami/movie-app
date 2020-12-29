import axios from "axios";

const lists = {
  f: {
    add: "ADD_FAV_SUCCESS",
    remove: "REMOVE_FAV_SUCCESS",
  },
  wl: {
    add: "ADD_WATCHLIST_SUCCESS",
    remove: "REMOVE_WATCHLIST_SUCCESS",
  },
  wd: {
    add: "ADD_WATCHED_SUCCESS",
    remove: "REMOVE_WATCHED_SUCCESS",
  },
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  return {
    type: "AUTH_LOGOUT",
  };
};

const addStart = () => {
  return {
    type: "ADD_START",
  };
};

const removeStart = () => {
  return {
    type: "REMOVE_START",
  };
};

const addFail = (error) => {
  return {
    type: "ADD_FAIL",
    error,
  };
};

const removeFail = (error) => {
  return {
    type: "REMOVE_FAIL",
    error,
  };
};

const addSuccess = (item, fww) => {
  return {
    type: lists[fww].add,
    item,
  };
};

const removeSuccess = (id, fww) => {
  return {
    type: lists[fww].remove,
    id,
  };
};

const getDataStart = () => {
  return {
    type: "GET_DATA_START",
  };
};

const getDataSuccess = (name, favourite, watchlist, watched) => {
  return {
    type: "GET_DATA_SUCCESS",
    name: name,
    favourite: favourite,
    watched: watched,
    watchlist: watchlist,
  };
};

const getDataFail = (error) => {
  return {
    type: "GET_DATA_FAIL",
    error: error,
  };
};

export const clearError = () => {
  return {
    type: "CLEAR",
  };
};

export const getUserData = (token) => {
  return (dispatch) => {
    dispatch(getDataStart());
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/auth/data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(
          getDataSuccess(
            res.data.name,
            res.data.favourite,
            res.data.watchlist,
            res.data.watched
          )
        );
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 401 || err.response.status === 403) {
            dispatch(logout());
            dispatch(getDataFail(err.response.data.message));
          } else {
            dispatch(getDataFail(err.response.data.message));
          }
        } else if (err.request) {
          dispatch(getDataFail("Slow Network Speed. Try Again later."));
        } else {
          dispatch(getDataFail("Oops!! Unusual error occurred"));
        }
      });
  };
};

export const addToFww = (name, image, uid, type, token, fww) => {
  return (dispatch) => {
    dispatch(addStart());
    if (!token || token === null || token === "null") {
      dispatch(addFail("You need to login to use this feature"));
      return;
    }
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/addfww/${fww}`,
        { name, image, uid, type },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(addSuccess(res.data.item, fww));
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 401 || err.response.status === 403) {
            dispatch(logout());
            dispatch(addFail(err.response.data.message));
          } else {
            dispatch(addFail(err.response.data.message));
          }
        } else if (err.request) {
          dispatch(addFail("Slow Network Speed. Try Again later."));
        } else {
          dispatch(addFail("Oops!! Unusual error occurred"));
        }
      });
  };
};

export const removeToFww = (id, token, fww) => {
  return (dispatch) => {
    dispatch(removeStart());
    if (!token || token === null || token === "null") {
      dispatch(removeFail("You need to login to use this feature"));
      return;
    }
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/removefww/${fww}`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => dispatch(removeSuccess(id, fww)))
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 401 || err.response.status === 403) {
            dispatch(logout());
            dispatch(removeFail(err.response.data.message));
          } else {
            dispatch(removeFail(err.response.data.message));
          }
        } else if (err.request) {
          dispatch(removeFail("Slow Network Speed. Try Again later."));
        } else {
          dispatch(removeFail("Oops!! Unusual error occurred"));
        }
      });
  };
};
