import React, { useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import { useMovieContext } from "../../context/MovieContext";
import { getMovies } from "../../dataService";
import MovieList from "../../components/movie-list/MovieList";

const Home = () => {
  const { state, dispatch } = useMovieContext();
  console.log("state", state);

  useEffect(() => {
    console.log("inside useEffect");
    getMovies()
      .then((data) => {
        console.log("Fetched movies:", data);
        const currentlyRunningMovies = [];
        const comingSoonMovies = [];
        for (const movieName in data) {
          const movie = data[movieName];
          if (movieName && movie.title) {
            const movieData = {
              poster: movie.thumbnail,
              title: movie.title,
              trailerUrl: movie.trailerUrl,
            };
            if (movie.running) {
              currentlyRunningMovies.push(movieData);
            } else {
              comingSoonMovies.push(movieData);
            }
          }
        }
        dispatch({
          type: "SET_RUNNING_MOVIES",
          payload: currentlyRunningMovies,
        });
        dispatch({
          type: "SET_COMING_SOON_MOVIES",
          payload: comingSoonMovies,
        });
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [dispatch]);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="movie-section">
          <div className="movie-posters">
            <h1 className="currently-running show-status">Currently Running</h1>
            <MovieList movies={state.runningMovies} editable={false}/>
          </div>
          <div className="movie-posters">
            <h1 className="coming-soon show-status">Coming Soon</h1>
            <MovieList movies={state.comingSoonMovies} editable={false}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
