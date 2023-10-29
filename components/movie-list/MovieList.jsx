import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./movie-list.scss";

function MovieList({ movies, editable, startEditing, handleDelete }) {
  const [showTrailer, setShowTrailer] = useState(false);
  const [currentTrailerUrl, setCurrentTrailerUrl] = useState("");
  const [currentMovie, setCurrentMovie] = useState(null); // New state variable

  const openTrailer = (movie) => {
    // Accepts movie object as a parameter now
    setCurrentTrailerUrl(movie.trailerUrl);
    setCurrentMovie(movie); // Set the current movie
    setShowTrailer(true);
  };

  const navigate = useNavigate();

  const bookTickets = () => {
    if (currentMovie) {
      navigate(`/book/${currentMovie.title}`);
    }
  };

  return (
    <div className="movie-list">
      {movies.map((movie, index) => (
        <div className="movie-poster" key={index}>
          <img
            src={movie.poster ? movie.poster : "assets/images/placeholder.png"}
            alt={`Movie Poster ${index + 1}`}
            onClick={() => openTrailer(movie)}
          />
          <h3 onClick={() => openTrailer(movie)}>{movie.title}</h3>
          {editable && (
            <div className="action-buttons">
              <button onClick={() => startEditing(movie.movieId, movie)}>
                Edit
              </button>
              <button onClick={() => handleDelete(movie.movieId)}>
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
      {showTrailer && (
        <div className="trailer-popup">
          <iframe
            width="560"
            height="315"
            src={currentTrailerUrl}
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <div className="trailer-buttons">
            <button
              className="close-trailer"
              onClick={() => setShowTrailer(false)}
            >
              Close Trailer
            </button>
            <button className="book-tickets" onClick={bookTickets}>
              Book Tickets
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieList;
