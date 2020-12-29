import React, { useState } from "react";
import "./Auth.css";
import { useDispatch, useSelector } from "react-redux";
import { auth, clearError } from "../../store/actions/auth";
import { clearError as clearErrorFWW } from "../../store/actions/fww";
import { Redirect } from "react-router";
import LoadingIndicator from "../../UI/LoadingIndicator";
import ErrorModal from "../../UI/ErrorModal";

const Auth = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
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
        <div className="auth">
          <form onSubmit={onSubmitHandler}>
            {!isLogin && (
              <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setAuthError("");
                }}
              />
            )}
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setAuthError("");
              }}
            />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setAuthError("");
              }}
            />
            <button>Submit</button>
          </form>
          {authError && <p>({authError})</p>}
          <button onClick={() => setIsLogin(!isLogin)}>
            Switch To {isLogin ? "Signup" : "Login"}
          </button>
        </div>
      )}
    </>
  );
};

export default Auth;
