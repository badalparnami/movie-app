import { useState } from "react";
import axios from "axios";

const genderDetails = {
  1: "Herself",
  2: "Himself",
  3: "Self",
};

const useHttp = () => {
  const [data, setData] = useState("");
  const [totalPage, setTotalPage] = useState("");
  const [provider, setProvider] = useState("");
  const [rating, setRating] = useState("");
  const [gender, setGender] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const startFetching = () => {
    setData("");
    setLoading(true);
    setError("");
  };

  const clear = () => {
    setData("");
    setError("");
  };

  const fetchedData = () => {
    setLoading(false);
    setError("");
  };

  const dataToUpdate = (data, code) => {
    switch (code) {
      case "d":
        setData(data.data);
        break;
      case "dt":
        setData(data.data.results);
        setTotalPage(data.data.total_pages);
        break;
      case "dpr":
        setData(data.data);
        setProvider(data.providers.results);
        setRating(data.rating);
        break;
      case "dg":
        setData(data.data);
        setGender(genderDetails[data.data.gender]);
        break;
      default:
        return data;
    }
  };

  const requestData = (url, code) => {
    startFetching(setData);
    axios
      .get(url)
      .then((response) => {
        fetchedData();
        dataToUpdate(response.data, code);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          if (err.response.status === 404) {
            if (err.response.data.code === 404) {
              setError("No Results Found");
            } else {
              setError("Some or More Data Not found");
            }
          } else if (err.response.status === 401) {
            setError("Something went wrong while fetching data");
          } else {
            setError(`Server Side Error #${err.response.status}`);
          }
        } else if (err.request) {
          setError("Slow Network Speed. Try Again later.");
        } else {
          setError("Oops!! Unusual error occurred");
        }
      });
  };

  return {
    loading,
    error,
    requestData,
    clear,
    data,
    totalPage,
    provider,
    rating,
    gender,
  };
};

export default useHttp;
