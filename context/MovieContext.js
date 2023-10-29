import { createContext, useContext, useReducer } from "react";

const MovieContext = createContext();

export const useMovieContext = () => {
  return useContext(MovieContext);
};

const movieReducer = (state, action) => {
  switch (action.type) {
    case "SET_RUNNING_MOVIES":
      return { ...state, runningMovies: action.payload };
    case "SET_COMING_SOON_MOVIES":
      return { ...state, comingSoonMovies: action.payload };
    default:
      return state;
  }
};

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, {
    runningMovies: [],
    comingSoonMovies: [], 
  });

  return (
    <MovieContext.Provider value={{ state, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
};
