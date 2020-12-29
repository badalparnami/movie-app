import axios from "axios";

const authStart = () => {
  return {
    type: "AUTH_START",
  };
};

const authSuccess = (idToken, userId) => {
  return {
    type: "AUTH_SUCCESS",
    idToken: idToken,
    userId: userId,
  };
};

const authFail = (error) => {
  return {
    type: "AUTH_FAIL",
    error: error,
  };
};

export const clearError = () => {
  return {
    type: "CLEAR",
  };
};

const logoutStart = () => {
  return {
    type: "LOGOUT_START",
  };
};

const logoutFail = (error) => {
  return {
    type: "LOGOUT_FAIL",
    error,
  };
};

export const logoutAsync = (token) => {
  return (dispatch) => {
    dispatch(logoutStart());
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, { token })
      .then((res) => {
        dispatch(logout());
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 401 || err.response.status === 403) {
            dispatch(logout());
          } else {
            dispatch(logoutFail(err.response.data.message));
          }
        } else if (err.request) {
          dispatch(logoutFail("Slow Network Speed. Try Again later."));
        } else {
          dispatch(logoutFail("Oops!! Unusual error occurred"));
        }
      });
  };
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  return {
    type: "AUTH_LOGOUT",
  };
};

export const auth = (email, password, isLogin, name) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      name,
    };
    let url = `${process.env.REACT_APP_BACKEND_URL}/auth/login`;
    if (!isLogin) {
      url = `${process.env.REACT_APP_BACKEND_URL}/auth/signup`;
    }
    axios
      .post(url, authData)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        dispatch(authSuccess(res.data.token, res.data.userId));
      })
      .catch((err) => {
        if (err.response) {
          dispatch(authFail(err.response.data.message));
        } else if (err.request) {
          dispatch(authFail("Slow Network Speed. Try Again later."));
        } else {
          dispatch(authFail("Oops!! Unusual error occurred"));
        }
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token, userId));
      }
    }
  };
};
