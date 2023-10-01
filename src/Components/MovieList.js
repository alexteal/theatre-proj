import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Css/MovieList.css';

function MovieList({ movies }) {
  const [showTrailer, setShowTrailer] = useState(false);
  const [currentTrailerUrl, setCurrentTrailerUrl] = useState('');
  const [currentMovie, setCurrentMovie] = useState(null); // New state variable

  const openTrailer = (movie) => { // Accepts movie object as a parameter now
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
        <div className="movie-poster" key={index} onClick={() => openTrailer(movie)}>
          <img src={movie.poster} alt={`Movie Poster ${index + 1}`} />
          <h3>{movie.title}</h3>
        </div>
      ))}
      {showTrailer && (
        <div className="trailer-popup">
          <iframe width="560" height="315" src={currentTrailerUrl} frameBorder="0" allowFullScreen></iframe>
          <div className="trailer-buttons">
            <button onClick={() => setShowTrailer(false)}>Close Trailer</button>
            <button onClick={bookTickets}>Book Tickets</button> {/* No need to pass movie title here */}
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieList;
