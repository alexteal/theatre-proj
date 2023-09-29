import React from 'react';

const UserPage = ({ movies, onAddToCart }) => {
  const handleAddToCart = movie => {
    onAddToCart(movie);
  };

  return (
    <div className="user-page">
      <h2>Welcome to the Cinema!</h2>
      <h3>Available Movies</h3>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            {movie.title} <button onClick={() => handleAddToCart(movie)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
