import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsync, clearError } from "../../../store/actions/auth";

import ErrorModal from "../../../UI/ErrorModal";
import LoadingIndicator from "../../../UI/LoadingIndicator";

const Logout = () => {
  const { token, error, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(logoutAsync(token));
    }
  }, []);

  if (token) {
    return (
      <>
        {error && (
          <ErrorModal onClose={() => dispatch(clearError())}>
            {error}
          </ErrorModal>
        )}
        {loading && <LoadingIndicator />}
      </>
    );
  } else {
    return <Redirect to="/auth" />;
  }
};

export default Logout;
