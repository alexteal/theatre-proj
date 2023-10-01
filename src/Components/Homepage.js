import React from 'react';
import Header from './Header.js';
import MovieList from './MovieList.js';
import './Css/Homepage.css';

function Homepage({ currentlyRunning, comingSoon }) {
  return (
    <div className="home">
      <Header />
      <h2 className='my-5 welcome'>Welcome to E-Cinema</h2>
      <div className="movie-section">
        <div className="movie-posters">
          <h3 className='current'>Currently Running</h3>
          <MovieList movies={currentlyRunning} />
        </div>
        <div className="movie-posters">
          <h3 className='coming'>Coming Soon</h3>
          <MovieList movies={comingSoon} />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
