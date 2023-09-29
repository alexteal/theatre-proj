import React, { useState } from 'react';

const AdminPanel = ({ movies, onAddMovie, onDeleteMovie }) => {
  const [movieInfo, setMovieInfo] = useState({
    title: '',
    genre: '',
    description: '',
  });

  const handleMovieInfoChange = event => {
    const { name, value } = event.target;
    setMovieInfo(prevInfo => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleAddMovie = () => {
    const newMovie = { ...movieInfo, id: Date.now() };
    onAddMovie(prevMovies => [...prevMovies, newMovie]);
    setMovieInfo({ title: '', genre: '', description: '' });
  };

  const handleDeleteMovie = movieId => {
    onDeleteMovie(prevMovies => prevMovies.filter(movie => movie.id !== movieId));
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <input type="text" name="title" placeholder="Movie Title" onChange={handleMovieInfoChange} />
      <input type="text" name="genre" placeholder="Genre" onChange={handleMovieInfoChange} />
      <input type="text" name="description" placeholder="Description" onChange={handleMovieInfoChange} />
      <button onClick={handleAddMovie}>Add Movie</button>
      <h3>Available Movies</h3>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            {movie.title} <button onClick={() => handleDeleteMovie(movie.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
