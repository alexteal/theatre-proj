import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './SearchBar.scss';

function SearchBar({ movies }) {
  const [searchFilter, setSearchFilter] = useState('title'); 
  const [runningFilter, setRunningFilter] = useState('all'); 
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  const [showTrailer, setShowTrailer] = useState(false);
  const [currentTrailerUrl, setCurrentTrailerUrl] = useState("");
  const [currentMovie, setCurrentMovie] = useState(null); 

  const handleFilterChange = (event) => {
    setSearchFilter(event.target.value);
  };

  const handleRunningFilterChange = (event) => {
    setRunningFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchTerm(query);
  
    const results = movies.filter((movie) => {
      const title = movie.title ? movie.title.toLowerCase() : '';
      const category = movie.category ? movie.category.toLowerCase() : '';
  
      const isMatch = searchFilter === 'title'
        ? title.includes(query)
        : category.includes(query);
      
      const isRunningMatch = runningFilter === 'all' || 
        (runningFilter === 'running' && movie.running) || 
        (runningFilter === 'comingSoon' && !movie.running);
      
      return isMatch && isRunningMatch;
    });
  
    setFilteredResults(results);
  };
  

  const handleResultSelect = (movie) => {
    setCurrentTrailerUrl(movie.trailerUrl);
    setCurrentMovie(movie); 
    setShowTrailer(true);
    
  };

  const navigate = useNavigate();

  const bookTickets = () => {
    if (currentMovie) {
      navigate(`/book/${currentMovie.title}`);
    }
  };

  return (
    <div className="search-bar-container">
      <select onChange={handleFilterChange} value={searchFilter}>
        <option value="title">Title</option>
        <option value="category">Category</option>
      </select>
      
      <select onChange={handleRunningFilterChange} value={runningFilter}>
        <option value="all">All</option>
        <option value="running">Currently Showing</option>
        <option value="comingSoon">Coming Soon</option>
      </select>

      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {searchTerm && (
        <ul className="search-results">
          {filteredResults.map((movie, index) => (
            <li key={index} onClick={() => handleResultSelect(movie)}>
              {movie.title}
            </li>
          ))}
        </ul>
      )}

      
      {showTrailer && (
                    
                    <div className="trailer-popup">
                      <iframe
                        width="560"
                        height="315"
                        src={currentTrailerUrl}
                        frameBorder="0"
                        allowFullScreen
                      ></iframe>
                      <div className="movie-details">
                        <h2>{currentMovie?.title}</h2>
                        <p><strong>Category:</strong> {currentMovie?.category}</p>
                        <p><strong>Director:</strong> {currentMovie?.director}</p>
                        <p><strong>Producer:</strong> {currentMovie?.producer}</p>
                        <p><strong>Synopsis:</strong> {currentMovie?.synopsis}</p>
                        <p><strong>Rating:</strong> {currentMovie?.rating}</p>
                        <p><strong>ShowTime:</strong> {currentMovie?.showtime?.join('\n ')}</p>
                        <p><strong>Reviews:</strong> {currentMovie?.reviews?.join('\n ')}</p>
                        <p><strong>Cast:</strong> {currentMovie?.cast?.join(', ')}</p>
                      </div>
                      
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

export default SearchBar;
