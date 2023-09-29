import React from 'react';

const MovieList = ({ movies, onDeleteMovie, onAddToCart }) => {
  return (
    <div className="movie-list">
      <h2>Available Movies</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            {movie.title}
            <button onClick={() => onAddToCart(movie)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
