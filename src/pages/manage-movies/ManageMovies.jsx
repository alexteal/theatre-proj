import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ShowtimePicker from "../../components/react-datepicker/ShowtimePicker";
import {
  deleteMovieData,
  getMovies,
  updateMovieData,
  writeMovieData,
} from "../../dataService";
import "./manage-movies.scss";
import MovieList from "../../components/movie-list/MovieList";



const ManageMovies = () => {
  const [showtimes, setShowtimes] = useState([]);
  const [currentlyRunningMovies, setCurrentlyRunningMovies] = useState([]);
  const [comingSoonMovies, setComingSoonMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [category, setCategory] = useState("");
  const [cast, setCast] = useState("");
  const [director, setDirector] = useState("");
  const [producer, setProducer] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [reviews, setReviews] = useState(""); 
  const [rating, setRating] = useState(""); 
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
              category: movie.category,       
              cast: movie.cast,              
              director: movie.director,       
              producer: movie.producer,       
              synopsis: movie.synopsis,      
              reviews: movie.reviews,         
              running: movie.running,          
              rating: movie.rating,
              showtimes: movie.showtimes,
              
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


  const parseShowtimeString = (showtimeString) => {
    // Split the string by " || " to separate the date and time parts
    const [dateStr, timeStr] = showtimeString.split(' || ');
    // Parse the date part into a Date object
    const date = new Date(dateStr);
    // Return the Date object and the time string
    return { date, time: timeStr };
  };
  

  //console.log(currentlyRunningMovies);
  //console.log(comingSoonMovies);

  const handleSubmit = (e) => {
    e.preventDefault();

    // We have these two as arrays because we may have multiple reviews and or cast.
    const castArray = cast.split(',').map(item => item.trim());
    const reviewsArray = reviews.split('\n').map(item => item.trim());
    //const showtimeArray = showtime.split(',').map(item => item.trim());
    // This isn't required below but we have it so we can organize our data!!!

    //const organizedShowtimes = organizeShowtimes(showtimes);

    const newMovieData = {
      title,
      trailerUrl,
      thumbnail,
      category,
      cast: castArray,
      director,
      producer,
      synopsis,
      reviews: reviewsArray,
      rating,
      running,
      showtimes
      //showtime: showtimeArray,
    };

    writeMovieData(newMovieData)
      .then(() => {
        alert("Movie successfully added!");
        setStatus("Movie successfully added!");
        setTitle("");
        setTrailerUrl("");
        setThumbnail("");
        setCategory("");
        setCast("");
        setDirector("");
        setProducer("");
        setSynopsis("");
        setReviews("");
        setRating("");
        setShowtimes("");
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
    setCategory(movie.category);
    setCast(Array.isArray(movie.cast) ? movie.cast.join(', ') : '');

    setShowtimes(movie.showtimes || []);

    setShowtimes(movie.showtimes ? movie.showtimes.map(parseShowtimeString) : []);


    setDirector(movie.director);
    setProducer(movie.producer);
    setSynopsis(movie.synopsis);
    setRating(movie.rating);
    setShowtimes(movie.showtimes);
    setReviews(Array.isArray(movie.reviews) ? movie.reviews.join(', ') : '');
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (currentMovie) {
      const castArray = cast.split(',').map(item => item.trim());
      const reviewsArray = reviews.split(',').map(item => item.trim());
      //const showtimeArray = showtime.split(',').map(item => item.trim());

      const updatedMovieData = {
        title,
        trailerUrl,
        thumbnail,
        category,
        cast: castArray,
        director,
        producer,
        synopsis,
        reviews: reviewsArray,
        rating,
        running,
        showtimes,
        //showtime: showtimeArray,
      };


      updateMovieData(selectedMovieId, updatedMovieData)
        .then(() => {
          console.log(category)
          alert("Movie successfully updated!");
          setStatus("Movie updated!");
          setTitle("");
          setTrailerUrl("");
          setThumbnail("");
          setTitle("");
          setTrailerUrl("");
          setThumbnail("");
          setCategory("");
          setCast("");
          setDirector("");

          
          setProducer("");
          setSynopsis("");
          setReviews("");
          setRating("");
          setShowtimes("");
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
              <div className="input-group">
                <label>
                  Category
                  <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                </label>
              </div>

              <div className="input-group">
                <label>
                  Casts
                  <input
                    type="text"
                    placeholder="Cast names separated by commas"
                    value={cast}
                    onChange={(e) => setCast(e.target.value)}
                  />
                </label>
              </div>

              <div className="input-group">
                <label>
                  Director
                  <input
                    type="text"
                    placeholder="Director"
                    value={director}
                    onChange={(e) => setDirector(e.target.value)}
                    required
                  />
                </label>
              </div>

              <div className="input-group">
                <label>
                  Producer
                  <input
                    type="text"
                    placeholder="Producer"
                    value={producer}
                    onChange={(e) => setProducer(e.target.value)}
                    required
                  />
                </label>
              </div>

              <div className="input-group">
                <label>
                  Synopsis
                  <input
                    type="text"
                    placeholder="Synopsis"
                    value={synopsis}
                    onChange={(e) => setSynopsis(e.target.value)}
                  />
                </label>
              </div>
              <div className="input-group">
                <label>
                  Reviews
                  <input
                    type="text"
                    placeholder="Separate reviews with commas"
                    value={reviews}
                    onChange={(e) => setReviews(e.target.value)}
                  />
                </label>
              </div>
              <div className="input-group">
                <label>
                  Rating
                  <input
                    type="text"
                    placeholder="M-Rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  />
                </label>
              </div>

              {/* <div className="input-group">
                <label>
                  Showtime
                  <input
                    type="text"
                    placeholder="Separate showtimes with commas"
                    value={showtime}
                    onChange={(e) => setShowtime(e.target.value)}
                  />
                </label>
              </div> */}

                <ShowtimePicker showtimes={showtimes || []} setShowtimes={setShowtimes} />


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
