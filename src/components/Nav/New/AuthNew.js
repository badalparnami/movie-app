import React, { useState } from "react";
import "./New.css";
import { useDispatch, useSelector } from "react-redux";
import { auth, clearError } from "../../../store/actions/auth";
import { clearError as clearErrorFWW } from "../../../store/actions/fww";
import { Redirect } from "react-router";
import LoadingIndicator from "../../../UI/LoadingIndicator";
import ErrorModal from "../../../UI/ErrorModal";

const Auth = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const { token, error, loading } = useSelector((state) => state.auth);
  const { errorR, loadingR } = useSelector((state) => state.fww);

  let isAuth = null;

  if (!!token) {
    isAuth = <Redirect to="/profile" />;
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setAuthError("");
    if (!isLogin && name.trim().length < 3) {
      setAuthError("Name should be of more than 2 letters");
      return;
    }
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
    } else {
      setAuthError("You have entered an invalid email address!");
      return;
    }
    if (password.length < 6) {
      setAuthError("Password should be of minimum 6 characters");
      return;
    }

    dispatch(auth(email, password, isLogin, name));

    setName("");
    setEmail("");
    setPassword("");
  };

  const clear = () => {
    if (error) {
      dispatch(clearError());
    } else {
      dispatch(clearErrorFWW());
    }
  };

  return (
    <>
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      {loading && <LoadingIndicator />}
      {errorR && <ErrorModal onClose={clear}>{errorR}</ErrorModal>}
      {loadingR && <LoadingIndicator />}
      {isAuth}
      {!loading && !loadingR && (
        <div className="auth-body">
          <form
            onSubmit={onSubmitHandler}
            className="signup"
            autoComplete="off"
          >
            <h1>{isLogin ? "Login" : "Create account"}</h1>
            {isLogin ? (
              <h2>
                Don't have an account?{" "}
                <span onClick={() => setIsLogin(!isLogin)}>Sign up</span>
              </h2>
            ) : (
              <h2>
                Already have an account?{" "}
                <span onClick={() => setIsLogin(!isLogin)}>Sign in</span>
              </h2>
            )}

            {!isLogin && (
              <div className="signup__field">
                <input
                  className="signup__input"
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setAuthError("");
                  }}
                />
                <label className="signup__label" htmlFor="name">
                  Name
                </label>
              </div>
            )}

            <div className="signup__field">
              <input
                className="signup__input"
                type="text"
                name="email"
                id="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setAuthError("");
                }}
              />
              <label className="signup__label" htmlFor="email">
                Email
              </label>
            </div>

            <div className="signup__field">
              <input
                className="signup__input"
                type="password"
                name="password"
                id="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setAuthError("");
                }}
              />
              <label className="signup__label" htmlFor="password">
                Password
              </label>
            </div>
            <button>{isLogin ? "Sign in" : "Sign up"}</button>
          </form>
          {authError && <p>({authError})</p>}
        </div>
      )}
    </>
  );
};

export default Auth;
