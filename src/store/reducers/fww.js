const initialState = {
  name: null,
  favourite: [],
  watched: [],
  watchlist: [],
  errorR: null,
  loadingR: false,
};

const fwwReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_START":
    case "ADD_START":
    case "REMOVE_START":
      return {
        ...state,
        errorR: null,
        loadingR: true,
      };
    case "GET_DATA_FAIL":
    case "ADD_FAIL":
    case "REMOVE_FAIL":
      return {
        ...state,
        errorR: action.error,
        loadingR: false,
      };
    case "GET_DATA_SUCCESS":
      return {
        ...state,
        name: action.name,
        favourite: action.favourite,
        watched: action.watched,
        watchlist: action.watchlist,
        loadingR: false,
        errorR: null,
      };
    case "ADD_FAV_SUCCESS":
      const newFav = {
        ...action.item,
      };
      return {
        ...state,
        errorR: null,
        favourite: state.favourite.concat(newFav),
        loadingR: false,
      };
    case "ADD_WATCHLIST_SUCCESS":
      const newWl = {
        ...action.item,
      };
      return {
        ...state,
        errorR: null,
        loadingR: false,
        watchlist: state.watchlist.concat(newWl),
      };
    case "ADD_WATCHED_SUCCESS":
      const newWd = {
        ...action.item,
      };
      return {
        ...state,
        errorR: null,
        loadingR: false,
        watched: state.watched.concat(newWd),
      };
    case "REMOVE_FAV_SUCCESS":
      const newFavs = state.favourite.filter((f) => f._id !== action.id);
      return {
        ...state,
        favourite: [...newFavs],
        loadingR: false,
        errorR: null,
      };
    case "REMOVE_WATCHLIST_SUCCESS":
      const newWls = state.watchlist.filter((w) => w._id !== action.id);
      return {
        ...state,
        loadingR: false,
        errorR: null,
        watchlist: [...newWls],
      };
    case "REMOVE_WATCHED_SUCCESS":
      const newWds = state.watched.filter((w) => w._id !== action.id);
      return {
        ...state,
        loadingR: false,
        errorR: null,
        watched: [...newWds],
      };
    case "CLEAR":
      return {
        ...state,
        errorR: null,
      };
    default:
      return state;
  }
};

export default fwwReducer;
