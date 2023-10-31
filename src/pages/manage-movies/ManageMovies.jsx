import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import {
  deleteMovieData,
  getMovies,
  updateMovieData,
  writeMovieData,
} from "../../dataService";
import "./manage-movies.scss";
import MovieList from "../../components/movie-list/MovieList";

const ManageMovies = () => {
  const [currentlyRunningMovies, setCurrentlyRunningMovies] = useState([]);
  const [comingSoonMovies, setComingSoonMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [running, setRunning] = useState(false);
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState("");
  const [currentMovie, setCurrentMovie] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    getMovies()
      .then((data) => {
        console.log("Fetched movies:", data);
        const currentlyRunningMovies = [];
        const comingSoonMovies = [];
        for (const movieName in data) {
          console.log(movieName);
          const movie = data[movieName];
          if (movieName && movie.title) {
            const movieData = {
              movieId: movieName,
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
        setCurrentlyRunningMovies(currentlyRunningMovies);
        setComingSoonMovies(comingSoonMovies);
        setStatus("Movie successfully fetched!");
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [status]);

  console.log(currentlyRunningMovies);
  console.log(comingSoonMovies);

  const handleSubmit = (e) => {
    e.preventDefault();
    writeMovieData(title, trailerUrl, thumbnail, running)
      .then(() => {
        alert("Movie successfully added!");
        setStatus("Movie successfully added!");
        setTitle("");
        setTrailerUrl("");
        setThumbnail("");
        setRunning(false);
      })
      .catch((error) => {
        console.error("Error adding movie:", error);
        alert("Failed to add movie.");
      });
  };

  const startEditing = (movieId, movie) => {
    setSelectedMovieId(movieId);
    setTitle(movie.title);
    setTrailerUrl(movie.trailerUrl);
    setThumbnail(movie.poster);
    setRunning(Boolean(movie.running)); // Explicitly cast to boolean
    setCurrentMovie(movie);
    setEditing(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (currentMovie) {
      updateMovieData(selectedMovieId, title, trailerUrl, thumbnail, running)
        .then(() => {
          alert("Movie successfully updated!");
          setStatus("Movie updated!");
          setTitle("");
          setTrailerUrl("");
          setThumbnail("");
          setRunning(false);
          setEditing(false);
        })
        .catch((error) => {
          console.error("Error updating movie:", error);
          alert("Failed to update movie.");
        });
    }
  };

  const handleDelete = (movieId) => {
    deleteMovieData(movieId)
      .then(() => {
        setStatus("Movie deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting movie:", error);
      });
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="manage-movies">
          <div className="movie-form">
            {editing ? <h2>Edit Movie</h2> : <h2>Add New Movie</h2>}
            <form onSubmit={editing ? handleUpdate : handleSubmit}>
              <div className="input-group">
                <label>
                  Title
                  <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className="input-group">
                <label>
                  Trailer URL
                  <input
                    type="text"
                    placeholder="Trailer URL"
                    value={trailerUrl}
                    onChange={(e) => setTrailerUrl(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className="input-group">
                <label>
                  Thumbnail URL
                  <input
                    type="text"
                    placeholder="Thumbnail URL"
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className="">
                <label className="mm-checkbox-container">
                  <input
                    type="checkbox"
                    className="mm-checkbox"
                    checked={running}
                    onChange={(e) => setRunning(e.target.checked)}
                  />
                  Currently Running
                </label>
              </div>
              <button type="submit">
                {editing ? "Update Movie" : "Add Movie"}
              </button>
            </form>
          </div>
          <div className="movie-section">
            <div className="movie-posters">
              <h1 className="currently-running show-status">
                Currently Running
              </h1>
              <MovieList
                movies={currentlyRunningMovies}
                editable={true}
                startEditing={startEditing}
                handleDelete={handleDelete}
              />
            </div>

            <div className="movie-posters">
              <h1 className="coming-soon show-status">Coming Soon</h1>
              <MovieList
                movies={comingSoonMovies}
                editable={true}
                startEditing={startEditing}
                handleDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageMovies;
