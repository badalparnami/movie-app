import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { removeToFww } from "../store/actions/fww";

const useFww = (id) => {
  const [isFav, setIsFav] = useState(false);
  const [isWl, setIsWl] = useState(false);
  const [isWd, setisWd] = useState(false);
  const dispatch = useDispatch();
  const { favourite, watched, watchlist } = useSelector((store) => store.fww);
  const { token } = useSelector((store) => store.auth);

  const removeHelper = {
    f: {
      state: isFav,
      from: favourite,
      name: "f",
    },
    wl: {
      state: isWl,
      from: watchlist,
      name: "wl",
    },
    wd: {
      state: isWd,
      from: watched,
      name: "wd",
    },
  };

  useEffect(() => {
    const is = favourite.find((fav) => fav.uid === +id);
    setIsFav(!!is);
  }, [id, favourite]);

  useEffect(() => {
    const is = watchlist.find((fav) => fav.uid === +id);
    setIsWl(!!is);
  }, [id, watchlist]);

  useEffect(() => {
    const is = watched.find((fav) => fav.uid === +id);
    setisWd(!!is);
  }, [id, watched]);

  const remove = (listName) => {
    if (removeHelper[listName].state) {
      dispatch(
        removeToFww(
          removeHelper[listName].from.find((item) => item.uid === +id)._id,
          token,
          removeHelper[listName].name
        )
      );
    }
  };

  return { isFav, isWl, isWd, remove };
};

export default useFww;
